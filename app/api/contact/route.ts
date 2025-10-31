import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, phone, message } = body || {};

    const fullName = `${firstName || ""} ${lastName || ""}`.trim();

    // Basic validation
    if (!email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // SMTP configuration via environment variables
    const host = process.env.SMTP_HOST;
    const port = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587;
    const secure = process.env.SMTP_SECURE === "true"; // true for 465
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;

    if (!host) {
      return NextResponse.json(
        { error: "SMTP not configured. Set SMTP_HOST in environment." },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: user && pass ? { user, pass } : undefined,
    });

    const to = process.env.CONTACT_TO_EMAIL || "tattarinet@gmail.com";
    const from = process.env.SMTP_FROM || user || `no-reply@${host}`;

    const subject = `Website contact: ${fullName || email}`;
    const text = `Name: ${fullName}\nEmail: ${email}\nPhone: ${
      phone || "N/A"
    }\n\n${message}`;

    await transporter.sendMail({
      from,
      to,
      subject,
      text,
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("/api/contact error:", err);
    return NextResponse.json(
      { error: err?.message || String(err) },
      { status: 500 }
    );
  }
}
