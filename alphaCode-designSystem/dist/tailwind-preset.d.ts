import { Config } from 'tailwindcss';

/**
 * @alphacode/design-system — Tailwind Preset
 *
 * 모든 알파코드 프로젝트의 tailwind.config.ts에서 이 preset을 사용하세요.
 *
 * ```ts
 * // your-project/tailwind.config.ts
 * import preset from "@alphacode/design-system/tailwind-preset";
 * export default { presets: [preset], content: [...] };
 * ```
 */

declare const preset: Config;

export { preset as default };
