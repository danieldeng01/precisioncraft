import { NextResponse } from "next/server";
import { db } from "@/db";
import { newsletterSubscribers } from "@/db/schema";
import { newsletterSchema } from "@/lib/validation";
import { sendNewsletterWelcome } from "@/lib/email";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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

  const parsed = newsletterSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error:
          parsed.error.issues[0]?.message ??
          "Please enter a valid email address.",
      },
      { status: 422 },
    );
  }

  const email = parsed.data.email.toLowerCase();

  try {
    await db
      .insert(newsletterSubscribers)
      .values({ email })
      .onConflictDoNothing();
  } catch (error) {
    console.error("Failed to store newsletter subscription:", error);
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please try again shortly." },
      { status: 500 },
    );
  }

  // Best-effort welcome email (Resend).
  try {
    await sendNewsletterWelcome(email);
  } catch (error) {
    console.error("[email] Newsletter welcome failed:", error);
  }

  return NextResponse.json({ ok: true });
}
