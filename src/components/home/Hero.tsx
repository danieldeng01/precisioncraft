"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import { ArrowRight, Award, ChevronDown, MapPin } from "lucide-react";
import { buttonClass } from "@/components/ui/button";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const stats = [
  { value: "30+", label: "Years of Bench Experience" },
  { value: "150+", label: "Projects Delivered" },
  { value: "40+", label: "Commercial Fit-outs" },
  { value: "1 Yr", label: "Workmanship Warranty" },
];

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13, delayChildren: 0.15 } },
};

const rise: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.05, ease: EASE },
  },
};

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);

  return (
    <section
      ref={sectionRef}
      id="home"
      aria-label="Welcome to Wegner Precision Craft Interiors Kenya"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-primary-900"
    >
      {/* ── Backdrop: intro zoom + gentle scroll parallax ──────── */}
      <motion.div
        className="absolute -bottom-[12%] -top-[12%] inset-x-0"
        style={reduceMotion ? {} : { y: backgroundY }}
      >
        <motion.div
          className="relative h-full w-full"
          initial={reduceMotion ? false : { scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.4, ease: EASE }}
        >
          <Image
            src="/images/hero-kitchen.jpg"
            alt="Luxury custom kitchen designed and installed by Wegner Precision Craft in Kenya. "
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
      </motion.div>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-primary-900/90 via-primary-900/55 to-primary-900/15"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-primary-900/95 to-transparent"
      />

      {/* ── Content ─────────────────────────────────────────── */}
      <motion.div
        className="relative mx-auto w-full max-w-7xl px-5 pb-40 pt-36 sm:px-8 lg:pb-44"
        variants={reduceMotion ? undefined : container}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-2xl">
          <motion.p
            variants={rise}
            className="inline-flex items-center gap-2.5 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-white/90 backdrop-blur-md"
          >
            <MapPin className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
            Premium Interior Solutions · Eldoret, Kenya
          </motion.p>

          <motion.h1
            variants={rise}
            className="mt-7 font-display text-[2.6rem] font-semibold leading-[1.06] tracking-tight text-white sm:text-6xl lg:text-[4.25rem]"
          >
            Transforming Spaces
            <br />
            Through{" "}
            <span className="relative inline-block text-gold">
              Precision Craftsmanship
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
          </motion.h1>

          <motion.p
            variants={rise}
            className="mt-7 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg"
          >
            Wegner Precision Craft designs, manufactures and installs premium kitchens, 
            wardrobes, commercial interiors and bespoke cabinetry for homeowners, 
            architects, developers and businesses across Kenya.
          </motion.p>

          <motion.div
            variants={rise}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a href="#contact" className={buttonClass("gold", "lg")}>
              Request a Free Consultation
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a href="#portfolio" className={buttonClass("ghostLight", "lg")}>
              View Our Projects
            </a>
          </motion.div>

          <motion.p
            variants={rise}
            className="mt-8 flex items-center gap-2 text-sm text-white/60"
          >
            <Award className="h-4 w-4 text-gold" aria-hidden="true" />
            < Award />
            Designed with precision.
            Built with quality.
            Installed with care.
          </motion.p>
        </div>
      </motion.div>

      {/* ── Stats strip ─────────────────────────────────────── */}
      <motion.div
        className="relative"
        variants={
          reduceMotion
            ? undefined
            : {
                hidden: { opacity: 0, y: 36 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 1.05, delay: 0.65, ease: EASE },
                },
              }
        }
        initial="hidden"
        animate="visible"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-t-3xl border border-white/10 bg-white/5 backdrop-blur-xl lg:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="group flex flex-col bg-white/[0.03] px-6 py-6 transition-colors duration-300 hover:bg-white/[0.08] sm:px-8"
              >
                <dt className="order-2 mt-1 text-xs font-medium uppercase tracking-wider text-white/55">
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
      </motion.div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        aria-label="Scroll to learn about Wegner Precision Craft"
        className="absolute bottom-40 left-1/2 hidden -translate-x-1/2 text-white/60 transition-colors hover:text-gold lg:block"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
      >
        <ChevronDown className="h-6 w-6 animate-bounce" aria-hidden="true" />
      </motion.a>
    </section>
  );
}
