import Image from "next/image";
import { ArrowRight, Award, ChevronDown, MapPin } from "lucide-react";
import { buttonClass } from "@/components/ui/button";

const stats = [
  { value: "30+", label: "Years of Bench Experience" },
  { value: "150+", label: "Projects Delivered" },
  { value: "40+", label: "Commercial Fit-outs" },
  { value: "5 Yr", label: "Workmanship Warranty" },
];

export function Hero() {
  return (
    <section
      id="home"
      aria-label="Welcome to Precision Craft Interiors Kenya"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-primary-900"
    >
      {/* ── Backdrop ─────────────────────────────────────────── */}
      <div className="hero-zoom absolute inset-0">
        <Image
          src="/images/hero-kitchen.jpg"
          alt="Premium bespoke kitchen with matte navy cabinetry, brass hardware and a marble waterfall island, crafted by Precision Craft in Eldoret"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-primary-900/90 via-primary-900/55 to-primary-900/15"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-primary-900/95 to-transparent"
      />

      {/* ── Content ──────────────────────────────────────────── */}
      <div className="relative mx-auto w-full max-w-7xl px-5 pb-40 pt-36 sm:px-8 lg:pb-44">
        <div className="max-w-2xl">
          <p className="hero-enter inline-flex items-center gap-2.5 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-white/90 backdrop-blur-md">
            <MapPin className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
            Premium Interior Solutions · Eldoret, Kenya
          </p>

          <h1
            className="hero-enter mt-7 font-display text-[2.6rem] font-semibold leading-[1.06] tracking-tight text-white sm:text-6xl lg:text-[4.25rem]"
            style={{ animationDelay: "0.12s" }}
          >
            Crafting Beautiful
            <br />
            Spaces with{" "}
            <span className="relative inline-block text-gold">
              Precision
              <svg
                viewBox="0 0 220 12"
                aria-hidden="true"
                className="absolute -bottom-1 left-0 w-full text-gold/70"
                preserveAspectRatio="none"
              >
                <path
                  d="M3 9 Q 110 2 217 8"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          <p
            className="hero-enter mt-7 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg"
            style={{ animationDelay: "0.24s" }}
          >
            Precision Craft Interiors Kenya designs, builds and installs
            bespoke kitchens, wardrobes and commercial interiors for
            discerning homeowners, developers and businesses across Uasin
            Gishu and beyond.
          </p>

          <div
            className="hero-enter mt-10 flex flex-wrap items-center gap-4"
            style={{ animationDelay: "0.36s" }}
          >
            <a href="#contact" className={buttonClass("gold", "lg")}>
              Request a Free Quote
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a href="#portfolio" className={buttonClass("ghostLight", "lg")}>
              Explore Our Work
            </a>
          </div>

          <p
            className="hero-enter mt-8 flex items-center gap-2 text-sm text-white/60"
            style={{ animationDelay: "0.48s" }}
          >
            <Award className="h-4 w-4 text-gold" aria-hidden="true" />
            Rated 5.0 by our first clients — from family homes to hospitality
            suites.
          </p>
        </div>
      </div>

      {/* ── Stats strip ──────────────────────────────────────── */}
      <div className="hero-enter relative" style={{ animationDelay: "0.6s" }}>
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-t-3xl border border-white/10 bg-white/5 backdrop-blur-xl lg:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="group flex flex-col bg-white/[0.03] px-6 py-6 transition-colors duration-300 hover:bg-white/[0.08] sm:px-8"
              >
                <dt className="order-2 mt-1 block text-xs font-medium uppercase tracking-wider text-white/55">
                  {stat.label}
                </dt>
                <dd className="order-1 font-display text-3xl font-semibold text-white sm:text-4xl">
                  {stat.value.includes("Yr") ? (
                    stat.value
                  ) : (
                    <>
                      {stat.value.replace("+", "")}
                      <span className="text-gold">+</span>
                    </>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Scroll cue */}
      <a
        href="#about"
        aria-label="Scroll to learn about Precision Craft"
        className="hero-enter absolute bottom-40 left-1/2 hidden -translate-x-1/2 text-white/60 transition-colors hover:text-gold lg:block"
        style={{ animationDelay: "0.9s" }}
      >
        <ChevronDown className="h-6 w-6 animate-bounce" aria-hidden="true" />
      </a>
    </section>
  );
}
