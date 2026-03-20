import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/utils/cn";

/* ── Container Variants ────────────────────────────────────── */
const textInputVariants = cva(
  [
    "flex items-center w-full rounded-md border bg-background transition-colors duration-150",
    "focus-within:border-ac-primary-50",
    "has-[:disabled]:bg-ac-gray-20 has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-60",
  ],
  {
    variants: {
      size: {
        lg: "h-10 px-3 text-sm gap-2",
        md: "h-9 px-3 text-sm gap-2",
        sm: "h-[30px] px-2.5 text-xs gap-1.5",
      },
      state: {
        default:  "border-border",
        complete: "border-border",
        focus:    "border-ac-primary-50",
        error:    "border-ac-red-50 focus-within:border-ac-red-50",
        disable:  "border-border",
      },
    },
    defaultVariants: { size: "md", state: "default" },
  }
);

/* ── Props ─────────────────────────────────────────────────── */
export interface TextInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "prefix"> {
  size?: "sm" | "md" | "lg";
  state?: "default" | "complete" | "focus" | "error" | "disable";
  label?: string;
  labelLeft?: boolean;
  helperText?: string;
  errorMessage?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
}

/* ── Component ─────────────────────────────────────────────── */
const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  ({ className, size = "md", state = "default", label, labelLeft = false, helperText, errorMessage, prefix, suffix, id, disabled, ...props }, ref) => {
    const inputId = id ?? React.useId();
    const isError = state === "error" || !!errorMessage;
    const resolvedState = isError ? "error" : state;

    const inputEl = (
      <div className={cn(textInputVariants({ size, state: resolvedState }), !labelLeft && "w-full", className)}>
        {prefix && <span className="shrink-0 text-muted-foreground">{prefix}</span>}
        <input
          ref={ref}
          id={inputId}
          disabled={disabled}
          aria-invalid={isError}
          aria-describedby={helperText || errorMessage ? `${inputId}-helper` : undefined}
          className="flex-1 bg-transparent outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed min-w-0"
          {...props}
        />
        {suffix && <span className="shrink-0 text-muted-foreground">{suffix}</span>}
      </div>
    );

    return (
      <div className="flex flex-col gap-1 w-full">
        {label && !labelLeft && (
          <label htmlFor={inputId} className="text-sm font-medium text-foreground">
            {label}
          </label>
        )}
        {labelLeft ? (
          <div className="flex items-center gap-3">
            {label && (
              <label htmlFor={inputId} className="text-sm font-medium text-foreground shrink-0">
                {label}
              </label>
            )}
            {inputEl}
          </div>
        ) : inputEl}
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

TextInput.displayName = "TextInput";

export { TextInput };