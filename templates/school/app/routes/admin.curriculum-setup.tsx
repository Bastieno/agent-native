import { useQuery, useQueryClient } from "@tanstack/react-query";
import { agentNativePath } from "@agent-native/core/client";
import { useNavigationState } from "@/hooks/use-navigation-state";
import { useNavigate, useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
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
import { toast } from "sonner";
import { IconWand, IconCheck, IconTrash } from "@tabler/icons-react";
import { BackLink } from "@/components/layout/BackLink";
import { useCurriculumDraft } from "@/hooks/use-curriculum-draft";

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
 * The weeks of a term with no unit against them, in order.
 *
 * A gap is not necessarily a mistake — a mid-term break and an examination
 * week are both deliberate — but an invisible gap is. The page cannot know
 * which it is, so it shows them and lets the person reading decide; the draft's
 * own notes usually say.
 */
function unplannedWeeks(units: any[], totalWeeks: number): number[] {
  const planned = new Set<number>();
  for (const unit of units) {
    const from = Number(unit?.weekStart);
    const to = Number(unit?.weekEnd ?? unit?.weekStart);
    if (!Number.isFinite(from)) continue;
    for (let w = from; w <= (Number.isFinite(to) ? to : from); w++) {
      planned.add(w);
    }
  }
  const gaps: number[] = [];
  for (let w = 1; w <= totalWeeks; w++) if (!planned.has(w)) gaps.push(w);
  return gaps;
}

/** "6" or "12–13" — consecutive weeks read as a range. */
function describeWeeks(weeks: number[]): string[] {
  const out: string[] = [];
  let i = 0;
  while (i < weeks.length) {
    let j = i;
    while (j + 1 < weeks.length && weeks[j + 1] === weeks[j] + 1) j++;
    out.push(i === j ? `Week ${weeks[i]}` : `Weeks ${weeks[i]}–${weeks[j]}`);
    i = j + 1;
  }
  return out;
}

export default function AdminCurriculumSetup() {
  const { sync } = useNavigationState();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [discardOpen, setDiscardOpen] = useState(false);
  const [discarding, setDiscarding] = useState(false);
  const [searchParams] = useSearchParams();
  const draftId = searchParams.get("draftId") ?? undefined;

  useEffect(() => {
    sync({
      role: "admin",
      view: "curriculum-setup",
      curriculumDraftId: draftId,
    });
  }, [sync, draftId]);

  const { draftState: liveDraft } = useCurriculumDraft(draftId ?? null);

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
      <div className="p-6 space-y-6">
        <div>
          <BackLink to="/admin/curriculum">Curriculum</BackLink>
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

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="min-w-0">
          <BackLink to="/admin/curriculum">Curriculum</BackLink>
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Curriculum session
          </p>
          <h1 className="text-xl font-semibold break-words">
            {draft?.sessionTitle ?? "Untitled session"}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Units and objectives appear here as the agent writes them. Nothing
            reaches the curriculum until the session is committed.
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {(draft as any)?.status === "committed" ? (
            <Badge className="gap-1 text-xs">
              <IconCheck size={12} />
              Committed
            </Badge>
          ) : (
            <>
              <Badge variant="secondary" className="text-xs">
                In Progress
              </Badge>
              {/* Only an uncommitted session can be set aside — once it is in
                  the curriculum, discarding the draft would change nothing. */}
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setDiscardOpen(true)}
              >
                <IconTrash size={14} className="mr-1.5" />
                Discard
              </Button>
            </>
          )}
        </div>
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
                  navigate("/admin/curriculum");
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
              <div key={si} className="space-y-3 rounded-lg border p-4">
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
                    <div key={gi} className="space-y-2">
                      {(group.gradeLevelName ?? group.name) ? (
                        <p className="text-xs font-medium text-muted-foreground">
                          {group.gradeLevelName ?? group.name}
                        </p>
                      ) : null}
                      <div className="space-y-2 border-l-2 border-muted pl-3">
                        {(group.units ?? []).map((unit: any, ui: number) => (
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
                            {/* The standards are why the unit is defensible:
                                show which ones it was written against. */}
                            {Array.isArray(unit.standards) &&
                            unit.standards.length > 0 ? (
                              <p className="text-[11px] text-muted-foreground">
                                {unit.standards
                                  .map((st: any) => st.code ?? st)
                                  .join(", ")}
                              </p>
                            ) : null}
                            {objectivesOf(unit).length > 0 ? (
                              <ul className="space-y-0.5 pl-3">
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
                            ) : (
                              <p className="pl-3 text-xs text-muted-foreground">
                                No objectives yet
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                      {(() => {
                        // A break and an oversight look identical in a list of
                        // units. Naming the empty weeks makes the difference
                        // visible; the draft's notes usually say which it is.
                        const termId = (group.units ?? []).find(
                          (u: any) => u.termId,
                        )?.termId;
                        const term = terms.find((t: any) => t.id === termId);
                        if (!term?.startDate || !term?.endDate) return null;
                        const weeks = Math.max(
                          1,
                          Math.round(
                            (new Date(term.endDate).getTime() -
                              new Date(term.startDate).getTime()) /
                              (7 * 24 * 60 * 60 * 1000),
                          ),
                        );
                        const gaps = unplannedWeeks(group.units ?? [], weeks);
                        if (gaps.length === 0) return null;
                        return (
                          <p className="pl-3 text-xs text-muted-foreground">
                            Nothing planned for {describeWeeks(gaps).join(", ")}{" "}
                            of {term.name}&apos;s {weeks} weeks
                          </p>
                        );
                      })()}
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
