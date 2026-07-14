import * as React from "react";
import { cn } from "@/lib/utils/cn";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-ink-2 mb-1.5">
            {label}
          </label>
        )}
        <textarea
          id={inputId}
          ref={ref}
          className={cn(
            "w-full rounded-[14px] bg-surface border border-border text-ink placeholder:text-ink-muted",
            "px-4 py-3 text-sm transition-all duration-250 resize-none",
            "focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20",
            error && "border-status-danger/50",
            className
          )}
          {...props}
        />
        {error && <p className="mt-1.5 text-xs text-status-danger">{error}</p>}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";
export { Textarea };
