import { useQuery } from "@tanstack/react-query";
import { NO_TEACHER_LABEL } from "@shared/class-teacher";
import { agentNativePath } from "@agent-native/core/client";
import { useNavigationState } from "@/hooks/use-navigation-state";
import { useEffect } from "react";
import { useParams, Link } from "react-router";
import { Badge } from "@/components/ui/badge";
import { isCurrentWeek } from "@shared/term-weeks";
import {
  IconBook,
  IconChevronRight,
  IconClipboard,
  IconChevronLeft,
} from "@tabler/icons-react";

/**
 * What each state is called to the person it is about.
 *
 * The raw values are `not_started`, `draft`, `submitted`, `graded` — database
 * words, and one of them reached a child's screen as "Not_started".
 */
/**
 * What a week holds, counted by shape — "Reading · 2 sets of cards".
 *
 * By shape rather than by the school's own format name, so a week can be
 * described without the page knowing that this school calls its card decks
 * "key terms".
 */
const SHAPE_WORDS: Record<string, [string, string]> = {
  prose: ["Reading", "readings"],
  cards: ["Cards", "sets of cards"],
  table: ["Reference table", "reference tables"],
  steps: ["Practical", "practicals"],
  questions: ["Practice", "sets of practice"],
  criteria: ["Checklist", "checklists"],
};

function describeShapes(shapes: string[]): string {
  const counted = new Map<string, number>();
  for (const shape of shapes) {
    counted.set(shape, (counted.get(shape) ?? 0) + 1);
  }
  return [...counted.entries()]
    .map(([shape, n]) => {
      const [one, many] = SHAPE_WORDS[shape] ?? SHAPE_WORDS.prose;
      return n === 1 ? one : `${n} ${many}`;
    })
    .join(" · ");
}

const STATUS_WORDS: Record<string, string> = {
  not_started: "Not started",
  draft: "Started",
  submitted: "Handed in",
  graded: "Marked",
};

export default function StudentClassDetail() {
  const { classId } = useParams<{ classId: string }>();
  const { sync } = useNavigationState();

  useEffect(() => {
    sync({ role: "student", view: "class", classId });
  }, [sync, classId]);

  const { data: classDetail } = useQuery({
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

  if (!classDetail) {
    return (
      <div className="p-6">
        <div className="rounded-lg border border-dashed p-10 text-center">
          <p className="text-sm text-muted-foreground">Loading class…</p>
        </div>
      </div>
    );
  }

  const { cls, lessons, assessments } = classDetail;
  const work = (assessments ?? []).filter((a: any) => !a.isMaterial);
  // Material belongs to its week now. Anything nobody attached to one would
  // otherwise disappear from this page, so it is listed on its own.
  const loose = (assessments ?? []).filter(
    (a: any) => a.isMaterial && !a.lessonNoteId,
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link
          to="/student/classes"
          className="hover:text-foreground flex items-center gap-1"
        >
          <IconChevronLeft size={14} />
          My Classes
        </Link>
        <IconChevronRight size={14} />
        <span className="text-foreground font-medium">{cls.name}</span>
      </div>

      <div>
        <h1 className="text-xl font-semibold">{cls.name}</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {cls.subjectName ?? "—"} ·{" "}
          {cls.teacherName ? `Teacher: ${cls.teacherName}` : NO_TEACHER_LABEL}
        </p>
      </div>

      {/* Work and material are both activities underneath, but a learner
          asking "what do I owe?" does not mean the page they were given to
          read. Two lists, so neither answer is buried in the other. */}
      {work.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-sm font-medium flex items-center gap-2">
            <IconClipboard size={14} />
            To hand in
          </h2>
          <div className="space-y-2">
            {work.map((a: any) => (
              <Link
                key={a.id}
                to={`/student/assessments/${a.id}`}
                className="group flex items-center justify-between rounded-lg border p-3 hover:border-primary/50 transition-colors"
              >
                <div className="space-y-0.5">
                  <p className="text-sm font-medium group-hover:text-primary transition-colors">
                    {a.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {/* The school's own word for the work — "class test" —
                        never the app's internal type, and no "No due date"
                        on something that never had one. */}
                    {[
                      a.format ?? a.assessmentType,
                      a.durationMinutes ? `${a.durationMinutes} minutes` : null,
                      a.dueDate ? `Due ${a.dueDate}` : null,
                    ]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={
                      a.submissionStatus === "graded"
                        ? "default"
                        : a.submissionStatus === "submitted"
                          ? "secondary"
                          : "outline"
                    }
                    className="text-xs capitalize"
                  >
                    {STATUS_WORDS[a.submissionStatus] ?? "Not started"}
                  </Badge>
                  <IconChevronRight
                    size={14}
                    className="text-muted-foreground group-hover:text-primary transition-colors"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {lessons && lessons.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-sm font-medium flex items-center gap-2">
            <IconBook size={14} />
            Your weeks
          </h2>
          <div className="space-y-2">
            {lessons.map((lesson: any) => (
              <Link
                key={lesson.id}
                to={`/student/lessons/${lesson.id}`}
                className="group flex items-center justify-between gap-3 rounded-lg border p-3 hover:border-primary/50 transition-colors"
              >
                <div className="min-w-0 space-y-1">
                  <p className="flex items-center gap-2 text-sm font-medium transition-colors group-hover:text-primary">
                    {lesson.title}
                    {isCurrentWeek(lesson.lessonDate) ? (
                      <Badge className="text-[11px]">This week</Badge>
                    ) : null}
                  </p>
                  {lesson.summary && (
                    <p className="line-clamp-2 text-xs text-muted-foreground">
                      {lesson.summary}
                    </p>
                  )}
                  {/* What is waiting inside, so a week is worth opening. */}
                  {lesson.shapes?.length ? (
                    <p className="text-xs text-muted-foreground">
                      {describeShapes(lesson.shapes)}
                    </p>
                  ) : null}
                </div>
                <IconChevronRight
                  size={16}
                  className="shrink-0 text-muted-foreground group-hover:text-primary transition-colors"
                />
              </Link>
            ))}
          </div>
        </div>
      )}

      {loose.length > 0 && (
        <div className="space-y-3">
          <h2 className="flex items-center gap-2 text-sm font-medium">
            <IconBook size={14} />
            Anything else
          </h2>
          <div className="space-y-2">
            {loose.map((a: any) => (
              <Link
                key={a.id}
                to={`/student/assessments/${a.id}`}
                className="group flex items-center justify-between rounded-lg border p-3 transition-colors hover:border-primary/50"
              >
                <p className="min-w-0 truncate text-sm font-medium transition-colors group-hover:text-primary">
                  {a.title}
                </p>
                <IconChevronRight
                  size={14}
                  className="shrink-0 text-muted-foreground transition-colors group-hover:text-primary"
                />
              </Link>
            ))}
          </div>
        </div>
      )}

      {work.length === 0 &&
        loose.length === 0 &&
        (!lessons || lessons.length === 0) && (
          <div className="rounded-lg border border-dashed p-10 text-center">
            <IconBook
              size={28}
              className="mx-auto text-muted-foreground mb-2"
            />
            <p className="text-sm font-medium">Nothing here yet</p>
            <p className="text-xs text-muted-foreground mt-1">
              Your teacher will add lessons and assessments soon.
            </p>
          </div>
        )}
    </div>
  );
}
