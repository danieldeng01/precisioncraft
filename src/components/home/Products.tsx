import Image from "next/image";
import { ArrowRight, BadgeCheck } from "lucide-react";
import { products } from "@/lib/site";
import { Reveal } from "@/components/anim/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function Products() {
  return (
    <section
      id="products"
      aria-label="Product collections"
      className="bg-white py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader
          eyebrow="Signature Collections"
          title="Products engineered to be lived with, daily"
          description="Six flagship collections refined over hundreds of installations. Each is fully customisable in size, finish, hardware and worktop."
        />

        <div className="mt-16 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => (
            <Reveal key={product.name} delay={(index % 3) * 110}>
              <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white transition-all duration-500 hover:-translate-y-2 hover:border-primary-200 hover:shadow-card">
                <div className="relative h-60 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                  />
                  <span className="absolute left-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-primary-900/85 px-3.5 py-1.5 text-[0.68rem] font-semibold uppercase tracking-wider text-gold backdrop-blur-md">
                    <BadgeCheck className="h-3.5 w-3.5" aria-hidden="true" />
                    {product.badge}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-7">
                  <h3 className="font-display text-xl font-semibold text-ink">
                    {product.name}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">
                    {product.blurb}
                  </p>
                  <div className="mt-6 flex items-center justify-between border-t border-line pt-5">
                    <p className="font-display text-sm font-semibold text-primary">
                      {product.price}
                    </p>
                    <a
                      href="#contact"
                      aria-label={`Get a quote for ${product.name}`}
                      className="inline-flex items-center gap-1.5 rounded-full bg-mist px-4 py-2 text-xs font-semibold text-ink transition-all duration-300 hover:bg-gold hover:text-primary-900"
                    >
                      Get Quote
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
