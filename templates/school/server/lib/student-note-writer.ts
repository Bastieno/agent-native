import { getDb, schema } from "../db/index.js";
import { and, eq, inArray } from "drizzle-orm";
import { nanoid } from "nanoid";
import type { WrittenNote } from "./lesson-note-writer.js";
import { actorLabel, describeActors } from "./lesson-attribution.js";

/**
 * What the class reads, written beside what the teacher plans.
 *
 * The lesson note is the teacher's: the starter questions before they are
 * asked, the materials to bring, the instruction to collect wrong answers
 * without correcting them. It used to be handed to the class in full, which
 * is why it is now teacher-only — but taking it away leaves learners with
 * nothing unless somebody writes them something, and a teacher asked to write
 * every week twice will write it once.
 *
 * So each week's note gets a companion: a short page for the class, drafted
 * from the same objectives, unpublished until the teacher has read it.
 *
 * It is an ordinary activity — `renderAs: prose`, nothing to hand in, no
 * marks — because that is what the app already calls a thing a learner reads,
 * and inventing a second kind of readable page would mean two of everything:
 * two ways to publish, two places to look, two things to keep in step.
 *
 * Nothing here is written by a language model. The objectives are the
 * school's own words, and a scaffold that says plainly what the week covers
 * is honest; invented explanation would not be. The agent enriches it
 * afterwards, with the teacher watching.
 */

export type StudentNoteTarget = {
  subjectName: string;
  gradeLevelName: string;
  termName: string;
};

/** The page a learner opens for one week. */
export function studentNoteFor(
  plan: {
    week: number;
    unitTitle: string;
    objectives: string[];
    weekNote: string | null;
  },
  target: StudentNoteTarget,
): { title: string; content: string } {
  const topic = plan.weekNote ?? plan.unitTitle;
  const learn = plan.objectives.length
    ? `## What you will learn\n\n${plan.objectives
        .map((o) => `- ${o}`)
        .join("\n")}\n\n`
    : "";
  // A week with no new objectives is a test, a practical or revision — say
  // which, rather than showing a learner an empty page.
  const whatIsHappening = plan.weekNote
    ? `This week is **${plan.weekNote}**.\n\n`
    : "";

  return {
    title: `Week ${plan.week} — ${topic}`,
    content: `# Week ${plan.week}: ${topic}\n\n${whatIsHappening}${learn}## In this lesson\n\n_Your teacher will add notes for this lesson._\n`,
  };
}

/**
 * Write a student note for each lesson note that has none.
 *
 * Safe to run again: a week that already has one keeps it, so nothing a
 * teacher has edited is overwritten.
 */
export async function writeStudentNotes(
  notes: WrittenNote[],
  target: StudentNoteTarget,
  owner: { ownerEmail: string; orgId: string },
): Promise<number> {
  if (notes.length === 0) return 0;
  const db = getDb();

  const existing = await db
    .select({ lessonNoteId: schema.assessments.lessonNoteId })
    .from(schema.assessments)
    .where(
      inArray(
        schema.assessments.lessonNoteId,
        notes.map((n) => n.id),
      ),
    );
  const have = new Set(existing.map((e: any) => e.lessonNoteId));

  let written = 0;
  for (const note of notes) {
    // `have` grows as we go. Read once and never updated, a note appearing
    // twice in the input slipped past this check the second time and wrote
    // a second page — the caller's duplicate became the database's.
    if (have.has(note.id)) continue;
    have.add(note.id);
    const drafted = studentNoteFor(note.plan, target);
    const assessmentId = nanoid();
    await db.insert(schema.assessments).values({
      id: assessmentId,
      classId: note.classId,
      unitId: note.plan.unitId,
      lessonNoteId: note.id,
      title: drafted.title,
      description: `${target.subjectName} · ${target.gradeLevelName} · ${target.termName}, week ${note.plan.week}`,
      assessmentType: "custom",
      // The learner's word for it. "lesson notes" is what the teacher calls
      // their own plan, and showing it here told a class that the page
      // written for them belonged to somebody else.
      format: "reading",
      // Nothing to hand in, nothing to mark: this is something to read.
      responseMode: "none",
      gradingMode: "none",
      renderAs: "prose",
      objectivesJson: JSON.stringify(note.plan.objectives),
      totalPoints: 0,
      // Unpublished: the teacher reads it before the class does.
      status: "draft",
      ownerEmail: owner.ownerEmail,
      orgId: owner.orgId,
      visibility: "org" as const,
    });
    await db.insert(schema.assessmentVariants).values({
      id: nanoid(),
      assessmentId,
      difficulty: "custom",
      label: "For the class",
      content: drafted.content,
      totalPoints: 0,
      position: 0,
    });
    written++;
  }
  return written;
}

/**
 * The material attached to a lesson — everything a class would see for that
 * week, and for staff, everything not yet published too.
 */
export async function materialForLesson(
  lessonNoteId: string,
  opts: { publishedOnly: boolean },
) {
  const db = getDb();
  const conditions = [eq(schema.assessments.lessonNoteId, lessonNoteId)];
  if (opts.publishedOnly) {
    conditions.push(eq(schema.assessments.status, "published"));
  }
  const rows = await db
    .select({
      id: schema.assessments.id,
      title: schema.assessments.title,
      status: schema.assessments.status,
      renderAs: schema.assessments.renderAs,
      format: schema.assessments.format,
      gradingMode: schema.assessments.gradingMode,
      responseMode: schema.assessments.responseMode,
      durationMinutes: schema.assessments.durationMinutes,
      dueDate: schema.assessments.dueDate,
      objectivesJson: schema.assessments.objectivesJson,
      // Who gave it to the class. Shown to the teacher so an admin's
      // publishing is something they read, not something they discover.
      publishedByUserId: schema.assessments.publishedByUserId,
      publishedAt: schema.assessments.publishedAt,
    })
    .from(schema.assessments)
    .where(and(...conditions));
  // Who published each one, in words. A learner is not shown this (they see
  // only published work anyway, and whose decision it was is staffroom
  // business), so it is resolved only when drafts are being returned too.
  const actors = opts.publishedOnly
    ? {}
    : await describeActors(rows.map((r: any) => r.publishedByUserId));

  // The week's objectives travel with the material: whatever is suggested
  // next should be about what this week teaches, not the subject at large.
  return rows.map((r: any) => {
    const { objectivesJson, ...rest } = r;
    let objectives: string[] = [];
    try {
      const parsed = JSON.parse(objectivesJson ?? "[]");
      if (Array.isArray(parsed))
        objectives = parsed.filter((o) => typeof o === "string");
    } catch {
      objectives = [];
    }
    const { publishedByUserId, publishedAt, ...fields } = rest as any;
    return {
      ...fields,
      objectives,
      publishedAt: opts.publishedOnly ? null : (publishedAt ?? null),
      publishedBy: opts.publishedOnly
        ? null
        : publishedByUserId
          ? actorLabel(actors[publishedByUserId])
          : null,
    };
  });
}

/**
 * The lesson notes a plan covers that exist already, paired with their week.
 *
 * Student notes used to ride along with newly written lesson notes only —
 * so a class whose notes already existed, which is every class planned
 * before this was built, could never get them. Running the planner again
 * fills the gap instead of reporting "nothing to add" and leaving learners
 * with nothing.
 */
export async function existingNotesForPlan(
  classIds: string[],
  planned: Array<{
    unitId: string;
    unitTitle: string;
    week: number;
    lessonDate: string;
    objectives: string[];
    weekNote: string | null;
  }>,
): Promise<WrittenNote[]> {
  if (classIds.length === 0 || planned.length === 0) return [];
  const db = getDb();
  const rows = await db
    .select({
      id: schema.lessonNotes.id,
      classId: schema.lessonNotes.classId,
      unitId: schema.lessonNotes.unitId,
      lessonDate: schema.lessonNotes.lessonDate,
    })
    .from(schema.lessonNotes)
    .where(inArray(schema.lessonNotes.classId, classIds));

  const byKey = new Map(planned.map((p) => [`${p.unitId}|${p.lessonDate}`, p]));
  const out: WrittenNote[] = [];
  for (const row of rows as any[]) {
    const plan = byKey.get(`${row.unitId}|${row.lessonDate}`);
    if (!plan) continue;
    out.push({ id: row.id, classId: row.classId, plan: plan as any });
  }
  return out;
}

/** How many of these lesson notes have nothing for the class to read. */
export async function countMissingStudentNotes(
  notes: WrittenNote[],
  plusUnwritten = 0,
): Promise<number> {
  if (notes.length === 0) return plusUnwritten;
  const db = getDb();
  const existing = await db
    .select({ lessonNoteId: schema.assessments.lessonNoteId })
    .from(schema.assessments)
    .where(
      inArray(
        schema.assessments.lessonNoteId,
        notes.map((n) => n.id),
      ),
    );
  const have = new Set(existing.map((e: any) => e.lessonNoteId));
  return notes.filter((n) => !have.has(n.id)).length + plusUnwritten;
}
