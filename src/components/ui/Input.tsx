import * as React from "react";
import { cn } from "@/lib/utils/cn";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, leftIcon, rightIcon, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="w-full">
        {label && <label htmlFor={inputId} className="block text-sm font-medium text-gray-300 mb-1.5">{label}</label>}
        <div className="relative">
          {leftIcon && <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">{leftIcon}</div>}
          <input
            id={inputId} ref={ref}
            className={cn(
              "w-full h-11 rounded-xl bg-surface-2 border border-white/10 text-gray-100 placeholder:text-gray-600 px-4 py-2.5 text-sm transition-all duration-200",
              "focus:outline-none focus:border-brand-blue/60 focus:ring-2 focus:ring-brand-blue/20 hover:border-white/20",
              leftIcon && "pl-10", rightIcon && "pr-10",
              error && "border-red-500/50",
              className
            )}
            {...props}
          />
          {rightIcon && <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">{rightIcon}</div>}
        </div>
        {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
        {hint && !error && <p className="mt-1.5 text-xs text-gray-600">{hint}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";
export { Input };