"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";
import { ChevronDown, ChevronUp, Check } from "lucide-react";

/* ── Types ─────────────────────────────────────────────────── */
export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface SelectOptionGroup {
  title: string;
  options: SelectOption[];
}

/* ── Trigger Variants ──────────────────────────────────────── */
const selectVariants = cva(
  [
    "flex items-center justify-between w-full rounded-md border bg-background",
    "transition-colors duration-150 cursor-pointer select-none",
    "focus:outline-none",
    "disabled:bg-ac-gray-20 disabled:cursor-not-allowed disabled:opacity-60",
  ],
  {
    variants: {
      size: {
        lg: "h-10 px-3 text-sm",
        md: "h-9 px-3 text-sm",
        sm: "h-[30px] px-2.5 text-xs",
      },
      state: {
        default:  "border-border",
        complete: "border-border",
        focus:    "border-ac-primary-50",
        error:    "border-ac-red-50",
        disable:  "border-border",
      },
    },
    defaultVariants: { size: "md", state: "default" },
  }
);

/* ── Props ─────────────────────────────────────────────────── */
export interface SelectProps extends VariantProps<typeof selectVariants> {
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

/* ── Component ─────────────────────────────────────────────── */
function Select({
  size, state, options = [], groups = [], placeholder = "Select the option",
  value, defaultValue, onValueChange, disabled, label, helperText, errorMessage, className, id,
}: SelectProps) {
  const [open, setOpen] = React.useState(false);
  const [internalValue, setInternalValue] = React.useState(defaultValue ?? "");
  const controlled = value !== undefined;
  const currentValue = controlled ? value : internalValue;
  const inputId = id ?? React.useId();
  const isError = state === "error" || !!errorMessage;
  const resolvedState = isError ? "error" : open ? "focus" : state;

  // 모든 옵션 평탄화
  const allOptions = [
    ...options,
    ...groups.flatMap(g => g.options),
  ];
  const selectedLabel = allOptions.find(o => o.value === currentValue)?.label;

  const handleSelect = (val: string) => {
    if (!controlled) setInternalValue(val);
    onValueChange?.(val);
    setOpen(false);
  };

  // 외부 클릭 시 닫기
  const containerRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="flex flex-col gap-1 w-full" ref={containerRef}>
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-foreground">
          {label}
        </label>
      )}
      <div className="relative">
        <button
          id={inputId}
          type="button"
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-invalid={isError}
          onClick={() => !disabled && setOpen(prev => !prev)}
          className={cn(selectVariants({ size, state: resolvedState }), className)}
        >
          <span className={cn(!selectedLabel && "text-muted-foreground")}>
            {selectedLabel ?? placeholder}
          </span>
          {open
            ? <ChevronUp className="shrink-0 w-4 h-4 text-muted-foreground" />
            : <ChevronDown className="shrink-0 w-4 h-4 text-muted-foreground" />
          }
        </button>

        {open && (
          <ul
            role="listbox"
            className="absolute z-dropdown mt-1 w-full rounded-md border border-border bg-background shadow-sm py-1 max-h-60 overflow-auto"
          >
            {/* 그룹 없는 옵션 */}
            {options.map(opt => (
              <li
                key={opt.value}
                role="option"
                aria-selected={currentValue === opt.value}
                aria-disabled={opt.disabled}
                onClick={() => !opt.disabled && handleSelect(opt.value)}
                className={cn(
                  "flex items-center justify-between px-3 py-2 text-sm cursor-pointer",
                  opt.disabled
                    ? "text-muted-foreground cursor-not-allowed"
                    : "hover:bg-ac-gray-20",
                  currentValue === opt.value && "text-ac-primary-50 font-medium"
                )}
              >
                {opt.label}
                {currentValue === opt.value && <Check className="w-3.5 h-3.5" />}
              </li>
            ))}

            {/* 그룹 옵션 */}
            {groups.map((group, gi) => (
              <React.Fragment key={gi}>
                {(gi > 0 || options.length > 0) && <li role="separator" className="my-1 h-px bg-border" />}
                <li>
                  <p className="px-3 py-1 text-xs font-semibold text-muted-foreground">{group.title}</p>
                  <ul>
                    {group.options.map(opt => (
                      <li
                        key={opt.value}
                        role="option"
                        aria-selected={currentValue === opt.value}
                        aria-disabled={opt.disabled}
                        onClick={() => !opt.disabled && handleSelect(opt.value)}
                        className={cn(
                          "flex items-center justify-between px-3 py-2 text-sm cursor-pointer",
                          opt.disabled
                            ? "text-muted-foreground cursor-not-allowed"
                            : "hover:bg-ac-gray-20",
                          currentValue === opt.value && "text-ac-primary-50 font-medium"
                        )}
                      >
                        {opt.label}
                        {currentValue === opt.value && <Check className="w-3.5 h-3.5" />}
                      </li>
                    ))}
                  </ul>
                </li>
              </React.Fragment>
            ))}
          </ul>
        )}
      </div>

      {(helperText || errorMessage) && (
        <p className={cn("text-xs", isError ? "text-ac-red-50" : "text-muted-foreground")}>
          {errorMessage || helperText}
        </p>
      )}
    </div>
  );
}

export { Select };