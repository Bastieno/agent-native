import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { writeAppState } from "@agent-native/core/application-state";
import { getDb, schema } from "../server/db/index.js";
import { and, asc, eq, inArray } from "drizzle-orm";
import { z } from "zod";
import { boolish } from "../shared/zod-json.js";
import { termWeekCount } from "../shared/term-weeks.js";
import { reservedFromWeek } from "../shared/objective-pacing.js";
import { getOrgSetting } from "@agent-native/core/settings";
import { parseWeekPlan } from "../shared/week-plan.js";
import {
  missingNotes,
  planNotes,
  writeNotes,
} from "../server/lib/lesson-note-writer.js";
import {
  countMissingStudentNotes,
  existingNotesForPlan,
  writeStudentNotes,
} from "../server/lib/student-note-writer.js";
import {
  accessibleClassIds,
  actorForEmail,
} from "../server/lib/class-access.js";

/**
 * Draft lesson notes for a term's curriculum that already exists.
 *
 * Only the scheme-of-work generator used to write lesson notes, and it refuses
 * once a subject has units — rightly, since running it again would duplicate
 * the curriculum. But that left a curriculum built any other way (a draft
 * session, or units made by hand) with no route to lesson notes except
 * archiving it and generating a new one.
 *
 * This reads the units as they stand and writes nothing to them. It fills in
 * only the notes each class is missing, so it is safe to run again after a new
 * class is created or a unit is added.
 */
export default defineAction({
  description:
    "Create draft lesson notes from a subject's existing curriculum for a year group and term: one per week each unit covers, for each class, carrying that week's share of the unit's objectives. Leaves the units untouched and skips notes a class already has. Weeks no unit covers get no note and are named in the result. Previews by default; pass confirm=true to write. Use this, not generate-scheme-of-work, when the units already exist.",
  schema: z.object({
    subjectId: z.string().describe("Subject"),
    gradeLevelId: z.string().describe("Year group"),
    termId: z.string().describe("Term"),
    classId: z
      .string()
      .optional()
      .describe(
        "Only this class. Omit for every class of this subject and year group.",
      ),
    studentNotes: boolish()
      .optional()
      .default(true)
      .describe(
        "Also draft the page each week's class reads, from the same objectives. Unpublished until a teacher publishes it. Pass false to write only the teacher's notes.",
      ),
    confirm: z
      .boolean()
      .optional()
      .default(false)
      .describe("false previews; true writes the notes"),
  }),
  http: { method: "POST" },
  run: async (args) => {
    const { orgId, userEmail } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const db = getDb();

    const [subject] = await db
      .select()
      .from(schema.subjects)
      .where(
        and(
          eq(schema.subjects.id, args.subjectId),
          eq(schema.subjects.schoolId, orgId),
        ),
      )
      .limit(1);
    if (!subject) throw new Error("Subject not found.");
    const [gradeLevel] = await db
      .select()
      .from(schema.gradeLevels)
      .where(
        and(
          eq(schema.gradeLevels.id, args.gradeLevelId),
          eq(schema.gradeLevels.schoolId, orgId),
        ),
      )
      .limit(1);
    if (!gradeLevel) throw new Error("Year group not found.");
    const [term] = await db
      .select()
      .from(schema.terms)
      .where(
        and(eq(schema.terms.id, args.termId), eq(schema.terms.schoolId, orgId)),
      )
      .limit(1);
    if (!term) throw new Error("Term not found.");

    const units = await db
      .select()
      .from(schema.units)
      .where(
        and(
          eq(schema.units.subjectId, args.subjectId),
          eq(schema.units.gradeLevelId, args.gradeLevelId),
          eq(schema.units.termId, args.termId),
          eq(schema.units.status, "active"),
        ),
      );
    if (units.length === 0) {
      throw new Error(
        `${subject.name} ${gradeLevel.name} has no units for ${term.name}, so there is nothing to write lesson notes from. Build the curriculum first.`,
      );
    }

    const objectiveRows = await db
      .select()
      .from(schema.learningObjectives)
      .where(
        inArray(
          schema.learningObjectives.unitId,
          units.map((u: any) => u.id),
        ),
      )
      .orderBy(asc(schema.learningObjectives.sequence));

    // Every class of this subject and year group — narrowed to one when asked,
    // and for a teacher to the classes they actually teach.
    let classes = await db
      .select({ id: schema.classes.id, name: schema.classes.name })
      .from(schema.classes)
      .where(
        and(
          eq(schema.classes.orgId, orgId),
          eq(schema.classes.subjectId, args.subjectId),
          eq(schema.classes.gradeLevelId, args.gradeLevelId),
          eq(schema.classes.status, "active"),
        ),
      );
    if (args.classId) {
      classes = classes.filter((c: any) => c.id === args.classId);
      if (classes.length === 0) {
        throw new Error(
          `That class is not a ${subject.name} ${gradeLevel.name} class.`,
        );
      }
    }
    const actor = userEmail ? await actorForEmail(userEmail) : null;
    if (actor?.schoolRole === "teacher") {
      const mine = new Set(await accessibleClassIds(actor));
      classes = classes.filter((c: any) => mine.has(c.id));
    }

    const totalWeeks = termWeekCount(term.startDate, term.endDate) ?? 1;
    // Weeks the school keeps for examinations get no lesson note, and are not
    // reported as gaps. Only when the school has said so.
    const config = (await getOrgSetting(orgId, "school-config")) as any;
    const reserved = reservedFromWeek(totalWeeks, config?.examWeeksPerTerm);
    const plan = planNotes(
      [...units]
        .sort(
          (a: any, b: any) =>
            (a.weekStart ?? 0) - (b.weekStart ?? 0) || a.sequence - b.sequence,
        )
        .map((u: any) => ({
          id: u.id,
          title: u.title,
          weekStart: u.weekStart,
          weekEnd: u.weekEnd,
          objectives: objectiveRows
            .filter((o: any) => o.unitId === u.id)
            .map((o: any) => o.description),
          // The pacing agreed with the school, when the unit carries one.
          weekPlan: parseWeekPlan(u.weekPlanJson),
        })),
      {
        subjectName: subject.name,
        gradeLevelName: gradeLevel.name,
        termName: term.name,
        termStart: term.startDate,
        totalWeeks,
        reservedFromWeek: reserved,
      },
    );

    const missing = await missingNotes(
      classes.map((c: any) => c.id),
      plan.notes,
    );
    const perClass = classes.map((c: any) => ({
      class: c.name,
      toCreate: missing.get(c.id)?.length ?? 0,
      alreadyHas: plan.notes.length - (missing.get(c.id)?.length ?? 0),
    }));
    const toCreate = perClass.reduce((n, c) => n + c.toCreate, 0);

    const summary = {
      subject: subject.name,
      gradeLevel: gradeLevel.name,
      term: term.name,
      units: units.length,
      notesPerClass: plan.notes.length,
      weeksWithoutLessonNote: plan.uncoveredWeeks,
      classes: perClass,
    };
    const gap = plan.uncoveredNote ? ` ${plan.uncoveredNote}` : "";

    if (classes.length === 0) {
      return {
        preview: !args.confirm,
        ...summary,
        lessonNotesToCreate: 0,
        message: `No ${subject.name} class exists for ${gradeLevel.name}${
          actor?.schoolRole === "teacher" ? " that you teach" : ""
        }, so there is nothing to attach lesson notes to. Create the class first, then run this again.`,
      };
    }

    // How many learners' pages are missing — including for weeks whose
    // teacher note already exists, which is the common case now.
    const studentNotesToCreate = args.studentNotes
      ? await countMissingStudentNotes(
          await existingNotesForPlan(
            classes.map((c: any) => c.id),
            plan.notes,
          ),
          toCreate,
        )
      : 0;

    if (!args.confirm) {
      return {
        preview: true,
        ...summary,
        lessonNotesToCreate: toCreate,
        studentNotesToCreate,
        message: toCreate
          ? `Would create ${toCreate} draft lesson note(s) across ${classes.length} class(es) from ${units.length} existing unit(s)${
              args.studentNotes
                ? ", each with a page for the class to read, drafted from the same objectives and left unpublished"
                : ""
            }. The units are not changed.${gap} Re-run with confirm=true to write them.`
          : studentNotesToCreate
            ? `Every class already has its lesson notes for ${subject.name} ${gradeLevel.name}, ${term.name}. ${studentNotesToCreate} week(s) have nothing for the class to read, and would get a page drafted from the same objectives, left unpublished.${gap}`
            : `Every class already has its lesson notes for ${subject.name} ${gradeLevel.name}, ${term.name}, and each week already has a page for the class. Nothing to add.${gap}`,
      };
    }

    const created = await writeNotes(missing, {
      ownerEmail: userEmail ?? "",
      orgId,
    });
    const written = created.length;
    // The teacher's plan stays the teacher's; this is what the class reads.
    // Newly written notes, plus the ones that were already there — a class
    // planned before this existed still needs its learners' pages.
    //
    // By id, because the two lists overlap: the notes just written are now
    // in the table, so `existingNotesForPlan` returns them too. Passing the
    // same note twice made two reading pages for every week — 26 for 13
    // lessons, the second of each pair left on the placeholder, waiting to
    // be published beside the real one.
    const needing = args.studentNotes
      ? [
          ...new Map(
            [
              ...created,
              ...(await existingNotesForPlan(
                classes.map((c: any) => c.id),
                plan.notes,
              )),
            ].map((n) => [n.id, n]),
          ).values(),
        ]
      : [];
    const studentNotesCreated = args.studentNotes
      ? await writeStudentNotes(
          needing,
          {
            subjectName: subject.name,
            gradeLevelName: gradeLevel.name,
            termName: term.name,
          },
          { ownerEmail: userEmail ?? "", orgId },
        )
      : 0;
    await writeAppState("refresh-signal", { ts: Date.now() });

    return {
      preview: false,
      ...summary,
      lessonNotesCreated: written,
      studentNotesCreated,
      message: `Created ${written} draft lesson note(s) for ${subject.name} ${gradeLevel.name}, ${term.name}, across ${classes.length} class(es). The units were not changed.${
        studentNotesCreated
          ? ` Each also has a page for the class to read — ${studentNotesCreated} of them, drafted from the same objectives and unpublished until a teacher publishes them.`
          : ""
      }${gap}`,
    };
  },
});
