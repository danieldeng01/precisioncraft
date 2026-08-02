import {
  ArrowRight,
  ClipboardCheck,
  Compass,
  FileCheck2,
  Hammer,
  Palette,
  Wrench,
} from "lucide-react";
import { Reveal } from "@/components/anim/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { buttonClass } from "@/components/ui/button";

const steps = [
  {
    icon: Compass,
    phase: "Step 01",
    title: "Consultation",
    copy: "We begin with a site visit to understand your vision, assess your space and take accurate measurements for your project.",
  },
  {
    icon: FileCheck2,
    phase: "Step 02",
    title: "Design & Planning",
    copy: "Our team develops practical layouts and design concepts that balance aesthetics, functionality and your budget before work begins.",
  },
  {
    icon: Palette,
    phase: "Step 03",
    title: "Material Selection",
    copy: "Choose from carefully selected boards, finishes, countertops, colours and hardware that match your style and project requirements.",
  },
  {
    icon: Hammer,
    phase: "Step 04",
    title: "Precision Manufacturing",
    copy: "Your cabinetry and interior components are professionally manufactured with careful attention to measurements, quality and finishing.",
  },
  {
    icon: Wrench,
    phase: "Step 05",
    title: "Professional Installation",
    copy: "Our installation team fits every component, makes final adjustments and ensures everything functions perfectly before handover.",
  },
  {
    icon: ClipboardCheck,
    phase: "Step 06",
    title: "Final Inspection & Handover",
    copy: "Together we inspect the completed project to ensure it meets our quality standards and your expectations before final handover.",
  },
];

export function Process() {
  return (
    <section
      id="process"
      aria-label="Our Process"
      className="relative overflow-hidden bg-primary-900 py-24 text-white sm:py-32"
    >
      <div className="grid-texture pointer-events-none absolute inset-0 opacity-50" />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-1/3 h-96 w-96 rounded-full bg-gold/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader
          tone="light"
          eyebrow="Our Process"
          title="From Concept to Completion"
          description="Every project follows a structured process that ensures quality workmanship, clear communication and exceptional results from start to finish."
        />

        <ol className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {steps.map((step, index) => (
            <Reveal key={step.title} as="li" delay={index * 120}>
              <div className="group relative h-full rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:border-gold/40 hover:bg-white/[0.07]">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-1 right-5 font-display text-7xl font-semibold text-white/[0.06] transition-colors duration-500 group-hover:text-gold/15"
                >
                  {index + 1}
                </span>

                <span className="flex h-13 w-13 items-center justify-center rounded-2xl bg-gold/15 p-3.5 text-gold transition-all duration-500 group-hover:bg-gold group-hover:text-primary-900 group-hover:shadow-gold">
                  <step.icon className="h-6 w-6" aria-hidden="true" />
                </span>

                <p className="mt-6 text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-gold">
                  {step.phase}
                </p>

                <h3 className="mt-2 font-display text-xl font-semibold">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-white/65">
                  {step.copy}
                </p>
              </div>

              {index < steps.length - 1 && (
                <ArrowRight
                  aria-hidden="true"
                  className="absolute -right-5 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-gold/50 xl:block"
                />
              )}
            </Reveal>
          ))}
        </ol>

        <Reveal delay={300} className="mt-14 text-center">
          <a href="#contact" className={buttonClass("gold", "lg")}>
            Book a Free Consultation
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}