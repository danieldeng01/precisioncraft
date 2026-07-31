"use client";

import { useState } from "react";
import { ExternalLink, Loader2, MapPin, MousePointerClick } from "lucide-react";
import { site } from "@/lib/site";

const QUERY = "Uganda Road, Eldoret, Uasin Gishu County, Kenya";

/**
 * Performance-first Google Map:
 * renders a branded placeholder and only loads the interactive iframe
 * after the visitor opts in. If NEXT_PUBLIC_GOOGLE_MAPS_KEY is configured
 * it uses the official Embed API, otherwise the keyless embed.
 */
export function MapEmbed({ height = "16rem" }: { height?: string }) {
  const [loadState, setLoadState] = useState<"idle" | "loading" | "ready">(
    "idle",
  );

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY;
  const src = apiKey
    ? `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodeURIComponent(QUERY)}&zoom=15`
    : `https://www.google.com/maps?q=${encodeURIComponent(QUERY)}&z=15&output=embed`;

  if (loadState === "idle") {
    return (
      <div
        className="relative flex flex-col items-center justify-center gap-4 bg-primary-800 text-center"
        style={{ height }}
        role="img"
        aria-label={`Map placeholder — ${site.name} showroom at ${QUERY}`}
      >
        <div className="grid-texture pointer-events-none absolute inset-0 opacity-60" />
        <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-gold/15 text-gold">
          <MapPin className="h-6 w-6" aria-hidden="true" />
        </span>
        <div className="relative px-6">
          <p className="font-display text-sm font-semibold text-white">
            {site.address.street}, {site.address.city}
          </p>
          <p className="mt-1 text-xs text-white/55">
            {site.address.county}, {site.address.country}
          </p>
        </div>
        <div className="relative flex flex-wrap items-center justify-center gap-3 px-6">
          <button
            type="button"
            onClick={() => setLoadState("loading")}
            className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-xs font-semibold text-primary-900 transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-400"
          >
            <MousePointerClick className="h-4 w-4" aria-hidden="true" />
            Load Interactive Map
          </button>
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(QUERY)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-2.5 text-xs font-semibold text-white transition-colors hover:border-gold hover:text-gold"
          >
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
            Get Directions
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="relative" style={{ height }}>
      {loadState === "loading" && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-primary-800">
          <Loader2
            className="h-7 w-7 animate-spin text-gold"
            aria-label="Loading map"
          />
        </div>
      )}
      <iframe
        title={`Interactive map — ${site.name} showroom, ${QUERY}`}
        src={src}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
        onLoad={() => setLoadState("ready")}
        className="h-full w-full grayscale-[20%] contrast-[1.03] transition-opacity duration-700"
      />
    </div>
  );
}
