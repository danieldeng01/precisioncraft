import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  tone?: "dark" | "light";
  stacked?: boolean;
  className?: string;
}

export function Logo({
  tone = "dark",
  stacked = false,
  className,
}: LogoProps) {
  const variant = tone === "light" ? "white" : "black";

  return (
    <Image
      src={
        stacked
          ? `/logos/logo-stacked-${variant}.png`
          : `/logos/logo-horizontal-${variant}.png`
      }
      alt="Wegner Precision Craft"
      width={stacked ? 180 : 320}
      height={stacked ? 180 : 78}
      priority
      className={cn(
        "h-auto select-none transition-all duration-300",
        stacked
          ? "w-40 md:w-44"
          : "w-60 md:w-72 lg:w-80",
        className
      )}
    />
  );
}