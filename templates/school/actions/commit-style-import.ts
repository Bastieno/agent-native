import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { writeAppState } from "@agent-native/core/application-state";
import { getDb, schema } from "../server/db/index.js";
import { and, eq } from "drizzle-orm";
import { nanoid } from "nanoid";
import { z } from "zod";
import { deriveItemStyle, type ReadQuestion } from "../shared/derive-style.js";
import { styleGuidance } from "../shared/assessment-style.js";

/**
 * Turn what was read into the school's own style.
 *
 * The questions are not kept. What a school owns at the end is a description
 * of its own habits — how long its questions run, how many options they
 * carry — and that is both all the drafter needs and the only part that is
 * safely the school's to keep.
 *
 * Previews by default, because committing adds something every subject in the
 * school can then be pointed at.
 */
export default defineAction({
  description:
    "Turn a style import into the school's own assessment style. Previews by default; pass confirm=true to write it. The questions read are discarded — only the statistics are kept. A style built from too few questions is refused unless acceptThin is passed.",
  schema: z.object({
    importId: z.string(),
    confirm: z.boolean().optional().default(false),
    acceptThin: z
      .boolean()
      .optional()
      .default(false)
      .describe(
        "Commit even though too few questions were read to support most of the style",
      ),
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
      throw new Error(`That import is already ${imp.status}.`);
    }

    let questions: ReadQuestion[] = [];
    try {
      questions = JSON.parse(imp.questionsJson) as ReadQuestion[];
    } catch {
      questions = [];
    }
    const d = deriveItemStyle(questions);
    if (d.questionsAnalysed === 0) {
      throw new Error(
        "No questions have been read into this import yet, so there is nothing to describe.",
      );
    }

    const guidance = styleGuidance(imp.styleName, d.itemStyle);

    if (!args.confirm) {
      return {
        preview: true,
        styleName: imp.styleName,
        subject: imp.subject,
        questionsRead: d.questionsAnalysed,
        confidence: d.confidence,
        wouldRecord: guidance,
        observations: d.observations,
        problems: d.problems,
        message: `Would save "${imp.styleName}"${imp.subject ? ` for ${imp.subject}` : ""} from ${d.questionsAnalysed} question(s) — ${d.confidence}. The questions themselves are not kept.${
          d.confidence === "thin"
            ? " Too few to stand behind: add more papers, or re-run with acceptThin=true if this is deliberate."
            : ""
        } Re-run with confirm=true to save it.`,
      };
    }

    if (d.confidence === "thin" && !args.acceptThin) {
      throw new Error(
        `Only ${d.questionsAnalysed} question(s) were read. That describes one paper rather than the school. Add more, or pass acceptThin=true if you mean it.`,
      );
    }

    // A school replacing its own style for a subject should not end up with two.
    const existing = await db
      .select({ id: schema.assessmentStyles.id })
      .from(schema.assessmentStyles)
      .where(
        and(
          eq(schema.assessmentStyles.orgId, orgId),
          eq(schema.assessmentStyles.name, imp.styleName),
        ),
      );
    const styleId = existing[0]?.id ?? nanoid();
    const values = {
      name: imp.styleName,
      subject: imp.subject,
      region: null,
      orgId,
      isSample: false,
      itemStyleJson: JSON.stringify(d.itemStyle),
      paperShapeJson: null,
      derivedFrom: `${d.questionsAnalysed} questions from this school's own papers${imp.source ? ` (${imp.source})` : ""}`,
      questionsAnalysed: d.questionsAnalysed,
    };
    if (existing[0]) {
      await db
        .update(schema.assessmentStyles)
        .set(values)
        .where(eq(schema.assessmentStyles.id, styleId));
    } else {
      await db
        .insert(schema.assessmentStyles)
        .values({ id: styleId, ...values });
    }

    // What was read has served its purpose; keeping it serves none.
    await db
      .update(schema.styleImports)
      .set({
        status: "committed",
        questionsJson: "[]",
        updatedAt: new Date().toISOString(),
      })
      .where(eq(schema.styleImports.id, args.importId));
    await writeAppState("refresh-signal", { ts: Date.now() });

    return {
      styleId,
      styleName: imp.styleName,
      subject: imp.subject,
      replaced: !!existing[0],
      questionsAnalysed: d.questionsAnalysed,
      recorded: guidance,
      message: `"${imp.styleName}" is now one of this school's own styles, read from ${d.questionsAnalysed} of its questions. Point a subject at it with set-subject-assessment-style. The questions read have been discarded.`,
    };
  },
});
