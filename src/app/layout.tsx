import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { services, site } from "@/lib/site";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { WhatsAppFloat } from "@/components/site/WhatsAppFloat";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default:
      "Precision Craft · Premium Custom Cabinetry & Interior Solutions in Eldoret, Kenya",
    template: "%s · Precision Craft",
  },
  description: site.description,
  applicationName: "Precision Craft",
  keywords: [
    "custom kitchen cabinets Eldoret",
    "cabinet makers Kenya",
    "bespoke kitchens Kenya",
    "wardrobes Eldoret",
    "interior solutions Uasin Gishu",
    "hotel fit-outs Kenya",
    "office joinery Eldoret",
    "Precision Craft Interiors Kenya",
  ],
  authors: [{ name: site.legalName, url: site.url }],
  creator: site.legalName,
  publisher: site.legalName,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_KE",
    url: site.url,
    siteName: site.name,
    title: `${site.name} · ${site.tagline}`,
    description: site.description,
    images: [
      {
        url: "/images/hero-kitchen.jpg",
        width: 1600,
        height: 900,
        alt: "Premium navy and brass bespoke kitchen crafted by Precision Craft Interiors Kenya",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} · ${site.tagline}`,
    description: site.description,
    images: ["/images/hero-kitchen.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "Interior Design & Cabinetry",
};

export const viewport: Viewport = {
  themeColor: "#0f4c81",
  width: "device-width",
  initialScale: 1,
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  "@id": `${site.url}/#business`,
  name: site.legalName,
  alternateName: site.name,
  slogan: site.tagline,
  description: site.description,
  url: site.url,
  image: `${site.url}/images/hero-kitchen.jpg`,
  logo: `${site.url}/icon.svg`,
  email: site.email,
  telephone: site.phone.replace(/\s/g, ""),
  foundingDate: String(site.founder.year),
  founder: {
    "@type": "Person",
    name: site.founder.name,
    jobTitle: site.founder.role,
  },
  priceRange: "KSh 240,000 - KSh 2,500,000+",
  currenciesAccepted: "KES",
  paymentAccepted: "M-Pesa, Bank Transfer, Card",
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressRegion: site.address.county,
    addressCountry: "KE",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: site.geo.lat,
    longitude: site.geo.lng,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "17:30",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "09:00",
      closes: "14:00",
    },
  ],
  areaServed: [
    "Uasin Gishu",
    "Trans Nzoia",
    "Nandi",
    "Elgeyo Marakwet",
    "Kakamega",
    "Nakuru",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Interior Solutions",
    itemListElement: services.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service.title,
        description: service.copy,
        areaServed: "Uasin Gishu County, Kenya",
      },
    })),
  },
  sameAs: site.socials.map((s) => s.href),
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Poppins:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd),
          }}
        />
      </head>
      <body className="bg-white font-body text-ink antialiased">
        <a
          href="#main"
          className="sr-only z-[100] rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-card focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to main content
        </a>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <WhatsAppFloat />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
