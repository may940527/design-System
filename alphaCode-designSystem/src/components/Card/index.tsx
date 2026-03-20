import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

/* ══════════════════════════════════════════════════════════════
   Card (Root)
   style: background-color / line / shadow
   state: default / hover / active
══════════════════════════════════════════════════════════════ */
const cardVariants = cva(
  [
    "relative flex flex-col rounded-lg bg-card text-card-foreground overflow-hidden",
    "transition-all duration-normal",
  ],
  {
    variants: {
      variant: {
        /** 배경색만, 테두리·그림자 없음 */
        background: "bg-card",
        /** 테두리 */
        line:       "border border-border",
        /** 그림자 */
        shadow:     "",
      },
      interactive: {
        true:  [
          "cursor-pointer",
          "active:border active:border-ac-primary-50",
        ],
        false: "",
      },
    },
    defaultVariants: {
      variant: "line",
      interactive: false,
    },
  }
);

const shadowSizeMap = {
  xs:    "shadow-xs",
  sm:    "shadow-sm",
  md:    "shadow-md",
  lg:    "shadow-lg",
  xl:    "shadow-xl",
  "2xl": "shadow-2xl",
} as const;

export type CardShadowSize = keyof typeof shadowSizeMap;

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  shadowSize?: CardShadowSize;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, interactive, shadowSize = "md", ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        cardVariants({ variant, interactive }),
        variant === "shadow" && shadowSizeMap[shadowSize],
        className
      )}
      {...props}
    />
  )
);
Card.displayName = "Card";

/* ══════════════════════════════════════════════════════════════
   CardMenu — 우측 상단 더보기(⋮) 버튼
══════════════════════════════════════════════════════════════ */
export interface CardMenuProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const CardMenu = React.forwardRef<HTMLButtonElement, CardMenuProps>(
  ({ className, children, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      className={cn(
        "absolute top-3 right-3 p-1 rounded-md text-muted-foreground",
        "hover:bg-ac-gray-20 hover:text-foreground transition-colors duration-normal",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className
      )}
      {...props}
    >
      {children ?? (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
          <circle cx="8" cy="3" r="1.2" />
          <circle cx="8" cy="8" r="1.2" />
          <circle cx="8" cy="13" r="1.2" />
        </svg>
      )}
    </button>
  )
);
CardMenu.displayName = "CardMenu";

/* ══════════════════════════════════════════════════════════════
   CardHeader
   headerType: image / avatar / text
══════════════════════════════════════════════════════════════ */
export interface CardHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  /** 이미지 URL — image 타입 */
  imageSrc?: string;
  imageAlt?: string;
  /** 아바타 요소 — avatar 타입 */
  avatar?: React.ReactNode;
  /** 제목 */
  title?: React.ReactNode;
  /** 부제목 / 설명 */
  subtitle?: React.ReactNode;
  /** 우측 뱃지/상태 요소 */
  badge?: React.ReactNode;
}

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, imageSrc, imageAlt, avatar, title, subtitle, badge, children, ...props }, ref) => {
    /* image 타입 */
    if (imageSrc) {
      return (
        <div ref={ref} className={cn("relative", className)} {...props}>
          <img
            src={imageSrc}
            alt={imageAlt ?? ""}
            className="w-full aspect-video object-cover"
          />
          {badge && <div className="absolute top-3 right-3">{badge}</div>}
          {children}
        </div>
      );
    }

    /* avatar / text 타입 */
    return (
      <div ref={ref} className={cn("flex items-start gap-3 px-4 pt-4 pb-0", className)} {...props}>
        {avatar && <div className="shrink-0">{avatar}</div>}
        <div className="flex-1 min-w-0">
          {title && (
            <p className="text-sm font-semibold text-foreground leading-snug line-clamp-1">{title}</p>
          )}
          {subtitle && (
            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{subtitle}</p>
          )}
        </div>
        {badge && <div className="shrink-0">{badge}</div>}
        {children}
      </div>
    );
  }
);
CardHeader.displayName = "CardHeader";

/* ══════════════════════════════════════════════════════════════
   CardTitle
══════════════════════════════════════════════════════════════ */
const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-base font-semibold text-foreground leading-snug", className)}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

/* ══════════════════════════════════════════════════════════════
   CardContent
══════════════════════════════════════════════════════════════ */
const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("px-4 py-3 flex-1 flex flex-col gap-2", className)}
    {...props}
  />
));
CardContent.displayName = "CardContent";

/* ══════════════════════════════════════════════════════════════
   CardDescription
══════════════════════════════════════════════════════════════ */
const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground leading-normal", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

/* ══════════════════════════════════════════════════════════════
   CardFooter
   footerType: user / button / info
══════════════════════════════════════════════════════════════ */
export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 구분선 표시 여부 */
  divider?: boolean;
}

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, divider = true, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "px-4 pb-4 flex items-center gap-2",
        divider && "pt-3 border-t border-border mt-0",
        !divider && "pt-0",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);
CardFooter.displayName = "CardFooter";

/* ── CardFooterUser ───────────────────────────────────────── */
export interface CardFooterUserProps extends React.HTMLAttributes<HTMLDivElement> {
  avatar?: React.ReactNode;
  name?: string;
  sub?: string;
  action?: React.ReactNode;
}

const CardFooterUser = React.forwardRef<HTMLDivElement, CardFooterUserProps>(
  ({ className, avatar, name, sub, action, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center gap-2 w-full", className)} {...props}>
      {avatar && <div className="shrink-0">{avatar}</div>}
      <div className="flex-1 min-w-0">
        {name && <p className="text-xs font-medium text-foreground line-clamp-1">{name}</p>}
        {sub  && <p className="text-xs text-muted-foreground line-clamp-1">{sub}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
);
CardFooterUser.displayName = "CardFooterUser";

/* ── CardFooterInfo ───────────────────────────────────────── */
export interface CardFooterInfoProps extends React.HTMLAttributes<HTMLDivElement> {
  items?: Array<{ icon?: React.ReactNode; label: string }>;
  action?: React.ReactNode;
}

const CardFooterInfo = React.forwardRef<HTMLDivElement, CardFooterInfoProps>(
  ({ className, items = [], action, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center gap-3 w-full text-xs text-muted-foreground", className)} {...props}>
      <div className="flex items-center gap-3 flex-1 flex-wrap">
        {items.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-1">
            {item.icon && <span className="shrink-0">{item.icon}</span>}
            {item.label}
          </span>
        ))}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
);
CardFooterInfo.displayName = "CardFooterInfo";

export {
  Card,
  CardMenu,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardFooterUser,
  CardFooterInfo,
};