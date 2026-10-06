import { useQuery, useQueryClient } from "@tanstack/react-query";
import { agentNativePath } from "@agent-native/core/client";
import { useNavigationState } from "@/hooks/use-navigation-state";
import { useRole } from "@/hooks/use-role";
import { useNavigate, useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { IconWand, IconCheck, IconTrash, IconDots } from "@tabler/icons-react";
import { BackLink } from "@/components/layout/BackLink";
import { useCurriculumDraft } from "@/hooks/use-curriculum-draft";
import { weekPlanFromDraft } from "@shared/week-plan";
import { paceObjectives, reservedFromWeek } from "@shared/objective-pacing";
import { WeekPlan } from "@/components/curriculum/WeekPlan";
import { useSchoolConfig } from "@/hooks/use-school-config";
import {
  describeWeeks,
  termWeekCount,
  unplannedWeeks,
} from "@shared/term-weeks";

/**
 * A unit's objectives, however the draft spelled them. Agents write
 * `learningObjectives` or `objectives`, and each entry as a string or as
 * `{ description, bloomsLevel }` — none of which should decide whether a
 * teacher can see their own curriculum.
 */
function objectivesOf(unit: any): any[] {
  const list = unit?.learningObjectives ?? unit?.objectives;
  return Array.isArray(list) ? list : [];
}

/**
 * The curriculum drafting workspace, for whoever is drafting.
 *
 * Shared by both portals rather than living in the admin's. Drafting is
 * subject work: the teacher who has taught the subject for years knows its
 * shape better than whoever administers the school, and keeping the only
 * workspace behind the admin layout meant the subject coordinator — a role
 * that exists to own a subject's curriculum — could not reach the one
 * screen it was created for.
 *
 * Committing stays an admin's or coordinator's act; the action refuses
 * anyone else. Authorship is collaborative, ratification is not.
 */
export function CurriculumWorkspace({
  role,
  curriculumPath,
}: {
  role: "admin" | "teacher";
  /** Where this portal's curriculum list lives. */
  curriculumPath: string;
}) {
  const { sync } = useNavigationState();
  const navigate = useNavigate();
  const qc = useQueryClient();
  // Who may finish a session, as against work in one. A teacher drafts the
  // subjects they teach; committing it into the school's curriculum, or
  // throwing the session away, belongs to the admin or the subject's
  // coordinator — so they are not offered a control that would refuse them.
  const { role: schoolRole } = useRole();
  const maySettle =
    schoolRole === "school_admin" || schoolRole === "subject_coordinator";

  const [discardOpen, setDiscardOpen] = useState(false);
  const [discarding, setDiscarding] = useState(false);
  const [searchParams] = useSearchParams();
  const draftId = searchParams.get("draftId") ?? undefined;

  useEffect(() => {
    sync({
      role,
      view: "curriculum-setup",
      curriculumDraftId: draftId,
    });
  }, [sync, draftId]);

  const { draftState: liveDraft } = useCurriculumDraft(draftId ?? null);
  // Whether this school keeps weeks for examinations, and how many. Its own
  // answer or nothing — the preview must show what will actually be written.
  const { config: schoolConfig } = useSchoolConfig();

  const { data: activeDraft } = useQuery({
    queryKey: ["curriculum-draft-record", draftId],
    queryFn: async () => {
      if (!draftId) return null;
      const res = await fetch(
        agentNativePath(
          `/_agent-native/actions/get-curriculum-draft?id=${draftId}`,
        ),
      );
      if (!res.ok) return null;
      return res.json();
    },
    enabled: !!draftId,
  });

  // Units carry a termId; how long that term runs is what turns "weeks 1-3,
  // 4-5, 7-9" into "and nothing in week 6".
  const { data: terms = [] } = useQuery<any[]>({
    queryKey: ["terms"],
    queryFn: async () => {
      const res = await fetch(
        agentNativePath("/_agent-native/actions/list-terms"),
      );
      if (!res.ok) return [];
      return res.json();
    },
  });

  // The record holds the title and status; the live poll holds the tree as it
  // is written. Take both — replacing one with the other loses whichever
  // fields the other does not have.
  const draft: any = { ...(activeDraft ?? {}), ...(liveDraft ?? {}) };

  if (!draftId) {
    return (
      <div className="mx-auto h-full max-w-4xl space-y-5 overflow-auto p-6 pb-24">
        <div>
          <BackLink to={curriculumPath}>Curriculum</BackLink>
          <h1 className="text-xl font-semibold">Curriculum Setup</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Co-author your curriculum with the agent.
          </p>
        </div>
        <div className="rounded-lg border border-dashed p-12 text-center">
          <IconWand size={28} className="mx-auto text-muted-foreground mb-3" />
          <p className="text-sm font-medium">Start a curriculum session</p>
          <p className="text-xs text-muted-foreground mt-1 max-w-xs mx-auto">
            Ask the agent to start setting up your curriculum. It will guide you
            through subjects, units, and learning objectives in a live session.
          </p>
        </div>
      </div>
    );
  }

  const subjects: any[] = (draft?.stateJson as any)?.subjects ?? [];
  const committed = draft?.status === "committed";

  return (
    <div className="h-full space-y-6 overflow-auto p-6 pb-24">
      {/* The status used to sit in a badge beside the title with Discard next
          to it, which on a tablet squeezed the title and description into a
          narrow column. Status is one word, so it rides in the eyebrow; and
          Discard is rare and destructive, so it waits behind a menu rather
          than claiming a column of its own. */}
      <div>
        <BackLink to={curriculumPath} className="mb-3">
          Curriculum
        </BackLink>
        <p className="mb-1 flex items-center gap-1 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
          Curriculum session ·{" "}
          {committed ? (
            <span className="inline-flex items-center gap-0.5 text-primary">
              <IconCheck size={12} />
              Committed
            </span>
          ) : (
            <span>In progress</span>
          )}
        </p>
        {/* The menu sits on the title's own line, so it lines up with the
            title rather than floating between the label and the heading. */}
        <div className="flex items-center gap-2">
          <h1 className="min-w-0 flex-1 break-words text-xl font-semibold leading-tight">
            {draft?.sessionTitle ?? "Untitled session"}
          </h1>
          {/* Only an uncommitted session can be set aside — once it is in the
              curriculum, discarding the draft would change nothing. */}
          {!committed && maySettle ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  className="-mr-2 shrink-0"
                  aria-label="Session options"
                >
                  <IconDots size={18} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  className="text-destructive focus:text-destructive"
                  onSelect={() => setDiscardOpen(true)}
                >
                  <IconTrash size={14} className="mr-2" />
                  Discard session
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : null}
        </div>
        {/* One sentence, not three. Who commits is only worth saying to
            someone who cannot. */}
        <p className="mt-1 max-w-prose text-sm text-muted-foreground">
          {committed
            ? "These units and objectives are now part of the curriculum."
            : maySettle
              ? "Units and objectives appear here as the agent writes them. Nothing reaches the curriculum until you commit the session."
              : "Units and objectives appear here as the agent writes them. Draft freely — an admin or the subject's coordinator commits it into the curriculum."}
        </p>
      </div>

      <AlertDialog open={discardOpen} onOpenChange={setDiscardOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Set this session aside?</AlertDialogTitle>
            <AlertDialogDescription>
              Nothing has been added to the curriculum yet, so nothing is lost
              from it. The draft itself is kept rather than deleted, in case it
              is wanted back.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={discarding}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              disabled={discarding}
              onClick={async (e) => {
                e.preventDefault();
                setDiscarding(true);
                try {
                  const res = await fetch(
                    agentNativePath(
                      "/_agent-native/actions/discard-curriculum-draft",
                    ),
                    {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ id: draftId }),
                    },
                  );
                  const body = await res.json().catch(() => ({}));
                  if (!res.ok) {
                    throw new Error((body as any).error ?? "Failed");
                  }
                  qc.invalidateQueries({ queryKey: ["curriculum-drafts"] });
                  toast.success((body as any).message ?? "Set aside");
                  navigate(curriculumPath);
                } catch (err: any) {
                  toast.error(err.message ?? "Could not discard the session");
                } finally {
                  setDiscarding(false);
                  setDiscardOpen(false);
                }
              }}
            >
              {discarding ? "Setting aside…" : "Set aside"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {(draft?.stateJson as any)?.notes ? (
        <p className="rounded-lg border bg-muted/30 p-3 text-xs text-muted-foreground">
          {(draft.stateJson as any).notes}
        </p>
      ) : null}

      {subjects.length === 0 ? (
        <div className="rounded-lg border border-dashed p-8 text-center">
          <p className="text-sm font-medium">Nothing drafted yet</p>
          <p className="mx-auto mt-1 max-w-sm text-xs text-muted-foreground">
            Ask the agent to build a subject's units and objectives — name the
            subject and the year group. They will appear here as it works.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {subjects.map((subject: any, si: number) => {
            // The draft's canonical shape nests units under the year group
            // they are written for — subjects → gradeLevels → units — which
            // is what commit-curriculum-draft reads. This page was written
            // against a flatter shape and so showed a subject with nothing
            // under it. Read the canonical shape, and accept the flat one so
            // an older draft still renders.
            const groups: any[] = Array.isArray(subject.gradeLevels)
              ? subject.gradeLevels
              : Array.isArray(subject.units)
                ? [{ gradeLevelName: null, units: subject.units }]
                : [];
            const unitCount = groups.reduce(
              (sum: number, g: any) => sum + (g.units?.length ?? 0),
              0,
            );
            const objectiveCount = groups.reduce(
              (sum: number, g: any) =>
                sum +
                (g.units ?? []).reduce(
                  (inner: number, u: any) =>
                    inner + (objectivesOf(u).length ?? 0),
                  0,
                ),
              0,
            );

            return (
              <div key={si} className="space-y-4 rounded-lg border p-4 sm:p-5">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="min-w-0 truncate text-sm font-semibold">
                    {subject.name}
                  </h3>
                  <span className="shrink-0 text-xs text-muted-foreground">
                    {unitCount} unit{unitCount === 1 ? "" : "s"} ·{" "}
                    {objectiveCount} objective
                    {objectiveCount === 1 ? "" : "s"}
                    {subject.code ? ` · ${subject.code}` : ""}
                  </span>
                </div>

                {groups.length === 0 ? (
                  <p className="text-xs text-muted-foreground">
                    No units drafted for this subject yet.
                  </p>
                ) : (
                  groups.map((group: any, gi: number) => (
                    <div key={gi} className="space-y-3">
                      {(group.gradeLevelName ?? group.name) ? (
                        <p className="text-xs font-medium text-muted-foreground">
                          {group.gradeLevelName ?? group.name}
                        </p>
                      ) : null}
                      {/* Units live in a term, and week numbers restart in
                          each one — three units all reading "Weeks 1–13" is
                          three terms, not an error. Grouping by term says so,
                          and lets each term account for its own weeks. */}
                      <div className="space-y-5">
                        {(() => {
                          const byTerm = new Map<string, any[]>();
                          for (const unit of group.units ?? []) {
                            const key = unit.termId ?? "";
                            byTerm.set(key, [...(byTerm.get(key) ?? []), unit]);
                          }
                          const ordered = [...byTerm.entries()].sort((a, b) => {
                            const ta = terms.find((t: any) => t.id === a[0]);
                            const tb = terms.find((t: any) => t.id === b[0]);
                            return (ta?.sequence ?? 99) - (tb?.sequence ?? 99);
                          });
                          return ordered.map(([termId, units]) => {
                            const term = terms.find(
                              (t: any) => t.id === termId,
                            );
                            const weeks = term
                              ? termWeekCount(term.startDate, term.endDate)
                              : null;
                            const gaps = weeks
                              ? unplannedWeeks(units, weeks)
                              : [];
                            const objectiveCount = units.reduce(
                              (n: number, u: any) => n + objectivesOf(u).length,
                              0,
                            );
                            return (
                              <div key={termId || "none"} className="space-y-3">
                                <div className="flex flex-wrap items-baseline gap-x-2">
                                  <p className="text-xs font-medium">
                                    {term?.name ?? "No term set"}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    {units.length} unit
                                    {units.length === 1 ? "" : "s"} ·{" "}
                                    {objectiveCount} objective
                                    {objectiveCount === 1 ? "" : "s"}
                                    {weeks ? ` · ${weeks} weeks` : ""}
                                  </p>
                                </div>
                                <div className="space-y-5 border-l-2 border-muted pl-4">
                                  {units.map((unit: any, ui: number) => (
                                    <div key={ui} className="space-y-1">
                                      <p className="text-sm font-medium">
                                        {unit.title ?? unit.name}
                                        {unit.weekStart ? (
                                          <span className="ml-2 text-xs font-normal text-muted-foreground">
                                            {unit.weekStart === unit.weekEnd
                                              ? `Week ${unit.weekStart}`
                                              : `Weeks ${unit.weekStart}–${unit.weekEnd}`}
                                          </span>
                                        ) : null}
                                      </p>
                                      {Array.isArray(unit.standards) &&
                                      unit.standards.length > 0 ? (
                                        <p className="text-[11px] text-muted-foreground">
                                          {unit.standards
                                            .map((st: any) => st.code ?? st)
                                            .join(", ")}
                                        </p>
                                      ) : null}
                                      {/* The week-by-week pacing, when the agent has
                                worked one out. A table reads best where there
                                is width for three columns; on a tablet held in
                                one hand the same table would squeeze "Focus"
                                to nothing, so the narrow view keeps the list. */}
                                      {(() => {
                                        const agreed = weekPlanFromDraft(unit);
                                        // A unit nobody has paced is not
                                        // blank: its objectives will be spread
                                        // evenly and the lesson notes will
                                        // follow that. Showing the spread —
                                        // and saying it is only a default —
                                        // lets the school correct it now,
                                        // rather than in week six.
                                        const objectiveText = objectivesOf(
                                          unit,
                                        ).map((o: any) =>
                                          typeof o === "string"
                                            ? o
                                            : (o?.description ?? ""),
                                        );
                                        const plan =
                                          agreed ??
                                          (unit.weekStart &&
                                          objectiveText.length
                                            ? paceObjectives(
                                                objectiveText,
                                                unit.weekStart,
                                                unit.weekEnd ?? unit.weekStart,
                                                undefined,
                                                {
                                                  reservedFromWeek:
                                                    reservedFromWeek(
                                                      weeks,
                                                      (schoolConfig as any)
                                                        ?.examWeeksPerTerm,
                                                    ),
                                                },
                                              ).map((w) => ({
                                                week: w.week,
                                                objectives: w.objectives,
                                                note: w.reserved
                                                  ? "Examinations — no new material"
                                                  : null,
                                              }))
                                            : null);
                                        if (!plan) return null;
                                        return (
                                          <WeekPlan
                                            plan={plan}
                                            objectives={objectiveText}
                                            inferredNote={
                                              agreed
                                                ? null
                                                : "Even split — no week-by-week plan set. Ask the agent to pace it if some weeks are heavier."
                                            }
                                          />
                                        );
                                      })()}
                                      {/* The week rows already name every
                                          objective. Repeating them underneath
                                          doubled each unit's height and told
                                          the reader nothing they had not just
                                          read — so the list is only for units
                                          with no weeks to hang them on. */}
                                      {objectivesOf(unit).length === 0 ? (
                                        <p className="pl-3 text-xs text-muted-foreground">
                                          No objectives yet
                                        </p>
                                      ) : !unit.weekStart ? (
                                        <ul className="space-y-1 pt-1.5 pl-3">
                                          {objectivesOf(unit).map(
                                            (obj: any, oi: number) => (
                                              <li
                                                key={oi}
                                                className="flex gap-1.5 text-xs text-muted-foreground"
                                              >
                                                <span>•</span>
                                                <span>
                                                  {typeof obj === "string"
                                                    ? obj
                                                    : (obj?.description ?? "")}
                                                </span>
                                              </li>
                                            ),
                                          )}
                                        </ul>
                                      ) : null}
                                    </div>
                                  ))}
                                </div>
                                {gaps.length > 0 && weeks ? (
                                  <p className="text-xs text-muted-foreground">
                                    Nothing planned for{" "}
                                    {describeWeeks(gaps).join(", ")} of{" "}
                                    {term?.name ?? "the term"}&apos;s {weeks}{" "}
                                    weeks
                                  </p>
                                ) : null}
                              </div>
                            );
                          });
                        })()}
                      </div>
                    </div>
                  ))
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
