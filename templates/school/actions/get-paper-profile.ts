import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { z } from "zod";
import { paperProfileFor } from "../server/lib/paper-profile.js";

export default defineAction({
  description:
    "Staff-facing: how a class did on one paper — who has handed in and who has not (by name), the average of published marks (counted exactly as the class page counts it), how many marks sit below the pass mark, how many are waiting to be marked, and the questions most often missed. Use it for 'why is this paper low?': quote its figures and how they were counted, and do not guess at causes; suggest asking the teacher. Prefer it to get-assessment-analytics.",
  schema: z.object({
    assessmentId: z.string().describe("Activity ID (the paper's id)"),
  }),
  http: { method: "GET" },
  run: async ({ assessmentId }) => {
    const { orgId } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    return paperProfileFor(assessmentId, orgId);
  },
});
