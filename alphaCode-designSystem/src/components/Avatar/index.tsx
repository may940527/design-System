"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";
import { User } from "lucide-react";

/* ── Variants ──────────────────────────────────────────────── */
const avatarVariants = cva(
  "inline-flex items-center justify-center shrink-0 overflow-hidden bg-ac-gray-20 text-foreground font-bold select-none",
  {
    variants: {
      shape: {
        circle: "rounded-full",
        square: "rounded-md",
      },
      size: {
        xs: "h-4 w-4 text-[8px]",     // 16px
        sm: "h-5 w-5 text-[9px]",     // 20px
        md: "h-6 w-6 text-xs",        // 24px
        lg: "h-8 w-8 text-sm",        // 32px
        xl: "h-12 w-12 text-lg",      // 48px
        "2xl": "h-16 w-16 text-2xl",  // 64px
      },
    },
    defaultVariants: {
      shape: "circle",
      size: "md",
    },
  }
);

/* ── 이니셜 추출 유틸 (가이드 완벽 반영) ────────────────────────── */
function getInitials(name: string, maxChars: number): string {
  const englishAndNumbersOnly = name.replace(/[^a-zA-Z0-9\s]/g, "").trim();

  if (!englishAndNumbersOnly) return "";

  const words = englishAndNumbersOnly.split(/\s+/);

  if (maxChars === 1) {
    return words[0].charAt(0).toUpperCase();
  }

  if (words.length === 1) {
    return englishAndNumbersOnly.substring(0, 2).toUpperCase();
  }

  return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase();
}

/* ── Props ─────────────────────────────────────────────────── */
export interface AvatarProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children">,
    VariantProps<typeof avatarVariants> {
  /** 이미지 URL */
  src?: string;
  /** 이미지 alt (접근성: 스크린 리더용) */
  alt?: string;
  /** 이름 — Text 타입 이니셜 생성 및 접근성에 사용 */
  name?: string;
  /** 아이콘 — Icon 타입에 사용 */
  icon?: React.ReactNode;
  /** 이미지 로드 실패 시 fallback (기본: 이니셜 또는 아이콘) */
  fallback?: React.ReactNode;
}

/* ── Component ─────────────────────────────────────────────── */
const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      className,
      shape,
      size = "md",
      src,
      alt,
      name,
      icon,
      fallback,
      ...props
    },
    ref
  ) => {
    const [imgError, setImgError] = React.useState(false);

    React.useEffect(() => {
      setImgError(false);
    }, [src]);

    const maxChars = ["xs", "sm", "md"].includes(size || "md") ? 1 : 2;
    const initials = name ? getInitials(name, maxChars) : "";

    const renderContent = () => {
      if (src && !imgError) {
        return (
          <img
            src={src}
            alt={alt ?? name ?? ""}
            className="h-full w-full object-cover"
            onError={() => setImgError(true)}
          />
        );
      }
      if (fallback) return fallback;
      if (icon) return icon;
      if (initials) return <span aria-label={name}>{initials}</span>;

      return (
        <User
          className="w-1/2 h-1/2 text-ac-gray-50"
          aria-hidden="true"
        />
      );
    };

    return (
      <div
        ref={ref}
        className={cn(avatarVariants({ shape, size }), className)}
        {...props}
      >
        {renderContent()}
      </div>
    );
  }
);

Avatar.displayName = "Avatar";

export { Avatar, avatarVariants };