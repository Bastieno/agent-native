import { useQuery } from "@tanstack/react-query";
import { agentNativePath } from "@agent-native/core/client";
import { useNavigationState } from "@/hooks/use-navigation-state";
import { useEffect } from "react";
import { Link } from "react-router";
import { Badge } from "@/components/ui/badge";
import { IconClipboardList } from "@tabler/icons-react";
import { useMyWeek } from "@/hooks/use-my-week";
import { useRole } from "@/hooks/use-role";
import { useSchoolConfig } from "@/hooks/use-school-config";
import { firstNameOrNull } from "@shared/person-name";
import { countOfWork, workWords } from "@shared/terminology";

export default function StudentDashboard() {
  const { sync } = useNavigationState();
  const { user } = useRole();
  const { config } = useSchoolConfig();
  // Same query as the week page, so they share one cache entry.
  const { data: week } = useMyWeek();
  const next = week?.next ?? null;

  const { data: assessments = [] } = useQuery<any[]>({
    queryKey: ["my-assessments"],
    queryFn: async () => {
      const res = await fetch(
        agentNativePath("/_agent-native/actions/get-my-assessments"),
      );
      if (!res.ok) return [];
      return res.json();
    },
  });

  // Work owed. A page to read and a card deck are neither handed in nor
  // marked, so counting them here told a learner they owed seven pieces of
  // work when they owed three — and a number a child cannot verify is a
  // number they stop believing.
  const pending = assessments.filter(
    (a: any) =>
      !a.isMaterial &&
      (a.submissionStatus === "not_started" || a.submissionStatus === "draft"),
  );
  /** Published to read or practise with, not owed. */
  const toRead = assessments.filter((a: any) => a.isMaterial);

  useEffect(() => {
    sync({
      role: "student",
      view: "dashboard",
      pendingCount: pending.length,
      totalAssessments: assessments.length,
    } as any);
  }, [sync, pending.length, assessments.length]);

  // A name only when someone gave one: signing up derives a name from the
  // email address, and "Welcome back, student1" is worse than no name at all.
  const firstName = firstNameOrNull(user?.name, user?.email);
  // The school's own words, plural included — "3 homework", not "3 homeworks".
  const work = workWords(config as any);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-xl font-semibold">
          {firstName ? `Welcome back, ${firstName}` : "Welcome back"}
        </h1>
        {/* The page used to promise upcoming work above an empty panel. */}
        <p className="mt-1 text-sm text-muted-foreground">
          {pending.length > 0
            ? `You have ${countOfWork(pending.length, config as any)} to hand in.`
            : `Nothing to hand in right now. Your ${work.many} appear here when a teacher sets them.`}
        </p>
        {next ? (
          <p className="mt-1 text-sm text-muted-foreground">
            {`Next: ${[next.className, next.room, next.start].filter(Boolean).join(", ")}`}
          </p>
        ) : null}
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
            <p className="mt-1 text-xs text-muted-foreground">
              Nothing waiting for you.
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

      {/* Material still has to be findable. Taking it out of the work count
          was right; taking it off the page would have hidden the reading a
          teacher published. */}
      {toRead.length > 0 ? (
        <div>
          <h2 className="mb-3 text-sm font-medium">To read and practise</h2>
          <div className="space-y-2">
            {toRead.map((a: any) => (
              <Link
                key={a.assessmentId}
                to={`/student/assessments/${a.assessmentId}`}
                className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-accent/50"
              >
                <p className="min-w-0 truncate text-sm">{a.title}</p>
                <span className="shrink-0 text-xs text-muted-foreground">
                  {a.format ?? "Nothing to hand in"}
                </span>
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
