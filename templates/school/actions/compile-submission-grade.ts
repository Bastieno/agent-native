import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getOrgSetting } from "@agent-native/core/settings";
import { getDb, schema } from "../server/db/index.js";
import { and, eq, inArray } from "drizzle-orm";
import { nanoid } from "nanoid";
import { z } from "zod";

/**
 * Add up what a paper earned, question by question, into one grade.
 *
 * Always unpublished. The teacher publishes, and that gate is the existing one
 * — a grade written here is visible to staff and to nobody else until someone
 * decides it is right. Marking quickly is only safe because publishing is
 * deliberate.
 *
 * Refuses to compile while any answer is still unmarked, because a total that
 * silently counts an unread answer as nought is worse than no total at all.
 */
export default defineAction({
  description:
    "Add up a student's per-question marks into a single grade for the activity. Always saved unpublished — the teacher reviews and publishes separately. Refuses while answers are unmarked, and reports anything flagged for review.",
  schema: z.object({
    assessmentId: z.string(),
    studentId: z
      .string()
      .optional()
      .describe("Student record ID. Omit to compile every student's paper."),
    force: z.coerce
      .boolean()
      .optional()
      .default(false)
      .describe(
        "Compile even though some answers are unmarked, counting them as nought. Say so to the teacher if you use it.",
      ),
  }),
  http: { method: "POST" },
  run: async (args) => {
    const { orgId, userEmail } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const db = getDb();

    const [assessment] = await db
      .select()
      .from(schema.assessments)
      .where(
        and(
          eq(schema.assessments.id, args.assessmentId),
          eq(schema.assessments.orgId, orgId),
        ),
      )
      .limit(1);
    if (!assessment) throw new Error("Activity not found.");

    const conditions = [eq(schema.submissions.assessmentId, args.assessmentId)];
    if (args.studentId) {
      conditions.push(eq(schema.submissions.studentId, args.studentId));
    }
    const submissions = await db
      .select()
      .from(schema.submissions)
      .where(and(...conditions));
    if (submissions.length === 0) {
      return { compiled: [], message: "No submissions to compile." };
    }

    const responses = await db
      .select()
      .from(schema.questionResponses)
      .where(
        inArray(
          schema.questionResponses.submissionId,
          submissions.map((s: any) => s.id),
        ),
      );

    const schoolConfig = (await getOrgSetting(orgId, "school-config")) as any;
    const levels: any[] = schoolConfig?.gradingScale?.levels ?? [];

    // Each learner is marked out of the paper they were given.
    //
    // This used one maximum for the whole class — the assessment's — so a
    // learner sitting a shorter foundational variant was scored against the
    // full paper. A scaffolded sheet worth 2 of the 7 marks capped them at
    // 29%: differentiation, the feature meant to give a struggling learner
    // something they can do, was guaranteeing they failed. To a teacher it
    // looked like the foundational group collapsing, not like a bug.
    const variants = await db
      .select({
        id: schema.assessmentVariants.id,
        totalPoints: schema.assessmentVariants.totalPoints,
      })
      .from(schema.assessmentVariants)
      .where(eq(schema.assessmentVariants.assessmentId, args.assessmentId));
    const maxByVariant = new Map<string, number>();
    for (const v of variants as any[]) {
      if (v.totalPoints) maxByVariant.set(v.id, Number(v.totalPoints));
    }
    const assessmentMax = assessment.totalPoints || 100;
    const now = new Date().toISOString();

    const compiled: any[] = [];
    const skipped: any[] = [];

    for (const submission of submissions) {
      const mine = responses.filter(
        (r: any) => r.submissionId === submission.id,
      );
      if (mine.length === 0) {
        skipped.push({ submissionId: submission.id, reason: "no answers" });
        continue;
      }

      // An answer is settled when the key marked it or a marker did.
      const unmarked = mine.filter(
        (r: any) =>
          (r.isCorrect === null || r.isCorrect === undefined) && !r.markedAt,
      );
      if (unmarked.length > 0 && !args.force) {
        skipped.push({
          submissionId: submission.id,
          reason: `${unmarked.length} answer(s) still unmarked`,
        });
        continue;
      }

      const score = mine.reduce(
        (sum: number, r: any) => sum + (r.awardedPoints ?? 0),
        0,
      );
      // Their variant's own total, falling back to the paper's when a
      // variant carries none — a single-variant activity is the common case
      // and behaves exactly as before.
      const maxScore =
        maxByVariant.get(submission.variantId ?? "") ?? assessmentMax;
      const percentage = maxScore > 0 ? (score / maxScore) * 100 : 0;
      // The school's own scale, not a letter of our choosing.
      const letterGrade =
        levels.find((l) => percentage >= l.min && percentage <= l.max)?.grade ??
        null;
      const flagged = mine.filter((r: any) => r.needsReview).length;

      const [existing] = await db
        .select()
        .from(schema.grades)
        .where(eq(schema.grades.submissionId, submission.id))
        .limit(1);

      if (existing) {
        // Never un-publish, and never overwrite a published grade's numbers
        // behind a teacher's back.
        if (existing.isPublished) {
          skipped.push({
            submissionId: submission.id,
            reason: "already published",
          });
          continue;
        }
        await db
          .update(schema.grades)
          .set({
            score,
            maxScore,
            percentage: percentage.toFixed(1),
            letterGrade,
            gradedBy: userEmail ?? "agent",
            gradedAt: now,
            updatedAt: now,
          })
          .where(eq(schema.grades.id, existing.id));
      } else {
        await db.insert(schema.grades).values({
          id: nanoid(),
          submissionId: submission.id,
          studentId: submission.studentId,
          assessmentId: args.assessmentId,
          variantId: submission.variantId ?? null,
          score,
          maxScore,
          percentage: percentage.toFixed(1),
          letterGrade,
          rubricScoresJson: "{}",
          gradedBy: userEmail ?? "agent",
          gradedAt: now,
          isPublished: false,
        });
      }

      await db
        .update(schema.submissions)
        .set({ status: "graded", updatedAt: now })
        .where(eq(schema.submissions.id, submission.id));

      compiled.push({
        submissionId: submission.id,
        studentId: submission.studentId,
        score,
        maxScore,
        percentage: `${percentage.toFixed(1)}%`,
        letterGrade,
        flaggedForReview: flagged,
      });
    }

    const totalFlagged = compiled.reduce(
      (sum, c) => sum + c.flaggedForReview,
      0,
    );
    return {
      compiled,
      skipped,
      message: compiled.length
        ? `Compiled ${compiled.length} grade(s), unpublished.${
            totalFlagged
              ? ` ${totalFlagged} answer(s) are flagged for you to check first.`
              : ""
          } Students see nothing until you publish with publish-grades.`
        : `Nothing compiled. ${skipped.map((s) => s.reason).join("; ")}`,
    };
  },
});
