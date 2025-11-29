import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

// Initialize Resend only if API key exists (prevents build errors)
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

export async function POST(request: NextRequest) {
  try {
    // Check if Resend is configured
    if (!resend || !process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { 
          error: "RESEND_API_KEY not configured",
          message: "Please add your Resend API key to environment variables"
        }, 
        { status: 503 }
      )
    }

    // Send a test email
    const result = await resend.emails.send({
      from: "Portfolio Test <onboarding@resend.dev>",
      to: "harshabasaheb1@gmail.com",
      subject: "🧪 Portfolio Contact Form Test",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333;">✅ Contact Form Test Successful!</h2>
          <p>Your portfolio contact form is now configured and working correctly.</p>
          <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
          <p><strong>API Key:</strong> ${process.env.RESEND_API_KEY ? "✅ Configured" : "❌ Missing"}</p>
          <hr>
          <p style="color: #666; font-size: 14px;">
            This is a test email from your portfolio website contact form.
          </p>
        </div>
      `,
      text: `
✅ Contact Form Test Successful!

Your portfolio contact form is now configured and working correctly.

Time: ${new Date().toLocaleString()}
API Key: ${process.env.RESEND_API_KEY ? "✅ Configured" : "❌ Missing"}

This is a test email from your portfolio website contact form.
      `,
    })

    console.log("✅ Test email sent successfully:", result)

    return NextResponse.json(
      {
        message: "Test email sent successfully! Check your inbox.",
        status: "success",
        result: result,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("❌ Test email failed:", error)

    // Get error message safely
    const errorMessage = error instanceof Error ? error.message : "Unknown error"

    return NextResponse.json(
      {
        error: "Failed to send test email",
        details: process.env.NODE_ENV === "development" ? errorMessage : "Check your API key and try again",
        status: "error",
      },
      { status: 500 },
    )
  }
}
