import type { MetadataRoute } from "next";
import { navItems, siteConfig } from "@/lib/constants";

// Built from the navigation so a new page cannot ship without an entry.
export default function sitemap(): MetadataRoute.Sitemap {
  return navItems.map((item) => ({
    url: new URL(item.href, siteConfig.url).toString(),
    changeFrequency: item.href === "/now" ? "monthly" : "yearly",
    priority: item.href === "/" ? 1 : 0.7,
  }));
}
