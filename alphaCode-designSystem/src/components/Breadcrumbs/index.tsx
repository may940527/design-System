"use client";

import * as React from "react";
import { cn } from "@/utils/cn";

/* ── Types ─────────────────────────────────────────────────── */
export interface BreadcrumbItem {
  /** 표시할 레이블 */
  label: string;
  /** 링크 URL (없으면 클릭 불가) */
  href?: string;
  /** 클릭 핸들러 */
  onClick?: () => void;
}

export interface BreadcrumbsProps extends React.HTMLAttributes<HTMLElement> {
  /** 브레드크럼 아이템 목록 */
  items: BreadcrumbItem[];
  /**
   * 구분자 타입
   * - slash: "/"
   * - chevron: ">"
   */
  separator?: "slash" | "chevron";
  /**
   * 최대 표시 아이템 수
   * 초과 시 중간을 "..."으로 축약
   * (기본값: 제한 없음)
   */
  maxItems?: number;
  /** 홈 아이콘 표시 여부 (기본: true) */
  showHomeIcon?: boolean;
}

/* ── Separator ─────────────────────────────────────────────── */
function Separator({ type }: { type: "slash" | "chevron" }) {
  return (
    <span className="text-ac-gray-50 select-none mx-1" aria-hidden="true">
      {type === "slash" ? "/" : ">"}
    </span>
  );
}

/* ── Home Icon ─────────────────────────────────────────────── */
function HomeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="currentColor"
      className="w-3.5 h-3.5 shrink-0"
      aria-hidden="true"
    >
      <path d="M8.543 1.293a.75.75 0 0 0-1.086 0L1.5 7.25V13.5A1.5 1.5 0 0 0 3 15h3.25v-3.75a1.75 1.75 0 0 1 3.5 0V15H13a1.5 1.5 0 0 0 1.5-1.5V7.25L8.543 1.293Z" />
    </svg>
  );
}

/* ── Breadcrumb Item ────────────────────────────────────────── */
function BreadcrumbLink({
  item,
  isFirst,
  showHomeIcon,
  separator,
  isLast,
  isSingle,
}: {
  item: BreadcrumbItem;
  isFirst: boolean;
  showHomeIcon: boolean;
  separator: "slash" | "chevron";
  isLast: boolean;
  isSingle: boolean;
}) {
  // 단독 아이템이면 isLast여도 링크 활성화
  const isClickable = (!isLast || isSingle) && (item.href || item.onClick);

  const content = (
    <span className="inline-flex items-center gap-1">
      {isFirst && showHomeIcon && <HomeIcon />}
      {item.label}
    </span>
  );

  return (
    <li className="inline-flex items-center">
      {isClickable ? (
        <a
          href={item.href}
          onClick={item.onClick}
          className={cn(
            "inline-flex items-center text-sm transition-colors duration-150",
            "text-ac-black hover:underline underline-offset-4",
          )}
          aria-label={isFirst && showHomeIcon ? "홈으로 이동" : undefined}
        >
          {content}
        </a>
      ) : (
        <span
          className={cn(
            "inline-flex items-center text-sm",
            isLast && !isSingle
              ? "font-semibold text-foreground"   // 현재 페이지
              : "text-ac-gray-50 cursor-default",  // 링크 없는 아이템
          )}
          aria-current={isLast && !isSingle ? "page" : undefined}
        >
          {content}
        </span>
      )}
      {!isLast && <Separator type={separator} />}
    </li>
  );
}

/* ── Component ─────────────────────────────────────────────── */
function Breadcrumbs({
  className,
  items,
  separator = "slash",
  maxItems,
  showHomeIcon = true,
  ...props
}: BreadcrumbsProps) {
  if (!items.length) return null;

  // maxItems 초과 시 중간 축약
  const visibleItems = React.useMemo(() => {
    if (!maxItems || items.length <= maxItems) return items;

    // 첫 번째 + "..." + 마지막 (maxItems - 2)개
    const start = items.slice(0, 1);
    const end = items.slice(-(maxItems - 2));
    const ellipsis: BreadcrumbItem = { label: "..." };

    return [...start, ellipsis, ...end];
  }, [items, maxItems]);

  const isSingle = visibleItems.length === 1;

  return (
    <nav aria-label="breadcrumb" className={cn("w-full", className)} {...props}>
      <ol className="inline-flex flex-wrap items-center gap-y-1">
        {visibleItems.map((item, index) => (
          <BreadcrumbLink
            key={`${item.label}-${index}`}
            item={item}
            isFirst={index === 0}
            isLast={index === visibleItems.length - 1}
            isSingle={isSingle}
            showHomeIcon={showHomeIcon}
            separator={separator}
          />
        ))}
      </ol>
    </nav>
  );
}

export { Breadcrumbs };