import { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Markdown } from "@/components/Markdown";
import { cn } from "@/lib/utils";
import { IconBulb, IconRotate2 } from "@tabler/icons-react";
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
}: {
  /** Structured body, as stored. Null/absent falls back to the markdown. */
  contentJson?: unknown;
  /** Always written alongside the blocks; the fallback and the print view. */
  markdown?: string | null;
  audience: "teacher" | "student";
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
      <ShapeBody content={content} audience={audience} />
    </div>
  );
}

function ShapeBody({
  content,
  audience,
}: {
  content: Content;
  audience: "teacher" | "student";
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
      return (
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
    </li>
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
