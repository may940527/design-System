/**
 * @alphacode/design-system — JS Tokens
 *
 * CSS 변수와 1:1 대응되는 JS 상수입니다.
 * Tailwind config 외부(Canvas, Chart.js, 이메일 템플릿 등)에서 사용하세요.
 */
declare const colors: {
    readonly primary: {
        readonly 10: "#FFE7D8";
        readonly 20: "#FFC7A4";
        readonly 30: "#FFB180";
        readonly 40: "#FF8F48";
        readonly 50: "#FF6300";
        readonly 60: "#E05700";
        readonly 70: "#C74D00";
        readonly 80: "#903D07";
        readonly 90: "#652C06";
    };
    readonly green: {
        readonly 10: "#E5F9EC";
        readonly 20: "#BBF7D0";
        readonly 30: "#86EFAC";
        readonly 40: "#4ADE80";
        readonly 50: "#00C344";
        readonly 60: "#00A63A";
        readonly 70: "#047857";
        readonly 80: "#14532D";
        readonly 90: "#052E16";
    };
    readonly blue: {
        readonly 10: "#E5F1FF";
        readonly 20: "#BDDBFF";
        readonly 30: "#8CBDFF";
        readonly 40: "#4193FF";
        readonly 50: "#006FFF";
        readonly 60: "#005DD8";
        readonly 70: "#004BAE";
        readonly 80: "#00357B";
        readonly 90: "#0A2C58";
    };
    readonly red: {
        readonly 10: "#FFE5E5";
        readonly 20: "#FFBFBF";
        readonly 30: "#FF8585";
        readonly 40: "#FF5454";
        readonly 50: "#FE0000";
        readonly 60: "#DA120D";
        readonly 70: "#BF0A03";
        readonly 80: "#8B0800";
        readonly 90: "#6A0700";
    };
    readonly orange: {
        readonly 10: "#FFF2E7";
        readonly 20: "#FFEDD5";
        readonly 30: "#FFC37E";
        readonly 40: "#FF9D52";
        readonly 50: "#FF7A0C";
        readonly 60: "#EA580C";
        readonly 70: "#C2410C";
        readonly 80: "#9A3412";
        readonly 90: "#562800";
    };
    readonly purple: {
        readonly 10: "#F8F7FF";
        readonly 20: "#E9E4FF";
        readonly 30: "#D5C7FF";
        readonly 40: "#B190FF";
        readonly 50: "#8E2AFF";
        readonly 60: "#6B16CA";
        readonly 70: "#550AA9";
        readonly 80: "#400387";
        readonly 90: "#2C0066";
    };
    readonly gray: {
        readonly 10: "#FBFBFB";
        readonly 20: "#F7F7F7";
        readonly 30: "#ECECEC";
        readonly 40: "#D9D9D9";
        readonly 50: "#A8A8A8";
        readonly 60: "#828282";
        readonly 70: "#5F5F5F";
        readonly 80: "#555555";
        readonly 90: "#060606";
    };
    readonly "blue-gray": {
        readonly 10: "#ECEFF1";
        readonly 20: "#CFD8DC";
        readonly 30: "#B0BEC5";
        readonly 40: "#90A4AE";
        readonly 50: "#607D8B";
        readonly 60: "#546E7A";
        readonly 70: "#455A64";
        readonly 80: "#37474F";
        readonly 90: "#263238";
    };
    readonly black: "#000000";
    readonly white: "#FFFFFF";
};
declare const spacing: {
    readonly 0: "0px";
    readonly 0.5: "0.125rem";
    readonly 1: "0.25rem";
    readonly 1.5: "0.375rem";
    readonly 2: "0.5rem";
    readonly 2.5: "0.625rem";
    readonly 3: "0.75rem";
    readonly 3.5: "0.875rem";
    readonly 4: "1rem";
    readonly 5: "1.25rem";
    readonly 6: "1.5rem";
    readonly 8: "2rem";
    readonly 10: "2.5rem";
    readonly 12: "3rem";
    readonly 16: "4rem";
    readonly 20: "5rem";
    readonly 24: "6rem";
};
declare const borderRadius: {
    readonly sm: "0.25rem";
    readonly md: "0.375rem";
    readonly lg: "0.5rem";
    readonly xl: "0.75rem";
    readonly "2xl": "1rem";
    readonly full: "9999px";
};
declare const fontSize: {
    readonly "2xs": "0.625rem";
    readonly xs: "0.75rem";
    readonly sm: "0.875rem";
    readonly base: "1rem";
    readonly lg: "1.125rem";
    readonly xl: "1.25rem";
    readonly "2xl": "1.5rem";
    readonly "3xl": "1.875rem";
    readonly "4xl": "2.25rem";
};
declare const fontWeight: {
    readonly regular: 400;
    readonly medium: 500;
    readonly semibold: 600;
    readonly bold: 700;
};
declare const lineHeight: {
    readonly none: 1;
    readonly tight: 1.25;
    readonly snug: 1.375;
    readonly normal: 1.5;
    readonly relaxed: 1.625;
    readonly loose: 2;
};
declare const zIndex: {
    readonly base: 0;
    readonly raised: 10;
    readonly dropdown: 20;
    readonly sticky: 30;
    readonly overlay: 40;
    readonly modal: 50;
    readonly toast: 60;
    readonly tooltip: 70;
};
declare const breakpoints: {
    readonly sm: "640px";
    readonly md: "768px";
    readonly lg: "1024px";
    readonly xl: "1280px";
    readonly "2xl": "1536px";
};
type ColorToken = typeof colors;
type SpacingToken = typeof spacing;
type RadiusToken = typeof borderRadius;

export { type ColorToken, type RadiusToken, type SpacingToken, borderRadius, breakpoints, colors, fontSize, fontWeight, lineHeight, spacing, zIndex };
