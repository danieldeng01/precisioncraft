import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { navLinks, productLinks, services, site } from "@/lib/site";
import { Logo } from "@/components/site/Logo";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { MapEmbed } from "@/components/site/MapEmbed";

const socialIcons: Record<string, React.ReactNode> = {
  Facebook: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  ),
  Instagram: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  ),
  LinkedIn: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  TikTok: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  ),
};

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-primary-900 text-white">
      <div className="grid-texture pointer-events-none absolute inset-0 opacity-40" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-gold/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-5 pt-20 sm:px-8">
        {/* ── Newsletter band ─────────────────────────────────── */}
        <div className="flex flex-col gap-8 border-b border-white/10 pb-14 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-md">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold">
              The Craft Letter
            </p>
            <h2 className="mt-3 font-display text-2xl font-semibold leading-snug sm:text-3xl">
              Design ideas worth building, once a month.
            </h2>
          </div>
          <div className="w-full max-w-md">
            <NewsletterForm />
          </div>
        </div>

        {/* ── Main columns ────────────────────────────────────── */}
        <div className="grid gap-12 py-14 md:grid-cols-2 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Logo tone="light" />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/60">
              Founded in 2026 by {site.founder.name}, {site.legalName} is
              Eldoret&apos;s premium custom cabinetry and interior solutions
              studio. We design, build and install bespoke kitchens,
              wardrobes and commercial interiors with European precision and
              Kenyan warmth.
            </p>
            <div className="mt-7 flex gap-3">
              {site.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Precision Craft on ${social.label}`}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:bg-gold hover:text-primary-900"
                >
                  {socialIcons[social.label]}
                </a>
              ))}
            </div>
          </div>

          {/* Products */}
          <div className="lg:col-span-2">
            <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-gold">
              Products
            </h3>
            <ul className="mt-5 space-y-3">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-gold"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-2">
            <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-gold">
              Services
            </h3>
            <ul className="mt-5 space-y-3">
              {services.slice(0, 5).map((service) => (
                <li key={service.slug}>
                  <a
                    href="#services"
                    className="text-sm text-white/60 transition-colors hover:text-gold"
                  >
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours + quick links */}
          <div className="lg:col-span-2">
            <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-gold">
              Business Hours
            </h3>
            <ul className="mt-5 space-y-3">
              {site.hours.map((row) => (
                <li key={row.days} className="text-sm">
                  <span className="block text-white/80">{row.days}</span>
                  <span className="text-white/50">{row.time}</span>
                </li>
              ))}
            </ul>
            <h3 className="mt-8 font-display text-sm font-semibold uppercase tracking-widest text-gold">
              Explore
            </h3>
            <ul className="mt-4 space-y-2.5">
              {navLinks.slice(1).map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-gold"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + map */}
          <div className="lg:col-span-2">
            <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-gold">
              Visit Us
            </h3>
            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex gap-3">
                <MapPin
                  className="mt-0.5 h-4 w-4 shrink-0 text-gold"
                  aria-hidden="true"
                />
                <span className="text-white/60">
                  {site.address.street}, {site.address.city},{" "}
                  {site.address.county}
                </span>
              </li>
              <li>
                <a
                  href={site.phoneHref}
                  className="flex gap-3 text-white/60 transition-colors hover:text-gold"
                >
                  <Phone
                    className="mt-0.5 h-4 w-4 shrink-0 text-gold"
                    aria-hidden="true"
                  />
                  {site.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="flex gap-3 text-white/60 transition-colors hover:text-gold"
                >
                  <Mail
                    className="mt-0.5 h-4 w-4 shrink-0 text-gold"
                    aria-hidden="true"
                  />
                  {site.email}
                </a>
              </li>
              <li className="flex gap-3">
                <Clock
                  className="mt-0.5 h-4 w-4 shrink-0 text-gold"
                  aria-hidden="true"
                />
                <span className="text-white/60">
                  Showroom open Mon–Sat — walk-ins welcome
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* ── Map ─────────────────────────────────────────────── */}
        <div className="overflow-hidden rounded-3xl border border-white/10">
          <MapEmbed />
        </div>

        {/* ── Legal bar ───────────────────────────────────────── */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 py-8 text-xs text-white/45 sm:flex-row">
          <p>
            © {year} {site.legalName}. All rights reserved. {site.tagline}.
          </p>
          <div className="flex items-center gap-6">
            <a href="#home" className="transition-colors hover:text-gold">
              Privacy Policy
            </a>
            <a href="#home" className="transition-colors hover:text-gold">
              Terms of Service
            </a>
            <span className="hidden items-center gap-2 sm:flex">
              <span className="h-1 w-1 rounded-full bg-gold" aria-hidden="true" />
              Eldoret, Kenya
            </span>
            <span className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-gold" aria-hidden="true" />
              Website by {site.developer}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
