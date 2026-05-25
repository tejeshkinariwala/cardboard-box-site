-- Run this in Supabase Dashboard > SQL Editor to add support for multiple images
-- Go to: SQL Editor > New Query > Paste this > Run

-- Add image_urls column to products table (array of image URLs)
ALTER TABLE products
ADD COLUMN IF NOT EXISTS image_urls TEXT[] DEFAULT NULL;
