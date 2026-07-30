"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { services, site } from "@/lib/site";

type FieldErrors = Partial<
  Record<"name" | "email" | "phone" | "message", string>
>;

const inputClass =
  "w-full rounded-2xl border border-line bg-mist/60 px-4 py-3.5 text-sm text-ink placeholder:text-ink-soft/60 transition-all duration-300 focus:border-primary focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/10";

const labelClass =
  "mb-2 block text-xs font-semibold uppercase tracking-wider text-ink";

export function QuoteForm() {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    setStatus("loading");
    setErrors({});
    setServerError("");

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "quote",
          name: formData.get("name"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          service: formData.get("service"),
          message: formData.get("message"),
        }),
      });

      const data = (await res.json()) as {
        ok: boolean;
        errors?: FieldErrors;
        error?: string;
      };

      if (res.status === 422 && data.errors) {
        setErrors(data.errors);
        setStatus("error");
        return;
      }
      if (!res.ok || !data.ok) {
        setServerError(data.error ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      setStatus("success");
      form.reset();
    } catch {
      setServerError("Network error — please check your connection and retry.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex h-full min-h-[28rem] flex-col items-center justify-center rounded-3xl border border-gold/40 bg-gold-50 p-10 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gold text-primary-900 shadow-gold">
          <CheckCircle2 className="h-8 w-8" aria-hidden="true" />
        </span>
        <h3 className="mt-6 font-display text-2xl font-semibold text-ink">
          Asante! Your request is in.
        </h3>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink-soft">
          A project consultant will call you within one business day to
          schedule your free site visit. For anything urgent, call{" "}
          <a
            href={site.phoneHref}
            className="font-semibold text-primary underline decoration-gold decoration-2 underline-offset-4"
          >
            {site.phone}
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-8 text-sm font-semibold text-primary underline decoration-gold decoration-2 underline-offset-4 transition-colors hover:text-gold-600"
        >
          Send another request
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="rounded-3xl border border-line bg-white p-7 shadow-card sm:p-9"
      aria-label="Request a free quote"
    >
      <h3 className="font-display text-2xl font-semibold text-ink">
        Request a free quote
      </h3>
      <p className="mt-2 text-sm text-ink-soft">
        Free site visit, free 3D design, fixed itemised quotation — no
        obligation.
      </p>

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="quote-name" className={labelClass}>
            Full name <span className="text-gold-600">*</span>
          </label>
          <input
            id="quote-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            placeholder="e.g. Grace Wanjiku"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "quote-name-error" : undefined}
            className={inputClass}
          />
          {errors.name && (
            <p id="quote-name-error" className="mt-1.5 text-xs font-medium text-red-600">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="quote-phone" className={labelClass}>
            Phone / WhatsApp <span className="text-gold-600">*</span>
          </label>
          <input
            id="quote-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            placeholder="e.g. 0700 000 000"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "quote-phone-error" : undefined}
            className={inputClass}
          />
          {errors.phone && (
            <p id="quote-phone-error" className="mt-1.5 text-xs font-medium text-red-600">
              {errors.phone}
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="quote-email" className={labelClass}>
            Email address <span className="text-gold-600">*</span>
          </label>
          <input
            id="quote-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="you@example.co.ke"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "quote-email-error" : undefined}
            className={inputClass}
          />
          {errors.email && (
            <p id="quote-email-error" className="mt-1.5 text-xs font-medium text-red-600">
              {errors.email}
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="quote-service" className={labelClass}>
            I&apos;m interested in
          </label>
          <select id="quote-service" name="service" className={inputClass} defaultValue={services[0].title}>
            {services.map((service) => (
              <option key={service.slug} value={service.title}>
                {service.title}
              </option>
            ))}
            <option value="Full interior fit-out">Full interior fit-out</option>
            <option value="Something else">Something else</option>
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="quote-message" className={labelClass}>
            Tell us about your project <span className="text-gold-600">*</span>
          </label>
          <textarea
            id="quote-message"
            name="message"
            required
            rows={4}
            placeholder="e.g. We're finishing a 4-bedroom home in Elgon View and need a kitchen, three wardrobes and a TV wall…"
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "quote-message-error" : undefined}
            className={`${inputClass} resize-none`}
          />
          {errors.message && (
            <p id="quote-message-error" className="mt-1.5 text-xs font-medium text-red-600">
              {errors.message}
            </p>
          )}
        </div>
      </div>

      {serverError && (
        <p className="mt-5 rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {serverError}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-7 inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-gold px-6 py-4 font-display text-sm font-semibold text-primary-900 shadow-gold transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-400 disabled:opacity-60"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Sending your request…
          </>
        ) : (
          <>
            Send My Request
            <Send className="h-4 w-4" aria-hidden="true" />
          </>
        )}
      </button>

      <p className="mt-4 text-center text-xs text-ink-soft">
        We reply within one business day. Your details stay private — always.
      </p>
    </form>
  );
}
