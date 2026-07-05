import type { Metadata } from "next";
import Link from "next/link";
import { Check, ArrowRight, Rocket, Crown } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { ServicesGrid } from "@/components/sections/ServicesGrid";

export const metadata: Metadata = {
  title: "Pricing — MG Labs",
  description:
    "Transparent pricing to build a real AI product. Launch Program starts at $500 — done-with-you, deployed, and yours.",
};

// ---------------------------------------------------------------------------
// Plan data
// ---------------------------------------------------------------------------
const plans = [
  {
    id: "launch",
    name: "Launch Program",
    Icon: Rocket,
    price: "$500",
    period: " per project",
    note: "Done-with-you. Not a course.",
    tagline: "Launch your AI MVP quickly.",
    badge: "⭐ Most Popular",
    featured: true,
    forWho:
      "We build your first working version so you can validate your idea before investing in a full product. No technical experience required.",
    cta: { label: "Apply for Launch Program", href: "/contact?plan=launch" },
    features: [
      "Done-with-you AI project build",
      "1-on-1 guidance with Mahdi",
      "Real deployment — live URL you own",
      "4-week structured build timeline",
      "WhatsApp access during your build",
      "Unlimited revisions during build period",
      "Post-launch support (2 weeks)",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    Icon: Crown,
    price: "$1,000+",
    period: "",
    note: "Custom scope. Multiple projects.",
    tagline: "Build a business, not just a product.",
    badge: null as string | null,
    featured: false,
    forWho:
      "Entrepreneurs and freelancers who want to build multiple AI products or start an AI-powered business with ongoing mentorship.",
    cta: { label: "Talk to Mahdi", href: "/contact?plan=premium" },
    features: [
      "Everything in Launch Program",
      "Multiple AI project builds",
      "Business strategy sessions",
      "Monetization planning",
      "Client acquisition guidance (freelancers)",
      "Monthly mentorship check-ins",
      "Priority access to everything",
    ],
  },
] as const;

const faqs = [
  {
    q: "What exactly is the Launch Program?",
    a: "It's a done-with-you engagement where we build your first AI product together. You bring the idea. Mahdi guides every decision — scoping, building, connecting APIs, and deploying live. It's not a course. It's structured execution with a guaranteed deliverable.",
  },
  {
    q: "What kind of AI product can I build?",
    a: "Any AI-powered tool you can realistically complete in 4 weeks — a chatbot, a business assistant, a content generator, an AI customer support bot, a recommendation tool. We scope it together at the start to make sure it's achievable and valuable.",
  },
  {
    q: "I have zero technical experience. Can I do this?",
    a: "Yes. That's exactly who this is built for. You don't need to know how to code. You need an idea and the commitment to follow the process. We handle every technical decision together.",
  },
  {
    q: "What does 'deployed' mean?",
    a: "Your product will be live on the internet — a real URL you can share, use, and show to others. Not a prototype. Not a sandbox demo. A working product you fully own.",
  },
  {
    q: "How is this different from a course?",
    a: "Courses teach concepts. The Launch Program produces a result. At the end, you have a deployed AI product — not just knowledge and certificates. The $500 pays for the outcome, not the information.",
  },
  {
    q: "What happens after I apply?",
    a: "You contact us, we schedule a short free scoping call, you pay, and then the 4-week guided build starts. You have WhatsApp access throughout. Nothing happens without your input and approval.",
  },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export default function PricingPage() {
  return (
    <div className="min-h-screen">

      {/* ── Header ── */}
      <section className="py-20 px-4 sm:px-6 max-w-4xl mx-auto text-center">
        <Badge variant="blue" className="mb-5">Transparent pricing</Badge>
        <h1 className="text-5xl sm:text-6xl font-bold text-white mb-5 leading-tight">
          Build something real,<br />
          <span className="text-gradient">starting today</span>.
        </h1>
        <p className="text-gray-400 text-xl max-w-2xl mx-auto">
          MG Labs is not a course platform. Every plan is built around one goal —
          helping you go from idea to a real, launched AI product.
        </p>
      </section>

      {/* ── Plans grid ── */}
      <section className="py-10 px-4 sm:px-6 max-w-4xl mx-auto" id="plans">
        <div className="grid md:grid-cols-2 gap-5 items-start">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-2xl p-7 flex flex-col transition-all duration-300 ${
                plan.featured
                  ? "bg-gradient-to-b from-brand-blue/20 via-surface-1 to-brand-purple/10 border-2 border-brand-blue/50 shadow-2xl shadow-brand-blue/20"
                  : "bg-white/[0.03] border border-white/[0.07] hover:border-white/15"
              }`}
            >
              {/* Top glow for featured card */}
              {plan.featured && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-brand-blue to-transparent" />
              )}

              {/* Badge */}
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap">
                  <span className="px-4 py-1.5 rounded-full text-xs font-bold bg-gradient-brand text-white shadow-lg">
                    {plan.badge}
                  </span>
                </div>
              )}

              {/* Icon + Name */}
              <div className="flex items-center gap-2.5 mb-4">
                <div className={`p-2 rounded-lg ${plan.featured ? "bg-brand-blue/20" : "bg-white/5"}`}>
                  <plan.Icon className={`h-4 w-4 ${plan.featured ? "text-brand-blue" : "text-gray-400"}`} />
                </div>
                <span className="font-bold text-white text-lg">{plan.name}</span>
              </div>

              {/* Price */}
              <div className="mb-0.5">
                <span className="text-4xl font-black text-white">{plan.price}</span>
                {plan.period && (
                  <span className="text-gray-500 text-sm ml-1">{plan.period}</span>
                )}
              </div>
              <p className="text-xs text-gray-600 mb-3">{plan.note}</p>

              {/* Tagline */}
              <p className={`text-sm font-semibold mb-5 ${plan.featured ? "text-brand-blue" : "text-gray-400"}`}>
                {plan.tagline}
              </p>

              {/* Who it's for */}
              <div className="mb-5 p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1.5">
                  Who this is for
                </p>
                <p className="text-xs text-gray-400 leading-relaxed">{plan.forWho}</p>
              </div>

              {/* CTA — styled Link, no nested button */}
              <Link
                href={plan.cta.href}
                className={`mb-6 w-full py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
                  plan.featured
                    ? "bg-gradient-brand text-white shadow-lg shadow-brand-blue/30 hover:scale-[1.02]"
                    : "bg-white/5 text-gray-200 border border-white/10 hover:bg-white/10 hover:border-white/20"
                }`}
              >
                {plan.cta.label}
                {plan.featured && <ArrowRight className="w-4 h-4" />}
              </Link>

              {/* Feature list */}
              <ul className="space-y-2.5 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <Check
                      className={`h-4 w-4 mt-0.5 flex-shrink-0 ${
                        plan.featured ? "text-brand-blue" : "text-green-400"
                      }`}
                    />
                    <span className="text-sm text-gray-300 leading-snug">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="text-center text-gray-700 text-xs mt-6">
          All plans include SSL, 99.9% uptime, and GDPR compliance. No hidden fees.
        </p>
      </section>

      {/* ── Services ── */}
      <section className="py-16 px-4 sm:px-6 max-w-6xl mx-auto" id="services">
        <div className="text-center mb-12">
          <Badge variant="purple" className="mb-4">Also available</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Need something done for you instead?
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Content production, freelance work, and ready-made digital products —
            separate from the AI Builder Platform.
          </p>
        </div>
        <ServicesGrid />
      </section>

      {/* ── Value comparison ── */}
      <section className="py-16 px-4 sm:px-6 max-w-3xl mx-auto" id="launch">
        <div className="rounded-2xl bg-white/[0.02] border border-white/[0.07] p-10 text-center">
          <p className="text-gray-500 text-sm font-bold uppercase tracking-widest mb-3">The math</p>
          <h2 className="text-3xl font-bold text-white mb-8">
            The $500 Launch Program vs the alternatives
          </h2>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div className="text-center p-4">
              <div className="text-gray-600 text-xs uppercase tracking-wider mb-3">Hiring a developer</div>
              <div className="text-2xl font-bold text-gray-400 mb-2">$3,000+</div>
              <div className="text-xs text-gray-600 leading-relaxed">
                They build it. You understand nothing. No learning.
              </div>
            </div>
            <div className="text-center relative p-4">
              <div className="absolute inset-0 rounded-xl bg-brand-blue/10 border border-brand-blue/20" />
              <div className="relative">
                <div className="text-brand-blue text-xs uppercase tracking-wider font-bold mb-3">MG Labs</div>
                <div className="text-2xl font-bold text-white mb-2">$500</div>
                <div className="text-xs text-gray-300 leading-relaxed">
                  We build together. You own it and understand every decision.
                </div>
              </div>
            </div>
            <div className="text-center p-4">
              <div className="text-gray-600 text-xs uppercase tracking-wider mb-3">Generic course</div>
              <div className="text-2xl font-bold text-gray-400 mb-2">$0–$200</div>
              <div className="text-xs text-gray-600 leading-relaxed">
                You learn the concepts. But you never finish building.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-16 px-4 sm:px-6 max-w-3xl mx-auto pb-24">
        <h2 className="text-3xl font-bold text-white text-center mb-10">
          Questions about the Launch Program
        </h2>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div
              key={faq.q}
              className="p-5 rounded-xl bg-white/[0.03] border border-white/[0.07]"
            >
              <h3 className="font-semibold text-white mb-2 text-sm">{faq.q}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm mb-1">Still have questions?</p>
          <p className="text-gray-600 text-xs mb-6">We respond within 24 hours.</p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-200 hover:bg-white/10 hover:border-white/20 transition-all text-sm font-medium"
          >
            Get in touch
          </Link>
        </div>
      </section>
    </div>
  );
}
