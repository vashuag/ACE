// Simple PostgreSQL database connection for Vercel
import { Pool } from 'pg'

// Create a connection pool for better performance
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? {
    rejectUnauthorized: false
  } : false,
  max: 1, // Limit connections for serverless
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000, // Increased timeout
})

// Test database connection
export async function testConnection() {
  try {
    console.log('Testing database connection...')
    console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'Set' : 'Not set')
    const result = await query('SELECT NOW() as current_time')
    console.log('Database connection successful:', result.rows[0])
    return true
  } catch (error) {
    console.error('Database connection failed:', error)
    return false
  }
}

// Database query helper
export async function query(text: string, params?: any[]) {
  const client = await pool.connect()
  try {
    console.log('Executing query:', text.substring(0, 100) + '...')
    const result = await client.query(text, params)
    console.log('Query executed successfully')
    return result
  } catch (error) {
    console.error('Database query error:', error)
    throw error
  } finally {
    client.release()
  }
}

// User operations
export const userDb = {
  async findByEmail(email: string) {
    const result = await query('SELECT * FROM "User" WHERE email = $1', [email])
    return result.rows[0] || null
  },

  async create(name: string, email: string, hashedPassword: string) {
    const result = await query(
      'INSERT INTO "User" (name, email, password, "createdAt") VALUES ($1, $2, $3, NOW()) RETURNING id, name, email, "createdAt"',
      [name, email, hashedPassword]
    )
    return result.rows[0]
  },

  async findById(id: string) {
    const result = await query('SELECT * FROM "User" WHERE id = $1', [id])
    return result.rows[0] || null
  }
}

// Contact operations
export const contactDb = {
  async create(name: string, email: string, subject: string, message: string) {
    const result = await query(
      'INSERT INTO "Contact" (name, email, subject, message, "createdAt") VALUES ($1, $2, $3, $4, NOW()) RETURNING *',
      [name, email, subject, message]
    )
    return result.rows[0]
  }
}

// Newsletter operations
export const newsletterDb = {
  async findByEmail(email: string) {
    const result = await query('SELECT * FROM "Newsletter" WHERE email = $1', [email])
    return result.rows[0] || null
  },

  async create(email: string) {
    const result = await query(
      'INSERT INTO "Newsletter" (email, "createdAt") VALUES ($1, NOW()) RETURNING *',
      [email]
    )
    return result.rows[0]
  }
}

// Password reset operations
export const passwordResetDb = {
  async create(email: string, token: string, expires: Date) {
    // Delete existing tokens for this email
    await query('DELETE FROM "PasswordResetToken" WHERE email = $1', [email])
    
    const result = await query(
      'INSERT INTO "PasswordResetToken" (email, token, expires, "createdAt") VALUES ($1, $2, $3, NOW()) RETURNING *',
      [email, token, expires]
    )
    return result.rows[0]
  },

  async findByToken(token: string) {
    const result = await query(
      'SELECT * FROM "PasswordResetToken" WHERE token = $1 AND expires > NOW()',
      [token]
    )
    return result.rows[0] || null
  },

  async deleteByEmail(email: string) {
    await query('DELETE FROM "PasswordResetToken" WHERE email = $1', [email])
  }
}

// Conversation operations
export const conversationDb = {
  async findByUserId(userId: string) {
    const result = await query(
      'SELECT * FROM "Conversation" WHERE "userId" = $1 ORDER BY "createdAt" DESC',
      [userId]
    )
    return result.rows
  },

  async create(userId: string, title: string) {
    const result = await query(
      'INSERT INTO "Conversation" ("userId", title, "createdAt", "updatedAt") VALUES ($1, $2, NOW(), NOW()) RETURNING *',
      [userId, title]
    )
    return result.rows[0]
  },

  async findById(id: string) {
    const result = await query('SELECT * FROM "Conversation" WHERE id = $1', [id])
    return result.rows[0] || null
  }
}

// Message operations
export const messageDb = {
  async findByConversationId(conversationId: string) {
    const result = await query(
      'SELECT * FROM "Message" WHERE "conversationId" = $1 ORDER BY "createdAt" ASC',
      [conversationId]
    )
    return result.rows
  },

  async create(conversationId: string, content: string, role: 'user' | 'assistant' | 'system') {
    const result = await query(
      'INSERT INTO "Message" ("conversationId", content, role, "createdAt") VALUES ($1, $2, $3, NOW()) RETURNING *',
      [conversationId, content, role]
    )
    return result.rows[0]
  }
}
