"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";
import { Tooltip } from "@/components/Tooltip";

/* ── FAB Variants ──────────────────────────────────────────── */
const fabVariants = cva(
  [
    "group inline-flex items-center justify-center shrink-0",
    "rounded-full font-medium select-none",
    "transition-[width,padding] duration-200 ease-in-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-40",
  ],
  {
    variants: {
      variant: {
        primary:   "bg-ac-primary-50 text-ac-white hover:bg-ac-primary-60 active:bg-ac-primary-70",
        secondary: "bg-ac-gray-90 text-ac-white hover:bg-ac-gray-80 active:bg-ac-gray-70",
        tertiary:  "bg-ac-gray-20 text-foreground border border-border hover:bg-ac-gray-30 active:bg-ac-gray-40",
      },
      size: {
        lg: "h-[48px] shadow-lg hover:shadow-xl",
        md: "h-[40px] shadow-md hover:shadow-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "lg",
    },
  }
);

/* ── Icon size map ─────────────────────────────────────────── */
const iconSizeMap: Record<string, string> = {
  lg: "h-6 w-6",
  md: "h-5 w-5",
};

function getIconSizeClass(size?: string | null) {
  return iconSizeMap[size ?? "lg"] ?? "h-6 w-6";
}

function cloneIconWithSize(icon: React.ReactNode, sizeClass: string) {
  if (!React.isValidElement(icon)) return icon;
  const el = icon as React.ReactElement<{ className?: string }>;
  return React.cloneElement(el, {
    className: cn(el.props.className, sizeClass),
  });
}

/* ── Props ─────────────────────────────────────────────────── */
export interface FABProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof fabVariants> {
  /** 아이콘 (필수) — children으로 전달 */
  children: React.ReactNode;
  /**
   * 레이블 텍스트
   * - expandOnHover 없이 사용: 항상 라벨 표시 (Extended FAB)
   * - expandOnHover와 함께: 호버 시에만 라벨 표시
   */
  label?: string;
  /**
   * 호버 시 라벨 펼침 방향
   * - "right": 아이콘 우측으로 라벨 펼쳐짐
   * - "left" : 아이콘 좌측으로 라벨 펼쳐짐
   * label prop이 있어야 동작합니다.
   */
  expandOnHover?: "right" | "left";
  /**
   * 아이콘 전용 FAB 호버 시 표시할 툴팁 텍스트
   * 디자인 시스템 Tooltip 컴포넌트를 사용합니다.
   * label이 없을 때만 동작합니다.
   * @example tooltip="추가하기"
   */
  tooltip?: string;
  /**
   * 툴팁 표시 위치
   * @default "top-center"
   */
  tooltipPlacement?: "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right";
  /** 화면 고정 위치 */
  fixed?: boolean;
  /** fixed 사용 시 위치 커스텀 (기본: "bottom-6 right-6") */
  position?: string;
  /**
   * variant 기본 색상을 override할 Tailwind 클래스
   * @example "bg-blue-500 text-white hover:bg-blue-600"
   */
  colorClassName?: string;
}

/* ── Component ─────────────────────────────────────────────── */
const FAB = React.forwardRef<HTMLButtonElement, FABProps>(
  (
    {
      className,
      variant,
      size,
      children,
      label,
      expandOnHover,
      tooltip,
      tooltipPlacement = "top-center",
      fixed = false,
      position = "bottom-6 right-6",
      colorClassName,
      ...props
    },
    ref
  ) => {
    const isExtended    = !!label && !expandOnHover;
    const isExpandable  = !!label && !!expandOnHover;
    const hasTooltip    = !!tooltip && !label;
    const iconSizeClass = getIconSizeClass(size as string);
    const styledIcon    = cloneIconWithSize(children, iconSizeClass);

    const roundedClass = !!label ? "rounded-2xl" : "rounded-full";
    const pxBase   = size === "md" ? "px-4" : "px-6";
    const wBase    = size === "md" ? "w-[40px]" : "w-[48px]";
    const minWBase = size === "md" ? "min-w-[40px]" : "min-w-[48px]";

    const labelSpan = isExpandable ? (
      <span
        className={cn(
          "whitespace-nowrap",
          "max-w-0 opacity-0",
          "transition-[max-width,opacity,margin] duration-200 ease-in-out",
          "group-hover:max-w-[200px] group-hover:opacity-100",
          expandOnHover === "left" ? "group-hover:mx-2" : "group-hover:mx-2"
        )}
      >
        {label}
      </span>
    ) : null;

    const button = (
      <button
        ref={ref}
        className={cn(
          fabVariants({ variant, size }),
          roundedClass,
          !isExtended && !isExpandable && wBase,
          isExtended && cn(pxBase, "gap-2"),
          isExpandable && cn(
            minWBase,
            "px-3",
            "transition-[padding] duration-200",
            "hover:px-4",
            expandOnHover === "left" ? "flex-row-reverse" : "flex-row"
          ),
          colorClassName,
          fixed && `fixed z-modal ${position}`,
          className
        )}
        {...props}
      >
        {labelSpan}
        <span className="shrink-0 flex items-center" aria-hidden="true">
          {styledIcon}
        </span>
        {isExtended && (
          <span className="whitespace-nowrap">{label}</span>
        )}
      </button>
    );

    // 툴팁은 디자인 시스템 Tooltip 컴포넌트로 감싸서 렌더링
    if (hasTooltip) {
      return (
        <Tooltip content={tooltip} placement={tooltipPlacement}>
          {button}
        </Tooltip>
      );
    }

    return button;
  }
);

FAB.displayName = "FAB";

export { FAB, fabVariants };