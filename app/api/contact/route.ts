import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

// Initialize Resend only if API key exists (prevents build errors)
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json()

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // Log the message (for debugging)
    console.log("📧 NEW CONTACT FORM SUBMISSION:")
    console.log("================================")
    console.log(`Name: ${name}`)
    console.log(`Email: ${email}`)
    console.log(`Subject: ${subject}`)
    console.log(`Message: ${message}`)
    console.log(`Time: ${new Date().toLocaleString()}`)
    console.log("================================")

    // Check if Resend is configured
    if (!resend) {
      return NextResponse.json(
        {
          error: "Email service is not configured. Please contact me directly at harshabasaheb1@gmail.com",
        },
        { status: 503 },
      )
    }

    let emailSentToOwner = false
    let autoReplySent = false

    // Send email to YOU (the owner) - This is the main notification
    try {
      console.log("🔄 Attempting to send email to owner...")

      const ownerEmailResult = await resend.emails.send({
        from: "Portfolio Contact <onboarding@resend.dev>", // Resend's verified domain
        to: "harshabasaheb1@gmail.com", // Your email - make sure this is correct
        replyTo: email, // So you can reply directly to the person
        subject: `🚀 New Portfolio Contact: ${subject}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
            <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
              <h2 style="color: #333; margin-bottom: 20px; border-bottom: 2px solid #8b5cf6; padding-bottom: 10px;">
                🚀 New Contact Form Submission
              </h2>
              
              <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; border-left: 4px solid #3b82f6; margin-bottom: 20px;">
                <h3 style="color: #1e40af; margin-top: 0; margin-bottom: 10px;">📞 Contact Details</h3>
                <p style="margin: 5px 0;"><strong>Name:</strong> ${name}</p>
                <p style="margin: 5px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #3b82f6; text-decoration: none;">${email}</a></p>
                <p style="margin: 5px 0;"><strong>Subject:</strong> ${subject}</p>
                <p style="margin: 5px 0;"><strong>Time:</strong> ${new Date().toLocaleString()}</p>
              </div>
              
              <div style="margin-bottom: 30px;">
                <h3 style="color: #8b5cf6; margin-bottom: 10px;">💬 Message:</h3>
                <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #8b5cf6;">
                  <p style="margin: 0; line-height: 1.6; white-space: pre-wrap; color: #374151;">${message}</p>
                </div>
              </div>
              
              <div style="text-align: center; margin-top: 30px;">
                <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject)}" 
                   style="background-color: #8b5cf6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: 600;">
                  📧 Reply to ${name}
                </a>
              </div>
              
              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center;">
                <p style="color: #6b7280; font-size: 14px; margin: 0;">
                  Sent from your portfolio website contact form<br>
                  <strong>harshchavan.dev</strong>
                </p>
              </div>
            </div>
          </div>
        `,
        text: `
🚀 NEW CONTACT FORM SUBMISSION

Contact Details:
Name: ${name}
Email: ${email}
Subject: ${subject}
Time: ${new Date().toLocaleString()}

Message:
${message}

---
Reply directly to this email to respond to ${name}.
Sent from your portfolio website: harshchavan.dev
        `,
      })

      console.log("✅ Owner email sent successfully:", ownerEmailResult)
      emailSentToOwner = true
    } catch (ownerEmailError) {
      console.error("❌ Failed to send email to owner:", ownerEmailError)
      console.error("Error details:", JSON.stringify(ownerEmailError, null, 2))
    }

    // Send auto-reply to the person who contacted you
    try {
      console.log("🔄 Attempting to send auto-reply...")

      const autoReplyResult = await resend.emails.send({
        from: "Harsh Chavan <onboarding@resend.dev>",
        to: email,
        subject: "Thanks for reaching out! - Harsh Chavan",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
            <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
              <h2 style="color: #333; margin-bottom: 20px;">Hi ${name}! 👋</h2>
              
              <p style="line-height: 1.6; color: #555; margin-bottom: 20px;">
                Thank you for reaching out through my portfolio website! I've received your message about "<strong>${subject}</strong>" and I really appreciate you taking the time to contact me.
              </p>
              
              <p style="line-height: 1.6; color: #555; margin-bottom: 20px;">
                I'll review your message and get back to you as soon as possible, typically within 24-48 hours.
              </p>
              
              <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #8b5cf6; margin: 20px 0;">
                <h3 style="color: #8b5cf6; margin-top: 0; margin-bottom: 10px;">Your Message:</h3>
                <p style="margin: 0; line-height: 1.6; white-space: pre-wrap; color: #374151;">${message}</p>
              </div>
              
              <p style="line-height: 1.6; color: #555; margin-bottom: 20px;">
                In the meantime, feel free to check out my other projects on 
                <a href="https://github.com/Xyerophyte" style="color: #8b5cf6; text-decoration: none;">GitHub</a> or connect with me on 
                <a href="http://www.linkedin.com/in/harsh-chavan-369522316/" style="color: #8b5cf6; text-decoration: none;">LinkedIn</a>.
              </p>
              
              <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 0; line-height: 1.6; color: #1e40af;">
                  <strong>📧 Contact Info:</strong><br>
                  Email: harshabasaheb1@gmail.com<br>
                  Phone: +971 502808641<br>
                  Location: Dubai, UAE
                </p>
              </div>
              
              <p style="line-height: 1.6; color: #555;">
                Best regards,<br>
                <strong>Harsh Chavan</strong><br>
                <em>Full Stack Developer</em>
              </p>
              
              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center;">
                <p style="color: #666; font-size: 12px; margin: 0;">
                  This is an automated response from harshchavan.dev
                </p>
              </div>
            </div>
          </div>
        `,
        text: `
Hi ${name}!

Thank you for reaching out through my portfolio website! I've received your message about "${subject}" and I really appreciate you taking the time to contact me.

I'll review your message and get back to you as soon as possible, typically within 24-48 hours.

Your Message:
${message}

In the meantime, feel free to check out my other projects on GitHub (https://github.com/Xyerophyte) or connect with me on LinkedIn (http://www.linkedin.com/in/harsh-chavan-369522316/).

Contact Info:
Email: harshabasaheb1@gmail.com
Phone: +971 502808641
Location: Dubai, UAE

Best regards,
Harsh Chavan
Full Stack Developer

---
This is an automated response from harshchavan.dev
        `,
      })

      console.log("✅ Auto-reply sent successfully:", autoReplyResult)
      autoReplySent = true
    } catch (autoReplyError) {
      console.error("❌ Failed to send auto-reply:", autoReplyError)
      console.error("Auto-reply error details:", JSON.stringify(autoReplyError, null, 2))
    }

    // Return appropriate response based on what succeeded
    if (emailSentToOwner && autoReplySent) {
      return NextResponse.json(
        {
          message: "Message sent successfully! I'll get back to you soon. Check your email for a confirmation.",
          status: "success",
        },
        { status: 200 },
      )
    } else if (emailSentToOwner) {
      return NextResponse.json(
        {
          message: "Message sent successfully! I'll get back to you soon.",
          status: "partial_success",
        },
        { status: 200 },
      )
    } else if (autoReplySent) {
      return NextResponse.json(
        {
          message: "Message received! I'll get back to you soon. Check your email for a confirmation.",
          status: "partial_success",
        },
        { status: 200 },
      )
    } else {
      // Both failed, but don't show error to user
      return NextResponse.json(
        {
          message: "Message received! I'll get back to you soon.",
          status: "received",
        },
        { status: 200 },
      )
    }
  } catch (error) {
    console.error("❌ Contact form error:", error)
    return NextResponse.json(
      {
        error: "Internal server error. Please try again later.",
        details: process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500 },
    )
  }
}
