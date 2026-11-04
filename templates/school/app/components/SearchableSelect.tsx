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

/**
 * Inside a Dialog, the dialog's scroll lock cancels the wheel and touch moves
 * over anything outside it, and a picker is drawn outside it. Stopping the
 * event here keeps it from reaching the lock, so the list scrolls.
 */
const scrollInsideDialog = {
  onWheel: (e: React.WheelEvent) => e.stopPropagation(),
  onTouchMove: (e: React.TouchEvent) => e.stopPropagation(),
};

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
        {...scrollInsideDialog}
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

/**
 * The same drop-down for choosing several: it stays open while you pick, and
 * "Select all shown" takes everything the search currently matches, so a whole
 * year group is one search and one press.
 */
export function SearchableMultiSelect({
  values,
  onValuesChange,
  options,
  noun = "selected",
  placeholder = "Choose…",
  searchPlaceholder = "Search…",
  emptyText = "Nothing matches.",
  className,
  disabled,
  "aria-label": ariaLabel,
}: {
  values: string[];
  onValuesChange: (values: string[]) => void;
  options: SearchableOption[];
  /** Said after the count: "3 classes selected". */
  noun?: string;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  className?: string;
  disabled?: boolean;
  "aria-label"?: string;
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const chosen = new Set(values);
  const shown = options.filter(
    (o) => matchShownWords(o.value, search, [o.label, o.hint ?? ""]) > 0,
  );
  const allShownChosen =
    shown.length > 0 && shown.every((o) => chosen.has(o.value));
  const label =
    values.length === 0
      ? placeholder
      : values.length === 1
        ? (options.find((o) => o.value === values[0])?.label ?? placeholder)
        : `${values.length} ${noun}`;

  function toggle(value: string) {
    onValuesChange(
      chosen.has(value)
        ? values.filter((v) => v !== value)
        : [...values, value],
    );
  }
  function toggleShown() {
    const shownValues = new Set(shown.map((o) => o.value));
    onValuesChange(
      allShownChosen
        ? values.filter((v) => !shownValues.has(v))
        : [...new Set([...values, ...shownValues])],
    );
  }

  return (
    <Popover
      open={open}
      onOpenChange={(o) => {
        setOpen(o);
        if (!o) setSearch("");
      }}
    >
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
            className={cn(
              "truncate",
              values.length === 0 && "text-muted-foreground",
            )}
          >
            {label}
          </span>
          <IconChevronDown size={16} className="shrink-0 opacity-50" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        {...scrollInsideDialog}
        className="w-[var(--radix-popover-trigger-width)] min-w-56 p-0"
      >
        <Command shouldFilter={false}>
          <CommandInput
            placeholder={searchPlaceholder}
            className="h-9"
            value={search}
            onValueChange={setSearch}
          />
          <CommandList>
            {shown.length === 0 ? (
              <p className="py-6 text-center text-sm text-muted-foreground">
                {emptyText}
              </p>
            ) : (
              <>
                <CommandItem value="__all" onSelect={toggleShown}>
                  <IconCheck
                    size={14}
                    className={cn(
                      "mr-2 shrink-0",
                      allShownChosen ? "opacity-100" : "opacity-0",
                    )}
                  />
                  <span className="font-medium">
                    {search.trim()
                      ? `Select all ${shown.length} shown`
                      : `Select all ${shown.length}`}
                  </span>
                </CommandItem>
                {shown.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={() => toggle(option.value)}
                  >
                    <IconCheck
                      size={14}
                      className={cn(
                        "mr-2 shrink-0",
                        chosen.has(option.value) ? "opacity-100" : "opacity-0",
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
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
