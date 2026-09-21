import type { MetadataRoute } from "next";
import { entries, libers } from "@/data/codex";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://codex-nocturnum.example").replace(/\/$/, "");
  const staticRoutes = ["", "/codex", "/archive", "/search", "/about", "/sources"].map(route => ({
    url: `${base}${route}`,
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : .7,
  }));

  return [
    ...staticRoutes,
    ...libers.map(liber => ({ url: `${base}/liber/${liber.slug}`, changeFrequency: "monthly" as const, priority: .8 })),
    ...entries.map(entry => ({ url: `${base}/archive/${entry.slug}`, changeFrequency: "monthly" as const, priority: .6 })),
  ];
}
