import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { sql } from "drizzle-orm";
import { z } from "zod";
import { rowOf } from "../server/lib/raw-sql.js";
import {
  AccessDeniedError,
  actorForEmail,
  canAccessClass,
} from "../server/lib/class-access.js";
import { termGradesFor } from "../server/lib/term-grades.js";
import { getDb, schema } from "../server/db/index.js";
import { and, eq } from "drizzle-orm";

/**
 * A learner's marks, optionally for one class.
 *
 * Counted by the same code as the learner's own Grades page and the report
 * card (`termGradesFor`), so every figure agrees: published marks only, and
 * work that was set but not handed in is counted, not skipped. For the full
 * picture — what is going well and what needs attention — use
 * `get-student-profile`.
 */
export default defineAction({
  description:
    "Get a student's marks, optionally scoped to one class: overall average, how much of the work set was handed in, and each piece of work with its mark. Counted the way the report card counts (published marks only, missed work counted by the school's policy). A teacher sees only learners in their own classes. For what is going well and what needs attention, use get-student-profile.",
  schema: z.object({
    studentId: z.string().describe("Student record ID"),
    classId: z.string().optional(),
  }),
  http: { method: "GET" },
  run: async (args) => {
    const { orgId, userEmail } = currentAccess();
    if (!orgId) throw new Error("No school context.");

    const [student] = await getDb()
      .select({ id: schema.students.id, userId: schema.students.userId })
      .from(schema.students)
      .where(
        and(
          eq(schema.students.id, args.studentId),
          eq(schema.students.schoolId, orgId),
        ),
      )
      .limit(1);
    if (!student) throw new Error("Student not found.");

    const userRow = (await rowOf(
      sql`SELECT name, email FROM "user" WHERE id = ${student.userId} LIMIT 1`,
    )) as { name: string | null; email: string | null } | undefined;

    const term = await termGradesFor(args.studentId, orgId);
    let subjects = term.subjects;
    if (args.classId)
      subjects = subjects.filter((s) => s.classId === args.classId);

    // A teacher sees this learner only through the classes they teach.
    const actor = userEmail ? await actorForEmail(userEmail) : null;
    if (actor?.schoolRole === "teacher") {
      const allowed: typeof subjects = [];
      for (const s of subjects) {
        if (await canAccessClass(actor, s.classId)) allowed.push(s);
      }
      if (allowed.length === 0) {
        throw new AccessDeniedError(
          "This learner is not in any of your classes.",
        );
      }
      subjects = allowed;
    }

    const pieces = subjects.flatMap((s) =>
      s.pieces.map((p) => ({ ...p, subject: s.subject, classId: s.classId })),
    );
    const counted = subjects.filter((s) => s.percentage !== null);
    const handedIn = pieces.filter(
      (p) => p.state === "marked" || p.state === "waiting",
    ).length;

    return {
      studentId: args.studentId,
      name: userRow?.name ?? null,
      email: userRow?.email ?? null,
      overallAverage: counted.length
        ? Math.round(
            counted.reduce((n, s) => n + (s.percentage ?? 0), 0) /
              counted.length,
          )
        : null,
      // What was handed in out of what was set, not "100 if anything exists".
      completionRate: pieces.length
        ? Math.round((handedIn / pieces.length) * 100)
        : null,
      setCount: pieces.length,
      handedInCount: handedIn,
      missedCount: pieces.filter((p) => p.state === "missed").length,
      byAssessment: pieces.map((p) => ({
        assessmentId: p.assessmentId,
        title: p.title,
        subject: p.subject,
        state: p.state,
        score: p.score,
        maxScore: p.maxScore,
        percentage: p.percentage,
        letterGrade: p.grade,
      })),
    };
  },
});
