import * as React from "react";
import { cn } from "@/utils/cn";

/* ── Types ─────────────────────────────────────────────────── */
type TooltipPlacement =
  | "top-left" | "top-center" | "top-right"
  | "bottom-left" | "bottom-center" | "bottom-right";

export interface TooltipProps {
  /** 툴팁 본문 */
  content: React.ReactNode;
  /** 툴팁 위치 */
  placement?: TooltipPlacement;
  /** 트리거 요소 */
  children: React.ReactNode;
  /** 툴팁 박스 Tailwind 클래스 override */
  className?: string;
  /** 화살표 Tailwind border 클래스 override (예: "border-t-ac-blue-90") */
  arrowClassName?: string;
}

/* ── Placement styles ──────────────────────────────────────── */
// arrow: 회전된 사각형 방식 — top 계열은 border-b border-r, bottom 계열은 border-t border-l
const placementStyles: Record<TooltipPlacement, { tooltip: string; arrow: string }> = {
  "top-left":      { tooltip: "bottom-full left-0 mb-3",                    arrow: "top-full left-4 -translate-y-1/2 rotate-45 border-b border-r" },
  "top-center":    { tooltip: "bottom-full left-1/2 -translate-x-1/2 mb-3", arrow: "top-full left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45 border-b border-r" },
  "top-right":     { tooltip: "bottom-full right-0 mb-3",                   arrow: "top-full right-4 -translate-y-1/2 rotate-45 border-b border-r" },
  "bottom-left":   { tooltip: "top-full left-0 mt-3",                       arrow: "bottom-full left-4 translate-y-1/2 rotate-45 border-t border-l" },
  "bottom-center": { tooltip: "top-full left-1/2 -translate-x-1/2 mt-3",    arrow: "bottom-full left-1/2 -translate-x-1/2 translate-y-1/2 rotate-45 border-t border-l" },
  "bottom-right":  { tooltip: "top-full right-0 mt-3",                      arrow: "bottom-full right-4 translate-y-1/2 rotate-45 border-t border-l" },
};

/* ── Component ─────────────────────────────────────────────── */
function Tooltip({ content, placement = "top-center", children, className, arrowClassName }: TooltipProps) {
  const [visible, setVisible] = React.useState(false);
  const { tooltip, arrow } = placementStyles[placement];

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div
          role="tooltip"
          className={cn(
            "absolute z-tooltip w-max max-w-xs",
            "px-3 py-2 rounded-md text-xs text-foreground bg-white border border-border shadow-sm",
            tooltip,
            className
          )}
        >
          {content}
          {/* Arrow — 회전된 사각형으로 border 표현 */}
          <span
            className={cn(
              "absolute w-2.5 h-2.5 bg-white border-border",
              arrow,
              arrowClassName
            )}
          />
        </div>
      )}
    </div>
  );
}

export { Tooltip };