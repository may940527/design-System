import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";
import { Button } from "@/components/Button";
import { ButtonGroup } from "@/components/Button/ButtonGroup";
import { Divider } from "@/components/Divider";
import { Checkbox } from "@/components/Input/Checkbox";
import { Radio } from "@/components/Input/Radio";
import { Switch } from "@/components/Input/Switch";
import { Avatar, type AvatarProps } from "@/components/Avatar";

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
          "hover:shadow-lg hover:-translate-y-0.5",
          "active:ring-1 active:ring-ac-primary-50",
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
   Button 컴포넌트(variant="icon", size="icon-sm") 사용
══════════════════════════════════════════════════════════════ */
export interface CardMenuProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const CardMenu = React.forwardRef<HTMLButtonElement, CardMenuProps>(
  ({ className, children, ...props }, ref) => (
    <Button
      ref={ref}
      variant="icon"
      size="icon-sm"
      className={cn("absolute top-2 right-2 border-none text-muted-foreground", className)}
      {...props}
    >
      {children ?? (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
          <circle cx="8" cy="3" r="1.2" />
          <circle cx="8" cy="8" r="1.2" />
          <circle cx="8" cy="13" r="1.2" />
        </svg>
      )}
    </Button>
  )
);
CardMenu.displayName = "CardMenu";

/* ══════════════════════════════════════════════════════════════
   CardHeader
   headerType: image / avatar / text
   control: "checkbox" | "radio" | "switch" | "menu" | "none"
══════════════════════════════════════════════════════════════ */

/** 우측 상단 컨트롤 공통 props */
export type CardHeaderControl =
  | { control?: "none" }
  | { control: "menu";     onMenuClick?: () => void }
  | { control: "checkbox"; checked?: boolean; defaultChecked?: boolean; onCheckedChange?: (checked: boolean) => void }
  | { control: "radio";    checked?: boolean; onChange?: React.ChangeEventHandler<HTMLInputElement>; name?: string; value?: string }
  | { control: "switch";   checked?: boolean; defaultChecked?: boolean; onCheckedChange?: (checked: boolean) => void };

export type CardHeaderProps =
  Omit<React.HTMLAttributes<HTMLDivElement>, "title"> &
  CardHeaderControl & {
    /** 이미지 URL — image 타입 */
    imageSrc?: string;
    imageAlt?: string;
    /** 아바타 영역 콘텐츠 — Avatar 컴포넌트 또는 커스텀 ReactNode */
    avatar?: React.ReactNode;
    /** 제목 */
    title?: React.ReactNode;
    /** 부제목 / 설명 */
    subtitle?: React.ReactNode;
    /** 우측 뱃지/상태 요소 (control과 별개로 이미지 헤더에서 사용) */
    badge?: React.ReactNode;
  };

/** control prop에 따라 우측 상단 요소를 렌더링 */
function CardHeaderControl(props: CardHeaderControl) {
  if (!props.control || props.control === "none") return null;

  if (props.control === "menu") {
    return <CardMenu onClick={props.onMenuClick} />;
  }

  if (props.control === "checkbox") {
    return (
      <div className="mt-0.5">
        <Checkbox
          size="lg"
          checked={props.checked}
          defaultChecked={props.defaultChecked}
          onChange={(e) => props.onCheckedChange?.(e.target.checked)}
        />
      </div>
    );
  }

  if (props.control === "radio") {
    return (
      <div className="mt-0.5">
        <Radio
          size="lg"
          checked={props.checked}
          onChange={props.onChange}
          name={props.name}
          value={props.value}
        />
      </div>
    );
  }

  if (props.control === "switch") {
    return (
      <Switch
        size="md"
        checked={props.checked}
        defaultChecked={props.defaultChecked}
        onCheckedChange={props.onCheckedChange}
      />
    );
  }

  return null;
}

// control 관련 prop 키 목록 — DOM에 전달되면 안 되는 것들
const CONTROL_PROP_KEYS = [
  "control", "onMenuClick", "onCheckedChange",
  "onChange", "name", "value", "checked", "defaultChecked",
  "imageSrc", "imageAlt", "avatar", "title", "subtitle", "badge",
] as const;

function omitControlProps(props: Record<string, unknown>) {
  const result: Record<string, unknown> = {};
  for (const key in props) {
    if (!(CONTROL_PROP_KEYS as readonly string[]).includes(key)) {
      result[key] = props[key];
    }
  }
  return result;
}

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  (props, ref) => {
    const p = props as any; // eslint-disable-line @typescript-eslint/no-explicit-any

    const {
      className, imageSrc, imageAlt, avatar,
      title, subtitle, badge, children, control,
    } = p;

    const controlProps = {
      control,
      onMenuClick:     p.onMenuClick,
      onCheckedChange: p.onCheckedChange,
      onChange:        p.onChange,
      name:            p.name,
      value:           p.value,
      checked:         p.checked,
      defaultChecked:  p.defaultChecked,
    } as CardHeaderControl;

    // control 관련 + 카드 전용 props를 모두 제거한 순수 HTML attrs
    const rest = omitControlProps(p);

    /* image 타입 */
    if (imageSrc) {
      return (
        <div ref={ref} className={cn("relative", className)} {...rest}>
          <img
            src={imageSrc}
            alt={imageAlt ?? ""}
            className="w-full aspect-video object-cover"
          />
          <div className="absolute top-3 right-3 flex items-center gap-1.5">
            {badge}
            <CardHeaderControl {...controlProps} />
          </div>
          {children}
        </div>
      );
    }

    /* avatar / text 타입 */
    return (
      <div ref={ref} className={cn("flex items-start gap-3 px-4 pt-4 pb-0", className)} {...rest}>
        {avatar && <div className="shrink-0">{avatar}</div>}
        <div className="flex-1 min-w-0">
          {title && (
            <p className="text-sm font-semibold text-foreground leading-snug line-clamp-1">{title}</p>
          )}
          {subtitle && (
            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{subtitle}</p>
          )}
        </div>
        {!control && badge && <div className="shrink-0">{badge}</div>}
        <div className="shrink-0">
          <CardHeaderControl {...controlProps} />
        </div>
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
   divider: true일 때 children 사이에 <Divider /> 자동 삽입
══════════════════════════════════════════════════════════════ */
export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * true이면 children 항목 사이에 <Divider />를 자동으로 삽입합니다.
   * @default false
   */
  divider?: boolean;
}

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, divider = false, children, ...props }, ref) => {
    const content = divider
      ? React.Children.toArray(children).reduce<React.ReactNode[]>(
          (acc, child, index) => {
            if (index > 0) acc.push(<Divider key={`divider-${index}`} />);
            acc.push(child);
            return acc;
          },
          []
        )
      : children;

    return (
      <div
        ref={ref}
        className={cn(
          "px-4 py-3 flex-1 flex flex-col",
          divider ? "gap-0" : "gap-2",
          className
        )}
        {...props}
      >
        {content}
      </div>
    );
  }
);
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
  ({ className, divider = false, children, ...props }, ref) => (
    <>
      {divider && <Divider />}
      <div
        ref={ref}
        className={cn(
          "px-4 pb-4 flex items-center gap-2",
          divider ? "pt-3" : "pt-0",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </>
  )
);
CardFooter.displayName = "CardFooter";

/* ── CardFooterUser ───────────────────────────────────────── */
export interface CardFooterUserProps extends React.HTMLAttributes<HTMLDivElement> {
  avatar?: Pick<AvatarProps, "src" | "name" | "fallback" | "size" | "shape">;
  name?: string;
  sub?: string;
  action?: React.ReactNode;
}

const CardFooterUser = React.forwardRef<HTMLDivElement, CardFooterUserProps>(
  ({ className, avatar, name, sub, action, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center gap-2 w-full", className)} {...props}>
      {avatar && <Avatar size="md" {...avatar} />}
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

/* ══════════════════════════════════════════════════════════════
   CardFooterButtons
   버튼 푸터 — ButtonGroup + Button 컴포넌트 사용
   direction: horizontal (기본) / vertical
══════════════════════════════════════════════════════════════ */
export interface CardFooterButtonsProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 버튼 배치 방향 */
  direction?: "horizontal" | "vertical";
  /** 주요 액션 버튼 텍스트 */
  primaryLabel?: string;
  /** 주요 액션 콜백 */
  onPrimary?: () => void;
  /** 보조 액션 버튼 텍스트 */
  secondaryLabel?: string;
  /** 보조 액션 콜백 */
  onSecondary?: () => void;
  /** 구분선 표시 여부 */
  divider?: boolean;
}

const CardFooterButtons = React.forwardRef<HTMLDivElement, CardFooterButtonsProps>(
  (
    {
      className,
      direction = "horizontal",
      primaryLabel = "확인",
      onPrimary,
      secondaryLabel,
      onSecondary,
      divider = false,
      ...props
    },
    ref
  ) => (
    <>
      {divider && <Divider />}
      <div
        ref={ref}
        className={cn("px-4 pb-4", divider ? "pt-3" : "pt-0", className)}
        {...props}
      >
        <ButtonGroup direction={direction}>
          {secondaryLabel && (
            <Button
              variant="tertiary"
              size="sm"
              fullWidth={direction === "vertical"}
              onClick={onSecondary}
            >
              {secondaryLabel}
            </Button>
          )}
          <Button
            variant="primary"
            size="sm"
            fullWidth={direction === "vertical"}
            onClick={onPrimary}
          >
            {primaryLabel}
          </Button>
        </ButtonGroup>
      </div>
    </>
  )
);
CardFooterButtons.displayName = "CardFooterButtons";

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
  CardFooterButtons,
};