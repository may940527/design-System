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
  className?: string;
}

/* ── Placement styles ──────────────────────────────────────── */
const placementStyles: Record<TooltipPlacement, { tooltip: string; arrow: string }> = {
  "top-left":      { tooltip: "bottom-full left-0 mb-2",       arrow: "top-full left-3 border-t-ac-gray-90" },
  "top-center":    { tooltip: "bottom-full left-1/2 -translate-x-1/2 mb-2", arrow: "top-full left-1/2 -translate-x-1/2 border-t-ac-gray-90" },
  "top-right":     { tooltip: "bottom-full right-0 mb-2",      arrow: "top-full right-3 border-t-ac-gray-90" },
  "bottom-left":   { tooltip: "top-full left-0 mt-2",          arrow: "bottom-full left-3 border-b-ac-gray-90" },
  "bottom-center": { tooltip: "top-full left-1/2 -translate-x-1/2 mt-2", arrow: "bottom-full left-1/2 -translate-x-1/2 border-b-ac-gray-90" },
  "bottom-right":  { tooltip: "top-full right-0 mt-2",         arrow: "bottom-full right-3 border-b-ac-gray-90" },
};

/* ── Component ─────────────────────────────────────────────── */
function Tooltip({ content, placement = "top-center", children, className }: TooltipProps) {
  const [visible, setVisible] = React.useState(false);
  const { tooltip, arrow } = placementStyles[placement];
  const isTop = placement.startsWith("top");

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
            "px-3 py-2 rounded-md text-xs text-white bg-ac-gray-90 shadow-md",
            tooltip,
            className
          )}
        >
          {content}
          {/* Arrow */}
          <span
            className={cn(
              "absolute w-0 h-0 border-4 border-transparent",
              isTop ? "border-t-ac-gray-90" : "border-b-ac-gray-90",
              arrow
            )}
          />
        </div>
      )}
    </div>
  );
}

export { Tooltip };