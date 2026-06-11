import type { Metadata } from "next";
import type { SEOMeta } from "@/types";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://mgcreativelabs.com";
const SITE_NAME = "MG Creative Labs";
const DEFAULT_DESCRIPTION = "Master AI, Prompt Engineering, Coding with AI, AI Design, and Automation.";

export function generateMetadata(meta: SEOMeta): Metadata {
  const title = meta.title ? `${meta.title} | ${SITE_NAME}` : SITE_NAME;
  const description = meta.description || DEFAULT_DESCRIPTION;
  const url = meta.url ? `${SITE_URL}${meta.url}` : SITE_URL;

  return {
    title,
    description,
    openGraph: {
      title, description, url,
      siteName: SITE_NAME,
      type: meta.type || "website",
    },
    twitter: {
      card: "summary_large_image",
      title, description,
      creator: "@mgcreativelabs",
    },
    alternates: { canonical: url },
  };
}

export function generateStructuredData(type: string, data: Record<string, unknown>) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": type === "website" ? "WebSite" : "Article",
    name: SITE_NAME,
    url: SITE_URL,
    description: DEFAULT_DESCRIPTION,
    ...data,
  });
}