"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ElementType, ReactNode } from "react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger delay in milliseconds. */
  delay?: number;
  /** HTML tag to render (div, li or p). */
  as?: ElementType;
  /** Animation style: slide-up or gentle scale. */
  variant?: "up" | "scale";
  id?: string;
  role?: string;
  ariaLabel?: string;
};

/**
 * Framer Motion scroll-reveal — plays once when the element enters the
 * viewport, gracefully disabled under prefers-reduced-motion.
 */
export function Reveal({
  children,
  className = "",
  delay = 0,
  as = "div",
  variant = "up",
  id,
  role,
  ariaLabel,
}: RevealProps) {
  const reduceMotion = useReducedMotion();
  const Component = (
    as === "li" ? motion.li : as === "p" ? motion.p : motion.div
  ) as typeof motion.div;

  const variants: Variants = {
    hidden:
      variant === "scale"
        ? { opacity: 0, scale: 0.96, y: 14 }
        : { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.9, delay: delay / 1000, ease: EASE },
    },
  };

  if (reduceMotion) {
    return (
      <Component
        id={id}
        role={role}
        aria-label={ariaLabel}
        className={className}
      >
        {children}
      </Component>
    );
  }

  return (
    <Component
      id={id}
      role={role}
      aria-label={ariaLabel}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      variants={variants}
    >
      {children}
    </Component>
  );
}
