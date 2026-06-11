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
        {label && <label htmlFor={inputId} className="block text-sm font-medium text-gray-300 mb-1.5">{label}</label>}
        <textarea
          id={inputId} ref={ref}
          className={cn(
            "w-full rounded-xl bg-surface-2 border border-white/10 text-gray-100 placeholder:text-gray-600 px-4 py-3 text-sm transition-all duration-200 resize-none",
            "focus:outline-none focus:border-brand-blue/60 focus:ring-2 focus:ring-brand-blue/20",
            error && "border-red-500/50", className
          )}
          {...props}
        />
        {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";
export { Textarea };