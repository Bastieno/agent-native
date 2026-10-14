import { IconCheck, IconX } from "@tabler/icons-react";
import { Markdown } from "@/components/Markdown";

type ReviewQuestion = {
  index: number;
  prompt: string;
  options?: string[];
  points?: number;
  answer: string | null;
  isCorrect?: boolean | null;
  awardedPoints?: number | null;
  feedback?: string | null;
  correctAnswer?: string;
  modelAnswer?: string;
};

export type PaperReviewData = {
  marksPublished: boolean;
  answersRevealed: boolean;
  answersNote: string | null;
  questions: ReviewQuestion[];
};

/** "B", "1" or the option's text — whichever was stored — as a letter. */
function chosenLetter(answer: string | null, options: string[]): string | null {
  if (!answer) return null;
  const raw = answer.trim();
  if (/^[a-z]$/i.test(raw)) return raw.toUpperCase();
  if (/^\d+$/.test(raw) && Number(raw) < options.length) {
    return String.fromCharCode(65 + Number(raw));
  }
  const found = options.findIndex(
    (o) => o.trim().toLowerCase() === raw.toLowerCase(),
  );
  return found >= 0 ? String.fromCharCode(65 + found) : null;
}

/**
 * The learner's own paper, handed back: each question with what they answered,
 * and — as the server allows — the marks, the feedback and the right answer.
 * Nothing here decides what may be shown; the server sends only what may.
 */
export function PaperReview({ review }: { review: PaperReviewData }) {
  return (
    <div className="space-y-3">
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="text-sm font-medium">Your paper</h3>
        {review.answersNote ? (
          <p className="text-right text-xs text-muted-foreground">
            {review.answersNote}
          </p>
        ) : null}
      </div>
      <ol className="space-y-3">
        {review.questions.map((q) => (
          <li key={q.index} className="rounded-lg border p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex min-w-0 gap-2">
                <span className="shrink-0 text-sm font-semibold text-muted-foreground">
                  {q.index + 1}.
                </span>
                <div className="min-w-0 flex-1">
                  <Markdown>{q.prompt}</Markdown>
                </div>
              </div>
              <QuestionMark q={q} marksPublished={review.marksPublished} />
            </div>

            <div className="mt-3 pl-6">
              {q.options?.length ? (
                <ChoiceAnswer q={q} options={q.options} />
              ) : (
                <WrittenAnswer q={q} />
              )}
              {q.feedback ? (
                <p className="mt-2 text-sm text-muted-foreground whitespace-pre-wrap">
                  {q.feedback}
                </p>
              ) : null}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

function QuestionMark({
  q,
  marksPublished,
}: {
  q: ReviewQuestion;
  marksPublished: boolean;
}) {
  const outOf =
    typeof q.points === "number"
      ? `${q.points} ${q.points === 1 ? "mark" : "marks"}`
      : null;
  if (!marksPublished || q.awardedPoints == null) {
    return outOf ? (
      <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
        {outOf}
      </span>
    ) : null;
  }
  return (
    <span className="flex shrink-0 items-center gap-1 text-xs font-medium tabular-nums">
      {q.isCorrect === true ? (
        <IconCheck size={14} className="text-emerald-600" />
      ) : q.isCorrect === false ? (
        <IconX size={14} className="text-destructive" />
      ) : null}
      {q.awardedPoints}
      {typeof q.points === "number" ? `/${q.points}` : ""}
    </span>
  );
}

function ChoiceAnswer({
  q,
  options,
}: {
  q: ReviewQuestion;
  options: string[];
}) {
  const chosen = chosenLetter(q.answer, options);
  return (
    <div className="space-y-1.5">
      {options.map((option, oi) => {
        const letter = String.fromCharCode(65 + oi);
        const isChosen = chosen === letter;
        const isRight = q.correctAnswer === letter;
        return (
          <div
            key={oi}
            className={`flex items-start gap-2 rounded-md border p-2 text-sm ${
              isRight
                ? "border-emerald-600/60 bg-emerald-600/10"
                : isChosen
                  ? q.correctAnswer
                    ? "border-destructive/50 bg-destructive/5"
                    : "border-primary bg-primary/5"
                  : ""
            }`}
          >
            <span className="text-muted-foreground">{letter}.</span>
            <span className="min-w-0 flex-1">{option}</span>
            {isChosen ? (
              <span className="shrink-0 text-xs text-muted-foreground">
                Your answer
              </span>
            ) : isRight ? (
              <span className="shrink-0 text-xs text-emerald-600">
                Correct answer
              </span>
            ) : null}
          </div>
        );
      })}
      {!chosen ? (
        <p className="text-xs text-muted-foreground">
          You did not answer this.
        </p>
      ) : null}
    </div>
  );
}

function WrittenAnswer({ q }: { q: ReviewQuestion }) {
  return (
    <div className="space-y-2">
      <div className="rounded-md border bg-muted/30 p-2 text-sm whitespace-pre-wrap">
        {q.answer?.trim() ? (
          q.answer
        ) : (
          <span className="text-muted-foreground">
            You did not answer this.
          </span>
        )}
      </div>
      {q.correctAnswer ? (
        <p className="text-sm">
          <span className="text-muted-foreground">Correct answer: </span>
          <span className="font-medium">{q.correctAnswer}</span>
        </p>
      ) : null}
      {q.modelAnswer ? (
        <div className="rounded-md border border-emerald-600/40 bg-emerald-600/5 p-2">
          <p className="mb-1 text-xs font-medium text-emerald-700 dark:text-emerald-400">
            A full-mark answer
          </p>
          <Markdown className="text-sm">{q.modelAnswer}</Markdown>
        </div>
      ) : null}
    </div>
  );
}
