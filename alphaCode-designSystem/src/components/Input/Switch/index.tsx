import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

/* ── Track Variants ────────────────────────────────────────── */
const switchTrackVariants = cva(
  [
    "relative inline-flex shrink-0 cursor-pointer rounded-full border-2 border-transparent",
    "transition-colors duration-200 ease-in-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "disabled:cursor-not-allowed disabled:opacity-40",
    "bg-ac-gray-40",
    "data-[state=checked]:bg-[--switch-color]",
  ],
  {
    variants: {
      size: {
        lg: "h-5 w-9",    // 36x20px
        md: "h-4 w-[30px]", // 30x16px
      },
    },
    defaultVariants: { size: "lg" },
  }
);

const switchThumbVariants = cva(
  [
    "pointer-events-none inline-block rounded-full bg-ac-white shadow-xs",
    "transition-transform duration-200 ease-in-out",
    "translate-x-0 data-[state=checked]:translate-x-full",
  ],
  {
    variants: {
      size: {
        lg: "h-4 w-4",
        md: "h-3 w-3",
      },
    },
    defaultVariants: { size: "lg" },
  }
);

/* ── Props ─────────────────────────────────────────────────── */
export interface SwitchProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange">,
    VariantProps<typeof switchTrackVariants> {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  /** 활성 색상 (기본: ac-primary-50 #FF6300) */
  activeColor?: string;
  label?: string;
}

/* ── Component ─────────────────────────────────────────────── */
const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  ({ className, size, checked, defaultChecked, onCheckedChange, activeColor, label, disabled, id, style, ...props }, ref) => {
    const [isChecked, setIsChecked] = React.useState(defaultChecked ?? false);
    const controlled = checked !== undefined;
    const state = (controlled ? checked : isChecked) ? "checked" : "unchecked";
    const inputId = id ?? React.useId();

    const handleClick = () => {
      if (disabled) return;
      const next = state !== "checked";
      if (!controlled) setIsChecked(next);
      onCheckedChange?.(next);
    };

    return (
      <div className="inline-flex items-center gap-2">
        <button
          ref={ref}
          id={inputId}
          type="button"
          role="switch"
          aria-checked={state === "checked"}
          data-state={state}
          disabled={disabled}
          onClick={handleClick}
          className={cn(switchTrackVariants({ size }), className)}
          style={{
            ["--switch-color" as string]: activeColor ?? "#FF6300" /* ac-primary-50 */,
            ...style,
          }}
          {...props}
        >
          <span
            data-state={state}
            className={cn(switchThumbVariants({ size }))}
          />
        </button>
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-foreground cursor-pointer">
            {label}
          </label>
        )}
      </div>
    );
  }
);

Switch.displayName = "Switch";

export { Switch };