import { useQuery } from "@tanstack/react-query";
import { agentNativePath } from "@agent-native/core/client";
import { Link } from "react-router";
import { useEffect, useState } from "react";
import { IconChevronDown, IconTrophy } from "@tabler/icons-react";
import { useNavigationState } from "@/hooks/use-navigation-state";
import { useSchoolDates } from "@/hooks/use-school-dates";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

type Piece = {
  assessmentId: string;
  title: string;
  topic: string;
  week: number | null;
  kind: string | null;
  dueDate: string | null;
  state: "marked" | "waiting" | "open" | "missed";
  score: number | null;
  maxScore: number | null;
  percentage: number | null;
  grade: string | null;
  subject?: string;
};

type Subject = {
  classId: string;
  className: string;
  subject: string;
  teacher: string | null;
  percentage: number | null;
  grade: string | null;
  belowPassMark: boolean;
  marked: number;
  missed: number;
  pieces: Piece[];
};

type TermGrades = {
  summary: {
    percentage: number | null;
    grade: string | null;
    passMark: number;
    handedIn: number;
    set: number;
    missed: number;
    stillOpen: number;
    missedCountsAsZero: boolean;
    earlier: number | null;
    later: number | null;
    dueNext: {
      assessmentId: string;
      title: string;
      subject: string;
      dueDate: string | null;
    } | null;
  } | null;
  recent: Piece[];
  subjects: Subject[];
  message?: string;
};

/**
 * My Grades: how the term is going, what was marked last, and each subject
 * with its work. It used to be one long list of every mark in every subject,
 * newest week last, with nothing to say how the learner was doing overall;
 * the overall picture lived on a separate Progress page. Both are here now,
 * with each subject's work tucked inside it until the learner opens it.
 */
export default function StudentGrades() {
  const { sync } = useNavigationState();
  const [open, setOpen] = useState<string | null>(null);

  useEffect(() => {
    sync({
      role: "student",
      view: "grades",
      ...(open ? { classId: open } : {}),
    });
  }, [sync, open]);

  const { data, isLoading } = useQuery<TermGrades | null>({
    queryKey: ["my-term-grades"],
    queryFn: async () => {
      const res = await fetch(
        agentNativePath("/_agent-native/actions/get-my-term-grades"),
      );
      if (!res.ok) return null;
      return res.json();
    },
  });

  const summary = data?.summary ?? null;
  const subjects = data?.subjects ?? [];
  const anyMarked = subjects.some((s) => s.marked > 0);

  return (
    <div className="space-y-8 p-6">
      <div>
        <h1 className="text-xl font-semibold">My Grades</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          How your term is going, subject by subject.
        </p>
      </div>

      {isLoading ? null : !summary || !anyMarked ? (
        <div className="rounded-lg border border-dashed p-10 text-center">
          <IconTrophy
            size={28}
            className="mx-auto mb-2 text-muted-foreground"
          />
          <p className="text-sm font-medium">No marks yet</p>
          <p className="mx-auto mt-1 max-w-xs text-xs text-muted-foreground">
            {data?.message ??
              "Your marks appear here once your teachers have marked work you handed in."}
          </p>
        </div>
      ) : (
        <>
          <TermSummary summary={summary} />
          <Recent pieces={data?.recent ?? []} />
          <section className="space-y-3">
            <h2 className="text-sm font-medium">Subjects</h2>
            <div className="divide-y rounded-lg border">
              {subjects.map((s) => (
                <SubjectRow
                  key={s.classId}
                  subject={s}
                  open={open === s.classId}
                  onOpenChange={(o) => setOpen(o ? s.classId : null)}
                  passMark={summary.passMark}
                />
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}

function TermSummary({
  summary,
}: {
  summary: NonNullable<TermGrades["summary"]>;
}) {
  const { formatDate } = useSchoolDates();
  const direction =
    summary.earlier !== null && summary.later !== null
      ? summary.later > summary.earlier
        ? `Up from ${summary.earlier}% earlier in the term`
        : summary.later < summary.earlier
          ? `Down from ${summary.earlier}% earlier in the term`
          : "Steady through the term"
      : null;
  return (
    <section className="grid gap-4 sm:grid-cols-3">
      <div className="rounded-lg border bg-card p-4">
        <p className="text-xs text-muted-foreground">Term average</p>
        <p className="mt-1 text-2xl font-semibold">
          {summary.percentage ?? "—"}%
          {summary.grade ? (
            <span className="ml-2 text-base font-medium text-muted-foreground">
              {summary.grade}
            </span>
          ) : null}
        </p>
        {direction ? (
          <p className="mt-1 text-xs text-muted-foreground">{direction}</p>
        ) : null}
      </div>
      <div className="rounded-lg border bg-card p-4">
        <p className="text-xs text-muted-foreground">Handed in</p>
        <p className="mt-1 text-2xl font-semibold">
          {summary.handedIn} of {summary.set}
        </p>
        {summary.missed > 0 ? (
          <p className="mt-1 text-xs text-muted-foreground">
            {summary.missed} not handed in
            {summary.missedCountsAsZero ? ", each counted as 0" : ""}
          </p>
        ) : null}
      </div>
      <div className="rounded-lg border bg-card p-4">
        <p className="text-xs text-muted-foreground">Due next</p>
        {summary.dueNext ? (
          <Link
            to={`/student/assessments/${summary.dueNext.assessmentId}`}
            className="mt-1 block hover:underline"
          >
            <p className="truncate text-sm font-medium">
              {summary.dueNext.subject}: {summary.dueNext.title}
            </p>
            {summary.dueNext.dueDate ? (
              <p className="text-xs text-muted-foreground">
                {formatDate(summary.dueNext.dueDate, {
                  weekday: "short",
                  day: "numeric",
                  month: "short",
                })}
              </p>
            ) : null}
          </Link>
        ) : (
          <p className="mt-1 text-sm text-muted-foreground">Nothing due</p>
        )}
      </div>
    </section>
  );
}

function Recent({ pieces }: { pieces: Piece[] }) {
  if (!pieces.length) return null;
  return (
    <section className="space-y-3">
      <h2 className="text-sm font-medium">Recently marked</h2>
      <div className="divide-y rounded-lg border">
        {pieces.map((p) => (
          <Link
            key={p.assessmentId}
            to={`/student/assessments/${p.assessmentId}`}
            className="flex items-center justify-between gap-4 px-4 py-3 hover:bg-muted/50"
          >
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">{p.topic}</p>
              <p className="text-xs text-muted-foreground">
                {[p.subject, p.week ? `Week ${p.week}` : null, p.kind]
                  .filter(Boolean)
                  .join(" · ")}
              </p>
            </div>
            <Mark piece={p} />
          </Link>
        ))}
      </div>
    </section>
  );
}

function SubjectRow({
  subject,
  open,
  onOpenChange,
  passMark,
}: {
  subject: Subject;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  passMark: number;
}) {
  return (
    <Collapsible open={open} onOpenChange={onOpenChange}>
      <CollapsibleTrigger className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left hover:bg-muted/50">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium">{subject.subject}</p>
          <p className="truncate text-xs text-muted-foreground">
            {[
              subject.teacher,
              `${subject.marked} marked`,
              subject.missed ? `${subject.missed} not handed in` : null,
            ]
              .filter(Boolean)
              .join(" · ")}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <div className="text-right">
            <p
              className={cn(
                "text-sm font-semibold tabular-nums",
                subject.belowPassMark && "text-destructive",
              )}
            >
              {subject.percentage === null ? "—" : `${subject.percentage}%`}
              {subject.grade ? (
                <span className="ml-1.5 font-normal text-muted-foreground">
                  {subject.grade}
                </span>
              ) : null}
            </p>
            {subject.belowPassMark ? (
              <p className="text-xs text-muted-foreground">
                Below the pass mark of {passMark}%
              </p>
            ) : null}
          </div>
          <IconChevronDown
            size={16}
            className={cn(
              "text-muted-foreground transition-transform",
              open && "rotate-180",
            )}
          />
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="divide-y border-t bg-muted/20">
          {subject.pieces.map((p) => (
            <Link
              key={p.assessmentId}
              to={`/student/assessments/${p.assessmentId}`}
              className="flex items-center justify-between gap-4 py-2.5 pl-8 pr-4 hover:bg-muted/50"
            >
              <div className="min-w-0">
                <p className="truncate text-sm">{p.topic}</p>
                <p className="text-xs text-muted-foreground">
                  {[p.week ? `Week ${p.week}` : null, p.kind]
                    .filter(Boolean)
                    .join(" · ")}
                </p>
              </div>
              <Mark piece={p} />
            </Link>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

/** The mark on a piece of work, or where it stands when there is none. */
function Mark({ piece }: { piece: Piece }) {
  if (piece.state === "marked") {
    return (
      <p className="shrink-0 text-right text-sm tabular-nums">
        {piece.score}/{piece.maxScore}
        {piece.grade ? (
          <span className="ml-1.5 text-muted-foreground">{piece.grade}</span>
        ) : null}
      </p>
    );
  }
  const words = {
    waiting: "Handed in, not marked yet",
    open: "Still open",
    missed: "Not handed in",
  }[piece.state];
  return (
    <p className="shrink-0 text-right text-xs text-muted-foreground">{words}</p>
  );
}
