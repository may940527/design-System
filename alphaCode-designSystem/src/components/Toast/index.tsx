"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { X, Bell, Upload } from "lucide-react";
import { cn } from "@/utils/cn";

/* ══════════════════════════════════════════════════════════════
   Types
══════════════════════════════════════════════════════════════ */
export type ToastStyle    = "default" | "full" | "uploading" | "message";
export type ToastPosition = "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right";

export interface ToastItem {
  id: string;
  style?: ToastStyle;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  /** uploading: 진행률 0-100 */
  progress?: number;
  /** uploading: 진행률 텍스트 */
  progressLabel?: string;
  /** uploading: 소요 시간 텍스트 */
  timeLabel?: string;
  /** message: 아바타 이미지 URL */
  avatarSrc?: string;
  /** message: 아바타 대체 텍스트 (이니셜 등) */
  avatarFallback?: string;
  /** message: 시간 텍스트 */
  timestamp?: string;
  /** ms. 0 = 자동 닫힘 없음. 기본 4000 */
  duration?: number;
}

export interface ToastProps extends Omit<ToastItem, "id"> {
  onClose?: () => void;
  className?: string;
}

export interface ToastProviderProps {
  children: React.ReactNode;
  position?: ToastPosition;
  maxCount?: number;
  defaultDuration?: number;
}

/* ══════════════════════════════════════════════════════════════
   Context
══════════════════════════════════════════════════════════════ */
interface ToastContextValue {
  show: (item: Omit<ToastItem, "id">) => string;
  dismiss: (id: string) => void;
  dismissAll: () => void;
}

const ToastContext = React.createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = React.useContext(ToastContext);
  if (!ctx) throw new Error("Must be used within <ToastProvider>");
  return ctx;
}

/* ══════════════════════════════════════════════════════════════
   Position 클래스
══════════════════════════════════════════════════════════════ */
const positionClass: Record<ToastPosition, string> = {
  "top-left":      "top-4 left-4 items-start",
  "top-center":    "top-4 left-1/2 -translate-x-1/2 items-center",
  "top-right":     "top-4 right-4 items-end",
  "bottom-left":   "bottom-4 left-4 items-start",
  "bottom-center": "bottom-4 left-1/2 -translate-x-1/2 items-center",
  "bottom-right":  "bottom-4 right-4 items-end",
};

/* ══════════════════════════════════════════════════════════════
   ToastProvider
══════════════════════════════════════════════════════════════ */
export function ToastProvider({
  children,
  position = "bottom-right",
  maxCount = 5,
  defaultDuration = 4000,
}: ToastProviderProps) {
  const [items, setItems] = React.useState<ToastItem[]>([]);
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => { setMounted(true); }, []);

  const dismiss = React.useCallback((id: string) => {
    setItems(prev => prev.filter(i => i.id !== id));
  }, []);

  const show = React.useCallback((item: Omit<ToastItem, "id">): string => {
    const id = Math.random().toString(36).slice(2);
    setItems(prev => {
      const next = [...prev, { ...item, id }];
      return next.length > maxCount ? next.slice(next.length - maxCount) : next;
    });
    const duration = item.duration ?? defaultDuration;
    if (duration > 0) setTimeout(() => dismiss(id), duration);
    return id;
  }, [maxCount, defaultDuration, dismiss]);

  const dismissAll = React.useCallback(() => setItems([]), []);

  return (
    <ToastContext.Provider value={{ show, dismiss, dismissAll }}>
      {children}
      {mounted && createPortal(
        <div
          aria-live="polite"
          aria-atomic="false"
          className={cn("fixed z-[9999] flex flex-col gap-2 pointer-events-none", positionClass[position])}
        >
          {items.map(item => (
            <div key={item.id} className="pointer-events-auto">
              <ToastItem item={item} onDismiss={dismiss} />
            </div>
          ))}
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  );
}

/* ══════════════════════════════════════════════════════════════
   ToastItem (내부 렌더)
══════════════════════════════════════════════════════════════ */
function ToastItem({ item, onDismiss }: { item: ToastItem; onDismiss: (id: string) => void }) {
  return (
    <Toast
      {...item}
      onClose={() => onDismiss(item.id)}
    />
  );
}

/* ══════════════════════════════════════════════════════════════
   Toast (단독 사용 가능한 presentational 컴포넌트)
══════════════════════════════════════════════════════════════ */
const Toast = React.forwardRef<HTMLDivElement, ToastProps>(({
  style = "default",
  title,
  description,
  actionLabel,
  onAction,
  progress = 0,
  progressLabel,
  timeLabel,
  avatarSrc,
  avatarFallback,
  timestamp,
  onClose,
  className,
}, ref) => {
  return (
    <div
      ref={ref}
      role="status"
      className={cn(
        "relative flex items-start gap-3 bg-white rounded-lg p-4 w-[410px]",
        "[box-shadow:0px_12px_16px_-4px_rgba(10,13,18,0.08),0px_4px_6px_-2px_rgba(10,13,18,0.03)]",
        className
      )}
    >
      {/* 콘텐츠 영역 */}
      <div className="flex-1 flex flex-col gap-1 min-w-0">

        {/* 타이틀 행 */}
        <div className="flex items-center gap-2">
          {style === "full" && (
            <Bell className="w-4 h-4 shrink-0 text-foreground" />
          )}
          {style === "uploading" && (
            <Upload className="w-4 h-4 shrink-0 text-foreground" />
          )}
          {style === "message" && (
            <div className="w-4 h-4 shrink-0 rounded-full bg-ac-gray-30 overflow-hidden flex items-center justify-center">
              {avatarSrc
                ? <img src={avatarSrc} alt={avatarFallback ?? ""} className="w-full h-full object-cover" />
                : <span className="text-[8px] font-medium text-ac-gray-60">{avatarFallback?.[0] ?? "?"}</span>
              }
            </div>
          )}
          <span className="text-base font-medium text-foreground leading-snug flex-1 min-w-0">{title}</span>
          {style === "uploading" && timeLabel && (
            <span className="text-xs text-muted-foreground shrink-0">{timeLabel}</span>
          )}
        </div>

        {/* 설명 / 메시지 */}
        {description && (
          <p className={cn("text-xs text-muted-foreground leading-relaxed", (style === "full" || style === "uploading" || style === "message") && "pl-6")}>
            {description}
          </p>
        )}

        {/* uploading: 진행률 + 프로그레스 바 */}
        {style === "uploading" && (
          <div className="pl-6 flex flex-col gap-1">
            {progressLabel && (
              <span className="text-xs text-muted-foreground">{progressLabel}</span>
            )}
            <div className="w-full h-1 rounded-full bg-ac-gray-20 overflow-hidden">
              <div
                className="h-full rounded-full bg-ac-primary-50 transition-all"
                style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
              />
            </div>
          </div>
        )}

        {/* message: 타임스탬프 */}
        {style === "message" && timestamp && (
          <span className="pl-6 text-[10px] text-muted-foreground">{timestamp}</span>
        )}

        {/* 액션 버튼 */}
        {actionLabel && (
          <button
            type="button"
            onClick={onAction}
            className="self-start mt-1 px-3 py-1 rounded-md bg-ac-gray-10 text-xs font-bold text-ac-gray-70 hover:bg-ac-gray-20 transition-colors"
          >
            {actionLabel}
          </button>
        )}
      </div>

      {/* 닫기 버튼 */}
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="닫기"
          className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center hover:bg-ac-gray-20 transition-colors"
        >
          <X className="w-3 h-3 text-ac-gray-40" />
        </button>
      )}
    </div>
  );
});

Toast.displayName = "Toast";

export { Toast };
