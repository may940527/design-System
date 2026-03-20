"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight, ChevronUp, ChevronDown } from "lucide-react";
import { cn } from "@/utils/cn";

/* ── Types ─────────────────────────────────────────────────── */
export type CarouselOrientation = "horizontal" | "vertical";
export type CarouselNavStyle    = "default" | "line" | "border" | "text";

/* ══════════════════════════════════════════════════════════════
   Context
══════════════════════════════════════════════════════════════ */
interface CarouselContextValue {
  current: number;          // 현재 슬라이드 인덱스
  total: number;            // 전체 아이템 수
  itemsPerView: number;     // 한 번에 보이는 아이템 수
  pageCount: number;        // 이동 가능한 페이지 수 = total - itemsPerView + 1
  orientation: CarouselOrientation;
  loop: boolean;
  prev: () => void;
  next: () => void;
  goTo: (index: number) => void;
  setTotal: (n: number) => void;
}

const CarouselContext = React.createContext<CarouselContextValue | null>(null);

function useCarousel() {
  const ctx = React.useContext(CarouselContext);
  if (!ctx) throw new Error("Must be used within <Carousel>");
  return ctx;
}

/* ══════════════════════════════════════════════════════════════
   Carousel (Root)
══════════════════════════════════════════════════════════════ */
export interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 슬라이드 방향 */
  orientation?: CarouselOrientation;
  /** 무한 루프 여부 */
  loop?: boolean;
  /** 초기 인덱스 (uncontrolled) */
  defaultIndex?: number;
  /** 현재 인덱스 (controlled) */
  index?: number;
  onIndexChange?: (index: number) => void;
  /** 한 번에 보이는 아이템 수 — Multi Carousel */
  itemsPerView?: number;
}

const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  (
    {
      className,
      orientation = "horizontal",
      loop = false,
      defaultIndex = 0,
      index,
      onIndexChange,
      itemsPerView = 1,
      children,
      ...props
    },
    ref
  ) => {
    const [internalIndex, setInternalIndex] = React.useState(defaultIndex);
    const [total, setTotal] = React.useState(0);

    const controlled  = index !== undefined;
    const current     = controlled ? index! : internalIndex;
    const pageCount   = Math.max(1, total - itemsPerView + 1);
    const maxIndex    = Math.max(0, total - itemsPerView);

    const goTo = React.useCallback(
      (i: number) => {
        const next = loop
          ? ((i % pageCount) + pageCount) % pageCount
          : Math.max(0, Math.min(i, maxIndex));
        if (!controlled) setInternalIndex(next);
        onIndexChange?.(next);
      },
      [loop, pageCount, maxIndex, controlled, onIndexChange]
    );

    const prev = React.useCallback(() => goTo(current - 1), [current, goTo]);
    const next = React.useCallback(() => goTo(current + 1), [current, goTo]);

    /* 드래그/스와이프 */
    const dragStart = React.useRef<number | null>(null);
    const onPointerDown = (e: React.PointerEvent) => {
      dragStart.current = orientation === "horizontal" ? e.clientX : e.clientY;
    };
    const onPointerUp = (e: React.PointerEvent) => {
      if (dragStart.current === null) return;
      const delta = (orientation === "horizontal" ? e.clientX : e.clientY) - dragStart.current;
      if (Math.abs(delta) > 40) delta < 0 ? next() : prev();
      dragStart.current = null;
    };

    return (
      <CarouselContext.Provider
        value={{ current, total, itemsPerView, pageCount, orientation, loop, prev, next, goTo, setTotal }}
      >
        <div
          ref={ref}
          role="region"
          aria-roledescription="carousel"
          className={cn("relative select-none", className)}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    );
  }
);
Carousel.displayName = "Carousel";

/* ══════════════════════════════════════════════════════════════
   CarouselContent — 슬라이드 트랙
══════════════════════════════════════════════════════════════ */
export interface CarouselContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const CarouselContent = React.forwardRef<HTMLDivElement, CarouselContentProps>(
  ({ className, children, ...props }, ref) => {
    const { current, orientation, itemsPerView, setTotal } = useCarousel();
    const isHorizontal = orientation === "horizontal";

    const items = React.Children.toArray(children);

    React.useLayoutEffect(() => {
      setTotal(items.length);
    }, [items.length]); // eslint-disable-line

    const translatePct = current * (100 / itemsPerView);

    return (
      <div ref={ref} className={cn("overflow-hidden", className)} {...props}>
        <div
          aria-live="polite"
          className={cn(
            "flex transition-transform duration-slow ease-in-out",
            !isHorizontal && "flex-col h-full"
          )}
          style={{
            transform: isHorizontal
              ? `translateX(-${translatePct}%)`
              : `translateY(-${translatePct}%)`,
          }}
        >
          {items.map((item, i) => (
            <div
              key={i}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1}번째 슬라이드`}
              className="shrink-0"
              style={{ width: isHorizontal ? `${100 / itemsPerView}%` : "100%" }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    );
  }
);
CarouselContent.displayName = "CarouselContent";

/* ══════════════════════════════════════════════════════════════
   CarouselItem
══════════════════════════════════════════════════════════════ */
const CarouselItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("w-full h-full", className)} {...props} />
  )
);
CarouselItem.displayName = "CarouselItem";

/* ══════════════════════════════════════════════════════════════
   CarouselPrevious / CarouselNext
   navStyle: default | line | border | text
══════════════════════════════════════════════════════════════ */
const navBase = [
  "inline-flex items-center justify-center shrink-0",
  "transition-colors duration-normal",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
  "disabled:pointer-events-none disabled:opacity-30",
].join(" ");

const navStyles: Record<CarouselNavStyle, string> = {
  default: "w-8 h-8 rounded-full bg-ac-white shadow-sm hover:bg-ac-gray-20",
  line:    "w-8 h-8 rounded-full bg-ac-white border border-ac-gray-30 hover:bg-ac-gray-20",
  border:  "w-8 h-8 rounded-full bg-ac-white border border-ac-gray-40 shadow-xs hover:bg-ac-gray-20",
  text:    "px-2 text-sm text-ac-gray-60 hover:text-foreground",
};

export interface CarouselNavButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  navStyle?: CarouselNavStyle;
}

const CarouselPrevious = React.forwardRef<HTMLButtonElement, CarouselNavButtonProps>(
  ({ className, navStyle = "default", ...props }, ref) => {
    const { prev, current, orientation, loop } = useCarousel();
    const Icon = orientation === "horizontal" ? ChevronLeft : ChevronUp;
    const isDisabled = !loop && current === 0;

    return (
      <button
        ref={ref}
        type="button"
        aria-label="이전 슬라이드"
        disabled={isDisabled}
        onClick={prev}
        className={cn(navBase, navStyles[navStyle], className)}
        {...props}
      >
        <Icon className="w-4 h-4" />
      </button>
    );
  }
);
CarouselPrevious.displayName = "CarouselPrevious";

const CarouselNext = React.forwardRef<HTMLButtonElement, CarouselNavButtonProps>(
  ({ className, navStyle = "default", ...props }, ref) => {
    const { next, current, pageCount, orientation, loop } = useCarousel();
    const Icon = orientation === "horizontal" ? ChevronRight : ChevronDown;
    const isDisabled = !loop && current >= pageCount - 1;

    return (
      <button
        ref={ref}
        type="button"
        aria-label="다음 슬라이드"
        disabled={isDisabled}
        onClick={next}
        className={cn(navBase, navStyles[navStyle], className)}
        {...props}
      >
        <Icon className="w-4 h-4" />
      </button>
    );
  }
);
CarouselNext.displayName = "CarouselNext";

/* ══════════════════════════════════════════════════════════════
   CarouselDots — 인디케이터 dots
   pageCount 기준으로 렌더 (Multi Carousel 대응)
══════════════════════════════════════════════════════════════ */
export interface CarouselDotsProps extends React.HTMLAttributes<HTMLDivElement> {
  activeColor?: string;
}

const CarouselDots = React.forwardRef<HTMLDivElement, CarouselDotsProps>(
  ({ className, activeColor, ...props }, ref) => {
    const { current, pageCount, goTo } = useCarousel();

    return (
      <div
        ref={ref}
        role="tablist"
        aria-label="슬라이드 선택"
        className={cn("flex items-center justify-center gap-1.5", className)}
        {...props}
      >
        {Array.from({ length: pageCount }).map((_, i) => (
          <button
            key={i}
            role="tab"
            type="button"
            aria-selected={i === current}
            aria-label={`${i + 1}번째 슬라이드`}
            onClick={() => goTo(i)}
            className="rounded-full transition-all duration-normal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            style={{
              width:           i === current ? 8  : 6,
              height:          i === current ? 8  : 6,
              opacity:         i === current ? 1  : 0.4,
              backgroundColor: i === current
                ? (activeColor ?? "#FF6300" /* ac-primary-50 */)
                : "#A8A8A8"   /* ac-gray-50 */,
            }}
          />
        ))}
      </div>
    );
  }
);
CarouselDots.displayName = "CarouselDots";

/* ══════════════════════════════════════════════════════════════
   CarouselCounter — "n / N" 카운터
══════════════════════════════════════════════════════════════ */
const CarouselCounter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { current, pageCount } = useCarousel();
    return (
      <div
        ref={ref}
        aria-live="polite"
        aria-atomic="true"
        className={cn("text-xs text-muted-foreground tabular-nums", className)}
        {...props}
      >
        {current + 1} / {pageCount}
      </div>
    );
  }
);
CarouselCounter.displayName = "CarouselCounter";

/* ══════════════════════════════════════════════════════════════
   Exports
══════════════════════════════════════════════════════════════ */
export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselDots,
  CarouselCounter,
};