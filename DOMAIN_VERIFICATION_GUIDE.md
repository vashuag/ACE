# Domain Verification Guide for Resend

## 🚨 Current Issue
Your production emails are failing because Resend's free tier only allows sending emails to your verified email address (`vashuag9@gmail.com`). To send emails to any recipient, you need to verify your domain.

## 🎯 Solution: Verify Your Domain

### Step 1: Access Resend Dashboard
1. Go to [resend.com](https://resend.com)
2. Log in to your account
3. Navigate to **"Domains"** section

### Step 2: Add Your Domain
1. Click **"Add Domain"**
2. Enter your domain: `agenttoenvironment.com` (or whatever domain you own)
3. Click **"Add Domain"**

### Step 3: Configure DNS Records
Resend will provide you with DNS records to add. Typically these include:

#### TXT Record (Domain Verification)
```
Type: TXT
Name: @ (or your domain)
Value: resend-verification=your-verification-code
TTL: 3600
```

#### MX Record (Email Routing)
```
Type: MX
Name: @
Value: feedback-smtp.us-east-1.amazonses.com
Priority: 10
TTL: 3600
```

#### CNAME Record (DKIM)
```
Type: CNAME
Name: resend._domainkey
Value: resend._domainkey.resend.com
TTL: 3600
```

#### TXT Record (SPF)
```
Type: TXT
Name: @
Value: v=spf1 include:amazonses.com ~all
TTL: 3600
```

### Step 4: Add DNS Records
1. Go to your domain registrar (GoDaddy, Namecheap, Cloudflare, etc.)
2. Access DNS management
3. Add all the records provided by Resend
4. Save changes

### Step 5: Verify Domain
1. Return to Resend dashboard
2. Click **"Verify"** next to your domain
3. Wait for verification (can take up to 48 hours, usually much faster)

### Step 6: Update Email Configuration
Once verified, update your email config:

```typescript
// src/lib/email-config.ts
production: {
  from: 'Agent to Environment <noreply@agenttoenvironment.com>',
  supportEmail: 'vashuag9@gmail.com',
  testMode: false,
}
```

## 🚀 Alternative: Use Vercel Domain

If you don't have a custom domain, you can use your Vercel domain:

1. Go to Resend domains
2. Add domain: `ace-gold-pi.vercel.app`
3. Add the DNS records (you'll need to add them via Vercel's DNS settings)
4. Verify the domain

## 📧 Test Your Setup

After verification, test with:
- Newsletter subscription
- User signup
- Contact form
- Password reset

All emails should now be delivered to the correct recipients!

## 🔧 Troubleshooting

### DNS Propagation
- DNS changes can take 5 minutes to 48 hours
- Use `dig` or online DNS checkers to verify propagation
- Try verification multiple times if it fails initially

### Common Issues
- **Wrong DNS records**: Double-check the exact values from Resend
- **TTL too high**: Set TTL to 300-3600 seconds for faster propagation
- **Missing records**: Ensure all required records are added

### Support
- Resend documentation: [resend.com/docs](https://resend.com/docs)
- Resend support: Available in dashboard

---

**Once your domain is verified, your production emails will work perfectly! 🎉**
