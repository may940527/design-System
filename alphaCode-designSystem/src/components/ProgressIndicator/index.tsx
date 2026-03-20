import * as React from "react";
import { cn } from "@/utils/cn";

/* ── Types ─────────────────────────────────────────────────── */
export type ProgressType        = "linear" | "circular";
export type ProgressLinearSize  = "sm" | "md" | "lg" | "xl";
export type ProgressCircularSize = "xs" | "sm" | "md" | "lg" | "xl";

/* ── Size maps ─────────────────────────────────────────────── */
const linearHeightMap: Record<ProgressLinearSize, string> = {
  sm: "h-[4px]",
  md: "h-[10px]",
  lg: "h-[20px]",
  xl: "h-[30px]",
};

const circularSizeMap: Record<ProgressCircularSize, number> = {
  xs: 16,
  sm: 30,
  md: 60,
  lg: 80,
  xl: 100,
};

/* ══════════════════════════════════════════════════════════════
   ProgressIndicator
══════════════════════════════════════════════════════════════ */
export interface ProgressIndicatorProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "color"> {
  /** 선형 / 원형 */
  type?: ProgressType;
  /** 0 ~ 100 */
  value?: number;
  /** 최대값 (기본 100) */
  max?: number;
  /** 선형 사이즈 */
  linearSize?: ProgressLinearSize;
  /** 원형 사이즈 */
  circularSize?: ProgressCircularSize;
  /** 진행 색상 (기본 ac-primary-50) */
  color?: string;
  /** 트랙 색상 (기본 ac-gray-30) */
  trackColor?: string;
  /** 라벨 텍스트 */
  label?: string;
  /** 퍼센트 표시 여부 */
  showValue?: boolean;
  /** indeterminate (로딩 상태) */
  indeterminate?: boolean;
}

const ProgressIndicator = React.forwardRef<HTMLDivElement, ProgressIndicatorProps>(
  (
    {
      className,
      type = "linear",
      value = 0,
      max = 100,
      linearSize = "md",
      circularSize = "md",
      color = "#FF6300",     /* ac-primary-50 */
      trackColor = "#ECECEC", /* ac-gray-30 */
      label,
      showValue = false,
      indeterminate = false,
      ...props
    },
    ref
  ) => {
    const pct = indeterminate ? 0 : Math.min(100, Math.max(0, (value / max) * 100));

    /* ── 선형 ───────────────────────────────────────────────── */
    if (type === "linear") {
      return (
        <div ref={ref} className={cn("flex flex-col gap-1.5 w-full", className)} {...props}>
          {/* 라벨 + 값 */}
          {(label || showValue) && (
            <div className="flex items-center justify-between gap-2">
              {label && <span className="text-sm text-foreground">{label}</span>}
              {showValue && !indeterminate && (
                <span className="text-sm font-medium text-foreground tabular-nums ml-auto">{Math.round(pct)}%</span>
              )}
            </div>
          )}
          {/* 트랙 */}
          <div
            role="progressbar"
            aria-valuenow={indeterminate ? undefined : value}
            aria-valuemin={0}
            aria-valuemax={max}
            aria-label={label}
            className={cn(
              "w-full rounded-full overflow-hidden",
              linearHeightMap[linearSize]
            )}
            style={{ backgroundColor: trackColor }}
          >
            {/* 진행 바 */}
            <div
              className={cn(
                "h-full rounded-full transition-all duration-slow",
                indeterminate && "animate-[indeterminate_1.5s_ease-in-out_infinite]"
              )}
              style={{
                width: indeterminate ? "40%" : `${pct}%`,
                backgroundColor: color,
              }}
            />
          </div>
        </div>
      );
    }

    /* ── 원형 ───────────────────────────────────────────────── */
    const size        = circularSizeMap[circularSize];
    const strokeWidth = Math.max(2, size * 0.1);
    const radius      = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const dashOffset  = indeterminate ? circumference * 0.75 : circumference * (1 - pct / 100);

    return (
      <div ref={ref} className={cn("inline-flex flex-col items-center gap-2", className)} {...props}>
        <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
          <svg
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            role="progressbar"
            aria-valuenow={indeterminate ? undefined : value}
            aria-valuemin={0}
            aria-valuemax={max}
            aria-label={label}
            className={indeterminate ? "animate-spin" : undefined}
            style={indeterminate ? { animationDuration: "1s" } : undefined}
          >
            {/* 트랙 */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={trackColor}
              strokeWidth={strokeWidth}
            />
            {/* 진행 */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              transform={`rotate(-90 ${size / 2} ${size / 2})`}
              className={indeterminate ? undefined : "transition-all duration-slow"}
            />
          </svg>

          {/* 중앙 값 표시 */}
          {showValue && !indeterminate && (
            <span
              className="absolute text-foreground font-semibold tabular-nums"
              style={{ fontSize: Math.max(10, size * 0.2) }}
            >
              {Math.round(pct)}%
            </span>
          )}
        </div>

        {/* 라벨 */}
        {label && <span className="text-sm text-foreground text-center">{label}</span>}
      </div>
    );
  }
);
ProgressIndicator.displayName = "ProgressIndicator";

export { ProgressIndicator };