import { useSearchParams } from "react-router";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { lagosToday, presetRange, type PeriodKey } from "@/lib/books";

const PRESETS: { key: PeriodKey; label: string }[] = [
  { key: "this-month", label: "This month" },
  { key: "last-month", label: "Last month" },
  { key: "this-week", label: "This week" },
  { key: "last-7", label: "Last 7 days" },
  { key: "last-30", label: "Last 30 days" },
  { key: "custom", label: "Custom dates" },
];

/**
 * The period every money screen shows, kept in the URL (?start&end) so it
 * survives moving between Overview, Money in and Money out. Defaults to this
 * month.
 */
export function usePeriod() {
  const [params, setParams] = useSearchParams();
  const today = lagosToday();
  const fallback = presetRange("this-month", today);
  const start = params.get("start") ?? fallback.start;
  const end = params.get("end") ?? fallback.end;
  const match = PRESETS.find((p) => {
    if (p.key === "custom") return false;
    const r = presetRange(p.key, today);
    return r.start === start && r.end === end;
  });
  const key: PeriodKey = params.get("custom")
    ? "custom"
    : (match?.key ?? "custom");
  const set = (next: Record<string, string | null>) => {
    const p = new URLSearchParams(params);
    for (const [k, v] of Object.entries(next))
      v == null ? p.delete(k) : p.set(k, v);
    setParams(p, { replace: true });
  };
  return { start, end, key, today, set };
}

/** Carry the current period onto a link to another money screen. */
export function withPeriod(path: string, start: string, end: string) {
  const joiner = path.includes("?") ? "&" : "?";
  return `${path}${joiner}start=${start}&end=${end}`;
}

export function PeriodPicker() {
  const { start, end, key, today, set } = usePeriod();
  return (
    // On a phone its parts join the page's row of controls (contents): the
    // period first, the other buttons after it, the dates on a line of their
    // own. From sm up it is one row: dates, then the period.
    <div className="contents sm:flex sm:items-center sm:gap-2">
      {key === "custom" && (
        <div className="order-last grid w-full grid-cols-[1fr_auto_1fr] items-center gap-2 sm:order-none sm:flex sm:w-auto">
          <Input
            type="date"
            aria-label="From"
            className="h-8 w-full sm:w-[8.5rem]"
            value={start}
            max={end}
            onChange={(e) =>
              e.target.value && set({ start: e.target.value, custom: "1" })
            }
          />
          <span className="text-xs text-muted-foreground">to</span>
          <Input
            type="date"
            aria-label="To"
            className="h-8 w-full sm:w-[8.5rem]"
            value={end}
            min={start}
            onChange={(e) =>
              e.target.value && set({ end: e.target.value, custom: "1" })
            }
          />
        </div>
      )}
      <Select
        value={key}
        onValueChange={(v) => {
          if (v === "custom") return set({ custom: "1" });
          const r = presetRange(v as PeriodKey, today);
          set({ start: r.start, end: r.end, custom: null });
        }}
      >
        <SelectTrigger
          className="h-8 min-w-0 flex-1 sm:w-36 sm:flex-none"
          aria-label="Period"
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent align="end">
          {PRESETS.map((p) => (
            <SelectItem key={p.key} value={p.key}>
              {p.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
