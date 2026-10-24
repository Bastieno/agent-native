import { useQuery } from "@tanstack/react-query";
import { agentNativePath } from "@agent-native/core/client";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import {
  IconChevronLeft,
  IconChevronRight,
  IconSearch,
} from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ListState } from "@/components/ListState";
import { useNavigationState } from "@/hooks/use-navigation-state";
import { submissionStatusWord } from "@/lib/submission-status";
import { isCurrentWeek } from "@shared/term-weeks";
import { cn } from "@/lib/utils";
import { useOrigin } from "@/lib/origin";

type Piece = {
  assessmentId: string;
  state: "marked" | "waiting" | "open" | "missed";
  score: number | null;
  maxScore: number | null;
  percentage: number | null;
  grade: string | null;
};

type TermGrades = {
  summary: { passMark: number };
  subjects: Array<{ classId: string; pieces: Piece[] }>;
} | null;

/**
 * One subject, week by week, for going back over it.
 *
 * Revising means finding the week, then the reading, then the paper you
 * got wrong. That used to be a tour of three screens; here it is one page:
 * every week of the term with what was set for it, the learner's mark beside
 * each piece of work, and the papers that went badly gathered at the top.
 */
export default function StudentRevise() {
  const origin = useOrigin();
  const { classId } = useParams<{ classId: string }>();
  const { sync } = useNavigationState();
  const [search, setSearch] = useState("");

  useEffect(() => {
    sync({ role: "student", view: "revise", classId });
  }, [sync, classId]);

  // Same keys as the class page and the grades page, so each is fetched once.
  const { data: detail, isLoading } = useQuery({
    queryKey: ["student-class", classId],
    queryFn: async () => {
      const res = await fetch(
        agentNativePath(
          `/_agent-native/actions/get-my-class?classId=${classId}`,
        ),
      );
      if (!res.ok) return null;
      return res.json();
    },
    enabled: !!classId,
  });
  const { data: grades } = useQuery<TermGrades>({
    queryKey: ["my-term-grades"],
    queryFn: async () => {
      const res = await fetch(
        agentNativePath("/_agent-native/actions/get-my-term-grades"),
      );
      if (!res.ok) return null;
      return res.json();
    },
  });

  if (isLoading) {
    return (
      <div className="p-6">
        <ListState loading rows={4} title="Revise" />
      </div>
    );
  }
  if (!detail) {
    return (
      <div className="space-y-3 p-6">
        <p className="text-sm font-medium">Class not available</p>
        <Link
          to="/student/classes"
          className="text-sm text-primary hover:underline"
        >
          Back to my classes
        </Link>
      </div>
    );
  }

  const { cls, lessons = [], assessments = [] } = detail;
  const passMark = grades?.summary?.passMark ?? 50;
  const pieces = new Map<string, Piece>(
    (grades?.subjects?.find((s) => s.classId === classId)?.pieces ?? []).map(
      (p) => [p.assessmentId, p],
    ),
  );

  const work = assessments.filter((a: any) => !a.isMaterial);
  const byWeek = new Map<string, any[]>();
  const loose: any[] = [];
  for (const a of work) {
    if (a.lessonNoteId) {
      byWeek.set(a.lessonNoteId, [...(byWeek.get(a.lessonNoteId) ?? []), a]);
    } else {
      loose.push(a);
    }
  }

  const weak = work
    .map((a: any) => ({ a, p: pieces.get(a.id) }))
    .filter(
      ({ p }: any) =>
        p?.state === "marked" &&
        p.percentage != null &&
        p.percentage < passMark,
    )
    .sort((x: any, y: any) => x.p.percentage - y.p.percentage)
    .slice(0, 5);

  const q = search.trim().toLowerCase();
  const matches = (...texts: Array<string | null | undefined>) =>
    !q || texts.some((t) => t?.toLowerCase().includes(q));
  const weeks = [...lessons].sort((a: any, b: any) =>
    String(a.lessonDate ?? "").localeCompare(String(b.lessonDate ?? "")),
  );
  const shownWeeks = weeks
    .map((l: any) => {
      const rows = byWeek.get(l.id) ?? [];
      const weekMatches = matches(l.title, l.summary);
      return {
        lesson: l,
        rows: weekMatches ? rows : rows.filter((a) => matches(a.title)),
        show: weekMatches || rows.some((a) => matches(a.title)),
      };
    })
    .filter((w) => w.show);
  const shownLoose = loose.filter((a) => matches(a.title));

  const markOf = (a: any) => {
    const p = pieces.get(a.id);
    if (p?.state === "marked" && p.score != null && p.maxScore != null) {
      return {
        text: `${p.score}/${p.maxScore}${p.grade ? ` · ${p.grade}` : ""}`,
        weak: p.percentage != null && p.percentage < passMark,
      };
    }
    if (p?.state === "missed") return { text: "Missed", weak: true };
    return { text: submissionStatusWord(a.submissionStatus), weak: false };
  };

  const WorkRow = ({ a, bare = false }: { a: any; bare?: boolean }) => {
    const m = markOf(a);
    return (
      <Link
        to={`/student/assessments/${a.id}`}
        state={origin(`Revise ${cls.subjectName}`)}
        className={cn(
          "group flex items-center justify-between gap-3 py-3 text-sm",
          // Inside a week or an exam card the row lines up with the title
          // above it; inside the "worth another look" box the box pads it.
          bare ? "px-0" : "px-4",
        )}
      >
        <span className="min-w-0 truncate group-hover:text-primary">
          {a.title}
        </span>
        <span
          className={cn(
            "flex shrink-0 items-center gap-1 tabular-nums",
            m.weak ? "font-medium text-destructive" : "text-muted-foreground",
          )}
        >
          {m.text}
          <IconChevronRight size={14} />
        </span>
      </Link>
    );
  };

  // pb-24 keeps the last row clear of the floating assistant button.
  return (
    <div className="space-y-6 p-4 pb-24 sm:p-6 sm:pb-24">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link
          to={`/student/classes/${classId}`}
          className="flex items-center gap-1 hover:text-foreground"
        >
          <IconChevronLeft size={14} />
          {cls.name}
        </Link>
      </div>

      <div>
        <h1 className="text-xl font-semibold">Revise {cls.subjectName}</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Every week of the term, with what was set and how you did.
        </p>
      </div>

      {weak.length > 0 && !q ? (
        <div className="rounded-lg border bg-card p-4">
          <h2 className="text-sm font-medium">Worth another look</h2>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Work marked below {passMark}%. Go over what you got wrong.
          </p>
          <div className="mt-2 divide-y">
            {weak.map(({ a }: any) => (
              <WorkRow key={a.id} a={a} bare />
            ))}
          </div>
        </div>
      ) : null}

      <div className="relative">
        <IconSearch
          size={15}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Find a topic or a piece of work"
          className="pl-9"
          aria-label="Find a topic or a piece of work"
        />
      </div>

      {shownWeeks.length === 0 && shownLoose.length === 0 ? (
        <ListState
          title={q ? "Nothing matches" : "Nothing to revise yet"}
          description={
            q
              ? "Try a different word."
              : "Your teacher will share this subject's weeks soon."
          }
        />
      ) : (
        <div className="space-y-4">
          {shownWeeks.map(({ lesson, rows }) => (
            <div key={lesson.id} className="rounded-lg border">
              <Link
                to={`/student/lessons/${lesson.id}`}
                className="group flex items-center justify-between gap-4 px-4 py-4"
              >
                <div className="min-w-0">
                  {/* On its own line: beside the title it squeezed a long one into
                      three lines on a phone. */}
                  {isCurrentWeek(lesson.lessonDate) ? (
                    <Badge className="mb-1.5 whitespace-nowrap text-[11px]">
                      This week
                    </Badge>
                  ) : null}
                  <p className="text-sm font-medium leading-6 group-hover:text-primary">
                    {lesson.title}
                  </p>
                  {lesson.summary ? (
                    <p className="mt-1.5 line-clamp-1 text-xs text-muted-foreground">
                      {lesson.summary}
                    </p>
                  ) : null}
                </div>
                <span className="flex shrink-0 items-center gap-1 text-xs text-muted-foreground">
                  Read
                  <IconChevronRight size={14} />
                </span>
              </Link>
              {rows.length > 0 ? (
                <div className="divide-y border-t">
                  {rows.map((a: any) => (
                    <WorkRow key={a.id} a={a} />
                  ))}
                </div>
              ) : null}
            </div>
          ))}

          {shownLoose.length > 0 ? (
            <div className="rounded-lg border">
              <p className="px-4 py-4 text-sm font-medium">
                Examinations and other work
              </p>
              <div className="divide-y border-t">
                {shownLoose.map((a: any) => (
                  <WorkRow key={a.id} a={a} />
                ))}
              </div>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
