import { useEffect, useMemo, useState } from "react";
import { useSyncedDraft } from "./useSyncedDraft";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  IconCalendarPlus,
  IconCopy,
  IconPlus,
  IconTrash,
  IconDeviceFloppy,
} from "@tabler/icons-react";
import { useSchoolConfig } from "@/hooks/use-school-config";
import { schoolLocale } from "@shared/dates";
import {
  schoolWeekdayName,
  weekProblems,
  type SchoolWeek,
  type Weekday,
  type WeekPeriod,
} from "@shared/school-week";
import { useSaveSchoolConfig } from "./useSaveSchoolConfig";

const ALL_DAYS: Weekday[] = [1, 2, 3, 4, 5, 6, 7];

const EMPTY_WEEK: SchoolWeek = { cycleLength: 1, days: [] };

/**
 * One bell. The number box keeps what is typed, so it can be cleared and
 * retyped; a number is committed as soon as the text is a valid one.
 */
function PeriodRow({
  period: p,
  dayName,
  onChange,
  onRemove,
}: {
  period: WeekPeriod;
  dayName: string;
  onChange: (patch: Partial<WeekPeriod>) => void;
  onRemove: () => void;
}) {
  const [numberText, setNumberText] = useState(String(p.number));
  useEffect(() => {
    setNumberText((t) => (Number(t) === p.number ? t : String(p.number)));
  }, [p.number]);
  const where = `${dayName} period ${p.number}`;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Input
        type="number"
        min={1}
        aria-label={`Period number, ${dayName} period ${p.number}`}
        className="h-8 w-16"
        value={numberText}
        onChange={(e) => {
          setNumberText(e.target.value);
          const n = Number(e.target.value);
          if (e.target.value !== "" && Number.isInteger(n) && n >= 1)
            onChange({ number: n });
        }}
        onBlur={() => setNumberText(String(p.number))}
      />
      <Input
        type="time"
        aria-label={`Start, ${where}`}
        className="h-8 w-28"
        value={p.start}
        onChange={(e) => onChange({ start: e.target.value })}
      />
      <Input
        type="time"
        aria-label={`End, ${where}`}
        className="h-8 w-28"
        value={p.end}
        onChange={(e) => onChange({ end: e.target.value })}
      />
      <Select
        value={p.kind}
        onValueChange={(v) => onChange({ kind: v as WeekPeriod["kind"] })}
      >
        <SelectTrigger className="h-8 w-28" aria-label={`Kind, ${where}`}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="lesson">Lesson</SelectItem>
          <SelectItem value="break">Break</SelectItem>
        </SelectContent>
      </Select>
      <Input
        aria-label={`Label, ${where}`}
        placeholder="Label"
        className="h-8 min-w-24 flex-1"
        value={p.label ?? ""}
        onChange={(e) => onChange({ label: e.target.value || undefined })}
      />
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        aria-label={`Remove ${where}`}
        onClick={onRemove}
      >
        <IconTrash size={14} />
      </Button>
    </div>
  );
}

export function SchoolWeekEditor() {
  const { config } = useSchoolConfig();
  const locale = schoolLocale(config);
  const save = useSaveSchoolConfig();
  const [week, setWeek, dirty] = useSyncedDraft<SchoolWeek>(
    config.schoolWeek ?? EMPTY_WEEK,
  );

  const problems = useMemo(() => weekProblems(week, locale), [week, locale]);
  const nameOf = (d: number) => schoolWeekdayName(d, locale);
  const usedDays = new Set(week.days.map((d) => d.day));

  function setDays(days: SchoolWeek["days"]) {
    setWeek({ ...week, days: [...days].sort((a, b) => a.day - b.day) });
  }
  function setPeriods(day: Weekday, periods: WeekPeriod[]) {
    setDays(week.days.map((d) => (d.day === day ? { ...d, periods } : d)));
  }
  function addPeriod(day: Weekday) {
    const periods = week.days.find((d) => d.day === day)?.periods ?? [];
    const last = periods[periods.length - 1];
    setPeriods(day, [
      ...periods,
      {
        number: (last?.number ?? 0) + 1,
        start: last?.end ?? "",
        end: "",
        kind: "lesson",
      },
    ]);
  }
  function copyBells(from: Weekday, to: Weekday) {
    const source = week.days.find((d) => d.day === from);
    if (!source) return;
    const periods = source.periods.map((p) => ({ ...p }));
    setDays([...week.days.filter((d) => d.day !== to), { day: to, periods }]);
  }

  const problemsFor = (day: Weekday) =>
    problems.filter((p) => p.day === day).map((p) => p.message);
  const otherProblems = problems
    .filter((p) => !week.days.some((d) => d.day === p.day))
    .map((p) => p.message);

  return (
    <div className="space-y-3">
      {week.days.length === 0 && (
        <p className="text-sm text-muted-foreground">No school week yet.</p>
      )}

      {week.days.map((d) => (
        <div key={d.day} className="rounded-lg border bg-card p-4 space-y-3">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-sm font-medium">{nameOf(d.day)}</h3>
            <div className="flex items-center gap-1">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-1.5">
                    <IconCopy size={14} />
                    Copy these bells to…
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {ALL_DAYS.filter((o) => o !== d.day).map((o) => (
                    <DropdownMenuItem
                      key={o}
                      onSelect={() => copyBells(d.day, o)}
                    >
                      {nameOf(o)}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                aria-label={`Remove ${nameOf(d.day)}`}
                onClick={() =>
                  setDays(week.days.filter((x) => x.day !== d.day))
                }
              >
                <IconTrash size={14} />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            {d.periods.map((p, i) => (
              <PeriodRow
                key={i}
                period={p}
                dayName={nameOf(d.day)}
                onChange={(patch) =>
                  setPeriods(
                    d.day,
                    d.periods.map((x, j) => (j === i ? { ...x, ...patch } : x)),
                  )
                }
                onRemove={() =>
                  setPeriods(
                    d.day,
                    d.periods.filter((_, j) => j !== i),
                  )
                }
              />
            ))}
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="gap-1.5"
            onClick={() => addPeriod(d.day)}
          >
            <IconPlus size={14} />
            Add a period
          </Button>

          {problemsFor(d.day).map((p, n) => (
            <p key={n} className="text-sm text-destructive">
              {p}
            </p>
          ))}
        </div>
      ))}

      {otherProblems.map((p, n) => (
        <p key={n} className="text-sm text-destructive">
          {p}
        </p>
      ))}

      <div className="flex items-center justify-between">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5"
              disabled={usedDays.size === 7}
            >
              <IconCalendarPlus size={14} />
              Add a day
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            {ALL_DAYS.filter((o) => !usedDays.has(o)).map((o) => (
              <DropdownMenuItem
                key={o}
                onSelect={() =>
                  setDays([...week.days, { day: o, periods: [] }])
                }
              >
                {nameOf(o)}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <Button
          size="sm"
          className="gap-1.5"
          disabled={!dirty || problems.length > 0}
          onClick={() => save({ schoolWeek: week }, "School week saved")}
        >
          <IconDeviceFloppy size={14} />
          Save
        </Button>
      </div>
    </div>
  );
}
