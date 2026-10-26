import { asList } from "../shapes.js";
import { inPool } from "../pool.js";
import type { ShowcaseClass, ShowcaseRun } from "./context.js";
import { weekContent } from "./content.js";

/**
 * A First Term scheme of work for every subject and year group, from the
 * libraries the app ships, laid out around the school's own mid-term and
 * examination weeks; then the weekly lesson notes it writes, marked ready the
 * way a staff room actually gets through them.
 */

export type LibraryObjective = {
  code: string;
  description: string;
  strand: string;
  subStrand: string;
};

/** A library subject's objectives, flattened in syllabus order. */
async function libraryObjectives(
  run: ShowcaseRun,
  framework: string,
  subject: string,
): Promise<LibraryObjective[]> {
  const reply = await run.client.as(run.admin, "list-framework-objectives", {
    framework,
    subject,
  });
  const strands = asList(reply?.data?.strands ?? []);
  const out: LibraryObjective[] = [];
  for (const strand of strands) {
    for (const sub of asList(strand.subStrands ?? [])) {
      for (const o of asList(sub.objectives ?? [])) {
        out.push({
          code: o.code,
          description: o.description,
          strand: strand.name,
          subStrand: sub.name,
        });
      }
    }
  }
  return out;
}

/**
 * This year group's share of a library that spans three years.
 *
 * A third each, in order, when a third is enough for a term; a small sample
 * library would leave a year with three objectives for nine weeks, so then the
 * year takes nine in a row from its own starting point, wrapping round.
 */
function shareFor(
  all: LibraryObjective[],
  yearIndex: number,
  parts: number,
  weeks: number,
): LibraryObjective[] {
  const third = Math.floor(all.length / parts);
  if (third >= weeks)
    return all.slice(yearIndex * third, (yearIndex + 1) * third);
  const start = yearIndex * third;
  const take = Math.min(all.length, Math.max(weeks, third));
  return Array.from({ length: take }, (_, i) => all[(start + i) % all.length]);
}

/** Each teaching week's share of a year's objectives, in order. */
export function weekShare(
  objectives: LibraryObjective[],
  teachingWeeks: number[],
) {
  const byWeek = new Map<number, LibraryObjective[]>();
  objectives.forEach((o, i) => {
    const week =
      teachingWeeks[
        Math.min(
          teachingWeeks.length - 1,
          Math.floor((i * teachingWeeks.length) / objectives.length),
        )
      ];
    byWeek.set(week, [...(byWeek.get(week) ?? []), o]);
  });
  return byWeek;
}

/** Lay a year's objectives across the teaching weeks as units by sub-strand. */
export function planUnits(
  objectives: LibraryObjective[],
  teachingWeeks: number[],
) {
  const byWeek = weekShare(objectives, teachingWeeks);
  // A unit is a run of consecutive weeks on the same sub-strand. A gap in
  // the weeks (the mid-term break) always ends one.
  const units: {
    title: string;
    weekStart: number;
    weekEnd: number;
    objectives: string[];
    objectivesByWeek: string[][];
    standards: { framework: string; code: string; description: string }[];
  }[] = [];
  let previousWeek = -1;
  for (const week of teachingWeeks) {
    const items = byWeek.get(week) ?? [];
    if (!items.length) continue;
    const title = items[0].subStrand || items[0].strand;
    const last = units[units.length - 1];
    if (last && last.title === title && week === previousWeek + 1) {
      last.weekEnd = week;
      last.objectives.push(...items.map((o) => o.description));
      last.objectivesByWeek.push(items.map((o) => o.description));
      last.standards.push(
        ...items.map((o) => ({
          framework: "",
          code: o.code,
          description: o.description,
        })),
      );
    } else {
      units.push({
        title,
        weekStart: week,
        weekEnd: week,
        objectives: items.map((o) => o.description),
        objectivesByWeek: [items.map((o) => o.description)],
        standards: items.map((o) => ({
          framework: "",
          code: o.code,
          description: o.description,
        })),
      });
    }
    previousWeek = week;
  }
  return units;
}

/** Which week of the term a date falls in. */
export function weekOf(termStart: string, date: string): number {
  const days = (Date.parse(date) - Date.parse(termStart)) / 86_400_000;
  return Math.floor(days / 7) + 1;
}

export async function buildCurricula(run: ShowcaseRun): Promise<void> {
  const { client, admin, scenario, findings, decisions } = run;
  const weeks = scenario.teachingWeeks;
  const pairs = new Map<string, ShowcaseClass>();
  for (const cls of run.classes)
    pairs.set(`${cls.subject.name}|${cls.yearGroup}`, cls);
  console.log(`· ${pairs.size} schemes of work from the libraries`);

  const cache = new Map<string, LibraryObjective[]>();
  const planned: {
    subject: string;
    yearGroup: string;
    units: number;
    objectives: number;
    notes: number;
  }[] = [];
  await inPool([...pairs.values()], 4, async (cls) => {
    const key = `${cls.library.framework}|${cls.library.subject}`;
    if (!cache.has(key))
      cache.set(
        key,
        await libraryObjectives(
          run,
          cls.library.framework,
          cls.library.subject,
        ),
      );
    const all = cache.get(key)!;
    const split = scenario.librarySplit(cls.yearGroup);
    const share = shareFor(all, split.index, split.parts, weeks.length);
    run.weekPlan.set(`${cls.subject.name}|${cls.yearGroup}`, {
      byWeek: weekShare(share, weeks),
      all,
    });
    const units = planUnits(share, weeks).map((u) => ({
      ...u,
      standards: u.standards.map((s) => ({
        ...s,
        framework: cls.library.framework,
      })),
    }));
    const reply = await client.as(admin, "generate-scheme-of-work", {
      subjectId: cls.subjectId,
      gradeLevelId: cls.gradeLevelId,
      termId: run.firstTermId,
      framework: cls.library.framework,
      units,
      createLessonNotes: true,
      confirm: true,
    });
    findings.expect(
      "curriculum",
      (reply?.lessonNotesCreated ?? 0) > 0,
      `${cls.subject.name} ${cls.yearGroup} gets a scheme of work with lesson notes`,
      JSON.stringify(reply).slice(0, 300),
    );
    planned.push({
      subject: cls.subject.name,
      yearGroup: cls.yearGroup,
      units: units.length,
      objectives: share.length,
      notes: reply?.lessonNotesCreated ?? 0,
    });
  });
  run.record.schemes = planned;
  decisions.add(
    "Terms and weeks",
    "Schemes of work",
    `${planned.length} (every subject in every year group that takes it), ${scenario.decisionText.libraries}`,
  );

  // ── Lesson notes: which week each is, and who has got through theirs ──
  const termStart = scenario.terms[0].start;
  await inPool(run.classes, 8, async (cls) => {
    const notes = asList(
      await client.as(cls.teacher, "list-lesson-notes", {
        classId: cls.id,
        limit: 50,
      }),
    );
    const byWeek = new Map<number, string>();
    for (const note of notes) {
      if (note.lessonDate)
        byWeek.set(weekOf(termStart, note.lessonDate), note.id);
    }
    run.notes.set(cls.id, byWeek);
  });
  const missing = run.classes.filter(
    (c) => (run.notes.get(c.id)?.size ?? 0) < weeks.length,
  );
  findings.expect(
    "curriculum",
    missing.length === 0,
    "every class has a lesson note for each teaching week",
    missing
      .slice(0, 6)
      .map((c) => `${c.name}: ${run.notes.get(c.id)?.size ?? 0}`)
      .join(", "),
  );
}

/**
 * The teachers mark their notes ready week by week; a couple of arms fall
 * behind from a given week on, so "who hasn't prepared?" has an answer.
 */
export async function prepareWeek(
  run: ShowcaseRun,
  week: number,
): Promise<void> {
  const behind = run.scenario.behindOnNotes;
  await inPool(run.classes, 8, async (cls) => {
    const id = run.notes.get(cls.id)?.get(week);
    if (!id) return;
    if (
      cls.arm &&
      behind.arms.includes(cls.arm.name) &&
      week >= behind.fromWeek
    )
      return;
    // The teacher writes the week's note in full before marking it ready.
    const written = weekContent(cls.subject.name, cls.yearGroup, week);
    if (written)
      await run.client.as(cls.teacher, "update-lesson-note", {
        id,
        title: written.topic,
        content: written.lessonNote,
      });
    await run.client.as(cls.teacher, "finalize-lesson-note", { id });
  });
}

/**
 * The history a lesson note can carry: an admin writing in a teacher's note
 * and marking it ready on their behalf, and a note put back to draft.
 */
export async function lessonNoteHistory(run: ShowcaseRun): Promise<void> {
  const { client, admin, findings } = run;
  const behind = run.scenario.behindOnNotes;
  // The admin covers for a teacher who is behind: writes the note and marks
  // it ready.
  const covered = run.classes.find((c) => c.arm?.name === behind.arms[0])!;
  const weeksCovered = [behind.fromWeek, behind.fromWeek + 1];
  for (const week of weeksCovered) {
    const id = run.notes.get(covered.id)!.get(week)!;
    const before = await client.as(admin, "get-lesson-note", { id });
    const written = weekContent(covered.subject.name, covered.yearGroup, week);
    await client.as(admin, "update-lesson-note", {
      id,
      content: `${written?.lessonNote ?? before?.content ?? before?.lessonNote?.content ?? ""}\n\n**Cover note from the principal:** the class revisits last week's practice questions before the new topic.`,
    });
    await client.as(admin, "finalize-lesson-note", { id });
  }
  const after = await client.as(admin, "get-lesson-note", {
    id: run.notes.get(covered.id)!.get(behind.fromWeek)!,
  });
  findings.expect(
    "lesson notes",
    JSON.stringify(after).includes(run.scenario.principal),
    "a note the admin edited and marked ready says so",
    JSON.stringify(after).slice(0, 300),
  );

  // A teacher disagrees with a note marked ready and puts it back to draft.
  const reopenedClass = run.classes.find(
    (c) =>
      c.arm?.name === run.scenario.reopenedNote.arm &&
      c.subject.name === run.scenario.reopenedNote.subject,
  )!;
  const reopenedId = run.notes
    .get(reopenedClass.id)!
    .get(run.scenario.reopenedNote.week)!;
  await client.as(reopenedClass.teacher, "reopen-lesson-note", {
    id: reopenedId,
  });
  run.record.lessonNoteHistory = {
    edited: {
      className: covered.name,
      week: weeksCovered.join(" and "),
      teacher: covered.teacher.name,
    },
    reopened: {
      className: reopenedClass.name,
      week: run.scenario.reopenedNote.week,
      teacher: reopenedClass.teacher.name,
    },
  };
}
