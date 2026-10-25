import {
  paperAverage,
  publishedPercentages,
} from "../server/lib/paper-profile.js";
import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getDb, schema } from "../server/db/index.js";
import { eq, and } from "drizzle-orm";
import { z } from "zod";

export default defineAction({
  description:
    "Get analytics for an assessment: submission rate, average score (published marks, as the class page counts it), and per-variant breakdown. For who has not handed in and which questions were missed, use get-paper-profile.",
  schema: z.object({
    assessmentId: z.string(),
  }),
  http: { method: "GET" },
  run: async (args) => {
    const { orgId } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const db = getDb();

    const [assessment] = await db
      .select()
      .from(schema.assessments)
      .where(eq(schema.assessments.id, args.assessmentId))
      .limit(1);
    if (!assessment) throw new Error("Assessment not found.");

    const submissions = await db
      .select()
      .from(schema.submissions)
      .where(eq(schema.submissions.assessmentId, args.assessmentId));

    const grades = await db
      .select()
      .from(schema.grades)
      .where(eq(schema.grades.assessmentId, args.assessmentId));

    const submitted = submissions.filter((s: any) =>
      ["submitted", "graded"].includes(s.status),
    );
    const graded = grades.filter((g: any) => g.score != null);
    // The same average the class page shows: published marks only, and a
    // mark of zero is a mark.
    const average = paperAverage(publishedPercentages(grades as any));

    const variants = await db
      .select()
      .from(schema.assessmentVariants)
      .where(eq(schema.assessmentVariants.assessmentId, args.assessmentId));

    const byVariant = variants.map((v: any) => {
      const varGrades = graded.filter((g: any) => g.variantId === v.id);
      return {
        variantId: v.id,
        label: v.label,
        difficulty: v.difficulty,
        count: varGrades.length,
        average: paperAverage(publishedPercentages(varGrades as any)),
      };
    });

    return {
      assessmentId: args.assessmentId,
      title: assessment.title,
      totalAssigned: submissions.length,
      submitted: submitted.length,
      graded: graded.length,
      average,
      byVariant,
    };
  },
});
