-- LagnManch Database Schema
-- Run this in Supabase SQL Editor

-- Create enum for profile status
CREATE TYPE profile_status AS ENUM ('pending', 'approved', 'rejected');

-- Create profiles table
CREATE TABLE profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  gender TEXT NOT NULL CHECK (gender IN ('Male', 'Female')),
  date_of_birth DATE NOT NULL,
  age INTEGER NOT NULL,
  city TEXT NOT NULL,
  current_location TEXT NOT NULL,

  -- Education
  education TEXT NOT NULL,
  field_of_study TEXT,

  -- Career
  occupation TEXT NOT NULL,
  company_or_business TEXT,
  annual_income TEXT,

  -- Family Details
  family_background TEXT,
  native_village TEXT,
  father_occupation TEXT,
  mother_occupation TEXT,
  siblings_count INTEGER DEFAULT 0,

  -- Partner Preferences
  preferred_age_min INTEGER,
  preferred_age_max INTEGER,
  preferred_location TEXT,
  preferred_education TEXT,

  -- Contact
  phone_number TEXT NOT NULL,
  whatsapp_number TEXT,

  -- Media
  photo_url TEXT,

  -- Status
  profile_status profile_status DEFAULT 'pending' NOT NULL,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Index for browsing approved profiles
CREATE INDEX idx_profiles_status ON profiles (profile_status);
CREATE INDEX idx_profiles_gender ON profiles (gender);
CREATE INDEX idx_profiles_city ON profiles (city);

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read approved profiles
CREATE POLICY "Approved profiles are publicly readable"
  ON profiles FOR SELECT
  USING (profile_status = 'approved');

-- Policy: Anyone can insert a profile (public registration)
CREATE POLICY "Anyone can create a profile"
  ON profiles FOR INSERT
  WITH CHECK (true);

-- Policy: Service role can do everything (for admin API routes)
-- Note: Supabase service_role key bypasses RLS by default

-- Storage bucket for profile photos
INSERT INTO storage.buckets (id, name, public)
VALUES ('profile-photos', 'profile-photos', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policy: Anyone can upload to profile-photos
CREATE POLICY "Anyone can upload profile photos"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'profile-photos');

-- Storage policy: Anyone can read profile photos
CREATE POLICY "Profile photos are publicly readable"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'profile-photos');
