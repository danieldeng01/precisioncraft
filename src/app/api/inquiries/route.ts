import { NextResponse } from "next/server";
import { db } from "@/db";
import { inquiries } from "@/db/schema";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+()\d][\d\s().-]{6,19}$/;

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body." },
      { status: 400 },
    );
  }

  const data = body as Record<string, unknown>;
  const name = String(data.name ?? "").trim();
  const email = String(data.email ?? "").trim();
  const phone = String(data.phone ?? "").trim();
  const service = String(data.service ?? "general").trim().slice(0, 80);
  const message = String(data.message ?? "").trim();
  const type = data.type === "contact" ? "contact" : "quote";

  const errors: Record<string, string> = {};
  if (name.length < 2) errors.name = "Please tell us your name.";
  if (!EMAIL_RE.test(email)) errors.email = "Please enter a valid email address.";
  if (!PHONE_RE.test(phone)) errors.phone = "Please enter a valid phone number.";
  if (message.length < 10)
    errors.message = "Please describe your project in at least 10 characters.";

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  try {
    await db.insert(inquiries).values({
      type,
      name: name.slice(0, 120),
      email: email.slice(0, 160),
      phone: phone.slice(0, 32),
      service,
      message: message.slice(0, 4000),
    });
  } catch (error) {
    console.error("Failed to store inquiry:", error);
    return NextResponse.json(
      {
        ok: false,
        error:
          "We could not save your request right now. Please call or WhatsApp us instead.",
      },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
