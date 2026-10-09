import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getDb, schema } from "../server/db/index.js";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { recomputeGradebook } from "../server/lib/gradebook.js";

export default defineAction({
  description:
    "Publish all grades for an assessment, making them visible to students.",
  schema: z.object({
    assessmentId: z.string().describe("Assessment ID"),
  }),
  http: { method: "POST" },
  run: async (args) => {
    const db = getDb();
    const now = new Date().toISOString();
    await db
      .update(schema.grades)
      .set({ isPublished: true, updatedAt: now })
      .where(eq(schema.grades.assessmentId, args.assessmentId));

    // The term's own figure follows from the marks, so it is recomputed here
    // rather than waiting for someone to type it in. Without this the
    // gradebook's term column stayed empty all term and a report card had to
    // work the average out for itself.
    const { orgId } = currentAccess();
    const [assessment] = await db
      .select({ classId: schema.assessments.classId })
      .from(schema.assessments)
      .where(eq(schema.assessments.id, args.assessmentId))
      .limit(1);
    const updated =
      assessment?.classId && orgId
        ? await recomputeGradebook(assessment.classId, orgId)
        : 0;

    return {
      success: true,
      assessmentId: args.assessmentId,
      publishedAt: now,
      gradebookEntriesUpdated: updated,
    };
  },
});
