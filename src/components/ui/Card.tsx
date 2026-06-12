// =============================================
// CARD — src/components/ui/Card.tsx
// =============================================
import * as React from "react";
import { cn } from "@/lib/utils/cn";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  glow?: boolean;
  gradient?: boolean;
  padding?: "sm" | "md" | "lg" | "none";
}

function Card({ className, hover = false, glow = false, gradient = false, padding = "md", children, ...props }: CardProps) {
  const paddingClasses = {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  return (
    <div
      className={cn(
        "rounded-2xl bg-surface-1 border border-white/[0.06]",
        paddingClasses[padding],
        hover && "card-hover cursor-pointer",
        glow && "glow-blue",
        gradient && "bg-gradient-brand-subtle border-brand-blue/20",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mb-4", className)} {...props} />;
}

function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn("text-lg font-semibold text-white leading-tight", className)} {...props} />;
}

function CardDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-sm text-gray-500 mt-1", className)} {...props} />;
}

function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("", className)} {...props} />;
}

function CardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mt-4 pt-4 border-t border-white/[0.06] flex items-center", className)} {...props} />;
}

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
