import { cn } from "@/lib/utils";
import { FIELD_INPUT } from "./tokens";
import { Label } from "./Label";

type FieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
  textarea?: boolean;
  rows?: number;
  className?: string;
};

/** A labelled, square-cornered form field. Renders an input or a textarea. */
export function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  required,
  textarea,
  rows = 6,
  className,
}: FieldProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Label className="text-[10px]">{label}</Label>
      {textarea ? (
        <textarea
          rows={rows}
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cn(FIELD_INPUT, "resize-none")}
        />
      ) : (
        <input
          type={type}
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={FIELD_INPUT}
        />
      )}
    </div>
  );
}
