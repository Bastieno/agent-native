import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import type { Client } from "./client.js";
import type { School } from "./setup.js";
import type { Findings } from "./findings.js";
import { asList } from "./shapes.js";

/**
 * The end of term, and the things a school keeps.
 *
 * A report card is where every earlier step is finally judged: if marking,
 * grading or the school's own scale is wrong anywhere, it surfaces here as a
 * number a parent would query. So the run ends by producing real ones and
 * keeping them, rather than asserting that an endpoint returned 200.
 */

export async function closeTerm(
  client: Client,
  school: School,
  findings: Findings,
  artifacts: string,
): Promise<void> {
  const phase = "end of term";
  await mkdir(artifacts, { recursive: true });

  // ── The gradebook ──────────────────────────────────────────────────────
  const gradebook = await client.as(school.teacher, "get-gradebook", {
    classId: school.classId,
  });
  const rows = asList(gradebook, "rows", "students", "entries");
  findings.expect(
    phase,
    rows.length > 0,
    "the gradebook has a row for the class",
    JSON.stringify(gradebook).slice(0, 300),
  );
  await writeFile(
    join(artifacts, "gradebook.json"),
    JSON.stringify(gradebook, null, 2),
  );

  // A gradebook a teacher can open in a spreadsheet, which is what they
  // actually do with one.
  if (rows.length) {
    const columns = Object.keys(rows[0]);
    const csv = [
      columns.join(","),
      ...rows.map((r: any) =>
        columns
          .map((c) => JSON.stringify(r[c] ?? "").replace(/^"|"$/g, ""))
          .join(","),
      ),
    ].join("\n");
    await writeFile(join(artifacts, "gradebook.csv"), csv);
  }

  // ── Report cards ───────────────────────────────────────────────────────
  // Three learners, chosen to span the class: the strongest, the weakest,
  // and someone in the middle. A report card that reads correctly for all
  // three is a report card that works.
  const ranked = [...school.students].sort(
    (a, b) => b.profile.ability - a.profile.ability,
  );
  const sample = [
    ranked[0],
    ranked[Math.floor(ranked.length / 2)],
    ranked[ranked.length - 1],
  ].filter(Boolean);

  const sampleCards: any[] = [];
  for (const student of sample) {
    try {
      const card = await client.as(school.teacher, "generate-report-card", {
        studentId: student.studentId,
        classId: school.classId,
        termId: school.termId,
      });
      await writeFile(
        join(
          artifacts,
          `report-card-${student.profile.name.replace(/\s+/g, "-").toLowerCase()}.json`,
        ),
        JSON.stringify(card, null, 2),
      );
      findings.expect(
        phase,
        !!card,
        `a report card is produced for ${student.profile.name}`,
      );
      // A report card goes home to a parent. A nameless one is not a report
      // card, however correct its numbers.
      findings.expect(
        phase,
        !!card?.student?.name,
        `${student.profile.name}'s report card carries their name`,
        JSON.stringify(card?.student ?? {}),
      );
      sampleCards.push(card);
      findings.expect(
        phase,
        (card?.assessments?.length ?? 0) > 0,
        `${student.profile.name}'s report card lists the term's work`,
        `${card?.assessments?.length ?? 0} pieces listed`,
      );
    } catch (error) {
      findings.add(
        "broken",
        phase,
        `report card failed for ${student.profile.name}`,
        error instanceof Error ? error.message : String(error),
      );
    }
  }

  // A term's work is marked and published, so the term's own grade should
  // exist without anyone opening a spreadsheet. Nothing computes it today.
  const cards = sample.length;
  const withTermGrade = sampleCards.filter((c) => !!c?.gradebookEntry).length;
  findings.expect(
    phase,
    withTermGrade === cards,
    "a report card carries the term's own grade, not just each piece of work",
    `${withTermGrade} of ${cards} had a gradebook entry; the rest show only an overall average, and the entry is only written when someone calls update-gradebook-entry by hand`,
    "missing",
  );

  // ── What a learner sees of their own term ──────────────────────────────
  const learner = sample[0];
  const progress = await client.as(learner, "get-my-progress", {});
  await writeFile(
    join(artifacts, "student-progress.json"),
    JSON.stringify(progress, null, 2),
  );
  const grades = await client.as(learner, "get-my-grades", {});
  findings.expect(
    phase,
    asList(grades, "grades").length > 0,
    "a learner can see their own published grades",
  );
}

/**
 * The things that must never be true, checked against a term's real data.
 *
 * Each of these is a sentence the app promises somewhere — in a refusal, in
 * a description, in a comment. A promise nothing checks is a promise that
 * quietly stops being true.
 */
/**
 * What would come off the printer, in both copies.
 *
 * The print page is rendered in the browser, so fetching its URL returns an
 * empty shell — a screenshot needs a real browser and belongs to the review
 * step. What can be kept here is the thing the page draws from, which is
 * also where a leak would be: if the class's copy carries an answer, it
 * carries it whatever the stylesheet says.
 */
export async function keepPrintedPaper(
  client: Client,
  school: School,
  assessmentId: string,
  artifacts: string,
  findings: Findings,
): Promise<void> {
  const copies: Record<string, any> = {};
  for (const forClass of [true, false]) {
    copies[forClass ? "class" : "teacher"] = await client.as(
      school.teacher,
      "get-print-material",
      { assessmentId, forClass },
    );
  }
  await writeFile(
    join(artifacts, "printed-worksheet.json"),
    JSON.stringify(copies, null, 2),
  );

  const classBlocks = asList(copies.class?.items?.[0]?.content?.blocks ?? []);
  const leaked = classBlocks.filter(
    (b: any) => b?.answer !== undefined || b?.markScheme !== undefined,
  );
  findings.expect(
    "printing",
    classBlocks.length > 0 && leaked.length === 0,
    "the class's printed copy carries no answers",
    `${leaked.length} of ${classBlocks.length} blocks carried marking`,
  );

  const teacherBlocks = asList(
    copies.teacher?.items?.[0]?.content?.blocks ?? [],
  );
  const withAnswers = teacherBlocks.filter((b: any) => b?.answer !== undefined);
  findings.expect(
    "printing",
    withAnswers.length > 0,
    "the teacher's printed copy carries the answers",
    `${withAnswers.length} of ${teacherBlocks.length} blocks had one`,
  );
}

export async function checkInvariants(
  client: Client,
  school: School,
  findings: Findings,
): Promise<void> {
  const phase = "invariants";
  const [learner, classmate] = school.students;

  // A learner may not reach another learner's work.
  const peeking = await client.refused(learner, "get-student-performance", {
    studentId: classmate.studentId,
  });
  findings.expect(
    phase,
    peeking !== null,
    "a learner cannot read another learner's performance",
    `${learner.profile.name} read ${classmate.profile.name}`,
  );

  // Nor may they do a teacher's job.
  for (const action of [
    "publish-assessment",
    "get-gradebook",
    "list-students",
    "categorize-students",
  ]) {
    const refusal = await client.refused(learner, action, {
      classId: school.classId,
      id: "x",
    });
    findings.expect(phase, refusal !== null, `a learner cannot run ${action}`);
    if (refusal) {
      // A refusal is for a person to read, so it should say what was refused
      // rather than name the plumbing.
      findings.expect(
        phase,
        !/\baction\b.*http|\bz\.|undefined/i.test(refusal),
        `the refusal for ${action} reads like a sentence`,
        refusal.slice(0, 160),
        "wording",
      );
    }
  }

  // A teacher may not touch a class that is not theirs — there is only one
  // class here, so this checks the other direction: the admin may.
  const asAdmin = await client.as(school.admin, "get-gradebook", {
    classId: school.classId,
  });
  findings.expect(
    phase,
    !!asAdmin,
    "an admin can read any class's gradebook in their school",
  );
}
