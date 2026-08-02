import Image from "next/image";
import { cn } from "@/lib/utils";

export function Logo({
  tone = "dark",
  stacked = false,
}: {
  tone?: "dark" | "light";
  stacked?: boolean;
}) {
  const variant = tone === "light" ? "white" : "black";

  return (
    <span className="flex items-center">
      <Image
        src={
          stacked
            ? `/logos/logo-stacked-${variant}.png`
            : `/logos/logo-horizontal-${variant}.png`
        }
        alt="Wegner Precision Craft"
        width={stacked ? 170 : 290}
        height={stacked ? 170 : 70}
        priority
        className={cn(
          "h-auto",
          stacked ? "w-36 md:w-40" : "w-52 md:w-64"
        )}
      />
    </span>
  );
}