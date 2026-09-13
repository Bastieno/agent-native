import { useEffect, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { agentNativePath } from "@agent-native/core/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Markdown } from "@/components/Markdown";
import { ActivityCountdown } from "@/components/ActivityCountdown";
import { cn } from "@/lib/utils";
import {
  IconArrowRight,
  IconBulb,
  IconCheck,
  IconX,
  IconSend,
} from "@tabler/icons-react";
import { toast } from "sonner";
import { DrawingPad } from "@/components/activity/DrawingPad";
import { parseDrawing, isBlank, type Drawing } from "@shared/drawing";

type Served = {
  index: number;
  total: number;
  isLast: boolean;
  finished?: boolean;
  question?: {
    prompt: string;
    options: string[] | null;
    hint: string | null;
    points: number | null;
    answerSpace: string | null;
    answerMode?: "text" | "drawing" | "both";
  };
  deadline: string | null;
  secondsAllowed: number | null;
  previousAnswer: string | null;
  previousDrawing?: string | null;
};

/**
 * One question at a time, against the clock.
 *
 * The server decides everything that matters: which question is next, when it
 * was served, and whether an answer arrived in time. This asks for a question,
 * shows it, sends back what the learner said, and asks for the next one. It
 * never reports how long they took — that is computed from the moment the
 * server handed the question over, so a slept tablet or a wound-back clock
 * cannot buy more time.
 *
 * When the clock on a question runs out, whatever is in the box is sent. A
 * learner who was typing should not lose the answer they were part-way
 * through.
 */
export function QuestionRunner({
  assessmentId,
  onFinished,
}: {
  assessmentId: string;
  onFinished: () => void;
}) {
  const qc = useQueryClient();
  const [index, setIndex] = useState<number | null>(null);
  const [answer, setAnswer] = useState("");
  const [drawing, setDrawing] = useState<Drawing | null>(null);
  const [feedback, setFeedback] = useState<{
    isCorrect: boolean | null;
    text: string | null;
  } | null>(null);

  const { data: served, isLoading } = useQuery<Served | null>({
    queryKey: ["served-question", assessmentId, index],
    queryFn: async () => {
      const res = await fetch(
        agentNativePath("/_agent-native/actions/serve-question"),
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(
            index === null ? { assessmentId } : { assessmentId, index },
          ),
        },
      );
      const body = await res.json().catch(() => null);
      if (!res.ok) throw new Error((body as any)?.error ?? "Failed");
      return body as Served;
    },
    // A question's clock starts when it is served, so never re-fetch behind
    // the learner's back.
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    retry: false,
  });

  // Restore whatever they had typed if they come back to a question.
  useEffect(() => {
    setAnswer(served?.previousAnswer ?? "");
    setDrawing(parseDrawing(served?.previousDrawing));
    setFeedback(null);
  }, [served?.index, served?.previousAnswer, served?.previousDrawing]);

  const answered = useRef(false);
  useEffect(() => {
    answered.current = false;
  }, [served?.index]);

  const send = useMutation({
    mutationFn: async (value: string) => {
      const working = drawing && !isBlank(drawing) ? drawing : undefined;
      const res = await fetch(
        agentNativePath("/_agent-native/actions/answer-question"),
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            assessmentId,
            index: served?.index,
            answer: value,
            drawing: working,
          }),
        },
      );
      const body = await res.json().catch(() => null);
      if (!res.ok) throw new Error((body as any)?.error ?? "Failed");
      return body as {
        isCorrect: boolean | null;
        feedback: string | null;
        nextIndex: number | null;
        finished: boolean;
      };
    },
    onSuccess: (result) => {
      qc.invalidateQueries({ queryKey: ["student-assessment", assessmentId] });
      // Only shown when the activity allows it; the server returns null
      // otherwise, so this cannot reveal anything by accident.
      if (result.isCorrect !== null) {
        setFeedback({ isCorrect: result.isCorrect, text: result.feedback });
        return;
      }
      advance(result.finished, result.nextIndex);
    },
    onError: (e: Error) => {
      answered.current = false;
      toast.error(e.message);
    },
  });

  function advance(finished: boolean, nextIndex: number | null) {
    if (finished || nextIndex === null) {
      onFinished();
      return;
    }
    setFeedback(null);
    setIndex(nextIndex);
  }

  function submit(value: string) {
    if (answered.current || send.isPending) return;
    answered.current = true;
    send.mutate(value);
  }

  if (isLoading) {
    return (
      <p className="p-6 text-sm text-muted-foreground">Loading question…</p>
    );
  }

  if (!served || served.finished || !served.question) {
    return (
      <div className="rounded-lg border border-dashed p-6 text-center">
        <p className="text-sm font-medium">Every question has been answered</p>
        <Button size="sm" className="mt-3" onClick={onFinished}>
          <IconSend size={14} className="mr-1.5" />
          Hand it in
        </Button>
      </div>
    );
  }

  const q = served.question;
  const isChoice = !!q.options?.length;
  const mode = q.answerMode ?? "text";
  const wantsDrawing = !isChoice && (mode === "drawing" || mode === "both");
  const wantsTyping = !isChoice && (mode === "text" || mode === "both");
  // Working alone is an answer; so is a typed value. Either will do.
  const hasSomething =
    answer.trim().length > 0 || (!!drawing && !isBlank(drawing));
  const position = served.index + 1;

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs font-medium text-muted-foreground">
            Question {position} of {served.total}
            {q.points
              ? ` · ${q.points} ${q.points === 1 ? "mark" : "marks"}`
              : ""}
          </p>
          {served.deadline ? (
            <ActivityCountdown
              deadline={served.deadline}
              // Send what they have rather than losing it.
              onExpiring={() => submit(answer)}
            />
          ) : null}
        </div>
        <Progress value={(served.index / served.total) * 100} className="h-1" />
      </div>

      <div className="rounded-lg border p-4">
        <Markdown>{q.prompt}</Markdown>

        {isChoice ? (
          <div className="mt-4 grid gap-2">
            {q.options!.map((option, i) => {
              const selected = answer === String(i);
              return (
                <button
                  key={i}
                  type="button"
                  disabled={!!feedback}
                  onClick={() => setAnswer(String(i))}
                  className={cn(
                    "flex items-center gap-3 rounded-md border p-3 text-left text-sm transition-colors",
                    selected
                      ? "border-primary bg-primary/5"
                      : "hover:bg-accent/40",
                    feedback ? "opacity-70" : "",
                  )}
                >
                  <span
                    className={cn(
                      "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-medium",
                      selected ? "border-primary text-primary" : "",
                    )}
                  >
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="min-w-0">{option}</span>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="mt-4 space-y-3">
            {wantsDrawing ? (
              <DrawingPad
                value={drawing}
                onChange={setDrawing}
                disabled={!!feedback}
                height={q.answerSpace === "long" ? 380 : 280}
              />
            ) : null}
            {wantsTyping ? (
              <Textarea
                className={cn(
                  "resize-none text-sm",
                  q.answerSpace === "long" && !wantsDrawing
                    ? "min-h-40"
                    : "min-h-20",
                )}
                value={answer}
                disabled={!!feedback}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder={
                  wantsDrawing ? "Your final answer…" : "Your answer…"
                }
              />
            ) : null}
          </div>
        )}

        {q.hint && !feedback ? (
          <details className="mt-3">
            <summary className="inline-flex cursor-pointer items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground">
              <IconBulb size={14} />
              Show a hint
            </summary>
            <p className="mt-1.5 text-xs text-muted-foreground">{q.hint}</p>
          </details>
        ) : null}
      </div>

      {feedback ? (
        <div
          className={cn(
            "flex items-center justify-between gap-3 rounded-lg border p-3",
            feedback.isCorrect
              ? "border-primary/40 bg-primary/5"
              : "border-destructive/40 bg-destructive/5",
          )}
        >
          <span className="flex items-center gap-2 text-sm font-medium">
            {feedback.isCorrect ? (
              <IconCheck size={16} className="text-primary" />
            ) : (
              <IconX size={16} className="text-destructive" />
            )}
            {feedback.text ?? (feedback.isCorrect ? "Correct." : "Not quite.")}
          </span>
          <Button
            size="sm"
            onClick={() =>
              advance(served.isLast, served.isLast ? null : served.index + 1)
            }
          >
            {served.isLast ? "Finish" : "Next"}
            <IconArrowRight size={14} className="ml-1.5" />
          </Button>
        </div>
      ) : (
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            {served.secondsAllowed
              ? "Once you answer you cannot come back to this question."
              : "Take your time."}
          </p>
          <Button
            size="sm"
            disabled={send.isPending || !hasSomething}
            onClick={() => submit(answer)}
          >
            {served.isLast ? "Finish" : "Next"}
            <IconArrowRight size={14} className="ml-1.5" />
          </Button>
        </div>
      )}
    </div>
  );
}
