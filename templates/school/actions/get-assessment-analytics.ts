import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getDb, schema } from "../server/db/index.js";
import { eq, and } from "drizzle-orm";
import { z } from "zod";

export default defineAction({
  description:
    "Get analytics for an assessment: submission rate, average score, grade distribution, and per-variant breakdown.",
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
    const scores = graded
      .map((g: any) => parseFloat(g.percentage ?? "0"))
      .filter(Boolean);
    const average = scores.length
      ? (
          scores.reduce((a: number, b: number) => a + b, 0) / scores.length
        ).toFixed(1)
      : null;

    const variants = await db
      .select()
      .from(schema.assessmentVariants)
      .where(eq(schema.assessmentVariants.assessmentId, args.assessmentId));

    const byVariant = variants.map((v: any) => {
      const varGrades = graded.filter((g: any) => g.variantId === v.id);
      const varScores = varGrades
        .map((g: any) => parseFloat(g.percentage ?? "0"))
        .filter(Boolean);
      return {
        variantId: v.id,
        label: v.label,
        difficulty: v.difficulty,
        count: varGrades.length,
        average: varScores.length
          ? (
              varScores.reduce((a: number, b: number) => a + b, 0) /
              varScores.length
            ).toFixed(1)
          : null,
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
