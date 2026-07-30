import {
  CalendarCheck2,
  Gem,
  PenTool,
  Ruler,
  Settings2,
  ShieldCheck,
} from "lucide-react";
import { Reveal } from "@/components/anim/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";

const features = [
  {
    icon: Ruler,
    title: "Millimetre Precision",
    copy: "Digital measuring, shop drawings and CNC-assisted fabrication mean panels that fit the first time — not the third.",
  },
  {
    icon: Gem,
    title: "Premium Materials Only",
    copy: "Marine-grade boards, solid hardwoods and certified quartz and marble. Every material is named in your written quote.",
  },
  {
    icon: Settings2,
    title: "Soft-Close Hardware",
    copy: "Blum-equivalent hinges and runners rated for 100,000+ cycles — doors close in a whisper for decades.",
  },
  {
    icon: ShieldCheck,
    title: "5-Year Warranty",
    copy: "A written workmanship warranty on every installation, plus lifetime support on hardware adjustments.",
  },
  {
    icon: CalendarCheck2,
    title: "On-Time, On-Budget",
    copy: "A dated programme before we begin and weekly progress photos. 96% of our projects hand over on schedule.",
  },
  {
    icon: PenTool,
    title: "Design Studio Included",
    copy: "Photorealistic 3D renders and material boards at no extra cost — see your exact kitchen before a single cut.",
  },
];

export function Features() {
  return (
    <section
      aria-label="Why choose Precision Craft"
      className="relative overflow-hidden bg-mist py-24 sm:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 h-80 w-80 translate-x-1/3 -translate-y-1/3 rounded-full bg-primary/5 blur-3xl"
      />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader
          eyebrow="The Precision Standard"
          title="Why Eldoret's architects and homeowners specify us"
          description="Six quiet commitments behind every drawer glide, every shadow gap, every hand-over handshake."
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Reveal key={feature.title} delay={(index % 3) * 100}>
              <div className="group h-full rounded-3xl border border-line bg-white p-8 transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/50 hover:shadow-card">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-50 text-primary transition-all duration-500 group-hover:rotate-3 group-hover:bg-primary group-hover:text-gold">
                  <feature.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-6 font-display text-lg font-semibold text-ink">
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                  {feature.copy}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
