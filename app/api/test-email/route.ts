import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    console.log("🧪 Testing email configuration...")
    console.log("RESEND_API_KEY exists:", !!process.env.RESEND_API_KEY)
    console.log("RESEND_API_KEY length:", process.env.RESEND_API_KEY?.length || 0)

    // Test email to yourself
    const result = await resend.emails.send({
      from: "Test <onboarding@resend.dev>",
      to: "harshabasaheb1@gmail.com",
      subject: "🧪 Portfolio Contact Form Test",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>✅ Email Test Successful!</h2>
          <p>If you're reading this, your Resend configuration is working correctly.</p>
          <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
          <p><strong>API Key:</strong> ${process.env.RESEND_API_KEY?.substring(0, 10)}...</p>
        </div>
      `,
      text: `
Email Test Successful!

If you're reading this, your Resend configuration is working correctly.
Time: ${new Date().toLocaleString()}
      `,
    })

    console.log("✅ Test email result:", result)

    return NextResponse.json({
      success: true,
      message: "Test email sent successfully!",
      result: result,
    })
  } catch (error) {
    console.error("❌ Test email failed:", error)

    return NextResponse.json(
      {
        success: false,
        error: error.message,
        details: error,
      },
      { status: 500 },
    )
  }
}
