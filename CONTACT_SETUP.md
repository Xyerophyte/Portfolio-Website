# Contact Form Setup Guide

## Current Status
Your contact form is working, but messages are currently only being logged to the console and saved to a local file (in development).

## Where Messages Go Right Now:
1. **Console Logs**: Check your Vercel deployment logs or terminal (in development)
2. **Local File**: `contact-messages.json` (development only)

## To Receive Emails, Choose One Option:

### Option 1: Resend (Recommended - Free tier available)
1. Sign up at [resend.com](https://resend.com)
2. Verify your domain or use their test domain
3. Get your API key
4. Add to your environment variables:
   \`\`\`
   RESEND_API_KEY=your_api_key_here
   \`\`\`
5. Uncomment the Resend code in `/app/api/contact/route.ts`

### Option 2: Gmail with Nodemailer
1. Enable 2-factor authentication on your Gmail
2. Generate an App Password: Google Account → Security → App passwords
3. Add to your environment variables:
   \`\`\`
   GMAIL_USER=your.email@gmail.com
   GMAIL_APP_PASSWORD=your_16_character_app_password
   \`\`\`
4. Install nodemailer: `npm install nodemailer`
5. Uncomment the Nodemailer code in `/app/api/contact/route.ts`

### Option 3: Other Email Services
- **SendGrid**: Similar to Resend, good free tier
- **AWS SES**: If you're using AWS
- **Mailgun**: Another popular option

## Testing
1. Fill out your contact form
2. Check the console logs in your deployment dashboard
3. In development, check the `contact-messages.json` file

## Environment Variables
Add these to your Vercel dashboard under Settings → Environment Variables:
- `RESEND_API_KEY` (if using Resend)
- `GMAIL_USER` and `GMAIL_APP_PASSWORD` (if using Gmail)

## Security Notes
- Never commit API keys to your repository
- Use environment variables for all sensitive data
- Consider adding rate limiting for production use
