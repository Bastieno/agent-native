import { useQuery } from "@tanstack/react-query";
import { agentNativePath } from "@agent-native/core/client";
import { useNavigationState } from "@/hooks/use-navigation-state";
import { useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { IconChartBar } from "@tabler/icons-react";

export default function StudentProgress() {
  const { sync } = useNavigationState();

  useEffect(() => {
    sync({ role: "student", view: "progress" });
  }, [sync]);

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
          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-lg border bg-card p-4 text-center">
              <p className="text-2xl font-semibold">
                {progress.overallAverage ?? "—"}%
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Overall Average
              </p>
            </div>
            <div className="rounded-lg border bg-card p-4 text-center">
              <p className="text-2xl font-semibold">
                {progress.assignmentsCompleted}
              </p>
              <p className="text-xs text-muted-foreground mt-1">Completed</p>
            </div>
            <div className="rounded-lg border bg-card p-4 text-center">
              <p className="text-2xl font-semibold">
                {progress.completionRate}%
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Completion Rate
              </p>
            </div>
          </div>
          <div className="space-y-3">
            <h2 className="text-sm font-medium">By Class</h2>
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
                  Completion: {cls.completionRate}% ({cls.gradedCount}/
                  {cls.totalAssessments} graded)
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
