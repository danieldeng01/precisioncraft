import Image from "next/image";
import { ArrowUpRight, MapPin } from "lucide-react";
import { portfolio } from "@/lib/site";
import { Reveal } from "@/components/anim/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { cn } from "@/lib/utils";

export function Portfolio() {
  return (
    <section
      id="portfolio"
      aria-label="Selected projects portfolio"
      className="bg-white py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader
          eyebrow="Selected Work"
          title="Spaces we've crafted across Eldoret & beyond"
          description="A small selection of recent installations — residential kitchens and dressing rooms to hotel lobbies and corporate boardrooms."
        />

        <div className="mt-16 grid auto-rows-[17rem] gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {portfolio.map((project, index) => (
            <Reveal
              key={project.title}
              delay={(index % 4) * 90}
              className={cn(
                index === 0 && "sm:col-span-2 sm:row-span-2",
                index === 3 && "lg:col-span-2",
              )}
            >
              <article className="group relative h-full w-full overflow-hidden rounded-3xl">
                <Image
                  src={project.image}
                  alt={project.alt}
                  fill
                  sizes={
                    index === 0
                      ? "(max-width: 640px) 100vw, 50vw"
                      : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  }
                  className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.07]"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-primary-900/90 via-primary-900/25 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100"
                />

                <div className="absolute inset-x-0 bottom-0 p-6">
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-gold px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-primary-900">
                      {project.category}
                    </span>
                    <span className="rounded-full bg-white/15 px-3 py-1 text-[0.65rem] font-medium text-white backdrop-blur-md">
                      {project.year}
                    </span>
                  </div>
                  <h3 className="mt-3 font-display text-lg font-semibold text-white sm:text-xl">
                    {project.title}
                  </h3>
                  <p className="mt-1 flex items-center gap-1.5 text-xs text-white/70">
                    <MapPin className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
                    {project.location}
                  </p>
                </div>

                <span
                  aria-hidden="true"
                  className="absolute right-5 top-5 flex h-11 w-11 translate-y-2 items-center justify-center rounded-full bg-white/15 text-white opacity-0 backdrop-blur-md transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
                >
                  <ArrowUpRight className="h-5 w-5" />
                </span>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200} className="mt-10 text-center">
          <p className="text-sm text-ink-soft">
            Planning something similar?{" "}
            <a
              href="#contact"
              className="font-semibold text-primary underline decoration-gold decoration-2 underline-offset-4 transition-colors hover:text-gold-600"
            >
              Tell us about your project
            </a>{" "}
            — we&apos;ll share a full case-study book during your consultation.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
