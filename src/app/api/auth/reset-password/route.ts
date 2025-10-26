import { NextRequest, NextResponse } from 'next/server'
import { userDb, passwordResetDb } from '@/lib/database'
import { sendPasswordResetEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Check if user exists
    const user = await userDb.findByEmail(email)

    if (!user) {
      // Don't reveal if user exists or not for security
      return NextResponse.json(
        { message: 'If an account with that email exists, we sent a password reset link.' },
        { status: 200 }
      )
    }

    // Generate reset token using Math.random for simplicity
    const resetToken = Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join('')
    const expires = new Date(Date.now() + 60 * 60 * 1000) // 1 hour

    // Create new reset token (this will delete existing ones)
    await passwordResetDb.create(email, resetToken, expires)

    // Send reset email
    try {
      await sendPasswordResetEmail(email, resetToken)
    } catch (emailError) {
      console.error('Password reset email sending failed:', emailError)
      return NextResponse.json(
        { error: 'Failed to send reset email' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: 'If an account with that email exists, we sent a password reset link.' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Password reset error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
