import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

/* ── Variants ──────────────────────────────────────────────── */
const checkboxVariants = cva(
  [
    "shrink-0 rounded-xs border transition-colors duration-normal",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "disabled:cursor-not-allowed disabled:opacity-40",
    "cursor-pointer appearance-none relative",
    "border-ac-gray-40 bg-ac-white",
    "hover:border-[--checkbox-color]",
    "checked:bg-[--checkbox-color] checked:border-[--checkbox-color]",
    "indeterminate:bg-[--checkbox-color] indeterminate:border-[--checkbox-color]",
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
export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type">,
    VariantProps<typeof checkboxVariants> {
  label?: string;
  description?: string;
  indeterminate?: boolean;
  /**
   * 체크 시 색상 (기본: ac-primary-50 #FF6300)
   * 어떤 CSS 색상값도 가능 — "#006FFF", "rgb(0,111,255)", "var(--ac-blue-50)"
   */
  checkedColor?: string;
}

/* ── Icons ─────────────────────────────────────────────────── */
function CheckIcon({ size }: { size: CheckboxProps["size"] }) {
  const dim = size === "md" ? 8 : size === "xl" ? 16 : 12;
  return (
    <svg width={dim} height={dim} viewBox="0 0 12 12" fill="none"
      className="absolute inset-0 m-auto pointer-events-none text-white"
      aria-hidden="true"
    >
      <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IndeterminateIcon({ size }: { size: CheckboxProps["size"] }) {
  const dim = size === "md" ? 8 : size === "xl" ? 16 : 12;
  return (
    <svg width={dim} height={dim} viewBox="0 0 12 12" fill="none"
      className="absolute inset-0 m-auto pointer-events-none text-white"
      aria-hidden="true"
    >
      <path d="M2 6h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/* ── Component ─────────────────────────────────────────────── */
const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, size, label, description, indeterminate = false, checkedColor, id, style, ...props }, ref) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const resolvedRef = (ref as React.RefObject<HTMLInputElement>) || inputRef;
    const inputId = id ?? React.useId();

    React.useEffect(() => {
      if (resolvedRef.current) {
        resolvedRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate, resolvedRef]);

    return (
      <div className="inline-flex items-start gap-2">
        <div className="relative flex items-center">
          <input
            ref={resolvedRef}
            id={inputId}
            type="checkbox"
            className={cn(checkboxVariants({ size }), className)}
            style={{
              ["--checkbox-color" as string]: checkedColor ?? "#FF6300" /* ac-primary-50 */,
              ...style,
            }}
            {...props}
          />
          {indeterminate ? <IndeterminateIcon size={size} /> : <CheckIcon size={size} />}
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

Checkbox.displayName = "Checkbox";

export { Checkbox };

/* ── CheckboxGroup ──────────────────────────────────────────── */
export interface CheckboxGroupProps extends React.HTMLAttributes<HTMLFieldSetElement> {
  title?: string;
  direction?: "vertical" | "horizontal";
}

function CheckboxGroup({ title, direction = "vertical", className, children, ...props }: CheckboxGroupProps) {
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

export { CheckboxGroup };