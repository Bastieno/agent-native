import { useQuery } from "@tanstack/react-query";
import { agentNativePath } from "@agent-native/core/client";
import { useNavigationState } from "@/hooks/use-navigation-state";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import { cn } from "@/lib/utils";
import { Pagination, usePagination } from "@/components/Pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSchoolConfig } from "@/hooks/use-school-config";
import { ListState } from "@/components/ListState";
import {
  IconArrowDown,
  IconArrowUp,
  IconChartBar,
  IconChevronRight,
  IconTrendingUp,
  IconTrendingDown,
} from "@tabler/icons-react";

export default function AdminAnalytics() {
  const { sync } = useNavigationState();

  useEffect(() => {
    sync({ role: "admin", view: "analytics" });
  }, [sync]);

  // Straight to the action — the same computation the agent uses, so the page
  // and "how is the school doing?" can never disagree.
  const { data: analytics, isLoading } = useQuery({
    queryKey: ["school-analytics"],
    queryFn: async () => {
      const res = await fetch(
        agentNativePath("/_agent-native/actions/get-school-analytics"),
      );
      if (!res.ok) return null;
      return res.json();
    },
  });

  return (
    <div className="h-full space-y-6 overflow-auto p-6">
      <div>
        <h1 className="text-xl font-semibold">School Analytics</h1>
        <p className="text-sm text-muted-foreground mt-1">
          School-wide performance and completion overview.
        </p>
      </div>

      {/* Nothing marked yet is not the same as nothing happening, and it
          should not look like a broken page. Fifteen subjects showing "—%"
          beside fifteen empty bars says less than one sentence does, and
          leaves a head teacher wondering which of the dashes is a fault. */}
      {isLoading || !analytics || !Number(analytics.gradedSubmissions ?? 0) ? (
        <ListState
          loading={isLoading}
          icon={IconChartBar}
          title={
            isLoading || !analytics
              ? "No analytics data yet"
              : "Nothing has been marked yet"
          }
          description={
            isLoading || !analytics
              ? "Analytics will populate once students start submitting work."
              : `${analytics?.activeStudents ?? 0} learner(s) across ${analytics?.totalClasses ?? 0} class(es). Averages appear here once work has been marked and the grades published — a mark a teacher has not published yet is not counted.`
          }
        />
      ) : (
        <>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {[
              {
                label: "School Average",
                value: `${analytics.schoolAverage ?? "—"}%`,
              },
              {
                label: "Completion Rate",
                value: `${analytics.completionRate ?? "—"}%`,
              },
              {
                label: "Active Students",
                value: analytics.activeStudents ?? "—",
              },
              {
                label: "Graded Submissions",
                value: analytics.gradedSubmissions ?? "—",
              },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="rounded-lg border bg-card p-4 text-center"
              >
                <p className="text-2xl font-semibold">{value}</p>
                <p className="text-xs text-muted-foreground mt-1">{label}</p>
              </div>
            ))}
          </div>

          {analytics.bySubject && analytics.bySubject.length > 0 && (
            <SubjectPerformance
              subjects={analytics.bySubject}
              classSummaries={analytics.classSummaries ?? []}
            />
          )}

          {analytics.byGradeLevel && analytics.byGradeLevel.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-sm font-medium">
                Performance by Grade Level
              </h2>
              <ul className="divide-y rounded-lg border sm:hidden">
                {analytics.byGradeLevel.map((g: any) => (
                  <li
                    key={g.gradeLevelId}
                    className="flex items-center justify-between gap-3 px-4 py-3"
                  >
                    <div>
                      <p className="text-sm font-medium">{g.gradeLevelName}</p>
                      <p className="text-xs text-muted-foreground">
                        {g.studentCount} students · {g.completionRate ?? "—"}%
                        handed in
                      </p>
                    </div>
                    <span className="text-sm font-medium tabular-nums">
                      {g.average ?? "—"}%
                    </span>
                  </li>
                ))}
              </ul>
              <div className="hidden rounded-lg border sm:block">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/40">
                      <th className="px-4 py-2.5 text-left font-medium">
                        Grade Level
                      </th>
                      <th className="px-4 py-2.5 text-left font-medium">
                        Average
                      </th>
                      <th className="px-4 py-2.5 text-left font-medium">
                        Students
                      </th>
                      <th className="px-4 py-2.5 text-left font-medium">
                        Completion
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {analytics.byGradeLevel.map((g: any) => (
                      <tr
                        key={g.gradeLevelId}
                        className="border-b last:border-0"
                      >
                        <td className="px-4 py-2.5 font-medium">
                          {g.gradeLevelName}
                        </td>
                        <td className="px-4 py-2.5">{g.average ?? "—"}%</td>
                        <td className="px-4 py-2.5 text-muted-foreground">
                          {g.studentCount}
                        </td>
                        <td className="px-4 py-2.5 text-muted-foreground">
                          {g.completionRate ?? "—"}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* So the page can be trusted, or checked: how every figure is made. */}
          <p className="text-xs text-muted-foreground">
            Counted like the report card: published marks only, with work not
            handed in{" "}
            {analytics.missedWorkCountsAsZero
              ? "counted as zero"
              : "left out of the average"}
            . A class is the mean of its learners, and the school, a subject and
            a year group are the mean of their classes, so every class counts
            equally.
          </p>
        </>
      )}
    </div>
  );
}

type SortKey = "name" | "average" | "classes" | "students";

const averageOf = (s: any): number | null => {
  const n = parseFloat(s.average);
  return Number.isFinite(n) ? n : null;
};

/**
 * Every subject in one compact table, weakest first.
 *
 * A head teacher's question is "where are we weak?", and a list of cards with
 * a bar each cannot answer it: the bars all sit between 50% and 59% and look
 * the same, and the order was whatever the database returned. Here the rows
 * are sorted by average (click a heading to change that), the bar carries the
 * school's pass mark, and anything under it is coloured, so the weak subjects
 * are the first rows and the only coloured ones.
 */
function SubjectPerformance({
  subjects,
  classSummaries,
}: {
  subjects: any[];
  classSummaries: any[];
}) {
  const { config } = useSchoolConfig();
  const passMark = config.passMark ?? 50;
  const [sort, setSort] = useState<{ key: SortKey; dir: 1 | -1 }>({
    key: "average",
    dir: 1,
  });

  const sorted = useMemo(() => {
    const value = (s: any) =>
      sort.key === "name"
        ? s.subjectName
        : sort.key === "average"
          ? averageOf(s)
          : sort.key === "classes"
            ? s.classCount
            : s.studentCount;
    return [...subjects].sort((a, b) => {
      const x = value(a);
      const y = value(b);
      // A subject with nothing marked yet goes last either way.
      if (x === null && y === null) return 0;
      if (x === null) return 1;
      if (y === null) return -1;
      const cmp =
        typeof x === "string"
          ? x.localeCompare(y as string)
          : x - (y as number);
      return cmp * sort.dir;
    });
  }, [subjects, sort]);
  const paged = usePagination(sorted);

  const below = subjects.filter((s) => {
    const avg = averageOf(s);
    return avg !== null && avg < passMark;
  });
  const lowest = [...subjects]
    .filter((s) => averageOf(s) !== null)
    .sort((a, b) => averageOf(a)! - averageOf(b)!)
    .slice(0, 3);
  const attention = below.length > 0 ? below : lowest;

  const heading = (key: SortKey, label: string, align = "text-left") => (
    <th className={cn("px-4 py-2.5 font-medium", align)}>
      <button
        type="button"
        onClick={() =>
          setSort((cur) => ({
            key,
            dir:
              cur.key === key
                ? cur.dir === 1
                  ? -1
                  : 1
                : key === "name"
                  ? 1
                  : key === "average"
                    ? 1
                    : -1,
          }))
        }
        className="inline-flex items-center gap-1 hover:text-foreground"
      >
        {label}
        {sort.key === key ? (
          sort.dir === 1 ? (
            <IconArrowUp size={12} />
          ) : (
            <IconArrowDown size={12} />
          )
        ) : null}
      </button>
    </th>
  );

  return (
    <div className="space-y-3">
      <h2 className="text-sm font-medium">Performance by Subject</h2>

      {attention.length > 0 ? (
        <div className="rounded-lg border bg-card px-4 py-3">
          <p className="text-xs font-medium text-muted-foreground">
            {below.length > 0
              ? `${below.length} subject${below.length === 1 ? " is" : "s are"} below the ${passMark}% pass mark`
              : `Lowest averages — all subjects are above the ${passMark}% pass mark`}
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {attention.map((s) => (
              <span
                key={s.subjectId}
                className={cn(
                  "inline-flex items-center gap-2 rounded-md border px-2.5 py-1 text-xs",
                  below.length > 0 && "border-destructive/40 text-destructive",
                )}
              >
                {s.subjectName}
                <span className="font-medium tabular-nums">{s.average}%</span>
              </span>
            ))}
          </div>
        </div>
      ) : null}

      {/* On a phone the headings that sort are out of reach, so a menu does it. */}
      <div className="flex items-center justify-between gap-3 sm:hidden">
        <span className="text-xs text-muted-foreground">Sorted by</span>
        <Select
          value={`${sort.key}:${sort.dir}`}
          onValueChange={(v) => {
            const [key, dir] = v.split(":");
            setSort({ key: key as SortKey, dir: Number(dir) as 1 | -1 });
          }}
        >
          <SelectTrigger className="h-8 w-auto gap-2 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="average:1">Weakest first</SelectItem>
            <SelectItem value="average:-1">Strongest first</SelectItem>
            <SelectItem value="name:1">Name, A to Z</SelectItem>
            <SelectItem value="students:-1">Most students</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <ul className="divide-y rounded-lg border sm:hidden">
        {paged.items.map((s) => (
          <SubjectCard
            key={s.subjectId}
            subject={s}
            passMark={passMark}
            classes={classSummaries.filter(
              (c: any) => c.subjectName === s.subjectName,
            )}
          />
        ))}
      </ul>

      <div className="hidden overflow-x-auto rounded-lg border sm:block">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/40">
              {heading("name", "Subject")}
              {heading("average", "Average")}
              {heading("classes", "Classes", "hidden text-right sm:table-cell")}
              {heading(
                "students",
                "Students",
                "hidden text-right sm:table-cell",
              )}
            </tr>
          </thead>
          <tbody>
            {paged.items.map((s) => (
              <SubjectRow
                key={s.subjectId}
                subject={s}
                passMark={passMark}
                classes={classSummaries.filter(
                  (c: any) => c.subjectName === s.subjectName,
                )}
              />
            ))}
          </tbody>
        </table>
      </div>
      <Pagination {...paged} noun="subjects" flush={false} />
    </div>
  );
}

/** The phone version of a subject row: a card that opens to its classes. */
function SubjectCard({
  subject,
  classes,
  passMark,
}: {
  subject: any;
  classes: any[];
  passMark: number;
}) {
  const [open, setOpen] = useState(false);
  const canOpen = classes.length > 0;
  const avg = averageOf(subject);
  const weak = avg !== null && avg < passMark;

  return (
    <li>
      <button
        type="button"
        disabled={!canOpen}
        onClick={() => setOpen((was) => !was)}
        className="w-full space-y-2 px-4 py-3 text-left disabled:cursor-default"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="flex items-center gap-1.5 text-sm font-medium">
              <IconChevronRight
                size={14}
                className={cn(
                  "shrink-0 text-muted-foreground transition-transform",
                  open && "rotate-90",
                  !canOpen && "invisible",
                )}
              />
              {subject.subjectName}
            </p>
            <p className="pl-5 text-xs text-muted-foreground">
              {subject.classCount} class{subject.classCount !== 1 ? "es" : ""} ·{" "}
              {subject.studentCount} students
            </p>
          </div>
          <span
            className={cn(
              "flex shrink-0 items-center gap-1 text-sm tabular-nums",
              weak && "font-medium text-destructive",
            )}
          >
            {subject.trend === "up" ? (
              <IconTrendingUp size={14} className="text-green-500" />
            ) : subject.trend === "down" ? (
              <IconTrendingDown size={14} className="text-red-500" />
            ) : null}
            {avg === null ? "—" : `${subject.average}%`}
          </span>
        </div>
        <div className="relative ml-5 h-1.5 rounded-full bg-muted">
          <div
            className={cn(
              "h-full rounded-full",
              weak ? "bg-destructive" : "bg-primary",
            )}
            style={{ width: `${Math.min(100, Math.max(0, avg ?? 0))}%` }}
          />
          <span
            className="absolute -top-0.5 h-2.5 w-px bg-foreground/50"
            style={{ left: `${passMark}%` }}
            aria-hidden
          />
        </div>
      </button>
      {open ? (
        <div className="divide-y border-t bg-muted/20">
          {classes.map((cls: any) => (
            <div key={cls.classId} className="space-y-0.5 py-2.5 pl-9 pr-4">
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-sm font-medium">{cls.className}</span>
                <span className="text-sm tabular-nums">
                  {cls.averageScore ? `${cls.averageScore}%` : "—"}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                {cls.teacherName ?? (
                  <span className="italic">No teacher assigned</span>
                )}
                {" · "}
                {cls.completionRate === null
                  ? "nothing set yet"
                  : `${cls.completionRate}% handed in`}
              </p>
              <Link
                to={`/admin/lessons?classId=${cls.classId}`}
                className="text-xs text-muted-foreground underline-offset-2 hover:text-foreground hover:underline"
              >
                Lesson notes
              </Link>
            </div>
          ))}
        </div>
      ) : null}
    </li>
  );
}

/**
 * One subject, and the classes inside it when asked.
 *
 * "Mathematics is at 56%" is where a head teacher's question begins, not
 * where it ends: the next thing they need is which class and whose. It opens
 * in place rather than navigating: a subject has two or three classes, which
 * is a sentence each, and sending someone to another screen for three rows
 * loses their place in the list they were reading.
 */
function SubjectRow({
  subject,
  classes,
  passMark,
}: {
  subject: any;
  classes: any[];
  passMark: number;
}) {
  const [open, setOpen] = useState(false);
  const canOpen = classes.length > 0;
  const avg = averageOf(subject);
  const weak = avg !== null && avg < passMark;

  return (
    <>
      <tr
        className={cn(
          "border-b last:border-0",
          canOpen && "cursor-pointer hover:bg-muted/30",
        )}
        onClick={canOpen ? () => setOpen((was) => !was) : undefined}
      >
        <td className="px-4 py-2.5 font-medium">
          <span className="flex items-center gap-1.5">
            <IconChevronRight
              size={14}
              className={cn(
                "shrink-0 text-muted-foreground transition-transform",
                open && "rotate-90",
                !canOpen && "invisible",
              )}
            />
            <span className="min-w-0">
              {subject.subjectName}
              {/* The two columns are hidden on a phone; say them here. */}
              <span className="block text-xs font-normal text-muted-foreground sm:hidden">
                {subject.classCount} class{subject.classCount !== 1 ? "es" : ""}{" "}
                · {subject.studentCount} students
              </span>
            </span>
          </span>
        </td>
        <td className="px-4 py-2.5">
          <div className="flex items-center gap-3">
            <span
              className={cn(
                "w-12 shrink-0 tabular-nums",
                weak && "font-medium text-destructive",
              )}
            >
              {avg === null ? "—" : `${subject.average}%`}
            </span>
            {/* The tick is the pass mark, so "how far from passing" is seen
                rather than worked out. */}
            <div className="relative h-1.5 w-full min-w-10 max-w-56 rounded-full bg-muted">
              <div
                className={cn(
                  "h-full rounded-full",
                  weak ? "bg-destructive" : "bg-primary",
                )}
                style={{ width: `${Math.min(100, Math.max(0, avg ?? 0))}%` }}
              />
              <span
                className="absolute -top-0.5 h-2.5 w-px bg-foreground/50"
                style={{ left: `${passMark}%` }}
                aria-hidden
              />
            </div>
            {subject.trend === "up" ? (
              <IconTrendingUp size={14} className="shrink-0 text-green-500" />
            ) : subject.trend === "down" ? (
              <IconTrendingDown size={14} className="shrink-0 text-red-500" />
            ) : (
              <span className="w-3.5 shrink-0" />
            )}
          </div>
        </td>
        <td className="hidden px-4 py-2.5 text-right tabular-nums text-muted-foreground sm:table-cell">
          {subject.classCount}
        </td>
        <td className="hidden px-4 py-2.5 text-right tabular-nums text-muted-foreground sm:table-cell">
          {subject.studentCount}
        </td>
      </tr>
      {open ? (
        <tr className="border-b bg-muted/20 last:border-0">
          <td colSpan={4} className="p-0">
            <div className="divide-y">
              {classes.map((cls: any) => (
                <div
                  key={cls.classId}
                  className="flex flex-wrap items-baseline gap-x-3 gap-y-1 py-2.5 pl-10 pr-4 text-sm"
                >
                  <span className="font-medium">{cls.className}</span>
                  <span className="text-xs text-muted-foreground">
                    {/* A class nobody teaches is the finding, not a blank. */}
                    {cls.teacherName ?? (
                      <span className="italic">No teacher assigned</span>
                    )}
                  </span>
                  <span className="ml-auto tabular-nums">
                    {cls.averageScore ? `${cls.averageScore}%` : "—"}
                  </span>
                  <span className="w-28 text-right text-xs text-muted-foreground tabular-nums">
                    {cls.completionRate === null
                      ? "nothing set yet"
                      : `${cls.completionRate}% handed in`}
                  </span>
                  {/* Where an admin can actually do something about it. */}
                  <Link
                    to={`/admin/lessons?classId=${cls.classId}`}
                    onClick={(e) => e.stopPropagation()}
                    className="w-full text-xs text-muted-foreground underline-offset-2 hover:text-foreground hover:underline sm:w-auto"
                  >
                    Lesson notes
                  </Link>
                </div>
              ))}
            </div>
          </td>
        </tr>
      ) : null}
    </>
  );
}
