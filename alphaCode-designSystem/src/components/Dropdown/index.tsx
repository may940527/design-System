"use client";

import * as React from "react";
import { ChevronRight, ExternalLink } from "lucide-react";
import { cn } from "@/utils/cn";
import { Checkbox } from "@/components/Input/Checkbox";
import { Radio } from "@/components/Input/Radio";

/* ══════════════════════════════════════════════════════════════
   Types
══════════════════════════════════════════════════════════════ */
export type DropdownAlign    = "start" | "center" | "end";
export type DropdownSide     = "top" | "bottom" | "left" | "right";
export type DropdownItemType = "default" | "checkbox" | "radio" | "small" | "label" | "separator";

/* ══════════════════════════════════════════════════════════════
   Context
══════════════════════════════════════════════════════════════ */
interface DropdownContextValue {
  open: boolean;
  setOpen: (v: boolean) => void;
  triggerRef: React.RefObject<HTMLElement>;
  side: DropdownSide;
  align: DropdownAlign;
}

const DropdownContext = React.createContext<DropdownContextValue | null>(null);

function useDropdown() {
  const ctx = React.useContext(DropdownContext);
  if (!ctx) throw new Error("Must be used within <Dropdown>");
  return ctx;
}

/* ── Sub dropdown context ───────────────────────────────────── */
const SubDropdownContext = React.createContext<{
  openSub: string | null;
  setOpenSub: (id: string | null) => void;
} | null>(null);

/* ══════════════════════════════════════════════════════════════
   Dropdown (Root)
══════════════════════════════════════════════════════════════ */
export interface DropdownProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  side?: DropdownSide;
  align?: DropdownAlign;
  children: React.ReactNode;
}

function Dropdown({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  side = "bottom",
  align = "start",
  children,
}: DropdownProps) {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
  const controlled = controlledOpen !== undefined;
  const open = controlled ? controlledOpen! : internalOpen;
  const triggerRef = React.useRef<HTMLElement>(null!);

  const setOpen = React.useCallback((v: boolean) => {
    if (!controlled) setInternalOpen(v);
    onOpenChange?.(v);
  }, [controlled, onOpenChange]);

  // 외부 클릭 닫기
  const containerRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open, setOpen]);

  // ESC 닫기
  React.useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, setOpen]);

  return (
    <DropdownContext.Provider value={{ open, setOpen, triggerRef, side, align }}>
      <div ref={containerRef} className="relative inline-block">
        {children}
      </div>
    </DropdownContext.Provider>
  );
}
Dropdown.displayName = "Dropdown";

/* ══════════════════════════════════════════════════════════════
   DropdownTrigger
══════════════════════════════════════════════════════════════ */
export interface DropdownTriggerProps extends React.HTMLAttributes<HTMLElement> {
  asChild?: boolean;
  disabled?: boolean;
}

function DropdownTrigger({ children, asChild, disabled, onClick, ...props }: DropdownTriggerProps) {
  const { setOpen, open, triggerRef } = useDropdown();

  const handleClick = (e: React.MouseEvent) => {
    if (disabled) return;
    (onClick as any)?.(e);
    setOpen(!open);
  };

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<any>, {
      ref: triggerRef,
      onClick: handleClick,
      "aria-haspopup": "menu",
      "aria-expanded": open,
      disabled,
    });
  }

  return (
    <button
      ref={triggerRef as React.RefObject<HTMLButtonElement>}
      type="button"
      onClick={handleClick}
      aria-haspopup="menu"
      aria-expanded={open}
      disabled={disabled}
      {...(props as any)}
    >
      {children}
    </button>
  );
}
DropdownTrigger.displayName = "DropdownTrigger";

/* ══════════════════════════════════════════════════════════════
   위치 계산 헬퍼
══════════════════════════════════════════════════════════════ */
function getSideAlignClass(side: DropdownSide, align: DropdownAlign): string {
  const sideMap: Record<DropdownSide, string> = {
    bottom: "top-full mt-1",
    top:    "bottom-full mb-1",
    left:   "right-full mr-1 top-0",
    right:  "left-full ml-1 top-0",
  };
  const alignMapV: Record<DropdownAlign, string> = {
    start:  "left-0",
    center: "left-1/2 -translate-x-1/2",
    end:    "right-0",
  };
  const alignMapH: Record<DropdownAlign, string> = {
    start:  "top-0",
    center: "top-1/2 -translate-y-1/2",
    end:    "bottom-0",
  };

  const isVertical = side === "top" || side === "bottom";
  return cn(sideMap[side], isVertical ? alignMapV[align] : alignMapH[align]);
}

/* ══════════════════════════════════════════════════════════════
   DropdownContent
══════════════════════════════════════════════════════════════ */
export interface DropdownContentProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  minWidth?: number | string;
}

const DropdownContent = React.forwardRef<HTMLDivElement, DropdownContentProps>(
  ({ className, children, minWidth = 160, ...props }, ref) => {
    const { open, side, align } = useDropdown();
    const [openSub, setOpenSub] = React.useState<string | null>(null);

    if (!open) return null;

    return (
      <SubDropdownContext.Provider value={{ openSub, setOpenSub }}>
        <div
          ref={ref}
          role="menu"
          aria-orientation="vertical"
          className={cn(
            "absolute z-dropdown",
            "bg-background rounded-md border border-border shadow-md",
            "py-1 animate-scale-in",
            getSideAlignClass(side, align),
            className
          )}
          style={{ minWidth }}
          {...props}
        >
          {children}
        </div>
      </SubDropdownContext.Provider>
    );
  }
);
DropdownContent.displayName = "DropdownContent";

/* ══════════════════════════════════════════════════════════════
   DropdownLabel — 그룹 레이블 (비활성)
══════════════════════════════════════════════════════════════ */
const DropdownLabel = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("px-3 py-1 text-xs font-medium text-muted-foreground select-none", className)}
      {...props}
    />
  )
);
DropdownLabel.displayName = "DropdownLabel";

/* ══════════════════════════════════════════════════════════════
   DropdownSeparator
══════════════════════════════════════════════════════════════ */
const DropdownSeparator = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} role="separator" className={cn("my-1 h-px bg-border mx-0", className)} {...props} />
  )
);
DropdownSeparator.displayName = "DropdownSeparator";

/* ══════════════════════════════════════════════════════════════
   DropdownItem — 기본 아이템
══════════════════════════════════════════════════════════════ */
export interface DropdownItemProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  /** 좌측 아이콘 */
  icon?: React.ReactNode;
  /** 우측 단축키 힌트 */
  shortcut?: string;
  /** 외부 링크 아이콘 표시 */
  external?: boolean;
  /** 우측 chevron (sub dropdown용) */
  hasSubmenu?: boolean;
  disabled?: boolean;
  /** small 사이즈 */
  small?: boolean;
  onSelect?: () => void;
}

const DropdownItem = React.forwardRef<HTMLDivElement, DropdownItemProps>(
  (
    {
      className, children, icon, shortcut, external,
      hasSubmenu, disabled, small, onSelect, onClick, ...props
    },
    ref
  ) => {
    const { setOpen } = useDropdown();

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled) return;
      onClick?.(e);
      onSelect?.();
      if (!hasSubmenu) setOpen(false);
    };

    return (
      <div
        ref={ref}
        role="menuitem"
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        onClick={handleClick}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleClick(e as any); }}
        className={cn(
          "flex items-center gap-2 w-full cursor-pointer select-none",
          "transition-colors duration-fast",
          small ? "px-3 py-1.5 text-xs" : "px-3 py-2 text-sm",
          disabled
            ? "text-muted-foreground opacity-50 cursor-not-allowed pointer-events-none"
            : "text-foreground hover:bg-ac-gray-20",
          className
        )}
        {...props}
      >
        {icon && <span className="shrink-0 w-4 h-4 flex items-center justify-center text-muted-foreground">{icon}</span>}
        <span className="flex-1 min-w-0 truncate">{children}</span>
        {shortcut && <span className="shrink-0 text-xs text-muted-foreground ml-auto pl-4 tabular-nums">{shortcut}</span>}
        {external && <ExternalLink className="shrink-0 w-3 h-3 text-muted-foreground ml-auto" />}
        {hasSubmenu && <ChevronRight className="shrink-0 w-4 h-4 text-muted-foreground ml-auto" />}
      </div>
    );
  }
);
DropdownItem.displayName = "DropdownItem";

/* ══════════════════════════════════════════════════════════════
   DropdownCheckboxItem — 기존 Checkbox 컴포넌트 재사용
══════════════════════════════════════════════════════════════ */
export interface DropdownCheckboxItemProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  icon?: React.ReactNode;
}

const DropdownCheckboxItem = React.forwardRef<HTMLDivElement, DropdownCheckboxItemProps>(
  ({ className, children, checked: controlledChecked, defaultChecked = false, onCheckedChange, disabled, icon, ...props }, ref) => {
    const [internalChecked, setInternalChecked] = React.useState(defaultChecked);
    const controlled = controlledChecked !== undefined;
    const checked = controlled ? controlledChecked! : internalChecked;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const next = e.target.checked;
      if (!controlled) setInternalChecked(next);
      onCheckedChange?.(next);
    };

    return (
      <div
        ref={ref}
        role="menuitemcheckbox"
        aria-checked={checked}
        className={cn(
          "flex items-center gap-2 px-3 py-2 text-sm w-full select-none",
          "transition-colors duration-fast",
          disabled ? "opacity-50 pointer-events-none" : "hover:bg-ac-gray-20",
          className
        )}
        {...props}
      >
        <Checkbox
          size="lg"
          checked={checked}
          disabled={disabled}
          onChange={handleChange}
          onClick={(e) => e.stopPropagation()}
        />
        {icon && <span className="shrink-0 w-4 h-4 flex items-center justify-center text-muted-foreground">{icon}</span>}
        <span className="flex-1 min-w-0 truncate text-foreground">{children}</span>
      </div>
    );
  }
);
DropdownCheckboxItem.displayName = "DropdownCheckboxItem";

/* ══════════════════════════════════════════════════════════════
   DropdownRadioGroup + DropdownRadioItem
══════════════════════════════════════════════════════════════ */
const DropdownRadioContext = React.createContext<{
  value: string;
  onValueChange: (v: string) => void;
} | null>(null);

export interface DropdownRadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

function DropdownRadioGroup({ value: controlledValue, defaultValue = "", onValueChange, children, ...props }: DropdownRadioGroupProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const controlled = controlledValue !== undefined;
  const value = controlled ? controlledValue! : internalValue;

  const handleChange = (v: string) => {
    if (!controlled) setInternalValue(v);
    onValueChange?.(v);
  };

  return (
    <DropdownRadioContext.Provider value={{ value, onValueChange: handleChange }}>
      <div role="group" {...props}>{children}</div>
    </DropdownRadioContext.Provider>
  );
}
DropdownRadioGroup.displayName = "DropdownRadioGroup";

/* ══════════════════════════════════════════════════════════════
   DropdownRadioItem — 기존 Radio 컴포넌트 재사용
══════════════════════════════════════════════════════════════ */
export interface DropdownRadioItemProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  value: string;
  disabled?: boolean;
  icon?: React.ReactNode;
}

const DropdownRadioItem = React.forwardRef<HTMLDivElement, DropdownRadioItemProps>(
  ({ className, children, value, disabled, icon, ...props }, ref) => {
    const radioCtx = React.useContext(DropdownRadioContext);
    const checked = radioCtx?.value === value;

    const handleChange = () => {
      if (!disabled) radioCtx?.onValueChange(value);
    };

    return (
      <div
        ref={ref}
        role="menuitemradio"
        aria-checked={checked}
        className={cn(
          "flex items-center gap-2 px-3 py-2 text-sm w-full select-none",
          "transition-colors duration-fast",
          disabled ? "opacity-50 pointer-events-none" : "hover:bg-ac-gray-20",
          className
        )}
        {...props}
      >
        <Radio
          size="lg"
          checked={checked}
          disabled={disabled}
          onChange={handleChange}
          onClick={(e) => e.stopPropagation()}
        />
        {icon && <span className="shrink-0 w-4 h-4 flex items-center justify-center text-muted-foreground">{icon}</span>}
        <span className="flex-1 min-w-0 truncate text-foreground">{children}</span>
      </div>
    );
  }
);
DropdownRadioItem.displayName = "DropdownRadioItem";

/* ══════════════════════════════════════════════════════════════
   DropdownSubMenu — Sub dropdown
══════════════════════════════════════════════════════════════ */
export interface DropdownSubMenuProps {
  id: string;
  trigger: React.ReactNode;
  children: React.ReactNode;
  disabled?: boolean;
}

function DropdownSubMenu({ id, trigger, children, disabled }: DropdownSubMenuProps) {
  const subCtx = React.useContext(SubDropdownContext);
  const isOpen = subCtx?.openSub === id;
  const ref = React.useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => { if (!disabled) subCtx?.setOpenSub(id); };
  const handleMouseLeave = () => subCtx?.setOpenSub(null);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* 트리거 아이템 */}
      <div
        role="menuitem"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-disabled={disabled}
        className={cn(
          "flex items-center gap-2 px-3 py-2 text-sm w-full cursor-pointer select-none",
          "transition-colors duration-fast",
          disabled
            ? "text-muted-foreground opacity-50 cursor-not-allowed pointer-events-none"
            : "text-foreground hover:bg-ac-gray-20"
        )}
      >
        <span className="flex-1 min-w-0 truncate">{trigger}</span>
        <ChevronRight className="shrink-0 w-4 h-4 text-muted-foreground" />
      </div>

      {/* Sub panel */}
      {isOpen && (
        <div
          role="menu"
          className={cn(
            "absolute left-full top-0 ml-1 z-dropdown",
            "bg-background rounded-md border border-border shadow-md",
            "py-1 min-w-[160px] animate-scale-in"
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
}
DropdownSubMenu.displayName = "DropdownSubMenu";

/* ══════════════════════════════════════════════════════════════
   Exports
══════════════════════════════════════════════════════════════ */
export {
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownLabel,
  DropdownSeparator,
  DropdownItem,
  DropdownCheckboxItem,
  DropdownRadioGroup,
  DropdownRadioItem,
  DropdownSubMenu,
};