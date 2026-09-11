import { useParams } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { agentNativePath } from "@agent-native/core/client";
import { useNavigationState } from "@/hooks/use-navigation-state";
import { useRole } from "@/hooks/use-role";
import { useEffect, useRef, useState } from "react";
import { useSubmissionEditor } from "@/hooks/use-submission-editor";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { IconSend } from "@tabler/icons-react";
import { Markdown } from "@/components/Markdown";

export default function StudentAssessment() {
  const { assessmentId } = useParams();
  const { sync } = useNavigationState();
  const { user } = useRole();
  const qc = useQueryClient();

  const { data: assessment } = useQuery({
    queryKey: ["student-assessment", assessmentId],
    queryFn: async () => {
      const res = await fetch(
        agentNativePath(
          `/_agent-native/actions/get-my-assessment?assessmentId=${assessmentId}`,
        ),
      );
      if (!res.ok) return null;
      return res.json();
    },
    enabled: !!assessmentId,
  });

  const submissionId = assessment?.submissionId ?? null;
  const { draft, save, clearDraft } = useSubmissionEditor(submissionId ?? "");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (!assessmentId) return;
    sync({
      role: "student",
      view: "assessment",
      assessmentId,
      submissionId: submissionId ?? undefined,
    });
  }, [sync, assessmentId, submissionId]);

  // Don't clobber what the student is typing with a poll result that is
  // older than their local text (the draft is polled every 2s).
  const isEditingRef = useRef(false);
  const lastSentRef = useRef<string | null>(null);
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  useEffect(() => {
    if (isEditingRef.current) return;
    if (draft?.content !== undefined) {
      setContent(draft.content);
    } else if (assessment?.submission?.content) {
      setContent(assessment.submission.content);
    }
  }, [draft?.content, assessment?.submission?.content]);

  const handleChange = (value: string) => {
    setContent(value);
    isEditingRef.current = true;
    if (submissionId) save({ content: value });
    // Persist to SQL too. On the first keystroke there is no submission row
    // yet, so this is what creates it (and makes the draft visible to the
    // tutor agent).
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(async () => {
      if (lastSentRef.current === value) return;
      lastSentRef.current = value;
      try {
        await fetch(
          agentNativePath("/_agent-native/actions/save-submission-draft"),
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ assessmentId, content: value }),
          },
        );
        if (!submissionId) {
          qc.invalidateQueries({
            queryKey: ["student-assessment", assessmentId],
          });
        }
      } catch {
        /* keystrokes keep working offline; next save retries */
      }
    }, 1000);
  };

  const submitMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(
        agentNativePath("/_agent-native/actions/submit-work"),
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ assessmentId, content }),
        },
      );
      if (!res.ok) throw new Error("Failed to submit");
    },
    onSuccess: () => {
      toast.success("Work submitted!");
      clearDraft();
      qc.invalidateQueries({ queryKey: ["student-assessment", assessmentId] });
    },
    onError: () => toast.error("Failed to submit work"),
  });

  const isSubmitted = ["submitted", "graded"].includes(
    assessment?.submission?.status ?? "",
  );
  const hasGrade = !!assessment?.submission?.grade;

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="flex items-center justify-between border-b px-6 py-3">
        <div>
          <h1 className="text-base font-semibold">
            {assessment?.title ?? "Assessment"}
          </h1>
          {assessment?.dueDate && (
            <p className="text-xs text-muted-foreground">
              Due: {assessment.dueDate}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2">
          {assessment?.submission?.status && (
            <Badge
              variant={isSubmitted ? "default" : "secondary"}
              className="text-xs capitalize"
            >
              {assessment.submission.status.replace("_", " ")}
            </Badge>
          )}
          {!isSubmitted && (
            <Button
              size="sm"
              onClick={() => submitMutation.mutate()}
              disabled={submitMutation.isPending || !content.trim()}
            >
              <IconSend size={14} className="mr-1.5" />
              Submit
            </Button>
          )}
        </div>
      </div>
      <div className="flex-1 overflow-auto p-6 space-y-6">
        {assessment?.variant?.instructions && (
          <div className="rounded-lg bg-muted/50 border p-4">
            <h3 className="text-sm font-medium mb-2">Instructions</h3>
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">
              {assessment.variant.instructions}
            </p>
          </div>
        )}
        {assessment?.variant?.content && (
          <div className="rounded-lg border p-4">
            <h3 className="text-sm font-medium mb-2">Questions</h3>
            <Markdown>{assessment.variant.content}</Markdown>
          </div>
        )}
        {hasGrade ? (
          <div className="rounded-lg border bg-card p-4 space-y-3">
            <h3 className="text-sm font-medium">Grade</h3>
            <div className="flex items-center gap-4">
              <div>
                <p className="text-3xl font-semibold">
                  {assessment.submission.grade.letterGrade ??
                    `${assessment.submission.grade.percentage}%`}
                </p>
                <p className="text-xs text-muted-foreground">
                  {assessment.submission.grade.score}/
                  {assessment.submission.grade.maxScore} pts
                </p>
              </div>
            </div>
            {assessment.submission.grade.feedback && (
              <div>
                <h4 className="text-xs font-medium text-muted-foreground mb-1">
                  Feedback
                </h4>
                <p className="text-sm whitespace-pre-wrap">
                  {assessment.submission.grade.feedback}
                </p>
              </div>
            )}
          </div>
        ) : (
          !isSubmitted && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Your Answer</h3>
              <p className="text-xs text-muted-foreground">
                Your work auto-saves as you type. Use the agent for help — it
                can explain concepts without giving you the answers directly.
              </p>
              <Textarea
                className="min-h-75 text-sm resize-none"
                value={content}
                onChange={(e) => handleChange(e.target.value)}
                placeholder="Write your answer here…"
              />
            </div>
          )
        )}
        {isSubmitted && !hasGrade && (
          <div className="rounded-lg border border-dashed p-6 text-center">
            <p className="text-sm font-medium">Submitted — awaiting grading</p>
            <p className="text-xs text-muted-foreground mt-1">
              Your teacher will grade your work and you'll see feedback here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
