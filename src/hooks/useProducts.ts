import { useState, useEffect, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { products as mockProducts } from '@/data/mock';
import type { DbProduct, DbProductInsert, DbProductUpdate } from '@/types/database';
import type { Product } from '@/types';

function dbToProduct(db: DbProduct): Product {
  const allImages: string[] = [];
  if (db.image_url) allImages.push(db.image_url);
  if (db.image_urls) allImages.push(...db.image_urls);

  return {
    id: db.id,
    name: db.name,
    description: db.description || '',
    image: db.image_url || '',
    images: allImages.length > 0 ? allImages : [],
    category: db.category,
    features: db.features || [],
    laminationOptions: db.lamination_options || [],
    specs: {
      dimensions: db.dimensions || '',
      material: db.material || '',
      minOrder: db.min_order || '',
      printOptions: db.print_options || '',
    },
  };
}

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    if (!isSupabaseConfigured()) {
      setProducts(mockProducts);
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('sort_order', { ascending: true });

      if (error) throw error;

      if (data && data.length > 0) {
        setProducts((data as DbProduct[]).map(dbToProduct));
      } else {
        setProducts(mockProducts);
      }
    } catch (err) {
      console.error('Error fetching products:', err);
      setProducts(mockProducts);
      setError(err instanceof Error ? err.message : 'Failed to fetch products');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return { products, isLoading, error, refetch: fetchProducts };
}

export function useProductsAdmin() {
  const [products, setProducts] = useState<DbProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    if (!isSupabaseConfigured()) {
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('sort_order', { ascending: true });

      if (error) throw error;
      setProducts((data as DbProduct[]) || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch products');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const addProduct = async (product: DbProductInsert) => {
    if (!isSupabaseConfigured()) return { error: new Error('Supabase not configured') };

    console.log('Adding product:', product);

    const { data, error } = await supabase
      .from('products')
      .insert(product as never)
      .select()
      .single();

    if (error) {
      console.error('Supabase insert error:', error);
      return { data: null, error };
    }

    console.log('Product added successfully:', data);
    if (data) {
      setProducts(prev => [...prev, data as DbProduct]);
    }
    return { data: data as DbProduct | null, error: null };
  };

  const updateProduct = async (id: string, updates: DbProductUpdate) => {
    if (!isSupabaseConfigured()) return { error: new Error('Supabase not configured') };

    const { data, error } = await supabase
      .from('products')
      .update(updates as never)
      .eq('id', id)
      .select()
      .single();

    if (!error && data) {
      setProducts(prev => prev.map(p => p.id === id ? (data as DbProduct) : p));
    }
    return { data: data as DbProduct | null, error };
  };

  const deleteProduct = async (id: string) => {
    if (!isSupabaseConfigured()) return { error: new Error('Supabase not configured') };

    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (!error) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
    return { error };
  };

  const uploadImage = async (file: File): Promise<{ url: string | null; error: Error | null }> => {
    if (!isSupabaseConfigured()) return { url: null, error: new Error('Supabase not configured') };

    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('product-images')
      .upload(fileName, file);

    if (uploadError) return { url: null, error: uploadError };

    const { data: { publicUrl } } = supabase.storage
      .from('product-images')
      .getPublicUrl(fileName);

    return { url: publicUrl, error: null };
  };

  return {
    products,
    isLoading,
    error,
    refetch: fetchProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    uploadImage,
  };
}
