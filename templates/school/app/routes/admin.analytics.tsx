import { useQuery } from "@tanstack/react-query";
import { agentNativePath } from "@agent-native/core/client";
import { useNavigationState } from "@/hooks/use-navigation-state";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { ListState } from "@/components/ListState";
import {
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
    <div className="h-full space-y-6 overflow-auto p-6 pb-24">
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
          <div className="grid grid-cols-4 gap-4">
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
            <div className="space-y-3">
              <h2 className="text-sm font-medium">Performance by Subject</h2>
              {analytics.bySubject.map((s: any) => (
                <SubjectRow
                  key={s.subjectId}
                  subject={s}
                  classes={(analytics.classSummaries ?? []).filter(
                    (c: any) => c.subjectName === s.subjectName,
                  )}
                />
              ))}
            </div>
          )}

          {analytics.byGradeLevel && analytics.byGradeLevel.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-sm font-medium">
                Performance by Grade Level
              </h2>
              <div className="rounded-lg border">
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
        </>
      )}
    </div>
  );
}

/**
 * A subject, and the classes inside it when asked.
 *
 * "Mathematics is at 56%" is where a head teacher's question begins, not
 * where it ends: the next thing they need is which class and whose, and
 * before this the page could not answer either — it had no links at all.
 *
 * It opens in place rather than navigating. A subject has two or three
 * classes, which is a sentence each; sending someone to another screen for
 * three rows loses their place in the list they were reading.
 */
function SubjectRow({ subject, classes }: { subject: any; classes: any[] }) {
  const [open, setOpen] = useState(false);
  const canOpen = classes.length > 0;

  return (
    <div className="rounded-lg border">
      <button
        type="button"
        disabled={!canOpen}
        onClick={() => setOpen((was) => !was)}
        className="w-full space-y-2 p-4 text-left disabled:cursor-default"
      >
        <div className="flex items-center justify-between gap-3">
          <span className="flex items-center gap-1.5 text-sm font-medium">
            {canOpen ? (
              <IconChevronRight
                size={14}
                className={cn(
                  "text-muted-foreground transition-transform",
                  open && "rotate-90",
                )}
              />
            ) : null}
            {subject.subjectName}
          </span>
          <span className="flex items-center gap-1 text-sm text-muted-foreground">
            {subject.trend === "up" ? (
              <IconTrendingUp size={14} className="text-green-500" />
            ) : subject.trend === "down" ? (
              <IconTrendingDown size={14} className="text-red-500" />
            ) : null}
            {subject.average ?? "—"}%
          </span>
        </div>
        <Progress
          value={subject.average ? parseFloat(subject.average) : 0}
          className="h-1.5"
        />
        <p className="text-xs text-muted-foreground">
          {subject.classCount} class{subject.classCount !== 1 ? "es" : ""} ·{" "}
          {subject.studentCount} students
        </p>
      </button>

      {open ? (
        <div className="divide-y border-t">
          {classes.map((cls: any) => (
            <div
              key={cls.classId}
              className="flex flex-wrap items-baseline gap-x-3 gap-y-1 px-4 py-2.5 text-sm"
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
                className="w-full text-xs text-muted-foreground underline-offset-2 hover:text-foreground hover:underline sm:w-auto"
              >
                Lesson notes
              </Link>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
