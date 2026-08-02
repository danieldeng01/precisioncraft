import Image from "next/image";
import { ArrowRight, ArrowUpRight, MapPin } from "lucide-react";
import { portfolio } from "@/lib/site";
import { Reveal } from "@/components/anim/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { buttonClass } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Portfolio() {
  return (
    <section
      id="portfolio"
      aria-label="Selected projects portfolio"
      className="relative overflow-hidden bg-[#f7f6f3] py-28 sm:py-36"
    >
      {/* Decorative background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.08),transparent_35%)]"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">

        <SectionHeader
          eyebrow="Our Craftsmanship"
          title="Every project tells a story of precision."
          description="From bespoke kitchens and luxury wardrobes to commercial interiors and hospitality spaces, every installation reflects our commitment to timeless craftsmanship and uncompromising quality."
        />

        <div className="mt-20 grid auto-rows-[18rem] gap-7 sm:grid-cols-2 lg:grid-cols-4">

          {portfolio.map((project, index) => (

            <Reveal
              key={project.title}
              delay={(index % 4) * 90}
              className={cn(
                index === 0 && "sm:col-span-2 sm:row-span-2",
                index === 3 && "lg:col-span-2",
              )}
            >
              <article className="group relative h-full overflow-hidden rounded-[2rem] shadow-soft transition-all duration-700 hover:-translate-y-2 hover:shadow-elevated">

                <Image
                  src={project.image}
                  alt={project.alt}
                  fill
                  sizes={
                    index === 0
                      ? "(max-width:640px)100vw,50vw"
                      : "(max-width:640px)100vw,(max-width:1024px)50vw,25vw"
                  }
                  className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110"
                />

                {/* Premium overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent transition-all duration-700 group-hover:from-primary-900/95" />

                {/* Gold top line */}
                <div className="absolute left-0 top-0 h-1 w-0 bg-gold transition-all duration-700 group-hover:w-full" />

                {/* Floating Arrow */}
                <div className="absolute right-6 top-6 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">

                  <ArrowUpRight className="h-5 w-5 text-white" />

                </div>

                {/* Bottom Content */}
                <div className="absolute inset-x-0 bottom-0 p-7">

                  <div className="flex flex-wrap items-center gap-3">

                    <span className="rounded-full bg-gold px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary-900">
                      {project.category}
                    </span>

                    <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-medium text-white backdrop-blur-md">
                      {project.year}
                    </span>

                  </div>

                  <h3 className="mt-4 font-display text-2xl font-semibold text-white">
                    {project.title}
                  </h3>

                  <div className="mt-3 flex items-center gap-2 text-sm text-white/75">

                    <MapPin className="h-4 w-4 text-gold" />

                    {project.location}

                  </div>

                </div>

              </article>
            </Reveal>

          ))}

        </div>

        {/* Bottom CTA */}

        <Reveal delay={250}>

          <div className="mt-20 rounded-[2rem] bg-primary-900 px-8 py-12 text-center text-white shadow-elevated">

            <p className="text-sm uppercase tracking-[0.22em] text-gold">
              Ready to Build Something Exceptional?
            </p>

            <h3 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">
              Let's create your next interior masterpiece.
            </h3>

            <p className="mx-auto mt-5 max-w-2xl text-white/70">
              Whether you're planning a dream kitchen, luxury wardrobes,
              office fit-out or an entire commercial project,
              we'd love to help bring your vision to life.
            </p>

            <a
              href="#contact"
              className={cn(buttonClass("gold", "lg"), "mt-8 inline-flex")}
            >
              Request a Consultation
              <ArrowRight className="h-4 w-4" />
            </a>

          </div>

        </Reveal>

      </div>
    </section>
  );
}