import { useQuery } from "@tanstack/react-query";
import { agentNativePath } from "@agent-native/core/client";
import { useNavigationState } from "@/hooks/use-navigation-state";
import { useEffect } from "react";
import { useParams } from "react-router";
import { Badge } from "@/components/ui/badge";
import { IconTable, IconChevronDown } from "@tabler/icons-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useSchoolConfig } from "@/hooks/use-school-config";
import {
  resolveCategoryThresholds,
  type CategoryThresholds,
} from "@shared/student-levels";

/**
 * A class's marks.
 *
 * A gradebook really is tabular — a teacher scans down a column to see how the
 * class found one piece of work, and across a row to see one learner's term.
 * A table is the right tool for that, and only for that: a term's worth of
 * assessments on a tablet held in portrait is a dozen columns in a 700px
 * window, where the only thing anyone can read is the horizontal scrollbar.
 *
 * So the table stays where it works, and below `md` the same data is one card
 * per learner: the name, the average, and how much has been marked — with the
 * individual marks a tap away. That matches what a teacher wants on a small
 * screen ("how is this student doing?") rather than what a spreadsheet wants.
 */
export default function TeacherGradebook() {
  // Colour averages by this school's own bands, not by numbers written into
  // the page. A school passing at 40% should not see its solid students
  // flagged red.
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
      <div className="space-y-4 p-6">
        <h1 className="text-xl font-semibold">Gradebook</h1>
        <div className="rounded-lg border border-dashed p-10 text-center">
          <IconTable size={28} className="mx-auto mb-2 text-muted-foreground" />
          <p className="text-sm font-medium">Loading gradebook…</p>
        </div>
      </div>
    );
  }

  const { className, assessments = [], students = [] } = gradebook;

  // Worked out once, then shared by both layouts — so the average a teacher
  // reads on a phone is by construction the one they read on a laptop.
  const rows = students.map((student: any) => {
    const marks = assessments.map((a: any) => {
      const grade = student.grades?.[a.id];
      const max = grade?.maxScore ?? a.totalPoints;
      return {
        assessment: a,
        score: grade?.score ?? null,
        letterGrade: grade?.letterGrade ?? null,
        max,
        percentage:
          grade?.score != null && max ? (grade.score / max) * 100 : null,
      };
    });
    const scored = marks
      .map((m: any) => m.percentage)
      .filter((p: any): p is number => p !== null);
    const avg = scored.length
      ? Math.round(
          scored.reduce((sum: number, p: number) => sum + p, 0) / scored.length,
        )
      : null;
    return { student, marks, avg, markedCount: scored.length };
  });

  return (
    <div className="flex h-full flex-col space-y-4 overflow-hidden p-4 sm:p-6">
      <div className="min-w-0">
        <h1 className="text-xl font-semibold break-words">
          Gradebook — {className}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {students.length} student{students.length === 1 ? "" : "s"} ·{" "}
          {assessments.length} marked{" "}
          {assessments.length === 1 ? "activity" : "activities"}
        </p>
      </div>

      {students.length === 0 ? (
        <div className="rounded-lg border border-dashed p-10 text-center">
          <IconTable size={28} className="mx-auto mb-2 text-muted-foreground" />
          <p className="text-sm font-medium">No students enrolled</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Enrol students in this class to see their marks here.
          </p>
        </div>
      ) : assessments.length === 0 ? (
        <div className="rounded-lg border border-dashed p-10 text-center">
          <IconTable size={28} className="mx-auto mb-2 text-muted-foreground" />
          <p className="text-sm font-medium">Nothing marked yet</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Work that carries no marks — reading, card decks, reference sheets —
            is not listed here.
          </p>
        </div>
      ) : (
        <>
          {/* One card per learner on a narrow screen. */}
          <div className="min-h-0 space-y-2 overflow-auto md:hidden">
            {rows.map(({ student, marks, avg, markedCount }: any) => (
              <Collapsible key={student.id} className="rounded-lg border">
                <CollapsibleTrigger className="group flex w-full items-center justify-between gap-3 p-3 text-left">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">
                      {student.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {markedCount} of {marks.length} marked
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <AverageBadge avg={avg} thresholds={thresholds} />
                    <IconChevronDown
                      size={16}
                      className="text-muted-foreground transition-transform group-data-[state=open]:rotate-180"
                    />
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="divide-y border-t">
                    {marks.map(
                      ({ assessment, score, letterGrade, max }: any) => (
                        <div
                          key={assessment.id}
                          className="flex items-center justify-between gap-3 px-3 py-2"
                        >
                          <span className="min-w-0 flex-1 truncate text-sm">
                            {assessment.title}
                          </span>
                          {score != null ? (
                            <span className="shrink-0 text-sm tabular-nums">
                              {score}
                              <span className="text-muted-foreground">
                                /{max}
                              </span>
                              {letterGrade ? (
                                <span className="ml-1.5 text-xs text-muted-foreground">
                                  {letterGrade}
                                </span>
                              ) : null}
                            </span>
                          ) : (
                            <span className="shrink-0 text-sm text-muted-foreground">
                              Not marked
                            </span>
                          )}
                        </div>
                      ),
                    )}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>

          {/* The table, from md up, where there is room to compare columns. */}
          <div className="hidden min-h-0 overflow-auto rounded-lg border md:block">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/40">
                  {/* Opaque, and above the columns that slide under it: at 40%
                      opacity the scrolling marks showed straight through the
                      names. The border keeps the seam visible once scrolled. */}
                  <th className="sticky left-0 z-20 min-w-[160px] border-r bg-muted px-4 py-2.5 text-left font-medium">
                    Student
                  </th>
                  {assessments.map((a: any) => (
                    <th
                      key={a.id}
                      className="min-w-[150px] max-w-[220px] px-3 py-2.5 text-center align-bottom font-medium"
                      title={a.title}
                    >
                      <div className="mx-auto line-clamp-2 whitespace-normal leading-snug">
                        {a.title}
                      </div>
                      <div className="mt-0.5 text-xs font-normal text-muted-foreground">
                        /{a.totalPoints}
                      </div>
                    </th>
                  ))}
                  <th className="px-4 py-2.5 text-center font-medium">Avg</th>
                </tr>
              </thead>
              <tbody>
                {rows.map(({ student, marks, avg }: any) => (
                  <tr key={student.id} className="border-b last:border-0">
                    <td className="sticky left-0 z-10 border-r bg-background px-4 py-2.5">
                      <p className="font-medium">{student.name}</p>
                    </td>
                    {marks.map(({ assessment, score, letterGrade }: any) => (
                      <td
                        key={assessment.id}
                        className="px-3 py-2.5 text-center"
                      >
                        {score != null ? (
                          <div className="space-y-0.5">
                            <div className="font-medium">{score}</div>
                            {letterGrade && (
                              <div className="text-xs text-muted-foreground">
                                {letterGrade}
                              </div>
                            )}
                          </div>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </td>
                    ))}
                    <td className="px-4 py-2.5 text-center">
                      <AverageBadge avg={avg} thresholds={thresholds} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

function AverageBadge({
  avg,
  thresholds,
}: {
  avg: number | null;
  thresholds: CategoryThresholds;
}) {
  if (avg === null) return <span className="text-muted-foreground">—</span>;
  return (
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
  );
}
