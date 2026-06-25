import { useParams } from "react-router";
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
import { IconAlertTriangle } from "@tabler/icons-react";

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
  const { sync } = useNavigationState();
  const qc = useQueryClient();
  const [activeVariant, setActiveVariant] = useState<string | null>(null);

  // Grading dialog
  const [gradingTarget, setGradingTarget] = useState<any>(null);
  const [gradeScore, setGradeScore] = useState("");
  const [gradeFeedback, setGradeFeedback] = useState("");
  const [gradeLoading, setGradeLoading] = useState(false);

  // Publish confirm
  const [publishOpen, setPublishOpen] = useState(false);
  const [publishLoading, setPublishLoading] = useState(false);

  const { data: assessment } = useQuery({
    queryKey: ["assessment", assessmentId],
    queryFn: async () => {
      const res = await fetch(
        agentNativePath(`/api/school/assessments/${assessmentId}`),
      );
      if (!res.ok) return null;
      return res.json();
    },
    enabled: !!assessmentId,
  });

  const { data: variants = [] } = useQuery<any[]>({
    queryKey: ["variants", assessmentId],
    queryFn: async () => {
      const res = await fetch(
        agentNativePath(`/api/school/variants?assessmentId=${assessmentId}`),
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
        agentNativePath(`/api/school/submissions?assessmentId=${assessmentId}`),
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
        maxScore: assessment?.totalPoints ?? 100,
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

  return (
    <div className="h-full overflow-auto p-6 space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-semibold">
            {assessment?.title ?? "Assessment"}
          </h1>
          {assessment?.dueDate && (
            <p className="text-xs text-muted-foreground mt-0.5">
              Due: {assessment.dueDate}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2">
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
              {variants.map((variant: any) => (
                <button
                  key={variant.id}
                  onClick={() => setActiveVariant(variant.id)}
                  className={`rounded-lg border p-4 text-left space-y-2 transition-colors hover:border-primary/40 ${
                    activeVariant === variant.id
                      ? "border-primary bg-primary/5"
                      : ""
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{variant.label}</span>
                    <Badge variant="outline" className="text-xs capitalize">
                      {variant.difficulty}
                    </Badge>
                    <span className="text-xs text-muted-foreground ml-auto">
                      {variant.totalPoints} pts
                    </span>
                  </div>
                  {variant.instructions && (
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {variant.instructions}
                    </p>
                  )}
                </button>
              ))}
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
                <div>
                  <p className="text-sm font-medium">
                    {sub.studentName ?? sub.studentEmail ?? sub.studentId}
                  </p>
                  {sub.score != null && (
                    <p className="text-xs text-muted-foreground">
                      Score: {sub.score} / {assessment?.totalPoints ?? "—"}
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
          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label>
                Score
                {assessment?.totalPoints
                  ? ` (out of ${assessment.totalPoints})`
                  : ""}
              </Label>
              <Input
                type="number"
                min={0}
                max={assessment?.totalPoints ?? undefined}
                placeholder={
                  assessment?.totalPoints
                    ? `/ ${assessment.totalPoints}`
                    : "Score"
                }
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
