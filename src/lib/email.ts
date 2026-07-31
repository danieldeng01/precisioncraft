import { Resend } from "resend";
import { site } from "@/lib/site";
import type { QuoteFormValues } from "@/lib/validation";

/**
 * Resend-powered notifications.
 *
 * Configure via environment variables (see .env):
 *   RESEND_API_KEY          — required; without it emails are skipped silently
 *   RESEND_FROM_EMAIL       — verified sender, defaults to Resend's test sender
 *   BUSINESS_NOTIFY_EMAIL   — where new inquiries land
 *
 * Email delivery is best-effort: a mail failure never fails the user's
 * request, because the inquiry is already safely stored in PostgreSQL.
 */

const apiKey = process.env.RESEND_API_KEY;
const resend = apiKey ? new Resend(apiKey) : null;

const FROM =
  process.env.RESEND_FROM_EMAIL ??
  "Precision Craft Website <onboarding@resend.dev>";
const NOTIFY_TO = process.env.BUSINESS_NOTIFY_EMAIL ?? site.emailQuotes;

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function brandShell(title: string, body: string) {
  return `<!doctype html>
<html lang="en">
  <body style="margin:0;padding:0;background:#f7f8fa;font-family:Inter,Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f7f8fa;padding:32px 16px;">
      <tr><td align="center">
        <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:#ffffff;border-radius:20px;overflow:hidden;border:1px solid #e7eaee;">
          <tr>
            <td style="background:#0f4c81;padding:24px 32px;">
              <span style="color:#ffffff;font-size:18px;font-weight:700;letter-spacing:-0.2px;">Precision<span style="color:#d4af37;"> Craft</span></span>
              <span style="color:#ffffff;opacity:0.6;font-size:11px;display:block;letter-spacing:2px;text-transform:uppercase;margin-top:4px;">Interiors · Kenya</span>
            </td>
          </tr>
          <tr>
            <td style="padding:28px 32px 8px;">
              <h1 style="margin:0;color:#1e1e1e;font-size:20px;font-weight:700;">${title}</h1>
              <div style="width:48px;height:3px;background:#d4af37;border-radius:3px;margin:14px 0 20px;"></div>
            </td>
          </tr>
          <tr><td style="padding:0 32px 28px;color:#57595c;font-size:14px;line-height:1.7;">${body}</td></tr>
          <tr>
            <td style="background:#072540;padding:18px 32px;color:#ffffff;opacity:0.75;font-size:11px;line-height:1.6;">
              ${site.legalName} · ${site.address.street}, ${site.address.city} · ${site.phone}<br/>
              ${site.tagline}
            </td>
          </tr>
        </table>
      </td></tr>
    </table>
  </body>
</html>`;
}

function rows(fields: Array<[string, string]>) {
  return fields
    .map(
      ([label, value]) => `
      <tr>
        <td style="padding:9px 14px;color:#8a8d90;font-size:12px;text-transform:uppercase;letter-spacing:1px;width:120px;">${label}</td>
        <td style="padding:9px 14px;color:#1e1e1e;font-size:14px;font-weight:600;">${value}</td>
      </tr>`,
    )
    .join("");
}

/** Notify the studio about a new quote/contact request. */
export async function notifyNewInquiry(
  input: QuoteFormValues & { type: "quote" | "contact" },
): Promise<void> {
  if (!resend) {
    console.warn(
      "[email] RESEND_API_KEY not set — skipping inquiry notification email.",
    );
    return;
  }

  const body = `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f7f8fa;border-radius:14px;">
      ${rows([
        ["Name", escapeHtml(input.name)],
        ["Phone", escapeHtml(input.phone)],
        ["Email", `<a href="mailto:${escapeHtml(input.email)}" style="color:#0f4c81;">${escapeHtml(input.email)}</a>`],
        ["Interested in", escapeHtml(input.service)],
      ])}
    </table>
    <p style="margin:20px 0 6px;font-size:12px;text-transform:uppercase;letter-spacing:1px;color:#8a8d90;">Project details</p>
    <p style="margin:0;background:#fcfbF4;border-left:3px solid #d4af37;padding:14px 16px;border-radius:0 10px 10px 0;color:#1e1e1e;">${escapeHtml(input.message)}</p>
    <p style="margin:22px 0 0;">Reply within one business day to keep the response promise.</p>`;

  await resend.emails.send({
    from: FROM,
    to: NOTIFY_TO,
    replyTo: input.email,
    subject: `New ${input.type === "contact" ? "message" : "quote request"} — ${input.name} (${input.service})`,
    html: brandShell("New website inquiry", body),
  });
}

/** Friendly auto-reply so the customer knows we received their request. */
export async function sendInquiryAutoReply(
  input: QuoteFormValues,
): Promise<void> {
  if (!resend) return;

  const firstName = input.name.trim().split(/\s+/)[0] ?? input.name;
  const body = `
    <p style="margin:0;">Hello ${escapeHtml(firstName)},</p>
    <p>Asante sana for reaching out to Precision Craft Interiors Kenya regarding your <strong>${escapeHtml(input.service)}</strong> project.</p>
    <p>A senior project consultant will call or WhatsApp you within <strong>one business day</strong> to schedule your free site visit and 3D design session.</p>
    <p>For anything urgent in the meantime:</p>
    <p style="margin:0;">
      <a href="${site.phoneHref}" style="display:inline-block;background:#0f4c81;color:#ffffff;text-decoration:none;padding:12px 22px;border-radius:999px;font-weight:600;font-size:13px;">Call ${site.phone}</a>
      &nbsp;
      <a href="${site.whatsapp}" style="display:inline-block;background:#d4af37;color:#072540;text-decoration:none;padding:12px 22px;border-radius:999px;font-weight:600;font-size:13px;">WhatsApp us</a>
    </p>`;

  await resend.emails.send({
    from: FROM,
    to: input.email,
    subject: `We've received your request, ${firstName} — Precision Craft`,
    html: brandShell("Your request is in good hands", body),
  });
}

/** Confirm a newsletter subscription (best-effort). */
export async function sendNewsletterWelcome(email: string): Promise<void> {
  if (!resend) return;

  const body = `
    <p style="margin:0;">Karibu to The Craft Letter.</p>
    <p>Once a month you'll receive one thoughtful email: completed project reveals from Eldoret and beyond, material guides, and showroom news from the Precision Craft workshop.</p>
    <p>No spam, ever — and you can unsubscribe with one click at any time.</p>`;

  await resend.emails.send({
    from: FROM,
    to: email,
    subject: "Karibu — you're on The Craft Letter list",
    html: brandShell("Welcome to The Craft Letter", body),
  });
}
