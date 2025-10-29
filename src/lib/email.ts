import { Resend } from 'resend'
import { EMAIL_SETTINGS } from './email-config'

const resend = new Resend(process.env.RESEND_API_KEY)

// Welcome Email Template
export async function sendWelcomeEmail(email: string, name: string) {
  try {
    // In test mode, send to your verified email instead
    const recipientEmail = EMAIL_SETTINGS.testMode ? 'vashuag9@gmail.com' : email
    const subject = EMAIL_SETTINGS.testMode ? `[TEST] Welcome to EnviroAgent! 🚀 (Original: ${email})` : 'Welcome to EnviroAgent! 🚀'
    
    const { data, error } = await resend.emails.send({
      from: EMAIL_SETTINGS.from,
      to: [recipientEmail],
      subject: subject,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to EnviroAgent</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); padding: 40px 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700;">
                🤖 EnviroAgent
              </h1>
              <p style="color: #e0e7ff; margin: 10px 0 0 0; font-size: 16px;">
                The Agent That Shapes Your World for Success
              </p>
            </div>

            <!-- Content -->
            <div style="padding: 40px 30px;">
              <h2 style="color: #1f2937; margin: 0 0 20px 0; font-size: 24px; font-weight: 600;">
                Welcome, ${name}! 🎉
              </h2>
              
              <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                Thank you for joining EnviroAgent! You're now part of the future where AI agents actively shape your environment to help you achieve your goals.
              </p>

              <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 30px 0;">
                <h3 style="color: #1f2937; margin: 0 0 15px 0; font-size: 18px;">
                  What's Next?
                </h3>
                <ul style="color: #4b5563; font-size: 14px; line-height: 1.6; margin: 0; padding-left: 20px;">
                  <li>Access your personalized dashboard</li>
                  <li>Set goals and let AI shape your environment</li>
                  <li>Experience adaptive environment control</li>
                  <li>Track progress with intelligent insights</li>
                </ul>
              </div>

              <div style="text-align: center; margin: 30px 0;">
                <a href="${process.env.NEXTAUTH_URL}/dashboard" 
                   style="display: inline-block; background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); color: #ffffff; text-decoration: none; padding: 15px 30px; border-radius: 8px; font-weight: 600; font-size: 16px;">
                  🚀 Get Started
                </a>
              </div>

              <p style="color: #6b7280; font-size: 14px; line-height: 1.6; margin: 30px 0 0 0;">
                If you have any questions, feel free to reach out to our support team. We're here to help you succeed!
              </p>
            </div>

            <!-- Footer -->
            <div style="background-color: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="color: #6b7280; font-size: 14px; margin: 0 0 10px 0;">
                © 2025 EnviroAgent. All rights reserved.
              </p>
              <p style="color: #9ca3af; font-size: 12px; margin: 0;">
                You received this email because you signed up for EnviroAgent.
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return { success: false, error }
    }

    console.log(`📧 Welcome email sent to ${email} for ${name}`)
    return { success: true, data }
  } catch (error) {
    console.error('Email sending failed:', error)
    return { success: false, error }
  }
}

// Contact Form Email Template
export async function sendContactEmail(name: string, email: string, subject: string, message: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: EMAIL_SETTINGS.from,
      to: [EMAIL_SETTINGS.supportEmail],
      subject: EMAIL_SETTINGS.testMode ? `[TEST] New Contact Form Submission: ${subject} (From: ${email})` : `New Contact Form Submission: ${subject}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Contact Form Submission</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); padding: 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700;">
                📧 New Contact Form Submission
              </h1>
            </div>

            <!-- Content -->
            <div style="padding: 30px;">
              <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                <h3 style="color: #1f2937; margin: 0 0 15px 0; font-size: 18px;">Contact Details</h3>
                <p style="color: #4b5563; font-size: 14px; margin: 5px 0;"><strong>Name:</strong> ${name}</p>
                <p style="color: #4b5563; font-size: 14px; margin: 5px 0;"><strong>Email:</strong> ${email}</p>
                <p style="color: #4b5563; font-size: 14px; margin: 5px 0;"><strong>Subject:</strong> ${subject}</p>
                <p style="color: #4b5563; font-size: 14px; margin: 5px 0;"><strong>Date:</strong> ${new Date().toLocaleString()}</p>
              </div>

              <div>
                <h3 style="color: #1f2937; margin: 0 0 15px 0; font-size: 18px;">Message</h3>
                <div style="background-color: #ffffff; border: 1px solid #e5e7eb; padding: 20px; border-radius: 8px;">
                  <p style="color: #4b5563; font-size: 14px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${message}</p>
                </div>
              </div>

              <div style="text-align: center; margin: 30px 0;">
                <a href="mailto:${email}" 
                   style="display: inline-block; background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; font-size: 14px;">
                  Reply to ${name}
                </a>
              </div>
            </div>

            <!-- Footer -->
            <div style="background-color: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="color: #6b7280; font-size: 12px; margin: 0;">
                This email was sent from the EnviroAgent contact form.
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return { success: false, error }
    }

    console.log(`📧 Contact form submission from ${name} (${email}): ${subject}`)
    return { success: true, data }
  } catch (error) {
    console.error('Email sending failed:', error)
    return { success: false, error }
  }
}

// Newsletter Confirmation Email Template
export async function sendNewsletterEmail(email: string) {
  try {
    // In test mode, send to your verified email instead
    const recipientEmail = EMAIL_SETTINGS.testMode ? 'vashuag9@gmail.com' : email
    const subject = EMAIL_SETTINGS.testMode ? `[TEST] Welcome to our Newsletter! 📰 (Original: ${email})` : 'Welcome to our Newsletter! 📰'
    
    const { data, error } = await resend.emails.send({
      from: EMAIL_SETTINGS.from,
      to: [recipientEmail],
      subject: subject,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Newsletter Subscription Confirmed</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); padding: 40px 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700;">
                📰 Newsletter Confirmed!
              </h1>
              <p style="color: #e0e7ff; margin: 10px 0 0 0; font-size: 16px;">
                You're now part of our AI community
              </p>
            </div>

            <!-- Content -->
            <div style="padding: 40px 30px;">
              <h2 style="color: #1f2937; margin: 0 0 20px 0; font-size: 24px; font-weight: 600;">
                Thank you for subscribing! 🎉
              </h2>
              
              <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                You've successfully subscribed to the EnviroAgent newsletter. You'll now receive:
              </p>

              <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 30px 0;">
                <h3 style="color: #1f2937; margin: 0 0 15px 0; font-size: 18px;">
                  What to Expect
                </h3>
                <ul style="color: #4b5563; font-size: 14px; line-height: 1.6; margin: 0; padding-left: 20px;">
                  <li>Latest AI agent developments and updates</li>
                  <li>Exclusive tips for maximizing your AI interactions</li>
                  <li>Early access to new features and capabilities</li>
                  <li>Industry insights and real-world use cases</li>
                  <li>Community highlights and success stories</li>
                </ul>
              </div>

              <div style="background-color: #ecfdf5; border: 1px solid #d1fae5; padding: 20px; border-radius: 8px; margin: 30px 0;">
                <p style="color: #065f46; font-size: 14px; margin: 0; font-weight: 600;">
                  💡 Pro Tip: Check your dashboard regularly to see new AI agent capabilities and start conversations that help you achieve your goals!
                </p>
              </div>

              <div style="text-align: center; margin: 30px 0;">
                <a href="${process.env.NEXTAUTH_URL}/dashboard" 
                   style="display: inline-block; background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); color: #ffffff; text-decoration: none; padding: 15px 30px; border-radius: 8px; font-weight: 600; font-size: 16px;">
                  🚀 Explore Your Dashboard
                </a>
              </div>

              <p style="color: #6b7280; font-size: 14px; line-height: 1.6; margin: 30px 0 0 0;">
                If you ever want to unsubscribe, you can do so at any time by clicking the unsubscribe link in our emails.
              </p>
            </div>

            <!-- Footer -->
            <div style="background-color: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="color: #6b7280; font-size: 14px; margin: 0 0 10px 0;">
                © 2025 EnviroAgent. All rights reserved.
              </p>
              <p style="color: #9ca3af; font-size: 12px; margin: 0;">
                You received this email because you subscribed to our newsletter.
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return { success: false, error }
    }

    console.log(`📧 Newsletter subscription confirmation sent to ${email}`)
    return { success: true, data }
  } catch (error) {
    console.error('Email sending failed:', error)
    return { success: false, error }
  }
}

// Password Reset Email Template
export async function sendPasswordResetEmail(email: string, resetToken: string) {
  try {
    const resetUrl = `${process.env.NEXTAUTH_URL}/auth/reset-password?token=${resetToken}`
    
    // In test mode, send to your verified email instead
    const recipientEmail = EMAIL_SETTINGS.testMode ? 'vashuag9@gmail.com' : email
    const subject = EMAIL_SETTINGS.testMode ? `[TEST] Reset Your Password - EnviroAgent (Original: ${email})` : 'Reset Your Password - EnviroAgent'
    
    const { data, error } = await resend.emails.send({
      from: EMAIL_SETTINGS.from,
      to: [recipientEmail],
      subject: subject,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Password Reset Request</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); padding: 40px 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700;">
                🔐 Password Reset
              </h1>
              <p style="color: #fecaca; margin: 10px 0 0 0; font-size: 16px;">
                Secure your EnviroAgent account
              </p>
            </div>

            <!-- Content -->
            <div style="padding: 40px 30px;">
              <h2 style="color: #1f2937; margin: 0 0 20px 0; font-size: 24px; font-weight: 600;">
                Reset Your Password
              </h2>
              
              <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                We received a request to reset your password for your EnviroAgent account. Click the button below to create a new password:
              </p>

              <div style="text-align: center; margin: 30px 0;">
                <a href="${resetUrl}" 
                   style="display: inline-block; background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); color: #ffffff; text-decoration: none; padding: 15px 30px; border-radius: 8px; font-weight: 600; font-size: 16px;">
                  🔑 Reset Password
                </a>
              </div>

              <div style="background-color: #fef2f2; border: 1px solid #fecaca; padding: 20px; border-radius: 8px; margin: 30px 0;">
                <p style="color: #991b1b; font-size: 14px; margin: 0; font-weight: 600;">
                  ⚠️ Security Notice: This link will expire in 1 hour for your security.
                </p>
              </div>

              <p style="color: #6b7280; font-size: 14px; line-height: 1.6; margin: 30px 0 0 0;">
                If you didn't request this password reset, please ignore this email. Your password will remain unchanged.
              </p>
            </div>

            <!-- Footer -->
            <div style="background-color: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="color: #6b7280; font-size: 14px; margin: 0 0 10px 0;">
                © 2025 EnviroAgent. All rights reserved.
              </p>
              <p style="color: #9ca3af; font-size: 12px; margin: 0;">
                This is an automated security email from EnviroAgent.
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return { success: false, error }
    }

    console.log(`📧 Password reset email sent to ${email}`)
    return { success: true, data }
  } catch (error) {
    console.error('Email sending failed:', error)
    return { success: false, error }
  }
}