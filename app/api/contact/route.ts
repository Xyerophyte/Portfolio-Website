import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

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

    // Create a formatted message object for logging
    const contactMessage = {
      name,
      email,
      subject,
      message,
      timestamp: new Date().toISOString(),
      userAgent: request.headers.get("user-agent"),
      ip: request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown",
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

    // Send email using Resend
    try {
      const emailResult = await resend.emails.send({
        from: "Portfolio Contact <onboarding@resend.dev>", // Use Resend's default domain or your verified domain
        to: ["harshabasaheb1@gmail.com"], // Your email address
        subject: `Portfolio Contact: ${subject}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
            <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
              <h2 style="color: #333; margin-bottom: 20px; border-bottom: 2px solid #8b5cf6; padding-bottom: 10px;">
                🚀 New Contact Form Submission
              </h2>
              
              <div style="margin-bottom: 20px;">
                <h3 style="color: #8b5cf6; margin-bottom: 5px;">Contact Details:</h3>
                <p style="margin: 5px 0;"><strong>Name:</strong> ${name}</p>
                <p style="margin: 5px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #8b5cf6;">${email}</a></p>
                <p style="margin: 5px 0;"><strong>Subject:</strong> ${subject}</p>
              </div>
              
              <div style="margin-bottom: 20px;">
                <h3 style="color: #8b5cf6; margin-bottom: 10px;">Message:</h3>
                <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; border-left: 4px solid #8b5cf6;">
                  <p style="margin: 0; line-height: 1.6; white-space: pre-wrap;">${message}</p>
                </div>
              </div>
              
              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
                <p style="color: #666; font-size: 12px; margin: 0;">
                  <strong>Sent:</strong> ${new Date().toLocaleString()}<br>
                  <strong>From:</strong> Portfolio Website Contact Form
                </p>
              </div>
              
              <div style="margin-top: 20px; text-align: center;">
                <a href="mailto:${email}" style="background-color: #8b5cf6; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
                  Reply to ${name}
                </a>
              </div>
            </div>
          </div>
        `,
        // Also send a plain text version
        text: `
New Contact Form Submission

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

Sent: ${new Date().toLocaleString()}
From: Portfolio Website Contact Form
        `,
      })

      console.log("✅ Email sent successfully:", emailResult)

      // Send auto-reply to the person who contacted you
      await resend.emails.send({
        from: "Harsh Chavan <onboarding@resend.dev>",
        to: [email],
        subject: "Thanks for reaching out! - Harsh Chavan",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
            <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
              <h2 style="color: #333; margin-bottom: 20px;">Hi ${name}! 👋</h2>
              
              <p style="line-height: 1.6; color: #555;">
                Thank you for reaching out through my portfolio website! I've received your message about "<strong>${subject}</strong>" and I really appreciate you taking the time to contact me.
              </p>
              
              <p style="line-height: 1.6; color: #555;">
                I'll review your message and get back to you as soon as possible, typically within 24-48 hours. 
              </p>
              
              <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; border-left: 4px solid #8b5cf6; margin: 20px 0;">
                <h3 style="color: #8b5cf6; margin-top: 0;">Your Message:</h3>
                <p style="margin: 0; line-height: 1.6; white-space: pre-wrap;">${message}</p>
              </div>
              
              <p style="line-height: 1.6; color: #555;">
                In the meantime, feel free to check out my other projects on 
                <a href="https://github.com/Xyerophyte" style="color: #8b5cf6;">GitHub</a> or connect with me on 
                <a href="http://www.linkedin.com/in/harsh-chavan-369522316/" style="color: #8b5cf6;">LinkedIn</a>.
              </p>
              
              <p style="line-height: 1.6; color: #555;">
                Best regards,<br>
                <strong>Harsh Chavan</strong><br>
                Full Stack Developer
              </p>
              
              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center;">
                <p style="color: #666; font-size: 12px; margin: 0;">
                  This is an automated response. Please don't reply to this email directly.
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

Best regards,
Harsh Chavan
Full Stack Developer

---
This is an automated response. Please don't reply to this email directly.
        `,
      })

      return NextResponse.json(
        {
          message: "Message sent successfully! I'll get back to you soon. Check your email for a confirmation.",
        },
        { status: 200 },
      )
    } catch (emailError) {
      console.error("❌ Email sending failed:", emailError)

      // Still return success to user, but log the error
      return NextResponse.json(
        {
          message: "Message received! I'll get back to you soon.",
          warning: "Email delivery may be delayed.",
        },
        { status: 200 },
      )
    }
  } catch (error) {
    console.error("❌ Contact form error:", error)
    return NextResponse.json({ error: "Internal server error. Please try again later." }, { status: 500 })
  }
}
