import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getDb, schema } from "../server/db/index.js";
import { eq } from "drizzle-orm";
import { z } from "zod";

export default defineAction({
  description:
    "Request a student to resubmit their work, optionally providing a reason.",
  schema: z.object({
    submissionId: z.string(),
    reason: z
      .string()
      .optional()
      .describe("Feedback to show the student explaining what to fix"),
  }),
  http: { method: "POST" },
  run: async (args) => {
    const { orgId } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const db = getDb();
    const now = new Date().toISOString();

    await db
      .update(schema.submissions)
      .set({ status: "resubmission_requested", updatedAt: now })
      .where(eq(schema.submissions.id, args.submissionId));

    return {
      submissionId: args.submissionId,
      status: "resubmission_requested",
    };
  },
});
