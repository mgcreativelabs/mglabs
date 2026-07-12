// =============================================
// TERMS OF SERVICE — src/app/terms/page.tsx
//
// v2.0 — complete rewrite
//
// Added vs. v1.0:
//  § 3  Educational Nature of Content & Guidance (new)
//  § 5  Premium AI Guidance Service (new)
//  § 6  Payments, Subscriptions & Refund Policy (new — no-refund for Premium)
//  § 12 Limitation of Liability — proper cap, exceptions, enforceable language
//  § 13 Indemnification (new — was completely missing)
//  §§ 15-19 Governing Law, Severability, Entire Agreement, etc. (new)
//  Sticky sidebar TOC + section anchors
//  Plain-language summary box
// =============================================
import type { Metadata } from "next";
import Link from "next/link";
import { FileText, ArrowRight, Shield } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Terms of Service — MG Creative Labs",
  description:
    "The terms that govern your use of MG Creative Labs, including the Premium AI Guidance service.",
  robots: { index: true, follow: true },
};

const LAST_UPDATED = "June 24, 2026";
const VERSION = "2.0";

// ─── TOC entries ─────────────────────────────────────────────────────────────
const TOC = [
  { id: "s1",  label: "1. Agreement to These Terms"                   },
  { id: "s2",  label: "2. Description of Our Service"                 },
  { id: "s3",  label: "3. Educational Nature of Content"              },
  { id: "s4",  label: "4. User Accounts"                              },
  { id: "s5",  label: "5. Premium AI Guidance Service"                },
  { id: "s6",  label: "6. Payments, Subscriptions & Refunds"          },
  { id: "s7",  label: "7. User-Generated Content"                     },
  { id: "s8",  label: "8. MG Labs AI Feature"                         },
  { id: "s9",  label: "9. Prohibited Conduct"                         },
  { id: "s10", label: "10. Intellectual Property"                     },
  { id: "s11", label: "11. Disclaimer of Warranties"                  },
  { id: "s12", label: "12. Limitation of Liability"                   },
  { id: "s13", label: "13. Indemnification"                           },
  { id: "s14", label: "14. Termination & Suspension"                  },
  { id: "s15", label: "15. Governing Law"                             },
  { id: "s16", label: "16. General Provisions"                        },
  { id: "s17", label: "17. Changes to These Terms"                    },
  { id: "s18", label: "18. Contact Information"                       },
];

// ─── Shared heading styles ────────────────────────────────────────────────────
const H2 = "text-xl font-bold text-ink mb-4 scroll-mt-28";
const H3 = "text-base font-semibold text-ink mt-6 mb-2";
const P  = "text-ink-2 text-sm leading-relaxed";
const UL = "list-disc pl-5 space-y-1.5 text-ink-2 text-sm leading-relaxed";

export default function TermsPage() {
  return (
    <div className="min-h-screen">

      {/* ── Page header ── */}
      <div className="py-20 px-4 sm:px-6 border-b border-border">
        <div className="max-w-4xl mx-auto">
          <Badge variant="purple" className="mb-5">
            <FileText className="w-3 h-3" /> Legal
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-bold text-ink mb-3">
            Terms of{" "}
            <span className="text-brand-blue">
              Service
            </span>
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-sm text-ink-muted">
            <span>Last updated: {LAST_UPDATED}</span>
            <span className="text-ink-muted">·</span>
            <span>Version {VERSION}</span>
            <span className="text-ink-muted">·</span>
            <Link href="/privacy" className="text-blue-500 hover:text-blue-400 transition-colors flex items-center gap-1">
              Privacy Policy <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* ── Plain-language summary ── */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="rounded-xl bg-blue-900/20 border border-blue-500/20 p-5">
          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-ink font-semibold text-sm mb-1">Plain-language summary</p>
              <p className="text-ink-2 text-sm leading-relaxed">
                MG Creative Labs is an educational platform. All content — courses, prompts, and
                guidance — is for learning purposes and does not constitute professional advice.
                Results are not guaranteed. The $500/month Premium AI Guidance plan is
                non-refundable once a billing period commences. You are responsible for your own
                decisions. Please read the full document below.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Two-column layout ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-24 grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-12 items-start">

        {/* Sticky sidebar TOC */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 rounded-xl bg-surface-2 border border-border p-4">
            <p className="text-xs font-semibold text-ink-muted uppercase tracking-wider mb-3">
              In this document
            </p>
            <nav className="space-y-0.5">
              {TOC.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="block text-xs text-ink-muted hover:text-ink py-1.5 px-2 rounded-md hover:bg-surface-2 transition-colors leading-snug"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main content */}
        <div className="space-y-12 pt-4 min-w-0">

          {/* § 1 */}
          <section id="s1">
            <h2 className={H2}>1. Agreement to These Terms</h2>
            <p className={P}>
              These Terms of Service (&ldquo;Terms&rdquo;) constitute a legally binding agreement
              between you and MG Creative Labs (&ldquo;MG Creative Labs,&rdquo; &ldquo;we,&rdquo;
              &ldquo;us,&rdquo; or &ldquo;our&rdquo;). They govern your access to and use of the
              MG Creative Labs website, learning platform, AI tools, community features, and all
              related services (collectively, the &ldquo;Platform&rdquo;).
            </p>
            <p className={`${P} mt-3`}>
              By creating an account, making a purchase, or using any part of the Platform, you
              confirm that you have read, understood, and agree to be bound by these Terms and our{" "}
              <Link href="/privacy" className="text-blue-400 hover:underline">
                Privacy Policy
              </Link>
              , which is incorporated herein by reference. If you do not agree to these Terms, you
              must not use the Platform.
            </p>
            <p className={`${P} mt-3`}>
              You must be at least 13 years of age (or the minimum digital age of consent in your
              jurisdiction, if higher) to use the Platform. By using the Platform, you represent
              that you meet this requirement.
            </p>
          </section>

          {/* § 2 */}
          <section id="s2">
            <h2 className={H2}>2. Description of Our Service</h2>
            <p className={P}>
              MG Creative Labs is an AI education platform that provides:
            </p>
            <ul className={`${UL} mt-3`}>
              <li>Structured online courses across AI, coding, design, and automation</li>
              <li>A curated library of prompt templates for use with AI language models</li>
              <li>MG Labs AI — a free AI chat assistant for learning and experimentation</li>
              <li>A community platform for knowledge sharing and peer support</li>
              <li>
                Premium AI Guidance — personalised one-on-one advisory support (see § 5)
              </li>
              <li>Blog content, tutorials, and a directory of AI tools</li>
            </ul>
            <p className={`${P} mt-3`}>
              We reserve the right to modify, expand, or discontinue any aspect of the Platform at
              any time. We will provide reasonable advance notice of material changes that
              significantly affect your access or paid subscription.
            </p>
          </section>

          {/* § 3 */}
          <section id="s3">
            <h2 className={H2}>3. Educational Nature of Content and Guidance</h2>
            <p className={P}>
              <strong className="text-ink">All content on the Platform is provided for
              educational and informational purposes only.</strong> This includes, without
              limitation, course videos, written lessons, prompt templates, community discussions,
              AI-generated responses, and advisory guidance provided through the Premium AI
              Guidance service.
            </p>
            <p className={`${P} mt-3`}>
              Nothing on the Platform constitutes or should be construed as professional advice of
              any kind, including but not limited to legal, financial, investment, tax, medical,
              psychological, or business advice. Where the Platform provides information in these
              domains, it does so strictly for educational illustration and general awareness — not
              as a substitute for advice from a qualified professional licensed in your jurisdiction.
            </p>
            <p className={`${P} mt-3`}>
              You acknowledge and agree that:
            </p>
            <ul className={`${UL} mt-3`}>
              <li>
                Learning outcomes and results from applying educational content vary significantly
                between individuals and depend entirely on your background knowledge, effort,
                implementation approach, personal circumstances, and factors outside our control.
              </li>
              <li>
                MG Creative Labs makes no representation, warranty, or guarantee that any specific
                result, financial outcome, career advancement, skill level, or business success
                will be achieved through use of the Platform or its content.
              </li>
              <li>
                You are solely responsible for evaluating the appropriateness and accuracy of any
                Platform content for your specific situation before relying on or acting on it.
              </li>
              <li>
                AI-generated content (including MG Labs AI responses and AI-assisted course
                content) may contain errors, inaccuracies, or outdated information and must be
                independently verified before use in any decision-making context.
              </li>
            </ul>
          </section>

          {/* § 4 */}
          <section id="s4">
            <h2 className={H2}>4. User Accounts</h2>
            <h3 className={H3}>4.1 Registration</h3>
            <p className={P}>
              Certain features of the Platform require you to create an account. You agree to
              provide accurate, current, and complete information during registration and to keep
              your account information up to date.
            </p>
            <h3 className={H3}>4.2 Account security</h3>
            <p className={P}>
              You are responsible for maintaining the confidentiality of your account credentials
              and for all activity that occurs under your account. You must notify us immediately
              at{" "}
              <a
                href="mailto:mgcreativelabs@technologist.com"
                className="text-blue-400 hover:underline"
              >
                mgcreativelabs@technologist.com
              </a>{" "}
              if you suspect unauthorised access to your account.
            </p>
            <h3 className={H3}>4.3 One account per person</h3>
            <p className={P}>
              Each account is for a single individual. You may not share your account credentials
              with others or create multiple accounts to circumvent access limits or abuse free-tier
              offerings.
            </p>
          </section>

          {/* § 5 */}
          <section id="s5">
            <h2 className={H2}>5. Premium AI Guidance Service</h2>
            <h3 className={H3}>5.1 Nature of the service</h3>
            <p className={P}>
              The Premium AI Guidance service (&ldquo;Premium Service&rdquo;) provides subscribers
              with personalised one-on-one advisory support focused on AI implementation,
              workflows, tools, and strategy. The Premium Service is an <strong className="text-ink">
              educational advisory service</strong> — not a professional consulting, legal,
              financial, technical, or business services engagement.
            </p>
            <p className={`${P} mt-3`}>
              Premium guidance is provided based on our knowledge and experience at the time of
              delivery. It does not constitute professional advice in any regulated field, and
              should not replace advice from qualified professionals.
            </p>
            <h3 className={H3}>5.2 No guarantee of results</h3>
            <p className={P}>
              Outcomes from the Premium Service depend entirely on your individual goals,
              circumstances, implementation effort, market conditions, and other factors outside
              our control. We make no representation, guarantee, or warranty that any specific
              revenue, business outcome, skill advancement, or other result will be achieved
              through engagement with the Premium Service.
            </p>
            <h3 className={H3}>5.3 Review before subscribing</h3>
            <p className={P}>
              Before subscribing to the Premium Service, you are strongly encouraged to:
            </p>
            <ul className={`${UL} mt-2`}>
              <li>Read this Terms of Service document in full</li>
              <li>Review the Premium AI Guidance description on our{" "}
                <Link href="/pricing#premium" className="text-blue-400 hover:underline">
                  Pricing page
                </Link>
              </li>
              <li>Contact us with any questions before committing</li>
              <li>Ensure the service aligns with your specific needs and situation</li>
            </ul>
            <p className={`${P} mt-3`}>
              By subscribing to the Premium Service, you confirm that you have reviewed the
              service description and understand its educational, non-professional nature.
            </p>
          </section>

          {/* § 6 */}
          <section id="s6">
            <h2 className={H2}>6. Payments, Subscriptions, and Refund Policy</h2>
            <h3 className={H3}>6.1 Billing</h3>
            <p className={P}>
              Paid plans are billed on a recurring basis (monthly or annual) via Stripe. By
              subscribing, you authorise us to charge your payment method on the applicable
              billing cycle. Prices are displayed in USD and are inclusive of applicable taxes
              unless stated otherwise.
            </p>
            <h3 className={H3}>6.2 Pro plan — 14-day money-back guarantee</h3>
            <p className={P}>
              If you are not satisfied with the Pro plan, you may request a full refund within 14
              days of your first payment by contacting us at{" "}
              <a
                href="mailto:mgcreativelabs@technologist.com"
                className="text-blue-400 hover:underline"
              >
                mgcreativelabs@technologist.com
              </a>
              . This guarantee applies to your first payment only and does not apply to renewal
              charges.
            </p>
            <h3 className={H3}>6.3 Premium AI Guidance — no-refund policy</h3>
            <p className={`${P} font-medium`}>
              Due to the personalised, time-invested nature of the Premium AI Guidance service,{" "}
              <strong className="text-ink">
                all payments for the Premium Service are non-refundable
              </strong>{" "}
              once a guidance session or billing period has commenced.
            </p>
            <p className={`${P} mt-3`}>
              This no-refund policy applies to the fullest extent permitted by applicable law.
              Certain consumer protection statutes in your jurisdiction may provide statutory
              rights that cannot be contractually waived. Nothing in this Section is intended to
              exclude, limit, or modify any non-waivable statutory rights you may have under the
              laws of your jurisdiction.
            </p>
            <p className={`${P} mt-3`}>
              If you believe there has been an error in billing, please contact us within 30 days
              of the charge and we will review your case in good faith.
            </p>
            <h3 className={H3}>6.4 Cancellation</h3>
            <p className={P}>
              You may cancel any subscription at any time from your account dashboard. Upon
              cancellation, you retain access until the end of the current paid billing period. No
              partial-period refunds are issued except where required by applicable law or covered
              by the Pro plan money-back guarantee above.
            </p>
            <h3 className={H3}>6.5 Failed payments</h3>
            <p className={P}>
              If a payment fails, we will attempt to retry the charge. Continued failed payments
              may result in suspension or downgrade of your account to the free tier.
            </p>
          </section>

          {/* § 7 */}
          <section id="s7">
            <h2 className={H2}>7. User-Generated Content</h2>
            <p className={P}>
              You retain ownership of prompts, community posts, replies, and other content you
              submit to the Platform (&ldquo;User Content&rdquo;). By posting User Content that
              is publicly visible (for example, in the community or shared prompt library), you
              grant MG Creative Labs a non-exclusive, worldwide, royalty-free licence to display,
              reproduce, distribute, and promote that content within the Platform and in
              marketing materials related to the Platform.
            </p>
            <p className={`${P} mt-3`}>
              You represent and warrant that your User Content does not violate any third-party
              rights (including intellectual property and privacy rights) and does not violate any
              applicable law. You are solely responsible for your User Content.
            </p>
            <p className={`${P} mt-3`}>
              We reserve the right to remove User Content that violates these Terms or that we
              determine, in our sole discretion, is harmful, offensive, misleading, or otherwise
              contrary to the spirit of the Platform.
            </p>
          </section>

          {/* § 8 */}
          <section id="s8">
            <h2 className={H2}>8. MG Labs AI Feature</h2>
            <p className={P}>
              MG Labs AI is an AI chat assistant powered by a third-party large language model
              (currently Llama 3.3 70B via Groq, Inc.). AI responses are generated automatically
              and may be inaccurate, incomplete, outdated, biased, or otherwise unreliable.
            </p>
            <p className={`${P} mt-3`}>
              AI output from MG Labs AI is provided for exploratory, educational, and experimental
              use only. It does not constitute professional advice of any kind. You are responsible
              for independently verifying any information before acting on it.
            </p>
            <p className={`${P} mt-3`}>
              Do not submit sensitive personal information (such as financial account numbers,
              health information, or government ID numbers) in AI chat messages. Your messages are
              transmitted to Groq, Inc. for processing. See our{" "}
              <Link href="/privacy" className="text-blue-400 hover:underline">
                Privacy Policy
              </Link>{" "}
              for details.
            </p>
          </section>

          {/* § 9 */}
          <section id="s9">
            <h2 className={H2}>9. Prohibited Conduct</h2>
            <p className={P}>You agree not to use the Platform to:</p>
            <ul className={`${UL} mt-3`}>
              <li>
                Post, upload, or transmit content that is unlawful, harassing, hateful,
                defamatory, sexually explicit, or that promotes violence or discrimination
              </li>
              <li>
                Scrape, crawl, or otherwise collect data from the Platform via automated means
                without our express written consent
              </li>
              <li>
                Attempt to gain unauthorised access to any account, server, database, or system
                associated with the Platform
              </li>
              <li>
                Reverse engineer, decompile, or otherwise attempt to extract source code from any
                part of the Platform
              </li>
              <li>
                Circumvent any rate limits, access controls, or technical protection measures
              </li>
              <li>
                Create multiple free accounts to circumvent access limits, trial periods, or other
                restrictions
              </li>
              <li>Impersonate MG Creative Labs, our team members, or any other person or entity</li>
              <li>
                Commercially resell, sublicense, or redistribute any course content, prompt
                templates, or other proprietary Platform materials without our written permission
              </li>
              <li>
                Use the Platform to generate, distribute, or promote spam, phishing, malware, or
                other harmful content
              </li>
            </ul>
            <p className={`${P} mt-3`}>
              We may suspend or permanently terminate accounts that violate these rules, with or
              without notice, at our sole discretion.
            </p>
          </section>

          {/* § 10 */}
          <section id="s10">
            <h2 className={H2}>10. Intellectual Property</h2>
            <h3 className={H3}>10.1 Our property</h3>
            <p className={P}>
              The Platform&apos;s name, logo, brand identity, design, course content, written
              materials, prompt templates, software, and all other original materials are owned by
              or licensed to MG Creative Labs and are protected by copyright, trademark, and other
              intellectual property laws. No rights are granted to you other than those expressly
              set out in these Terms.
            </p>
            <h3 className={H3}>10.2 Permitted personal use</h3>
            <p className={P}>
              You may access and use Platform content for personal, non-commercial learning
              purposes only. You may use prompt templates for your own projects (personal or
              commercial). You may not reproduce, distribute, publicly display, or create
              derivative works from course content, lesson materials, or original Platform writing
              without our express written permission.
            </p>
            <h3 className={H3}>10.3 Feedback</h3>
            <p className={P}>
              If you provide feedback, suggestions, or ideas about the Platform, you grant us an
              unrestricted, irrevocable, perpetual, royalty-free right to use that feedback
              without any obligation of compensation, attribution, or confidentiality.
            </p>
          </section>

          {/* § 11 */}
          <section id="s11">
            <h2 className={H2}>11. Disclaimer of Warranties</h2>
            <p className={P}>
              To the fullest extent permitted by applicable law, the Platform and all content,
              services, and features provided through it are offered{" "}
              <strong className="text-ink">&ldquo;as is&rdquo;</strong> and{" "}
              <strong className="text-ink">&ldquo;as available,&rdquo;</strong> without
              warranties of any kind, whether express, implied, statutory, or otherwise.
            </p>
            <p className={`${P} mt-3`}>
              Without limiting the foregoing, MG Creative Labs expressly disclaims all implied
              warranties of merchantability, fitness for a particular purpose, title, accuracy,
              and non-infringement. We do not warrant that:
            </p>
            <ul className={`${UL} mt-3`}>
              <li>The Platform will be uninterrupted, error-free, or available at all times</li>
              <li>Course content, prompts, or AI-generated material will be accurate or complete</li>
              <li>Any defects or errors in the Platform will be corrected</li>
              <li>
                The Platform is free of viruses or other harmful components (though we take
                reasonable measures to keep it secure)
              </li>
              <li>
                Any educational content will achieve a specific result for you
              </li>
            </ul>
            <p className={`${P} mt-3`}>
              Some jurisdictions do not allow the exclusion of implied warranties. In those
              jurisdictions, the above exclusions apply to the maximum extent permitted by law.
            </p>
          </section>

          {/* § 12 */}
          <section id="s12">
            <h2 className={H2}>12. Limitation of Liability</h2>
            <h3 className={H3}>12.1 Exclusion of indirect damages</h3>
            <p className={P}>
              To the fullest extent permitted by applicable law, in no event shall MG Creative
              Labs, its officers, directors, employees, agents, suppliers, or licensors be liable
              for any indirect, incidental, special, exemplary, punitive, or consequential
              damages, including but not limited to:
            </p>
            <ul className={`${UL} mt-3`}>
              <li>Loss of profits, revenue, or anticipated savings</li>
              <li>Loss of data, goodwill, or business opportunities</li>
              <li>Cost of procuring substitute goods or services</li>
              <li>
                Decisions made in reliance on educational content, AI-generated material, or
                advisory guidance provided through the Platform
              </li>
            </ul>
            <p className={`${P} mt-3`}>
              This exclusion applies even if MG Creative Labs has been advised of the possibility
              of such damages and regardless of the legal theory (contract, tort, strict
              liability, or otherwise) on which the claim is based.
            </p>
            <h3 className={H3}>12.2 Cap on total liability</h3>
            <p className={P}>
              To the fullest extent permitted by applicable law, MG Creative Labs&apos;s total
              cumulative liability to you for all claims arising from or related to these Terms or
              the Platform shall not exceed the greater of: (a) the total amount you paid to MG
              Creative Labs in the twelve (12) months immediately preceding the event giving rise
              to the claim, or (b) one hundred US dollars (US$100).
            </p>
            <h3 className={H3}>12.3 Educational content and decisions</h3>
            <p className={P}>
              You are solely responsible for all decisions and actions you take based on
              educational content, course materials, prompt templates, AI-generated responses, or
              advisory guidance provided through the Platform. MG Creative Labs shall not be
              liable for any outcomes — financial, professional, personal, or otherwise — resulting
              from your reliance on Platform content or guidance.
            </p>
            <h3 className={H3}>12.4 Exceptions</h3>
            <p className={P}>
              Nothing in these Terms shall limit or exclude MG Creative Labs&apos;s liability for:
            </p>
            <ul className={`${UL} mt-3`}>
              <li>Death or personal injury caused by our gross negligence</li>
              <li>Fraud or fraudulent misrepresentation</li>
              <li>Any other liability that cannot be excluded or limited under applicable law</li>
            </ul>
            <p className={`${P} mt-3`}>
              Some jurisdictions do not allow certain liability limitations. In those
              jurisdictions, the limitations above apply to the maximum extent permitted.
            </p>
          </section>

          {/* § 13 */}
          <section id="s13">
            <h2 className={H2}>13. Indemnification</h2>
            <p className={P}>
              To the fullest extent permitted by applicable law, you agree to indemnify, defend,
              and hold harmless MG Creative Labs and its officers, directors, employees, agents,
              successors, and licensors from and against any and all claims, demands, actions,
              losses, liabilities, damages, costs, and expenses (including reasonable
              attorneys&apos; fees and court costs) arising from or relating to:
            </p>
            <ul className={`${UL} mt-3`}>
              <li>Your use of or access to the Platform</li>
              <li>Your violation of these Terms or any applicable law or regulation</li>
              <li>
                User Content you submit, post, or transmit through the Platform
              </li>
              <li>
                Your violation of any third-party rights, including intellectual property,
                privacy, or confidentiality rights
              </li>
              <li>
                Any decisions, actions, or outcomes resulting from your reliance on Platform
                content, educational materials, AI outputs, or advisory guidance
              </li>
              <li>
                Any claims by third parties arising from your use of the Platform in violation of
                these Terms
              </li>
            </ul>
            <p className={`${P} mt-3`}>
              We reserve the right, at our own expense, to assume the exclusive defence and
              control of any matter otherwise subject to indemnification by you, in which event
              you agree to cooperate with us in asserting any available defences.
            </p>
          </section>

          {/* § 14 */}
          <section id="s14">
            <h2 className={H2}>14. Termination and Suspension</h2>
            <h3 className={H3}>14.1 Your right to terminate</h3>
            <p className={P}>
              You may delete your account at any time from your dashboard settings or by
              contacting us. Upon deletion, your access to paid features ceases at the end of the
              current billing period. Requests to delete your personal data are handled per our
              Privacy Policy.
            </p>
            <h3 className={H3}>14.2 Our right to terminate or suspend</h3>
            <p className={P}>
              We may suspend or permanently terminate your account, with or without notice, if we
              determine in our sole discretion that you have violated these Terms, engaged in
              fraudulent conduct, or pose a risk to the Platform, other users, or our legitimate
              business interests. We are not liable to you for any consequences of a termination
              carried out in accordance with these Terms.
            </p>
            <h3 className={H3}>14.3 Effect of termination</h3>
            <p className={P}>
              Upon termination, your right to use the Platform immediately ceases. Provisions of
              these Terms that by their nature should survive termination shall continue in full
              force and effect, including §§ 3, 7, 10, 11, 12, 13, and 15.
            </p>
          </section>

          {/* § 15 */}
          <section id="s15">
            <h2 className={H2}>15. Governing Law and Dispute Resolution</h2>
            <p className={P}>
              These Terms are governed by and construed in accordance with applicable law. If
              you are a consumer, you may also benefit from mandatory protections afforded by the
              laws of your country of residence, and nothing in these Terms is intended to deprive
              you of those protections.
            </p>
            <p className={`${P} mt-3`}>
              We encourage you to contact us directly at{" "}
              <a
                href="mailto:mgcreativelabs@technologist.com"
                className="text-blue-400 hover:underline"
              >
                mgcreativelabs@technologist.com
              </a>{" "}
              if you have a dispute. We will make reasonable efforts to resolve complaints
              informally before any formal proceedings are initiated.
            </p>
          </section>

          {/* § 16 */}
          <section id="s16">
            <h2 className={H2}>16. General Provisions</h2>
            <h3 className={H3}>16.1 Severability</h3>
            <p className={P}>
              If any provision of these Terms is held to be invalid, illegal, or unenforceable in
              any jurisdiction, the remaining provisions shall continue in full force and effect.
              The invalid provision shall be modified to the minimum extent necessary to make it
              enforceable.
            </p>
            <h3 className={H3}>16.2 Waiver</h3>
            <p className={P}>
              Our failure to enforce any right or provision of these Terms shall not constitute a
              waiver of that right or provision. Any waiver must be in writing to be effective.
            </p>
            <h3 className={H3}>16.3 Entire agreement</h3>
            <p className={P}>
              These Terms, together with our Privacy Policy and any additional terms applicable
              to specific services you use, constitute the entire agreement between you and MG
              Creative Labs regarding the Platform and supersede all prior agreements and
              understandings, whether written or oral.
            </p>
            <h3 className={H3}>16.4 Assignment</h3>
            <p className={P}>
              You may not assign or transfer your rights or obligations under these Terms without
              our prior written consent. We may assign our rights and obligations freely,
              including in connection with a merger, acquisition, or sale of assets.
            </p>
          </section>

          {/* § 17 */}
          <section id="s17">
            <h2 className={H2}>17. Changes to These Terms</h2>
            <p className={P}>
              We may update these Terms from time to time. When we make material changes, we will
              update the &ldquo;Last updated&rdquo; date at the top of this page and, where
              required by law or where we consider it appropriate, notify you via email or an
              in-platform notice. Material changes will not apply retroactively.
            </p>
            <p className={`${P} mt-3`}>
              Your continued use of the Platform after the effective date of updated Terms
              constitutes your acceptance of the updated Terms. If you do not agree to the updated
              Terms, you must stop using the Platform before the changes take effect.
            </p>
          </section>

          {/* § 18 */}
          <section id="s18">
            <h2 className={H2}>18. Contact Information</h2>
            <p className={P}>
              Questions, concerns, or complaints regarding these Terms should be directed to:
            </p>
            <div className="mt-4 rounded-xl bg-surface-2 border border-border p-5 text-sm text-ink-2">
              <p className="font-semibold text-ink mb-1">MG Creative Labs</p>
              <p>
                Email:{" "}
                <a
                  href="mailto:mgcreativelabs@technologist.com"
                  className="text-blue-400 hover:underline"
                >
                  mgcreativelabs@technologist.com
                </a>
              </p>
              <p className="mt-1">
                Contact form:{" "}
                <Link href="/contact" className="text-blue-400 hover:underline">
                  mgcreativelabs.com/contact
                </Link>
              </p>
            </div>
            <p className={`${P} mt-4`}>
              We aim to respond to all enquiries within 3 business days.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
