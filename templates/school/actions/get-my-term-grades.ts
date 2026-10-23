import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { z } from "zod";
import { resolveStudentId } from "../server/lib/student-session.js";
import { termGradesFor } from "../server/lib/term-grades.js";

/**
 * A learner's term at a glance, the way they would want to read it: how
 * they are doing overall, what was marked most recently, and each subject
 * with its work, newest first.
 *
 * A flat list of every published mark answered none of those questions: the
 * learner had to find their subjects among sixty rows and work out an average
 * in their head. Averages here are counted as the report card counts them,
 * so the page and the document that goes home agree. The counting lives in
 * `server/lib/term-grades.ts`, which the staff view of a learner shares.
 */
export default defineAction({
  description:
    "Student-facing: the learner's term at a glance — overall average and grade, how much work was handed in, the most recently marked work, and every subject with its average and its pieces of work (marked, waiting for marks, still open, or not handed in), newest first. Averages are counted the way the report card counts them.",
  schema: z.object({
    studentId: z
      .string()
      .optional()
      .describe(
        "Student record ID. Omit when the signed-in user is the student — it is resolved from the session.",
      ),
  }),
  http: { method: "GET" },
  run: async (rawArgs) => {
    const studentId = await resolveStudentId(rawArgs.studentId);
    if (!studentId) {
      throw new Error("studentId is required — say which student you mean.");
    }
    const { orgId } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    return termGradesFor(studentId, orgId);
  },
});
