import nodemailer from "nodemailer";

let transporter: nodemailer.Transporter | null = null;

export function getTransporter(): nodemailer.Transporter {
  if (!transporter) {
    const user = process.env.GMAIL_USER;
    const pass = process.env.GMAIL_APP_PASSWORD;

    if (!user || !pass) {
      throw new Error("Missing GMAIL_USER or GMAIL_APP_PASSWORD environment variables");
    }

    transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user, pass },
    });
  }
  return transporter;
}
