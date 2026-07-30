"use client";

import {
  useEffect,
  useRef,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger delay in milliseconds. */
  delay?: number;
  /** HTML tag to render. */
  as?: ElementType;
  /** Animation style: slide-up or gentle scale. */
  variant?: "up" | "scale";
  id?: string;
  role?: string;
  ariaLabel?: string;
};

/**
 * Lightweight scroll-reveal using IntersectionObserver — no animation library,
 * respects prefers-reduced-motion via globals.css.
 */
export function Reveal({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
  variant = "up",
  id,
  role,
  ariaLabel,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const style: CSSProperties = delay
    ? { transitionDelay: `${delay}ms` }
    : {};

  return (
    <Tag
      ref={ref}
      id={id}
      role={role}
      aria-label={ariaLabel}
      className={`${variant === "scale" ? "reveal-scale" : "reveal"} ${className}`}
      style={style}
    >
      {children}
    </Tag>
  );
}
