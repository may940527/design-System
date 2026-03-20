import * as React from "react";
import { cn } from "@/utils/cn";

/* ── Props ─────────────────────────────────────────────────── */
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  state?: "default" | "complete" | "focus" | "error" | "disable";
}

/* ── Component ─────────────────────────────────────────────── */
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, helperText, errorMessage, state, id, disabled, ...props }, ref) => {
    const inputId = id ?? React.useId();
    const isError = state === "error" || !!errorMessage;

    const borderClass = isError
      ? "border-ac-red-50 focus:border-ac-red-50"
      : "border-border focus:border-ac-primary-50";

    return (
      <div className="flex flex-col gap-1 w-full">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-foreground">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          disabled={disabled}
          aria-invalid={isError}
          aria-describedby={helperText || errorMessage ? `${inputId}-helper` : undefined}
          className={cn(
            "w-full rounded-md border bg-background px-3 py-2 text-sm",
            "placeholder:text-muted-foreground",
            "transition-colors duration-150 outline-none",
            "resize-y min-h-[30px]",
            "disabled:bg-ac-gray-20 disabled:cursor-not-allowed disabled:opacity-60",
            borderClass,
            className
          )}
          {...props}
        />
        {(helperText || errorMessage) && (
          <p
            id={`${inputId}-helper`}
            className={cn("text-xs", isError ? "text-ac-red-50" : "text-muted-foreground")}
          >
            {errorMessage || helperText}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea };