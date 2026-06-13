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
  description: "The #1 platform to learn AI, prompt engineering, AI coding, AI design, and automation.",
  openGraph: {
    type: "website",
    siteName: "MG Creative Labs",
  },
  twitter: { card: "summary_large_image", site: "@mgcreativelabs" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
<body className="min-h-screen bg-black text-white antialiased">
  <div className="mx-auto max-w-6xl px-6">
    <Navbar />
    <main className="py-12">{children}</main>
    <Footer />
  </div>
</body>        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}