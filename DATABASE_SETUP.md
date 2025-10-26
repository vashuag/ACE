# Database Setup for Production

## Option 1: Railway PostgreSQL (Recommended)
**Cost:** FREE tier available
**Setup:**
1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Create new project
4. Add PostgreSQL database
5. Copy connection string to Vercel environment variables

## Option 2: Supabase (Alternative)
**Cost:** FREE tier available
**Setup:**
1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Get connection string
4. Add to Vercel environment variables

## Option 3: PlanetScale (MySQL)
**Cost:** FREE tier available
**Note:** Requires schema changes (MySQL instead of PostgreSQL)

## Environment Variables for Vercel
```
DATABASE_URL=postgresql://username:password@host:port/database
RESEND_API_KEY=re_your_api_key
NEXTAUTH_SECRET=your_random_secret_key
NEXTAUTH_URL=https://your-app.vercel.app
NODE_ENV=production
```

## Database Migration
After setting up production database:
```bash
npx prisma migrate deploy
npx prisma generate
```
