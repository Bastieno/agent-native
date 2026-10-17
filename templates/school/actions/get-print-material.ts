import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getDb, schema } from "../server/db/index.js";
import { and, eq, inArray } from "drizzle-orm";
import { z } from "zod";
import { boolish } from "../shared/zod-json.js";
import {
  forLearner,
  parseActivityContent,
} from "../shared/activity-content.js";

/**
 * A week's material, as it is stored, for printing.
 *
 * The printable-document action asks whoever is writing to compose the page
 * in markdown — right for a summary nobody has stored, wrong for a worksheet
 * the app already holds. Retyping it loses what makes it a worksheet: four
 * options typed on one line print as "A. gram B. kilogram C. tonne D. pound",
 * which is not a question anyone can answer on paper, and the marks and the
 * mark scheme are rebuilt by hand or lost.
 *
 * So this hands back the blocks themselves and the page renders them with the
 * same component the screen uses. Nothing is transcribed, so nothing can be
 * transcribed wrongly.
 *
 * `forClass` decides which half: a class's copy has the answers, the mark
 * schemes and the card backs stripped by `forLearner` — the same boundary the
 * student portal uses, not a second attempt at it.
 */
export default defineAction({
  description:
    "The stored content of a week's material, or of one activity, ready to print. Pass lessonNoteId for everything set for that week, or assessmentId for one. forClass=true strips answers, mark schemes and the marking criteria, for the copy learners are given.",
  schema: z.object({
    lessonNoteId: z.string().optional().describe("Print a whole week"),
    assessmentId: z.string().optional().describe("Print one activity"),
    forClass: boolish()
      .optional()
      .default(false)
      .describe("true for the learners' copy: no answers, no mark schemes"),
  }),
  http: { method: "GET" },
  run: async (args) => {
    const { orgId } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    if (!args.lessonNoteId && !args.assessmentId) {
      throw new Error("Name a lessonNoteId or an assessmentId to print.");
    }
    const db = getDb();

    const activities = await db
      .select({
        id: schema.assessments.id,
        title: schema.assessments.title,
        format: schema.assessments.format,
        renderAs: schema.assessments.renderAs,
        classId: schema.assessments.classId,
        totalPoints: schema.assessments.totalPoints,
        durationMinutes: schema.assessments.durationMinutes,
        gradingMode: schema.assessments.gradingMode,
        responseMode: schema.assessments.responseMode,
      })
      .from(schema.assessments)
      .where(
        and(
          eq(schema.assessments.orgId, orgId),
          args.assessmentId
            ? eq(schema.assessments.id, args.assessmentId)
            : eq(schema.assessments.lessonNoteId, args.lessonNoteId!),
        ),
      );
    if (activities.length === 0) {
      return { lesson: null, items: [], message: "There is nothing to print." };
    }

    const variants = await db
      .select()
      .from(schema.assessmentVariants)
      .where(
        inArray(
          schema.assessmentVariants.assessmentId,
          activities.map((a: any) => a.id),
        ),
      );

    // How the work is marked, for the teacher's copy only. It lives in its
    // own table rather than in the blocks, so a practical printed without it
    // came out as a procedure with "20 marks" in the corner and nothing
    // saying what the twenty marks are for.
    const rubrics = args.forClass
      ? []
      : await db
          .select({
            assessmentId: schema.rubrics.assessmentId,
            rubricId: schema.rubrics.id,
            title: schema.rubrics.title,
          })
          .from(schema.rubrics)
          .where(
            inArray(
              schema.rubrics.assessmentId,
              activities.map((a: any) => a.id),
            ),
          );
    const criteria = rubrics.length
      ? await db
          .select()
          .from(schema.rubricCriteria)
          .where(
            inArray(
              schema.rubricCriteria.rubricId,
              rubrics.map((r: any) => r.rubricId),
            ),
          )
      : [];

    const [cls] = await db
      .select({
        name: schema.classes.name,
        subjectName: schema.subjects.name,
      })
      .from(schema.classes)
      .leftJoin(
        schema.subjects,
        eq(schema.subjects.id, schema.classes.subjectId),
      )
      .where(eq(schema.classes.id, activities[0].classId))
      .limit(1);

    const [note] = args.lessonNoteId
      ? await db
          .select({
            title: schema.lessonNotes.title,
            lessonDate: schema.lessonNotes.lessonDate,
          })
          .from(schema.lessonNotes)
          .where(eq(schema.lessonNotes.id, args.lessonNoteId))
          .limit(1)
      : [];

    const items = activities.map((a: any) => {
      // One variant per activity here: printing every difficulty would hand a
      // teacher three versions of the same paper without saying which is
      // which. Where there are several, the first is the one on paper.
      const mine = variants.find((v: any) => v.assessmentId === a.id) ?? null;
      const content = parseActivityContent(mine?.contentJson, a.renderAs);
      const rubric = rubrics.find((r: any) => r.assessmentId === a.id) ?? null;
      return {
        id: a.id,
        title: a.title,
        format: a.format,
        renderAs: a.renderAs,
        totalPoints: a.totalPoints,
        durationMinutes: a.durationMinutes,
        gradingMode: a.gradingMode,
        // Nothing to hand in means nothing to write a name on.
        responseMode: a.responseMode,
        instructions: mine?.instructions ?? null,
        markdown: mine?.content ?? null,
        content: args.forClass ? forLearner(content) : content,
        rubric: rubric
          ? {
              title: rubric.title,
              criteria: criteria
                .filter((c: any) => c.rubricId === rubric.rubricId)
                .sort((x: any, y: any) => x.sequence - y.sequence)
                .map((c: any) => ({
                  description: c.description,
                  maxPoints: c.maxPoints,
                })),
            }
          : null,
      };
    });

    return {
      lesson: {
        title: note?.title ?? null,
        lessonDate: note?.lessonDate ?? null,
        className: cls?.name ?? null,
        subjectName: cls?.subjectName ?? null,
      },
      forClass: !!args.forClass,
      items,
    };
  },
});
