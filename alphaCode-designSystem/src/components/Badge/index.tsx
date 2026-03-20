"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

/* ── Variants ──────────────────────────────────────────────── */
const badgeVariants = cva(
  "inline-flex items-center gap-1 font-medium whitespace-nowrap select-none rounded-xl border",
  {
    variants: {
      variant: {
        // ── 상태 정보 배지 ──────────────────────────────────
        complete: "bg-ac-green-10 text-ac-green-60 border-ac-green-40",
        success:  "bg-ac-blue-10 text-ac-blue-60 border-ac-blue-40",
        warning:  "bg-ac-orange-10 text-ac-orange-60 border-ac-orange-40",
        fail:     "bg-ac-red-10 text-ac-red-60 border-ac-red-40",
        // ── 기타 메타 배지 ──────────────────────────────────
        primary:  "bg-ac-white text-ac-primary-50 border-ac-primary-40",
        default:  "bg-ac-gray-30 text-ac-gray-80 border-ac-gray-70",
      },
      size: {
        xs: "h-[16px] px-1 text-[10px]", 
        sm: "h-[20px] px-1.5 text-xs",
        md: "h-[26px] px-2 text-xs",
        lg: "h-[32px] px-3 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

/* ── Props ─────────────────────────────────────────────────── */
export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  /** 좌측 아이콘 (선택) */
  icon?: React.ReactNode;
}

/* ── Component ─────────────────────────────────────────────── */
function Badge({ className, variant, size, icon, children, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant, size }), className)} {...props}>
      {icon && (
        <span className="shrink-0 flex items-center" aria-hidden="true">
          {icon}
        </span>
      )}
      {children}
    </span>
  );
}

export { Badge, badgeVariants };