import { Markdown } from "@/components/Markdown";
import { bindUnits } from "@shared/bind-units";
import type {
  ActivityContent as Content,
  CardBlock,
  CriterionBlock,
  QuestionBlock,
  RowBlock,
  StepBlock,
} from "@shared/activity-content";

/**
 * An activity's blocks, laid out for paper.
 *
 * The screen renderer and this one share their source — the same stored blocks
 * — rather than their layout, because paper is a different medium and
 * pretending otherwise produces nonsense. A card deck on screen shows one card
 * at a time and turns over on a key press; printed, that is a single card and
 * twenty blank pages, so here it is a two-column table. An answer box on
 * screen is somewhere to type; printed, it has to be ruled lines with room to
 * write in.
 *
 * What it is not is a second transcription. Until now printing a worksheet
 * meant retyping it into markdown, and four options typed on one line came out
 * as "A. gram B. kilogram C. tonne D. pound" — not a question anyone can
 * answer on paper. The options are a list in the stored block; this prints the
 * list.
 *
 * Marking is shown only on a teacher's copy, and the class copy is stripped
 * server-side by `forLearner` rather than hidden here with CSS: a hidden
 * answer is still in the page, and "print the class copy" must not hand the
 * class an answer key the moment someone saves the page.
 */
export function PrintBlocks({
  content,
  markdown,
  marks = { one: "mark", many: "marks" },
}: {
  content: Content | null;
  markdown?: string | null;
  /** The school's own word for what a question is worth. */
  marks?: { one: string; many: string };
}) {
  // No structured body: the markdown is always written alongside, so there is
  // something to print even for activities made before shapes existed.
  if (!content) {
    return markdown ? (
      <Markdown pageBreaks className="print-body text-[13px] text-black">
        {markdown}
      </Markdown>
    ) : null;
  }

  return (
    <div className="space-y-3 text-[13px] text-black">
      {content.preamble ? (
        <Markdown className="print-body">{content.preamble}</Markdown>
      ) : null}
      <Shape content={content} marks={marks} />
    </div>
  );
}

function Shape({
  content,
  marks,
}: {
  content: Content;
  marks: { one: string; many: string };
}) {
  const blocks = content.blocks as any[];
  switch (content.shape) {
    case "questions":
      return (
        <ol className="space-y-4">
          {blocks.map((b: QuestionBlock, i) => (
            <li key={i} className="break-inside-avoid">
              <Question block={b} number={i + 1} marks={marks} />
            </li>
          ))}
        </ol>
      );
    case "cards":
      return <CardTable blocks={blocks as CardBlock[]} />;
    case "table":
      return (
        <DataTable columns={content.columns} rows={blocks as RowBlock[]} />
      );
    case "steps":
      return (
        <ol className="space-y-2">
          {blocks.map((b: StepBlock, i) => (
            <li key={i} className="flex gap-2 break-inside-avoid">
              <span className="w-5 shrink-0 tabular-nums font-medium">
                {i + 1}.
              </span>
              <span className="min-w-0">
                {bindUnits(b.text)}
                {b.note ? (
                  <span className="mt-0.5 block text-[11px] italic text-neutral-600">
                    {b.note}
                  </span>
                ) : null}
              </span>
            </li>
          ))}
        </ol>
      );
    case "criteria":
      return <Criteria blocks={blocks as CriterionBlock[]} />;
    default:
      // Prose keeps its paragraphs: each block is a line of text.
      return (
        <div className="space-y-2">
          {blocks.map((b: any, i) => (
            <p key={i}>{b?.text ?? b?.prompt ?? b?.description ?? ""}</p>
          ))}
        </div>
      );
  }
}

/** A, B, C … — how a paper labels its choices. */
const LETTERS = "ABCDEFGHIJKL".split("");

function Question({
  block,
  number,
  marks,
}: {
  block: QuestionBlock;
  number: number;
  marks: { one: string; many: string };
}) {
  const points = typeof block.points === "number" ? block.points : null;
  const hasMarking =
    block.answer !== undefined ||
    (block.acceptableAnswers?.length ?? 0) > 0 ||
    !!block.markScheme;

  return (
    <div className="flex gap-2">
      <span className="w-6 shrink-0 tabular-nums font-medium">{number}.</span>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <p className="min-w-0 flex-1">{bindUnits(block.prompt)}</p>
          {points !== null ? (
            <span className="shrink-0 text-[11px] text-neutral-600">
              [{points} {points === 1 ? marks.one : marks.many}]
            </span>
          ) : null}
        </div>

        {/* One option per line — the whole reason this route exists. */}
        {block.options?.length ? (
          <ol className="mt-1.5 space-y-1">
            {block.options.map((opt, i) => (
              <li key={i} className="flex gap-2">
                <span className="w-5 shrink-0">{LETTERS[i] ?? i + 1}.</span>
                <span className="min-w-0">{bindUnits(opt)}</span>
              </li>
            ))}
          </ol>
        ) : (
          // Nothing to choose from: room to write. A long answer gets more
          // lines, because a paragraph in the margin is not an answer.
          <AnswerLines lines={block.answerSpace === "long" ? 5 : 2} />
        )}

        {block.hint ? (
          <p className="mt-1 text-[11px] italic text-neutral-600">
            Hint: {block.hint}
          </p>
        ) : null}

        {/* Only ever present on a teacher's copy. */}
        {hasMarking ? (
          <div className="mt-1.5 border-l-2 border-neutral-300 pl-2 text-[11px] text-neutral-700">
            {block.answer !== undefined ? (
              <p>
                <span className="font-medium">Answer:</span> {answerText(block)}
              </p>
            ) : null}
            {block.acceptableAnswers?.length ? (
              <p>
                <span className="font-medium">Also accept:</span>{" "}
                {block.acceptableAnswers.join("; ")}
              </p>
            ) : null}
            {block.markScheme ? (
              <p className="whitespace-pre-line">
                <span className="font-medium">Mark scheme:</span>{" "}
                {block.markScheme}
              </p>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}

/** A choice question's answer is an index or a letter; say the option itself. */
function answerText(block: QuestionBlock): string {
  const raw = block.answer;
  if (!block.options?.length) return String(raw);
  const index =
    typeof raw === "number"
      ? raw
      : /^[A-La-l]$/.test(String(raw))
        ? LETTERS.indexOf(String(raw).toUpperCase())
        : Number(raw);
  const option = Number.isInteger(index) ? block.options[index] : undefined;
  return option ? `${LETTERS[index]}. ${option}` : String(raw);
}

function AnswerLines({ lines }: { lines: number }) {
  return (
    <div className="mt-1.5 space-y-3.5">
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className="border-b border-dotted border-neutral-400" />
      ))}
    </div>
  );
}

function CardTable({ blocks }: { blocks: CardBlock[] }) {
  return (
    <table className="w-full border-collapse text-[12px]">
      <thead>
        <tr>
          <th className="w-8 border border-neutral-400 px-1.5 py-1 text-left font-medium">
            #
          </th>
          <th className="w-[45%] border border-neutral-400 px-2 py-1 text-left font-medium">
            Front
          </th>
          <th className="border border-neutral-400 px-2 py-1 text-left font-medium">
            Back
          </th>
        </tr>
      </thead>
      <tbody>
        {blocks.map((c, i) => (
          <tr key={i} className="break-inside-avoid align-top">
            <td className="border border-neutral-400 px-1.5 py-1 tabular-nums text-neutral-600">
              {i + 1}
            </td>
            <td className="border border-neutral-400 px-2 py-1">
              {bindUnits(c.front)}
              {c.hint ? (
                <span className="mt-0.5 block text-[10px] italic text-neutral-600">
                  {c.hint}
                </span>
              ) : null}
            </td>
            <td className="border border-neutral-400 px-2 py-1">
              {bindUnits(c.back)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function DataTable({
  columns,
  rows,
}: {
  columns?: string[];
  rows: RowBlock[];
}) {
  const width = Math.max(
    columns?.length ?? 0,
    ...rows.map((r) => r.cells?.length ?? 0),
  );
  return (
    <table className="w-full border-collapse text-[12px]">
      {columns?.length ? (
        <thead>
          <tr>
            {Array.from({ length: width }).map((_, i) => (
              <th
                key={i}
                className="border border-neutral-400 px-2 py-1 text-left font-medium"
              >
                {columns[i] ?? ""}
              </th>
            ))}
          </tr>
        </thead>
      ) : null}
      <tbody>
        {rows.map((r, i) => (
          <tr key={i} className="break-inside-avoid align-top">
            {Array.from({ length: width }).map((_, c) => (
              <td key={c} className="border border-neutral-400 px-2 py-1">
                {bindUnits(r.cells?.[c] ?? "")}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function Criteria({ blocks }: { blocks: CriterionBlock[] }) {
  return (
    <table className="w-full border-collapse text-[12px]">
      <thead>
        <tr>
          <th className="border border-neutral-400 px-2 py-1 text-left font-medium">
            What is judged
          </th>
          <th className="w-16 border border-neutral-400 px-2 py-1 text-left font-medium">
            Marks
          </th>
        </tr>
      </thead>
      <tbody>
        {blocks.map((c, i) => (
          <tr key={i} className="break-inside-avoid align-top">
            <td className="border border-neutral-400 px-2 py-1">
              {bindUnits(c.description)}
              {c.levels?.length ? (
                <ul className="mt-1 space-y-0.5 text-[11px] text-neutral-700">
                  {c.levels.map((l, j) => (
                    <li key={j}>
                      <span className="font-medium">{l.label}</span>
                      {l.description ? ` — ${l.description}` : ""}
                    </li>
                  ))}
                </ul>
              ) : null}
            </td>
            <td className="border border-neutral-400 px-2 py-1 tabular-nums">
              {typeof c.maxPoints === "number" ? c.maxPoints : "—"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
