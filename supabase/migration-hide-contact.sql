-- Add hide_contact column to profiles table
-- When true, phone_number and whatsapp_number are hidden from other users
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS hide_contact BOOLEAN DEFAULT false;
