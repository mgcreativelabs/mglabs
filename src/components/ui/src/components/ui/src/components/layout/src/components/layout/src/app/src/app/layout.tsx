import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://mgcreativelabs.com"),
  title: {
    default: "MG Creative Labs — Master AI, Prompt Engineering & AI Design",
    template: "%s | MG Creative Labs",
  },
  description: "The #1 platform to learn AI, prompt engineering, AI coding, AI design, and automation. Join 50,000+ creators.",
  keywords: ["AI education", "prompt engineering", "AI coding", "AI design", "ChatGPT prompts"],
  openGraph: {
    type: "website",
    siteName: "MG Creative Labs",
    title: "MG Creative Labs — Master AI & Creative Technology",
    description: "The #1 platform to learn AI, prompt engineering, AI coding, AI design, and automation.",
  },
  twitter: {
    card: "summary_large_image",
    site: "@mgcreativelabs",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body className="antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}