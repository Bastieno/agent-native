import { useQuery } from "@tanstack/react-query";
import { agentNativePath } from "@agent-native/core/client";
import { useNavigationState } from "@/hooks/use-navigation-state";
import { useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { IconChartBar } from "@tabler/icons-react";

export default function TeacherAnalytics() {
  const { sync } = useNavigationState();

  useEffect(() => {
    sync({ role: "teacher", view: "analytics" });
  }, [sync]);

  const { data: analytics } = useQuery({
    queryKey: ["teacher-analytics"],
    queryFn: async () => {
      const res = await fetch(agentNativePath("/api/school/my-analytics"));
      if (!res.ok) return null;
      return res.json();
    },
  });

  return (
    <div className="p-6 space-y-6 overflow-y-auto h-full">
      <div>
        <h1 className="text-xl font-semibold">My Analytics</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Performance overview across your classes.
        </p>
      </div>

      {!analytics ? (
        <div className="rounded-lg border border-dashed p-10 text-center">
          <IconChartBar size={28} className="mx-auto text-muted-foreground mb-2" />
          <p className="text-sm font-medium">No analytics yet</p>
          <p className="text-xs text-muted-foreground mt-1">
            Analytics will populate once students submit and you grade their work.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-lg border bg-card p-4 text-center">
              <p className="text-2xl font-semibold">{analytics.overallAverage ?? "—"}%</p>
              <p className="text-xs text-muted-foreground mt-1">Overall Average</p>
            </div>
            <div className="rounded-lg border bg-card p-4 text-center">
              <p className="text-2xl font-semibold">{analytics.pendingGrading ?? 0}</p>
              <p className="text-xs text-muted-foreground mt-1">Awaiting Grading</p>
            </div>
            <div className="rounded-lg border bg-card p-4 text-center">
              <p className="text-2xl font-semibold">{analytics.strugglingCount ?? 0}</p>
              <p className="text-xs text-muted-foreground mt-1">Students Struggling</p>
            </div>
          </div>

          {analytics.byClass && analytics.byClass.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-sm font-medium">By Class</h2>
              {analytics.byClass.map((cls: any) => (
                <div key={cls.classId} className="rounded-lg border p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{cls.className}</span>
                    <div className="flex items-center gap-2">
                      {cls.strugglingCount > 0 && (
                        <Badge variant="destructive" className="text-xs">
                          {cls.strugglingCount} struggling
                        </Badge>
                      )}
                      <span className="text-sm font-medium">
                        {cls.averageScore ?? "—"}%
                      </span>
                    </div>
                  </div>
                  <Progress
                    value={cls.averageScore ? parseFloat(cls.averageScore) : 0}
                    className="h-1.5"
                  />
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>{cls.studentCount} students</span>
                    <span>{cls.completionRate ?? 0}% completion</span>
                    {cls.pendingGrading > 0 && (
                      <span className="text-amber-600">{cls.pendingGrading} to grade</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
