import { ArrowRight, Phone } from "lucide-react";
import { site } from "@/lib/site";
import { Reveal } from "@/components/anim/Reveal";
import { buttonClass } from "@/components/ui/button";

export function CtaBanner() {
  return (
    <section aria-label="Start your project" className="bg-white pb-24 sm:pb-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal variant="scale">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-primary-900 px-6 py-16 text-center text-white shadow-elevated sm:px-16 sm:py-20">
            <div className="grid-texture pointer-events-none absolute inset-0 opacity-60" />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gold/15 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-primary-400/20 blur-3xl"
            />

            <div className="relative">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold">
                Free Site Visit · Free 3D Design · Fixed Quote
              </p>
              <h2 className="mx-auto mt-5 max-w-2xl font-display text-3xl font-semibold leading-tight sm:text-5xl">
                Your space deserves to be built{" "}
                <span className="text-gold">beautifully.</span>
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/70">
                Book a free measured consultation this week. We&apos;ll visit,
                listen, design and quote — with zero obligation and one clear
                price.
              </p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <a href="#contact" className={buttonClass("gold", "lg")}>
                  Request Your Free Quote
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <a href={site.phoneHref} className={buttonClass("ghostLight", "lg")}>
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  {site.phone}
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
