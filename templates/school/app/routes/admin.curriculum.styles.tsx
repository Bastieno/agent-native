import { useQuery, useQueryClient } from "@tanstack/react-query";
import { agentNativePath } from "@agent-native/core/client";
import { useNavigationState } from "@/hooks/use-navigation-state";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Badge } from "@/components/ui/badge";
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
import { toast } from "sonner";
import {
  IconChevronDown,
  IconChevronLeft,
  IconWriting,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";

async function callAction(name: string, body: object) {
  const res = await fetch(agentNativePath(`/_agent-native/actions/${name}`), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error((json as any).error ?? `${name} failed`);
  return json;
}

type Style = {
  id: string;
  name: string;
  subject: string | null;
  region: string | null;
  isSample: boolean;
  ownedByThisSchool: boolean;
  derivedFrom: string | null;
  usedBy: string[];
};

const NONE = "__none__";

/**
 * How this school words its questions, subject by subject.
 *
 * The sibling of "what we plan from": the curriculum decides what is asked,
 * this decides how the asking sounds. A school preparing for WAEC wants its
 * Friday exercise to read like WAEC, not like a textbook quiz — and a school
 * that wants none of this is left alone, which is why no style is the honest
 * default rather than a failure.
 *
 * The subjects come first and the styles second, because the question an
 * admin arrives with is "which of my subjects are not covered", not "what
 * styles exist".
 */
export default function AdminCurriculumStyles() {
  const { sync } = useNavigationState();
  const qc = useQueryClient();
  const [saving, setSaving] = useState<string | null>(null);

  useEffect(() => {
    // The library and import pages do the same: the agent is told the area,
    // not which of its pages — a limit worth lifting when the union is next
    // widened.
    sync({ role: "admin", view: "curriculum" });
  }, [sync]);

  const { data, isLoading } = useQuery<{
    styles: Style[];
    subjectsWithStyle: Array<{ subject: string; style: string }>;
    subjectsWithoutStyle: string[];
    message: string;
  } | null>({
    queryKey: ["assessment-styles"],
    queryFn: async () => {
      const res = await fetch(
        agentNativePath("/_agent-native/actions/list-assessment-styles"),
      );
      if (!res.ok) return null;
      return res.json();
    },
  });

  const { data: subjects } = useQuery<any[]>({
    queryKey: ["subjects"],
    queryFn: async () => {
      const res = await fetch(
        agentNativePath("/_agent-native/actions/list-subjects"),
      );
      if (!res.ok) return [];
      const json = await res.json();
      return Array.isArray(json) ? json : (json.subjects ?? []);
    },
  });

  const styles = data?.styles ?? [];
  const styleFor = (subjectName: string) =>
    styles.find((s) => s.usedBy.includes(subjectName)) ?? null;

  /**
   * Every style is offerable; the ones read from another subject's papers say
   * so.
   *
   * Matching on the subject's name alone dead-ended this page: the sample is
   * called "General Mathematics" and the school calls the subject
   * "Mathematics", so the control greyed out with nothing to pick and no way
   * to say why. A school is not wrong to use its own names, and whether one
   * subject's habits suit another is a judgement for the person reading the
   * screen.
   */
  const choicesFor = (subjectName: string) => {
    const exact = styles.filter((s) => !s.subject || s.subject === subjectName);
    const others = styles.filter((s) => s.subject && s.subject !== subjectName);
    return { exact, others };
  };

  const choose = async (subject: any, styleId: string) => {
    setSaving(subject.id);
    try {
      const res: any = await callAction("set-subject-assessment-style", {
        subjectId: subject.id,
        ...(styleId === NONE ? { styleName: "none" } : { styleId }),
      });
      toast.success(res.message ?? "Saved");
      qc.invalidateQueries({ queryKey: ["assessment-styles"] });
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setSaving(null);
    }
  };

  const active = (subjects ?? []).filter((s: any) => s.status !== "archived");
  const missing = data?.subjectsWithoutStyle?.length ?? 0;

  return (
    <div className="h-full space-y-6 overflow-auto p-6 pb-24">
      <div>
        <Link
          to="/admin/curriculum"
          className="mb-1 inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          <IconChevronLeft size={14} />
          Curriculum
        </Link>
        <h1 className="text-xl font-semibold">How we word questions</h1>
        <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
          The curriculum decides what is asked. This decides how it sounds — how
          long a question runs, how many options it has, how often one is
          negated, how the wrong answers are built. It applies to every exercise
          and test, not only to mock papers.
        </p>
      </div>

      {missing > 0 ? (
        <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-4">
          <p className="text-sm font-medium">
            {missing} subject{missing === 1 ? "" : "s"} have no style set
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Their questions are written without any house habits, so they will
            read like a textbook quiz rather than like the exam your pupils
            actually sit. Set one below, or ask the agent — &ldquo;we are a WAEC
            school&rdquo; is enough for the subjects it covers.
          </p>
        </div>
      ) : null}

      <div className="space-y-2">
        <h2 className="text-xs font-medium text-muted-foreground">
          Your subjects
        </h2>
        {isLoading ? (
          <p className="text-sm text-muted-foreground">Loading…</p>
        ) : (
          <div className="divide-y rounded-lg border">
            {active.map((subject: any) => {
              const current = styleFor(subject.name);
              const choices = choicesFor(subject.name);
              return (
                <div
                  key={subject.id}
                  className="flex flex-col gap-2 p-3 sm:flex-row sm:items-center"
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">
                      {subject.name}
                    </p>
                    {current ? (
                      <p className="truncate text-xs text-muted-foreground">
                        {current.subject && current.subject !== subject.name
                          ? `Read from ${current.subject} papers`
                          : (current.derivedFrom ?? "Set for this school")}
                      </p>
                    ) : (
                      <p className="text-xs text-muted-foreground">
                        No style set
                      </p>
                    )}
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    {current?.isSample ? (
                      <Badge variant="outline" className="text-[11px]">
                        Sample
                      </Badge>
                    ) : null}
                    <Select
                      value={current?.id ?? NONE}
                      disabled={saving === subject.id || styles.length === 0}
                      onValueChange={(v) => choose(subject, v)}
                    >
                      <SelectTrigger className="h-8 w-full text-sm sm:w-56">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={NONE}>No style</SelectItem>
                        {choices.exact.map((s) => (
                          <SelectItem key={s.id} value={s.id}>
                            {s.name}
                          </SelectItem>
                        ))}
                        {choices.others.length ? (
                          <>
                            <div className="px-2 py-1.5 text-[11px] text-muted-foreground">
                              Read from another subject
                            </div>
                            {choices.others.map((s) => (
                              <SelectItem key={s.id} value={s.id}>
                                {s.name} · {s.subject}
                              </SelectItem>
                            ))}
                          </>
                        ) : null}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* What each style actually says, for anyone who wants to check before
          trusting it. Collapsed, because most people never will. */}
      <div className="space-y-2">
        <h2 className="text-xs font-medium text-muted-foreground">
          Styles available
        </h2>
        <div className="divide-y rounded-lg border">
          {styles.map((style) => (
            <Collapsible key={style.id}>
              <CollapsibleTrigger className="group flex w-full items-center gap-3 p-3 text-left">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">
                    {style.name}
                    {style.subject ? (
                      <span className="font-normal text-muted-foreground">
                        {" "}
                        · {style.subject}
                      </span>
                    ) : null}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {style.usedBy.length
                      ? `Used by ${style.usedBy.join(", ")}`
                      : "Not used by any subject"}
                  </p>
                </div>
                {style.isSample ? (
                  <Badge variant="outline" className="shrink-0 text-[11px]">
                    Sample
                  </Badge>
                ) : null}
                <IconChevronDown
                  size={16}
                  className={cn(
                    "shrink-0 text-muted-foreground transition-transform",
                    "group-data-[state=open]:rotate-180",
                  )}
                />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="space-y-1 px-3 pb-3 text-xs text-muted-foreground">
                  {style.derivedFrom ? <p>{style.derivedFrom}</p> : null}
                  {style.isSample ? (
                    <p>
                      Ships with the app and is shared by every school. A style
                      built from this school&rsquo;s own past papers would fit
                      better.
                    </p>
                  ) : null}
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
          {styles.length === 0 ? (
            <div className="p-6 text-center">
              <IconWriting
                size={28}
                className="mx-auto mb-2 text-muted-foreground"
              />
              <p className="text-sm">No styles available yet</p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
