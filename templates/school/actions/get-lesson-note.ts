import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getSchoolRole } from "../server/lib/student-access.js";
import { getDb, schema } from "../server/db/index.js";
import { eq } from "drizzle-orm";
import { z } from "zod";
import {
  describeActors,
  actorLabel,
} from "../server/lib/lesson-attribution.js";
import { materialForLesson } from "../server/lib/student-note-writer.js";
import { getOrgSetting } from "@agent-native/core/settings";

export default defineAction({
  description:
    "Get a single lesson note by ID, with its attached resources and the material set for that week. A teacher sees the plan and everything set for the class, published or not; a learner sees only what has been published, never the plan.",
  schema: z.object({
    id: z.string().describe("Lesson note ID"),
  }),
  http: { method: "GET" },
  run: async (args) => {
    const db = getDb();
    const [note] = await db
      .select()
      .from(schema.lessonNotes)
      .where(eq(schema.lessonNotes.id, args.id))
      .limit(1);
    if (!note) throw new Error(`Lesson note not found: ${args.id}`);

    // (Class membership is checked by the action guard.)
    const { userEmail } = currentAccess();
    const role = userEmail ? await getSchoolRole(userEmail) : null;

    // A learner is no longer gated on the teacher's plan being finished.
    // The plan is not theirs to read at all now, and gating on it meant
    // sharing a page with the class did nothing until the teacher also
    // marked their own notes ready — two switches for one intention. What
    // each piece of material says about itself is what decides.

    const resources = await db
      .select()
      .from(schema.lessonResources)
      .where(eq(schema.lessonResources.lessonNoteId, args.id));

    // The lesson's own class, so the page can link back to it by name.
    const [cls] = await db
      .select({
        name: schema.classes.name,
        subjectName: schema.subjects.name,
      })
      .from(schema.classes)
      .leftJoin(
        schema.subjects,
        eq(schema.subjects.id, schema.classes.subjectId),
      )
      .where(eq(schema.classes.id, note.classId))
      .limit(1);

    // Who declared it ready and who last touched it. A teacher who did not do
    // either should see that plainly; a student has no business seeing staff
    // names against a lesson, so this is for staff only.
    const actors =
      role === "student"
        ? {}
        : await describeActors([
            note.finalizedByUserId,
            note.lastEditedByUserId,
            note.reopenedByUserId,
          ]);
    const finalizedBy = note.finalizedByUserId
      ? (actors[note.finalizedByUserId] ?? null)
      : null;
    const lastEditedBy = note.lastEditedByUserId
      ? (actors[note.lastEditedByUserId] ?? null)
      : null;
    const reopenedBy = note.reopenedByUserId
      ? (actors[note.reopenedByUserId] ?? null)
      : null;

    // A lesson note is the teacher's plan for the hour, and it was being
    // handed to the class in full: the starter questions before they are
    // asked, the materials list, the instruction to collect wrong answers
    // without correcting them. None of that is for the children sitting in
    // the lesson, and the same page that showed it is the one the tutor is
    // forbidden to give answers on.
    //
    // So a student gets what was meant for them — the lesson's name, when it
    // is, and anything attached to it — and never the plan itself.
    // What the class gets for this week. A learner sees only what has been
    // published; staff see the unpublished drafts too, which is the whole
    // point of a preview.
    const material = await materialForLesson(note.id, {
      publishedOnly: role === "student",
    });

    // What work looks like in this subject, in the school's own words. The
    // app can render six shapes; which of them belong in Physics, and what
    // this school calls them, is the school's answer, not a list in the UI.
    let blueprint: unknown = null;
    if (role !== "student" && cls?.subjectName) {
      const all = (await getOrgSetting(
        note.orgId ?? "",
        "activity-blueprints",
      )) as Record<string, unknown> | null;
      blueprint = all?.[cls.subjectName] ?? null;
    }

    if (role === "student") {
      return {
        id: note.id,
        classId: note.classId,
        unitId: note.unitId,
        title: note.title,
        lessonDate: note.lessonDate,
        status: note.status,
        className: cls?.name ?? null,
        resources,
        material,
        studentView: true,
      };
    }

    return {
      ...note,
      className: cls?.name ?? null,
      subjectName: cls?.subjectName ?? null,
      blueprint,
      resources,
      material,
      finalizedBy: actorLabel(finalizedBy),
      finalizedByRole: finalizedBy?.role ?? null,
      lastEditedBy: actorLabel(lastEditedBy),
      lastEditedByRole: lastEditedBy?.role ?? null,
      reopenedBy: actorLabel(reopenedBy),
    };
  },
});
