"use client";

import { useReducedMotion, motion, type Variants } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Award, MapPin } from "lucide-react";
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
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.18,
    },
  },
};

const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 22,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.85,
      ease: EASE,
    },
  },
};

export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="home"
      aria-label="Precision Craft Interiors Kenya hero section"
      className="relative isolate overflow-hidden bg-primary-950"
    >
      <div className="relative min-h-[88svh] lg:min-h-[90svh]">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero-kitchen.jpg"
            alt="Modern luxury kitchen with custom cabinetry, marble island and premium wood finishes"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[62%_center] sm:object-[58%_center] lg:object-center"
          />
        </div>

        {/* Refined readability overlays */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-primary-950/82 via-primary-950/34 to-primary-950/8"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-primary-950/54 via-transparent to-primary-950/18"
        />
        <div
          aria-hidden="true"
          className="absolute inset-y-0 left-0 w-[58%] bg-[radial-gradient(circle_at_15%_48%,rgba(7,37,64,0.58),transparent_62%)]"
        />

        {/* Hero content */}
        <div className="relative z-10 mx-auto flex min-h-[88svh] max-w-[94rem] items-center px-5 pb-20 pt-28 sm:px-8 lg:min-h-[90svh] lg:px-10 lg:pb-24 lg:pt-32">
          <motion.div
            variants={reduceMotion ? undefined : container}
            initial="hidden"
            animate="visible"
            className="max-w-[32.5rem]"
          >
            <motion.p
              variants={fadeUp}
              className="inline-flex items-center gap-2.5 rounded-full border border-white/18 bg-white/[0.08] px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-white/82 backdrop-blur-md"
            >
              <MapPin className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
              Eldoret · Premium Interior Solutions
            </motion.p>

            <motion.h1
              variants={fadeUp}
              className="mt-7 max-w-[32rem] font-display text-[2.7rem] font-semibold leading-[1.04] tracking-[-0.045em] text-white sm:text-[3.5rem] lg:text-[4rem] xl:text-[4.25rem]"
            >
              Bespoke cabinetry for beautifully crafted interiors.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-[30rem] text-[1rem] leading-relaxed text-white/72 sm:text-[1.08rem]"
            >
              Custom kitchens, wardrobes and interior fit-outs designed with
              precision, built for refined Kenyan homes and businesses.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center"
            >
              <a
                href="#contact"
                className={buttonClass(
                  "gold",
                  "lg",
                  "w-full sm:w-auto shadow-[0_18px_36px_-18px_rgba(212,175,55,0.7)]",
                )}
              >
                Request Consultation
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>

              <a
                href="#portfolio"
                className={buttonClass(
                  "ghostLight",
                  "lg",
                  "w-full sm:w-auto bg-white/[0.04]",
                )}
              >
                View Portfolio
              </a>
            </motion.div>

            <motion.p
              variants={fadeUp}
              className="mt-7 flex items-center gap-2 text-sm text-white/58"
            >
              <Award className="h-4 w-4 text-gold" aria-hidden="true" />
              Built with precision. Installed with care. Trusted across Kenya.
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Elegant stats strip */}
      <div className="relative z-10 -mt-16 pb-10 sm:-mt-14 lg:pb-12">
        <div className="mx-auto max-w-[94rem] px-5 sm:px-8 lg:px-10">
          <motion.dl
            variants={reduceMotion ? undefined : fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            className="grid overflow-hidden rounded-[1.6rem] border border-white/12 bg-primary-950/72 shadow-[0_24px_60px_-38px_rgba(0,0,0,0.8)] backdrop-blur-2xl sm:grid-cols-2 lg:grid-cols-4"
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="border-b border-white/10 px-5 py-4 last:border-b-0 sm:border-r sm:last:border-r-0 lg:border-b-0 lg:px-7 lg:py-5"
              >
                <dt className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-white/42">
                  {stat.label}
                </dt>
                <dd className="mt-2 font-display text-2xl font-semibold tracking-tight text-white lg:text-[1.85rem]">
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
          </motion.dl>
        </div>
      </div>
    </section>
  );
}