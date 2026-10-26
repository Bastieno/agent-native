/**
 * The showcase school: a whole Nigerian secondary school, set up the way the
 * owner confirmed in docs/showcase-school-spec.md.
 *
 * Everything the run chooses lives here, as data, so the decisions file can be
 * written straight from it and a different school is a different file. The
 * run itself (test/sim/showcase/) only drives the app's actions with it.
 */

import type {
  ArmPlan,
  Showcase,
  StaffPlan,
  SubjectPlan,
} from "./showcase-types.js";
import { FIRST, LAST } from "./names-ng.js";

export type { Showcase, StaffPlan, SubjectPlan };

type Stream = "Science" | "Commercial" | "Art";

const JSS = ["JSS1", "JSS2", "JSS3"];
const SS = ["SS1", "SS2", "SS3"];
const ALL = [...JSS, ...SS];

/** Every arm, by year group: one in JSS, three streamed arms in SS. */
export const ARMS: ArmPlan[] = [
  ...JSS.map((y) => ({ yearGroup: y, name: `${y}A` })),
  ...SS.flatMap((y) => [
    { yearGroup: y, name: `${y}A`, stream: "Science" as const },
    { yearGroup: y, name: `${y}B`, stream: "Commercial" as const },
    { yearGroup: y, name: `${y}C`, stream: "Art" as const },
  ]),
];

/** Year groups that keep the Further Mathematics / Geography option block. */
export const OPTION_YEARS = ["SS1", "SS2"];

const nerdc = (subject: string) => ({ framework: "NERDC" as const, subject });
const waec = (subject: string) => ({ framework: "WAEC" as const, subject });

export const SUBJECTS: SubjectPlan[] = [
  // ── JSS: the 2025 NERDC list, as the app's library has it ────────────────
  {
    name: "English Studies",
    code: "ENS",
    department: "Junior School",
    library: nerdc("English Studies"),
    yearGroups: JSS,
    periodsPerWeek: 5,
    doublesPerWeek: 0,
  },
  {
    name: "Mathematics",
    code: "MTH",
    department: "Sciences",
    library: nerdc("Mathematics"),
    yearGroups: ALL,
    periodsPerWeek: 5,
    doublesPerWeek: 0,
    handwritten: true,
    examStyle: "WAEC",
  },
  {
    name: "Intermediate Science",
    code: "ISC",
    department: "Junior School",
    library: nerdc("Intermediate Science"),
    yearGroups: JSS,
    periodsPerWeek: 4,
    doublesPerWeek: 1,
    handwritten: true,
  },
  {
    name: "Digital Technologies",
    code: "DGT",
    department: "Junior School",
    library: nerdc("Digital Technologies"),
    yearGroups: JSS,
    periodsPerWeek: 3,
    doublesPerWeek: 0,
    room: "ICT Room",
  },
  {
    name: "Social and Citizenship Studies",
    code: "SCS",
    department: "Junior School",
    library: nerdc("Social and Citizenship Studies"),
    yearGroups: JSS,
    periodsPerWeek: 3,
    doublesPerWeek: 0,
  },
  {
    name: "Nigerian History",
    code: "NHS",
    department: "Junior School",
    library: nerdc("Nigerian History"),
    yearGroups: JSS,
    periodsPerWeek: 2,
    doublesPerWeek: 0,
  },
  {
    name: "Christian Religious Studies",
    code: "CRS",
    department: "Arts",
    library: nerdc("Christian Religious Studies"),
    yearGroups: ALL,
    streams: ["Art"],
    periodsPerWeek: 2,
    doublesPerWeek: 0,
  },
  {
    name: "Business Studies",
    code: "BUS",
    department: "Junior School",
    library: nerdc("Business Studies"),
    yearGroups: JSS,
    periodsPerWeek: 3,
    doublesPerWeek: 0,
  },
  {
    name: "Cultural and Creative Arts",
    code: "CCA",
    department: "Junior School",
    library: nerdc("Cultural and Creative Arts"),
    yearGroups: JSS,
    periodsPerWeek: 3,
    doublesPerWeek: 1,
  },
  {
    name: "Physical and Health Education",
    code: "PHE",
    department: "Junior School",
    library: nerdc("Physical and Health Education"),
    yearGroups: JSS,
    periodsPerWeek: 2,
    doublesPerWeek: 0,
  },
  {
    name: "Yoruba",
    code: "YOR",
    department: "Junior School",
    library: nerdc("Nigerian Language – Yoruba"),
    yearGroups: JSS,
    periodsPerWeek: 3,
    doublesPerWeek: 0,
  },
  {
    name: "Livestock Farming",
    code: "LVF",
    department: "Junior School",
    library: nerdc("Livestock Farming"),
    yearGroups: JSS,
    periodsPerWeek: 2,
    doublesPerWeek: 0,
  },

  // ── SS, every stream ─────────────────────────────────────────────────────
  {
    name: "English Language",
    code: "ENG",
    department: "Arts",
    library: waec("English Language"),
    yearGroups: SS,
    periodsPerWeek: 5,
    doublesPerWeek: 0,
    examStyle: "WAEC",
  },
  {
    name: "Civic Education",
    code: "CVE",
    department: "Arts",
    library: waec("Civic Education"),
    yearGroups: SS,
    periodsPerWeek: 2,
    doublesPerWeek: 0,
  },
  {
    name: "Data Processing",
    code: "DPR",
    department: "Commercial",
    library: waec("Data Processing"),
    yearGroups: SS,
    periodsPerWeek: 3,
    doublesPerWeek: 0,
  },

  // ── SS Science ───────────────────────────────────────────────────────────
  {
    name: "Physics",
    code: "PHY",
    department: "Sciences",
    library: waec("Physics"),
    yearGroups: SS,
    streams: ["Science"],
    periodsPerWeek: 4,
    doublesPerWeek: 1,
    lab: "Physics Lab",
    handwritten: true,
    examStyle: "WAEC",
  },
  {
    name: "Chemistry",
    code: "CHM",
    department: "Sciences",
    library: waec("Chemistry"),
    yearGroups: SS,
    streams: ["Science"],
    periodsPerWeek: 4,
    doublesPerWeek: 1,
    lab: "Chemistry Lab",
    handwritten: true,
    examStyle: "WAEC",
  },
  {
    name: "Biology",
    code: "BIO",
    department: "Sciences",
    library: waec("Biology"),
    yearGroups: SS,
    streams: ["Science"],
    periodsPerWeek: 4,
    doublesPerWeek: 1,
    lab: "Biology Lab",
    examStyle: "WAEC",
  },
  {
    name: "Agricultural Science",
    code: "AGR",
    department: "Sciences",
    library: waec("Agricultural Science"),
    yearGroups: SS,
    streams: ["Science"],
    periodsPerWeek: 3,
    doublesPerWeek: 0,
  },

  // ── SS Commercial ────────────────────────────────────────────────────────
  {
    name: "Economics",
    code: "ECO",
    department: "Commercial",
    library: waec("Economics"),
    yearGroups: SS,
    streams: ["Commercial"],
    periodsPerWeek: 4,
    doublesPerWeek: 0,
  },
  {
    name: "Commerce",
    code: "COM",
    department: "Commercial",
    library: waec("Commerce"),
    yearGroups: SS,
    streams: ["Commercial"],
    periodsPerWeek: 4,
    doublesPerWeek: 0,
  },
  {
    name: "Financial Accounting",
    code: "ACC",
    department: "Commercial",
    library: waec("Financial Accounting"),
    yearGroups: SS,
    streams: ["Commercial"],
    periodsPerWeek: 4,
    doublesPerWeek: 0,
    handwritten: true,
  },
  {
    name: "Marketing",
    code: "MKT",
    department: "Commercial",
    library: waec("Marketing"),
    yearGroups: SS,
    streams: ["Commercial"],
    periodsPerWeek: 3,
    doublesPerWeek: 0,
  },

  // ── SS Art (Christian Religious Studies is above, shared with JSS) ───────
  {
    name: "Literature in English",
    code: "LIT",
    department: "Arts",
    library: waec("Literature in English"),
    yearGroups: SS,
    streams: ["Art"],
    periodsPerWeek: 4,
    doublesPerWeek: 0,
  },
  {
    name: "Government",
    code: "GOV",
    department: "Arts",
    library: waec("Government"),
    yearGroups: SS,
    streams: ["Art"],
    periodsPerWeek: 4,
    doublesPerWeek: 0,
  },
  {
    name: "History",
    code: "HIS",
    department: "Arts",
    library: waec("History"),
    yearGroups: SS,
    streams: ["Art"],
    periodsPerWeek: 3,
    doublesPerWeek: 0,
  },

  // ── The SS1 and SS2 option block ─────────────────────────────────────────
  {
    name: "Further Mathematics",
    code: "FMT",
    department: "Sciences",
    library: waec("Further Mathematics"),
    yearGroups: OPTION_YEARS,
    option: true,
    periodsPerWeek: 4,
    doublesPerWeek: 0,
    handwritten: true,
  },
  {
    name: "Geography",
    code: "GEO",
    department: "Arts",
    library: waec("Geography"),
    yearGroups: OPTION_YEARS,
    option: true,
    periodsPerWeek: 4,
    doublesPerWeek: 0,
  },
];

/**
 * Lesson counts differ by phase for two subjects that run JSS to SS:
 * Christian Religious Studies is 2 a week in JSS and 4 for the Art stream,
 * and the WAEC library is the one used in SS.
 */
export const SS_OVERRIDES: Record<
  string,
  Partial<Pick<SubjectPlan, "periodsPerWeek" | "doublesPerWeek" | "library">>
> = {
  Mathematics: { library: waec("General Mathematics") },
  "Christian Religious Studies": {
    periodsPerWeek: 4,
    library: waec("Christian Religious Studies"),
  },
};

const arms = (yearGroups: string[], letters = ["A", "B", "C"]) =>
  yearGroups.flatMap((y) =>
    JSS.includes(y) ? [`${y}A`] : letters.map((l) => `${y}${l}`),
  );

/**
 * The staff. Loads are what a Nigerian secondary school would give: a subject
 * across several arms, 12–24 periods a week, with coordinators still teaching.
 */
export const STAFF: StaffPlan[] = [
  // Junior school
  {
    key: "jss-english",
    name: "Folasade Adebayo",
    role: "subject_coordinator",
    heads: "Junior School",
    teaches: [{ subject: "English Studies", arms: arms(JSS) }],
    formOf: "JSS1A",
  },
  {
    key: "jss-maths",
    name: "Emmanuel Okafor",
    role: "teacher",
    teaches: [{ subject: "Mathematics", arms: arms(JSS) }],
    formOf: "JSS2A",
  },
  {
    key: "jss-science",
    name: "Ngozi Eze",
    role: "teacher",
    teaches: [{ subject: "Intermediate Science", arms: arms(JSS) }],
    formOf: "JSS3A",
  },
  {
    key: "computing",
    name: "Tunde Bakare",
    role: "teacher",
    teaches: [
      { subject: "Digital Technologies", arms: arms(JSS) },
      { subject: "Data Processing", arms: arms(["SS1"]) },
    ],
  },
  {
    key: "citizenship",
    name: "Aisha Bello",
    role: "teacher",
    teaches: [
      { subject: "Social and Citizenship Studies", arms: arms(JSS) },
      { subject: "Nigerian History", arms: arms(JSS) },
    ],
  },
  {
    key: "crs",
    name: "Grace Olawale",
    role: "teacher",
    teaches: [
      {
        subject: "Christian Religious Studies",
        arms: [...arms(JSS), "SS1C", "SS2C", "SS3C"],
      },
    ],
  },
  {
    key: "cca",
    name: "Kayode Ogunleye",
    role: "teacher",
    teaches: [{ subject: "Cultural and Creative Arts", arms: arms(JSS) }],
  },
  {
    key: "phe",
    name: "Samuel Adeniran",
    role: "teacher",
    teaches: [{ subject: "Physical and Health Education", arms: arms(JSS) }],
  },
  {
    key: "yoruba",
    name: "Olufunke Ajayi",
    role: "teacher",
    teaches: [{ subject: "Yoruba", arms: arms(JSS) }],
  },
  {
    key: "agric",
    name: "Musa Ibrahim",
    role: "teacher",
    teaches: [
      { subject: "Livestock Farming", arms: arms(JSS) },
      { subject: "Agricultural Science", arms: ["SS1A", "SS2A", "SS3A"] },
    ],
  },
  {
    key: "learning-support",
    name: "Bukola Fashola",
    role: "teacher",
    teaches: [],
    supports: [
      { subject: "Mathematics", arms: arms(JSS) },
      { subject: "English Studies", arms: ["JSS1A"] },
    ],
  },

  // Senior school: English and Mathematics by year group
  {
    key: "ss1-english",
    name: "Chidinma Nwosu",
    role: "teacher",
    teaches: [{ subject: "English Language", arms: arms(["SS1"]) }],
    formOf: "SS1C",
  },
  {
    key: "ss2-english",
    name: "Babatunde Olatunji",
    role: "teacher",
    teaches: [{ subject: "English Language", arms: arms(["SS2"]) }],
    formOf: "SS2C",
  },
  {
    key: "ss3-english",
    name: "Patience Udoh",
    role: "teacher",
    teaches: [{ subject: "English Language", arms: arms(["SS3"]) }],
    formOf: "SS3C",
  },
  {
    key: "ss1-maths",
    name: "Ibrahim Danjuma",
    role: "teacher",
    teaches: [{ subject: "Mathematics", arms: arms(["SS1"]) }],
    formOf: "SS1A",
  },
  {
    key: "ss2-maths",
    name: "Oluwaseun Akinola",
    role: "teacher",
    teaches: [{ subject: "Mathematics", arms: arms(["SS2"]) }],
    formOf: "SS2A",
  },
  {
    key: "ss3-maths",
    name: "Chukwuemeka Obi",
    role: "teacher",
    teaches: [{ subject: "Mathematics", arms: arms(["SS3"]) }],
    formOf: "SS3A",
  },
  {
    key: "further-maths",
    name: "Adewale Ojo",
    role: "teacher",
    teaches: [
      { subject: "Further Mathematics", arms: ["option:SS1", "option:SS2"] },
    ],
  },
  {
    key: "civic",
    name: "Halima Abdullahi",
    role: "teacher",
    teaches: [{ subject: "Civic Education", arms: arms(SS) }],
  },
  {
    key: "data-processing",
    name: "Victor Eze",
    role: "teacher",
    teaches: [{ subject: "Data Processing", arms: arms(["SS2", "SS3"]) }],
  },

  // Sciences
  {
    key: "physics",
    name: "Adebola Ogundipe",
    role: "subject_coordinator",
    heads: "Sciences",
    teaches: [{ subject: "Physics", arms: ["SS1A", "SS2A", "SS3A"] }],
  },
  {
    key: "chemistry",
    name: "Chiamaka Okonkwo",
    role: "teacher",
    teaches: [{ subject: "Chemistry", arms: ["SS1A", "SS2A", "SS3A"] }],
  },
  {
    key: "biology",
    name: "Yetunde Alabi",
    role: "teacher",
    teaches: [{ subject: "Biology", arms: ["SS1A", "SS2A", "SS3A"] }],
  },
  {
    key: "lab-support",
    name: "Segun Afolabi",
    role: "teacher",
    teaches: [],
    supports: [
      { subject: "Physics", arms: ["SS1A", "SS2A", "SS3A"] },
      { subject: "Chemistry", arms: ["SS1A", "SS2A"] },
    ],
  },

  // Commercial
  {
    key: "economics",
    name: "Kelechi Umeh",
    role: "subject_coordinator",
    heads: "Commercial",
    teaches: [{ subject: "Economics", arms: ["SS1B", "SS2B", "SS3B"] }],
    formOf: "SS1B",
  },
  {
    key: "commerce",
    name: "Funmilayo Adeyemi",
    role: "teacher",
    teaches: [
      { subject: "Commerce", arms: ["SS1B", "SS2B", "SS3B"] },
      { subject: "Business Studies", arms: arms(JSS) },
    ],
    formOf: "SS2B",
  },
  {
    key: "accounting",
    name: "Abdulrahman Sani",
    role: "teacher",
    teaches: [
      { subject: "Financial Accounting", arms: ["SS1B", "SS2B", "SS3B"] },
      { subject: "Marketing", arms: ["SS1B", "SS2B", "SS3B"] },
    ],
    formOf: "SS3B",
  },

  // Arts
  {
    key: "literature",
    name: "Ifeoma Chukwu",
    role: "subject_coordinator",
    heads: "Arts",
    teaches: [
      { subject: "Literature in English", arms: ["SS1C", "SS2C", "SS3C"] },
    ],
  },
  {
    key: "government",
    name: "Olumide Balogun",
    role: "teacher",
    teaches: [
      { subject: "Government", arms: ["SS1C", "SS2C", "SS3C"] },
      { subject: "History", arms: ["SS1C", "SS2C", "SS3C"] },
    ],
  },
  {
    key: "geography",
    name: "Zainab Mohammed",
    role: "teacher",
    teaches: [{ subject: "Geography", arms: ["option:SS1", "option:SS2"] }],
  },
];

export const showcase: Showcase = {
  key: "showcase",
  port: 8131,
  devCommand: "pnpm dev:showcase",
  resetCommand: "pnpm showcase:reset",
  schoolName: "Crestfield College",
  city: "Ibadan",
  schoolType: "secondary",
  country: "Nigeria",
  locale: "en-NG",
  timezone: "Africa/Lagos",
  utcOffset: "+01:00",
  paperSize: "a4",
  principal: "Olusegun Adekunle",
  emailDomain: "crestfield.test",
  names: { first: FIRST, last: LAST },
  seed: 20260914,

  yearGroups: ALL,
  gradePrefix: "Class",
  termStructure: "terms",
  customLabels: {
    student: "student",
    teacher: "teacher",
    arm: "arm",
    stream: "stream",
    double: "double",
  },
  assessmentTerminology: "class work",
  assessmentTerminologyPlural: "class work",

  passMark: 40,
  rankLearners: true,
  missedWorkPolicy: "zero",
  gradingScale: {
    type: "letter",
    levels: [
      { grade: "A1", min: 75, max: 100, label: "Excellent" },
      { grade: "B2", min: 70, max: 74, label: "Very Good" },
      { grade: "B3", min: 65, max: 69, label: "Good" },
      { grade: "C4", min: 60, max: 64, label: "Credit" },
      { grade: "C5", min: 55, max: 59, label: "Credit" },
      { grade: "C6", min: 50, max: 54, label: "Credit" },
      { grade: "D7", min: 45, max: 49, label: "Pass" },
      { grade: "E8", min: 40, max: 44, label: "Pass" },
      { grade: "F9", min: 0, max: 39, label: "Fail" },
    ],
  },

  academicYear: { name: "2026/2027", start: "2026-09-14", end: "2027-07-23" },
  terms: [
    { name: "First Term", start: "2026-09-14", end: "2026-12-11" },
    { name: "Second Term", start: "2027-01-11", end: "2027-04-09" },
    { name: "Third Term", start: "2027-04-26", end: "2027-07-23" },
  ],
  /** Weeks of the First Term kept for something other than new material. */
  reservedWeeks: [
    { week: 7, label: "Mid-term break" },
    { week: 11, label: "Revision" },
  ],
  /** Counted from the end: week 12 examinations, week 13 results and closing. */
  examWeeksPerTerm: 2,
  teachingWeeks: [1, 2, 3, 4, 5, 6, 8, 9, 10],
  revisionWeek: 11,
  examWeek: 12,
  sampleDate: "2026-10-12",

  /** Monday to Thursday: Assembly, eight 40-minute periods, two breaks. */
  bells: {
    full: [
      { start: "07:45", end: "08:00", kind: "break", label: "Assembly" },
      { start: "08:00", end: "08:40", kind: "lesson" },
      { start: "08:40", end: "09:20", kind: "lesson" },
      { start: "09:20", end: "10:00", kind: "lesson" },
      { start: "10:00", end: "10:40", kind: "lesson" },
      { start: "10:40", end: "11:15", kind: "break", label: "Short Break" },
      { start: "11:15", end: "11:55", kind: "lesson" },
      { start: "11:55", end: "12:35", kind: "lesson" },
      { start: "12:35", end: "13:15", kind: "break", label: "Long Break" },
      { start: "13:15", end: "13:55", kind: "lesson" },
      { start: "13:55", end: "14:35", kind: "lesson" },
    ],
    /** Friday ends early: Jumat / Fellowship and Clubs / Societies after the sixth lesson. */
    friday: [
      { start: "07:45", end: "08:00", kind: "break", label: "Assembly" },
      { start: "08:00", end: "08:40", kind: "lesson" },
      { start: "08:40", end: "09:20", kind: "lesson" },
      { start: "09:20", end: "10:00", kind: "lesson" },
      { start: "10:00", end: "10:40", kind: "lesson" },
      { start: "10:40", end: "11:15", kind: "break", label: "Short Break" },
      { start: "11:15", end: "11:55", kind: "lesson" },
      { start: "11:55", end: "12:35", kind: "lesson" },
      {
        start: "12:35",
        end: "13:20",
        kind: "break",
        label: "Jumat / Fellowship",
      },
      {
        start: "13:20",
        end: "14:00",
        kind: "break",
        label: "Clubs / Societies",
      },
    ],
  },

  specialRooms: [
    "Physics Lab",
    "Chemistry Lab",
    "Biology Lab",
    "ICT Room",
    "Library",
    "Home Economics Room",
  ],

  arms: ARMS,
  studentsPerArm: 15,
  subjects: SUBJECTS,
  overrideFor: (subject: SubjectPlan, yearGroup: string) =>
    yearGroup.startsWith("SS") ? SS_OVERRIDES[subject.name] : undefined,
  librarySplit: (yearGroup: string) => ({
    index: Number(yearGroup.replace(/\D/g, "")) - 1,
    parts: 3,
  }),
  seniorLabel: "SS",
  isSenior: (yearGroup: string) => yearGroup.startsWith("SS"),
  staff: STAFF,
  optionRoom: (subject: SubjectPlan, yearGroup: string) =>
    subject.name === "Geography" ? "Library" : `${yearGroup}A classroom`,
  // The stronger mathematicians of the Science and Commercial arms choose
  // Further Mathematics, as they would; every Art learner takes Geography.
  chooseOptions: (cohort, options) => {
    const eligible = cohort
      .map((l, i) => ({ l, i }))
      .filter(({ l }) => l.stream !== "Art")
      .sort((a, b) => b.l.ability - a.l.ability);
    const takers = new Set(
      eligible.slice(0, Math.round(eligible.length * 0.4)).map((e) => e.i),
    );
    return cohort.map((_, i) => (takers.has(i) ? options[0] : options[1]));
  },
  optionDecision: (yearGroups: string[]) =>
    `Further Mathematics beside Geography in ${yearGroups.join(" and ")}; Science and Commercial learners choose one (the stronger mathematicians Further Mathematics), every Art learner takes Geography; both classes draw on all three arms so they are timetabled together`,

  /**
   * The marked piece each week, in rotation, so every format turns up in
   * every class across the term. A science's practical replaces the
   * worksheet slot; a card deck goes out every other week as well.
   */
  activityRotation: [
    "worksheet",
    "quiz",
    "problem set",
    "worksheet",
    "practical",
  ] as const,
  /** Weeks in which differentiation runs in the chosen classes. */
  differentiationWeeks: [3, 5, 8, 10],
  /** One class per year group differentiates through the term. */
  differentiationClasses: [
    { arm: "JSS1A", subject: "Mathematics" },
    { arm: "JSS2A", subject: "English Studies" },
    { arm: "JSS3A", subject: "Intermediate Science" },
    { arm: "SS1A", subject: "Physics" },
    { arm: "SS2B", subject: "Economics" },
    { arm: "SS3C", subject: "Literature in English" },
  ],
  /** Weeks after which struggling learners are listed. */
  strugglingWeeks: [2, 4, 6, 9, 10],
  /** Lesson notes left in draft from this week on, in these arms' classes. */
  behindOnNotes: { arms: ["JSS3A", "SS2C"], fromWeek: 8 },
  /**
   * One class's last piece of the term is left open: some have handed it
   * in, some have started, some have not, and nothing is marked yet — so the
   * learners' status words and the teacher's waiting work have something to
   * show.
   */
  leftOpen: { arm: "JSS2A", subject: "Mathematics", week: 10 },
  pdfHandoutWeeks: [],
  lessonNoteHistoryWeek: 8,
  reopenedNote: { arm: "SS1A", subject: "Chemistry", week: 3 },
  /** Exam days of week 12: Monday 30 November to Friday 4 December 2026. */
  examDays: [
    "2026-11-30",
    "2026-12-01",
    "2026-12-02",
    "2026-12-03",
    "2026-12-04",
  ],
  exams: {
    sessions: ["08:30", "11:00", "13:30"],
    minutes: (yearGroup: string) => (yearGroup.startsWith("SS") ? 90 : 60),
    theoryQuestions: (yearGroup: string) =>
      yearGroup.startsWith("SS") ? 3 : 2,
    sectionB: (yearGroup: string) =>
      yearGroup.startsWith("SS")
        ? "Answer all questions in Section B."
        : "Answer both questions in Section B.",
    title: "First Term Examination",
    timetableTitle: "First Term examination timetable",
    timetableIntro:
      "The First Term examinations run from Monday 30 November to Friday 4 December. Be seated ten minutes before each paper.",
  },
  termName: "First Term",
  announcements: {
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
  },
  where: {
    strongArm: "SS1A",
    strugglerArm: "SS2B",
    optionYear: "SS2",
    optionSubject: "Further Mathematics",
    lab: "Physics Lab",
    scienceDepartment: "Sciences",
  },
  outputDir: "showcase",
  classAnnouncement: (topic: string) =>
    `This week we are on ${topic}. Read the notes before Thursday's lesson and bring your exercise books.`,
  nextTermBegins: "Monday 11 January 2027",
  guideNotes: [
    "- Crestfield College is a day secondary school in Ibadan, Oyo State, running JSS1–SS3.",
    "- JSS has one arm per year group; SS has three streamed arms: A Science, B Commercial, C Art.",
    "- The First Term runs 14 September to 11 December 2026. Week 7 is the mid-term break, week 11 is revision, week 12 is examinations and week 13 is results and closing.",
    "- Mid-term and end-of-term examinations in SS follow the WAEC style where a style exists for the subject.",
    "- Work not handed in counts as zero. Report cards show positions.",
    "- Practicals in Physics, Chemistry and Biology are taught as doubles in the labs.",
    "- Teachers mark open answers against the mark scheme and quote the learner's words as evidence.",
  ],
  decisionText: {
    grading: "WAEC-style A1–F9 for the whole school",
    bellsLessonPeriods: "38 (eight a day Monday to Thursday, six on Friday)",
    classrooms: 'one per arm, named "<arm> classroom" (12)',
    termsNote: (index: number) =>
      index === 0
        ? " (13 weeks; the only term taught)"
        : " (dates only; nothing taught)",
    examWeeksNote:
      "the last 2 weeks of each term: week 12 examinations, week 13 results and closing",
    examsWhen:
      "week 12, Monday 30 November to Friday 4 December 2026, three sessions a day (08:30, 11:00, 13:30)",
    examsOrder:
      "papers every arm sits first, then stream papers in shared sessions (Science, Commercial and Art at the same time), then the option block together",
    examsState:
      "sat, marked and published; the papers carry no opening time, because the term's dates put week 12 in December",
    examStyles:
      "every subject the app ships no style for is worded plainly; styles exist only for English Language, Mathematics, Physics, Chemistry and Biology",
    lessonCountTotals:
      "JSS arms 37 periods of 38; SS1 and SS2 arms 34 (30 whole-arm plus the 4-period option block); SS3 arms 30",
    libraries:
      "drawn from the NERDC and WAEC libraries: a third of a three-year library per year group, or nine objectives in a row where the sample library is too small for a third to fill nine weeks; units follow the library's sub-strands, with nothing new in weeks 7, 11, 12 and 13",
    gaps: [
      {
        gap: "Assessment styles",
        why: "the app ships styles for five SS subjects only (English Language, Mathematics, Physics, Chemistry, Biology); every other subject's questions are worded plainly, which check-school-setup reports",
      },
      {
        gap: "A separate JSS grading scale",
        why: "the app holds one scale per school, so JSS uses the WAEC A1–F9 scale too",
      },
      {
        gap: "Second and Third Terms",
        why: "dates only; nothing is taught in them",
      },
      {
        gap: "Exam opening times",
        why: "the papers are sat now, but the term's dates put week 12 in December, so they carry no opening time; their dates are on the examination timetable",
      },
    ],
  },
};

export default showcase;
