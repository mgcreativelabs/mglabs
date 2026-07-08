import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next";
import React from "react";

// ─────────────────────────────────────────────────────────
// FIX: Was hardcoded to "https://mgcreativelabs.com" — a
// domain that isn't live yet. Sitemap/robots/canonical URLs
// were silently pointing Google at a dead domain.
//
// Now: reads NEXT_PUBLIC_SITE_URL if you've set it in Vercel,
// otherwise falls back to your actual live URL so SEO tags
// are always correct, even before you set the env var.
//
// Once you buy/connect mgcreativelabs.com, just add
// NEXT_PUBLIC_SITE_URL=https://mgcreativelabs.com in Vercel
// → Settings → Environment Variables, then redeploy.
// ─────────────────────────────────────────────────────────
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://mglabs.vexr.dev";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "MG Creative Labs — Master AI, Prompt Engineering & AI Design",
    template: "%s | MG Creative Labs",
  },
  description:
    "The #1 platform to learn AI, prompt engineering, AI coding, AI design, and automation.",
  openGraph: {
    type: "website",
    siteName: "MG Creative Labs",
    title: "MG Creative Labs — Master AI, Prompt Engineering & AI Design",
    description:
      "The #1 platform to learn AI, prompt engineering, AI coding, AI design, and automation.",
    url: SITE_URL,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "MG Creative Labs — Master AI. Build the future.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@mgcreativelabs",
    title: "MG Creative Labs — Master AI, Prompt Engineering & AI Design",
    description:
      "The #1 platform to learn AI, prompt engineering, AI coding, AI design, and automation.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased min-h-screen bg-black text-white">
        <Navbar />
        {/*
          pt-16 = 64px = exact height of the fixed navbar.
          This pushes ALL page content below the navbar globally.
          Individual pages should NOT add their own pt-16 —
          doing so double-stacks the padding. See the
          pt16-cleanup notes for the list of pages to fix.
        */}
        <main className="pt-16">
          {children}
        </main>
        <Footer />
        <SpeedInsights />
      </body>
    </html>
  );
}
