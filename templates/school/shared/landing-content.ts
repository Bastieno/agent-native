/**
 * What the public landing page says, in each of its editions.
 *
 * The page is one design with two sets of words and examples: a Nigerian
 * secondary school (Crestfield College) and a US high school (Yellow View).
 * Visitors in Nigeria get the first, everyone else the second; nothing
 * Nigerian is shown outside Nigeria. Every example is taken from the two demo
 * schools, so the fragments on the page are what the app really shows.
 */

export type Edition = "ng" | "us";

export interface Stat {
  value: string;
  label: string;
}

export interface AttentionItem {
  title: string;
  detail: string;
}

export interface Lesson {
  time: string;
  name: string;
  room?: string;
  kind?: "break" | "option";
}

export interface EditionContent {
  edition: Edition;
  school: string;
  place: string;
  yearLabel: string;
  person: { singular: string; plural: string };
  mark: string;
  notes: string;
  pilotNote: string;
  standardsLine: string;
  stats: Stat[];
  attention: AttentionItem[];
  ask: {
    who: string;
    insteadOf: string;
    say: string;
    result: string;
    fragment:
      | "timetable"
      | "attention"
      | "lesson"
      | "levels"
      | "marked"
      | "learner";
  }[];
  setupQuote: string;
  setupDone: string[];
  setupLeft: string[];
  dayLine: string;
  week: { arm: string; days: string[]; periods: string[][] };
  lessonNote: { title: string; objectives: string[] };
  levels: { label: string; question: string }[];
  levelsClass: string;
  marked: {
    paper: string;
    question: string;
    answer: string;
    criteria: { text: string; met: boolean; quote?: string }[];
    score: string;
    flag: string;
  };
  learner: {
    name: string;
    group: string;
    average: string;
    classAverage: string;
    missed: string;
    resource: string;
  };
  gradebook: {
    className: string;
    learner: string;
    marks: { name: string; score: string; flagged?: boolean }[];
    total: string;
  };
  reportLine: string;
  report: {
    title: string;
    learner: string;
    group: string;
    rows: { subject: string; score: string; grade: string; extra?: string }[];
    summary: string[];
  };
  phone: { learner: string; group: string; day: string; lessons: Lesson[] };
  idCards: boolean;
  learnerExtra: { title: string; body: string };
  settings: string[];
  curriculumAnswer: string;
  priceUnit: string;
}

const ng: EditionContent = {
  edition: "ng",
  school: "Crestfield College",
  place: "Ibadan",
  yearLabel: "2026-2027 · First Term",
  person: { singular: "learner", plural: "learners" },
  mark: "mark",
  notes: "lesson notes",
  pilotNote: "Free for your first term.",
  standardsLine:
    "Works to the NERDC curriculum, WAEC grading and the three-term year, or your own syllabus.",
  stats: [
    { value: "31", label: "Staff" },
    { value: "180", label: "Learners" },
    { value: "112", label: "Classes" },
    { value: "28", label: "Subjects" },
  ],
  attention: [
    {
      title: "Fatima Nwachukwu, SS2B",
      detail: "Marks below the pass mark, and work missed and counted as zero",
    },
    {
      title: "Lesson notes behind",
      detail: "SS2C Mathematics and the JSS3A classes, from week 8",
    },
    {
      title: "Report cards",
      detail: "First Term report cards are ready to issue",
    },
  ],
  ask: [
    {
      who: "Principal",
      insteadOf: "Building the timetable period by period",
      say: "Generate the timetable and show me the proposal.",
      result:
        "A week for every arm with no clashes, on a grid, waiting for you to accept it.",
      fragment: "timetable",
    },
    {
      who: "Principal",
      insteadOf: "Opening every class to find who is behind",
      say: "What needs my attention this week?",
      result: "A short list, with names and reasons.",
      fragment: "attention",
    },
    {
      who: "Teacher",
      insteadOf: "Writing lesson notes class by class",
      say: "Draft this week's lesson notes for SS1A Physics from the scheme of work.",
      result: "Drafts saved for you to read before anyone else sees them.",
      fragment: "lesson",
    },
    {
      who: "Teacher",
      insteadOf: "Making a worksheet, then two easier versions",
      say: "Make a three-level worksheet on fractions for JSS1A.",
      result: "Three papers. Each learner gets the one that fits their marks.",
      fragment: "levels",
    },
    {
      who: "Teacher",
      insteadOf: "Marking forty scripts by hand",
      say: "Mark the SS1A Physics test.",
      result:
        "Marks that quote the learner's own words as evidence. Marks it is unsure of are flagged for you.",
      fragment: "marked",
    },
    {
      who: "Teacher",
      insteadOf: "Going through a learner's marks one by one",
      say: "How is Fatima doing? Make her a catch-up sheet.",
      result:
        "What she has missed, where she slipped, and a draft resource for her alone.",
      fragment: "learner",
    },
  ],
  setupQuote:
    "We are a secondary school, JSS1 to SS3, three arms, three terms, WAEC grading.",
  setupDone: [
    "Year groups JSS1 to SS3",
    "Three terms of 13 weeks",
    "WAEC grading, pass mark 40",
    "28 subjects",
  ],
  setupLeft: ["Lesson counts for SS3", "Rooms"],
  dayLine:
    "Assembly, eight 40-minute periods, two breaks and a short Friday. Option blocks in the senior years.",
  week: {
    arm: "SS2A",
    days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    periods: [
      ["Mathematics", "English", "Chemistry", "Mathematics", "Biology"],
      ["English", "Further Maths", "Physics", "Civic Ed.", "Mathematics"],
      ["Physics", "Mathematics", "English", "Chemistry", "Yoruba"],
      ["Biology", "Chemistry", "Further Maths", "English", "Physics"],
    ],
  },
  lessonNote: {
    title: "SS1A Physics · Week 4: Motion",
    objectives: [
      "Tell distance from displacement",
      "Work out average speed from distance and time",
      "Read a distance-time graph",
    ],
  },
  levelsClass: "JSS1A Mathematics · Fractions",
  levels: [
    { label: "Level 1", question: "Shade 3/4 of the shape." },
    { label: "Level 2", question: "Work out 2/3 + 1/4." },
    {
      label: "Level 3",
      question:
        "Mr Ade plants 2/5 of his farm with maize and 1/3 with cassava. What fraction is left?",
    },
  ],
  marked: {
    paper: "SS1A Physics · Test",
    question:
      "Why does a standing passenger jerk forward when a bus stops suddenly?",
    answer:
      "Because the body of the passenger keeps moving forward when the bus stops. It is inertia.",
    criteria: [
      {
        text: "Names inertia",
        met: true,
        quote: "It is inertia",
      },
      {
        text: "Body continues in motion",
        met: true,
        quote: "keeps moving forward when the bus stops",
      },
      { text: "Links to Newton's first law", met: false },
    ],
    score: "2 / 3",
    flag: "Unsure about the third mark. Check it.",
  },
  learner: {
    name: "Fatima Nwachukwu",
    group: "SS2B",
    average: "34%",
    classAverage: "58%",
    missed: "3 of 9 pieces of work not handed in",
    resource: "Catch-up sheet: Quadratic equations (draft, for Fatima only)",
  },
  gradebook: {
    className: "SS1A Physics",
    learner: "Oghenekaro Oyebode",
    marks: [
      { name: "Quiz", score: "9/10" },
      { name: "Worksheet", score: "18/20" },
      { name: "Practical", score: "14/20", flagged: true },
      { name: "Test", score: "41/50" },
    ],
    total: "82% · A1",
  },
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
  phone: {
    learner: "Zainab Oyebode",
    group: "SS2A",
    day: "Tuesday",
    lessons: [
      { time: "7:40", name: "Assembly", kind: "break" },
      { time: "8:00", name: "English", room: "SS2A classroom" },
      { time: "8:40", name: "Further Maths", room: "Room 12", kind: "option" },
      { time: "9:20", name: "Mathematics", room: "SS2A classroom" },
      { time: "10:00", name: "Short break", kind: "break" },
      { time: "10:20", name: "Chemistry", room: "Chemistry Lab" },
    ],
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
  school: "Yellow View High School",
  place: "Columbus, Ohio",
  yearLabel: "2026-2027 · Quarter 2",
  person: { singular: "student", plural: "students" },
  mark: "grade",
  notes: "lesson plans",
  pilotNote: "Free for your first quarter.",
  standardsLine:
    "Works to Common Core, NGSS and AP, quarters or semesters, letter grades and GPA, or your own syllabus.",
  stats: [
    { value: "30", label: "Staff" },
    { value: "180", label: "Students" },
    { value: "96", label: "Classes" },
    { value: "58", label: "Courses" },
  ],
  attention: [
    {
      title: "Sakura Bailey, 11B",
      detail: "Grades below passing, and missed work counted as zero",
    },
    {
      title: "Lesson plans behind",
      detail: "12A English 12 and the 10B classes, from week 6",
    },
    {
      title: "Report cards",
      detail: "Quarter 1 report cards are ready to issue",
    },
  ],
  ask: [
    {
      who: "Principal",
      insteadOf: "Building the master schedule period by period",
      say: "Generate the schedule and show me the proposal.",
      result:
        "A week for every homeroom with no conflicts, on a grid, waiting for you to accept it.",
      fragment: "timetable",
    },
    {
      who: "Principal",
      insteadOf: "Opening every class to find who is behind",
      say: "What needs my attention this week?",
      result: "A short list, with names and reasons.",
      fragment: "attention",
    },
    {
      who: "Teacher",
      insteadOf: "Writing lesson plans class by class",
      say: "Draft this week's lesson plans for 9A Biology.",
      result: "Drafts saved for you to read before anyone else sees them.",
      fragment: "lesson",
    },
    {
      who: "Teacher",
      insteadOf: "Making a worksheet, then two easier versions",
      say: "Make a three-level worksheet on linear equations for 9B Algebra I.",
      result: "Three papers. Each student gets the one that fits their grades.",
      fragment: "levels",
    },
    {
      who: "Teacher",
      insteadOf: "Grading forty papers by hand",
      say: "Grade the 9A Biology quiz.",
      result:
        "Grades that quote the student's own words as evidence. Grades it is unsure of are flagged for you.",
      fragment: "marked",
    },
    {
      who: "Teacher",
      insteadOf: "Going through a student's grades one by one",
      say: "How is Sakura doing? Make her a catch-up sheet.",
      result:
        "What she has missed, where she slipped, and a draft resource for her alone.",
      fragment: "learner",
    },
  ],
  setupQuote:
    "We are a high school, Grades 9 to 12, three homerooms, four quarters, letter grades with GPA, Honors and AP.",
  setupDone: [
    "Grades 9 to 12",
    "Four quarters of 10 weeks",
    "A to F, GPA on 4.0",
    "Honors +0.5, AP +1.0",
  ],
  setupLeft: ["Periods per week for Grade 12", "Rooms"],
  dayLine:
    "Homeroom, seven 48-minute periods and lunch. An elective block where each student picks a course.",
  week: {
    arm: "11A",
    days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    periods: [
      ["English 11", "English 11", "English 11", "English 11", "English 11"],
      ["Algebra II", "Chemistry", "Algebra II", "Chemistry", "Algebra II"],
      [
        "U.S. History",
        "Algebra II",
        "Chemistry",
        "U.S. History",
        "Spanish III",
      ],
      ["AP Biology", "AP Biology", "AP Biology", "AP Biology", "AP Biology"],
    ],
  },
  lessonNote: {
    title: "9A Biology · Week 4: Cell structure",
    objectives: [
      "Name the parts of plant and animal cells",
      "Explain what the cell membrane controls",
      "Compare prokaryotic and eukaryotic cells",
    ],
  },
  levelsClass: "9B Algebra I · Linear equations",
  levels: [
    { label: "Level 1", question: "Solve x + 7 = 15." },
    { label: "Level 2", question: "Solve 3x - 5 = 16." },
    {
      label: "Level 3",
      question:
        "A phone plan costs $25 a month plus $0.10 a text. The bill was $31.40. How many texts?",
    },
  ],
  marked: {
    paper: "9A Biology · Quiz",
    question: "Why does a cell need a cell membrane?",
    answer:
      "It controls what goes in and out of the cell, like a gate. Without it the cell would lose what it needs.",
    criteria: [
      {
        text: "Controls what enters and leaves",
        met: true,
        quote: "controls what goes in and out of the cell",
      },
      {
        text: "Keeps the cell's contents in",
        met: true,
        quote: "the cell would lose what it needs",
      },
      { text: "Selectively permeable", met: false },
    ],
    score: "2 / 3",
    flag: "Unsure about the third point. Check it.",
  },
  learner: {
    name: "Sakura Bailey",
    group: "11B",
    average: "52%",
    classAverage: "74%",
    missed: "3 of 9 assignments not turned in",
    resource: "Catch-up sheet: Quadratic functions (draft, for Sakura only)",
  },
  gradebook: {
    className: "10A Chemistry",
    learner: "Xavier Mitchell",
    marks: [
      { name: "Quiz", score: "10/10" },
      { name: "Lab", score: "19/20", flagged: true },
      { name: "Worksheet", score: "18/20" },
      { name: "Test", score: "46/50" },
    ],
    total: "93% · A",
  },
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
  phone: {
    learner: "Ava Hoffman",
    group: "11A",
    day: "Tuesday",
    lessons: [
      { time: "7:30", name: "Homeroom", kind: "break" },
      { time: "7:52", name: "English 11", room: "Room 204" },
      { time: "8:44", name: "Chemistry", room: "Chemistry Lab" },
      { time: "9:36", name: "Algebra II", room: "Room 118" },
      {
        time: "10:28",
        name: "AP Biology",
        room: "Biology Lab",
        kind: "option",
      },
      { time: "11:16", name: "Lunch", kind: "break" },
    ],
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
