import { useQuery } from "@tanstack/react-query";
import { agentNativePath } from "@agent-native/core/client";
import { useNavigationState } from "@/hooks/use-navigation-state";
import { useEffect } from "react";
import { Link, useSearchParams } from "react-router";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BackLink } from "@/components/layout/BackLink";
import { IconCheck, IconNotebook, IconPencil } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { isCurrentWeek } from "@shared/term-weeks";
import { useSchoolDates } from "@/hooks/use-school-dates";

type ClassRow = {
  classId: string;
  className: string;
  subjectName: string | null;
  gradeLevelName: string | null;
  teacher: string;
  teacherUserId: string | null;
  units: number;
  unitsWithoutPacing: number;
  expectedNotes: number;
  notes: number;
  drafts: number;
  finalized: number;
  missing: number;
  nextLesson: { date: string; title: string; status: string } | null;
};

type Coverage = {
  term: { id: string; name: string } | null;
  classes: ClassRow[];
  totals: {
    classes: number;
    withNothing: number;
    withGaps: number;
    ready: number;
    noCurriculum: number;
    withoutTeacher: number;
  } | null;
  message: string;
};

const ALL = "all";

/**
 * Whether the school's lessons are prepared.
 *
 * An admin's question is not "show me every lesson note" — it is "who has not
 * written theirs?". So the page leads with the classes that are behind and
 * says how far, and reading an actual note is one click further in for the
 * times that matters.
 *
 * Ready is measured against the curriculum: the weeks this term's units cover
 * are the notes a class should have. A class with no curriculum is not behind,
 * it is not started, and the two say different things here.
 */
export default function AdminLessons() {
  const { sync } = useNavigationState();
  const [searchParams, setSearchParams] = useSearchParams();
  const year = searchParams.get("year") ?? ALL;
  const classId = searchParams.get("classId");

  const { data } = useQuery<Coverage | null>({
    queryKey: ["lesson-note-coverage"],
    queryFn: async () => {
      const res = await fetch(
        agentNativePath("/_agent-native/actions/get-lesson-note-coverage"),
      );
      if (!res.ok) return null;
      return res.json();
    },
    placeholderData: (previous) => previous,
  });

  useEffect(() => {
    sync({ role: "admin", view: "lessons", ...(classId ? { classId } : {}) });
  }, [sync, classId]);

  const rows = data?.classes ?? [];
  const yearGroups = [
    ...new Set(rows.map((r) => r.gradeLevelName).filter(Boolean)),
  ] as string[];
  const shown =
    year === ALL ? rows : rows.filter((r) => r.gradeLevelName === year);

  if (classId) return <ClassNotes classId={classId} rows={rows} />;

  return (
    <div className="h-full space-y-6 overflow-auto p-6 pb-24">
      <div>
        <h1 className="text-xl font-semibold">Lesson notes</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {data?.message ?? "How ready each class's lessons are."}
        </p>
      </div>

      {yearGroups.length > 1 ? (
        <Tabs
          value={year}
          onValueChange={(value) =>
            setSearchParams(value === ALL ? {} : { year: value }, {
              replace: true,
            })
          }
        >
          <TabsList className="h-auto max-w-full flex-wrap justify-start">
            <TabsTrigger value={ALL}>All</TabsTrigger>
            {yearGroups.map((y) => (
              <TabsTrigger key={y} value={y}>
                {y}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      ) : null}

      {data && shown.length === 0 ? (
        <div className="rounded-lg border border-dashed p-10 text-center">
          <IconNotebook
            size={32}
            className="mx-auto mb-3 text-muted-foreground"
          />
          <p className="text-sm font-medium">Nothing to show</p>
          <p className="mx-auto mt-1 max-w-xs text-xs text-muted-foreground">
            No classes are running for this term yet.
          </p>
        </div>
      ) : (
        <div className="divide-y rounded-lg border">
          {shown.map((row) => (
            <Link
              key={row.classId}
              to={`/admin/lessons?classId=${row.classId}`}
              className="flex items-center gap-4 p-4 transition-colors hover:bg-muted/50"
            >
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{row.className}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {[row.subjectName, row.gradeLevelName, row.teacher]
                    .filter(Boolean)
                    .join(" · ")}
                </p>
              </div>
              <Readiness row={row} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

/** Where a class stands, in the fewest words that are still true. */
function Readiness({ row }: { row: ClassRow }) {
  if (row.expectedNotes === 0) {
    return (
      <Badge variant="outline" className="shrink-0 text-[11px]">
        No curriculum yet
      </Badge>
    );
  }
  if (row.notes === 0) {
    return (
      <Badge variant="destructive" className="shrink-0 text-[11px]">
        Nothing written
      </Badge>
    );
  }
  const done = row.missing === 0 && row.drafts === 0;
  return (
    <div className="flex shrink-0 items-center gap-2 text-xs">
      <span className={cn(done ? "text-muted-foreground" : "")}>
        {row.finalized} of {row.expectedNotes} ready
      </span>
      {row.drafts > 0 ? (
        <Badge variant="secondary" className="text-[11px]">
          {row.drafts} draft{row.drafts === 1 ? "" : "s"}
        </Badge>
      ) : null}
      {row.missing > 0 ? (
        <Badge variant="outline" className="text-[11px]">
          {row.missing} missing
        </Badge>
      ) : null}
      {done ? <IconCheck size={14} className="text-muted-foreground" /> : null}
    </div>
  );
}

/** One class's notes, week by week. */
function ClassNotes({ classId, rows }: { classId: string; rows: ClassRow[] }) {
  const { formatDate } = useSchoolDates();
  const row = rows.find((r) => r.classId === classId);
  const { data: notes } = useQuery<any[] | null>({
    queryKey: ["lesson-notes", classId],
    queryFn: async () => {
      const res = await fetch(
        agentNativePath(
          `/_agent-native/actions/list-lesson-notes?classId=${classId}&limit=100`,
        ),
      );
      if (!res.ok) return null;
      return res.json();
    },
  });

  const ordered = [...(notes ?? [])].sort((a, b) =>
    (a.lessonDate ?? "").localeCompare(b.lessonDate ?? ""),
  );

  return (
    <div className="h-full space-y-6 overflow-auto p-6 pb-24">
      <div className="space-y-2">
        <BackLink to="/admin/lessons">Lesson notes</BackLink>
        <h1 className="text-xl font-semibold">
          {row?.className ?? "This class"}
        </h1>
        <p className="text-sm text-muted-foreground">
          {row
            ? [row.subjectName, row.gradeLevelName, row.teacher]
                .filter(Boolean)
                .join(" · ")
            : ""}
        </p>
      </div>

      {notes && ordered.length === 0 ? (
        <div className="rounded-lg border border-dashed p-10 text-center">
          <p className="text-sm font-medium">No lesson notes yet</p>
          <p className="mx-auto mt-1 max-w-xs text-xs text-muted-foreground">
            Ask the agent to plan them from this subject's curriculum.
          </p>
        </div>
      ) : (
        <div className="divide-y rounded-lg border">
          {ordered.map((note) => {
            // The week in progress, so "how is this class doing right now?"
            // does not mean counting rows. Same reckoning as the teacher's
            // own list — one function, so the two cannot disagree about
            // which week it is.
            const thisWeek = isCurrentWeek(note.lessonDate);
            return (
              <Link
                key={note.id}
                to={`/admin/lessons/${note.id}`}
                className={cn(
                  "flex items-center gap-4 p-4 transition-colors hover:bg-muted/50",
                  thisWeek && "bg-primary/5",
                )}
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{note.title}</p>
                  {note.lessonDate ? (
                    <p className="text-xs text-muted-foreground">
                      {formatDate(note.lessonDate, {
                        day: "numeric",
                        month: "short",
                      })}
                    </p>
                  ) : null}
                </div>
                {thisWeek ? (
                  <Badge className="shrink-0 text-xs">This week</Badge>
                ) : null}
                {note.status === "finalized" ? (
                  <span className="flex shrink-0 items-center gap-1.5 text-xs text-muted-foreground">
                    <IconCheck size={12} />
                    Ready
                  </span>
                ) : (
                  <span className="flex shrink-0 items-center gap-1.5 text-xs text-muted-foreground">
                    <IconPencil size={12} />
                    Draft
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
