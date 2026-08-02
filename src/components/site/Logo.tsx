import { cn } from "@/lib/utils";

/**
 * Precision Craft monogram — a rotated precision square with an inscribed
 * mitre joint, rendered in currentColor + gold.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 44 44"
      fill="none"
      aria-hidden="true"
      className={cn("h-10 w-10", className)}
    >
      <rect
        x="10"
        y="10"
        width="24"
        height="24"
        rx="3"
        transform="rotate(45 22 22)"
        stroke="currentColor"
        strokeWidth="2.4"
      />
      <path
        d="M22 13.5 L30.5 22 L22 30.5"
        stroke="#D4AF37"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="22" cy="22" r="2.4" fill="#D4AF37" />
    </svg>
  );
}

export function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  return (
    <span className="flex items-center gap-3">
      <LogoMark
        className={tone === "light" ? "text-white" : "text-primary"}
      />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-lg font-semibold tracking-tight",
            tone === "light" ? "text-white" : "text-ink",
          )}
        >
          Wegner Precision<span className="text-gold"> Craft</span>
        </span>
        <span
          className={cn(
            "mt-1 text-[0.58rem] font-medium uppercase tracking-[0.32em]",
            tone === "light" ? "text-white/60" : "text-ink-soft/80",
          )}
        >
          Interiors · Kenya
        </span>
      </span>
    </span>
  );
}
