-- Run this in Supabase Dashboard > SQL Editor > New Query
-- This adds the lamination_options column and inserts all products

-- Step 1: Add lamination_options column
ALTER TABLE products
ADD COLUMN IF NOT EXISTS lamination_options TEXT[] DEFAULT NULL;

-- Step 2: Clear existing mock products (optional - comment out if you want to keep them)
-- DELETE FROM products;

-- Step 3: Insert all products from the catalog
INSERT INTO products (name, description, category, features, dimensions, material, min_order, lamination_options, is_active, sort_order)
VALUES
  -- Premium Sweet Boxes - 125g
  ('Premium Sweet Box 125g', 'Compact 125g capacity premium sweet box, perfect for small gift portions and individual servings.', 'Indian Sweet Boxes', ARRAY['Food-grade', 'Premium finish', 'Gift-ready'], '125g capacity', 'Premium Paperboard', '5000 pieces', ARRAY['Reg', '1P', '2P'], true, 1),

  -- Premium Sweet Boxes - 250g
  ('Premium Sweet Box 250g', 'Standard 250g capacity premium sweet box, ideal for festivals and celebrations.', 'Indian Sweet Boxes', ARRAY['Food-grade', 'Premium finish', 'Festive designs'], '250g capacity', 'Premium Paperboard', '5000 pieces', ARRAY['Reg', '1P', '2P'], true, 2),

  -- Premium Sweet Box 250g E
  ('Premium Sweet Box 250g E', 'Economy 250g premium sweet box with quality finish at competitive pricing.', 'Indian Sweet Boxes', ARRAY['Food-grade', 'Economy range', 'Value pack'], '250g capacity', 'Paperboard', '5000 pieces', ARRAY['1P', '2P'], true, 3),

  -- Premium Sweet Boxes - 500g
  ('Premium Sweet Box 500g', 'Half kg capacity premium sweet box, popular choice for gifting and retail.', 'Indian Sweet Boxes', ARRAY['Food-grade', 'Premium finish', 'Retail ready'], '500g capacity', 'Premium Paperboard', '5000 pieces', ARRAY['Reg', '1P', '2P'], true, 4),

  -- Premium Sweet Box 500 Big
  ('Premium Sweet Box 500g Big', 'Large format 500g premium sweet box with extra room for presentation.', 'Indian Sweet Boxes', ARRAY['Food-grade', 'Premium finish', 'Spacious design'], '500g capacity (large)', 'Premium Paperboard', '3000 pieces', ARRAY['1P', '2P'], true, 5),

  -- Premium Sweet Boxes - 1kg
  ('Premium Sweet Box 1kg', 'Full 1kg capacity premium sweet box for bulk gifting and family packs.', 'Indian Sweet Boxes', ARRAY['Food-grade', 'Premium finish', 'Family size'], '1kg capacity', 'Premium Paperboard', '3000 pieces', ARRAY['Reg', '1P', '2P'], true, 6),

  -- Premium Sweet Box 1kg Big (7X9)
  ('Premium Sweet Box 1kg Big (7x9)', 'Extra large 1kg premium sweet box with 7x9 inch dimensions for premium presentation.', 'Indian Sweet Boxes', ARRAY['Food-grade', 'Premium finish', 'Extra large'], '7" x 9" (1kg capacity)', 'Premium Paperboard', '2000 pieces', ARRAY['Reg', '1P', '2P'], true, 7),

  -- Dhokla Boxes
  ('Dhokla Box 250g (5x5)', 'Compact dhokla box with 5x5 inch dimensions, perfect for snack portions.', 'Indian Sweet Boxes', ARRAY['Food-grade', 'Snack size', 'Ventilated'], '5" x 5" (250g)', 'Food-safe Paperboard', '3000 pieces', ARRAY['1P', '2P'], true, 8),

  ('Dhokla Box 500g (6x6)', 'Medium dhokla box with 6x6 inch dimensions for half kg servings.', 'Indian Sweet Boxes', ARRAY['Food-grade', 'Medium size', 'Ventilated'], '6" x 6" (500g)', 'Food-safe Paperboard', '3000 pieces', ARRAY['1P', '2P'], true, 9),

  ('Dhokla Box 1kg (8x8)', 'Large dhokla box with 8x8 inch dimensions for full kg portions.', 'Indian Sweet Boxes', ARRAY['Food-grade', 'Family size', 'Ventilated'], '8" x 8" (1kg)', 'Food-safe Paperboard', '2000 pieces', ARRAY['1P', '2P', 'M-UV'], true, 10),

  -- Kaju Katli Boxes
  ('Kaju Katli Box 125g', 'Elegant box designed for premium Kaju Katli, 125g capacity.', 'Indian Sweet Boxes', ARRAY['Food-grade', 'Premium finish', 'Gift-ready'], '125g capacity', 'Premium Paperboard', '3000 pieces', ARRAY['2P', 'M-UV'], true, 11),

  ('Kaju Katli Box 250g', 'Classic Kaju Katli box with 250g capacity, perfect for gifting.', 'Indian Sweet Boxes', ARRAY['Food-grade', 'Premium finish', 'Festive designs'], '250g capacity', 'Premium Paperboard', '3000 pieces', ARRAY['1P', '2P', 'M-UV'], true, 12),

  ('Kaju Katli Box 500g', 'Half kg Kaju Katli box with premium finish for special occasions.', 'Indian Sweet Boxes', ARRAY['Food-grade', 'Premium finish', 'Luxury look'], '500g capacity', 'Premium Paperboard', '2000 pieces', ARRAY['1P', '2P', 'M-UV'], true, 13),

  ('Kaju Katli Box 1kg', 'Full 1kg Kaju Katli box, ideal for weddings and large celebrations.', 'Indian Sweet Boxes', ARRAY['Food-grade', 'Premium finish', 'Wedding ready'], '1kg capacity', 'Premium Paperboard', '2000 pieces', ARRAY['1P', '2P', 'M-UV'], true, 14),

  -- Laddu Boxes
  ('Laddu Box 250g', 'Specially designed box for laddus with 250g capacity.', 'Indian Sweet Boxes', ARRAY['Food-grade', 'Secure fit', 'Traditional design'], '250g capacity', 'Food-safe Paperboard', '3000 pieces', ARRAY['1P', '2P'], true, 15),

  ('Laddu Box 500g', 'Medium laddu box with 500g capacity for retail and gifting.', 'Indian Sweet Boxes', ARRAY['Food-grade', 'Secure fit', 'Stackable'], '500g capacity', 'Food-safe Paperboard', '3000 pieces', ARRAY['1P', '2P'], true, 16),

  ('Laddu Box 1kg', 'Large laddu box with 1kg capacity for bulk orders and family packs.', 'Indian Sweet Boxes', ARRAY['Food-grade', 'Secure fit', 'Family size'], '1kg capacity', 'Food-safe Paperboard', '2000 pieces', ARRAY['1P', '2P'], true, 17);
