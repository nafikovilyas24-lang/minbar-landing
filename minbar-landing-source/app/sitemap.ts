import type { MetadataRoute } from "next";
import { loadKhutbas } from "@/lib/supabase-khutbas";
import { entitySlug, uniqueEntities } from "@/lib/slugs";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://minbararhive.ru";
  const items = await loadKhutbas();
  const latest = items[0]?.isoDate ? new Date(`${items[0].isoDate}T12:00:00Z`) : new Date();
  const staticPages = ["", "/archive", "/about", "/upload"].map((path) => ({
    url: `${base}${path}`,
    lastModified: latest,
    changeFrequency: path === "" || path === "/archive" ? "weekly" as const : "monthly" as const,
    priority: path === "" ? 1 : path === "/archive" ? 0.9 : 0.6,
  }));
  const khutbaPages = items.map((item) => ({ url: `${base}/khutba/${item.id}`, lastModified: new Date(`${item.isoDate}T12:00:00Z`), changeFrequency: "monthly" as const, priority: 0.8 }));
  const cityPages = uniqueEntities(items.map((item) => item.city)).map((city) => ({ url: `${base}/city/${entitySlug(city)}`, lastModified: latest, changeFrequency: "weekly" as const, priority: 0.75 }));
  const mosquePages = uniqueEntities(items.map((item) => item.mosque)).map((mosque) => ({ url: `${base}/mosque/${entitySlug(mosque)}`, lastModified: latest, changeFrequency: "weekly" as const, priority: 0.75 }));
  return [...staticPages, ...khutbaPages, ...cityPages, ...mosquePages];
}
