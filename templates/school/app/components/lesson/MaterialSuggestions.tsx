import { useState } from "react";
import { sendToAgentChat } from "@agent-native/core/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  IconCards,
  IconFlask,
  IconListCheck,
  IconFileText,
  IconTable,
} from "@tabler/icons-react";

/**
 * What a teacher could ask for this week, offered where they already are.
 *
 * The app can make six shapes of thing — a page to read, a worksheet, a card
 * deck, a reference table, a practical, a rubric-led task — marked or not,
 * timed or not. All of that was written down only in the agent's own guide,
 * which no teacher reads, so a physics teacher met an empty chat box and had
 * to guess. Nobody asks for a card deck they do not know exists, and the app
 * then reads as "the agent didn't do much" when it was never asked.
 *
 * So the menu is shown as prompts, and the week's own objectives are written
 * into them. A chip is not a button that makes something: it opens the
 * request, already written, for the teacher to change — "make it five
 * questions, not ten" — and only then is it sent. The chip teaches the
 * asking; the teacher keeps the deciding, and no model is called until they
 * press send.
 */

/** Icons by the shape a format takes on screen, not by its name. */
const SHAPE_ICONS: Record<string, typeof IconCards> = {
  questions: IconListCheck,
  cards: IconCards,
  steps: IconFlask,
  table: IconTable,
  prose: IconFileText,
  criteria: IconListCheck,
};

/** How to ask for work of a given shape, in a teacher's words. */
const SHAPE_PROMPTS: Record<string, (format: string, ctx: string) => string> = {
  questions: (f, c) =>
    `Create a ${f} for ${c}, with a mix of recall and reasoning questions, and a marking guide for me.`,
  cards: (f, c) =>
    `Make a ${f} for ${c} — one card per key term or idea, question on the front, short answer on the back. Not marked.`,
  steps: (f, c) =>
    `Write a ${f} for ${c} — step-by-step instructions, the materials needed, and what the class should record.`,
  table: (f, c) =>
    `Make a ${f} for ${c} that the class can keep and look back at.`,
  prose: (f, c) => `Write a ${f} for ${c} my class can read on their own.`,
  criteria: (f, c) =>
    `Set a ${f} for ${c}, with the criteria it will be judged against.`,
};

export function MaterialSuggestions({
  lessonTitle,
  className,
  objectives,
  hasReading,
  blueprint,
}: {
  lessonTitle: string;
  className: string | null;
  objectives: string[];
  /** Whether a page to read already exists for this week. */
  hasReading: boolean;
  /** This subject's own kinds of work, as the school recorded them. */
  blueprint?: {
    formats?: string[];
    formatShapes?: Record<string, string>;
    defaultFormat?: string;
    typicalDurationMinutes?: number;
    gradingMode?: string;
    rubricCriteria?: string[];
  } | null;
}) {
  // What the agent needs to know to make something useful without asking.
  const context = [className, lessonTitle].filter(Boolean).join(", ");
  const covering = objectives.length
    ? ` It should cover: ${objectives.join("; ")}.`
    : "";

  // How long this subject's work usually runs and how it is usually marked.
  // The school has already answered both; leaving them out made the agent
  // guess, and a teacher then had to correct a 20-minute unmarked worksheet
  // into the 40-minute rubric-marked one the school has always set.
  const houseHabits = [
    blueprint?.typicalDurationMinutes
      ? `about ${blueprint.typicalDurationMinutes} minutes`
      : null,
    blueprint?.gradingMode === "none"
      ? "not marked"
      : blueprint?.gradingMode === "rubric"
        ? `marked against a rubric${
            blueprint.rubricCriteria?.length
              ? ` (${blueprint.rubricCriteria.join(", ")})`
              : ""
          }`
        : blueprint?.gradingMode === "points"
          ? "marked out of points"
          : null,
  ].filter(Boolean);
  const asUsualHere = houseHabits.length
    ? ` Here this kind of work is ${houseHabits.join(", and ")} — follow that unless I say otherwise.`
    : "";

  // The school's own formats for this subject, in its own words — Physics
  // here means worksheet, practical write-up, problem set, and not the
  // flashcards a fixed menu would have offered it. A subject with no
  // blueprint yet falls back to the shapes the app can render at all.
  const formats = blueprint?.formats?.length
    ? blueprint.formats
    : ["worksheet", "flashcards", "practical", "reference table"];
  const shapeOf = (format: string) =>
    blueprint?.formatShapes?.[format] ??
    (/card|term/i.test(format)
      ? "cards"
      : /practical|experiment/i.test(format)
        ? "steps"
        : /table|reference/i.test(format)
          ? "table"
          : /reading|note/i.test(format)
            ? "prose"
            : "questions");

  const offered = [
    // Something to read comes first and only while the week has none.
    ...(hasReading
      ? []
      : [
          {
            label: "A page to read",
            icon: IconFileText,
            prompt: (c: string) =>
              `Write a page my class can read for ${c}. Explain it in their own level of language, with everyday examples.`,
          },
        ]),
    ...formats.map((format) => {
      const shape = shapeOf(format);
      return {
        label: format.charAt(0).toUpperCase() + format.slice(1),
        icon: SHAPE_ICONS[shape] ?? IconListCheck,
        prompt: (c: string) =>
          (SHAPE_PROMPTS[shape] ?? SHAPE_PROMPTS.questions)(format, c),
      };
    }),
  ];

  return (
    <div className="flex flex-wrap items-center gap-1.5 pt-1">
      {offered.map(({ label, icon: Icon, prompt }) => (
        <Ask
          key={label}
          label={label}
          icon={Icon}
          initial={
            prompt(context) +
            covering +
            // A page to read has no clock and no marks.
            (label === "A page to read" ? "" : asUsualHere)
          }
        />
      ))}
    </div>
  );
}

/**
 * One suggestion: the request written out, open to editing, sent on purpose.
 *
 * Sending is deliberate because it costs a model call: the request is put in
 * the composer (`submit: false`) and the teacher presses send there, so they
 * see the whole of what is being asked and can change it first.
 */
function Ask({
  label,
  icon: Icon,
  initial,
}: {
  label: string;
  icon: typeof IconCards;
  initial: string;
}) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState(initial);

  return (
    <Popover
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        // Reopening starts from the suggestion again, not from a half-edit
        // abandoned last time.
        if (next) setText(initial);
      }}
    >
      <PopoverTrigger asChild>
        <button
          type="button"
          className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
        >
          <Icon size={13} />
          {label}
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-96 space-y-2">
        <p className="text-xs text-muted-foreground">
          Change anything here before you send it.
        </p>
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={5}
          className="text-sm"
        />
        <div className="flex justify-end">
          <Button
            size="sm"
            variant="outline"
            disabled={!text.trim()}
            onClick={() => {
              sendToAgentChat({
                message: text.trim(),
                // Into the composer, not into a run: the teacher sends it.
                submit: false,
                openSidebar: true,
              });
              setOpen(false);
            }}
          >
            Put it in the chat
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
