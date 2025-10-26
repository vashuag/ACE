# Database Connection Fix Guide

## Issue: ENOTFOUND Error on Vercel

The error `getaddrinfo ENOTFOUND db.etbrrgeoeqrugyzzxaod.supabase.co` indicates that Vercel cannot resolve your Supabase database hostname.

## Steps to Fix:

### 1. Verify Your Supabase Database URL

Go to your Supabase dashboard:
1. Navigate to **Settings** → **Database**
2. Copy the **Connection string** from the "Connection pooling" section
3. It should look like: `postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres`

### 2. Set Environment Variables in Vercel

1. Go to your Vercel dashboard
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add these variables:

```
DATABASE_URL = postgresql://postgres:G@nesh9198@db.etbrrgeoeqrugyzzxaod.supabase.co:5432/postgres
NEXTAUTH_SECRET = your-secret-key-here
NEXTAUTH_URL = https://your-app.vercel.app
RESEND_API_KEY = your-resend-api-key
NEXT_PUBLIC_APP_URL = https://your-app.vercel.app
```

### 3. Test Database Connection

After deploying, visit: `https://your-app.vercel.app/api/test-db`

This will test the database connection and show detailed error messages.

### 4. Create Database Tables

Run the SQL from `database-schema.sql` in your Supabase SQL Editor:

1. Go to Supabase dashboard
2. Navigate to **SQL Editor**
3. Copy and paste the contents of `database-schema.sql`
4. Click **Run**

### 5. Common Issues and Solutions

#### Issue: Connection String Format
- Make sure to use the **Connection pooling** URL, not the direct connection URL
- The URL should include `?pgbouncer=true` for better serverless performance

#### Issue: SSL Configuration
- Supabase requires SSL connections
- The code is already configured to handle this

#### Issue: Network Access
- Check if your Supabase project allows connections from Vercel
- Go to **Settings** → **Database** → **Network Restrictions**
- Make sure it's set to allow all connections or add Vercel's IP ranges

### 6. Alternative Connection String Format

If the above doesn't work, try this format:
```
postgresql://postgres:G@nesh9198@db.etbrrgeoeqrugyzzxaod.supabase.co:5432/postgres?pgbouncer=true&connection_limit=1
```

### 7. Debug Steps

1. Check Vercel function logs for detailed error messages
2. Use the `/api/test-db` endpoint to test connectivity
3. Verify all environment variables are set correctly
4. Ensure database tables exist in Supabase

## Expected Result

After following these steps:
- Database connection should work
- Signup/login should function properly
- All API endpoints should work correctly
- Email functionality should work

## Need Help?

If you're still having issues:
1. Check the Vercel function logs
2. Test the `/api/test-db` endpoint
3. Verify your Supabase project is active and accessible
4. Make sure your database password is correct
