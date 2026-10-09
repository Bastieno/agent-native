import type { Client } from "./client.js";
import type { FullSchoolRun, SimClass } from "./school-setup.js";
import type { FullSchool } from "../scenarios/nigeria-full-school.js";
import { SUBJECT_BANK } from "../scenarios/question-bank.js";
import type { Findings } from "./findings.js";
import { asList, idOf } from "./shapes.js";
import { abilityInWeek, trueBand } from "./population.js";
import { answerQuestion, handsIn } from "./answers.js";
import { inPool } from "./pool.js";

/** One week in one class, from setting the work to publishing the marks. */
export type ClassWeek = {
  classId: string;
  className: string;
  week: number;
  assessmentId: string;
  submitted: number;
  marked: number;
  average: number | null;
};

export async function teachClassWeek(
  client: Client,
  run: FullSchoolRun,
  cls: SimClass,
  weekIndex: number,
  findings: Findings,
): Promise<ClassWeek | null> {
  const bank = SUBJECT_BANK.find((s) => s.subject === cls.subject)!;
  const week = bank.weeks[weekIndex];
  if (!week) return null;
  const phase = `${cls.name} week ${weekIndex + 1}`;

  const blocks = week.questions.map((q) => ({
    prompt: q.prompt,
    points: q.points,
    ...(q.options ? { options: q.options } : {}),
    ...(q.answer ? { answer: q.answer } : {}),
    ...(q.markScheme ? { markScheme: q.markScheme } : {}),
    ...(q.answerSpace ? { answerSpace: q.answerSpace } : {}),
  }));
  const totalPoints = week.questions.reduce((sum, q) => sum + q.points, 0);

  const created = await client.as(cls.teacher, "create-activity", {
    classId: cls.id,
    title: `Week ${weekIndex + 1}: ${week.topic}`,
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
  // create-activity answers with assessmentId, not id.
  const assessmentId = created?.assessmentId ?? idOf(created, "assessment");
  await client.as(cls.teacher, "publish-assessment", { id: assessmentId });

  // The class sits it. Learners are independent of one another, so they do
  // it in parallel — which is also the only load this app ever really sees.
  const cohort = run.students.filter((s) => s.yearGroup === cls.yearGroup);
  const sat = await inPool(cohort, 8, async (student) => {
    const ability = abilityInWeek(student.profile, weekIndex + 1);
    if (
      !handsIn(
        student.profile.diligence,
        student.profile.index * 31 + weekIndex + cls.name.length,
      )
    ) {
      return false;
    }
    await client.as(student, "start-activity", { assessmentId });
    for (const [index, question] of week.questions.entries()) {
      const answer = answerQuestion(
        question as any,
        ability,
        student.profile.index * 9973 + weekIndex * 101 + index,
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
  const submitted = sat.filter(Boolean).length;

  // The teacher marks what cannot mark itself.
  const queue = await client.as(cls.teacher, "get-marking-queue", {
    assessmentId,
  });
  const items = asList(queue, "items");
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

  const analytics = await client.as(cls.teacher, "get-assessment-analytics", {
    assessmentId,
  });
  const raw = analytics?.average;
  const average = raw === null || raw === undefined ? null : Number(raw);

  findings.expect(
    phase,
    submitted > 0,
    `work is handed in for ${cls.name} week ${weekIndex + 1}`,
  );

  return {
    classId: cls.id,
    className: cls.name,
    week: weekIndex + 1,
    assessmentId,
    submitted,
    marked: items.length,
    average,
  };
}

/**
 * Is the learner who has stopped working visible?
 *
 * The simulation deliberately contains learners who hand almost nothing in.
 * A school's whole reason for asking "who is struggling?" is to find them,
 * and before this they were the one group the question could not return:
 * with no marks there was no average, and the check only looked at learners
 * who had one.
 */
export async function checkMissedWorkIsVisible(
  client: Client,
  run: FullSchoolRun,
  findings: Findings,
): Promise<void> {
  const phase = "missed work";
  const cls = run.classes[0];

  const struggling = await client.as(
    cls.teacher,
    "identify-struggling-students",
    {
      classId: cls.id,
    },
  );
  const flagged = asList(struggling, "students");

  // Who actually handed least in, by the app's own count.
  const grouped = await client.as(cls.teacher, "categorize-students", {
    classId: cls.id,
    confirm: false,
  });
  const rows = asList(grouped, "categorizations");
  const worst = [...rows].sort(
    (a: any, b: any) => (b.notHandedIn ?? 0) - (a.notHandedIn ?? 0),
  )[0];

  if (worst && (worst.notHandedIn ?? 0) > 0) {
    findings.expect(
      phase,
      flagged.some((f: any) => f.studentId === worst.studentId),
      "the learner who handed least in is flagged as struggling",
      `${worst.notHandedIn} of ${worst.assessmentsSet} not handed in, average ${worst.average}`,
    );
  }

  findings.expect(
    phase,
    rows.every((r: any) => typeof r.assessmentsSet === "number"),
    "grouping counts what was set, not only what came back",
  );

  const reasons = flagged.filter((f: any) => !!f.reason);
  findings.expect(
    phase,
    reasons.length === flagged.length,
    "every learner flagged as struggling says why",
    `${reasons.length} of ${flagged.length} carried a reason`,
    "wording",
  );
}

/**
 * "What do I have today?" — the first thing a teacher asks the app.
 *
 * Every class has one period a week, so on any weekday some teachers are
 * teaching and some are not, and both answers have to be right. The check
 * is deliberately about the question rather than the row count: a teacher
 * is told their own classes, at their own times, with whether each lesson
 * has a note ready.
 */
export async function checkTodaysSchedule(
  client: Client,
  run: FullSchoolRun,
  findings: Findings,
): Promise<void> {
  const phase = "schedule";
  const today = new Date().getDay(); // 0 Sunday … 6 Saturday
  const teaching = run.classes.filter((_, index) => (index % 5) + 1 === today);

  for (const cls of run.classes.slice(0, 3)) {
    const schedule = await client.as(cls.teacher, "get-my-schedule", {});
    const slots = asList(schedule, "slots");
    const mine = slots.every((s: any) =>
      run.classes.some(
        (c) => c.id === s.classId && c.teacher.email === cls.teacher.email,
      ),
    );
    findings.expect(
      phase,
      mine,
      `${cls.teacher.label}'s day holds only their own classes`,
      `${slots.length} slot(s) returned`,
    );
    findings.expect(
      phase,
      typeof schedule?.message === "string" && schedule.message.length > 0,
      "the schedule says in words what the day looks like",
      JSON.stringify(schedule?.message ?? null),
    );
    // Every slot must say whether the lesson is prepared — that is the
    // reason a teacher opens it the night before.
    findings.expect(
      phase,
      slots.every((s: any) => typeof s.lessonPrepared === "boolean"),
      "each lesson today says whether a note is ready",
    );
  }

  // Somebody is teaching today, unless it is the weekend.
  if (today >= 1 && today <= 5) {
    const anyTeaching = teaching.length > 0;
    findings.expect(
      phase,
      anyTeaching,
      "the timetable puts somebody in front of a class on a weekday",
      `${teaching.length} classes scheduled for day ${today}`,
    );
  }
}

/**
 * What one teacher can reach of another teacher's class.
 *
 * This is the question a school system has to get right and a single-class
 * simulation cannot ask. Every teacher here has exactly one class, so every
 * other class in the building is someone else's.
 */
export async function checkTeacherIsolation(
  client: Client,
  run: FullSchoolRun,
  findings: Findings,
): Promise<void> {
  const phase = "teacher isolation";
  const [mine, theirs] = run.classes;

  for (const action of [
    "get-gradebook",
    "list-assessments",
    "list-class-students",
    "list-lesson-notes",
  ]) {
    const refusal = await client.refused(mine.teacher, action, {
      classId: theirs.id,
    });
    findings.expect(
      phase,
      refusal !== null,
      `${mine.teacher.label} cannot run ${action} on ${theirs.name}`,
      `${theirs.name} is ${theirs.teacher.label}'s class`,
    );
    // The guide asks a refusal to name what was refused, not the function
    // that refused it: a teacher is not debugging the app.
    if (refusal) {
      findings.expect(
        phase,
        !refusal.includes(action),
        `the refusal for ${action} does not name the action`,
        refusal.slice(0, 120),
        "wording",
      );
    }
  }

  // Their own class must still work, or the check above proves nothing.
  const own = await client.as(mine.teacher, "get-gradebook", {
    classId: mine.id,
  });
  findings.expect(
    phase,
    !!own,
    `${mine.teacher.label} can still read their own class`,
  );

  // A teacher's own list should hold only their own classes.
  const listed = asList(
    await client.as(mine.teacher, "get-my-classes", {}),
    "classes",
  );
  findings.expect(
    phase,
    listed.length === 1 && listed[0]?.id === mine.id,
    "a teacher's own class list holds only their classes",
    `${listed.length} classes listed`,
  );
}

/** What a learner in one year group can reach of another's. */
export async function checkCohortIsolation(
  client: Client,
  run: FullSchoolRun,
  weeks: ClassWeek[],
  findings: Findings,
): Promise<void> {
  const phase = "cohort isolation";
  const [first, second] = [...new Set(run.students.map((s) => s.yearGroup))];
  const learner = run.students.find((s) => s.yearGroup === first);
  const otherClass = run.classes.find((c) => c.yearGroup === second);
  if (!learner || !otherClass) return;

  const otherWork = weeks.find((w) => w.classId === otherClass.id);
  if (otherWork) {
    const refusal = await client.refused(learner, "get-my-assessment", {
      assessmentId: otherWork.assessmentId,
    });
    findings.expect(
      phase,
      refusal !== null,
      `a ${first} learner cannot open ${second} work`,
      `${learner.profile.name} reached ${otherClass.name}`,
    );
  }

  const mine = asList(
    await client.as(learner, "get-my-assessments", {}),
    "assessments",
  );
  const foreign = mine.filter(
    (a: any) =>
      !run.classes.some((c) => c.id === a.classId && c.yearGroup === first),
  );
  findings.expect(
    phase,
    foreign.length === 0,
    "a learner's own list holds only their year group's work",
    `${foreign.length} of ${mine.length} belonged to another year group`,
  );
}

/** Does the app's grouping follow the marks, across every class? */
export async function checkGroupingAcrossSchool(
  client: Client,
  run: FullSchoolRun,
  findings: Findings,
): Promise<{ agreed: number; placed: number }> {
  let agreed = 0;
  let placed = 0;
  for (const cls of run.classes) {
    const grouped = await client.as(cls.teacher, "categorize-students", {
      classId: cls.id,
      confirm: true,
    });
    for (const row of asList(grouped, "categorizations")) {
      const student = run.students.find((s) => s.studentId === row.studentId);
      if (!student || !row.category) continue;
      placed++;
      if (row.category === trueBand(student.profile.ability)) agreed++;
    }
  }
  findings.expect(
    "grouping",
    placed > 0,
    "every class can be grouped from its own marks",
  );
  return { agreed, placed };
}
