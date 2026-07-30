import { cn } from "@/lib/utils";
import { Reveal } from "@/components/anim/Reveal";

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  /** Render light text for dark sections */
  tone?: "dark" | "light";
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
  tone = "dark",
  className,
}: SectionHeaderProps) {
  const isLight = tone === "light";

  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <p
        className={cn(
          "flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em]",
          align === "center" && "justify-center",
          "text-gold",
        )}
      >
        <span aria-hidden="true" className="h-px w-8 bg-gold/70" />
        {eyebrow}
        <span
          aria-hidden="true"
          className={cn("h-px w-8 bg-gold/70", align === "left" && "hidden")}
        />
      </p>
      <h2
        className={cn(
          "mt-4 font-display text-3xl font-semibold leading-[1.15] tracking-tight sm:text-4xl lg:text-[2.75rem]",
          isLight ? "text-white" : "text-ink",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-5 text-base leading-relaxed sm:text-lg",
            isLight ? "text-white/70" : "text-ink-soft",
          )}
        >
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
