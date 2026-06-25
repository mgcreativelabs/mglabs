// =============================================
// PRICING PAGE — src/app/pricing/page.tsx
//
// Architecture notes:
//  - Three standard tiers (Free / Pro / Enterprise) + the $500/mo Premium
//    AI Guidance plan, which is rendered as a distinct full-width section.
//  - "Trusted by Google / Microsoft / Shopify" social proof block REMOVED —
//    it was fabricated and creates legal and trust risk.
//  - #premium anchor enables deep-linking from course cards and the navbar.
//  - All plan data is typed as const so TypeScript checks it at build time.
// =============================================
import type { Metadata } from "next";
import Link from "next/link";
import {
  Check, X, Zap, Crown, Building2, ArrowRight,
  Star, ShieldCheck, MessageCircle, Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Pricing — MG Creative Labs",
  description:
    "Start free, go deeper with Pro, or unlock one-on-one Premium AI Guidance at $500/month.",
  openGraph: {
    title: "Pricing — MG Creative Labs",
    description:
      "Simple, transparent pricing. Start free forever. Upgrade when you need more.",
    type: "website",
  },
};

// ─── Plan data ────────────────────────────────────────────────────────────────
const plans = [
  {
    id: "free",
    name: "Free",
    icon: Zap,
    price: { monthly: 0, annual: 0 },
    description: "Everything you need to get started with AI learning.",
    cta: { label: "Get started free", href: "/signup", variant: "secondary" as const },
    badge: null,
    features: [
      { text: "AI Learning Hub — 3 free courses", included: true },
      { text: "Prompt Library — 50 free prompts", included: true },
      { text: "Community access", included: true },
      { text: "Weekly newsletter", included: true },
      { text: "Blog & tutorials", included: true },
      { text: "Unlimited course access", included: false },
      { text: "Full prompt library (1,200+)", included: false },
      { text: "AI Coding Academy", included: false },
      { text: "AI Design & Automation Academy", included: false },
      { text: "Save & organise prompts", included: false },
      { text: "Progress tracking", included: false },
      { text: "Priority support", included: false },
    ],
  },
  {
    id: "pro",
    name: "Pro",
    icon: Crown,
    price: { monthly: 9, annual: 7 },
    description: "Full access to everything. The plan serious AI creators choose.",
    cta: { label: "Start Pro — $9/mo", href: "/signup?plan=pro", variant: "primary" as const },
    badge: "Most popular",
    features: [
      { text: "AI Learning Hub — all courses", included: true },
      { text: "Prompt Library — all 1,200+ prompts", included: true },
      { text: "Community access", included: true },
      { text: "Weekly newsletter", included: true },
      { text: "Blog & tutorials", included: true },
      { text: "Unlimited course access", included: true },
      { text: "Full prompt library (1,200+)", included: true },
      { text: "AI Coding Academy", included: true },
      { text: "AI Design & Automation Academy", included: true },
      { text: "Save & organise prompts", included: true },
      { text: "Progress tracking", included: true },
      { text: "Priority support", included: false },
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    icon: Building2,
    price: { monthly: 49, annual: 39 },
    description: "For teams investing in AI skills at scale.",
    cta: { label: "Contact us", href: "/contact?subject=enterprise", variant: "secondary" as const },
    badge: null,
    features: [
      { text: "AI Learning Hub — all courses", included: true },
      { text: "Prompt Library — all 1,200+ prompts", included: true },
      { text: "Community access", included: true },
      { text: "Weekly newsletter", included: true },
      { text: "Blog & tutorials", included: true },
      { text: "Unlimited course access", included: true },
      { text: "Full prompt library (1,200+)", included: true },
      { text: "AI Coding Academy", included: true },
      { text: "AI Design & Automation Academy", included: true },
      { text: "Save & organise prompts", included: true },
      { text: "Progress tracking", included: true },
      { text: "Priority support + dedicated account manager", included: true },
    ],
  },
] as const;

// ─── Premium plan inclusions ──────────────────────────────────────────────────
const PREMIUM_INCLUSIONS = [
  "One-on-one guidance sessions across multiple AI platforms and tools",
  "Advanced strategic AI implementation support tailored to your projects",
  "Personalised recommendations for workflows, tools, and tech stack decisions",
  "Access to high-level AI workflows used by top performers",
  "Async support via direct communication channel",
  "Guidance on AI integration for business, product, and creative work",
  "Review and critique of your AI-built projects and workflows",
  "Monthly strategy review to align AI adoption with your goals",
];

// ─── FAQ data ─────────────────────────────────────────────────────────────────
const FAQS = [
  {
    q: "Can I cancel my Pro or Enterprise plan anytime?",
    a: "Yes. Cancel from your dashboard at any time. You keep access until the end of the current billing period. No questions asked.",
  },
  {
    q: "What is the refund policy for Premium AI Guidance?",
    a: "Premium AI Guidance is a personalised, time-committed service. Due to the one-on-one nature of the engagement, payments for Premium AI Guidance are non-refundable once a guidance session or period has commenced. We strongly encourage you to review the service description carefully and reach out with any questions before subscribing. This policy applies to the extent permitted by applicable law.",
  },
  {
    q: "Is there a student or educator discount?",
    a: "We offer 50% off Pro for verified students and educators. Email us at mgcreativelabs@technologist.com with your .edu address or institutional affiliation.",
  },
  {
    q: "What payment methods do you accept?",
    a: "All major credit and debit cards (Visa, Mastercard, Amex) and PayPal. Payments are processed securely via Stripe.",
  },
  {
    q: "Can I switch between Free, Pro, and Enterprise?",
    a: "Yes — upgrade or downgrade at any time. Upgrades take effect immediately and are prorated. Downgrades take effect at the next billing cycle.",
  },
  {
    q: "What does the Premium AI Guidance plan actually cover?",
    a: "Premium provides personalised, strategic AI guidance — not off-the-shelf course content. It is best suited for people building AI-powered businesses, products, or workflows who want expert advisory support. Results depend on individual goals, effort, and implementation. Outcomes are not guaranteed.",
  },
  {
    q: "How do I contact you about Premium AI Guidance?",
    a: "Click the 'Contact Us to Unlock Premium Guidance' button in the Premium section below, or email mgcreativelabs@technologist.com directly. We'll schedule a brief call to understand your needs before you commit.",
  },
  {
    q: "Do you offer a money-back guarantee on Pro?",
    a: "Yes — 14-day money-back guarantee on Pro. If you don't love it within 14 days of your first payment, we'll refund you in full, no questions asked.",
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function PricingPage() {
  return (
    <div className="min-h-screen">

      {/* ── Header ───────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 max-w-4xl mx-auto text-center">
        <Badge variant="blue" className="mb-5">Simple pricing</Badge>
        <h1 className="text-5xl sm:text-6xl font-bold text-white mb-5 leading-tight">
          Start free.{" "}
          <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Go deeper
          </span>{" "}
          when ready.
        </h1>
        <p className="text-gray-400 text-xl max-w-xl mx-auto">
          No tricks, no paywalls on the basics. Upgrade when AI becomes your
          competitive advantage.
        </p>
      </section>

      {/* ── Standard plans ───────────────────────────────────────────────── */}
      <section className="py-10 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan) => {
            const isPro = plan.id === "pro";
            return (
              <div
                key={plan.id}
                className={`relative rounded-2xl p-7 flex flex-col transition-all duration-300 ${
                  isPro
                    ? "bg-gradient-to-b from-blue-900/40 to-purple-900/30 border-2 border-blue-500/50 shadow-2xl shadow-blue-500/10"
                    : "bg-white/[0.03] border border-white/[0.07] hover:border-white/20"
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                      {plan.badge}
                    </span>
                  </div>
                )}

                {/* Plan header */}
                <div className="mb-6">
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className={`p-2 rounded-lg ${isPro ? "bg-blue-500/20" : "bg-white/5"}`}>
                      <plan.icon
                        className={`h-4 w-4 ${isPro ? "text-blue-400" : "text-gray-400"}`}
                      />
                    </div>
                    <span className="font-semibold text-white text-lg">{plan.name}</span>
                  </div>

                  <div className="flex items-end gap-1.5 mb-2">
                    <span className="text-5xl font-bold text-white">
                      ${plan.price.monthly}
                    </span>
                    <span className="text-gray-500 text-sm mb-2">
                      {plan.price.monthly === 0 ? "forever" : "/month"}
                    </span>
                  </div>

                  {plan.price.annual > 0 && (
                    <p className="text-sm text-green-400">
                      ${plan.price.annual}/mo billed annually — save{" "}
                      {Math.round(
                        (1 - plan.price.annual / plan.price.monthly) * 100
                      )}
                      %
                    </p>
                  )}

                  <p className="text-gray-400 text-sm mt-2 leading-relaxed">
                    {plan.description}
                  </p>
                </div>

                <Link href={plan.cta.href} className="mb-6">
                  <Button
                    variant={plan.cta.variant}
                    size="md"
                    className="w-full justify-center"
                  >
                    {plan.cta.label}
                    {isPro && <ArrowRight className="ml-2 h-4 w-4" />}
                  </Button>
                </Link>

                <ul className="space-y-3 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature.text} className="flex items-start gap-3">
                      {feature.included ? (
                        <Check className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      ) : (
                        <X className="h-4 w-4 text-gray-700 mt-0.5 flex-shrink-0" />
                      )}
                      <span
                        className={`text-sm leading-snug ${
                          feature.included ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <p className="text-center text-gray-600 text-sm mt-6">
          All plans include SSL encryption, 99.9% uptime, and GDPR-oriented data handling.
          No hidden fees.
        </p>
      </section>

      {/* ── PREMIUM AI GUIDANCE ──────────────────────────────────────────── */}
      {/*
        This section has id="premium" so it can be deep-linked from:
          - Course detail pages: /pricing#premium
          - Navbar "Pricing" link (direct scroll target)
          - Homepage Premium section CTA
      */}
      <section
        id="premium"
        className="py-20 px-4 sm:px-6 max-w-6xl mx-auto scroll-mt-20"
      >
        <div className="relative rounded-3xl overflow-hidden border border-purple-500/30 bg-gradient-to-br from-purple-900/40 via-slate-900 to-blue-900/30">
          {/* Decorative glow */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none" />

          <div className="relative z-10 p-8 lg:p-16">
            <div className="max-w-3xl">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-sm font-medium mb-6">
                <Sparkles className="h-3.5 w-3.5" />
                Premium AI Guidance
              </div>

              {/* Price */}
              <div className="flex items-end gap-3 mb-4">
                <span className="text-7xl font-bold text-white">$500</span>
                <span className="text-gray-400 text-lg mb-3">/month</span>
              </div>

              {/* Description */}
              <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-2xl">
                Receive premium one-on-one guidance across multiple platforms
                and tools designed to unlock the full potential of your AI
                projects. Get advanced strategic support, personalised
                recommendations, implementation guidance, and access to
                high-level workflows used by top performers.
              </p>

              {/* What's included */}
              <div className="grid sm:grid-cols-2 gap-3 mb-10">
                {PREMIUM_INCLUSIONS.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300 text-sm leading-snug">{item}</span>
                  </div>
                ))}
              </div>

              {/* Trust signals */}
              <div className="flex flex-wrap gap-4 mb-10">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <ShieldCheck className="h-4 w-4 text-green-400" />
                  Results depend on individual goals and effort. Not guaranteed.
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <MessageCircle className="h-4 w-4 text-blue-400" />
                  We recommend reviewing the service description before subscribing.
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="mailto:mgcreativelabs@technologist.com?subject=Premium%20AI%20Guidance%20Inquiry&body=Hi%2C%20I%20am%20interested%20in%20learning%20more%20about%20the%20Premium%20AI%20Guidance%20plan.%0A%0AMy%20goals%3A%0A%0AQuestions%3A"
                  className="inline-flex"
                >
                  <Button
                    variant="primary"
                    size="lg"
                    rightIcon={<ArrowRight className="h-4 w-4" />}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 border-0"
                  >
                    Contact Us to Unlock Premium Guidance
                  </Button>
                </a>
                <Link href="/contact?subject=premium">
                  <Button variant="secondary" size="lg">
                    Ask a question first
                  </Button>
                </Link>
              </div>

              <p className="text-gray-600 text-xs mt-4">
                Premium AI Guidance payments are non-refundable once a guidance
                period has commenced. Please review the{" "}
                <Link href="/terms" className="text-gray-500 hover:text-gray-300 underline underline-offset-2">
                  Terms of Service
                </Link>{" "}
                before subscribing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 max-w-3xl mx-auto pb-24">
        <h2 className="text-3xl font-bold text-white text-center mb-10">
          Frequently asked questions
        </h2>
        <div className="space-y-4">
          {FAQS.map((faq) => (
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
          <p className="text-gray-500 text-sm mb-4">Still have questions?</p>
          <Link href="/contact">
            <Button variant="secondary" size="md">
              Contact us
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
