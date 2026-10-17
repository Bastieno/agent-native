import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getOrgSetting } from "@agent-native/core/settings";
import { writeAppState } from "@agent-native/core/application-state";
import { getDb, schema } from "../server/db/index.js";
import { eq, and, asc, inArray } from "drizzle-orm";
import { nanoid } from "nanoid";
import { z } from "zod";
import { paceObjectives } from "../shared/objective-pacing.js";
import {
  missingNotes,
  planNotes,
  writeNotes,
} from "../server/lib/lesson-note-writer.js";
import { writeStudentNotes } from "../server/lib/student-note-writer.js";
import { weekPlanFromDraft } from "../shared/week-plan.js";

/**
 * Build a term's scheme of work for one subject and year group.
 *
 * Nothing about the school is assumed: the number of teaching weeks comes from
 * the term's own dates, year groups are whatever the school created, and the
 * objectives come from whichever framework the school seeded. A school in
 * Lagos on three terms and a school in Ohio on two semesters both work.
 *
 * Pacing (which objectives fall in which week) can be supplied by the caller —
 * the agent, having read the framework objectives and the school guide — or
 * left to an even spread when no plan is given.
 */

interface PlannedUnit {
  title: string;
  description?: string;
  weekStart: number;
  weekEnd: number;
  objectives: string[];
  /** Optional: objectives per week, one array per week of the unit. */
  objectivesByWeek?: string[][];
  standards?: Array<{ framework: string; code: string; description?: string }>;
}

/** Whole weeks between two ISO dates, minimum one. */
function weeksBetween(startISO: string, endISO: string): number {
  const start = new Date(startISO);
  const end = new Date(endISO);
  const ms = end.getTime() - start.getTime();
  if (!Number.isFinite(ms) || ms <= 0) return 1;
  return Math.max(1, Math.ceil(ms / (7 * 24 * 60 * 60 * 1000)));
}

/** Spread items over buckets as evenly as possible, front-loading remainders. */
function spread<T>(items: T[], buckets: number): T[][] {
  const out: T[][] = Array.from({ length: buckets }, () => []);
  if (buckets <= 0) return out;
  const per = Math.floor(items.length / buckets);
  let extra = items.length % buckets;
  let i = 0;
  for (let b = 0; b < buckets; b++) {
    const take = per + (extra > 0 ? 1 : 0);
    if (extra > 0) extra--;
    out[b] = items.slice(i, i + take);
    i += take;
  }
  return out;
}

export default defineAction({
  description:
    "Generate a term's scheme of work for a subject and year group: units laid out week by week, each with learning objectives and standards tags, plus draft lesson notes for each week a unit covers, per class. For a subject that already has units, use plan-lesson-notes instead — this refuses rather than duplicate a curriculum. Preview by default — pass confirm=true to write it. Supply `units` to control the pacing yourself (read framework objectives first); omit it for an even spread across the term's teaching weeks.",
  schema: z.object({
    subjectId: z.string().describe("Subject to plan"),
    gradeLevelId: z.string().describe("Year group to plan for"),
    termId: z.string().describe("Term to plan — its dates set the week count"),
    framework: z
      .string()
      .optional()
      .describe("Framework to draw objectives from, e.g. 'NERDC' or 'WAEC'"),
    examWeeks: z
      .number()
      .optional()
      .describe(
        "Weeks at the end of term reserved for examinations. Defaults to the school's examWeeksPerTerm setting; when the school has not set one, none are reserved.",
      ),
    units: z
      .array(
        z.object({
          title: z.string(),
          description: z.string().optional(),
          weekStart: z.number(),
          weekEnd: z.number(),
          objectives: z.array(z.string()),
          objectivesByWeek: z
            .array(z.array(z.string()))
            .optional()
            .describe(
              "Which objectives belong to which week, one array per week of the unit. Give it when some weeks are lighter than others — a unit's word-problems week is not its introduction week. Omitted, objectives are shared out evenly in order.",
            ),
          standards: z
            .array(
              z.object({
                framework: z.string(),
                code: z.string(),
                description: z.string().optional(),
              }),
            )
            .optional(),
        }),
      )
      .optional()
      .describe("Your own pacing. Omit to spread framework objectives evenly."),
    createLessonNotes: z
      .boolean()
      .optional()
      .default(true)
      .describe("Create a draft lesson note per teaching week per class"),
    replace: z
      .boolean()
      .optional()
      .default(false)
      .describe(
        "Archive any existing units for this subject/year/term and plan again. Without it, regenerating is refused so a curriculum cannot be duplicated by accident.",
      ),
    confirm: z
      .boolean()
      .optional()
      .default(false)
      .describe("false previews the plan; true writes it"),
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
    if (!subject) throw new Error("Subject not found in this school.");

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
    if (!gradeLevel) throw new Error("Grade level not found in this school.");

    const [term] = await db
      .select()
      .from(schema.terms)
      .where(
        and(eq(schema.terms.id, args.termId), eq(schema.terms.schoolId, orgId)),
      )
      .limit(1);
    if (!term) throw new Error("Term not found in this school.");

    // The term's own dates decide the length — never a fixed number of weeks.
    const config = (await getOrgSetting(orgId, "school-config")) as any;
    const totalWeeks = weeksBetween(term.startDate, term.endDate);
    // Only what the school has said. Assuming a week here meant every school
    // on the deployment had its last teaching week quietly taken away,
    // including schools that examine mid-term or not at all. A school that
    // keeps examination weeks records how many; until it does, none are.
    const examWeeks = Math.max(
      0,
      args.examWeeks ?? config?.examWeeksPerTerm ?? 0,
    );
    const teachingWeeks = Math.max(1, totalWeeks - examWeeks);

    // Build the plan: the caller's pacing, or an even spread of whatever
    // objectives the school's framework library holds for this subject.
    let planned: PlannedUnit[] = args.units ?? [];
    let sourceFramework: string | null = args.framework ?? null;
    let objectivesAvailable = 0;

    if (planned.length === 0) {
      const frameworkRows = await db
        .select()
        .from(schema.curriculumFrameworks)
        .where(
          args.framework
            ? eq(schema.curriculumFrameworks.name, args.framework)
            : eq(schema.curriculumFrameworks.subject, subject.name),
        );
      const matching = frameworkRows.filter(
        (f: any) =>
          !f.subject || f.subject.toLowerCase() === subject.name.toLowerCase(),
      );
      const frameworkIds = matching.map((f: any) => f.id);
      sourceFramework = matching[0]?.name ?? sourceFramework;

      const objectives =
        frameworkIds.length > 0
          ? await db
              .select()
              .from(schema.frameworkObjectives)
              .where(
                inArray(schema.frameworkObjectives.frameworkId, frameworkIds),
              )
              .orderBy(asc(schema.frameworkObjectives.sequence))
          : [];
      objectivesAvailable = objectives.length;

      if (objectives.length === 0) {
        throw new Error(
          `No framework objectives found for ${subject.name}. Seed a framework first, or pass an explicit \`units\` plan.`,
        );
      }

      // Group by strand so a week's work hangs together, then spread the
      // strands across the teaching weeks.
      const byStrand = new Map<string, any[]>();
      for (const o of objectives) {
        const key = o.strand ?? subject.name;
        if (!byStrand.has(key)) byStrand.set(key, []);
        byStrand.get(key)!.push(o);
      }
      const strands = [...byStrand.entries()];
      const buckets = spread(strands, Math.min(teachingWeeks, strands.length));

      let week = 1;
      for (const bucket of buckets) {
        if (bucket.length === 0) continue;
        const weeksForBucket = Math.max(
          1,
          Math.round(teachingWeeks / buckets.length),
        );
        const weekEnd = Math.min(teachingWeeks, week + weeksForBucket - 1);
        for (const [strandName, objs] of bucket) {
          planned.push({
            title: strandName,
            description: `${subject.name} — ${strandName} (${gradeLevel.name}, ${term.name})`,
            weekStart: week,
            weekEnd,
            objectives: objs.map((o: any) => o.description),
            standards: objs.map((o: any) => ({
              framework: sourceFramework ?? "framework",
              code: o.code,
              description: o.description,
            })),
          });
        }
        week = weekEnd + 1;
        if (week > teachingWeeks) break;
      }
    }

    // Running this twice must not double a school's curriculum.
    const existingUnits = await db
      .select({ id: schema.units.id, title: schema.units.title })
      .from(schema.units)
      .where(
        and(
          eq(schema.units.subjectId, args.subjectId),
          eq(schema.units.gradeLevelId, args.gradeLevelId),
          eq(schema.units.termId, args.termId),
          eq(schema.units.status, "active"),
        ),
      );

    const classes = await db
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

    // The same plan the notes will be written from, so the preview's count is
    // the count that gets written. Unit ids do not exist yet; positions stand
    // in for them.
    const notePlan = planNotes(
      planned.map((u, i) => ({
        id: String(i),
        title: u.title,
        weekStart: u.weekStart,
        weekEnd: u.weekEnd,
        objectives: u.objectives,
        objectivesByWeek: u.objectivesByWeek,
      })),
      {
        subjectName: subject.name,
        gradeLevelName: gradeLevel.name,
        termName: term.name,
        termStart: term.startDate,
        totalWeeks: teachingWeeks,
      },
    );

    const preview = {
      subject: subject.name,
      gradeLevel: gradeLevel.name,
      term: term.name,
      termStart: term.startDate,
      termEnd: term.endDate,
      totalWeeks,
      examWeeks,
      teachingWeeks,
      framework: sourceFramework,
      objectivesAvailable,
      classes: classes.map((c: any) => c.name),
      existingUnits: existingUnits.length,
      units: planned.map((u) => ({
        title: u.title,
        weeks: `${u.weekStart}–${u.weekEnd}`,
        objectiveCount: u.objectives.length,
        // The pacing, visible before anything is written: which objectives
        // each week of the unit carries.
        byWeek: paceObjectives(
          u.objectives,
          u.weekStart,
          u.weekEnd,
          u.objectivesByWeek,
        ).map((w) => ({
          week: w.week,
          objectives: w.objectives,
          continues: w.continues,
        })),
      })),
      lessonNotesToCreate: args.createLessonNotes
        ? notePlan.notes.length * classes.length
        : 0,
      weeksWithoutLessonNote: notePlan.uncoveredWeeks,
    };

    // Lesson notes belong to a class, so with no class there is nothing to
    // attach them to. Say so rather than reporting a bare zero.
    const noClassesNote =
      classes.length === 0
        ? ` No ${subject.name} class exists for ${gradeLevel.name} yet, so no lesson notes will be created — once the class exists, run plan-lesson-notes to add them. The units stay as they are.`
        : "";
    const gapNote = notePlan.uncoveredNote ? ` ${notePlan.uncoveredNote}` : "";
    // An existing curriculum is not a reason to regenerate one. Most often the
    // person wants lesson notes for it, and that needs no archiving at all.
    const existingNote =
      existingUnits.length > 0
        ? ` ${subject.name} ${gradeLevel.name} already has ${existingUnits.length} unit(s) for ${term.name}: writing this would need replace=true, which archives them. To add lesson notes to the existing units instead, use plan-lesson-notes.`
        : "";

    if (!args.confirm) {
      return {
        preview: true,
        ...preview,
        message: `Ready to create ${planned.length} units across ${teachingWeeks} teaching weeks (${examWeeks} exam week${examWeeks === 1 ? "" : "s"}) for ${classes.length} class${classes.length === 1 ? "" : "es"}.${noClassesNote}${gapNote}${existingNote} Re-run with confirm=true to write it.`,
      };
    }

    if (existingUnits.length > 0 && !args.replace) {
      throw new Error(
        `${subject.name} ${gradeLevel.name} already has ${existingUnits.length} unit(s) planned for ${term.name}. To give them lesson notes, use plan-lesson-notes — nothing is archived. To throw them away and plan again, re-run with replace=true. To change them, edit the units.`,
      );
    }

    // ── Write ────────────────────────────────────────────────────────────
    if (existingUnits.length > 0 && args.replace) {
      // Archived, not deleted: lesson notes and assessments still point at
      // these units, and a term's history should stay readable.
      await db
        .update(schema.units)
        .set({ status: "archived", updatedAt: new Date().toISOString() })
        .where(
          inArray(
            schema.units.id,
            existingUnits.map((u: any) => u.id),
          ),
        );
    }
    const createdUnits: Array<{
      id: string;
      title: string;
      unit: PlannedUnit;
    }> = [];
    let sequence = 1;
    for (const u of planned) {
      const unitId = nanoid();
      await db.insert(schema.units).values({
        id: unitId,
        subjectId: args.subjectId,
        termId: args.termId,
        gradeLevelId: args.gradeLevelId,
        title: u.title,
        description: u.description ?? null,
        weekStart: u.weekStart,
        weekEnd: u.weekEnd,
        sequence: sequence++,
        standardsJson: JSON.stringify(u.standards ?? []),
        // Keep the pacing on the unit, so lesson notes written later — after
        // a class is created, say — follow it rather than an even spread.
        weekPlanJson: (() => {
          const plan = weekPlanFromDraft(u as any);
          return plan ? JSON.stringify(plan) : null;
        })(),
        status: "active",
        ownerEmail: userEmail ?? "",
        orgId,
        visibility: "org" as const,
      });
      let objSeq = 1;
      for (const description of u.objectives) {
        await db.insert(schema.learningObjectives).values({
          id: nanoid(),
          unitId,
          description,
          sequence: objSeq++,
        });
      }
      createdUnits.push({ id: unitId, title: u.title, unit: u });
    }

    // Draft lesson notes give teachers somewhere to start rather than an
    // empty class page — one per week each unit covers, carrying that week's
    // share of its objectives. Weeks with no unit get none.
    let lessonNotesCreated = 0;
    let studentNotesCreated = 0;
    if (args.createLessonNotes && createdUnits.length > 0 && classes.length) {
      const { notes } = planNotes(
        createdUnits.map((c) => ({
          id: c.id,
          title: c.unit.title,
          weekStart: c.unit.weekStart,
          weekEnd: c.unit.weekEnd,
          objectives: c.unit.objectives,
          objectivesByWeek: c.unit.objectivesByWeek,
        })),
        {
          subjectName: subject.name,
          gradeLevelName: gradeLevel.name,
          termName: term.name,
          termStart: term.startDate,
          totalWeeks: teachingWeeks,
        },
      );
      const created = await writeNotes(
        await missingNotes(
          classes.map((c: any) => c.id),
          notes,
        ),
        { ownerEmail: userEmail ?? "", orgId },
      );
      lessonNotesCreated = created.length;
      // Each week's note gets the page its class reads, unpublished until
      // the teacher has looked at it.
      studentNotesCreated = await writeStudentNotes(
        created,
        {
          subjectName: subject.name,
          gradeLevelName: gradeLevel.name,
          termName: term.name,
        },
        { ownerEmail: userEmail ?? "", orgId },
      );
    }

    await writeAppState("refresh-signal", { ts: Date.now() });

    return {
      preview: false,
      ...preview,
      unitsCreated: createdUnits.length,
      objectivesCreated: planned.reduce((n, u) => n + u.objectives.length, 0),
      lessonNotesCreated,
      studentNotesCreated,
      message: `Created ${createdUnits.length} units and ${lessonNotesCreated} draft lesson notes for ${subject.name} ${gradeLevel.name}, ${term.name}.${
        studentNotesCreated
          ? ` Each week also has a page for the class to read — ${studentNotesCreated} of them, unpublished until a teacher has read them.`
          : ""
      }${noClassesNote}${gapNote}`,
    };
  },
});
