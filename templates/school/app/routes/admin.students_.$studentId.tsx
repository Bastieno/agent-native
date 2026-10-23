import { useQuery } from "@tanstack/react-query";
import { agentNativePath } from "@agent-native/core/client";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  IconAlertTriangle,
  IconCircleCheck,
  IconChevronDown,
  IconMessageCircle,
} from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { BackLink } from "@/components/layout/BackLink";
import { ListState } from "@/components/ListState";
import { useNavigationState } from "@/hooks/use-navigation-state";
import { cn } from "@/lib/utils";

type Finding = {
  kind: string;
  subject: string | null;
  text: string;
  /** How the figures in it were counted. */
  basis: string;
  evidence: string[];
};

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
export default function AdminStudent() {
  const { studentId } = useParams<{ studentId: string }>();
  const { sync } = useNavigationState();

  useEffect(() => {
    sync({ role: "admin", view: "students", studentId });
  }, [sync, studentId]);

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
        <BackLink to="/admin/students">Students</BackLink>
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
        <BackLink to="/admin/students">Students</BackLink>
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-xl font-semibold">
            {learner.name ?? learner.email}
          </h1>
          <Badge
            variant={learner.status === "active" ? "default" : "secondary"}
          >
            {learner.status}
          </Badge>
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
      {findings.next.length > 0 ? (
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

function FindingList({
  title,
  tone,
  items,
}: {
  title: string;
  tone: "concern" | "good";
  items: Finding[];
}) {
  const Icon = tone === "concern" ? IconAlertTriangle : IconCircleCheck;
  return (
    <section className="space-y-2">
      <h2 className="text-sm font-medium">{title}</h2>
      <ul className="divide-y rounded-lg border">
        {items.map((f, i) => (
          <FindingRow
            key={`${f.kind}-${i}`}
            finding={f}
            Icon={Icon}
            tone={tone}
          />
        ))}
      </ul>
    </section>
  );
}

function FindingRow({
  finding,
  Icon,
  tone,
}: {
  finding: Finding;
  Icon: typeof IconAlertTriangle;
  tone: "concern" | "good";
}) {
  const [open, setOpen] = useState(false);
  // Every finding opens to how it was counted and the papers behind it, so
  // none has to be taken on trust.
  const more = !!finding.basis || finding.evidence.length > 0;
  return (
    <li className="px-4 py-3">
      <Collapsible open={open} onOpenChange={setOpen}>
        <div className="flex items-start gap-3">
          <Icon
            size={16}
            className={cn(
              "mt-0.5 shrink-0",
              tone === "concern" ? "text-destructive" : "text-green-500",
            )}
          />
          <p className="min-w-0 flex-1 text-sm">{finding.text}</p>
          {more ? (
            <CollapsibleTrigger className="flex shrink-0 items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
              Details
              <IconChevronDown
                size={14}
                className={cn("transition-transform", open && "rotate-180")}
              />
            </CollapsibleTrigger>
          ) : null}
        </div>
        {more ? (
          <CollapsibleContent>
            <div className="mt-2 space-y-2 pl-7 text-xs text-muted-foreground">
              <p>
                <span className="font-medium text-foreground">
                  How it is counted:{" "}
                </span>
                {finding.basis}
              </p>
              {finding.evidence.length > 0 ? (
                <ul className="space-y-1">
                  {finding.evidence.map((e, i) => (
                    <li key={`${e}-${i}`}>{e}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          </CollapsibleContent>
        ) : null}
      </Collapsible>
    </li>
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
