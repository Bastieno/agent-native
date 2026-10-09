import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Markdown } from "@/components/Markdown";

/**
 * A whole paper, answered question by question.
 *
 * One box for the lot meant a learner typed "1. B 2. D …" into a single
 * sheet, and nothing could read it — so twenty multiple-choice questions
 * reached the teacher as twenty papers to mark by hand, even though every
 * answer key was already stored. An answer belongs to its question.
 *
 * The learner still sees the whole paper and can move freely between
 * questions; only where the answers are kept has changed.
 */
export function AnswerSheet({
  blocks,
  answers,
  onChange,
}: {
  blocks: Array<{
    prompt: string;
    points?: number;
    options?: string[];
    answerSpace?: "short" | "long";
  }>;
  answers: Record<number, string>;
  onChange: (index: number, value: string) => void;
}) {
  return (
    <ol className="space-y-4">
      {blocks.map((block, i) => (
        <li key={i} className="rounded-lg border p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex min-w-0 gap-2">
              <span className="shrink-0 text-sm font-semibold text-muted-foreground">
                {i + 1}.
              </span>
              <div className="min-w-0 flex-1">
                <Markdown>{block.prompt}</Markdown>
              </div>
            </div>
            {typeof block.points === "number" ? (
              <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
                {block.points} {block.points === 1 ? "mark" : "marks"}
              </span>
            ) : null}
          </div>

          <div className="mt-3 pl-6">
            {block.options?.length ? (
              <div className="space-y-1.5">
                {block.options.map((option, oi) => {
                  const letter = String.fromCharCode(65 + oi);
                  const chosen = answers[i] === letter;
                  return (
                    <label
                      key={oi}
                      className={`flex cursor-pointer items-start gap-2 rounded-md border p-2 text-sm transition-colors ${
                        chosen
                          ? "border-primary bg-primary/5"
                          : "hover:bg-muted/40"
                      }`}
                    >
                      <input
                        type="radio"
                        name={`q-${i}`}
                        className="mt-1"
                        checked={chosen}
                        onChange={() => onChange(i, letter)}
                      />
                      <span className="text-muted-foreground">{letter}.</span>
                      <span className="min-w-0">{option}</span>
                    </label>
                  );
                })}
              </div>
            ) : block.answerSpace === "long" ? (
              <Textarea
                className="min-h-24 resize-none text-sm"
                value={answers[i] ?? ""}
                onChange={(e) => onChange(i, e.target.value)}
                placeholder="Your answer…"
              />
            ) : (
              <Input
                className="text-sm"
                value={answers[i] ?? ""}
                onChange={(e) => onChange(i, e.target.value)}
                placeholder="Your answer…"
              />
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
