import { Label } from "./Label";
import { WRAP } from "./tokens";

/**
 * Signature identity mark. A full-width hairline opening a section, carrying a mono section
 * number and a molten ember tick — the seam surfacing between rock layers.
 */
export function Strata({ num, label }: { num: string; label: string }) {
  return (
    <div className="border-t border-line">
      <div className={`${WRAP} flex items-center gap-4 py-5`}>
        <span className="font-mono text-[11px] font-semibold tracking-[0.16em] text-ember-deep">
          {num}
        </span>
        <span className="seam-tick" />
        <Label className="tracking-[0.18em]">{label}</Label>
      </div>
    </div>
  );
}
