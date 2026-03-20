import * as React from "react";
import { cn } from "@/utils/cn";

/* ── Types ─────────────────────────────────────────────────── */
export type TabSize    = "sm" | "md" | "lg";
export type TabVariant = "fill" | "full";

/* ── Size map ──────────────────────────────────────────────── */
const tabSizeClass: Record<TabSize, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-5 text-base",
};

/* ══════════════════════════════════════════════════════════════
   Context
══════════════════════════════════════════════════════════════ */
interface TabContextValue {
  value: string;
  onChange: (v: string) => void;
  variant: TabVariant;
  size: TabSize;
  activeColor: string;
}

const TabContext = React.createContext<TabContextValue | null>(null);

function useTab() {
  const ctx = React.useContext(TabContext);
  if (!ctx) throw new Error("Must be used within <Tabs>");
  return ctx;
}

/* ══════════════════════════════════════════════════════════════
   Tabs (Root)
══════════════════════════════════════════════════════════════ */
export interface TabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** fill: 콘텐츠 너비 / full: 균등 분할 */
  variant?: TabVariant;
  size?: TabSize;
  /** 활성 탭 색상 (기본 ac-primary-50) */
  activeColor?: string;
}

const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      className,
      value: controlledValue,
      defaultValue = "",
      onValueChange,
      variant = "fill",
      size = "md",
      activeColor = "#FF6300", /* ac-primary-50 */
      children,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue);
    const controlled = controlledValue !== undefined;
    const value = controlled ? controlledValue! : internalValue;

    const onChange = React.useCallback((v: string) => {
      if (!controlled) setInternalValue(v);
      onValueChange?.(v);
    }, [controlled, onValueChange]);

    return (
      <TabContext.Provider value={{ value, onChange, variant, size, activeColor }}>
        <div ref={ref} className={cn("w-full", className)} {...props}>
          {children}
        </div>
      </TabContext.Provider>
    );
  }
);
Tabs.displayName = "Tabs";

/* ══════════════════════════════════════════════════════════════
   TabList — 탭 목록 + 하단 구분선
══════════════════════════════════════════════════════════════ */
const TabList = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    const { variant } = useTab();

    return (
      <div
        ref={ref}
        role="tablist"
        className={cn(
          "relative flex border-b border-ac-gray-30",
          variant === "full" && "w-full",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
TabList.displayName = "TabList";

/* ══════════════════════════════════════════════════════════════
   TabTrigger — 개별 탭 버튼
══════════════════════════════════════════════════════════════ */
export interface TabTriggerProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "value"> {
  value: string;
}

const TabTrigger = React.forwardRef<HTMLButtonElement, TabTriggerProps>(
  ({ className, value, children, disabled, ...props }, ref) => {
    const { value: selected, onChange, variant, size, activeColor } = useTab();
    const isActive = selected === value;

    return (
      <button
        ref={ref}
        role="tab"
        type="button"
        aria-selected={isActive}
        aria-disabled={disabled}
        tabIndex={isActive ? 0 : -1}
        disabled={disabled}
        onClick={() => !disabled && onChange(value)}
        className={cn(
          "relative inline-flex items-center justify-center whitespace-nowrap",
          "font-medium transition-colors duration-normal select-none",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset",
          tabSizeClass[size],
          variant === "full" && "flex-1",
          isActive
            ? ""
            : "text-muted-foreground hover:text-foreground",
          disabled && "opacity-40 pointer-events-none",
          className
        )}
        style={isActive ? { color: activeColor } : undefined}
        {...props}
      >
        {children}
        {/* 활성 인디케이터 */}
        {isActive && (
          <span
            className="absolute bottom-0 left-0 right-0 h-0.5"
            style={{ backgroundColor: activeColor }}
            aria-hidden="true"
          />
        )}
      </button>
    );
  }
);
TabTrigger.displayName = "TabTrigger";

/* ══════════════════════════════════════════════════════════════
   TabContent — 패널
══════════════════════════════════════════════════════════════ */
export interface TabContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

const TabContent = React.forwardRef<HTMLDivElement, TabContentProps>(
  ({ className, value, children, ...props }, ref) => {
    const { value: selected } = useTab();
    const isActive = selected === value;

    if (!isActive) return null;

    return (
      <div
        ref={ref}
        role="tabpanel"
        tabIndex={0}
        className={cn("mt-4 focus-visible:outline-none", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
TabContent.displayName = "TabContent";

export { Tabs, TabList, TabTrigger, TabContent };