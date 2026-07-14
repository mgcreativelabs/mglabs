"use client";
// =============================================
// THEME PROVIDER — src/components/theme/ThemeProvider.tsx
// Thin wrapper around next-themes, the standard shadcn/ui
// dark-mode pattern. next-themes handles:
//   - reading the saved preference from localStorage
//   - applying the .dark class to <html> before paint
//     (via a tiny inline script) so there's no flash of
//     the wrong theme on load
//   - syncing with the OS-level prefers-color-scheme
//     when the user hasn't picked one explicitly
// =============================================
import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
