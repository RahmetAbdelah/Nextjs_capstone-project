import { getSiteUrl } from "@/lib/site-url";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/checkout", "/dashboard", "/kitchen", "/orders", "/track/"],
    },
    sitemap: getSiteUrl("/sitemap.xml").toString(),
  };
}
