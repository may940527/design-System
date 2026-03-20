"use strict";Object.defineProperty(exports, "__esModule", {value: true});// tailwind-preset.ts
var preset = {
  darkMode: ["class"],
  content: [],
  theme: {
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // extend 바깥 = Tailwind 기본값을 AlphaCode 규칙으로 덮어씁니다
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // ── Spacing (VEGA UI 스펙) ───────────────────────────────
    // --space-none=0  3xs=4  2xs=8  xs=12  sm=16
    // md=24  lg=36  xl=40  2xl=64  3xl=80
    spacing: {
      px: "1px",
      0: "0px",
      0.5: "2px",
      1: "4px",
      1.5: "6px",
      2: "8px",
      2.5: "10px",
      3: "12px",
      3.5: "14px",
      4: "16px",
      5: "20px",
      6: "24px",
      7: "28px",
      8: "32px",
      9: "36px",
      10: "40px",
      11: "44px",
      12: "48px",
      14: "56px",
      16: "64px",
      20: "80px",
      24: "96px",
      28: "112px",
      32: "128px",
      36: "144px",
      40: "160px",
      44: "176px",
      48: "192px",
      52: "208px",
      56: "224px",
      60: "240px",
      64: "256px",
      72: "288px",
      80: "320px",
      96: "384px"
    },
    // ── Typography: Pretendard ───────────────────────────────
    fontFamily: {
      sans: [
        "Pretendard Variable",
        "Pretendard",
        "-apple-system",
        "BlinkMacSystemFont",
        "system-ui",
        "sans-serif"
      ],
      mono: [
        "JetBrains Mono",
        "Fira Code",
        "ui-monospace",
        "monospace"
      ]
    },
    fontSize: {
      "2xs": ["10px", { lineHeight: "14px" }],
      xs: ["12px", { lineHeight: "16px" }],
      sm: ["14px", { lineHeight: "20px" }],
      base: ["16px", { lineHeight: "24px" }],
      lg: ["18px", { lineHeight: "28px" }],
      xl: ["20px", { lineHeight: "28px" }],
      "2xl": ["24px", { lineHeight: "32px" }],
      "3xl": ["30px", { lineHeight: "38px" }],
      "4xl": ["36px", { lineHeight: "44px" }],
      "5xl": ["48px", { lineHeight: "56px" }],
      "6xl": ["60px", { lineHeight: "68px" }],
      "7xl": ["72px", { lineHeight: "80px" }]
    },
    fontWeight: {
      thin: "100",
      extralight: "200",
      light: "300",
      regular: "400",
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
      extrabold: "800",
      black: "900"
    },
    lineHeight: {
      none: "1",
      tight: "1.25",
      snug: "1.375",
      normal: "1.5",
      relaxed: "1.625",
      loose: "2"
    },
    // ── Border Radius (VEGA UI 스펙) ─────────────────────────
    // none=0  xs=4px  sm=6px  md=8px  lg=12px  xl=20px  2xl=24px  circle=50%
    borderRadius: {
      none: "0px",
      // --radius-none
      xs: "4px",
      // --radius-xs   0.25rem
      sm: "6px",
      // --radius-sm   0.375rem
      md: "8px",
      // --radius-md   0.5rem
      DEFAULT: "8px",
      lg: "12px",
      // --radius-lg   0.75rem
      xl: "20px",
      // --radius-xl   1.25rem
      "2xl": "24px",
      // --radius-2xl  1.5rem
      full: "50%"
      // --radius-circle
    },
    // ── Breakpoints (VEGA UI 스펙) ───────────────────────────
    screens: {
      xs: "320px",
      // Small smartphone
      sm: "480px",
      // Large smartphones, small tablets
      md: "768px",
      // Tablets
      lg: "1024px",
      // Large tablets, small laptop
      xl: "1440px",
      // Laptop, small desktop
      "2xl": "1768px"
      // Larger desktops and external monitors
    },
    extend: {
      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      // extend 안 = Tailwind 기본 팔레트 유지 + AlphaCode 토큰 추가
      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      colors: {
        // ── Semantic tokens ──────────────────────────────────
        background: "hsl(var(--background) / <alpha-value>)",
        foreground: "hsl(var(--foreground) / <alpha-value>)",
        primary: {
          DEFAULT: "hsl(var(--primary) / <alpha-value>)",
          foreground: "hsl(var(--primary-foreground) / <alpha-value>)",
          hover: "hsl(var(--primary-hover) / <alpha-value>)",
          active: "hsl(var(--primary-active) / <alpha-value>)"
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary) / <alpha-value>)",
          foreground: "hsl(var(--secondary-foreground) / <alpha-value>)"
        },
        muted: {
          DEFAULT: "hsl(var(--muted) / <alpha-value>)",
          foreground: "hsl(var(--muted-foreground) / <alpha-value>)"
        },
        accent: {
          DEFAULT: "hsl(var(--accent) / <alpha-value>)",
          foreground: "hsl(var(--accent-foreground) / <alpha-value>)"
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)"
        },
        success: {
          DEFAULT: "hsl(var(--success) / <alpha-value>)",
          foreground: "hsl(var(--success-foreground) / <alpha-value>)"
        },
        warning: {
          DEFAULT: "hsl(var(--warning) / <alpha-value>)",
          foreground: "hsl(var(--warning-foreground) / <alpha-value>)"
        },
        info: {
          DEFAULT: "hsl(var(--info) / <alpha-value>)",
          foreground: "hsl(var(--info-foreground) / <alpha-value>)"
        },
        pending: {
          DEFAULT: "hsl(var(--pending) / <alpha-value>)",
          foreground: "hsl(var(--pending-foreground) / <alpha-value>)"
        },
        border: "hsl(var(--border) / <alpha-value>)",
        input: "hsl(var(--input) / <alpha-value>)",
        ring: "hsl(var(--ring) / <alpha-value>)",
        card: {
          DEFAULT: "hsl(var(--card) / <alpha-value>)",
          foreground: "hsl(var(--card-foreground) / <alpha-value>)"
        },
        popover: {
          DEFAULT: "hsl(var(--popover) / <alpha-value>)",
          foreground: "hsl(var(--popover-foreground) / <alpha-value>)"
        },
        // ── AlphaCode Palette Tokens ─────────────────────────
        "ac-primary": {
          10: "#FFE7D8",
          20: "#FFC7A4",
          30: "#FFB180",
          40: "#FF8F48",
          50: "#FF6300",
          // main
          60: "#E05700",
          // hover
          70: "#C74D00",
          80: "#903D07",
          90: "#652C06"
        },
        "ac-green": {
          10: "#E5F9EC",
          20: "#BBF7D0",
          30: "#86EFAC",
          40: "#4ADE80",
          50: "#00C344",
          // main
          60: "#00A63A",
          // hover
          70: "#047857",
          80: "#14532D",
          90: "#052E16"
        },
        "ac-blue": {
          10: "#E5F1FF",
          20: "#BDDBFF",
          30: "#8CBDFF",
          40: "#4193FF",
          50: "#006FFF",
          // main
          60: "#005DD8",
          // hover
          70: "#004BAE",
          80: "#00357B",
          90: "#0A2C58"
        },
        "ac-red": {
          10: "#FFE5E5",
          20: "#FFBFBF",
          30: "#FF8585",
          40: "#FF5454",
          50: "#FE0000",
          // main
          60: "#DA120D",
          // hover
          70: "#BF0A03",
          80: "#8B0800",
          90: "#6A0700"
        },
        "ac-orange": {
          10: "#FFF2E7",
          20: "#FFEDD5",
          30: "#FFC37E",
          40: "#FF9D52",
          50: "#FF7A0C",
          // main
          60: "#EA580C",
          // hover
          70: "#C2410C",
          80: "#9A3412",
          90: "#562800"
        },
        "ac-purple": {
          10: "#F8F7FF",
          20: "#E9E4FF",
          30: "#D5C7FF",
          40: "#B190FF",
          50: "#8E2AFF",
          // main
          60: "#6B16CA",
          // hover
          70: "#550AA9",
          80: "#400387",
          90: "#2C0066"
        },
        "ac-gray": {
          10: "#FBFBFB",
          20: "#F7F7F7",
          // background gray
          30: "#ECECEC",
          40: "#D9D9D9",
          // border solid
          50: "#A8A8A8",
          // normal
          60: "#828282",
          70: "#5F5F5F",
          80: "#555555",
          // font gray
          90: "#060606"
          // secondary
        },
        "ac-blue-gray": {
          10: "#ECEFF1",
          20: "#CFD8DC",
          // disable
          30: "#B0BEC5",
          40: "#90A4AE",
          50: "#607D8B",
          // main
          60: "#546E7A",
          // hover
          70: "#455A64",
          80: "#37474F",
          90: "#263238"
        },
        "ac-black": "#000000",
        "ac-white": "#FFFFFF"
      },
      // ── Box Shadow (VEGA UI 스펙) ────────────────────────
      boxShadow: {
        xs: "0px 1px 2px 0px rgba(10, 13, 18, 0.05)",
        sm: "0px 1px 3px 0px rgba(10, 13, 18, 0.10), 0px 1px 2px -1px rgba(10, 13, 18, 0.10)",
        md: "0px 2px 4px -2px rgba(10, 13, 18, 0.06), 0px 4px 6px -1px rgba(10, 13, 18, 0.10)",
        lg: "0px 2px 2px -1px rgba(10, 13, 18, 0.04), 0px 4px 6px -2px rgba(10, 13, 18, 0.03), 0px 12px 16px -4px rgba(10, 13, 18, 0.08)",
        xl: "0px 3px 3px -1.5px rgba(10, 13, 18, 0.04), 0px 8px 8px -4px rgba(10, 13, 18, 0.03), 0px 20px 24px -4px rgba(10, 13, 18, 0.08)",
        "2xl": "0px 4px 4px -2px rgba(10, 13, 18, 0.04), 0px 12px 16px -4px rgba(10, 13, 18, 0.06), 0px 32px 48px -8px rgba(10, 13, 18, 0.14)",
        inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)"
      },
      // ── Transitions ──────────────────────────────────────
      transitionDuration: {
        fast: "100ms",
        normal: "150ms",
        slow: "300ms",
        slower: "500ms"
      },
      transitionTimingFunction: {
        "in-out-quart": "cubic-bezier(0.76, 0, 0.24, 1)",
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)"
      },
      // ── Keyframes & Animations ───────────────────────────
      keyframes: {
        "fade-in": { from: { opacity: "0" }, to: { opacity: "1" } },
        "fade-out": { from: { opacity: "1" }, to: { opacity: "0" } },
        "slide-up": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" }
        },
        "slide-down": {
          from: { opacity: "0", transform: "translateY(-8px)" },
          to: { opacity: "1", transform: "translateY(0)" }
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.95)" },
          to: { opacity: "1", transform: "scale(1)" }
        }
      },
      animation: {
        "fade-in": "fade-in 0.2s ease-out",
        "fade-out": "fade-out 0.15s ease-in",
        "slide-up": "slide-up 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
        "slide-down": "slide-down 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
        "scale-in": "scale-in 0.2s cubic-bezier(0.16, 1, 0.3, 1)"
      },
      // ── Z-index ──────────────────────────────────────────
      zIndex: {
        hide: "-1",
        base: "0",
        raised: "10",
        dropdown: "20",
        sticky: "30",
        overlay: "40",
        modal: "50",
        toast: "60",
        tooltip: "70",
        max: "9999"
      }
    }
  },
  plugins: []
};
var tailwind_preset_default = preset;


exports.default = tailwind_preset_default;
//# sourceMappingURL=tailwind-preset.cjs.map