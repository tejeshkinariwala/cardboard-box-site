-- Supabase Schema for Paper Crafts
-- Run this in your Supabase SQL Editor

-- Products Table
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  features TEXT[] DEFAULT '{}',
  dimensions TEXT,
  material TEXT,
  min_order TEXT,
  print_options TEXT,
  image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Inquiries Table
CREATE TABLE IF NOT EXISTS inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  contact_method TEXT NOT NULL CHECK (contact_method IN ('whatsapp', 'email')),
  name TEXT NOT NULL,
  email TEXT,
  whatsapp_number TEXT,
  country_code TEXT DEFAULT '+91',
  company_name TEXT,
  requirements TEXT,
  product_interest TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'quoted', 'converted', 'closed')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

-- Products policies: Anyone can read active products, only authenticated users can modify
CREATE POLICY "Anyone can view active products" ON products
  FOR SELECT USING (is_active = true);

CREATE POLICY "Authenticated users can view all products" ON products
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated users can insert products" ON products
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can update products" ON products
  FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Authenticated users can delete products" ON products
  FOR DELETE TO authenticated USING (true);

-- Inquiries policies: Anyone can insert, only authenticated can read/modify
CREATE POLICY "Anyone can submit inquiries" ON inquiries
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Authenticated users can view inquiries" ON inquiries
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated users can update inquiries" ON inquiries
  FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Authenticated users can delete inquiries" ON inquiries
  FOR DELETE TO authenticated USING (true);

-- Create storage bucket for product images
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policy: Anyone can view, authenticated can upload
CREATE POLICY "Anyone can view product images" ON storage.objects
  FOR SELECT USING (bucket_id = 'product-images');

CREATE POLICY "Authenticated users can upload product images" ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (bucket_id = 'product-images');

CREATE POLICY "Authenticated users can update product images" ON storage.objects
  FOR UPDATE TO authenticated USING (bucket_id = 'product-images');

CREATE POLICY "Authenticated users can delete product images" ON storage.objects
  FOR DELETE TO authenticated USING (bucket_id = 'product-images');

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_inquiries_updated_at
  BEFORE UPDATE ON inquiries
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample products (optional - remove if you want to start fresh)
INSERT INTO products (name, description, category, features, dimensions, material, min_order, print_options, is_active) VALUES
('Premium Mithai Box - 500g', 'Elegant gold-foil embossed box perfect for festive sweets. Food-grade laminated interior.', 'Indian Sweet Boxes', ARRAY['Food-grade certified', 'Gold foil finish', 'Leak-proof', 'Festive designs'], '8" x 6" x 2.5"', 'Premium Paperboard 350 GSM', '500 pieces', 'Full color offset, Foil stamping', true),
('Ladoo Box - 12 Cavity', 'Specially designed compartments to keep ladoos intact. Perfect for weddings and celebrations.', 'Indian Sweet Boxes', ARRAY['12 individual cavities', 'Window display', 'Stackable', 'Custom branding'], '10" x 8" x 2"', 'Food-safe Corrugated E-Flute', '300 pieces', 'Flexo, Digital, Litho-lamination', true),
('Cake Box - 1kg Round', 'Sturdy box for round cakes with window display. Easy assembly with secure base.', 'Cake & Bakery', ARRAY['Clear window', 'Sturdy base', 'Easy fold', 'Ventilated'], '10" x 10" x 5"', 'Duplex Board 350 GSM', '500 pieces', 'Full color, Window options', true),
('Burger Box - Premium', 'Clamshell design keeps burgers warm and intact. Grease-resistant interior.', 'Sandwich & Fast Food', ARRAY['Clamshell design', 'Grease barrier', 'Ventilation holes', 'Branded'], '5" x 5" x 3.5"', 'Coated Kraft 350 GSM', '2000 pieces', 'Full color, Inside-out printing', true);
