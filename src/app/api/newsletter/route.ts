import { NextResponse } from "next/server";
import { db } from "@/db";
import { newsletterSubscribers } from "@/db/schema";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

  const email = String((body as Record<string, unknown>).email ?? "")
    .trim()
    .toLowerCase();

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { ok: false, error: "Please enter a valid email address." },
      { status: 422 },
    );
  }

  try {
    await db
      .insert(newsletterSubscribers)
      .values({ email: email.slice(0, 160) })
      .onConflictDoNothing();
  } catch (error) {
    console.error("Failed to store newsletter subscription:", error);
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please try again shortly." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
