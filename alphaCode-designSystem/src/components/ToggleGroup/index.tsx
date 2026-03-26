"use client";

import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/utils/cn";
import { Tooltip } from "@/components/Tooltip";

/* ── Context ───────────────────────────────────────────────── */
interface ToggleGroupContextValue {
  value: string;
  onValueChange: (value: string) => void;
  variant: "default" | "primary";
  size: "sm" | "md" | "lg";
  iconOnly: boolean;
  activeClassName?: string;
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
    "flex items-center justify-center gap-1 whitespace-nowrap",
    "rounded-sm transition-colors duration-150 select-none cursor-pointer",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
    "disabled:pointer-events-none",
  ],
  {
    variants: {
      size: {
        sm: "h-[22px] px-2 text-xs leading-none",
        md: "h-7 px-4 text-sm",
        lg: "h-8 px-4 text-base",
      },
      iconOnly: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      { iconOnly: true, size: "sm", class: "w-[22px] px-0" },
      { iconOnly: true, size: "md", class: "w-7 px-0" },
      { iconOnly: true, size: "lg", class: "w-8 px-0" },
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
  /** active 아이템에 적용할 Tailwind 클래스 (variant의 active 색상을 override) */
  activeClassName?: string;
}

function ToggleGroup({
  value,
  defaultValue = "",
  onValueChange,
  variant = "default",
  size = "md",
  iconOnly = false,
  activeClassName,
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
    <ToggleGroupContext.Provider value={{ value: currentValue, onValueChange: handleValueChange, variant, size, iconOnly, activeClassName }}>
      <div
        role="group"
        className={cn(
          "inline-flex w-fit rounded-md p-1 gap-1",
          variant === "primary" ? "bg-ac-gray-30" : "bg-ac-blue-gray-10",
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

  const iconSizeClass = {
    sm: "[&_svg]:w-3 [&_svg]:h-3",
    md: "[&_svg]:w-4 [&_svg]:h-4",
    lg: "[&_svg]:w-[18px] [&_svg]:h-[18px]",
  }[ctx.size];

  let buttonClass = "";
  let iconSpanClass = iconSizeClass;

  if (disabled) {
    buttonClass = "text-ac-gray-50";
  } else if (isActive) {
    if (ctx.activeClassName) {
      buttonClass = cn("bg-white font-medium", ctx.activeClassName);
    } else if (ctx.variant === "primary") {
      buttonClass = "bg-white border border-ac-primary-50 text-ac-primary-50 font-medium";
    } else {
      buttonClass = "bg-white text-ac-gray-90 font-medium";
    }
  } else {
    buttonClass = "text-ac-gray-70 font-normal hover:bg-white/60";
    iconSpanClass = cn(iconSizeClass, "text-ac-gray-50");
  }

  const button = (
    <button
      type="button"
      role="radio"
      aria-checked={isActive}
      disabled={disabled}
      onClick={() => ctx.onValueChange(value)}
      className={cn(
        toggleItemVariants({ size: ctx.size, iconOnly: ctx.iconOnly }),
        buttonClass,
        className
      )}
      {...props}
    >
      {icon && <span className={cn("shrink-0", iconSpanClass)}>{icon}</span>}
      {!ctx.iconOnly && children}
    </button>
  );

  if (ctx.iconOnly && tooltip) {
    return (
      <Tooltip content={tooltip} placement="top-center">
        {button}
      </Tooltip>
    );
  }

  return button;
}

export { ToggleGroup, ToggleGroupItem };
