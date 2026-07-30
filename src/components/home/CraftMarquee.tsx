const items = [
  "Bespoke Kitchens",
  "Custom Wardrobes",
  "Media Walls",
  "Bathroom Vanities",
  "Office Fit-outs",
  "Hotel Interiors",
  "Restaurant Joinery",
  "Institutional Millwork",
];

/**
 * Slow, elegant ticker of specialties below the hero.
 */
export function CraftMarquee() {
  return (
    <div
      aria-label="Our specialties"
      className="overflow-hidden border-b border-white/10 bg-primary-900 py-5"
    >
      <div className="flex w-max animate-marquee items-center gap-10 pr-10">
        {[...items, ...items].map((item, index) => (
          <span
            key={`${item}-${index}`}
            aria-hidden={index >= items.length}
            className="flex items-center gap-10 whitespace-nowrap"
          >
            <span className="font-display text-sm font-medium uppercase tracking-[0.22em] text-white/70">
              {item}
            </span>
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rotate-45 bg-gold"
            />
          </span>
        ))}
      </div>
    </div>
  );
}
