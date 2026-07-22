/**
 * Strata design-system tokens.
 * Color primitives live as CSS variables in app/globals.css and are exposed as semantic
 * Tailwind utilities (bg-paper, text-ink, border-line, text-ember, …) via tailwind.config.ts.
 * These are the shared class recipes that repeat across the surface.
 */

/** Centered page column: 76rem max, 1.5rem / 3rem gutters. */
export const WRAP = "mx-auto w-full max-w-[76rem] px-6 md:px-12";

/** Square, quiet icon button used on nav, socials, and plate actions. */
export const ICON_BTN =
  "inline-flex items-center justify-center rounded-none p-2 text-ink-faint transition-colors duration-200 hover:bg-surface hover:text-ink";

/** Square field input/textarea; focus surfaces the ember seam. */
export const FIELD_INPUT =
  "border border-line bg-paper px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-ink-faint focus:border-ember";
