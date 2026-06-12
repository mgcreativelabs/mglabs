import * as React from "react";
import { cn } from "@/lib/utils/cn";

interface AvatarProps {
  src?: string | null;
  alt?: string;
  fallback?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizeClasses = {
  xs: "h-6 w-6 text-xs",
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
  xl: "h-16 w-16 text-lg",
};

export function Avatar({ src, alt, fallback, size = "md", className }: AvatarProps) {
  const initials = fallback
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div
      className={cn(
        "relative rounded-full overflow-hidden flex items-center justify-center bg-gradient-brand font-semibold text-white flex-shrink-0",
        sizeClasses[size],
        className
      )}
    >
      {src ? (
        <img src={src} alt={alt || fallback || "Avatar"} className="h-full w-full object-cover" />
      ) : (
        <span>{initials || "?"}</span>
      )}
    </div>
  );
}
