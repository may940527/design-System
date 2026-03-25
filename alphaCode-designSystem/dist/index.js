"use client";
import {
  borderRadius,
  breakpoints,
  colors,
  fontSize,
  fontWeight,
  lineHeight,
  spacing,
  zIndex
} from "./chunk-B3GK7NX4.js";

// src/components/Button/index.tsx
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

// src/utils/cn.tsx
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// src/components/Button/index.tsx
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
var buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "font-medium transition-colors duration-normal select-none",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-40"
  ],
  {
    variants: {
      variant: {
        primary: "bg-ac-primary-50 text-ac-white rounded-md hover:bg-ac-primary-60 active:bg-ac-primary-70",
        secondary: "bg-ac-gray-90 text-ac-white rounded-md hover:bg-ac-gray-80 active:bg-ac-gray-70",
        tertiary: "bg-ac-gray-20 text-foreground rounded-md hover:bg-ac-gray-30 active:bg-ac-gray-40",
        link: "bg-transparent text-foreground rounded-md hover:text-ac-primary-50 underline-offset-4 hover:underline",
        icon: "bg-transparent text-foreground rounded-md border border-border hover:bg-ac-gray-20 active:bg-ac-gray-30"
      },
      size: {
        xl: "h-[54px] px-6 text-base",
        lg: "h-[48px] px-5 text-base",
        md: "h-[40px] px-4 text-sm",
        sm: "h-[36px] px-3 text-sm",
        xs: "h-[30px] px-3 text-xs",
        "icon-xl": "h-[54px] w-[54px] p-0 rounded-md",
        "icon-lg": "h-[48px] w-[48px] p-0 rounded-md",
        "icon-md": "h-[40px] w-[40px] p-0 rounded-md",
        "icon-sm": "h-[36px] w-[36px] p-0 rounded-md",
        "icon-xs": "h-[30px] w-[30px] p-0 rounded-sm"
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "md"
    }
  }
);
var iconSizeMap = {
  xl: "h-5 w-5",
  lg: "h-5 w-5",
  md: "h-4 w-4",
  sm: "h-4 w-4",
  xs: "h-3 w-3",
  "icon-xl": "h-5 w-5",
  "icon-lg": "h-5 w-5",
  "icon-md": "h-4 w-4",
  "icon-sm": "h-4 w-4",
  "icon-xs": "h-3 w-3"
};
function getIconSizeClass(size) {
  return iconSizeMap[size ?? "md"] ?? "h-4 w-4";
}
var Spinner = ({ className }) => /* @__PURE__ */ jsxs(
  "svg",
  {
    className: cn("animate-spin shrink-0", className),
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    "aria-hidden": "true",
    children: [
      /* @__PURE__ */ jsx(
        "circle",
        {
          className: "opacity-25",
          cx: "12",
          cy: "12",
          r: "10",
          stroke: "currentColor",
          strokeWidth: "4"
        }
      ),
      /* @__PURE__ */ jsx(
        "path",
        {
          className: "opacity-75",
          fill: "currentColor",
          d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
        }
      )
    ]
  }
);
function cloneIconWithSize(icon, sizeClass) {
  if (!React.isValidElement(icon)) return icon;
  const el = icon;
  return React.cloneElement(el, {
    className: cn(el.props.className, sizeClass)
  });
}
var Button = React.forwardRef(
  ({
    className,
    variant,
    size,
    asChild = false,
    loading = false,
    leftIcon,
    rightIcon,
    children,
    disabled,
    colorClassName,
    fullWidth = false,
    ...props
  }, ref) => {
    const Comp = asChild ? Slot : "button";
    const isIconVariant = variant === "icon";
    const iconSizeClass = getIconSizeClass(size);
    const styledLeftIcon = leftIcon ? cloneIconWithSize(leftIcon, iconSizeClass) : null;
    const styledRightIcon = rightIcon ? cloneIconWithSize(rightIcon, iconSizeClass) : null;
    const styledChildren = isIconVariant ? cloneIconWithSize(children, iconSizeClass) : children;
    return /* @__PURE__ */ jsx(
      Comp,
      {
        ref,
        className: cn(buttonVariants({ variant, size }), colorClassName, fullWidth && "w-full", className),
        disabled: disabled || loading,
        "aria-busy": loading,
        ...props,
        children: loading ? (
          // 아이콘 variant는 스피너만, 나머지는 스피너 + children
          isIconVariant ? /* @__PURE__ */ jsx(Spinner, { className: iconSizeClass }) : /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(Spinner, { className: iconSizeClass }),
            children
          ] })
        ) : asChild ? React.isValidElement(children) ? React.cloneElement(children, {
          children: /* @__PURE__ */ jsxs(Fragment, { children: [
            styledLeftIcon && /* @__PURE__ */ jsx("span", { className: "shrink-0 flex items-center", "aria-hidden": "true", children: styledLeftIcon }),
            children.props.children,
            styledRightIcon && /* @__PURE__ */ jsx("span", { className: "shrink-0 flex items-center", "aria-hidden": "true", children: styledRightIcon })
          ] })
        }) : children : /* @__PURE__ */ jsxs(Fragment, { children: [
          styledLeftIcon && /* @__PURE__ */ jsx("span", { className: "shrink-0 flex items-center", "aria-hidden": "true", children: styledLeftIcon }),
          styledChildren,
          styledRightIcon && /* @__PURE__ */ jsx("span", { className: "shrink-0 flex items-center", "aria-hidden": "true", children: styledRightIcon })
        ] })
      }
    );
  }
);
Button.displayName = "Button";

// src/components/Button/ButtonGroup.tsx
import * as React2 from "react";
import { cva as cva2 } from "class-variance-authority";
import { jsx as jsx2 } from "react/jsx-runtime";
var buttonGroupVariants = cva2(
  "flex",
  {
    variants: {
      direction: {
        // 수평 — 강조 버튼은 우측
        horizontal: "flex-row items-center",
        // 수직 — 강조 버튼은 첫 번째, 모든 버튼 width 동일
        vertical: "flex-col w-full [&>*]:w-full"
      },
      gap: {
        sm: "",
        // 버튼 2개: gap-2 (8px) — children 수에 따라 자동
        md: ""
        // 버튼 3개 이상: gap-3 (12px)
      }
    },
    defaultVariants: {
      direction: "horizontal"
    }
  }
);
function ButtonGroup({
  className,
  direction = "horizontal",
  children,
  ...props
}) {
  const count = React2.Children.count(children);
  const gapClass = count <= 2 ? "gap-2" : "gap-3";
  return /* @__PURE__ */ jsx2(
    "div",
    {
      className: cn(
        buttonGroupVariants({ direction }),
        gapClass,
        className
      ),
      ...props,
      children
    }
  );
}

// src/components/Button/FAB.tsx
import * as React4 from "react";
import { cva as cva3 } from "class-variance-authority";

// src/components/Tooltip/index.tsx
import * as React3 from "react";
import { jsx as jsx3, jsxs as jsxs2 } from "react/jsx-runtime";
var placementStyles = {
  "top-left": { tooltip: "bottom-full left-0 mb-2", arrow: "top-full left-3 border-t-ac-gray-90" },
  "top-center": { tooltip: "bottom-full left-1/2 -translate-x-1/2 mb-2", arrow: "top-full left-1/2 -translate-x-1/2 border-t-ac-gray-90" },
  "top-right": { tooltip: "bottom-full right-0 mb-2", arrow: "top-full right-3 border-t-ac-gray-90" },
  "bottom-left": { tooltip: "top-full left-0 mt-2", arrow: "bottom-full left-3 border-b-ac-gray-90" },
  "bottom-center": { tooltip: "top-full left-1/2 -translate-x-1/2 mt-2", arrow: "bottom-full left-1/2 -translate-x-1/2 border-b-ac-gray-90" },
  "bottom-right": { tooltip: "top-full right-0 mt-2", arrow: "bottom-full right-3 border-b-ac-gray-90" }
};
function Tooltip({ content, placement = "top-center", children, className }) {
  const [visible, setVisible] = React3.useState(false);
  const { tooltip, arrow } = placementStyles[placement];
  const isTop = placement.startsWith("top");
  return /* @__PURE__ */ jsxs2(
    "div",
    {
      className: "relative inline-flex",
      onMouseEnter: () => setVisible(true),
      onMouseLeave: () => setVisible(false),
      onFocus: () => setVisible(true),
      onBlur: () => setVisible(false),
      children: [
        children,
        visible && /* @__PURE__ */ jsxs2(
          "div",
          {
            role: "tooltip",
            className: cn(
              "absolute z-tooltip w-max max-w-xs",
              "px-3 py-2 rounded-md text-xs text-white bg-ac-gray-90 shadow-md",
              tooltip,
              className
            ),
            children: [
              content,
              /* @__PURE__ */ jsx3(
                "span",
                {
                  className: cn(
                    "absolute w-0 h-0 border-4 border-transparent",
                    isTop ? "border-t-ac-gray-90" : "border-b-ac-gray-90",
                    arrow
                  )
                }
              )
            ]
          }
        )
      ]
    }
  );
}

// src/components/Button/FAB.tsx
import { jsx as jsx4, jsxs as jsxs3 } from "react/jsx-runtime";
var fabVariants = cva3(
  [
    "group inline-flex items-center justify-center shrink-0",
    "rounded-full font-medium select-none",
    "transition-[width,padding] duration-200 ease-in-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-40"
  ],
  {
    variants: {
      variant: {
        primary: "bg-ac-primary-50 text-ac-white hover:bg-ac-primary-60 active:bg-ac-primary-70",
        secondary: "bg-ac-gray-90 text-ac-white hover:bg-ac-gray-80 active:bg-ac-gray-70",
        tertiary: "bg-ac-gray-20 text-foreground border border-border hover:bg-ac-gray-30 active:bg-ac-gray-40"
      },
      size: {
        lg: "h-[48px] shadow-lg hover:shadow-xl",
        md: "h-[40px] shadow-md hover:shadow-lg"
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "lg"
    }
  }
);
var iconSizeMap2 = {
  lg: "h-6 w-6",
  md: "h-5 w-5"
};
function getIconSizeClass2(size) {
  return iconSizeMap2[size ?? "lg"] ?? "h-6 w-6";
}
function cloneIconWithSize2(icon, sizeClass) {
  if (!React4.isValidElement(icon)) return icon;
  const el = icon;
  return React4.cloneElement(el, {
    className: cn(el.props.className, sizeClass)
  });
}
var FAB = React4.forwardRef(
  ({
    className,
    variant,
    size,
    children,
    label,
    expandOnHover,
    tooltip,
    tooltipPlacement = "top-center",
    fixed = false,
    position = "bottom-6 right-6",
    colorClassName,
    ...props
  }, ref) => {
    const isExtended = !!label && !expandOnHover;
    const isExpandable = !!label && !!expandOnHover;
    const hasTooltip = !!tooltip && !label;
    const iconSizeClass = getIconSizeClass2(size);
    const styledIcon = cloneIconWithSize2(children, iconSizeClass);
    const roundedClass = !!label ? "rounded-2xl" : "rounded-full";
    const pxBase = size === "md" ? "px-4" : "px-6";
    const wBase = size === "md" ? "w-[40px]" : "w-[48px]";
    const minWBase = size === "md" ? "min-w-[40px]" : "min-w-[48px]";
    const labelSpan = isExpandable ? /* @__PURE__ */ jsx4(
      "span",
      {
        className: cn(
          "whitespace-nowrap",
          "max-w-0 opacity-0",
          "transition-[max-width,opacity,margin] duration-200 ease-in-out",
          "group-hover:max-w-[200px] group-hover:opacity-100",
          expandOnHover === "left" ? "group-hover:mx-2" : "group-hover:mx-2"
        ),
        children: label
      }
    ) : null;
    const button = /* @__PURE__ */ jsxs3(
      "button",
      {
        ref,
        className: cn(
          fabVariants({ variant, size }),
          roundedClass,
          !isExtended && !isExpandable && wBase,
          isExtended && cn(pxBase, "gap-2"),
          isExpandable && cn(
            minWBase,
            "px-3",
            "transition-[padding] duration-200",
            "hover:px-4",
            expandOnHover === "left" ? "flex-row-reverse" : "flex-row"
          ),
          colorClassName,
          fixed && `fixed z-modal ${position}`,
          className
        ),
        ...props,
        children: [
          labelSpan,
          /* @__PURE__ */ jsx4("span", { className: "shrink-0 flex items-center", "aria-hidden": "true", children: styledIcon }),
          isExtended && /* @__PURE__ */ jsx4("span", { className: "whitespace-nowrap", children: label })
        ]
      }
    );
    if (hasTooltip) {
      return /* @__PURE__ */ jsx4(Tooltip, { content: tooltip, placement: tooltipPlacement, children: button });
    }
    return button;
  }
);
FAB.displayName = "FAB";

// src/components/Badge/index.tsx
import { cva as cva4 } from "class-variance-authority";
import { jsx as jsx5, jsxs as jsxs4 } from "react/jsx-runtime";
var badgeVariants = cva4(
  "inline-flex items-center gap-1 font-medium whitespace-nowrap select-none rounded-xl border",
  {
    variants: {
      variant: {
        // ── 상태 정보 배지 ──────────────────────────────────
        complete: "bg-ac-green-10 text-ac-green-60 border-ac-green-40",
        success: "bg-ac-blue-10 text-ac-blue-60 border-ac-blue-40",
        warning: "bg-ac-orange-10 text-ac-orange-60 border-ac-orange-40",
        fail: "bg-ac-red-10 text-ac-red-60 border-ac-red-40",
        // ── 기타 메타 배지 ──────────────────────────────────
        primary: "bg-ac-white text-ac-primary-50 border-ac-primary-40",
        default: "bg-ac-gray-30 text-ac-gray-80 border-ac-gray-70"
      },
      size: {
        xs: "h-[16px] px-1 text-[10px]",
        sm: "h-[20px] px-1.5 text-xs",
        md: "h-[26px] px-2 text-xs",
        lg: "h-[32px] px-3 text-sm"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
);
function Badge({ className, variant, size, icon, children, ...props }) {
  return /* @__PURE__ */ jsxs4("span", { className: cn(badgeVariants({ variant, size }), className), ...props, children: [
    icon && /* @__PURE__ */ jsx5("span", { className: "shrink-0 flex items-center", "aria-hidden": "true", children: icon }),
    children
  ] });
}

// src/components/Card/index.tsx
import * as React8 from "react";
import { cva as cva9 } from "class-variance-authority";

// src/components/Divider/index.tsx
import { cva as cva5 } from "class-variance-authority";
import { jsx as jsx6 } from "react/jsx-runtime";
var dividerVariants = cva5("shrink-0 bg-border", {
  variants: {
    orientation: {
      horizontal: "w-full h-px",
      vertical: "h-full w-px"
    },
    variant: {
      solid: "",
      dashed: "bg-transparent border-border"
    },
    inset: {
      true: "",
      false: ""
    }
  },
  compoundVariants: [
    { orientation: "horizontal", inset: true, class: "mx-4 w-[calc(100%-2rem)]" },
    { orientation: "vertical", inset: true, class: "my-4 h-[calc(100%-2rem)]" },
    { variant: "dashed", orientation: "horizontal", class: "border-t border-dashed h-0" },
    { variant: "dashed", orientation: "vertical", class: "border-l border-dashed w-0" }
  ],
  defaultVariants: {
    orientation: "horizontal",
    variant: "solid",
    inset: false
  }
});
function Divider({ className, orientation, variant, inset, ...props }) {
  return /* @__PURE__ */ jsx6(
    "div",
    {
      role: "separator",
      "aria-orientation": orientation ?? "horizontal",
      className: cn(dividerVariants({ orientation, variant, inset }), className),
      ...props
    }
  );
}

// src/components/Input/Checkbox/index.tsx
import * as React5 from "react";
import { cva as cva6 } from "class-variance-authority";
import { jsx as jsx7, jsxs as jsxs5 } from "react/jsx-runtime";
var checkboxVariants = cva6(
  [
    "shrink-0 rounded-xs border transition-colors duration-normal",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "disabled:cursor-not-allowed disabled:opacity-40",
    "cursor-pointer appearance-none relative",
    "border-ac-gray-40 bg-ac-white",
    "hover:border-[--checkbox-color]",
    "checked:bg-[--checkbox-color] checked:border-[--checkbox-color]",
    "indeterminate:bg-[--checkbox-color] indeterminate:border-[--checkbox-color]"
  ],
  {
    variants: {
      size: {
        md: "h-3 w-3",
        lg: "h-[18px] w-[18px]",
        xl: "h-6 w-6"
      }
    },
    defaultVariants: {
      size: "lg"
    }
  }
);
function CheckIcon({ size }) {
  const dim = size === "md" ? 8 : size === "xl" ? 16 : 12;
  return /* @__PURE__ */ jsx7(
    "svg",
    {
      width: dim,
      height: dim,
      viewBox: "0 0 12 12",
      fill: "none",
      className: "absolute inset-0 m-auto pointer-events-none text-white",
      "aria-hidden": "true",
      children: /* @__PURE__ */ jsx7("path", { d: "M2 6l3 3 5-5", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" })
    }
  );
}
function IndeterminateIcon({ size }) {
  const dim = size === "md" ? 8 : size === "xl" ? 16 : 12;
  return /* @__PURE__ */ jsx7(
    "svg",
    {
      width: dim,
      height: dim,
      viewBox: "0 0 12 12",
      fill: "none",
      className: "absolute inset-0 m-auto pointer-events-none text-white",
      "aria-hidden": "true",
      children: /* @__PURE__ */ jsx7("path", { d: "M2 6h8", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" })
    }
  );
}
var Checkbox = React5.forwardRef(
  ({ className, size, label, description, indeterminate = false, checkedColor, id, style, ...props }, ref) => {
    const inputRef = React5.useRef(null);
    const resolvedRef = ref || inputRef;
    const inputId = id ?? React5.useId();
    React5.useEffect(() => {
      if (resolvedRef.current) {
        resolvedRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate, resolvedRef]);
    return /* @__PURE__ */ jsxs5("div", { className: "inline-flex items-start gap-2", children: [
      /* @__PURE__ */ jsxs5("div", { className: "relative flex items-center", children: [
        /* @__PURE__ */ jsx7(
          "input",
          {
            ref: resolvedRef,
            id: inputId,
            type: "checkbox",
            className: cn(checkboxVariants({ size }), className),
            style: {
              ["--checkbox-color"]: checkedColor ?? "#FF6300",
              ...style
            },
            ...props
          }
        ),
        indeterminate ? /* @__PURE__ */ jsx7(IndeterminateIcon, { size }) : /* @__PURE__ */ jsx7(CheckIcon, { size })
      ] }),
      (label || description) && /* @__PURE__ */ jsxs5("div", { className: "flex flex-col gap-0.5", children: [
        label && /* @__PURE__ */ jsx7("label", { htmlFor: inputId, className: "text-sm font-medium text-foreground cursor-pointer leading-none", children: label }),
        description && /* @__PURE__ */ jsx7("p", { className: "text-xs text-muted-foreground", children: description })
      ] })
    ] });
  }
);
Checkbox.displayName = "Checkbox";
function CheckboxGroup({ title, direction = "vertical", className, children, ...props }) {
  return /* @__PURE__ */ jsxs5("fieldset", { className: cn("flex flex-col gap-2", className), ...props, children: [
    title && /* @__PURE__ */ jsx7("legend", { className: "text-sm font-semibold text-foreground mb-2", children: title }),
    /* @__PURE__ */ jsx7("div", { className: cn("flex gap-3", direction === "vertical" ? "flex-col" : "flex-row flex-wrap"), children })
  ] });
}

// src/components/Input/Radio/index.tsx
import * as React6 from "react";
import { cva as cva7 } from "class-variance-authority";
import { jsx as jsx8, jsxs as jsxs6 } from "react/jsx-runtime";
var radioVariants = cva7(
  [
    "shrink-0 rounded-full border transition-colors duration-150",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "disabled:cursor-not-allowed disabled:opacity-40",
    "cursor-pointer appearance-none relative",
    "border-ac-gray-40 bg-ac-white",
    "hover:border-[--radio-color]",
    "checked:border-[--radio-color]"
  ],
  {
    variants: {
      size: {
        md: "h-3 w-3",
        lg: "h-[18px] w-[18px]",
        xl: "h-6 w-6"
      }
    },
    defaultVariants: {
      size: "lg"
    }
  }
);
var Radio = React6.forwardRef(
  ({ className, size, label, description, checkedColor, id, style, ...props }, ref) => {
    const inputId = id ?? React6.useId();
    const dotSize = size === "md" ? 6 : size === "xl" ? 12 : 8;
    return /* @__PURE__ */ jsxs6("div", { className: "inline-flex items-start gap-2", children: [
      /* @__PURE__ */ jsxs6("div", { className: "relative flex items-center justify-center", children: [
        /* @__PURE__ */ jsx8(
          "input",
          {
            ref,
            id: inputId,
            type: "radio",
            className: cn("peer", radioVariants({ size }), className),
            style: {
              ["--radio-color"]: checkedColor ?? "#FF6300",
              ...style
            },
            ...props
          }
        ),
        /* @__PURE__ */ jsx8(
          "span",
          {
            style: {
              width: dotSize,
              height: dotSize,
              backgroundColor: checkedColor ?? "#FF6300"
            },
            className: "absolute rounded-full pointer-events-none scale-0 peer-checked:scale-100 transition-transform duration-150",
            "aria-hidden": "true"
          }
        )
      ] }),
      (label || description) && /* @__PURE__ */ jsxs6("div", { className: "flex flex-col gap-0.5", children: [
        label && /* @__PURE__ */ jsx8("label", { htmlFor: inputId, className: "text-sm font-medium text-foreground cursor-pointer leading-none", children: label }),
        description && /* @__PURE__ */ jsx8("p", { className: "text-xs text-muted-foreground", children: description })
      ] })
    ] });
  }
);
Radio.displayName = "Radio";
function RadioGroup({ title, direction = "vertical", className, children, ...props }) {
  return /* @__PURE__ */ jsxs6("fieldset", { className: cn("flex flex-col gap-2", className), ...props, children: [
    title && /* @__PURE__ */ jsx8("legend", { className: "text-sm font-semibold text-foreground mb-2", children: title }),
    /* @__PURE__ */ jsx8("div", { className: cn("flex gap-3", direction === "vertical" ? "flex-col" : "flex-row flex-wrap"), children })
  ] });
}

// src/components/Input/Switch/index.tsx
import * as React7 from "react";
import { cva as cva8 } from "class-variance-authority";
import { jsx as jsx9, jsxs as jsxs7 } from "react/jsx-runtime";
var switchTrackVariants = cva8(
  [
    "relative inline-flex shrink-0 cursor-pointer",
    "transition-colors duration-200 ease-in-out",
    "border-border border",
    "disabled:cursor-not-allowed disabled:opacity-40",
    "bg-ac-gray-30 rounded-lg",
    "data-[state=checked]:bg-white"
  ],
  {
    variants: {
      size: {
        lg: "h-5 w-9",
        md: "h-4 w-[30px]"
      }
    },
    defaultVariants: { size: "lg" }
  }
);
var switchThumbVariants = cva8(
  [
    "pointer-events-none inline-block rounded-full",
    "shadow-md translate-y-[-1px] ",
    "transition-all duration-200 ease-in-out",
    "translate-x-0",
    "bg-ac-gray-50",
    "data-[state=checked]:bg-[--switch-color]"
  ],
  {
    variants: {
      size: {
        lg: "h-5 w-5 data-[state=checked]:translate-x-4",
        md: "h-4 w-4 data-[state=checked]:translate-x-[14px]"
      }
    },
    defaultVariants: { size: "lg" }
  }
);
var Switch = React7.forwardRef(
  ({ className, size, checked, defaultChecked, onCheckedChange, activeColor, label, disabled, id, style, ...props }, ref) => {
    const [isChecked, setIsChecked] = React7.useState(defaultChecked ?? false);
    const controlled = checked !== void 0;
    const state = (controlled ? checked : isChecked) ? "checked" : "unchecked";
    const inputId = id ?? React7.useId();
    const handleClick = () => {
      if (disabled) return;
      const next = state !== "checked";
      if (!controlled) setIsChecked(next);
      onCheckedChange?.(next);
    };
    return /* @__PURE__ */ jsxs7("div", { className: "inline-flex items-center gap-2", children: [
      /* @__PURE__ */ jsx9(
        "button",
        {
          ref,
          id: inputId,
          type: "button",
          role: "switch",
          "aria-checked": state === "checked",
          "data-state": state,
          disabled,
          onClick: handleClick,
          className: cn(switchTrackVariants({ size }), className),
          style: {
            ["--switch-color"]: activeColor ?? "#FF6300",
            ...style
          },
          ...props,
          children: /* @__PURE__ */ jsx9(
            "span",
            {
              "data-state": state,
              className: cn(switchThumbVariants({ size }))
            }
          )
        }
      ),
      label && /* @__PURE__ */ jsx9("label", { htmlFor: inputId, className: "text-sm font-medium text-foreground cursor-pointer", children: label })
    ] });
  }
);
Switch.displayName = "Switch";

// src/components/Card/index.tsx
import { Fragment as Fragment2, jsx as jsx10, jsxs as jsxs8 } from "react/jsx-runtime";
var cardVariants = cva9(
  [
    "relative flex flex-col rounded-lg bg-card text-card-foreground overflow-hidden",
    "transition-all duration-normal"
  ],
  {
    variants: {
      variant: {
        /** 배경색만, 테두리·그림자 없음 */
        background: "bg-card",
        /** 테두리 */
        line: "border border-border",
        /** 그림자 */
        shadow: ""
      },
      interactive: {
        true: [
          "cursor-pointer",
          "active:border active:border-ac-primary-50"
        ],
        false: ""
      }
    },
    defaultVariants: {
      variant: "line",
      interactive: false
    }
  }
);
var shadowSizeMap = {
  xs: "shadow-xs",
  sm: "shadow-sm",
  md: "shadow-md",
  lg: "shadow-lg",
  xl: "shadow-xl",
  "2xl": "shadow-2xl"
};
var Card = React8.forwardRef(
  ({ className, variant, interactive, shadowSize = "md", ...props }, ref) => /* @__PURE__ */ jsx10(
    "div",
    {
      ref,
      className: cn(
        cardVariants({ variant, interactive }),
        variant === "shadow" && shadowSizeMap[shadowSize],
        className
      ),
      ...props
    }
  )
);
Card.displayName = "Card";
var CardMenu = React8.forwardRef(
  ({ className, children, ...props }, ref) => /* @__PURE__ */ jsx10(
    Button,
    {
      ref,
      variant: "icon",
      size: "icon-sm",
      className: cn("absolute top-2 right-2 border-none text-muted-foreground", className),
      ...props,
      children: children ?? /* @__PURE__ */ jsxs8("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "currentColor", "aria-hidden": "true", children: [
        /* @__PURE__ */ jsx10("circle", { cx: "8", cy: "3", r: "1.2" }),
        /* @__PURE__ */ jsx10("circle", { cx: "8", cy: "8", r: "1.2" }),
        /* @__PURE__ */ jsx10("circle", { cx: "8", cy: "13", r: "1.2" })
      ] })
    }
  )
);
CardMenu.displayName = "CardMenu";
function CardHeaderControl(props) {
  if (!props.control || props.control === "none") return null;
  if (props.control === "menu") {
    return /* @__PURE__ */ jsx10(CardMenu, { onClick: props.onMenuClick });
  }
  if (props.control === "checkbox") {
    return /* @__PURE__ */ jsx10(
      Checkbox,
      {
        size: "lg",
        checked: props.checked,
        defaultChecked: props.defaultChecked,
        onChange: (e) => props.onCheckedChange?.(e.target.checked),
        className: "mt-0.5"
      }
    );
  }
  if (props.control === "radio") {
    return /* @__PURE__ */ jsx10(
      Radio,
      {
        size: "lg",
        checked: props.checked,
        onChange: props.onChange,
        name: props.name,
        value: props.value,
        className: "mt-0.5"
      }
    );
  }
  if (props.control === "switch") {
    return /* @__PURE__ */ jsx10(
      Switch,
      {
        size: "md",
        checked: props.checked,
        defaultChecked: props.defaultChecked,
        onCheckedChange: props.onCheckedChange
      }
    );
  }
  return null;
}
var CONTROL_PROP_KEYS = [
  "control",
  "onMenuClick",
  "onCheckedChange",
  "onChange",
  "name",
  "value",
  "checked",
  "defaultChecked",
  "imageSrc",
  "imageAlt",
  "avatar",
  "title",
  "subtitle",
  "badge"
];
function omitControlProps(props) {
  const result = {};
  for (const key in props) {
    if (!CONTROL_PROP_KEYS.includes(key)) {
      result[key] = props[key];
    }
  }
  return result;
}
var CardHeader = React8.forwardRef(
  (props, ref) => {
    const p = props;
    const {
      className,
      imageSrc,
      imageAlt,
      avatar,
      title,
      subtitle,
      badge,
      children,
      control
    } = p;
    const controlProps = {
      control,
      onMenuClick: p.onMenuClick,
      onCheckedChange: p.onCheckedChange,
      onChange: p.onChange,
      name: p.name,
      value: p.value,
      checked: p.checked,
      defaultChecked: p.defaultChecked
    };
    const rest = omitControlProps(p);
    if (imageSrc) {
      return /* @__PURE__ */ jsxs8("div", { ref, className: cn("relative", className), ...rest, children: [
        /* @__PURE__ */ jsx10(
          "img",
          {
            src: imageSrc,
            alt: imageAlt ?? "",
            className: "w-full aspect-video object-cover"
          }
        ),
        /* @__PURE__ */ jsxs8("div", { className: "absolute top-3 right-3 flex items-center gap-1.5", children: [
          badge,
          /* @__PURE__ */ jsx10(CardHeaderControl, { ...controlProps })
        ] }),
        children
      ] });
    }
    return /* @__PURE__ */ jsxs8("div", { ref, className: cn("flex items-start gap-3 px-4 pt-4 pb-0", className), ...rest, children: [
      avatar && /* @__PURE__ */ jsx10("div", { className: "shrink-0", children: avatar }),
      /* @__PURE__ */ jsxs8("div", { className: "flex-1 min-w-0", children: [
        title && /* @__PURE__ */ jsx10("p", { className: "text-sm font-semibold text-foreground leading-snug line-clamp-1", children: title }),
        subtitle && /* @__PURE__ */ jsx10("p", { className: "text-xs text-muted-foreground mt-0.5 line-clamp-1", children: subtitle })
      ] }),
      !control && badge && /* @__PURE__ */ jsx10("div", { className: "shrink-0", children: badge }),
      /* @__PURE__ */ jsx10("div", { className: "shrink-0", children: /* @__PURE__ */ jsx10(CardHeaderControl, { ...controlProps }) }),
      children
    ] });
  }
);
CardHeader.displayName = "CardHeader";
var CardTitle = React8.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx10(
  "h3",
  {
    ref,
    className: cn("text-base font-semibold text-foreground leading-snug", className),
    ...props
  }
));
CardTitle.displayName = "CardTitle";
var CardContent = React8.forwardRef(
  ({ className, divider = false, children, ...props }, ref) => {
    const content = divider ? React8.Children.toArray(children).reduce(
      (acc, child, index) => {
        if (index > 0) acc.push(/* @__PURE__ */ jsx10(Divider, {}, `divider-${index}`));
        acc.push(child);
        return acc;
      },
      []
    ) : children;
    return /* @__PURE__ */ jsx10(
      "div",
      {
        ref,
        className: cn(
          "px-4 py-3 flex-1 flex flex-col",
          divider ? "gap-0" : "gap-2",
          className
        ),
        ...props,
        children: content
      }
    );
  }
);
CardContent.displayName = "CardContent";
var CardDescription = React8.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx10(
  "p",
  {
    ref,
    className: cn("text-sm text-muted-foreground leading-normal", className),
    ...props
  }
));
CardDescription.displayName = "CardDescription";
var CardFooter = React8.forwardRef(
  ({ className, divider = true, children, ...props }, ref) => /* @__PURE__ */ jsxs8(Fragment2, { children: [
    divider && /* @__PURE__ */ jsx10(Divider, {}),
    /* @__PURE__ */ jsx10(
      "div",
      {
        ref,
        className: cn(
          "px-4 pb-4 flex items-center gap-2",
          divider ? "pt-3" : "pt-0",
          className
        ),
        ...props,
        children
      }
    )
  ] })
);
CardFooter.displayName = "CardFooter";
var CardFooterUser = React8.forwardRef(
  ({ className, avatar, name, sub, action, ...props }, ref) => /* @__PURE__ */ jsxs8("div", { ref, className: cn("flex items-center gap-2 w-full", className), ...props, children: [
    avatar && /* @__PURE__ */ jsx10("div", { className: "shrink-0", children: avatar }),
    /* @__PURE__ */ jsxs8("div", { className: "flex-1 min-w-0", children: [
      name && /* @__PURE__ */ jsx10("p", { className: "text-xs font-medium text-foreground line-clamp-1", children: name }),
      sub && /* @__PURE__ */ jsx10("p", { className: "text-xs text-muted-foreground line-clamp-1", children: sub })
    ] }),
    action && /* @__PURE__ */ jsx10("div", { className: "shrink-0", children: action })
  ] })
);
CardFooterUser.displayName = "CardFooterUser";
var CardFooterInfo = React8.forwardRef(
  ({ className, items = [], action, ...props }, ref) => /* @__PURE__ */ jsxs8("div", { ref, className: cn("flex items-center gap-3 w-full text-xs text-muted-foreground", className), ...props, children: [
    /* @__PURE__ */ jsx10("div", { className: "flex items-center gap-3 flex-1 flex-wrap", children: items.map((item, i) => /* @__PURE__ */ jsxs8("span", { className: "inline-flex items-center gap-1", children: [
      item.icon && /* @__PURE__ */ jsx10("span", { className: "shrink-0", children: item.icon }),
      item.label
    ] }, i)) }),
    action && /* @__PURE__ */ jsx10("div", { className: "shrink-0", children: action })
  ] })
);
CardFooterInfo.displayName = "CardFooterInfo";
var CardFooterButtons = React8.forwardRef(
  ({
    className,
    direction = "horizontal",
    primaryLabel = "\uD655\uC778",
    onPrimary,
    secondaryLabel,
    onSecondary,
    divider = true,
    ...props
  }, ref) => /* @__PURE__ */ jsxs8(Fragment2, { children: [
    divider && /* @__PURE__ */ jsx10(Divider, {}),
    /* @__PURE__ */ jsx10(
      "div",
      {
        ref,
        className: cn("px-4 pb-4", divider ? "pt-3" : "pt-0", className),
        ...props,
        children: /* @__PURE__ */ jsxs8(ButtonGroup, { direction, children: [
          secondaryLabel && /* @__PURE__ */ jsx10(
            Button,
            {
              variant: "tertiary",
              size: "sm",
              fullWidth: direction === "vertical",
              onClick: onSecondary,
              children: secondaryLabel
            }
          ),
          /* @__PURE__ */ jsx10(
            Button,
            {
              variant: "primary",
              size: "sm",
              fullWidth: direction === "vertical",
              onClick: onPrimary,
              children: primaryLabel
            }
          )
        ] })
      }
    )
  ] })
);
CardFooterButtons.displayName = "CardFooterButtons";

// src/components/Breadcrumbs/index.tsx
import * as React9 from "react";
import { jsx as jsx11, jsxs as jsxs9 } from "react/jsx-runtime";
function Separator({ type }) {
  return /* @__PURE__ */ jsx11("span", { className: "text-ac-gray-50 select-none mx-1", "aria-hidden": "true", children: type === "slash" ? "/" : ">" });
}
function HomeIcon() {
  return /* @__PURE__ */ jsx11(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 16 16",
      fill: "currentColor",
      className: "w-3.5 h-3.5 shrink-0",
      "aria-hidden": "true",
      children: /* @__PURE__ */ jsx11("path", { d: "M8.543 1.293a.75.75 0 0 0-1.086 0L1.5 7.25V13.5A1.5 1.5 0 0 0 3 15h3.25v-3.75a1.75 1.75 0 0 1 3.5 0V15H13a1.5 1.5 0 0 0 1.5-1.5V7.25L8.543 1.293Z" })
    }
  );
}
function BreadcrumbLink({
  item,
  isFirst,
  showHomeIcon,
  separator,
  isLast,
  isSingle
}) {
  const isClickable = (!isLast || isSingle) && (item.href || item.onClick);
  const content = /* @__PURE__ */ jsxs9("span", { className: "inline-flex items-center gap-1", children: [
    isFirst && showHomeIcon && /* @__PURE__ */ jsx11(HomeIcon, {}),
    item.label
  ] });
  return /* @__PURE__ */ jsxs9("li", { className: "inline-flex items-center", children: [
    isClickable ? /* @__PURE__ */ jsx11(
      "a",
      {
        href: item.href,
        onClick: item.onClick,
        className: cn(
          "inline-flex items-center text-sm transition-colors duration-150",
          "text-ac-black hover:underline underline-offset-4"
        ),
        "aria-label": isFirst && showHomeIcon ? "\uD648\uC73C\uB85C \uC774\uB3D9" : void 0,
        children: content
      }
    ) : /* @__PURE__ */ jsx11(
      "span",
      {
        className: cn(
          "inline-flex items-center text-sm",
          isLast && !isSingle ? "font-semibold text-foreground" : "text-ac-gray-50 cursor-default"
          // 링크 없는 아이템
        ),
        "aria-current": isLast && !isSingle ? "page" : void 0,
        children: content
      }
    ),
    !isLast && /* @__PURE__ */ jsx11(Separator, { type: separator })
  ] });
}
function Breadcrumbs({
  className,
  items,
  separator = "slash",
  maxItems,
  showHomeIcon = true,
  ...props
}) {
  if (!items.length) return null;
  const visibleItems = React9.useMemo(() => {
    if (!maxItems || items.length <= maxItems) return items;
    const start = items.slice(0, 1);
    const end = items.slice(-(maxItems - 2));
    const ellipsis = { label: "..." };
    return [...start, ellipsis, ...end];
  }, [items, maxItems]);
  const isSingle = visibleItems.length === 1;
  return /* @__PURE__ */ jsx11("nav", { "aria-label": "breadcrumb", className: cn("w-full", className), ...props, children: /* @__PURE__ */ jsx11("ol", { className: "inline-flex flex-wrap items-center gap-y-1", children: visibleItems.map((item, index) => /* @__PURE__ */ jsx11(
    BreadcrumbLink,
    {
      item,
      isFirst: index === 0,
      isLast: index === visibleItems.length - 1,
      isSingle,
      showHomeIcon,
      separator
    },
    `${item.label}-${index}`
  )) }) });
}

// src/components/Avatar/index.tsx
import * as React10 from "react";
import { cva as cva10 } from "class-variance-authority";
import { User } from "lucide-react";
import { jsx as jsx12 } from "react/jsx-runtime";
var avatarVariants = cva10(
  "inline-flex items-center justify-center shrink-0 overflow-hidden bg-ac-gray-20 text-foreground font-bold select-none",
  {
    variants: {
      shape: {
        circle: "rounded-full",
        square: "rounded-md"
      },
      size: {
        xs: "h-4 w-4 text-[8px]",
        // 16px
        sm: "h-5 w-5 text-[9px]",
        // 20px
        md: "h-6 w-6 text-xs",
        // 24px
        lg: "h-8 w-8 text-sm",
        // 32px
        xl: "h-12 w-12 text-lg",
        // 48px
        "2xl": "h-16 w-16 text-2xl"
        // 64px
      }
    },
    defaultVariants: {
      shape: "circle",
      size: "md"
    }
  }
);
function getInitials(name, maxChars) {
  const englishAndNumbersOnly = name.replace(/[^a-zA-Z0-9\s]/g, "").trim();
  if (!englishAndNumbersOnly) return "";
  const words = englishAndNumbersOnly.split(/\s+/);
  if (maxChars === 1) {
    return words[0].charAt(0).toUpperCase();
  }
  if (words.length === 1) {
    return englishAndNumbersOnly.substring(0, 2).toUpperCase();
  }
  return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase();
}
var Avatar = React10.forwardRef(
  ({
    className,
    shape,
    size = "md",
    src,
    alt,
    name,
    icon,
    fallback,
    ...props
  }, ref) => {
    const [imgError, setImgError] = React10.useState(false);
    React10.useEffect(() => {
      setImgError(false);
    }, [src]);
    const maxChars = ["xs", "sm", "md"].includes(size || "md") ? 1 : 2;
    const initials = name ? getInitials(name, maxChars) : "";
    const renderContent = () => {
      if (src && !imgError) {
        return /* @__PURE__ */ jsx12(
          "img",
          {
            src,
            alt: alt ?? name ?? "",
            className: "h-full w-full object-cover",
            onError: () => setImgError(true)
          }
        );
      }
      if (fallback) return fallback;
      if (icon) return icon;
      if (initials) return /* @__PURE__ */ jsx12("span", { "aria-label": name, children: initials });
      return /* @__PURE__ */ jsx12(
        User,
        {
          className: "w-1/2 h-1/2 text-ac-gray-50",
          "aria-hidden": "true"
        }
      );
    };
    return /* @__PURE__ */ jsx12(
      "div",
      {
        ref,
        className: cn(avatarVariants({ shape, size }), className),
        ...props,
        children: renderContent()
      }
    );
  }
);
Avatar.displayName = "Avatar";

// src/components/Input/DatePicker/index.tsx
import * as React11 from "react";
import { DayPicker } from "react-day-picker";
import { ko } from "date-fns/locale";
import { format, isValid, addMonths, subMonths, startOfDay } from "date-fns";
import { CalendarIcon, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { jsx as jsx13, jsxs as jsxs10 } from "react/jsx-runtime";
var inputSizeClass = {
  lg: "h-10 px-3 text-sm",
  md: "h-9 px-3 text-sm",
  sm: "h-[30px] px-2.5 text-xs"
};
var inputStateClass = {
  default: "border-border",
  complete: "border-border",
  error: "border-ac-red-50",
  disable: "border-border"
};
var BASE_DAY_CLASSNAMES = {
  root: "w-full select-none",
  months: "flex flex-col",
  month: "",
  month_caption: "",
  caption_label: "hidden",
  nav: "hidden",
  weeks: "",
  weekdays: "flex px-3 py-1",
  weekday: "w-10 h-10 flex items-center justify-center text-sm font-medium text-foreground",
  week: "flex px-3",
  day: "relative text-center",
  day_button: cn(
    "h-10 w-10 rounded-full text-sm font-medium transition-colors",
    "hover:bg-ac-gray-20 focus:outline-none"
  ),
  today: "[&:not(.selected)>button]:ring-1 [&:not(.selected)>button]:ring-ac-primary-50 [&:not(.selected)>button]:text-ac-primary-50 [&:not(.selected)>button]:font-bold",
  outside: "[&>button]:!text-ac-gray-50",
  disabled: "pointer-events-none [&>button]:opacity-30"
};
function getDayPickerClassNames(mode = "single") {
  if (mode === "range") {
    return {
      ...BASE_DAY_CLASSNAMES,
      selected: "",
      range_start: "[&>button]:!bg-ac-black [&>button]:!text-white [&>button]:!font-bold",
      range_end: "[&>button]:!bg-ac-black [&>button]:!text-white [&>button]:!font-bold",
      range_middle: "[&>button]:!bg-ac-gray-20 [&>button]:!rounded-none [&>button]:!text-ac-black"
    };
  }
  return {
    ...BASE_DAY_CLASSNAMES,
    selected: "[&>button]:!bg-ac-black [&>button]:!text-white [&>button]:!font-bold",
    range_start: "",
    range_end: "",
    range_middle: ""
  };
}
function MonthHeader({
  calendarMonth,
  setDisplayMonth,
  onYearClick,
  onMonthClick,
  showPrev = true,
  showNext = true
}) {
  const year = calendarMonth.date.getFullYear();
  const month = calendarMonth.date.getMonth();
  return /* @__PURE__ */ jsxs10("div", { className: "flex items-center justify-between bg-ac-gray-10 px-6 h-[60px]", children: [
    showPrev ? /* @__PURE__ */ jsx13(
      "button",
      {
        type: "button",
        onClick: () => setDisplayMonth((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1)),
        className: "flex items-center justify-center w-9 h-9 rounded-md hover:bg-ac-gray-20 transition-colors",
        children: /* @__PURE__ */ jsx13(ChevronLeft, { className: "w-4 h-4" })
      }
    ) : /* @__PURE__ */ jsx13("div", { className: "w-9" }),
    /* @__PURE__ */ jsxs10("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxs10(
        "button",
        {
          type: "button",
          onClick: onYearClick,
          className: "flex items-center gap-1 px-3 h-10 rounded-md hover:bg-ac-gray-20 text-sm font-bold text-foreground transition-colors",
          children: [
            year,
            "\uB144",
            /* @__PURE__ */ jsx13(ChevronDown, { className: "w-4 h-4 text-muted-foreground" })
          ]
        }
      ),
      /* @__PURE__ */ jsxs10(
        "button",
        {
          type: "button",
          onClick: onMonthClick,
          className: "flex items-center gap-1 px-3 h-10 rounded-md hover:bg-ac-gray-20 text-sm font-bold text-foreground transition-colors",
          children: [
            month + 1,
            "\uC6D4",
            /* @__PURE__ */ jsx13(ChevronDown, { className: "w-4 h-4 text-muted-foreground" })
          ]
        }
      )
    ] }),
    showNext ? /* @__PURE__ */ jsx13(
      "button",
      {
        type: "button",
        onClick: () => setDisplayMonth((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1)),
        className: "flex items-center justify-center w-9 h-9 rounded-md hover:bg-ac-gray-20 transition-colors",
        children: /* @__PURE__ */ jsx13(ChevronRight, { className: "w-4 h-4" })
      }
    ) : /* @__PURE__ */ jsx13("div", { className: "w-9" })
  ] });
}
function YearView({
  currentYear,
  selectedYear,
  onSelectYear,
  minYear,
  maxYear
}) {
  const [yearPage, setYearPage] = React11.useState(Math.floor(currentYear / 9) * 9);
  const years = Array.from({ length: 9 }, (_, i) => yearPage + i);
  const isPrevDisabled = minYear !== void 0 && yearPage - 1 < minYear;
  const isNextDisabled = maxYear !== void 0 && yearPage + 9 > maxYear;
  return /* @__PURE__ */ jsxs10("div", { className: "w-[318px]", children: [
    /* @__PURE__ */ jsxs10("div", { className: "flex items-center justify-between bg-ac-gray-10 px-6 h-[60px]", children: [
      /* @__PURE__ */ jsx13(
        "button",
        {
          type: "button",
          onClick: () => setYearPage((y) => y - 9),
          disabled: isPrevDisabled,
          className: "flex items-center justify-center w-9 h-9 rounded-md hover:bg-ac-gray-20 transition-colors disabled:opacity-30 disabled:pointer-events-none",
          children: /* @__PURE__ */ jsx13(ChevronLeft, { className: "w-4 h-4" })
        }
      ),
      /* @__PURE__ */ jsxs10("span", { className: "text-sm font-bold text-foreground", children: [
        yearPage,
        " \u2013 ",
        yearPage + 8
      ] }),
      /* @__PURE__ */ jsx13(
        "button",
        {
          type: "button",
          onClick: () => setYearPage((y) => y + 9),
          disabled: isNextDisabled,
          className: "flex items-center justify-center w-9 h-9 rounded-md hover:bg-ac-gray-20 transition-colors disabled:opacity-30 disabled:pointer-events-none",
          children: /* @__PURE__ */ jsx13(ChevronRight, { className: "w-4 h-4" })
        }
      )
    ] }),
    /* @__PURE__ */ jsx13("div", { className: "grid grid-cols-3 gap-2 p-4", children: years.map((y) => {
      const isDisabled = minYear !== void 0 && y < minYear || maxYear !== void 0 && y > maxYear;
      return /* @__PURE__ */ jsx13(
        "button",
        {
          type: "button",
          onClick: () => onSelectYear(y),
          disabled: isDisabled,
          className: cn(
            "rounded-md py-2.5 text-base font-medium transition-colors",
            isDisabled ? "opacity-30 pointer-events-none" : selectedYear === y ? "bg-ac-balck-50 text-white font-bold" : "hover:bg-ac-gray-20"
          ),
          children: y
        },
        y
      );
    }) })
  ] });
}
var MONTHS_KO = ["1\uC6D4", "2\uC6D4", "3\uC6D4", "4\uC6D4", "5\uC6D4", "6\uC6D4", "7\uC6D4", "8\uC6D4", "9\uC6D4", "10\uC6D4", "11\uC6D4", "12\uC6D4"];
function MonthView({
  currentYear,
  selectedMonth,
  onBack,
  onSelectMonth,
  minDate,
  maxDate
}) {
  const isMonthDisabled = (monthIndex) => {
    if (minDate) {
      if (currentYear < minDate.getFullYear()) return true;
      if (currentYear === minDate.getFullYear() && monthIndex < minDate.getMonth()) return true;
    }
    if (maxDate) {
      if (currentYear > maxDate.getFullYear()) return true;
      if (currentYear === maxDate.getFullYear() && monthIndex > maxDate.getMonth()) return true;
    }
    return false;
  };
  return /* @__PURE__ */ jsxs10("div", { className: "w-[318px]", children: [
    /* @__PURE__ */ jsxs10("div", { className: "flex items-center justify-between bg-ac-gray-10 px-6 h-[60px]", children: [
      /* @__PURE__ */ jsx13(
        "button",
        {
          type: "button",
          onClick: onBack,
          className: "flex items-center justify-center w-9 h-9 rounded-md hover:bg-ac-gray-20 transition-colors",
          children: /* @__PURE__ */ jsx13(ChevronLeft, { className: "w-4 h-4" })
        }
      ),
      /* @__PURE__ */ jsxs10(
        "button",
        {
          type: "button",
          onClick: onBack,
          className: "text-sm font-bold text-foreground hover:text-ac-primary-50 transition-colors",
          children: [
            currentYear,
            "\uB144"
          ]
        }
      ),
      /* @__PURE__ */ jsx13("div", { className: "w-9" })
    ] }),
    /* @__PURE__ */ jsx13("div", { className: "grid grid-cols-3 gap-2 p-4", children: MONTHS_KO.map((m, i) => {
      const isDisabled = isMonthDisabled(i);
      return /* @__PURE__ */ jsx13(
        "button",
        {
          type: "button",
          onClick: () => onSelectMonth(i),
          disabled: isDisabled,
          className: cn(
            "rounded-md py-2.5 text-base font-medium transition-colors",
            isDisabled ? "opacity-30 pointer-events-none" : selectedMonth === i ? "bg-ac-black text-white font-bold" : "hover:bg-ac-gray-20"
          ),
          children: m
        },
        i
      );
    }) })
  ] });
}
function SingleCalendar({ selected, onSelect, minDate, maxDate, disabledDates, weekendColor }) {
  const [displayMonth, setDisplayMonth] = React11.useState(selected ?? /* @__PURE__ */ new Date());
  const [view, setView] = React11.useState("day");
  const disabledDays = [
    ...minDate ? [{ before: minDate }] : [],
    ...maxDate ? [{ after: maxDate }] : [],
    ...disabledDates ?? []
  ];
  const weekendModifiers = weekendColor ? {
    sunday: (date) => date.getDay() === 0,
    saturday: (date) => date.getDay() === 6
  } : void 0;
  const weekendModifiersClassNames = weekendColor ? {
    sunday: "[&>button]:!text-ac-red-50",
    saturday: "[&>button]:!text-ac-blue-50"
  } : void 0;
  if (view === "year") {
    return /* @__PURE__ */ jsx13(
      YearView,
      {
        currentYear: displayMonth.getFullYear(),
        selectedYear: selected?.getFullYear(),
        onSelectYear: (y) => {
          setDisplayMonth(new Date(y, displayMonth.getMonth(), 1));
          setView("month");
        },
        minYear: minDate?.getFullYear(),
        maxYear: maxDate?.getFullYear()
      }
    );
  }
  if (view === "month") {
    return /* @__PURE__ */ jsx13(
      MonthView,
      {
        currentYear: displayMonth.getFullYear(),
        selectedMonth: selected?.getMonth(),
        onBack: () => setView("year"),
        onSelectMonth: (m) => {
          setDisplayMonth(new Date(displayMonth.getFullYear(), m, 1));
          setView("day");
        },
        minDate,
        maxDate
      }
    );
  }
  return /* @__PURE__ */ jsx13("div", { className: "w-[318px] pb-2", children: /* @__PURE__ */ jsx13(
    DayPicker,
    {
      mode: "single",
      selected,
      onSelect,
      month: displayMonth,
      onMonthChange: setDisplayMonth,
      locale: ko,
      weekStartsOn: 0,
      showOutsideDays: true,
      classNames: getDayPickerClassNames(),
      startMonth: minDate,
      endMonth: maxDate,
      disabled: disabledDays.length > 0 ? disabledDays : void 0,
      modifiers: weekendModifiers,
      modifiersClassNames: weekendModifiersClassNames,
      components: {
        MonthCaption: ({ calendarMonth }) => /* @__PURE__ */ jsx13(
          MonthHeader,
          {
            calendarMonth,
            setDisplayMonth,
            onYearClick: () => setView("year"),
            onMonthClick: () => setView("month")
          }
        )
      }
    }
  ) });
}
function RangeCalendar({ selected, onSelect, onConfirm, onCancel, twoMonths = false, minDate, maxDate, disabledDates, weekendColor }) {
  const startMonth = selected?.from ?? /* @__PURE__ */ new Date();
  const [displayMonth, setDisplayMonth] = React11.useState(
    new Date(startMonth.getFullYear(), startMonth.getMonth(), 1)
  );
  const [view, setView] = React11.useState("day");
  const nextMonth = new Date(displayMonth.getFullYear(), displayMonth.getMonth() + 1, 1);
  const fmtDate = (d) => d && isValid(d) ? format(d, "yyyy-MM-dd") : "";
  const rangeText = selected?.from && selected?.to ? `${fmtDate(selected.from)} ~ ${fmtDate(selected.to)}` : selected?.from ? fmtDate(selected.from) : "";
  const canConfirm = !!(selected?.from && selected?.to);
  const Footer = () => /* @__PURE__ */ jsxs10("div", { className: "flex items-center px-4 gap-2 border-t border-border h-[52px] mt-1", children: [
    /* @__PURE__ */ jsx13("span", { className: "flex-1 text-xs text-foreground truncate", children: rangeText }),
    /* @__PURE__ */ jsx13(Button, { variant: "tertiary", size: "sm", onClick: onCancel, children: "\uCDE8\uC18C" }),
    /* @__PURE__ */ jsx13(Button, { variant: "primary", size: "sm", onClick: onConfirm, disabled: !canConfirm, children: "\uD655\uC778" })
  ] });
  if (view === "year") {
    return /* @__PURE__ */ jsx13(
      YearView,
      {
        currentYear: displayMonth.getFullYear(),
        selectedYear: selected?.from?.getFullYear(),
        onSelectYear: (y) => {
          setDisplayMonth(new Date(y, displayMonth.getMonth(), 1));
          setView("month");
        },
        minYear: minDate?.getFullYear(),
        maxYear: maxDate?.getFullYear()
      }
    );
  }
  if (view === "month") {
    return /* @__PURE__ */ jsx13(
      MonthView,
      {
        currentYear: displayMonth.getFullYear(),
        selectedMonth: selected?.from?.getMonth(),
        onBack: () => setView("year"),
        onSelectMonth: (m) => {
          setDisplayMonth(new Date(displayMonth.getFullYear(), m, 1));
          setView("day");
        },
        minDate,
        maxDate
      }
    );
  }
  const disabledDays = [
    ...minDate ? [{ before: minDate }] : [],
    ...maxDate ? [{ after: maxDate }] : [],
    ...disabledDates ?? []
  ];
  const weekendModifiers = weekendColor ? {
    sunday: (date) => date.getDay() === 0,
    saturday: (date) => date.getDay() === 6
  } : void 0;
  const weekendModifiersClassNames = weekendColor ? {
    sunday: "[&>button]:!text-ac-red-50",
    saturday: "[&>button]:!text-ac-blue-50"
  } : void 0;
  const dayPickerProps = {
    mode: "range",
    selected,
    onSelect,
    locale: ko,
    weekStartsOn: 0,
    showOutsideDays: true,
    classNames: getDayPickerClassNames("range"),
    startMonth: minDate,
    endMonth: maxDate,
    disabled: disabledDays.length > 0 ? disabledDays : void 0,
    modifiers: weekendModifiers,
    modifiersClassNames: weekendModifiersClassNames
  };
  if (twoMonths) {
    return /* @__PURE__ */ jsxs10("div", { children: [
      /* @__PURE__ */ jsxs10("div", { className: "flex", children: [
        /* @__PURE__ */ jsx13("div", { className: "w-[318px] pb-2", children: /* @__PURE__ */ jsx13(
          DayPicker,
          {
            ...dayPickerProps,
            month: displayMonth,
            onMonthChange: setDisplayMonth,
            components: {
              MonthCaption: ({ calendarMonth }) => /* @__PURE__ */ jsx13(
                MonthHeader,
                {
                  calendarMonth,
                  setDisplayMonth,
                  onYearClick: () => setView("year"),
                  onMonthClick: () => setView("month"),
                  showNext: false
                }
              )
            }
          }
        ) }),
        /* @__PURE__ */ jsx13("div", { className: "w-px bg-border" }),
        /* @__PURE__ */ jsx13("div", { className: "w-[318px] pb-2", children: /* @__PURE__ */ jsx13(
          DayPicker,
          {
            ...dayPickerProps,
            month: nextMonth,
            onMonthChange: () => {
            },
            components: {
              MonthCaption: ({ calendarMonth }) => /* @__PURE__ */ jsx13(
                MonthHeader,
                {
                  calendarMonth,
                  setDisplayMonth,
                  onYearClick: () => setView("year"),
                  onMonthClick: () => setView("month"),
                  showPrev: false
                }
              )
            }
          }
        ) })
      ] }),
      /* @__PURE__ */ jsx13(Footer, {})
    ] });
  }
  return /* @__PURE__ */ jsxs10("div", { className: "w-[318px]", children: [
    /* @__PURE__ */ jsx13(
      DayPicker,
      {
        ...dayPickerProps,
        month: displayMonth,
        onMonthChange: setDisplayMonth,
        components: {
          MonthCaption: ({ calendarMonth }) => /* @__PURE__ */ jsx13(
            MonthHeader,
            {
              calendarMonth,
              setDisplayMonth,
              onYearClick: () => setView("year"),
              onMonthClick: () => setView("month")
            }
          )
        }
      }
    ),
    /* @__PURE__ */ jsx13(Footer, {})
  ] });
}
function DatePicker({
  value,
  defaultValue,
  onChange,
  size = "md",
  state = "default",
  label,
  helperText,
  errorMessage,
  placeholder = "\uB0A0\uC9DC\uB97C \uC120\uD0DD\uD574\uC8FC\uC138\uC694.",
  dateFormat = "yyyy\uB144 MM\uC6D4 dd\uC77C",
  disabled,
  minDate,
  maxDate,
  offsetMonths,
  disabledDates,
  weekendColor,
  className,
  id
}) {
  const [open, setOpen] = React11.useState(false);
  const [internalValue, setInternalValue] = React11.useState(defaultValue);
  const controlled = value !== void 0;
  const currentValue = controlled ? value : internalValue;
  const today = startOfDay(/* @__PURE__ */ new Date());
  const resolvedMin = minDate ?? (offsetMonths !== void 0 ? subMonths(today, offsetMonths) : void 0);
  const resolvedMax = maxDate ?? (offsetMonths !== void 0 ? addMonths(today, offsetMonths) : void 0);
  const inputId = id ?? React11.useId();
  const isError = state === "error" || !!errorMessage;
  const resolvedState = isError ? "error" : state;
  const containerRef = React11.useRef(null);
  React11.useEffect(() => {
    const handler = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);
  const handleSelect = (date) => {
    if (!controlled) setInternalValue(date);
    onChange?.(date);
    setOpen(false);
  };
  return /* @__PURE__ */ jsxs10("div", { className: "flex flex-col gap-1 w-full", ref: containerRef, children: [
    label && /* @__PURE__ */ jsx13("label", { htmlFor: inputId, className: "text-sm font-medium text-foreground", children: label }),
    /* @__PURE__ */ jsxs10("div", { className: "relative", children: [
      /* @__PURE__ */ jsxs10(
        "button",
        {
          id: inputId,
          type: "button",
          disabled,
          onClick: () => !disabled && setOpen((o) => !o),
          "aria-haspopup": "dialog",
          "aria-expanded": open,
          "aria-invalid": isError,
          className: cn(
            "flex items-center justify-between w-full rounded-md border bg-background transition-colors",
            "disabled:bg-ac-gray-20 disabled:cursor-not-allowed disabled:opacity-60",
            inputSizeClass[size],
            inputStateClass[resolvedState],
            !currentValue && "text-muted-foreground",
            className
          ),
          children: [
            /* @__PURE__ */ jsx13("span", { children: currentValue && isValid(currentValue) ? format(currentValue, dateFormat, { locale: ko }) : placeholder }),
            /* @__PURE__ */ jsx13(CalendarIcon, { className: "w-4 h-4 shrink-0 text-muted-foreground" })
          ]
        }
      ),
      open && /* @__PURE__ */ jsx13("div", { className: "absolute z-dropdown mt-1 rounded-lg border border-border bg-background shadow-lg overflow-hidden", children: /* @__PURE__ */ jsx13(SingleCalendar, { selected: currentValue, onSelect: handleSelect, minDate: resolvedMin, maxDate: resolvedMax, disabledDates, weekendColor }) })
    ] }),
    (helperText || errorMessage) && /* @__PURE__ */ jsx13("p", { className: cn("text-xs", isError ? "text-ac-red-50" : "text-muted-foreground"), children: errorMessage || helperText })
  ] });
}
function DateRangePicker({
  value,
  defaultValue,
  onChange,
  size = "md",
  state = "default",
  label,
  helperText,
  errorMessage,
  startPlaceholder = "\uC2DC\uC791\uC77C",
  endPlaceholder = "\uC885\uB8CC\uC77C",
  dateFormat = "yyyy-MM-dd",
  disabled,
  twoMonths = false,
  minDate,
  maxDate,
  offsetMonths,
  disabledDates,
  weekendColor,
  className,
  id
}) {
  const [open, setOpen] = React11.useState(false);
  const [internalValue, setInternalValue] = React11.useState(defaultValue);
  const [tempRange, setTempRange] = React11.useState(defaultValue);
  const controlled = value !== void 0;
  const currentValue = controlled ? value : internalValue;
  const today = startOfDay(/* @__PURE__ */ new Date());
  const resolvedMin = minDate ?? (offsetMonths !== void 0 ? subMonths(today, offsetMonths) : void 0);
  const resolvedMax = maxDate ?? (offsetMonths !== void 0 ? addMonths(today, offsetMonths) : void 0);
  const inputId = id ?? React11.useId();
  const isError = state === "error" || !!errorMessage;
  const resolvedState = isError ? "error" : state;
  const containerRef = React11.useRef(null);
  React11.useEffect(() => {
    const handler = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);
  const handleOpen = () => {
    if (disabled) return;
    setTempRange(currentValue);
    setOpen((o) => !o);
  };
  const handleConfirm = () => {
    if (!controlled) setInternalValue(tempRange);
    onChange?.(tempRange);
    setOpen(false);
  };
  const handleCancel = () => {
    setTempRange(currentValue);
    setOpen(false);
  };
  const fmt = (d) => d && isValid(d) ? format(d, dateFormat, { locale: ko }) : void 0;
  return /* @__PURE__ */ jsxs10("div", { className: "flex flex-col gap-1 w-full", ref: containerRef, children: [
    label && /* @__PURE__ */ jsx13("label", { htmlFor: inputId, className: "text-sm font-medium text-foreground", children: label }),
    /* @__PURE__ */ jsxs10("div", { className: "relative", children: [
      /* @__PURE__ */ jsxs10(
        "button",
        {
          id: inputId,
          type: "button",
          disabled,
          onClick: handleOpen,
          "aria-haspopup": "dialog",
          "aria-expanded": open,
          "aria-invalid": isError,
          className: cn(
            "flex items-center justify-between w-full rounded-md border bg-background transition-colors gap-2",
            "disabled:bg-ac-gray-20 disabled:cursor-not-allowed disabled:opacity-60",
            inputSizeClass[size],
            inputStateClass[resolvedState],
            className
          ),
          children: [
            /* @__PURE__ */ jsx13("span", { className: cn(!currentValue?.from && "text-muted-foreground"), children: fmt(currentValue?.from) ?? startPlaceholder }),
            /* @__PURE__ */ jsx13("span", { className: "text-foreground shrink-0", children: "~" }),
            /* @__PURE__ */ jsx13("span", { className: cn(!currentValue?.to && "text-muted-foreground"), children: fmt(currentValue?.to) ?? endPlaceholder }),
            /* @__PURE__ */ jsx13(CalendarIcon, { className: "w-4 h-4 shrink-0 text-muted-foreground ml-auto" })
          ]
        }
      ),
      open && /* @__PURE__ */ jsx13("div", { className: "absolute z-dropdown mt-1 rounded-lg border border-border bg-background shadow-lg overflow-hidden", children: /* @__PURE__ */ jsx13(
        RangeCalendar,
        {
          selected: tempRange,
          onSelect: setTempRange,
          onConfirm: handleConfirm,
          onCancel: handleCancel,
          twoMonths,
          minDate: resolvedMin,
          maxDate: resolvedMax,
          disabledDates,
          weekendColor
        }
      ) })
    ] }),
    (helperText || errorMessage) && /* @__PURE__ */ jsx13("p", { className: cn("text-xs", isError ? "text-ac-red-50" : "text-muted-foreground"), children: errorMessage || helperText })
  ] });
}

// src/components/Input/TextInput/index.tsx
import * as React12 from "react";
import { cva as cva11 } from "class-variance-authority";
import { Fragment as Fragment3, jsx as jsx14, jsxs as jsxs11 } from "react/jsx-runtime";
var textInputVariants = cva11(
  [
    "flex items-center rounded-md border bg-background transition-colors duration-150",
    "focus-within:border-ac-gray-80",
    "has-[:disabled]:bg-ac-gray-20 has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-60"
  ],
  {
    variants: {
      size: {
        lg: "h-10 px-3 text-sm gap-2",
        md: "h-9 px-3 text-sm gap-2",
        sm: "h-[30px] px-2.5 text-xs gap-1.5"
      },
      state: {
        default: "border-border",
        complete: "border-border",
        focus: "border-ac-gray-80",
        error: "border-ac-red-50 focus-within:border-ac-red-50",
        disable: "border-border"
      }
    },
    defaultVariants: { size: "md", state: "default" }
  }
);
var buttonSizeMap = { lg: "md", md: "sm", sm: "xs" };
var TextInput = React12.forwardRef(
  ({
    className,
    size = "md",
    state = "default",
    label,
    labelLeft = false,
    helperText,
    errorMessage,
    prefix,
    suffix,
    buttonLabel,
    onButtonClick,
    id,
    disabled,
    ...props
  }, ref) => {
    const inputId = id ?? React12.useId();
    const isError = state === "error" || !!errorMessage;
    const resolvedState = isError ? "error" : state;
    const inputContainer = /* @__PURE__ */ jsxs11(
      "div",
      {
        className: cn(
          textInputVariants({ size, state: resolvedState }),
          buttonLabel ? "flex-1" : !labelLeft && "w-full",
          className
        ),
        children: [
          prefix && /* @__PURE__ */ jsx14("span", { className: "shrink-0 text-muted-foreground", children: prefix }),
          /* @__PURE__ */ jsx14(
            "input",
            {
              ref,
              id: inputId,
              disabled,
              "aria-invalid": isError,
              "aria-describedby": helperText || errorMessage ? `${inputId}-helper` : void 0,
              className: "flex-1 bg-transparent outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed min-w-0",
              ...props
            }
          ),
          suffix && /* @__PURE__ */ jsx14("span", { className: "shrink-0 text-muted-foreground", children: suffix })
        ]
      }
    );
    const inputEl = buttonLabel ? /* @__PURE__ */ jsxs11("div", { className: cn("flex items-center gap-2", !labelLeft && "w-full"), children: [
      inputContainer,
      /* @__PURE__ */ jsx14(
        Button,
        {
          type: "button",
          size: buttonSizeMap[size ?? "md"],
          onClick: onButtonClick,
          disabled,
          className: "shrink-0",
          children: buttonLabel
        }
      )
    ] }) : inputContainer;
    return /* @__PURE__ */ jsxs11("div", { className: "flex flex-col gap-1 w-full", children: [
      label && !labelLeft && /* @__PURE__ */ jsx14("label", { htmlFor: inputId, className: "text-sm font-medium text-foreground", children: label }),
      labelLeft ? /* @__PURE__ */ jsxs11("div", { className: "flex items-start gap-3", children: [
        label && /* @__PURE__ */ jsx14("label", { htmlFor: inputId, className: "text-sm font-medium text-foreground shrink-0 mt-2", children: label }),
        /* @__PURE__ */ jsxs11("div", { className: "flex flex-col gap-1 flex-1", children: [
          inputEl,
          (helperText || errorMessage) && /* @__PURE__ */ jsx14(
            "p",
            {
              id: `${inputId}-helper`,
              className: cn("text-xs", isError ? "text-ac-red-50" : "text-muted-foreground"),
              children: errorMessage || helperText
            }
          )
        ] })
      ] }) : /* @__PURE__ */ jsxs11(Fragment3, { children: [
        inputEl,
        (helperText || errorMessage) && /* @__PURE__ */ jsx14(
          "p",
          {
            id: `${inputId}-helper`,
            className: cn("text-xs", isError ? "text-ac-red-50" : "text-muted-foreground"),
            children: errorMessage || helperText
          }
        )
      ] })
    ] });
  }
);
TextInput.displayName = "TextInput";

// src/components/Input/Textarea/index.tsx
import * as React13 from "react";
import { jsx as jsx15, jsxs as jsxs12 } from "react/jsx-runtime";
var Textarea = React13.forwardRef(
  ({ className, label, helperText, errorMessage, state, id, disabled, ...props }, ref) => {
    const inputId = id ?? React13.useId();
    const isError = state === "error" || !!errorMessage;
    const borderClass = isError ? "border-ac-red-50 focus:border-ac-red-50" : "border-border focus:border-ac-gray-80";
    return /* @__PURE__ */ jsxs12("div", { className: "flex flex-col gap-1 w-full", children: [
      label && /* @__PURE__ */ jsx15("label", { htmlFor: inputId, className: "text-sm font-medium text-foreground", children: label }),
      /* @__PURE__ */ jsx15(
        "textarea",
        {
          ref,
          id: inputId,
          disabled,
          "aria-invalid": isError,
          "aria-describedby": helperText || errorMessage ? `${inputId}-helper` : void 0,
          className: cn(
            "w-full rounded-md border bg-background px-3 py-2 text-sm",
            "placeholder:text-muted-foreground",
            "transition-colors duration-150 outline-none",
            "resize-y min-h-[30px]",
            "disabled:bg-ac-gray-20 disabled:cursor-not-allowed disabled:opacity-60",
            borderClass,
            className
          ),
          ...props
        }
      ),
      (helperText || errorMessage) && /* @__PURE__ */ jsx15(
        "p",
        {
          id: `${inputId}-helper`,
          className: cn("text-xs", isError ? "text-ac-red-50" : "text-muted-foreground"),
          children: errorMessage || helperText
        }
      )
    ] });
  }
);
Textarea.displayName = "Textarea";

// src/components/Input/Select/index.tsx
import * as React14 from "react";
import { cva as cva12 } from "class-variance-authority";
import { ChevronDown as ChevronDown2, ChevronUp, Check } from "lucide-react";
import { jsx as jsx16, jsxs as jsxs13 } from "react/jsx-runtime";
var selectVariants = cva12(
  [
    "flex items-center justify-between w-full rounded-md border bg-background",
    "transition-colors duration-150 cursor-pointer select-none",
    "focus:outline-none",
    "disabled:bg-ac-gray-20 disabled:cursor-not-allowed disabled:opacity-60"
  ],
  {
    variants: {
      size: {
        lg: "h-10 px-3 text-sm",
        md: "h-9 px-3 text-sm",
        sm: "h-[30px] px-2.5 text-xs"
      },
      state: {
        default: "border-border",
        complete: "border-border",
        focus: "border-ac-gray-80",
        error: "border-ac-red-50",
        disable: "border-border"
      }
    },
    defaultVariants: { size: "md", state: "default" }
  }
);
function Select({
  size,
  state,
  options = [],
  groups = [],
  placeholder = "Select the option",
  value,
  defaultValue,
  onValueChange,
  disabled,
  label,
  helperText,
  errorMessage,
  className,
  id
}) {
  const [open, setOpen] = React14.useState(false);
  const [internalValue, setInternalValue] = React14.useState(defaultValue ?? "");
  const controlled = value !== void 0;
  const currentValue = controlled ? value : internalValue;
  const inputId = id ?? React14.useId();
  const isError = state === "error" || !!errorMessage;
  const resolvedState = isError ? "error" : open ? "focus" : state;
  const allOptions = [
    ...options,
    ...groups.flatMap((g) => g.options)
  ];
  const selectedLabel = allOptions.find((o) => o.value === currentValue)?.label;
  const handleSelect = (val) => {
    if (!controlled) setInternalValue(val);
    onValueChange?.(val);
    setOpen(false);
  };
  const containerRef = React14.useRef(null);
  React14.useEffect(() => {
    const handler = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);
  return /* @__PURE__ */ jsxs13("div", { className: "flex flex-col gap-1 w-full", ref: containerRef, children: [
    label && /* @__PURE__ */ jsx16("label", { htmlFor: inputId, className: "text-sm font-medium text-foreground", children: label }),
    /* @__PURE__ */ jsxs13("div", { className: "relative", children: [
      /* @__PURE__ */ jsxs13(
        "button",
        {
          id: inputId,
          type: "button",
          disabled,
          "aria-haspopup": "listbox",
          "aria-expanded": open,
          "aria-invalid": isError,
          onClick: () => !disabled && setOpen((prev) => !prev),
          className: cn(selectVariants({ size, state: resolvedState }), className),
          children: [
            /* @__PURE__ */ jsx16("span", { className: cn(!selectedLabel && "text-muted-foreground"), children: selectedLabel ?? placeholder }),
            open ? /* @__PURE__ */ jsx16(ChevronUp, { className: "shrink-0 w-4 h-4 text-muted-foreground" }) : /* @__PURE__ */ jsx16(ChevronDown2, { className: "shrink-0 w-4 h-4 text-muted-foreground" })
          ]
        }
      ),
      open && /* @__PURE__ */ jsx16(
        "ul",
        {
          role: "listbox",
          className: "absolute z-dropdown mt-1 w-full rounded-md border border-border bg-background shadow-sm overflow-hidden",
          children: /* @__PURE__ */ jsxs13("div", { className: "py-1 max-h-60 overflow-auto", children: [
            options.map((opt) => /* @__PURE__ */ jsxs13(
              "li",
              {
                role: "option",
                "aria-selected": currentValue === opt.value,
                "aria-disabled": opt.disabled,
                onClick: () => !opt.disabled && handleSelect(opt.value),
                className: cn(
                  "flex items-center gap-2 px-3 py-2 text-sm cursor-pointer",
                  opt.disabled ? "text-muted-foreground cursor-not-allowed" : "hover:bg-ac-gray-20",
                  currentValue === opt.value && "text-ac-primary-50 font-medium"
                ),
                children: [
                  /* @__PURE__ */ jsx16("span", { className: "w-3.5 h-3.5 shrink-0 flex items-center justify-center", children: currentValue === opt.value && /* @__PURE__ */ jsx16(Check, { className: "w-3.5 h-3.5" }) }),
                  opt.label
                ]
              },
              opt.value
            )),
            groups.map((group, gi) => /* @__PURE__ */ jsxs13(React14.Fragment, { children: [
              (gi > 0 || options.length > 0) && /* @__PURE__ */ jsx16("li", { role: "separator", className: "my-1 h-px bg-border" }),
              /* @__PURE__ */ jsxs13("li", { children: [
                /* @__PURE__ */ jsx16("p", { className: "px-3 py-1 text-xs font-semibold text-muted-foreground", children: group.title }),
                /* @__PURE__ */ jsx16("ul", { children: group.options.map((opt) => /* @__PURE__ */ jsxs13(
                  "li",
                  {
                    role: "option",
                    "aria-selected": currentValue === opt.value,
                    "aria-disabled": opt.disabled,
                    onClick: () => !opt.disabled && handleSelect(opt.value),
                    className: cn(
                      "flex items-center gap-2 px-3 py-2 text-sm cursor-pointer",
                      opt.disabled ? "text-muted-foreground cursor-not-allowed" : "hover:bg-ac-gray-20",
                      currentValue === opt.value && "text-ac-primary-50 font-medium"
                    ),
                    children: [
                      /* @__PURE__ */ jsx16("span", { className: "w-3.5 h-3.5 shrink-0 flex items-center justify-center", children: currentValue === opt.value && /* @__PURE__ */ jsx16(Check, { className: "w-3.5 h-3.5" }) }),
                      opt.label
                    ]
                  },
                  opt.value
                )) })
              ] })
            ] }, gi))
          ] })
        }
      )
    ] }),
    (helperText || errorMessage) && /* @__PURE__ */ jsx16("p", { className: cn("text-xs", isError ? "text-ac-red-50" : "text-muted-foreground"), children: errorMessage || helperText })
  ] });
}

// src/components/Input/FileInput/index.tsx
import * as React15 from "react";
import { cva as cva13 } from "class-variance-authority";
import { X } from "lucide-react";
import { jsx as jsx17, jsxs as jsxs14 } from "react/jsx-runtime";
var fileInputVariants = cva13(
  [
    "flex items-center w-full rounded-md border bg-background transition-colors duration-150",
    "has-[:disabled]:bg-ac-gray-20 has-[:disabled]:opacity-60"
  ],
  {
    variants: {
      size: {
        lg: "h-10 text-sm",
        md: "h-9 text-sm",
        sm: "h-[30px] text-xs"
      },
      state: {
        default: "border-border",
        complete: "border-border",
        error: "border-ac-red-50",
        disable: "border-border"
      }
    },
    defaultVariants: { size: "md", state: "default" }
  }
);
var FileInput = React15.forwardRef(
  ({ className, size, state, label, helperText, errorMessage, triggerLabel = "\uD30C\uC77C \uC120\uD0DD", multiple, disabled, id, onChange, ...props }, ref) => {
    const inputRef = React15.useRef(null);
    const resolvedRef = ref || inputRef;
    const inputId = id ?? React15.useId();
    const isError = state === "error" || !!errorMessage;
    const resolvedState = isError ? "error" : state;
    const [fileLabel, setFileLabel] = React15.useState("");
    const handleChange = (e) => {
      const files = e.target.files;
      if (!files || files.length === 0) {
        setFileLabel("");
        return;
      }
      if (multiple && files.length > 1) {
        setFileLabel(`${files.length}\uAC1C \uD30C\uC77C`);
      } else {
        setFileLabel(files[0].name);
      }
      onChange?.(e);
    };
    const handleReset = () => {
      if (resolvedRef.current) resolvedRef.current.value = "";
      setFileLabel("");
    };
    return /* @__PURE__ */ jsxs14("div", { className: "flex flex-col gap-1 w-full", children: [
      label && /* @__PURE__ */ jsx17("label", { htmlFor: inputId, className: "text-sm font-medium text-foreground", children: label }),
      /* @__PURE__ */ jsxs14("div", { className: cn(fileInputVariants({ size, state: resolvedState }), className), children: [
        /* @__PURE__ */ jsx17(
          "button",
          {
            type: "button",
            disabled,
            onClick: () => resolvedRef.current?.click(),
            className: cn(
              "shrink-0 font-medium text-ac-primary-50 px-3 h-full border-r border-border",
              "hover:text-ac-primary-60 disabled:cursor-not-allowed transition-colors",
              size === "sm" ? "text-xs px-2.5" : "text-sm"
            ),
            children: triggerLabel
          }
        ),
        /* @__PURE__ */ jsx17("span", { className: cn("flex-1 px-3 truncate", !fileLabel && "text-muted-foreground"), children: fileLabel || "\uD30C\uC77C\uC744 \uC120\uD0DD\uD574\uC8FC\uC138\uC694." }),
        fileLabel && !disabled && /* @__PURE__ */ jsx17(
          "button",
          {
            type: "button",
            onClick: handleReset,
            className: "shrink-0 px-3 text-muted-foreground hover:text-foreground transition-colors",
            "aria-label": "\uD30C\uC77C \uCD08\uAE30\uD654",
            children: /* @__PURE__ */ jsx17(X, { className: "w-3.5 h-3.5" })
          }
        ),
        /* @__PURE__ */ jsx17(
          "input",
          {
            ref: resolvedRef,
            id: inputId,
            type: "file",
            multiple,
            disabled,
            className: "hidden",
            onChange: handleChange,
            "aria-invalid": isError,
            ...props
          }
        )
      ] }),
      (helperText || errorMessage) && /* @__PURE__ */ jsx17("p", { className: cn("text-xs", isError ? "text-ac-red-50" : "text-muted-foreground"), children: errorMessage || helperText })
    ] });
  }
);
FileInput.displayName = "FileInput";

// src/components/ToggleGroup/index.tsx
import * as React16 from "react";
import { cva as cva14 } from "class-variance-authority";
import { jsx as jsx18, jsxs as jsxs15 } from "react/jsx-runtime";
var ToggleGroupContext = React16.createContext({
  value: "",
  onValueChange: () => {
  },
  variant: "default",
  size: "md",
  iconOnly: false
});
var toggleItemVariants = cva14(
  [
    "inline-flex items-center justify-center gap-1.5 whitespace-nowrap",
    "font-medium text-sm transition-colors duration-150 select-none cursor-pointer",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
    "disabled:pointer-events-none disabled:opacity-40",
    "first:rounded-l-md last:rounded-r-md"
  ],
  {
    variants: {
      size: {
        sm: "h-[30px] px-3 text-xs",
        md: "h-9 px-4 text-sm",
        lg: "h-10 px-5 text-sm"
      },
      iconOnly: {
        true: "",
        false: ""
      }
    },
    compoundVariants: [
      { iconOnly: true, size: "sm", class: "w-[30px] px-0" },
      { iconOnly: true, size: "md", class: "w-9 px-0" },
      { iconOnly: true, size: "lg", class: "w-10 px-0" }
    ],
    defaultVariants: { size: "md", iconOnly: false }
  }
);
function ToggleGroup({
  value,
  defaultValue = "",
  onValueChange,
  variant = "default",
  size = "md",
  iconOnly = false,
  className,
  children,
  ...props
}) {
  const [internalValue, setInternalValue] = React16.useState(defaultValue);
  const controlled = value !== void 0;
  const currentValue = controlled ? value : internalValue;
  const handleValueChange = (val) => {
    if (!controlled) setInternalValue(val);
    onValueChange?.(val);
  };
  return /* @__PURE__ */ jsx18(ToggleGroupContext.Provider, { value: { value: currentValue, onValueChange: handleValueChange, variant, size, iconOnly }, children: /* @__PURE__ */ jsx18(
    "div",
    {
      role: "group",
      className: cn(
        "inline-flex rounded-md border border-border overflow-hidden divide-x divide-border",
        className
      ),
      ...props,
      children
    }
  ) });
}
function ToggleGroupItem({ value, icon, tooltip, children, className, disabled, ...props }) {
  const ctx = React16.useContext(ToggleGroupContext);
  const isActive = ctx.value === value;
  const activeStyles = isActive ? ctx.variant === "primary" ? "bg-ac-primary-50 text-white" : "bg-ac-gray-90 text-white" : "bg-background text-ac-gray-60 hover:bg-ac-gray-20 hover:text-foreground";
  return /* @__PURE__ */ jsxs15("div", { className: "relative group", children: [
    /* @__PURE__ */ jsxs15(
      "button",
      {
        type: "button",
        role: "radio",
        "aria-checked": isActive,
        disabled,
        onClick: () => ctx.onValueChange(value),
        className: cn(
          toggleItemVariants({ size: ctx.size, iconOnly: ctx.iconOnly }),
          activeStyles,
          className
        ),
        ...props,
        children: [
          icon && /* @__PURE__ */ jsx18("span", { className: "shrink-0", children: icon }),
          !ctx.iconOnly && children
        ]
      }
    ),
    ctx.iconOnly && tooltip && /* @__PURE__ */ jsx18("div", { className: "absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-ac-gray-90 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-tooltip", children: tooltip })
  ] });
}

// src/components/SideNavigation/index.tsx
import * as React17 from "react";
import { ChevronDown as ChevronDown3, ChevronUp as ChevronUp2 } from "lucide-react";
import { Fragment as Fragment5, jsx as jsx19, jsxs as jsxs16 } from "react/jsx-runtime";
var SideNavContext = React17.createContext(null);
function useSideNav() {
  const ctx = React17.useContext(SideNavContext);
  if (!ctx) throw new Error("Must be used within <SideNavigation>");
  return ctx;
}
var SideNavigation = React17.forwardRef(
  ({
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
  }, ref) => {
    const [internalActiveId, setInternalActiveId] = React17.useState(defaultActiveId);
    const [openIds, setOpenIds] = React17.useState(new Set(defaultOpenIds));
    const controlled = controlledActiveId !== void 0;
    const activeId = controlled ? controlledActiveId : internalActiveId;
    const onSelect = React17.useCallback((id) => {
      if (!controlled) setInternalActiveId(id);
      onActiveChange?.(id);
    }, [controlled, onActiveChange]);
    const toggleOpen = React17.useCallback((id) => {
      setOpenIds((prev) => {
        const next = new Set(prev);
        next.has(id) ? next.delete(id) : next.add(id);
        return next;
      });
    }, []);
    return /* @__PURE__ */ jsx19(SideNavContext.Provider, { value: { activeId, onSelect, openIds, toggleOpen, activeClassName, renderLink }, children: /* @__PURE__ */ jsxs16("nav", { ref, className: cn("flex flex-col w-full", className), ...props, children: [
      title && /* @__PURE__ */ jsx19("div", { className: "px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider select-none", children: title }),
      /* @__PURE__ */ jsx19(SideNavList, { items, depth: 1 })
    ] }) });
  }
);
SideNavigation.displayName = "SideNavigation";
function SideNavList({ items, depth }) {
  return /* @__PURE__ */ jsx19("ul", { role: "list", className: "flex flex-col w-full", children: items.map((item) => /* @__PURE__ */ jsx19(SideNavItemRow, { item, depth }, item.id)) });
}
function SideNavItemRow({ item, depth }) {
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
    isActive ? cn("font-semibold bg-ac-gray-20", activeClassName) : "text-foreground hover:text-foreground hover:bg-ac-gray-20"
  );
  const itemContent = /* @__PURE__ */ jsxs16(Fragment5, { children: [
    item.icon && /* @__PURE__ */ jsx19("span", { className: cn("shrink-0 w-4 h-4 flex items-center justify-center", isActive && activeClassName), children: item.icon }),
    /* @__PURE__ */ jsx19("span", { className: "flex-1 min-w-0 truncate text-left", children: item.label }),
    hasChildren && /* @__PURE__ */ jsx19("span", { className: "shrink-0 text-muted-foreground", children: isOpen ? /* @__PURE__ */ jsx19(ChevronUp2, { className: "w-4 h-4" }) : /* @__PURE__ */ jsx19(ChevronDown3, { className: "w-4 h-4" }) })
  ] });
  return /* @__PURE__ */ jsxs16("li", { children: [
    item.divider && /* @__PURE__ */ jsx19("div", { className: "my-1 h-px bg-border mx-3" }),
    item.href && !hasChildren && renderLink ? renderLink(item, itemContent, itemClassName) : item.href && !hasChildren ? /* @__PURE__ */ jsx19(
      "a",
      {
        href: item.href,
        "aria-current": isActive ? "page" : void 0,
        className: itemClassName,
        onClick: () => onSelect(item.id),
        children: itemContent
      }
    ) : /* @__PURE__ */ jsx19(
      "button",
      {
        type: "button",
        onClick: handleClick,
        "aria-current": isActive ? "page" : void 0,
        "aria-expanded": hasChildren ? isOpen : void 0,
        className: itemClassName,
        children: itemContent
      }
    ),
    hasChildren && isOpen && /* @__PURE__ */ jsx19(SideNavList, { items: item.children, depth: depth + 1 })
  ] });
}

// src/components/Tab/index.tsx
import * as React18 from "react";
import { jsx as jsx20, jsxs as jsxs17 } from "react/jsx-runtime";
var tabSizeClass = {
  sm: "h-9 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-5 text-base"
};
var TabContext = React18.createContext(null);
function useTab() {
  const ctx = React18.useContext(TabContext);
  if (!ctx) throw new Error("Must be used within <Tabs>");
  return ctx;
}
var Tabs = React18.forwardRef(
  ({
    className,
    value: controlledValue,
    defaultValue = "",
    onValueChange,
    variant = "fill",
    size = "md",
    activeColor = "#FF6300",
    /* ac-primary-50 */
    children,
    ...props
  }, ref) => {
    const [internalValue, setInternalValue] = React18.useState(defaultValue);
    const controlled = controlledValue !== void 0;
    const value = controlled ? controlledValue : internalValue;
    const onChange = React18.useCallback((v) => {
      if (!controlled) setInternalValue(v);
      onValueChange?.(v);
    }, [controlled, onValueChange]);
    return /* @__PURE__ */ jsx20(TabContext.Provider, { value: { value, onChange, variant, size, activeColor }, children: /* @__PURE__ */ jsx20("div", { ref, className: cn("w-full", className), ...props, children }) });
  }
);
Tabs.displayName = "Tabs";
var TabList = React18.forwardRef(
  ({ className, children, ...props }, ref) => {
    const { variant } = useTab();
    return /* @__PURE__ */ jsx20(
      "div",
      {
        ref,
        role: "tablist",
        className: cn(
          "relative flex border-b border-ac-gray-30",
          variant === "full" && "w-full",
          className
        ),
        ...props,
        children
      }
    );
  }
);
TabList.displayName = "TabList";
var TabTrigger = React18.forwardRef(
  ({ className, value, children, disabled, ...props }, ref) => {
    const { value: selected, onChange, variant, size, activeColor } = useTab();
    const isActive = selected === value;
    return /* @__PURE__ */ jsxs17(
      "button",
      {
        ref,
        role: "tab",
        type: "button",
        "aria-selected": isActive,
        "aria-disabled": disabled,
        tabIndex: isActive ? 0 : -1,
        disabled,
        onClick: () => !disabled && onChange(value),
        className: cn(
          "relative inline-flex items-center justify-center whitespace-nowrap",
          "font-medium transition-colors duration-normal select-none",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset",
          tabSizeClass[size],
          variant === "full" && "flex-1",
          isActive ? "" : "text-muted-foreground hover:text-foreground",
          disabled && "opacity-40 pointer-events-none",
          className
        ),
        style: isActive ? { color: activeColor } : void 0,
        ...props,
        children: [
          children,
          isActive && /* @__PURE__ */ jsx20(
            "span",
            {
              className: "absolute bottom-0 left-0 right-0 h-0.5",
              style: { backgroundColor: activeColor },
              "aria-hidden": "true"
            }
          )
        ]
      }
    );
  }
);
TabTrigger.displayName = "TabTrigger";
var TabContent = React18.forwardRef(
  ({ className, value, children, ...props }, ref) => {
    const { value: selected } = useTab();
    const isActive = selected === value;
    if (!isActive) return null;
    return /* @__PURE__ */ jsx20(
      "div",
      {
        ref,
        role: "tabpanel",
        tabIndex: 0,
        className: cn("mt-4 focus-visible:outline-none", className),
        ...props,
        children
      }
    );
  }
);
TabContent.displayName = "TabContent";

// src/components/Snackbar/index.tsx
import * as React19 from "react";
import { createPortal } from "react-dom";
import { X as X2, ChevronRight as ChevronRight2, Check as Check2 } from "lucide-react";
import { jsx as jsx21, jsxs as jsxs18 } from "react/jsx-runtime";
var variantBgClass = {
  default: "bg-ac-orange-10",
  error: "bg-ac-red-10",
  success: "bg-ac-green-10",
  info: "bg-ac-blue-10",
  warning: "bg-ac-orange-20"
};
var variantTextClass = {
  default: "text-ac-gray-90",
  error: "text-ac-gray-90",
  success: "text-ac-gray-90",
  info: "text-ac-gray-90",
  warning: "text-ac-gray-90"
};
var sizeContainerClass = {
  sm: "h-8 px-2",
  md: "h-9 px-2",
  lg: "h-11 px-3"
};
var sizeTextClass = {
  sm: "text-xs",
  md: "text-xs",
  lg: "text-sm"
};
var sizeCollapsedClass = {
  sm: "w-8 h-8",
  md: "w-9 h-9",
  lg: "w-11 h-11"
};
var variantIconClass = {
  default: "[&_svg]:text-ac-orange-50",
  error: "[&_svg]:text-ac-red-50",
  success: "[&_svg]:text-ac-green-50",
  info: "[&_svg]:text-ac-blue-50",
  warning: "[&_svg]:text-ac-orange-50"
};
var SnackbarContext = React19.createContext(null);
function useSnackbar() {
  const ctx = React19.useContext(SnackbarContext);
  if (!ctx) throw new Error("Must be used within <SnackbarProvider>");
  return ctx;
}
function SnackbarProvider({
  children,
  position = "bottom",
  maxCount = 3,
  defaultDuration = 4e3
}) {
  const [items, setItems] = React19.useState([]);
  const [mounted, setMounted] = React19.useState(false);
  React19.useEffect(() => {
    setMounted(true);
  }, []);
  const show = React19.useCallback((item) => {
    const id = Math.random().toString(36).slice(2);
    setItems((prev) => {
      const next = [...prev, { ...item, id }];
      return next.length > maxCount ? next.slice(next.length - maxCount) : next;
    });
    const duration = item.duration ?? defaultDuration;
    if (duration > 0) {
      setTimeout(() => dismiss(id), duration);
    }
    return id;
  }, [maxCount, defaultDuration]);
  const dismiss = React19.useCallback((id) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);
  const dismissAll = React19.useCallback(() => setItems([]), []);
  const positionClass = position === "top" ? "top-4 left-1/2 -translate-x-1/2" : "bottom-4 left-1/2 -translate-x-1/2";
  return /* @__PURE__ */ jsxs18(SnackbarContext.Provider, { value: { show, dismiss, dismissAll }, children: [
    children,
    mounted && createPortal(
      /* @__PURE__ */ jsx21(
        "div",
        {
          "aria-live": "polite",
          "aria-atomic": "false",
          className: cn(
            "fixed z-toast flex flex-col gap-2 w-full max-w-[480px] px-4",
            positionClass
          ),
          children: items.map((item) => /* @__PURE__ */ jsx21(SnackbarItem, { item, onDismiss: dismiss }, item.id))
        }
      ),
      document.body
    )
  ] });
}
function SnackbarItem({
  item,
  onDismiss
}) {
  const {
    id,
    message,
    variant = "default",
    leftItem,
    rightItem,
    iconColorClass,
    bgColorClass,
    textColorClass,
    onAction
  } = item;
  const renderRight = () => {
    if (!rightItem) return null;
    if (rightItem === "close") return /* @__PURE__ */ jsx21(
      "button",
      {
        type: "button",
        onClick: () => onDismiss(id),
        "aria-label": "\uB2EB\uAE30",
        className: "shrink-0 p-0.5 rounded opacity-70 hover:opacity-100 transition-opacity",
        children: /* @__PURE__ */ jsx21(X2, { className: "w-4 h-4" })
      }
    );
    if (rightItem === "chevron") return /* @__PURE__ */ jsx21(
      "button",
      {
        type: "button",
        onClick: onAction,
        "aria-label": "\uB354\uBCF4\uAE30",
        className: "shrink-0 p-0.5 rounded opacity-70 hover:opacity-100 transition-opacity",
        children: /* @__PURE__ */ jsx21(ChevronRight2, { className: "w-4 h-4" })
      }
    );
    if (rightItem === "check") return /* @__PURE__ */ jsx21(Check2, { className: "shrink-0 w-4 h-4 opacity-80" });
    return /* @__PURE__ */ jsx21("span", { className: "shrink-0 flex items-center", children: rightItem });
  };
  return /* @__PURE__ */ jsxs18(
    "div",
    {
      role: "status",
      className: cn(
        "flex items-center gap-1 w-full",
        "p-2 rounded-xl",
        "animate-slide-up",
        bgColorClass ?? variantBgClass[variant],
        textColorClass ?? variantTextClass[variant]
      ),
      children: [
        leftItem && /* @__PURE__ */ jsx21("span", { className: cn("shrink-0 flex items-center justify-center", iconColorClass ?? variantIconClass[variant]), children: leftItem }),
        /* @__PURE__ */ jsx21("span", { className: "flex-1 text-xs font-medium leading-snug min-w-0", children: message }),
        renderRight()
      ]
    }
  );
}
var Snackbar = React19.forwardRef(
  ({
    className,
    message,
    variant = "default",
    size = "md",
    leftItem,
    rightItem,
    iconColorClass,
    bgColorClass,
    textColorClass,
    closeMode = "dismiss",
    onClose,
    onAction,
    ...props
  }, ref) => {
    const [visible, setVisible] = React19.useState(true);
    const [collapsed, setCollapsed] = React19.useState(false);
    const handleClose = () => {
      if (closeMode === "hide-right") {
        setCollapsed(true);
      } else {
        setVisible(false);
      }
      onClose?.();
    };
    if (!visible) return null;
    if (collapsed) {
      return /* @__PURE__ */ jsx21(
        "div",
        {
          role: "status",
          onClick: () => setCollapsed(false),
          className: cn(
            "inline-flex items-center justify-center rounded-full cursor-pointer",
            "transition-colors hover:opacity-80",
            sizeCollapsedClass[size],
            bgColorClass ?? variantBgClass[variant]
          ),
          children: /* @__PURE__ */ jsx21("span", { className: cn("flex items-center justify-center", iconColorClass ?? variantIconClass[variant]), children: leftItem })
        }
      );
    }
    const renderRight = () => {
      if (!rightItem) return null;
      if (rightItem === "close") return /* @__PURE__ */ jsx21(
        "button",
        {
          type: "button",
          onClick: handleClose,
          "aria-label": "\uB2EB\uAE30",
          className: "shrink-0 p-0.5 rounded opacity-70 hover:opacity-100 transition-opacity",
          children: /* @__PURE__ */ jsx21(X2, { className: "w-4 h-4" })
        }
      );
      if (rightItem === "chevron") return /* @__PURE__ */ jsx21(
        "button",
        {
          type: "button",
          onClick: onAction,
          "aria-label": "\uB354\uBCF4\uAE30",
          className: "shrink-0 p-0.5 rounded opacity-70 hover:opacity-100 transition-opacity",
          children: /* @__PURE__ */ jsx21(ChevronRight2, { className: "w-4 h-4" })
        }
      );
      if (rightItem === "check") return /* @__PURE__ */ jsx21(Check2, { className: "shrink-0 w-4 h-4 opacity-80" });
      return /* @__PURE__ */ jsx21("span", { className: "shrink-0 flex items-center", children: rightItem });
    };
    return /* @__PURE__ */ jsxs18(
      "div",
      {
        ref,
        role: "status",
        className: cn(
          "flex items-center gap-1 w-full",
          "rounded-xl",
          sizeContainerClass[size],
          bgColorClass ?? variantBgClass[variant],
          textColorClass ?? variantTextClass[variant],
          className
        ),
        ...props,
        children: [
          leftItem && /* @__PURE__ */ jsx21("span", { className: cn("shrink-0 flex items-center justify-center", iconColorClass ?? variantIconClass[variant]), children: leftItem }),
          /* @__PURE__ */ jsx21("span", { className: cn("flex-1 font-medium leading-snug min-w-0", sizeTextClass[size]), children: message }),
          renderRight()
        ]
      }
    );
  }
);
Snackbar.displayName = "Snackbar";

// src/components/Pagination/index.tsx
import * as React20 from "react";
import { ChevronLeft as ChevronLeft2, ChevronRight as ChevronRight3 } from "lucide-react";
import { jsx as jsx22, jsxs as jsxs19 } from "react/jsx-runtime";
function getPageNumbers(current, total, maxVisible = 10) {
  if (total <= maxVisible) return Array.from({ length: total }, (_, i) => i + 1);
  const pages = [];
  const delta = 2;
  const left = Math.max(2, current - delta);
  const right = Math.min(total - 1, current + delta);
  pages.push(1);
  if (left > 2) pages.push("...");
  for (let i = left; i <= right; i++) pages.push(i);
  if (right < total - 1) pages.push("...");
  pages.push(total);
  return pages;
}
var Pagination = React20.forwardRef(
  ({
    className,
    total,
    page: controlledPage,
    defaultPage = 1,
    onPageChange,
    type = "default",
    disabled = false,
    activeColorClass,
    showPageSize = false,
    pageSizeOptions = [10, 20, 40, 100],
    pageSize: controlledPageSize,
    defaultPageSize = 10,
    onPageSizeChange,
    showJumper = false,
    ...props
  }, ref) => {
    const [internalPage, setInternalPage] = React20.useState(defaultPage);
    const [internalPageSize, setInternalPageSize] = React20.useState(defaultPageSize);
    const [jumperValue, setJumperValue] = React20.useState("");
    const controlled = controlledPage !== void 0;
    const page = controlled ? controlledPage : internalPage;
    const pageSizeControlled = controlledPageSize !== void 0;
    const pageSize = pageSizeControlled ? controlledPageSize : internalPageSize;
    const goTo = (p) => {
      if (disabled) return;
      const next = Math.max(1, Math.min(p, total));
      if (!controlled) setInternalPage(next);
      onPageChange?.(next);
    };
    const handlePageSizeChange = (val) => {
      const size = Number(val);
      if (!pageSizeControlled) setInternalPageSize(size);
      onPageSizeChange?.(size);
      goTo(1);
    };
    const handleJumper = (e) => {
      if (e.key === "Enter") {
        const target = Number(jumperValue);
        if (!isNaN(target) && target > 0) goTo(target);
        setJumperValue("");
      }
    };
    const pageBtn = (active) => cn(
      "inline-flex items-center justify-center h-9 w-9 rounded-md text-xs font-bold",
      "transition-colors duration-fast select-none",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
      active ? "text-ac-white" : "text-ac-gray-80 hover:text-ac-primary-50",
      disabled && "opacity-40 pointer-events-none"
    );
    if (type === "simple") {
      return /* @__PURE__ */ jsxs19(
        "div",
        {
          ref,
          role: "navigation",
          "aria-label": "\uD398\uC774\uC9C0\uB124\uC774\uC158",
          className: cn("flex items-center gap-3", className),
          ...props,
          children: [
            /* @__PURE__ */ jsx22(
              Button,
              {
                variant: "tertiary",
                size: "icon-sm",
                onClick: () => goTo(page - 1),
                disabled: disabled || page <= 1,
                "aria-label": "\uC774\uC804 \uD398\uC774\uC9C0",
                children: /* @__PURE__ */ jsx22(ChevronLeft2, {})
              }
            ),
            /* @__PURE__ */ jsxs19("div", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsx22("div", { className: "w-10", children: /* @__PURE__ */ jsx22(
                TextInput,
                {
                  type: "number",
                  size: "md",
                  value: String(page),
                  onChange: (e) => {
                    const v = Number(e.target.value);
                    if (!isNaN(v) && v >= 1 && v <= total) goTo(v);
                  },
                  disabled,
                  className: "text-center tabular-nums [&_input]:appearance-none [&_input]:[appearance:textfield] [&_input::-webkit-inner-spin-button]:appearance-none [&_input::-webkit-outer-spin-button]:appearance-none",
                  "aria-label": "\uD604\uC7AC \uD398\uC774\uC9C0"
                }
              ) }),
              /* @__PURE__ */ jsxs19("span", { className: "text-sm text-ac-gray-60", children: [
                "/ ",
                total
              ] })
            ] }),
            /* @__PURE__ */ jsx22(
              Button,
              {
                variant: "tertiary",
                size: "icon-sm",
                onClick: () => goTo(page + 1),
                disabled: disabled || page >= total,
                "aria-label": "\uB2E4\uC74C \uD398\uC774\uC9C0",
                children: /* @__PURE__ */ jsx22(ChevronRight3, {})
              }
            )
          ]
        }
      );
    }
    const pages = getPageNumbers(page, total);
    return /* @__PURE__ */ jsxs19(
      "div",
      {
        ref,
        role: "navigation",
        "aria-label": "\uD398\uC774\uC9C0\uB124\uC774\uC158",
        className: cn("flex items-center gap-2 flex-wrap", className),
        ...props,
        children: [
          /* @__PURE__ */ jsx22(
            Button,
            {
              variant: "tertiary",
              size: "sm",
              onClick: () => goTo(page - 1),
              disabled: disabled || page <= 1,
              leftIcon: /* @__PURE__ */ jsx22(ChevronLeft2, {}),
              "aria-label": "\uC774\uC804 \uD398\uC774\uC9C0",
              children: "\uC774\uC804"
            }
          ),
          pages.map(
            (p, i) => p === "..." ? /* @__PURE__ */ jsx22(
              "span",
              {
                className: "w-9 text-center text-xs text-foreground select-none",
                children: "\u2026"
              },
              `ellipsis-${i}`
            ) : /* @__PURE__ */ jsx22(
              "button",
              {
                onClick: () => goTo(p),
                disabled,
                "aria-current": p === page ? "page" : void 0,
                className: cn(pageBtn(p === page), p === page && (activeColorClass ?? "bg-ac-primary-50")),
                style: void 0,
                children: p
              },
              p
            )
          ),
          /* @__PURE__ */ jsx22(
            Button,
            {
              variant: "tertiary",
              size: "sm",
              onClick: () => goTo(page + 1),
              disabled: disabled || page >= total,
              rightIcon: /* @__PURE__ */ jsx22(ChevronRight3, {}),
              "aria-label": "\uB2E4\uC74C \uD398\uC774\uC9C0",
              children: "\uB2E4\uC74C"
            }
          ),
          showPageSize && /* @__PURE__ */ jsx22("div", { className: "w-28", children: /* @__PURE__ */ jsx22(
            Select,
            {
              size: "md",
              value: String(pageSize),
              onValueChange: handlePageSizeChange,
              disabled,
              options: pageSizeOptions.map((s) => ({ label: `${s} / page`, value: String(s) }))
            }
          ) }),
          showJumper && /* @__PURE__ */ jsxs19("div", { className: "flex items-center gap-1.5 ml-1", children: [
            /* @__PURE__ */ jsx22("span", { className: "text-sm text-foreground", children: "Go to" }),
            /* @__PURE__ */ jsx22("div", { className: "w-16", children: /* @__PURE__ */ jsx22(
              TextInput,
              {
                type: "number",
                size: "md",
                value: jumperValue,
                onChange: (e) => setJumperValue(e.target.value),
                onKeyDown: handleJumper,
                disabled,
                className: "text-center tabular-nums [&_input]:appearance-none [&_input]:[appearance:textfield] [&_input::-webkit-inner-spin-button]:appearance-none [&_input::-webkit-outer-spin-button]:appearance-none",
                "aria-label": "\uC774\uB3D9\uD560 \uD398\uC774\uC9C0 \uBC88\uD638"
              }
            ) })
          ] })
        ]
      }
    );
  }
);
Pagination.displayName = "Pagination";

// src/components/ProgressIndicator/index.tsx
import * as React21 from "react";
import { jsx as jsx23, jsxs as jsxs20 } from "react/jsx-runtime";
var linearHeightMap = {
  sm: "h-[4px]",
  md: "h-[10px]",
  lg: "h-[20px]",
  xl: "h-[30px]"
};
var circularSizeMap = {
  xs: 16,
  sm: 30,
  md: 60,
  lg: 80,
  xl: 100
};
var ProgressIndicator = React21.forwardRef(
  ({
    className,
    type = "linear",
    value = 0,
    max = 100,
    linearSize = "md",
    circularSize = "md",
    color = "#FF6300",
    /* ac-primary-50 */
    trackColor = "#ECECEC",
    /* ac-gray-30 */
    label,
    showValue = false,
    indeterminate = false,
    ...props
  }, ref) => {
    const pct = indeterminate ? 0 : Math.min(100, Math.max(0, value / max * 100));
    if (type === "linear") {
      return /* @__PURE__ */ jsxs20("div", { ref, className: cn("flex flex-col gap-1.5 w-full", className), ...props, children: [
        (label || showValue) && /* @__PURE__ */ jsxs20("div", { className: "flex items-center justify-between gap-2", children: [
          label && /* @__PURE__ */ jsx23("span", { className: "text-sm text-foreground", children: label }),
          showValue && !indeterminate && /* @__PURE__ */ jsxs20("span", { className: "text-sm font-medium text-foreground tabular-nums ml-auto", children: [
            Math.round(pct),
            "%"
          ] })
        ] }),
        /* @__PURE__ */ jsx23(
          "div",
          {
            role: "progressbar",
            "aria-valuenow": indeterminate ? void 0 : value,
            "aria-valuemin": 0,
            "aria-valuemax": max,
            "aria-label": label,
            className: cn(
              "w-full rounded-full overflow-hidden",
              linearHeightMap[linearSize]
            ),
            style: { backgroundColor: trackColor },
            children: /* @__PURE__ */ jsx23(
              "div",
              {
                className: cn(
                  "h-full rounded-full transition-all duration-slow",
                  indeterminate && "animate-[indeterminate_1.5s_ease-in-out_infinite]"
                ),
                style: {
                  width: indeterminate ? "40%" : `${pct}%`,
                  backgroundColor: color
                }
              }
            )
          }
        )
      ] });
    }
    const size = circularSizeMap[circularSize];
    const strokeWidth = Math.max(2, size * 0.1);
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const dashOffset = indeterminate ? circumference * 0.75 : circumference * (1 - pct / 100);
    return /* @__PURE__ */ jsxs20("div", { ref, className: cn("inline-flex flex-col items-center gap-2", className), ...props, children: [
      /* @__PURE__ */ jsxs20("div", { className: "relative inline-flex items-center justify-center", style: { width: size, height: size }, children: [
        /* @__PURE__ */ jsxs20(
          "svg",
          {
            width: size,
            height: size,
            viewBox: `0 0 ${size} ${size}`,
            role: "progressbar",
            "aria-valuenow": indeterminate ? void 0 : value,
            "aria-valuemin": 0,
            "aria-valuemax": max,
            "aria-label": label,
            className: indeterminate ? "animate-spin" : void 0,
            style: indeterminate ? { animationDuration: "1s" } : void 0,
            children: [
              /* @__PURE__ */ jsx23(
                "circle",
                {
                  cx: size / 2,
                  cy: size / 2,
                  r: radius,
                  fill: "none",
                  stroke: trackColor,
                  strokeWidth
                }
              ),
              /* @__PURE__ */ jsx23(
                "circle",
                {
                  cx: size / 2,
                  cy: size / 2,
                  r: radius,
                  fill: "none",
                  stroke: color,
                  strokeWidth,
                  strokeLinecap: "round",
                  strokeDasharray: circumference,
                  strokeDashoffset: dashOffset,
                  transform: `rotate(-90 ${size / 2} ${size / 2})`,
                  className: indeterminate ? void 0 : "transition-all duration-slow"
                }
              )
            ]
          }
        ),
        showValue && !indeterminate && /* @__PURE__ */ jsxs20(
          "span",
          {
            className: "absolute text-foreground font-semibold tabular-nums",
            style: { fontSize: Math.max(10, size * 0.2) },
            children: [
              Math.round(pct),
              "%"
            ]
          }
        )
      ] }),
      label && /* @__PURE__ */ jsx23("span", { className: "text-sm text-foreground text-center", children: label })
    ] });
  }
);
ProgressIndicator.displayName = "ProgressIndicator";

// src/components/Dropdown/index.tsx
import * as React22 from "react";
import { ChevronRight as ChevronRight4, ExternalLink } from "lucide-react";
import { jsx as jsx24, jsxs as jsxs21 } from "react/jsx-runtime";
var DropdownContext = React22.createContext(null);
function useDropdown() {
  const ctx = React22.useContext(DropdownContext);
  if (!ctx) throw new Error("Must be used within <Dropdown>");
  return ctx;
}
var SubDropdownContext = React22.createContext(null);
function Dropdown({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  side = "bottom",
  align = "start",
  children
}) {
  const [internalOpen, setInternalOpen] = React22.useState(defaultOpen);
  const controlled = controlledOpen !== void 0;
  const open = controlled ? controlledOpen : internalOpen;
  const triggerRef = React22.useRef(null);
  const setOpen = React22.useCallback((v) => {
    if (!controlled) setInternalOpen(v);
    onOpenChange?.(v);
  }, [controlled, onOpenChange]);
  const containerRef = React22.useRef(null);
  React22.useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open, setOpen]);
  React22.useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, setOpen]);
  return /* @__PURE__ */ jsx24(DropdownContext.Provider, { value: { open, setOpen, triggerRef, side, align }, children: /* @__PURE__ */ jsx24("div", { ref: containerRef, className: "relative inline-block", children }) });
}
Dropdown.displayName = "Dropdown";
function DropdownTrigger({ children, asChild, disabled, onClick, ...props }) {
  const { setOpen, open, triggerRef } = useDropdown();
  const handleClick = (e) => {
    if (disabled) return;
    onClick?.(e);
    setOpen(!open);
  };
  if (asChild && React22.isValidElement(children)) {
    return React22.cloneElement(children, {
      ref: triggerRef,
      onClick: handleClick,
      "aria-haspopup": "menu",
      "aria-expanded": open,
      disabled
    });
  }
  return /* @__PURE__ */ jsx24(
    "button",
    {
      ref: triggerRef,
      type: "button",
      onClick: handleClick,
      "aria-haspopup": "menu",
      "aria-expanded": open,
      disabled,
      ...props,
      children
    }
  );
}
DropdownTrigger.displayName = "DropdownTrigger";
function getSideAlignClass(side, align) {
  const sideMap = {
    bottom: "top-full mt-1",
    top: "bottom-full mb-1",
    left: "right-full mr-1 top-0",
    right: "left-full ml-1 top-0"
  };
  const alignMapV = {
    start: "left-0",
    center: "left-1/2 -translate-x-1/2",
    end: "right-0"
  };
  const alignMapH = {
    start: "top-0",
    center: "top-1/2 -translate-y-1/2",
    end: "bottom-0"
  };
  const isVertical = side === "top" || side === "bottom";
  return cn(sideMap[side], isVertical ? alignMapV[align] : alignMapH[align]);
}
var DropdownContent = React22.forwardRef(
  ({ className, children, minWidth = 160, ...props }, ref) => {
    const { open, side, align } = useDropdown();
    const [openSub, setOpenSub] = React22.useState(null);
    if (!open) return null;
    return /* @__PURE__ */ jsx24(SubDropdownContext.Provider, { value: { openSub, setOpenSub }, children: /* @__PURE__ */ jsx24(
      "div",
      {
        ref,
        role: "menu",
        "aria-orientation": "vertical",
        className: cn(
          "absolute z-dropdown",
          "bg-background rounded-md border border-border shadow-md",
          "py-1 animate-scale-in",
          getSideAlignClass(side, align),
          className
        ),
        style: { minWidth },
        ...props,
        children
      }
    ) });
  }
);
DropdownContent.displayName = "DropdownContent";
var DropdownLabel = React22.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx24(
    "div",
    {
      ref,
      className: cn("px-3 py-1 text-xs font-medium text-muted-foreground select-none", className),
      ...props
    }
  )
);
DropdownLabel.displayName = "DropdownLabel";
var DropdownSeparator = React22.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx24("div", { ref, role: "separator", className: cn("my-1 h-px bg-border mx-0", className), ...props })
);
DropdownSeparator.displayName = "DropdownSeparator";
var DropdownItem = React22.forwardRef(
  ({
    className,
    children,
    icon,
    shortcut,
    external,
    hasSubmenu,
    disabled,
    small,
    onSelect,
    onClick,
    ...props
  }, ref) => {
    const { setOpen } = useDropdown();
    const handleClick = (e) => {
      if (disabled) return;
      onClick?.(e);
      onSelect?.();
      if (!hasSubmenu) setOpen(false);
    };
    return /* @__PURE__ */ jsxs21(
      "div",
      {
        ref,
        role: "menuitem",
        "aria-disabled": disabled,
        tabIndex: disabled ? -1 : 0,
        onClick: handleClick,
        onKeyDown: (e) => {
          if (e.key === "Enter" || e.key === " ") handleClick(e);
        },
        className: cn(
          "flex items-center gap-2 w-full cursor-pointer select-none",
          "transition-colors duration-fast",
          small ? "px-3 py-1.5 text-xs" : "px-3 py-2 text-sm",
          disabled ? "text-muted-foreground opacity-50 cursor-not-allowed pointer-events-none" : "text-foreground hover:bg-ac-gray-20",
          className
        ),
        ...props,
        children: [
          icon && /* @__PURE__ */ jsx24("span", { className: "shrink-0 w-4 h-4 flex items-center justify-center text-muted-foreground", children: icon }),
          /* @__PURE__ */ jsx24("span", { className: "flex-1 min-w-0 truncate", children }),
          shortcut && /* @__PURE__ */ jsx24("span", { className: "shrink-0 text-xs text-muted-foreground ml-auto pl-4 tabular-nums", children: shortcut }),
          external && /* @__PURE__ */ jsx24(ExternalLink, { className: "shrink-0 w-3 h-3 text-muted-foreground ml-auto" }),
          hasSubmenu && /* @__PURE__ */ jsx24(ChevronRight4, { className: "shrink-0 w-4 h-4 text-muted-foreground ml-auto" })
        ]
      }
    );
  }
);
DropdownItem.displayName = "DropdownItem";
var DropdownCheckboxItem = React22.forwardRef(
  ({ className, children, checked: controlledChecked, defaultChecked = false, onCheckedChange, disabled, icon, ...props }, ref) => {
    const [internalChecked, setInternalChecked] = React22.useState(defaultChecked);
    const controlled = controlledChecked !== void 0;
    const checked = controlled ? controlledChecked : internalChecked;
    const handleChange = (e) => {
      const next = e.target.checked;
      if (!controlled) setInternalChecked(next);
      onCheckedChange?.(next);
    };
    return /* @__PURE__ */ jsxs21(
      "div",
      {
        ref,
        role: "menuitemcheckbox",
        "aria-checked": checked,
        className: cn(
          "flex items-center gap-2 px-3 py-2 text-sm w-full select-none",
          "transition-colors duration-fast",
          disabled ? "opacity-50 pointer-events-none" : "hover:bg-ac-gray-20",
          className
        ),
        ...props,
        children: [
          /* @__PURE__ */ jsx24(
            Checkbox,
            {
              size: "lg",
              checked,
              disabled,
              onChange: handleChange,
              onClick: (e) => e.stopPropagation()
            }
          ),
          icon && /* @__PURE__ */ jsx24("span", { className: "shrink-0 w-4 h-4 flex items-center justify-center text-muted-foreground", children: icon }),
          /* @__PURE__ */ jsx24("span", { className: "flex-1 min-w-0 truncate text-foreground", children })
        ]
      }
    );
  }
);
DropdownCheckboxItem.displayName = "DropdownCheckboxItem";
var DropdownRadioContext = React22.createContext(null);
function DropdownRadioGroup({ value: controlledValue, defaultValue = "", onValueChange, children, ...props }) {
  const [internalValue, setInternalValue] = React22.useState(defaultValue);
  const controlled = controlledValue !== void 0;
  const value = controlled ? controlledValue : internalValue;
  const handleChange = (v) => {
    if (!controlled) setInternalValue(v);
    onValueChange?.(v);
  };
  return /* @__PURE__ */ jsx24(DropdownRadioContext.Provider, { value: { value, onValueChange: handleChange }, children: /* @__PURE__ */ jsx24("div", { role: "group", ...props, children }) });
}
DropdownRadioGroup.displayName = "DropdownRadioGroup";
var DropdownRadioItem = React22.forwardRef(
  ({ className, children, value, disabled, icon, ...props }, ref) => {
    const radioCtx = React22.useContext(DropdownRadioContext);
    const checked = radioCtx?.value === value;
    const handleChange = () => {
      if (!disabled) radioCtx?.onValueChange(value);
    };
    return /* @__PURE__ */ jsxs21(
      "div",
      {
        ref,
        role: "menuitemradio",
        "aria-checked": checked,
        className: cn(
          "flex items-center gap-2 px-3 py-2 text-sm w-full select-none",
          "transition-colors duration-fast",
          disabled ? "opacity-50 pointer-events-none" : "hover:bg-ac-gray-20",
          className
        ),
        ...props,
        children: [
          /* @__PURE__ */ jsx24(
            Radio,
            {
              size: "lg",
              checked,
              disabled,
              onChange: handleChange,
              onClick: (e) => e.stopPropagation()
            }
          ),
          icon && /* @__PURE__ */ jsx24("span", { className: "shrink-0 w-4 h-4 flex items-center justify-center text-muted-foreground", children: icon }),
          /* @__PURE__ */ jsx24("span", { className: "flex-1 min-w-0 truncate text-foreground", children })
        ]
      }
    );
  }
);
DropdownRadioItem.displayName = "DropdownRadioItem";
function DropdownSubMenu({ id, trigger, children, disabled }) {
  const subCtx = React22.useContext(SubDropdownContext);
  const isOpen = subCtx?.openSub === id;
  const ref = React22.useRef(null);
  const handleMouseEnter = () => {
    if (!disabled) subCtx?.setOpenSub(id);
  };
  const handleMouseLeave = () => subCtx?.setOpenSub(null);
  return /* @__PURE__ */ jsxs21(
    "div",
    {
      ref,
      className: "relative",
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      children: [
        /* @__PURE__ */ jsxs21(
          "div",
          {
            role: "menuitem",
            "aria-haspopup": "menu",
            "aria-expanded": isOpen,
            "aria-disabled": disabled,
            className: cn(
              "flex items-center gap-2 px-3 py-2 text-sm w-full cursor-pointer select-none",
              "transition-colors duration-fast",
              disabled ? "text-muted-foreground opacity-50 cursor-not-allowed pointer-events-none" : "text-foreground hover:bg-ac-gray-20"
            ),
            children: [
              /* @__PURE__ */ jsx24("span", { className: "flex-1 min-w-0 truncate", children: trigger }),
              /* @__PURE__ */ jsx24(ChevronRight4, { className: "shrink-0 w-4 h-4 text-muted-foreground" })
            ]
          }
        ),
        isOpen && /* @__PURE__ */ jsx24(
          "div",
          {
            role: "menu",
            className: cn(
              "absolute left-full top-0 ml-1 z-dropdown",
              "bg-background rounded-md border border-border shadow-md",
              "py-1 min-w-[160px] animate-scale-in"
            ),
            children
          }
        )
      ]
    }
  );
}
DropdownSubMenu.displayName = "DropdownSubMenu";

// src/components/Dialog/index.tsx
import * as React23 from "react";
import { createPortal as createPortal2 } from "react-dom";
import { X as X3 } from "lucide-react";
import { jsx as jsx25, jsxs as jsxs22 } from "react/jsx-runtime";
var dialogSizeClass = {
  sm: "w-full max-w-[500px]",
  md: "w-full max-w-[800px]",
  lg: "w-full max-w-[1000px]"
};
var DialogContext = React23.createContext(null);
function useDialogContext() {
  const ctx = React23.useContext(DialogContext);
  if (!ctx) throw new Error("Must be used within <Dialog>");
  return ctx;
}
function Dialog({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  size = "sm",
  closeOnScrim = true,
  closeOnEsc = true,
  children
}) {
  const [internalOpen, setInternalOpen] = React23.useState(defaultOpen);
  const controlled = controlledOpen !== void 0;
  const open = controlled ? controlledOpen : internalOpen;
  const openDialog = React23.useCallback(() => {
    if (!controlled) setInternalOpen(true);
    onOpenChange?.(true);
  }, [controlled, onOpenChange]);
  const close = React23.useCallback(() => {
    if (!controlled) setInternalOpen(false);
    onOpenChange?.(false);
  }, [controlled, onOpenChange]);
  React23.useEffect(() => {
    if (!open || !closeOnEsc) return;
    const handler = (e) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, closeOnEsc, close]);
  React23.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);
  return /* @__PURE__ */ jsx25(DialogContext.Provider, { value: { open, openDialog, close, size }, children });
}
Dialog.displayName = "Dialog";
function DialogTrigger({ children, asChild, onClick, ...props }) {
  const { openDialog } = useDialogContext();
  const handleClick = (e) => {
    onClick?.(e);
    openDialog();
  };
  if (asChild && React23.isValidElement(children)) {
    return React23.cloneElement(children, {
      onClick: handleClick
    });
  }
  return /* @__PURE__ */ jsx25("button", { type: "button", onClick: handleClick, ...props, children });
}
DialogTrigger.displayName = "DialogTrigger";
function DialogPortal({ children }) {
  const [mounted, setMounted] = React23.useState(false);
  React23.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted || typeof document === "undefined") return null;
  return createPortal2(children, document.body);
}
var DialogContent = React23.forwardRef(
  ({ className, children, closeOnScrim = true, ...props }, ref) => {
    const { open, close, size } = useDialogContext();
    if (!open) return null;
    return /* @__PURE__ */ jsxs22(DialogPortal, { children: [
      /* @__PURE__ */ jsx25(
        "div",
        {
          "aria-hidden": "true",
          className: "fixed inset-0 z-modal animate-fade-in",
          style: { backgroundColor: "rgba(0,0,0,0.5)" },
          onClick: closeOnScrim ? close : void 0
        }
      ),
      /* @__PURE__ */ jsx25(
        "div",
        {
          className: "fixed inset-0 z-modal flex items-center justify-center p-4 pointer-events-none",
          children: /* @__PURE__ */ jsx25(
            "div",
            {
              ref,
              role: "dialog",
              "aria-modal": "true",
              className: cn(
                "relative pointer-events-auto",
                "flex flex-col bg-background rounded-lg",
                "shadow-2xl",
                "max-h-[90vh]",
                "animate-scale-in",
                dialogSizeClass[size],
                className
              ),
              onClick: (e) => e.stopPropagation(),
              ...props,
              children
            }
          )
        }
      )
    ] });
  }
);
DialogContent.displayName = "DialogContent";
var DialogHeader = React23.forwardRef(
  ({ className, title, subtitle, showClose = true, children, ...props }, ref) => {
    const { close } = useDialogContext();
    return /* @__PURE__ */ jsxs22(
      "div",
      {
        ref,
        className: cn(
          "flex items-start justify-between gap-4",
          "px-6 py-4 border-b border-border shrink-0",
          className
        ),
        ...props,
        children: [
          /* @__PURE__ */ jsxs22("div", { className: "flex flex-col gap-0.5 min-w-0 flex-1", children: [
            title && /* @__PURE__ */ jsx25("h2", { className: "text-base font-semibold text-foreground leading-snug", children: title }),
            subtitle && /* @__PURE__ */ jsx25("p", { className: "text-sm text-muted-foreground", children: subtitle }),
            children
          ] }),
          showClose && /* @__PURE__ */ jsx25(
            "button",
            {
              type: "button",
              onClick: close,
              "aria-label": "\uB2EB\uAE30",
              className: cn(
                "shrink-0 p-1 rounded-md text-muted-foreground",
                "hover:bg-ac-gray-20 hover:text-foreground",
                "transition-colors duration-normal",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              ),
              children: /* @__PURE__ */ jsx25(X3, { className: "w-4 h-4" })
            }
          )
        ]
      }
    );
  }
);
DialogHeader.displayName = "DialogHeader";
var DialogBody = React23.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx25(
    "div",
    {
      ref,
      className: cn("flex-1 overflow-y-auto px-6 py-4", className),
      ...props
    }
  )
);
DialogBody.displayName = "DialogBody";
var DialogFooter = React23.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx25(
    "div",
    {
      ref,
      className: cn(
        "flex items-center justify-end gap-2",
        "px-6 py-4 border-t border-border shrink-0",
        className
      ),
      ...props
    }
  )
);
DialogFooter.displayName = "DialogFooter";
var DialogTitle = React23.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx25("h2", { ref, className: cn("text-base font-semibold text-foreground leading-snug", className), ...props })
);
DialogTitle.displayName = "DialogTitle";
var DialogDescription = React23.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx25("p", { ref, className: cn("text-sm text-muted-foreground", className), ...props })
);
DialogDescription.displayName = "DialogDescription";
function DialogClose({ children, ...props }) {
  const { close } = useDialogContext();
  return /* @__PURE__ */ jsx25("button", { type: "button", onClick: close, ...props, children });
}
DialogClose.displayName = "DialogClose";

// src/components/Accordion/index.tsx
import * as React24 from "react";
import { Plus, Minus, ChevronDown as ChevronDown4 } from "lucide-react";
import { jsx as jsx26, jsxs as jsxs23 } from "react/jsx-runtime";
var AccordionContext = React24.createContext(null);
var AccordionItemContext = React24.createContext(null);
var Accordion = React24.forwardRef(
  ({
    className,
    type = "single",
    variant = "default",
    backgroundColor,
    contentClassName,
    value,
    defaultValue = [],
    onValueChange,
    children,
    ...props
  }, ref) => {
    const [internalValues, setInternalValues] = React24.useState(defaultValue);
    const openValues = value !== void 0 ? value : internalValues;
    const toggleItem = React24.useCallback(
      (itemValue) => {
        let newValues;
        if (type === "single") {
          newValues = openValues.includes(itemValue) ? [] : [itemValue];
        } else {
          newValues = openValues.includes(itemValue) ? openValues.filter((v) => v !== itemValue) : [...openValues, itemValue];
        }
        if (value === void 0) setInternalValues(newValues);
        onValueChange?.(newValues);
      },
      [type, openValues, value, onValueChange]
    );
    return /* @__PURE__ */ jsx26(AccordionContext.Provider, { value: { type, openValues, toggleItem, variant, backgroundColor, contentClassName }, children: /* @__PURE__ */ jsx26("div", { ref, className: cn("w-full overflow-hidden", className), ...props, children }) });
  }
);
Accordion.displayName = "Accordion";
var AccordionItem = React24.forwardRef(
  ({ className, value, children, ...props }, ref) => {
    const context = React24.useContext(AccordionContext);
    if (!context) throw new Error("AccordionItem must be used within an Accordion");
    const isOpen = context.openValues.includes(value);
    return /* @__PURE__ */ jsx26(AccordionItemContext.Provider, { value: { value, isOpen }, children: /* @__PURE__ */ jsx26(
      "div",
      {
        ref,
        className: cn(
          "border-b border-ac-gray-30 last:border-b-0",
          className
        ),
        ...props,
        children
      }
    ) });
  }
);
AccordionItem.displayName = "AccordionItem";
var AccordionTrigger = React24.forwardRef(
  ({ className, children, iconType = "plus", ...props }, ref) => {
    const rootContext = React24.useContext(AccordionContext);
    const itemContext = React24.useContext(AccordionItemContext);
    if (!rootContext || !itemContext)
      throw new Error("AccordionTrigger must be used within an AccordionItem");
    const { isOpen } = itemContext;
    const { variant, backgroundColor } = rootContext;
    return /* @__PURE__ */ jsx26("h3", { className: "flex", children: /* @__PURE__ */ jsxs23(
      "button",
      {
        ref,
        type: "button",
        "aria-expanded": isOpen,
        onClick: () => rootContext.toggleItem(itemContext.value),
        className: cn(
          "flex flex-1 items-center justify-between py-4 px-4 font-medium",
          "transition-colors duration-slow",
          variant === "filled" ? "hover:brightness-95" : "hover:bg-ac-gray-10",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset",
          className
        ),
        style: variant === "filled" ? { backgroundColor: backgroundColor ?? "#FBFBFB" } : void 0,
        ...props,
        children: [
          /* @__PURE__ */ jsx26("span", { className: "text-left text-sm font-medium text-foreground", children }),
          iconType === "plus" ? /* @__PURE__ */ jsx26("span", { className: "shrink-0 ml-4 text-muted-foreground", children: isOpen ? /* @__PURE__ */ jsx26(Minus, { className: "w-4 h-4" }) : /* @__PURE__ */ jsx26(Plus, { className: "w-4 h-4" }) }) : /* @__PURE__ */ jsx26(
            ChevronDown4,
            {
              className: cn(
                "h-4 w-4 shrink-0 ml-4 text-muted-foreground transition-transform duration-slow",
                isOpen && "rotate-180"
              )
            }
          )
        ]
      }
    ) });
  }
);
AccordionTrigger.displayName = "AccordionTrigger";
var AccordionContent = React24.forwardRef(
  ({ className, children, style, ...props }, ref) => {
    const itemContext = React24.useContext(AccordionItemContext);
    const rootContext = React24.useContext(AccordionContext);
    if (!itemContext) throw new Error("AccordionContent must be used within an AccordionItem");
    const { isOpen } = itemContext;
    const backgroundColor = rootContext?.variant === "filled" ? rootContext.backgroundColor ?? "#FBFBFB" : void 0;
    const contentClassName = rootContext?.contentClassName;
    return /* @__PURE__ */ jsx26(
      "div",
      {
        className: cn(
          "grid transition-all duration-slow ease-in-out text-sm",
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        ),
        children: /* @__PURE__ */ jsx26("div", { className: "overflow-hidden", children: /* @__PURE__ */ jsx26(
          "div",
          {
            ref,
            className: cn(
              "flex flex-col px-6 py-4 text-sm text-muted-foreground leading-relaxed",
              "[&>*]:py-2 [&>*]:border-b [&>*]:border-ac-gray-30 [&>*:last-child]:border-b-0",
              contentClassName,
              className
            ),
            style: { backgroundColor, ...style },
            ...props,
            children
          }
        ) })
      }
    );
  }
);
AccordionContent.displayName = "AccordionContent";

// src/components/Carousel/index.tsx
import * as React25 from "react";
import { ChevronLeft as ChevronLeft3, ChevronRight as ChevronRight5, ChevronUp as ChevronUp3, ChevronDown as ChevronDown5 } from "lucide-react";
import { jsx as jsx27, jsxs as jsxs24 } from "react/jsx-runtime";
var CarouselContext = React25.createContext(null);
function useCarousel() {
  const ctx = React25.useContext(CarouselContext);
  if (!ctx) throw new Error("Must be used within <Carousel>");
  return ctx;
}
var Carousel = React25.forwardRef(
  ({
    className,
    orientation = "horizontal",
    loop = false,
    defaultIndex = 0,
    index,
    onIndexChange,
    itemsPerView = 1,
    children,
    ...props
  }, ref) => {
    const [internalIndex, setInternalIndex] = React25.useState(defaultIndex);
    const [total, setTotal] = React25.useState(0);
    const controlled = index !== void 0;
    const current = controlled ? index : internalIndex;
    const pageCount = Math.max(1, total - itemsPerView + 1);
    const maxIndex = Math.max(0, total - itemsPerView);
    const goTo = React25.useCallback(
      (i) => {
        const next2 = loop ? (i % pageCount + pageCount) % pageCount : Math.max(0, Math.min(i, maxIndex));
        if (!controlled) setInternalIndex(next2);
        onIndexChange?.(next2);
      },
      [loop, pageCount, maxIndex, controlled, onIndexChange]
    );
    const prev = React25.useCallback(() => goTo(current - 1), [current, goTo]);
    const next = React25.useCallback(() => goTo(current + 1), [current, goTo]);
    const dragStart = React25.useRef(null);
    const onPointerDown = (e) => {
      dragStart.current = orientation === "horizontal" ? e.clientX : e.clientY;
    };
    const onPointerUp = (e) => {
      if (dragStart.current === null) return;
      const delta = (orientation === "horizontal" ? e.clientX : e.clientY) - dragStart.current;
      if (Math.abs(delta) > 40) delta < 0 ? next() : prev();
      dragStart.current = null;
    };
    return /* @__PURE__ */ jsx27(
      CarouselContext.Provider,
      {
        value: { current, total, itemsPerView, pageCount, orientation, loop, prev, next, goTo, setTotal },
        children: /* @__PURE__ */ jsx27(
          "div",
          {
            ref,
            role: "region",
            "aria-roledescription": "carousel",
            className: cn("relative select-none", className),
            onPointerDown,
            onPointerUp,
            ...props,
            children
          }
        )
      }
    );
  }
);
Carousel.displayName = "Carousel";
var CarouselContent = React25.forwardRef(
  ({ className, children, ...props }, ref) => {
    const { current, orientation, itemsPerView, setTotal } = useCarousel();
    const isHorizontal = orientation === "horizontal";
    const items = React25.Children.toArray(children);
    React25.useLayoutEffect(() => {
      setTotal(items.length);
    }, [items.length]);
    const translatePct = current * (100 / itemsPerView);
    return /* @__PURE__ */ jsx27("div", { ref, className: cn("overflow-hidden", className), ...props, children: /* @__PURE__ */ jsx27(
      "div",
      {
        "aria-live": "polite",
        className: cn(
          "flex transition-transform duration-slow ease-in-out",
          !isHorizontal && "flex-col h-full"
        ),
        style: {
          transform: isHorizontal ? `translateX(-${translatePct}%)` : `translateY(-${translatePct}%)`
        },
        children: items.map((item, i) => /* @__PURE__ */ jsx27(
          "div",
          {
            role: "group",
            "aria-roledescription": "slide",
            "aria-label": `${i + 1}\uBC88\uC9F8 \uC2AC\uB77C\uC774\uB4DC`,
            className: "shrink-0",
            style: { width: isHorizontal ? `${100 / itemsPerView}%` : "100%" },
            children: item
          },
          i
        ))
      }
    ) });
  }
);
CarouselContent.displayName = "CarouselContent";
var CarouselItem = React25.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx27("div", { ref, className: cn("w-full h-full", className), ...props })
);
CarouselItem.displayName = "CarouselItem";
var navBase = [
  "inline-flex items-center justify-center shrink-0",
  "transition-colors duration-normal",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
  "disabled:pointer-events-none disabled:opacity-30"
].join(" ");
var navStyles = {
  default: "w-8 h-8 rounded-full bg-ac-white shadow-sm hover:bg-ac-gray-20",
  line: "w-8 h-8 rounded-full bg-ac-white border border-ac-gray-30 hover:bg-ac-gray-20",
  border: "w-8 h-8 rounded-full bg-ac-white border border-ac-gray-40 shadow-xs hover:bg-ac-gray-20",
  text: "px-2 text-sm text-ac-gray-60 hover:text-foreground"
};
var CarouselPrevious = React25.forwardRef(
  ({ className, navStyle = "default", ...props }, ref) => {
    const { prev, current, orientation, loop } = useCarousel();
    const Icon = orientation === "horizontal" ? ChevronLeft3 : ChevronUp3;
    const isDisabled = !loop && current === 0;
    return /* @__PURE__ */ jsx27(
      "button",
      {
        ref,
        type: "button",
        "aria-label": "\uC774\uC804 \uC2AC\uB77C\uC774\uB4DC",
        disabled: isDisabled,
        onClick: prev,
        className: cn(navBase, navStyles[navStyle], className),
        ...props,
        children: /* @__PURE__ */ jsx27(Icon, { className: "w-4 h-4" })
      }
    );
  }
);
CarouselPrevious.displayName = "CarouselPrevious";
var CarouselNext = React25.forwardRef(
  ({ className, navStyle = "default", ...props }, ref) => {
    const { next, current, pageCount, orientation, loop } = useCarousel();
    const Icon = orientation === "horizontal" ? ChevronRight5 : ChevronDown5;
    const isDisabled = !loop && current >= pageCount - 1;
    return /* @__PURE__ */ jsx27(
      "button",
      {
        ref,
        type: "button",
        "aria-label": "\uB2E4\uC74C \uC2AC\uB77C\uC774\uB4DC",
        disabled: isDisabled,
        onClick: next,
        className: cn(navBase, navStyles[navStyle], className),
        ...props,
        children: /* @__PURE__ */ jsx27(Icon, { className: "w-4 h-4" })
      }
    );
  }
);
CarouselNext.displayName = "CarouselNext";
var CarouselDots = React25.forwardRef(
  ({ className, activeColor, ...props }, ref) => {
    const { current, pageCount, goTo } = useCarousel();
    return /* @__PURE__ */ jsx27(
      "div",
      {
        ref,
        role: "tablist",
        "aria-label": "\uC2AC\uB77C\uC774\uB4DC \uC120\uD0DD",
        className: cn("flex items-center justify-center gap-1.5", className),
        ...props,
        children: Array.from({ length: pageCount }).map((_, i) => /* @__PURE__ */ jsx27(
          "button",
          {
            role: "tab",
            type: "button",
            "aria-selected": i === current,
            "aria-label": `${i + 1}\uBC88\uC9F8 \uC2AC\uB77C\uC774\uB4DC`,
            onClick: () => goTo(i),
            className: "rounded-full transition-all duration-normal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            style: {
              width: i === current ? 8 : 6,
              height: i === current ? 8 : 6,
              opacity: i === current ? 1 : 0.4,
              backgroundColor: i === current ? activeColor ?? "#FF6300" : "#A8A8A8"
            }
          },
          i
        ))
      }
    );
  }
);
CarouselDots.displayName = "CarouselDots";
var CarouselCounter = React25.forwardRef(
  ({ className, ...props }, ref) => {
    const { current, pageCount } = useCarousel();
    return /* @__PURE__ */ jsxs24(
      "div",
      {
        ref,
        "aria-live": "polite",
        "aria-atomic": "true",
        className: cn("text-xs text-muted-foreground tabular-nums", className),
        ...props,
        children: [
          current + 1,
          " / ",
          pageCount
        ]
      }
    );
  }
);
CarouselCounter.displayName = "CarouselCounter";

// src/index.ts
export * from "lucide-react";
export {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Avatar,
  Badge,
  Breadcrumbs,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardFooterButtons,
  CardFooterInfo,
  CardFooterUser,
  CardHeader,
  CardMenu,
  CardTitle,
  Carousel,
  CarouselContent,
  CarouselCounter,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  Checkbox,
  CheckboxGroup,
  DatePicker,
  DateRangePicker,
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Divider,
  Dropdown,
  DropdownCheckboxItem,
  DropdownContent,
  DropdownItem,
  DropdownLabel,
  DropdownRadioGroup,
  DropdownRadioItem,
  DropdownSeparator,
  DropdownSubMenu,
  DropdownTrigger,
  FAB,
  FileInput,
  Pagination,
  ProgressIndicator,
  Radio,
  RadioGroup,
  Select,
  SideNavigation,
  Snackbar,
  SnackbarProvider,
  Switch,
  TabContent,
  TabList,
  TabTrigger,
  Tabs,
  TextInput,
  Textarea,
  ToggleGroup,
  ToggleGroupItem,
  Tooltip,
  avatarVariants,
  badgeVariants,
  borderRadius,
  breakpoints,
  buttonVariants,
  cn,
  colors,
  fabVariants,
  fontSize,
  fontWeight,
  lineHeight,
  spacing,
  useSnackbar,
  zIndex
};
//# sourceMappingURL=index.js.map