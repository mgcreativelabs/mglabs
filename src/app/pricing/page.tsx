import type { Metadata } from "next";
import Link from "next/link";
import { Check, X, Zap, Crown, Building2, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Pricing — MG Creative Labs",
  description: "Simple, transparent pricing. Start free forever. Upgrade when you're ready to go deeper.",
};

// ---------------------------------------------------------------------------
// Plan data
// ---------------------------------------------------------------------------
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
      { text: "AI Design Academy", included: false },
      { text: "Save & organize prompts", included: false },
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
      { text: "AI Design Academy", included: true },
      { text: "Save & organize prompts", included: true },
      { text: "Progress tracking", included: true },
      { text: "Priority support", included: false },
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    icon: Building2,
    price: { monthly: 49, annual: 39 },
    description: "For teams and companies investing in AI skills at scale.",
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
      { text: "AI Design Academy", included: true },
      { text: "Save & organize prompts", included: true },
      { text: "Progress tracking", included: true },
      { text: "Priority support + dedicated account manager", included: true },
    ],
  },
];

const faqs = [
  {
    q: "Can I cancel anytime?",
    a: "Yes. Cancel from your dashboard at any time. You keep access until the end of the billing period. No questions asked.",
  },
  {
    q: "Is there a student discount?",
    a: "We offer 50% off for verified students and educators. Email us at mgcreativelabs@technologist.com with your .edu address.",
  },
  {
    q: "What payment methods do you accept?",
    a: "All major credit and debit cards (Visa, Mastercard, Amex), and PayPal. Payments are processed securely via Stripe.",
  },
  {
    q: "Can I switch plans?",
    a: "Yes — upgrade or downgrade at any time. Upgrades are prorated immediately. Downgrades take effect at the next billing cycle.",
  },
  {
    q: "What happens to my saved prompts if I downgrade?",
    a: "They're safe. Your saved prompts stay in your account. You just won't be able to save new ones beyond the free limit until you upgrade again.",
  },
  {
    q: "Do you offer a money-back guarantee?",
    a: "Yes — 14-day money-back guarantee on Pro. If you don't love it, we'll refund you in full, no questions asked.",
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="py-20 px-4 sm:px-6 max-w-4xl mx-auto text-center mesh-bg">
        <Badge variant="blue" className="mb-5">Simple pricing</Badge>
        <h1 className="text-5xl sm:text-6xl font-bold text-white mb-5 leading-tight">
          Start free. <span className="text-gradient">Go deeper</span> when ready.
        </h1>
        <p className="text-gray-400 text-xl max-w-xl mx-auto">
          No tricks, no paywalls on the basics. Upgrade when AI becomes your competitive advantage.
        </p>
      </section>

      {/* Plans */}
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
                      <plan.icon className={`h-4 w-4 ${isPro ? "text-blue-400" : "text-gray-400"}`} />
                    </div>
                    <span className="font-semibold text-white text-lg">{plan.name}</span>
                  </div>

                  <div className="flex items-end gap-1.5 mb-2">
                    <span className="text-5xl font-bold text-white">${plan.price.monthly}</span>
                    {plan.price.monthly > 0 && (
                      <span className="text-gray-500 text-sm mb-2">/month</span>
                    )}
                    {plan.price.monthly === 0 && (
                      <span className="text-gray-500 text-sm mb-2">forever</span>
                    )}
                  </div>

                  {plan.price.annual > 0 && (
                    <p className="text-sm text-green-400">
                      ${plan.price.annual}/mo billed annually — save {Math.round((1 - plan.price.annual / plan.price.monthly) * 100)}%
                    </p>
                  )}

                  <p className="text-gray-400 text-sm mt-2 leading-relaxed">{plan.description}</p>
                </div>

                {/* CTA */}
                <Link href={plan.cta.href} className="mb-6">
                  <Button variant={plan.cta.variant} size="md" className="w-full justify-center">
                    {plan.cta.label}
                    {isPro && <ArrowRight className="ml-2 h-4 w-4" />}
                  </Button>
                </Link>

                {/* Features */}
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
          All plans include SSL, 99.9% uptime, and GDPR compliance. No hidden fees.
        </p>
      </section>

      {/* Social proof */}
      <section className="py-16 px-4 sm:px-6 max-w-4xl mx-auto text-center">
        <p className="text-gray-500 text-sm mb-6 uppercase tracking-widest">Trusted by learners at</p>
        <div className="flex flex-wrap items-center justify-center gap-8 text-gray-600 font-semibold text-sm">
          {["Google", "Microsoft", "Shopify", "Stripe", "Notion", "Figma"].map((name) => (
            <span key={name}>{name}</span>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 sm:px-6 max-w-3xl mx-auto pb-24">
        <h2 className="text-3xl font-bold text-white text-center mb-10">
          Frequently asked questions
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
