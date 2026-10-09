import { useCallback, useEffect, useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Markdown } from "@/components/Markdown";
import { cn } from "@/lib/utils";
import {
  IconBulb,
  IconChevronLeft,
  IconChevronRight,
  IconRotate2,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { agentNativePath } from "@agent-native/core/client";
import { cardKey } from "@shared/card-key";
import {
  parseActivityContent,
  type ActivityContent as Content,
  type CardBlock,
  type CriterionBlock,
  type QuestionBlock,
  type RowBlock,
  type StepBlock,
} from "@shared/activity-content";

/**
 * Renders the body of an activity, in whatever shape it was written in.
 *
 * One component, both portals. The teacher's "view as student" is not a second
 * implementation of the student page — it is this, with `audience="student"`.
 * A separately-built preview drifts within a month and then quietly lies to
 * teachers about what their class will see.
 *
 * The two audiences differ only in what is safe to show: a teacher checking a
 * card deck needs both sides at once, a learner practising needs to try before
 * turning the card over.
 */
export function ActivityContent({
  contentJson,
  markdown,
  audience,
  className,
  assessmentId,
}: {
  /** Structured body, as stored. Null/absent falls back to the markdown. */
  contentJson?: unknown;
  /** Always written alongside the blocks; the fallback and the print view. */
  markdown?: string | null;
  audience: "teacher" | "student";
  /** The activity these blocks belong to, when a learner's practice is
      being recorded against it. */
  assessmentId?: string;
  className?: string;
}) {
  const content = parseActivityContent(contentJson);

  // No structured content, or something unparseable: the markdown is always
  // there, so a learner never meets a blank page.
  if (!content) {
    return markdown ? (
      <Markdown className={className}>{markdown}</Markdown>
    ) : null;
  }

  return (
    <div className={cn("space-y-4", className)}>
      {content.preamble && <Markdown>{content.preamble}</Markdown>}
      <ShapeBody
        content={content}
        audience={audience}
        assessmentId={assessmentId}
      />
    </div>
  );
}

function ShapeBody({
  content,
  audience,
  assessmentId,
}: {
  content: Content;
  audience: "teacher" | "student";
  /** Needed to record a learner's practice; absent in previews. */
  assessmentId?: string;
}) {
  switch (content.shape) {
    case "questions":
      return (
        <ol className="space-y-4">
          {content.blocks.map((b, i) => (
            <Question
              key={i}
              index={i}
              block={b as QuestionBlock}
              audience={audience}
            />
          ))}
        </ol>
      );
    case "cards":
      // A deck is retrieval practice: the worth of it is the moment a learner
      // tries to produce the answer before seeing it. All the fronts at once
      // defeats that — the eye skims instead of committing, and once one card
      // is turned its neighbours' answers are on screen for the next.
      //
      // A teacher is not studying. They are proofreading fourteen cards
      // before publishing, and want both sides of all of them at once.
      return audience === "student" ? (
        <CardDeck
          blocks={content.blocks as CardBlock[]}
          assessmentId={assessmentId}
        />
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {content.blocks.map((b, i) => (
            <Card key={i} block={b as CardBlock} audience={audience} />
          ))}
        </div>
      );
    case "table":
      return <Table content={content} />;
    case "steps":
      return (
        <ol className="space-y-3">
          {content.blocks.map((b, i) => (
            <Step key={i} index={i} block={b as StepBlock} />
          ))}
        </ol>
      );
    case "criteria":
      return (
        <div className="divide-y rounded-lg border">
          {content.blocks.map((b, i) => (
            <Criterion key={i} block={b as CriterionBlock} />
          ))}
        </div>
      );
    default:
      // A shape written by a newer version than this build knows about.
      return (
        <div className="space-y-3">
          {content.blocks.map((b, i) => (
            <Markdown key={i}>{describeUnknown(b)}</Markdown>
          ))}
        </div>
      );
  }
}

function Question({
  index,
  block,
  audience,
}: {
  index: number;
  block: QuestionBlock;
  audience: "teacher" | "student";
}) {
  return (
    <li className="rounded-lg border p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 gap-2">
          <span className="shrink-0 text-sm font-semibold text-muted-foreground">
            {index + 1}.
          </span>
          <div className="min-w-0 flex-1">
            <Markdown>{block.prompt}</Markdown>
            {block.options?.length ? (
              <ul className="mt-2 space-y-1">
                {block.options.map((opt, i) => (
                  <li key={i} className="flex gap-2 text-sm">
                    <span className="text-muted-foreground">
                      {String.fromCharCode(65 + i)}.
                    </span>
                    <span>{opt}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
        {typeof block.points === "number" && (
          <span className="shrink-0 text-xs text-muted-foreground tabular-nums">
            {block.points} {block.points === 1 ? "mark" : "marks"}
          </span>
        )}
      </div>
      {block.hint && <Hint text={block.hint} audience={audience} />}
      {audience === "teacher" ? <Marking block={block} /> : null}
    </li>
  );
}

/**
 * How the question earns its marks — the teacher's half of it.
 *
 * These fields were drafted with the question precisely so a teacher could
 * correct the marking before anyone sits the paper, and `forLearner` already
 * strips them from everything a student is served. But nothing drew them, so
 * the one person they were written for could not read them: the worksheet
 * looked like six questions with no answers, and the mark scheme existed only
 * in the chat message that proposed it.
 *
 * Shown outright rather than behind a disclosure. A teacher checking a paper
 * is checking this, and a page of closed rows would make them click six times
 * to do one job.
 */
function Marking({ block }: { block: QuestionBlock }) {
  const answer =
    block.answer !== undefined && block.answer !== null
      ? String(block.answer)
      : null;
  if (!answer && !block.markScheme && !block.acceptableAnswers?.length) {
    return null;
  }
  return (
    <div className="mt-3 space-y-1.5 rounded-md border border-dashed bg-muted/30 p-3">
      <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
        Marking · not shown to the class
      </p>
      {answer ? (
        <p className="text-xs">
          <span className="text-muted-foreground">Answer: </span>
          {answer}
          {block.acceptableAnswers?.length
            ? ` (also accept: ${block.acceptableAnswers.join(", ")})`
            : ""}
        </p>
      ) : null}
      {block.markScheme ? (
        <Markdown className="text-xs text-muted-foreground">
          {block.markScheme}
        </Markdown>
      ) : null}
    </div>
  );
}

/**
 * A hint is a nudge, so a learner has to ask for it — handing it over unasked
 * turns the question into a worked example. The teacher sees it outright,
 * because they are checking whether the nudge is any good.
 */
function Hint({
  text,
  audience,
}: {
  text: string;
  audience: "teacher" | "student";
}) {
  if (audience === "teacher") {
    return (
      <p className="mt-3 flex gap-1.5 text-xs text-muted-foreground">
        <IconBulb size={14} className="mt-px shrink-0" />
        <span>Hint: {text}</span>
      </p>
    );
  }
  return (
    <Collapsible className="mt-3">
      <CollapsibleTrigger className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground">
        <IconBulb size={14} />
        Show a hint
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-1.5 text-xs text-muted-foreground">
        {text}
      </CollapsibleContent>
    </Collapsible>
  );
}

/**
 * A card turns over. For a learner that is the point of the exercise, so the
 * back stays hidden until they commit to an answer; a teacher reviewing the
 * deck gets both sides at once.
 */
/**
 * One card at a time: question, attempt, answer, next.
 *
 * Keyboard as well as pointer — a learner revising moves fast, and reaching
 * for the mouse between every card is enough friction to stop them finishing
 * a deck. Left and right move, space turns the card over.
 */
function CardDeck({
  blocks,
  assessmentId,
}: {
  blocks: CardBlock[];
  assessmentId?: string;
}) {
  const [at, setAt] = useState(0);
  const [turned, setTurned] = useState(false);
  const [shuffled, setShuffled] = useState(false);
  const [order, setOrder] = useState<number[]>(() => blocks.map((_, i) => i));
  /** Verdicts given this sitting, so the deck can say what was hard. */
  const [verdicts, setVerdicts] = useState<Record<string, "got_it" | "missed">>(
    {},
  );

  const deck = order.map((i) => blocks[i]).filter(Boolean);
  const card = deck[at];

  const go = useCallback(
    (delta: number) => {
      // The updater stays pure. Turning the card over from inside it made a
      // single arrow press walk the whole deck — React may run an updater
      // more than once, and each run was advancing the card again.
      setAt((i) => Math.min(blocks.length - 1, Math.max(0, i + delta)));
      // A new card always starts face up; carrying the turn over would show
      // the next answer before its question.
      setTurned(false);
    },
    [blocks.length],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // Not while someone is typing — a deck can sit beside an answer box.
      const el = document.activeElement;
      if (
        el instanceof HTMLInputElement ||
        el instanceof HTMLTextAreaElement ||
        (el as HTMLElement)?.isContentEditable
      ) {
        return;
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        go(1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(-1);
      } else if (e.key === " " || e.key === "Spacebar") {
        e.preventDefault();
        setTurned((t) => !t);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  const rate = (rating: "got_it" | "missed") => {
    // No id, no record. A made-up key would attach this practice to
    // whichever card happened to share its wording.
    const key = card ? cardKey(card) : null;
    if (key) {
      setVerdicts((v) => ({ ...v, [key]: rating }));
      // Recorded quietly: a learner practising should never wait on a
      // network, and a lost verdict costs nothing but a repeat.
      if (assessmentId) {
        void fetch(
          agentNativePath("/_agent-native/actions/record-card-review"),
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ assessmentId, cardKey: key, rating }),
          },
        ).catch(() => {});
      }
    }
    if (at < deck.length - 1) go(1);
    else setTurned(false);
  };

  const shuffle = () => {
    const next = blocks.map((_, i) => i);
    for (let i = next.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [next[i], next[j]] = [next[j], next[i]];
    }
    setOrder(next);
    setShuffled(true);
    setAt(0);
    setTurned(false);
  };

  if (!card) return null;

  const missed = Object.values(verdicts).filter((v) => v === "missed").length;
  const seen = Object.keys(verdicts).length;

  return (
    <div className="space-y-3">
      <p className="text-center text-xs text-muted-foreground">
        {turned ? "The answer" : "Try to answer it, then turn the card over"}
      </p>

      <button
        type="button"
        onClick={() => setTurned((t) => !t)}
        aria-label={turned ? "Show the question" : "Show the answer"}
        className={cn(
          "flex min-h-60 w-full flex-col items-center justify-center gap-3 rounded-xl border p-8 text-center transition-colors",
          // The back looks unmistakably different, so a glance tells a
          // learner which side they are on.
          turned
            ? "border-primary/40 bg-primary/5"
            : "bg-card hover:bg-accent/40",
        )}
      >
        <span className="max-w-prose text-lg font-medium">
          {turned ? card.back : card.front}
        </span>
        {!turned && card.hint ? (
          <span className="text-xs text-muted-foreground">
            Hint: {card.hint}
          </span>
        ) : null}
        <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
          <IconRotate2 size={12} />
          {turned ? "Back to the question" : "Turn the card over"}
        </span>
      </button>

      {/* Only once they have looked. Asking before the answer is shown
          would be asking them to predict themselves; asking after is at
          least a judgement about something they have just seen.

          It is their own verdict, for their own practice. No mark comes
          from it and no teacher sees it against their name — which is also
          what keeps it honest, since a rating anyone is judged on becomes a
          performance. */}
      {turned ? (
        <div className="flex items-center justify-center gap-2">
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => rate("missed")}
          >
            Didn&apos;t know it
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => rate("got_it")}
          >
            Knew it
          </Button>
        </div>
      ) : null}

      <div className="flex items-center justify-center gap-4">
        <Button
          type="button"
          size="icon"
          variant="ghost"
          onClick={() => go(-1)}
          disabled={at === 0}
          aria-label="Previous card"
        >
          <IconChevronLeft size={18} />
        </Button>
        <span className="text-xs tabular-nums text-muted-foreground">
          {at + 1} of {deck.length}
        </span>
        <Button
          type="button"
          size="icon"
          variant="ghost"
          onClick={() => go(1)}
          disabled={at === deck.length - 1}
          aria-label="Next card"
        >
          <IconChevronRight size={18} />
        </Button>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[11px] text-muted-foreground">
        <span>
          {at === deck.length - 1 && seen > 0
            ? missed > 0
              ? `That is the last card. ${missed} to come back to.`
              : "That is the last card, and you knew them all."
            : "Arrow keys to move, space to turn the card over"}
        </span>
        <button
          type="button"
          onClick={shuffle}
          className="underline-offset-2 hover:text-foreground hover:underline"
        >
          {shuffled ? "Shuffle again" : "Shuffle"}
        </button>
      </div>
    </div>
  );
}

function Card({
  block,
  audience,
}: {
  block: CardBlock;
  audience: "teacher" | "student";
}) {
  const [turned, setTurned] = useState(false);

  if (audience === "teacher") {
    return (
      <div className="rounded-lg border p-4">
        <p className="text-sm font-medium">{block.front}</p>
        <p className="mt-2 border-t pt-2 text-sm text-muted-foreground">
          {block.back}
        </p>
        {block.hint && (
          <p className="mt-2 text-xs text-muted-foreground">
            Hint: {block.hint}
          </p>
        )}
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setTurned((t) => !t)}
      aria-label={turned ? "Show the question" : "Show the answer"}
      className={cn(
        "group flex min-h-28 w-full flex-col items-center justify-center gap-2 rounded-lg border p-4 text-center transition-colors",
        turned ? "bg-muted/60" : "hover:bg-accent/40",
      )}
    >
      <span className="text-sm font-medium">
        {turned ? block.back : block.front}
      </span>
      <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
        <IconRotate2 size={12} />
        {turned ? "Back to the question" : "Turn over"}
      </span>
      {!turned && block.hint && (
        <span className="text-[11px] text-muted-foreground">
          Hint: {block.hint}
        </span>
      )}
    </button>
  );
}

/** Rows and columns scroll inside their own box; the page never scrolls sideways. */
function Table({ content }: { content: Content }) {
  const columns = content.columns ?? [];
  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="w-full min-w-[32rem] text-sm">
        {columns.length > 0 && (
          <thead>
            <tr className="border-b bg-muted/40">
              {columns.map((c, i) => (
                <th
                  key={i}
                  className="px-3 py-2 text-left text-xs font-medium text-muted-foreground"
                >
                  {c}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody className="divide-y">
          {content.blocks.map((b, i) => (
            <tr key={i}>
              {((b as RowBlock).cells ?? []).map((cell, j) => (
                <td key={j} className="px-3 py-2 align-top">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Step({ index, block }: { index: number; block: StepBlock }) {
  return (
    <li className="flex gap-3">
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-medium tabular-nums">
        {index + 1}
      </span>
      <div className="min-w-0 flex-1 pt-0.5">
        <Markdown>{block.text}</Markdown>
        {block.note && (
          <p className="mt-1 text-xs text-muted-foreground">{block.note}</p>
        )}
      </div>
    </li>
  );
}

function Criterion({ block }: { block: CriterionBlock }) {
  return (
    <div className="p-3">
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm">{block.description}</p>
        {typeof block.maxPoints === "number" && (
          <span className="shrink-0 text-xs text-muted-foreground tabular-nums">
            {block.maxPoints}
          </span>
        )}
      </div>
      {block.levels?.length ? (
        <ul className="mt-2 space-y-1">
          {block.levels.map((l, i) => (
            <li key={i} className="text-xs text-muted-foreground">
              <span className="font-medium text-foreground">{l.label}</span>
              {l.description ? ` — ${l.description}` : null}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

/**
 * What to call the body on screen. "Questions" over a set of flashcards or a
 * lab procedure reads as a mistake, and a learner who thinks they have missed
 * a question will go looking for it.
 */
export function headingFor(renderAs?: string | null): string {
  switch (renderAs) {
    case "cards":
      return "Cards";
    case "steps":
      return "Method";
    case "criteria":
      return "How this is marked";
    case "table":
      return "Reference";
    case "prose":
      return "Material";
    default:
      return "Questions";
  }
}

/** Last resort: show the block's own text rather than nothing at all. */
function describeUnknown(block: unknown): string {
  if (!block || typeof block !== "object") return String(block ?? "");
  const values = Object.values(block as Record<string, unknown>).filter(
    (v) => typeof v === "string",
  );
  return values.join(" — ");
}
