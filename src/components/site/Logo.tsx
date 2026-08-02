import Image from "next/image";
import { cn } from "@/lib/utils";

export function Logo({
  tone = "dark",
  stacked = false,
  className,
}: {
  tone?: "dark" | "light";
  stacked?: boolean;
  className?: string;
}) {
  const variant = tone === "light" ? "white" : "black";

  return (
    <span
      className={cn(
        "flex min-w-0 items-center",
        stacked ? "justify-center" : "justify-start",
        className,
      )}
    >
      <Image
        src={
          stacked
            ? `/logos/logo-stacked-${variant}.png`
            : `/logos/logo-horizontal-${variant}.png`
        }
        alt="Wegner Precision Craft"
        width={stacked ? 180 : 300}
        height={stacked ? 180 : 72}
        priority
        sizes={
          stacked
            ? "(max-width: 768px) 132px, 160px"
            : "(max-width: 640px) 190px, (max-width: 1280px) 210px, 240px"
        }
        className={cn(
          "h-auto select-none object-contain transition-all duration-300 ease-out",
          stacked
            ? "w-32 sm:w-36 md:w-40"
            : "w-[11.75rem] sm:w-[12.5rem] xl:w-[13.25rem] 2xl:w-[14.5rem]",
        )}
      />
    </span>
  );
}