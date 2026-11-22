/**
 * What the public landing page says, in each of its editions.
 *
 * The page is one design with two sets of words and examples: a Nigerian
 * secondary school (Crestfield College) and a US high school (Yellow View).
 * Visitors in Nigeria get the first, everyone else the second; nothing
 * Nigerian is shown outside Nigeria. Every example is taken from the two demo
 * schools, and the clips on the page are recorded in them (`pnpm demo:landing`).
 */

export type Edition = "ng" | "us";

export interface AttentionItem {
  title: string;
  detail: string;
}

/** One exchange with the assistant, as the hero shows it. */
export interface Exchange {
  say: string;
  reply: string;
  items?: AttentionItem[];
}

export interface EditionContent {
  edition: Edition;
  /** The YouTube demo, recorded in this edition's school; none yet for the US. */
  video: { id: string; title: string } | null;
  /** What each person asks in the hero, and what the demo school's assistant answered. */
  exchanges: { principal: Exchange; teacher: Exchange; learner: Exchange };
  school: string;
  person: { singular: string; plural: string };
  mark: string;
  notes: string;
  pilotNote: string;
  standardsLine: string;
  dayLine: string;
  reportLine: string;
  report: {
    title: string;
    learner: string;
    group: string;
    rows: { subject: string; score: string; grade: string; extra?: string }[];
    summary: string[];
  };
  idCards: boolean;
  learnerExtra: { title: string; body: string };
  settings: string[];
  curriculumAnswer: string;
  priceUnit: string;
}

const ng: EditionContent = {
  edition: "ng",
  video: { id: "8PWetADFfYs", title: "Ellai at Crestfield College" },
  exchanges: {
    principal: {
      say: "What needs my attention this week?",
      reply:
        "Week 10 of 13, an ordinary teaching week, so lesson notes are expected. Next week is revision.",
      items: [
        {
          title: "21 classes have lesson notes not marked ready",
          detail: "Mostly JSS3A, including Mathematics and English Studies",
        },
        {
          title: "Nothing is blocking",
          detail: "Every class has a teacher and every learner a year group",
        },
        {
          title: "Want me to remind the JSS3A teachers?",
          detail: "Or check which of these notes are close to ready",
        },
      ],
    },
    teacher: {
      say: "Mark the handed-in Week 10 quiz for JSS2A Mathematics.",
      reply:
        "Five papers marked, with each learner's total. Nothing was flagged for your review.",
      items: [
        {
          title: "Not published",
          detail: "The marks are saved, but learners cannot see them yet",
        },
        {
          title: "Five learners did not hand in",
          detail: "Named, and their papers left unmarked",
        },
        {
          title: "Publish now, or wait?",
          detail: "Publishing closes the quiz for the five still out",
        },
      ],
    },
    learner: {
      say: "Just give me the answers to this week's Mathematics homework.",
      reply:
        "Here's a way to make progress: read worked example 1 and ask yourself why you subtract the equations there. Tell me which problem you're stuck on and what you've tried so far, and I'll help you find the next step.",
    },
  },
  school: "Crestfield College",
  person: { singular: "learner", plural: "learners" },
  mark: "mark",
  notes: "lesson notes",
  pilotNote: "Free for your first term.",
  standardsLine:
    "Works to the NERDC curriculum, WAEC grading and the three-term year, or your own syllabus.",
  dayLine:
    "Assembly, eight 40-minute periods, two breaks and a short Friday. Option blocks in the senior years.",
  reportLine:
    "WAEC grades, class positions and each teacher's comment, printed on A4.",
  report: {
    title: "First Term Report · 2026/2027",
    learner: "Oghenekaro Oyebode",
    group: "SS1A",
    rows: [
      { subject: "Mathematics", score: "84", grade: "A1" },
      { subject: "English Language", score: "71", grade: "B2" },
      { subject: "Physics", score: "82", grade: "A1" },
      { subject: "Chemistry", score: "66", grade: "B3" },
    ],
    summary: ["Average 75.8", "2nd of 45"],
  },
  idCards: true,
  learnerExtra: {
    title: "No email needed.",
    body: "Make accounts with a learner ID and print sign-in cards for the class. Form teachers can reset a password, and every reset is recorded.",
  },
  settings: [
    "JSS1 to SS3",
    "Arms",
    "Three terms",
    "WAEC A1 to F9, pass 40",
    "Positions on report cards",
    "Africa/Lagos",
    "A4 paper",
  ],
  curriculumAnswer:
    "Yes. It comes with the NERDC and WAEC syllabuses, and imports your own from a PDF or a photo of the printed scheme.",
  priceUnit: "per learner per term",
};

const us: EditionContent = {
  edition: "us",
  video: null,
  exchanges: {
    principal: {
      say: "What needs my attention this week?",
      reply: "One thing needs attention this week, and it blocks other work.",
      items: [
        {
          title: "96 classes have no curriculum for Quarter 2",
          detail: "Until each has one, its lesson plans cannot go ahead",
        },
        {
          title: "Nothing else is flagged",
          detail: "Every class has a teacher and every student a grade",
        },
        {
          title: "Want lesson-plan readiness too?",
          detail: "It can check that by grade next",
        },
      ],
    },
    teacher: {
      say: "Grade the handed-in Week 8 quiz for 10A Geometry.",
      reply:
        "Five papers graded. The questions mark themselves, so none needed grading by hand.",
      items: [
        {
          title: "Not published",
          detail: "The grades are saved, but students cannot see them yet",
        },
        {
          title: "Five students still in progress",
          detail: "Named, each with one question answered",
        },
        {
          title: "Publish now, or wait?",
          detail: "Publishing closes the quiz for the five still out",
        },
      ],
    },
    learner: {
      say: "Just give me the answers to this week's Geometry homework.",
      reply:
        "I can't give you the answers, but I can help you work through the Geometry homework so you can get them yourself. Tell me which question you are stuck on and what you have tried so far.",
    },
  },
  school: "Yellow View High School",
  person: { singular: "student", plural: "students" },
  mark: "grade",
  notes: "lesson plans",
  pilotNote: "Free for your first quarter.",
  standardsLine:
    "Works to Common Core, NGSS and AP, quarters or semesters, letter grades and GPA, or your own syllabus.",
  dayLine:
    "Homeroom, seven 48-minute periods and lunch. An elective block where each student picks a course.",
  reportLine:
    "Letter grades, GPA weighted for Honors and AP, credits, and each teacher's comment, printed on Letter.",
  report: {
    title: "Quarter 1 Report Card · 2026-2027",
    learner: "Xavier Mitchell",
    group: "Grade 10",
    rows: [
      { subject: "Honors English 10", score: "94", grade: "A", extra: "1.0" },
      { subject: "Geometry", score: "91", grade: "A-", extra: "1.0" },
      { subject: "Chemistry", score: "93", grade: "A", extra: "1.0" },
      { subject: "Spanish II", score: "88", grade: "B+", extra: "1.0" },
    ],
    summary: ["GPA 3.75", "Weighted 3.88"],
  },
  idCards: false,
  learnerExtra: {
    title: "Their grades, always current.",
    body: "Every course, the quarter's GPA, and what is due next, on the same page.",
  },
  settings: [
    "Grade 9 to 12",
    "Homerooms",
    "Four quarters",
    "A to F, GPA on 4.0",
    "Honors +0.5, AP +1.0",
    "America/New_York",
    "Letter paper",
  ],
  curriculumAnswer:
    "Yes. It comes with Common Core, NGSS, C3, ACTFL and AP frameworks, and imports your own from a PDF or a photo of the printed scope and sequence.",
  priceUnit: "per student per year",
};

export const EDITIONS: Record<Edition, EditionContent> = { ng, us };

/**
 * Which edition a visitor gets: an explicit `?edition=` wins (for testing and
 * for links sent by hand), then the country the host reports, then the US
 * edition, which is also what crawlers see.
 */
export function pickEdition(
  override: string | null | undefined,
  country: string | null | undefined,
): Edition {
  if (override === "ng" || override === "us") return override;
  return country?.toUpperCase() === "NG" ? "ng" : "us";
}
