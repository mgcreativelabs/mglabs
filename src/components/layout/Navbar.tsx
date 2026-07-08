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

const navLinks = [
  { label: "Build",    href: "/start",         icon: Rocket,    highlight: "blue"   },
  { label: "Learn",    href: "/learn",          icon: BookOpen,  highlight: null     },
  { label: "Prompts",  href: "/prompt-library", icon: Sparkles,  highlight: null     },
  { label: "MG AI",    href: "/mg-ai",          icon: Bot,       highlight: "purple" },
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
      "flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap";

    if (link.highlight === "purple") {
      return cn(
        base,
        active
          ? "text-white bg-brand-purple/20 border border-brand-purple/30"
          : "text-brand-purple hover:text-white hover:bg-brand-purple/20 border border-brand-purple/20"
      );
    }
    if (link.highlight === "blue") {
      return cn(
        base,
        active
          ? "text-white bg-brand-blue/20 border border-brand-blue/30"
          : "text-brand-blue hover:text-white hover:bg-brand-blue/20 border border-brand-blue/20"
      );
    }
    return cn(
      base,
      active
        ? "text-white bg-surface-3"
        : "text-gray-400 hover:text-white hover:bg-surface-2"
    );
  }

 return (
  <nav className={cn(
    "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
    scrolled ? "bg-surface-1/95 backdrop-blur-md shadow-lg" : "bg-transparent",
  )}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        {/* LOGO - Add this */}
        <Link href="/" className="flex items-center gap-2">
          <img 
            src="/logo.png" 
            alt="MG Creative Labs" 
            className="h-8 w-auto"
          />
          <span className="text-white font-bold text-xl">MG Labs</span>
        </Link>

        {/* Rest of navigation... */}

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

            {/* Hamburger */}
            <button
              className="lg:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-surface-2 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {isOpen && (
          <div className="lg:hidden pb-4 border-t border-white/[0.06] mt-2 bg-surface/95 backdrop-blur-xl -mx-6 px-6">
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
                      Free
                    </span>
                  )}
                  {link.href === "/start" && (
                    <span className="ml-auto text-xs bg-brand-blue/20 text-brand-blue px-1.5 py-0.5 rounded-md border border-brand-blue/20">
                      Free
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
                    <Link href="/start">
                      <Button variant="primary" className="w-full">
                        Start Building Free →
                      </Button>
                    </Link>
                  </>
                )}
                                    )}
                      </div>
      </div>
    </nav>
  </header>
 );
}
