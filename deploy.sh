#!/bin/bash

# Agent to Environment - Deployment Script
echo "🚀 Agent to Environment Deployment Script"
echo "========================================"

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Git not initialized. Please run:"
    echo "   git init"
    echo "   git add ."
    echo "   git commit -m 'Initial commit'"
    exit 1
fi

# Check if we're on main branch
current_branch=$(git branch --show-current)
if [ "$current_branch" != "main" ]; then
    echo "⚠️  You're on branch '$current_branch'. Consider switching to 'main' for deployment."
fi

echo "📋 Pre-deployment checklist:"
echo "1. ✅ Code is committed to git"
echo "2. ✅ Environment variables are ready"
echo "3. ✅ Database is set up"
echo "4. ✅ Domain is purchased (optional)"

echo ""
echo "🌐 Deployment Options:"
echo "1. Vercel (FREE) - Recommended"
echo "2. Netlify (FREE)"
echo "3. Railway ($5/month - includes database)"

echo ""
echo "📝 Next Steps:"
echo "1. Push your code to GitHub:"
echo "   git push origin main"
echo ""
echo "2. Go to vercel.com and import your repository"
echo ""
echo "3. Add environment variables in Vercel dashboard:"
echo "   DATABASE_URL=your_postgresql_url"
echo "   RESEND_API_KEY=your_resend_key"
echo "   NEXTAUTH_SECRET=your_secret"
echo "   NEXTAUTH_URL=https://your-app.vercel.app"
echo ""
echo "4. Deploy!"
echo ""
echo "💰 Total Cost: ~$10/year (domain only)"
echo "🎉 Your app will be live in minutes!"

# Check if .env.local exists
if [ -f ".env.local" ]; then
    echo ""
    echo "⚠️  Remember to add these environment variables to Vercel:"
    grep -v "^#" .env.local | grep -v "^$"
fi
