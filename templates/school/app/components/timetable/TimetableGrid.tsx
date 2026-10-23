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
import { isProposed, type Clash, type ResolvedPeriod } from "./use-timetable";

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
  periods: placed,
  proposed = [],
  clashes,
  selected,
  renderCell,
  titleBy = "class",
}: {
  week: SchoolWeek;
  dayNames: Record<number, string>;
  periods: ResolvedPeriod[];
  /** Drafted lessons, drawn dashed beside the real ones and never editable. */
  proposed?: ResolvedPeriod[];
  clashes: Clash[];
  selected?: { day: number; periodNumber: number } | null;
  /**
   * What heads a lesson. A grid of one arm is all that arm's classes, so its
   * name in front of each subject only uses the line; a teacher's or a room's
   * grid mixes arms and needs it.
   */
  titleBy?: "subject" | "class";
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
  const periods = useMemo(() => [...placed, ...proposed], [placed, proposed]);
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
      titleBy={titleBy}
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
  titleBy,
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
  titleBy: "subject" | "class";
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
  // Only drafted lessons here: nothing to open an editor on.
  const draftOnly =
    entries.length > 0 && entries.every((e) => isProposed(e.scheduleId));
  const editable = !!renderCell && !draftOnly;

  const titleOf = (e: ResolvedPeriod) =>
    titleBy === "subject" ? e.subjectName || e.className : e.className;

  const body = (
    <div className={cn("flex gap-1", tall && "min-h-[7rem]")}>
      {entries.map((e) => (
        <div
          key={e.scheduleId}
          data-proposed={isProposed(e.scheduleId) ? "true" : undefined}
          className={cn(
            "min-w-0 flex-1 rounded px-1.5 py-1",
            isProposed(e.scheduleId)
              ? "pointer-events-none border border-dashed border-primary/60 bg-primary/5"
              : "bg-primary/10",
          )}
        >
          <span className="line-clamp-2 break-words text-xs font-medium">
            {titleOf(e)}
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
  if (entries.length > 0) {
    cell = <HoverCardTrigger asChild>{cell}</HoverCardTrigger>;
  }
  // The editor sees only the real lessons of the cell.
  const wrapped = editable
    ? renderCell!(
        day,
        number,
        entries.filter((e) => !isProposed(e.scheduleId)),
        cell,
      )
    : cell;
  if (entries.length === 0) return <>{wrapped}</>;
  return (
    <HoverCard openDelay={200} closeDelay={80}>
      {wrapped}
      {/* Hidden while the editor is open over the same cell. */}
      {selected ? null : (
        <HoverCardContent className="w-72 space-y-3 text-sm" align="start">
          {entries.map((e) => (
            <div key={e.scheduleId} className="space-y-0.5">
              <p className="font-semibold">{e.subjectName || e.className}</p>
              <p className="text-xs text-muted-foreground">
                {[
                  e.className,
                  doubled ? "Double lesson" : `${e.start}–${e.end}`,
                ].join(" · ")}
              </p>
              {e.lessonLabel ? (
                <p className="text-xs">{e.lessonLabel}</p>
              ) : null}
              <p className="text-xs text-muted-foreground">
                {[
                  e.teachers.map((t) => t.name).join(", ") || "No teacher",
                  e.room,
                ]
                  .filter(Boolean)
                  .join(" · ")}
              </p>
            </div>
          ))}
          {messages.map((m, i) => (
            <p key={i} className="text-xs text-destructive">
              {m}
            </p>
          ))}
        </HoverCardContent>
      )}
    </HoverCard>
  );
}
