import { useQuery } from "@tanstack/react-query";
import { agentNativePath } from "@agent-native/core/client";
import { useNavigationState } from "@/hooks/use-navigation-state";
import { useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { IconChartBar, IconTrendingUp, IconTrendingDown } from "@tabler/icons-react";

export default function AdminAnalytics() {
  const { sync } = useNavigationState();

  useEffect(() => {
    sync({ role: "admin", view: "analytics" });
  }, [sync]);

  const { data: analytics } = useQuery({
    queryKey: ["school-analytics"],
    queryFn: async () => {
      const res = await fetch(agentNativePath("/api/school/analytics"));
      if (!res.ok) return null;
      return res.json();
    },
  });

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-xl font-semibold">School Analytics</h1>
        <p className="text-sm text-muted-foreground mt-1">
          School-wide performance and completion overview.
        </p>
      </div>

      {!analytics ? (
        <div className="rounded-lg border border-dashed p-10 text-center">
          <IconChartBar size={28} className="mx-auto text-muted-foreground mb-2" />
          <p className="text-sm font-medium">No analytics data yet</p>
          <p className="text-xs text-muted-foreground mt-1">
            Analytics will populate once students start submitting work.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-4 gap-4">
            {[
              { label: "School Average", value: `${analytics.schoolAverage ?? "—"}%` },
              { label: "Completion Rate", value: `${analytics.completionRate ?? "—"}%` },
              { label: "Active Students", value: analytics.activeStudents ?? "—" },
              { label: "Graded Submissions", value: analytics.gradedSubmissions ?? "—" },
            ].map(({ label, value }) => (
              <div key={label} className="rounded-lg border bg-card p-4 text-center">
                <p className="text-2xl font-semibold">{value}</p>
                <p className="text-xs text-muted-foreground mt-1">{label}</p>
              </div>
            ))}
          </div>

          {analytics.bySubject && analytics.bySubject.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-sm font-medium">Performance by Subject</h2>
              {analytics.bySubject.map((s: any) => (
                <div key={s.subjectId} className="rounded-lg border p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{s.subjectName}</span>
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                      {s.trend === "up" ? (
                        <IconTrendingUp size={14} className="text-green-500" />
                      ) : s.trend === "down" ? (
                        <IconTrendingDown size={14} className="text-red-500" />
                      ) : null}
                      {s.average ?? "—"}%
                    </span>
                  </div>
                  <Progress
                    value={s.average ? parseFloat(s.average) : 0}
                    className="h-1.5"
                  />
                  <p className="text-xs text-muted-foreground">
                    {s.classCount} class{s.classCount !== 1 ? "es" : ""} · {s.studentCount} students
                  </p>
                </div>
              ))}
            </div>
          )}

          {analytics.byGradeLevel && analytics.byGradeLevel.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-sm font-medium">Performance by Grade Level</h2>
              <div className="rounded-lg border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/40">
                      <th className="px-4 py-2.5 text-left font-medium">Grade Level</th>
                      <th className="px-4 py-2.5 text-left font-medium">Average</th>
                      <th className="px-4 py-2.5 text-left font-medium">Students</th>
                      <th className="px-4 py-2.5 text-left font-medium">Completion</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analytics.byGradeLevel.map((g: any) => (
                      <tr key={g.gradeLevelId} className="border-b last:border-0">
                        <td className="px-4 py-2.5 font-medium">{g.gradeLevelName}</td>
                        <td className="px-4 py-2.5">{g.average ?? "—"}%</td>
                        <td className="px-4 py-2.5 text-muted-foreground">{g.studentCount}</td>
                        <td className="px-4 py-2.5 text-muted-foreground">{g.completionRate ?? "—"}%</td>
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
