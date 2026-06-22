// =============================================
// TERMS OF SERVICE — src/app/terms/page.tsx
// =============================================
import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms that govern your use of MG Creative Labs.",
};

const LAST_UPDATED = "June 19, 2026";

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      <section className="py-20 px-4 sm:px-6 max-w-4xl mx-auto">
        <Badge variant="purple" className="mb-5">
          <FileText className="w-3 h-3" /> Legal
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-display font-bold text-white mb-4">
          Terms of <span className="text-gradient">Service</span>
        </h1>
        <p className="text-gray-500 mb-12">Last updated: {LAST_UPDATED}</p>

        <div className="prose-custom space-y-10 text-gray-300 leading-relaxed">

          <section>
            <p>
              These Terms of Service (&ldquo;Terms&rdquo;) govern your use of MG Creative Labs
              (&ldquo;the Platform,&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo;). By creating an
              account or using the Platform, you agree to these Terms. If you don&apos;t agree,
              please don&apos;t use the Platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-white mb-4">1. Accounts</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>You must provide accurate information when creating an account</li>
              <li>You are responsible for safeguarding your account credentials</li>
              <li>You must be at least 13 years old to use the Platform</li>
              <li>You are responsible for all activity that occurs under your account</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-white mb-4">2. Acceptable use</h2>
            <p>You agree not to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Post unlawful, harassing, hateful, or sexually explicit content</li>
              <li>Spam, scrape, or abuse the Platform or its API endpoints</li>
              <li>Attempt to gain unauthorized access to other accounts or our systems</li>
              <li>Use the Platform to generate or distribute malware or other harmful code</li>
              <li>Impersonate any person or entity, or misrepresent your affiliation</li>
              <li>Resell or redistribute the Prompt Library content commercially without permission</li>
            </ul>
            <p className="mt-4">
              We may suspend or terminate accounts that violate these rules, with or without
              notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-white mb-4">3. User-generated content</h2>
            <p>
              You retain ownership of prompts, posts, and replies you submit. By posting publicly
              on the Platform (e.g. in the Prompt Library or Community), you grant us a
              non-exclusive, worldwide, royalty-free license to display, distribute, and promote
              that content within the Platform. You are solely responsible for content you post and
              confirm you have the right to share it.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-white mb-4">4. MG Labs AI</h2>
            <p>
              MG Labs AI is an AI assistant powered by a third-party large language model (Llama
              3.3 70B via Groq). Responses are generated automatically and may be incomplete,
              outdated, or incorrect. AI output is provided for informational purposes only and
              should not be relied on as professional, legal, medical, or financial advice. You are
              responsible for verifying anything important before acting on it.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-white mb-4">5. Intellectual property</h2>
            <p>
              The Platform&apos;s name, logo, design, course content, and original written material
              are owned by MG Creative Labs and protected by copyright and trademark law. You may
              not copy, modify, or redistribute our proprietary content without written permission,
              except as permitted under Section 3 for content you create.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-white mb-4">6. Free tier &amp; changes to the service</h2>
            <p>
              We currently offer the Platform&apos;s core features free of charge. We may introduce
              paid tiers, modify, or discontinue features at any time. We&apos;ll do our best to
              give advance notice of material changes that affect your account.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-white mb-4">7. Disclaimer of warranties</h2>
            <p>
              The Platform is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without
              warranties of any kind, express or implied. We do not guarantee the Platform will be
              uninterrupted, error-free, or that AI-generated content will be accurate.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-white mb-4">8. Limitation of liability</h2>
            <p>
              To the fullest extent permitted by law, MG Creative Labs shall not be liable for any
              indirect, incidental, special, or consequential damages arising from your use of the
              Platform, including reliance on AI-generated content.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-white mb-4">9. Termination</h2>
            <p>
              You may delete your account at any time. We may suspend or terminate your access if
              you violate these Terms. Sections that by their nature should survive termination
              (e.g. intellectual property, limitation of liability) will continue to apply.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-white mb-4">10. Changes to these Terms</h2>
            <p>
              We may update these Terms from time to time. We&apos;ll update the &ldquo;Last
              updated&rdquo; date above when we do. Continued use after changes means you accept
              the updated Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-white mb-4">11. Contact</h2>
            <p>
              Questions about these Terms? Reach out via our{" "}
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
