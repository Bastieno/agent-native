import { useParams } from "react-router";
import { BackLink } from "@/components/layout/BackLink";
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
import { IconSend, IconClock, IconLock } from "@tabler/icons-react";
import { Markdown } from "@/components/Markdown";
import {
  ActivityContent,
  headingFor,
} from "@/components/activity/ActivityContent";
import { ActivityCountdown } from "@/components/ActivityCountdown";
import { QuestionRunner } from "@/components/activity/QuestionRunner";
import { AnswerSheet } from "@/components/activity/AnswerSheet";
import { parseActivityContent } from "@shared/activity-content";

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
          body: JSON.stringify({
            assessmentId,
            content,
            // A paper of questions is answered question by question even when
            // it is all on one screen — so the closed ones can be marked.
            answers: Object.entries(answers)
              .filter(([, a]) => a.trim() !== "")
              .map(([index, answer]) => ({ index: Number(index), answer })),
          }),
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

  // The server decided all of this; the page only renders it.
  const timing = assessment?.window as
    | {
        isOpen: boolean;
        notYetOpen: boolean;
        hasClosed: boolean;
        closedBy: string | null;
        deadline: string | null;
        started: boolean;
        reason: string | null;
      }
    | undefined;
  /** Answers to a whole paper, by question index. */
  const [answers, setAnswers] = useState<Record<number, string>>({});
  // The questions of a whole paper, when that is what this is.
  const questionBlocks =
    assessment?.renderAs === "questions" &&
    assessment?.navigation !== "linear" &&
    assessment?.responseMode !== "none"
      ? ((parseActivityContent(assessment?.variant?.contentJson)?.blocks ??
          []) as any[])
      : [];
  const isTimed = !!assessment?.durationMinutes;
  // Practice with nothing to hand in — a card deck, a reading, a reference
  // sheet. There is no answer box and no submit, and saying so is kinder than
  // leaving a learner hunting for one.
  const nothingToHandIn = assessment?.responseMode === "none";
  // A linear paper is worked through one question at a time, against each
  // question's own clock, rather than shown all at once with a single box.
  const oneAtATime =
    assessment?.navigation === "linear" &&
    assessment?.renderAs === "questions" &&
    !isSubmitted;

  // A linear paper is started deliberately too, even when the paper as a whole
  // carries no clock: each question's timer runs from when it was served, and
  // nothing can be served before the attempt exists.
  const isLinear =
    assessment?.navigation === "linear" && assessment?.renderAs === "questions";
  const needsToStart =
    (isTimed || isLinear) && !timing?.started && !isSubmitted;

  const startMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(
        agentNativePath("/_agent-native/actions/start-activity"),
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ assessmentId }),
        },
      );
      if (!res.ok) throw new Error((await res.json())?.message ?? "Failed");
      return res.json();
    },
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: ["student-assessment", assessmentId] }),
    onError: (e: Error) => toast.error(e.message),
  });

  // When the clock runs out, hand in what they have written rather than
  // letting the work sit there unsubmitted. Their text is already saved
  // server-side, so nothing is lost either way — but a learner who ran out of
  // time should still be marked on what they did.
  const autoSubmittedRef = useRef(false);
  const handleExpiry = () => {
    if (autoSubmittedRef.current || isSubmitted) return;
    autoSubmittedRef.current = true;
    submitMutation.mutate();
    toast.info("Time is up — your work has been handed in.");
  };

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="flex items-center justify-between border-b px-6 py-3">
        <div className="min-w-0">
          <BackLink
            to={
              assessment?.classId
                ? `/student/classes/${assessment.classId}`
                : "/student/classes"
            }
          >
            {assessment?.className ?? "My classes"}
          </BackLink>
          <h1 className="text-base font-semibold">
            {assessment?.title ?? "Assessment"}
          </h1>
          <p className="text-xs text-muted-foreground first-letter:uppercase">
            {[
              assessment?.format,
              assessment?.dueDate ? `Due ${assessment.dueDate}` : null,
              isTimed
                ? `${assessment.durationMinutes} minute${assessment.durationMinutes === 1 ? "" : "s"}`
                : null,
            ]
              .filter(Boolean)
              .join(" · ")}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* Only while the clock is actually running for them. */}
          {timing?.started && timing.deadline && !isSubmitted && (
            <ActivityCountdown
              deadline={timing.deadline}
              onWarning={() => toast.warning("One minute left.")}
              onExpiring={handleExpiry}
            />
          )}
          {assessment?.submission?.status && (
            <Badge
              variant={isSubmitted ? "default" : "secondary"}
              className="text-xs capitalize"
            >
              {assessment.submission.status.replace("_", " ")}
            </Badge>
          )}
          {!isSubmitted &&
            !needsToStart &&
            !nothingToHandIn &&
            timing?.isOpen !== false && (
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
        {/* Nothing to see yet — a paper the teacher has scheduled for later. */}
        {timing?.notYetOpen && (
          <div className="rounded-lg border border-dashed p-6 text-center">
            <IconClock
              size={20}
              className="mx-auto mb-2 text-muted-foreground"
            />
            <p className="text-sm font-medium">Not open yet</p>
            <p className="mt-1 text-xs text-muted-foreground">
              {timing.reason}
            </p>
          </div>
        )}

        {/* Timed work stays covered until they choose to begin — reading the
            questions first would make the time limit meaningless. */}
        {!timing?.notYetOpen && needsToStart && !timing?.hasClosed && (
          <div className="rounded-lg border p-6 text-center">
            <IconClock
              size={20}
              className="mx-auto mb-2 text-muted-foreground"
            />
            <p className="text-sm font-medium">
              {isTimed
                ? `You have ${assessment.durationMinutes} minute${
                    assessment.durationMinutes === 1 ? "" : "s"
                  } for this`
                : "Ready when you are"}
            </p>
            <p className="mx-auto mt-1 max-w-sm text-xs text-muted-foreground">
              {isTimed
                ? "The clock starts when you press begin and keeps running if you close the page, so start when you are ready. Your answer saves as you type."
                : "You will get one question at a time, and cannot go back once you answer. Start when you are ready."}
            </p>
            <Button
              className="mt-4"
              size="sm"
              onClick={() => startMutation.mutate()}
              disabled={startMutation.isPending}
            >
              Begin
            </Button>
          </div>
        )}

        {/* Closed, and they never handed anything in. Their draft is still
            saved, so say so rather than implying the work vanished. */}
        {timing?.hasClosed && !isSubmitted && (
          <div className="rounded-lg border border-dashed p-6 text-center">
            <IconLock
              size={20}
              className="mx-auto mb-2 text-muted-foreground"
            />
            <p className="text-sm font-medium">
              {timing.closedBy === "time-allowed"
                ? "Your time has run out"
                : "Closed"}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {timing.reason} Anything you had written is saved and your teacher
              can still see it.
            </p>
          </div>
        )}

        {!needsToStart && !timing?.notYetOpen && oneAtATime ? (
          <QuestionRunner
            assessmentId={assessmentId!}
            onFinished={() => submitMutation.mutate()}
          />
        ) : null}

        {!oneAtATime &&
          !needsToStart &&
          !timing?.notYetOpen &&
          assessment?.variant?.instructions && (
            <div className="rounded-lg bg-muted/50 border p-4">
              <h3 className="text-sm font-medium mb-2">Instructions</h3>
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                {assessment.variant.instructions}
              </p>
            </div>
          )}
        {!oneAtATime &&
          !needsToStart &&
          !timing?.notYetOpen &&
          (assessment?.variant?.content ||
            assessment?.variant?.contentJson) && (
            <div className="rounded-lg border p-4">
              <h3 className="mb-3 text-sm font-medium">
                {headingFor(assessment?.renderAs)}
              </h3>
              <ActivityContent
                contentJson={assessment.variant.contentJson}
                assessmentId={assessmentId}
                markdown={assessment.variant.content}
                audience="student"
              />
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
        ) : oneAtATime ? null : nothingToHandIn ? (
          <p className="text-xs text-muted-foreground">
            There is nothing to hand in for this — work through it as many times
            as you like.
          </p>
        ) : (
          !isSubmitted &&
          !needsToStart &&
          timing?.isOpen !== false && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Your Answer</h3>
              <p className="text-xs text-muted-foreground">
                Your work auto-saves as you type. Use the agent for help — it
                can explain concepts without giving you the answers directly.
              </p>
              {/* A paper of questions gets a box per question, so the closed
                  ones can be marked. Anything else keeps the single sheet. */}
              {questionBlocks.length ? (
                <AnswerSheet
                  blocks={questionBlocks}
                  answers={answers}
                  onChange={(index, value) =>
                    setAnswers((prev) => ({ ...prev, [index]: value }))
                  }
                />
              ) : (
                <Textarea
                  className="min-h-75 text-sm resize-none"
                  value={content}
                  onChange={(e) => handleChange(e.target.value)}
                  placeholder="Write your answer here…"
                />
              )}
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
