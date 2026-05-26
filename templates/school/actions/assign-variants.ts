import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getDb, schema } from "../server/db/index.js";
import { eq, and } from "drizzle-orm";
import { nanoid } from "nanoid";
import { z } from "zod";

// Maps student category → variant difficulty
const CATEGORY_TO_DIFFICULTY: Record<string, string> = {
  advanced: "advanced",
  developing: "developing",
  foundational: "foundational",
};

export default defineAction({
  description:
    "Assign assessment variants to students. Use strategy=auto-by-category to automatically map advanced→advanced variant, developing→developing variant, foundational→foundational variant based on student_categories. Use strategy=manual with variantAssignments to assign specific variants.",
  schema: z.object({
    assessmentId: z.string().describe("Assessment ID"),
    strategy: z
      .enum(["auto-by-category", "manual"])
      .default("auto-by-category"),
    classId: z.string().optional().describe("Required for auto-by-category"),
    variantAssignments: z
      .array(
        z.object({
          studentId: z.string().describe("Student record ID"),
          variantId: z.string().describe("Variant ID to assign"),
        }),
      )
      .optional()
      .describe("For manual strategy: explicit student→variant mapping"),
    defaultVariantId: z
      .string()
      .optional()
      .describe("Fallback variant for students without a category"),
  }),
  http: { method: "POST" },
  run: async (args) => {
    const { userEmail } = currentAccess();
    const db = getDb();

    const assignments: Array<{
      studentId: string;
      variantId: string;
      category?: string;
    }> = [];

    if (args.strategy === "auto-by-category") {
      if (!args.classId) throw new Error("Provide --classId for auto-by-category strategy.");

      // Get all variants for this assessment
      const variants = await db
        .select()
        .from(schema.assessmentVariants)
        .where(eq(schema.assessmentVariants.assessmentId, args.assessmentId));
      const variantByDifficulty = new Map(variants.map((v) => [v.difficulty, v.id]));

      // Get all enrolled students with their categories
      const enrollments = await db
        .select()
        .from(schema.classEnrollments)
        .where(
          and(
            eq(schema.classEnrollments.classId, args.classId),
            eq(schema.classEnrollments.status, "active"),
          ),
        );

      for (const enrollment of enrollments) {
        const [student] = await db
          .select()
          .from(schema.students)
          .where(eq(schema.students.userId, enrollment.studentUserId))
          .limit(1);
        if (!student) continue;

        const [category] = await db
          .select()
          .from(schema.studentCategories)
          .where(
            and(
              eq(schema.studentCategories.studentId, student.id),
              eq(schema.studentCategories.classId, args.classId!),
            ),
          )
          .limit(1);

        const difficulty = category ? CATEGORY_TO_DIFFICULTY[category.category] : null;
        const variantId = difficulty
          ? (variantByDifficulty.get(difficulty) ?? args.defaultVariantId)
          : args.defaultVariantId;

        if (variantId) {
          assignments.push({ studentId: student.id, variantId, category: category?.category });
        }
      }
    } else if (args.strategy === "manual") {
      if (!args.variantAssignments?.length)
        throw new Error("Provide --variantAssignments for manual strategy.");
      assignments.push(
        ...args.variantAssignments.map((a) => ({ studentId: a.studentId, variantId: a.variantId })),
      );
    }

    // Insert student_assessments rows (delete existing first)
    for (const a of assignments) {
      await db
        .delete(schema.studentAssessments)
        .where(
          and(
            eq(schema.studentAssessments.studentId, a.studentId),
            eq(schema.studentAssessments.assessmentId, args.assessmentId),
          ),
        );
      await db.insert(schema.studentAssessments).values({
        id: nanoid(),
        studentId: a.studentId,
        assessmentId: args.assessmentId,
        variantId: a.variantId,
        assignedBy: userEmail ?? "agent",
      });
    }

    const summary = assignments.reduce(
      (acc, a) => {
        const key = a.category ?? "unspecified";
        acc[key] = (acc[key] ?? 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

    return {
      assigned: assignments.length,
      summary,
      message: `Assigned variants to ${assignments.length} students.`,
    };
  },
});
