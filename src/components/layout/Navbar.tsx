"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Sparkles, BookOpen, Code, Palette, Users, Newspaper, Zap } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/lib/hooks/useAuth";

const navLinks = [
  { label: "Learn", href: "/ai-learning-hub", icon: BookOpen },
  { label: "Prompts", href: "/prompt-library", icon: Sparkles },
  { label: "Coding", href: "/ai-coding-academy", icon: Code },
  { label: "Design", href: "/ai-design-academy", icon: Palette },
  { label: "Community", href: "/community", icon: Users },
  { label: "Blog", href: "/blog", icon: Newspaper },
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

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-surface/90 backdrop-blur-xl border-b border-white/[0.06] shadow-2xl shadow-black/50"
          : "bg-transparent"
      )}
    >
      <nav className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16 relative">
          
          {/* Logo - LEFT */}
          <Link href="/" className="flex items-center gap-2.5 group z-10">
            <div className="h-8 w-8 rounded-lg bg-gradient-brand flex items-center justify-center shadow-lg shadow-brand-blue/30 group-hover:shadow-brand-blue/50 transition-shadow">
              <Zap className="h-4 w-4 text-white" />
            </div>
            <span className="font-display font-bold text-white text-base tracking-tight">
              MG <span className="text-gradient">Creative Labs</span>
            </span>
          </Link>

          {/* Desktop Nav Links - CENTERED (absolute positioning) */}
          <div className="hidden lg:flex items-center gap-1 absolute left-1/2 transform -translate-x-1/2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  pathname === link.href
                    ? "text-white bg-surface-3"
                    : "text-gray-400 hover:text-white hover:bg-surface-2"
                )}
              >
                <link.icon className="h-3.5 w-3.5" />
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA Buttons - RIGHT */}
          <div className="hidden lg:flex items-center gap-3 z-10">
            {!loading && (
              <>
                {user ? (
                  <>
                    <Link href="/dashboard">
                      <Button variant="secondary" size="sm">Dashboard</Button>
                    </Link>
                    <Button variant="ghost" size="sm" onClick={() => signOut()}>
                      Sign out
                    </Button>
                  </>
                ) : (
                  <>
                    <Link href="/login">
                      <Button variant="ghost" size="sm">Sign in</Button>
                    </Link>
                    <Link href="/signup">
                      <Button variant="primary" size="sm">
                        Get started free
                      </Button>
                    </Link>
                  </>
                )}
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-surface-2 transition-colors z-10"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
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