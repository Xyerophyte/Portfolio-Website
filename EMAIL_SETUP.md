# 📧 Email Setup Guide

This guide will help you configure your contact form to actually send emails using Resend API.

## 🚀 Quick Setup (5 minutes)

### Step 1: Get Resend API Key

1. **Sign up at [Resend.com](https://resend.com)**
   - Go to https://resend.com
   - Click "Get Started"
   - Sign up with your email: `harshabasaheb1@gmail.com`

2. **Create API Key**
   - After signing up, go to "API Keys" in your dashboard
   - Click "Create API Key"
   - Give it a name like "Portfolio Contact Form"
   - Copy the API key (starts with `re_`)

### Step 2: Add Environment Variable

1. **Create `.env.local` file** in your project root:
   ```bash
   # Create the file
   touch .env.local
   ```

2. **Add your API key** to `.env.local`:
   ```env
   RESEND_API_KEY=re_your_actual_api_key_here
   ```

### Step 3: Deploy to Vercel

1. **Add environment variable to Vercel:**
   - Go to your Vercel dashboard
   - Select your portfolio project
   - Go to "Settings" → "Environment Variables"
   - Add:
     - **Name**: `RESEND_API_KEY`
     - **Value**: Your Resend API key
   - Deploy again

## ✅ What Happens When Someone Contacts You

### 📧 Email to You (Owner)
- **From**: Portfolio Contact <onboarding@resend.dev>
- **To**: harshabasaheb1@gmail.com
- **Subject**: 🚀 New Portfolio Contact: [their subject]
- **Content**: Professional email with their details and message
- **Reply-to**: Their email address (so you can reply directly)

### 📧 Auto-Reply to Them
- **From**: Harsh Chavan <onboarding@resend.dev>
- **To**: Their email address
- **Subject**: Thanks for reaching out! - Harsh Chavan
- **Content**: Professional auto-reply with your contact info

## 🔧 Advanced Configuration

### Custom Domain (Optional)
If you want to send emails from your own domain:

1. **Add your domain to Resend**
   - Go to Resend dashboard → "Domains"
   - Add your domain (e.g., harshchavan.dev)
   - Follow DNS setup instructions

2. **Update the API route** to use your domain:
   ```typescript
   from: "Harsh Chavan <contact@harshchavan.dev>"
   ```

### Email Templates
The email templates are in `app/api/contact/route.ts`. You can customize:
- Email styling and layout
- Auto-reply message
- Contact information
- Professional branding

## 🧪 Testing

### Local Testing
1. Add your API key to `.env.local`
2. Run `pnpm dev`
3. Fill out the contact form
4. Check your email for the test message

### Production Testing
1. Deploy with environment variable
2. Test the live contact form
3. Verify emails are delivered

## 🔒 Security Notes

- ✅ API key is stored securely in environment variables
- ✅ Email validation prevents spam
- ✅ Rate limiting prevents abuse
- ✅ Professional email templates
- ✅ Auto-reply confirms receipt

## 📊 Email Features

### ✅ What's Included
- **Professional HTML emails** with your branding
- **Plain text fallback** for email clients
- **Reply-to functionality** for easy responses
- **Contact information** in auto-replies
- **Error handling** and user feedback
- **Spam protection** and validation

### 🎨 Email Design
- **Responsive design** works on all devices
- **Professional styling** with your colors
- **Clear typography** and spacing
- **Call-to-action buttons** for easy replies
- **Contact information** prominently displayed

## 🚨 Troubleshooting

### Common Issues

**"Failed to send message"**
- Check if RESEND_API_KEY is set correctly
- Verify the API key is valid
- Check Vercel environment variables

**"Email not received"**
- Check spam folder
- Verify email address is correct
- Test with a different email

**"API key invalid"**
- Generate a new API key in Resend
- Update environment variables
- Redeploy to Vercel

## 📞 Support

If you need help:
1. Check Resend documentation: https://resend.com/docs
2. Verify your API key is working
3. Test with a simple email first

---

**Your contact form will be fully functional once you complete these steps!** 🎉 