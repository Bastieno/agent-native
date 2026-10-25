import { useQuery } from "@tanstack/react-query";
import { agentNativePath } from "@agent-native/core/client";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { IconChevronRight } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BackLink } from "@/components/layout/BackLink";
import { ListState } from "@/components/ListState";
import { FindingList, type Finding } from "@/components/Findings";
import { useNavigationState } from "@/hooks/use-navigation-state";
import { cn } from "@/lib/utils";

type Profile = {
  class: {
    id: string;
    name: string;
    subject: string;
    yearGroup: string | null;
    arm: string | null;
    room: string | null;
    status: string;
  };
  teachers: Array<{ userId: string; name: string | null; role: string }>;
  passMark: number;
  summary: {
    learners: number;
    average: number | null;
    othersAverage: number | null;
    othersCount: number;
    papersSet: number;
    waitingForMarks: number;
    unpublishedMarks: number;
    notes: { expected: number; written: number; ready: number } | null;
  };
  learners: Array<{
    studentId: string;
    name: string;
    percentage: number | null;
    nothingHandedIn: boolean;
  }>;
  papers: Array<{
    id: string;
    title: string;
    marked: number;
    average: number | null;
    handedIn: number;
    enrolled: number;
  }>;
  findings: { strengths: Finding[]; concerns: Finding[]; next: string[] };
  counting: { missedWorkCountsAsZero: boolean };
};

const SHOWN = 8;

/**
 * One class in depth, for the admin looking into it.
 *
 * Who teaches it, how it is doing beside the school's other classes in the
 * same subject and year group, then the learners (weakest first) and the
 * papers behind the average. Findings lead, each opening to its evidence.
 */
export default function AdminClass() {
  const { classId } = useParams<{ classId: string }>();
  const { sync } = useNavigationState();

  useEffect(() => {
    sync({ role: "admin", view: "classes", classId });
  }, [sync, classId]);

  const { data, isLoading, error } = useQuery<Profile>({
    queryKey: ["class-profile", classId],
    queryFn: async () => {
      const res = await fetch(
        agentNativePath(
          `/_agent-native/actions/get-class-profile?classId=${classId}`,
        ),
      );
      if (!res.ok) throw new Error(String(res.status));
      return res.json();
    },
    enabled: !!classId,
  });

  if (isLoading) {
    return (
      <div className="p-6">
        <ListState loading rows={4} title="Class" />
      </div>
    );
  }
  if (error || !data) {
    return (
      <div className="space-y-3 p-6">
        <BackLink to="/admin/classes">Classes</BackLink>
        <ListState
          title="This class isn't available"
          description="It may have been removed."
        />
      </div>
    );
  }

  const { class: cls, teachers, summary, learners, papers, findings } = data;
  const below = summary.average != null && summary.average < data.passMark;
  const gap =
    summary.average != null && summary.othersAverage != null
      ? summary.average - summary.othersAverage
      : null;

  return (
    <div className="h-full space-y-6 overflow-auto p-4 pb-24 sm:p-6 sm:pb-24">
      <div>
        <BackLink to="/admin/classes">Classes</BackLink>
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-xl font-semibold">{cls.name}</h1>
          <Badge variant={cls.status === "active" ? "default" : "secondary"}>
            {cls.status}
          </Badge>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          {[cls.subject, cls.yearGroup, cls.arm, cls.room]
            .filter(Boolean)
            .join(" · ")}
        </p>
        <p className="mt-0.5 text-sm text-muted-foreground">
          {teachers.length === 0 ? (
            "No teacher yet"
          ) : (
            <>
              {teachers.map((t, i) => (
                <span key={t.userId}>
                  {i > 0 ? ", " : ""}
                  <Link
                    to={`/admin/staff/${t.userId}`}
                    className="hover:text-foreground hover:underline"
                  >
                    {t.name}
                  </Link>
                  {t.role !== "leads" ? ` (${t.role})` : ""}
                </span>
              ))}
            </>
          )}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-lg border bg-card p-4">
          <p className="text-xs text-muted-foreground">Class average</p>
          <p
            className={cn(
              "mt-1 text-2xl font-semibold",
              below && "text-destructive",
            )}
          >
            {summary.average != null ? `${summary.average}%` : "—"}
          </p>
          <p className="text-xs text-muted-foreground">
            {summary.othersAverage != null
              ? `others ${summary.othersAverage}%${gap != null && Math.abs(gap) >= 1 ? ` (${gap > 0 ? "+" : ""}${Math.round(gap)})` : ""}`
              : `pass mark ${data.passMark}%`}
          </p>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <p className="text-xs text-muted-foreground">Learners</p>
          <p className="mt-1 text-2xl font-semibold">{summary.learners}</p>
          <p className="text-xs text-muted-foreground">enrolled</p>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <p className="text-xs text-muted-foreground">Papers set</p>
          <p className="mt-1 text-2xl font-semibold">{summary.papersSet}</p>
          <p className="text-xs text-muted-foreground">that count to marks</p>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <p className="text-xs text-muted-foreground">Waiting to be marked</p>
          <p
            className={cn(
              "mt-1 text-2xl font-semibold",
              summary.waitingForMarks > 0 && "text-destructive",
            )}
          >
            {summary.waitingForMarks}
          </p>
          <p className="text-xs text-muted-foreground">
            {summary.notes
              ? `${summary.notes.written}/${summary.notes.expected} notes written`
              : "handed in, no mark yet"}
          </p>
        </div>
      </div>

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
          <h2 className="text-sm font-medium">Suggested next steps</h2>
          <ul className="space-y-1.5 rounded-lg border bg-card p-4 text-sm">
            {findings.next.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        </section>
      ) : null}

      <Section
        title="Learners"
        note="Lowest figures first."
        total={learners.length}
      >
        {(shown) =>
          learners.slice(0, shown).map((l) => (
            <Link
              key={l.studentId}
              to={`/admin/students/${l.studentId}`}
              className="group flex items-center justify-between gap-3 px-4 py-3 text-sm hover:bg-muted/30"
            >
              <span className="min-w-0 truncate group-hover:text-primary">
                {l.name}
              </span>
              <span
                className={cn(
                  "flex shrink-0 items-center gap-1 tabular-nums",
                  l.percentage != null && l.percentage < data.passMark
                    ? "font-medium text-destructive"
                    : "text-muted-foreground",
                )}
              >
                {l.percentage != null
                  ? `${l.percentage}%`
                  : l.nothingHandedIn
                    ? "Nothing handed in"
                    : "No marks yet"}
                <IconChevronRight size={14} />
              </span>
            </Link>
          ))
        }
      </Section>

      <Section
        title="Papers"
        note="Average of published marks."
        total={papers.length}
      >
        {(shown) =>
          papers.slice(0, shown).map((p) => (
            <div
              key={p.id}
              className="flex items-center justify-between gap-3 px-4 py-3 text-sm"
            >
              <div className="min-w-0">
                <p className="truncate">{p.title}</p>
                <p className="text-xs text-muted-foreground">
                  {p.handedIn} of {p.enrolled} handed in · {p.marked} marked
                </p>
              </div>
              <span
                className={cn(
                  "shrink-0 tabular-nums",
                  p.average != null && p.average < data.passMark
                    ? "font-medium text-destructive"
                    : "text-muted-foreground",
                )}
              >
                {p.average != null ? `${p.average}%` : "—"}
              </span>
            </div>
          ))
        }
      </Section>

      <p className="text-xs text-muted-foreground">
        Counted like the report card: published marks only
        {data.counting.missedWorkCountsAsZero
          ? ", with work not handed in counted as zero"
          : ", with work not handed in left out of the average"}
        . "Others" is the mean of the school's other classes in the same subject
        and year group with a different teacher.
      </p>
    </div>
  );
}

function Section({
  title,
  note,
  total,
  children,
}: {
  title: string;
  note: string;
  total: number;
  children: (shown: number) => React.ReactNode;
}) {
  const [all, setAll] = useState(false);
  if (total === 0) return null;
  return (
    <section className="space-y-2">
      <div className="flex items-baseline justify-between gap-3">
        <h2 className="text-sm font-medium">
          {title}{" "}
          <span className="font-normal text-muted-foreground">({total})</span>
        </h2>
        <p className="text-xs text-muted-foreground">{note}</p>
      </div>
      <div className="divide-y rounded-lg border">
        {children(all ? total : SHOWN)}
      </div>
      {total > SHOWN ? (
        <Button variant="ghost" size="sm" onClick={() => setAll((v) => !v)}>
          {all ? "Show fewer" : `Show all ${total}`}
        </Button>
      ) : null}
    </section>
  );
}
