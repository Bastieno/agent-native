import { useQuery } from "@tanstack/react-query";
import { agentNativePath } from "@agent-native/core/client";
import { useNavigationState } from "@/hooks/use-navigation-state";
import { useEffect } from "react";
import { useParams } from "react-router";
import { Badge } from "@/components/ui/badge";
import { IconTable } from "@tabler/icons-react";
import { useSchoolConfig } from "@/hooks/use-school-config";
import { resolveCategoryThresholds } from "@shared/student-levels";

export default function TeacherGradebook() {
  // Colour the class average by this school's own bands, not by numbers
  // written into the page. A school passing at 40% should not see its solid
  // students flagged red.
  const { config } = useSchoolConfig();
  const thresholds = resolveCategoryThresholds(config as any);
  const { classId } = useParams<{ classId: string }>();
  const { sync } = useNavigationState();

  useEffect(() => {
    sync({ role: "teacher", view: "gradebook", classId });
  }, [sync, classId]);

  const { data: gradebook } = useQuery({
    queryKey: ["gradebook", classId],
    queryFn: async () => {
      const res = await fetch(
        agentNativePath(
          `/_agent-native/actions/get-gradebook?classId=${classId}`,
        ),
      );
      if (!res.ok) return null;
      return res.json();
    },
    enabled: !!classId,
  });

  if (!gradebook) {
    return (
      <div className="p-6 space-y-4">
        <h1 className="text-xl font-semibold">Gradebook</h1>
        <div className="rounded-lg border border-dashed p-10 text-center">
          <IconTable size={28} className="mx-auto text-muted-foreground mb-2" />
          <p className="text-sm font-medium">Loading gradebook…</p>
        </div>
      </div>
    );
  }

  const { className, assessments, students } = gradebook;

  return (
    <div className="p-6 space-y-4 overflow-hidden h-full flex flex-col">
      <div>
        <h1 className="text-xl font-semibold">Gradebook — {className}</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {students?.length ?? 0} students · {assessments?.length ?? 0}{" "}
          assessments
        </p>
      </div>

      {!students || students.length === 0 ? (
        <div className="rounded-lg border border-dashed p-10 text-center">
          <IconTable size={28} className="mx-auto text-muted-foreground mb-2" />
          <p className="text-sm font-medium">No grades yet</p>
          <p className="text-xs text-muted-foreground mt-1">
            Grade submissions to see them here.
          </p>
        </div>
      ) : (
        <div className="overflow-auto flex-1 rounded-lg border">
          <table className="text-sm min-w-full">
            <thead>
              <tr className="border-b bg-muted/40">
                <th className="px-4 py-2.5 text-left font-medium sticky left-0 bg-muted/40 min-w-[160px]">
                  Student
                </th>
                {(assessments ?? []).map((a: any) => (
                  <th
                    key={a.id}
                    className="px-3 py-2.5 text-center font-medium whitespace-nowrap min-w-[100px]"
                    title={a.title}
                  >
                    <div className="truncate max-w-[90px] mx-auto">
                      {a.title}
                    </div>
                    <div className="text-xs text-muted-foreground font-normal">
                      /{a.totalPoints}
                    </div>
                  </th>
                ))}
                <th className="px-4 py-2.5 text-center font-medium">Avg</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student: any) => {
                // Average percentages, not raw scores — assessments can have
                // different point totals.
                const scores = (assessments ?? []).map((a: any) => {
                  const grade = student.grades?.[a.id];
                  if (grade?.score == null) return null;
                  const max = grade.maxScore ?? a.totalPoints;
                  return max ? (grade.score / max) * 100 : null;
                });
                const validScores = scores.filter(
                  (s: any) => s !== null,
                ) as number[];
                const avg =
                  validScores.length > 0
                    ? Math.round(
                        validScores.reduce(
                          (sum: number, s: number) => sum + s,
                          0,
                        ) / validScores.length,
                      )
                    : null;

                return (
                  <tr key={student.id} className="border-b last:border-0">
                    <td className="px-4 py-2.5 sticky left-0 bg-background">
                      <p className="font-medium">{student.name}</p>
                    </td>
                    {(assessments ?? []).map((a: any) => {
                      const grade = student.grades?.[a.id];
                      return (
                        <td key={a.id} className="px-3 py-2.5 text-center">
                          {grade ? (
                            <div className="space-y-0.5">
                              <div className="font-medium">{grade.score}</div>
                              {grade.letterGrade && (
                                <div className="text-xs text-muted-foreground">
                                  {grade.letterGrade}
                                </div>
                              )}
                            </div>
                          ) : (
                            <span className="text-muted-foreground">—</span>
                          )}
                        </td>
                      );
                    })}
                    <td className="px-4 py-2.5 text-center">
                      {avg !== null ? (
                        <Badge
                          variant={
                            avg >= thresholds.advanced
                              ? "default"
                              : avg >= thresholds.developing
                                ? "secondary"
                                : "destructive"
                          }
                          className="text-xs"
                        >
                          {avg}%
                        </Badge>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
