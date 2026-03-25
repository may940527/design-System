import * as class_variance_authority_types from 'class-variance-authority/types';
import * as React from 'react';
import { VariantProps } from 'class-variance-authority';
import * as react_jsx_runtime from 'react/jsx-runtime';
import { DateRange } from 'react-day-picker';
export { DateRange } from 'react-day-picker';
import { ClassValue } from 'clsx';
export { ColorToken, RadiusToken, SpacingToken, borderRadius, breakpoints, colors, fontSize, fontWeight, lineHeight, spacing, zIndex } from './tokens/index.cjs';
export * from 'lucide-react';

declare const buttonVariants: (props?: ({
    variant?: "primary" | "secondary" | "tertiary" | "link" | "icon" | null | undefined;
    size?: "xl" | "lg" | "md" | "sm" | "xs" | "icon-xl" | "icon-lg" | "icon-md" | "icon-sm" | "icon-xs" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
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
declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;

declare const buttonGroupVariants: (props?: ({
    direction?: "horizontal" | "vertical" | null | undefined;
    gap?: "md" | "sm" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof buttonGroupVariants> {
    direction?: "horizontal" | "vertical";
}
declare function ButtonGroup({ className, direction, children, ...props }: ButtonGroupProps): react_jsx_runtime.JSX.Element;

declare const fabVariants: (props?: ({
    variant?: "primary" | "secondary" | "tertiary" | null | undefined;
    size?: "lg" | "md" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface FABProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof fabVariants> {
    /** 아이콘 (필수) — children으로 전달 */
    children: React.ReactNode;
    /**
     * 레이블 텍스트
     * - expandOnHover 없이 사용: 항상 라벨 표시 (Extended FAB)
     * - expandOnHover와 함께: 호버 시에만 라벨 표시
     */
    label?: string;
    /**
     * 호버 시 라벨 펼침 방향
     * - "right": 아이콘 우측으로 라벨 펼쳐짐
     * - "left" : 아이콘 좌측으로 라벨 펼쳐짐
     * label prop이 있어야 동작합니다.
     */
    expandOnHover?: "right" | "left";
    /**
     * 아이콘 전용 FAB 호버 시 표시할 툴팁 텍스트
     * 디자인 시스템 Tooltip 컴포넌트를 사용합니다.
     * label이 없을 때만 동작합니다.
     * @example tooltip="추가하기"
     */
    tooltip?: string;
    /**
     * 툴팁 표시 위치
     * @default "top-center"
     */
    tooltipPlacement?: "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right";
    /** 화면 고정 위치 */
    fixed?: boolean;
    /** fixed 사용 시 위치 커스텀 (기본: "bottom-6 right-6") */
    position?: string;
    /**
     * variant 기본 색상을 override할 Tailwind 클래스
     * @example "bg-blue-500 text-white hover:bg-blue-600"
     */
    colorClassName?: string;
}
declare const FAB: React.ForwardRefExoticComponent<FABProps & React.RefAttributes<HTMLButtonElement>>;

declare const badgeVariants: (props?: ({
    variant?: "primary" | "complete" | "success" | "warning" | "fail" | "default" | null | undefined;
    size?: "lg" | "md" | "sm" | "xs" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {
    /** 좌측 아이콘 (선택) */
    icon?: React.ReactNode;
}
declare function Badge({ className, variant, size, icon, children, ...props }: BadgeProps): react_jsx_runtime.JSX.Element;

declare const cardVariants: (props?: ({
    variant?: "background" | "line" | "shadow" | null | undefined;
    interactive?: boolean | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
declare const shadowSizeMap: {
    readonly xs: "shadow-xs";
    readonly sm: "shadow-sm";
    readonly md: "shadow-md";
    readonly lg: "shadow-lg";
    readonly xl: "shadow-xl";
    readonly "2xl": "shadow-2xl";
};
type CardShadowSize = keyof typeof shadowSizeMap;
interface CardProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {
    shadowSize?: CardShadowSize;
}
declare const Card: React.ForwardRefExoticComponent<CardProps & React.RefAttributes<HTMLDivElement>>;
interface CardMenuProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
}
declare const CardMenu: React.ForwardRefExoticComponent<CardMenuProps & React.RefAttributes<HTMLButtonElement>>;
/** 우측 상단 컨트롤 공통 props */
type CardHeaderControl = {
    control?: "none";
} | {
    control: "menu";
    onMenuClick?: () => void;
} | {
    control: "checkbox";
    checked?: boolean;
    defaultChecked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
} | {
    control: "radio";
    checked?: boolean;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    name?: string;
    value?: string;
} | {
    control: "switch";
    checked?: boolean;
    defaultChecked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
};
type CardHeaderProps = Omit<React.HTMLAttributes<HTMLDivElement>, "title"> & CardHeaderControl & {
    /** 이미지 URL — image 타입 */
    imageSrc?: string;
    imageAlt?: string;
    /** 아바타 요소 — avatar 타입 */
    avatar?: React.ReactNode;
    /** 제목 */
    title?: React.ReactNode;
    /** 부제목 / 설명 */
    subtitle?: React.ReactNode;
    /** 우측 뱃지/상태 요소 (control과 별개로 이미지 헤더에서 사용) */
    badge?: React.ReactNode;
};
declare const CardHeader: React.ForwardRefExoticComponent<CardHeaderProps & React.RefAttributes<HTMLDivElement>>;
declare const CardTitle: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLHeadingElement> & React.RefAttributes<HTMLHeadingElement>>;
interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * true이면 children 항목 사이에 <Divider />를 자동으로 삽입합니다.
     * @default false
     */
    divider?: boolean;
}
declare const CardContent: React.ForwardRefExoticComponent<CardContentProps & React.RefAttributes<HTMLDivElement>>;
declare const CardDescription: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLParagraphElement> & React.RefAttributes<HTMLParagraphElement>>;
interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
    /** 구분선 표시 여부 */
    divider?: boolean;
}
declare const CardFooter: React.ForwardRefExoticComponent<CardFooterProps & React.RefAttributes<HTMLDivElement>>;
interface CardFooterUserProps extends React.HTMLAttributes<HTMLDivElement> {
    avatar?: React.ReactNode;
    name?: string;
    sub?: string;
    action?: React.ReactNode;
}
declare const CardFooterUser: React.ForwardRefExoticComponent<CardFooterUserProps & React.RefAttributes<HTMLDivElement>>;
interface CardFooterInfoProps extends React.HTMLAttributes<HTMLDivElement> {
    items?: Array<{
        icon?: React.ReactNode;
        label: string;
    }>;
    action?: React.ReactNode;
}
declare const CardFooterInfo: React.ForwardRefExoticComponent<CardFooterInfoProps & React.RefAttributes<HTMLDivElement>>;
interface CardFooterButtonsProps extends React.HTMLAttributes<HTMLDivElement> {
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
declare const CardFooterButtons: React.ForwardRefExoticComponent<CardFooterButtonsProps & React.RefAttributes<HTMLDivElement>>;

declare const dividerVariants: (props?: ({
    orientation?: "horizontal" | "vertical" | null | undefined;
    variant?: "solid" | "dashed" | null | undefined;
    inset?: boolean | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface DividerProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof dividerVariants> {
}
declare function Divider({ className, orientation, variant, inset, ...props }: DividerProps): react_jsx_runtime.JSX.Element;

declare const checkboxVariants: (props?: ({
    size?: "xl" | "lg" | "md" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type">, VariantProps<typeof checkboxVariants> {
    label?: string;
    description?: string;
    indeterminate?: boolean;
    /**
     * 체크 시 색상 (기본: ac-primary-50 #FF6300)
     * 어떤 CSS 색상값도 가능 — "#006FFF", "rgb(0,111,255)", "var(--ac-blue-50)"
     */
    checkedColor?: string;
}
declare const Checkbox: React.ForwardRefExoticComponent<CheckboxProps & React.RefAttributes<HTMLInputElement>>;

interface CheckboxGroupProps extends React.HTMLAttributes<HTMLFieldSetElement> {
    title?: string;
    direction?: "vertical" | "horizontal";
}
declare function CheckboxGroup({ title, direction, className, children, ...props }: CheckboxGroupProps): react_jsx_runtime.JSX.Element;

declare const radioVariants: (props?: ({
    size?: "xl" | "lg" | "md" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type">, VariantProps<typeof radioVariants> {
    label?: string;
    description?: string;
    /**
     * 체크 시 색상 (기본: ac-primary-50 #FF6300)
     * 어떤 CSS 색상값도 가능 — "#006FFF", "rgb(0,111,255)", "var(--ac-blue-50)"
     */
    checkedColor?: string;
}
declare const Radio: React.ForwardRefExoticComponent<RadioProps & React.RefAttributes<HTMLInputElement>>;
interface RadioGroupProps extends React.HTMLAttributes<HTMLFieldSetElement> {
    title?: string;
    direction?: "vertical" | "horizontal";
}
declare function RadioGroup({ title, direction, className, children, ...props }: RadioGroupProps): react_jsx_runtime.JSX.Element;

interface BreadcrumbItem {
    /** 표시할 레이블 */
    label: string;
    /** 링크 URL (없으면 클릭 불가) */
    href?: string;
    /** 클릭 핸들러 */
    onClick?: () => void;
}
interface BreadcrumbsProps extends React.HTMLAttributes<HTMLElement> {
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
declare function Breadcrumbs({ className, items, separator, maxItems, showHomeIcon, ...props }: BreadcrumbsProps): react_jsx_runtime.JSX.Element | null;

declare const avatarVariants: (props?: ({
    shape?: "circle" | "square" | null | undefined;
    size?: "xl" | "lg" | "md" | "sm" | "xs" | "2xl" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface AvatarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children">, VariantProps<typeof avatarVariants> {
    /** 이미지 URL */
    src?: string;
    /** 이미지 alt (접근성: 스크린 리더용) */
    alt?: string;
    /** 이름 — Text 타입 이니셜 생성 및 접근성에 사용 */
    name?: string;
    /** 아이콘 — Icon 타입에 사용 */
    icon?: React.ReactNode;
    /** 이미지 로드 실패 시 fallback (기본: 이니셜 또는 아이콘) */
    fallback?: React.ReactNode;
}
declare const Avatar: React.ForwardRefExoticComponent<AvatarProps & React.RefAttributes<HTMLDivElement>>;

type DatePickerMode = "single" | "range";
type DatePickerSize = "sm" | "md" | "lg";
type DatePickerState = "default" | "complete" | "error" | "disable";

interface DatePickerProps {
    value?: Date;
    defaultValue?: Date;
    onChange?: (date?: Date) => void;
    size?: DatePickerSize;
    state?: DatePickerState;
    label?: string;
    helperText?: string;
    errorMessage?: string;
    placeholder?: string;
    dateFormat?: string;
    disabled?: boolean;
    minDate?: Date;
    maxDate?: Date;
    offsetMonths?: number;
    disabledDates?: Date[];
    weekendColor?: boolean;
    className?: string;
    id?: string;
}
declare function DatePicker({ value, defaultValue, onChange, size, state, label, helperText, errorMessage, placeholder, dateFormat, disabled, minDate, maxDate, offsetMonths, disabledDates, weekendColor, className, id, }: DatePickerProps): react_jsx_runtime.JSX.Element;
interface DateRangePickerProps {
    value?: DateRange;
    defaultValue?: DateRange;
    onChange?: (range?: DateRange) => void;
    size?: DatePickerSize;
    state?: DatePickerState;
    label?: string;
    helperText?: string;
    errorMessage?: string;
    startPlaceholder?: string;
    endPlaceholder?: string;
    dateFormat?: string;
    disabled?: boolean;
    twoMonths?: boolean;
    minDate?: Date;
    maxDate?: Date;
    offsetMonths?: number;
    disabledDates?: Date[];
    weekendColor?: boolean;
    className?: string;
    id?: string;
}
declare function DateRangePicker({ value, defaultValue, onChange, size, state, label, helperText, errorMessage, startPlaceholder, endPlaceholder, dateFormat, disabled, twoMonths, minDate, maxDate, offsetMonths, disabledDates, weekendColor, className, id, }: DateRangePickerProps): react_jsx_runtime.JSX.Element;

interface TextInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "prefix"> {
    size?: "sm" | "md" | "lg";
    state?: "default" | "complete" | "focus" | "error" | "disable";
    label?: string;
    labelLeft?: boolean;
    helperText?: string;
    errorMessage?: string;
    prefix?: React.ReactNode;
    suffix?: React.ReactNode;
    buttonLabel?: string;
    onButtonClick?: React.MouseEventHandler<HTMLButtonElement>;
}
declare const TextInput: React.ForwardRefExoticComponent<TextInputProps & React.RefAttributes<HTMLInputElement>>;

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    helperText?: string;
    errorMessage?: string;
    state?: "default" | "complete" | "focus" | "error" | "disable";
}
declare const Textarea: React.ForwardRefExoticComponent<TextareaProps & React.RefAttributes<HTMLTextAreaElement>>;

interface SelectOption {
    label: string;
    value: string;
    disabled?: boolean;
}
interface SelectOptionGroup {
    title: string;
    options: SelectOption[];
}
declare const selectVariants: (props?: ({
    size?: "lg" | "md" | "sm" | null | undefined;
    state?: "complete" | "default" | "error" | "disable" | "focus" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface SelectProps extends VariantProps<typeof selectVariants> {
    options?: SelectOption[];
    groups?: SelectOptionGroup[];
    placeholder?: string;
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    disabled?: boolean;
    label?: string;
    helperText?: string;
    errorMessage?: string;
    className?: string;
    id?: string;
}
declare function Select({ size, state, options, groups, placeholder, value, defaultValue, onValueChange, disabled, label, helperText, errorMessage, className, id, }: SelectProps): react_jsx_runtime.JSX.Element;

declare const fileInputVariants: (props?: ({
    size?: "lg" | "md" | "sm" | null | undefined;
    state?: "complete" | "default" | "error" | "disable" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface FileInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type">, VariantProps<typeof fileInputVariants> {
    label?: string;
    helperText?: string;
    errorMessage?: string;
    triggerLabel?: string;
}
declare const FileInput: React.ForwardRefExoticComponent<FileInputProps & React.RefAttributes<HTMLInputElement>>;

declare const switchTrackVariants: (props?: ({
    size?: "lg" | "md" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface SwitchProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange">, VariantProps<typeof switchTrackVariants> {
    checked?: boolean;
    defaultChecked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    /** 활성 색상 (기본: ac-primary-50 #FF6300) */
    activeColor?: string;
    label?: string;
}
declare const Switch: React.ForwardRefExoticComponent<SwitchProps & React.RefAttributes<HTMLButtonElement>>;

interface ToggleGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    /** "default" | "primary" */
    variant?: "default" | "primary";
    size?: "sm" | "md" | "lg";
    iconOnly?: boolean;
}
declare function ToggleGroup({ value, defaultValue, onValueChange, variant, size, iconOnly, className, children, ...props }: ToggleGroupProps): react_jsx_runtime.JSX.Element;
interface ToggleGroupItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    value: string;
    icon?: React.ReactNode;
    tooltip?: string;
}
declare function ToggleGroupItem({ value, icon, tooltip, children, className, disabled, ...props }: ToggleGroupItemProps): react_jsx_runtime.JSX.Element;

type TooltipPlacement = "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right";
interface TooltipProps {
    /** 툴팁 본문 */
    content: React.ReactNode;
    /** 툴팁 위치 */
    placement?: TooltipPlacement;
    /** 트리거 요소 */
    children: React.ReactNode;
    className?: string;
}
declare function Tooltip({ content, placement, children, className }: TooltipProps): react_jsx_runtime.JSX.Element;

interface SideNavItem {
    id: string;
    label: string;
    href?: string;
    icon?: React.ReactNode;
    children?: SideNavItem[];
    divider?: boolean;
}
interface SideNavContextValue {
    activeId: string;
    onSelect: (id: string) => void;
    openIds: Set<string>;
    toggleOpen: (id: string) => void;
    activeClassName: string;
    renderLink?: (item: SideNavItem, children: React.ReactNode, className: string) => React.ReactNode;
}
interface SideNavigationProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
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
declare const SideNavigation: React.ForwardRefExoticComponent<SideNavigationProps & React.RefAttributes<HTMLElement>>;

type TabSize = "sm" | "md" | "lg";
type TabVariant = "fill" | "full";
interface TabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    /** fill: 콘텐츠 너비 / full: 균등 분할 */
    variant?: TabVariant;
    size?: TabSize;
    /** 활성 탭 색상 (기본 ac-primary-50) */
    activeColor?: string;
}
declare const Tabs: React.ForwardRefExoticComponent<TabsProps & React.RefAttributes<HTMLDivElement>>;
declare const TabList: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
interface TabTriggerProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "value"> {
    value: string;
}
declare const TabTrigger: React.ForwardRefExoticComponent<TabTriggerProps & React.RefAttributes<HTMLButtonElement>>;
interface TabContentProps extends React.HTMLAttributes<HTMLDivElement> {
    value: string;
}
declare const TabContent: React.ForwardRefExoticComponent<TabContentProps & React.RefAttributes<HTMLDivElement>>;

type SnackbarVariant = "default" | "error" | "success" | "info" | "warning";
type SnackbarPosition = "top" | "bottom";
type SnackbarSize = "sm" | "md" | "lg";
interface SnackbarItem {
    id: string;
    message: React.ReactNode;
    variant?: SnackbarVariant;
    /** 좌측 아이콘 또는 아바타 */
    leftItem?: React.ReactNode;
    /** 우측: close / chevron / check / ReactNode (Button 등) */
    rightItem?: "close" | "chevron" | "check" | React.ReactNode;
    /** 아이콘 색상 override — Tailwind text 클래스. 미지정 시 variant 기본색 적용 */
    iconColorClass?: string;
    /** 배경색 override — Tailwind bg 클래스 (예: "bg-ac-blue-10") */
    bgColorClass?: string;
    /** 텍스트 색상 override — Tailwind text 클래스 (예: "text-ac-white") */
    textColorClass?: string;
    onAction?: () => void;
    duration?: number;
}
interface SnackbarContextValue {
    show: (item: Omit<SnackbarItem, "id">) => string;
    dismiss: (id: string) => void;
    dismissAll: () => void;
}
declare function useSnackbar(): SnackbarContextValue;
interface SnackbarProviderProps {
    children: React.ReactNode;
    position?: SnackbarPosition;
    maxCount?: number;
    defaultDuration?: number;
}
declare function SnackbarProvider({ children, position, maxCount, defaultDuration, }: SnackbarProviderProps): react_jsx_runtime.JSX.Element;
interface SnackbarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "color"> {
    message: React.ReactNode;
    variant?: SnackbarVariant;
    /** 좌측 아이콘 또는 아바타 */
    leftItem?: React.ReactNode;
    /** 우측: close / chevron / check / ReactNode (Button 등) */
    rightItem?: "close" | "chevron" | "check" | React.ReactNode;
    /** 아이콘 색상 override — Tailwind text 클래스. 미지정 시 variant 기본색 적용 */
    iconColorClass?: string;
    /** 배경색 override — Tailwind bg 클래스 (예: "bg-ac-blue-10") */
    bgColorClass?: string;
    /** 텍스트 색상 override — Tailwind text 클래스 (예: "text-ac-white") */
    textColorClass?: string;
    /** 스낵바 크기 */
    size?: SnackbarSize;
    /**
     * close 버튼 동작 방식
     * - "dismiss": 스낵바 전체 제거 (기본값)
     * - "hide-right": 오른쪽 아이템만 제거, 스낵바는 유지
     */
    closeMode?: "dismiss" | "hide-right";
    onClose?: () => void;
    onAction?: () => void;
}
declare const Snackbar: React.ForwardRefExoticComponent<SnackbarProps & React.RefAttributes<HTMLDivElement>>;

type PaginationType = "simple" | "default";
interface PaginationProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
    /** 전체 페이지 수 */
    total: number;
    /** 현재 페이지 (controlled) */
    page?: number;
    defaultPage?: number;
    onPageChange?: (page: number) => void;
    /** simple: 이전/다음 아이콘만, 중앙에 input 표시 */
    type?: PaginationType;
    /** 비활성화 */
    disabled?: boolean;
    /** 활성 페이지 버튼 배경 색상 — Tailwind bg 클래스 (예: "bg-ac-gray-80", 기본: "bg-ac-primary-50") */
    activeColorClass?: string;
    /** 페이지당 항목 수 선택 표시 */
    showPageSize?: boolean;
    pageSizeOptions?: number[];
    pageSize?: number;
    defaultPageSize?: number;
    onPageSizeChange?: (size: number) => void;
    /** Go to 페이지 점프 입력 표시 */
    showJumper?: boolean;
}
declare const Pagination: React.ForwardRefExoticComponent<PaginationProps & React.RefAttributes<HTMLDivElement>>;

type ProgressType = "linear" | "circular";
type ProgressLinearSize = "sm" | "md" | "lg" | "xl";
type ProgressCircularSize = "xs" | "sm" | "md" | "lg" | "xl";
interface ProgressIndicatorProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "color"> {
    /** 선형 / 원형 */
    type?: ProgressType;
    /** 0 ~ 100 */
    value?: number;
    /** 최대값 (기본 100) */
    max?: number;
    /** 선형 사이즈 */
    linearSize?: ProgressLinearSize;
    /** 원형 사이즈 */
    circularSize?: ProgressCircularSize;
    /** 진행 색상 (기본 ac-primary-50) */
    color?: string;
    /** 트랙 색상 (기본 ac-gray-30) */
    trackColor?: string;
    /** 라벨 텍스트 */
    label?: string;
    /** 퍼센트 표시 여부 */
    showValue?: boolean;
    /** indeterminate (로딩 상태) */
    indeterminate?: boolean;
}
declare const ProgressIndicator: React.ForwardRefExoticComponent<ProgressIndicatorProps & React.RefAttributes<HTMLDivElement>>;

type DropdownAlign = "start" | "center" | "end";
type DropdownSide = "top" | "bottom" | "left" | "right";
interface DropdownProps {
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    side?: DropdownSide;
    align?: DropdownAlign;
    children: React.ReactNode;
}
declare function Dropdown({ open: controlledOpen, defaultOpen, onOpenChange, side, align, children, }: DropdownProps): react_jsx_runtime.JSX.Element;
declare namespace Dropdown {
    var displayName: string;
}
interface DropdownTriggerProps extends React.HTMLAttributes<HTMLElement> {
    asChild?: boolean;
    disabled?: boolean;
}
declare function DropdownTrigger({ children, asChild, disabled, onClick, ...props }: DropdownTriggerProps): react_jsx_runtime.JSX.Element;
declare namespace DropdownTrigger {
    var displayName: string;
}
interface DropdownContentProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
    minWidth?: number | string;
}
declare const DropdownContent: React.ForwardRefExoticComponent<DropdownContentProps & React.RefAttributes<HTMLDivElement>>;
declare const DropdownLabel: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const DropdownSeparator: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
interface DropdownItemProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
    /** 좌측 아이콘 */
    icon?: React.ReactNode;
    /** 우측 단축키 힌트 */
    shortcut?: string;
    /** 외부 링크 아이콘 표시 */
    external?: boolean;
    /** 우측 chevron (sub dropdown용) */
    hasSubmenu?: boolean;
    disabled?: boolean;
    /** small 사이즈 */
    small?: boolean;
    onSelect?: () => void;
}
declare const DropdownItem: React.ForwardRefExoticComponent<DropdownItemProps & React.RefAttributes<HTMLDivElement>>;
interface DropdownCheckboxItemProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
    checked?: boolean;
    defaultChecked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    disabled?: boolean;
    icon?: React.ReactNode;
}
declare const DropdownCheckboxItem: React.ForwardRefExoticComponent<DropdownCheckboxItemProps & React.RefAttributes<HTMLDivElement>>;
interface DropdownRadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
}
declare function DropdownRadioGroup({ value: controlledValue, defaultValue, onValueChange, children, ...props }: DropdownRadioGroupProps): react_jsx_runtime.JSX.Element;
declare namespace DropdownRadioGroup {
    var displayName: string;
}
interface DropdownRadioItemProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
    value: string;
    disabled?: boolean;
    icon?: React.ReactNode;
}
declare const DropdownRadioItem: React.ForwardRefExoticComponent<DropdownRadioItemProps & React.RefAttributes<HTMLDivElement>>;
interface DropdownSubMenuProps {
    id: string;
    trigger: React.ReactNode;
    children: React.ReactNode;
    disabled?: boolean;
}
declare function DropdownSubMenu({ id, trigger, children, disabled }: DropdownSubMenuProps): react_jsx_runtime.JSX.Element;
declare namespace DropdownSubMenu {
    var displayName: string;
}

type DialogSize = "sm" | "md" | "lg";
interface DialogProps {
    /** controlled open 상태 */
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    /** sm(500px) / md(800px) / lg(1000px) */
    size?: DialogSize;
    /** Scrim 클릭 시 닫기 (기본 true) */
    closeOnScrim?: boolean;
    /** ESC 키로 닫기 (기본 true) */
    closeOnEsc?: boolean;
    children?: React.ReactNode;
}
declare function Dialog({ open: controlledOpen, defaultOpen, onOpenChange, size, closeOnScrim, closeOnEsc, children, }: DialogProps): react_jsx_runtime.JSX.Element;
declare namespace Dialog {
    var displayName: string;
}
interface DialogTriggerProps extends React.HTMLAttributes<HTMLElement> {
    asChild?: boolean;
}
declare function DialogTrigger({ children, asChild, onClick, ...props }: DialogTriggerProps): react_jsx_runtime.JSX.Element;
declare namespace DialogTrigger {
    var displayName: string;
}
interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> {
    closeOnScrim?: boolean;
}
declare const DialogContent: React.ForwardRefExoticComponent<DialogContentProps & React.RefAttributes<HTMLDivElement>>;
interface DialogHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
    title?: React.ReactNode;
    subtitle?: React.ReactNode;
    showClose?: boolean;
}
declare const DialogHeader: React.ForwardRefExoticComponent<DialogHeaderProps & React.RefAttributes<HTMLDivElement>>;
declare const DialogBody: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const DialogFooter: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const DialogTitle: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLHeadingElement> & React.RefAttributes<HTMLHeadingElement>>;
declare const DialogDescription: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLParagraphElement> & React.RefAttributes<HTMLParagraphElement>>;
declare function DialogClose({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>): react_jsx_runtime.JSX.Element;
declare namespace DialogClose {
    var displayName: string;
}

type AccordionType = "single" | "multiple";
interface AccordionProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
    type?: AccordionType;
    /** default: 배경 없음 / filled: 배경색 있음 */
    variant?: "default" | "filled";
    /** filled variant 시 배경색 커스텀 (기본: ac-gray-10) */
    backgroundColor?: string;
    /** 모든 AccordionContent에 일괄 적용할 className */
    contentClassName?: string;
    value?: string[];
    defaultValue?: string[];
    onValueChange?: (value: string[]) => void;
}
declare const Accordion: React.ForwardRefExoticComponent<AccordionProps & React.RefAttributes<HTMLDivElement>>;
interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
    value: string;
}
declare const AccordionItem: React.ForwardRefExoticComponent<AccordionItemProps & React.RefAttributes<HTMLDivElement>>;
interface AccordionTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /** plus: +/- 토글 아이콘 (Default) / chevron: 화살표 아이콘 */
    iconType?: "plus" | "chevron";
}
declare const AccordionTrigger: React.ForwardRefExoticComponent<AccordionTriggerProps & React.RefAttributes<HTMLButtonElement>>;
declare const AccordionContent: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;

type CarouselOrientation = "horizontal" | "vertical";
type CarouselNavStyle = "default" | "line" | "border" | "text";
interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
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
declare const Carousel: React.ForwardRefExoticComponent<CarouselProps & React.RefAttributes<HTMLDivElement>>;
interface CarouselContentProps extends React.HTMLAttributes<HTMLDivElement> {
}
declare const CarouselContent: React.ForwardRefExoticComponent<CarouselContentProps & React.RefAttributes<HTMLDivElement>>;
declare const CarouselItem: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
interface CarouselNavButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    navStyle?: CarouselNavStyle;
}
declare const CarouselPrevious: React.ForwardRefExoticComponent<CarouselNavButtonProps & React.RefAttributes<HTMLButtonElement>>;
declare const CarouselNext: React.ForwardRefExoticComponent<CarouselNavButtonProps & React.RefAttributes<HTMLButtonElement>>;
interface CarouselDotsProps extends React.HTMLAttributes<HTMLDivElement> {
    activeColor?: string;
}
declare const CarouselDots: React.ForwardRefExoticComponent<CarouselDotsProps & React.RefAttributes<HTMLDivElement>>;
declare const CarouselCounter: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;

/**
 * Tailwind 클래스를 안전하게 병합합니다.
 * clsx로 조건부 클래스를 처리하고, twMerge로 충돌을 해결합니다.
 *
 * @example
 * cn("px-4 py-2", isActive && "bg-primary", className)
 */
declare function cn(...inputs: ClassValue[]): string;

export { Accordion, AccordionContent, AccordionItem, type AccordionItemProps, type AccordionProps, AccordionTrigger, type AccordionTriggerProps, Avatar, type AvatarProps, Badge, type BadgeProps, type BreadcrumbItem, Breadcrumbs, type BreadcrumbsProps, Button, ButtonGroup, type ButtonGroupProps, type ButtonProps, Card, CardContent, CardDescription, CardFooter, CardFooterButtons, CardFooterInfo, type CardFooterInfoProps, type CardFooterProps, CardFooterUser, type CardFooterUserProps, CardHeader, type CardHeaderProps, CardMenu, type CardMenuProps, type CardProps, CardTitle, Carousel, CarouselContent, type CarouselContentProps, CarouselCounter, CarouselDots, type CarouselDotsProps, CarouselItem, type CarouselNavButtonProps, type CarouselNavStyle, CarouselNext, type CarouselOrientation, CarouselPrevious, type CarouselProps, Checkbox, CheckboxGroup, type CheckboxGroupProps, type CheckboxProps, DatePicker, type DatePickerMode, type DatePickerProps, type DatePickerSize, type DatePickerState, DateRangePicker, type DateRangePickerProps, Dialog, DialogBody, DialogClose, DialogContent, type DialogContentProps, DialogDescription, DialogFooter, DialogHeader, type DialogHeaderProps, type DialogProps, type DialogSize, DialogTitle, DialogTrigger, type DialogTriggerProps, Divider, type DividerProps, Dropdown, type DropdownAlign, DropdownCheckboxItem, type DropdownCheckboxItemProps, DropdownContent, type DropdownContentProps, DropdownItem, type DropdownItemProps, DropdownLabel, type DropdownProps, DropdownRadioGroup, type DropdownRadioGroupProps, DropdownRadioItem, type DropdownRadioItemProps, DropdownSeparator, type DropdownSide, DropdownSubMenu, type DropdownSubMenuProps, DropdownTrigger, type DropdownTriggerProps, FAB, type FABProps, FileInput, type FileInputProps, Pagination, type PaginationProps, type PaginationType, type ProgressCircularSize, ProgressIndicator, type ProgressIndicatorProps, type ProgressLinearSize, type ProgressType, Radio, RadioGroup, type RadioGroupProps, type RadioProps, Select, type SelectOption, type SelectOptionGroup, type SelectProps, type SideNavItem, SideNavigation, type SideNavigationProps, Snackbar, type SnackbarItem, type SnackbarPosition, type SnackbarProps, SnackbarProvider, type SnackbarProviderProps, type SnackbarVariant, Switch, type SwitchProps, TabContent, type TabContentProps, TabList, type TabSize, TabTrigger, type TabTriggerProps, type TabVariant, Tabs, type TabsProps, TextInput, type TextInputProps, Textarea, type TextareaProps, ToggleGroup, ToggleGroupItem, type ToggleGroupItemProps, type ToggleGroupProps, Tooltip, type TooltipProps, avatarVariants, badgeVariants, buttonVariants, cn, fabVariants, useSnackbar };
