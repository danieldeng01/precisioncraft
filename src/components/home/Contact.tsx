import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { site } from "@/lib/site";
import { Reveal } from "@/components/anim/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { QuoteForm } from "@/components/forms/QuoteForm";

const contactCards = [
  {
    icon: Phone,
    title: "Call or WhatsApp",
    value: site.phone,
    hint: "Speak directly with our team",
    href: site.phoneHref,
  },
  {
    icon: Mail,
    title: "Email Us",
    value: site.email,
    hint: "Quotes & project enquiries",
    href: `mailto:${site.email}`,
  },
  {
    icon: MapPin,
    title: "Workshop & Office",
    value: site.address.street,
    hint: `${site.address.city}, ${site.address.county}`,
    href: "https://www.google.com/maps?q=Uganda+Road,+Eldoret,+Kenya",
  },
  {
    icon: Clock,
    title: "Working Hours",
    value: "Mon – Fri | 8:00 AM – 5:30 PM",
    hint: "Saturday: 9:00 AM – 2:00 PM",
    href: undefined,
  },
];

export function Contact() {
  return (
    <section
      id="contact"
      aria-label="Contact Wegner Precision Craft"
      className="bg-mist py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader
          eyebrow="Let's Build Together"
          title="Request Your Free Consultation & Quote"
          description={`Whether you're planning a new kitchen, wardrobes, office fit-out or a complete interior project, our team is ready to discuss your ideas. We proudly serve ${site.serviceArea}.`}
        />

        <div className="mt-16 grid items-start gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-14">
          <div className="grid gap-5 sm:grid-cols-2">
            {contactCards.map((card, index) => {
              const inner = (
                <>
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-50 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-gold">
                    <card.icon className="h-5 w-5" aria-hidden="true" />
                  </span>

                  <h3 className="mt-5 text-xs font-semibold uppercase tracking-wider text-ink-soft">
                    {card.title}
                  </h3>

                  <p className="mt-2 font-display text-base font-semibold text-ink">
                    {card.value}
                  </p>

                  <p className="mt-1 text-xs text-ink-soft">
                    {card.hint}
                  </p>
                </>
              );

              return (
                <Reveal key={card.title} delay={index * 90}>
                  {card.href ? (
                    <a
                      href={card.href}
                      target={card.href.startsWith("http") ? "_blank" : undefined}
                      rel={
                        card.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="group block h-full rounded-3xl border border-line bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-card"
                    >
                      {inner}
                    </a>
                  ) : (
                    <div className="group h-full rounded-3xl border border-line bg-white p-6">
                      {inner}
                    </div>
                  )}
                </Reveal>
              );
            })}

            <Reveal delay={380} className="sm:col-span-2">
              <div className="rounded-3xl bg-primary-900 p-6 text-white shadow-card">
                <p className="font-display text-sm font-semibold text-gold">
                  Why Contact Wegner Precision Craft?
                </p>

                <p className="mt-3 text-sm leading-relaxed text-white/75">
                  ✔ Free consultation and site assessment.<br />
                  ✔ Professional design guidance.<br />
                  ✔ Transparent quotations with no hidden costs.<br />
                  ✔ Quality workmanship from concept to installation.
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={150} variant="scale">
            <QuoteForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}