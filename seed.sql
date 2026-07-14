-- ============================================================
-- SmartKeja: Seed Data Script
-- Run this in the Supabase SQL Editor (Dashboard > SQL Editor)
-- ============================================================
-- This script creates:
--   • 2 test landlords (with verified status)
--   • 1 test student
--   • 12 realistic Nairobi student properties
--   • 24 property images (2 per property)
-- ============================================================

-- Step 0: Ensure PostGIS is enabled
CREATE EXTENSION IF NOT EXISTS postgis;

-- Step 1: Create test auth users
-- (The SQL Editor runs as superuser and can insert into auth.users directly)

-- Landlord 1: James Mwangi
INSERT INTO auth.users (
  id, instance_id, email, encrypted_password,
  email_confirmed_at, raw_user_meta_data,
  created_at, updated_at,
  aud, role
) VALUES (
  '11111111-aaaa-bbbb-cccc-111111111111',
  '00000000-0000-0000-0000-000000000000',
  'landlord1@smartkeja.test',
  crypt('TestPass123!', gen_salt('bf')),
  now(),
  '{"role": "landlord", "full_name": "James Mwangi"}'::jsonb,
  now(), now(),
  'authenticated', 'authenticated'
) ON CONFLICT (id) DO NOTHING;

-- Landlord 2: Grace Wanjiku
INSERT INTO auth.users (
  id, instance_id, email, encrypted_password,
  email_confirmed_at, raw_user_meta_data,
  created_at, updated_at,
  aud, role
) VALUES (
  '22222222-aaaa-bbbb-cccc-222222222222',
  '00000000-0000-0000-0000-000000000000',
  'landlord2@smartkeja.test',
  crypt('TestPass123!', gen_salt('bf')),
  now(),
  '{"role": "landlord", "full_name": "Grace Wanjiku"}'::jsonb,
  now(), now(),
  'authenticated', 'authenticated'
) ON CONFLICT (id) DO NOTHING;

-- Student: Kevin Ochieng
INSERT INTO auth.users (
  id, instance_id, email, encrypted_password,
  email_confirmed_at, raw_user_meta_data,
  created_at, updated_at,
  aud, role
) VALUES (
  '33333333-aaaa-bbbb-cccc-333333333333',
  '00000000-0000-0000-0000-000000000000',
  'student1@smartkeja.test',
  crypt('TestPass123!', gen_salt('bf')),
  now(),
  '{"role": "student", "full_name": "Kevin Ochieng"}'::jsonb,
  now(), now(),
  'authenticated', 'authenticated'
) ON CONFLICT (id) DO NOTHING;

-- Step 2: Create profiles (linked to auth.users)

INSERT INTO profiles (id, role, full_name, phone, verification_status) VALUES
  ('11111111-aaaa-bbbb-cccc-111111111111', 'landlord', 'James Mwangi',   '+254722100200', 'verified'),
  ('22222222-aaaa-bbbb-cccc-222222222222', 'landlord', 'Grace Wanjiku',   '+254733200300', 'verified'),
  ('33333333-aaaa-bbbb-cccc-333333333333', 'student',  'Kevin Ochieng',   '+254711300400', 'pending')
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  full_name = EXCLUDED.full_name,
  phone = EXCLUDED.phone,
  verification_status = EXCLUDED.verification_status;

-- Step 3: Create identity records (required by Supabase Auth for login)

INSERT INTO auth.identities (
  id, user_id, provider_id, provider,
  identity_data, last_sign_in_at, created_at, updated_at
) VALUES
  (gen_random_uuid(), '11111111-aaaa-bbbb-cccc-111111111111', 'landlord1@smartkeja.test', 'email',
   '{"sub": "11111111-aaaa-bbbb-cccc-111111111111", "email": "landlord1@smartkeja.test"}'::jsonb,
   now(), now(), now()),
  (gen_random_uuid(), '22222222-aaaa-bbbb-cccc-222222222222', 'landlord2@smartkeja.test', 'email',
   '{"sub": "22222222-aaaa-bbbb-cccc-222222222222", "email": "landlord2@smartkeja.test"}'::jsonb,
   now(), now(), now()),
  (gen_random_uuid(), '33333333-aaaa-bbbb-cccc-333333333333', 'student1@smartkeja.test', 'email',
   '{"sub": "33333333-aaaa-bbbb-cccc-333333333333", "email": "student1@smartkeja.test"}'::jsonb,
   now(), now(), now())
ON CONFLICT DO NOTHING;

-- Step 4: Insert properties
-- Locations are real coordinates near Nairobi universities
-- (University of Nairobi, JKUAT, Kenyatta University, Strathmore, USIU)

INSERT INTO properties (id, landlord_id, title, description, price, amenities, location, address, status) VALUES

  -- === LANDLORD 1: James Mwangi (6 properties) ===

  ('aaaaaaaa-0001-0001-0001-aaaaaaaaaaaa',
   '11111111-aaaa-bbbb-cccc-111111111111',
   'Modern Bedsitter — South B',
   'Spacious bedsitter with tiled floors, a private kitchenette, and 24-hour water supply. Ideal for university students. Walking distance to bus stops serving UoN and Strathmore.',
   8500, ARRAY['Wi-Fi', 'Water 24/7', 'Security', 'Parking'],
   ST_SetSRID(ST_MakePoint(36.8456, -1.3072), 4326)::geography,
   'Mfangano Lane, South B, Nairobi', 'vacant'),

  ('aaaaaaaa-0002-0002-0002-aaaaaaaaaaaa',
   '11111111-aaaa-bbbb-cccc-111111111111',
   'Studio Apartment — Kilimani',
   'Fully furnished studio with modern kitchen, hot shower, and reliable electricity backup. Located in a quiet residential area near Yaya Centre.',
   18000, ARRAY['Furnished', 'Hot Shower', 'Generator', 'Gym', 'Wi-Fi'],
   ST_SetSRID(ST_MakePoint(36.7852, -1.2891), 4326)::geography,
   'Argwings Kodhek Rd, Kilimani, Nairobi', 'vacant'),

  ('aaaaaaaa-0003-0003-0003-aaaaaaaaaaaa',
   '11111111-aaaa-bbbb-cccc-111111111111',
   'Single Room — Juja Town',
   'Clean single room near JKUAT main campus. Shared kitchen and bathroom. Caretaker on-site. Electricity and water included in rent.',
   4500, ARRAY['Water Included', 'Electricity Included', 'Caretaker'],
   ST_SetSRID(ST_MakePoint(37.0144, -1.1045), 4326)::geography,
   'Gatundu Road, Juja, Kiambu', 'vacant'),

  ('aaaaaaaa-0004-0004-0004-aaaaaaaaaaaa',
   '11111111-aaaa-bbbb-cccc-111111111111',
   '1 Bedroom — Langata',
   'Bright one-bedroom apartment with a balcony overlooking a green compound. Gated community with CCTV and night guards. Near Langata Rd matatu routes.',
   14000, ARRAY['Balcony', 'CCTV', 'Night Guard', 'Parking', 'Water 24/7'],
   ST_SetSRID(ST_MakePoint(36.7612, -1.3564), 4326)::geography,
   'Langata South Rd, Langata, Nairobi', 'vacant'),

  ('aaaaaaaa-0005-0005-0005-aaaaaaaaaaaa',
   '11111111-aaaa-bbbb-cccc-111111111111',
   'Bedsitter — Rongai',
   'Affordable bedsitter in a new building with tiled bathrooms. Rongai town center, 5 mins walk to matatu stage. Ideal for KU and Multimedia University students.',
   6000, ARRAY['Tiled', 'New Building', 'Near Stage'],
   ST_SetSRID(ST_MakePoint(36.7582, -1.3953), 4326)::geography,
   'Magadi Rd, Rongai, Kajiado', 'vacant'),

  ('aaaaaaaa-0006-0006-0006-aaaaaaaaaaaa',
   '11111111-aaaa-bbbb-cccc-111111111111',
   '2 Bedroom — Roysambu',
   'Two-bedroom unit with master ensuite, spacious living room, and a separate kitchen. Located in Roysambu near TRM Mall and Kenyatta University.',
   22000, ARRAY['Master Ensuite', 'Spacious', 'Near TRM', 'Parking', 'Wi-Fi'],
   ST_SetSRID(ST_MakePoint(36.8734, -1.2195), 4326)::geography,
   'Thika Superhighway, Roysambu, Nairobi', 'occupied'),

  -- === LANDLORD 2: Grace Wanjiku (6 properties) ===

  ('bbbbbbbb-0001-0001-0001-bbbbbbbbbbbb',
   '22222222-aaaa-bbbb-cccc-222222222222',
   'Furnished Studio — Westlands',
   'Premium furnished studio in Westlands with fiber internet, washing machine, and a rooftop terrace. Walking distance to Sarit Centre and USIU shuttle stop.',
   25000, ARRAY['Fiber Internet', 'Washing Machine', 'Rooftop', 'Furnished', 'Elevator'],
   ST_SetSRID(ST_MakePoint(36.8048, -1.2674), 4326)::geography,
   'Waiyaki Way, Westlands, Nairobi', 'vacant'),

  ('bbbbbbbb-0002-0002-0002-bbbbbbbbbbbb',
   '22222222-aaaa-bbbb-cccc-222222222222',
   'Hostel Bed — CBD Nairobi',
   'Secure hostel accommodation near UoN Main Campus. Shared rooms (4 per room), communal kitchen, and study lounge. All utilities included.',
   3500, ARRAY['All Bills Included', 'Study Lounge', 'Laundry', 'Security'],
   ST_SetSRID(ST_MakePoint(36.8219, -1.2801), 4326)::geography,
   'University Way, CBD, Nairobi', 'vacant'),

  ('bbbbbbbb-0003-0003-0003-bbbbbbbbbbbb',
   '22222222-aaaa-bbbb-cccc-222222222222',
   'Bedsitter — Kasarani',
   'Self-contained bedsitter in Kasarani. Quiet neighborhood, perimeter wall, and borehole water. 10 mins from USIU Africa campus.',
   7500, ARRAY['Self-Contained', 'Borehole', 'Perimeter Wall', 'Quiet'],
   ST_SetSRID(ST_MakePoint(36.8975, -1.2227), 4326)::geography,
   'Kasarani Mwiki Rd, Kasarani, Nairobi', 'vacant'),

  ('bbbbbbbb-0004-0004-0004-bbbbbbbbbbbb',
   '22222222-aaaa-bbbb-cccc-222222222222',
   'Single Room — Kahawa Wendani',
   'Budget-friendly single room near Kenyatta University. 3-minute walk to KU Main Gate. Comes with a bed, desk, and wardrobe.',
   5000, ARRAY['Semi-Furnished', 'Near KU', 'Desk Included'],
   ST_SetSRID(ST_MakePoint(36.9272, -1.1819), 4326)::geography,
   'Kahawa Wendani, off Thika Rd, Nairobi', 'vacant'),

  ('bbbbbbbb-0005-0005-0005-bbbbbbbbbbbb',
   '22222222-aaaa-bbbb-cccc-222222222222',
   '1 Bedroom — Ruaka',
   'Modern one-bedroom in a gated community in Ruaka. Near Two Rivers Mall. Great for students at USIU or United States International University.',
   16000, ARRAY['Gated', 'Modern', 'Near Two Rivers', 'Hot Shower', 'Parking'],
   ST_SetSRID(ST_MakePoint(36.7814, -1.2098), 4326)::geography,
   'Limuru Rd, Ruaka, Kiambu', 'vacant'),

  ('bbbbbbbb-0006-0006-0006-bbbbbbbbbbbb',
   '22222222-aaaa-bbbb-cccc-222222222222',
   'Bedsitter — Kitengela',
   'New bedsitter in Kitengela town. Tiled floors, spacious layout, reliable water. Affordable alternative for students commuting to Nairobi campuses.',
   5500, ARRAY['New Build', 'Tiled', 'Water Tank', 'Near Stage'],
   ST_SetSRID(ST_MakePoint(36.9611, -1.4713), 4326)::geography,
   'Namanga Rd, Kitengela, Kajiado', 'vacant');


-- Step 5: Insert property images (2 per property, real Unsplash URLs)

INSERT INTO property_images (id, property_id, url, sort_order) VALUES

  -- South B Bedsitter
  (gen_random_uuid(), 'aaaaaaaa-0001-0001-0001-aaaaaaaaaaaa',
   'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80', 0),
  (gen_random_uuid(), 'aaaaaaaa-0001-0001-0001-aaaaaaaaaaaa',
   'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80', 1),

  -- Kilimani Studio
  (gen_random_uuid(), 'aaaaaaaa-0002-0002-0002-aaaaaaaaaaaa',
   'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80', 0),
  (gen_random_uuid(), 'aaaaaaaa-0002-0002-0002-aaaaaaaaaaaa',
   'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80', 1),

  -- Juja Single Room
  (gen_random_uuid(), 'aaaaaaaa-0003-0003-0003-aaaaaaaaaaaa',
   'https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=800&q=80', 0),
  (gen_random_uuid(), 'aaaaaaaa-0003-0003-0003-aaaaaaaaaaaa',
   'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80', 1),

  -- Langata 1 Bedroom
  (gen_random_uuid(), 'aaaaaaaa-0004-0004-0004-aaaaaaaaaaaa',
   'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80', 0),
  (gen_random_uuid(), 'aaaaaaaa-0004-0004-0004-aaaaaaaaaaaa',
   'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80', 1),

  -- Rongai Bedsitter
  (gen_random_uuid(), 'aaaaaaaa-0005-0005-0005-aaaaaaaaaaaa',
   'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&w=800&q=80', 0),
  (gen_random_uuid(), 'aaaaaaaa-0005-0005-0005-aaaaaaaaaaaa',
   'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=800&q=80', 1),

  -- Roysambu 2 Bedroom (occupied)
  (gen_random_uuid(), 'aaaaaaaa-0006-0006-0006-aaaaaaaaaaaa',
   'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80', 0),
  (gen_random_uuid(), 'aaaaaaaa-0006-0006-0006-aaaaaaaaaaaa',
   'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=800&q=80', 1),

  -- Westlands Furnished Studio
  (gen_random_uuid(), 'bbbbbbbb-0001-0001-0001-bbbbbbbbbbbb',
   'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80', 0),
  (gen_random_uuid(), 'bbbbbbbb-0001-0001-0001-bbbbbbbbbbbb',
   'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=800&q=80', 1),

  -- CBD Hostel
  (gen_random_uuid(), 'bbbbbbbb-0002-0002-0002-bbbbbbbbbbbb',
   'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80', 0),
  (gen_random_uuid(), 'bbbbbbbb-0002-0002-0002-bbbbbbbbbbbb',
   'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80', 1),

  -- Kasarani Bedsitter
  (gen_random_uuid(), 'bbbbbbbb-0003-0003-0003-bbbbbbbbbbbb',
   'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80', 0),
  (gen_random_uuid(), 'bbbbbbbb-0003-0003-0003-bbbbbbbbbbbb',
   'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=800&q=80', 1),

  -- Kahawa Wendani Single Room
  (gen_random_uuid(), 'bbbbbbbb-0004-0004-0004-bbbbbbbbbbbb',
   'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80', 0),
  (gen_random_uuid(), 'bbbbbbbb-0004-0004-0004-bbbbbbbbbbbb',
   'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80', 1),

  -- Ruaka 1 Bedroom
  (gen_random_uuid(), 'bbbbbbbb-0005-0005-0005-bbbbbbbbbbbb',
   'https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=800&q=80', 0),
  (gen_random_uuid(), 'bbbbbbbb-0005-0005-0005-bbbbbbbbbbbb',
   'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=800&q=80', 1),

  -- Kitengela Bedsitter
  (gen_random_uuid(), 'bbbbbbbb-0006-0006-0006-bbbbbbbbbbbb',
   'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80', 0),
  (gen_random_uuid(), 'bbbbbbbb-0006-0006-0006-bbbbbbbbbbbb',
   'https://images.unsplash.com/photo-1600585153490-76fb20a32601?auto=format&fit=crop&w=803&q=80', 1);


-- ============================================================
-- VERIFICATION: Run these SELECT queries to confirm the seed
-- ============================================================

SELECT 'PROFILES' AS table_name, count(*) AS row_count FROM profiles
UNION ALL
SELECT 'PROPERTIES', count(*) FROM properties
UNION ALL
SELECT 'PROPERTY_IMAGES', count(*) FROM property_images;

SELECT title, price, status, address FROM properties ORDER BY price;
