# Deployment Guide for Agent to Environment

## Quick Deploy to Vercel (FREE)

### 1. Prepare Your Code
```bash
# Make sure your code is ready
git add .
git commit -m "Ready for deployment"
git push origin main
```

### 2. Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click "New Project"
4. Import your repository
5. Deploy automatically!

### 3. Environment Variables
Add these in Vercel dashboard:
```
DATABASE_URL=your_postgresql_url
RESEND_API_KEY=your_resend_key
NEXTAUTH_SECRET=your_secret
NEXTAUTH_URL=https://your-app.vercel.app
```

### 4. Database Setup
For production database, use:
- **Railway PostgreSQL** (Free tier available)
- **Supabase** (Free tier available)
- **PlanetScale** (Free tier available)

## Custom Domain Setup

### 1. Buy Domain
- **Namecheap:** agenttoenvironment.com (~$8-12/year)
- **Cloudflare:** agenttoenvironment.com (~$9/year)

### 2. Connect to Vercel
1. In Vercel dashboard, go to your project
2. Click "Domains"
3. Add your custom domain
4. Update DNS records as instructed

### 3. Update Email Configuration
Update `src/lib/email-config.ts`:
```typescript
production: {
  from: 'Agent to Environment <welcome@agenttoenvironment.com>',
  supportEmail: 'support@agenttoenvironment.com',
  testMode: false,
}
```

## Total Cost Breakdown
- **Vercel Hosting:** FREE
- **Custom Domain:** ~$10/year
- **Database:** FREE (Railway/Supabase free tier)
- **Email Service:** FREE (Resend free tier)
- **Total:** ~$10/year

## Production Checklist
- [ ] Deploy to Vercel
- [ ] Set up production database
- [ ] Configure environment variables
- [ ] Buy custom domain
- [ ] Update DNS records
- [ ] Verify domain with Resend
- [ ] Test all functionality
- [ ] Update email configuration

## Alternative: Railway (All-in-One)
- **Cost:** $5/month
- **Includes:** App + Database + Domain
- **Setup:** Connect GitHub repo, deploy automatically
- **Good for:** Simple deployment with everything included
