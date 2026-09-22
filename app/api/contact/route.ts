import { NextResponse } from "next/server";
import { Resend } from "resend";

// Simple in-memory rate limiter: max 5 requests per 10 minutes per IP
interface RateLimitRecord {
  count: number;
  resetTime: number;
}

const rateLimitMap = new Map<string, RateLimitRecord>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  // Clean up expired entries periodically if map grows large
  if (rateLimitMap.size > 1000) {
    rateLimitMap.forEach((value, key) => {
      if (now > value.resetTime) {
        rateLimitMap.delete(key);
      }
    });
  }

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW_MS,
    });
    return false;
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  record.count += 1;
  return false;
}

// Sanitize strings to prevent HTML/script injection in email clients
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Simple email regex for validation
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  try {
    // 1. Rate Limiting Check
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0].trim() : req.headers.get("x-real-ip") || "unknown";

    if (ip !== "unknown" && isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again in a few minutes." },
        { status: 429 }
      );
    }

    // 2. Parse JSON body
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON request body." },
        { status: 400 }
      );
    }

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "Invalid request payload." },
        { status: 400 }
      );
    }

    const { name, email, subject, message, honeypot } = body as Record<string, unknown>;

    // 3. Honeypot Check (Spam Bot Protection)
    // If the honeypot field is filled out, silently succeed without sending email
    if (typeof honeypot === "string" && honeypot.trim().length > 0) {
      return NextResponse.json(
        { success: true, message: "Message sent successfully!" },
        { status: 200 }
      );
    }

    // 4. Validate Inputs
    // Name validation
    if (typeof name !== "string" || !name.trim()) {
      return NextResponse.json(
        { error: "Name is required." },
        { status: 400 }
      );
    }
    if (name.trim().length > 100) {
      return NextResponse.json(
        { error: "Name must be 100 characters or fewer." },
        { status: 400 }
      );
    }

    // Email validation
    if (typeof email !== "string" || !email.trim()) {
      return NextResponse.json(
        { error: "Email is required." },
        { status: 400 }
      );
    }
    const cleanEmail = email.trim();
    if (cleanEmail.length > 254 || !EMAIL_REGEX.test(cleanEmail)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // Message validation
    if (typeof message !== "string" || !message.trim()) {
      return NextResponse.json(
        { error: "Message is required." },
        { status: 400 }
      );
    }
    if (message.trim().length > 2000) {
      return NextResponse.json(
        { error: "Message must be 2000 characters or fewer." },
        { status: 400 }
      );
    }

    // Subject validation (optional)
    let cleanSubject = "";
    if (typeof subject === "string" && subject.trim()) {
      if (subject.trim().length > 200) {
        return NextResponse.json(
          { error: "Subject must be 200 characters or fewer." },
          { status: 400 }
        );
      }
      cleanSubject = subject.trim();
    }

    const cleanName = name.trim();
    const cleanMessage = message.trim();

    // 5. Environment variable check
    const apiKey = process.env.RESEND_API_KEY;
    const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL;
    const senderEmail = process.env.CONTACT_SENDER_EMAIL || "Portfolio Contact <onboarding@resend.dev>";

    if (!apiKey || !receiverEmail) {
      console.warn(
        "[Contact API Dev Fallback] RESEND_API_KEY or CONTACT_RECEIVER_EMAIL not set. Message logged:",
        { name: cleanName, email: cleanEmail, subject: cleanSubject, message: cleanMessage }
      );
      return NextResponse.json(
        { success: true, message: "Message dispatched successfully! (Dev mode fallback)" },
        { status: 200 }
      );
    }

    // 6. Initialize Resend client
    const resend = new Resend(apiKey);

    // Sanitize values for safe HTML rendering
    const safeName = escapeHtml(cleanName);
    const safeEmail = escapeHtml(cleanEmail);
    const safeSubject = cleanSubject ? escapeHtml(cleanSubject) : "General Inquiry";
    const safeMessageHtml = escapeHtml(cleanMessage).replace(/\n/g, "<br/>");

    const emailSubject = `Portfolio Contact: ${cleanSubject ? cleanSubject : cleanName}`;

    // Plaintext fallback
    const textContent = [
      `New message from portfolio contact form:`,
      `----------------------------------------`,
      `Name: ${cleanName}`,
      `Email: ${cleanEmail}`,
      `Subject: ${cleanSubject || "General Inquiry"}`,
      `----------------------------------------`,
      `Message:`,
      cleanMessage,
    ].join("\n");

    // HTML email template
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${emailSubject}</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f9fafb; margin: 0; padding: 24px; color: #111827;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
    <div style="background-color: #111827; padding: 20px 24px; color: #ffffff;">
      <h2 style="margin: 0; font-size: 18px; font-weight: 600; letter-spacing: -0.02em;">New Contact Form Message</h2>
    </div>
    <div style="padding: 24px;">
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <tr>
          <td style="padding: 8px 0; font-size: 14px; color: #6b7280; width: 90px; vertical-align: top;"><strong>From:</strong></td>
          <td style="padding: 8px 0; font-size: 14px; color: #111827;">${safeName}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-size: 14px; color: #6b7280; vertical-align: top;"><strong>Email:</strong></td>
          <td style="padding: 8px 0; font-size: 14px; color: #111827;">
            <a href="mailto:${safeEmail}" style="color: #2563eb; text-decoration: underline;">${safeEmail}</a>
          </td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-size: 14px; color: #6b7280; vertical-align: top;"><strong>Subject:</strong></td>
          <td style="padding: 8px 0; font-size: 14px; color: #111827;">${safeSubject}</td>
        </tr>
      </table>

      <div style="border-top: 1px solid #e5e7eb; padding-top: 16px;">
        <p style="margin: 0 0 8px 0; font-size: 14px; font-weight: 600; color: #374151;">Message:</p>
        <div style="background-color: #f3f4f6; padding: 16px; border-radius: 6px; font-size: 14px; line-height: 1.6; color: #1f2937; word-break: break-word;">
          ${safeMessageHtml}
        </div>
      </div>

      <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #f3f4f6; font-size: 12px; color: #9ca3af; text-align: center;">
        You can reply directly to this email to respond to ${safeName} (${safeEmail}).
      </div>
    </div>
  </div>
</body>
</html>
    `.trim();

    // 7. Send primary notification email via Resend
    const { error: sendError } = await resend.emails.send({
      from: senderEmail,
      to: [receiverEmail],
      replyTo: cleanEmail,
      subject: emailSubject,
      text: textContent,
      html: htmlContent,
    });

    if (sendError) {
      console.error("[Contact API] Resend error:", sendError);
      return NextResponse.json(
        { error: "Failed to send message. Please try again later." },
        { status: 500 }
      );
    }

    // 8. Optionally send auto-reply confirmation to the visitor
    // Note: If using onboarding@resend.dev without a verified domain, Resend will only
    // deliver to the account owner. We wrap this in a non-blocking try/catch so auto-reply
    // failures never block or error out the main contact form submission.
    try {
      // Only attempt auto-reply if a custom sender domain is configured
      if (!senderEmail.includes("onboarding@resend.dev")) {
        await resend.emails.send({
          from: senderEmail,
          to: [cleanEmail],
          subject: `Thank you for reaching out, ${cleanName}!`,
          text: `Hi ${cleanName},\n\nThank you for getting in touch. I've received your message regarding "${cleanSubject || "your inquiry"}" and will get back to you as soon as possible.\n\nBest regards,\nDeep`,
          html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f9fafb; margin: 0; padding: 24px; color: #111827;">
  <div style="max-width: 540px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 24px;">
    <h3 style="margin-top: 0; font-size: 16px; color: #111827;">Thanks for reaching out!</h3>
    <p style="font-size: 14px; line-height: 1.6; color: #374151;">
      Hi ${safeName},<br/><br/>
      Thank you for contacting me. I have received your message regarding <strong>${safeSubject}</strong> and will get back to you as soon as possible.
    </p>
    <p style="font-size: 14px; line-height: 1.6; color: #6b7280; margin-bottom: 0;">
      Best regards,<br/>
      Deep
    </p>
  </div>
</body>
</html>
          `.trim(),
        });
      }
    } catch (autoReplyErr) {
      // Auto-reply failure is non-fatal
      console.warn("[Contact API] Auto-reply was skipped or failed:", autoReplyErr);
    }

    return NextResponse.json(
      { success: true, message: "Message sent successfully!" },
      { status: 200 }
    );
  } catch (err) {
    console.error("[Contact API] Unexpected error:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again later." },
      { status: 500 }
    );
  }
}
