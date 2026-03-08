-- LagnaManch Location Enhancement Migration
-- Run this in Supabase SQL Editor AFTER the auth migration

-- Add new location columns
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS district TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS taluka TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS pincode TEXT;

-- Create index for district-based filtering
CREATE INDEX IF NOT EXISTS idx_profiles_district ON profiles (district);
