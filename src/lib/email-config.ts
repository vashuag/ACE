// Email configuration for different environments
const EMAIL_CONFIG = {
  development: {
    from: 'Agent to Environment <onboarding@resend.dev>',
    supportEmail: 'vashuag9@gmail.com', // Use your verified email for testing
    testMode: true, // Enable test mode for development
  },
  production: {
    from: 'Agent to Environment <onboarding@resend.dev>', // Using Resend's default domain for now
    supportEmail: 'vashuag9@gmail.com', // Your verified email for admin notifications
    testMode: true, // Keep test mode until domain is verified
  }
}

// Get current environment
const isProduction = process.env.NODE_ENV === 'production'
const config = isProduction ? EMAIL_CONFIG.production : EMAIL_CONFIG.development

export const EMAIL_SETTINGS = {
  from: config.from,
  supportEmail: config.supportEmail,
  testMode: config.testMode,
  // Add more email settings here as needed
}

// Instructions for domain verification:
/*
To use your custom domain (agenttoenvironment.com) in production:

1. Go to https://resend.com/domains
2. Add your domain: agenttoenvironment.com
3. Add the required DNS records:
   - TXT record for domain verification
   - MX record for email routing
   - SPF record for authentication
   - DKIM record for security

4. Once verified, update EMAIL_CONFIG.production.from to use your domain
5. Deploy your application

For now, using onboarding@resend.dev works perfectly for development!
*/
