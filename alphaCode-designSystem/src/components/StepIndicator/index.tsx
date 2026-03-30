"use client";

import * as React from "react";
import { cn } from "@/utils/cn";
import { Check, Ellipsis } from "lucide-react";

/* ══════════════════════════════════════════════════════════════
   Types
══════════════════════════════════════════════════════════════ */
export interface StepItem {
  title?: string;
  stepText?: string;
}

export type StepIndicatorType  = "horizontal" | "vertical";
export type StepIndicatorStyle = "default" | "simple";
export type StepIndicatorSize  = "sm" | "md" | "lg";

export interface StepIndicatorProps {
  steps: StepItem[];
  /** 0-based 현재 진행 중인 단계 인덱스 */
  current: number;
  type?: StepIndicatorType;
  /** default: 아이콘 + 텍스트 / simple: 아이콘만 */
  style?: StepIndicatorStyle;
  size?: StepIndicatorSize;
  /** 단계 숫자 텍스트 표시 여부 */
  showStepText?: boolean;
  /**
   * 활성/완료 색상 Tailwind text 클래스
   * bg-current / border-current로 내부에서 파생됨
   * @default "text-ac-primary-50"
   */
  colorClassName?: string;
  className?: string;
}

type StepState = "complete" | "current" | "before";

const sizeConfig = {
  sm: {
    complete:    { outer: "w-3 h-3",   check: "w-2 h-2" },
    current:     { outer: "w-4 h-4",   inner: "w-2.5 h-2.5", ellipsis: "w-2 h-2" },
    before:      { outer: "w-3 h-3",   dot: "w-2 h-2" },
    iconRowH:    "h-4",
    iconColW:    "w-4",
    vertLineMin: "min-h-[32px]",
    textSize:    "text-xs",
    stepTextSize:"text-xs",
    titleMt:     "mt-2",
    vertPb:      "pb-6",
  },
  md: {
    complete:    { outer: "w-4 h-4",   check: "w-2.5 h-2.5" },
    current:     { outer: "w-5 h-5",   inner: "w-3 h-3",     ellipsis: "w-2.5 h-2.5" },
    before:      { outer: "w-4 h-4",   dot: "w-2.5 h-2.5" },
    iconRowH:    "h-5",
    iconColW:    "w-5",
    vertLineMin: "min-h-[40px]",
    textSize:    "text-sm",
    stepTextSize:"text-sm",
    titleMt:     "mt-3",
    vertPb:      "pb-8",
  },
  lg: {
    complete:    { outer: "w-5 h-5",   check: "w-3 h-3" },
    current:     { outer: "w-6 h-6",   inner: "w-4 h-4",     ellipsis: "w-3 h-3" },
    before:      { outer: "w-5 h-5",   dot: "w-3 h-3" },
    iconRowH:    "h-6",
    iconColW:    "w-6",
    vertLineMin: "min-h-[48px]",
    textSize:    "text-base",
    stepTextSize:"text-sm",
    titleMt:     "mt-3",
    vertPb:      "pb-10",
  },
};

/* ══════════════════════════════════════════════════════════════
   StepIcon
══════════════════════════════════════════════════════════════ */
function StepIcon({ state, size }: { state: StepState; size: StepIndicatorSize }) {
  const cfg = sizeConfig[size];

  if (state === "complete") {
    return (
      <div className={cn("rounded-full bg-current flex items-center justify-center shrink-0", cfg.complete.outer)}>
        <Check className={cn("text-white", cfg.complete.check)} strokeWidth={3} />
      </div>
    );
  }
  if (state === "current") {
    return (
      <div className={cn("rounded-full border-[1.2px] border-current flex items-center justify-center shrink-0", cfg.current.outer)}>
        <div className={cn("rounded-full bg-current flex items-center justify-center", cfg.current.inner)}>
          <Ellipsis className={cn("text-white", cfg.current.ellipsis)} strokeWidth={2.5} />
        </div>
      </div>
    );
  }
  // before
  return (
    <div className={cn("rounded-full bg-ac-gray-30 flex items-center justify-center shrink-0", cfg.before.outer)}>
      <div className={cn("rounded-full bg-ac-gray-40", cfg.before.dot)} />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   StepIndicator
══════════════════════════════════════════════════════════════ */
function StepIndicator({
  steps,
  current,
  type = "horizontal",
  style = "default",
  size = "md",
  showStepText = false,
  colorClassName = "text-ac-primary-50",
  className,
}: StepIndicatorProps) {
  const cfg = sizeConfig[size];

  const getState = (index: number): StepState => {
    if (index < current) return "complete";
    if (index === current) return "current";
    return "before";
  };

  if (type === "horizontal") {
    return (
      <div className={cn("flex w-full", colorClassName, className)}>
        {steps.map((step, i) => {
          const state = getState(i);
          const isFirst = i === 0;
          const isLast = i === steps.length - 1;

          return (
            <div key={i} className="flex-1 flex flex-col items-center">
              {/* 아이콘 + 좌우 연결선 */}
              <div className={cn("flex items-center w-full", cfg.iconRowH)}>
                <div
                  className={cn(
                    "flex-1 h-px",
                    isFirst ? "invisible" : getState(i - 1) === "complete" ? "bg-current" : "bg-ac-gray-40"
                  )}
                />
                <StepIcon state={state} size={size} />
                <div
                  className={cn(
                    "flex-1 h-px",
                    isLast ? "invisible" : state === "complete" ? "bg-current" : "bg-ac-gray-40"
                  )}
                />
              </div>
              {showStepText && (
                <span className={cn("font-medium text-muted-foreground mt-1", cfg.stepTextSize)}>
                  {step.stepText ?? `${i + 1}단계`}
                </span>
              )}
              {style === "default" && step.title && (
                <span className={cn("font-medium text-foreground text-center", cfg.textSize, showStepText ? "mt-0.5" : cfg.titleMt)}>
                  {step.title}
                </span>
              )}
            </div>
          );
        })}
      </div>
    );
  }

  // vertical
  return (
    <div className={cn("flex flex-col", colorClassName, className)}>
      {steps.map((step, i) => {
        const state = getState(i);
        const isLast = i === steps.length - 1;

        return (
          <div key={i} className="flex gap-3">
            {/* 아이콘 + 수직 연결선 */}
            <div className={cn("flex flex-col items-center shrink-0", cfg.iconColW)}>
              <StepIcon state={state} size={size} />
              {!isLast && (
                <div
                  className={cn(
                    "w-px flex-1",
                    cfg.vertLineMin,
                    state === "complete" ? "bg-current" : "bg-ac-gray-40"
                  )}
                />
              )}
            </div>

            {/* 텍스트 */}
            <div className={cn("flex flex-col gap-1", !isLast && cfg.vertPb)}>
              {showStepText && (
                <span className={cn("font-medium text-muted-foreground leading-5", cfg.stepTextSize)}>
                  {step.stepText ?? `${i + 1}단계`}
                </span>
              )}
              {style === "default" && step.title && (
                <span className={cn("font-medium text-foreground leading-5", cfg.textSize)}>
                  {step.title}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

StepIndicator.displayName = "StepIndicator";

export { StepIndicator };
