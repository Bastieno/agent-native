import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { writeAppState } from "@agent-native/core/application-state";
import { getDb, schema } from "../server/db/index.js";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { actorForEmail } from "../server/lib/class-access.js";
import { isUnassignedTeacher } from "../shared/class-teacher.js";
import { realNameOrNull } from "../server/lib/user-names.js";
import {
  describeActors,
  actorLabel,
} from "../server/lib/lesson-attribution.js";

/**
 * Give something to the class.
 *
 * An admin may publish to any class in the school, and should be able to:
 * someone has to cover an absence, finish setting up a subject whose teacher
 * has not arrived, or close out a term after one has left.
 *
 * What would be wrong is doing it silently. Lesson notes already record who
 * marked them ready and show it to the teacher; publishing did not, so a
 * teacher could open their portal to find twelve pieces of work live to their
 * class with nothing saying who put them there. Same intervention, same
 * answer: record it, show it, and say so out loud at the moment it happens.
 *
 * Publishing to somebody else's class also asks first. Not because it is
 * forbidden — because the person doing it should know whose class it is
 * before the class sees the work, and "I didn't realise that was Mr Smith's"
 * is not something to discover afterwards.
 */
export default defineAction({
  description:
    "Publish an activity so the class can see it. An admin may publish to any class; who published it and when is recorded and shown to the class's teacher. Publishing to a class you do not teach asks for confirmation first, naming the teacher.",
  schema: z.object({
    id: z.string().describe("Activity ID"),
    confirm: z
      .boolean()
      .optional()
      .default(false)
      .describe(
        "Required only when publishing to a class someone else teaches",
      ),
  }),
  http: { method: "POST" },
  run: async (args) => {
    const db = getDb();
    const { userEmail } = currentAccess();
    const actor = userEmail ? await actorForEmail(userEmail) : null;

    const [row] = await db
      .select({
        classId: schema.assessments.classId,
        title: schema.assessments.title,
        status: schema.assessments.status,
        className: schema.classes.name,
        teacherUserId: schema.classes.primaryTeacherUserId,
      })
      .from(schema.assessments)
      .leftJoin(
        schema.classes,
        eq(schema.classes.id, schema.assessments.classId),
      )
      .where(eq(schema.assessments.id, args.id))
      .limit(1);
    if (!row) throw new Error("Activity not found.");

    // A class can be planned before it is staffed, but work cannot be set
    // from one: nobody would be answerable for marking it or for the learners
    // who ask about it.
    if (isUnassignedTeacher(row.teacherUserId)) {
      throw new Error(
        `${row.className ?? "That class"} has no teacher assigned, so work cannot be published to it yet. Assign a teacher first.`,
      );
    }

    const teacherUserId = row.teacherUserId ?? null;
    const onBehalf = !!teacherUserId && teacherUserId !== actor?.userId;
    const people = await describeActors([actor?.userId, teacherUserId]);
    const who = actor ? actorLabel(people[actor.userId]) : null;
    const teacher = teacherUserId ? people[teacherUserId] : null;
    const teacherName = teacher
      ? (realNameOrNull(teacher.name, teacher.email) ?? "its teacher")
      : null;

    if (onBehalf && !args.confirm) {
      return {
        success: false,
        needsConfirmation: true,
        id: args.id,
        teacher: teacherName,
        className: row.className,
        message: `${row.className ?? "That class"} is ${teacherName}'s class. Publishing "${row.title}" puts it in front of their learners now, and their portal will show that you did it. Re-run with confirm=true to go ahead.`,
      };
    }

    const publishedAt = new Date().toISOString();
    await db
      .update(schema.assessments)
      .set({
        status: "published",
        publishedByUserId: actor?.userId ?? null,
        publishedAt,
        updatedAt: publishedAt,
      })
      .where(eq(schema.assessments.id, args.id));
    await writeAppState("refresh-signal", { ts: Date.now() });

    return {
      success: true,
      id: args.id,
      status: "published",
      publishedAt,
      publishedBy: who,
      onBehalfOfAnother: onBehalf,
      teacher: teacherName,
      message: onBehalf
        ? `"${row.title}" is shared with ${row.className}${who ? `, by ${who}` : ""} — this is ${teacherName}'s class, and their own view now shows who shared it and when.`
        : `"${row.title}" is shared with the class.`,
    };
  },
});
