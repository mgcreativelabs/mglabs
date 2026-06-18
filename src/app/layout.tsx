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
  description:
    "The #1 platform to learn AI, prompt engineering, AI coding, AI design, and automation.",
  openGraph: { type: "website", siteName: "MG Creative Labs" },
  twitter: { card: "summary_large_image", site: "@mgcreativelabs" },
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
          Individual pages should NOT add their own pt-16 anymore.
        */}
        <main className="pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

import React from "react";
