import { useQuery } from "@tanstack/react-query";
import { agentNativePath, sendToAgentChat } from "@agent-native/core/client";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import {
  IconChevronDown,
  IconFileText,
  IconMessageCircle,
  IconPlus,
} from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { BackLink } from "@/components/layout/BackLink";
import { ListState } from "@/components/ListState";
import { useNavigationState } from "@/hooks/use-navigation-state";
import { cn } from "@/lib/utils";
import { useBackTarget } from "@/lib/origin";
import { FindingList, type Finding } from "@/components/Findings";

type Piece = {
  assessmentId: string;
  title: string;
  state: "marked" | "waiting" | "open" | "missed";
  score: number | null;
  maxScore: number | null;
  percentage: number | null;
  grade: string | null;
};

type Subject = {
  classId: string;
  subject: string;
  teacher: string | null;
  percentage: number | null;
  grade: string | null;
  belowPassMark: boolean;
  marked: number;
  missed: number;
  pieces: Piece[];
  classAverage: number | null;
  classLearners: number;
};

type Profile = {
  learner: {
    id: string;
    name: string | null;
    email: string | null;
    admissionNumber: string | null;
    yearGroup: string | null;
    arm: string | null;
    status: string;
    customFields: Array<{ label: string; value: unknown }>;
  };
  summary: {
    percentage: number | null;
    grade: string | null;
    passMark: number;
    handedIn: number;
    set: number;
    missed: number;
  } | null;
  subjects: Subject[];
  findings: { strengths: Finding[]; concerns: Finding[]; next: string[] };
  focus: Array<{
    classId: string;
    subject: string;
    percentage: number | null;
    missed: number;
    reason: string;
  }>;
  resources: Array<{
    id: string;
    title: string;
    format: string | null;
    status: string;
    classId: string;
    subject: string | null;
  }>;
  position: { place: number; outOf: number } | null;
  counting: { missedWorkCountsAsZero: boolean };
  scopedToMyClasses: boolean;
};

const ordinal = (n: number) => {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return `${n}${s[(v - 20) % 10] || s[v] || s[0]}`;
};

/**
 * One learner, for the person who has to act on it.
 *
 * It leads with what is going well and what needs attention, in words, each
 * with its evidence one tap away, then the subjects with the class beside
 * them. Counted exactly as the learner's own Grades page and the report card
 * count, so nobody reads a different average to the one that goes home.
 */
export function LearnerProfile({
  studentId,
  role,
  backTo,
}: {
  studentId: string | undefined;
  role: "admin" | "teacher";
  backTo: string;
}) {
  const back = useBackTarget({ to: backTo, label: "Students" });
  const { sync } = useNavigationState();

  useEffect(() => {
    sync({ role, view: "students", studentId });
  }, [sync, role, studentId]);

  const { data, isLoading, error } = useQuery<Profile>({
    queryKey: ["student-profile", studentId],
    queryFn: async () => {
      const res = await fetch(
        agentNativePath(
          `/_agent-native/actions/get-student-profile?studentId=${studentId}`,
        ),
      );
      if (!res.ok) throw new Error(String(res.status));
      return res.json();
    },
    enabled: !!studentId,
  });

  // Issued report cards, newest first. The page offers the latest one.
  const { data: issued } = useQuery<{ reportCards: { id: string }[] }>({
    queryKey: ["student-report-cards", studentId],
    queryFn: async () => {
      const res = await fetch(
        agentNativePath(
          `/_agent-native/actions/get-report-card?studentId=${studentId}`,
        ),
      );
      if (!res.ok) throw new Error(String(res.status));
      return res.json();
    },
    enabled: !!studentId,
  });
  const latestReportCard = issued?.reportCards?.[0];

  if (isLoading) {
    return (
      <div className="p-6">
        <ListState loading rows={4} title="Learner" />
      </div>
    );
  }
  if (error || !data) {
    return (
      <div className="space-y-3 p-6">
        <BackLink to={back.to}>{back.label}</BackLink>
        <ListState
          title="This learner isn't available"
          description="They may have been removed, or you may not have access."
        />
      </div>
    );
  }

  const { learner, summary, subjects, findings, position, counting } = data;
  const weak =
    summary?.percentage != null && summary.percentage < summary.passMark;

  return (
    <div className="h-full space-y-6 overflow-auto p-4 pb-24 sm:p-6 sm:pb-24">
      <div>
        <BackLink to={back.to}>{back.label}</BackLink>
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-xl font-semibold">
            {learner.name ?? learner.email}
          </h1>
          <Badge
            variant={learner.status === "active" ? "default" : "secondary"}
          >
            {learner.status}
          </Badge>
          {latestReportCard ? (
            <Link
              to={`/print/report/${latestReportCard.id}`}
              className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
            >
              <IconFileText size={16} />
              Report card
            </Link>
          ) : null}
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          {[
            learner.yearGroup,
            learner.arm,
            learner.admissionNumber ? `No. ${learner.admissionNumber}` : null,
            learner.email,
          ]
            .filter(Boolean)
            .join(" · ")}
        </p>
        {learner.customFields.length > 0 ? (
          <p className="mt-0.5 text-xs text-muted-foreground">
            {learner.customFields
              .map((f) => `${f.label}: ${String(f.value)}`)
              .join(" · ")}
          </p>
        ) : null}
      </div>

      {summary ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          <div className="rounded-lg border bg-card p-4">
            <p className="text-xs text-muted-foreground">Term average</p>
            <p
              className={cn(
                "mt-1 text-2xl font-semibold",
                weak && "text-destructive",
              )}
            >
              {summary.percentage != null ? `${summary.percentage}%` : "—"}
              {summary.grade ? (
                <span className="ml-1.5 text-base font-normal text-muted-foreground">
                  {summary.grade}
                </span>
              ) : null}
            </p>
            <p className="text-xs text-muted-foreground">
              Pass mark {summary.passMark}%
              {counting.missedWorkCountsAsZero
                ? " · missed work counts as zero"
                : ""}
            </p>
          </div>
          <div className="rounded-lg border bg-card p-4">
            <p className="text-xs text-muted-foreground">Handed in</p>
            <p className="mt-1 text-2xl font-semibold">
              {summary.handedIn}
              <span className="text-base font-normal text-muted-foreground">
                {" "}
                of {summary.set}
              </span>
            </p>
            <p className="text-xs text-muted-foreground">
              {summary.missed > 0
                ? `${summary.missed} missed`
                : "Nothing missed"}
            </p>
          </div>
          {position ? (
            <div className="col-span-2 rounded-lg border bg-card p-4 sm:col-span-1">
              <p className="text-xs text-muted-foreground">
                Position in {learner.yearGroup ?? "the year group"}
              </p>
              <p className="mt-1 text-2xl font-semibold">
                {ordinal(position.place)}
                <span className="text-base font-normal text-muted-foreground">
                  {" "}
                  of {position.outOf}
                </span>
              </p>
            </div>
          ) : null}
        </div>
      ) : null}

      {findings.concerns.length > 0 ? (
        <FindingList
          title="Needs attention"
          tone="concern"
          items={findings.concerns}
        />
      ) : null}
      {findings.strengths.length > 0 ? (
        <FindingList
          title="Going well"
          tone="good"
          items={findings.strengths}
        />
      ) : null}
      {role === "teacher" ? (
        <NextSteps
          learner={learner}
          focus={data.focus}
          resources={data.resources}
        />
      ) : findings.next.length > 0 ? (
        <section className="space-y-2">
          <h2 className="flex items-center gap-2 text-sm font-medium">
            <IconMessageCircle size={15} />
            Suggested next steps
          </h2>
          <ul className="space-y-1.5 rounded-lg border bg-card p-4 text-sm">
            {findings.next.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="space-y-2">
        <h2 className="text-sm font-medium">By subject</h2>
        <div className="divide-y rounded-lg border">
          {subjects.map((s) => (
            <SubjectRow key={s.classId} subject={s} />
          ))}
        </div>
        <p className="text-xs text-muted-foreground">
          Counted like the report card: published marks only
          {counting.missedWorkCountsAsZero
            ? ", with work not handed in counted as zero"
            : ", with work not handed in left out of the average but shown"}
          . The class figure is counted the same way.
        </p>
      </section>
    </div>
  );
}

/**
 * What a teacher can do about it, one subject at a time.
 *
 * Each row is something the figures give a reason for, and its button writes
 * the request into the assistant's composer rather than sending it, so the
 * teacher says what kind of help they want before anything is made. What is
 * made is for this learner alone; nobody else in the class is told.
 */
function NextSteps({
  learner,
  focus,
  resources,
}: {
  learner: Profile["learner"];
  focus: Profile["focus"];
  resources: Profile["resources"];
}) {
  if (focus.length === 0 && resources.length === 0) return null;
  const first = (learner.name ?? "this learner").split(" ")[0];
  return (
    <section className="space-y-2">
      <h2 className="flex items-center gap-2 text-sm font-medium">
        <IconMessageCircle size={15} />
        Suggested next steps
      </h2>
      <ul className="divide-y rounded-lg border bg-card text-sm">
        {focus.map((f) => (
          <li
            key={f.classId}
            className="flex items-center justify-between gap-3 px-4 py-3"
          >
            <div className="min-w-0">
              <p className="font-medium">{f.subject}</p>
              <p className="text-xs text-muted-foreground">{f.reason}</p>
            </div>
            <Button
              size="sm"
              variant="outline"
              className="shrink-0"
              onClick={() =>
                sendToAgentChat({
                  message: `Make a resource to help ${first} catch up in ${f.subject}, for ${first} alone.`,
                  submit: false,
                  openSidebar: true,
                })
              }
            >
              <IconPlus size={14} className="mr-1" />
              Resource
            </Button>
          </li>
        ))}
      </ul>
      {resources.length > 0 ? (
        <div className="space-y-1 pt-1">
          <p className="text-xs text-muted-foreground">Made for {first}</p>
          <ul className="divide-y rounded-lg border bg-card text-sm">
            {resources.map((r) => (
              <li
                key={r.id}
                className="flex items-center justify-between gap-3 px-4 py-2.5"
              >
                <span className="min-w-0 truncate">{r.title}</span>
                <span className="shrink-0 text-xs text-muted-foreground">
                  {[r.subject, r.status === "draft" ? "draft" : "shared"]
                    .filter(Boolean)
                    .join(" · ")}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  );
}

function SubjectRow({ subject }: { subject: Subject }) {
  const [open, setOpen] = useState(false);
  const gap =
    subject.percentage != null && subject.classAverage != null
      ? subject.percentage - subject.classAverage
      : null;
  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-muted/30">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium">{subject.subject}</p>
          <p className="text-xs text-muted-foreground">
            {subject.teacher ?? "No teacher"}
            {subject.missed > 0 ? ` · ${subject.missed} not handed in` : ""}
          </p>
        </div>
        <div className="text-right">
          <p
            className={cn(
              "text-sm font-medium tabular-nums",
              subject.belowPassMark && "text-destructive",
            )}
          >
            {subject.percentage != null ? `${subject.percentage}%` : "—"}
            {subject.grade ? (
              <span className="ml-1 font-normal text-muted-foreground">
                {subject.grade}
              </span>
            ) : null}
          </p>
          <p className="text-xs tabular-nums text-muted-foreground">
            {subject.classAverage != null
              ? `class ${subject.classAverage}%${gap != null && Math.abs(gap) >= 1 ? ` (${gap > 0 ? "+" : ""}${gap})` : ""}`
              : "no class figure"}
          </p>
        </div>
        <IconChevronDown
          size={16}
          className={cn(
            "shrink-0 text-muted-foreground transition-transform",
            open && "rotate-180",
          )}
        />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <ul className="divide-y border-t bg-muted/20">
          {subject.pieces.map((p) => (
            <li
              key={p.assessmentId}
              className="flex items-center justify-between gap-3 py-2 pl-8 pr-4 text-xs"
            >
              <span className="min-w-0 truncate">{p.title}</span>
              <span
                className={cn(
                  "shrink-0 tabular-nums text-muted-foreground",
                  p.state === "missed" && "font-medium text-destructive",
                )}
              >
                {p.state === "marked"
                  ? `${p.score}/${p.maxScore}${p.grade ? ` · ${p.grade}` : ""}`
                  : p.state === "missed"
                    ? "Not handed in"
                    : p.state === "waiting"
                      ? "Waiting for marks"
                      : "Open"}
              </span>
            </li>
          ))}
        </ul>
      </CollapsibleContent>
    </Collapsible>
  );
}
