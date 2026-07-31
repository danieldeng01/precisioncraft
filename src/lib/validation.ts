import { z } from "zod";

/**
 * Shared validators — used by React Hook Form on the client and by the
 * API routes on the server, so a request can never diverge from what the
 * form promises.
 */

/** Accepts 07XXXXXXXX, 01XXXXXXXX, 7XXXXXXXX and +254 variants. */
export function isKenyanPhone(raw: string): boolean {
  const digits = raw.replace(/[\s\-+()]/g, "");
  return /^(?:(?:254|0)[17]\d{8}|[17]\d{8})$/.test(digits);
}

export const quoteSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please tell us your name.")
    .max(120, "Name is a little long — mind shortening it?"),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address.")
    .max(160),
  phone: z
    .string()
    .trim()
    .refine(
      isKenyanPhone,
      "Please enter a valid phone number, e.g. 0743 717 230.",
    ),
  service: z.string().trim().min(1, "Please choose a service.").max(80),
  message: z
    .string()
    .trim()
    .min(10, "Please describe your project in at least 10 characters.")
    .max(4000),
});

export type QuoteFormValues = z.infer<typeof quoteSchema>;

export const newsletterSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address.")
    .max(160),
});

export type NewsletterFormValues = z.infer<typeof newsletterSchema>;
