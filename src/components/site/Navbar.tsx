"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ChevronDown,
  Clock,
  DoorOpen,
  Hotel,
  Menu,
  MonitorPlay,
  Phone,
  Ruler,
  Shirt,
  Sparkles,
  X,
} from "lucide-react";
import { navLinks, productLinks, site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { buttonClass } from "@/components/ui/button";
import { Logo } from "@/components/site/Logo";

const productIcons = [Ruler, Shirt, MonitorPlay, Sparkles, Hotel, DoorOpen];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Lock body scroll while the mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const openProducts = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setProductsOpen(true);
  }, []);

  const closeProducts = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setProductsOpen(false), 120);
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setProductsOpen(false);
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const beforeProducts = navLinks.slice(0, 3);
  const afterProducts = navLinks.slice(3);
  const linkTone = scrolled
    ? "text-ink-soft hover:text-primary"
    : "text-white/85 hover:text-white";

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-white/95 shadow-nav backdrop-blur-xl"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
        <a href="#home" aria-label="Precision Craft — home" className="shrink-0">
          <Logo tone={scrolled ? "dark" : "light"} />
        </a>

        {/* ── Desktop navigation ─────────────────────────────── */}
        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {beforeProducts.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                linkTone,
              )}
            >
              {link.label}
            </a>
          ))}

          {/* Products mega dropdown */}
          <div
            ref={dropdownRef}
            className="relative"
            onMouseEnter={openProducts}
            onMouseLeave={closeProducts}
          >
            <button
              type="button"
              aria-expanded={productsOpen}
              aria-haspopup="true"
              onClick={() => setProductsOpen((v) => !v)}
              onFocus={openProducts}
              className={cn(
                "flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                linkTone,
                productsOpen && (scrolled ? "text-primary" : "text-gold"),
              )}
            >
              Products
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform duration-300",
                  productsOpen && "rotate-180",
                )}
                aria-hidden="true"
              />
            </button>

            <div
              className={cn(
                "absolute left-1/2 top-full w-[46rem] -translate-x-1/2 pt-5 transition-all duration-300",
                productsOpen
                  ? "pointer-events-auto translate-y-0 opacity-100"
                  : "pointer-events-none translate-y-2 opacity-0",
              )}
            >
              <div className="overflow-hidden rounded-3xl border border-line bg-white shadow-elevated">
                <div className="grid grid-cols-2 gap-1 p-4">
                  {productLinks.map((product, index) => {
                    const Icon = productIcons[index] ?? Ruler;
                    return (
                      <a
                        key={product.label}
                        href={product.href}
                        onClick={() => setProductsOpen(false)}
                        className="group flex items-start gap-3.5 rounded-2xl p-3.5 transition-colors hover:bg-mist"
                      >
                        <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                          <Icon className="h-5 w-5" aria-hidden="true" />
                        </span>
                        <span>
                          <span className="block font-display text-sm font-semibold text-ink group-hover:text-primary">
                            {product.label}
                          </span>
                          <span className="mt-0.5 block text-xs leading-relaxed text-ink-soft">
                            {product.blurb}
                          </span>
                        </span>
                      </a>
                    );
                  })}
                </div>
                <a
                  href="#contact"
                  onClick={() => setProductsOpen(false)}
                  className="flex items-center justify-between gap-4 bg-primary px-6 py-4 text-white transition-colors hover:bg-primary-600"
                >
                  <span className="text-sm">
                    <span className="font-display font-semibold text-gold">
                      Free site visit in Eldoret.
                    </span>{" "}
                    <span className="text-white/80">
                      Book a measured consultation this week.
                    </span>
                  </span>
                  <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>

          {afterProducts.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                linkTone,
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={site.phoneHref}
            className={cn(
              "flex items-center gap-2 text-sm font-semibold transition-colors",
              scrolled ? "text-primary" : "text-white/90 hover:text-gold",
            )}
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            {site.phone}
          </a>
          <a
            href="#contact"
            className={buttonClass(scrolled ? "navy" : "gold", "sm")}
          >
            Get a Quote
          </a>
        </div>

        {/* ── Mobile toggle ──────────────────────────────────── */}
        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          aria-label="Open navigation menu"
          aria-expanded={menuOpen}
          className={cn(
            "flex h-11 w-11 items-center justify-center rounded-full transition-colors lg:hidden",
            scrolled
              ? "bg-mist text-ink hover:bg-primary-50"
              : "bg-white/10 text-white backdrop-blur-sm hover:bg-white/20",
          )}
        >
          <Menu className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

            {/* ── Mobile menu overlay ──────────────────────────────── */}
      <div
        className={cn(
          "fixed left-0 top-0 z-[100] flex h-dvh w-screen flex-col overflow-hidden bg-primary-900 transition-opacity duration-300 lg:hidden",
          menuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <div className="grid-texture pointer-events-none absolute inset-0 opacity-60" />

        <div className="relative flex h-20 shrink-0 items-center justify-between px-5">
          <Logo tone="light" />
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            aria-label="Close navigation menu"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <nav
          aria-label="Mobile"
          className="relative flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto px-6 pb-10 pt-4"
        >
          {navLinks.slice(0, 3).map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="rounded-2xl px-4 py-3.5 font-display text-2xl font-medium text-white/90 transition-colors hover:bg-white/5 hover:text-gold"
            >
              {link.label}
            </a>
          ))}

          <div>
            <button
              type="button"
              onClick={() => setMobileProductsOpen((v) => !v)}
              aria-expanded={mobileProductsOpen}
              className="flex w-full items-center justify-between rounded-2xl px-4 py-3.5 font-display text-2xl font-medium text-white/90 transition-colors hover:bg-white/5 hover:text-gold"
            >
              Products
              <ChevronDown
                className={cn(
                  "h-5 w-5 transition-transform duration-300",
                  mobileProductsOpen && "rotate-180",
                )}
                aria-hidden="true"
              />
            </button>

            <div
              className={cn(
                "grid overflow-hidden transition-all duration-300",
                mobileProductsOpen
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="min-h-0">
                {productLinks.map((product) => (
                  <a
                    key={product.label}
                    href={product.href}
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-xl px-8 py-2.5 text-base text-white/70 transition-colors hover:text-gold"
                  >
                    {product.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {afterProducts.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="rounded-2xl px-4 py-3.5 font-display text-2xl font-medium text-white/90 transition-colors hover:bg-white/5 hover:text-gold"
            >
              {link.label}
            </a>
          ))}

          <div className="mt-auto flex shrink-0 flex-col gap-3 pt-8">
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className={buttonClass("gold", "lg", "w-full")}
            >
              Request a Free Quote
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>

            <div className="flex flex-col gap-3 rounded-2xl bg-white/5 px-4 py-3 text-sm text-white/80 sm:flex-row sm:items-center sm:justify-between">
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gold" aria-hidden="true" />
                Mon–Fri 8:00–17:30
              </span>

              <a
                href={site.phoneHref}
                className="flex items-center gap-2 font-semibold text-white"
              >
                <Phone className="h-4 w-4 text-gold" aria-hidden="true" />
                {site.phone}
              </a>
            </div>
          </div>
        </nav>
      </div>

        <nav
          aria-label="Mobile"
          className="relative flex flex-1 flex-col gap-1 overflow-y-auto px-6 pb-10 pt-4"
        >
          {navLinks.slice(0, 3).map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{ transitionDelay: `${i * 40}ms` }}
              className={cn(
                "rounded-2xl px-4 py-3.5 font-display text-2xl font-medium text-white/90 transition-all duration-500 hover:bg-white/5 hover:text-gold",
                menuOpen
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0",
              )}
            >
              {link.label}
            </a>
          ))}

          <div>
            <button
              type="button"
              onClick={() => setMobileProductsOpen((v) => !v)}
              aria-expanded={mobileProductsOpen}
              className={cn(
                "flex w-full items-center justify-between rounded-2xl px-4 py-3.5 font-display text-2xl font-medium text-white/90 transition-all duration-500 hover:bg-white/5 hover:text-gold",
                menuOpen
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0",
              )}
              style={{ transitionDelay: "120ms" }}
            >
              Products
              <ChevronDown
                className={cn(
                  "h-5 w-5 transition-transform duration-300",
                  mobileProductsOpen && "rotate-180",
                )}
                aria-hidden="true"
              />
            </button>
            <div
              className={cn(
                "grid overflow-hidden transition-all duration-500",
                mobileProductsOpen
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="min-h-0">
                {productLinks.map((product) => (
                  <a
                    key={product.label}
                    href={product.href}
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-xl px-8 py-2.5 text-base text-white/70 transition-colors hover:text-gold"
                  >
                    {product.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {afterProducts.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{ transitionDelay: `${(i + 4) * 40}ms` }}
              className={cn(
                "rounded-2xl px-4 py-3.5 font-display text-2xl font-medium text-white/90 transition-all duration-500 hover:bg-white/5 hover:text-gold",
                menuOpen
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0",
              )}
            >
              {link.label}
            </a>
          ))}

          <div
            className={cn(
              "mt-auto flex flex-col gap-3 pt-8 transition-all delay-300 duration-500",
              menuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
            )}
          >
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className={buttonClass("gold", "lg", "w-full")}
            >
              Request a Free Quote
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <div className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3 text-sm text-white/80">
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gold" aria-hidden="true" />
                Mon–Fri 8:00–17:30
              </span>
              <a
                href={site.phoneHref}
                className="flex items-center gap-2 font-semibold text-white"
              >
                <Phone className="h-4 w-4 text-gold" aria-hidden="true" />
                {site.phone}
              </a>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
