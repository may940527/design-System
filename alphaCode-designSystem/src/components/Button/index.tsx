import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

/* ── Variants ──────────────────────────────────────────────── */
const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "font-medium transition-colors duration-normal select-none",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-40",
  ],
  {
    variants: {
      variant: {
        primary:
          "bg-ac-primary-50 text-ac-white rounded-md hover:bg-ac-primary-60 active:bg-ac-primary-70",
        secondary:
          "bg-ac-gray-90 text-ac-white rounded-md hover:bg-ac-gray-80 active:bg-ac-gray-70",
        tertiary:
          "bg-ac-gray-20 text-foreground rounded-md hover:bg-ac-gray-30 active:bg-ac-gray-40",
        link:
          "bg-transparent text-foreground rounded-md hover:text-ac-primary-50 underline-offset-4 hover:underline",
        icon:
          "bg-transparent text-foreground rounded-md border border-border hover:bg-ac-gray-20 active:bg-ac-gray-30",
      },
      size: {
        xl:        "h-[54px] px-6 text-base",
        lg:        "h-[48px] px-5 text-base",
        md:        "h-[40px] px-4 text-sm",
        sm:        "h-[36px] px-3 text-sm",
        xs:        "h-[30px] px-3 text-xs",
        "icon-xl": "h-[54px] w-[54px] p-0 rounded-md",
        "icon-lg": "h-[48px] w-[48px] p-0 rounded-md",
        "icon-md": "h-[40px] w-[40px] p-0 rounded-md",
        "icon-sm": "h-[36px] w-[36px] p-0 rounded-md",
        "icon-xs": "h-[30px] w-[30px] p-0 rounded-sm",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

/* ── Icon size map ─────────────────────────────────────────── */
// size → 아이콘 className (20px / 20px / 16px / 16px / 12px)
const iconSizeMap: Record<string, string> = {
  xl:        "h-5 w-5",
  lg:        "h-5 w-5",
  md:        "h-4 w-4",
  sm:        "h-4 w-4",
  xs:        "h-3 w-3",
  "icon-xl": "h-5 w-5",
  "icon-lg": "h-5 w-5",
  "icon-md": "h-4 w-4",
  "icon-sm": "h-4 w-4",
  "icon-xs": "h-3 w-3",
};

function getIconSizeClass(size?: string | null) {
  return iconSizeMap[size ?? "md"] ?? "h-4 w-4";
}

/* ── Spinner ───────────────────────────────────────────────── */
const Spinner = ({ className }: { className?: string }) => (
  <svg
    className={cn("animate-spin shrink-0", className)}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <circle
      className="opacity-25"
      cx="12" cy="12" r="10"
      stroke="currentColor" strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
    />
  </svg>
);

/* ── Props ─────────────────────────────────────────────────── */
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  /**
   * variant별 색상을 override할 Tailwind 클래스
   * @example "bg-blue-500 text-white hover:bg-blue-600"
   */
  colorClassName?: string;
  /** true면 부모 너비에 맞게 100% 확장 */
  fullWidth?: boolean;
}

/* ── Helpers ───────────────────────────────────────────────── */
/** 아이콘 요소에 size className을 주입 */
function cloneIconWithSize(icon: React.ReactNode, sizeClass: string) {
  if (!React.isValidElement(icon)) return icon;
  const el = icon as React.ReactElement<{ className?: string }>;
  return React.cloneElement(el, {
    className: cn(el.props.className, sizeClass),
  });
}

/* ── Component ─────────────────────────────────────────────── */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      colorClassName,
      fullWidth = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    const isIconVariant = variant === "icon";
    const iconSizeClass = getIconSizeClass(size as string);

    const styledLeftIcon  = leftIcon  ? cloneIconWithSize(leftIcon,  iconSizeClass) : null;
    const styledRightIcon = rightIcon ? cloneIconWithSize(rightIcon, iconSizeClass) : null;
    // icon variant는 children 자체가 아이콘이므로 size 주입
    const styledChildren  = isIconVariant ? cloneIconWithSize(children, iconSizeClass) : children;

    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), colorClassName, fullWidth && "w-full", className)}
        disabled={disabled || loading}
        aria-busy={loading}
        {...props}
      >
        {loading ? (
          // 아이콘 variant는 스피너만, 나머지는 스피너 + children
          isIconVariant ? (
            <Spinner className={iconSizeClass} />
          ) : (
            <>
              <Spinner className={iconSizeClass} />
              {children}
            </>
          )
        ) : asChild ? (
          React.isValidElement(children)
            ? React.cloneElement(children as React.ReactElement<{ children?: React.ReactNode }>, {
                children: (
                  <>
                    {styledLeftIcon && (
                      <span className="shrink-0 flex items-center" aria-hidden="true">
                        {styledLeftIcon}
                      </span>
                    )}
                    {(children as React.ReactElement<{ children?: React.ReactNode }>).props.children}
                    {styledRightIcon && (
                      <span className="shrink-0 flex items-center" aria-hidden="true">
                        {styledRightIcon}
                      </span>
                    )}
                  </>
                ),
              })
            : children
        ) : (
          <>
            {styledLeftIcon && (
              <span className="shrink-0 flex items-center" aria-hidden="true">
                {styledLeftIcon}
              </span>
            )}
            {styledChildren}
            {styledRightIcon && (
              <span className="shrink-0 flex items-center" aria-hidden="true">
                {styledRightIcon}
              </span>
            )}
          </>
        )}
      </Comp>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };