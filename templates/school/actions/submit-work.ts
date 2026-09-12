import { defineAction } from "@agent-native/core";
import {
  readAppState,
  writeAppState,
} from "@agent-native/core/application-state";
import { currentAccess } from "@agent-native/core/sharing";
import { resolveStudentId } from "../server/lib/student-access.js";
import { getDb, schema } from "../server/db/index.js";
import { and, eq } from "drizzle-orm";
import { nanoid } from "nanoid";
import { z } from "zod";

export default defineAction({
  description:
    "Submit a student's work for an assessment. Creates or updates the submission row and transitions status to submitted. Only the student themselves (or an admin) can submit.",
  schema: z.object({
    assessmentId: z.string().describe("Assessment ID"),
    studentId: z
      .string()
      .optional()
      .describe(
        "Student record ID. Omit when the signed-in user is the student — it is resolved from the session.",
      ),
    content: z
      .string()
      .optional()
      .describe(
        "Final submission content (markdown). If omitted, uses the submission-draft app-state.",
      ),
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

    // A closing time has to mean something: once it passes the work is no
    // longer accepted, whatever the screen happens to be showing.
    const [activity] = await db
      .select({
        closesAt: schema.assessments.closesAt,
        status: schema.assessments.status,
        title: schema.assessments.title,
      })
      .from(schema.assessments)
      .where(eq(schema.assessments.id, args.assessmentId))
      .limit(1);
    if (activity?.closesAt && new Date(activity.closesAt) < new Date()) {
      throw new Error(
        `"${activity.title}" closed on ${new Date(activity.closesAt).toLocaleString()} and is no longer accepting work.`,
      );
    }
    if (activity?.status === "closed") {
      throw new Error(
        `"${activity.title}" is closed and no longer accepting work.`,
      );
    }

    // Find assigned variant
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

    // Check if submission already exists
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

    // Read content from draft app-state if not provided
    let content = args.content;
    if (!content && existing) {
      const draft = (await readAppState(
        `submission-draft-${existing.id}`,
      )) as any;
      content = draft?.content ?? existing.content;
    }

    const now = new Date().toISOString();
    let submissionId: string;

    if (existing) {
      submissionId = existing.id;
      await db
        .update(schema.submissions)
        .set({
          content: content ?? existing.content,
          status: "submitted",
          submittedAt: now,
          updatedAt: now,
        })
        .where(eq(schema.submissions.id, existing.id));
    } else {
      submissionId = nanoid();
      await db.insert(schema.submissions).values({
        id: submissionId,
        studentId: args.studentId,
        assessmentId: args.assessmentId,
        variantId: assigned?.variantId ?? null,
        content: content ?? "",
        attachmentsJson: "[]",
        status: "submitted",
        submittedAt: now,
        ownerEmail: userEmail ?? "",
        orgId,
        visibility: "org" as const,
      });
    }

    // Clear submission draft app-state
    await writeAppState(`submission-draft-${submissionId}`, null as any);

    return { submissionId, status: "submitted", submittedAt: now };
  },
});
