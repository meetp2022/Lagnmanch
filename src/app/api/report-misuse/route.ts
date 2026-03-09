import { NextRequest, NextResponse } from "next/server";
import { getTransporter } from "@/lib/email/transporter";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  let name: string, email: string, reportType: string, description: string;

  try {
    const body = await request.json();
    name = body.name;
    email = body.email;
    reportType = body.reportType;
    description = body.description;
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (!name || !email || !reportType || !description) {
    return NextResponse.json({ error: "All fields are required" }, { status: 400 });
  }

  try {
    const transporter = getTransporter();

    await transporter.sendMail({
      from: `"LagnaManch Reports" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      replyTo: email,
      subject: `[Report] ${reportType} — from ${name}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
          <h2 style="color:#800020;">Misuse Report — LagnaManch</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Name</td><td style="padding:8px;border-bottom:1px solid #eee;">${name}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Email</td><td style="padding:8px;border-bottom:1px solid #eee;">${email}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee;">Report Type</td><td style="padding:8px;border-bottom:1px solid #eee;">${reportType}</td></tr>
          </table>
          <h3 style="color:#800020;margin-top:20px;">Description</h3>
          <p style="background:#f5f5f5;padding:16px;border-radius:8px;white-space:pre-wrap;">${description}</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to send report email:", error);
    return NextResponse.json({ error: "Failed to send report" }, { status: 500 });
  }
}
