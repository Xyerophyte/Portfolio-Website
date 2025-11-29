import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

// Initialize Resend only if API key exists (prevents build errors)
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

// Rate limiting store (in-memory, for production use Redis or similar)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

// Sanitize input to prevent XSS attacks
function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '') // Remove angle brackets to prevent HTML injection
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+\s*=/gi, '') // Remove event handlers like onclick=
    .trim()
    .slice(0, 5000) // Limit length
}

// Enhanced email validation (RFC 5322 compliant)
function isValidEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
  return emailRegex.test(email) && email.length <= 254
}

// Rate limiting: max 3 requests per 15 minutes per IP
function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const record = rateLimitStore.get(ip)

  if (!record || now > record.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + 15 * 60 * 1000 })
    return true
  }

  if (record.count >= 3) {
    return false
  }

  record.count++
  return true
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting check
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      )
    }

    const body = await request.json()
    const { name, email, subject, message } = body

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // Type checking
    if (typeof name !== 'string' || typeof email !== 'string' || typeof subject !== 'string' || typeof message !== 'string') {
      return NextResponse.json({ error: "Invalid input types" }, { status: 400 })
    }

    // Enhanced email validation
    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // Sanitize all inputs
    const sanitizedName = sanitizeInput(name)
    const sanitizedEmail = email.toLowerCase().trim()
    const sanitizedSubject = sanitizeInput(subject)
    const sanitizedMessage = sanitizeInput(message)

    // Additional validation
    if (sanitizedName.length < 2 || sanitizedName.length > 100) {
      return NextResponse.json({ error: "Name must be between 2 and 100 characters" }, { status: 400 })
    }

    if (sanitizedSubject.length < 3 || sanitizedSubject.length > 200) {
      return NextResponse.json({ error: "Subject must be between 3 and 200 characters" }, { status: 400 })
    }

    if (sanitizedMessage.length < 10 || sanitizedMessage.length > 5000) {
      return NextResponse.json({ error: "Message must be between 10 and 5000 characters" }, { status: 400 })
    }

    // Log only in development mode
    if (process.env.NODE_ENV === 'development') {
      console.log("📧 NEW CONTACT FORM SUBMISSION:")
      console.log("================================")
      console.log(`Name: ${sanitizedName}`)
      console.log(`Email: ${sanitizedEmail}`)
      console.log(`Subject: ${sanitizedSubject}`)
      console.log(`Time: ${new Date().toLocaleString()}`)
      console.log("================================")
    }

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
      if (process.env.NODE_ENV === 'development') {
        console.log("🔄 Attempting to send email to owner...")
      }

      const ownerEmailResult = await resend.emails.send({
        from: "Portfolio Contact <onboarding@resend.dev>", // Resend's verified domain
        to: "harshabasaheb1@gmail.com", // Your email - make sure this is correct
        replyTo: sanitizedEmail, // So you can reply directly to the person
        subject: `🚀 New Portfolio Contact: ${sanitizedSubject}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
            <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
              <h2 style="color: #333; margin-bottom: 20px; border-bottom: 2px solid #8b5cf6; padding-bottom: 10px;">
                🚀 New Contact Form Submission
              </h2>
              
              <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; border-left: 4px solid #3b82f6; margin-bottom: 20px;">
                <h3 style="color: #1e40af; margin-top: 0; margin-bottom: 10px;">📞 Contact Details</h3>
                <p style="margin: 5px 0;"><strong>Name:</strong> ${sanitizedName}</p>
                <p style="margin: 5px 0;"><strong>Email:</strong> <a href="mailto:${sanitizedEmail}" style="color: #3b82f6; text-decoration: none;">${sanitizedEmail}</a></p>
                <p style="margin: 5px 0;"><strong>Subject:</strong> ${sanitizedSubject}</p>
                <p style="margin: 5px 0;"><strong>Time:</strong> ${new Date().toLocaleString()}</p>
              </div>

              <div style="margin-bottom: 30px;">
                <h3 style="color: #8b5cf6; margin-bottom: 10px;">💬 Message:</h3>
                <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #8b5cf6;">
                  <p style="margin: 0; line-height: 1.6; white-space: pre-wrap; color: #374151;">${sanitizedMessage}</p>
                </div>
              </div>

              <div style="text-align: center; margin-top: 30px;">
                <a href="mailto:${sanitizedEmail}?subject=Re: ${encodeURIComponent(sanitizedSubject)}"
                   style="background-color: #8b5cf6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: 600;">
                  📧 Reply to ${sanitizedName}
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
Name: ${sanitizedName}
Email: ${sanitizedEmail}
Subject: ${sanitizedSubject}
Time: ${new Date().toLocaleString()}

Message:
${sanitizedMessage}

---
Reply directly to this email to respond to ${sanitizedName}.
Sent from your portfolio website: harshchavan.dev
        `,
      })

      if (process.env.NODE_ENV === 'development') {
        console.log("✅ Owner email sent successfully")
      }
      emailSentToOwner = true
    } catch (ownerEmailError) {
      // Log detailed error only in development
      if (process.env.NODE_ENV === 'development') {
        console.error("❌ Failed to send email to owner:", ownerEmailError)
      }
    }

    // Send auto-reply to the person who contacted you
    try {
      if (process.env.NODE_ENV === 'development') {
        console.log("🔄 Attempting to send auto-reply...")
      }

      const autoReplyResult = await resend.emails.send({
        from: "Harsh Chavan <onboarding@resend.dev>",
        to: sanitizedEmail,
        subject: "Thanks for reaching out! - Harsh Chavan",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
            <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
              <h2 style="color: #333; margin-bottom: 20px;">Hi ${sanitizedName}! 👋</h2>

              <p style="line-height: 1.6; color: #555; margin-bottom: 20px;">
                Thank you for reaching out through my portfolio website! I've received your message about "<strong>${sanitizedSubject}</strong>" and I really appreciate you taking the time to contact me.
              </p>

              <p style="line-height: 1.6; color: #555; margin-bottom: 20px;">
                I'll review your message and get back to you as soon as possible, typically within 24-48 hours.
              </p>

              <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #8b5cf6; margin: 20px 0;">
                <h3 style="color: #8b5cf6; margin-top: 0; margin-bottom: 10px;">Your Message:</h3>
                <p style="margin: 0; line-height: 1.6; white-space: pre-wrap; color: #374151;">${sanitizedMessage}</p>
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
Hi ${sanitizedName}!

Thank you for reaching out through my portfolio website! I've received your message about "${sanitizedSubject}" and I really appreciate you taking the time to contact me.

I'll review your message and get back to you as soon as possible, typically within 24-48 hours.

Your Message:
${sanitizedMessage}

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

      if (process.env.NODE_ENV === 'development') {
        console.log("✅ Auto-reply sent successfully")
      }
      autoReplySent = true
    } catch (autoReplyError) {
      // Log detailed error only in development
      if (process.env.NODE_ENV === 'development') {
        console.error("❌ Failed to send auto-reply:", autoReplyError)
      }
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
    // Log detailed error only in development
    if (process.env.NODE_ENV === 'development') {
      console.error("❌ Contact form error:", error)
    }

    return NextResponse.json(
      {
        error: "An unexpected error occurred. Please try again or contact me directly at harshabasaheb1@gmail.com",
      },
      { status: 500 },
    )
  }
}
