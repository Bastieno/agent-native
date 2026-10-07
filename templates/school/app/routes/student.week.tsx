import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { IconCalendarWeek } from "@tabler/icons-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
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

function Lessons({ period }: { period: Period }) {
  if (period.lessons.length === 0) {
    return <span className="text-sm text-muted-foreground">Free</span>;
  }
  return (
    <div className="space-y-2">
      {period.lessons.map((lesson) => (
        <div key={lesson.classId} className="min-w-0">
          <p className="truncate text-sm font-medium">
            {lesson.className || lesson.subjectName}
          </p>
          {details(lesson) ? (
            <p className="truncate text-xs text-muted-foreground">
              {details(lesson)}
            </p>
          ) : null}
        </div>
      ))}
    </div>
  );
}

const timeRange = (p: Period) => `${p.start}–${p.end}`;
const breakLabel = (p: Period) => p.label || "Break";

/** One day, top to bottom. Used on phones. */
function DayList({ day }: { day: Day }) {
  return (
    <div className="divide-y rounded-lg border">
      {day.periods.map((period) =>
        period.kind === "break" ? (
          <div
            key={period.number}
            className="flex items-center justify-between bg-muted/40 px-3 py-1.5 text-xs text-muted-foreground"
          >
            <span>{breakLabel(period)}</span>
            <span>{timeRange(period)}</span>
          </div>
        ) : (
          <div key={period.number} className="flex gap-3 px-3 py-3">
            <div className="w-24 shrink-0 text-xs text-muted-foreground">
              <p className="font-medium text-foreground">
                Period {period.number}
              </p>
              <p>{timeRange(period)}</p>
            </div>
            <div className="min-w-0 flex-1">
              <Lessons period={period} />
            </div>
          </div>
        ),
      )}
    </div>
  );
}

/** Days across, periods down. Used from `md` up. */
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
  const cols = `5.5rem repeat(${days.length}, minmax(8rem, 1fr))`;

  return (
    <div className="overflow-x-auto rounded-lg border">
      <div className="min-w-max">
        <div
          className="grid border-b bg-muted/40 text-sm"
          style={{ gridTemplateColumns: cols }}
        >
          <div />
          {days.map((d) => (
            <div
              key={d.day}
              className={cn(
                "px-3 py-2 font-medium",
                d.isToday && "bg-primary/10 text-primary",
              )}
            >
              {d.dayName}
              {d.isToday ? (
                <span className="ml-1.5 text-xs font-normal">Today</span>
              ) : null}
            </div>
          ))}
        </div>
        {ordered.map(({ key, first }) =>
          first.kind === "break" ? (
            <div
              key={key}
              className="flex items-center gap-3 border-b bg-muted/40 px-3 py-1 text-xs text-muted-foreground last:border-b-0"
            >
              <span>{breakLabel(first)}</span>
              <span>{timeRange(first)}</span>
            </div>
          ) : (
            <div
              key={key}
              className="grid border-b last:border-b-0"
              style={{ gridTemplateColumns: cols }}
            >
              <div className="px-3 py-3 text-xs text-muted-foreground">
                <p className="font-medium text-foreground">
                  Period {first.number}
                </p>
                <p>{timeRange(first)}</p>
              </div>
              {days.map((d) => {
                const period = d.periods.find((p) => rowKey(p) === key);
                return (
                  <div
                    key={d.day}
                    className={cn(
                      "min-w-0 px-3 py-3",
                      d.isToday && "bg-primary/5",
                    )}
                  >
                    {period ? (
                      <>
                        {timeRange(period) !== timeRange(first) ? (
                          <p className="mb-1 text-xs text-muted-foreground">
                            {timeRange(period)}
                          </p>
                        ) : null}
                        <Lessons period={period} />
                      </>
                    ) : null}
                  </div>
                );
              })}
            </div>
          ),
        )}
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
  const [picked, setPicked] = useState<string | null>(null);

  useEffect(() => {
    sync({ role: "student", view: "week" });
  }, [sync]);

  const days = data?.days ?? [];
  const empty =
    days.length === 0 ||
    days.every((d) => d.periods.every((p) => p.lessons.length === 0));
  const today = days.find((d) => d.isToday) ?? days[0];
  const activeDay = days.find((d) => String(d.day) === picked) ?? today;
  const locale = (config as any)?.locale || undefined;

  return (
    <div className="space-y-4 p-4 sm:p-6">
      <div>
        <h1 className="text-xl font-semibold">My week</h1>
        {data?.message ? (
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
          <div className="hidden md:block">
            <WeekGrid days={days} />
          </div>
          <div className="space-y-3 md:hidden">
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
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
            {activeDay ? <DayList day={activeDay} /> : null}
          </div>
        </>
      )}
    </div>
  );
}
