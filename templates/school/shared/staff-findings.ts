/**
 * What an admin should look at for a teacher or a class, said plainly.
 *
 * Like a learner's findings, every item carries what it says, how it was
 * counted (`basis`) and the papers, learners or weeks behind it (`evidence`),
 * so nothing is taken on trust. Pure: no database, no clock.
 *
 * Class figures say where to look, not why. A class below the pass mark may
 * be a hard cohort, a hard paper or a small group, so every finding about
 * marks sets the class beside the school's other classes in the same subject
 * and year group, and the suggestions are to ask the teacher and open the
 * class, never a judgement of the person.
 */

export interface StaffFinding {
  kind:
    | "all-below-pass"
    | "below-pass"
    | "behind-others"
    | "ahead-of-others"
    | "learners-below-pass"
    | "nothing-handed-in"
    | "weak-papers"
    | "low-hand-in"
    | "marking-waiting"
    | "marks-unpublished"
    | "notes-behind"
    | "marking-up-to-date"
    | "notes-ready"
    | "all-learners-passing";
  text: string;
  basis: string;
  evidence: string[];
}

export interface StaffFindings {
  concerns: StaffFinding[];
  strengths: StaffFinding[];
  next: string[];
}

/** A paper handed in and not yet marked, or marked and not yet published. */
export interface WaitingPaper {
  title: string;
  count: number;
  oldestDays: number;
}

export interface ClassFact {
  classId: string;
  name: string;
  subject: string;
  yearGroup: string | null;
  learners: number;
  /** The class's average, counted like a learner's subject mark. */
  average: number | null;
  /** The mean of the school's other classes in this subject and year group. */
  othersAverage: number | null;
  othersCount: number;
  /** How many of those are led by someone else. */
  othersWithOtherTeachers: number;
  /** Papers set that count towards marks. */
  papersSet: number;
  awaitingMarks: WaitingPaper[];
  unpublished: WaitingPaper[];
  notes: { expected: number; written: number; ready: number } | null;
}

/** How many days something waits before it is worth raising. */
export const WAITING_DAYS = 7;
/** How far below the school's other classes counts as behind them. */
export const GAP = 10;

const COUNTING =
  "Published marks only. A class's figure is the mean of its learners' subject marks, with work not handed in counted by the school's missed-work setting.";

const plural = (n: number, one: string, many = `${one}s`) =>
  `${n} ${n === 1 ? one : many}`;

const label = (c: ClassFact) => c.name;

function othersLine(c: ClassFact): string {
  if (c.othersAverage == null) return "";
  const where = `${c.yearGroup ?? ""} ${c.subject}`.trim();
  const noun = c.othersCount === 1 ? "class" : "classes";
  const who =
    c.othersWithOtherTeachers === 0
      ? ", all with the same teacher"
      : c.othersWithOtherTeachers === c.othersCount
        ? ", all with other teachers"
        : `, ${c.othersWithOtherTeachers} with other teachers`;
  return `${c.othersCount} other ${where} ${noun} average ${c.othersAverage}%${who}`;
}

/** Findings that hold for one class, whoever's page they appear on. */
function classLevel(
  c: ClassFact,
  passMark: number,
  showName: boolean,
): { concerns: StaffFinding[]; strengths: StaffFinding[] } {
  const concerns: StaffFinding[] = [];
  const strengths: StaffFinding[] = [];
  const who = showName ? `${label(c)}: ` : "";

  if (c.average != null && c.othersAverage != null) {
    const gap = c.average - c.othersAverage;
    if (gap <= -GAP) {
      concerns.push({
        kind: "behind-others",
        text: `${showName ? label(c) + " averages" : "This class averages"} ${c.average}%, ${Math.abs(Math.round(gap))} points below the school's other ${c.yearGroup ?? ""} ${c.subject} classes (${c.othersAverage}%).`.replace(
          /\s+/g,
          " ",
        ),
        basis: COUNTING,
        evidence: [
          `${who}${c.average}% across ${plural(c.learners, "learner")}`,
          othersLine(c),
        ].filter(Boolean),
      });
    } else if (gap >= GAP) {
      strengths.push({
        kind: "ahead-of-others",
        text: `${showName ? label(c) + " averages" : "This class averages"} ${c.average}%, ${Math.round(gap)} points above the school's other ${c.yearGroup ?? ""} ${c.subject} classes (${c.othersAverage}%).`.replace(
          /\s+/g,
          " ",
        ),
        basis: COUNTING,
        evidence: [
          `${who}${c.average}% across ${plural(c.learners, "learner")}`,
          othersLine(c),
        ].filter(Boolean),
      });
    }
  }

  const oldest = (xs: WaitingPaper[]) =>
    xs.reduce((m, x) => Math.max(m, x.oldestDays), 0);
  const waiting = c.awaitingMarks.reduce((n, p) => n + p.count, 0);
  if (waiting > 0 && oldest(c.awaitingMarks) >= WAITING_DAYS) {
    concerns.push({
      kind: "marking-waiting",
      text: `${plural(waiting, "handed-in paper")} ${waiting === 1 ? "is" : "are"} waiting to be marked${showName ? " in " + label(c) : ""}, the oldest for ${plural(oldest(c.awaitingMarks), "day")}.`,
      basis:
        "Work handed in whose marking has not been recorded. Closed questions mark themselves and are not counted.",
      evidence: c.awaitingMarks.map(
        (p) =>
          `${who}${p.title}: ${plural(p.count, "paper")}, oldest ${plural(p.oldestDays, "day")}`,
      ),
    });
  }
  const unpublished = c.unpublished.reduce((n, p) => n + p.count, 0);
  if (unpublished > 0 && oldest(c.unpublished) >= WAITING_DAYS) {
    concerns.push({
      kind: "marks-unpublished",
      text: `${plural(unpublished, "mark")} ${unpublished === 1 ? "is" : "are"} recorded but not published${showName ? " in " + label(c) : ""}, so learners and the report card cannot see ${unpublished === 1 ? "it" : "them"}.`,
      basis:
        "Marks entered and still unpublished for at least a week. Learners, class figures and report cards use published marks only.",
      evidence: c.unpublished.map(
        (p) =>
          `${who}${p.title}: ${plural(p.count, "mark")}, oldest ${plural(p.oldestDays, "day")}`,
      ),
    });
  }
  if (c.notes && c.notes.expected > c.notes.written) {
    concerns.push({
      kind: "notes-behind",
      text: `${showName ? label(c) : "This class"} has ${c.notes.written} of ${c.notes.expected} lesson notes written this term.`,
      basis:
        "Notes the term's curriculum expects, one for each week a unit covers, against notes that exist.",
      evidence: [
        `${who}${c.notes.written} written, ${c.notes.ready} marked ready, ${c.notes.expected} expected`,
      ],
    });
  }
  void passMark;
  return { concerns, strengths };
}

/** One teacher, across the classes they lead. */
export function teacherFindingsFor(input: {
  passMark: number;
  classes: ClassFact[];
}): StaffFindings {
  const { passMark, classes } = input;
  const concerns: StaffFinding[] = [];
  const strengths: StaffFinding[] = [];

  const withFigure = classes.filter((c) => c.average != null);
  const below = withFigure.filter((c) => (c.average as number) < passMark);
  if (withFigure.length >= 2 && below.length === withFigure.length) {
    concerns.push({
      kind: "all-below-pass",
      text: `All ${withFigure.length} classes with marks are below the ${passMark}% pass mark.`,
      basis: COUNTING,
      evidence: withFigure.map(
        (c) =>
          `${label(c)}: ${c.average}%${c.othersAverage != null ? ` (${othersLine(c)})` : ""}`,
      ),
    });
  } else {
    for (const c of below) {
      concerns.push({
        kind: "below-pass",
        text: `${label(c)} averages ${c.average}%, below the ${passMark}% pass mark.`,
        basis: COUNTING,
        evidence: [
          `${c.average}% across ${plural(c.learners, "learner")}`,
          othersLine(c),
        ].filter(Boolean),
      });
    }
  }

  for (const c of classes) {
    const one = classLevel(c, passMark, true);
    concerns.push(...one.concerns);
    strengths.push(...one.strengths);
  }

  // Marking: raised once across the classes, not once per class.
  const marking = concerns.filter((f) => f.kind === "marking-waiting");
  if (marking.length > 1) {
    const merged: StaffFinding = {
      kind: "marking-waiting",
      text: `Papers are waiting to be marked in ${marking.length} classes.`,
      basis: marking[0].basis,
      evidence: marking.flatMap((f) => f.evidence),
    };
    concerns.splice(
      concerns.findIndex((f) => f.kind === "marking-waiting"),
      0,
      merged,
    );
    for (const f of marking) concerns.splice(concerns.indexOf(f), 1);
  }

  const set = classes.reduce((n, c) => n + c.papersSet, 0);
  const anyWaiting = classes.some(
    (c) => c.awaitingMarks.length > 0 || c.unpublished.length > 0,
  );
  if (set > 0 && !anyWaiting) {
    strengths.push({
      kind: "marking-up-to-date",
      text: "Nothing is waiting to be marked or published.",
      basis:
        "Work handed in has marks recorded, and recorded marks are published.",
      evidence: classes
        .filter((c) => c.papersSet > 0)
        .map((c) => `${label(c)}: ${plural(c.papersSet, "paper")} set`),
    });
  }
  const withNotes = classes.filter((c) => c.notes && c.notes.expected > 0);
  if (
    withNotes.length > 0 &&
    withNotes.every(
      (c) =>
        c.notes!.written >= c.notes!.expected &&
        c.notes!.ready >= c.notes!.written,
    )
  ) {
    strengths.push({
      kind: "notes-ready",
      text: "Every lesson note this term is written and marked ready.",
      basis:
        "Notes the term's curriculum expects, against notes that exist and are marked ready.",
      evidence: withNotes.map(
        (c) => `${label(c)}: ${c.notes!.ready} of ${c.notes!.expected} ready`,
      ),
    });
  }

  const next: string[] = [];
  if (
    concerns.some((f) =>
      ["all-below-pass", "below-pass", "behind-others"].includes(f.kind),
    )
  ) {
    next.push(
      "Ask the teacher how the term is going in these classes before drawing conclusions: the figures show where to look, not why.",
      "Open each class to see which papers and which learners sit below the pass mark.",
    );
  }
  if (
    concerns.some(
      (f) => f.kind === "marking-waiting" || f.kind === "marks-unpublished",
    )
  ) {
    next.push("Ask which papers they want marked or published first.");
  }
  if (concerns.some((f) => f.kind === "notes-behind")) {
    next.push("Check the lesson notes page for the weeks still to write.");
  }
  return { concerns, strengths, next };
}

export interface LearnerFact {
  name: string;
  percentage: number | null;
  nothingHandedIn: boolean;
}

export interface PaperFact {
  title: string;
  marked: number;
  average: number | null;
  handedIn: number;
  enrolled: number;
}

/** One class, for the admin looking into it. */
export function classFindingsFor(input: {
  passMark: number;
  cls: ClassFact;
  learners: LearnerFact[];
  papers: PaperFact[];
}): StaffFindings {
  const { passMark, cls, learners, papers } = input;
  const concerns: StaffFinding[] = [];
  const strengths: StaffFinding[] = [];

  if (cls.average != null && cls.average < passMark) {
    concerns.push({
      kind: "below-pass",
      text: `The class averages ${cls.average}%, below the ${passMark}% pass mark.`,
      basis: COUNTING,
      evidence: [
        `${cls.average}% across ${plural(cls.learners, "learner")}`,
        othersLine(cls),
      ].filter(Boolean),
    });
  }
  const one = classLevel(cls, passMark, false);
  concerns.push(...one.concerns);
  strengths.push(...one.strengths);

  const failing = learners
    .filter((l) => l.percentage != null && l.percentage < passMark)
    .sort((a, b) => (a.percentage ?? 0) - (b.percentage ?? 0));
  const counted = learners.filter((l) => l.percentage != null);
  if (failing.length > 0) {
    concerns.push({
      kind: "learners-below-pass",
      text: `${failing.length} of ${counted.length} learners are below the ${passMark}% pass mark.`,
      basis: COUNTING,
      evidence: [
        ...failing.slice(0, 10).map((l) => `${l.name}: ${l.percentage}%`),
        ...(failing.length > 10 ? [`and ${failing.length - 10} more`] : []),
      ],
    });
  } else if (counted.length > 0) {
    strengths.push({
      kind: "all-learners-passing",
      text: `All ${counted.length} learners with marks are at or above the ${passMark}% pass mark.`,
      basis: COUNTING,
      evidence: [],
    });
  }

  const none = learners.filter((l) => l.nothingHandedIn);
  if (none.length > 0) {
    concerns.push({
      kind: "nothing-handed-in",
      text: `${plural(none.length, "learner has", "learners have")} handed in nothing of the work set.`,
      basis:
        "Learners with work set and none of it handed in. Under the school's setting this may count as zero or be left out of the average.",
      evidence: [
        ...none.slice(0, 10).map((l) => l.name),
        ...(none.length > 10 ? [`and ${none.length - 10} more`] : []),
      ],
    });
  }

  const weak = papers
    .filter((p) => p.average != null && p.marked >= 3 && p.average < passMark)
    .sort((a, b) => (a.average ?? 0) - (b.average ?? 0));
  if (weak.length > 0) {
    concerns.push({
      kind: "weak-papers",
      text: `${plural(weak.length, "paper averages", "papers average")} below the pass mark across the class.`,
      basis:
        "A paper's average over the marks published for it, three or more. A hard paper and a hard topic look the same here.",
      evidence: weak
        .slice(0, 8)
        .map((p) => `${p.title}: ${p.average}% over ${p.marked} marked`),
    });
  }
  const thin = papers.filter(
    (p) => p.enrolled > 0 && p.handedIn / p.enrolled < 0.7,
  );
  if (thin.length > 0) {
    concerns.push({
      kind: "low-hand-in",
      text: `${plural(thin.length, "paper was", "papers were")} handed in by fewer than 7 in 10 of the class.`,
      basis: "Learners who handed in, against learners enrolled now.",
      evidence: thin
        .slice(0, 8)
        .map((p) => `${p.title}: ${p.handedIn} of ${p.enrolled} handed in`),
    });
  }

  if (
    cls.papersSet > 0 &&
    cls.awaitingMarks.length === 0 &&
    cls.unpublished.length === 0
  ) {
    strengths.push({
      kind: "marking-up-to-date",
      text: "Nothing is waiting to be marked or published.",
      basis:
        "Work handed in has marks recorded, and recorded marks are published.",
      evidence: [plural(cls.papersSet, "paper") + " set"],
    });
  }

  const next: string[] = [];
  if (
    concerns.some((f) =>
      [
        "below-pass",
        "behind-others",
        "weak-papers",
        "learners-below-pass",
      ].includes(f.kind),
    )
  ) {
    next.push(
      "Ask the teacher what they have seen in the class before drawing conclusions: the figures show where to look, not why.",
      "Open the papers that average lowest and look at the questions learners lost marks on.",
    );
  }
  if (
    concerns.some(
      (f) => f.kind === "nothing-handed-in" || f.kind === "low-hand-in",
    )
  ) {
    next.push(
      "Find out whether the work reached the learners and how long they had.",
    );
  }
  return { concerns, strengths, next };
}
