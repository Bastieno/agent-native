import { defineAction } from "@agent-native/core";
import { getDb, schema } from "../server/db/index.js";
import { and, eq, isNull } from "drizzle-orm";
import { nanoid } from "nanoid";
import { z } from "zod";

/**
 * The assessment styles that ship with the app, as samples.
 *
 * Read from eight years of WAEC papers — 5,361 questions across five subjects
 * — and reduced to habits: how long a stem runs, how many options, how often
 * a question is negated, which words open it. No question text is kept here;
 * these are facts about wording, and a school that never opens them is
 * unaffected by their existence.
 *
 * Samples, and labelled as such. A school's own style, derived from its own
 * papers, always wins over one of these.
 */

type Style = {
  subject: string;
  itemStyle: Record<string, unknown>;
  paperShape: Record<string, unknown>;
};

const WAEC: Style[] = [
  {
    subject: "Biology",
    itemStyle: {
      optionCount: 4,
      stemLengthChars: { median: 64, p90: 119 },
      opensWith: ["The …", "Which of the following …"],
      negationRatePct: 12,
      negationWords: ["not", "except", "least"],
      answerSpread: "even across A–D",
      optionShape: "short noun phrases, all four plausible",
      mathsNotation: "none",
    },
    paperShape: {
      objective: { questions: 50, minutes: 50, marksPerQuestion: 1 },
      theory: { questions: 5, minutes: 100 },
    },
  },
  {
    subject: "Chemistry",
    itemStyle: {
      optionCount: 4,
      stemLengthChars: { median: 76, p90: 154 },
      opensWith: ["Which of the following …", "The …"],
      negationRatePct: 12,
      negationWords: ["not", "except", "cannot"],
      answerSpread: "even across A–D",
      optionShape:
        "formulae and names in plain upright text, never italic maths",
      mathsNotation: "plain text for formulae; LaTeX only for calculations",
    },
    paperShape: {
      objective: { questions: 50, minutes: 60, marksPerQuestion: 1 },
      theory: { questions: 5, minutes: 120 },
    },
  },
  {
    subject: "English Language",
    itemStyle: {
      optionCount: 4,
      stemLengthChars: { median: 40, p90: 89 },
      opensWith: ["a sentence carrying the task", "The …"],
      negationRatePct: 6,
      answerSpread: "even across A–D",
      optionShape: "single words or short phrases of the same part of speech",
      sharedInstruction:
        "most items sit under a shared instruction — nearest in meaning, best completes the gap, interpretation — and the instruction carries the task",
      mathsNotation: "none",
    },
    paperShape: {
      objective: { questions: 80, minutes: 60, marksPerQuestion: 1 },
    },
  },
  {
    subject: "General Mathematics",
    itemStyle: {
      optionCount: 4,
      stemLengthChars: { median: 87, p90: 226 },
      opensWith: ["Find …", "If …", "Simplify …", "Calculate …", "Solve …"],
      commandVerbs: [
        "find",
        "simplify",
        "calculate",
        "solve",
        "express",
        "evaluate",
      ],
      negationRatePct: 5,
      answerSpread: "even across A–D",
      optionShape:
        "the three wrong options are the results of plausible slips, not random numbers",
      mathsNotation: "LaTeX, fenced with $…$",
      calculatorAssumed: false,
    },
    paperShape: {
      objective: {
        questions: 50,
        minutes: 90,
        marksPerQuestion: 1,
        calculator: false,
      },
      theory: { questions: 13, minutes: 150 },
    },
  },
  {
    subject: "Physics",
    itemStyle: {
      optionCount: 4,
      stemLengthChars: { median: 111, p90: 251 },
      opensWith: ["A … ", "The …", "Which of the following …"],
      commandVerbs: ["determine", "calculate", "state"],
      negationRatePct: 9,
      answerSpread: "even across A–D",
      optionShape:
        "quantities with units; wrong options follow from a wrong step, not a wrong magnitude",
      mathsNotation: "LaTeX, fenced with $…$",
      calculatorAssumed: true,
      constantsGiven:
        "constants a question needs are stated in the stem, in brackets",
    },
    paperShape: {
      objective: {
        questions: 50,
        minutes: 75,
        marksPerQuestion: 1,
        calculator: true,
      },
      theory: { questions: 12, minutes: 90 },
    },
  },
];

const DERIVED_FROM =
  "WAEC past papers 2017–2025 (objective and theory), read for wording only";

export default defineAction({
  description:
    "Install the assessment styles that ship with the app (WAEC, as samples). Idempotent: a style already present is left alone.",
  schema: z.object({}),
  http: { method: "POST" },
  run: async () => {
    const db = getDb();
    let created = 0;
    for (const style of WAEC) {
      const [existing] = await db
        .select({ id: schema.assessmentStyles.id })
        .from(schema.assessmentStyles)
        .where(
          and(
            eq(schema.assessmentStyles.name, "WAEC"),
            eq(schema.assessmentStyles.subject, style.subject),
            isNull(schema.assessmentStyles.orgId),
          ),
        )
        .limit(1);
      if (existing) continue;
      await db.insert(schema.assessmentStyles).values({
        id: nanoid(),
        name: "WAEC",
        subject: style.subject,
        region: "West Africa",
        orgId: null,
        isSample: true,
        itemStyleJson: JSON.stringify(style.itemStyle),
        paperShapeJson: JSON.stringify(style.paperShape),
        derivedFrom: DERIVED_FROM,
        questionsAnalysed: null,
      });
      created++;
    }
    return {
      created,
      message: `${created} WAEC assessment style(s) installed as samples. A school attaches one per subject; its own style, read from its own papers, always wins over these.`,
    };
  },
});
