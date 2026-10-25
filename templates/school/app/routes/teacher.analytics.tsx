import { CapabilityHint } from "@/components/help/CapabilityHint";
import { useQuery } from "@tanstack/react-query";
import { ListState } from "@/components/ListState";
import { agentNativePath } from "@agent-native/core/client";
import { useNavigationState } from "@/hooks/use-navigation-state";
import { useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { IconChartBar, IconChevronDown } from "@tabler/icons-react";
import { Link } from "react-router";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useOrigin } from "@/lib/origin";

export default function TeacherAnalytics() {
  const { sync } = useNavigationState();
  const origin = useOrigin();

  useEffect(() => {
    sync({ role: "teacher", view: "analytics" });
  }, [sync]);

  const { data: analytics, isLoading } = useQuery({
    queryKey: ["teacher-analytics"],
    queryFn: async () => {
      const res = await fetch(
        agentNativePath("/_agent-native/actions/get-my-analytics"),
      );
      if (!res.ok) return null;
      return res.json();
    },
  });

  const topPaper = ((analytics?.byClass ?? []) as any[])
    .flatMap((c) => c.gradingQueue ?? [])
    .sort((a: any, b: any) => b.count - a.count)[0];

  return (
    <div className="p-6 space-y-6 overflow-y-auto h-full">
      <div>
        <h1 className="text-xl font-semibold">My Analytics</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Performance overview across your classes.
        </p>
      </div>

      {isLoading ? (
        <ListState loading rows={3} title="Analytics" />
      ) : !analytics ? (
        <div className="rounded-lg border border-dashed p-10 text-center">
          <IconChartBar
            size={28}
            className="mx-auto text-muted-foreground mb-2"
          />
          <p className="text-sm font-medium">No analytics yet</p>
          <p className="text-xs text-muted-foreground mt-1">
            Analytics will populate once students submit and you grade their
            work.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-lg border bg-card p-4 text-center">
              <p className="text-2xl font-semibold">
                {analytics.overallAverage ?? "—"}%
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Overall Average
              </p>
            </div>
            {/* With work waiting, this opens the paper with the most of it. */}
            {topPaper && analytics.pendingGrading > 0 ? (
              <Link
                to={`/teacher/assessments/${topPaper.id}?tab=submissions`}
                state={origin("Analytics")}
                className="rounded-lg border bg-card p-4 text-center transition-colors hover:border-primary/40"
              >
                <p className="text-2xl font-semibold">
                  {analytics.pendingGrading}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Awaiting Grading
                </p>
              </Link>
            ) : (
              <div className="rounded-lg border bg-card p-4 text-center">
                <p className="text-2xl font-semibold">
                  {analytics.pendingGrading ?? 0}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Awaiting Grading
                </p>
              </div>
            )}
            <div className="rounded-lg border bg-card p-4 text-center">
              <p className="text-2xl font-semibold">
                {analytics.strugglingCount ?? 0}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Students Struggling
              </p>
            </div>
          </div>

          {analytics.strugglingCount > 0 ? (
            <CapabilityHint id="teacher-learner-page">
              Open a name under a class to see how that learner is doing
              overall, and make something just for them.
            </CapabilityHint>
          ) : null}

          {analytics.byClass && analytics.byClass.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-sm font-medium">By Class</h2>
              {analytics.byClass.map((cls: any) => (
                <div
                  key={cls.classId}
                  className="rounded-lg border p-4 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{cls.className}</span>
                    <span className="text-sm font-medium">
                      {cls.averageScore ?? "—"}%
                    </span>
                  </div>
                  <Progress
                    value={cls.averageScore ? parseFloat(cls.averageScore) : 0}
                    className="h-1.5"
                  />
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>{cls.studentCount} students</span>
                    <span>{cls.completionRate ?? 0}% completion</span>
                    {cls.pendingGrading > 0 && (
                      <span className="text-amber-600">
                        {cls.pendingGrading} to grade
                      </span>
                    )}
                  </div>
                  {/* Where to go and do it: each paper that is waiting. */}
                  <div className="space-y-1 pt-0.5">
                    {(cls.gradingQueue ?? []).map((g: any) => (
                      <Link
                        key={g.id}
                        to={`/teacher/assessments/${g.id}?tab=submissions`}
                        state={origin("Analytics")}
                        className="flex items-center justify-between gap-3 rounded-md border border-amber-600/30 px-3 py-1.5 text-xs hover:bg-accent/50"
                      >
                        <span className="min-w-0 truncate">{g.title}</span>
                        <span className="shrink-0 text-amber-600">
                          {g.count} to grade
                        </span>
                      </Link>
                    ))}
                  </div>
                  {/* Who they are, one tap away: the count was a number
                      with nobody to speak to. */}
                  {cls.strugglingLearners?.length > 0 && (
                    <Collapsible>
                      <CollapsibleTrigger className="group flex w-full items-center justify-between gap-2 pt-1 text-xs font-medium text-destructive">
                        <span>{cls.strugglingCount} struggling</span>
                        <IconChevronDown
                          size={14}
                          className="transition-transform group-data-[state=open]:rotate-180"
                        />
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <ul className="mt-2 divide-y rounded-md border">
                          {cls.strugglingLearners.map((l: any) => (
                            <li key={l.studentId}>
                              <Link
                                to={`/teacher/students/${l.studentId}`}
                                state={origin("Analytics")}
                                className="flex items-center justify-between gap-3 px-3 py-2 text-sm hover:bg-accent/50"
                              >
                                <span className="min-w-0 truncate">
                                  {l.name}
                                </span>
                                <span className="shrink-0 text-xs text-muted-foreground">
                                  {l.nothingHandedIn
                                    ? "nothing handed in"
                                    : `${l.percentage}%`}
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </CollapsibleContent>
                    </Collapsible>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
