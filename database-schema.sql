-- Database schema for Agent to Environment
-- Run this in your Supabase SQL editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE IF NOT EXISTS "User" (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    name TEXT,
    email TEXT UNIQUE NOT NULL,
    password TEXT,
    image TEXT,
    "emailVerified" TIMESTAMP,
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NOW()
);

-- Accounts table (for OAuth)
CREATE TABLE IF NOT EXISTS "Account" (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    "userId" TEXT NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
    type TEXT NOT NULL,
    provider TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    scope TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    UNIQUE(provider, "providerAccountId")
);

-- Sessions table
CREATE TABLE IF NOT EXISTS "Session" (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    "sessionToken" TEXT UNIQUE NOT NULL,
    "userId" TEXT NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
    expires TIMESTAMP NOT NULL
);

-- Verification tokens
CREATE TABLE IF NOT EXISTS "VerificationToken" (
    identifier TEXT NOT NULL,
    token TEXT UNIQUE NOT NULL,
    expires TIMESTAMP NOT NULL,
    PRIMARY KEY (identifier, token)
);

-- Password reset tokens
CREATE TABLE IF NOT EXISTS "PasswordResetToken" (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    email TEXT NOT NULL,
    token TEXT UNIQUE NOT NULL,
    expires TIMESTAMP NOT NULL,
    "createdAt" TIMESTAMP DEFAULT NOW()
);

-- Contact form submissions
CREATE TABLE IF NOT EXISTS "Contact" (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    "createdAt" TIMESTAMP DEFAULT NOW()
);

-- Newsletter subscriptions
CREATE TABLE IF NOT EXISTS "Newsletter" (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    email TEXT UNIQUE NOT NULL,
    "createdAt" TIMESTAMP DEFAULT NOW()
);

-- Conversations
CREATE TABLE IF NOT EXISTS "Conversation" (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    title TEXT NOT NULL,
    "userId" TEXT NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NOW()
);

-- Messages
CREATE TABLE IF NOT EXISTS "Message" (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    content TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
    "conversationId" TEXT NOT NULL REFERENCES "Conversation"(id) ON DELETE CASCADE,
    "createdAt" TIMESTAMP DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS "User_email_idx" ON "User"(email);
CREATE INDEX IF NOT EXISTS "Account_userId_idx" ON "Account"("userId");
CREATE INDEX IF NOT EXISTS "Session_userId_idx" ON "Session"("userId");
CREATE INDEX IF NOT EXISTS "PasswordResetToken_email_idx" ON "PasswordResetToken"(email);
CREATE INDEX IF NOT EXISTS "PasswordResetToken_token_idx" ON "PasswordResetToken"(token);
CREATE INDEX IF NOT EXISTS "Conversation_userId_idx" ON "Conversation"("userId");
CREATE INDEX IF NOT EXISTS "Message_conversationId_idx" ON "Message"("conversationId");
