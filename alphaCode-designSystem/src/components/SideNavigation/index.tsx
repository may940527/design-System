"use client";

import * as React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/utils/cn";

/* ══════════════════════════════════════════════════════════════
   Types
══════════════════════════════════════════════════════════════ */
export interface SideNavItem {
  id: string;
  label: string;
  href?: string;
  icon?: React.ReactNode;
  children?: SideNavItem[];
  divider?: boolean;
}

/* ══════════════════════════════════════════════════════════════
   Context
══════════════════════════════════════════════════════════════ */
interface SideNavContextValue {
  activeId: string;
  onSelect: (id: string) => void;
  openIds: Set<string>;
  toggleOpen: (id: string) => void;
  activeClassName: string;
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
   * @example "text-blue-500", "text-red-600"
   */
  activeClassName?: string;
  title?: string;
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
      <SideNavContext.Provider value={{ activeId, onSelect, openIds, toggleOpen, activeClassName, renderLink }}>
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
  const { activeId, onSelect, openIds, toggleOpen, activeClassName, renderLink } = useSideNav();
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
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
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