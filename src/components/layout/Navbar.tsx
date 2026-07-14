"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu, X, Sparkles, BookOpen,
  Briefcase, Zap, Bot, Rocket, ArrowRight, Tag
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/lib/hooks/useAuth";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

const navLinks = [
  { label: "Build",    href: "/start",         icon: Rocket,    highlight: "blue"   },
  { label: "Learn",    href: "/learn",          icon: BookOpen,  highlight: null     },
  { label: "Prompts",  href: "/prompt-library", icon: Sparkles,  highlight: null     },
  { label: "MG AI",    href: "/mg-ai",          icon: Bot,       highlight: "blue"   },
  { label: "Services", href: "/services",       icon: Briefcase, highlight: null     },
  { label: "Pricing",  href: "/pricing",        icon: Tag,       highlight: null     },
] as const;

type NavLink = (typeof navLinks)[number];

export function Navbar() {
  const [isOpen, setIsOpen]     = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname                = usePathname();
  const { user, signOut, loading } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setIsOpen(false); }, [pathname]);

  function getLinkClass(link: NavLink) {
    const active = pathname === link.href;
    const base =
      "flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-250 whitespace-nowrap";

    if (link.highlight === "blue") {
      return cn(
        base,
        active
          ? "text-brand-blue bg-brand-blue/10 border border-brand-blue/20"
          : "text-brand-blue hover:bg-brand-blue/10 border border-brand-blue/10"
      );
    }
    return cn(
      base,
      active
        ? "text-ink bg-surface-2"
        : "text-ink-2 hover:text-ink hover:bg-surface-1"
    );
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full",
        scrolled
          ? "bg-surface/90 backdrop-blur-xl border-b border-border"
          : "bg-surface border-b border-transparent"
      )}
    >
      <nav className="w-full max-w-7xl mx-auto px-6 lg:px-8">
        {/* 3-column grid: logo | nav | cta */}
        <div className="grid grid-cols-[auto_1fr_auto] items-center h-16 gap-4">

          {/* LEFT — Logo */}
          <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
            <div className="h-8 w-8 rounded-lg bg-brand-blue flex items-center justify-center transition-transform group-hover:scale-[1.02]">
              <Zap className="h-4 w-4 text-white" />
            </div>
            <span className="font-display font-bold text-ink text-base tracking-tight hidden sm:inline">
              MG <span className="text-gradient">Labs</span>
            </span>
          </Link>

          {/* CENTER — Desktop nav */}
          <div className="hidden lg:flex items-center justify-center gap-0.5">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className={getLinkClass(link)}>
                <link.icon className="h-3.5 w-3.5" />
                {link.label}
              </Link>
            ))}
          </div>

          {/* RIGHT — Auth + CTA */}
          <div className="flex items-center gap-2">
            {!loading && (
              <>
                {user ? (
                  <>
                    <Link href="/dashboard" className="hidden sm:block">
                      <Button variant="secondary" size="sm">Dashboard</Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => signOut()}
                      className="hidden sm:block"
                    >
                      Sign out
                    </Button>
                  </>
                ) : (
                  <>
                    <Link href="/login" className="hidden sm:block">
                      <Button variant="ghost" size="sm">Sign in</Button>
                    </Link>
                    <Link href="/start" className="hidden sm:block">
                      <Button
                        variant="primary"
                        size="sm"
                        rightIcon={<ArrowRight className="h-3.5 w-3.5" />}
                      >
                        Start Building
                      </Button>
                    </Link>
                  </>
                )}
              </>
            )}

            <ThemeToggle className="hidden sm:flex" />

            {/* Hamburger */}
            <button
              className="lg:hidden p-2 rounded-lg text-ink-2 hover:text-ink hover:bg-surface-1 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {isOpen && (
          <div className="lg:hidden pb-4 border-t border-border mt-2 bg-surface -mx-6 px-6">
            <div className="pt-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                    pathname === link.href
                      ? "text-ink bg-surface-2"
                      : "text-ink-2 hover:text-ink hover:bg-surface-1"
                  )}
                >
                  <link.icon className="h-4 w-4" />
                  {link.label}
                  {link.href === "/mg-ai" && (
                    <span className="ml-auto text-xs bg-brand-blue/10 text-brand-blue px-1.5 py-0.5 rounded-md border border-brand-blue/20">
                      Free
                    </span>
                  )}
                  {link.href === "/start" && (
                    <span className="ml-auto text-xs bg-brand-blue/10 text-brand-blue px-1.5 py-0.5 rounded-md border border-brand-blue/20">
                      Free
                    </span>
                  )}
                </Link>
              ))}

              <div className="pt-3 border-t border-border flex items-center justify-between">
                <span className="text-sm font-medium text-ink-2">Theme</span>
                <ThemeToggle />
              </div>

              <div className="pt-3 border-t border-border flex flex-col gap-2">
                {user ? (
                  <>
                    <Link href="/dashboard">
                      <Button variant="secondary" className="w-full">Dashboard</Button>
                    </Link>
                    <Button variant="ghost" className="w-full" onClick={() => signOut()}>
                      Sign out
                    </Button>
                  </>
                ) : (
                  <>
                    <Link href="/login">
                      <Button variant="ghost" className="w-full">Sign in</Button>
                    </Link>
                    <Link href="/start">
                      <Button variant="primary" className="w-full">
                        Start Building Free →
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
