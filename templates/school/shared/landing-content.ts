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
      say: "Which learners are struggling this term, and why?",
      reply:
        "JSS2A Nigerian History has the sharpest gaps: an average of 40.6%, with 8 learners below 40%.",
      items: [
        {
          title: "One learner handed in 1 of 10",
          detail: "Another handed in 4 of 10; a third averages 17%",
        },
        {
          title: "Other classes with low averages",
          detail: "JSS1A English Studies at 41.0%, JSS3A Mathematics at 41.1%",
        },
        {
          title: "Why? Ask their teachers",
          detail: "The marks show where the gaps are, not the reason",
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
        "I can't give you the answers, but I can help you work through the Maths. Tell me which question you're stuck on, and I'll explain the idea and check your reasoning as you go, so you finish the work yourself.",
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
      say: "Which students are struggling this quarter, and why?",
      reply:
        "Missed work and the same weak assignments pull the lowest averages down.",
      items: [
        {
          title: "Missed hand-ins",
          detail: "Hunter Tran handed in 4 of 9 PE assignments, Aarav Moore 3 of 9 in Spanish III",
        },
        {
          title: "The same weak assignments",
          detail: "Weeks 3 and 4 in English 11 and Spanish III",
        },
        {
          title: "Why? Ask their teachers",
          detail: "The data shows where, not why; homeroom teachers first",
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
        "Tell me which piece you mean and what you're stuck on. I can go over the concept behind a question, check your working if you paste what you've done so far, or plan how to revise the week's topics.",
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
