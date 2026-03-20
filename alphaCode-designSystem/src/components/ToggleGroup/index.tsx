"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

/* ── Context ───────────────────────────────────────────────── */
interface ToggleGroupContextValue {
  value: string;
  onValueChange: (value: string) => void;
  variant: "default" | "primary";
  size: "sm" | "md" | "lg";
  iconOnly: boolean;
}

const ToggleGroupContext = React.createContext<ToggleGroupContextValue>({
  value: "",
  onValueChange: () => {},
  variant: "default",
  size: "md",
  iconOnly: false,
});

/* ── Item Variants ─────────────────────────────────────────── */
const toggleItemVariants = cva(
  [
    "inline-flex items-center justify-center gap-1.5 whitespace-nowrap",
    "font-medium text-sm transition-colors duration-150 select-none cursor-pointer",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
    "disabled:pointer-events-none disabled:opacity-40",
    "first:rounded-l-md last:rounded-r-md",
  ],
  {
    variants: {
      size: {
        sm: "h-[30px] px-3 text-xs",
        md: "h-9 px-4 text-sm",
        lg: "h-10 px-5 text-sm",
      },
      iconOnly: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      { iconOnly: true, size: "sm", class: "w-[30px] px-0" },
      { iconOnly: true, size: "md", class: "w-9 px-0" },
      { iconOnly: true, size: "lg", class: "w-10 px-0" },
    ],
    defaultVariants: { size: "md", iconOnly: false },
  }
);

/* ── ToggleGroup ───────────────────────────────────────────── */
export interface ToggleGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** "default" | "primary" */
  variant?: "default" | "primary";
  size?: "sm" | "md" | "lg";
  iconOnly?: boolean;
}

function ToggleGroup({
  value,
  defaultValue = "",
  onValueChange,
  variant = "default",
  size = "md",
  iconOnly = false,
  className,
  children,
  ...props
}: ToggleGroupProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const controlled = value !== undefined;
  const currentValue = controlled ? value : internalValue;

  const handleValueChange = (val: string) => {
    if (!controlled) setInternalValue(val);
    onValueChange?.(val);
  };

  return (
    <ToggleGroupContext.Provider value={{ value: currentValue, onValueChange: handleValueChange, variant, size, iconOnly }}>
      <div
        role="group"
        className={cn(
          "inline-flex rounded-md border border-border overflow-hidden divide-x divide-border",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </ToggleGroupContext.Provider>
  );
}

/* ── ToggleGroupItem ───────────────────────────────────────── */
export interface ToggleGroupItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  icon?: React.ReactNode;
  tooltip?: string;
}

function ToggleGroupItem({ value, icon, tooltip, children, className, disabled, ...props }: ToggleGroupItemProps) {
  const ctx = React.useContext(ToggleGroupContext);
  const isActive = ctx.value === value;

  const activeStyles = isActive
    ? ctx.variant === "primary"
      ? "bg-ac-primary-50 text-white"
      : "bg-ac-gray-90 text-white"
    : "bg-background text-ac-gray-60 hover:bg-ac-gray-20 hover:text-foreground";

  return (
    <div className="relative group">
      <button
        type="button"
        role="radio"
        aria-checked={isActive}
        disabled={disabled}
        onClick={() => ctx.onValueChange(value)}
        className={cn(
          toggleItemVariants({ size: ctx.size, iconOnly: ctx.iconOnly }),
          activeStyles,
          className
        )}
        {...props}
      >
        {icon && <span className="shrink-0">{icon}</span>}
        {!ctx.iconOnly && children}
      </button>
      {ctx.iconOnly && tooltip && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-ac-gray-90 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-tooltip">
          {tooltip}
        </div>
      )}
    </div>
  );
}

export { ToggleGroup, ToggleGroupItem };