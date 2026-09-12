import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { agentNativePath } from "@agent-native/core/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  IconCheck,
  IconX,
  IconFlag,
  IconChevronDown,
  IconClock,
} from "@tabler/icons-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Markdown } from "@/components/Markdown";

/**
 * A one-line label for a prompt written in markdown. The collapsed row has no
 * room to render properly, and printing the asterisks is worse than dropping
 * them — the full prompt is rendered when the row opens.
 */
function plainLabel(text: string | null): string {
  if (!text) return "(question not found)";
  return text
    .replace(/[*_`]/g, "")
    .replace(/\$\$?([^$]*)\$\$?/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

export type Answer = {
  responseId: string;
  questionNumber: number;
  prompt: string | null;
  maxPoints: number | null;
  markScheme: string | null;
  answer: string;
  isCorrect: boolean | null;
  awardedPoints: number | null;
  feedback: string | null;
  evidence: { criterion: string; points: number; quote: string }[];
  confidence: string | null;
  needsReview: boolean;
  autoMarked: boolean;
  unmarked: boolean;
  secondsTaken: number | null;
  timedOut: boolean;
};

/**
 * A paper, question by question, for the teacher who has to stand behind the
 * marks.
 *
 * The point of this screen is verification, not re-marking. Each row shows what
 * was earned at a glance; opening one shows the learner's answer, the words
 * that earned each mark, and the scheme they were judged against. A teacher who
 * agrees moves on in a second; one who disagrees changes the number there and
 * then.
 *
 * Anything the marker was unsure of is flagged and sorted to the reader's
 * attention rather than left to be noticed.
 */
export function AnswerReview({
  answers,
  onChanged,
}: {
  answers: Answer[];
  /** Called with the paper's new total whenever a mark is changed. */
  onChanged?: (newTotal: number) => void;
}) {
  const qc = useQueryClient();
  const [editing, setEditing] = useState<Record<string, string>>({});

  const save = useMutation({
    mutationFn: async ({
      responseId,
      points,
    }: {
      responseId: string;
      points: number;
    }) => {
      const res = await fetch(
        agentNativePath("/_agent-native/actions/record-answer-mark"),
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            responseId,
            awardedPoints: points,
            // A teacher's own mark is certain by definition, and settles any
            // flag the agent raised.
            confidence: "high",
            needsReview: false,
          }),
        },
      );
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error((body as any).error ?? "Failed");
      return body;
    },
    onSuccess: (_body, variables) => {
      qc.invalidateQueries({ queryKey: ["submission"] });
      qc.invalidateQueries({ queryKey: ["submissions"] });
      // Re-total here rather than telling the teacher to remember: the score
      // they are about to save must agree with the marks above it.
      const newTotal = answers.reduce(
        (sum, a) =>
          sum +
          (a.responseId === variables.responseId
            ? variables.points
            : (a.awardedPoints ?? 0)),
        0,
      );
      toast.success(`Mark updated — the total is now ${newTotal}`);
      onChanged?.(newTotal);
    },
    onError: (e: Error) => toast.error(e.message),
  });

  if (answers.length === 0) return null;

  const flagged = answers.filter((a) => a.needsReview || a.unmarked).length;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-2">
        <h4 className="text-xs font-medium text-muted-foreground">
          Answers ({answers.length})
        </h4>
        {flagged > 0 ? (
          <Badge variant="destructive" className="gap-1 text-xs">
            <IconFlag size={11} />
            {flagged} to check
          </Badge>
        ) : null}
      </div>

      <div className="space-y-1.5">
        {answers.map((a) => {
          const attention = a.needsReview || a.unmarked;
          return (
            <Collapsible
              key={a.responseId}
              className={cn(
                "rounded-md border",
                attention ? "border-destructive/40" : "",
              )}
            >
              <CollapsibleTrigger className="group flex w-full items-center gap-2 p-2.5 text-left">
                <span className="shrink-0 text-xs font-medium text-muted-foreground">
                  {a.questionNumber}.
                </span>
                <span className="min-w-0 flex-1 truncate text-xs">
                  {plainLabel(a.prompt)}
                </span>

                {a.timedOut ? (
                  <IconClock
                    size={13}
                    className="shrink-0 text-amber-600 dark:text-amber-500"
                    title="Answered after this question's time ran out"
                  />
                ) : null}

                {a.autoMarked ? (
                  a.isCorrect ? (
                    <IconCheck size={14} className="shrink-0 text-primary" />
                  ) : (
                    <IconX size={14} className="shrink-0 text-destructive" />
                  )
                ) : attention ? (
                  <IconFlag size={13} className="shrink-0 text-destructive" />
                ) : null}

                <span className="shrink-0 text-xs tabular-nums">
                  {a.unmarked ? (
                    <span className="text-muted-foreground">unmarked</span>
                  ) : (
                    <>
                      {a.awardedPoints ?? 0}
                      <span className="text-muted-foreground">
                        /{a.maxPoints ?? 0}
                      </span>
                    </>
                  )}
                </span>
                <IconChevronDown
                  size={14}
                  className="shrink-0 text-muted-foreground transition-transform group-data-[state=open]:rotate-180"
                />
              </CollapsibleTrigger>

              <CollapsibleContent>
                <div className="space-y-3 border-t p-3 text-xs">
                  {a.prompt ? (
                    <div>
                      <p className="mb-1 font-medium text-muted-foreground">
                        Question
                      </p>
                      <Markdown className="text-xs">{a.prompt}</Markdown>
                    </div>
                  ) : null}
                  <div>
                    <p className="mb-1 font-medium text-muted-foreground">
                      Their answer
                      {a.secondsTaken !== null
                        ? ` · ${a.secondsTaken}s${a.timedOut ? ", over time" : ""}`
                        : ""}
                    </p>
                    <p className="whitespace-pre-wrap rounded bg-muted/40 p-2">
                      {a.answer.trim() || "(nothing written)"}
                    </p>
                  </div>

                  {a.evidence.length > 0 ? (
                    <div>
                      <p className="mb-1 font-medium text-muted-foreground">
                        What earned the marks
                      </p>
                      <ul className="space-y-1">
                        {a.evidence.map((e, i) => (
                          <li key={i} className="flex gap-2">
                            <span className="shrink-0 tabular-nums text-muted-foreground">
                              +{e.points}
                            </span>
                            <span className="min-w-0">
                              <span className="text-muted-foreground">
                                {e.criterion}:
                              </span>{" "}
                              <span className="italic">“{e.quote}”</span>
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  {a.feedback ? (
                    <div>
                      <p className="mb-1 font-medium text-muted-foreground">
                        Feedback to the learner
                      </p>
                      <p className="whitespace-pre-wrap">{a.feedback}</p>
                    </div>
                  ) : null}

                  {a.markScheme ? (
                    <details>
                      <summary className="cursor-pointer font-medium text-muted-foreground">
                        Mark scheme
                      </summary>
                      <p className="mt-1 whitespace-pre-wrap text-muted-foreground">
                        {a.markScheme}
                      </p>
                    </details>
                  ) : null}

                  {/* Auto-marked questions are settled by their key; only the
                      ones a marker judged can be argued with here. */}
                  {!a.autoMarked ? (
                    <div className="flex items-center gap-2 border-t pt-2">
                      <span className="text-muted-foreground">
                        {a.confidence
                          ? `Marked with ${a.confidence} confidence.`
                          : "Not marked yet."}
                      </span>
                      <span className="ml-auto flex items-center gap-1.5">
                        <Input
                          type="number"
                          min={0}
                          max={a.maxPoints ?? undefined}
                          className="h-7 w-16 text-xs"
                          value={
                            editing[a.responseId] ??
                            String(a.awardedPoints ?? "")
                          }
                          onChange={(e) =>
                            setEditing((prev) => ({
                              ...prev,
                              [a.responseId]: e.target.value,
                            }))
                          }
                        />
                        <span className="text-muted-foreground">
                          / {a.maxPoints ?? 0}
                        </span>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7"
                          disabled={
                            save.isPending ||
                            editing[a.responseId] === undefined ||
                            editing[a.responseId] === ""
                          }
                          onClick={() =>
                            save.mutate({
                              responseId: a.responseId,
                              points: Number(editing[a.responseId]),
                            })
                          }
                        >
                          Set
                        </Button>
                      </span>
                    </div>
                  ) : null}
                </div>
              </CollapsibleContent>
            </Collapsible>
          );
        })}
      </div>
    </div>
  );
}
