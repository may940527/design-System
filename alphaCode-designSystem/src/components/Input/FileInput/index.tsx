import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";
import { X } from "lucide-react";

/* ── Variants ──────────────────────────────────────────────── */
const fileInputVariants = cva(
  [
    "flex items-center w-full rounded-md border bg-background transition-colors duration-150",
    "has-[:disabled]:bg-ac-gray-20 has-[:disabled]:opacity-60",
  ],
  {
    variants: {
      size: {
        lg: "h-10 text-sm",
        md: "h-9 text-sm",
        sm: "h-[30px] text-xs",
      },
      state: {
        default:  "border-border",
        complete: "border-border",
        error:    "border-ac-red-50",
        disable:  "border-border",
      },
    },
    defaultVariants: { size: "md", state: "default" },
  }
);

/* ── Props ─────────────────────────────────────────────────── */
export interface FileInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type">,
    VariantProps<typeof fileInputVariants> {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  triggerLabel?: string;
}

/* ── Component ─────────────────────────────────────────────── */
const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>(
  ({ className, size, state, label, helperText, errorMessage, triggerLabel = "파일 선택", multiple, disabled, id, onChange, ...props }, ref) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const resolvedRef = (ref as React.RefObject<HTMLInputElement>) || inputRef;
    const inputId = id ?? React.useId();
    const isError = state === "error" || !!errorMessage;
    const resolvedState = isError ? "error" : state;

    const [fileLabel, setFileLabel] = React.useState<string>("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (!files || files.length === 0) {
        setFileLabel("");
        return;
      }
      if (multiple && files.length > 1) {
        setFileLabel(`${files.length}개 파일`);
      } else {
        setFileLabel(files[0].name);
      }
      onChange?.(e);
    };

    const handleReset = () => {
      if (resolvedRef.current) resolvedRef.current.value = "";
      setFileLabel("");
    };

    return (
      <div className="flex flex-col gap-1 w-full">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-foreground">
            {label}
          </label>
        )}
        <div className={cn(fileInputVariants({ size, state: resolvedState }), className)}>
          {/* 파일 선택 버튼 */}
          <button
            type="button"
            disabled={disabled}
            onClick={() => resolvedRef.current?.click()}
            className={cn(
              "shrink-0 font-medium text-ac-primary-50 px-3 h-full border-r border-border",
              "hover:text-ac-primary-60 disabled:cursor-not-allowed transition-colors",
              size === "sm" ? "text-xs px-2.5" : "text-sm"
            )}
          >
            {triggerLabel}
          </button>

          {/* 파일명 표시 */}
          <span className={cn("flex-1 px-3 truncate", !fileLabel && "text-muted-foreground")}>
            {fileLabel || "파일을 선택해주세요."}
          </span>

          {/* 리셋 버튼 */}
          {fileLabel && !disabled && (
            <button
              type="button"
              onClick={handleReset}
              className="shrink-0 px-3 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="파일 초기화"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}

          <input
            ref={resolvedRef}
            id={inputId}
            type="file"
            multiple={multiple}
            disabled={disabled}
            className="sr-only"
            onChange={handleChange}
            aria-invalid={isError}
            {...props}
          />
        </div>

        {(helperText || errorMessage) && (
          <p className={cn("text-xs", isError ? "text-ac-red-50" : "text-muted-foreground")}>
            {errorMessage || helperText}
          </p>
        )}
      </div>
    );
  }
);

FileInput.displayName = "FileInput";

export { FileInput };