import { useNavigationState } from "@/hooks/use-navigation-state";
import { useSchoolConfig } from "@/hooks/use-school-config";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { agentNativePath } from "@agent-native/core/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
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
import { toast } from "sonner";
import { IconSettings, IconDeviceFloppy } from "@tabler/icons-react";
import { SchoolCrestField } from "@/components/SchoolCrestField";
import { useSchoolDates } from "@/hooks/use-school-dates";
import { describeField, entityPhrase } from "@shared/custom-field-words";

async function callAction(name: string, params: Record<string, unknown>) {
  const res = await fetch(agentNativePath(`/_agent-native/actions/${name}`), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as any).error ?? "Request failed");
  }
  return res.json();
}

export default function AdminSettings() {
  const { sync } = useNavigationState();
  const { config } = useSchoolConfig();
  const { formatDateTime } = useSchoolDates();
  const qc = useQueryClient();

  // School Guide state
  const [guideContent, setGuideContent] = useState("");
  const [guideSaving, setGuideSaving] = useState(false);

  useEffect(() => {
    sync({ role: "admin", view: "settings" });
  }, [sync]);

  const { data: guideData } = useQuery<{
    content: string | null;
    updatedAt: string | null;
  }>({
    queryKey: ["school-guide"],
    queryFn: async () => {
      const res = await fetch(
        agentNativePath("/_agent-native/actions/get-school-resource"),
      );
      if (!res.ok) return { content: null, updatedAt: null };
      return res.json();
    },
  });

  // Populate textarea when data loads (only if user hasn't started editing)
  useEffect(() => {
    if (guideData?.content !== undefined && guideContent === "") {
      setGuideContent(guideData.content ?? "");
    }
  }, [guideData?.content]);

  // Starting from a draft built out of the school's own data: correcting one
  // takes minutes, and writing a guide from an empty box does not happen.
  const [drafting, setDrafting] = useState(false);
  const [confirmDraft, setConfirmDraft] = useState(false);

  async function loadDraftGuide() {
    setDrafting(true);
    try {
      const res = await fetch(
        agentNativePath("/_agent-native/actions/draft-school-guide"),
      );
      if (!res.ok) throw new Error("Could not build a draft");
      const json = await res.json();
      setGuideContent(json.draft ?? "");
      toast.success(
        json.questionCount
          ? `Draft ready — ${json.questionCount} question(s) to answer before saving`
          : "Draft ready",
      );
    } catch (e: any) {
      toast.error(e.message ?? "Could not build a draft");
    } finally {
      setDrafting(false);
      setConfirmDraft(false);
    }
  }

  // The Terms and Custom Fields tabs told you to ask the agent and showed
  // nothing else — so an admin could not see the year, the terms or the
  // fields their school already has, and the agent describing them sounded
  // like it was describing this page.
  const { data: years = [] } = useQuery<any[]>({
    queryKey: ["academic-years"],
    queryFn: async () => {
      const res = await fetch(
        agentNativePath("/_agent-native/actions/list-academic-years"),
      );
      if (!res.ok) return [];
      return res.json();
    },
  });
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
  const { data: fieldSchema } = useQuery<Record<string, any[]>>({
    queryKey: ["custom-fields-schema"],
    queryFn: async () => {
      const res = await fetch(
        agentNativePath("/_agent-native/actions/get-custom-fields-schema"),
      );
      if (!res.ok) return {};
      return res.json();
    },
  });

  async function handleSaveGuide() {
    if (!guideContent.trim()) return;
    setGuideSaving(true);
    try {
      await callAction("update-school-resource", { content: guideContent });
      qc.invalidateQueries({ queryKey: ["school-guide"] });
      toast.success("School Guide saved");
    } catch (e: any) {
      toast.error(e.message ?? "Failed to save School Guide");
    } finally {
      setGuideSaving(false);
    }
  }

  return (
    // Settings is prose and short rows, so it keeps a readable column: across
    // a 2000px display a heading and its help text ended up at opposite ends
    // of the screen, reading as two unrelated things.
    <div className="h-full overflow-auto p-6">
      <div className="max-w-3xl space-y-4">
        <div>
          <h1 className="text-xl font-semibold">School Settings</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Configure your school's grading system, terminology, and structure.
          </p>
        </div>
        <Tabs defaultValue="grading">
          <TabsList>
            <TabsTrigger value="grading">Grading</TabsTrigger>
            <TabsTrigger value="terms">Terms</TabsTrigger>
            <TabsTrigger value="custom-fields">Custom Fields</TabsTrigger>
            <TabsTrigger value="labels">Terminology</TabsTrigger>
            <TabsTrigger value="branding">Branding</TabsTrigger>
            <TabsTrigger value="guide">School Guide</TabsTrigger>
          </TabsList>

          <TabsContent value="branding" className="mt-4 space-y-4">
            <div className="space-y-3 rounded-lg border bg-card p-4">
              <SchoolCrestField
                currentLogoUrl={(config as any)?.theme?.logoUrl ?? null}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              The crest is stored with this school's settings, so it appears
              only for this school. Colours and the display name are set by
              asking the agent.
            </p>
          </TabsContent>

          <TabsContent value="grading" className="mt-4 space-y-4">
            <div className="rounded-lg border bg-card p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">Grading Scale</h3>
                <Badge variant="outline">{config.gradingScale.type}</Badge>
              </div>
              <div className="space-y-1">
                {config.gradingScale.levels.map((level) => (
                  <div
                    key={level.grade}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="font-medium w-8">{level.grade}</span>
                    <span className="text-muted-foreground">
                      {level.min}% – {level.max}%
                    </span>
                    {level.label && (
                      <span className="text-muted-foreground text-xs">
                        {level.label}
                      </span>
                    )}
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">
                Use the agent to update your grading scale.
              </p>
            </div>
            <div className="rounded-lg border bg-card p-4 space-y-2">
              <h3 className="text-sm font-medium">Pass Mark</h3>
              <p className="text-2xl font-semibold">{config.passMark}%</p>
            </div>
          </TabsContent>

          <TabsContent value="terms" className="mt-4">
            <div className="space-y-3 rounded-lg border bg-card p-4">
              <h3 className="text-sm font-medium">
                {(config.termStructure ?? "terms") === "terms"
                  ? "Terms"
                  : config.termStructure}
              </h3>

              {years.length === 0 ? (
                <p className="text-xs text-muted-foreground">
                  No academic year yet. Until one exists with its terms, a term
                  has no length — schemes of work and the calendar have no weeks
                  to count.
                </p>
              ) : (
                <div className="space-y-3">
                  {years.map((year: any) => {
                    const mine = terms
                      .filter((t: any) => t.academicYearId === year.id)
                      .sort((a: any, b: any) => a.sequence - b.sequence);
                    return (
                      <div key={year.id} className="space-y-1.5">
                        <div className="flex flex-wrap items-baseline gap-2">
                          <p className="text-sm font-medium">{year.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {year.startDate} – {year.endDate}
                          </p>
                          {year.status === "active" ? (
                            <Badge variant="secondary" className="text-[11px]">
                              Current
                            </Badge>
                          ) : null}
                        </div>
                        {mine.length === 0 ? (
                          <p className="text-xs text-muted-foreground">
                            No terms in this year yet.
                          </p>
                        ) : (
                          <div className="divide-y rounded-md border">
                            {mine.map((term: any) => {
                              const today = new Date()
                                .toISOString()
                                .slice(0, 10);
                              const current =
                                term.startDate <= today &&
                                term.endDate >= today;
                              return (
                                <div
                                  key={term.id}
                                  className="flex flex-wrap items-baseline gap-x-2 px-3 py-2"
                                >
                                  <span className="text-sm">{term.name}</span>
                                  <span className="text-xs text-muted-foreground">
                                    {term.startDate} – {term.endDate}
                                  </span>
                                  {current ? (
                                    <Badge className="ml-auto text-[11px]">
                                      This term
                                    </Badge>
                                  ) : null}
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              <p className="text-xs text-muted-foreground">
                Examination weeks kept at the end of each term:{" "}
                {typeof config.examWeeksPerTerm === "number"
                  ? config.examWeeksPerTerm
                  : "not set — one week is assumed"}
              </p>
              <p className="text-xs text-muted-foreground">
                Ask the agent to add a year, add a term, or change dates.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="custom-fields" className="mt-4">
            <div className="space-y-3 rounded-lg border bg-card p-4">
              <div className="space-y-1">
                <h3 className="text-sm font-medium">Custom Fields</h3>
                {/* What these are stays on the page once there are some. The
                  explanation used to live in the empty state alone, so the
                  moment a school added its first field it lost the only
                  sentence saying what fields are for and where they turn up. */}
                <p className="text-xs text-muted-foreground">
                  Extra details this school keeps on its own records. Each one
                  appears on whatever it belongs to — a House on a student, a
                  syllabus reference on a lesson note — and the agent can fill
                  it in and read it back.
                </p>
              </div>
              {(() => {
                const entries = Object.entries(fieldSchema ?? {}).filter(
                  ([, fields]) => Array.isArray(fields) && fields.length > 0,
                );
                if (entries.length === 0) {
                  return (
                    <p className="text-xs text-muted-foreground">
                      None yet. Ask the agent for one, such as "add a House
                      field to students with options Phoenix, Eagle, Lion,
                      Shark".
                    </p>
                  );
                }
                return entries.map(([entity, fields]) => (
                  <div key={entity} className="space-y-1.5">
                    <p className="text-xs font-medium text-muted-foreground">
                      {entityPhrase(entity, (key) =>
                        key === "student" || key === "teacher"
                          ? (config.customLabels?.[key] ?? key)
                          : key.replace(/_/g, " "),
                      )}
                    </p>
                    <div className="divide-y rounded-md border">
                      {(fields as any[]).map((f: any) => (
                        <div
                          key={f.name}
                          className="flex flex-wrap items-baseline gap-x-2 px-3 py-2"
                        >
                          <span className="text-sm">{f.label ?? f.name}</span>
                          {/* The school's own sentence, not the stored shape:
                            "one of Science, Arts or Commercial", never
                            "enum: Science, Arts, Commercial". */}
                          <span className="text-xs text-muted-foreground">
                            {describeField(f, config.locale)}
                          </span>
                          {f.required ? (
                            <span className="text-xs text-muted-foreground">
                              · required
                            </span>
                          ) : null}
                        </div>
                      ))}
                    </div>
                  </div>
                ));
              })()}
              <p className="text-xs text-muted-foreground">
                Ask the agent to add or remove a field, e.g. "add a House field
                to students with options Phoenix, Eagle, Lion, Shark".
              </p>
            </div>
          </TabsContent>

          <TabsContent value="labels" className="mt-4">
            <div className="rounded-lg border bg-card p-4 space-y-3">
              <h3 className="text-sm font-medium">Terminology Overrides</h3>
              {Object.keys(config.customLabels).length === 0 ? (
                <p className="text-xs text-muted-foreground">
                  No custom labels set. Ask the agent to set custom terminology,
                  e.g. "call students 'learners' and teachers 'educators'".
                </p>
              ) : (
                <div className="space-y-1">
                  {Object.entries(config.customLabels).map(([key, value]) => (
                    <div key={key} className="flex items-center gap-2 text-sm">
                      <span className="text-muted-foreground">{key}</span>
                      <span>→</span>
                      <span className="font-medium">{value as string}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="guide" className="mt-4 space-y-3">
            <div className="rounded-lg border bg-card p-4 space-y-3">
              <div>
                <h3 className="text-sm font-medium">School Guide</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  This markdown document tells the agent about your school —
                  identity, pedagogy, curriculum frameworks, grading
                  conventions, and terminology. The agent reads it at the start
                  of every curriculum, grading, and analytics session.
                </p>
              </div>
              <div className="space-y-1.5">
                {/* The tip used to name three terms of about thirteen weeks
                  and a handful of exam boards — defaults dressed as advice,
                  in a box meant for the school's own conventions. */}
                <p className="text-xs text-muted-foreground">
                  Write it in your school's own terms. "Start from a draft"
                  fills this in from what the app already knows about your
                  school and marks what it cannot know, for you to answer.
                </p>
                <Textarea
                  className="font-mono text-xs min-h-80 resize-y"
                  placeholder="Start from a draft, or write your own — year groups, how the year is divided, marking, curriculum, subjects, the words your school uses, and anything the agent should always or never do."
                  value={guideContent}
                  onChange={(e) => setGuideContent(e.target.value)}
                />
              </div>
              {guideData?.updatedAt && (
                <p className="text-xs text-muted-foreground">
                  Last updated: {formatDateTime(guideData.updatedAt)}
                </p>
              )}
              <div className="flex flex-wrap justify-end gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  disabled={drafting}
                  onClick={() =>
                    guideContent.trim()
                      ? setConfirmDraft(true)
                      : loadDraftGuide()
                  }
                >
                  {drafting ? "Building…" : "Start from a draft"}
                </Button>
                <Button
                  size="sm"
                  onClick={handleSaveGuide}
                  disabled={guideSaving || !guideContent.trim()}
                >
                  <IconDeviceFloppy size={14} className="mr-1.5" />
                  {guideSaving ? "Saving…" : "Save Guide"}
                </Button>
              </div>
            </div>
            <AlertDialog open={confirmDraft} onOpenChange={setConfirmDraft}>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Replace what is written here?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    The draft replaces the text in the editor. Nothing is saved
                    until you press Save Guide, so the guide your school is
                    using stays as it is until then.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Keep what I have</AlertDialogCancel>
                  <AlertDialogAction onClick={loadDraftGuide}>
                    Replace with a draft
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <div className="rounded-lg border bg-muted/40 p-3">
              <p className="text-xs text-muted-foreground">
                <strong>Pro tip:</strong> You can also ask the agent to update
                the School Guide for you — e.g. "update the school guide to note
                that we follow WAEC for SSS certification and use Common Core
                for Mathematics".
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
