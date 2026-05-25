import { useState, useEffect, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import type { DbInquiry, DbInquiryInsert } from '@/types/database';

export function useInquiries() {
  const [inquiries, setInquiries] = useState<DbInquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchInquiries = useCallback(async () => {
    if (!isSupabaseConfigured()) {
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('inquiries')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setInquiries((data as DbInquiry[]) || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch inquiries');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInquiries();
  }, [fetchInquiries]);

  const updateStatus = async (id: string, status: DbInquiry['status'], notes?: string) => {
    if (!isSupabaseConfigured()) return { error: new Error('Supabase not configured') };

    const { error } = await supabase
      .from('inquiries')
      .update({ status, notes } as never)
      .eq('id', id);

    if (!error) {
      setInquiries(prev => prev.map(i => i.id === id ? { ...i, status, notes: notes || i.notes } : i));
    }
    return { error };
  };

  return { inquiries, isLoading, error, refetch: fetchInquiries, updateStatus };
}

export async function submitInquiry(inquiry: DbInquiryInsert) {
  if (!isSupabaseConfigured()) {
    console.log('Inquiry submitted (demo mode):', inquiry);
    return { data: inquiry, error: null };
  }

  const { data, error } = await supabase
    .from('inquiries')
    .insert(inquiry as never)
    .select()
    .single();

  return { data: data as DbInquiry | null, error };
}
