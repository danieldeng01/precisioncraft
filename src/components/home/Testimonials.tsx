"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";
import { Reveal } from "@/components/anim/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { cn } from "@/lib/utils";

const commitments = [
  {
    title: "Precision in Every Detail",
    quote:
      "Every project begins with careful measurements, thoughtful planning, and quality materials. We believe exceptional spaces are created through precision—not shortcuts.",
  },
  {
    title: "Professional Installation",
    quote:
      "Our team ensures every cabinet, wardrobe, countertop and interior installation is completed with care, accuracy and attention to detail from start to finish.",
  },
  {
    title: "Built for Years to Come",
    quote:
      "We focus on durable workmanship, reliable hardware and timeless designs that continue serving families and businesses long after installation.",
  },
];

const AUTO_ADVANCE_MS = 7000;

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = useCallback(
    (next: number) =>
      setIndex((next + commitments.length) % commitments.length),
    [],
  );

  useEffect(() => {
    if (paused) return;

    timer.current = setInterval(() => {
      setIndex((i) => (i + 1) % commitments.length);
    }, AUTO_ADVANCE_MS);

    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [paused]);

  const active = commitments[index];

  return (
    <section
      id="testimonials"
      aria-label="Our commitment"
      className="relative overflow-hidden bg-mist py-24 sm:py-32"
    >
      <div className="relative mx-auto max-w-5xl px-5 sm:px-8">
        <SectionHeader
          eyebrow="Our Commitment"
          title="Built on craftsmanship, quality and trust"
          description="As Wegner Precision Craft launches its next chapter, our commitment remains simple: deliver exceptional workmanship and outstanding customer service on every project."
        />

        <Reveal className="mt-16">
          <div
            className="rounded-[2rem] border border-line bg-white p-8 shadow-soft sm:p-12"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="flex justify-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white shadow-card">
                <ShieldCheck className="h-8 w-8" />
              </span>
            </div>

            <figure key={index} className="hero-enter mt-8 text-center">
              <h3 className="font-display text-2xl font-semibold text-ink">
                {active.title}
              </h3>

              <blockquote className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-ink-soft sm:text-xl">
                {active.quote}
              </blockquote>

              <figcaption className="mt-8 flex items-center justify-center gap-2 text-primary">
                <CheckCircle2 className="h-5 w-5 text-gold" />
                <span className="font-semibold">
                  Wegner Precision Craft
                </span>
              </figcaption>
            </figure>

            <div className="mt-10 flex items-center justify-center gap-6">
              <button
                type="button"
                onClick={() => go(index - 1)}
                aria-label="Previous"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-line transition-all hover:border-primary hover:bg-primary hover:text-white"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <div className="flex gap-2">
                {commitments.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => go(i)}
                    className={cn(
                      "h-2 rounded-full transition-all duration-300",
                      i === index
                        ? "w-8 bg-gold"
                        : "w-2 bg-primary/20 hover:bg-primary/50",
                    )}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={() => go(index + 1)}
                aria-label="Next"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-line transition-all hover:border-primary hover:bg-primary hover:text-white"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}