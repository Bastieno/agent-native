import { asList, idOf } from "../shapes.js";
import { inPool } from "../pool.js";
import { abilityInWeek } from "../population.js";
import { answerQuestion, handsIn } from "../answers.js";
import {
  learnersOf,
  type Learner,
  type ShowcaseClass,
  type ShowcaseRun,
} from "./context.js";
import type { LibraryObjective } from "./curriculum.js";
import {
  handwriting,
  keyTerms,
  questionsFor,
  toBlock,
  writeOpenAnswer,
  type Question,
} from "./questions.js";

/**
 * A teaching week across the whole school: each class gets its reading, a
 * marked piece in the week's format and, every other week, a card deck; the
 * learners sit it by their own ability and diligence; the teacher marks
 * what cannot mark itself and publishes. Chosen classes teach at three
 * standards, and struggling learners are listed on the weeks set for it.
 */

export type Kind =
  | "worksheet"
  | "quiz"
  | "problem set"
  | "practical"
  | "differentiated worksheet";

export type PieceResult = {
  classId: string;
  className: string;
  week: number;
  kind: Kind;
  assessmentId: string;
  set: number;
  handedIn: number;
  marked: number;
  flagged: number;
  average: number | null;
};

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

function weekObjectives(run: ShowcaseRun, cls: ShowcaseClass, week: number) {
  const plan = run.weekPlan.get(`${cls.subject.name}|${cls.yearGroup}`)!;
  const objectives = plan.byWeek.get(week) ?? [];
  return {
    objectives: objectives.length ? objectives : plan.all.slice(0, 1),
    all: plan.all,
  };
}

/** The Friday of a week of the term (which starts on a Monday), as the due date shown to learners. */
export function friday(run: ShowcaseRun, week: number): string {
  const d = new Date(`${run.scenario.terms[0].start}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + (week - 1) * 7 + 4);
  return d.toISOString().slice(0, 10);
}

/** Which marked piece a class gets this week: the rotation, offset per class. */
export function kindFor(
  run: ShowcaseRun,
  cls: ShowcaseClass,
  week: number,
): Kind {
  const rotation = run.scenario.activityRotation;
  const index = run.classes.indexOf(cls);
  const teaching = run.scenario.teachingWeeks.indexOf(week);
  const kind = rotation[(teaching + index) % rotation.length];
  if (kind === "practical" && !cls.subject.lab) return "worksheet";
  return kind;
}

/** Readings the planner drafted beside each lesson note, by class and week. */
export async function findReadings(
  run: ShowcaseRun,
): Promise<Map<string, Map<number, string>>> {
  const readings = new Map<string, Map<number, string>>();
  await inPool(run.classes, 8, async (cls) => {
    const rows = asList(
      await run.client.as(cls.teacher, "list-assessments", { classId: cls.id }),
      "assessments",
    );
    const notes = run.notes.get(cls.id) ?? new Map();
    const byWeek = new Map<number, string>();
    for (const [week, noteId] of notes) {
      const reading = rows.find((r: any) => r.lessonNoteId === noteId);
      if (reading) byWeek.set(week, reading.id);
    }
    readings.set(cls.id, byWeek);
  });
  return readings;
}

// ── Writing the work ─────────────────────────────────────────────────────

function practicalSteps(objective: LibraryObjective) {
  const terms = keyTerms(objective.description);
  const focus = terms[0] ?? objective.subStrand.toLowerCase();
  return [
    {
      text: `Collect the apparatus your teacher has laid out for this practical on ${focus}.`,
      note: "Work in your bench group of three.",
    },
    {
      text: `Set it up as shown on the board and check it with your teacher before you begin.`,
    },
    {
      text: `Take three readings or observations of ${terms[1] ?? focus} and record them in a table.`,
    },
    { text: `Repeat once, and work out the average of your readings.` },
    { text: `State one precaution you took, and one source of error.` },
    {
      text: `Write a conclusion: what do your results show about ${objective.subStrand.toLowerCase()}?`,
    },
  ];
}

function cardDeck(objectives: LibraryObjective[]) {
  const cards = objectives.flatMap((o) =>
    keyTerms(o.description)
      .slice(0, 3)
      .map((t) => ({
        front: cap(t),
        back: `${cap(t)} — part of ${o.subStrand}. ${o.description}`,
      })),
  );
  return cards.slice(0, 8);
}

async function setPiece(
  run: ShowcaseRun,
  cls: ShowcaseClass,
  week: number,
  kind: Kind,
  questions: Question[],
  objectives: LibraryObjective[],
): Promise<string> {
  const noteId = run.notes.get(cls.id)?.get(week);
  const topic = objectives[0]?.subStrand ?? cls.subject.name;
  const base = {
    classId: cls.id,
    ...(noteId ? { lessonNoteId: noteId } : {}),
    objectives: objectives.map((o) => o.description),
    dueDate: friday(run, week),
    confirm: true,
    publish: true,
  };
  if (kind === "practical") {
    const steps = practicalSteps(objectives[0]);
    const created = await run.client.as(cls.teacher, "create-activity", {
      ...base,
      title: `Week ${week} practical: ${topic}`,
      format: "practical",
      renderAs: "steps",
      instructions:
        "Follow the steps in the lab, then write up your method, results and conclusion below.",
      blocks: steps,
      content: steps.map((s, i) => `${i + 1}. ${s.text}`).join("\n"),
      responseMode: "typed",
      gradingMode: "rubric",
      rubric: [
        {
          description: "Follows the method and records readings in a table",
          maxPoints: 4,
        },
        {
          description: "States a precaution and a source of error",
          maxPoints: 2,
        },
        { description: "Draws a conclusion from the results", maxPoints: 4 },
      ],
      totalPoints: 10,
    });
    return created?.assessmentId ?? idOf(created, "assessment")!;
  }
  const blocks = questions.map(toBlock);
  const total = questions.reduce((n, q) => n + q.points, 0);
  const created = await run.client.as(cls.teacher, "create-activity", {
    ...base,
    title: `Week ${week} ${kind}: ${topic}`,
    format: kind,
    renderAs: "questions",
    instructions:
      kind === "quiz"
        ? "One question at a time. Each has its own time limit, and you cannot go back."
        : kind === "problem set"
          ? "Show all your working. Write it by hand in the working space where you can."
          : "Answer all questions.",
    blocks,
    content: questions
      .map(
        (q, i) =>
          `${i + 1}. ${q.prompt} (${q.points} mark${q.points > 1 ? "s" : ""})${q.options ? `\n${q.options.map((o, j) => `   - ${String.fromCharCode(65 + j)}. ${o}`).join("\n")}` : ""}`,
      )
      .join("\n\n"),
    responseMode: "typed",
    gradingMode: "points",
    totalPoints: total,
    ...(kind === "quiz" ? { navigation: "linear", durationMinutes: 10 } : {}),
  });
  return created?.assessmentId ?? idOf(created, "assessment")!;
}

// ── Sitting it ───────────────────────────────────────────────────────────

async function sit(
  run: ShowcaseRun,
  learner: Learner,
  assessmentId: string,
  kind: Kind,
  questions: Question[],
  week: number,
  handwritten: boolean,
  difficulty = 1,
): Promise<void> {
  const { client } = run;
  const ability = Math.min(
    0.98,
    Math.max(0.03, abilityInWeek(learner.profile, week) + (1 - difficulty)),
  );
  const seed = learner.profile.index * 9973 + week * 101;
  await client.as(learner, "start-activity", { assessmentId });

  if (kind === "practical") {
    const covered = Math.round(ability * 4);
    const parts = [
      "Method: we set up the apparatus as shown and took three readings each.",
      covered >= 1
        ? "Results: our readings are in the table below, and we worked out the average."
        : "Results: we did not finish the readings.",
      covered >= 2
        ? "Precaution: we read the scale at eye level. Error: the readings changed slightly each time."
        : "",
      covered >= 3
        ? "Conclusion: the results agree with what we expected from the lesson, within the error we noted."
        : "",
      covered >= 4
        ? "We also repeated the experiment and the averages agreed closely."
        : "",
    ].filter(Boolean);
    await client.as(learner, "submit-work", {
      assessmentId,
      content: parts.join("\n\n"),
    });
    return;
  }

  const answer = (q: Question, i: number) =>
    q.options
      ? answerQuestion(q as any, ability, seed + i).text
      : writeOpenAnswer(q, ability, seed + i).text;

  if (kind === "quiz") {
    for (const [i, q] of questions.entries()) {
      await client.as(learner, "serve-question", { assessmentId, index: i });
      await client.as(learner, "answer-question", {
        assessmentId,
        index: i,
        answer: answer(q, i),
      });
    }
    await client.as(learner, "submit-work", { assessmentId });
    return;
  }
  if (handwritten && kind === "problem set") {
    for (const [i, q] of questions.entries()) {
      await client.as(learner, "answer-question", {
        assessmentId,
        index: i,
        answer: answer(q, i),
        ...(q.options ? {} : { drawing: handwriting(seed + i) }),
      });
      if (!q.options)
        run.record.drawings = Number(run.record.drawings ?? 0) + 1;
    }
    await client.as(learner, "submit-work", { assessmentId });
    return;
  }
  await client.as(learner, "submit-work", {
    assessmentId,
    answers: questions.map((q, i) => ({ index: i, answer: answer(q, i) })),
  });
}

// ── Marking it ───────────────────────────────────────────────────────────

/**
 * Open answers marked against the scheme, one mark per idea the learner
 * actually wrote, quoting their words. A partial answer that hedges is
 * marked with low confidence, which puts it in front of the teacher.
 */
async function markOpenAnswers(
  run: ShowcaseRun,
  cls: ShowcaseClass,
  assessmentId: string,
) {
  const { client } = run;
  const items = asList(
    await client.as(cls.teacher, "get-marking-queue", { assessmentId }),
    "items",
  );
  let flagged = 0;
  await inPool(items, 6, async (item: any) => {
    const max = Number(item.maxPoints ?? 1);
    const text = String(item.answer ?? "");
    const parts = String(item.markScheme ?? "")
      .split(";")
      .map((p) => p.trim())
      .filter(Boolean);
    const sentences = text.split(/(?<=[.!?])\s+/);
    const evidence: { criterion: string; points: number; quote: string }[] = [];
    for (const part of parts) {
      const idea = part
        .replace(/^\([a-z]\)\s*1 mark:\s*/i, "")
        .replace(/^explains\s+/i, "")
        .replace(/\s*correctly, in the learner's own words$/i, "")
        .toLowerCase();
      const quote = sentences.find((s) =>
        s.toLowerCase().includes(idea.slice(0, 24)),
      );
      if (quote && evidence.length < max)
        evidence.push({ criterion: part, points: 1, quote });
    }
    const awarded = evidence.length;
    // Low confidence where a mark rests on a sentence that names the idea
    // without explaining it, in an answer that hedges: the case a teacher
    // should look at, not every partial answer.
    const vague = awarded === 1 && /example from home/i.test(evidence[0].quote);
    const confidence =
      vague && /not sure/i.test(text)
        ? "low"
        : awarded === max || awarded === 0
          ? "high"
          : "medium";
    if (confidence === "low") flagged++;
    const missing =
      parts.length > awarded
        ? parts[awarded]
            .replace(/^\([a-z]\)\s*1 mark:\s*/i, "")
            .replace(/^explains\s+/i, "")
            .replace(/\s*correctly, in the learner's own words$/i, "")
        : "";
    await client.as(cls.teacher, "record-answer-mark", {
      responseId: item.responseId,
      awardedPoints: awarded,
      evidence,
      confidence,
      feedback:
        awarded === max
          ? "Every point in the mark scheme is there. Well done."
          : awarded === 0
            ? `Look again at this week's notes on ${cls.subject.name.toLowerCase()} and try to name the main ideas.`
            : `Good start: you earned ${awarded} of ${max}. To earn more, explain ${missing} as well.`,
    });
  });
  return { marked: items.length, flagged };
}

async function markPractical(
  run: ShowcaseRun,
  cls: ShowcaseClass,
  assessmentId: string,
) {
  const { client } = run;
  const subs = asList(
    await client.as(cls.teacher, "list-submissions", { assessmentId }),
    "submissions",
  );
  await inPool(subs, 6, async (sub: any) => {
    const detail = await client.as(cls.teacher, "get-submission", {
      id: sub.id,
    });
    const text = String(detail?.content ?? detail?.submission?.content ?? "");
    const score =
      (text.includes("readings are in the table") ? 4 : 1) +
      (text.includes("Precaution") ? 2 : 0) +
      (text.includes("Conclusion") ? 3 : 0) +
      (text.includes("repeated") ? 1 : 0);
    await client.as(cls.teacher, "grade-submission", {
      submissionId: sub.id,
      score,
      feedback:
        score >= 8
          ? "A careful write-up with a clear conclusion."
          : "Record every reading in the table, and say what your results show.",
    });
  });
  return { marked: subs.length, flagged: 0 };
}

// ── One class's week ─────────────────────────────────────────────────────

export async function teachClassWeek(
  run: ShowcaseRun,
  cls: ShowcaseClass,
  week: number,
  readings: Map<string, Map<number, string>>,
  differentiate: boolean,
): Promise<PieceResult> {
  const { client, findings } = run;
  const { objectives, all } = weekObjectives(run, cls, week);
  const teachingIndex = run.scenario.teachingWeeks.indexOf(week);
  const seed = run.classes.indexOf(cls) * 7919 + week * 131;

  // The week's reading, drafted beside the lesson note, goes out to the class.
  const readingId = readings.get(cls.id)?.get(week);
  if (readingId)
    await client.as(cls.teacher, "publish-assessment", { id: readingId });

  // A card deck every other week, with nothing to hand in.
  if (teachingIndex % 2 === 1) {
    const cards = cardDeck(objectives);
    if (cards.length) {
      const noteId = run.notes.get(cls.id)?.get(week);
      await client.as(cls.teacher, "create-activity", {
        classId: cls.id,
        ...(noteId ? { lessonNoteId: noteId } : {}),
        title: `Week ${week} cards: ${objectives[0]?.subStrand ?? cls.subject.name}`,
        format: "card deck",
        renderAs: "cards",
        blocks: cards,
        content: cards.map((c) => `**${c.front}** — ${c.back}`).join("\n\n"),
        gradingMode: "none",
        responseMode: "none",
        publish: true,
        confirm: true,
      });
    }
  }

  if (differentiate)
    return differentiatedWeek(run, cls, week, objectives, all, seed);

  const kind = kindFor(run, cls, week);
  const questions =
    kind === "quiz"
      ? questionsFor(cls.subject.name, objectives, all, seed, 5, 0)
      : kind === "problem set"
        ? questionsFor(cls.subject.name, objectives, all, seed, 2, 2)
        : kind === "practical"
          ? []
          : questionsFor(cls.subject.name, objectives, all, seed, 3, 1);
  const assessmentId = await setPiece(
    run,
    cls,
    week,
    kind,
    questions,
    objectives,
  );

  const learners = learnersOf(run, cls);
  const sat = await inPool(learners, 6, async (learner) => {
    if (
      !handsIn(
        learner.profile.diligence,
        learner.profile.index * 31 + week * 7 + run.classes.indexOf(cls),
      )
    )
      return false;
    await sit(
      run,
      learner,
      assessmentId,
      kind,
      questions,
      week,
      !!cls.subject.handwritten,
    );
    return true;
  });
  const handedIn = sat.filter(Boolean).length;

  const marking =
    kind === "practical"
      ? await markPractical(run, cls, assessmentId)
      : await markOpenAnswers(run, cls, assessmentId);
  if (kind !== "practical")
    await client.as(cls.teacher, "compile-submission-grade", { assessmentId });
  await client.as(cls.teacher, "publish-grades", { assessmentId });
  const analytics = await client.as(cls.teacher, "get-assessment-analytics", {
    assessmentId,
  });
  findings.expect(
    "teaching",
    handedIn > 0,
    `work is handed in for ${cls.name} in week ${week}`,
  );
  return {
    classId: cls.id,
    className: cls.name,
    week,
    kind,
    assessmentId,
    set: learners.length,
    handedIn,
    ...marking,
    average: analytics?.average == null ? null : Number(analytics.average),
  };
}

/** The same week's work at three standards, served by the class's own groups. */
async function differentiatedWeek(
  run: ShowcaseRun,
  cls: ShowcaseClass,
  week: number,
  objectives: LibraryObjective[],
  all: LibraryObjective[],
  seed: number,
): Promise<PieceResult> {
  const { client, findings } = run;
  // Group the class from its marks so far, and keep the grouping.
  const grouped = await client.as(cls.teacher, "categorize-students", {
    classId: cls.id,
    confirm: true,
  });
  const groups: Record<string, string> = {};
  for (const row of asList(grouped, "categorizations")) {
    if (row.category) groups[row.studentId] = row.category;
  }
  const history = (run.record.groups ??= {}) as Record<
    string,
    { week: number; groups: Record<string, string> }[]
  >;
  (history[cls.name] ??= []).push({ week, groups });

  const foundational = questionsFor(
    cls.subject.name,
    objectives,
    all,
    seed,
    4,
    0,
  );
  const developing = questionsFor(
    cls.subject.name,
    objectives,
    all,
    seed,
    3,
    1,
  );
  const advanced = questionsFor(
    cls.subject.name,
    objectives,
    all,
    seed + 1,
    3,
    2,
  );
  const variant = (label: string, difficulty: string, qs: Question[]) => ({
    label,
    difficulty,
    blocks: qs.map(toBlock),
    content: qs.map((q, i) => `${i + 1}. ${q.prompt}`).join("\n\n"),
    totalPoints: qs.reduce((n, q) => n + q.points, 0),
  });
  const noteId = run.notes.get(cls.id)?.get(week);
  const created = await client.as(cls.teacher, "create-activity", {
    classId: cls.id,
    ...(noteId ? { lessonNoteId: noteId } : {}),
    title: `Week ${week} worksheet: ${objectives[0]?.subStrand ?? cls.subject.name}`,
    format: "worksheet",
    renderAs: "questions",
    objectives: objectives.map((o) => o.description),
    instructions: "Answer all questions.",
    variants: [
      variant("Foundational", "foundational", foundational),
      variant("Developing", "developing", developing),
      variant("Advanced", "advanced", advanced),
    ],
    responseMode: "typed",
    gradingMode: "points",
    totalPoints: developing.reduce((n, q) => n + q.points, 0),
    dueDate: friday(run, week),
    confirm: true,
  });
  const assessmentId = created?.assessmentId ?? idOf(created, "assessment")!;
  await client.as(cls.teacher, "assign-variants", {
    assessmentId,
    strategy: "auto-by-category",
    classId: cls.id,
  });
  await client.as(cls.teacher, "publish-assessment", { id: assessmentId });

  const variants = asList(
    await client.as(cls.teacher, "list-variants", { assessmentId }),
    "variants",
  );
  const papers: Record<string, Question[]> = {
    foundational,
    developing,
    advanced,
  };
  const served: Record<string, number> = {};
  const learners = learnersOf(run, cls);
  const sat = await inPool(learners, 6, async (learner) => {
    const paper = await client.as(learner, "get-my-assessment", {
      assessmentId,
    });
    const mine = paper?.variant ?? paper?.myVariant;
    const which =
      variants.find((v: any) => v.id === mine?.id)?.difficulty ?? "developing";
    served[which] = (served[which] ?? 0) + 1;
    findings.expect(
      "differentiation",
      !/foundational|developing|advanced/i.test(JSON.stringify(paper ?? {})),
      "a learner's paper never names the ability groups",
      learner.profile.name,
    );
    if (
      !handsIn(
        learner.profile.diligence,
        learner.profile.index * 31 + week * 7 + run.classes.indexOf(cls),
      )
    )
      return false;
    const difficulty =
      which === "foundational" ? 0.82 : which === "advanced" ? 1.08 : 1;
    await sit(
      run,
      learner,
      assessmentId,
      "worksheet",
      papers[which],
      week,
      false,
      difficulty,
    );
    return true;
  });
  const marking = await markOpenAnswers(run, cls, assessmentId);
  await client.as(cls.teacher, "compile-submission-grade", { assessmentId });
  await client.as(cls.teacher, "publish-grades", { assessmentId });
  const analytics = await client.as(cls.teacher, "get-assessment-analytics", {
    assessmentId,
  });
  findings.expect(
    "differentiation",
    Object.keys(served).length > 1,
    `${cls.name} is served more than one standard of paper in week ${week}`,
    JSON.stringify(served),
  );
  const servedLog = (run.record.served ??= {}) as Record<
    string,
    Record<number, Record<string, number>>
  >;
  (servedLog[cls.name] ??= {})[week] = served;
  return {
    classId: cls.id,
    className: cls.name,
    week,
    kind: "differentiated worksheet",
    assessmentId,
    set: learners.length,
    handedIn: sat.filter(Boolean).length,
    ...marking,
    average: analytics?.average == null ? null : Number(analytics.average),
  };
}

// ── The school's week ────────────────────────────────────────────────────

export async function teachSchoolWeek(
  run: ShowcaseRun,
  week: number,
  readings: Map<string, Map<number, string>>,
): Promise<PieceResult[]> {
  const { scenario } = run;
  const chosen = new Set(
    scenario.differentiationClasses.map(
      (d) =>
        run.classes.find(
          (c) => c.arm?.name === d.arm && c.subject.name === d.subject,
        )!.id,
    ),
  );
  const differentiateNow = scenario.differentiationWeeks.includes(week);
  const results = await inPool(run.classes, 4, (cls) =>
    teachClassWeek(
      run,
      cls,
      week,
      readings,
      differentiateNow && chosen.has(cls.id),
    ),
  );
  await announcements(run, week);
  if (scenario.strugglingWeeks.includes(week)) await struggling(run, week);
  return results;
}

async function announcements(run: ShowcaseRun, week: number) {
  const { client, admin } = run;
  const school: Record<number, [string, string]> = {
    1: [
      "Welcome to the First Term",
      "Welcome back, everyone. Lessons begin on Monday 14 September at 8:00 after assembly. Form teachers will share the timetable on the first day.",
    ],
    6: [
      "Mid-term break next week",
      "The school is closed for mid-term break in week 7, from Monday 26 October. Lessons resume on Monday 2 November.",
    ],
    10: [
      "Revision and examinations",
      "Week 11 is for revision; the First Term examinations run from Monday 30 November to Friday 4 December. The examination timetable will be published next week.",
    ],
  };
  if (school[week]) {
    const [title, content] = school[week];
    await client.as(admin, "create-announcement", {
      title,
      content,
      scope: "school",
    });
  }
  // A few teachers write to their class each week.
  const start = (week * 5) % run.classes.length;
  for (const cls of run.classes.slice(start, start + 6)) {
    const topic = run.weekPlan
      .get(`${cls.subject.name}|${cls.yearGroup}`)
      ?.byWeek.get(week)?.[0]?.subStrand;
    await client.as(cls.teacher, "create-announcement", {
      title: `${cls.name}: week ${week}`,
      content: `This week we are on ${topic ?? "the next topic"}. Read the notes before Thursday's lesson and bring your exercise books.`,
      scope: "class",
      classId: cls.id,
    });
  }
}

/** Who is struggling, per class, gathered by year group. */
async function struggling(run: ShowcaseRun, week: number) {
  const byYear: Record<string, Set<string>> = {};
  const byClass: Record<string, string[]> = {};
  await inPool(run.classes, 4, async (cls) => {
    const reply = await run.client.as(
      cls.teacher,
      "identify-struggling-students",
      { classId: cls.id },
    );
    const names = asList(reply, "students").map(
      (s: any) =>
        run.learners.find(
          (l) => l.studentId === s.studentId || l.userId === s.studentUserId,
        )?.profile.name ??
        s.name ??
        s.studentId,
    );
    byClass[cls.name] = names;
  });
  // A year group's list: the learners flagged in at least a third of their
  // classes. One weak subject is the subject teacher's to handle; a third of
  // them is the form teacher's and the year head's.
  for (const learner of run.learners) {
    const theirs = run.classes.filter((c) =>
      learnersOf(run, c).includes(learner),
    );
    const times = theirs.filter((c) =>
      byClass[c.name]?.includes(learner.profile.name),
    ).length;
    if (times > 0 && times >= theirs.length / 3)
      (byYear[learner.yearGroup] ??= new Set()).add(learner.profile.name);
  }
  const log = (run.record.struggling ??= []) as {
    week: number;
    byClass: Record<string, string[]>;
    byYear: Record<string, string[]>;
  }[];
  log.push({
    week,
    byClass,
    byYear: Object.fromEntries(
      Object.entries(byYear).map(([y, s]) => [y, [...s].sort()]),
    ),
  });
  console.log(
    `  struggling after week ${week}: ${Object.entries(byYear)
      .map(([y, s]) => `${y} ${s.size}`)
      .join(", ")}`,
  );
}
