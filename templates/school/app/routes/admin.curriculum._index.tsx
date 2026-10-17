import { useQuery } from "@tanstack/react-query";
import { agentNativePath } from "@agent-native/core/client";
import { useNavigationState } from "@/hooks/use-navigation-state";
import { useEffect } from "react";
import { Link, useSearchParams } from "react-router";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  IconBook,
  IconLibrary,
  IconPencil,
  IconUpload,
  IconWriting,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";

type Coverage = {
  id: string;
  name: string;
  code: string | null;
  color: string | null;
  units: number;
  objectives: number;
  started: boolean;
  emptyUnits: number;
  /** Year groups that take the subject. */
  taughtIn: string[];
  /** Year groups that have a curriculum for it. */
  yearGroups: string[];
};

type CoverageResponse = {
  subjects: Coverage[];
  total: number;
  withCurriculum: number;
  notStarted: number;
  yearGroups: Array<{ id: string; name: string }>;
  yearGroup: { id: string; name: string } | null;
};

const ALL = "all";

/**
 * The curriculum, by how much of it exists — for the whole school or for one
 * year group.
 *
 * A curriculum is built one year group at a time, but this page counted
 * subjects: Mathematics read as done once JSS1 and SS1 were written, while
 * JSS2, JSS3, SS2 and SS3 had nothing. Grouping the cards by year group would
 * have repeated every shared subject six times, and grouping them "junior" and
 * "senior" would have written one country's school system into the page.
 *
 * So the cards stay one per subject, and a year-group filter answers the real
 * question — "what still needs building for JSS1?" — showing only the subjects
 * that year group takes, counted for that year group alone.
 */
export default function AdminCurriculum() {
  const { sync } = useNavigationState();
  const [searchParams, setSearchParams] = useSearchParams();
  const year = searchParams.get("year") ?? ALL;

  const { data } = useQuery<CoverageResponse | null>({
    queryKey: ["curriculum-coverage", year],
    queryFn: async () => {
      const params = year === ALL ? "" : `?gradeLevelId=${year}`;
      const res = await fetch(
        agentNativePath(
          `/_agent-native/actions/get-curriculum-coverage${params}`,
        ),
      );
      if (!res.ok) return null;
      return res.json();
    },
    placeholderData: (previous) => previous,
  });

  useEffect(() => {
    sync({
      role: "admin",
      view: "curriculum",
      ...(year !== ALL ? { gradeLevelId: year } : {}),
    });
  }, [sync, year]);

  // A draft is durable but was unreachable once the tab closed: the workspace
  // that shows it is only navigable with an id, and nothing listed the ids.
  const { data: draftData } = useQuery<{ drafts: any[] } | null>({
    queryKey: ["curriculum-drafts"],
    queryFn: async () => {
      const res = await fetch(
        agentNativePath(
          "/_agent-native/actions/list-curriculum-drafts?status=in_progress",
        ),
      );
      if (!res.ok) return null;
      return res.json();
    },
  });
  const drafts = draftData?.drafts ?? [];

  // Subjects whose questions would be written with no house habits at all.
  const { data: styleData } = useQuery<any>({
    queryKey: ["assessment-styles"],
    queryFn: async () => {
      const res = await fetch(
        agentNativePath("/_agent-native/actions/list-assessment-styles"),
      );
      if (!res.ok) return null;
      return res.json();
    },
  });
  const styleGaps = styleData?.subjectsWithoutStyle?.length ?? 0;

  const subjects = data?.subjects ?? [];
  const yearGroups = data?.yearGroups ?? [];
  const selected = data?.yearGroup ?? null;

  // The work comes first: a subject with nothing written is what an admin is
  // here to find.
  const ordered = [...subjects].sort((a, b) => {
    if (a.started !== b.started) return a.started ? 1 : -1;
    return a.name.localeCompare(b.name);
  });

  const summary = data
    ? data.total === 0
      ? selected
        ? `No subjects are recorded as taken by ${selected.name}.`
        : "Subjects, units, and learning objectives for your school."
      : data.notStarted > 0
        ? `${data.withCurriculum} of ${data.total} ${selected ? `${selected.name} ` : ""}subjects have a curriculum · ${data.notStarted} not started`
        : `All ${data.total} ${selected ? `${selected.name} ` : ""}subjects have a curriculum`
    : "Subjects, units, and learning objectives for your school.";

  return (
    <div className="h-full space-y-6 overflow-auto p-6 pb-24">
      <div>
        <h1 className="text-xl font-semibold">Curriculum</h1>
        <p className="mt-1 text-sm text-muted-foreground">{summary}</p>
      </div>

      {drafts.length > 0 ? (
        <div className="space-y-2">
          <h2 className="text-xs font-medium text-muted-foreground">
            Sessions in progress
          </h2>
          {drafts.map((draft: any) => (
            <Link
              key={draft.id}
              to={`/admin/curriculum-setup?draftId=${draft.id}`}
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
                  {draft.objectives === 1 ? "" : "s"} drafted — not in the
                  curriculum until committed
                </p>
              </div>
              <span className="shrink-0 text-xs text-primary">Resume</span>
            </Link>
          ))}
        </div>
      ) : null}

      {/* The shipped libraries are samples; a school's own syllabus comes in
          here. Quiet, because most schools do it once. */}
      <div className="flex flex-wrap items-center gap-3">
        <Link
          to="/admin/curriculum/library"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground underline-offset-2 hover:text-foreground hover:underline"
        >
          <IconLibrary size={14} />
          What we plan from
        </Link>
        <Link
          to="/admin/curriculum/import"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground underline-offset-2 hover:text-foreground hover:underline"
        >
          <IconUpload size={14} />
          Import your own syllabus
        </Link>
        {/* What we plan from has a sibling: how we word the asking. Shown with
            a count only when subjects are missing one, because a school that
            has set them needs no reminder. */}
        <Link
          to="/admin/curriculum/styles"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground underline-offset-2 hover:text-foreground hover:underline"
        >
          <IconWriting size={14} />
          How we word questions
          {styleGaps > 0 ? (
            <span className="rounded-full bg-amber-500/15 px-1.5 py-0.5 text-[10px] font-medium text-amber-600 dark:text-amber-500">
              {styleGaps} not set
            </span>
          ) : null}
        </Link>
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
              <TabsTrigger key={y.id} value={y.id}>
                {y.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      ) : null}

      {data && subjects.length === 0 ? (
        <div className="rounded-lg border border-dashed p-10 text-center">
          <IconBook size={32} className="mx-auto mb-3 text-muted-foreground" />
          <p className="text-sm font-medium">
            {selected ? `No subjects for ${selected.name}` : "No subjects yet"}
          </p>
          <p className="mx-auto mt-1 max-w-xs text-xs text-muted-foreground">
            {selected
              ? `Ask the agent to record which subjects ${selected.name} takes.`
              : "Ask the agent to start a curriculum co-authoring session."}
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ordered.map((subject) => (
            <Link
              key={subject.id}
              to={`/admin/curriculum/${subject.id}${
                selected ? `?year=${selected.id}` : ""
              }`}
              className={cn(
                "space-y-2 rounded-lg border bg-card p-4 transition-colors hover:border-primary/40",
                // Not started is the state worth noticing, so it is the one
                // that looks different.
                subject.started ? "" : "border-dashed",
              )}
            >
              <div className="flex items-center gap-2">
                <div
                  className="h-3 w-3 shrink-0 rounded-full"
                  style={{
                    backgroundColor: subject.color ?? "hsl(var(--primary))",
                  }}
                />
                <span className="min-w-0 truncate text-sm font-medium">
                  {subject.name}
                </span>
                {subject.code ? (
                  <span className="ml-auto shrink-0 text-[11px] text-muted-foreground">
                    {subject.code}
                  </span>
                ) : null}
              </div>

              {subject.started ? (
                <>
                  <p className="text-xs text-muted-foreground">
                    {subject.units} unit{subject.units === 1 ? "" : "s"} ·{" "}
                    {subject.objectives} objective
                    {subject.objectives === 1 ? "" : "s"}
                  </p>
                  {/* Across the school, which of the year groups that take
                      the subject have a curriculum — "2 of 6" is the gap. */}
                  {!selected ? (
                    <p className="truncate text-xs text-muted-foreground">
                      {subject.taughtIn.length > 0
                        ? `${subject.yearGroups.length} of ${subject.taughtIn.length} year groups · ${subject.yearGroups.join(", ")}`
                        : subject.yearGroups.join(", ")}
                    </p>
                  ) : null}
                  {/* Units with nothing in them are half-done, not done. */}
                  {subject.emptyUnits > 0 ? (
                    <Badge variant="outline" className="text-[11px]">
                      {subject.emptyUnits} unit
                      {subject.emptyUnits === 1 ? "" : "s"} with no objectives
                    </Badge>
                  ) : null}
                </>
              ) : (
                <p className="text-xs text-muted-foreground">
                  {selected
                    ? `No ${selected.name} curriculum yet`
                    : "No curriculum yet"}
                </p>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
