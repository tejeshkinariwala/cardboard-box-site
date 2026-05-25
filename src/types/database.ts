export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          category: string;
          features: string[];
          dimensions: string | null;
          material: string | null;
          min_order: string | null;
          print_options: string | null;
          image_url: string | null;
          image_urls: string[] | null;
          lamination_options: string[] | null;
          is_active: boolean;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string | null;
          category: string;
          features?: string[];
          dimensions?: string | null;
          material?: string | null;
          min_order?: string | null;
          print_options?: string | null;
          image_url?: string | null;
          image_urls?: string[] | null;
          lamination_options?: string[] | null;
          is_active?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string | null;
          category?: string;
          features?: string[];
          dimensions?: string | null;
          material?: string | null;
          min_order?: string | null;
          print_options?: string | null;
          image_url?: string | null;
          image_urls?: string[] | null;
          lamination_options?: string[] | null;
          is_active?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      inquiries: {
        Row: {
          id: string;
          contact_method: 'whatsapp' | 'email';
          name: string;
          email: string | null;
          whatsapp_number: string | null;
          country_code: string;
          company_name: string | null;
          requirements: string | null;
          product_interest: string | null;
          status: 'new' | 'contacted' | 'quoted' | 'converted' | 'closed';
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          contact_method: 'whatsapp' | 'email';
          name: string;
          email?: string | null;
          whatsapp_number?: string | null;
          country_code?: string;
          company_name?: string | null;
          requirements?: string | null;
          product_interest?: string | null;
          status?: 'new' | 'contacted' | 'quoted' | 'converted' | 'closed';
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          contact_method?: 'whatsapp' | 'email';
          name?: string;
          email?: string | null;
          whatsapp_number?: string | null;
          country_code?: string;
          company_name?: string | null;
          requirements?: string | null;
          product_interest?: string | null;
          status?: 'new' | 'contacted' | 'quoted' | 'converted' | 'closed';
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}

export type DbProduct = Database['public']['Tables']['products']['Row'];
export type DbProductInsert = Database['public']['Tables']['products']['Insert'];
export type DbProductUpdate = Database['public']['Tables']['products']['Update'];

export type DbInquiry = Database['public']['Tables']['inquiries']['Row'];
export type DbInquiryInsert = Database['public']['Tables']['inquiries']['Insert'];
