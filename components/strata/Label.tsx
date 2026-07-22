import { cn } from "@/lib/utils";

/**
 * Mono index/label — the Strata voice for section numbers, field labels, and metadata.
 * Default is 11px uppercase ink-faint; override tone/size via className (e.g. text-ember,
 * text-[10px]).
 */
export function Label({
  className,
  children,
  ...rest
}: React.ComponentPropsWithoutRef<"span">) {
  return (
    <span
      className={cn(
        "font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-ink-faint",
        className
      )}
      {...rest}
    >
      {children}
    </span>
  );
}
