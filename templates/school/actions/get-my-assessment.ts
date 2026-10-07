import { defineAction } from "@agent-native/core";
import { getDb, schema } from "../server/db/index.js";
import { eq, and } from "drizzle-orm";
import { resolveStudentId } from "../server/lib/student-session.js";
import { activityWindow } from "../server/lib/activity-window.js";
import {
  forLearner,
  parseActivityContent,
} from "../shared/activity-content.js";
import { z } from "zod";
import { currentAccess } from "@agent-native/core/sharing";
import { schoolDateStyle } from "../server/lib/school-dates.js";

/**
 * An assessment as the assigned student sees it.
 *
 * Returns only their own variant, their own submission and their own published
 * grade — and the variant never carries its `difficulty`, so a student cannot
 * learn which level they were given or that levels exist at all.
 */
export default defineAction({
  description:
    "A student's view of one assessment: their assigned questions, their submission, and their grade once published. Never exposes variant difficulty or other students' work.",
  schema: z.object({
    assessmentId: z.string().describe("Assessment ID"),
    studentId: z
      .string()
      .optional()
      .describe(
        "Student record ID. Omit when the signed-in user is the student.",
      ),
  }),
  http: { method: "GET" },
  run: async (rawArgs) => {
    const db = getDb();
    const { orgId } = currentAccess();
    const studentId = await resolveStudentId(rawArgs.studentId);
    if (!studentId) {
      throw new Error("studentId is required — say which student you mean.");
    }

    const [assessment] = await db
      .select({
        id: schema.assessments.id,
        title: schema.assessments.title,
        assessmentType: schema.assessments.assessmentType,
        format: schema.assessments.format,
        renderAs: schema.assessments.renderAs,
        responseMode: schema.assessments.responseMode,
        dueDate: schema.assessments.dueDate,
        totalPoints: schema.assessments.totalPoints,
        status: schema.assessments.status,
        classId: schema.assessments.classId,
        opensAt: schema.assessments.opensAt,
        closesAt: schema.assessments.closesAt,
        durationMinutes: schema.assessments.durationMinutes,
        navigation: schema.assessments.navigation,
        instantFeedback: schema.assessments.instantFeedback,
      })
      .from(schema.assessments)
      .where(eq(schema.assessments.id, rawArgs.assessmentId))
      .limit(1);
    if (!assessment) throw new Error("Assessment not found.");

    // Not shared with the class means not readable by the class, whatever the
    // learner knows about it.
    //
    // Every other student-facing read filters on published; this one fetched
    // by id alone, so a draft — a test still being written, or something a
    // teacher had deliberately stopped sharing — could still be read in full
    // by any enrolled learner holding its id. `unshare-assessment` promises
    // the work comes off their screens; this is what made that untrue.
    //
    // The wording matches the missing case on purpose: "there is no such
    // activity" and "you cannot see it" should be indistinguishable, or the
    // refusal itself confirms that a test exists.
    if (assessment.status !== "published" && assessment.status !== "closed") {
      throw new Error("Assessment not found.");
    }

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

    const variants = await db
      .select()
      .from(schema.assessmentVariants)
      .where(eq(schema.assessmentVariants.assessmentId, rawArgs.assessmentId));
    const mine =
      variants.find((v: any) => v.id === assigned?.variantId) ??
      variants[0] ??
      null;

    const [submission] = await db
      .select()
      .from(schema.submissions)
      .where(
        and(
          eq(schema.submissions.studentId, studentId),
          eq(schema.submissions.assessmentId, rawArgs.assessmentId),
        ),
      )
      .limit(1);

    let grade = null;
    if (submission) {
      const [g] = await db
        .select()
        .from(schema.grades)
        .where(
          and(
            eq(schema.grades.submissionId, submission.id),
            eq(schema.grades.isPublished, true),
          ),
        )
        .limit(1);
      grade = g ?? null;
    }

    // The same computation the server uses to accept or refuse the work, so a
    // countdown on the tablet and the rule in `submit-work` never disagree.
    const window = activityWindow(
      assessment,
      submission?.startedAt,
      undefined,
      await schoolDateStyle(orgId),
    );

    const [cls] = await db
      .select({ name: schema.classes.name })
      .from(schema.classes)
      .where(eq(schema.classes.id, assessment.classId))
      .limit(1);

    return {
      ...assessment,
      className: cls?.name ?? null,
      // difficulty is deliberately omitted.
      window,
      variant: mine
        ? {
            id: mine.id,
            content: mine.content,
            // Stripped of answers and mark schemes: this goes to the pupil's
            // own browser, where anything left in it is readable from the
            // network tab.
            contentJson: mine.contentJson
              ? JSON.stringify(
                  forLearner(
                    parseActivityContent(mine.contentJson, assessment.renderAs),
                  ),
                )
              : null,
            instructions: mine.instructions,
            totalPoints: mine.totalPoints,
          }
        : null,
      submission: submission ? { ...submission, grade } : null,
      submissionId: submission?.id ?? null,
    };
  },
});
