// =============================================
// PRIVACY POLICY — src/app/privacy/page.tsx
//
// v2.0 — complete rewrite
//
// Added vs. v1.0:
//  § 6  Payment and billing data (Stripe as processor)
//  § 8  Security — "no absolute security" disclaimer + liability limitation
//  § 9  Your Privacy Rights — GDPR (EEA/UK) + CCPA (California) rights
//  § 11 International Data Transfers
//  Sticky sidebar TOC + section anchors
//  Plain-language summary box
// =============================================
import type { Metadata } from "next";
import Link from "next/link";
import { Shield, ArrowRight, Lock } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Privacy Policy — MG Creative Labs",
  description:
    "How MG Creative Labs collects, uses, and protects your data — including security measures and your rights.",
  robots: { index: true, follow: true },
};

const LAST_UPDATED = "June 24, 2026";
const VERSION = "2.0";

const TOC = [
  { id: "p1",  label: "1. Introduction"                                       },
  { id: "p2",  label: "2. Information We Collect"                             },
  { id: "p3",  label: "3. How We Use Your Information"                        },
  { id: "p4",  label: "4. How We Share Your Information"                      },
  { id: "p5",  label: "5. Data Processors"                                    },
  { id: "p6",  label: "6. Payment and Billing Data"                           },
  { id: "p7",  label: "7. Cookies and Tracking Technologies"                  },
  { id: "p8",  label: "8. Security of Your Information"                       },
  { id: "p9",  label: "9. Your Privacy Rights"                                },
  { id: "p10", label: "10. Data Retention"                                    },
  { id: "p11", label: "11. International Data Transfers"                      },
  { id: "p12", label: "12. Children's Privacy"                                },
  { id: "p13", label: "13. Third-Party Links and Services"                    },
  { id: "p14", label: "14. Changes to This Policy"                            },
  { id: "p15", label: "15. Contact Us"                                        },
];

const H2 = "text-xl font-bold text-ink mb-4 scroll-mt-28";
const H3 = "text-base font-semibold text-ink mt-6 mb-2";
const P  = "text-ink-2 text-sm leading-relaxed";
const UL = "list-disc pl-5 space-y-1.5 text-ink-2 text-sm leading-relaxed";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">

      {/* ── Page header ── */}
      <div className="py-20 px-4 sm:px-6 border-b border-border">
        <div className="max-w-4xl mx-auto">
          <Badge variant="blue" className="mb-5">
            <Shield className="w-3 h-3" /> Legal
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-bold text-ink mb-3">
            Privacy{" "}
            <span className="text-brand-blue">
              Policy
            </span>
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-sm text-ink-muted">
            <span>Last updated: {LAST_UPDATED}</span>
            <span className="text-ink-muted">·</span>
            <span>Version {VERSION}</span>
            <span className="text-ink-muted">·</span>
            <Link href="/terms" className="text-blue-500 hover:text-blue-400 transition-colors flex items-center gap-1">
              Terms of Service <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* ── Plain-language summary ── */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="rounded-xl bg-blue-900/20 border border-blue-500/20 p-5">
          <div className="flex items-start gap-3">
            <Lock className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-ink font-semibold text-sm mb-1">Plain-language summary</p>
              <p className="text-ink-2 text-sm leading-relaxed">
                We collect only what we need to run the Platform. We never sell your personal
                data. We use Supabase for auth and storage, Vercel for hosting, Stripe for
                payments, and Groq for AI processing. No online system is 100% secure — we take
                reasonable measures to protect your data but cannot guarantee absolute security.
                You can request access to, correction of, or deletion of your data at any time.
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
          <section id="p1">
            <h2 className={H2}>1. Introduction</h2>
            <p className={P}>
              MG Creative Labs (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;)
              operates the MG Creative Labs website and learning platform (the
              &ldquo;Platform&rdquo;). This Privacy Policy explains what personal information we
              collect, how we use and protect it, and the rights you have regarding your data.
            </p>
            <p className={`${P} mt-3`}>
              By using the Platform, you acknowledge that you have read and understood this
              Privacy Policy. If you have questions or concerns about how we handle your data,
              please contact us at{" "}
              <a
                href="mailto:mgcreativelabs@technologist.com"
                className="text-blue-400 hover:underline"
              >
                mgcreativelabs@technologist.com
              </a>{" "}
              before continuing to use the Platform.
            </p>
          </section>

          {/* § 2 */}
          <section id="p2">
            <h2 className={H2}>2. Information We Collect</h2>

            <h3 className={H3}>2.1 Account information</h3>
            <p className={P}>
              When you create an account, we collect your name, email address, and a hashed
              password. If you sign in via Google OAuth, we receive your name, email address, and
              profile picture URL from Google — we do not receive your Google password.
              Authentication and account data storage are handled by Supabase.
            </p>

            <h3 className={H3}>2.2 Content you provide</h3>
            <p className={P}>
              We store content you create or submit on the Platform, including:
            </p>
            <ul className={`${UL} mt-2`}>
              <li>Prompts you save to your personal library</li>
              <li>Community posts, comments, and replies</li>
              <li>Contact form messages and support enquiries</li>
              <li>Newsletter sign-up information</li>
              <li>Profile information you choose to add (display name, bio)</li>
            </ul>

            <h3 className={H3}>2.3 AI chat messages (MG Labs AI)</h3>
            <p className={P}>
              Messages you send to MG Labs AI (available at <code className="text-ink-2 bg-surface-2 px-1 py-0.5 rounded">/mg-ai</code>)
              are transmitted in real time to Groq, Inc. for inference (AI response generation).
              We do not store the content of your AI chat sessions in our database. Groq processes
              messages under its own privacy policy. Do not submit sensitive personal information
              (such as financial data, government ID numbers, or health information) in AI chat.
            </p>

            <h3 className={H3}>2.4 Usage and technical data</h3>
            <p className={P}>
              Like all websites, we automatically receive standard technical information when you
              visit the Platform, including:
            </p>
            <ul className={`${UL} mt-2`}>
              <li>IP address and approximate geographic location (country or region)</li>
              <li>Browser type, version, and device type</li>
              <li>Pages viewed, time on page, and navigation path</li>
              <li>Referring URL (the page that linked you to us)</li>
              <li>Timestamps of visits and actions</li>
            </ul>
            <p className={`${P} mt-3`}>
              This data is collected by Vercel (our hosting provider) and any analytics tools we
              use, and is used in aggregate form to understand how the Platform is used and to
              improve it.
            </p>
          </section>

          {/* § 3 */}
          <section id="p3">
            <h2 className={H2}>3. How We Use Your Information</h2>
            <p className={P}>We use collected information to:</p>
            <ul className={`${UL} mt-3`}>
              <li>Create, authenticate, and maintain your account</li>
              <li>
                Provide and improve Platform features including courses, the prompt library,
                community, and AI tools
              </li>
              <li>
                Process payments and manage your subscription via Stripe
              </li>
              <li>
                Send transactional emails (account confirmation, password reset, payment
                receipts, security notifications)
              </li>
              <li>
                Send the MG Creative Labs newsletter and product updates, if you have opted in
              </li>
              <li>Respond to support requests, feedback, and contact form messages</li>
              <li>Detect, investigate, and prevent fraudulent, abusive, or illegal activity</li>
              <li>
                Comply with legal obligations and respond to lawful requests from authorities
              </li>
              <li>
                Analyse aggregate usage patterns (never at an individual-identified level) to
                improve the Platform
              </li>
            </ul>
            <p className={`${P} mt-3`}>
              We do not use your data for automated decision-making that produces legal or
              similarly significant effects on you without your explicit consent.
            </p>
          </section>

          {/* § 4 */}
          <section id="p4">
            <h2 className={H2}>4. How We Share Your Information</h2>
            <p className={P}>
              We <strong className="text-ink">do not sell</strong> your personal information
              to third parties. We do not share your data with advertisers or data brokers.
            </p>
            <p className={`${P} mt-3`}>
              We share data only in the following limited circumstances:
            </p>
            <ul className={`${UL} mt-3`}>
              <li>
                <strong className="text-ink">Service providers:</strong> We share necessary
                data with our technical processors (listed in § 5) solely to operate the Platform.
              </li>
              <li>
                <strong className="text-ink">Legal compliance:</strong> We may disclose
                personal data to comply with a legal obligation, court order, or lawful
                government request, or to protect the rights, safety, or property of MG Creative
                Labs, our users, or the public.
              </li>
              <li>
                <strong className="text-ink">Business transfers:</strong> If MG Creative
                Labs is involved in a merger, acquisition, or sale of all or substantially all of
                its assets, your personal data may be transferred as part of that transaction.
                We will notify you via email and/or a prominent notice on the Platform before
                your data becomes subject to a different privacy policy.
              </li>
              <li>
                <strong className="text-ink">With your consent:</strong> We may share data
                in other circumstances with your explicit prior consent.
              </li>
            </ul>
          </section>

          {/* § 5 */}
          <section id="p5">
            <h2 className={H2}>5. Data Processors</h2>
            <p className={P}>
              We rely on the following sub-processors to operate the Platform. Each processes
              your data only as necessary to provide their service, under their own privacy
              policies and applicable data protection law:
            </p>
            <div className="mt-4 space-y-3">
              {[
                {
                  name: "Supabase",
                  role: "Database, authentication, file storage, and row-level security",
                  note: "SOC 2 Type II certified. Data stored on AWS infrastructure.",
                },
                {
                  name: "Vercel",
                  role: "Website hosting, CDN, edge functions, and server-side rendering",
                  note: "Infrastructure based in the US and globally distributed via edge.",
                },
                {
                  name: "Stripe, Inc.",
                  role: "Payment processing and subscription management",
                  note: "PCI DSS Level 1 certified. MG Creative Labs does not store raw card data.",
                },
                {
                  name: "Groq, Inc.",
                  role: "AI language model inference for the MG Labs AI chat feature",
                  note: "Your chat messages are transmitted to Groq for processing. See § 2.3.",
                },
                {
                  name: "Google",
                  role: "Optional OAuth single sign-on",
                  note: "Only used if you choose to sign in with Google.",
                },
              ].map((p) => (
                <div
                  key={p.name}
                  className="rounded-xl bg-surface-2 border border-border p-4"
                >
                  <p className="text-sm font-semibold text-ink mb-0.5">{p.name}</p>
                  <p className="text-xs text-ink-2">{p.role}</p>
                  <p className="text-xs text-ink-muted mt-1">{p.note}</p>
                </div>
              ))}
            </div>
          </section>

          {/* § 6 */}
          <section id="p6">
            <h2 className={H2}>6. Payment and Billing Data</h2>
            <p className={P}>
              Payment transactions are processed by Stripe, Inc. When you subscribe to a paid
              plan, Stripe collects and stores your payment card details directly. MG Creative
              Labs does not store, process, or have access to your raw credit card number, CVV,
              or full card data.
            </p>
            <p className={`${P} mt-3`}>
              We receive from Stripe limited non-sensitive billing information including: your
              name, billing postal code, last four digits of your card, card brand, expiry date,
              subscription status, and payment history. This information is stored in our database
              and used to manage your subscription and provide billing support.
            </p>
            <p className={`${P} mt-3`}>
              Stripe is PCI DSS Level 1 certified — the highest available security standard for
              payment processors. For more information, see{" "}
              <a
                href="https://stripe.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                Stripe&apos;s Privacy Policy
              </a>
              .
            </p>
          </section>

          {/* § 7 */}
          <section id="p7">
            <h2 className={H2}>7. Cookies and Tracking Technologies</h2>
            <h3 className={H3}>7.1 Essential cookies</h3>
            <p className={P}>
              We use session cookies and local storage to keep you signed in and maintain your
              user preferences. These are essential to the functioning of the Platform and cannot
              be disabled without preventing you from using authenticated features.
            </p>
            <h3 className={H3}>7.2 Analytics</h3>
            <p className={P}>
              We may use privacy-respecting analytics tools to understand aggregate usage patterns
              (page views, popular content, traffic sources). Where analytics are used, we
              configure them to minimise personal data collection and, where possible, to process
              data without individual-level identification.
            </p>
            <h3 className={H3}>7.3 No advertising cookies</h3>
            <p className={P}>
              We do not use third-party advertising networks, retargeting pixels, or behavioural
              tracking cookies. MG Creative Labs does not participate in programmatic advertising.
            </p>
            <h3 className={H3}>7.4 Managing cookies</h3>
            <p className={P}>
              You can control cookies through your browser settings. Note that disabling all
              cookies will prevent certain features (including staying signed in) from working.
            </p>
          </section>

          {/* § 8 — KEY SECTION */}
          <section id="p8">
            <h2 className={H2}>8. Security of Your Information</h2>
            <h3 className={H3}>8.1 Measures we take</h3>
            <p className={P}>
              We take the security of your personal information seriously and implement a range of
              technical and organisational measures designed to protect it, including:
            </p>
            <ul className={`${UL} mt-3`}>
              <li>Encryption of data in transit using TLS/HTTPS on all Platform connections</li>
              <li>Encryption of data at rest via Supabase (AES-256)</li>
              <li>Row-level security (RLS) policies to ensure users can only access their own data</li>
              <li>Environment variable management for credentials — secrets are never committed to source code</li>
              <li>Two-factor authentication available for user accounts</li>
              <li>Regular review of access controls and third-party processor security practices</li>
            </ul>

            <h3 className={H3}>8.2 No absolute security guarantee</h3>
            <p className={P}>
              <strong className="text-ink">
                No method of electronic transmission or storage is 100% secure.
              </strong>{" "}
              While we take reasonable measures to protect your personal information, we cannot
              guarantee its absolute security. Risks inherent to the internet — including
              interception, unauthorised access, data loss, or corruption — cannot be entirely
              eliminated.
            </p>
            <p className={`${P} mt-3`}>
              You use the Platform and transmit personal information at your own risk. You are
              also responsible for maintaining the security of your account credentials and for
              choosing a strong, unique password.
            </p>

            <h3 className={H3}>8.3 Limitation of liability for security incidents</h3>
            <p className={P}>
              To the fullest extent permitted by applicable law, MG Creative Labs shall not be
              liable for any unauthorised access to, disclosure of, alteration of, or destruction
              of personal information that results from circumstances beyond our reasonable
              control, including attacks by third parties on our infrastructure or the
              infrastructure of our data processors. This limitation does not apply where the
              incident results from our gross negligence, wilful misconduct, or intentional
              wrongdoing.
            </p>

            <h3 className={H3}>8.4 Data breach notification</h3>
            <p className={P}>
              In the event of a security breach that is likely to result in a risk to your rights
              and freedoms, we will notify affected users and, where required by law, relevant
              supervisory authorities, within the timeframes required by applicable data
              protection legislation. Notification will be made via email to the address on your
              account and/or via a prominent notice on the Platform.
            </p>
          </section>

          {/* § 9 */}
          <section id="p9">
            <h2 className={H2}>9. Your Privacy Rights</h2>
            <p className={P}>
              Depending on where you are located, you may have the following rights regarding
              your personal data:
            </p>

            <h3 className={H3}>9.1 Rights for all users</h3>
            <ul className={`${UL} mt-2`}>
              <li>
                <strong className="text-ink">Access:</strong> Request a copy of the personal
                data we hold about you
              </li>
              <li>
                <strong className="text-ink">Correction:</strong> Ask us to correct
                inaccurate or incomplete data
              </li>
              <li>
                <strong className="text-ink">Deletion:</strong> Request deletion of your
                personal data (subject to legal retention obligations)
              </li>
              <li>
                <strong className="text-ink">Portability:</strong> Request your data in a
                portable, machine-readable format
              </li>
              <li>
                <strong className="text-ink">Withdraw consent:</strong> Opt out of the
                newsletter or other consent-based processing at any time
              </li>
            </ul>

            <h3 className={H3}>9.2 EEA, UK, and Swiss residents (GDPR / UK GDPR)</h3>
            <p className={P}>
              If you are located in the European Economic Area, United Kingdom, or Switzerland,
              you have additional rights under GDPR or UK GDPR, including:
            </p>
            <ul className={`${UL} mt-2`}>
              <li>
                <strong className="text-ink">Right to restrict processing:</strong> Ask us
                to restrict how we process your data in certain circumstances
              </li>
              <li>
                <strong className="text-ink">Right to object:</strong> Object to processing
                based on legitimate interests, including profiling
              </li>
              <li>
                <strong className="text-ink">Right to lodge a complaint:</strong> File a
                complaint with your local supervisory authority (e.g., the ICO in the UK, or your
                national DPA in the EU)
              </li>
            </ul>
            <p className={`${P} mt-3`}>
              Our legal basis for processing your personal data is primarily:
              (a) <em>performance of a contract</em> (to provide the Platform features you have
              signed up for), (b) <em>legitimate interests</em> (to improve the Platform and
              prevent abuse), and (c) <em>consent</em> (for newsletter communications and optional
              features).
            </p>

            <h3 className={H3}>9.3 California residents (CCPA / CPRA)</h3>
            <p className={P}>
              If you are a California resident, you have the right to:
            </p>
            <ul className={`${UL} mt-2`}>
              <li>Know what personal information we collect and how we use it</li>
              <li>Request deletion of your personal information</li>
              <li>
                Opt out of the &ldquo;sale&rdquo; or &ldquo;sharing&rdquo; of personal
                information — we do not sell or share personal information for cross-context
                behavioural advertising
              </li>
              <li>
                Non-discrimination in service quality for exercising your CCPA rights
              </li>
            </ul>

            <h3 className={H3}>9.4 How to exercise your rights</h3>
            <p className={P}>
              To exercise any of the above rights, email us at{" "}
              <a
                href="mailto:mgcreativelabs@technologist.com"
                className="text-blue-400 hover:underline"
              >
                mgcreativelabs@technologist.com
              </a>{" "}
              with the subject line &ldquo;Privacy Request&rdquo; and a description of your
              request. We will respond within 30 days (or within the timeframe required by
              applicable law). We may need to verify your identity before processing the request.
            </p>
          </section>

          {/* § 10 */}
          <section id="p10">
            <h2 className={H2}>10. Data Retention</h2>
            <p className={P}>
              We retain your personal data for as long as your account is active or as needed to
              provide the Platform services. Specifically:
            </p>
            <ul className={`${UL} mt-3`}>
              <li>
                Account data is retained while your account exists and for up to 30 days after
                account deletion to allow for recovery if deletion was unintentional
              </li>
              <li>
                Billing records and transaction history are retained for up to 7 years to meet
                financial and tax reporting obligations
              </li>
              <li>
                Support and contact records are retained for up to 3 years after the resolution
                of the relevant matter
              </li>
              <li>
                Aggregate, anonymised analytics data may be retained indefinitely as it does not
                identify individual users
              </li>
            </ul>
            <p className={`${P} mt-3`}>
              When you delete your account, we delete or anonymise your personal data within 30
              days, except where retention is required by law or where data cannot be immediately
              deleted due to technical backup processes (in which case it is securely isolated
              and deleted as soon as practically possible).
            </p>
          </section>

          {/* § 11 */}
          <section id="p11">
            <h2 className={H2}>11. International Data Transfers</h2>
            <p className={P}>
              MG Creative Labs is operated with infrastructure providers based primarily in the
              United States and globally distributed via cloud infrastructure. If you are located
              outside the United States — including in the European Economic Area or United Kingdom
              — your personal data is transferred to and processed in the United States and
              potentially other jurisdictions.
            </p>
            <p className={`${P} mt-3`}>
              Where such transfers involve data from the EEA or UK, we rely on appropriate
              safeguards including:
            </p>
            <ul className={`${UL} mt-3`}>
              <li>
                <strong className="text-ink">Standard Contractual Clauses (SCCs)</strong>{" "}
                where applicable with our sub-processors
              </li>
              <li>
                The adequacy decisions, binding corporate rules, or other mechanisms recognised
                under applicable data protection law for transfers from your jurisdiction
              </li>
            </ul>
            <p className={`${P} mt-3`}>
              By using the Platform, you acknowledge that your data may be transferred to and
              processed in jurisdictions with data protection laws that may differ from those in
              your country.
            </p>
          </section>

          {/* § 12 */}
          <section id="p12">
            <h2 className={H2}>12. Children&apos;s Privacy</h2>
            <p className={P}>
              The Platform is not directed at children under 13 years of age (or the minimum
              digital consent age in your jurisdiction, if higher). We do not knowingly collect
              personal information from children under these ages.
            </p>
            <p className={`${P} mt-3`}>
              If you believe we have inadvertently collected personal information from a child,
              please contact us immediately at{" "}
              <a
                href="mailto:mgcreativelabs@technologist.com"
                className="text-blue-400 hover:underline"
              >
                mgcreativelabs@technologist.com
              </a>{" "}
              and we will take appropriate steps to delete that information.
            </p>
          </section>

          {/* § 13 */}
          <section id="p13">
            <h2 className={H2}>13. Third-Party Links and Services</h2>
            <p className={P}>
              The Platform may contain links to third-party websites, tools, and resources
              (including AI tools listed in our directory and links in blog posts). These
              third-party sites are not operated by us and have their own privacy policies.
            </p>
            <p className={`${P} mt-3`}>
              We are not responsible for the privacy practices, content, or security of
              third-party sites. We encourage you to review the privacy policy of any site you
              visit from a link on our Platform before submitting personal information to it.
            </p>
          </section>

          {/* § 14 */}
          <section id="p14">
            <h2 className={H2}>14. Changes to This Privacy Policy</h2>
            <p className={P}>
              We may update this Privacy Policy from time to time as our practices change, as new
              features are introduced, or as required by applicable law. When we make changes, we
              will:
            </p>
            <ul className={`${UL} mt-3`}>
              <li>Update the &ldquo;Last updated&rdquo; date at the top of this page</li>
              <li>
                For material changes, notify you via email (to the address on your account)
                and/or via a prominent in-platform notice, at least 14 days before the changes
                take effect where reasonably practicable
              </li>
            </ul>
            <p className={`${P} mt-3`}>
              Your continued use of the Platform after any revised policy takes effect constitutes
              your acceptance of the updated policy.
            </p>
          </section>

          {/* § 15 */}
          <section id="p15">
            <h2 className={H2}>15. Contact Us</h2>
            <p className={P}>
              For any questions, concerns, or requests relating to this Privacy Policy or the
              handling of your personal data, please contact us:
            </p>
            <div className="mt-4 rounded-xl bg-surface-2 border border-border p-5 text-sm text-ink-2">
              <p className="font-semibold text-ink mb-1">MG Creative Labs — Privacy</p>
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
                Subject line:{" "}
                <span className="text-ink-2">&ldquo;Privacy Request&rdquo;</span>
              </p>
              <p className="mt-2 text-ink-muted">
                We aim to respond to all privacy enquiries within 30 days.
              </p>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
