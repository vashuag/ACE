#!/bin/bash

# Vashu Startup - Development Setup Script

echo "🚀 Setting up Vashu Startup project..."

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "📝 Creating .env.local file..."
    cat > .env.local << EOF
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/vashu_startup?schema=public"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# Email (Resend)
RESEND_API_KEY="your-resend-api-key-here"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
EOF
    echo "✅ Created .env.local file. Please update the values with your actual credentials."
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Generate Prisma client
echo "🗄️  Generating Prisma client..."
npx prisma generate

echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Update .env.local with your actual database and API credentials"
echo "2. Set up your PostgreSQL database"
echo "3. Run: npm run dev"
echo "4. Open http://localhost:3000 in your browser"
echo ""
echo "For database setup:"
echo "- Create a PostgreSQL database named 'vashu_startup'"
echo "- Run: npx prisma db push (to create tables)"
echo "- Run: npx prisma studio (to view your database)"
