import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/utils/cn";

/* ── Types ─────────────────────────────────────────────────── */
export type PaginationType = "simple" | "default";

/* ── 페이지 번호 계산 헬퍼 ──────────────────────────────────── */
function getPageNumbers(current: number, total: number, maxVisible = 10): (number | "...")[] {
  if (total <= maxVisible) return Array.from({ length: total }, (_, i) => i + 1);

  const pages: (number | "...")[] = [];
  const delta = 2; // 현재 페이지 양쪽 몇 개까지 보여줄지

  const left  = Math.max(2, current - delta);
  const right = Math.min(total - 1, current + delta);

  pages.push(1);
  if (left > 2) pages.push("...");
  for (let i = left; i <= right; i++) pages.push(i);
  if (right < total - 1) pages.push("...");
  pages.push(total);

  return pages;
}

/* ══════════════════════════════════════════════════════════════
   Pagination (Root)
══════════════════════════════════════════════════════════════ */
export interface PaginationProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** 전체 페이지 수 */
  total: number;
  /** 현재 페이지 (controlled) */
  page?: number;
  defaultPage?: number;
  onPageChange?: (page: number) => void;
  /** simple: 이전/현재/다음만 표시 */
  type?: PaginationType;
  /** 비활성화 */
  disabled?: boolean;
  /** 활성 페이지 버튼 색상 (기본 ac-primary-50) */
  activeColor?: string;
  /** 페이지당 항목 수 선택 표시 */
  showPageSize?: boolean;
  pageSizeOptions?: number[];
  pageSize?: number;
  defaultPageSize?: number;
  onPageSizeChange?: (size: number) => void;
  /** Go to 페이지 점프 입력 표시 */
  showJumper?: boolean;
}

const Pagination = React.forwardRef<HTMLDivElement, PaginationProps>(
  (
    {
      className,
      total,
      page: controlledPage,
      defaultPage = 1,
      onPageChange,
      type = "default",
      disabled = false,
      activeColor,
      showPageSize = false,
      pageSizeOptions = [10, 20, 40, 100],
      pageSize: controlledPageSize,
      defaultPageSize = 10,
      onPageSizeChange,
      showJumper = false,
      ...props
    },
    ref
  ) => {
    const [internalPage, setInternalPage] = React.useState(defaultPage);
    const [internalPageSize, setInternalPageSize] = React.useState(defaultPageSize);
    const [jumperValue, setJumperValue] = React.useState("");

    const controlled     = controlledPage !== undefined;
    const page           = controlled ? controlledPage! : internalPage;
    const pageSizeControlled = controlledPageSize !== undefined;
    const pageSize       = pageSizeControlled ? controlledPageSize! : internalPageSize;

    const goTo = (p: number) => {
      if (disabled) return;
      const next = Math.max(1, Math.min(p, total));
      if (!controlled) setInternalPage(next);
      onPageChange?.(next);
    };

    const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const size = Number(e.target.value);
      if (!pageSizeControlled) setInternalPageSize(size);
      onPageSizeChange?.(size);
      goTo(1);
    };

    const handleJumper = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        const target = Number(jumperValue);
        if (!isNaN(target) && target > 0) goTo(target);
        setJumperValue("");
      }
    };

    /* 버튼 공통 스타일 */
    const btnBase = cn(
      "inline-flex items-center justify-center h-8 min-w-8 px-1 rounded-md text-sm",
      "transition-colors duration-fast select-none",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
      disabled && "opacity-40 pointer-events-none"
    );
    const navBtn = cn(btnBase, "gap-1 px-2 text-foreground border border-border hover:bg-ac-gray-20 disabled:opacity-40");
    const pageBtn = (active: boolean) =>
      cn(btnBase, active
        ? "font-semibold text-ac-white"
        : "text-foreground hover:bg-ac-gray-20 hover:text-ac-primary-50"
      );

    /* ── Simple 타입 ────────────────────────────────────────── */
    if (type === "simple") {
      return (
        <div ref={ref} role="navigation" aria-label="페이지네이션" className={cn("flex items-center gap-1", className)} {...props}>
          <button onClick={() => goTo(page - 1)} disabled={disabled || page <= 1} className={navBtn} aria-label="이전 페이지">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="inline-flex items-center gap-1 px-2 text-sm text-foreground tabular-nums">
            <span className="font-semibold">{page}</span>
            <span className="text-muted-foreground">/ {total}</span>
          </span>
          <button onClick={() => goTo(page + 1)} disabled={disabled || page >= total} className={navBtn} aria-label="다음 페이지">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      );
    }

    /* ── Default 타입 ───────────────────────────────────────── */
    const pages = getPageNumbers(page, total);

    return (
      <div ref={ref} role="navigation" aria-label="페이지네이션"
        className={cn("flex items-center gap-1 flex-wrap", className)} {...props}>

        {/* 이전 */}
        <button onClick={() => goTo(page - 1)} disabled={disabled || page <= 1}
          className={navBtn} aria-label="이전 페이지">
          <ChevronLeft className="w-4 h-4" />
          <span>이전</span>
        </button>

        {/* 페이지 번호 */}
        {pages.map((p, i) =>
          p === "..." ? (
            <span key={`ellipsis-${i}`} className="w-8 text-center text-sm text-muted-foreground select-none">
              …
            </span>
          ) : (
            <button
              key={p}
              onClick={() => goTo(p as number)}
              disabled={disabled}
              aria-current={p === page ? "page" : undefined}
              className={pageBtn(p === page)}
              style={p === page ? { backgroundColor: activeColor ?? "#FF6300" /* ac-primary-50 */ } : undefined}
            >
              {p}
            </button>
          )
        )}

        {/* 다음 */}
        <button onClick={() => goTo(page + 1)} disabled={disabled || page >= total}
          className={navBtn} aria-label="다음 페이지">
          <span>다음</span>
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* PageSize 선택 */}
        {showPageSize && (
          <select
            value={pageSize}
            onChange={handlePageSizeChange}
            disabled={disabled}
            className={cn(
              "h-8 px-2 rounded-md border border-border text-sm bg-background text-foreground",
              "focus:outline-none focus:ring-2 focus:ring-ring",
              disabled && "opacity-40 pointer-events-none"
            )}
            aria-label="페이지당 항목 수"
          >
            {pageSizeOptions.map(s => (
              <option key={s} value={s}>{s} / page</option>
            ))}
          </select>
        )}

        {/* Jumper */}
        {showJumper && (
          <div className="flex items-center gap-1.5 ml-1">
            <span className="text-sm text-foreground">Go to</span>
            <input
              type="number"
              min={1}
              max={total}
              value={jumperValue}
              onChange={(e) => setJumperValue(e.target.value)}
              onKeyDown={handleJumper}
              disabled={disabled}
              className={cn(
                "w-12 h-8 px-2 rounded-md border border-border text-sm bg-background text-foreground text-center tabular-nums",
                "focus:outline-none focus:ring-2 focus:ring-ring",
                disabled && "opacity-40 pointer-events-none"
              )}
              aria-label="이동할 페이지 번호"
            />
          </div>
        )}
      </div>
    );
  }
);
Pagination.displayName = "Pagination";

export { Pagination };