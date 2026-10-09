import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getDb, schema } from "../server/db/index.js";
import { and, eq } from "drizzle-orm";
import { z } from "zod";
import { jsonish } from "../shared/zod-json.js";
import { deriveItemStyle, type ReadQuestion } from "../shared/derive-style.js";
import { styleGuidance } from "../shared/assessment-style.js";

/**
 * Add questions to a style being read, and say what they now add up to.
 *
 * Every call recomputes and echoes the derivation, so the reader can see the
 * style forming — and can see, before committing, that forty questions have
 * bought them a median stem length and nothing else.
 */
export default defineAction({
  description:
    "Add a batch of questions read from the school's own papers to a style import, and get back what they add up to so far: option count, stem length, negation rate, the verbs in use, and how much the sample actually supports. Questions accumulate across calls.",
  schema: z.object({
    importId: z.string(),
    questions: jsonish(
      z.array(
        z.object({
          stem: z.string().describe("The question as printed"),
          options: z.array(z.string()).optional(),
          answer: z
            .string()
            .optional()
            .describe("The letter, for multiple choice"),
          marks: z.number().optional(),
        }),
      ),
    ).describe("The questions read in this batch"),
  }),
  http: { method: "POST" },
  run: async (args) => {
    const { orgId } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const db = getDb();

    const [imp] = await db
      .select()
      .from(schema.styleImports)
      .where(
        and(
          eq(schema.styleImports.id, args.importId),
          eq(schema.styleImports.schoolId, orgId),
        ),
      )
      .limit(1);
    if (!imp) throw new Error("Style import not found.");
    if (imp.status !== "in_progress") {
      throw new Error(
        `That import is ${imp.status} and cannot take more questions.`,
      );
    }

    let existing: ReadQuestion[] = [];
    try {
      existing = JSON.parse(imp.questionsJson) as ReadQuestion[];
    } catch {
      existing = [];
    }
    // The same question read twice should not count twice.
    const seen = new Set(existing.map((q) => q.stem.trim()));
    const added = (args.questions as ReadQuestion[]).filter(
      (q) => q?.stem?.trim() && !seen.has(q.stem.trim()),
    );
    const all = [...existing, ...added];

    await db
      .update(schema.styleImports)
      .set({
        questionsJson: JSON.stringify(all),
        updatedAt: new Date().toISOString(),
      })
      .where(eq(schema.styleImports.id, args.importId));

    const d = deriveItemStyle(all);
    return {
      importId: args.importId,
      added: added.length,
      duplicatesIgnored: args.questions.length - added.length,
      questionsRead: d.questionsAnalysed,
      confidence: d.confidence,
      sofar: styleGuidance(imp.styleName, d.itemStyle),
      observations: d.observations,
      problems: d.problems,
      message: `${d.questionsAnalysed} question(s) read — ${d.confidence}.${
        d.problems.length ? ` ${d.problems.join(" ")}` : ""
      }${
        d.confidence === "solid"
          ? " Ready to commit whenever you are."
          : " Add more papers for a style that describes the school rather than one paper."
      }`,
    };
  },
});
