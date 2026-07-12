// =============================================
// BADGE — src/components/ui/Badge.tsx
// =============================================
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/cn";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full font-medium transition-colors border text-xs",
  {
    variants: {
      variant: {
        default: "bg-surface-2 text-ink-2 border-border",
        blue: "bg-brand-blue/10 text-brand-blue border-brand-blue/20",
        purple: "bg-brand-blue/10 text-brand-blue border-brand-blue/20",
        gradient: "bg-brand-blue text-white hover:bg-brand-blue-hover border-transparent",
        success: "bg-status-success/10 text-status-success border-status-success/20",
        warning: "bg-status-warning/10 text-status-warning border-status-warning/20",
        danger: "bg-status-danger/10 text-status-danger border-status-danger/20",
        outline: "border-border-strong text-ink-2",
      },
      size: {
        sm: "px-2 py-0.5 text-[10px]",
        md: "px-2.5 py-1",
        lg: "px-3 py-1.5 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant, size, className }))} {...props} />
  );
}

export { Badge, badgeVariants };
