"use client";

import * as React from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/utils/cn";

/* ══════════════════════════════════════════════════════════════
   Types
══════════════════════════════════════════════════════════════ */
export type ExpandIconType = "chevron" | "plusMinus" | "arrow";

export interface SideNavItem {
  id: string;
  label: string;
  href?: string;
  icon?: React.ReactNode;
  children?: SideNavItem[];
  divider?: boolean;
}

/* ══════════════════════════════════════════════════════════════
   Expand Icons
══════════════════════════════════════════════════════════════ */
function ExpandIconChevron({ isOpen }: { isOpen: boolean }) {
  return (
    <ChevronDown
      className={cn("w-4 h-4 transition-transform duration-200", isOpen && "rotate-180")}
    />
  );
}

function ExpandIconPlusMinus({ isOpen }: { isOpen: boolean }) {
  return (
    <span className="relative w-4 h-4 flex items-center justify-center">
      <span className="absolute w-[10px] h-[1.5px] bg-current rounded-full" />
      <span
        className={cn(
          "absolute w-[1.5px] h-[10px] bg-current rounded-full transition-all duration-200",
          isOpen ? "scale-y-0 opacity-0" : "scale-y-100 opacity-100"
        )}
      />
    </span>
  );
}

function ExpandIconArrow({ isOpen }: { isOpen: boolean }) {
  return (
    <ChevronRight
      className={cn("w-4 h-4 transition-transform duration-200", isOpen && "rotate-90")}
    />
  );
}

const expandIconMap: Record<ExpandIconType, (isOpen: boolean) => React.ReactNode> = {
  chevron:   (isOpen) => <ExpandIconChevron isOpen={isOpen} />,
  plusMinus: (isOpen) => <ExpandIconPlusMinus isOpen={isOpen} />,
  arrow:     (isOpen) => <ExpandIconArrow isOpen={isOpen} />,
};

/* ══════════════════════════════════════════════════════════════
   Context
══════════════════════════════════════════════════════════════ */
interface SideNavContextValue {
  activeId: string;
  onSelect: (id: string) => void;
  openIds: Set<string>;
  toggleOpen: (id: string) => void;
  activeClassName: string;
  expandIcon: ExpandIconType;
  renderLink?: (item: SideNavItem, children: React.ReactNode, className: string) => React.ReactNode;
}

const SideNavContext = React.createContext<SideNavContextValue | null>(null);

function useSideNav() {
  const ctx = React.useContext(SideNavContext);
  if (!ctx) throw new Error("Must be used within <SideNavigation>");
  return ctx;
}

/* ══════════════════════════════════════════════════════════════
   SideNavigation (Root)
══════════════════════════════════════════════════════════════ */
export interface SideNavigationProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  items: SideNavItem[];
  activeId?: string;
  defaultActiveId?: string;
  onActiveChange?: (id: string) => void;
  defaultOpenIds?: string[];
  /**
   * active 상태에 적용할 Tailwind 클래스
   * @default "text-ac-primary-50"
   */
  activeClassName?: string;
  title?: string;
  /**
   * 하위 목록 열림/닫힘 토글 아이콘 타입
   * @default "chevron"
   */
  expandIcon?: ExpandIconType;
  /**
   * href가 있는 아이템을 커스텀 링크로 렌더링
   * Next.js 사용 예:
   * renderLink={(item, children, className) => (
   *   <Link href={item.href!} className={className}>{children}</Link>
   * )}
   */
  renderLink?: SideNavContextValue["renderLink"];
}

const SideNavigation = React.forwardRef<HTMLElement, SideNavigationProps>(
  (
    {
      className,
      items,
      activeId: controlledActiveId,
      defaultActiveId = "",
      onActiveChange,
      defaultOpenIds = [],
      activeClassName = "text-ac-primary-50",
      expandIcon = "chevron",
      title,
      renderLink,
      ...props
    },
    ref
  ) => {
    const [internalActiveId, setInternalActiveId] = React.useState(defaultActiveId);
    const [openIds, setOpenIds] = React.useState<Set<string>>(new Set(defaultOpenIds));

    const controlled = controlledActiveId !== undefined;
    const activeId = controlled ? controlledActiveId! : internalActiveId;

    const onSelect = React.useCallback((id: string) => {
      if (!controlled) setInternalActiveId(id);
      onActiveChange?.(id);
    }, [controlled, onActiveChange]);

    const toggleOpen = React.useCallback((id: string) => {
      setOpenIds(prev => {
        const next = new Set(prev);
        next.has(id) ? next.delete(id) : next.add(id);
        return next;
      });
    }, []);

    return (
      <SideNavContext.Provider value={{ activeId, onSelect, openIds, toggleOpen, activeClassName, expandIcon, renderLink }}>
        <nav ref={ref} className={cn("flex flex-col w-full", className)} {...props}>
          {title && (
            <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider select-none">
              {title}
            </div>
          )}
          <SideNavList items={items} depth={1} />
        </nav>
      </SideNavContext.Provider>
    );
  }
);
SideNavigation.displayName = "SideNavigation";

/* ══════════════════════════════════════════════════════════════
   SideNavList
══════════════════════════════════════════════════════════════ */
function SideNavList({ items, depth }: { items: SideNavItem[]; depth: number }) {
  return (
    <ul role="list" className="flex flex-col w-full">
      {items.map((item) => (
        <SideNavItemRow key={item.id} item={item} depth={depth} />
      ))}
    </ul>
  );
}

/* ══════════════════════════════════════════════════════════════
   SideNavItemRow
══════════════════════════════════════════════════════════════ */
function SideNavItemRow({ item, depth }: { item: SideNavItem; depth: number }) {
  const { activeId, onSelect, openIds, toggleOpen, activeClassName, expandIcon, renderLink } = useSideNav();
  const hasChildren = item.children && item.children.length > 0;
  const isOpen = openIds.has(item.id);
  const isActive = activeId === item.id;

  const paddingLeft = depth === 1 ? "pl-3" : depth === 2 ? "pl-7" : "pl-11";

  const handleClick = () => {
    if (hasChildren) toggleOpen(item.id);
    else onSelect(item.id);
  };

  const itemClassName = cn(
    "flex items-center gap-2 w-full py-2 pr-3 rounded-md text-sm",
    "transition-colors duration-fast select-none",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
    paddingLeft,
    depth === 1 ? "font-medium" : "font-normal",
    isActive
      ? cn("font-semibold bg-ac-gray-20", activeClassName)
      : "text-foreground hover:text-foreground hover:bg-ac-gray-20"
  );

  const itemContent = (
    <>
      {item.icon && (
        <span className={cn("shrink-0 w-4 h-4 flex items-center justify-center", isActive && activeClassName)}>
          {item.icon}
        </span>
      )}
      <span className="flex-1 min-w-0 truncate text-left">{item.label}</span>
      {hasChildren && (
        <span className="shrink-0 text-muted-foreground">
          {expandIconMap[expandIcon](isOpen)}
        </span>
      )}
    </>
  );

  return (
    <li>
      {item.divider && <div className="my-1 h-px bg-border mx-3" />}

      {item.href && !hasChildren && renderLink ? (
        renderLink(item, itemContent, itemClassName)
      ) : item.href && !hasChildren ? (
        <a
          href={item.href}
          aria-current={isActive ? "page" : undefined}
          className={itemClassName}
          onClick={() => onSelect(item.id)}
        >
          {itemContent}
        </a>
      ) : (
        <button
          type="button"
          onClick={handleClick}
          aria-current={isActive ? "page" : undefined}
          aria-expanded={hasChildren ? isOpen : undefined}
          className={itemClassName}
        >
          {itemContent}
        </button>
      )}

      {hasChildren && isOpen && (
        <SideNavList items={item.children!} depth={depth + 1} />
      )}
    </li>
  );
}

export { SideNavigation };
