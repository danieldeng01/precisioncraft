"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";

/**
 * Footer newsletter signup — persists to /api/newsletter.
 */
export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [feedback, setFeedback] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setFeedback("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setStatus("error");
        setFeedback(data.error ?? "Please try again shortly.");
        return;
      }
      setStatus("success");
      setFeedback("You're on the list. Karibu!");
      setEmail("");
    } catch {
      setStatus("error");
      setFeedback("Network error — please check your connection.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="w-full" noValidate>
      <div className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address for design ideas newsletter
        </label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Your email address"
          className="h-12 flex-1 rounded-full border border-white/20 bg-white/10 px-5 text-sm text-white placeholder:text-white/50 transition-colors focus:border-gold focus:outline-none"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gold px-6 text-sm font-semibold text-primary-900 shadow-gold transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-400 disabled:opacity-60"
        >
          {status === "loading" ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          ) : status === "success" ? (
            <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
          ) : (
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          )}
          {status === "loading" ? "Subscribing…" : "Subscribe"}
        </button>
      </div>
      <p
        aria-live="polite"
        className={`mt-3 min-h-5 text-xs ${
          status === "error"
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
