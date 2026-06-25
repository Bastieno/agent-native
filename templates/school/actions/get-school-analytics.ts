import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getDb, schema } from "../server/db/index.js";
import { eq, and } from "drizzle-orm";
import { z } from "zod";

export default defineAction({
  description:
    "Admin-facing: School-wide performance analytics. Aggregates grades across all classes, with optional filters by grade level, subject, or term.",
  schema: z.object({
    gradeLevel: z
      .string()
      .optional()
      .describe("Filter by grade level name (partial match), e.g. 'Grade 9'"),
    subjectName: z
      .string()
      .optional()
      .describe("Filter by subject name (partial match), e.g. 'Mathematics'"),
    termId: z.string().optional().describe("Filter by term ID"),
  }),
  http: { method: "GET" },
  run: async (args) => {
    const { orgId } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const db = getDb();

    let gradeLevels = await db
      .select()
      .from(schema.gradeLevels)
      .where(eq(schema.gradeLevels.schoolId, orgId));
    if (args.gradeLevel) {
      gradeLevels = gradeLevels.filter((g) =>
        g.name.toLowerCase().includes(args.gradeLevel!.toLowerCase()),
      );
    }

    let subjects = await db
      .select()
      .from(schema.subjects)
      .where(
        and(
          eq(schema.subjects.schoolId, orgId),
          eq(schema.subjects.status, "active"),
        ),
      );
    if (args.subjectName) {
      subjects = subjects.filter((s) =>
        s.name.toLowerCase().includes(args.subjectName!.toLowerCase()),
      );
    }

    let classes = await db
      .select()
      .from(schema.classes)
      .where(
        and(
          eq(schema.classes.orgId, orgId),
          eq(schema.classes.status, "active"),
        ),
      );
    if (args.gradeLevel && gradeLevels.length > 0) {
      const ids = gradeLevels.map((g) => g.id);
      classes = classes.filter((c) => ids.includes(c.gradeLevelId));
    }
    if (args.subjectName && subjects.length > 0) {
      const ids = subjects.map((s) => s.id);
      classes = classes.filter((c) => ids.includes(c.subjectId));
    }

    const classSummaries = [];
    for (const cls of classes) {
      const subject = subjects.find((s) => s.id === cls.subjectId);
      const gl = gradeLevels.find((g) => g.id === cls.gradeLevelId);

      const assessments = await db
        .select()
        .from(schema.assessments)
        .where(
          and(
            eq(schema.assessments.classId, cls.id),
            eq(schema.assessments.status, "published"),
          ),
        );

      const allPercentages: number[] = [];
      for (const a of assessments) {
        const grades = await db
          .select()
          .from(schema.grades)
          .where(eq(schema.grades.assessmentId, a.id));
        for (const g of grades) {
          const p = parseFloat(g.percentage ?? "");
          if (!isNaN(p)) allPercentages.push(p);
        }
      }

      const average =
        allPercentages.length > 0
          ? (
              allPercentages.reduce((a, b) => a + b, 0) / allPercentages.length
            ).toFixed(1)
          : null;

      classSummaries.push({
        classId: cls.id,
        className: cls.name,
        subjectName: subject?.name ?? "Unknown",
        gradeLevel: gl?.name ?? "Unknown",
        assessmentCount: assessments.length,
        gradedCount: allPercentages.length,
        averageScore: average,
        distribution: {
          advanced: allPercentages.filter((p) => p >= 75).length,
          developing: allPercentages.filter((p) => p >= 50 && p < 75).length,
          foundational: allPercentages.filter((p) => p < 50).length,
        },
      });
    }

    const studentProfiles = await db
      .select()
      .from(schema.schoolProfiles)
      .where(
        and(
          eq(schema.schoolProfiles.schoolId, orgId),
          eq(schema.schoolProfiles.schoolRole, "student"),
          eq(schema.schoolProfiles.status, "active"),
        ),
      );

    const scoredClasses = classSummaries.filter((c) => c.averageScore);
    const overallAverage =
      scoredClasses.length > 0
        ? (
            scoredClasses.reduce(
              (sum, c) => sum + parseFloat(c.averageScore!),
              0,
            ) / scoredClasses.length
          ).toFixed(1)
        : null;

    return {
      schoolId: orgId,
      totalStudents: studentProfiles.length,
      totalClasses: classes.length,
      overallAverage,
      classSummaries,
    };
  },
});
