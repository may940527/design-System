# @alphacode/design-system

AlphaCode 공식 디자인 시스템입니다.  
**Tailwind preset**, CSS 토큰, shadcn 기반 컴포넌트를 제공합니다.

---

## 설치

```bash
pnpm add @alphacode/design-system
pnpm add -D tailwindcss  # peer dependency
```

---

## 세팅 (3단계)

### 1. Tailwind preset 적용

```ts
// tailwind.config.ts
import preset from "@alphacode/design-system/tailwind-preset";
import type { Config } from "tailwindcss";

export default {
  presets: [preset],                          // ← AlphaCode 규칙 전체 적용
  darkMode: ["class"],
  content: [
    "./src/**/*.{ts,tsx}",
    "./node_modules/@alphacode/design-system/dist/**/*.js",
  ],
  // 프로젝트 고유 추가값만 여기에
} satisfies Config;
```

### 2. 글로벌 CSS에 스타일 import

```css
/* globals.css 또는 layout.tsx */
@import "@alphacode/design-system/styles";
```

### 3. (선택) 브랜드 컬러 커스터마이징

브랜드 컬러가 정해지면 CSS 변수만 덮어쓰면 전체 시스템에 반영됩니다:

```css
/* globals.css */
@import "@alphacode/design-system/styles";

:root {
  /* H S% L% 형식으로 입력 */
  --brand-500: 160 76% 44%;   /* ← 메인 컬러 */
  --brand-400: 160 76% 52%;
  --brand-600: 160 72% 36%;
  /* ... 나머지 스케일 */
  --primary: var(--brand-500);
}
.dark {
  --primary: var(--brand-400);
}
```

---

## Tailwind Preset에 포함된 규칙

### Spacing (4px 베이스)
```
p-1 = 4px   p-2 = 8px   p-4 = 16px
p-6 = 24px  p-8 = 32px  p-12 = 48px
```

### Typography (Pretendard)
```
text-xs = 12px    text-sm = 14px    text-base = 16px
text-lg = 18px    text-xl = 20px    text-2xl = 24px
```

### Border Radius
```
rounded-sm = 4px   rounded-md = 6px   rounded-lg = 8px
rounded-xl = 12px  rounded-2xl = 16px
```

### Breakpoints
```
xs: 480px  sm: 640px  md: 768px
lg: 1024px  xl: 1280px  2xl: 1440px  3xl: 1920px
```

### 시맨틱 컬러
```
bg-background / text-foreground
bg-primary / text-primary-foreground
bg-muted / text-muted-foreground
text-destructive / text-success / text-warning / text-info
```

### z-index 시스템
```
z-dropdown=20  z-sticky=30  z-overlay=40
z-modal=50     z-toast=60   z-tooltip=70
```

---

## 컴포넌트 사용

```tsx
import {
  Button, Input, Badge,
  Card, CardHeader, CardTitle, CardContent
} from "@alphacode/design-system";

<Button variant="primary" size="md">시작하기</Button>
<Button variant="outline" loading>처리 중...</Button>

<Input placeholder="이메일" errorMessage="필수 항목입니다" />

<Badge variant="success">완료</Badge>

<Card>
  <CardHeader><CardTitle>제목</CardTitle></CardHeader>
  <CardContent>내용</CardContent>
</Card>
```

---

## 패키지 구조

```
@alphacode/design-system
├── tailwind-preset.ts     # Tailwind 규칙 (spacing, font, color, animation...)
├── src/
│   ├── styles.css         # CSS 변수 토큰 + Pretendard + base resets
│   ├── tokens/index.ts    # JS 토큰 상수 (Chart.js 등 비-Tailwind 환경용)
│   ├── components/
│   │   ├── Button/
│   │   ├── Input/
│   │   ├── Badge/
│   │   └── Card/
│   └── utils/cn.ts
```

---

## 개발

```bash
pnpm install
pnpm dev      # watch 모드
pnpm build    # 프로덕션 빌드
```