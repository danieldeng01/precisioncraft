"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import {
  newsletterSchema,
  type NewsletterFormValues,
} from "@/lib/validation";

/**
 * Footer newsletter signup — Zod-validated, persists to /api/newsletter.
 */
export function NewsletterForm() {
  const [status, setStatus] = useState<"idle" | "success" | "server-error">(
    "idle",
  );
  const [serverMessage, setServerMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterFormValues>({
    resolver: zodResolver(newsletterSchema),
    mode: "onSubmit",
  });

  async function onSubmit(values: NewsletterFormValues) {
    setStatus("idle");
    setServerMessage("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };

      if (!res.ok || !data.ok) {
        setStatus("server-error");
        setServerMessage(data.error ?? "Please try again shortly.");
        return;
      }

      setStatus("success");
      reset();
    } catch {
      setStatus("server-error");
      setServerMessage("Network error — please check your connection.");
    }
  }

  const feedback =
    errors.email?.message ??
    (status === "server-error"
      ? serverMessage
      : status === "success"
        ? "You're on the list. Karibu!"
        : "");

  const isError = Boolean(errors.email) || status === "server-error";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full" noValidate>
      <div className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address for design ideas newsletter
        </label>
        <input
          id="newsletter-email"
          type="email"
          required
          autoComplete="email"
          placeholder="Your email address"
          aria-invalid={Boolean(errors.email)}
          aria-describedby="newsletter-feedback"
          className="h-12 flex-1 rounded-full border border-white/20 bg-white/10 px-5 text-sm text-white placeholder:text-white/50 transition-colors focus:border-gold focus:outline-none"
          {...register("email")}
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gold px-6 text-sm font-semibold text-primary-900 shadow-gold transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          ) : status === "success" ? (
            <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
          ) : (
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          )}
          {isSubmitting ? "Subscribing…" : "Subscribe"}
        </button>
      </div>
      <p
        id="newsletter-feedback"
        aria-live="polite"
        className={`mt-3 min-h-5 text-xs ${
          isError
            ? "text-red-300"
            : status === "success"
              ? "text-gold-200"
              : "text-white/40"
        }`}
      >
        {feedback ||
          "One thoughtful email a month — project reveals, material guides and showroom news. No spam, ever."}
      </p>
    </form>
  );
}
