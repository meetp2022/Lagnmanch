import { NextRequest, NextResponse } from "next/server";
import { getTransporter } from "@/lib/email/transporter";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  let name: string, email: string, message: string;

  try {
    const body = await request.json();
    name = body.name?.trim();
    email = body.email?.trim();
    message = body.message?.trim();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (!name || !email || !message) {
    return NextResponse.json({ error: "All fields are required" }, { status: 400 });
  }

  try {
    const transporter = getTransporter();

    await transporter.sendMail({
      from: `"LagnaManch Contact" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      replyTo: email,
      subject: `[Contact] Message from ${name}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
          <h2 style="color:#800020;">New Contact Message — LagnaManch</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Name</td><td style="padding:8px;border-bottom:1px solid #eee;">${name}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Email</td><td style="padding:8px;border-bottom:1px solid #eee;">${email}</td></tr>
          </table>
          <h3 style="color:#800020;margin-top:20px;">Message</h3>
          <p style="background:#f5f5f5;padding:16px;border-radius:8px;white-space:pre-wrap;">${message}</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to send contact email:", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
