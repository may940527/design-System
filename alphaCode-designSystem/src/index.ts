"use client";

// ── Components ────────────────────────────────────────────────
export { Button, buttonVariants }           from "@/components/Button";
export { ButtonGroup }                      from "@/components/Button/ButtonGroup";
export { FAB, fabVariants }                 from "@/components/Button/FAB";
export type { ButtonProps }                 from "@/components/Button";
export type { ButtonGroupProps }            from "@/components/Button/ButtonGroup";
export type { FABProps }                    from "@/components/Button/FAB";

export { Badge, badgeVariants }             from "@/components/Badge";
export type { BadgeProps }                  from "@/components/Badge";

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
}                                           from "@/components/Card";
export type { CardProps, CardMenuProps, CardHeaderProps, CardFooterProps, CardFooterUserProps, CardFooterInfoProps } from "@/components/Card";

// ── Divider
export { Divider }                          from "@/components/Divider";
export type { DividerProps }                from "@/components/Divider";

// ── Checkbox
export { Checkbox }                         from "@/components/Input/Checkbox";
export type { CheckboxProps }               from "@/components/Input/Checkbox";
export { CheckboxGroup }                    from "@/components/Input/Checkbox";
export type { CheckboxGroupProps }          from "@/components/Input/Checkbox";

// ── Radio
export { Radio, RadioGroup }                from "@/components/Input/Radio";
export type { RadioProps, RadioGroupProps } from "@/components/Input/Radio";

// ── Breadcrumbs
export { Breadcrumbs }                      from "@/components/Breadcrumbs";
export type { BreadcrumbsProps, BreadcrumbItem } from "@/components/Breadcrumbs";

// ── Avatar
export { Avatar, avatarVariants }           from "@/components/Avatar";
export type { AvatarProps }                 from "@/components/Avatar";

// ── DatePicker
export { DatePicker, DateRangePicker }      from "@/components/Input/DatePicker";
export type { DatePickerProps, DateRangePickerProps, DateRange, DatePickerMode, DatePickerSize, DatePickerState } from "@/components/Input/DatePicker";

// ── TextInput
export { TextInput }                        from "@/components/Input/TextInput";
export type { TextInputProps }              from "@/components/Input/TextInput";

// ── Textarea
export { Textarea }                         from "@/components/Input/Textarea";
export type { TextareaProps }               from "@/components/Input/Textarea";

// ── Select
export { Select }                           from "@/components/Input/Select";
export type { SelectProps, SelectOption, SelectOptionGroup } from "@/components/Input/Select";

// ── FileInput
export { FileInput }                        from "@/components/Input/FileInput";
export type { FileInputProps }              from "@/components/Input/FileInput";

// ── Switch
export { Switch }                           from "@/components/Input/Switch";
export type { SwitchProps }                 from "@/components/Input/Switch";

// ── ToggleGroup
export { ToggleGroup, ToggleGroupItem }     from "@/components/ToggleGroup";
export type { ToggleGroupProps, ToggleGroupItemProps } from "@/components/ToggleGroup";

// ── Tooltip
export { Tooltip }                          from "@/components/Tooltip";
export type { TooltipProps }                from "@/components/Tooltip";

// ── SideNavigation
export { SideNavigation } from "@/components/SideNavigation";
export type { SideNavigationProps, SideNavItem } from "@/components/SideNavigation";

// ── Tab
export { Tabs, TabList, TabTrigger, TabContent } from "@/components/Tab";
export type { TabsProps, TabTriggerProps, TabContentProps, TabSize, TabVariant } from "@/components/Tab";

// ── Snackbar
export { Snackbar, SnackbarProvider, useSnackbar } from "@/components/Snackbar";
export type { SnackbarProps, SnackbarProviderProps, SnackbarItem, SnackbarVariant, SnackbarPosition } from "@/components/Snackbar";

// ── Pagination
export { Pagination } from "@/components/Pagination";
export type { PaginationProps, PaginationType } from "@/components/Pagination";

// ── ProgressIndicator
export { ProgressIndicator } from "@/components/ProgressIndicator";
export type { ProgressIndicatorProps, ProgressType, ProgressLinearSize, ProgressCircularSize } from "@/components/ProgressIndicator";

// ── Dropdown
export { Dropdown, DropdownTrigger, DropdownContent, DropdownLabel, DropdownSeparator, DropdownItem, DropdownCheckboxItem, DropdownRadioGroup, DropdownRadioItem, DropdownAvatarHeader, DropdownAvatarItem, DropdownSubMenu } from "@/components/Dropdown";
export type { DropdownProps, DropdownTriggerProps, DropdownContentProps, DropdownItemProps, DropdownCheckboxItemProps, DropdownRadioGroupProps, DropdownRadioItemProps, DropdownAvatarHeaderProps, DropdownAvatarItemProps, DropdownSubMenuProps, DropdownAlign, DropdownSide } from "@/components/Dropdown";

// ── Dialog
export { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogBody, DialogFooter, DialogTitle, DialogDescription, DialogClose } from "@/components/Dialog";
export type { DialogProps, DialogTriggerProps, DialogContentProps, DialogHeaderProps, DialogSize } from "@/components/Dialog";

// ── Accordion
export { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/Accordion";
export type { AccordionProps, AccordionItemProps, AccordionTriggerProps } from "@/components/Accordion";

// ── Carousel
export { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, CarouselDots, CarouselCounter } from "@/components/Carousel";
export type { CarouselProps, CarouselContentProps, CarouselNavButtonProps, CarouselDotsProps, CarouselOrientation, CarouselNavStyle } from "@/components/Carousel";

// ── Slider
export { Slider } from "@/components/Slider";
export type { SliderProps, SliderType } from "@/components/Slider";

// ── StepIndicator
export { StepIndicator } from "@/components/StepIndicator";
export type { StepIndicatorProps, StepIndicatorType, StepIndicatorStyle, StepIndicatorSize, StepItem } from "@/components/StepIndicator";

// ── Utilities ─────────────────────────────────────────────────
export { cn }                               from "@/utils/cn";

// ── Tokens (re-export for convenience) ────────────────────────
export * from "@/tokens";
export * from "lucide-react";