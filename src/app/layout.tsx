import type { Metadata } from "next";
import "@/app/globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { generateStructuredData } from "@/lib/utils/seo";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://mgcreativelabs.com"),
  title: {
    default: "MG Creative Labs — Master AI, Prompt Engineering & AI Design",
    template: "%s | MG Creative Labs",
  },
  description:
    "The #1 platform to learn AI, prompt engineering, AI coding, AI design, and automation. Join 50,000+ creators mastering the future.",
  keywords: [
    "AI education", "prompt engineering", "AI coding", "AI design", "machine learning",
    "ChatGPT prompts", "Midjourney", "AI tools", "automation", "no-code AI",
  ],
  authors: [{ name: "MG Creative Labs" }],
  creator: "MG Creative Labs",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mgcreativelabs.com",
    siteName: "MG Creative Labs",
    title: "MG Creative Labs — Master AI, Prompt Engineering & AI Design",
    description: "The #1 platform to learn AI, prompt engineering, AI coding, AI design, and automation.",
    images: [{ url: "/og-default.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@mgcreativelabs",
    creator: "@mgcreativelabs",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const structuredData = generateStructuredData("website", {});

  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: structuredData }}
        />
      </head>
      <body className="antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
