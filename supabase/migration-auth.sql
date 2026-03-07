-- LagnaManch Auth Migration
-- Run this in Supabase SQL Editor AFTER the initial schema.sql

-- 1. Add user_id column to link profiles to auth.users
ALTER TABLE profiles
ADD COLUMN user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL;

-- 2. Create index for fast lookups by user_id
CREATE INDEX idx_profiles_user_id ON profiles (user_id);

-- 3. Update RLS policies

-- Drop old insert policy (was open to anyone)
DROP POLICY IF EXISTS "Anyone can create a profile" ON profiles;

-- Authenticated users can create a profile (linked to their account)
CREATE POLICY "Authenticated users can create a profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own profile
CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Users can read their own profile (regardless of status)
CREATE POLICY "Users can read their own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Keep: approved profiles remain publicly readable (existing policy)
-- "Approved profiles are publicly readable" — already exists from schema.sql
