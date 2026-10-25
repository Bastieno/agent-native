import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { z } from "zod";
import { classProfileFor } from "../server/lib/staff-profile.js";

/**
 * One class, for the admin looking into it: who teaches it, its average beside
 * the school's other classes in the same subject and year group, every learner
 * with their figure, every paper with its average and who handed in, what is
 * waiting to be marked, and findings with their working. Shares its work with
 * the agent's view of the screen in `server/lib/staff-profile.ts`.
 */
export default defineAction({
  description:
    "Admin-facing: one class in depth. Its teachers, average (counted like the report card) beside the school's other classes in the same subject and year group, each learner's figure, each paper's average and hand-in count, marking and notes waiting, and findings with `basis` and `evidence`. Quote those when asked to explain a number; do not guess at causes, and suggest asking the teacher.",
  schema: z.object({
    classId: z.string().describe("Class ID (from list-classes)."),
  }),
  http: { method: "GET" },
  run: async ({ classId }) => {
    const { orgId } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    return classProfileFor(classId, { orgId });
  },
});
