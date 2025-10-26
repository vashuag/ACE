import { NextRequest, NextResponse } from 'next/server'
import { contactDb } from '@/lib/database'
import { sendContactEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json()

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

        // Save to database
        const contact = await contactDb.create(name, email, subject, message)

    // Send email notification
    try {
      await sendContactEmail(name, email, subject, message)
    } catch (emailError) {
      console.error('Email sending failed:', emailError)
      // Don't fail the contact form if email fails
    }

    return NextResponse.json(
      { message: 'Contact form submitted successfully', contact },
      { status: 201 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}