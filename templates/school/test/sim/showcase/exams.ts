import { idOf } from "../shapes.js";
import { inPool } from "../pool.js";
import type { ShowcaseClass, ShowcaseRun } from "./context.js";
import type { LibraryObjective } from "./curriculum.js";
import { questionsFor, toBlock } from "./questions.js";

/**
 * The end of the First Term: revision material in week 11, then the week 12
 * examinations set, timetabled and published — and left unsat, so the owner
 * can see a paper from both sides before anyone writes it.
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
    await run.client.as(cls.teacher, "create-activity", {
      classId: cls.id,
      title: `Week ${week} revision: ${cls.subject.name}`,
      format: "reading",
      renderAs: "prose",
      content: [
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
      publish: true,
      confirm: true,
    });
  });
}

/** Week 12: a paper for every class on its timetabled session, published and unsat. */
export async function examWeek(run: ShowcaseRun): Promise<ExamSlot[]> {
  const { client, admin, decisions, findings } = run;
  const timetable = examTimetable(run);
  const papers: { className: string; assessmentId: string }[] = [];
  await inPool(run.classes, 6, async (cls: ShowcaseClass) => {
    const slot = timetable.find(
      (s) => s.yearGroup === cls.yearGroup && s.subject === cls.subject.name,
    )!;
    const plan = run.weekPlan.get(`${cls.subject.name}|${cls.yearGroup}`)!;
    const taught: LibraryObjective[] = [...plan.byWeek.values()].flat();
    const ss = cls.yearGroup.startsWith("SS");
    const questions = questionsFor(
      cls.subject.name,
      taught,
      plan.all,
      424242 + run.classes.indexOf(cls),
      10,
      ss ? 3 : 2,
    );
    const opens = new Date(`${slot.date}T${slot.start}:00+01:00`);
    const closes = new Date(opens.getTime() + (slot.minutes + 30) * 60_000);
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
      durationMinutes: slot.minutes,
      opensAt: opens.toISOString(),
      closesAt: closes.toISOString(),
      dueDate: slot.date,
      publish: true,
      confirm: true,
    });
    papers.push({
      className: cls.name,
      assessmentId: created?.assessmentId ?? idOf(created, "assessment")!,
    });
  });
  run.record.examPapers = papers;
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
    "published and unsat: they open in week 12, after today",
  );
  decisions.add("Exams", "Timetable", "announced to the whole school");
  return timetable;
}
