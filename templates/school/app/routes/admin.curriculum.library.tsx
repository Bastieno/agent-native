import { useQuery, useQueryClient } from "@tanstack/react-query";
import { agentNativePath } from "@agent-native/core/client";
import { useNavigationState } from "@/hooks/use-navigation-state";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { toast } from "sonner";
import {
  IconBook,
  IconChevronDown,
  IconDots,
  IconPlus,
  IconTrash,
  IconUpload,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";

async function callAction(name: string, body: object, method = "POST") {
  const res = await fetch(agentNativePath(`/_agent-native/actions/${name}`), {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error((json as any).error ?? `${name} failed`);
  return json;
}

type Objective = {
  id: string;
  code: string;
  codeGenerated: boolean;
  description: string;
  gradeLevel: string | null;
  source: string | null;
};

/**
 * What this school plans from.
 *
 * A school that imports three subjects over a term could see each one only
 * through the import it arrived in; nothing said "this is our syllabus". And a
 * line misread from a photograph could be corrected only by removing the whole
 * library and importing it again.
 *
 * Each objective shows where it came from, and whether its code is the
 * syllabus's own or one this app generated — which is the difference between a
 * reference a school can quote and one it cannot.
 */
export default function AdminCurriculumLibrary() {
  const { sync } = useNavigationState();
  const qc = useQueryClient();
  const [showSamples, setShowSamples] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [adding, setAdding] = useState<any>(null);
  const [removing, setRemoving] = useState<Objective | null>(null);
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({
    description: "",
    code: "",
    strand: "",
    gradeLevel: "",
    source: "",
  });

  useEffect(() => {
    sync({ role: "admin", view: "curriculum" });
  }, [sync]);

  // The school's own year groups. Typed freely, this field collected "JSS 1",
  // "jss1" and "Junior 1" — none of which match the year groups the rest of
  // the app plans with.
  const { data: gradeLevels = [] } = useQuery<any[]>({
    queryKey: ["grade-levels"],
    queryFn: async () => {
      const res = await fetch(
        agentNativePath("/_agent-native/actions/manage-grade-levels"),
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "list" }),
        },
      );
      if (!res.ok) return [];
      const json = await res.json();
      return Array.isArray(json) ? json : (json?.levels ?? []);
    },
  });

  const { data } = useQuery<any>({
    queryKey: ["school-library", showSamples],
    queryFn: async () => {
      const res = await fetch(
        agentNativePath(
          `/_agent-native/actions/get-school-library?includeSamples=${showSamples}`,
        ),
      );
      if (!res.ok) return null;
      return res.json();
    },
  });

  const libraries = data?.libraries ?? [];

  async function saveEdit() {
    setBusy(true);
    try {
      await callAction(
        "update-framework-objective",
        {
          id: editing.id,
          description: form.description,
          ...(form.code.trim() ? { code: form.code.trim() } : {}),
          gradeLevel: form.gradeLevel.trim() || null,
          source: form.source.trim() || null,
        },
        "PUT",
      );
      toast.success("Objective corrected");
      qc.invalidateQueries({ queryKey: ["school-library"] });
      setEditing(null);
    } catch (e: any) {
      toast.error(e.message ?? "Could not save");
    } finally {
      setBusy(false);
    }
  }

  async function saveNew() {
    setBusy(true);
    try {
      const res = await callAction("create-framework-objective", {
        frameworkId: adding.frameworkId,
        description: form.description,
        ...(form.code.trim() ? { code: form.code.trim() } : {}),
        ...(form.strand.trim() ? { strand: form.strand.trim() } : {}),
        ...(form.gradeLevel.trim()
          ? { gradeLevel: form.gradeLevel.trim() }
          : {}),
        ...(form.source.trim() ? { source: form.source.trim() } : {}),
      });
      toast.success(res.message ?? "Added");
      qc.invalidateQueries({ queryKey: ["school-library"] });
      setAdding(null);
    } catch (e: any) {
      toast.error(e.message ?? "Could not add it");
    } finally {
      setBusy(false);
    }
  }

  async function remove() {
    setBusy(true);
    try {
      await callAction("delete-framework-objective", {
        id: removing!.id,
        confirm: true,
      });
      toast.success("Objective removed");
      qc.invalidateQueries({ queryKey: ["school-library"] });
      setRemoving(null);
    } catch (e: any) {
      toast.error(e.message ?? "Could not remove it");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="h-full space-y-6 overflow-auto p-6 pb-24">
      <div>
        <h1 className="text-xl font-semibold">What we plan from</h1>
        <p className="mt-1 max-w-prose text-sm text-muted-foreground">
          {data
            ? libraries.length === 0
              ? "This school has not imported a syllabus of its own yet. Curriculum drafting falls back to the samples that ship with the app."
              : `${data.totalObjectives} objective(s) across ${libraries.length} librar${libraries.length === 1 ? "y" : "ies"}.`
            : "The syllabuses this school's curriculum is built from."}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Link
          to="/admin/curriculum/import"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground underline-offset-2 hover:text-foreground hover:underline"
        >
          <IconUpload size={14} />
          Import a syllabus
        </Link>
        <button
          type="button"
          onClick={() => setShowSamples((v) => !v)}
          className="text-xs text-muted-foreground underline-offset-2 hover:text-foreground hover:underline"
        >
          {showSamples
            ? "Hide the samples that ship with the app"
            : "Show the samples that ship with the app"}
        </button>
      </div>

      {libraries.length === 0 ? (
        <div className="rounded-lg border border-dashed p-10 text-center">
          <IconBook size={28} className="mx-auto mb-3 text-muted-foreground" />
          <p className="text-sm font-medium">No syllabus of your own yet</p>
          <p className="mx-auto mt-1 max-w-sm text-xs text-muted-foreground">
            Give the agent your curriculum — a document, or photographs of paper
            — and it appears here for you to check and correct.
          </p>
        </div>
      ) : (
        libraries.map((library: any) => (
          <div
            key={library.name}
            className="space-y-3 rounded-lg border p-4 sm:p-5"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <div className="min-w-0">
                <h2 className="text-sm font-semibold">{library.name}</h2>
                <p className="text-xs text-muted-foreground">
                  {library.version ? `${library.version} · ` : ""}
                  {library.source ?? "no source recorded"}
                </p>
              </div>
              {library.isSample ? (
                <Badge variant="outline" className="text-[11px]">
                  Sample — ships with the app
                </Badge>
              ) : (
                <Badge variant="secondary" className="text-[11px]">
                  Ours
                </Badge>
              )}
            </div>

            {library.subjects.map((subject: any) => (
              <Collapsible key={subject.frameworkId}>
                <CollapsibleTrigger className="group flex w-full items-center gap-2 rounded-md px-1 py-2 text-left hover:bg-muted/40">
                  <IconChevronDown
                    size={15}
                    className="shrink-0 text-muted-foreground transition-transform group-data-[state=open]:rotate-180"
                  />
                  <span className="min-w-0 flex-1 truncate text-sm font-medium">
                    {subject.subject ?? "All subjects"}
                  </span>
                  <span className="shrink-0 text-xs text-muted-foreground">
                    {subject.gradeRange ? `${subject.gradeRange} · ` : ""}
                    {subject.objectives} objective
                    {subject.objectives === 1 ? "" : "s"}
                  </span>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="space-y-3 py-2 pl-6">
                    {subject.strands.map((strand: any, si: number) => (
                      <div key={si} className="space-y-1.5">
                        {strand.strand ? (
                          <p className="text-xs font-medium text-muted-foreground">
                            {strand.strand}
                            {strand.subStrand ? ` · ${strand.subStrand}` : ""}
                          </p>
                        ) : null}
                        <div className="space-y-1.5 border-l-2 border-muted pl-3">
                          {strand.objectives.map((o: Objective) => (
                            <div key={o.id} className="flex items-start gap-2">
                              <div className="min-w-0 flex-1">
                                <p className="text-sm">{o.description}</p>
                                <p className="text-[11px] text-muted-foreground">
                                  <span
                                    className={cn(o.codeGenerated && "italic")}
                                    title={
                                      o.codeGenerated
                                        ? "Generated by the app — not a code from the syllabus"
                                        : "The syllabus's own code"
                                    }
                                  >
                                    {o.code}
                                    {o.codeGenerated ? " (ours)" : ""}
                                  </span>
                                  {o.gradeLevel ? ` · ${o.gradeLevel}` : ""}
                                  {o.source ? ` · ${o.source}` : ""}
                                </p>
                              </div>
                              {library.schoolOwned ? (
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button
                                      size="icon"
                                      variant="ghost"
                                      className="h-7 w-7 shrink-0"
                                      aria-label={`Options for ${o.code}`}
                                    >
                                      <IconDots size={15} />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem
                                      onSelect={() => {
                                        setEditing({
                                          ...o,
                                          subjectRange: subject.gradeRange,
                                        });
                                        setForm({
                                          description: o.description,
                                          code: o.codeGenerated ? "" : o.code,
                                          strand: strand.strand ?? "",
                                          gradeLevel: o.gradeLevel ?? "",
                                          source: o.source ?? "",
                                        });
                                      }}
                                    >
                                      Correct this objective
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      className="text-destructive focus:text-destructive"
                                      onSelect={() => setRemoving(o)}
                                    >
                                      <IconTrash size={14} className="mr-2" />
                                      Remove it
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              ) : null}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                    {library.schoolOwned ? (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="-ml-2 text-muted-foreground"
                        onClick={() => {
                          setAdding(subject);
                          // Not the subject's whole range: most objectives
                          // belong to one year, and the widest possible span
                          // is a poor thing to choose for someone.
                          setForm({
                            description: "",
                            code: "",
                            strand: "",
                            gradeLevel: "",
                            source: "",
                          });
                        }}
                      >
                        <IconPlus size={14} className="mr-1.5" />
                        Add an objective
                      </Button>
                    ) : null}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        ))
      )}

      <Dialog
        open={!!editing || !!adding}
        onOpenChange={(open) => {
          if (!open) {
            setEditing(null);
            setAdding(null);
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editing ? "Correct this objective" : "Add an objective"}
            </DialogTitle>
            <DialogDescription>
              Curricula already written keep the wording and codes they were
              built with. This changes what is planned from here.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <div className="space-y-1.5">
              <Label>What a learner will be able to do</Label>
              <Textarea
                rows={3}
                autoFocus
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
            </div>
            {adding ? (
              <div className="space-y-1.5">
                <Label>Strand (optional)</Label>
                <Input
                  value={form.strand}
                  onChange={(e) => setForm({ ...form, strand: e.target.value })}
                />
              </div>
            ) : null}
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label>The syllabus's code (optional)</Label>
                <Input
                  placeholder="Generated if left empty"
                  value={form.code}
                  onChange={(e) => setForm({ ...form, code: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <Label>Year group (optional)</Label>
                <Select
                  value={form.gradeLevel || "none"}
                  onValueChange={(v) =>
                    setForm({ ...form, gradeLevel: v === "none" ? "" : v })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Not specified" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Not specified</SelectItem>
                    {/* Whatever the subject covers, for an objective that
                        runs across the whole range. */}
                    {(adding?.gradeRange ?? editing?.subjectRange) &&
                    !gradeLevels.some(
                      (g: any) =>
                        g.name ===
                        (adding?.gradeRange ?? editing?.subjectRange),
                    ) ? (
                      <SelectItem
                        value={adding?.gradeRange ?? editing?.subjectRange}
                      >
                        {adding?.gradeRange ?? editing?.subjectRange}
                      </SelectItem>
                    ) : null}
                    {gradeLevels.map((g: any) => (
                      <SelectItem key={g.id} value={g.name}>
                        {g.name}
                      </SelectItem>
                    ))}
                    {/* Keep a value that was set before, rather than losing
                        it silently when it is not one of the above. */}
                    {form.gradeLevel &&
                    form.gradeLevel !==
                      (adding?.gradeRange ?? editing?.subjectRange) &&
                    !gradeLevels.some(
                      (g: any) => g.name === form.gradeLevel,
                    ) ? (
                      <SelectItem value={form.gradeLevel}>
                        {form.gradeLevel}
                      </SelectItem>
                    ) : null}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Where it came from (optional)</Label>
              <Input
                placeholder="Scheme 2026, p.14"
                value={form.source}
                onChange={(e) => setForm({ ...form, source: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setEditing(null);
                setAdding(null);
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={editing ? saveEdit : saveNew}
              disabled={busy || !form.description.trim()}
            >
              {busy ? "Saving…" : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={!!removing}
        onOpenChange={(open) => !open && setRemoving(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove this objective?</AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div className="space-y-2 text-left">
                <p>{removing?.description}</p>
                <p>
                  It stops appearing when planning from this syllabus. Curricula
                  already written are unchanged.
                </p>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep it</AlertDialogCancel>
            <AlertDialogAction onClick={remove} disabled={busy}>
              Remove it
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
