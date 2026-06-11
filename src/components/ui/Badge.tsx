import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/cn";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full font-medium transition-colors border text-xs",
  {
    variants: {
      variant: {
        default: "bg-surface-3 text-gray-300 border-white/10",
        blue: "bg-brand-blue/10 text-brand-blue border-brand-blue/20",
        purple: "bg-brand-purple/10 text-brand-purple border-brand-purple/20",
        gradient: "bg-gradient-brand text-white border-transparent",
        success: "bg-green-500/10 text-green-400 border-green-500/20",
        warning: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
        danger: "bg-red-500/10 text-red-400 border-red-500/20",
        outline: "border-white/20 text-gray-400",
      },
      size: {
        sm: "px-2 py-0.5 text-[10px]",
        md: "px-2.5 py-1",
        lg: "px-3 py-1.5 text-sm",
      },
    },
    defaultVariants: { variant: "default", size: "md" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant, size, className }))} {...props} />;
}

export { Badge, badgeVariants };