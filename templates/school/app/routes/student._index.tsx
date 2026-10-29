import { CalendarBanner } from "@/components/CalendarBanner";
import { HelpNudge } from "@/components/help/HelpNudge";
import { useQuery } from "@tanstack/react-query";
import { agentNativePath } from "@agent-native/core/client";
import { useNavigationState } from "@/hooks/use-navigation-state";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  IconChevronDown,
  IconChevronRight,
  IconClipboardList,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { isCurrentWeek } from "@shared/term-weeks";
import { splitWorkTitle } from "@shared/work-title";
import { useMyWeek } from "@/hooks/use-my-week";
import { useRole } from "@/hooks/use-role";
import { ListState } from "@/components/ListState";
import { useSchoolConfig } from "@/hooks/use-school-config";
import { firstNameOrNull } from "@shared/person-name";
import { countOfWork } from "@shared/terminology";
import { submissionStatusWord } from "@/lib/submission-status";
import { useOrigin } from "@/lib/origin";

export default function StudentDashboard() {
  const origin = useOrigin();
  const { sync } = useNavigationState();
  const { user } = useRole();
  const { config } = useSchoolConfig();
  // Same query as the week page, so they share one cache entry.
  const { data: week } = useMyWeek();
  const next = week?.next ?? null;

  const { data: assessments = [], isLoading } = useQuery<any[]>({
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
  // Closed work is no longer owed: it cannot be handed in, so listing it here
  // would ask a child to do something the app will refuse.
  const pending = assessments.filter(
    (a: any) =>
      !a.isMaterial &&
      !a.window?.hasClosed &&
      (a.submissionStatus === "not_started" || a.submissionStatus === "draft"),
  );
  /** Published to read or practise with, not owed, and already open. */
  const toRead = assessments.filter(
    (a: any) => a.isMaterial && !a.window?.notYetOpen,
  );

  useEffect(() => {
    sync({
      role: "student",
      view: "dashboard",
      // Left out until the list has loaded, so the agent is never told 0.
      ...(isLoading
        ? {}
        : {
            pendingCount: pending.length,
            totalAssessments: assessments.length,
          }),
    } as any);
  }, [sync, isLoading, pending.length, assessments.length]);

  // A name only when someone gave one: signing up derives a name from the
  // email address, and "Welcome back, student1" is worse than no name at all.
  const firstName = firstNameOrNull(user?.name, user?.email);

  return (
    <div className="p-6 space-y-6">
      <HelpNudge />
      <CalendarBanner />
      <div>
        <h1 className="text-xl font-semibold">
          {firstName ? `Welcome back, ${firstName}` : "Welcome back"}
        </h1>
        {/* The page used to promise upcoming work above an empty panel. */}
        <p className="mt-1 text-sm text-muted-foreground">
          {isLoading
            ? "\u00a0"
            : pending.length > 0
              ? `You have ${countOfWork(pending.length, config as any)} to hand in.`
              : `Nothing to hand in right now. Anything a teacher sets will appear here.`}
        </p>
        {next ? (
          <p className="mt-1 text-sm text-muted-foreground">
            {`Next: ${next.isToday ? "" : `${next.dayName} — `}${[next.className, next.room, next.start].filter(Boolean).join(", ")}`}
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
        {isLoading ? (
          <ListState loading rows={2} title="Pending work" />
        ) : pending.length === 0 ? (
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
                state={origin("Dashboard")}
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
                  className="text-xs"
                >
                  {submissionStatusWord(assessment.submissionStatus)}
                </Badge>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Material still has to be findable. Taking it out of the work count
          was right; taking it off the page would have hidden the reading a
          teacher published. */}
      {toRead.length > 0 ? <ReadingBySubject items={toRead} /> : null}
    </div>
  );
}

type Material = {
  assessmentId: string;
  classId: string | null;
  title: string;
  subjectName: string | null;
  className: string | null;
  lessonDate: string | null;
  format: string | null;
};

/**
 * What there is to read and practise, a subject at a time.
 *
 * Every reading and card deck from every class used to sit in one run of
 * rows with nothing to say which subject any of it belonged to. Here each
 * subject is one row, showing this week's piece (or the latest, when this
 * week has none); the rest of that subject's material opens beneath it.
 */
function ReadingBySubject({ items }: { items: Material[] }) {
  const origin = useOrigin();
  const [open, setOpen] = useState<string | null>(null);

  const bySubject = new Map<string, Material[]>();
  for (const m of items) {
    const key = m.subjectName ?? m.className ?? "Other";
    bySubject.set(key, [...(bySubject.get(key) ?? []), m]);
  }
  // A title that is only the subject's own name ("Week 11 revision: English
  // Language") says nothing under that subject's heading; the kind does.
  const topicOf = (m: Material, subject: string) => {
    const t = splitWorkTitle(m.title);
    return t.topic.toLowerCase() === subject.toLowerCase() && t.kind
      ? t.kind.charAt(0).toUpperCase() + t.kind.slice(1)
      : t.topic;
  };
  // Newest week first inside a subject, by the week in the title.
  const weekOf = (m: Material) => splitWorkTitle(m.title).week ?? 0;
  const subjects = [...bySubject.entries()]
    .map(([name, list]) => {
      const sorted = [...list].sort((a, b) => weekOf(b) - weekOf(a));
      const now = sorted.find((m) => isCurrentWeek(m.lessonDate));
      return { name, sorted, featured: now ?? sorted[0], isNow: !!now };
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div>
      <h2 className="mb-3 text-sm font-medium">To read and practise</h2>
      <div className="divide-y rounded-lg border">
        {subjects.map((s) => {
          const f = splitWorkTitle(s.featured.title);
          return (
            <Collapsible
              key={s.name}
              open={open === s.name}
              onOpenChange={(o) => setOpen(o ? s.name : null)}
            >
              <CollapsibleTrigger className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left hover:bg-accent/50">
                <div className="min-w-0">
                  <p className="text-sm font-medium">{s.name}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {s.isNow ? "This week" : "Latest"}
                    {f.week ? ` · Week ${f.week}` : ""} ·{" "}
                    {topicOf(s.featured, s.name)}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-3 text-xs text-muted-foreground">
                  {s.sorted.length} {s.sorted.length === 1 ? "item" : "items"}
                  <IconChevronDown
                    size={16}
                    className={cn(
                      "transition-transform",
                      open === s.name && "rotate-180",
                    )}
                  />
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="divide-y border-t bg-muted/20">
                  {/* Everything for this subject, week by week, with marks. */}
                  {s.featured.classId ? (
                    <Link
                      to={`/student/revise/${s.featured.classId}`}
                      className="flex items-center justify-between gap-3 py-2.5 pl-8 pr-4 text-sm font-medium text-primary hover:bg-accent/50"
                    >
                      Revise {s.name}
                      <IconChevronRight size={14} />
                    </Link>
                  ) : null}
                  {s.sorted.map((m) => {
                    const t = splitWorkTitle(m.title);
                    return (
                      <Link
                        key={m.assessmentId}
                        to={`/student/assessments/${m.assessmentId}`}
                        state={origin("Dashboard")}
                        className="flex items-center justify-between gap-4 py-2.5 pl-8 pr-4 hover:bg-accent/50"
                      >
                        <div className="min-w-0">
                          <p className="truncate text-sm">
                            {topicOf(m, s.name)}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {t.week ? `Week ${t.week}` : null}
                          </p>
                        </div>
                        <span className="shrink-0 text-xs text-muted-foreground">
                          {m.format ?? t.kind ?? "Nothing to hand in"}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </CollapsibleContent>
            </Collapsible>
          );
        })}
      </div>
    </div>
  );
}
