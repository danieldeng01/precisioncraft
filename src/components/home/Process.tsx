import { ArrowRight, Compass, FileCheck2, Hammer, KeyRound } from "lucide-react";
import { Reveal } from "@/components/anim/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { buttonClass } from "@/components/ui/button";

const steps = [
  {
    icon: Compass,
    phase: "Step 01",
    title: "Consult & Measure",
    copy: "A free site visit anywhere in Uasin Gishu. We listen, laser-measure every wall and understand how you actually use the space.",
  },
  {
    icon: FileCheck2,
    phase: "Step 02",
    title: "Design & Approve",
    copy: "Photorealistic 3D renders, material samples and a fixed itemised quotation. Nothing is cut until you sign off with confidence.",
  },
  {
    icon: Hammer,
    phase: "Step 03",
    title: "Build with Precision",
    copy: "Your project enters our workshop queue with a dated programme — CNC-assisted cutting, hand-finished edges, weekly photo updates.",
  },
  {
    icon: KeyRound,
    phase: "Step 04",
    title: "Install & Hand Over",
    copy: "Our own fitters install, level, caulk and polish. You inspect every hinge before the final 10% is due — then the 5-year warranty begins.",
  },
];

export function Process() {
  return (
    <section
      id="process"
      aria-label="Our process"
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
          eyebrow="From Vision to Keys"
          title="A process as precise as our joinery"
          description="Four stages, one dated programme, zero surprises. You'll always know what happens next — and when."
        />

        <ol className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
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
            Start Step One — Book Your Free Site Visit
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
