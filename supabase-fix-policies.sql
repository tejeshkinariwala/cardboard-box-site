-- Run this to fix RLS policies for products table
-- Go to Supabase Dashboard > SQL Editor > New Query > Paste this > Run

-- First, drop existing policies
DROP POLICY IF EXISTS "Anyone can view active products" ON products;
DROP POLICY IF EXISTS "Authenticated users can view all products" ON products;
DROP POLICY IF EXISTS "Authenticated users can insert products" ON products;
DROP POLICY IF EXISTS "Authenticated users can update products" ON products;
DROP POLICY IF EXISTS "Authenticated users can delete products" ON products;

-- Create new, cleaner policies
-- Allow anyone to read active products
CREATE POLICY "Public can view active products" ON products
  FOR SELECT USING (is_active = true);

-- Allow authenticated users full access
CREATE POLICY "Admin full access" ON products
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Fix inquiries policies
DROP POLICY IF EXISTS "Anyone can submit inquiries" ON inquiries;
DROP POLICY IF EXISTS "Authenticated users can view inquiries" ON inquiries;
DROP POLICY IF EXISTS "Authenticated users can update inquiries" ON inquiries;
DROP POLICY IF EXISTS "Authenticated users can delete inquiries" ON inquiries;

-- Allow anyone to insert inquiries
CREATE POLICY "Public can submit inquiries" ON inquiries
  FOR INSERT WITH CHECK (true);

-- Allow authenticated users full access to inquiries
CREATE POLICY "Admin full access to inquiries" ON inquiries
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Make sure storage bucket exists and has correct policies
DO $$
BEGIN
  INSERT INTO storage.buckets (id, name, public)
  VALUES ('product-images', 'product-images', true)
  ON CONFLICT (id) DO UPDATE SET public = true;
EXCEPTION WHEN OTHERS THEN
  NULL;
END $$;

-- Drop and recreate storage policies
DROP POLICY IF EXISTS "Anyone can view product images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload product images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update product images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete product images" ON storage.objects;

CREATE POLICY "Public can view product images" ON storage.objects
  FOR SELECT USING (bucket_id = 'product-images');

CREATE POLICY "Admin can manage product images" ON storage.objects
  FOR ALL TO authenticated USING (bucket_id = 'product-images') WITH CHECK (bucket_id = 'product-images');
