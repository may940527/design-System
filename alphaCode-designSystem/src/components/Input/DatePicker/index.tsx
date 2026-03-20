"use client";

import * as React from "react";
import { DayPicker, type DateRange, getDefaultClassNames } from "react-day-picker";
import { ko } from "date-fns/locale";
import { format, isValid } from "date-fns";
import { cn } from "@/utils/cn";
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";

/* ── Types ─────────────────────────────────────────────────── */
export type DatePickerMode  = "single" | "range";
export type DatePickerView  = "day" | "month" | "year";
export type DatePickerSize  = "sm" | "md" | "lg";
export type DatePickerState = "default" | "complete" | "error" | "disable";
export type { DateRange };

/* ── Input size / state helpers ────────────────ihnen────────── */
const inputSizeClass: Record<DatePickerSize, string> = {
  lg: "h-10 px-3 text-sm",
  md: "h-9 px-3 text-sm",
  sm: "h-[30px] px-2.5 text-xs",
};
const inputStateClass: Record<DatePickerState, string> = {
  default:  "border-border",
  complete: "border-border",
  error:    "border-ac-red-50",
  disable:  "border-border opacity-60",
};

/* ── Shared DayPicker classNames ───────────────────────────── */
function getDayPickerClassNames() {
  const defaultClassNames = getDefaultClassNames();
  return {
    ...defaultClassNames,
    root:            "w-[280px]",
    months:          "flex flex-col",
    month:           "space-y-3",
    month_caption:   "flex items-center justify-between px-1 mb-1",
    caption_label:   "hidden",
    nav:             "flex items-center gap-1",
    button_previous: "p-1 rounded hover:bg-ac-gray-20 transition-colors",
    button_next:     "p-1 rounded hover:bg-ac-gray-20 transition-colors",
    weeks:           "w-full border-collapse",
    weekdays:        "flex",
    weekday:         "text-muted-foreground w-9 text-center text-xs font-medium",
    week:            "flex w-full mt-1",
    day:             "relative p-0 text-center text-sm",
    day_button:      cn(
      "h-9 w-9 rounded-full text-sm font-normal transition-colors",
      "hover:bg-ac-gray-20 focus:outline-none focus:ring-2 focus:ring-ring"
    ),
    selected:        "bg-ac-primary-50 text-white rounded-full hover:bg-ac-primary-60",
    today:           "text-ac-primary-50 font-semibold",
    outside:         "text-muted-foreground opacity-50",
    disabled:        "text-muted-foreground opacity-30 cursor-not-allowed",
    range_start:     "bg-ac-primary-50 text-white rounded-full",
    range_end:       "bg-ac-primary-50 text-white rounded-full",
    range_middle:    "bg-ac-primary-10 text-foreground rounded-none",
  };
}

/* ── MonthCaption (공통) ───────────────────────────────────── */
function MonthCaptionComponent({
  calendarMonth,
  onViewChange,
  setDisplayMonth,
}: {
  calendarMonth: { date: Date };
  onViewChange?: (v: DatePickerView) => void;
  setDisplayMonth: React.Dispatch<React.SetStateAction<Date>>;
}) {
  return (
    <div className="flex items-center justify-between w-full px-1">
      <div className="flex items-center gap-1">
        <button type="button" onClick={() => onViewChange?.("year")}
          className="text-sm font-semibold hover:text-ac-primary-50 transition-colors">
          {calendarMonth.date.getFullYear()}년
        </button>
        <button type="button" onClick={() => onViewChange?.("month")}
          className="text-sm font-semibold hover:text-ac-primary-50 transition-colors">
          {calendarMonth.date.getMonth() + 1}월
        </button>
      </div>
      <div className="flex items-center gap-1">
        <button type="button"
          onClick={() => setDisplayMonth(d => new Date(d.getFullYear(), d.getMonth() - 1, 1))}
          className="p-1 rounded hover:bg-ac-gray-20">
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button type="button"
          onClick={() => setDisplayMonth(d => new Date(d.getFullYear(), d.getMonth() + 1, 1))}
          className="p-1 rounded hover:bg-ac-gray-20">
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   SingleCalendar — 달력 1개
══════════════════════════════════════════════════════════════ */
interface SingleCalendarProps {
  selected?: Date;
  onSelect?: (date?: Date) => void;
  view?: DatePickerView;
  onViewChange?: (v: DatePickerView) => void;
}

function SingleCalendar({ selected, onSelect, view = "day", onViewChange }: SingleCalendarProps) {
  const [displayMonth, setDisplayMonth] = React.useState<Date>(selected ?? new Date());
  const [yearPage, setYearPage] = React.useState(Math.floor(displayMonth.getFullYear() / 9) * 9);
  const MONTHS_KO = ["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"];

  if (view === "year") {
    const years = Array.from({ length: 9 }, (_, i) => yearPage + i);
    return (
      <div className="p-3 w-[280px]">
        <div className="flex items-center justify-between mb-3">
          <button type="button" onClick={() => setYearPage(y => y - 9)} className="p-1 rounded hover:bg-ac-gray-20"><ChevronLeft className="w-4 h-4" /></button>
          <span className="text-sm font-semibold">{yearPage} – {yearPage + 8}</span>
          <button type="button" onClick={() => setYearPage(y => y + 9)} className="p-1 rounded hover:bg-ac-gray-20"><ChevronRight className="w-4 h-4" /></button>
        </div>
        <div className="grid grid-cols-3 gap-1">
          {years.map(y => (
            <button key={y} type="button"
              onClick={() => { setDisplayMonth(new Date(y, displayMonth.getMonth(), 1)); onViewChange?.("month"); }}
              className={cn("rounded-md py-2 text-sm font-medium transition-colors", selected?.getFullYear() === y ? "bg-ac-primary-50 text-white" : "hover:bg-ac-gray-20")}
            >{y}</button>
          ))}
        </div>
      </div>
    );
  }

  if (view === "month") {
    return (
      <div className="p-3 w-[280px]">
        <div className="flex items-center justify-between mb-3">
          <button type="button" onClick={() => onViewChange?.("year")} className="p-1 rounded hover:bg-ac-gray-20"><ChevronLeft className="w-4 h-4" /></button>
          <button type="button" onClick={() => onViewChange?.("year")} className="text-sm font-semibold hover:text-ac-primary-50 transition-colors">
            {displayMonth.getFullYear()}년
          </button>
          <div className="w-6" />
        </div>
        <div className="grid grid-cols-3 gap-1">
          {MONTHS_KO.map((m, i) => (
            <button key={i} type="button"
              onClick={() => { setDisplayMonth(new Date(displayMonth.getFullYear(), i, 1)); onViewChange?.("day"); }}
              className={cn("rounded-md py-2 text-sm font-medium transition-colors", selected?.getMonth() === i ? "bg-ac-primary-50 text-white" : "hover:bg-ac-gray-20")}
            >{m}</button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-3">
      <DayPicker
        mode="single"
        selected={selected}
        onSelect={onSelect}
        month={displayMonth}
        onMonthChange={setDisplayMonth}
        locale={ko}
        showOutsideDays
        classNames={getDayPickerClassNames()}
        components={{
          Chevron: ({ orientation }) => orientation === "left" ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />,
          MonthCaption: ({ calendarMonth }) => (
            <MonthCaptionComponent calendarMonth={calendarMonth} onViewChange={onViewChange} setDisplayMonth={setDisplayMonth} />
          ),
        }}
      />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   RangeCalendar — 달력 2개 나란히
══════════════════════════════════════════════════════════════ */
interface RangeCalendarProps {
  selected?: DateRange;
  onSelect?: (range?: DateRange) => void;
  onConfirm?: () => void;
}

function RangeCalendar({ selected, onSelect, onConfirm }: RangeCalendarProps) {
  const startMonth = selected?.from ?? new Date();
  const [displayMonth, setDisplayMonth] = React.useState<Date>(
    new Date(startMonth.getFullYear(), startMonth.getMonth(), 1)
  );
  const nextMonth = new Date(displayMonth.getFullYear(), displayMonth.getMonth() + 1, 1);

  return (
    <div className="p-3">
      <div className="flex gap-4">
        {/* 왼쪽 달력 */}
        <div>
          {/* 왼쪽 헤더 */}
          <div className="flex items-center justify-between px-1 mb-3">
            <button type="button"
              onClick={() => setDisplayMonth(d => new Date(d.getFullYear(), d.getMonth() - 1, 1))}
              className="p-1 rounded hover:bg-ac-gray-20">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-sm font-semibold">
              {displayMonth.getFullYear()}년 {displayMonth.getMonth() + 1}월
            </span>
            <div className="w-6" />
          </div>
          <DayPicker
            mode="range"
            selected={selected}
            onSelect={onSelect}
            month={displayMonth}
            onMonthChange={() => {}}
            locale={ko}
            showOutsideDays
            hideNavigation
            classNames={getDayPickerClassNames()}
            components={{
              Chevron: ({ orientation }) => orientation === "left" ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />,
            }}
          />
        </div>

        <div className="w-px bg-border" />

        {/* 오른쪽 달력 */}
        <div>
          {/* 오른쪽 헤더 */}
          <div className="flex items-center justify-between px-1 mb-3">
            <div className="w-6" />
            <span className="text-sm font-semibold">
              {nextMonth.getFullYear()}년 {nextMonth.getMonth() + 1}월
            </span>
            <button type="button"
              onClick={() => setDisplayMonth(d => new Date(d.getFullYear(), d.getMonth() + 1, 1))}
              className="p-1 rounded hover:bg-ac-gray-20">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <DayPicker
            mode="range"
            selected={selected}
            onSelect={onSelect}
            month={nextMonth}
            onMonthChange={() => {}}
            locale={ko}
            showOutsideDays
            hideNavigation
            classNames={getDayPickerClassNames()}
            components={{
              Chevron: ({ orientation }) => orientation === "left" ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />,
            }}
          />
        </div>
      </div>

      {onConfirm && (
        <div className="flex justify-end mt-2 pt-2 border-t border-border">
          <button type="button" onClick={onConfirm}
            className="px-4 py-1.5 text-sm font-medium bg-ac-primary-50 text-white rounded-md hover:bg-ac-primary-60 transition-colors">
            확인
          </button>
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   DatePicker (Single) — 달력 1개
══════════════════════════════════════════════════════════════ */
export interface DatePickerProps {
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
  className?: string;
  id?: string;
}

function DatePicker({
  value, defaultValue, onChange,
  size = "md", state = "default",
  label, helperText, errorMessage,
  placeholder = "날짜를 선택해주세요.",
  dateFormat = "yyyy년 MM월 dd일",
  disabled, className, id,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);
  const [internalValue, setInternalValue] = React.useState<Date | undefined>(defaultValue);
  const [view, setView] = React.useState<DatePickerView>("day");
  const controlled = value !== undefined;
  const currentValue = controlled ? value : internalValue;

  const inputId = id ?? React.useId();
  const isError = state === "error" || !!errorMessage;
  const resolvedState = isError ? "error" : state;

  const containerRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false); setView("day");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSelect = (date?: Date) => {
    if (!controlled) setInternalValue(date);
    onChange?.(date);
    setOpen(false); setView("day");
  };

  return (
    <div className="flex flex-col gap-1 w-full" ref={containerRef}>
      {label && <label htmlFor={inputId} className="text-sm font-medium text-foreground">{label}</label>}
      <div className="relative">
        <button id={inputId} type="button" disabled={disabled}
          onClick={() => !disabled && setOpen(o => !o)}
          aria-haspopup="dialog" aria-expanded={open} aria-invalid={isError}
          className={cn(
            "flex items-center justify-between w-full rounded-md border bg-background transition-colors",
            inputSizeClass[size], inputStateClass[resolvedState],
            disabled && "cursor-not-allowed", !currentValue && "text-muted-foreground", className
          )}
        >
          <span>{currentValue && isValid(currentValue) ? format(currentValue, dateFormat, { locale: ko }) : placeholder}</span>
          <CalendarIcon className="w-4 h-4 shrink-0 text-muted-foreground" />
        </button>
        {open && (
          <div className="absolute z-dropdown mt-1 rounded-md border border-border bg-background shadow-lg">
            <SingleCalendar selected={currentValue} onSelect={handleSelect} view={view} onViewChange={setView} />
          </div>
        )}
      </div>
      {(helperText || errorMessage) && (
        <p className={cn("text-xs", isError ? "text-ac-red-50" : "text-muted-foreground")}>{errorMessage || helperText}</p>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   DateRangePicker — 달력 2개
══════════════════════════════════════════════════════════════ */
export interface DateRangePickerProps {
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
  className?: string;
  id?: string;
}

function DateRangePicker({
  value, defaultValue, onChange,
  size = "md", state = "default",
  label, helperText, errorMessage,
  startPlaceholder = "시작일", endPlaceholder = "종료일",
  dateFormat = "yyyy-MM-dd",
  disabled, className, id,
}: DateRangePickerProps) {
  const [open, setOpen] = React.useState(false);
  const [internalValue, setInternalValue] = React.useState<DateRange | undefined>(defaultValue);
  const [tempRange, setTempRange] = React.useState<DateRange | undefined>(defaultValue);
  const controlled = value !== undefined;
  const currentValue = controlled ? value : internalValue;

  const inputId = id ?? React.useId();
  const isError = state === "error" || !!errorMessage;
  const resolvedState = isError ? "error" : state;

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

  const handleOpen = () => {
    if (disabled) return;
    setTempRange(currentValue);
    setOpen(o => !o);
  };

  const handleConfirm = () => {
    if (!controlled) setInternalValue(tempRange);
    onChange?.(tempRange);
    setOpen(false);
  };

  const fmt = (d?: Date) => d && isValid(d) ? format(d, dateFormat, { locale: ko }) : undefined;

  return (
    <div className="flex flex-col gap-1 w-full" ref={containerRef}>
      {label && <label htmlFor={inputId} className="text-sm font-medium text-foreground">{label}</label>}
      <div className="relative">
        <button id={inputId} type="button" disabled={disabled} onClick={handleOpen}
          aria-haspopup="dialog" aria-expanded={open} aria-invalid={isError}
          className={cn(
            "flex items-center justify-between w-full rounded-md border bg-background transition-colors gap-2",
            inputSizeClass[size], inputStateClass[resolvedState],
            disabled && "cursor-not-allowed", className
          )}
        >
          <span className={cn(!currentValue?.from && "text-muted-foreground")}>{fmt(currentValue?.from) ?? startPlaceholder}</span>
          <span className="text-muted-foreground shrink-0">~</span>
          <span className={cn(!currentValue?.to && "text-muted-foreground")}>{fmt(currentValue?.to) ?? endPlaceholder}</span>
          <CalendarIcon className="w-4 h-4 shrink-0 text-muted-foreground ml-auto" />
        </button>
        {open && (
          <div className="absolute z-dropdown mt-1 rounded-md border border-border bg-background shadow-lg">
            <RangeCalendar selected={tempRange} onSelect={setTempRange} onConfirm={handleConfirm} />
          </div>
        )}
      </div>
      {(helperText || errorMessage) && (
        <p className={cn("text-xs", isError ? "text-ac-red-50" : "text-muted-foreground")}>{errorMessage || helperText}</p>
      )}
    </div>
  );
}

export { DatePicker, DateRangePicker };