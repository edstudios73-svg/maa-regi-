import type { MetadataRoute } from "next";
import { IS_DEMO, SITE_URL } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  // The concept is kept out of search engines so it is never mistaken for the official site.
  if (IS_DEMO) return { rules: { userAgent: "*", disallow: "/" } };
  return { rules: { userAgent: "*", allow: "/", disallow: "/checkout" }, sitemap: `${SITE_URL}/sitemap.xml` };
}
