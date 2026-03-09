import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { getTransporter } from "@/lib/email/transporter";
import { getWelcomeEmailHtml } from "@/lib/email/welcome-template";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  // Security: verify request comes from our own origin in production
  if (process.env.NODE_ENV === "production") {
    const headersList = await headers();
    const origin = headersList.get("origin");
    const host = headersList.get("host");
    const allowedOrigin = `https://${host}`;

    if (origin && origin !== allowedOrigin) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
  }

  // Parse and validate request body
  let email: string;
  let name: string | undefined;

  try {
    const body = await request.json();
    email = body.email;
    name = body.name;
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (!email || typeof email !== "string") {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
  }

  // Send the welcome email
  try {
    const transporter = getTransporter();
    const html = getWelcomeEmailHtml(name);

    await transporter.sendMail({
      from: `"LagnaManch" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "Welcome to LagnaManch \u2014 Kodi Patel Matrimonial Platform",
      html,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to send welcome email:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
