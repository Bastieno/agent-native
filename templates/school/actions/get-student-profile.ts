import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { z } from "zod";
import { studentProfileFor } from "../server/lib/student-profile.js";

/**
 * One learner, for the person who has to act on it.
 *
 * Marks alone leave the reader to work out what they mean, so this says what
 * is going well and what needs attention, with how each was counted and the
 * papers behind it, and who to speak to. It is counted the way the learner's
 * own Grades page and the report card count, so nobody quotes a different
 * average for the same child. The work is in `server/lib/student-profile.ts`,
 * which the agent's view of the screen shares.
 *
 * A teacher sees only the learners in their own classes, and only those
 * classes' subjects. A position in the year group appears only when the
 * school has switched ranking on, as on the report card.
 */
export default defineAction({
  description:
    "Staff-facing: one learner's term for deciding what to do — who they are, their overall average, each subject's average beside the class's, what is going well, what needs attention (below the pass mark, missed work, falling marks, well behind the class), and suggested next steps naming the teacher and the work. Every finding has a `basis` (how it was counted) and `evidence` (the papers and figures behind it): quote those when asked to explain a number, and do not guess at causes. Counted the way the report card counts. A teacher sees only learners in their own classes. A position in the year group is given only when the school has ranking switched on.",
  schema: z.object({
    studentId: z
      .string()
      .describe(
        "Student record ID (from list-students or list-class-students).",
      ),
  }),
  http: { method: "GET" },
  run: async ({ studentId }) => {
    const { orgId, userEmail } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    return studentProfileFor(studentId, { orgId, userEmail });
  },
});
