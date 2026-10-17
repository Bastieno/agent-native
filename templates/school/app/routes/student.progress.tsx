import { useQuery } from "@tanstack/react-query";
import { agentNativePath } from "@agent-native/core/client";
import { useNavigationState } from "@/hooks/use-navigation-state";
import { useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { IconChartBar } from "@tabler/icons-react";
import { useSchoolDates } from "@/hooks/use-school-dates";

export default function StudentProgress() {
  const { formatDate } = useSchoolDates();
  const { sync } = useNavigationState();

  useEffect(() => {
    sync({ role: "student", view: "progress" });
  }, [sync]);

  // Whether the student is in any classes at all decides what an empty
  // progress page should say: waiting to be enrolled is not the same as
  // enrolled with nothing marked yet.
  const { data: myClasses } = useQuery<any[]>({
    queryKey: ["my-classes"],
    queryFn: async () => {
      const res = await fetch(
        agentNativePath("/_agent-native/actions/get-my-classes"),
      );
      if (!res.ok) return [];
      const json = await res.json();
      return Array.isArray(json) ? json : (json?.classes ?? []);
    },
  });

  const { data: progress } = useQuery({
    queryKey: ["my-progress"],
    queryFn: async () => {
      const res = await fetch(
        agentNativePath("/_agent-native/actions/get-my-progress"),
      );
      if (!res.ok) return null;
      return res.json();
    },
  });

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-xl font-semibold">My Progress</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Track your performance across all classes.
        </p>
      </div>
      {!progress ? (
        <div className="rounded-lg border border-dashed p-10 text-center">
          <IconChartBar
            size={28}
            className="mx-auto text-muted-foreground mb-2"
          />
          <p className="text-sm font-medium">No progress data yet</p>
        </div>
      ) : (
        <>
          {/* Three ways of saying "nothing yet" is not a progress page. An
              average, what has been handed in of what was actually set, and
              the one thing a learner can act on next. */}
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg border bg-card p-4 text-center">
              <p className="text-2xl font-semibold">
                {progress.overallAverage != null
                  ? `${progress.overallAverage}%`
                  : "—"}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {progress.markedCount > 0
                  ? `Average mark · ${progress.markedCount} marked`
                  : "Nothing marked yet"}
              </p>
            </div>
            <div className="rounded-lg border bg-card p-4 text-center">
              <p className="text-2xl font-semibold">
                {progress.assignmentsTotal > 0
                  ? `${progress.assignmentsCompleted} of ${progress.assignmentsTotal}`
                  : "—"}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {progress.assignmentsTotal > 0
                  ? "Handed in, of work set"
                  : "No work set yet"}
              </p>
            </div>
            <div className="rounded-lg border bg-card p-4 text-center">
              <p className="truncate text-2xl font-semibold">
                {progress.dueNext
                  ? formatDate(progress.dueNext.dueDate, {
                      day: "numeric",
                      month: "short",
                    })
                  : "—"}
              </p>
              <p className="mt-1 truncate text-xs text-muted-foreground">
                {progress.dueNext
                  ? `Due next · ${progress.dueNext.title}`
                  : "Nothing due"}
              </p>
            </div>
          </div>
          <div className="space-y-3">
            {/* The heading used to stand alone above nothing at all — a
                student not yet in a class saw "By Class" and blank space. */}
            {(progress.classSummaries ?? []).length === 0 ? (
              <div className="rounded-lg border border-dashed p-10 text-center">
                <IconChartBar
                  size={28}
                  className="mx-auto mb-2 text-muted-foreground"
                />
                <p className="text-sm font-medium">
                  {(myClasses ?? []).length > 0
                    ? "No marked work yet"
                    : "You're not in any classes yet"}
                </p>
                <p className="mx-auto mt-1 max-w-xs text-xs text-muted-foreground">
                  {(myClasses ?? []).length > 0
                    ? "Each class appears here once work you have handed in has been marked."
                    : "Your school adds you to your classes. Once that happens, your progress in each one appears here."}
                </p>
              </div>
            ) : null}
            {(progress.classSummaries ?? []).length > 0 ? (
              <h2 className="text-sm font-medium">By Class</h2>
            ) : null}
            {(progress.classSummaries ?? []).map((cls: any) => (
              <div
                key={cls.classId}
                className="rounded-lg border p-4 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{cls.className}</span>
                  {cls.isStruggling && (
                    <Badge variant="destructive" className="text-xs">
                      Needs attention
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <Progress
                    value={cls.averageScore ? parseFloat(cls.averageScore) : 0}
                    className="flex-1 h-2"
                  />
                  <span className="text-sm font-medium w-12 text-right">
                    {cls.averageScore ?? "—"}%
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {cls.setSoFar > 0
                    ? `Handed in ${cls.submittedCount} of ${cls.setSoFar} set`
                    : "Nothing set yet"}
                  {cls.gradedCount > 0 ? ` · ${cls.gradedCount} marked` : ""}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
