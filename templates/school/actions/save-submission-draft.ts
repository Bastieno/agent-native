import { defineAction } from "@agent-native/core";
import { writeAppState } from "@agent-native/core/application-state";
import { currentAccess } from "@agent-native/core/sharing";
import { resolveStudentId } from "../server/lib/student-access.js";
import { getDb, schema } from "../server/db/index.js";
import { and, eq } from "drizzle-orm";
import { nanoid } from "nanoid";
import { z } from "zod";

export default defineAction({
  description:
    "Save a student's in-progress submission draft without submitting. Writes to both SQL (status=draft) and submission-draft-{id} app-state (for tutor agent visibility).",
  schema: z.object({
    assessmentId: z.string(),
    studentId: z
      .string()
      .optional()
      .describe(
        "Student record ID. Omit when the signed-in user is the student — it is resolved from the session.",
      ),
    content: z.string().describe("In-progress markdown content"),
  }),
  http: { method: "POST" },
  run: async (rawArgs) => {
    const { orgId, userEmail } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const db = getDb();
    const args = {
      ...rawArgs,
      studentId: await resolveStudentId(userEmail, rawArgs.studentId, orgId),
    };

    const [assigned] = await db
      .select()
      .from(schema.studentAssessments)
      .where(
        and(
          eq(schema.studentAssessments.assessmentId, args.assessmentId),
          eq(schema.studentAssessments.studentId, args.studentId),
        ),
      )
      .limit(1);

    const [existing] = await db
      .select()
      .from(schema.submissions)
      .where(
        and(
          eq(schema.submissions.assessmentId, args.assessmentId),
          eq(schema.submissions.studentId, args.studentId),
        ),
      )
      .limit(1);

    let submissionId: string;
    if (existing) {
      submissionId = existing.id;
      await db
        .update(schema.submissions)
        .set({
          content: args.content,
          status: "draft",
          updatedAt: new Date().toISOString(),
        })
        .where(eq(schema.submissions.id, existing.id));
    } else {
      submissionId = nanoid();
      await db.insert(schema.submissions).values({
        id: submissionId,
        studentId: args.studentId,
        assessmentId: args.assessmentId,
        variantId: assigned?.variantId ?? null,
        content: args.content,
        attachmentsJson: "[]",
        status: "draft",
        ownerEmail: userEmail ?? "",
        orgId,
        visibility: "org" as const,
      });
    }

    await writeAppState(`submission-draft-${submissionId}`, {
      content: args.content,
    });
    return { submissionId, status: "draft" };
  },
});
