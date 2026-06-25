import { useQuery } from "@tanstack/react-query";
import { agentNativePath } from "@agent-native/core/client";
import { useNavigationState } from "@/hooks/use-navigation-state";
import { useEffect } from "react";
import { Link } from "react-router";
import { Badge } from "@/components/ui/badge";
import { IconClipboardList } from "@tabler/icons-react";

export default function StudentDashboard() {
  const { sync } = useNavigationState();

  const { data: assessments = [] } = useQuery<any[]>({
    queryKey: ["my-assessments"],
    queryFn: async () => {
      const res = await fetch(agentNativePath("/api/school/my-assessments"));
      if (!res.ok) return [];
      return res.json();
    },
  });

  const pending = assessments.filter(
    (a: any) =>
      a.submissionStatus === "not_started" || a.submissionStatus === "draft",
  );

  useEffect(() => {
    sync({
      role: "student",
      view: "dashboard",
      pendingCount: pending.length,
      totalAssessments: assessments.length,
    } as any);
  }, [sync, pending.length, assessments.length]);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-xl font-semibold">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Welcome! Here are your upcoming assignments.
        </p>
      </div>
      <div>
        <h2 className="text-sm font-medium mb-3">
          Pending Work
          {pending.length > 0 && (
            <Badge className="ml-2 text-xs">{pending.length}</Badge>
          )}
        </h2>
        {pending.length === 0 ? (
          <div className="rounded-lg border border-dashed p-8 text-center">
            <IconClipboardList
              size={28}
              className="mx-auto text-muted-foreground mb-2"
            />
            <p className="text-sm font-medium">All caught up!</p>
            <p className="text-xs text-muted-foreground mt-1">
              No pending assignments.
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {pending.map((assessment: any) => (
              <Link
                key={assessment.assessmentId}
                to={`/student/assessments/${assessment.assessmentId}`}
                className="flex items-center justify-between rounded-lg border p-3 hover:bg-accent/50 transition-colors"
              >
                <div>
                  <p className="text-sm font-medium">{assessment.title}</p>
                  {assessment.dueDate && (
                    <p className="text-xs text-muted-foreground">
                      Due: {assessment.dueDate}
                    </p>
                  )}
                </div>
                <Badge
                  variant={
                    assessment.submissionStatus === "draft"
                      ? "secondary"
                      : "outline"
                  }
                  className="text-xs capitalize"
                >
                  {assessment.submissionStatus.replace("_", " ")}
                </Badge>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
