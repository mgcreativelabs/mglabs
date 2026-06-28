import type { MetadataRoute } from "next";

// FIX: fallback was "https://mgcreativelabs.com" (not live yet).
// Now defaults to the real live URL — override with
// NEXT_PUBLIC_SITE_URL once you connect your custom domain.
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://mglabs.vexr.dev";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/dashboard", "/admin", "/api/"] },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
