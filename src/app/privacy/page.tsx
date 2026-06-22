// =============================================
// PRIVACY POLICY — src/app/privacy/page.tsx
// =============================================
import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How MG Creative Labs collects, uses, and protects your data.",
};

const LAST_UPDATED = "June 19, 2026";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      <section className="py-20 px-4 sm:px-6 max-w-4xl mx-auto">
        <Badge variant="blue" className="mb-5">
          <Shield className="w-3 h-3" /> Legal
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-display font-bold text-white mb-4">
          Privacy <span className="text-gradient">Policy</span>
        </h1>
        <p className="text-gray-500 mb-12">Last updated: {LAST_UPDATED}</p>

        <div className="prose-custom space-y-10 text-gray-300 leading-relaxed">

          <section>
            <p>
              MG Creative Labs (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) operates
              mgcreativelabs.com and related services (the &ldquo;Platform&rdquo;). This Privacy
              Policy explains what information we collect, how we use it, and the choices you
              have. By using the Platform, you agree to the collection and use of information as
              described here.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-white mb-4">1. Information we collect</h2>
            <h3 className="text-lg font-semibold text-white mt-6 mb-2">Account information</h3>
            <p>
              When you create an account, we collect your name, email address, and (if you sign in
              with Google) basic profile information provided by Google OAuth. Authentication and
              account storage are handled by Supabase.
            </p>
            <h3 className="text-lg font-semibold text-white mt-6 mb-2">Content you provide</h3>
            <p>
              This includes prompts you save, community posts and replies you write, contact form
              submissions, and newsletter sign-ups.
            </p>
            <h3 className="text-lg font-semibold text-white mt-6 mb-2">AI chat messages</h3>
            <p>
              Messages you send to MG Labs AI (our AI assistant at <code>/mg-ai</code>) are
              transmitted to Groq, Inc. for processing and generating a response. We do not require
              an account to use this feature. Do not share sensitive personal information in chat
              messages.
            </p>
            <h3 className="text-lg font-semibold text-white mt-6 mb-2">Automatically collected data</h3>
            <p>
              Like most websites, we automatically receive standard technical data — IP address,
              browser type, device information, pages visited, and timestamps — via our hosting
              provider (Vercel) and any analytics tools we use.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-white mb-4">2. How we use your information</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>To create and maintain your account</li>
              <li>To provide and improve the Platform&apos;s features (prompts, courses, community, AI chat)</li>
              <li>To send transactional emails (account, security) and, if you opt in, the newsletter</li>
              <li>To respond to support and contact requests</li>
              <li>To detect, prevent, and address abuse, fraud, or security issues</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-white mb-4">3. Third-party services</h2>
            <p>We rely on the following processors to operate the Platform:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong className="text-white">Supabase</strong> — database, authentication, and storage</li>
              <li><strong className="text-white">Vercel</strong> — hosting and infrastructure</li>
              <li><strong className="text-white">Groq, Inc.</strong> — AI inference for the MG Labs AI chat feature</li>
              <li><strong className="text-white">Google</strong> — optional OAuth sign-in</li>
            </ul>
            <p className="mt-4">
              Each of these providers processes data under their own privacy policies and security
              practices. We do not sell your personal information to third parties.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-white mb-4">4. Cookies</h2>
            <p>
              We use essential cookies to keep you signed in and to remember basic preferences. We
              do not currently use third-party advertising or tracking cookies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-white mb-4">5. Data retention</h2>
            <p>
              We retain account data for as long as your account is active. If you delete your
              account, we delete or anonymize your personal data within 30 days, except where we
              are required to retain it for legal or security reasons.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-white mb-4">6. Your rights</h2>
            <p>Depending on where you live, you may have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access the personal data we hold about you</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Export your data in a portable format</li>
              <li>Withdraw consent (e.g. unsubscribe from the newsletter) at any time</li>
            </ul>
            <p className="mt-4">
              To exercise any of these rights, contact us at{" "}
              <a href="mailto:mgcreativelabs@technologist.com" className="text-brand-blue hover:underline">
                mgcreativelabs@technologist.com
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-white mb-4">7. Children&apos;s privacy</h2>
            <p>
              The Platform is not directed at children under 13 (or the equivalent minimum age in
              your jurisdiction). We do not knowingly collect personal information from children.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-white mb-4">8. Changes to this policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will update the
              &ldquo;Last updated&rdquo; date above when we do. Continued use of the Platform after
              changes constitutes acceptance of the revised policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-white mb-4">9. Contact us</h2>
            <p>
              Questions about this policy? Reach out via our{" "}
              <Link href="/contact" className="text-brand-blue hover:underline">contact page</Link>{" "}
              or email{" "}
              <a href="mailto:mgcreativelabs@technologist.com" className="text-brand-blue hover:underline">
                mgcreativelabs@technologist.com
              </a>.
            </p>
          </section>

        </div>
      </section>
    </div>
  );
}
