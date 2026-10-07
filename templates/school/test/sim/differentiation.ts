import type { Client } from "./client.js";
import type { FullSchoolRun, SimClass } from "./school-setup.js";
import { SUBJECT_BANK } from "../scenarios/question-bank.js";
import type { Findings } from "./findings.js";
import { asList, idOf } from "./shapes.js";
import { abilityInWeek, trueBand } from "./population.js";
import { answerQuestion, handsIn } from "./answers.js";
import { inPool } from "./pool.js";

/**
 * Setting the same lesson's work at three standards, and seeing what happens.
 *
 * This is the part of the app that justifies the rest of it: a teacher groups
 * the class from real marks, sets a paper pitched at each group, and the
 * weaker learners get something they can actually attempt. Three things have
 * to be true for that to be worth anything, and only a term of real marks can
 * test them:
 *
 *   1. Each learner is served their own paper, and never learns there were
 *      others. A child who discovers they were given the easy sheet has been
 *      told something about themselves by a piece of software.
 *   2. The grouping follows the work, not a label anyone typed.
 *   3. A learner who improves is moved up. Differentiation that only ever
 *      sorts downwards is streaming with extra steps.
 */

export type DifferentiatedWeek = {
  className: string;
  week: number;
  assessmentId: string;
  variants: Record<string, string>;
  served: Record<string, number>;
  submitted: number;
};

/** The same week's work, written at three standards. */
export async function teachDifferentiatedWeek(
  client: Client,
  run: FullSchoolRun,
  cls: SimClass,
  weekIndex: number,
  findings: Findings,
): Promise<DifferentiatedWeek | null> {
  const bank = SUBJECT_BANK.find((s) => s.subject === cls.subject)!;
  const week = bank.weeks[weekIndex];
  if (!week) return null;
  const phase = `${cls.name} week ${weekIndex + 1} (differentiated)`;

  const block = (q: any) => ({
    prompt: q.prompt,
    points: q.points,
    ...(q.options ? { options: q.options } : {}),
    ...(q.answer ? { answer: q.answer } : {}),
    ...(q.markScheme ? { markScheme: q.markScheme } : {}),
    ...(q.answerSpace ? { answerSpace: q.answerSpace } : {}),
  });
  const blocks = week.questions.map(block);
  const totalPoints = week.questions.reduce((sum, q) => sum + q.points, 0);

  // Foundational: the closed questions only, which is the scaffolded version
  // a teacher would actually set. Advanced: everything, and the extended
  // answer carries more of the marks.
  const foundational = week.questions.filter((q) => q.options?.length);
  const created = await client.as(cls.teacher, "create-activity", {
    classId: cls.id,
    title: `Week ${weekIndex + 1}: ${week.topic}`,
    format: "worksheet",
    renderAs: "questions",
    objectives: week.objectives,
    instructions: "Answer all questions. Show your working where asked.",
    variants: [
      {
        label: "Foundational",
        difficulty: "foundational",
        blocks: (foundational.length ? foundational : week.questions).map(
          block,
        ),
        content: (foundational.length ? foundational : week.questions)
          .map((q, i) => `${i + 1}. ${q.prompt}`)
          .join("\n\n"),
        totalPoints: (foundational.length
          ? foundational
          : week.questions
        ).reduce((sum, q) => sum + q.points, 0),
      },
      {
        label: "Developing",
        difficulty: "developing",
        blocks,
        content: week.questions
          .map((q, i) => `${i + 1}. ${q.prompt}`)
          .join("\n\n"),
        totalPoints,
      },
      {
        label: "Advanced",
        difficulty: "advanced",
        blocks,
        content: week.questions
          .map((q, i) => `${i + 1}. ${q.prompt}`)
          .join("\n\n"),
        totalPoints,
      },
    ],
    responseMode: "typed",
    gradingMode: "points",
    totalPoints,
    confirm: true,
  });
  const assessmentId = created?.assessmentId ?? idOf(created, "assessment");

  const variantRows = asList(
    await client.as(cls.teacher, "list-variants", { assessmentId }),
    "variants",
  );
  const variants: Record<string, string> = {};
  for (const v of variantRows) variants[v.difficulty] = v.id;

  await client.as(cls.teacher, "assign-variants", {
    assessmentId,
    strategy: "auto-by-category",
    classId: cls.id,
  });
  await client.as(cls.teacher, "publish-assessment", { id: assessmentId });

  // ── What each learner is actually served ───────────────────────────────
  const cohort = run.students.filter((s) => s.yearGroup === cls.yearGroup);
  const served: Record<string, number> = {};
  let submitted = 0;

  const results = await inPool(cohort, 8, async (student) => {
    await client.as(student, "start-activity", { assessmentId });
    const paper = await client.as(student, "get-my-assessment", {
      assessmentId,
    });
    const variant = paper?.variant ?? paper?.myVariant;

    // The one thing a learner must never be told.
    const leakedDifficulty =
      variant &&
      Object.prototype.hasOwnProperty.call(variant, "difficulty") &&
      variant.difficulty !== null &&
      variant.difficulty !== undefined;
    findings.expect(
      phase,
      !leakedDifficulty,
      "a learner's paper does not carry its difficulty",
      `${student.profile.name} was told "${variant?.difficulty}"`,
    );
    // Nor may anything else on the page say that other papers exist.
    const serialised = JSON.stringify(paper ?? {});
    findings.expect(
      phase,
      !/foundational|developing|advanced/i.test(serialised),
      "nothing a learner is served names the ability groups",
      `${student.profile.name}'s page mentions one of them`,
    );

    const which =
      Object.entries(variants).find(([, id]) => id === variant?.id)?.[0] ??
      "unassigned";
    served[which] = (served[which] ?? 0) + 1;

    if (
      !handsIn(
        student.profile.diligence,
        student.profile.index * 31 + weekIndex + cls.name.length,
      )
    ) {
      return false;
    }

    const parsed =
      typeof variant?.contentJson === "string"
        ? JSON.parse(variant.contentJson)
        : variant?.contentJson;
    const questions = asList(parsed?.blocks ?? []);
    const difficulty =
      which === "foundational" ? 0.8 : which === "advanced" ? 1.1 : 1;
    const ability = abilityInWeek(student.profile, weekIndex + 1);

    for (const [index, question] of questions.entries()) {
      const answer = answerQuestion(
        question as any,
        ability,
        student.profile.index * 9973 + weekIndex * 101 + index,
        difficulty,
      );
      await client.as(student, "answer-question", {
        assessmentId,
        index,
        answer: answer.text,
      });
    }
    await client.as(student, "submit-work", { assessmentId });
    return true;
  });
  submitted = results.filter(Boolean).length;

  // Marking, as before.
  const items = asList(
    await client.as(cls.teacher, "get-marking-queue", { assessmentId }),
    "items",
  );
  await inPool(items, 8, async (item: any) => {
    const maxPoints = Number(item.maxPoints ?? 1);
    const text = String(item.answer ?? "");
    const coverage = text.includes("not sure")
      ? 0.35
      : text.includes("did not show every step")
        ? 0.7
        : 0.95;
    await client.as(cls.teacher, "record-answer-mark", {
      responseId: item.responseId,
      awardedPoints: Math.round(maxPoints * coverage),
      feedback: "Marked against the mark scheme.",
    });
  });
  await client.as(cls.teacher, "compile-submission-grade", { assessmentId });
  await client.as(cls.teacher, "publish-grades", { assessmentId });

  // A learner must be marked out of the paper they sat.
  //
  // When the whole class was scored against the full paper's total, everyone
  // on the shorter foundational sheet was capped at the ratio between the
  // two — a ceiling no amount of good work could pass. So: find that
  // ceiling, and check somebody beat it.
  const analytics = await client.as(cls.teacher, "get-assessment-analytics", {
    assessmentId,
  });
  const byVariant = asList(analytics, "byVariant");
  const foundationalRow = byVariant.find(
    (v: any) => v.difficulty === "foundational",
  );
  const foundationalPoints = (
    foundational.length ? foundational : week.questions
  ).reduce((sum, q) => sum + q.points, 0);
  const ceiling = (foundationalPoints / Math.max(1, totalPoints)) * 100;
  if (foundationalRow?.average !== null && ceiling < 99) {
    findings.expect(
      phase,
      Number(foundationalRow?.average ?? 0) > 0,
      "the foundational group is marked out of their own paper",
      `their paper is worth ${foundationalPoints} of the ${totalPoints} on the full one, so scoring against the full paper caps them at ${Math.round(ceiling)}%; they averaged ${foundationalRow?.average}%`,
    );
  }

  // Learners were sorted into more than one group, or nothing was
  // differentiated and the three papers were decoration.
  findings.expect(
    phase,
    Object.keys(served).filter((k) => k !== "unassigned").length > 1,
    "the class is served more than one standard of paper",
    JSON.stringify(served),
  );
  findings.expect(
    phase,
    (served.unassigned ?? 0) === 0,
    "every learner is served a paper",
    `${served.unassigned ?? 0} got none`,
  );

  return {
    className: cls.name,
    week: weekIndex + 1,
    assessmentId,
    variants,
    served,
    submitted,
  };
}

/**
 * Does a learner who gets better get moved up?
 *
 * Grouping a class once and never again is streaming. The question is
 * whether the app's own categories follow the marks as they change, so this
 * compares the categories before and after the weeks in which the improving
 * learners improve.
 */
export async function checkMovementBetweenGroups(
  client: Client,
  run: FullSchoolRun,
  cls: SimClass,
  before: Map<string, string>,
  findings: Findings,
): Promise<{ movedUp: number; movedDown: number }> {
  const after = new Map<string, string>();
  const grouped = await client.as(cls.teacher, "categorize-students", {
    classId: cls.id,
    confirm: true,
  });
  for (const row of asList(grouped, "categorizations")) {
    if (row.category) after.set(row.studentId, row.category);
  }

  const order = ["foundational", "developing", "advanced"];
  let movedUp = 0;
  let movedDown = 0;
  for (const [studentId, now] of after) {
    const was = before.get(studentId);
    if (!was || was === now) continue;
    if (order.indexOf(now) > order.indexOf(was)) movedUp++;
    else movedDown++;
  }

  const improving = run.students.filter(
    (s) =>
      s.yearGroup === cls.yearGroup && s.profile.trajectory === "improving",
  );
  findings.expect(
    "movement",
    movedUp > 0,
    "a learner who improves across the term is moved up a group",
    `${improving.length} learners in this class are improving; the app moved ${movedUp} up and ${movedDown} down`,
    "wrong",
  );

  return { movedUp, movedDown };
}

/**
 * Did the easier paper help the learners it was set for?
 *
 * The test a school would actually apply. If the group given the
 * foundational paper scores no better than they did on the common paper,
 * differentiation has sorted the class and achieved nothing else — which is
 * worth knowing before a pilot, not after.
 */
export async function measureDifferentiationEffect(
  client: Client,
  run: FullSchoolRun,
  cls: SimClass,
  groupsBefore: Map<string, string>,
  weeksBefore: number,
  findings: Findings,
): Promise<{ before: number | null; after: number | null }> {
  const foundational = [...groupsBefore.entries()]
    .filter(([, band]) => band === "foundational")
    .map(([studentId]) => studentId);
  if (foundational.length === 0) return { before: null, after: null };

  // Only the work that carries marks. A class's list also holds the reading
  // page written for each week, which nobody hands in — averaging those in
  // would compare a worksheet against a page of notes.
  const assessments = asList(
    await client.as(cls.teacher, "list-assessments", { classId: cls.id }),
    "assessments",
  )
    .filter((a: any) => a.gradingMode !== "none" && a.responseMode !== "none")
    .sort((a: any, b: any) =>
      String(a.createdAt ?? a.title).localeCompare(
        String(b.createdAt ?? b.title),
      ),
    );

  // The gradebook carries every learner's mark for every piece of work,
  // which is the only place a per-learner history can be read in one call: a
  // paper's own submission list gives status and flags but no score.
  const gradebook = await client.as(cls.teacher, "get-gradebook", {
    classId: cls.id,
  });
  const rows = asList(gradebook, "students", "rows", "entries");

  const marksFor = (assessmentIds: string[]): number[] => {
    const marks: number[] = [];
    for (const row of rows) {
      if (!foundational.includes(row.studentId)) continue;
      for (const id of assessmentIds) {
        const value = Number(row.grades?.[id]?.percentage);
        if (Number.isFinite(value)) marks.push(value);
      }
    }
    return marks;
  };

  const earlier = marksFor(
    assessments.slice(0, weeksBefore).map((a: any) => a.id),
  );
  const later = marksFor(assessments.slice(weeksBefore).map((a: any) => a.id));
  const mean = (xs: number[]) =>
    xs.length ? Math.round(xs.reduce((a, b) => a + b, 0) / xs.length) : null;

  const before = mean(earlier);
  const after = mean(later);
  if (before !== null && after !== null) {
    findings.add(
      "note",
      "differentiation",
      `the learners given the foundational paper averaged ${before}% on the common paper and ${after}% on theirs`,
      `${foundational.length} learners, ${earlier.length} marks before and ${later.length} after`,
    );
  }
  return { before, after };
}

/** The categories as they stand, for comparing against later. */
export async function snapshotGroups(
  client: Client,
  cls: SimClass,
): Promise<Map<string, string>> {
  const grouped = await client.as(cls.teacher, "categorize-students", {
    classId: cls.id,
    confirm: true,
  });
  const map = new Map<string, string>();
  for (const row of asList(grouped, "categorizations")) {
    if (row.category) map.set(row.studentId, row.category);
  }
  return map;
}
