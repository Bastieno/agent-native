import { defineAction } from "@agent-native/core";
import { getDb, schema } from "../server/db/index.js";
import { eq, asc } from "drizzle-orm";
import { z } from "zod";
import {
  actorLabel,
  describeActors,
} from "../server/lib/lesson-attribution.js";

/**
 * One assessment with its variants, as staff see it.
 *
 * Students must not reach this — variants carry their difficulty — so the
 * action policy restricts it to staff and the guard checks the class.
 * A learner's view is get-my-assessment.
 */
export default defineAction({
  description:
    "Get one assessment with its variants and a submission summary. Staff view; students use get-my-assessment.",
  schema: z.object({
    id: z.string().describe("Assessment ID"),
  }),
  http: { method: "GET" },
  run: async (args) => {
    const db = getDb();

    const [assessment] = await db
      .select()
      .from(schema.assessments)
      .where(eq(schema.assessments.id, args.id))
      .limit(1);
    if (!assessment) throw new Error("Assessment not found.");

    // The page above this one is the class, so it needs the class's name —
    // both to link back and to say which class the teacher is looking at.
    const [cls] = await db
      .select({ id: schema.classes.id, name: schema.classes.name })
      .from(schema.classes)
      .where(eq(schema.classes.id, assessment.classId))
      .limit(1);

    // Where this came from. Material reached from a week's lesson should
    // lead back to that week, not up to the class — the way out should
    // retrace the way in.
    const [lesson] = assessment.lessonNoteId
      ? await db
          .select({
            id: schema.lessonNotes.id,
            title: schema.lessonNotes.title,
          })
          .from(schema.lessonNotes)
          .where(eq(schema.lessonNotes.id, assessment.lessonNoteId))
          .limit(1)
      : [];

    const variants = await db
      .select()
      .from(schema.assessmentVariants)
      .where(eq(schema.assessmentVariants.assessmentId, args.id))
      .orderBy(asc(schema.assessmentVariants.position));

    const submissions = await db
      .select({
        id: schema.submissions.id,
        status: schema.submissions.status,
      })
      .from(schema.submissions)
      .where(eq(schema.submissions.assessmentId, args.id));

    // Who shared it with the class, in words rather than as an id — the same
    // attribution a lesson note carries, for the same reason.
    const actors = await describeActors([assessment.publishedByUserId]);

    return {
      assessment: {
        ...assessment,
        className: cls?.name ?? null,
        lessonTitle: lesson?.title ?? null,
        publishedBy: assessment.publishedByUserId
          ? actorLabel(actors[assessment.publishedByUserId])
          : null,
      },
      variants,
      submissionSummary: {
        total: submissions.length,
        submitted: submissions.filter((s: any) => s.status === "submitted")
          .length,
        graded: submissions.filter((s: any) => s.status === "graded").length,
      },
    };
  },
});
