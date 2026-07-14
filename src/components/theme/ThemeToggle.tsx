"use client";
// =============================================
// THEME TOGGLE — src/components/theme/ThemeToggle.tsx
// Icon button that cycles Light → Dark → System.
// Used in the main Navbar and the MG AI Chat header.
//
// Why cycle through 3 states instead of a plain on/off
// switch: "system" is what next-themes defaults new
// visitors to, and dropping it on first toggle would
// silently override their OS preference. Cycling keeps
// "system" reachable at all times.
// =============================================
import * as React from "react";
import { Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils/cn";

const MODES = ["light", "dark", "system"] as const;
type Mode = (typeof MODES)[number];

const ICONS: Record<Mode, React.ElementType> = {
  light: Sun,
  dark: Moon,
  system: Monitor,
};

const LABELS: Record<Mode, string> = {
  light: "Light theme",
  dark: "Dark theme",
  system: "System theme",
};

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Avoid hydration mismatch: theme is unknown on the server,
  // so render a neutral placeholder until mounted on the client.
  React.useEffect(() => setMounted(true), []);

  const current = (theme as Mode) || "system";
  const Icon = ICONS[current];

  function cycle() {
    const next = MODES[(MODES.indexOf(current) + 1) % MODES.length];
    setTheme(next);
  }

  if (!mounted) {
    return (
      <div
        className={cn(
          "h-9 w-9 rounded-lg border border-border bg-surface",
          className
        )}
        aria-hidden="true"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={cycle}
      className={cn(
        "flex h-9 w-9 items-center justify-center rounded-lg border border-border text-ink-2",
        "hover:text-ink hover:bg-surface-1 hover:border-border-strong",
        "transition-all duration-250 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue",
        className
      )}
      aria-label={`Theme: ${LABELS[current]}. Click to change.`}
      title={LABELS[current]}
    >
      <Icon className="h-4 w-4" />
    </button>
  );
}
