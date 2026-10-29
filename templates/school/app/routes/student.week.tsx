import { useEffect, type ReactElement } from "react";
import { useUrlTab } from "@/hooks/use-url-tab";
import { Link, useSearchParams } from "react-router";
import { IconCalendarWeek } from "@tabler/icons-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { cn } from "@/lib/utils";
import { useNavigationState } from "@/hooks/use-navigation-state";
import { useMyWeek } from "@/hooks/use-my-week";
import { useSchoolConfig } from "@/hooks/use-school-config";
import { schoolWeekdayShortName } from "@shared/school-week";
import type { MyWeek, MyWeekLesson } from "../../server/lib/my-week";

type Day = MyWeek["days"][number];
type Period = Day["periods"][number];

/** Teacher and room, with no separator when one of them is missing. */
function details(lesson: MyWeekLesson) {
  return [lesson.teacherName, lesson.room].filter(Boolean).join(" · ");
}

/**
 * Whether a period's lessons all go on into the next period as doubles, so
 * the two show as one block.
 */
function continuesInto(period: Period, next: Period | undefined): boolean {
  if (!next || next.kind !== "lesson" || period.lessons.length === 0) {
    return false;
  }
  // The server says which lessons really go on (a valid pair); the page only
  // checks the second half is in the next period it was given.
  const nextPairs = next.lessons.map((l) => l.pairId);
  return (
    period.lessons.every(
      (l) => l.doubleWithNext && !!l.pairId && nextPairs.includes(l.pairId),
    ) && period.lessons.length === next.lessons.length
  );
}

/**
 * What a learner looks for is the subject: every lesson here is their own
 * class, so "JSS1A" in front of each one only used up the line.
 */
const subjectOf = (l: MyWeekLesson) => l.subjectName || l.className;

function Lessons({
  period,
  range,
  card,
}: {
  period: Period;
  /** The lesson's time, for the card that opens over a grid tile. */
  range?: string;
  /** Open the full details over the tile. For the grid, where text is cut. */
  card?: boolean;
}) {
  if (period.lessons.length === 0) {
    return <span className="text-sm text-muted-foreground">Free</span>;
  }
  return (
    <div className="space-y-2">
      {period.lessons.map((lesson) => {
        const body = (
          <div className="min-w-0" tabIndex={card ? 0 : undefined}>
            <p className="line-clamp-2 break-words text-sm font-medium">
              {subjectOf(lesson)}
            </p>
            {lesson.lessonLabel ? (
              <p className="truncate text-xs">{lesson.lessonLabel}</p>
            ) : null}
            {lesson.teacherName ? (
              <p className="truncate text-xs text-muted-foreground">
                {lesson.teacherName}
              </p>
            ) : null}
            {lesson.room ? (
              <p className="truncate text-xs text-muted-foreground">
                {lesson.room}
              </p>
            ) : null}
          </div>
        );
        if (!card) return <div key={lesson.classId}>{body}</div>;
        return (
          <HoverCard key={lesson.classId} openDelay={200} closeDelay={80}>
            <HoverCardTrigger asChild>{body}</HoverCardTrigger>
            <HoverCardContent className="w-72 space-y-1.5" align="start">
              <p className="text-sm font-semibold">{subjectOf(lesson)}</p>
              <p className="text-xs text-muted-foreground">
                {[lesson.className, range].filter(Boolean).join(" · ")}
              </p>
              {lesson.lessonLabel ? (
                <p className="text-xs">{lesson.lessonLabel}</p>
              ) : null}
              {details(lesson) ? (
                <p className="text-xs text-muted-foreground">
                  {details(lesson)}
                </p>
              ) : null}
              <Link
                to={`/student/classes/${lesson.classId}`}
                className="inline-block pt-1 text-xs text-primary underline-offset-2 hover:underline"
              >
                Open class
              </Link>
            </HoverCardContent>
          </HoverCard>
        );
      })}
    </div>
  );
}

const timeRange = (p: Period) => `${p.start}–${p.end}`;
// A break shows its own name; with none, only its bell times.
const breakLabel = (p: Period) => p.label || "";

/** One day, top to bottom. Used on phones. */
function DayList({ day }: { day: Day }) {
  const items: ReactElement[] = [];
  for (let i = 0; i < day.periods.length; i++) {
    const period = day.periods[i];
    if (period.kind === "break") {
      items.push(
        <div
          key={period.number}
          className="flex items-center justify-between bg-muted/40 px-3 py-1.5 text-xs text-muted-foreground"
        >
          <span>{breakLabel(period)}</span>
          <span>{timeRange(period)}</span>
        </div>,
      );
      continue;
    }
    // A double is one item: the first period's start to the second's end.
    const next = day.periods[i + 1];
    const joined = continuesInto(period, next);
    if (joined) i++;
    items.push(
      <div
        key={period.number}
        className="flex gap-3 px-3 py-3"
        data-double={joined ? "true" : undefined}
      >
        <div className="w-24 shrink-0 text-xs text-muted-foreground">
          <p className="font-medium text-foreground">
            {joined
              ? `Periods ${period.number}–${next.number}`
              : `Period ${period.number}`}
          </p>
          <p>
            {period.start}–{joined ? next.end : period.end}
          </p>
        </div>
        <div className="min-w-0 flex-1">
          <Lessons period={period} />
        </div>
      </div>,
    );
  }
  return <div className="divide-y rounded-lg border">{items}</div>;
}

/** Days across, periods down. Used from `lg` up; narrower screens get one
 * day at a time, because five columns do not fit a tablet. */
function WeekGrid({ days }: { days: Day[] }) {
  // Lesson rows are the period numbers; a break sits after the period that
  // precedes it on its own day. Days may keep different bell times.
  const rowKey = (p: Period) =>
    p.kind === "break" ? `B${p.start}-${p.end}` : `L${p.number}`;
  const rows = new Map<string, { key: string; first: Period; order: number }>();
  for (const d of days) {
    let before = 0;
    for (const p of d.periods) {
      const key = rowKey(p);
      if (!rows.has(key)) {
        rows.set(key, {
          key,
          first: p,
          order: p.kind === "break" ? before + 0.5 : p.number,
        });
      }
      if (p.kind === "lesson") before = p.number;
    }
  }
  const ordered = [...rows.values()].sort((a, b) => a.order - b.order);
  // minmax(0, 1fr): columns share the width equally instead of growing to the
  // longest title, which is what pushed the grid off the page.
  const cols = `5.5rem repeat(${days.length}, minmax(0, 1fr))`;

  // One grid, so a double can span its two period rows. A double joins when
  // its second period is the very next row.
  const cells: ReactElement[] = [];
  const covered = new Set<string>();
  ordered.forEach(({ key, first }, i) => {
    const gridRow = i + 1;
    if (first.kind === "break") {
      cells.push(
        <div
          key={key}
          className="flex items-center gap-3 border-b bg-muted/40 px-3 py-1 text-xs text-muted-foreground"
          style={{ gridRow, gridColumn: "1 / -1" }}
        >
          <span>{breakLabel(first)}</span>
          <span>{timeRange(first)}</span>
        </div>,
      );
      return;
    }
    cells.push(
      <div
        key={key}
        className="sticky left-0 z-[1] border-b bg-background px-3 py-3 text-xs text-muted-foreground"
        style={{ gridRow, gridColumn: 1 }}
      >
        <p className="font-medium text-foreground">Period {first.number}</p>
        <p>{timeRange(first)}</p>
      </div>,
    );
    days.forEach((d, j) => {
      if (covered.has(`${d.day}:${key}`)) return;
      const at = d.periods.findIndex((p) => rowKey(p) === key);
      const period = at >= 0 ? d.periods[at] : undefined;
      const next = at >= 0 ? d.periods[at + 1] : undefined;
      const joined =
        !!period &&
        continuesInto(period, next) &&
        ordered[i + 1]?.key === rowKey(next!);
      if (joined) covered.add(`${d.day}:${rowKey(next!)}`);
      const range = period
        ? `${period.start}–${joined ? next!.end : period.end}`
        : "";
      cells.push(
        <div
          key={`${key}:${d.day}`}
          className={cn("min-w-0 border-b p-1.5", d.isToday && "bg-primary/5")}
          style={{
            gridRow: joined ? `${gridRow} / span 2` : gridRow,
            gridColumn: j + 2,
          }}
          data-double={joined ? "true" : undefined}
        >
          {period ? (
            // The same tile the admin's timetable uses, so a lesson looks
            // like a lesson in both places; a double fills its two rows.
            <div
              className={cn(
                "h-full rounded-md px-2.5 py-2",
                period.lessons.length > 0 && "bg-muted/50",
              )}
            >
              {joined || range !== timeRange(first) ? (
                <p className="mb-1 text-xs text-muted-foreground">{range}</p>
              ) : null}
              <Lessons period={period} range={range} card />
            </div>
          ) : null}
        </div>,
      );
    });
  });

  return (
    <div className="overflow-x-auto rounded-lg border">
      <div className="min-w-[44rem]">
        <div
          className="grid border-b bg-muted/40 text-sm"
          style={{ gridTemplateColumns: cols }}
        >
          <div />
          {days.map((d) => (
            <div
              key={d.day}
              aria-current={d.isToday ? "date" : undefined}
              className={cn(
                "px-4 py-2 font-medium",
                d.isToday && "bg-primary/10 text-primary",
              )}
            >
              {d.dayName}
              {/* The tinted column says it; the word is for screen readers. */}
              {d.isToday ? <span className="sr-only"> (today)</span> : null}
            </div>
          ))}
        </div>
        <div
          className="-mb-px grid"
          style={{ gridTemplateColumns: cols }}
          data-testid="week-grid"
        >
          {cells}
        </div>
      </div>
    </div>
  );
}

export default function StudentWeek() {
  const { sync } = useNavigationState();
  const { config } = useSchoolConfig();
  // `?date=YYYY-MM-DD` picks the term; there is no date control.
  const [params] = useSearchParams();
  const date = params.get("date") ?? undefined;
  const { data, isLoading } = useMyWeek(
    date && /^\d{4}-\d{2}-\d{2}$/.test(date) ? date : undefined,
  );
  // The day chosen is in the address (?day=3); with none chosen it opens on today.
  const [picked, setPicked] = useUrlTab<string>("", {
    key: "day",
    explicit: true,
  });

  useEffect(() => {
    sync({ role: "student", view: "week" });
  }, [sync]);

  const days = data?.days ?? [];
  const empty =
    days.length === 0 ||
    days.every((d) => d.periods.every((p) => p.lessons.length === 0));
  const today = days.find((d) => d.isToday) ?? days[0];
  const activeDay = days.find((d) => String(d.day) === picked) ?? today;
  const locale = config.locale || undefined;

  return (
    <div className="space-y-4 p-4 sm:p-6">
      <div>
        <h1 className="text-xl font-semibold">My week</h1>
        {data?.message && !empty ? (
          <p className="mt-1 text-sm text-muted-foreground">{data.message}</p>
        ) : null}
      </div>

      {isLoading ? (
        <Skeleton className="h-64 w-full" />
      ) : !data || empty ? (
        <div className="rounded-lg border border-dashed p-8 text-center">
          <IconCalendarWeek
            size={28}
            className="mx-auto mb-2 text-muted-foreground"
          />
          <p className="text-sm text-muted-foreground">
            {data?.message ?? "Your week isn't available right now."}
          </p>
        </div>
      ) : (
        <>
          <div className="hidden lg:block">
            <WeekGrid days={days} />
          </div>
          <div className="space-y-3 lg:hidden">
            <Tabs
              value={activeDay ? String(activeDay.day) : undefined}
              onValueChange={setPicked}
            >
              <TabsList className="w-full justify-between overflow-x-auto">
                {days.map((d) => (
                  <TabsTrigger
                    key={d.day}
                    value={String(d.day)}
                    className="flex-1 px-2"
                  >
                    {schoolWeekdayShortName(d.day, locale)}
                    {/* Today stays findable after tapping to another day. */}
                    {d.isToday ? (
                      <>
                        <span
                          className="ml-1.5 inline-block size-1.5 rounded-full bg-primary"
                          aria-hidden
                        />
                        <span className="sr-only"> (today)</span>
                      </>
                    ) : null}
                  </TabsTrigger>
                ))}
              </TabsList>
              {days.map((d) => (
                <TabsContent key={d.day} value={String(d.day)} className="mt-3">
                  <DayList day={d} />
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </>
      )}
    </div>
  );
}
