import { NextResponse } from "next/server";
import { db } from "@/db";
import { inquiries } from "@/db/schema";
import { quoteSchema, type QuoteFormValues } from "@/lib/validation";
import { notifyNewInquiry, sendInquiryAutoReply } from "@/lib/email";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type FieldErrors = Partial<Record<keyof QuoteFormValues, string>>;

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

  const payload = body as Record<string, unknown>;
  const type = payload.type === "contact" ? "contact" : "quote";

  const parsed = quoteSchema.safeParse(payload);
  if (!parsed.success) {
    const errors: FieldErrors = {};
    for (const [field, messages] of Object.entries(
      parsed.error.flatten().fieldErrors,
    )) {
      if (messages?.[0]) errors[field as keyof QuoteFormValues] = messages[0];
    }
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  const inquiry = parsed.data;

  try {
    await db.insert(inquiries).values({ type, ...inquiry });
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

  // Best-effort email notifications (Resend) — never blocks the response.
  const [notifyResult, replyResult] = await Promise.allSettled([
    notifyNewInquiry({ ...inquiry, type }),
    sendInquiryAutoReply(inquiry),
  ]);
  for (const result of [notifyResult, replyResult]) {
    if (result.status === "rejected") {
      console.error("[email] Inquiry notification failed:", result.reason);
    }
  }

  return NextResponse.json({ ok: true });
}
