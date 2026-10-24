import { useQuery } from "@tanstack/react-query";
import { NO_TEACHER_LABEL } from "@shared/class-teacher";
import { agentNativePath } from "@agent-native/core/client";
import { useNavigationState } from "@/hooks/use-navigation-state";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { isCurrentWeek } from "@shared/term-weeks";
import {
  IconBook,
  IconChevronRight,
  IconClipboard,
  IconChevronLeft,
  IconChevronDown,
  IconCircleCheck,
  IconRepeat,
} from "@tabler/icons-react";
import { submissionStatusWord } from "@/lib/submission-status";
import { useOrigin } from "@/lib/origin";

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

export default function StudentClassDetail() {
  const origin = useOrigin();
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

  // Work still owed comes first, soonest due at the top. What is handed in,
  // marked or closed has nothing left to do, so it waits behind one line
  // instead of pushing the open work down the page.
  const isDone = (w: any) =>
    ["submitted", "graded"].includes(w.submissionStatus) ||
    w.status === "closed";
  const byDue = (x: any, y: any) =>
    (x.dueDate ?? "9999").localeCompare(y.dueDate ?? "9999");
  const openWork = work.filter((w: any) => !isDone(w)).sort(byDue);
  const doneWork = work.filter(isDone).sort((x: any, y: any) => byDue(y, x));

  // A learner opens this page to find the current week, not week 1: from
  // this week on is shown; earlier weeks open from one line.
  const weekList: any[] = lessons ?? [];
  const today = new Date().toISOString().slice(0, 10);
  let firstShown = weekList.findIndex((l) => isCurrentWeek(l.lessonDate));
  if (firstShown < 0) {
    firstShown = weekList.findIndex(
      (l) => l.lessonDate && String(l.lessonDate).slice(0, 10) >= today,
    );
  }
  // Term over: the last few weeks are the ones still worth a glance.
  if (firstShown < 0) firstShown = Math.max(0, weekList.length - 3);
  const earlierWeeks = weekList.slice(0, firstShown);
  const shownWeeks = weekList.slice(firstShown);

  return (
    <div className="p-6 pb-24 space-y-6">
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

      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold">{cls.name}</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {cls.subjectName ?? "—"} ·{" "}
            {cls.teacherName ? `Teacher: ${cls.teacherName}` : NO_TEACHER_LABEL}
          </p>
        </div>
        {/* Every week and every mark for this subject on one page. */}
        <Link
          to={`/student/revise/${classId}`}
          className="inline-flex h-8 items-center gap-1.5 rounded-md border px-3 text-sm font-medium hover:bg-accent"
        >
          <IconRepeat size={14} />
          Revise
        </Link>
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
          {openWork.length > 0 ? (
            <div className="space-y-2">
              {openWork.map((a: any) => (
                <WorkRow key={a.id} a={a} from={cls.name} />
              ))}
            </div>
          ) : (
            <p className="flex items-center gap-2 rounded-lg border border-dashed p-3 text-sm text-muted-foreground">
              <IconCircleCheck size={16} />
              Nothing left to hand in.
            </p>
          )}
          {doneWork.length > 0 ? (
            <Fold label={`Done (${doneWork.length})`}>
              {doneWork.map((a: any) => (
                <WorkRow key={a.id} a={a} from={cls.name} />
              ))}
            </Fold>
          ) : null}
        </div>
      )}

      {weekList.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-sm font-medium flex items-center gap-2">
            <IconBook size={14} />
            Your weeks
          </h2>
          <div className="space-y-2">
            {shownWeeks.map((lesson: any) => (
              <WeekRow key={lesson.id} lesson={lesson} />
            ))}
          </div>
          {earlierWeeks.length > 0 ? (
            <Fold label={`Earlier weeks (${earlierWeeks.length})`}>
              {earlierWeeks.map((lesson: any) => (
                <WeekRow key={lesson.id} lesson={lesson} />
              ))}
            </Fold>
          ) : null}
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
                state={origin(cls.name)}
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

/** A line that opens to the rest, so finished things stay out of the way. */
function Fold({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <Collapsible open={open} onOpenChange={setOpen} className="space-y-2">
      <CollapsibleTrigger className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground">
        <IconChevronDown
          size={14}
          className={open ? "" : "-rotate-90 transition-transform"}
        />
        {label}
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-2">{children}</CollapsibleContent>
    </Collapsible>
  );
}

function WorkRow({ a, from }: { a: any; from: string }) {
  const origin = useOrigin();
  return (
    <Link
      to={`/student/assessments/${a.id}`}
      state={origin(from)}
      className="group flex items-center justify-between rounded-lg border p-3 hover:border-primary/50 transition-colors"
    >
      <div className="space-y-0.5">
        <p className="text-sm font-medium group-hover:text-primary transition-colors">
          {a.title}
        </p>
        <p className="text-xs text-muted-foreground">
          {/* The school's own word for the work — "class test" — never the
              app's internal type, and no "No due date" on something that
              never had one. */}
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
          {/* Closed and never handed in: "Not started" would read as
              something they can still do. */}
          {a.status === "closed" &&
          !["submitted", "graded"].includes(a.submissionStatus)
            ? "Closed"
            : submissionStatusWord(a.submissionStatus)}
        </Badge>
        <IconChevronRight
          size={14}
          className="text-muted-foreground group-hover:text-primary transition-colors"
        />
      </div>
    </Link>
  );
}

function WeekRow({ lesson }: { lesson: any }) {
  return (
    <Link
      to={`/student/lessons/${lesson.id}`}
      className="group flex items-center justify-between gap-3 rounded-lg border p-3 hover:border-primary/50 transition-colors"
    >
      <div className="min-w-0 space-y-1">
        {isCurrentWeek(lesson.lessonDate) ? (
          <Badge className="mb-1 whitespace-nowrap text-[11px]">
            This week
          </Badge>
        ) : null}
        <p className="text-sm font-medium transition-colors group-hover:text-primary">
          {lesson.title}
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
  );
}
