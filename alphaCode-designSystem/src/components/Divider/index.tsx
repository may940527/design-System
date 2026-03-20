import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const dividerVariants = cva("shrink-0 bg-border", {
  variants: {
    orientation: {
      horizontal: "w-full h-px",
      vertical:   "h-full w-px",
    },
    variant: {
      solid:  "",
      dashed: "bg-transparent border-border",
    },
    inset: {
      true:  "",
      false: "",
    },
  },
  compoundVariants: [
    { orientation: "horizontal", inset: true,  class: "mx-4 w-[calc(100%-2rem)]" },
    { orientation: "vertical",   inset: true,  class: "my-4 h-[calc(100%-2rem)]" },
    { variant: "dashed", orientation: "horizontal", class: "border-t border-dashed h-0" },
    { variant: "dashed", orientation: "vertical",   class: "border-l border-dashed w-0" },
  ],
  defaultVariants: {
    orientation: "horizontal",
    variant: "solid",
    inset: false,
  },
});

export interface DividerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dividerVariants> {}

function Divider({ className, orientation, variant, inset, ...props }: DividerProps) {
  return (
    <div
      role="separator"
      aria-orientation={orientation ?? "horizontal"}
      className={cn(dividerVariants({ orientation, variant, inset }), className)}
      {...props}
    />
  );
}

export { Divider };