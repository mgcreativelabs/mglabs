// highlight.js only ships a single top-level declaration file
// (types/index.d.ts) and doesn't type its per-submodule entry
// points (highlight.js/lib/core, highlight.js/lib/languages/*).
// src/lib/utils/highlight.ts imports those submodules directly for
// a smaller bundle than importing the whole library, so this file
// gives TypeScript just enough shape to type-check them.
declare module "highlight.js/lib/core" {
  import hljs from "highlight.js";
  export default hljs;
}

declare module "highlight.js/lib/languages/*" {
  import type { LanguageFn } from "highlight.js";
  const language: LanguageFn;
  export default language;
}
