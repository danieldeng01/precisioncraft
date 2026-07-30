"use client";

import { useState } from "react";
import { MessageCircleQuestion, Phone, Plus } from "lucide-react";
import { faqs, site } from "@/lib/site";
import { Reveal } from "@/components/anim/Reveal";
import { cn } from "@/lib/utils";

export function Faq() {
  const [open, setOpen] = useState<number>(0);

  return (
    <section id="faq" aria-label="Frequently asked questions" className="bg-white py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
        {/* ── Intro column ───────────────────────────────────── */}
        <div>
          <Reveal>
            <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-gold">
              <span aria-hidden="true" className="h-px w-8 bg-gold/70" />
              Good to Know
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-[1.15] tracking-tight text-ink sm:text-4xl">
              Questions, answered with the same precision
            </h2>
            <p className="mt-5 text-base leading-relaxed text-ink-soft">
              Straight answers on timelines, materials, payment and coverage —
              the things we&apos;d want to know before inviting craftsmen into
              our home.
            </p>
          </Reveal>

          <Reveal delay={150}>
            <div className="mt-10 rounded-3xl bg-primary p-7 text-white shadow-card">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gold/15 text-gold">
                <MessageCircleQuestion className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-5 font-display text-lg font-semibold">
                Something more specific?
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                Call or WhatsApp us — a real project consultant answers, not a
                call centre. Monday to Saturday, 8:00–17:30.
              </p>
              <a
                href={site.phoneHref}
                className="mt-6 inline-flex items-center gap-2.5 rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-primary-900 transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-400"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                {site.phone}
              </a>
            </div>
          </Reveal>
        </div>

        {/* ── Accordion ──────────────────────────────────────── */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = open === index;
            return (
              <Reveal key={faq.q} delay={index * 70}>
                <div
                  className={cn(
                    "overflow-hidden rounded-2xl border transition-all duration-300",
                    isOpen
                      ? "border-primary-200 bg-mist shadow-soft"
                      : "border-line bg-white hover:border-primary-200",
                  )}
                >
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? -1 : index)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${index}`}
                      id={`faq-button-${index}`}
                      className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                    >
                      <span className="font-display text-base font-semibold text-ink sm:text-lg">
                        {faq.q}
                      </span>
                      <span
                        className={cn(
                          "flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-400",
                          isOpen
                            ? "rotate-45 bg-gold text-primary-900"
                            : "bg-mist text-primary",
                        )}
                        aria-hidden="true"
                      >
                        <Plus className="h-4 w-4" />
                      </span>
                    </button>
                  </h3>
                  <div
                    id={`faq-panel-${index}`}
                    role="region"
                    aria-labelledby={`faq-button-${index}`}
                    className={cn(
                      "grid transition-all duration-500 ease-out",
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0",
                    )}
                  >
                    <div className="min-h-0">
                      <p className="px-6 pb-6 text-sm leading-relaxed text-ink-soft sm:text-base">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
