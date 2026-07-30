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
    hint: "Mon–Sat, 8:00 AM – 5:30 PM",
    href: site.phoneHref,
  },
  {
    icon: Mail,
    title: "Email the studio",
    value: site.email,
    hint: "Quotes: " + site.emailQuotes,
    href: `mailto:${site.email}`,
  },
  {
    icon: MapPin,
    title: "Showroom & workshop",
    value: `${site.address.street}`,
    hint: `${site.address.city}, ${site.address.county}`,
    href: "https://www.google.com/maps?q=Uganda+Road,+Eldoret,+Kenya",
  },
  {
    icon: Clock,
    title: "Business hours",
    value: "Mon–Fri 8:00 – 17:30",
    hint: "Sat 9:00 – 14:00 · Sun closed",
    href: undefined,
  },
];

export function Contact() {
  return (
    <section
      id="contact"
      aria-label="Contact Precision Craft"
      className="bg-mist py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader
          eyebrow="Let's Build Together"
          title="Start with a free, measured consultation"
          description={`Serving ${site.serviceArea}. Walk into the showroom, call us, or send the form — either way, a real consultant responds within one business day.`}
        />

        <div className="mt-16 grid items-start gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-14">
          {/* ── Contact cards ──────────────────────────────── */}
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
                  <p className="mt-1 text-xs text-ink-soft">{card.hint}</p>
                </>
              );

              return (
                <Reveal key={card.title} delay={index * 90}>
                  {card.href ? (
                    <a
                      href={card.href}
                      target={card.href.startsWith("http") ? "_blank" : undefined}
                      rel={card.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="group block h-full rounded-3xl border border-line bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary-200 hover:shadow-card"
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

            {/* Assurance strip */}
            <Reveal delay={380} className="sm:col-span-2">
              <div className="rounded-3xl bg-primary-900 p-6 text-white shadow-card">
                <p className="font-display text-sm font-semibold text-gold">
                  Our response promise
                </p>
                <p className="mt-2 text-sm leading-relaxed text-white/70">
                  Every enquiry is read by a senior consultant — never a bot.
                  Expect a call or WhatsApp reply within one business day, and
                  a written quote within 48 hours of your site visit.
                </p>
              </div>
            </Reveal>
          </div>

          {/* ── Quote form ─────────────────────────────────── */}
          <Reveal delay={150} variant="scale">
            <QuoteForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
