export const createContactEmailTemplate = (name: string, email: string, subject: string, message: string) => {
  return {
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
  }
}

export const createAutoReplyTemplate = (name: string, subject: string, message: string) => {
  return {
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
  }
}
