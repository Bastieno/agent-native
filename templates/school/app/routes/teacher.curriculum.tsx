import { httpError } from "@/lib/http-error";
import { useQuery } from "@tanstack/react-query";
import { ListState } from "@/components/ListState";
import { agentNativePath } from "@agent-native/core/client";
import { useNavigationState } from "@/hooks/use-navigation-state";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { IconBook, IconChevronDown, IconPencil } from "@tabler/icons-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { WeekPlan } from "@/components/curriculum/WeekPlan";

/**
 * What a teacher is meant to be teaching.
 *
 * The curriculum had no home in this portal at all: a teacher could reach a
 * unit only sideways, through a lesson note that happened to mention it, and
 * could not see the term laid out — which is the one view you want when a
 * parent asks what is coming, or when deciding whether a week is behind.
 *
 * Read-only on purpose. Changing a curriculum is a drafting session, which
 * has its own workspace and its own commit step; this is the finished thing
 * the school has agreed, for the subjects this teacher teaches.
 */
export default function TeacherCurriculum() {
  const { sync } = useNavigationState();
  const [openSubject, setOpenSubject] = useState<string | null>(null);
  // "mine" is the teacher's own year groups; "all" is every year group the
  // school has written the subject for; anything else is one year group's id.
  // Kept in the address (?year=) so a reload or a shared link keeps it.
  const [searchParams, setSearchParams] = useSearchParams();
  const requestedYear = searchParams.get("year") ?? "mine";
  const setYearFilter = (next: string) =>
    setSearchParams(
      (prev) => {
        const params = new URLSearchParams(prev);
        if (next === "mine") params.delete("year");
        else params.set("year", next);
        return params;
      },
      { replace: true },
    );

  useEffect(() => {
    sync({ role: "teacher", view: "curriculum" });
  }, [sync]);

  // The classes this teacher takes, not the school's.
  //
  // `list-classes` answers "every class in the school" unless it is given a
  // teacher, so a chemistry teacher's curriculum page listed all twenty-odd
  // subjects. `get-my-classes` already means "mine" for staff, and it is
  // what the teacher's own class list uses.
  const { data: classes = [], isLoading } = useQuery<any[]>({
    queryKey: ["my-classes-curriculum"],
    queryFn: async () => {
      const res = await fetch(
        agentNativePath("/_agent-native/actions/get-my-classes"),
      );
      if (!res.ok) throw await httpError(res);
      return res.json();
    },
  });

  // One row per subject, however many classes of it they take, and the year
  // groups those classes are in. A subject's curriculum spans every year group
  // the school teaches it to — a JSS1–3 maths teacher was shown SS1 to SS3 as
  // well — so the page keeps only the year groups this teacher has a class in.
  const bySubject = new Map<
    string,
    { id: string; name: string; gradeLevelIds: Set<string> }
  >();
  for (const c of classes) {
    if (!c.subjectId) continue;
    const entry = bySubject.get(c.subjectId) ?? {
      id: c.subjectId,
      name: c.subjectName ?? "This subject",
      gradeLevelIds: new Set<string>(),
    };
    if (c.gradeLevelId) entry.gradeLevelIds.add(c.gradeLevelId);
    bySubject.set(c.subjectId, entry);
  }
  const subjects = Array.from(bySubject.values()).sort((a, b) =>
    a.name.localeCompare(b.name),
  );
  const myYears = Array.from(
    new Map(
      classes
        .filter((c: any) => c.gradeLevelId)
        .map((c: any) => [c.gradeLevelId, c.gradeLevelName ?? "Year group"]),
    ),
  ).sort((a, b) =>
    String(a[1]).localeCompare(String(b[1]), undefined, { numeric: true }),
  );
  // An address naming a year group this teacher has no class in falls back.
  const yearFilter =
    requestedYear === "mine" ||
    requestedYear === "all" ||
    isLoading ||
    myYears.some(([id]) => id === requestedYear)
      ? requestedYear
      : "mine";

  const { data: drafts } = useQuery<{ drafts: any[] } | null>({
    queryKey: ["curriculum-drafts", "teacher"],
    queryFn: async () => {
      const res = await fetch(
        agentNativePath(
          "/_agent-native/actions/list-curriculum-drafts?status=in_progress",
        ),
      );
      if (!res.ok) throw await httpError(res);
      return res.json();
    },
  });

  return (
    <div className="h-full space-y-6 overflow-auto p-6 pb-24">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold">Curriculum</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            What your subjects cover, term by term.
          </p>
        </div>
        {myYears.length > 0 ? (
          <Select value={yearFilter} onValueChange={setYearFilter}>
            <SelectTrigger className="w-48" aria-label="Year group">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mine">My year groups</SelectItem>
              {myYears.map(([id, name]) => (
                <SelectItem key={id as string} value={id as string}>
                  {name as string}
                </SelectItem>
              ))}
              <SelectItem value="all">All year groups</SelectItem>
            </SelectContent>
          </Select>
        ) : null}
      </div>

      {/* A session in progress is work, not a record — and a teacher may be
          the one drafting it. */}
      {drafts?.drafts?.length ? (
        <div className="space-y-2">
          <h2 className="text-xs font-medium text-muted-foreground">
            Sessions in progress
          </h2>
          {drafts.drafts.map((draft: any) => (
            <Link
              key={draft.id}
              to={`/teacher/curriculum-setup?draftId=${draft.id}`}
              className="flex items-center gap-3 rounded-lg border border-primary/40 bg-primary/5 p-3 transition-colors hover:border-primary"
            >
              <IconPencil size={16} className="shrink-0 text-primary" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">
                  {draft.sessionTitle}
                </p>
                <p className="text-xs text-muted-foreground">
                  {draft.units} unit{draft.units === 1 ? "" : "s"} ·{" "}
                  {draft.objectives} objective
                  {draft.objectives === 1 ? "" : "s"} — not in the curriculum
                  until it is committed
                </p>
              </div>
              <span className="shrink-0 text-xs text-primary">Open</span>
            </Link>
          ))}
        </div>
      ) : null}

      {isLoading ? (
        <ListState loading rows={2} title="Subjects" />
      ) : subjects.length === 0 ? (
        <div className="rounded-lg border border-dashed p-10 text-center">
          <IconBook size={28} className="mx-auto mb-2 text-muted-foreground" />
          <p className="text-sm font-medium">No classes yet</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Your subjects appear here once you have a class.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {subjects.map((subject: any) => (
            <SubjectCurriculum
              key={subject.id}
              subject={subject}
              yearFilter={yearFilter}
              open={openSubject === subject.id}
              onOpenChange={(next) => setOpenSubject(next ? subject.id : null)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function SubjectCurriculum({
  subject,
  yearFilter,
  open,
  onOpenChange,
}: {
  yearFilter: string;
  subject: { id: string; name: string; gradeLevelIds: Set<string> };
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { data } = useQuery<any>({
    queryKey: ["subject-curriculum", subject.id],
    queryFn: async () => {
      const res = await fetch(
        agentNativePath(
          `/_agent-native/actions/get-subject-curriculum?subjectId=${subject.id}`,
        ),
      );
      if (!res.ok) throw await httpError(res);
      return res.json();
    },
    enabled: open,
  });

  // A class with no year group on record cannot narrow anything, so then the
  // whole subject is shown rather than nothing.
  const yearGroups: any[] = (data?.yearGroups ?? []).filter((yg: any) =>
    yearFilter === "all"
      ? true
      : yearFilter === "mine"
        ? subject.gradeLevelIds.size === 0 ||
          subject.gradeLevelIds.has(yg.gradeLevelId)
        : yg.gradeLevelId === yearFilter,
  );
  const unitCount = yearGroups.reduce((n, yg) => n + (yg.units ?? 0), 0);
  const objectiveCount = yearGroups.reduce(
    (n, yg) => n + (yg.objectives ?? 0),
    0,
  );

  return (
    <Collapsible
      open={open}
      onOpenChange={onOpenChange}
      className="rounded-lg border"
    >
      <CollapsibleTrigger className="flex w-full items-center gap-3 p-4 text-left">
        <span className="min-w-0 flex-1 truncate text-sm font-medium">
          {subject.name}
        </span>
        {data ? (
          <span className="shrink-0 text-xs text-muted-foreground">
            {unitCount} unit{unitCount === 1 ? "" : "s"} · {objectiveCount}{" "}
            objective{objectiveCount === 1 ? "" : "s"}
          </span>
        ) : null}
        <IconChevronDown
          size={16}
          className={cn(
            "shrink-0 text-muted-foreground transition-transform",
            open && "rotate-180",
          )}
        />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="space-y-8 border-t p-5 sm:p-6">
          {!data ? (
            <p className="text-sm text-muted-foreground">Loading…</p>
          ) : yearGroups.length ? (
            yearGroups.map((yg: any) => (
              <div key={yg.gradeLevelId} className="space-y-5">
                <p className="text-sm font-medium">{yg.name}</p>
                {yg.terms.map((term: any) => (
                  <div key={term.termId ?? term.name} className="space-y-4">
                    <p className="text-xs text-muted-foreground">
                      {term.name} · {term.units.length} unit
                      {term.units.length === 1 ? "" : "s"}
                      {term.gapNote ? ` · ${term.gapNote}` : ""}
                    </p>
                    {term.units.length === 0 ? null : (
                      <div className="space-y-6 pl-4">
                        {term.units.map((unit: any) => (
                          <div key={unit.id} className="space-y-2">
                            <p className="text-sm">
                              {unit.title}
                              {/* A real space, and the right word: this ran
                                  together as "Whole numbers and place
                                  valueWeeks 1" when read or copied, and a
                                  unit covering one week is a week, not
                                  weeks. */}
                              {unit.weekStart ? (
                                <>
                                  {" "}
                                  <span className="text-xs text-muted-foreground">
                                    {unit.weekEnd &&
                                    unit.weekEnd !== unit.weekStart
                                      ? `Weeks ${unit.weekStart}–${unit.weekEnd}`
                                      : `Week ${unit.weekStart}`}
                                  </span>
                                </>
                              ) : null}
                            </p>
                            {unit.objectives?.length ? (
                              <ul className="list-disc space-y-1.5 pl-5 text-xs leading-relaxed text-muted-foreground">
                                {unit.objectives.map((o: any) => (
                                  <li key={o.id}>{o.description}</li>
                                ))}
                              </ul>
                            ) : (
                              <Badge variant="outline" className="text-[11px]">
                                No objectives yet
                              </Badge>
                            )}
                            {unit.weekPlan?.length ? (
                              <WeekPlan
                                plan={unit.weekPlan}
                                objectives={(unit.objectives ?? []).map(
                                  (o: any) => o.description,
                                )}
                              />
                            ) : null}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">
              {yearFilter === "mine" || yearFilter === "all"
                ? "No curriculum has been written for this subject yet."
                : "No curriculum has been written for this subject in this year group."}
            </p>
          )}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
