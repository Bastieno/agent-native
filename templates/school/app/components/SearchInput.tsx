import { IconSearch, IconX } from "@tabler/icons-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

/**
 * A search box with the magnifier on the left and, once something is typed,
 * an x on the right that clears it and keeps focus in the box.
 */
export function SearchInput({
  value,
  onChange,
  placeholder,
  ariaLabel,
  className,
  inputClassName,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  ariaLabel?: string;
  className?: string;
  inputClassName?: string;
}) {
  return (
    <div className={cn("relative", className)}>
      <IconSearch
        size={14}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
      />
      <Input
        placeholder={placeholder}
        aria-label={ariaLabel ?? placeholder}
        className={cn("pl-8 pr-8", inputClassName)}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Escape" && value) onChange("");
        }}
      />
      {value ? (
        <button
          type="button"
          aria-label="Clear search"
          onClick={(e) => {
            onChange("");
            (
              e.currentTarget.previousElementSibling as HTMLInputElement | null
            )?.focus();
          }}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-0.5 text-muted-foreground hover:text-foreground"
        >
          <IconX size={14} />
        </button>
      ) : null}
    </div>
  );
}
