"use client";

import * as React from "react";
import { cn } from "@/utils/cn";
import { TextInput } from "@/components/Input/TextInput";

/* ══════════════════════════════════════════════════════════════
   Types
══════════════════════════════════════════════════════════════ */
export type SliderType = "default" | "input" | "with-icon" | "range" | "range-input";

export interface SliderProps {
  type?: SliderType;
  /** thumb/fill 색상 Tailwind 클래스. 예: "bg-ac-blue-50" @default "bg-ac-primary-50" */
  colorClassName?: string;
  min?: number;
  max?: number;
  step?: number;
  /** single: number, range: [number, number] */
  value?: number | [number, number];
  defaultValue?: number | [number, number];
  onValueChange?: (value: number | [number, number]) => void;
  disabled?: boolean;
  /** default / range 타입에서 min/max 레이블 표시 */
  showMinMax?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
}

/* ══════════════════════════════════════════════════════════════
   Helpers
══════════════════════════════════════════════════════════════ */
function clamp(val: number, min: number, max: number) {
  return Math.min(Math.max(val, min), max);
}

function snapToStep(val: number, min: number, step: number) {
  return Math.round((val - min) / step) * step + min;
}

function isRange(type: SliderType) {
  return type === "range" || type === "range-input";
}

/* ══════════════════════════════════════════════════════════════
   SliderCounter — 드래그 중 thumb 위 말풍선
══════════════════════════════════════════════════════════════ */
function SliderCounter({ value }: { value: number }) {
  return (
    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 flex flex-col items-center pointer-events-none select-none">
      <div className="flex items-center justify-center w-[34px] h-6 rounded bg-ac-gray-90 text-ac-white text-xs font-bold">
        {value}
      </div>
      <div className="w-0 h-0 border-l-[5px] border-r-[5px] border-t-[5px] border-l-transparent border-r-transparent border-t-ac-gray-90" />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   SliderTrack — track + range fill + thumbs
══════════════════════════════════════════════════════════════ */
interface SliderTrackProps {
  values: [number, number];
  min: number;
  max: number;
  disabled: boolean;
  activeThumb: number | null;
  onThumbPointerDown: (e: React.PointerEvent, index: number) => void;
  onThumbKeyDown: (e: React.KeyboardEvent, index: number) => void;
  onTrackPointerDown: (e: React.PointerEvent) => void;
  trackRef: React.RefObject<HTMLDivElement>;
  thumbCount: number;
  colorClassName: string;
}

function SliderTrack({
  values, min, max, disabled,
  activeThumb, onThumbPointerDown, onThumbKeyDown, onTrackPointerDown,
  trackRef, thumbCount, colorClassName,
}: SliderTrackProps) {
  const range = max - min;
  const leftPct  = ((values[0] - min) / range) * 100;
  const rightPct = ((values[1] - min) / range) * 100;
  const fillLeft  = thumbCount === 1 ? 0 : leftPct;
  const fillRight = thumbCount === 1 ? leftPct : rightPct;

  return (
    <div
      ref={trackRef}
      className="relative flex-1 flex items-center h-6 cursor-pointer"
      onPointerDown={disabled ? undefined : onTrackPointerDown}
    >
      {/* Track 배경 */}
      <div className="absolute inset-x-0 h-1.5 rounded-md bg-ac-gray-30" />

      {/* Fill */}
      <div
        className={cn(
          "absolute h-1.5 rounded-md",
          disabled ? "bg-ac-gray-40" : colorClassName,
          !disabled && activeThumb === null && "opacity-50"
        )}
        style={{ left: `${fillLeft}%`, right: `${100 - fillRight}%` }}
      />

      {/* Thumbs */}
      {Array.from({ length: thumbCount }).map((_, i) => {
        const val = i === 0 ? values[0] : values[1];
        const pct = ((val - min) / range) * 100;
        const isActive = activeThumb === i;

        return (
          <div
            key={i}
            className="absolute top-1/2"
            style={{ left: `${pct}%`, transform: "translate(-50%, -50%)" }}
          >
            {isActive && (
              <div className={cn("absolute w-9 h-9 rounded-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 pointer-events-none opacity-20", colorClassName)} />
            )}
            <div
              role="slider"
              aria-valuemin={min}
              aria-valuemax={max}
              aria-valuenow={val}
              aria-disabled={disabled}
              tabIndex={disabled ? -1 : 0}
              className={cn(
                "relative w-6 h-6 rounded-full shadow-md select-none cursor-grab active:cursor-grabbing",
                disabled ? "bg-ac-gray-40 cursor-not-allowed" : colorClassName
              )}
              onPointerDown={disabled ? undefined : (e) => onThumbPointerDown(e, i)}
              onKeyDown={disabled ? undefined : (e) => onThumbKeyDown(e, i)}
            >
              {isActive && <SliderCounter value={val} />}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   Slider (Root)
══════════════════════════════════════════════════════════════ */
function Slider({
  type = "default",
  colorClassName = "bg-ac-primary-50",
  min = 0,
  max = 100,
  step = 1,
  value: controlledValue,
  defaultValue,
  onValueChange,
  disabled = false,
  showMinMax = false,
  leftIcon,
  rightIcon,
  className,
}: SliderProps) {
  const range = isRange(type);
  const thumbCount = range ? 2 : 1;
  const hasInput = type === "input" || type === "range-input";

  const toInternal = (v?: number | [number, number]): [number, number] => {
    if (v === undefined) return range ? [min, max] : [Math.round((min + max) / 2), max];
    if (Array.isArray(v)) return [v[0], v[1]];
    return [v, max];
  };

  const [internalValues, setInternalValues] = React.useState<[number, number]>(
    () => toInternal(defaultValue ?? controlledValue)
  );

  const controlled = controlledValue !== undefined;
  const values = controlled ? toInternal(controlledValue) : internalValues;

  // stale closure 방지용 ref
  const valuesRef = React.useRef(values);
  valuesRef.current = values;

  const setValues = React.useCallback((next: [number, number]) => {
    if (!controlled) setInternalValues(next);
    if (range) {
      onValueChange?.([next[0], next[1]]);
    } else {
      onValueChange?.(next[0]);
    }
  }, [controlled, range, onValueChange]);

  // input 로컬 string state (input / range-input 타입용)
  const [inputStr0, setInputStr0] = React.useState(String(values[0]));
  const [inputStr1, setInputStr1] = React.useState(String(values[1]));

  // 드래그 중에만 input 동기화 (타이핑 중 덮어쓰기 방지)
  const draggingIndex = React.useRef<number | null>(null);
  React.useEffect(() => {
    if (!hasInput) return;
    if (draggingIndex.current !== null) {
      setInputStr0(String(values[0]));
      setInputStr1(String(values[1]));
    }
  }, [values[0], values[1], hasInput]);

  const trackRef = React.useRef<HTMLDivElement>(null!);
  const [activeThumb, setActiveThumb] = React.useState<number | null>(null);

  const pxToValue = React.useCallback((clientX: number): number => {
    const rect = trackRef.current?.getBoundingClientRect();
    if (!rect) return min;
    const pct = clamp((clientX - rect.left) / rect.width, 0, 1);
    const raw = min + pct * (max - min);
    return clamp(snapToStep(raw, min, step), min, max);
  }, [min, max, step]);

  // ref 기반 pointermove — stale closure 없음
  const handlePointerMove = React.useCallback((e: PointerEvent) => {
    const idx = draggingIndex.current;
    if (idx === null) return;
    const cur = valuesRef.current;
    const newVal = pxToValue(e.clientX);
    const next: [number, number] = [cur[0], cur[1]];
    if (idx === 0) {
      next[0] = range ? Math.min(newVal, cur[1]) : newVal;
    } else {
      next[1] = Math.max(newVal, cur[0]);
    }
    setValues(next);
    if (hasInput) {
      if (idx === 0) setInputStr0(String(next[0]));
      else setInputStr1(String(next[1]));
    }
  }, [pxToValue, range, setValues, hasInput]);

  const handlePointerUp = React.useCallback(() => {
    draggingIndex.current = null;
    setActiveThumb(null);
    window.removeEventListener("pointermove", handlePointerMove);
    window.removeEventListener("pointerup", handlePointerUp);
  }, [handlePointerMove]);

  const startDrag = React.useCallback((idx: number) => {
    draggingIndex.current = idx;
    setActiveThumb(idx);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
  }, [handlePointerMove, handlePointerUp]);

  const nearestThumb = React.useCallback((clientX: number): number => {
    if (thumbCount === 1) return 0;
    const rect = trackRef.current?.getBoundingClientRect();
    if (!rect) return 0;
    const pct = (clientX - rect.left) / rect.width;
    const cur = valuesRef.current;
    const p0 = (cur[0] - min) / (max - min);
    const p1 = (cur[1] - min) / (max - min);
    return Math.abs(pct - p0) <= Math.abs(pct - p1) ? 0 : 1;
  }, [thumbCount, min, max]);

  const handleThumbPointerDown = (e: React.PointerEvent, idx: number) => {
    e.preventDefault();
    e.stopPropagation();
    startDrag(idx);
  };

  const handleTrackPointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    const cur = valuesRef.current;
    const idx = nearestThumb(e.clientX);
    const newVal = pxToValue(e.clientX);
    const next: [number, number] = [cur[0], cur[1]];
    if (idx === 0) {
      next[0] = range ? Math.min(newVal, cur[1]) : newVal;
    } else {
      next[1] = Math.max(newVal, cur[0]);
    }
    setValues(next);
    if (hasInput) {
      if (idx === 0) setInputStr0(String(next[0]));
      else setInputStr1(String(next[1]));
    }
    startDrag(idx);
  };

  const handleThumbKeyDown = (e: React.KeyboardEvent, idx: number) => {
    const delta = e.shiftKey ? step * 10 : step;
    const cur = valuesRef.current;
    let newVal = idx === 0 ? cur[0] : cur[1];

    if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      e.preventDefault();
      newVal = clamp(snapToStep(newVal + delta, min, step), min, max);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      e.preventDefault();
      newVal = clamp(snapToStep(newVal - delta, min, step), min, max);
    } else if (e.key === "Home") {
      e.preventDefault(); newVal = min;
    } else if (e.key === "End") {
      e.preventDefault(); newVal = max;
    } else return;

    const next: [number, number] = [cur[0], cur[1]];
    if (idx === 0) next[0] = range ? Math.min(newVal, cur[1]) : newVal;
    else next[1] = Math.max(newVal, cur[0]);
    setValues(next);
    if (hasInput) {
      if (idx === 0) setInputStr0(String(next[0]));
      else setInputStr1(String(next[1]));
    }
  };

  const commitInput = (idx: number, raw: string) => {
    const num = parseInt(raw, 10);
    if (isNaN(num)) {
      // 유효하지 않으면 현재 슬라이더 값으로 되돌림
      if (idx === 0) setInputStr0(String(valuesRef.current[0]));
      else setInputStr1(String(valuesRef.current[1]));
      return;
    }
    const val = clamp(snapToStep(num, min, step), min, max);
    const cur = valuesRef.current;
    const next: [number, number] = [cur[0], cur[1]];
    if (idx === 0) next[0] = range ? Math.min(val, cur[1]) : val;
    else next[1] = Math.max(val, cur[0]);
    setValues(next);
    if (idx === 0) setInputStr0(String(next[0]));
    else setInputStr1(String(next[1]));
  };

  const track = (
    <SliderTrack
      values={values}
      min={min}
      max={max}
      disabled={disabled}
      activeThumb={activeThumb}
      onThumbPointerDown={handleThumbPointerDown}
      onThumbKeyDown={handleThumbKeyDown}
      onTrackPointerDown={handleTrackPointerDown}
      trackRef={trackRef}
      thumbCount={thumbCount}
      colorClassName={colorClassName}
    />
  );

  return (
    <div
      className={cn(
        "flex items-center gap-3 w-full",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      {type === "with-icon" && leftIcon && (
        <span className="shrink-0 w-3 h-3 flex items-center justify-center text-foreground">{leftIcon}</span>
      )}
      {type === "range-input" && (
        <div className="shrink-0 w-[60px]">
          <TextInput
            type="number"
            size="lg"
            value={inputStr0}
            disabled={disabled}
            onChange={(e) => setInputStr0(e.target.value)}
            onBlur={(e) => commitInput(0, e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") commitInput(0, (e.target as HTMLInputElement).value); }}
          />
        </div>
      )}
      {(type === "default" || type === "range") && showMinMax && (
        <span className="shrink-0 text-sm text-foreground">{min}</span>
      )}

      {track}

      {type === "with-icon" && rightIcon && (
        <span className="shrink-0 w-6 h-6 flex items-center justify-center text-foreground">{rightIcon}</span>
      )}
      {type === "input" && (
        <div className="shrink-0 w-[60px]">
          <TextInput
            type="number"
            size="lg"
            value={inputStr0}
            disabled={disabled}
            onChange={(e) => setInputStr0(e.target.value)}
            onBlur={(e) => commitInput(0, e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") commitInput(0, (e.target as HTMLInputElement).value); }}
          />
        </div>
      )}
      {type === "range-input" && (
        <div className="shrink-0 w-[60px]">
          <TextInput
            type="number"
            size="lg"
            value={inputStr1}
            disabled={disabled}
            onChange={(e) => setInputStr1(e.target.value)}
            onBlur={(e) => commitInput(1, e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") commitInput(1, (e.target as HTMLInputElement).value); }}
          />
        </div>
      )}
      {(type === "default" || type === "range") && showMinMax && (
        <span className="shrink-0 text-sm text-foreground">{max}</span>
      )}
    </div>
  );
}

Slider.displayName = "Slider";

export { Slider };
