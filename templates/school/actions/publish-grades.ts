import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getDb, schema } from "../server/db/index.js";
import { and, eq } from "drizzle-orm";
import { z } from "zod";
import { recomputeGradebook } from "../server/lib/gradebook.js";

export default defineAction({
  description:
    "Publish all grades for an assessment, making them visible to students, and close it: once the marks are out nobody can hand it in any more, and closing is what lets each learner see the right answers on their returned paper. Confirm with the teacher first.",
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

    // Publishing the marks is the end of the work. Close it, so the returned
    // papers can show the right answers (server/lib/paper-review.ts) without
    // a teacher having to remember a second step — and so nobody hands in
    // late against marks the class can already compare. Already closed stays
    // closed; this never reopens anything.
    const closed = await db
      .update(schema.assessments)
      .set({ status: "closed", updatedAt: now })
      .where(
        and(
          eq(schema.assessments.id, args.assessmentId),
          eq(schema.assessments.status, "published"),
        ),
      )
      .returning({ id: schema.assessments.id });

    return {
      success: true,
      assessmentId: args.assessmentId,
      publishedAt: now,
      gradebookEntriesUpdated: updated,
      closed: closed.length > 0,
      message:
        closed.length > 0
          ? "Marks published, and the work is now closed: learners can see their marks, feedback and the right answers."
          : "Marks published.",
    };
  },
});
