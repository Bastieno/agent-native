import { defineAction } from "@agent-native/core";
import { writeAppState } from "@agent-native/core/application-state";
import { currentAccess } from "@agent-native/core/sharing";
import { resolveStudentId } from "../server/lib/student-access.js";
import {
  activityWindow,
  closedMessage,
} from "../server/lib/activity-window.js";
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

    // Handed-in work is finished. A draft save arriving afterwards — a
    // debounced keystroke landing just after the submit, the tutor agent
    // saving, a second tab — must never walk the row back to "draft": the
    // teacher's list would quietly lose a submission that was made, and the
    // row would carry a submittedAt with a draft status.
    if (existing && ["submitted", "graded"].includes(existing.status)) {
      return {
        submissionId: existing.id,
        status: existing.status,
        saved: false,
        message: "Already handed in — this draft was not saved over it.",
      };
    }

    // Nor should a draft be saved into a window that has closed; the learner
    // cannot submit it, so saving would only suggest the work still counts.
    const [activity] = await db
      .select({
        title: schema.assessments.title,
        status: schema.assessments.status,
        opensAt: schema.assessments.opensAt,
        closesAt: schema.assessments.closesAt,
        durationMinutes: schema.assessments.durationMinutes,
      })
      .from(schema.assessments)
      .where(eq(schema.assessments.id, args.assessmentId))
      .limit(1);
    if (activity) {
      const window = activityWindow(activity, existing?.startedAt);
      if (window.hasClosed)
        throw new Error(closedMessage(activity.title, window));
    }

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
