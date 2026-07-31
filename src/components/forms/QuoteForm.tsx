"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { services, site } from "@/lib/site";
import { quoteSchema, type QuoteFormValues } from "@/lib/validation";
import { cn } from "@/lib/utils";

const inputClass =
  "w-full rounded-2xl border bg-mist/60 px-4 py-3.5 text-sm text-ink placeholder:text-ink-soft/60 transition-all duration-300 focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/10";

const labelClass =
  "mb-2 block text-xs font-semibold uppercase tracking-wider text-ink";

type FieldName = keyof QuoteFormValues;

export function QuoteForm() {
  const [serverError, setServerError] = useState("");
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteSchema),
    defaultValues: { service: services[0].title },
    mode: "onTouched",
  });

  async function onSubmit(values: QuoteFormValues) {
    setServerError("");

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "quote", ...values }),
      });
      const data = (await res.json()) as {
        ok: boolean;
        errors?: Partial<Record<FieldName, string>>;
        error?: string;
      };

      if (res.status === 422 && data.errors) {
        for (const [field, message] of Object.entries(data.errors)) {
          if (message) {
            setError(field as FieldName, { type: "server", message });
          }
        }
        return;
      }
      if (!res.ok || !data.ok) {
        setServerError(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      setSent(true);
      reset();
    } catch {
      setServerError("Network error — please check your connection and retry.");
    }
  }

  function fieldClass(hasError: boolean) {
    return cn(
      inputClass,
      hasError
        ? "border-red-400 focus:border-red-500 focus:ring-red-500/10"
        : "border-line focus:border-primary",
    );
  }

  if (sent) {
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
          onClick={() => setSent(false)}
          className="mt-8 text-sm font-semibold text-primary underline decoration-gold decoration-2 underline-offset-4 transition-colors hover:text-gold-600"
        >
          Send another request
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
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
            type="text"
            autoComplete="name"
            placeholder="e.g. Grace Wanjiku"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "quote-name-error" : undefined}
            className={fieldClass(Boolean(errors.name))}
            {...register("name")}
          />
          {errors.name && (
            <p id="quote-name-error" className="mt-1.5 text-xs font-medium text-red-600">
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="quote-phone" className={labelClass}>
            Phone / WhatsApp <span className="text-gold-600">*</span>
          </label>
          <input
            id="quote-phone"
            type="tel"
            autoComplete="tel"
            placeholder="e.g. 0743 717 230"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "quote-phone-error" : undefined}
            className={fieldClass(Boolean(errors.phone))}
            {...register("phone")}
          />
          {errors.phone && (
            <p id="quote-phone-error" className="mt-1.5 text-xs font-medium text-red-600">
              {errors.phone.message}
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="quote-email" className={labelClass}>
            Email address <span className="text-gold-600">*</span>
          </label>
          <input
            id="quote-email"
            type="email"
            autoComplete="email"
            placeholder="you@example.co.ke"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "quote-email-error" : undefined}
            className={fieldClass(Boolean(errors.email))}
            {...register("email")}
          />
          {errors.email && (
            <p id="quote-email-error" className="mt-1.5 text-xs font-medium text-red-600">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="quote-service" className={labelClass}>
            I&apos;m interested in
          </label>
          <select
            id="quote-service"
            className={fieldClass(Boolean(errors.service))}
            {...register("service")}
          >
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
            rows={4}
            placeholder="e.g. We're finishing a 4-bedroom home in Elgon View and need a kitchen, three wardrobes and a TV wall…"
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "quote-message-error" : undefined}
            className={cn(fieldClass(Boolean(errors.message)), "resize-none")}
            {...register("message")}
          />
          {errors.message && (
            <p id="quote-message-error" className="mt-1.5 text-xs font-medium text-red-600">
              {errors.message.message}
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
        disabled={isSubmitting}
        className="mt-7 inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-gold px-6 py-4 font-display text-sm font-semibold text-primary-900 shadow-gold transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-400 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? (
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
