import { useMemo, type ReactElement, type ReactNode } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { cn } from "@/lib/utils";
import {
  findPeriod,
  placementSlot,
  type SchoolWeek,
  type WeekPeriod,
} from "@shared/school-week";
import { gridSpans } from "@shared/timetable-grid";
import type { Clash, ResolvedPeriod } from "./use-timetable";

interface Row {
  number: number;
  start: string;
  end: string;
  label: string;
  /** A break on every day that has this period: drawn as a thin row. */
  isBreak: boolean;
}

/** The periods of the week as rows, in time order, one per period number. */
function rowsOf(week: SchoolWeek): Row[] {
  // Per number, the earliest instance, preferring a lesson: a period that is a
  // break on some days and a lesson on others is labelled as the lesson.
  const byNumber = new Map<number, WeekPeriod>();
  const better = (a: WeekPeriod, b: WeekPeriod) =>
    a.kind !== b.kind ? a.kind === "lesson" : a.start < b.start;
  for (const d of week.days) {
    for (const p of d.periods) {
      const seen = byNumber.get(p.number);
      if (!seen || better(p, seen)) byNumber.set(p.number, p);
    }
  }
  return [...byNumber.values()]
    .sort((a, b) => a.start.localeCompare(b.start))
    .map((p) => {
      const isBreak = p.kind !== "lesson";
      return {
        number: p.number,
        start: p.start,
        end: p.end,
        isBreak,
        // A break shows only its own name; with none, just its bell times.
        label: isBreak ? (p.label ?? "") : (p.label ?? `${p.number}`),
      };
    });
}

export function TimetableGrid({
  week,
  dayNames,
  periods,
  clashes,
  selected,
  renderCell,
}: {
  week: SchoolWeek;
  dayNames: Record<number, string>;
  periods: ResolvedPeriod[];
  clashes: Clash[];
  selected?: { day: number; periodNumber: number } | null;
  /** Wraps an editable lesson cell (e.g. in its editor). Omit for read-only. */
  renderCell?: (
    day: number,
    periodNumber: number,
    entries: ResolvedPeriod[],
    cell: ReactElement,
  ) => ReactNode;
}) {
  const days = useMemo(
    () => [...week.days].sort((a, b) => a.day - b.day),
    [week],
  );
  const rows = useMemo(() => rowsOf(week), [week]);
  const { bySlot, partnerOf, spans } = useMemo(() => {
    // Doubles drawn as one tall cell; the rule lives in gridSpans.
    const { hidden, partnerOf, spans } = gridSpans(
      week,
      rows.map((r) => r.number),
      periods,
    );
    const bySlot = new Map<string, ResolvedPeriod[]>();
    for (const p of periods) {
      // Rows on no lesson of the week are listed under the grid instead.
      const n = placementSlot(week, p)?.number;
      if (n == null || hidden.has(p.scheduleId)) continue;
      const k = `${p.day}:${n}`;
      bySlot.set(k, [...(bySlot.get(k) ?? []), p]);
    }
    return { bySlot, partnerOf, spans };
  }, [periods, week, rows]);

  const cellFor = (day: number, number: number, tall = false) => (
    <Cell
      week={week}
      day={day}
      number={number}
      entries={bySlot.get(`${day}:${number}`) ?? []}
      partnerOf={partnerOf}
      tall={tall}
      clashes={clashes}
      selected={selected?.day === day && selected.periodNumber === number}
      renderCell={renderCell}
    />
  );

  return (
    // The grid scrolls sideways inside itself; the page never does.
    <div className="max-w-full overflow-x-auto rounded-lg border">
      <table
        className="w-full min-w-[640px] border-collapse text-sm"
        data-testid="timetable-grid"
      >
        <thead>
          <tr className="bg-muted/40">
            <th className="w-20 px-2 py-2 text-left text-xs font-medium text-muted-foreground" />
            {days.map((d) => (
              <th
                key={d.day}
                className="px-2 py-2 text-left text-xs font-medium text-muted-foreground"
              >
                {dayNames[d.day] ?? d.day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) =>
            row.isBreak ? (
              <tr key={row.number} className="border-t bg-muted/30">
                <td
                  colSpan={days.length + 1}
                  className="px-2 py-0.5 text-[11px] text-muted-foreground"
                >
                  {row.label ? `${row.label} · ` : ""}
                  {row.start}–{row.end}
                </td>
              </tr>
            ) : (
              <tr key={row.number} className="border-t">
                <th className="px-2 py-2 text-left align-top font-normal">
                  <span className="block text-xs font-medium">{row.label}</span>
                  <span className="block text-[11px] text-muted-foreground">
                    {row.start}
                  </span>
                </th>
                {days.map((d) => {
                  // The row below a double's first half belongs to its cell.
                  if (spans.has(`${d.day}:${i - 1}`)) return null;
                  if (!spans.has(`${d.day}:${i}`)) {
                    return (
                      <td key={d.day} className="border-l p-1 align-top">
                        {cellFor(d.day, row.number)}
                      </td>
                    );
                  }
                  const below = rows[i + 1];
                  const others = bySlot.get(`${d.day}:${below.number}`) ?? [];
                  return (
                    <td
                      key={d.day}
                      rowSpan={2}
                      className="border-l p-1 align-top"
                    >
                      <div className="flex flex-col gap-1">
                        {cellFor(d.day, row.number, others.length === 0)}
                        {/* Other classes in the second period, e.g. an option block. */}
                        {others.length > 0
                          ? cellFor(d.day, below.number)
                          : null}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ),
          )}
        </tbody>
      </table>
    </div>
  );
}

function Cell({
  week,
  day,
  number,
  entries,
  partnerOf,
  tall,
  clashes,
  selected,
  renderCell,
}: {
  week: SchoolWeek;
  day: number;
  number: number;
  entries: ResolvedPeriod[];
  /** A double's first half → its second half, drawn in the same cell. */
  partnerOf: Map<string, string>;
  /** Spans two period rows on its own. */
  tall: boolean;
  clashes: Clash[];
  selected: boolean;
  renderCell?: (
    day: number,
    periodNumber: number,
    entries: ResolvedPeriod[],
    cell: ReactElement,
  ) => ReactNode;
}) {
  const slot = findPeriod(week, day, number);
  if (!slot || slot.kind !== "lesson") {
    // A day without this period, or a break on this day only.
    return (
      <div className="min-h-14 rounded-md bg-muted/30 px-2 py-1 text-[11px] text-muted-foreground">
        {slot?.label ?? ""}
      </div>
    );
  }

  // A double clashes if either half does.
  const ids = new Set(
    entries.flatMap((e) => {
      const partner = partnerOf.get(e.scheduleId);
      return partner ? [e.scheduleId, partner] : [e.scheduleId];
    }),
  );
  const doubled = entries.some((e) => partnerOf.has(e.scheduleId));
  const messages = clashes
    .filter((c) => c.scheduleIds.some((id) => ids.has(id)))
    .map((c) => c.message);
  const clashing = messages.length > 0;
  const editable = !!renderCell;

  const body = (
    <div className={cn("flex gap-1", tall && "min-h-[7rem]")}>
      {entries.map((e) => (
        <div
          key={e.scheduleId}
          className="min-w-0 flex-1 rounded bg-primary/10 px-1.5 py-1"
        >
          <span className="block truncate text-xs font-medium">
            {e.className}
          </span>
          {e.lessonLabel ? (
            <span className="block truncate text-[11px]">{e.lessonLabel}</span>
          ) : null}
          <span className="block truncate text-[11px] text-muted-foreground">
            {e.teachers.map((t) => t.name).join(", ") || "No teacher"}
          </span>
          {e.room ? (
            <span className="block truncate text-[11px] text-muted-foreground">
              {e.room}
            </span>
          ) : null}
        </div>
      ))}
    </div>
  );

  const className = cn(
    "block w-full rounded-md p-1 text-left",
    tall ? "min-h-[7.5rem]" : "min-h-14",
    editable && "hover:bg-muted/50 focus-visible:outline-none",
    selected && "bg-muted",
    clashing && "outline outline-2 -outline-offset-2 outline-destructive",
  );
  const attrs = {
    "data-day": day,
    "data-period": number,
    "data-clash": clashing ? "true" : undefined,
    "data-double": doubled ? "true" : undefined,
    "aria-label": `${entries.map((e) => e.className).join(", ") || "Free"}`,
  };
  let cell: ReactElement = editable ? (
    <button type="button" className={className} {...attrs}>
      {body}
    </button>
  ) : (
    <div className={className} {...attrs}>
      {body}
    </div>
  );

  // The hover card's trigger sits inside the editor's, so both reach the
  // same element: hover explains the clash, click opens the editor.
  if (clashing) cell = <HoverCardTrigger asChild>{cell}</HoverCardTrigger>;
  const wrapped = renderCell ? renderCell(day, number, entries, cell) : cell;
  if (!clashing) return <>{wrapped}</>;
  return (
    <HoverCard openDelay={150}>
      {wrapped}
      <HoverCardContent className="w-72 space-y-1.5 text-sm">
        {messages.map((m, i) => (
          <p key={i}>{m}</p>
        ))}
      </HoverCardContent>
    </HoverCard>
  );
}
