import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.tagline} · Eldoret, Kenya`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Branded Open Graph card generated at runtime — navy canvas, gold accents,
 * the Precision monogram and the tagline. Safe for all social scrapers.
 */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#072540",
          padding: "80px 88px 78px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Gold glow, top right */}
        <div
          style={{
            position: "absolute",
            top: -180,
            right: -140,
            width: 560,
            height: 560,
            borderRadius: "50%",
            background:
              "radial-gradient(closest-side, rgba(212,175,55,0.28), rgba(212,175,55,0))",
          }}
        />
        {/* Gold glow, bottom left */}
        <div
          style={{
            position: "absolute",
            bottom: -220,
            left: -180,
            width: 520,
            height: 520,
            borderRadius: "50%",
            background:
              "radial-gradient(closest-side, rgba(15,76,129,0.55), rgba(15,76,129,0))",
          }}
        />

        {/* Brand row */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <svg width="76" height="76" viewBox="0 0 44 44" fill="none">
            <rect
              x="10"
              y="10"
              width="24"
              height="24"
              rx="3"
              transform="rotate(45 22 22)"
              stroke="#FFFFFF"
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
          <div style={{ display: "flex", flexDirection: "column", marginLeft: 26 }}>
            <span style={{ color: "#FFFFFF", fontSize: 34, fontWeight: 700 }}>
              Precision Craft
            </span>
            <span
              style={{
                color: "rgba(255,255,255,0.55)",
                fontSize: 14,
                letterSpacing: 6,
                marginTop: 6,
              }}
            >
              INTERIORS · KENYA
            </span>
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              color: "#D4AF37",
              fontSize: 22,
              letterSpacing: 8,
              fontWeight: 600,
            }}
          >
            CRAFTING BEAUTIFUL SPACES WITH
          </span>
          <span
            style={{
              color: "#FFFFFF",
              fontSize: 118,
              fontWeight: 700,
              letterSpacing: -3,
              marginTop: 10,
            }}
          >
            Precision.
          </span>
          <span
            style={{
              color: "rgba(255,255,255,0.72)",
              fontSize: 27,
              marginTop: 24,
              maxWidth: 880,
            }}
          >
            Bespoke kitchens, wardrobes & commercial interiors —
            design, build and installation under one roof.
          </span>
        </div>

        {/* Footer row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 22 }}>
            Eldoret · Uasin Gishu · Kenya
          </span>
          <span style={{ color: "#D4AF37", fontSize: 24, fontWeight: 700 }}>
            precisioncraft.co.ke
          </span>
        </div>

        {/* Bottom gold bar */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 10,
            background: "#D4AF37",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
