# Domain Setup Guide

## Option 1: Namecheap (Recommended)
**Cost:** ~$8-12/year
**Steps:**
1. Go to [namecheap.com](https://namecheap.com)
2. Search for "agenttoenvironment.com"
3. Add to cart and checkout
4. Go to domain management
5. Update nameservers to Vercel's

## Option 2: Cloudflare
**Cost:** ~$9/year
**Benefits:** Better DNS management, faster

## Option 3: Google Domains
**Cost:** ~$12/year
**Benefits:** Simple interface

## Domain Configuration in Vercel
1. In Vercel dashboard, go to your project
2. Click "Domains" tab
3. Add your custom domain
4. Follow DNS configuration instructions
5. Wait for SSL certificate (automatic)

## Email Domain Verification
After getting your domain:
1. Go to [resend.com/domains](https://resend.com/domains)
2. Add your domain (agenttoenvironment.com)
3. Add required DNS records:
   - TXT record for verification
   - MX record for email routing
   - SPF record for authentication
   - DKIM record for security
4. Wait for verification (usually 24-48 hours)

## Update Email Configuration
Once domain is verified, update `src/lib/email-config.ts`:
```typescript
production: {
  from: 'Agent to Environment <welcome@agenttoenvironment.com>',
  supportEmail: 'support@agenttoenvironment.com',
  testMode: false,
}
```
