import { getDb, schema } from "../db/index.js";
import { and, eq } from "drizzle-orm";
import { parseActivityContent } from "../../shared/activity-content.js";
import type { QuestionBlock } from "../../shared/activity-content.js";

/**
 * Reading a paper: which questions a learner has, and which one is next.
 *
 * Shared by serving and answering so the two can never disagree about what
 * question 3 is or how long it allows.
 */

export type Paper = {
  assessment: any;
  variant: any;
  questions: QuestionBlock[];
};

/** The paper as this learner has it, with their own variant's questions. */
export async function loadPaper(
  assessmentId: string,
  studentId: string,
): Promise<Paper> {
  const db = getDb();

  const [assessment] = await db
    .select()
    .from(schema.assessments)
    .where(eq(schema.assessments.id, assessmentId))
    .limit(1);
  if (!assessment) throw new Error("Activity not found.");

  const [assigned] = await db
    .select()
    .from(schema.studentAssessments)
    .where(
      and(
        eq(schema.studentAssessments.assessmentId, assessmentId),
        eq(schema.studentAssessments.studentId, studentId),
      ),
    )
    .limit(1);

  const variants = await db
    .select()
    .from(schema.assessmentVariants)
    .where(eq(schema.assessmentVariants.assessmentId, assessmentId));

  const variant =
    variants.find((v: any) => v.id === assigned?.variantId) ??
    variants[0] ??
    null;
  if (!variant) throw new Error("This activity has no questions yet.");

  const content = parseActivityContent(
    variant.contentJson,
    assessment.renderAs,
  );
  if (!content || content.shape !== "questions") {
    throw new Error(
      "This activity is not a set of questions, so it cannot be worked through one at a time.",
    );
  }

  return { assessment, variant, questions: content.blocks as QuestionBlock[] };
}

/**
 * When this learner's time on one question runs out.
 *
 * Null when the question carries no limit — the activity's own clock still
 * applies, but nothing hurries them through this particular question.
 */
export function questionDeadline(
  block: QuestionBlock,
  servedAt: string | null | undefined,
): string | null {
  if (!block.durationSeconds || !servedAt) return null;
  return new Date(
    new Date(servedAt).getTime() + block.durationSeconds * 1000,
  ).toISOString();
}

/** A small grace so a slow network cannot cost a learner a correct answer. */
export const LATE_ANSWER_GRACE_MS = 3000;

export function isPastQuestionDeadline(
  block: QuestionBlock,
  servedAt: string | null | undefined,
  now: Date = new Date(),
): boolean {
  const deadline = questionDeadline(block, servedAt);
  if (!deadline) return false;
  return now.getTime() > new Date(deadline).getTime() + LATE_ANSWER_GRACE_MS;
}
