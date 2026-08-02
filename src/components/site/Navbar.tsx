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
    : "text-white/82 hover:text-white";

  const navPillTone = scrolled
    ? "hover:bg-primary-50/80"
    : "hover:bg-white/10";

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-out",
        scrolled
          ? "border-b border-black/[0.06] bg-white/86 shadow-[0_12px_36px_-28px_rgba(7,37,64,0.45)] backdrop-blur-2xl"
          : "border-b border-white/0 bg-transparent",
      )}
    >
      <div className="mx-auto grid h-20 max-w-[94rem] grid-cols-[1fr_auto] items-center gap-4 px-5 transition-all duration-500 sm:px-8 xl:h-[5.75rem] xl:grid-cols-[minmax(14rem,18rem)_minmax(0,1fr)_minmax(14rem,18rem)] xl:gap-6 2xl:px-10">
        <a
          href="#home"
          aria-label="Precision Craft — home"
          className="group flex min-w-0 shrink-0 items-center justify-start"
        >
          <span className="block origin-left scale-[0.86] transition-transform duration-300 group-hover:scale-[0.89] sm:scale-[0.9] xl:scale-[0.82] 2xl:scale-[0.88]">
            <Logo tone={scrolled ? "dark" : "light"} />
          </span>
        </a>

        {/* ── Desktop navigation ─────────────────────────────── */}
        <nav
          aria-label="Primary"
          className={cn(
            "hidden min-w-0 items-center justify-center rounded-full px-2.5 py-2 xl:flex",
            scrolled
              ? "bg-white/55 shadow-[inset_0_0_0_1px_rgba(15,76,129,0.07)]"
              : "bg-white/[0.055] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12)] backdrop-blur-md",
          )}
        >
          <div className="flex items-center justify-center gap-0.5 2xl:gap-1.5">
            {beforeProducts.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-full px-3.5 py-2 text-[0.78rem] font-semibold tracking-[0.01em] transition-all duration-300 ease-out 2xl:px-4 2xl:text-[0.82rem]",
                  linkTone,
                  navPillTone,
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
                  "flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[0.78rem] font-semibold tracking-[0.01em] transition-all duration-300 ease-out 2xl:px-4 2xl:text-[0.82rem]",
                  linkTone,
                  navPillTone,
                  productsOpen &&
                    (scrolled
                      ? "bg-primary-50 text-primary"
                      : "bg-white/10 text-gold"),
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
                  "absolute left-1/2 top-full w-[42rem] -translate-x-1/2 pt-5 transition-all duration-300 ease-out 2xl:w-[46rem]",
                  productsOpen
                    ? "pointer-events-auto translate-y-0 opacity-100"
                    : "pointer-events-none translate-y-3 opacity-0",
                )}
              >
                <div className="overflow-hidden rounded-[1.75rem] border border-line/90 bg-white/96 shadow-[0_26px_70px_-34px_rgba(7,37,64,0.52)] backdrop-blur-2xl">
                  <div className="grid grid-cols-2 gap-1.5 p-4">
                    {productLinks.map((product, index) => {
                      const Icon = productIcons[index] ?? Ruler;
                      return (
                        <a
                          key={product.label}
                          href={product.href}
                          onClick={() => setProductsOpen(false)}
                          className="group flex items-start gap-3.5 rounded-2xl p-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:bg-mist hover:shadow-[0_14px_30px_-24px_rgba(15,76,129,0.42)]"
                        >
                          <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white group-hover:shadow-[0_12px_26px_-18px_rgba(15,76,129,0.55)]">
                            <Icon className="h-5 w-5" aria-hidden="true" />
                          </span>
                          <span>
                            <span className="block font-display text-[0.86rem] font-semibold tracking-tight text-ink transition-colors group-hover:text-primary">
                              {product.label}
                            </span>
                            <span className="mt-1 block text-xs leading-relaxed text-ink-soft">
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
                    className="group flex items-center justify-between gap-4 bg-primary px-6 py-4 text-white transition-colors duration-300 hover:bg-primary-700"
                  >
                    <span className="text-sm">
                      <span className="font-display font-semibold text-gold">
                        Free site visit in Eldoret.
                      </span>{" "}
                      <span className="text-white/78">
                        Book a measured consultation this week.
                      </span>
                    </span>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 transition-all duration-300 group-hover:bg-gold group-hover:text-primary-900">
                      <ArrowRight
                        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </span>
                  </a>
                </div>
              </div>
            </div>

            {afterProducts.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-full px-3.5 py-2 text-[0.78rem] font-semibold tracking-[0.01em] transition-all duration-300 ease-out 2xl:px-4 2xl:text-[0.82rem]",
                  linkTone,
                  navPillTone,
                )}
              >
                {link.label}
              </a>
            ))}
          </div>
        </nav>

        <div className="hidden min-w-0 items-center justify-end gap-3 xl:flex">
          <a
            href={site.phoneHref}
            className={cn(
              "hidden items-center gap-2 rounded-full px-3.5 py-2 text-[0.78rem] font-semibold transition-all duration-300 2xl:flex",
              scrolled
                ? "text-primary hover:bg-primary-50"
                : "text-white/84 hover:bg-white/10 hover:text-gold",
            )}
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            <span className="whitespace-nowrap">{site.phone}</span>
          </a>

          <a
            href="#contact"
            className={cn(
              buttonClass(scrolled ? "navy" : "gold", "sm"),
              "whitespace-nowrap px-4 py-2.5 text-[0.72rem] uppercase tracking-[0.12em] shadow-[0_14px_30px_-20px_rgba(7,37,64,0.55)] 2xl:px-5",
            )}
          >
            Request Consultation
          </a>
        </div>

        {/* ── Mobile toggle ──────────────────────────────────── */}
        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          aria-label="Open navigation menu"
          aria-expanded={menuOpen}
          className={cn(
            "flex h-11 w-11 items-center justify-center rounded-full transition-all duration-300 xl:hidden",
            scrolled
              ? "bg-white text-ink shadow-[0_10px_24px_-18px_rgba(7,37,64,0.45)] ring-1 ring-black/5 hover:bg-primary-50 hover:text-primary"
              : "bg-white/10 text-white ring-1 ring-white/15 backdrop-blur-md hover:bg-white/18",
          )}
        >
          <Menu className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      {/* ── Mobile menu overlay ──────────────────────────────── */}
      <div
        className={cn(
          "fixed left-0 top-0 z-[100] flex h-dvh w-screen flex-col overflow-hidden bg-primary-900 transition-opacity duration-300 xl:hidden",
          menuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <div className="grid-texture pointer-events-none absolute inset-0 opacity-55" />
        <div className="pointer-events-none absolute -right-28 -top-28 h-72 w-72 rounded-full bg-gold/12 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-primary-400/20 blur-3xl" />

        <div className="relative flex h-20 shrink-0 items-center justify-between border-b border-white/10 px-5">
          <span className="block origin-left scale-[0.86]">
            <Logo tone="light" />
          </span>

          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            aria-label="Close navigation menu"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/10 transition-all duration-300 hover:bg-white/18 hover:text-gold"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <nav
          aria-label="Mobile"
          className="relative flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto px-5 pb-8 pt-5 sm:px-7"
        >
          {navLinks.slice(0, 3).map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{ transitionDelay: `${i * 40}ms` }}
              className={cn(
                "rounded-2xl px-4 py-3.5 font-display text-[1.65rem] font-medium leading-none tracking-tight text-white/90 transition-all duration-500 hover:bg-white/[0.06] hover:text-gold sm:text-3xl",
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
                "flex w-full items-center justify-between rounded-2xl px-4 py-3.5 font-display text-[1.65rem] font-medium leading-none tracking-tight text-white/90 transition-all duration-500 hover:bg-white/[0.06] hover:text-gold sm:text-3xl",
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
              <div className="min-h-0 pb-2">
                <div className="ml-4 border-l border-white/10 pl-4">
                  {productLinks.map((product) => (
                    <a
                      key={product.label}
                      href={product.href}
                      onClick={() => setMenuOpen(false)}
                      className="block rounded-xl px-4 py-2.5 text-[0.95rem] font-medium text-white/66 transition-all duration-300 hover:bg-white/[0.05] hover:text-gold"
                    >
                      {product.label}
                    </a>
                  ))}
                </div>
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
                "rounded-2xl px-4 py-3.5 font-display text-[1.65rem] font-medium leading-none tracking-tight text-white/90 transition-all duration-500 hover:bg-white/[0.06] hover:text-gold sm:text-3xl",
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
              "mt-auto flex shrink-0 flex-col gap-3 pt-8 transition-all delay-300 duration-500",
              menuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
            )}
          >
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className={cn(
                buttonClass("gold", "lg", "w-full"),
                "uppercase tracking-[0.12em]",
              )}
            >
              Book a Free Consultation
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>

            <div className="flex flex-col gap-3 rounded-3xl border border-white/10 bg-white/[0.055] px-4 py-4 text-sm text-white/78 backdrop-blur-md sm:flex-row sm:items-center sm:justify-between">
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gold" aria-hidden="true" />
                Mon–Fri 8:00–17:30
              </span>

              <a
                href={site.phoneHref}
                className="flex items-center gap-2 font-semibold text-white transition-colors hover:text-gold"
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