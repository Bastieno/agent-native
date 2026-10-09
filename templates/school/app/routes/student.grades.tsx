import { useQuery } from "@tanstack/react-query";
import { agentNativePath } from "@agent-native/core/client";
import { useNavigationState } from "@/hooks/use-navigation-state";
import { useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { IconTrophy } from "@tabler/icons-react";

export default function StudentGrades() {
  const { sync } = useNavigationState();

  useEffect(() => {
    sync({ role: "student", view: "grades" });
  }, [sync]);

  const { data: grades = [] } = useQuery<any[]>({
    queryKey: ["my-grades"],
    queryFn: async () => {
      const res = await fetch(
        agentNativePath("/_agent-native/actions/get-my-grades"),
      );
      if (!res.ok) return [];
      return res.json();
    },
  });

  return (
    <div className="p-6 space-y-4">
      <div>
        <h1 className="text-xl font-semibold">My Grades</h1>
        <p className="text-sm text-muted-foreground mt-1">
          All published grades across your classes.
        </p>
      </div>
      {grades.length === 0 ? (
        <div className="rounded-lg border border-dashed p-10 text-center">
          <IconTrophy
            size={28}
            className="mx-auto text-muted-foreground mb-2"
          />
          <p className="text-sm font-medium">No grades yet</p>
          <p className="text-xs text-muted-foreground mt-1">
            Grades will appear here once your teacher publishes them.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {grades.map((grade: any, i: number) => (
            <div
              key={i}
              className="rounded-lg border p-4 flex items-center justify-between"
            >
              <div>
                <p className="text-sm font-medium">{grade.assessmentTitle}</p>
                {grade.feedback && (
                  <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                    {grade.feedback}
                  </p>
                )}
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold">
                  {grade.letterGrade ?? `${grade.percentage}%`}
                </p>
                <p className="text-xs text-muted-foreground">
                  {grade.score}/{grade.maxScore} pts
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
