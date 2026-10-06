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
 * Declare a lesson note ready to teach.
 *
 * Usually the teacher does this for their own note. An admin may do it for
 * anyone's — covering an absence, or closing out a term when a teacher has
 * left — and that is recorded on the note rather than left to be discovered.
 */
export default defineAction({
  description:
    "Finalize a lesson note (mark as finalized, clear the live edit state). Teachers cannot further edit finalized notes without reverting to draft. An admin may finalize any teacher's note; who finalized it and when is recorded on the note and shown to the teacher.",
  schema: z.object({
    id: z.string().describe("Lesson note ID"),
  }),
  http: { method: "PUT" },
  run: async (args) => {
    const db = getDb();
    const { userEmail } = currentAccess();
    const actor = userEmail ? await actorForEmail(userEmail) : null;

    const [note] = await db
      .select({
        id: schema.lessonNotes.id,
        title: schema.lessonNotes.title,
        classId: schema.lessonNotes.classId,
      })
      .from(schema.lessonNotes)
      .where(eq(schema.lessonNotes.id, args.id))
      .limit(1);
    if (!note) throw new Error(`Lesson note not found: ${args.id}`);

    // Whose note this is, is a question about the class, not about which
    // account happened to run the action that created the row. An admin who
    // planned a term's notes still finalises them on the teacher's behalf.
    const [cls] = await db
      .select({ teacherUserId: schema.classes.primaryTeacherUserId })
      .from(schema.classes)
      .where(eq(schema.classes.id, note.classId))
      .limit(1);

    const finalizedAt = new Date().toISOString();
    await db
      .update(schema.lessonNotes)
      .set({
        status: "finalized",
        finalizedByUserId: actor?.userId ?? null,
        finalizedAt,
        // A new marking starts the cycle again; the old reopening is spent.
        reopenedByUserId: null,
        reopenedAt: null,
        updatedAt: finalizedAt,
      })
      .where(eq(schema.lessonNotes.id, args.id));
    // Delete live edit app-state — note is finalized
    await writeAppState(`lesson-edit-${args.id}`, null as any);

    // Say plainly when this was somebody else's class, so the agent repeats it
    // back rather than reporting a bare success.
    const teacherUserId = isUnassignedTeacher(cls?.teacherUserId)
      ? null
      : (cls?.teacherUserId ?? null);
    const onBehalf = !!teacherUserId && teacherUserId !== actor?.userId;
    const people = await describeActors([actor?.userId, teacherUserId]);
    const who = actor ? actorLabel(people[actor.userId]) : null;
    const teacher = teacherUserId ? people[teacherUserId] : null;
    const teacherName = teacher
      ? (realNameOrNull(teacher.name, teacher.email) ?? "its teacher")
      : null;

    return {
      success: true,
      id: args.id,
      status: "finalized",
      finalizedAt,
      finalizedBy: who,
      onBehalfOfAnother: onBehalf,
      teacher: teacherName,
      message: onBehalf
        ? `"${note.title}" is marked ready${who ? `, by ${who}` : ""} — this is ${teacherName}'s class, and their own view of the note now shows who marked it and when.`
        : `"${note.title}" is marked ready.`,
    };
  },
});
