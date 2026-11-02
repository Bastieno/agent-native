import { useState } from "react";
import { IconCheck, IconChevronDown } from "@tabler/icons-react";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export interface SearchableOption {
  value: string;
  label: string;
  /** A second line, such as a teacher's subject or a class's year group. */
  hint?: string;
}

/**
 * A drop-down that can be typed into, for lists long enough to scroll.
 *
 * A school has dozens of teachers and a hundred classes; scrolling a plain
 * select for one name is slow, and on a phone it is worse. This looks like
 * the app's other selects and works the same way (pick one, it closes), with
 * a search box on top. Short lists (a handful of roles or statuses) should
 * stay plain selects: there is nothing to search.
 */
export function SearchableSelect({
  value,
  onValueChange,
  options,
  placeholder = "Choose…",
  searchPlaceholder = "Search…",
  emptyText = "Nothing matches.",
  className,
  contentClassName,
  disabled,
  "aria-label": ariaLabel,
}: {
  value: string;
  onValueChange: (value: string) => void;
  options: SearchableOption[];
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  className?: string;
  contentClassName?: string;
  disabled?: boolean;
  "aria-label"?: string;
}) {
  const [open, setOpen] = useState(false);
  const selected = options.find((o) => o.value === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          role="combobox"
          aria-expanded={open}
          aria-label={ariaLabel}
          disabled={disabled}
          className={cn(
            "flex h-10 w-full items-center justify-between gap-2 rounded-md border border-input bg-background px-3 py-2 text-left text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
        >
          <span
            className={cn("truncate", !selected && "text-muted-foreground")}
          >
            {selected?.label ?? placeholder}
          </span>
          <IconChevronDown size={16} className="shrink-0 opacity-50" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className={cn(
          "w-[var(--radix-popover-trigger-width)] min-w-56 p-0",
          contentClassName,
        )}
      >
        {/* Matched on the words shown, not the ids behind them. */}
        <Command filter={matchShownWords}>
          <CommandInput placeholder={searchPlaceholder} className="h-9" />
          <CommandList>
            <CommandEmpty>{emptyText}</CommandEmpty>
            {options.map((option) => (
              <CommandItem
                key={option.value}
                value={option.value}
                keywords={[option.label, option.hint ?? ""]}
                onSelect={() => {
                  onValueChange(option.value);
                  setOpen(false);
                }}
              >
                <IconCheck
                  size={14}
                  className={cn(
                    "mr-2 shrink-0",
                    option.value === value ? "opacity-100" : "opacity-0",
                  )}
                />
                <span className="min-w-0 flex-1">
                  <span className="block truncate">{option.label}</span>
                  {option.hint ? (
                    <span className="block truncate text-xs text-muted-foreground">
                      {option.hint}
                    </span>
                  ) : null}
                </span>
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

function matchShownWords(
  _value: string,
  search: string,
  keywords?: string[],
): number {
  const haystack = (keywords ?? []).join(" ").toLowerCase();
  return search
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((word) => haystack.includes(word))
    ? 1
    : 0;
}
