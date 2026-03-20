import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

/* ── Variants ──────────────────────────────────────────────── */
const buttonGroupVariants = cva(
  "flex",
  {
    variants: {
      direction: {
        // 수평 — 강조 버튼은 우측
        horizontal: "flex-row items-center",
        // 수직 — 강조 버튼은 첫 번째, 모든 버튼 width 동일
        vertical: "flex-col w-full [&>*]:w-full",
      },
      gap: {
        sm: "",   // 버튼 2개: gap-2 (8px) — children 수에 따라 자동
        md: "",   // 버튼 3개 이상: gap-3 (12px)
      },
    },
    defaultVariants: {
      direction: "horizontal",
    },
  }
);

/* ── Props ─────────────────────────────────────────────────── */
export interface ButtonGroupProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof buttonGroupVariants> {
  direction?: "horizontal" | "vertical";
}

/* ── Component ─────────────────────────────────────────────── */
function ButtonGroup({
  className,
  direction = "horizontal",
  children,
  ...props
}: ButtonGroupProps) {
  const count = React.Children.count(children);

  // 버튼 2개: gap-2(8px), 3개 이상: gap-3(12px)
  const gapClass = count <= 2 ? "gap-2" : "gap-3";

  return (
    <div
      className={cn(
        buttonGroupVariants({ direction }),
        gapClass,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export { ButtonGroup };