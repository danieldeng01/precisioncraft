"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { testimonials } from "@/lib/site";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/anim/Reveal";
import { cn } from "@/lib/utils";

const AUTO_ADVANCE_MS = 6500;

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = useCallback(
    (next: number) =>
      setIndex((next + testimonials.length) % testimonials.length),
    [],
  );

  useEffect(() => {
    if (paused) return;
    timer.current = setInterval(
      () => setIndex((i) => (i + 1) % testimonials.length),
      AUTO_ADVANCE_MS,
    );
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [paused]);

  const active = testimonials[index];

  return (
    <section
      id="testimonials"
      aria-label="Client testimonials"
      className="relative overflow-hidden bg-mist py-24 sm:py-32"
    >
      <Quote
        aria-hidden="true"
        className="pointer-events-none absolute -top-6 left-1/2 h-64 w-64 -translate-x-1/2 text-primary/[0.05]"
      />

      <div className="relative mx-auto max-w-4xl px-5 sm:px-8">
        <SectionHeader
          eyebrow="Client Voices"
          title="Trusted from family homes to five-star hospitality"
        />

        <Reveal className="mt-14">
          <div
            className="relative rounded-[2rem] border border-line bg-white p-8 shadow-soft sm:p-12"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div
              className="flex justify-center gap-1.5"
              aria-label="Five star rating"
            >
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="h-5 w-5 fill-gold text-gold"
                  aria-hidden="true"
                />
              ))}
            </div>

            {/* Slide */}
            <figure key={index} className="hero-enter mt-8 text-center">
              <blockquote className="mx-auto max-w-2xl font-display text-lg font-medium leading-relaxed text-ink sm:text-2xl">
                “{active.quote}”
              </blockquote>
              <figcaption className="mt-8">
                <p className="font-display text-base font-semibold text-ink">
                  {active.name}
                </p>
                <p className="mt-1 text-sm text-ink-soft">{active.role}</p>
              </figcaption>
            </figure>

            {/* Controls */}
            <div className="mt-10 flex items-center justify-center gap-6">
              <button
                type="button"
                onClick={() => go(index - 1)}
                aria-label="Previous testimonial"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink transition-all duration-300 hover:border-primary hover:bg-primary hover:text-white"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>

              <div className="flex items-center gap-2.5" role="tablist" aria-label="Choose testimonial">
                {testimonials.map((t, i) => (
                  <button
                    key={t.name}
                    type="button"
                    role="tab"
                    aria-selected={i === index}
                    aria-label={`Testimonial ${i + 1} from ${t.name}`}
                    onClick={() => go(i)}
                    className={cn(
                      "h-2 rounded-full transition-all duration-400",
                      i === index
                        ? "w-8 bg-gold"
                        : "w-2 bg-ink/15 hover:bg-primary/40",
                    )}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={() => go(index + 1)}
                aria-label="Next testimonial"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink transition-all duration-300 hover:border-primary hover:bg-primary hover:text-white"
              >
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
