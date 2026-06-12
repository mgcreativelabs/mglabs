// =============================================
// SEO UTILITIES — src/lib/utils/seo.ts
// =============================================

import type { Metadata } from "next";
import type { SEOMeta } from "@/types";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://mgcreativelabs.com";
const SITE_NAME = "MG Creative Labs";
const DEFAULT_DESCRIPTION =
  "Master AI, Prompt Engineering, Coding with AI, AI Design, and Automation. The #1 platform for the next generation of AI creators.";

export function generateMetadata(meta: SEOMeta): Metadata {
  const title = meta.title
    ? `${meta.title} | ${SITE_NAME}`
    : `${SITE_NAME} — Master AI & Creative Technology`;
  const description = meta.description || DEFAULT_DESCRIPTION;
  const url = meta.url ? `${SITE_URL}${meta.url}` : SITE_URL;
  const image = meta.image || `${SITE_URL}/og-default.jpg`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
      type: meta.type || "website",
      ...(meta.publishedAt && { publishedTime: meta.publishedAt }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@mgcreativelabs",
    },
    alternates: { canonical: url },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export function generateStructuredData(type: "website" | "article" | "course", data: Record<string, unknown>) {
  const base = {
    "@context": "https://schema.org",
    "@type": type === "website" ? "WebSite" : type === "article" ? "Article" : "Course",
  };

  if (type === "website") {
    return JSON.stringify({
      ...base,
      name: SITE_NAME,
      url: SITE_URL,
      description: DEFAULT_DESCRIPTION,
      sameAs: [
        "https://twitter.com/mgcreativelabs",
        "https://github.com/mgcreativelabs",
      ],
      potentialAction: {
        "@type": "SearchAction",
        target: `${SITE_URL}/search?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    });
  }

  return JSON.stringify({ ...base, ...data });
}
