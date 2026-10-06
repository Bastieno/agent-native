import type { Client } from "./client.js";
import type { School } from "./setup.js";
import type { Scenario, ScenarioWeek } from "../scenarios/nigeria-secondary.js";
import type { Findings } from "./findings.js";
import { asList, idOf } from "./shapes.js";
import { abilityInWeek, trueBand } from "./population.js";
import { answerQuestion, handsIn } from "./answers.js";

/**
 * A term, taught.
 *
 * Each week the teacher sets work, the class does it at the standard each
 * learner is capable of that week, the teacher marks what needs marking and
 * publishes the result. Thirteen weeks of that is what a school actually is,
 * and it is the only way to find out whether the app's own judgements —
 * which learners are struggling, who has improved, what a report card says —
 * follow from the work or are decoration.
 *
 * Nothing here tells the app anything about a learner's ability. It only
 * decides what they write.
 */

export type WeekResult = {
  week: number;
  assessmentId: string;
  submitted: number;
  marked: number;
  averagePercent: number | null;
};

/** Units and lesson notes for the term, from the scenario's own weeks. */
export async function buildCurriculum(
  client: Client,
  school: School,
  scenario: Scenario,
  findings: Findings,
): Promise<void> {
  const phase = "curriculum";
  const teaching = scenario.weeks.filter((w) => w.objectives.length > 0);

  for (const [i, week] of teaching.entries()) {
    const unit = await client.as(school.admin, "create-unit", {
      subjectId: school.subjectId,
      gradeLevelId: school.gradeLevelId,
      termId: school.termId,
      title: week.topic,
      weekStart: week.week,
      weekEnd: week.week,
      sequence: i + 1,
    });
    const unitId = idOf(unit, "unit");
    for (const objective of week.objectives) {
      await client.as(school.admin, "create-learning-objective", {
        unitId,
        description: objective,
      });
    }
  }

  const planned = await client.as(school.admin, "plan-lesson-notes", {
    subjectId: school.subjectId,
    gradeLevelId: school.gradeLevelId,
    termId: school.termId,
    classId: school.classId,
    studentNotes: true,
    confirm: true,
  });
  findings.expect(
    phase,
    (planned?.lessonNotesCreated ?? 0) > 0,
    "planning writes a lesson note for each week that teaches something",
    JSON.stringify(planned).slice(0, 300),
  );
}

/** One week: set the work, sit it, mark it, publish it. */
export async function teachWeek(
  client: Client,
  school: School,
  scenario: Scenario,
  week: ScenarioWeek,
  findings: Findings,
): Promise<WeekResult> {
  const phase = `week ${week.week}`;

  // ── The teacher sets the work ──────────────────────────────────────────
  const blocks = week.questions.map((q) => ({
    prompt: q.prompt,
    points: q.points,
    ...(q.options ? { options: q.options } : {}),
    ...(q.answer ? { answer: q.answer } : {}),
    ...(q.markScheme ? { markScheme: q.markScheme } : {}),
    ...(q.answerSpace ? { answerSpace: q.answerSpace } : {}),
  }));
  const totalPoints = week.questions.reduce((sum, q) => sum + q.points, 0);

  const created = await client.as(school.teacher, "create-activity", {
    classId: school.classId,
    title: `Week ${week.week}: ${week.topic}`,
    format: week.objectives.length ? "worksheet" : "class test",
    renderAs: "questions",
    objectives: week.objectives,
    instructions: "Answer all questions. Show your working where asked.",
    blocks,
    content: blocks
      .map((b, i) => `${i + 1}. ${b.prompt} (${b.points} marks)`)
      .join("\n\n"),
    responseMode: "typed",
    gradingMode: "points",
    totalPoints,
    confirm: true,
  });
  const assessmentId = idOf(created, "assessment", "assessmentId");
  findings.expect(phase, !!assessmentId, "the week's work is created");

  // Before it is shared, no learner should be able to reach it.
  const peeker = school.students[0];
  const peek = await client.refused(peeker, "get-my-assessment", {
    assessmentId,
  });
  findings.expect(
    phase,
    peek !== null,
    "unpublished work is not visible to a learner",
    `a student reached it: ${assessmentId}`,
  );

  await client.as(school.teacher, "publish-assessment", { id: assessmentId });

  // ── The class does it ──────────────────────────────────────────────────
  let submitted = 0;
  for (const student of school.students) {
    const ability = abilityInWeek(student.profile, week.week);
    if (
      !handsIn(
        student.profile.diligence,
        student.profile.index * 31 + week.week,
      )
    ) {
      continue;
    }
    // A learner begins before they can answer: that is what starts their
    // own clock on a timed paper.
    await client.as(student, "start-activity", { assessmentId });
    const paper = await client.as(student, "get-my-assessment", {
      assessmentId,
    });
    const variant = paper?.variant ?? paper?.myVariant;
    const parsed =
      typeof variant?.contentJson === "string"
        ? JSON.parse(variant.contentJson)
        : variant?.contentJson;
    const questions = asList(parsed?.blocks ?? paper?.blocks ?? []);
    // What a learner is served must never carry the answers.
    const leaked = questions.filter(
      (q: any) => q?.answer !== undefined || q?.markScheme !== undefined,
    );
    findings.expect(
      phase,
      leaked.length === 0,
      "a learner's copy carries no answers or mark schemes",
      `${leaked.length} of ${questions.length} blocks leaked`,
    );

    for (const [index, question] of week.questions.entries()) {
      const answer = answerQuestion(
        question as any,
        ability,
        student.profile.index * 9973 + week.week * 101 + index,
      );
      await client.as(student, "answer-question", {
        assessmentId,
        index,
        answer: answer.text,
      });
    }
    await client.as(student, "submit-work", { assessmentId });
    submitted++;
  }

  // ── The teacher marks what cannot mark itself ──────────────────────────
  const queue = await client.as(school.teacher, "get-marking-queue", {
    assessmentId,
  });
  const toMark = asList(queue, "items", "answers", "queue");
  let marked = 0;
  for (const item of toMark) {
    const maxPoints = Number(item.maxPoints ?? item.points ?? 1);
    // Marked against how much of the scheme the answer covered — the same
    // judgement a teacher makes, made mechanically so it is repeatable.
    const text: string = String(item.answer ?? item.response ?? "");
    const coverage = text.includes("not sure")
      ? 0.35
      : text.includes("did not show every step")
        ? 0.7
        : 0.95;
    await client.as(school.teacher, "record-answer-mark", {
      responseId: item.responseId,
      awardedPoints: Math.round(maxPoints * coverage),
      feedback: "Marked by the simulation against the mark scheme.",
    });
    marked++;
  }

  const compiled = await client.as(school.teacher, "compile-submission-grade", {
    assessmentId,
  });
  await client.as(school.teacher, "publish-grades", { assessmentId });

  const analytics = await client.as(
    school.teacher,
    "get-assessment-analytics",
    {
      assessmentId,
    },
  );
  // `average` comes back as a string — toFixed(1) — so a numeric check
  // silently reported every week as having no average at all.
  const rawAverage = analytics?.average ?? analytics?.averagePercent;
  const average =
    rawAverage === null || rawAverage === undefined || rawAverage === ""
      ? null
      : Number(rawAverage);

  console.log(
    `  week ${week.week}: ${submitted}/${school.students.length} handed in, ${marked} open answers marked, average ${
      average === null ? "—" : `${Math.round(average)}%`
    }`,
  );

  return {
    week: week.week,
    assessmentId: assessmentId!,
    submitted,
    marked,
    averagePercent: average,
  };
}

/**
 * Does the app's own grouping match what the learners actually are?
 *
 * The simulation knows each learner's hidden ability; the app knows only
 * their marks. They should broadly agree — and where they do not, that is
 * worth a teacher's attention rather than a silent pass.
 */
export async function checkGrouping(
  client: Client,
  school: School,
  findings: Findings,
): Promise<void> {
  const phase = "grouping";
  const grouped = await client.as(school.teacher, "categorize-students", {
    classId: school.classId,
    confirm: true,
  });

  // One row per learner: their average, and the band it puts them in.
  const placed = asList(grouped, "categorizations", "students");

  let agree = 0;
  let total = 0;
  const disagreements: string[] = [];
  for (const student of school.students) {
    const row = placed.find((r: any) => r.studentId === student.studentId);
    if (!row?.category) continue;
    total++;
    const real = trueBand(student.profile.ability);
    if (row.category === real) agree++;
    else {
      disagreements.push(
        `${student.profile.name}: app says ${row.category} (avg ${row.average}%), really ${real} (${Math.round(student.profile.ability * 100)}%)`,
      );
    }
  }

  const rate = total ? agree / total : 0;
  console.log(
    `  grouping: the app placed ${total} learners; ${agree} match their real ability (${Math.round(rate * 100)}%)`,
  );
  findings.expect(
    phase,
    total > 0,
    "the app groups the class from the marks it has",
    JSON.stringify(grouped).slice(0, 300),
  );
  findings.expect(
    phase,
    rate >= 0.6,
    "the app's grouping broadly matches real ability",
    `${agree} of ${total} agreed. ${disagreements.slice(0, 5).join("; ")}`,
    "wrong",
  );
}
