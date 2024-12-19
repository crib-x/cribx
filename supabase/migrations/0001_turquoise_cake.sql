```sql
/*
  # Property Management Schema

  1. New Tables
    - properties (main property information)
    - property_specs (property specifications)
    - property_parking (parking details)
    - property_incentives (incentives and discounts)
    - property_fees (fees and charges)
    - property_pet_policies (pet-related policies)
    - property_charges (utility charges)
    - property_media (images, videos, floor plans)
    - property_locations (location and nearby places)
    - property_contacts (agent/contact information)
    - property_units (individual rental units)
    - property_amenities (amenities lookup table)
    - property_amenities_junction (many-to-many relationship)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Amenities lookup table
CREATE TABLE IF NOT EXISTS property_amenities (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL UNIQUE,
  category text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Main properties table
CREATE TABLE IF NOT EXISTS properties (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title text NOT NULL,
  address text NOT NULL,
  description text,
  type text NOT NULL,
  featured_image text,
  logo text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  owner_id uuid REFERENCES auth.users(id)
);

-- Property specifications
CREATE TABLE IF NOT EXISTS property_specs (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id uuid REFERENCES properties(id) ON DELETE CASCADE,
  beds integer NOT NULL DEFAULT 0,
  baths integer NOT NULL DEFAULT 0,
  sqft integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Property parking
CREATE TABLE IF NOT EXISTS property_parking (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id uuid REFERENCES properties(id) ON DELETE CASCADE,
  type text NOT NULL,
  spaces integer NOT NULL DEFAULT 0,
  cost decimal(10,2),
  created_at timestamptz DEFAULT now()
);

-- Property incentives
CREATE TABLE IF NOT EXISTS property_incentives (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id uuid REFERENCES properties(id) ON DELETE CASCADE,
  title text NOT NULL,
  amount decimal(10,2),
  property_type text,
  note text,
  created_at timestamptz DEFAULT now()
);

-- Property fees
CREATE TABLE IF NOT EXISTS property_fees (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id uuid REFERENCES properties(id) ON DELETE CASCADE,
  title text NOT NULL,
  amount decimal(10,2) NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Property pet policies
CREATE TABLE IF NOT EXISTS property_pet_policies (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id uuid REFERENCES properties(id) ON DELETE CASCADE,
  allowed boolean DEFAULT false,
  types_allowed text[],
  monthly_rent decimal(10,2) DEFAULT 0,
  one_time_fee decimal(10,2) DEFAULT 0,
  count_limit integer DEFAULT 0,
  weight_limit text,
  created_at timestamptz DEFAULT now()
);

-- Property charges
CREATE TABLE IF NOT EXISTS property_charges (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id uuid REFERENCES properties(id) ON DELETE CASCADE,
  type text NOT NULL,
  title text NOT NULL,
  amount decimal(10,2) NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Property media
CREATE TABLE IF NOT EXISTS property_media (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id uuid REFERENCES properties(id) ON DELETE CASCADE,
  type text NOT NULL, -- 'image', 'video', 'floor_plan', 'unit_media'
  url text NOT NULL,
  title text,
  created_at timestamptz DEFAULT now()
);

-- Property locations
CREATE TABLE IF NOT EXISTS property_locations (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id uuid REFERENCES properties(id) ON DELETE CASCADE,
  lat decimal(10,8) NOT NULL,
  lng decimal(11,8) NOT NULL,
  schools text[],
  dining text[],
  transportation text[],
  created_at timestamptz DEFAULT now()
);

-- Property contacts
CREATE TABLE IF NOT EXISTS property_contacts (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id uuid REFERENCES properties(id) ON DELETE CASCADE,
  name text NOT NULL,
  email text,
  phone text,
  created_at timestamptz DEFAULT now()
);

-- Property units
CREATE TABLE IF NOT EXISTS property_units (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id uuid REFERENCES properties(id) ON DELETE CASCADE,
  name text NOT NULL,
  type text NOT NULL,
  occupancy integer NOT NULL DEFAULT 1,
  size integer,
  status text NOT NULL DEFAULT 'available',
  description text,
  floor_plan text,
  utilities_included text[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Unit rent details
CREATE TABLE IF NOT EXISTS unit_rent_details (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  unit_id uuid REFERENCES property_units(id) ON DELETE CASCADE,
  price decimal(10,2) NOT NULL,
  deposit decimal(10,2),
  per_room boolean DEFAULT false,
  incentives text[],
  created_at timestamptz DEFAULT now()
);

-- Unit availability
CREATE TABLE IF NOT EXISTS unit_availability (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  unit_id uuid REFERENCES property_units(id) ON DELETE CASCADE,
  is_available boolean DEFAULT true,
  move_in_date date,
  lease_terms text[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Junction table for property amenities
CREATE TABLE IF NOT EXISTS property_amenities_junction (
  property_id uuid REFERENCES properties(id) ON DELETE CASCADE,
  amenity_id uuid REFERENCES property_amenities(id) ON DELETE CASCADE,
  PRIMARY KEY (property_id, amenity_id)
);

-- Enable Row Level Security
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_specs ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_parking ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_incentives ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_fees ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_pet_policies ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_charges ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_units ENABLE ROW LEVEL SECURITY;
ALTER TABLE unit_rent_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE unit_availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_amenities ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_amenities_junction ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Enable read access for all users"
ON properties FOR SELECT
TO public
USING (true);

CREATE POLICY "Enable insert for authenticated users only"
ON properties FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Enable update for property owners"
ON properties FOR UPDATE
TO authenticated
USING (auth.uid() = owner_id)
WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Enable delete for property owners"
ON properties FOR DELETE
TO authenticated
USING (auth.uid() = owner_id);

-- Add similar policies for other tables
```