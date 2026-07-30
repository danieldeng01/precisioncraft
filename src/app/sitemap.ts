import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://precisioncraft.co.ke";
  const now = new Date();

  const anchors = [
    "",
    "/#about",
    "/#services",
    "/#products",
    "/#process",
    "/#portfolio",
    "/#testimonials",
    "/#faq",
    "/#contact",
  ];

  return anchors.map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.8,
  }));
}
