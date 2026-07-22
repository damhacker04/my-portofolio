import { cn } from "@/lib/utils";

type TagVariant = "meta" | "skill";

const VARIANTS: Record<TagVariant, string> = {
  // Read-only metadata (project tech): mono, uppercase, quiet.
  meta: "border border-line px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-[0.1em] text-ink-faint",
  // Toolkit skills: sans, sentence-case, interactive hover.
  skill:
    "border border-line px-2.5 py-1 text-xs font-medium text-ink-soft transition-colors duration-200 hover:border-ink hover:text-ink",
};

/**
 * Square-cornered stone tag. `meta` for project tech chips, `skill` for the toolkit.
 * Never a pill — roundness is reserved for interactive toggles.
 */
export function Tag({
  variant = "meta",
  className,
  children,
  ...rest
}: React.ComponentPropsWithoutRef<"span"> & { variant?: TagVariant }) {
  return (
    <span className={cn(VARIANTS[variant], className)} {...rest}>
      {children}
    </span>
  );
}
