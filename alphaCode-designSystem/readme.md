# @alphacode-ai/design-system

AlphaCode Design System — Tailwind preset, design tokens, and UI components.

---

## Installation

### 1. `.npmrc` 설정

프로젝트 루트에 `.npmrc` 파일을 추가하세요.

```properties
@alphacode-ai:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NPM_TOKEN}
```

GitHub Personal Access Token(PAT)을 환경변수로 설정합니다.

```bash
export NPM_TOKEN=YOUR_GITHUB_PAT
```

> PAT는 GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic) 에서 발급하세요. `read:packages` 권한이 필요합니다.

### 2. 패키지 설치

```bash
pnpm add @alphacode-ai/design-system
```

---

## Usage

### CSS 스타일 import

`app/layout.tsx` 또는 전역 CSS 진입점에 추가하세요.

```ts
import "@alphacode-ai/design-system/styles";
```

### 컴포넌트 사용

```tsx
import { Button, Avatar, Badge } from "@alphacode-ai/design-system";

export default function App() {
  return (
    <Button variant="primary">Click me</Button>
  );
}
```

### Tailwind Preset 사용

`tailwind.config.ts`에 preset을 추가하면 디자인 시스템 토큰이 자동으로 적용됩니다.

```ts
import type { Config } from "tailwindcss";
import preset from "@alphacode-ai/design-system/tailwind-preset";

const config: Config = {
  presets: [preset],
  content: [
    "./src/**/*.{ts,tsx}",
  ],
};

export default config;
```

### 디자인 토큰 사용

```ts
import { colors, spacing } from "@alphacode-ai/design-system/tokens";
```

---

## Package Structure

설치 시 포함되는 파일 구조입니다.

```
@alphacode-ai/design-system/
└── dist/
    ├── index.js              # ESM
    ├── index.cjs             # CJS
    ├── index.d.ts            # 타입
    ├── tailwind-preset.js    # Tailwind preset
    ├── styles.css            # 전역 스타일
    └── tokens/
        └── index.js          # 디자인 토큰
```

---

## Exports

| 경로 | 설명 |
|------|------|
| `@alphacode-ai/design-system` | 컴포넌트 전체 |
| `@alphacode-ai/design-system/styles` | 전역 CSS 스타일 |
| `@alphacode-ai/design-system/tailwind-preset` | Tailwind preset |
| `@alphacode-ai/design-system/tokens` | 디자인 토큰 |

---

## Peer Dependencies

| 패키지 | 버전 |
|--------|------|
| `react` | `>=18` |
| `react-dom` | `>=18` |
| `tailwindcss` | `>=3.4` |

---

## Publishing

태그를 푸시하면 GitHub Actions가 자동으로 빌드 및 배포합니다.

```bash
# 버전 업데이트
cd alphaCode-designSystem
pnpm version patch   # 0.1.0 → 0.1.1
pnpm version minor   # 0.1.0 → 0.2.0
pnpm version major   # 0.1.0 → 1.0.0

# 태그 푸시 → 자동 배포
git push origin main
git push origin main --tags
```

> 태그 형식: `design-system-v{version}` (예: `design-system-v0.2.0`)

---

## Repository

- **GitHub**: [AlphaCode-AI/design-System](https://github.com/AlphaCode-AI/design-System)
- **Package Registry**: [GitHub Packages](https://github.com/orgs/AlphaCode-AI/packages)