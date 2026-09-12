import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { resolveStudentId } from "../server/lib/student-access.js";
import { getDb, schema } from "../server/db/index.js";
import { and, eq } from "drizzle-orm";
import { nanoid } from "nanoid";
import { z } from "zod";
import {
  activityWindow,
  closedMessage,
} from "../server/lib/activity-window.js";

/**
 * Start the clock on a timed activity for one learner.
 *
 * Idempotent by design: the first call stamps `startedAt`, every later call
 * returns the same deadline. That matters more than it looks — a learner who
 * reloads the page, loses the tablet's wifi, or comes back on a different
 * device must not be handed a fresh thirty minutes, and must not lose the time
 * they have already used either.
 *
 * Untimed work never needs this; the student view only calls it when the
 * activity carries a duration.
 */
export default defineAction({
  description:
    "Begin a timed activity for a student, starting their own countdown. Safe to call repeatedly — the first call fixes the deadline and later calls report the same one. Returns the deadline and seconds remaining.",
  schema: z.object({
    assessmentId: z.string().describe("Activity the student is starting"),
    studentId: z
      .string()
      .optional()
      .describe(
        "Student record ID. Omit when the signed-in user is the student.",
      ),
  }),
  http: { method: "POST" },
  run: async (rawArgs) => {
    const { orgId, userEmail } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const db = getDb();
    const studentId = await resolveStudentId(
      userEmail,
      rawArgs.studentId,
      orgId,
    );

    const [activity] = await db
      .select({
        title: schema.assessments.title,
        status: schema.assessments.status,
        opensAt: schema.assessments.opensAt,
        closesAt: schema.assessments.closesAt,
        durationMinutes: schema.assessments.durationMinutes,
      })
      .from(schema.assessments)
      .where(eq(schema.assessments.id, rawArgs.assessmentId))
      .limit(1);
    if (!activity) throw new Error("Activity not found.");

    const [existing] = await db
      .select()
      .from(schema.submissions)
      .where(
        and(
          eq(schema.submissions.assessmentId, rawArgs.assessmentId),
          eq(schema.submissions.studentId, studentId),
        ),
      )
      .limit(1);

    // Refuse to start something that is already over, rather than starting a
    // countdown the learner cannot possibly beat.
    const before = activityWindow(activity, existing?.startedAt);
    if (before.hasClosed)
      throw new Error(closedMessage(activity.title, before));
    if (before.notYetOpen) {
      throw new Error(
        `"${activity.title}" has not opened yet. ${before.reason}`,
      );
    }

    const now = new Date().toISOString();
    let startedAt = existing?.startedAt ?? null;

    if (!startedAt) {
      startedAt = now;
      if (existing) {
        await db
          .update(schema.submissions)
          .set({
            startedAt,
            // Only nudge an untouched row into "draft"; never walk a
            // submitted or graded one backwards.
            status:
              existing.status === "not_started" ? "draft" : existing.status,
            updatedAt: now,
          })
          .where(eq(schema.submissions.id, existing.id));
      } else {
        const [assigned] = await db
          .select()
          .from(schema.studentAssessments)
          .where(
            and(
              eq(schema.studentAssessments.assessmentId, rawArgs.assessmentId),
              eq(schema.studentAssessments.studentId, studentId),
            ),
          )
          .limit(1);
        await db.insert(schema.submissions).values({
          id: nanoid(),
          studentId,
          assessmentId: rawArgs.assessmentId,
          variantId: assigned?.variantId ?? null,
          content: "",
          attachmentsJson: "[]",
          status: "draft",
          startedAt,
          ownerEmail: userEmail ?? "",
          orgId,
          visibility: "org" as const,
        });
      }
    }

    const window = activityWindow(activity, startedAt);
    return {
      startedAt,
      alreadyStarted: !!existing?.startedAt,
      durationMinutes: activity.durationMinutes ?? null,
      deadline: window.deadline,
      secondsRemaining: window.secondsRemaining,
    };
  },
});
