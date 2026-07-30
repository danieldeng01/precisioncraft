import { cn } from "@/lib/utils";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 ease-out focus-visible:outline-2 focus-visible:outline-offset-4 disabled:cursor-not-allowed disabled:opacity-60";

const sizes = {
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-sm",
  sm: "px-4 py-2 text-xs",
} as const;

const variants = {
  /** Solid gold — primary CTA */
  gold: "bg-gold text-primary-900 shadow-gold hover:-translate-y-0.5 hover:bg-gold-400",
  /** Solid navy — secondary CTA */
  navy: "bg-primary text-white shadow-card hover:-translate-y-0.5 hover:bg-primary-600",
  /** Ghost on dark/heroes */
  ghostLight:
    "border border-white/40 text-white backdrop-blur-sm hover:border-gold hover:text-gold",
  /** Ghost on light backgrounds */
  ghostDark:
    "border border-ink/15 text-ink hover:-translate-y-0.5 hover:border-primary hover:text-primary",
  /** White pill for dark CTA bands */
  white:
    "bg-white text-primary shadow-card hover:-translate-y-0.5 hover:bg-primary-50",
} as const;

export function buttonClass(
  variant: keyof typeof variants = "gold",
  size: keyof typeof sizes = "md",
  className?: string,
) {
  return cn(base, sizes[size], variants[variant], className);
}
