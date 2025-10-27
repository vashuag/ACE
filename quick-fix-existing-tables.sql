-- Quick Fix Script for Existing Tables
-- Run this in Supabase SQL Editor to fix existing tables

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Fix User table
ALTER TABLE "User" ALTER COLUMN id SET DEFAULT uuid_generate_v4()::text;
ALTER TABLE "User" ALTER COLUMN "createdAt" SET DEFAULT NOW();
ALTER TABLE "User" ALTER COLUMN "updatedAt" SET DEFAULT NOW();

-- Fix Newsletter table
ALTER TABLE "Newsletter" ALTER COLUMN id SET DEFAULT uuid_generate_v4()::text;
ALTER TABLE "Newsletter" ALTER COLUMN "createdAt" SET DEFAULT NOW();

-- Fix Contact table
ALTER TABLE "Contact" ALTER COLUMN id SET DEFAULT uuid_generate_v4()::text;
ALTER TABLE "Contact" ALTER COLUMN "createdAt" SET DEFAULT NOW();

-- Fix PasswordResetToken table
ALTER TABLE "PasswordResetToken" ALTER COLUMN id SET DEFAULT uuid_generate_v4()::text;
ALTER TABLE "PasswordResetToken" ALTER COLUMN "createdAt" SET DEFAULT NOW();

-- Fix Conversation table (if it exists)
ALTER TABLE "Conversation" ALTER COLUMN id SET DEFAULT uuid_generate_v4()::text;
ALTER TABLE "Conversation" ALTER COLUMN "createdAt" SET DEFAULT NOW();
ALTER TABLE "Conversation" ALTER COLUMN "updatedAt" SET DEFAULT NOW();

-- Fix Message table (if it exists)
ALTER TABLE "Message" ALTER COLUMN id SET DEFAULT uuid_generate_v4()::text;
ALTER TABLE "Message" ALTER COLUMN "createdAt" SET DEFAULT NOW();

-- Test the fix
SELECT 'All tables updated successfully!' as status;
