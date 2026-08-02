import Image from "next/image";
import {
  ArrowRight,
  CheckCircle2,
  Quote,
  Ruler,
  Store,
  Users,
} from "lucide-react";
import { Reveal } from "@/components/anim/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { buttonClass } from "@/components/ui/button";

const pillars = [
  {
    icon: Store,
    title: "In-house workshop",
    copy: "Every piece is milled in our own Uganda Road workshop — never outsourced, never compromised.",
  },
  {
    icon: Ruler,
    title: "Millimetre tolerances",
    copy: "European-style machinery and measuring discipline on Kenyan hardwoods and premium boards.",
  },
  {
    icon: Users,
    title: "One accountable team",
    copy: "The designer who drew it, the craftsmen who built it and the crew who installs it — one company.",
  },
];

export function About() {
  return (
    <section id="about" aria-label="About Wegner Precision Craft" className="overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
        {/* ── Imagery collage ────────────────────────────────── */}
        <Reveal variant="scale" className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-elevated sm:aspect-[5/5.5]">
            <Image
              src="/images/craft-workshop.jpg"
              alt="Wegner Precision Craft master craftsman measuring a walnut veneer panel in the Eldoret joinery workshop"
              fill
              sizes="(max-width: 1024px) 100vw, 46vw"
              className="object-cover"
            />
          </div>

          {/* Experience badge */}
          <div className="absolute -left-4 top-10 rounded-3xl bg-gold px-6 py-5 text-primary-900 shadow-gold sm:-left-8">
            <p className="font-display text-3xl font-semibold leading-none sm:text-4xl">
              Est. <span className="text-primary-700">2026</span>
            </p>
            <p className="mt-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.18em]">
              Eldoret · Kenya
            </p>
          </div>

          {/* Overlapping detail shot */}
          <div className="absolute -bottom-8 -right-3 hidden w-52 overflow-hidden rounded-2xl border-[6px] border-white shadow-elevated sm:block lg:w-60">
            <Image
              src="/images/svc-kitchen.jpg"
              alt="Detail of navy bespoke cabinetry with brushed brass handles"
              width={480}
              height={360}
              className="aspect-[4/3] object-cover"
            />
          </div>

          {/* Floating spec card */}
          <div className="absolute bottom-16 left-6 hidden items-center gap-3 rounded-2xl bg-white/95 px-5 py-4 shadow-card backdrop-blur-md lg:flex">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary">
              <Ruler className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <p className="font-display text-sm font-semibold text-ink">
                Premium Finish
              </p>
              <p className="text-xs text-ink-soft">
                Built to Last
              </p>
            </div>
          </div>
        </Reveal>

        {/* ── Copy ───────────────────────────────────────────── */}
        <div>
          <SectionHeader
            align="left"
            eyebrow="About Wegner Precision Craft"
            title="Crafting Exceptional Spaces Through Precision, Quality and Trust"
          />

          <Reveal delay={120}>
            <p className="mt-6 text-base leading-relaxed text-ink-soft sm:text-lg">
              Wegner Precision Craft was founded on the principles of precision, 
              reliability and attention to detail.
              Inspired by high-quality European craftsmanship and combined with 
              skilled Kenyan workmanship, we design, manufacture and install custom cabinetry
              and interior solutions for homeowners, businesses, architects and developers across Kenya.
              Every project is approached with the same commitment: quality materials, expert craftsmanship, 
              professional installation and complete customer satisfaction — and our
              promise will never change:{" "}
              <strong className="font-semibold text-ink">
                measure twice, cut once, and deliver something worth
                photographing.
              </strong>
            </p>
          </Reveal>

          <div className="mt-10 space-y-6">
            {pillars.map((pillar, index) => (
              <Reveal key={pillar.title} delay={160 + index * 90}>
                <div className="flex gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary-50 text-primary transition-colors duration-300 hover:bg-primary hover:text-white">
                    <pillar.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-display text-base font-semibold text-ink">
                      {pillar.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                      {pillar.copy}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={420}>
            <figure className="mt-10 rounded-2xl border-l-4 border-gold bg-mist p-6">
              <Quote
                className="h-5 w-5 text-gold"
                aria-hidden="true"
              />
              <blockquote className="mt-3 font-display text-lg font-medium leading-relaxed text-ink">
                “We believe every space deserves craftsmanship that combines beauty, 
                functionality and lasting quality.”
              </blockquote>
              <figcaption className="mt-3 flex items-center gap-2 text-sm text-ink-soft">
                <CheckCircle2 className="h-4 w-4 text-primary" aria-hidden="true" />
                Udo Wegner — Founder &amp; Managing Director
              </figcaption>
            </figure>
          </Reveal>

          <Reveal delay={500} className="mt-10">
            <a href="#portfolio" className={buttonClass("navy", "md")}>
              View Our Projects
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
