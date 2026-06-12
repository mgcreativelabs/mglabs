import Link from "next/link";
import { Zap, Mail, Share2, GitBranch, Building2, Play } from "lucide-react";

const footerLinks = {
  Platform: [
    { label: "AI Learning Hub", href: "/ai-learning-hub" },
    { label: "Prompt Library", href: "/prompt-library" },
    { label: "AI Coding Academy", href: "/ai-coding-academy" },
    { label: "AI Design Academy", href: "/ai-design-academy" },
    { label: "Community", href: "/community" },
  ],
  Resources: [
    { label: "Blog", href: "/blog" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
};

const socials = [
  { icon: Share2, href: "https://twitter.com/mgcreativelabs", label: "Twitter" },
  { icon: GitBranch, href: "https://github.com/mgcreativelabs", label: "GitHub" },
  { icon: Building2, href: "https://linkedin.com/company/mgcreativelabs", label: "LinkedIn" },
  { icon: Play, href: "https://youtube.com/@mgcreativelabs", label: "YouTube" },
];

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="h-8 w-8 rounded-lg bg-gradient-brand flex items-center justify-center">
                <Zap className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold text-white">MG <span className="text-gradient">Creative Labs</span></span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs mb-5">
              Empowering the next generation of creators to master AI, prompt engineering, coding, and design.
            </p>
            <div className="flex items-center gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  className="h-9 w-9 rounded-lg bg-surface-2 border border-white/[0.06] flex items-center justify-center text-gray-500 hover:text-white hover:border-brand-blue/30 transition-all">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-4">{category}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-gray-500 hover:text-gray-200 transition-colors">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-white/[0.04] mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600">© {new Date().getFullYear()} MG Creative Labs. All rights reserved.</p>
          <div className="flex items-center gap-1.5 text-xs text-gray-600">
            <Mail className="h-3 w-3" />
            <a href="mailto:hello@mgcreativelabs.com" className="hover:text-gray-400 transition-colors">hello@mgcreativelabs.com</a>
          </div>
        </div>
      </div>
    </footer>
  );
}