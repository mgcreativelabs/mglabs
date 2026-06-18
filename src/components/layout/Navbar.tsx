"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu, X, Sparkles, BookOpen, Code, Palette,
  Users, Newspaper, Zap, Bot
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/lib/hooks/useAuth";

const navLinks = [
  { label: "Learn",     href: "/ai-learning-hub",   icon: BookOpen  },
  { label: "Prompts",   href: "/prompt-library",     icon: Sparkles  },
  { label: "Coding",    href: "/ai-coding-academy",  icon: Code      },
  { label: "Design",    href: "/ai-design-academy",  icon: Palette   },
  { label: "Community", href: "/community",          icon: Users     },
  { label: "Blog",      href: "/blog",               icon: Newspaper },
  { label: "MG AI",     href: "/mg-ai",              icon: Bot       },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { user, signOut, loading } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => { setIsOpen(false); }, [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full",
        scrolled
          ? "bg-surface/90 backdrop-blur-xl border-b border-white/[0.06] shadow-2xl shadow-black/50"
          : "bg-transparent"
      )}
    >
      <nav className="w-full max-w-7xl mx-auto px-6 lg:px-8">
        {/* 3-column grid: logo | nav | cta */}
        <div className="grid grid-cols-[auto_1fr_auto] items-center h-16 gap-4">

          {/* ── LEFT: Logo ── */}
          <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
            <div className="h-8 w-8 rounded-lg bg-gradient-brand flex items-center justify-center shadow-lg shadow-brand-blue/30 group-hover:shadow-brand-blue/50 transition-shadow">
              <Zap className="h-4 w-4 text-white" />
            </div>
            <span className="font-display font-bold text-white text-base tracking-tight hidden sm:inline">
              MG <span className="text-gradient">Creative Labs</span>
            </span>
          </Link>

          {/* ── CENTER: Nav links (desktop) ── */}
          <div className="hidden lg:flex items-center justify-center gap-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap",
                  link.href === "/mg-ai"
                    ? pathname === link.href
                      ? "text-white bg-brand-purple/20 border border-brand-purple/30"
                      : "text-brand-purple hover:text-white hover:bg-brand-purple/20 border border-brand-purple/20"
                    : pathname === link.href
                    ? "text-white bg-surface-3"
                    : "text-gray-400 hover:text-white hover:bg-surface-2"
                )}
              >
                <link.icon className="h-3.5 w-3.5" />
                {link.label}
              </Link>
            ))}
          </div>

          {/* ── RIGHT: Auth buttons + hamburger ── */}
          <div className="flex items-center gap-2">
            {!loading && (
              <>
                {user ? (
                  <>
                    <Link href="/dashboard" className="hidden sm:block">
                      <Button variant="secondary" size="sm">Dashboard</Button>
                    </Link>
                    <Button variant="ghost" size="sm" onClick={() => signOut()} className="hidden sm:block">
                      Sign out
                    </Button>
                  </>
                ) : (
                  <>
                    <Link href="/login" className="hidden sm:block">
                      <Button variant="ghost" size="sm">Sign in</Button>
                    </Link>
                    <Link href="/signup" className="hidden sm:block">
                      <Button variant="primary" size="sm">Get started free</Button>
                    </Link>
                  </>
                )}
              </>
            )}

            {/* Hamburger — always visible on mobile */}
            <button
              className="lg:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-surface-2 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* ── Mobile dropdown ── */}
        {isOpen && (
          <div className="lg:hidden pb-4 border-t border-white/[0.06] mt-2">
            <div className="pt-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                    pathname === link.href
                      ? "text-white bg-surface-3"
                      : "text-gray-400 hover:text-white hover:bg-surface-2"
                  )}
                >
                  <link.icon className="h-4 w-4" />
                  {link.label}
                  {link.href === "/mg-ai" && (
                    <span className="ml-auto text-xs bg-brand-purple/20 text-brand-purple px-1.5 py-0.5 rounded-md border border-brand-purple/20">
                      Free AI
                    </span>
                  )}
                </Link>
              ))}

              <div className="pt-3 border-t border-white/[0.06] flex flex-col gap-2">
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
                    <Link href="/signup">
                      <Button variant="primary" className="w-full">Get started free</Button>
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
