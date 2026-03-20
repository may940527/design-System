"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { X, ChevronRight, Check } from "lucide-react";
import { cn } from "@/utils/cn";

/* ── Types ─────────────────────────────────────────────────── */
export type SnackbarVariant  = "default" | "error" | "success" | "info" | "warning";
export type SnackbarPosition = "top" | "bottom";

/* ── Variant 스타일 ─────────────────────────────────────────── */
const variantClass: Record<SnackbarVariant, string> = {
  default:  "bg-ac-gray-80 text-ac-white",
  error:    "bg-ac-red-50 text-ac-white",
  success:  "bg-ac-blue-50 text-ac-white",
  info:     "bg-ac-primary-10 text-ac-gray-90 border border-ac-primary-20",
  warning:  "bg-ac-orange-10 text-ac-gray-90 border border-ac-orange-30",
};

/* ══════════════════════════════════════════════════════════════
   Snackbar Item 타입
══════════════════════════════════════════════════════════════ */
export interface SnackbarItem {
  id: string;
  message: React.ReactNode;
  variant?: SnackbarVariant;
  /** 좌측 아이콘 또는 아바타 */
  leftItem?: React.ReactNode;
  /** 우측: close(X) / action(텍스트 버튼) / chevron / check */
  rightItem?: "close" | "chevron" | "check" | React.ReactNode;
  onAction?: () => void;
  actionLabel?: string;
  duration?: number;
}

/* ══════════════════════════════════════════════════════════════
   Context (전역 snackbar 큐)
══════════════════════════════════════════════════════════════ */
interface SnackbarContextValue {
  show: (item: Omit<SnackbarItem, "id">) => string;
  dismiss: (id: string) => void;
  dismissAll: () => void;
}

const SnackbarContext = React.createContext<SnackbarContextValue | null>(null);

export function useSnackbar() {
  const ctx = React.useContext(SnackbarContext);
  if (!ctx) throw new Error("Must be used within <SnackbarProvider>");
  return ctx;
}

/* ══════════════════════════════════════════════════════════════
   SnackbarProvider
══════════════════════════════════════════════════════════════ */
export interface SnackbarProviderProps {
  children: React.ReactNode;
  position?: SnackbarPosition;
  maxCount?: number;
  defaultDuration?: number;
}

export function SnackbarProvider({
  children,
  position = "bottom",
  maxCount = 3,
  defaultDuration = 4000,
}: SnackbarProviderProps) {
  const [items, setItems] = React.useState<SnackbarItem[]>([]);
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => { setMounted(true); }, []);

  const show = React.useCallback((item: Omit<SnackbarItem, "id">): string => {
    const id = Math.random().toString(36).slice(2);
    setItems(prev => {
      const next = [...prev, { ...item, id }];
      // maxCount 초과 시 가장 오래된 항목 제거
      return next.length > maxCount ? next.slice(next.length - maxCount) : next;
    });

    const duration = item.duration ?? defaultDuration;
    if (duration > 0) {
      setTimeout(() => dismiss(id), duration);
    }
    return id;
  }, [maxCount, defaultDuration]);

  const dismiss = React.useCallback((id: string) => {
    setItems(prev => prev.filter(i => i.id !== id));
  }, []);

  const dismissAll = React.useCallback(() => setItems([]), []);

  const positionClass = position === "top"
    ? "top-4 left-1/2 -translate-x-1/2"
    : "bottom-4 left-1/2 -translate-x-1/2";

  return (
    <SnackbarContext.Provider value={{ show, dismiss, dismissAll }}>
      {children}
      {mounted && createPortal(
        <div
          aria-live="polite"
          aria-atomic="false"
          className={cn(
            "fixed z-toast flex flex-col gap-2 w-full max-w-[480px] px-4",
            positionClass
          )}
        >
          {items.map(item => (
            <SnackbarItem key={item.id} item={item} onDismiss={dismiss} />
          ))}
        </div>,
        document.body
      )}
    </SnackbarContext.Provider>
  );
}

/* ══════════════════════════════════════════════════════════════
   SnackbarItem (내부 렌더)
══════════════════════════════════════════════════════════════ */
function SnackbarItem({
  item,
  onDismiss,
}: {
  item: SnackbarItem;
  onDismiss: (id: string) => void;
}) {
  const { id, message, variant = "default", leftItem, rightItem, onAction, actionLabel } = item;

  const renderRight = () => {
    if (!rightItem) return null;
    if (rightItem === "close") {
      return (
        <button
          type="button"
          onClick={() => onDismiss(id)}
          aria-label="닫기"
          className="shrink-0 p-0.5 rounded opacity-70 hover:opacity-100 transition-opacity"
        >
          <X className="w-4 h-4" />
        </button>
      );
    }
    if (rightItem === "chevron") {
      return (
        <button
          type="button"
          onClick={onAction}
          aria-label="더보기"
          className="shrink-0 p-0.5 rounded opacity-70 hover:opacity-100 transition-opacity"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      );
    }
    if (rightItem === "check") {
      return <Check className="shrink-0 w-4 h-4 opacity-80" />;
    }
    // action 텍스트 버튼
    if (actionLabel) {
      return (
        <button
          type="button"
          onClick={onAction}
          className="shrink-0 text-xs font-semibold underline underline-offset-2 hover:opacity-80 transition-opacity whitespace-nowrap"
        >
          {actionLabel}
        </button>
      );
    }
    // ReactNode
    return <span className="shrink-0">{rightItem}</span>;
  };

  return (
    <div
      role="status"
      className={cn(
        "flex items-center gap-3 w-full",
        "px-4 py-3 rounded-lg shadow-md",
        "animate-slide-up",
        variantClass[variant]
      )}
    >
      {/* Left item */}
      {leftItem && (
        <span className="shrink-0 flex items-center justify-center w-5 h-5">
          {leftItem}
        </span>
      )}

      {/* Message */}
      <span className="flex-1 text-sm leading-snug min-w-0">{message}</span>

      {/* Right item */}
      {renderRight()}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   Snackbar 컴포넌트 (직접 렌더용 — Provider 없이 사용)
══════════════════════════════════════════════════════════════ */
export interface SnackbarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "color"> {
  message: React.ReactNode;
  variant?: SnackbarVariant;
  leftItem?: React.ReactNode;
  rightItem?: "close" | "chevron" | "check" | React.ReactNode;
  onClose?: () => void;
  onAction?: () => void;
  actionLabel?: string;
}

const Snackbar = React.forwardRef<HTMLDivElement, SnackbarProps>(
  ({ className, message, variant = "default", leftItem, rightItem, onClose, onAction, actionLabel, ...props }, ref) => {

    const renderRight = () => {
      if (!rightItem) return null;
      if (rightItem === "close") return (
        <button type="button" onClick={onClose} aria-label="닫기"
          className="shrink-0 p-0.5 rounded opacity-70 hover:opacity-100 transition-opacity">
          <X className="w-4 h-4" />
        </button>
      );
      if (rightItem === "chevron") return (
        <button type="button" onClick={onAction} aria-label="더보기"
          className="shrink-0 p-0.5 rounded opacity-70 hover:opacity-100 transition-opacity">
          <ChevronRight className="w-4 h-4" />
        </button>
      );
      if (rightItem === "check") return <Check className="shrink-0 w-4 h-4 opacity-80" />;
      if (actionLabel) return (
        <button type="button" onClick={onAction}
          className="shrink-0 text-xs font-semibold underline underline-offset-2 hover:opacity-80 transition-opacity whitespace-nowrap">
          {actionLabel}
        </button>
      );
      return <span className="shrink-0">{rightItem}</span>;
    };

    return (
      <div
        ref={ref}
        role="status"
        className={cn(
          "flex items-center gap-3 w-full",
          "px-4 py-3 rounded-lg shadow-md",
          variantClass[variant],
          className
        )}
        {...props}
      >
        {leftItem && <span className="shrink-0 flex items-center justify-center w-5 h-5">{leftItem}</span>}
        <span className="flex-1 text-sm leading-snug min-w-0">{message}</span>
        {renderRight()}
      </div>
    );
  }
);
Snackbar.displayName = "Snackbar";

export { Snackbar };