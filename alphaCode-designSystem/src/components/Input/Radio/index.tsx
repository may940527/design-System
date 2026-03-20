import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

/* ── Variants ──────────────────────────────────────────────── */
const radioVariants = cva(
  [
    "shrink-0 rounded-full border transition-colors duration-150",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "disabled:cursor-not-allowed disabled:opacity-40",
    "cursor-pointer appearance-none relative",
    "border-ac-gray-40 bg-ac-white",
    "hover:border-[--radio-color]",
    "checked:border-[--radio-color]",
  ],
  {
    variants: {
      size: {
        md: "h-3 w-3",
        lg: "h-[18px] w-[18px]",
        xl: "h-6 w-6",
      },
    },
    defaultVariants: {
      size: "lg",
    },
  }
);

/* ── Props ─────────────────────────────────────────────────── */
export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type">,
    VariantProps<typeof radioVariants> {
  label?: string;
  description?: string;
  /**
   * 체크 시 색상 (기본: ac-primary-50 #FF6300)
   * 어떤 CSS 색상값도 가능 — "#006FFF", "rgb(0,111,255)", "var(--ac-blue-50)"
   */
  checkedColor?: string;
}

/* ── Radio Item ─────────────────────────────────────────────── */
const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ className, size, label, description, checkedColor, id, style, ...props }, ref) => {
    const inputId = id ?? React.useId();
    const dotSize = size === "md" ? 6 : size === "xl" ? 12 : 8;

    return (
      <div className="inline-flex items-start gap-2">
        <div className="relative flex items-center justify-center">
          <input
            ref={ref}
            id={inputId}
            type="radio"
            className={cn("peer", radioVariants({ size }), className)}
            style={{
              ["--radio-color" as string]: checkedColor ?? "#FF6300",
              ...style,
            }}
            {...props}
          />
          {/* 체크 시 내부 dot */}
          <span
            style={{
              width: dotSize,
              height: dotSize,
              backgroundColor: checkedColor ?? "#FF6300",
            }}
            className="absolute rounded-full pointer-events-none scale-0 peer-checked:scale-100 transition-transform duration-150"
            aria-hidden="true"
          />
        </div>
        {(label || description) && (
          <div className="flex flex-col gap-0.5">
            {label && (
              <label htmlFor={inputId} className="text-sm font-medium text-foreground cursor-pointer leading-none">
                {label}
              </label>
            )}
            {description && (
              <p className="text-xs text-muted-foreground">{description}</p>
            )}
          </div>
        )}
      </div>
    );
  }
);

Radio.displayName = "Radio";

/* ── RadioGroup ─────────────────────────────────────────────── */
export interface RadioGroupProps extends React.HTMLAttributes<HTMLFieldSetElement> {
  title?: string;
  direction?: "vertical" | "horizontal";
}

function RadioGroup({ title, direction = "vertical", className, children, ...props }: RadioGroupProps) {
  return (
    <fieldset className={cn("flex flex-col gap-2", className)} {...props}>
      {title && (
        <legend className="text-sm font-semibold text-foreground mb-1">{title}</legend>
      )}
      <div className={cn("flex gap-3", direction === "vertical" ? "flex-col" : "flex-row flex-wrap")}>
        {children}
      </div>
    </fieldset>
  );
}

export { Radio, RadioGroup };