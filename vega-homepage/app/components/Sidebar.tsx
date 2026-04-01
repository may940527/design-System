"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useMemo } from "react";
import { SideNavigation, SideNavItem } from "@alphacode-ai/design-system";

const vegaUiItems: SideNavItem[] = [
  { id: "overview", label: "Overview", href: "/" },
  { id: "logo",     label: "Logo",     href: "/logo" },
];

const foundationItems: SideNavItem[] = [
  { id: "breakpoints", label: "Breakpoints", href: "/foundation/breakpoints" },
  { id: "color",       label: "Color",       href: "/foundation/color" },
  { id: "radius",      label: "Radius",      href: "/foundation/radius" },
  { id: "shadow",      label: "Shadow",      href: "/foundation/shadow" },
  { id: "spacing",     label: "Spacing",     href: "/foundation/spacing" },
];

const componentItems: SideNavItem[] = [
  { id: "accordion",   label: "Accordion",          href: "/components/accordion" },
  { id: "avatar",      label: "Avatar",             href: "/components/avatar" },
  { id: "badges",      label: "Badges",             href: "/components/badges" },
  { id: "breadcrumbs", label: "Breadcrumbs",        href: "/components/breadcrumbs" },
  {
    id: "button",
    label: "Button",
    children: [
      { id: "button-button",       label: "Button",       href: "/components/button" },
      { id: "button-button-group", label: "Button Group", href: "/components/button/button-group" },
      { id: "button-fab",          label: "FAB",          href: "/components/button/fab" },
    ],
  },
  { id: "card",        label: "Cards",              href: "/components/cards" },
  { id: "carousel",    label: "Carousel",           href: "/components/carousel" },
  { id: "dialog",      label: "Dialog",             href: "/components/dialog" },
  { id: "divider",     label: "Divider",            href: "/components/divider" },
  { id: "dropdown",    label: "Dropdown",           href: "/components/dropdown" },
  {
    id: "input",
    label: "Input",
    children: [
      { id: "input-checkbox",    label: "Checkbox",    href: "/components/input/checkbox" },
      { id: "input-date-picker", label: "Date Picker", href: "/components/input/date-picker" },
      { id: "input-file-input",  label: "File Input",  href: "/components/input/file-input" },
      { id: "input-radio",       label: "Radio",      href: "/components/input/radio" },
      { id: "input-select",      label: "Select",     href: "/components/input/select" },
      { id: "input-switch",      label: "Switch",     href: "/components/input/switch" },
      { id: "input-text-input",  label: "Text Input", href: "/components/input/text-input" },
      { id: "input-textarea",    label: "Textarea",   href: "/components/input/textarea" },
    ],
  },
  { id: "pagination",  label: "Pagination",         href: "/components/pagination" },
  { id: "resizable",   label: "Resizable",          href: "/components/resizable" },
  { id: "progress",       label: "Progress Indicator", href: "/components/progress" },
  { id: "step-indicator", label: "Step Indicator",     href: "/components/step-indicator" },
  { id: "side-navigation", label: "Side Navigation", href: "/components/side-navigation" },
  { id: "slider",      label: "Slider",             href: "/components/slider" },
  { id: "snackbar",    label: "Snackbar",           href: "/components/snackbar" },
  { id: "tab",         label: "Tab",                href: "/components/tab" },
  { id: "toast",       label: "Toast",              href: "/components/toast" },
  { id: "toggle-group", label: "Toggle Group",      href: "/components/toggle-group" },
  { id: "tooltip",     label: "Tooltip",            href: "/components/tooltip" },
];

// children까지 재귀 탐색해서 pathname에 맞는 id 반환
function findActiveId(items: SideNavItem[], pathname: string): string | undefined {
  for (const item of items) {
    if (item.href === pathname) return item.id;
    if (item.children) {
      const found = findActiveId(item.children, pathname);
      if (found) return found;
    }
  }
}

const allItems = [...vegaUiItems, ...foundationItems, ...componentItems];

function getActiveId(pathname: string): string {
  return findActiveId(allItems, pathname) ?? "overview";
}

// 현재 pathname이 해당 부모 아이템의 children 중 하나에 속하는지 확인
function isParentOfActive(item: SideNavItem, pathname: string): boolean {
  return item.children?.some(child => child.href === pathname) ?? false;
}

export default function Sidebar() {
  const pathname = usePathname();
  const activeId = useMemo(() => getActiveId(pathname), [pathname]);

  // active인 자식이 있는 부모 id를 defaultOpenIds로 넘겨 자동 펼침
  const openParentIds = useMemo(
    () => componentItems.filter(item => isParentOfActive(item, pathname)).map(item => item.id),
    [pathname]
  );

  const renderLink = useCallback((item: SideNavItem, children: React.ReactNode, className: string) => (
    <Link href={item.href!} className={className}>
      {children}
    </Link>
  ), []);

  return (
    <aside className="w-[250px] shrink-0 overflow-y-auto border-r border-border py-6 pl-4 pr-2 flex flex-col gap-6">
      <SideNavigation
        title="Vega UI"
        items={vegaUiItems}
        activeId={activeId}
        renderLink={renderLink}
      />
      <SideNavigation
        title="Foundation"
        items={foundationItems}
        activeId={activeId}
        renderLink={renderLink}
      />
      <SideNavigation
        title="Component"
        items={componentItems}
        activeId={activeId}
        defaultOpenIds={openParentIds}
        renderLink={renderLink}
      />
    </aside>
  );
}