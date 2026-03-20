"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "@/utils/cn";

/* ── Types ─────────────────────────────────────────────────── */
export type DialogSize = "sm" | "md" | "lg";

const dialogSizeClass: Record<DialogSize, string> = {
  sm: "w-full max-w-[500px]",
  md: "w-full max-w-[800px]",
  lg: "w-full max-w-[1000px]",
};

/* ══════════════════════════════════════════════════════════════
   Context
══════════════════════════════════════════════════════════════ */
interface DialogContextValue {
  open: boolean;
  openDialog: () => void;
  close: () => void;
  size: DialogSize;
}

const DialogContext = React.createContext<DialogContextValue | null>(null);

function useDialogContext() {
  const ctx = React.useContext(DialogContext);
  if (!ctx) throw new Error("Must be used within <Dialog>");
  return ctx;
}

/* ══════════════════════════════════════════════════════════════
   Dialog (Root)
══════════════════════════════════════════════════════════════ */
export interface DialogProps {
  /** controlled open 상태 */
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** sm(500px) / md(800px) / lg(1000px) */
  size?: DialogSize;
  /** Scrim 클릭 시 닫기 (기본 true) */
  closeOnScrim?: boolean;
  /** ESC 키로 닫기 (기본 true) */
  closeOnEsc?: boolean;
  children?: React.ReactNode;
}

function Dialog({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  size = "sm",
  closeOnScrim = true,
  closeOnEsc = true,
  children,
}: DialogProps) {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
  const controlled = controlledOpen !== undefined;
  const open = controlled ? controlledOpen : internalOpen;

  const openDialog = React.useCallback(() => {
    if (!controlled) setInternalOpen(true);
    onOpenChange?.(true);
  }, [controlled, onOpenChange]);

  const close = React.useCallback(() => {
    if (!controlled) setInternalOpen(false);
    onOpenChange?.(false);
  }, [controlled, onOpenChange]);

  // ESC 키
  React.useEffect(() => {
    if (!open || !closeOnEsc) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, closeOnEsc, close]);

  // body 스크롤 잠금
  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <DialogContext.Provider value={{ open, openDialog, close, size }}>
      {children}
    </DialogContext.Provider>
  );
}
Dialog.displayName = "Dialog";

/* ══════════════════════════════════════════════════════════════
   DialogTrigger
══════════════════════════════════════════════════════════════ */
export interface DialogTriggerProps extends React.HTMLAttributes<HTMLElement> {
  asChild?: boolean;
}

function DialogTrigger({ children, asChild, onClick, ...props }: DialogTriggerProps) {
  const { openDialog } = useDialogContext();

  const handleClick = (e: React.MouseEvent) => {
    (onClick as React.MouseEventHandler)?.(e as any);
    openDialog();
  };

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<any>, {
      onClick: handleClick,
    });
  }

  return (
    <button type="button" onClick={handleClick} {...(props as any)}>
      {children}
    </button>
  );
}
DialogTrigger.displayName = "DialogTrigger";

/* ══════════════════════════════════════════════════════════════
   DialogPortal
══════════════════════════════════════════════════════════════ */
function DialogPortal({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => { setMounted(true); }, []);
  if (!mounted || typeof document === "undefined") return null;
  return createPortal(children, document.body);
}

/* ══════════════════════════════════════════════════════════════
   DialogContent — Scrim + 패널
══════════════════════════════════════════════════════════════ */
export interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> {
  closeOnScrim?: boolean;
}

const DialogContent = React.forwardRef<HTMLDivElement, DialogContentProps>(
  ({ className, children, closeOnScrim = true, ...props }, ref) => {
    const { open, close, size } = useDialogContext();

    if (!open) return null;

    return (
      <DialogPortal>
        {/* Scrim: background black, opacity 0.5 */}
        <div
          aria-hidden="true"
          className="fixed inset-0 z-modal animate-fade-in"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          onClick={closeOnScrim ? close : undefined}
        />
        {/* 다이얼로그 패널 */}
        <div
          className="fixed inset-0 z-modal flex items-center justify-center p-4 pointer-events-none"
        >
          <div
            ref={ref}
            role="dialog"
            aria-modal="true"
            className={cn(
              "relative pointer-events-auto",
              "flex flex-col bg-background rounded-lg",
              "shadow-2xl",
              "max-h-[90vh]",
              "animate-scale-in",
              dialogSizeClass[size],
              className
            )}
            onClick={(e) => e.stopPropagation()}
            {...props}
          >
            {children}
          </div>
        </div>
      </DialogPortal>
    );
  }
);
DialogContent.displayName = "DialogContent";

/* ══════════════════════════════════════════════════════════════
   DialogHeader — 제목 + 부제목 + 닫기 버튼
══════════════════════════════════════════════════════════════ */
export interface DialogHeaderProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  showClose?: boolean;
}

const DialogHeader = React.forwardRef<HTMLDivElement, DialogHeaderProps>(
  ({ className, title, subtitle, showClose = true, children, ...props }, ref) => {
    const { close } = useDialogContext();

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-start justify-between gap-4",
          "px-6 py-4 border-b border-border shrink-0",
          className
        )}
        {...props}
      >
        <div className="flex flex-col gap-0.5 min-w-0 flex-1">
          {title && (
            <h2 className="text-base font-semibold text-foreground leading-snug">{title}</h2>
          )}
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}
          {children}
        </div>

        {showClose && (
          <button
            type="button"
            onClick={close}
            aria-label="닫기"
            className={cn(
              "shrink-0 p-1 rounded-md text-muted-foreground",
              "hover:bg-ac-gray-20 hover:text-foreground",
              "transition-colors duration-normal",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            )}
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    );
  }
);
DialogHeader.displayName = "DialogHeader";

/* ══════════════════════════════════════════════════════════════
   DialogBody — 스크롤 가능한 본문 영역
══════════════════════════════════════════════════════════════ */
const DialogBody = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex-1 overflow-y-auto px-6 py-4", className)}
      {...props}
    />
  )
);
DialogBody.displayName = "DialogBody";

/* ══════════════════════════════════════════════════════════════
   DialogFooter — 버튼 그룹, 우측 정렬
══════════════════════════════════════════════════════════════ */
const DialogFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex items-center justify-end gap-2",
        "px-6 py-4 border-t border-border shrink-0",
        className
      )}
      {...props}
    />
  )
);
DialogFooter.displayName = "DialogFooter";

/* ── DialogTitle / DialogDescription (독립 사용용) ─────────── */
const DialogTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h2 ref={ref} className={cn("text-base font-semibold text-foreground leading-snug", className)} {...props} />
  )
);
DialogTitle.displayName = "DialogTitle";

const DialogDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
  )
);
DialogDescription.displayName = "DialogDescription";

/* ── DialogClose ────────────────────────────────────────────── */
function DialogClose({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { close } = useDialogContext();
  return (
    <button type="button" onClick={close} {...props}>
      {children}
    </button>
  );
}
DialogClose.displayName = "DialogClose";

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
};