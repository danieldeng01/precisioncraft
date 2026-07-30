import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/lib/site";
import { Reveal } from "@/components/anim/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function Services() {
  return (
    <section
      id="services"
      aria-label="Interior services"
      className="bg-mist py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader
          eyebrow="What We Craft"
          title="Interior solutions for homes, businesses and institutions"
          description="Six disciplines, one standard. Every service below is designed in-studio, fabricated in our Eldoret workshop and installed by our own fitters."
        />

        <div className="mt-16 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Reveal key={service.slug} delay={(index % 3) * 110}>
              <article className="group h-full overflow-hidden rounded-3xl bg-white shadow-soft transition-all duration-500 hover:-translate-y-2 hover:shadow-card">
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-primary-900/35 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />
                  <span className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 font-display text-xs font-semibold text-primary shadow-card">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="flex flex-col p-7">
                  <h3 className="font-display text-xl font-semibold text-ink transition-colors group-hover:text-primary">
                    {service.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">
                    {service.copy}
                  </p>
                  <a
                    href="#contact"
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-gold-600"
                    aria-label={`Request a quote for ${service.title}`}
                  >
                    Request this service
                    <ArrowUpRight
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
