import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { z } from "zod";
import { teacherProfileFor } from "../server/lib/staff-profile.js";

/**
 * One teacher, for the admin who has to act on it: the classes they lead and
 * support with each class's average beside the school's other classes in the
 * same subject and year group, what is waiting on them (handed-in papers not
 * marked, marks not published, lesson notes not written), and findings with
 * how each was counted and the papers or weeks behind it. The work is in
 * `server/lib/staff-profile.ts`, which the agent's view of the screen shares.
 */
export default defineAction({
  description:
    "Admin-facing: one staff member's classes, workload and what is waiting on them. Each class average is counted the way the report card counts and is shown beside the school's other classes in the same subject and year group. Findings (marking waiting, marks unpublished, lesson notes behind, classes below the pass mark or well behind the others) each carry a `basis` and `evidence`: quote those when asked to explain a number. Say what the figures show and stop: a class figure is a reason to look, not a verdict on the teacher, and you do not know the cause. Suggest asking the teacher.",
  schema: z.object({
    userId: z
      .string()
      .describe("The staff member's user id (from list-staff)."),
  }),
  http: { method: "GET" },
  run: async ({ userId }) => {
    const { orgId } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    return teacherProfileFor(userId, { orgId });
  },
});
