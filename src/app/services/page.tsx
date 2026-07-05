// =============================================
// SERVICES PAGE — src/app/services/page.tsx
// =============================================
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ServicesGrid } from "@/components/sections/ServicesGrid";

export const metadata: Metadata = {
  title: "Services — MG Labs",
  description:
    "AI content and short-form video production, freelance services, and ready-to-use digital products from MG Labs.",
};

export default function ServicesPage() {
  return (
    <div className="pt-16">
      {/* Header */}
      <section className="py-20 px-4 sm:px-6 max-w-4xl mx-auto text-center mesh-bg">
        <Badge variant="blue" className="mb-5">Services</Badge>
        <h1 className="text-5xl sm:text-6xl font-display font-bold text-white mb-5 leading-tight">
          Done-for-you work,{" "}
          <span className="text-gradient">when you need it done fast</span>.
        </h1>
        <p className="text-gray-400 text-xl max-w-2xl mx-auto">
          Beyond the AI Builder Platform, MG Labs offers hands-on services —
          content production, freelance work, and ready-made digital products.
        </p>
      </section>

      {/* Services grid */}
      <section className="py-10 px-4 sm:px-6 max-w-6xl mx-auto">
        <ServicesGrid />
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 text-center max-w-2xl mx-auto">
        <h2 className="text-3xl font-display font-bold text-white mb-4">
          Not sure which service fits?
        </h2>
        <p className="text-gray-500 mb-8">
          Tell us what you&apos;re trying to build and we&apos;ll point you to the right option.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/contact">
            <Button size="lg" variant="primary" rightIcon={<ArrowRight className="h-4 w-4" />}>
              Contact us
            </Button>
          </Link>
          <Link href="/pricing">
            <Button size="lg" variant="secondary">See platform pricing</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
