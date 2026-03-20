# AlphaCode Design System Monorepo

AlphaCode Design System 모노레포입니다.

---

## Structure

```
designSystem/
├── alphaCode-designSystem/   # @alphacode-ai/design-system 패키지
└── vega-homepage/            # 디자인 시스템 문서 사이트
```

---

## Packages

| 패키지 | 설명 | 버전 |
|--------|------|------|
| [`@alphacode-ai/design-system`](./alphaCode-designSystem) | Tailwind preset, 디자인 토큰, UI 컴포넌트 | `0.1.0` |

---

## Getting Started

### 의존성 설치

```bash
pnpm install
```

### 디자인 시스템 빌드

```bash
pnpm --filter @alphacode-ai/design-system build
```

### 문서 사이트 실행

```bash
pnpm --filter vega-homepage dev
```

---

## Publishing

태그를 푸시하면 GitHub Actions가 자동으로 패키지를 배포합니다.

```bash
cd alphaCode-designSystem
pnpm version patch
git push origin main --tags
```

> 자세한 내용은 [`alphaCode-designSystem/README.md`](./alphaCode-designSystem/README.md)를 참고하세요.