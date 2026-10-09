import { useQuery } from "@tanstack/react-query";
import { agentNativePath } from "@agent-native/core/client";
import { useNavigationState } from "@/hooks/use-navigation-state";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { ListState } from "@/components/ListState";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  IconCalendar,
  IconChevronRight,
  IconFileText,
} from "@tabler/icons-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Markdown } from "@/components/Markdown";
import { useSchoolDates } from "@/hooks/use-school-dates";

async function getJson(path: string) {
  const res = await fetch(agentNativePath(path));
  if (!res.ok) return null;
  return res.json();
}

/**
 * What the coloured week markers mean. Colour alone is not an explanation —
 * and not everyone can tell amber from grey — so the wording appears wherever
 * the markers do, and each card also states its counts in words.
 */
function StatusLegend({ className }: { className?: string }) {
  return (
    <div
      className={`flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground ${className ?? ""}`}
    >
      <span className="flex items-center gap-1.5">
        <span className="h-2.5 w-2.5 rounded-sm bg-green-500/70" />
        Lesson ready
      </span>
      <span className="flex items-center gap-1.5">
        <span className="h-2.5 w-2.5 rounded-sm bg-amber-500/70" />
        Draft lesson
      </span>
      <span className="flex items-center gap-1.5">
        <span className="h-2.5 w-2.5 rounded-sm bg-muted-foreground/30" />
        Planned, no lesson note
      </span>
      <span className="flex items-center gap-1.5">
        <span className="h-2.5 w-2.5 rounded-sm bg-muted/40" />
        Nothing planned
      </span>
    </div>
  );
}

const ALL = "__all__";

export default function AdminCalendar() {
  const { sync } = useNavigationState();
  const { formatDate } = useSchoolDates();
  const [termId, setTermId] = useState("");
  const [gradeLevelId, setGradeLevelId] = useState("");
  const [subjectId, setSubjectId] = useState(ALL);

  // The lesson note open for reading, if any. A head teacher checking
  // preparation needs to see what "draft" actually says, not only that it is.
  const [openLessonId, setOpenLessonId] = useState<string | null>(null);

  useEffect(() => {
    sync({
      role: "admin",
      view: "calendar",
      ...(openLessonId ? { lessonId: openLessonId } : {}),
    });
  }, [sync, openLessonId]);

  const { data: terms = [] } = useQuery<any[]>({
    queryKey: ["terms"],
    queryFn: async () =>
      (await getJson("/_agent-native/actions/list-terms")) ?? [],
  });
  const { data: gradeLevels = [] } = useQuery<any[]>({
    queryKey: ["grade-levels"],
    queryFn: async () => {
      // manage-grade-levels is a POST action; listing is its default mode.
      const res = await fetch(
        agentNativePath("/_agent-native/actions/manage-grade-levels"),
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "list" }),
        },
      );
      if (!res.ok) return [];
      const data = await res.json();
      return Array.isArray(data) ? data : (data?.levels ?? []);
    },
  });
  const { data: subjects = [] } = useQuery<any[]>({
    queryKey: ["subjects"],
    queryFn: async () =>
      (await getJson("/_agent-native/actions/list-subjects")) ?? [],
  });

  // Default to the term covering today, and the first year group — a calendar
  // for every year group at once is unreadable in a school with six of them.
  useEffect(() => {
    if (!termId && terms.length > 0) {
      const today = new Date().toISOString().slice(0, 10);
      const current = terms.find(
        (t: any) => t.startDate <= today && t.endDate >= today,
      );
      setTermId(current?.id ?? terms[0].id);
    }
    if (!gradeLevelId && gradeLevels.length > 0) {
      setGradeLevelId(gradeLevels[0].id);
    }
  }, [terms, termId, gradeLevels, gradeLevelId]);

  const { data: calendar, isLoading } = useQuery({
    queryKey: ["curriculum-calendar", termId, gradeLevelId, subjectId],
    queryFn: async () => {
      const params = new URLSearchParams({ termId });
      if (gradeLevelId) params.set("gradeLevelId", gradeLevelId);
      if (subjectId !== ALL) params.set("subjectId", subjectId);
      return await getJson(
        `/_agent-native/actions/get-curriculum-calendar?${params}`,
      );
    },
    enabled: !!termId && !!gradeLevelId,
  });

  const today = new Date().toISOString().slice(0, 10);
  const termStart = calendar?.term?.startDate;
  const currentWeek =
    termStart && today >= termStart
      ? Math.floor(
          (new Date(today).getTime() - new Date(termStart).getTime()) /
            (7 * 24 * 60 * 60 * 1000),
        ) + 1
      : null;

  const gradeLevelName =
    gradeLevels.find((g: any) => g.id === gradeLevelId)?.name ?? "";

  // Which subjects have a plan for this year group, and which do not — the
  // gap is the thing an admin is actually looking for.
  const plannedSubjects = new Set<string>(
    (calendar?.calendar ?? []).flatMap((w: any) =>
      w.entries.map((e: any) => e.subjectName),
    ),
  );
  // From the server, which knows which subjects this year group takes.
  const unplanned: string[] = calendar?.unplannedSubjects ?? [];
  const notStated: string[] = calendar?.yearGroupsNotStated ?? [];

  return (
    <div className="h-full overflow-auto p-6 space-y-5">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-xl font-semibold">
            Curriculum Calendar
            {gradeLevelName ? ` — ${gradeLevelName}` : ""}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {calendar?.term?.name
              ? // The term's dates as the school writes them. These printed
                // as "2026-09-14 to 2026-12-11" — how the app stores a date,
                // not how anyone reads one.
                `${calendar.term.name}: ${formatDate(calendar.term.startDate)} to ${formatDate(calendar.term.endDate)}`
              : "What this year group covers, week by week."}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Select value={gradeLevelId} onValueChange={setGradeLevelId}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Year group" />
            </SelectTrigger>
            <SelectContent>
              {gradeLevels.map((g: any) => (
                <SelectItem key={g.id} value={g.id}>
                  {g.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={subjectId} onValueChange={setSubjectId}>
            <SelectTrigger className="w-44">
              <SelectValue placeholder="All subjects" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL}>All subjects</SelectItem>
              {subjects.map((s: any) => (
                <SelectItem key={s.id} value={s.id}>
                  {s.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={termId} onValueChange={setTermId}>
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Term" />
            </SelectTrigger>
            <SelectContent>
              {terms.map((t: any) => (
                <SelectItem key={t.id} value={t.id}>
                  {t.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {isLoading || !calendar || calendar.unitCount === 0 ? (
        <ListState
          loading={isLoading}
          icon={IconCalendar}
          title={`No curriculum planned for ${gradeLevelName || "this year group"}`}
          description="Ask the agent to generate a scheme of work for a subject and year group."
          rows={5}
        />
      ) : (
        <>
          <div className="flex flex-wrap gap-4 text-sm">
            {[
              { label: "Teaching weeks", value: calendar.weeks },
              { label: "Subjects planned", value: plannedSubjects.size },
              { label: "Units", value: calendar.unitCount },
              {
                label: "Lessons ready",
                value: `${calendar.finalizedLessonCount}/${calendar.lessonNoteCount}`,
              },
            ].map(({ label, value }) => (
              <div key={label} className="rounded-lg border bg-card px-4 py-2">
                <p className="text-lg font-semibold leading-tight">{value}</p>
                <p className="text-xs text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>

          {subjectId === ALL ? (
            <UnplannedLine
              gradeLevelName={gradeLevelName}
              unplanned={unplanned}
              notStated={notStated}
            />
          ) : null}

          {/* With a dozen subjects, a week-by-week list becomes a wall of
              chips. Show the whole term as a grid first — subjects down,
              weeks across — and let the reader open one subject. */}
          {subjectId === ALL ? (
            <div className="hidden overflow-x-auto rounded-lg border md:block">
              <table className="text-sm w-full border-collapse">
                <thead>
                  <tr className="border-b bg-muted/40">
                    <th className="sticky left-0 z-10 min-w-[9rem] border-r bg-card px-3 py-2 text-left font-medium">
                      Subject
                    </th>
                    {Array.from(
                      { length: calendar.weeks },
                      (_, i) => i + 1,
                    ).map((w) => (
                      <th
                        key={w}
                        className={`px-1 py-2 text-center font-medium w-9 ${
                          currentWeek === w ? "text-primary" : ""
                        }`}
                        title={`Week ${w}`}
                      >
                        {w}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[...plannedSubjects].map((name) => {
                    const firstEntry = (calendar.calendar ?? [])
                      .flatMap((w: any) => w.entries)
                      .find((e: any) => e.subjectName === name);
                    return (
                      <tr
                        key={name}
                        className="border-b last:border-0 hover:bg-accent/40 cursor-pointer"
                        onClick={() =>
                          firstEntry?.subjectId &&
                          setSubjectId(firstEntry.subjectId)
                        }
                        title={`Open ${name} week by week`}
                      >
                        <td className="sticky left-0 z-10 whitespace-nowrap border-r bg-background px-3 py-2 font-medium">
                          {name}
                        </td>
                        {calendar.calendar.map((week: any) => {
                          const entry = week.entries.find(
                            (e: any) => e.subjectName === name,
                          );
                          const tone = !entry
                            ? "bg-muted/30"
                            : entry.lessonsPrepared > 0
                              ? "bg-green-500/70"
                              : entry.lessonsDrafted > 0
                                ? "bg-amber-500/70"
                                : "bg-muted-foreground/30";
                          return (
                            <td
                              key={week.week}
                              className={`px-1 py-2 ${currentWeek === week.week ? "bg-primary/5" : ""}`}
                            >
                              <div
                                className={`h-5 w-full rounded-sm ${tone}`}
                                title={
                                  entry
                                    ? `Week ${week.week} · ${entry.unitTitle}${
                                        entry.lessonsPrepared > 0
                                          ? " · lesson ready"
                                          : entry.lessonsDrafted > 0
                                            ? " · draft lesson"
                                            : " · no lesson note"
                                      }`
                                    : `Week ${week.week} · nothing planned`
                                }
                              />
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border-t px-3 py-2 text-xs text-muted-foreground">
                <StatusLegend />
                <span className="ml-auto">
                  Select a subject to see the weeks
                </span>
              </div>
            </div>
          ) : null}

          {/* A fourteen-column table cannot work on a phone. Below md each
              subject becomes a card whose week markers wrap, so nothing
              scrolls sideways and nothing hides under a sticky column. */}
          {subjectId === ALL ? (
            <div className="space-y-2 md:hidden">
              {[...plannedSubjects].map((name) => {
                const entries = (calendar.calendar ?? []).map((w: any) => ({
                  week: w.week,
                  entry: w.entries.find((e: any) => e.subjectName === name),
                }));
                const firstEntry = entries.find((e: any) => e.entry)?.entry;
                return (
                  <button
                    key={name}
                    type="button"
                    onClick={() =>
                      firstEntry?.subjectId &&
                      setSubjectId(firstEntry.subjectId)
                    }
                    className="w-full rounded-lg border p-3 text-left transition-colors hover:border-primary/50"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-medium">{name}</span>
                      <span className="text-xs text-muted-foreground">
                        {entries.filter((e: any) => e.entry).length} of{" "}
                        {calendar.weeks} weeks planned
                      </span>
                    </div>
                    {/* Say it in words too, so the colours are a shortcut
                        rather than the only way to read the card. */}
                    <p className="mt-1 text-xs text-muted-foreground">
                      {(() => {
                        const ready = entries.filter(
                          (e: any) => e.entry?.lessonsPrepared > 0,
                        ).length;
                        const draft = entries.filter(
                          (e: any) =>
                            e.entry &&
                            !e.entry.lessonsPrepared &&
                            e.entry.lessonsDrafted > 0,
                        ).length;
                        const none = entries.filter(
                          (e: any) =>
                            e.entry &&
                            !e.entry.lessonsPrepared &&
                            !e.entry.lessonsDrafted,
                        ).length;
                        const parts = [];
                        if (ready)
                          parts.push(
                            `${ready} lesson${ready === 1 ? "" : "s"} ready`,
                          );
                        if (draft) parts.push(`${draft} draft`);
                        if (none) parts.push(`${none} with no lesson note`);
                        return parts.length
                          ? parts.join(" · ")
                          : "No weeks planned";
                      })()}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {entries.map(({ week, entry }: any) => (
                        <span
                          key={week}
                          title={
                            entry
                              ? `Week ${week}: ${entry.unitTitle}`
                              : `Week ${week}: nothing planned`
                          }
                          className={`flex h-5 w-5 items-center justify-center rounded-sm text-[10px] ${
                            !entry
                              ? "bg-muted/40 text-muted-foreground"
                              : entry.lessonsPrepared > 0
                                ? "bg-green-500/70 text-background"
                                : entry.lessonsDrafted > 0
                                  ? "bg-amber-500/70 text-background"
                                  : "bg-muted-foreground/30"
                          } ${currentWeek === week ? "ring-1 ring-primary" : ""}`}
                        >
                          {week}
                        </span>
                      ))}
                    </div>
                  </button>
                );
              })}
              <StatusLegend className="px-1 pt-1" />
            </div>
          ) : null}

          {subjectId === ALL ? null : (
            <div className="space-y-2">
              {calendar.calendar.map((week: any) => {
                const isCurrent = currentWeek === week.week;
                return (
                  <Collapsible key={week.week} defaultOpen={isCurrent}>
                    <div
                      className={`rounded-lg border ${isCurrent ? "border-primary/60 bg-primary/5" : ""}`}
                    >
                      {/* min-w-0 throughout: without it a flex child refuses to
                        shrink below its content and the chips overflow the
                        card instead of truncating. */}
                      <CollapsibleTrigger className="group flex w-full min-w-0 items-center gap-3 overflow-hidden px-4 py-3 text-left">
                        <IconChevronRight
                          size={15}
                          className="shrink-0 text-muted-foreground transition-transform group-data-[state=open]:rotate-90"
                        />
                        <span className="w-16 shrink-0 text-sm font-medium">
                          Week {week.week}
                        </span>
                        {isCurrent && (
                          <Badge className="text-xs h-5 shrink-0">
                            This week
                          </Badge>
                        )}
                        {/* One chip per subject keeps a ten-subject week
                          scannable, where a joined sentence would not be. */}
                        <div className="flex flex-wrap items-center gap-1.5 min-w-0">
                          {week.entries.length === 0 ? (
                            <span className="text-xs text-muted-foreground">
                              Nothing planned
                            </span>
                          ) : (
                            week.entries.map((e: any) => (
                              <span
                                key={e.unitId}
                                className="inline-flex min-w-0 max-w-full items-center gap-1 overflow-hidden rounded-md border bg-background px-2 py-0.5 text-xs"
                                title={`${e.subjectName}: ${e.unitTitle}`}
                              >
                                <span
                                  className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                                    e.lessonsPrepared > 0
                                      ? "bg-green-500"
                                      : e.lessonsDrafted > 0
                                        ? "bg-amber-500"
                                        : "bg-muted-foreground/40"
                                  }`}
                                />
                                <span className="shrink-0 font-medium">
                                  {e.subjectName}
                                </span>
                                <span className="min-w-0 truncate text-muted-foreground">
                                  {e.unitTitle}
                                </span>
                              </span>
                            ))
                          )}
                        </div>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <div className="border-t px-4 py-3 space-y-4">
                          {week.entries.length === 0 ? (
                            <p className="text-sm text-muted-foreground">
                              No unit covers this week.
                            </p>
                          ) : (
                            week.entries.map((entry: any) => (
                              <div key={entry.unitId} className="space-y-2">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className="text-sm font-medium">
                                    {entry.subjectName}
                                  </span>
                                  <Badge variant="outline" className="text-xs">
                                    {entry.gradeLevelName}
                                  </Badge>
                                  <span className="text-xs text-muted-foreground">
                                    {entry.unitTitle}
                                  </span>
                                  <Badge
                                    variant={
                                      entry.lessonsPrepared > 0
                                        ? "default"
                                        : "secondary"
                                    }
                                    className="text-xs ml-auto"
                                  >
                                    {entry.lessonsPrepared > 0
                                      ? `${entry.lessonsPrepared} lesson${entry.lessonsPrepared === 1 ? "" : "s"} ready`
                                      : entry.lessonsDrafted > 0
                                        ? `${entry.lessonsDrafted} draft lesson${entry.lessonsDrafted === 1 ? "" : "s"}`
                                        : "No lesson note"}
                                  </Badge>
                                </div>
                                {entry.objectives.length > 0 && (
                                  <ul className="list-disc pl-5 space-y-0.5">
                                    {entry.objectives
                                      .slice(0, 4)
                                      .map((o: string, i: number) => (
                                        <li
                                          key={i}
                                          className="text-xs text-muted-foreground"
                                        >
                                          {o}
                                        </li>
                                      ))}
                                    {entry.objectives.length > 4 && (
                                      <li className="text-xs text-muted-foreground">
                                        +{entry.objectives.length - 4} more
                                      </li>
                                    )}
                                  </ul>
                                )}
                                {entry.lessons.length > 0 ? (
                                  <div className="flex flex-wrap gap-1.5 pt-1">
                                    {entry.lessons.map((lesson: any) => (
                                      <button
                                        key={lesson.id}
                                        type="button"
                                        onClick={() =>
                                          setOpenLessonId(lesson.id)
                                        }
                                        className="inline-flex items-center gap-1.5 rounded-md border px-2 py-1 text-xs transition-colors hover:border-primary/50"
                                      >
                                        <IconFileText
                                          size={13}
                                          className="text-muted-foreground"
                                        />
                                        {lesson.className ?? "Lesson note"}
                                        <span className="text-muted-foreground">
                                          ·{" "}
                                          {lesson.status === "finalized"
                                            ? "ready"
                                            : "draft"}
                                        </span>
                                      </button>
                                    ))}
                                  </div>
                                ) : null}
                              </div>
                            ))
                          )}
                        </div>
                      </CollapsibleContent>
                    </div>
                  </Collapsible>
                );
              })}
            </div>
          )}
        </>
      )}
      <LessonNoteSheet
        lessonId={openLessonId}
        onClose={() => setOpenLessonId(null)}
      />
    </div>
  );
}

/**
 * A lesson note, read-only. Teachers write lesson notes in their class; an
 * admin reads them here to see how a week is prepared. Editing stays with the
 * teacher, so there is one place a note is written.
 */
function LessonNoteSheet({
  lessonId,
  onClose,
}: {
  lessonId: string | null;
  onClose: () => void;
}) {
  const { formatDate } = useSchoolDates();
  const { data: note, isLoading } = useQuery<any>({
    queryKey: ["lesson-note", lessonId],
    queryFn: () =>
      getJson(`/_agent-native/actions/get-lesson-note?id=${lessonId}`),
    enabled: !!lessonId,
  });

  const date = note?.lessonDate
    ? formatDate(note.lessonDate, {
        weekday: "short",
        day: "numeric",
        month: "short",
      })
    : null;

  return (
    <Sheet open={!!lessonId} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="w-full overflow-y-auto sm:max-w-xl">
        <SheetHeader className="text-left">
          <SheetTitle className="pr-6">
            {note?.title ?? (isLoading ? "Loading…" : "Lesson note")}
          </SheetTitle>
          <SheetDescription>
            {[
              note?.className,
              date,
              note ? (note.status === "finalized" ? "Ready" : "Draft") : null,
            ]
              .filter(Boolean)
              .join(" · ")}
          </SheetDescription>
        </SheetHeader>
        <div className="mt-6">
          {note ? (
            <Markdown>{note.content}</Markdown>
          ) : !isLoading ? (
            <p className="text-sm text-muted-foreground">
              This lesson note could not be opened.
            </p>
          ) : null}
        </div>
      </SheetContent>
    </Sheet>
  );
}

/**
 * Which of this year group's subjects still have no plan this term.
 *
 * It used to list every subject in the school — twenty-six names, Physics and
 * Government among JSS1's — so the few that mattered were lost. Now it names
 * only subjects the year group takes, shows the first few, and keeps the rest
 * one tap away. Subjects whose year groups the school has not recorded are
 * counted separately, since they cannot be said to be missing.
 */
function UnplannedLine({
  gradeLevelName,
  unplanned,
  notStated,
}: {
  gradeLevelName: string;
  unplanned: string[];
  notStated: string[];
}) {
  const [expanded, setExpanded] = useState(false);
  if (unplanned.length === 0 && notStated.length === 0) return null;
  const SHOWN = 4;
  const visible = expanded ? unplanned : unplanned.slice(0, SHOWN);
  const hidden = unplanned.length - visible.length;

  return (
    <div className="space-y-1 text-xs text-muted-foreground">
      {unplanned.length > 0 ? (
        <p>
          No plan yet for {gradeLevelName}:{" "}
          <span className="text-foreground">{visible.join(", ")}</span>
          {/* A real space, not just a margin: copied or read by a screen
              reader it ran together as "Civic Educationand 8 more". */}
          {hidden > 0 ? " " : null}
          {hidden > 0 ? (
            <button
              type="button"
              onClick={() => setExpanded(true)}
              className="ml-1 underline-offset-2 hover:text-foreground hover:underline"
            >
              and {hidden} more
            </button>
          ) : null}
        </p>
      ) : null}
      {notStated.length > 0 ? (
        <p>
          {notStated.length} subject{notStated.length === 1 ? "" : "s"} do
          {notStated.length === 1 ? "es" : ""} not say which year groups take
          {notStated.length === 1 ? " it" : " them"} yet, so{" "}
          {notStated.length === 1 ? "it is" : "they are"} not counted here. Ask
          the agent to record them.
        </p>
      ) : null}
    </div>
  );
}
