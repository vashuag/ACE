# EnviroAgent - The Agent That Shapes Your World for Success

An AI agent that interacts with your environment to increase the chances of goal completion. Transform your goals into reality with intelligent AI that adapts your world for success.

## 🧠 Vision

To build intelligent AI agents that not only understand human goals — but actively interact with and adapt the user's environment to help them achieve those goals faster, smarter, and more efficiently.

> "Instead of humans adapting to technology, EnviroAgent makes technology adapt to humans."

## 🚀 What is EnviroAgent?

EnviroAgent is an AI-driven system that bridges the gap between human intent and the environment we live in — digital or physical.

Unlike traditional assistants (like Siri, Alexa, or ChatGPT) that only respond to commands, EnviroAgent acts — it dynamically reshapes your digital ecosystem, devices, and workflows to optimize the conditions for achieving your goal.

Think of it as your Goal Execution Companion — an AI that doesn't just remind you what to do, but actually creates the conditions that help you do it.

## 🚀 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + Custom Components
- **Authentication**: NextAuth.js v5 (Beta)
- **Database**: PostgreSQL with Prisma ORM
- **Email Service**: Resend
- **Icons**: Lucide React

## ✨ Features

- 🔐 **Complete Authentication System**
  - User registration and login
  - Password hashing with bcrypt
  - Session management
  - Protected routes

- 📧 **Email Functionality**
  - Welcome emails for new users
  - Contact form notifications
  - Newsletter subscription
  - Email templates

- 🎨 **Modern UI/UX**
  - Responsive design
  - Dark/light mode support
  - Beautiful landing page
  - Professional components

- 📱 **Essential Pages**
  - Landing page with hero section
  - About page with company info
  - Services page with pricing
  - Contact page with form
  - User dashboard
  - Authentication pages

- 🛠 **Developer Experience**
  - TypeScript for type safety
  - ESLint for code quality
  - Modern build tools
  - Hot reloading

## 🏃‍♂️ Quick Start

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- Resend API key (for email functionality)

### Installation

1. **Clone and install dependencies**
   ```bash
   cd vashu_startp
   npm install
   ```

2. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/vashu_startup?schema=public"
   
   # NextAuth
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key-here"
   
   # Email (Resend)
   RESEND_API_KEY="your-resend-api-key-here"
   
   # App
   NEXT_PUBLIC_APP_URL="http://localhost:3000"
   ```

3. **Set up the database**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Run database migrations
   npx prisma db push
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   │   ├── auth/          # Authentication endpoints
│   │   ├── contact/       # Contact form endpoint
│   │   └── newsletter/    # Newsletter subscription
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # User dashboard
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   ├── services/          # Services page
│   └── layout.tsx         # Root layout
├── components/            # Reusable components
│   ├── ui/               # Base UI components
│   ├── navbar.tsx        # Navigation component
│   ├── footer.tsx        # Footer component
│   └── providers.tsx     # Context providers
└── lib/                  # Utility functions
    ├── auth.ts           # NextAuth configuration
    ├── prisma.ts         # Database client
    ├── email.ts          # Email service
    └── utils.ts          # Helper functions
```

## 🔧 Configuration

### Database Setup

1. **Install PostgreSQL** on your system
2. **Create a database** named `vashu_startup`
3. **Update the DATABASE_URL** in your `.env.local` file
4. **Run migrations** with `npx prisma db push`

### Email Setup

1. **Sign up for Resend** at [resend.com](https://resend.com)
2. **Get your API key** from the dashboard
3. **Add it to your `.env.local`** file
4. **Update email addresses** in the email templates

### Authentication

The app uses NextAuth.js with credentials provider. Users can:
- Register with email and password
- Sign in with their credentials
- Access protected routes like the dashboard
- Sign out securely

## 🎨 Customization

### Styling
- Modify `src/app/globals.css` for global styles
- Update Tailwind configuration in `tailwind.config.js`
- Customize component styles in individual files

### Content
- Update company information in pages
- Modify email templates in `src/lib/email.ts`
- Change branding and colors throughout the app

### Features
- Add new pages in the `src/app` directory
- Create new API routes in `src/app/api`
- Extend the database schema in `prisma/schema.prisma`

## 🚀 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
2. **Connect to Vercel**
3. **Add environment variables**
4. **Deploy automatically**

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 📝 API Endpoints

- `POST /api/auth/signup` - User registration
- `POST /api/contact` - Contact form submission
- `POST /api/newsletter` - Newsletter subscription
- `GET/POST /api/auth/[...nextauth]` - NextAuth endpoints

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

If you encounter any issues or have questions:

1. Check the documentation
2. Search existing issues
3. Create a new issue with details
4. Contact the development team

---

**Built with ❤️ by the EnviroAgent Team**