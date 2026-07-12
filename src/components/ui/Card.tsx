import React from "react";
import { cn } from "@/lib/utils/cn";

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-[18px] p-6 bg-white border border-border shadow-[0_8px_30px_rgba(0,0,0,0.05)] transition-all duration-250 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]",
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardTitle({ children, className }: CardProps) {
  return (
    <h3 className={cn("text-lg font-semibold text-ink", className)}>
      {children}
    </h3>
  );
}

export function CardDescription({ children, className }: CardProps) {
  return (
    <p className={cn("text-sm text-ink-2", className)}>
      {children}
    </p>
  );
}

export function CardContent({ children, className }: CardProps) {
  return (
    <div className={cn("mt-3", className)}>
      {children}
    </div>
  );
}