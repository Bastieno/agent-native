import { idOf } from "../shapes.js";
import { inPool } from "../pool.js";
import type { ShowcaseClass, ShowcaseRun } from "./context.js";
import type { LibraryObjective } from "./curriculum.js";
import { questionsFor, toBlock, type Question } from "./questions.js";
import {
  closedToQuestion,
  contentFor,
  openToQuestion,
  type WeekContent,
} from "./content.js";
import { learnersOf } from "./context.js";
import { markOpenAnswers, opensOn, sit } from "./teaching.js";
import { abilityInWeek } from "../population.js";

/**
 * The end of the First Term: revision material in week 11, the week 12
 * examinations set, timetabled, sat and marked, and every learner's report
 * card issued.
 */

const SESSIONS = ["08:30", "11:00", "13:30"];

export type ExamSlot = {
  yearGroup: string;
  subject: string;
  date: string;
  start: string;
  minutes: number;
};

/** Every year group's papers laid across the exam week, three sessions a day. */
export function examTimetable(run: ShowcaseRun): ExamSlot[] {
  const { scenario } = run;
  const slots: ExamSlot[] = [];
  const at = (i: number) => ({
    date: scenario.examDays[
      Math.floor(i / SESSIONS.length) % scenario.examDays.length
    ],
    start: SESSIONS[i % SESSIONS.length],
  });
  for (const yearGroup of scenario.yearGroups) {
    const classes = run.classes.filter((c) => c.yearGroup === yearGroup);
    const armsInYear = new Set(
      classes.filter((c) => c.arm).map((c) => c.arm!.name),
    ).size;
    const minutes = yearGroup.startsWith("SS") ? 90 : 60;
    const subjects = [...new Set(classes.map((c) => c.subject.name))];
    // Papers every arm sits come first, at one time for the whole year group.
    const common = subjects.filter(
      (s) =>
        classes.filter((c) => c.subject.name === s && c.arm).length ===
        armsInYear,
    );
    let i = 0;
    for (const subject of common)
      slots.push({ yearGroup, subject, ...at(i++), minutes });
    // Stream papers share a session across streams: the Science, Commercial
    // and Art learners each sit their own paper at the same time.
    const byStream = new Map<string, string[]>();
    for (const c of classes.filter(
      (c) => c.arm && !common.includes(c.subject.name),
    )) {
      const list = byStream.get(c.arm!.stream ?? "") ?? [];
      if (!list.includes(c.subject.name)) list.push(c.subject.name);
      byStream.set(c.arm!.stream ?? "", list);
    }
    const longest = Math.max(0, ...[...byStream.values()].map((l) => l.length));
    for (let k = 0; k < longest; k++) {
      for (const list of byStream.values())
        if (list[k])
          slots.push({ yearGroup, subject: list[k], ...at(i + k), minutes });
    }
    i += longest;
    // The option block sits its two papers together.
    for (const c of classes.filter((c) => !c.arm))
      slots.push({ yearGroup, subject: c.subject.name, ...at(i), minutes });
  }
  return slots;
}

/** Week 11: a revision page and a card deck for every class, published. */
export async function revisionWeek(run: ShowcaseRun): Promise<void> {
  const week = run.scenario.revisionWeek;
  await inPool(run.classes, 6, async (cls) => {
    const plan = run.weekPlan.get(`${cls.subject.name}|${cls.yearGroup}`)!;
    const taught = [...plan.byWeek.values()].flat();
    const topics = [...new Set(taught.map((o) => o.subStrand))];
    const written = contentFor(cls.subject.name, cls.yearGroup);
    const revision = written
      ? [
          `# Revision: ${cls.subject.name}, First Term`,
          "",
          "The examination covers every week below. For each one, read your notes and the week's reading again, then answer the week's questions without looking.",
          "",
          ...run.scenario.teachingWeeks
            .filter((w) => written.weeks[String(w)])
            .map((w) => {
              const wk = written.weeks[String(w)];
              return `## Week ${w}: ${wk.topic}\n\n${wk.cards
                .slice(0, 4)
                .map((c) => `- **${c.front}**: ${c.back}`)
                .join("\n")}`;
            }),
        ].join("\n")
      : null;
    await run.client.as(cls.teacher, "create-activity", {
      classId: cls.id,
      title: `Week ${week} revision: ${cls.subject.name}`,
      format: "reading",
      renderAs: "prose",
      content:
        revision ??
        [
          `# Revision: ${cls.subject.name}, First Term`,
          "",
          "The examination covers everything below. Go through your notes for each topic, then try the questions at the end of each week's worksheet again without looking.",
          "",
          ...topics.map(
            (t) =>
              `## ${t}\n\n${taught
                .filter((o) => o.subStrand === t)
                .map((o) => `- ${o.description}`)
                .join("\n")}`,
          ),
        ].join("\n"),
      gradingMode: "none",
      responseMode: "none",
      opensAt: opensOn(run, week),
      publish: true,
      confirm: true,
    });
  });
}

/** Week 12: a paper for every class on its timetabled session, published and unsat. */
export async function examWeek(run: ShowcaseRun): Promise<ExamPaper[]> {
  const { client, admin, decisions, findings } = run;
  const timetable = examTimetable(run);
  const papers: ExamPaper[] = [];
  await inPool(run.classes, 6, async (cls: ShowcaseClass) => {
    const slot = timetable.find(
      (s) => s.yearGroup === cls.yearGroup && s.subject === cls.subject.name,
    )!;
    const plan = run.weekPlan.get(`${cls.subject.name}|${cls.yearGroup}`)!;
    const taught: LibraryObjective[] = [...plan.byWeek.values()].flat();
    const ss = cls.yearGroup.startsWith("SS");
    const written = examFromContent(run, cls.subject.name, cls.yearGroup, ss);
    const questions =
      written?.questions ??
      questionsFor(
        cls.subject.name,
        taught,
        plan.all,
        424242 + run.classes.indexOf(cls),
        10,
        ss ? 3 : 2,
      );
    const created = await client.as(cls.teacher, "create-activity", {
      classId: cls.id,
      title: `First Term Examination: ${cls.subject.name}`,
      format: "examination",
      renderAs: "questions",
      instructions: `Answer all questions in Section A. ${ss ? "Answer all questions in Section B." : "Answer both questions in Section B."} Time allowed: ${slot.minutes} minutes.`,
      blocks: questions.map(toBlock),
      content: questions
        .map(
          (q, i) =>
            `${i + 1}. ${q.prompt}${q.options ? `\n${q.options.map((o, j) => `   - ${String.fromCharCode(65 + j)}. ${o}`).join("\n")}` : ""}`,
        )
        .join("\n\n"),
      objectives: [...new Set(taught.map((o) => o.description))].slice(0, 12),
      responseMode: "typed",
      gradingMode: "points",
      totalPoints: questions.reduce((n, q) => n + q.points, 0),
      // No opening time: the papers are sat now, though the term's dates
      // put the examinations in December.
      durationMinutes: slot.minutes,
      dueDate: slot.date,
      publish: true,
      confirm: true,
    });
    papers.push({
      cls,
      className: cls.name,
      assessmentId: created?.assessmentId ?? idOf(created, "assessment")!,
      questions,
      weeks: written?.weeks ?? [],
    });
  });
  run.record.examPapers = papers.map((p) => ({
    className: p.className,
    assessmentId: p.assessmentId,
  }));
  findings.expect(
    "exams",
    papers.length === run.classes.length &&
      papers.every((p) => !!p.assessmentId),
    "every class has its examination paper",
    `${papers.length} of ${run.classes.length}`,
  );

  // The examination timetable goes out to the whole school.
  const days = [...new Set(timetable.map((s) => s.date))].sort();
  const lines = [
    "The First Term examinations run from Monday 30 November to Friday 4 December. Be seated ten minutes before each paper.",
    "",
    "| Day | Time | Year group | Paper | Minutes |",
    "| --- | --- | --- | --- | --- |",
    ...days.flatMap((d) =>
      timetable
        .filter((s) => s.date === d)
        .sort(
          (a, b) =>
            a.start.localeCompare(b.start) ||
            a.yearGroup.localeCompare(b.yearGroup),
        )
        .map(
          (s) =>
            `| ${new Date(`${d}T12:00:00Z`).toLocaleDateString("en-NG", { weekday: "long", day: "numeric", month: "long" })} | ${s.start} | ${s.yearGroup} | ${s.subject} | ${s.minutes} |`,
        ),
    ),
  ];
  await client.as(admin, "create-announcement", {
    title: "First Term examination timetable",
    content: lines.join("\n"),
    scope: "school",
  });

  decisions.add(
    "Exams",
    "When",
    "week 12, Monday 30 November to Friday 4 December 2026, three sessions a day (08:30, 11:00, 13:30)",
  );
  decisions.add(
    "Exams",
    "Papers",
    `${papers.length}, one per class: 10 objective questions and ${"3 theory questions in SS, 2 in JSS"}; 90 minutes in SS, 60 in JSS; each opens at its session and closes 30 minutes after its time runs out`,
  );
  decisions.add(
    "Exams",
    "Order",
    "papers every arm sits first, then stream papers in shared sessions (Science, Commercial and Art at the same time), then the option block together",
  );
  decisions.add(
    "Exams",
    "State",
    "sat, marked and published; the papers carry no opening time, because the term's dates put week 12 in December",
  );
  decisions.add("Exams", "Timetable", "announced to the whole school");
  return papers;
}

export type ExamPaper = {
  cls: ShowcaseClass;
  className: string;
  assessmentId: string;
  questions: Question[];
  weeks: (WeekContent | null)[];
};

/**
 * A paper drawn from the term's written questions: one objective question
 * from each week taught, and theory questions from early, middle and late in
 * the term — the way a teacher sets a terminal paper from what was covered.
 */
function examFromContent(
  run: ShowcaseRun,
  subject: string,
  yearGroup: string,
  ss: boolean,
): { questions: Question[]; weeks: (WeekContent | null)[] } | null {
  const content = contentFor(subject, yearGroup);
  if (!content) return null;
  const weeks = run.scenario.teachingWeeks
    .map((w) => content.weeks[String(w)])
    .filter(Boolean);
  if (weeks.length < 3) return null;
  const closed = weeks.map((w, i) =>
    closedToQuestion(w.closed[i % w.closed.length], 90),
  );
  closed.push(closedToQuestion(weeks[0].closed[4] ?? weeks[0].closed[0], 90));
  const at = ss
    ? [0, Math.floor(weeks.length / 2), weeks.length - 1]
    : [1, weeks.length - 2];
  const open = at.map((i) =>
    openToQuestion(weeks[i].open[1] ?? weeks[i].open[0]),
  );
  return { questions: [...closed.slice(0, 10), ...open], weeks };
}

/** Week 12, sat: every learner writes every paper, which is then marked and published. */
export async function sitExams(
  run: ShowcaseRun,
  papers: ExamPaper[],
): Promise<void> {
  const { client, findings } = run;
  const week = run.scenario.examWeek;
  await inPool(papers, 4, async (paper) => {
    const learners = learnersOf(run, paper.cls);
    await inPool(learners, 6, async (learner) => {
      // An examination is sat by everyone; the odd learner is absent.
      if (
        (learner.profile.index * 7 + run.classes.indexOf(paper.cls)) % 41 ===
        0
      )
        return;
      await sit(
        run,
        learner,
        paper.assessmentId,
        "worksheet",
        paper.questions,
        week,
        false,
        1,
        paper.weeks,
      );
    });
    await markOpenAnswers(run, paper.cls, paper.assessmentId);
    await client.as(paper.cls.teacher, "compile-submission-grade", {
      assessmentId: paper.assessmentId,
    });
    await client.as(paper.cls.teacher, "publish-grades", {
      assessmentId: paper.assessmentId,
    });
  });
  findings.expect(
    "exams",
    papers.length === run.classes.length,
    "every examination is sat, marked and published",
    `${papers.length} papers`,
  );
}

/**
 * Week 13: every learner's report card, issued by the principal with their
 * form teacher's remark and the principal's own, both written from how the
 * learner's term actually went.
 */
export async function reportCards(run: ShowcaseRun): Promise<void> {
  const { client, admin, findings, decisions } = run;
  const termId = run.firstTermId;
  let issued = 0;
  await inPool(run.learners, 6, async (learner) => {
    const preview = await client.as(admin, "issue-report-card", {
      studentId: learner.studentId,
      termId,
    });
    // The preview hands back the card as it would print; its subject table
    // and its count of missed work are what the remarks are written from.
    const markdown = String(preview?.markdown ?? "");
    const scored = [
      ...markdown.matchAll(
        /^\| ([^|*]+?) \| \d+ of \d+ \| (\d+)% \| \w+ \|$/gm,
      ),
    ]
      .map((m) => ({ subject: m[1].trim(), score: Number(m[2]) }))
      .sort((a, b) => b.score - a.score);
    const missed = Number(
      markdown.match(/(\d+) piece\(s\) of work were not handed in/)?.[1] ?? 0,
    );
    const form = run.arms.find((a) => a.name === learner.arm)?.formTeacher
      ?.name;
    const ability = abilityInWeek(learner.profile, 10);
    const result = await client.as(admin, "issue-report-card", {
      studentId: learner.studentId,
      termId,
      comments: {
        [`Form teacher${form ? ` (${form})` : ""}`]: formRemark(
          learner.profile.name.split(" ")[0],
          scored,
          missed,
        ),
        Principal: principalRemark(ability),
      },
      nextTermBegins: "Monday 11 January 2027",
      confirm: true,
    });
    if (result?.reportCardId) issued++;
  });
  run.record.reportCards = issued;
  findings.expect(
    "report cards",
    issued === run.learners.length,
    "every learner has a report card issued",
    `${issued} of ${run.learners.length}`,
  );
  decisions.add(
    "Report cards",
    "Issued",
    `${issued}, one per learner, by the principal after the examinations were published; positions shown; next term begins Monday 11 January 2027`,
  );
  decisions.add(
    "Report cards",
    "Remarks",
    "the form teacher's from the learner's own strongest and weakest subjects and how much work they handed in; the principal's from how the term went overall",
  );
}

function formRemark(
  first: string,
  scored: { subject: string; score: number }[],
  missed: number,
): string {
  const best = scored.slice(0, 2).map((r) => r.subject);
  const weakest = scored[scored.length - 1];
  const parts: string[] = [];
  if (best.length)
    parts.push(`${first} did best this term in ${best.join(" and ")}.`);
  if (weakest && weakest.score < 50)
    parts.push(
      `${weakest.subject} needs steady work over the holiday; a page of practice a day would make a difference.`,
    );
  else if (weakest)
    parts.push("Every subject is at a pass or better, which is good to see.");
  parts.push(
    missed === 0
      ? "Every piece of class work was handed in."
      : missed <= 4
        ? `${missed} piece${missed === 1 ? " was" : "s were"} missed; handing everything in would lift the average.`
        : `${missed} pieces of class work were not handed in, and each counted as nought. This must change next term.`,
  );
  return parts.join(" ");
}

function principalRemark(ability: number): string {
  if (ability >= 0.75) return "An excellent term. Keep it up.";
  if (ability >= 0.55) return "A good term. There is more to come.";
  if (ability >= 0.4)
    return "A fair term. Steady effort will bring better results.";
  return "A difficult term. We will work with you and your parents to improve.";
}
