import { useNavigate, useParams } from "react-router";
import { BackLink } from "@/components/layout/BackLink";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { agentNativePath } from "@agent-native/core/client";
import { useNavigationState } from "@/hooks/use-navigation-state";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
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
import { toast } from "sonner";
import { IconAlertTriangle, IconEye, IconFlag } from "@tabler/icons-react";
import { AnswerReview } from "@/components/activity/AnswerReview";
import { Markdown } from "@/components/Markdown";
import {
  ActivityContent,
  headingFor,
} from "@/components/activity/ActivityContent";

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

export default function TeacherAssessment() {
  const { assessmentId } = useParams();
  const navigate = useNavigate();
  const { sync } = useNavigationState();
  const qc = useQueryClient();
  const [activeVariant, setActiveVariant] = useState<string | null>(null);
  // Whether the open variant is being shown as the class will see it.
  const [asStudent, setAsStudent] = useState(false);

  // Grading dialog
  const [gradingTarget, setGradingTarget] = useState<any>(null);
  const [gradeScore, setGradeScore] = useState("");
  const [gradeFeedback, setGradeFeedback] = useState("");
  const [gradeLoading, setGradeLoading] = useState(false);

  // Publish confirm
  const [publishOpen, setPublishOpen] = useState(false);
  const [publishLoading, setPublishLoading] = useState(false);

  const { data: assessment, isLoading: assessmentLoading } = useQuery({
    queryKey: ["assessment", assessmentId],
    queryFn: async () => {
      const res = await fetch(
        agentNativePath(
          `/_agent-native/actions/get-assessment?id=${assessmentId}`,
        ),
      );
      if (!res.ok) return null;
      // The endpoint returns { assessment, variants, submissionSummary }.
      const data = await res.json();
      return data?.assessment ?? null;
    },
    enabled: !!assessmentId,
  });

  const { data: variants = [] } = useQuery<any[]>({
    queryKey: ["variants", assessmentId],
    queryFn: async () => {
      const res = await fetch(
        agentNativePath(
          `/_agent-native/actions/list-variants?assessmentId=${assessmentId}`,
        ),
      );
      if (!res.ok) return [];
      return res.json();
    },
    enabled: !!assessmentId,
  });

  const { data: submissions = [] } = useQuery<any[]>({
    queryKey: ["submissions", assessmentId],
    queryFn: async () => {
      const res = await fetch(
        agentNativePath(
          `/_agent-native/actions/list-submissions?assessmentId=${assessmentId}`,
        ),
      );
      if (!res.ok) return [];
      return res.json();
    },
    enabled: !!assessmentId,
  });

  useEffect(() => {
    if (!assessmentId) return;
    const variantId = activeVariant ?? undefined;
    sync({ role: "teacher", view: "assessment", assessmentId, variantId });
  }, [sync, assessmentId, activeVariant]);

  const statusColor: Record<string, string> = {
    draft: "secondary",
    published: "default",
    closed: "outline",
  };

  const submittedCount = submissions.filter(
    (s: any) => s.status === "submitted",
  ).length;
  const gradedCount = submissions.filter(
    (s: any) => s.status === "graded",
  ).length;

  // The list row does not carry the per-question detail; this does.
  const { data: gradingDetail } = useQuery({
    queryKey: ["submission", gradingTarget?.id],
    queryFn: async () => {
      const res = await fetch(
        agentNativePath(
          `/_agent-native/actions/get-submission?id=${gradingTarget.id}`,
        ),
      );
      if (!res.ok) return null;
      return res.json();
    },
    enabled: !!gradingTarget?.id,
  });

  // Total what the answers earned, so the teacher confirms a number rather
  // than adding it up themselves.
  useEffect(() => {
    const answers = gradingDetail?.answers;
    if (!answers?.length || gradeScore !== "") return;
    const sum = answers.reduce(
      (total: number, a: any) => total + (a.awardedPoints ?? 0),
      0,
    );
    setGradeScore(String(sum));
  }, [gradingDetail, gradeScore]);

  const gradingVariant = gradingTarget
    ? variants.find((v: any) => v.id === gradingTarget.variantId)
    : null;
  const maxPoints = gradingTarget?.maxScore ?? assessment?.totalPoints ?? null;

  function openGrading(sub: any) {
    setGradingTarget(sub);
    setGradeScore(sub.score != null ? String(sub.score) : "");
    setGradeFeedback(sub.feedback ?? "");
  }

  async function handleSaveGrade() {
    if (!gradingTarget) return;
    setGradeLoading(true);
    try {
      await callAction("grade-submission", {
        submissionId: gradingTarget.id,
        score: Number(gradeScore),
        feedback: gradeFeedback,
      });
      qc.invalidateQueries({ queryKey: ["submissions", assessmentId] });
      qc.invalidateQueries({ queryKey: ["gradebook"] });
      toast.success("Grade saved");
      setGradingTarget(null);
    } catch (e: any) {
      toast.error(e.message ?? "Failed to save grade");
    } finally {
      setGradeLoading(false);
    }
  }

  async function handlePublishGrades() {
    setPublishLoading(true);
    try {
      await callAction("publish-grades", { assessmentId });
      qc.invalidateQueries({ queryKey: ["submissions", assessmentId] });
      toast.success("Grades published — students can now see their scores");
      setPublishOpen(false);
    } catch (e: any) {
      toast.error(e.message ?? "Failed to publish grades");
    } finally {
      setPublishLoading(false);
    }
  }

  if (assessmentLoading) {
    return (
      <div className="p-6">
        <p className="text-sm text-muted-foreground">Loading…</p>
      </div>
    );
  }

  if (!assessment) {
    return (
      <div className="p-6">
        <div className="rounded-lg border border-dashed p-10 text-center">
          <IconAlertTriangle
            size={28}
            className="mx-auto mb-2 text-muted-foreground"
          />
          <p className="text-sm font-medium">This activity no longer exists</p>
          <p className="mx-auto mt-1 max-w-sm text-xs text-muted-foreground">
            It may have been deleted, or the link may be out of date. Anything
            students handed in was removed with it.
          </p>
          <Button
            size="sm"
            variant="outline"
            className="mt-4"
            onClick={() => navigate("/teacher/classes")}
          >
            Back to my classes
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-auto p-6 space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          {assessment?.classId ? (
            <BackLink to={`/teacher/classes/${assessment.classId}`}>
              {assessment.className ?? "Back to the class"}
            </BackLink>
          ) : null}
          <h1 className="text-xl font-semibold break-words">
            {assessment?.title ?? "Assessment"}
          </h1>
          {/* One quiet line rather than a row of badges: what kind of work it
              is, and any clock on it. */}
          {(() => {
            const meta = [
              assessment?.format,
              assessment?.dueDate ? `Due ${assessment.dueDate}` : null,
              assessment?.durationMinutes
                ? `${assessment.durationMinutes} min once started`
                : null,
              assessment?.closesAt
                ? `Closes ${new Date(assessment.closesAt).toLocaleString()}`
                : null,
            ].filter(Boolean);
            return meta.length ? (
              <p className="text-xs text-muted-foreground mt-0.5">
                {meta.join(" · ")}
              </p>
            ) : null;
          })()}
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {gradedCount > 0 && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => setPublishOpen(true)}
            >
              Publish Grades
            </Button>
          )}
          {assessment && (
            <Badge variant={statusColor[assessment.status] as any}>
              {assessment.status}
            </Badge>
          )}
        </div>
      </div>

      <div className="flex gap-4 text-sm">
        <div className="text-center">
          <p className="text-xl font-semibold">{submittedCount}</p>
          <p className="text-xs text-muted-foreground">Submitted</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-semibold">{gradedCount}</p>
          <p className="text-xs text-muted-foreground">Graded</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-semibold">{variants.length}</p>
          <p className="text-xs text-muted-foreground">Variants</p>
        </div>
      </div>

      <Tabs defaultValue="variants">
        <TabsList>
          <TabsTrigger value="variants">Variants</TabsTrigger>
          <TabsTrigger value="submissions">Submissions</TabsTrigger>
        </TabsList>
        <TabsContent value="variants" className="mt-4 space-y-3">
          {variants.length === 0 ? (
            <div className="rounded-lg border border-dashed p-8 text-center">
              <p className="text-sm font-medium">No variants yet</p>
              <p className="text-xs text-muted-foreground mt-1">
                Ask the agent to create variants (e.g. "create hard, medium, and
                easy versions").
              </p>
            </div>
          ) : (
            <div className="grid gap-3">
              {variants.map((variant: any) => {
                const open = activeVariant === variant.id;
                return (
                  <div
                    key={variant.id}
                    className={`min-w-0 rounded-lg border transition-colors ${
                      open ? "border-primary" : "hover:border-primary/40"
                    }`}
                  >
                    {/* Only the header is a button: the body can hold cards
                        and other controls, which cannot nest inside one. */}
                    <button
                      type="button"
                      onClick={() => setActiveVariant(open ? null : variant.id)}
                      aria-expanded={open}
                      className={`w-full space-y-2 p-4 text-left ${
                        open ? "bg-primary/5" : ""
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">
                          {variant.label}
                        </span>
                        <Badge variant="outline" className="text-xs capitalize">
                          {variant.difficulty}
                        </Badge>
                        <span className="ml-auto text-xs text-muted-foreground">
                          {variant.totalPoints} pts
                        </span>
                      </div>
                      {variant.instructions && (
                        <p className="line-clamp-2 text-xs text-muted-foreground">
                          {variant.instructions}
                        </p>
                      )}
                    </button>

                    {open && (variant.content || variant.contentJson) ? (
                      <div className="space-y-3 border-t p-4">
                        {/* The teacher's own view shows hints and card backs
                            outright; flipping to the learner's view uses the
                            very same renderer, so it cannot drift from what
                            the class actually gets. */}
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-medium text-muted-foreground">
                            {headingFor(assessment?.renderAs)}
                          </span>
                          <Button
                            size="sm"
                            variant={asStudent ? "default" : "outline"}
                            onClick={() => setAsStudent((v) => !v)}
                          >
                            <IconEye size={14} className="mr-1.5" />
                            {asStudent
                              ? "Seeing it as a student"
                              : "View as student"}
                          </Button>
                        </div>
                        <ActivityContent
                          contentJson={variant.contentJson}
                          markdown={variant.content}
                          audience={asStudent ? "student" : "teacher"}
                        />
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          )}
        </TabsContent>
        <TabsContent value="submissions" className="mt-4 space-y-2">
          {submissions.length === 0 ? (
            <p className="text-sm text-muted-foreground">No submissions yet.</p>
          ) : (
            submissions.map((sub: any) => (
              <button
                key={sub.id}
                onClick={() => openGrading(sub)}
                className="w-full flex items-center justify-between rounded-lg border p-3 hover:bg-accent/50 transition-colors text-left"
              >
                <div className="min-w-0">
                  <p className="flex items-center gap-2 text-sm font-medium">
                    <span className="truncate">
                      {sub.studentName ?? sub.studentEmail ?? sub.studentId}
                    </span>
                    {/* Which papers want a second look, before opening any. */}
                    {sub.flaggedCount || sub.unmarkedCount ? (
                      <Badge variant="destructive" className="gap-1 text-xs">
                        <IconFlag size={10} />
                        {(sub.flaggedCount ?? 0) + (sub.unmarkedCount ?? 0)}
                      </Badge>
                    ) : null}
                  </p>
                  {sub.score != null && (
                    <p className="text-xs text-muted-foreground">
                      Score: {sub.score} /{" "}
                      {sub.maxScore ?? assessment?.totalPoints ?? "—"}
                    </p>
                  )}
                </div>
                <Badge
                  variant={sub.status === "graded" ? "default" : "secondary"}
                  className="text-xs"
                >
                  {sub.status}
                </Badge>
              </button>
            ))
          )}
        </TabsContent>
      </Tabs>

      {/* Grading Dialog */}
      <Dialog
        open={!!gradingTarget}
        onOpenChange={(o) => !o && setGradingTarget(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Grade —{" "}
              {gradingTarget?.studentName ??
                gradingTarget?.studentEmail ??
                gradingTarget?.studentId}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2 max-h-[70vh] overflow-y-auto">
            {gradingDetail?.answers?.length ? (
              <AnswerReview
                answers={gradingDetail.answers}
                onChanged={(newTotal) => {
                  setGradeScore(String(newTotal));
                  qc.invalidateQueries({
                    queryKey: ["submissions", assessmentId],
                  });
                }}
              />
            ) : null}
            {!gradingDetail?.answers?.length && gradingVariant?.content ? (
              <div className="space-y-1.5">
                <Label className="text-muted-foreground">
                  Question ({gradingVariant.label})
                </Label>
                <div className="rounded-md border bg-muted/30 p-3">
                  <Markdown>{gradingVariant.content}</Markdown>
                </div>
              </div>
            ) : null}
            <div
              className="space-y-1.5"
              hidden={!!gradingDetail?.answers?.length}
            >
              <Label className="text-muted-foreground">Student answer</Label>
              <div className="rounded-md border p-3">
                {gradingTarget?.content ? (
                  <Markdown>{gradingTarget.content}</Markdown>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No written answer.
                  </p>
                )}
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>
                Score
                {maxPoints ? ` (out of ${maxPoints})` : ""}
              </Label>
              <Input
                type="number"
                min={0}
                max={maxPoints ?? undefined}
                placeholder={maxPoints ? `/ ${maxPoints}` : "Score"}
                value={gradeScore}
                onChange={(e) => setGradeScore(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Feedback</Label>
              <Textarea
                placeholder="Write feedback for the student…"
                className="min-h-24 resize-none"
                value={gradeFeedback}
                onChange={(e) => setGradeFeedback(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setGradingTarget(null)}>
              Cancel
            </Button>
            <Button
              onClick={handleSaveGrade}
              disabled={gradeLoading || !gradeScore}
            >
              {gradeLoading ? "Saving…" : "Save Grade"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Publish Grades AlertDialog */}
      <AlertDialog open={publishOpen} onOpenChange={setPublishOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Publish grades?</AlertDialogTitle>
            <AlertDialogDescription>
              All {gradedCount} graded submission{gradedCount !== 1 ? "s" : ""}{" "}
              will become visible to students immediately.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handlePublishGrades}
              disabled={publishLoading}
            >
              {publishLoading ? "Publishing…" : "Publish"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
