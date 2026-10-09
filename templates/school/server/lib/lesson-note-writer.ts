import { getDb, schema } from "../db/index.js";
import { and, inArray } from "drizzle-orm";
import { nanoid } from "nanoid";
import { paceObjectives } from "../../shared/objective-pacing.js";
import { describeWeeks } from "../../shared/term-weeks.js";
import type { WeekPlanEntry } from "../../shared/week-plan.js";

/**
 * Draft lesson notes for a term's units, one per week each unit covers, for
 * each class.
 *
 * Shared by the scheme-of-work generator (units it has just written) and
 * `plan-lesson-notes` (units already in the curriculum). Before, only the
 * generator wrote notes, and it refused to run once units existed — so a
 * curriculum built in a draft session had no way to get lesson notes at all.
 *
 * Three rules:
 *
 * - **A week with no unit gets no note.** It used to be given the term's last
 *   unit, so a deliberate gap in week 6 came out as a week-6 note on
 *   "Decimals". A lesson note must belong to a unit, so the honest answer is
 *   none, and the week is named in the result so nobody mistakes it for an
 *   oversight.
 * - **A note that already exists is left alone.** Running this twice, or after
 *   a teacher has started writing, must never duplicate a week or overwrite
 *   their work.
 * - **Each week carries its own share of the unit's objectives**, in order,
 *   not the whole unit's list.
 */

export type NoteUnit = {
  id: string;
  title: string;
  weekStart: number | null;
  weekEnd: number | null;
  objectives: string[];
  objectivesByWeek?: string[][];
  /** The pacing agreed with the school, when the unit carries one. */
  weekPlan?: WeekPlanEntry[] | null;
};

export type NoteTarget = {
  subjectName: string;
  gradeLevelName: string;
  termName: string;
  termStart: string;
  totalWeeks: number;
  /**
   * The first week the school keeps for examinations, when it keeps any. No
   * note is written for those weeks and they are not reported as gaps — a
   * week with no lesson in it is the school's own arrangement, not an
   * oversight. Null when the school has not said, and nothing is reserved.
   */
  reservedFromWeek?: number | null;
};

type PlannedNote = {
  unitId: string;
  unitTitle: string;
  week: number;
  lessonDate: string;
  title: string;
  content: string;
  summary: string;
  /** What this week teaches, for whatever else is written from the same plan. */
  objectives: string[];
  /** A week given to a test, a practical or revision says so here. */
  weekNote: string | null;
};

/** The Monday-anchored date a given week of the term starts on. */
export function weekStartDate(termStartISO: string, week: number): string {
  const start = new Date(termStartISO);
  start.setDate(start.getDate() + (week - 1) * 7);
  return start.toISOString().slice(0, 10);
}

/** One note per week each unit covers, capped at the end of the term. */
export function planNotes(units: NoteUnit[], target: NoteTarget) {
  const notes: PlannedNote[] = [];
  const covered = new Set<number>();

  for (const unit of units) {
    if (!unit.weekStart) continue;
    const start = unit.weekStart;
    const end = Math.min(unit.weekEnd ?? start, target.totalWeeks);

    // A plan the school agreed beats an even spread: it knows that week 6 is
    // the mid-term test and that measurement needs three weeks. The spread is
    // the fallback for a unit nobody has paced.
    const weeks = unit.weekPlan?.length
      ? unit.weekPlan.map((entry, i) => ({
          week: entry.week,
          weekOfUnit: i + 1,
          weeksInUnit: unit.weekPlan!.length,
          objectives: entry.objectives,
          note: entry.note ?? null,
          continues:
            i > 0 &&
            entry.objectives.length > 0 &&
            (() => {
              const prev = unit.weekPlan![i - 1].objectives;
              return prev[prev.length - 1] === entry.objectives[0];
            })(),
        }))
      : paceObjectives(
          unit.objectives,
          start,
          unit.weekEnd ?? start,
          unit.objectivesByWeek,
          { reservedFromWeek: target.reservedFromWeek ?? null },
        ).map((plan) => ({ ...plan, note: null as string | null }));

    for (const plan of weeks) {
      if (plan.week > end || plan.week < start) continue;
      // A week that teaches nothing new and says why — revision, a test, a
      // practical — is a week the teacher still teaches, so it gets a note
      // carrying that instead of an objective it was never given.
      if (plan.objectives.length === 0 && !plan.note) continue;
      covered.add(plan.week);
      const objectives = plan.objectives.map((o) => `- ${o}`).join("\n");
      const position = `Week ${plan.weekOfUnit} of ${plan.weeksInUnit} in this unit${
        plan.continues ? " — continuing from last week" : ""
      }.`;
      const heading = plan.note ? `## This week\n${plan.note}\n\n` : "";
      notes.push({
        unitId: unit.id,
        unitTitle: unit.title,
        objectives: plan.objectives,
        weekNote: plan.note ?? null,
        week: plan.week,
        lessonDate: weekStartDate(target.termStart, plan.week),
        title: plan.note
          ? `Week ${plan.week} — ${plan.note}`
          : `Week ${plan.week} — ${unit.title}`,
        content: `# Week ${plan.week}: ${plan.note ?? unit.title}\n\n${position}\n\n${heading}${
          plan.objectives.length
            ? `## This week's objectives\n${objectives}\n\n`
            : ""
        }## Starter\n_To be planned._\n\n## Main activity\n_To be planned._\n\n## Assessment\n_To be planned._\n`,
        summary: `${target.subjectName} · ${target.gradeLevelName} · ${target.termName}, week ${plan.week}`,
      });
    }
  }

  const uncovered: number[] = [];
  const reserved = target.reservedFromWeek ?? null;
  for (let w = 1; w <= target.totalWeeks; w++) {
    // An examination week is meant to have no lesson in it.
    if (reserved != null && w >= reserved) continue;
    if (!covered.has(w)) uncovered.push(w);
  }
  return {
    notes: notes.sort((a, b) => a.week - b.week),
    uncoveredWeeks: uncovered,
    uncoveredNote: uncovered.length
      ? `No lesson note for ${describeWeeks(uncovered).join(", ")} — no unit covers ${
          uncovered.length === 1 ? "it" : "them"
        }.`
      : null,
  };
}

/**
 * Which of the planned notes each class is still missing. A class already
 * holding a note for that unit and date keeps it.
 */
export async function missingNotes(
  classIds: string[],
  notes: PlannedNote[],
): Promise<Map<string, PlannedNote[]>> {
  const result = new Map<string, PlannedNote[]>();
  if (classIds.length === 0 || notes.length === 0) {
    for (const id of classIds) result.set(id, []);
    return result;
  }
  const unitIds = [...new Set(notes.map((n) => n.unitId))];
  const existing = await getDb()
    .select({
      classId: schema.lessonNotes.classId,
      unitId: schema.lessonNotes.unitId,
      lessonDate: schema.lessonNotes.lessonDate,
    })
    .from(schema.lessonNotes)
    .where(
      and(
        inArray(schema.lessonNotes.classId, classIds),
        inArray(schema.lessonNotes.unitId, unitIds),
      ),
    );
  const have = new Set(
    existing.map((e: any) => `${e.classId}|${e.unitId}|${e.lessonDate}`),
  );
  for (const classId of classIds) {
    result.set(
      classId,
      notes.filter((n) => !have.has(`${classId}|${n.unitId}|${n.lessonDate}`)),
    );
  }
  return result;
}

/** Write the notes each class is missing. Returns how many were written. */
export type WrittenNote = { id: string; classId: string; plan: PlannedNote };

/**
 * Write the notes, and say what was written.
 *
 * The ids matter: a week's student material is attached to its lesson note,
 * so whatever writes that material needs to know which note it just made.
 */
export async function writeNotes(
  missing: Map<string, PlannedNote[]>,
  owner: { ownerEmail: string; orgId: string },
): Promise<WrittenNote[]> {
  const db = getDb();
  const written: WrittenNote[] = [];
  for (const [classId, notes] of missing) {
    for (const note of notes) {
      const id = nanoid();
      await db.insert(schema.lessonNotes).values({
        id,
        classId,
        unitId: note.unitId,
        title: note.title,
        content: note.content,
        summary: note.summary,
        lessonDate: note.lessonDate,
        status: "draft",
        ownerEmail: owner.ownerEmail,
        orgId: owner.orgId,
        visibility: "org" as const,
      });
      written.push({ id, classId, plan: note });
    }
  }
  return written;
}
