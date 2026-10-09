import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { SchoolWeek } from "@shared/school-week";
import type { ResolvedPeriod } from "./use-timetable";

/**
 * Lessons that sit on no lesson period of the week (a break's number with
 * times inside the break, a day the school no longer teaches, times after the
 * last bell). Learners and teachers still have them, so the admin sees them
 * here and can move or remove each one.
 */
export function OffBellsList({
  week,
  dayNames,
  periods,
  editable,
  onMove,
  onRemove,
}: {
  week: SchoolWeek;
  dayNames: Record<number, string>;
  periods: ResolvedPeriod[];
  /** False while the term shows the earlier timetable: read only. */
  editable: boolean;
  onMove: (p: ResolvedPeriod, day: number, periodNumber: number) => void;
  onRemove: (scheduleId: string) => void;
}) {
  if (periods.length === 0) return null;
  const sorted = [...periods].sort(
    (a, b) => a.day - b.day || a.start.localeCompare(b.start),
  );
  return (
    <section className="space-y-2" data-testid="off-bells">
      <h2 className="text-sm font-medium">Not on this week's bells</h2>
      <ul className="divide-y rounded-lg border text-sm">
        {sorted.map((p) => (
          <li
            key={p.scheduleId}
            className="flex flex-wrap items-center justify-between gap-2 px-3 py-2"
          >
            <span className="min-w-0">
              <span className="font-medium">{p.className}</span>
              <span className="text-muted-foreground">
                {" "}
                · {dayNames[p.day] ?? p.day} {p.start}–{p.end}
                {p.room ? ` · ${p.room}` : ""}
              </span>
            </span>
            {editable && !p.scheduleId.startsWith("tmp-") ? (
              <span className="flex items-center gap-1">
                <MoveButton
                  week={week}
                  dayNames={dayNames}
                  placement={p}
                  onMove={onMove}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-destructive hover:text-destructive"
                  onClick={() => onRemove(p.scheduleId)}
                >
                  Remove
                </Button>
              </span>
            ) : null}
          </li>
        ))}
      </ul>
    </section>
  );
}

function MoveButton({
  week,
  dayNames,
  placement,
  onMove,
}: {
  week: SchoolWeek;
  dayNames: Record<number, string>;
  placement: ResolvedPeriod;
  onMove: (p: ResolvedPeriod, day: number, periodNumber: number) => void;
}) {
  const [open, setOpen] = useState(false);
  const days = [...week.days].sort((a, b) => a.day - b.day);
  const [day, setDay] = useState<number>(
    days.some((d) => d.day === placement.day) ? placement.day : days[0]?.day,
  );
  const [period, setPeriod] = useState<string>("");
  const lessons =
    days
      .find((d) => d.day === day)
      ?.periods.filter((p) => p.kind === "lesson")
      .sort((a, b) => a.start.localeCompare(b.start)) ?? [];

  return (
    <Popover
      open={open}
      onOpenChange={(o) => {
        setOpen(o);
        if (o) setPeriod("");
      }}
    >
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm">
          Move
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 space-y-3" align="end">
        <p className="text-sm font-medium">Move {placement.className}</p>
        <div className="space-y-1.5">
          <Label className="text-xs">Day</Label>
          <Select
            value={String(day)}
            onValueChange={(v) => {
              setDay(Number(v));
              setPeriod("");
            }}
          >
            <SelectTrigger className="h-8 text-sm" aria-label="Day">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {days.map((d) => (
                <SelectItem key={d.day} value={String(d.day)}>
                  {dayNames[d.day] ?? d.day}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">Period</Label>
          <Select value={period || undefined} onValueChange={setPeriod}>
            <SelectTrigger className="h-8 text-sm" aria-label="Period">
              <SelectValue placeholder="Choose a period" />
            </SelectTrigger>
            <SelectContent>
              {lessons.map((p) => (
                <SelectItem key={p.number} value={String(p.number)}>
                  {p.label ?? p.number} · {p.start}–{p.end}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex justify-end">
          <Button
            size="sm"
            disabled={!period}
            onClick={() => {
              onMove(placement, day, Number(period));
              setOpen(false);
            }}
          >
            Move
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
