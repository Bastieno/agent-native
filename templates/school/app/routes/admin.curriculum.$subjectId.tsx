import { useQuery, useQueryClient } from "@tanstack/react-query";
import { agentNativePath } from "@agent-native/core/client";
import { useNavigationState } from "@/hooks/use-navigation-state";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router";
import {
  IconBook,
  IconChevronDown,
  IconPencil,
  IconPlus,
  IconTrash,
} from "@tabler/icons-react";
import { nanoid } from "nanoid";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Skeleton } from "@/components/ui/skeleton";
import { BackLink } from "@/components/layout/BackLink";
import { cn } from "@/lib/utils";
import { WeekPlan } from "@/components/curriculum/WeekPlan";
import { weekLabel } from "@shared/term-weeks";
import type {
  CurriculumUnit,
  CurriculumYearGroup,
  SubjectCurriculum,
} from "../../server/lib/subject-curriculum";

/**
 * One subject's curriculum, as it is taught: year group, then term, then units
 * in order.
 *
 * This page used to be a single numbered list of unit titles. Each year group
 * numbers its units from 1, so a subject taught in JSS1 and SS1 showed two
 * "unit 1"s with nothing to say which class either was for; and it never showed
 * an objective at all. Every unit also wore an "active" badge — which every
 * unit was.
 *
 * A unit is a row until it is opened: title, weeks and how many objectives it
 * has are enough to scan a term, and the objectives themselves are one tap
 * away rather than a wall of text.
 */
export default function AdminSubjectDetail() {
  const { subjectId } = useParams<{ subjectId: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const { sync } = useNavigationState();

  const { data, isLoading } = useQuery<SubjectCurriculum | null>({
    queryKey: ["subject-curriculum", subjectId],
    queryFn: async () => {
      const res = await fetch(
        agentNativePath(
          `/_agent-native/actions/get-subject-curriculum?subjectId=${subjectId}`,
        ),
      );
      if (!res.ok) return null;
      return res.json();
    },
    enabled: !!subjectId,
  });

  const yearGroups = data?.yearGroups ?? [];
  const requested = searchParams.get("year");
  const selected =
    yearGroups.find((y) => y.gradeLevelId === requested) ?? yearGroups[0];

  useEffect(() => {
    sync({
      role: "admin",
      view: "curriculum",
      subjectId,
      gradeLevelId: selected?.gradeLevelId,
    });
  }, [sync, subjectId, selected?.gradeLevelId]);

  const summary = data
    ? [
        data.subject.code,
        `${data.units} unit${data.units === 1 ? "" : "s"}`,
        `${data.objectives} objective${data.objectives === 1 ? "" : "s"}`,
      ]
        .filter(Boolean)
        .join(" · ")
    : null;

  return (
    <div className="h-full space-y-6 overflow-auto p-6 pb-24">
      <div>
        <BackLink to="/admin/curriculum" className="mb-4">
          Curriculum
        </BackLink>
        <div className="flex items-center gap-2">
          <span
            className="h-3 w-3 shrink-0 rounded-full"
            style={{
              backgroundColor: data?.subject.color ?? "hsl(var(--primary))",
            }}
          />
          <h1 className="min-w-0 break-words text-xl font-semibold leading-tight">
            {data?.subject.name ?? (isLoading ? "" : "Subject")}
          </h1>
        </div>
        {summary ? (
          <p className="mt-2 text-sm text-muted-foreground">{summary}</p>
        ) : null}
      </div>

      {isLoading ? (
        <div className="space-y-3">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-40 w-full" />
        </div>
      ) : yearGroups.length === 0 ? (
        <div className="rounded-lg border border-dashed p-10 text-center">
          <IconBook size={28} className="mx-auto mb-3 text-muted-foreground" />
          <p className="text-sm font-medium">No curriculum yet</p>
          <p className="mx-auto mt-1 max-w-xs text-xs text-muted-foreground">
            Ask the agent to build this subject's curriculum for a year group
            and term.
          </p>
        </div>
      ) : (
        <>
          {/* One year group needs no switcher; several get one, so a subject
              taught from JSS1 to SS3 is never one long scroll. */}
          {yearGroups.length > 1 ? (
            <Tabs
              value={selected?.gradeLevelId}
              onValueChange={(value) =>
                setSearchParams({ year: value }, { replace: true })
              }
            >
              <TabsList className="h-auto max-w-full flex-wrap justify-start">
                {yearGroups.map((y) => (
                  <TabsTrigger key={y.gradeLevelId} value={y.gradeLevelId}>
                    {y.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          ) : (
            <h2 className="text-sm font-semibold">{selected?.name}</h2>
          )}

          {selected ? (
            <YearGroupView
              key={selected.gradeLevelId}
              yearGroup={selected}
              subjectId={subjectId!}
            />
          ) : null}
        </>
      )}
    </div>
  );
}

function YearGroupView({
  yearGroup,
  subjectId,
}: {
  yearGroup: CurriculumYearGroup;
  subjectId: string;
}) {
  // Numbered through the year, not restarted each term, so "unit 7" is one
  // unit and not three.
  let position = 0;

  return (
    <div className="space-y-8">
      {yearGroup.terms.map((term) => (
        <section key={term.termId ?? "none"} className="space-y-2">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="text-sm font-semibold">{term.name}</h3>
            <span className="shrink-0 text-xs text-muted-foreground">
              {term.units.length} unit{term.units.length === 1 ? "" : "s"} ·{" "}
              {term.objectives} objective{term.objectives === 1 ? "" : "s"}
            </span>
          </div>
          <div className="divide-y rounded-lg border">
            {term.units.map((unit) => {
              position += 1;
              return (
                <UnitRow
                  key={unit.id}
                  unit={unit}
                  position={position}
                  subjectId={subjectId}
                />
              );
            })}
          </div>
          {term.gapNote ? (
            <p className="text-xs text-muted-foreground">{term.gapNote}</p>
          ) : null}
        </section>
      ))}
    </div>
  );
}

function UnitRow({
  unit,
  position,
  subjectId,
}: {
  unit: CurriculumUnit;
  position: number;
  subjectId: string;
}) {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const weeks = weekLabel(unit.weekStart, unit.weekEnd);
  const count = unit.objectives.length;

  // Codes grouped by the framework they come from: "WAEC · GMATH-NUM-1, …".
  const frameworks = new Map<string, string[]>();
  for (const s of unit.standards) {
    const key = s.framework ?? "";
    frameworks.set(key, [...(frameworks.get(key) ?? []), s.code]);
  }

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-muted/40">
        <span className="w-5 shrink-0 text-xs tabular-nums text-muted-foreground">
          {position}
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium">{unit.title}</p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {[
              weeks,
              count
                ? `${count} objective${count === 1 ? "" : "s"}`
                : "No objectives yet",
            ]
              .filter(Boolean)
              .join(" · ")}
          </p>
        </div>
        <IconChevronDown
          size={16}
          className={cn(
            "shrink-0 text-muted-foreground transition-transform",
            open && "rotate-180",
          )}
        />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="space-y-3 px-4 pb-4 pl-12">
          {unit.description ? (
            <p className="text-sm text-muted-foreground">{unit.description}</p>
          ) : null}
          {editing ? (
            <ObjectiveEditor
              unit={unit}
              subjectId={subjectId}
              onClose={() => setEditing(false)}
            />
          ) : count > 0 ? (
            <ol className="list-decimal space-y-1.5 pl-4 text-sm marker:text-muted-foreground">
              {unit.objectives.map((o) => (
                <li key={o.id}>{o.description}</li>
              ))}
            </ol>
          ) : (
            <p className="text-sm text-muted-foreground">
              This unit has no learning objectives yet, so nothing can be
              planned or assessed against it.
            </p>
          )}
          {/* What was agreed week by week — the same view the draft showed.
              It is stored on the unit at commit and the lesson notes are
              written from it, so this is what someone checking a committed
              curriculum most often wants to see. */}
          {!editing && unit.weekPlan?.length ? (
            <WeekPlan
              plan={unit.weekPlan}
              objectives={unit.objectives.map((o) => o.description)}
            />
          ) : null}
          {!editing ? (
            <div className="flex items-end justify-between gap-3">
              <div className="min-w-0 space-y-0.5">
                {[...frameworks.entries()].map(([framework, codes]) => (
                  <p
                    key={framework}
                    className="text-[11px] text-muted-foreground"
                  >
                    {framework ? `${framework} · ` : ""}
                    {codes.join(", ")}
                  </p>
                ))}
              </div>
              <Button
                size="sm"
                variant="ghost"
                className="-mr-2 shrink-0 text-muted-foreground"
                onClick={() => setEditing(true)}
              >
                <IconPencil size={14} className="mr-1.5" />
                Edit objectives
              </Button>
            </div>
          ) : null}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

type DraftRow = { key: string; id?: string; text: string };

async function callAction(name: string, method: string, body: object) {
  const res = await fetch(agentNativePath(`/_agent-native/actions/${name}`), {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error((json as any).error ?? `${name} failed`);
  return json;
}

/** The page's copy of the curriculum with one unit's objectives replaced. */
function withObjectives(
  data: SubjectCurriculum,
  unitId: string,
  objectives: CurriculumUnit["objectives"],
): SubjectCurriculum {
  let delta = 0;
  let emptyDelta = 0;
  const yearGroups = data.yearGroups.map((y) => {
    let yDelta = 0;
    const terms = y.terms.map((t) => {
      let tDelta = 0;
      const units = t.units.map((u) => {
        if (u.id !== unitId) return u;
        tDelta = objectives.length - u.objectives.length;
        emptyDelta =
          (objectives.length === 0 ? 1 : 0) -
          (u.objectives.length === 0 ? 1 : 0);
        return { ...u, objectives };
      });
      yDelta += tDelta;
      return { ...t, units, objectives: t.objectives + tDelta };
    });
    delta += yDelta;
    return { ...y, terms, objectives: y.objectives + yDelta };
  });
  return {
    ...data,
    yearGroups,
    objectives: data.objectives + delta,
    unitsWithoutObjectives: data.unitsWithoutObjectives + emptyDelta,
  };
}

/**
 * Edit a unit's objectives in place: reword, remove, add at the end.
 *
 * The screen changes the moment Save is pressed; the actions run behind it and
 * the page is put back if one fails. Removing asks first — it is the one part
 * of this that cannot be undone from here. Reordering is left to the agent
 * (`reorder-learning-objectives`), which keeps this panel to one job.
 */
function ObjectiveEditor({
  unit,
  subjectId,
  onClose,
}: {
  unit: CurriculumUnit;
  subjectId: string;
  onClose: () => void;
}) {
  const qc = useQueryClient();
  const [rows, setRows] = useState<DraftRow[]>(() =>
    unit.objectives.map((o) => ({ key: o.id, id: o.id, text: o.description })),
  );
  const [confirmOpen, setConfirmOpen] = useState(false);

  const original = new Map(unit.objectives.map((o) => [o.id, o]));
  const kept = rows.filter((r) => r.text.trim());
  const removed = unit.objectives.filter(
    (o) => !kept.some((r) => r.id === o.id),
  );
  const changed = kept.filter(
    (r) => r.id && original.get(r.id)?.description !== r.text.trim(),
  );
  const added = kept.filter((r) => !r.id);
  const dirty = removed.length + changed.length + added.length > 0;

  const save = () => {
    const key = ["subject-curriculum", subjectId];
    const before = qc.getQueryData<SubjectCurriculum | null>(key);
    if (before) {
      qc.setQueryData(
        key,
        withObjectives(
          before,
          unit.id,
          kept.map((r) => ({
            id: r.id ?? r.key,
            description: r.text.trim(),
            bloomsLevel: r.id
              ? (original.get(r.id)?.bloomsLevel ?? null)
              : null,
          })),
        ),
      );
    }
    onClose();

    (async () => {
      for (const o of removed) {
        await callAction("delete-learning-objective", "POST", {
          id: o.id,
          confirm: true,
        });
      }
      for (const r of changed) {
        await callAction("update-learning-objective", "PUT", {
          id: r.id,
          description: r.text.trim(),
        });
      }
      for (const r of added) {
        await callAction("create-learning-objective", "POST", {
          unitId: unit.id,
          description: r.text.trim(),
        });
      }
    })()
      .catch((err: Error) => {
        if (before) qc.setQueryData(key, before);
        toast.error(`Could not save the objectives: ${err.message}`);
      })
      .finally(() => {
        qc.invalidateQueries({ queryKey: key });
        qc.invalidateQueries({ queryKey: ["curriculum-coverage"] });
      });
  };

  return (
    <div className="space-y-2">
      {rows.map((row, i) => (
        <div key={row.key} className="flex items-start gap-2">
          <span className="w-5 shrink-0 pt-2 text-sm tabular-nums text-muted-foreground">
            {i + 1}.
          </span>
          <Textarea
            value={row.text}
            rows={2}
            autoFocus={!row.id && i === rows.length - 1}
            placeholder="What learners will be able to do"
            className="min-h-0 flex-1 text-sm"
            onChange={(e) =>
              setRows((rs) =>
                rs.map((r) =>
                  r.key === row.key ? { ...r, text: e.target.value } : r,
                ),
              )
            }
          />
          <Button
            size="icon"
            variant="ghost"
            className="shrink-0 text-muted-foreground"
            aria-label={`Remove objective ${i + 1}`}
            onClick={() => setRows((rs) => rs.filter((r) => r.key !== row.key))}
          >
            <IconTrash size={15} />
          </Button>
        </div>
      ))}

      <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
        <Button
          size="sm"
          variant="ghost"
          className="-ml-2 text-muted-foreground"
          onClick={() => setRows((rs) => [...rs, { key: nanoid(), text: "" }])}
        >
          <IconPlus size={14} className="mr-1.5" />
          Add objective
        </Button>
        <div className="flex gap-2">
          <Button size="sm" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button
            size="sm"
            disabled={!dirty}
            onClick={() => (removed.length ? setConfirmOpen(true) : save())}
          >
            Save
          </Button>
        </div>
      </div>

      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Remove {removed.length} objective
              {removed.length === 1 ? "" : "s"}?
            </AlertDialogTitle>
            <AlertDialogDescription asChild>
              {/* Left-aligned: the dialog centres its text on narrow
                  screens, which set the bullets adrift from their lines. */}
              <div className="space-y-2 text-left">
                <ul className="list-disc space-y-1 pl-4">
                  {removed.map((o) => (
                    <li key={o.id}>{o.description}</li>
                  ))}
                </ul>
                <p>
                  Work already set keeps its own copy of these objectives.
                  Planning from now on will not include them.
                  {kept.length === 0
                    ? " This unit will have no objectives left."
                    : ""}
                </p>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep editing</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                setConfirmOpen(false);
                save();
              }}
            >
              Remove and save
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
