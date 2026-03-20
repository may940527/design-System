"use client";

import * as React from "react";
import { Plus, Minus, ChevronDown } from "lucide-react";
import { cn } from "@/utils/cn";

/* ── Context ─────────────────────────────────────────────────── */
type AccordionType = "single" | "multiple";

interface AccordionContextValue {
  type: AccordionType;
  openValues: string[];
  toggleItem: (value: string) => void;
  variant: "default" | "filled";
  backgroundColor?: string;
  contentClassName?: string;
}

const AccordionContext = React.createContext<AccordionContextValue | null>(null);

interface AccordionItemContextValue {
  value: string;
  isOpen: boolean;
}

const AccordionItemContext = React.createContext<AccordionItemContextValue | null>(null);

/* ══════════════════════════════════════════════════════════════
   Accordion (Root)
══════════════════════════════════════════════════════════════ */
export interface AccordionProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  type?: AccordionType;
  /** default: 배경 없음 / filled: 배경색 있음 */
  variant?: "default" | "filled";
  /** filled variant 시 배경색 커스텀 (기본: ac-gray-10) */
  backgroundColor?: string;
  /** 모든 AccordionContent에 일괄 적용할 className */
  contentClassName?: string;
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
}

const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  (
    {
      className,
      type = "single",
      variant = "default",
      backgroundColor,
      contentClassName,
      value,
      defaultValue = [],
      onValueChange,
      children,
      ...props
    },
    ref
  ) => {
    const [internalValues, setInternalValues] = React.useState<string[]>(defaultValue);
    const openValues = value !== undefined ? value : internalValues;

    const toggleItem = React.useCallback(
      (itemValue: string) => {
        let newValues: string[];
        if (type === "single") {
          newValues = openValues.includes(itemValue) ? [] : [itemValue];
        } else {
          newValues = openValues.includes(itemValue)
            ? openValues.filter((v) => v !== itemValue)
            : [...openValues, itemValue];
        }
        if (value === undefined) setInternalValues(newValues);
        onValueChange?.(newValues);
      },
      [type, openValues, value, onValueChange]
    );

    return (
      <AccordionContext.Provider value={{ type, openValues, toggleItem, variant, backgroundColor, contentClassName }}>
        <div ref={ref} className={cn("w-full overflow-hidden", className)} {...props}>
          {children}
        </div>
      </AccordionContext.Provider>
    );
  }
);
Accordion.displayName = "Accordion";

/* ══════════════════════════════════════════════════════════════
   AccordionItem
══════════════════════════════════════════════════════════════ */
export interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ className, value, children, ...props }, ref) => {
    const context = React.useContext(AccordionContext);
    if (!context) throw new Error("AccordionItem must be used within an Accordion");

    const isOpen = context.openValues.includes(value);

    return (
      <AccordionItemContext.Provider value={{ value, isOpen }}>
        <div
          ref={ref}
          className={cn(
            "border-b border-ac-gray-30 last:border-b-0",
            className
          )}
          {...props}
        >
          {children}
        </div>
      </AccordionItemContext.Provider>
    );
  }
);
AccordionItem.displayName = "AccordionItem";

/* ══════════════════════════════════════════════════════════════
   AccordionTrigger
══════════════════════════════════════════════════════════════ */
export interface AccordionTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** plus: +/- 토글 아이콘 (Default) / chevron: 화살표 아이콘 */
  iconType?: "plus" | "chevron";
}

const AccordionTrigger = React.forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({ className, children, iconType = "plus", ...props }, ref) => {
    const rootContext = React.useContext(AccordionContext);
    const itemContext = React.useContext(AccordionItemContext);
    if (!rootContext || !itemContext)
      throw new Error("AccordionTrigger must be used within an AccordionItem");

    const { isOpen } = itemContext;
    const { variant, backgroundColor } = rootContext;

    return (
      <h3 className="flex">
        <button
          ref={ref}
          type="button"
          aria-expanded={isOpen}
          onClick={() => rootContext.toggleItem(itemContext.value)}
          className={cn(
            "flex flex-1 items-center justify-between py-4 px-4 font-medium",
            "transition-colors duration-slow",
            variant === "filled"
              ? "hover:brightness-95"
              : "hover:bg-ac-gray-10",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset",
            className
          )}
          style={
            variant === "filled"
              ? { backgroundColor: backgroundColor ?? "#FBFBFB" }
              : undefined
          }
          {...props}
        >
          <span className="text-left text-sm font-medium text-foreground">{children}</span>

          {iconType === "plus" ? (
            <span className="shrink-0 ml-4 text-muted-foreground">
              {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            </span>
          ) : (
            <ChevronDown
              className={cn(
                "h-4 w-4 shrink-0 ml-4 text-muted-foreground transition-transform duration-slow",
                isOpen && "rotate-180"
              )}
            />
          )}
        </button>
      </h3>
    );
  }
);
AccordionTrigger.displayName = "AccordionTrigger";

/* ══════════════════════════════════════════════════════════════
   AccordionContent
══════════════════════════════════════════════════════════════ */
const AccordionContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, style, ...props }, ref) => {
    const itemContext = React.useContext(AccordionItemContext);
    const rootContext = React.useContext(AccordionContext);
    if (!itemContext) throw new Error("AccordionContent must be used within an AccordionItem");

    const { isOpen } = itemContext;
    const backgroundColor =
      rootContext?.variant === "filled" ? rootContext.backgroundColor ?? "#FBFBFB" : undefined;
    const contentClassName = rootContext?.contentClassName;

    return (
      <div
        className={cn(
          "grid transition-all duration-slow ease-in-out text-sm",
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <div
            ref={ref}
            className={cn(
              "flex flex-col px-6 py-4 text-sm text-muted-foreground leading-relaxed",
              "[&>*]:py-2 [&>*]:border-b [&>*]:border-ac-gray-30 [&>*:last-child]:border-b-0",
              contentClassName,
              className
            )}
            style={{ backgroundColor, ...style }}
            {...props}
          >
            {children}
          </div>
        </div>
      </div>
    );
  }
);
AccordionContent.displayName = "AccordionContent";

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };