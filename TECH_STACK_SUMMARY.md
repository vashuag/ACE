# Agent to Environment - Complete Tech Stack & Database Summary

## 🚀 **Tech Stack Overview**

### **Frontend Framework**
- **Next.js 15** - React framework with App Router
- **React 18** - UI library
- **TypeScript** - Type safety and better development experience

### **Styling & UI**
- **Tailwind CSS 4** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
  - `@radix-ui/react-dialog`
  - `@radix-ui/react-dropdown-menu`
  - `@radix-ui/react-slot`
  - `@radix-ui/react-toast`
- **Lucide React** - Beautiful icon library
- **Framer Motion** - Animation library

### **3D Graphics (Available but not currently used)**
- **Three.js** - 3D graphics library
- **React Three Fiber** - React renderer for Three.js
- **React Three Drei** - Useful helpers for R3F

### **Authentication**
- **NextAuth.js v5** - Authentication framework
- **bcryptjs** - Password hashing

### **Database**
- **PostgreSQL** (via Supabase) - Primary database
- **pg** - PostgreSQL client for Node.js
- **Direct SQL queries** - No ORM, using raw SQL for better performance

### **Email Service**
- **Resend** - Email delivery service
- **Custom HTML email templates** - Professional email designs

### **Deployment**
- **Vercel** - Serverless deployment platform
- **Supabase** - Database hosting and management

### **Development Tools**
- **ESLint** - Code linting
- **TypeScript** - Static type checking

---

## 📊 **Database Schema**

### **Core Tables**

#### 1. **User Table**
```sql
CREATE TABLE "User" (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    name TEXT,
    email TEXT UNIQUE NOT NULL,
    password TEXT,
    image TEXT,
    "emailVerified" TIMESTAMP,
    "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL,
    "updatedAt" TIMESTAMP DEFAULT NOW() NOT NULL
);
```
**Used by:** Authentication, User management

#### 2. **Account Table** (OAuth)
```sql
CREATE TABLE "Account" (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    "userId" TEXT NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
    type TEXT NOT NULL,
    provider TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    -- OAuth fields...
    UNIQUE(provider, "providerAccountId")
);
```
**Used by:** NextAuth OAuth providers

#### 3. **Session Table**
```sql
CREATE TABLE "Session" (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    "sessionToken" TEXT UNIQUE NOT NULL,
    "userId" TEXT NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
    expires TIMESTAMP NOT NULL
);
```
**Used by:** NextAuth session management

#### 4. **VerificationToken Table**
```sql
CREATE TABLE "VerificationToken" (
    identifier TEXT NOT NULL,
    token TEXT UNIQUE NOT NULL,
    expires TIMESTAMP NOT NULL,
    PRIMARY KEY (identifier, token)
);
```
**Used by:** NextAuth email verification

### **Application Tables**

#### 5. **PasswordResetToken Table**
```sql
CREATE TABLE "PasswordResetToken" (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    email TEXT NOT NULL,
    token TEXT UNIQUE NOT NULL,
    expires TIMESTAMP NOT NULL,
    "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL
);
```
**Used by:** Password reset functionality

#### 6. **Contact Table**
```sql
CREATE TABLE "Contact" (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL
);
```
**Used by:** Contact form submissions

#### 7. **Newsletter Table**
```sql
CREATE TABLE "Newsletter" (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    email TEXT UNIQUE NOT NULL,
    "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL
);
```
**Used by:** Newsletter subscriptions

### **Chat System Tables**

#### 8. **Conversation Table**
```sql
CREATE TABLE "Conversation" (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    title TEXT NOT NULL,
    "userId" TEXT NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
    "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL,
    "updatedAt" TIMESTAMP DEFAULT NOW() NOT NULL
);
```
**Used by:** Chat conversations management

#### 9. **Message Table**
```sql
CREATE TABLE "Message" (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    content TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
    "conversationId" TEXT NOT NULL REFERENCES "Conversation"(id) ON DELETE CASCADE,
    "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL
);
```
**Used by:** Chat messages storage

---

## 🔌 **API Endpoints**

### **Authentication APIs**
- **`POST /api/auth/signup`** - User registration
  - Uses: `User` table
  - Features: Password hashing, email verification, welcome email

- **`POST /api/auth/reset-password`** - Password reset request
  - Uses: `User`, `PasswordResetToken` tables
  - Features: Token generation, reset email

- **`GET/POST /api/auth/[...nextauth]`** - NextAuth endpoints
  - Uses: `User`, `Account`, `Session`, `VerificationToken` tables
  - Features: Login, logout, session management

### **Application APIs**
- **`POST /api/contact`** - Contact form submission
  - Uses: `Contact` table
  - Features: Form validation, admin notification email

- **`POST /api/newsletter`** - Newsletter subscription
  - Uses: `Newsletter` table
  - Features: Duplicate prevention, confirmation email

### **Testing APIs**
- **`GET /api/test-db`** - Database connection test
  - Uses: Direct database query
  - Features: Connection health check

- **`POST /api/test-signup`** - User creation test
  - Uses: `User` table
  - Features: Debug user creation

### **Chat APIs** (Server Actions)
- **`createConversation(title)`** - Create new chat
  - Uses: `Conversation` table

- **`getConversations()`** - Get user's chats
  - Uses: `Conversation` table

- **`addMessage(conversationId, content, role)`** - Add message
  - Uses: `Message` table

- **`deleteConversation(conversationId)`** - Delete chat
  - Uses: `Conversation` table (cascade deletes messages)

---

## 📧 **Email Templates**

### **Email Types**
1. **Welcome Email** - Sent on user signup
2. **Contact Notification** - Sent to admin on contact form submission
3. **Newsletter Confirmation** - Sent on newsletter subscription
4. **Password Reset** - Sent for password reset requests

### **Email Features**
- **HTML Templates** - Professional, responsive design
- **Resend Integration** - Reliable email delivery
- **Test Mode** - Development emails redirected to admin
- **Production Mode** - Real emails to users

---

## 🛠 **Database Operations**

### **User Operations**
- `findByEmail(email)` - Find user by email
- `create(name, email, password)` - Create new user
- `findById(id)` - Find user by ID

### **Contact Operations**
- `create(name, email, subject, message)` - Create contact submission

### **Newsletter Operations**
- `findByEmail(email)` - Check if email exists
- `create(email)` - Create newsletter subscription

### **Password Reset Operations**
- `create(email, token, expires)` - Create reset token
- `findByToken(token)` - Find valid token
- `deleteByEmail(email)` - Delete existing tokens

### **Conversation Operations**
- `findByUserId(userId)` - Get user's conversations
- `create(userId, title)` - Create new conversation
- `findById(id)` - Find conversation by ID

### **Message Operations**
- `findByConversationId(conversationId)` - Get conversation messages
- `create(conversationId, content, role)` - Create new message

---

## 🔧 **Key Features**

### **Authentication System**
- ✅ User registration with email verification
- ✅ Secure password hashing (bcrypt)
- ✅ Password reset functionality
- ✅ Session management
- ✅ OAuth ready (Account table)

### **Email System**
- ✅ Professional HTML templates
- ✅ Welcome emails
- ✅ Contact notifications
- ✅ Newsletter confirmations
- ✅ Password reset emails

### **Chat System**
- ✅ Multiple conversations per user
- ✅ Message history
- ✅ Role-based messages (user/assistant/system)
- ✅ Conversation management

### **Database Features**
- ✅ UUID primary keys
- ✅ Automatic timestamps
- ✅ Foreign key constraints
- ✅ Cascade deletes
- ✅ Performance indexes
- ✅ Connection pooling (Supabase)

### **Deployment Features**
- ✅ Vercel serverless deployment
- ✅ Environment variable configuration
- ✅ Production-ready database setup
- ✅ Error handling and logging

---

## 🚀 **Production Ready Features**

- **Scalable Architecture** - Serverless functions
- **Database Optimization** - Direct SQL queries, indexes
- **Email Reliability** - Resend service integration
- **Security** - Password hashing, input validation
- **Error Handling** - Comprehensive error catching
- **Logging** - Detailed operation logging
- **Testing** - Built-in test endpoints
- **Documentation** - Complete setup guides

This is a **production-ready, modern web application** built with the latest technologies and best practices!
