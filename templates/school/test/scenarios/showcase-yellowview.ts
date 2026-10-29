/**
 * The second showcase school: Yellow View High School, a public high school
 * in Columbus, Ohio, built to show the platform is not shaped to one country.
 * The same app and the same harness as Crestfield College; only this file,
 * its written content (test/fixtures/showcase-yellowview/) and its standards
 * libraries differ. See docs/showcase-yellowview-spec.md.
 *
 * How the classes are organised follows what the timetable can place: three
 * homerooms to a grade (two standard, one Honors, which is Honors/AP in
 * grades 11 and 12) sharing six core classes, plus one elective block per
 * grade in which each student picks a course.
 */

import type {
  ArmPlan,
  Showcase,
  StaffPlan,
  SubjectPlan,
} from "./showcase-types.js";
import { FIRST, LAST } from "./names-us.js";

const G9 = "Grade 9";
const G10 = "Grade 10";
const G11 = "Grade 11";
const G12 = "Grade 12";
const YEARS = [G9, G10, G11, G12];

const STANDARD = "Standard";
const HONORS = "Honors";
const HONORS_AP = "Honors/AP";

/** Homerooms: A and B standard, C Honors (Honors/AP in grades 11 and 12). */
export const ARMS: ArmPlan[] = YEARS.flatMap((yearGroup) => {
  const n = yearGroup.replace("Grade ", "");
  const upper = yearGroup === G11 || yearGroup === G12;
  return [
    { yearGroup, name: `${n}A`, stream: STANDARD, abilityBias: 0.12 },
    { yearGroup, name: `${n}B`, stream: STANDARD, abilityBias: 0.12 },
    {
      yearGroup,
      name: `${n}C`,
      stream: upper ? HONORS_AP : HONORS,
      abilityBias: 0.28,
    },
  ];
});

const std = (g: string) => [`${g}A`, `${g}B`];
const hon = (g: string) => [`${g}C`];
const every = (g: string) => [`${g}A`, `${g}B`, `${g}C`];
const g = (year: string) => year.replace("Grade ", "");
const opt = (...years: string[]) => years.map((y) => `option:${y}`);

// Departments
const ENG_SS = "English and Social Studies";
const MATH_CS = "Math and Computer Science";
const SCI = "Science";
const ELECT = "Electives and World Languages";

// Frameworks
const CCSS = "Common Core State Standards";
const NGSS = "Next Generation Science Standards";
const C3 = "C3 Framework for Social Studies State Standards";
const ACTFL = "ACTFL World-Readiness Standards for Learning Languages";
const SHAPE = "SHAPE America National Standards for K-12 Physical Education";
const ARTS = "National Core Arts Standards";
const CSTA = "CSTA K-12 Computer Science Standards";
const FIN = "National Standards for Personal Financial Education";
const NBEA = "National Business Education Standards";
const AP = "College Board AP Course Frameworks";

const lib = (framework: string, subject: string) => ({ framework, subject });

type Core = {
  name: string;
  code: string;
  department: string;
  library: SubjectPlan["library"];
  year: string;
  lab?: string;
  handwritten?: boolean;
  periods?: number;
};

/** A whole-homeroom course for the standard homerooms, and its Honors twin. */
function coreCourse(
  c: Core,
  honors?: {
    name: string;
    level?: "Honors" | "AP";
    code?: string;
    library?: SubjectPlan["library"];
  },
): SubjectPlan[] {
  const upper = c.year === G11 || c.year === G12;
  const base: SubjectPlan = {
    name: c.name,
    code: c.code,
    department: c.department,
    library: c.library,
    yearGroups: [c.year],
    streams: honors ? [STANDARD] : undefined,
    periodsPerWeek: c.periods ?? 5,
    doublesPerWeek: c.lab ? 1 : 0,
    ...(c.lab ? { lab: c.lab } : {}),
    ...(c.handwritten ? { handwritten: true } : {}),
    credits: 1,
  };
  if (!honors) return [base];
  return [
    base,
    {
      ...base,
      name: honors.name,
      code: honors.code ?? `H${c.code}`,
      library: honors.library ?? c.library,
      streams: [upper ? HONORS_AP : HONORS],
      courseLevel: honors.level ?? "Honors",
    },
  ];
}

const elective = (s: {
  name: string;
  code: string;
  department: string;
  library: SubjectPlan["library"];
  years: string[];
  lab?: string;
  room?: string;
  courseLevel?: string;
  handwritten?: boolean;
}): SubjectPlan => ({
  name: s.name,
  code: s.code,
  department: s.department,
  library: s.library,
  yearGroups: s.years,
  option: true,
  periodsPerWeek: 5,
  doublesPerWeek: s.lab ? 1 : 0,
  ...(s.lab ? { lab: s.lab } : {}),
  ...(s.room ? { room: s.room } : {}),
  ...(s.courseLevel ? { courseLevel: s.courseLevel } : {}),
  ...(s.handwritten ? { handwritten: true } : {}),
  credits: 1,
});

const shared = (s: {
  name: string;
  code: string;
  department: string;
  library: SubjectPlan["library"];
  year: string;
  periods: number;
  credits: number;
  room?: string;
}): SubjectPlan => ({
  name: s.name,
  code: s.code,
  department: s.department,
  library: s.library,
  yearGroups: [s.year],
  periodsPerWeek: s.periods,
  doublesPerWeek: 0,
  credits: s.credits,
  ...(s.room ? { room: s.room } : {}),
});

export const SUBJECTS: SubjectPlan[] = [
  // ── English ─────────────────────────────────────────────────────────────
  ...coreCourse(
    {
      name: "English 9",
      code: "E9",
      department: ENG_SS,
      library: lib(CCSS, "English 9"),
      year: G9,
    },
    { name: "Honors English 9", code: "HE9" },
  ),
  ...coreCourse(
    {
      name: "English 10",
      code: "E10",
      department: ENG_SS,
      library: lib(CCSS, "English 10"),
      year: G10,
    },
    { name: "Honors English 10", code: "HE10" },
  ),
  ...coreCourse(
    {
      name: "English 11",
      code: "E11",
      department: ENG_SS,
      library: lib(CCSS, "English 11"),
      year: G11,
    },
    {
      name: "AP English Language",
      code: "APEL",
      level: "AP",
      library: lib(AP, "AP English Language"),
    },
  ),
  ...coreCourse(
    {
      name: "English 12",
      code: "E12",
      department: ENG_SS,
      library: lib(CCSS, "English 12"),
      year: G12,
    },
    {
      name: "AP English Literature",
      code: "APEN",
      level: "AP",
      library: lib(AP, "AP English Literature"),
    },
  ),

  // ── Math ────────────────────────────────────────────────────────────────
  ...coreCourse(
    {
      name: "Algebra I",
      code: "ALG1",
      department: MATH_CS,
      library: lib(CCSS, "Algebra I"),
      year: G9,
      handwritten: true,
    },
    { name: "Honors Algebra I", code: "HALG1" },
  ),
  ...coreCourse(
    {
      name: "Geometry",
      code: "GEO",
      department: MATH_CS,
      library: lib(CCSS, "Geometry"),
      year: G10,
      handwritten: true,
    },
    { name: "Honors Geometry", code: "HGEO" },
  ),
  ...coreCourse(
    {
      name: "Algebra II",
      code: "ALG2",
      department: MATH_CS,
      library: lib(CCSS, "Algebra II"),
      year: G11,
      handwritten: true,
    },
    { name: "Honors Algebra II", code: "HALG2" },
  ),
  ...coreCourse(
    {
      name: "Precalculus",
      code: "PRE",
      department: MATH_CS,
      library: lib(CCSS, "Precalculus"),
      year: G12,
      handwritten: true,
    },
    { name: "Honors Precalculus", code: "HPRE" },
  ),

  // ── Science ─────────────────────────────────────────────────────────────
  ...coreCourse(
    {
      name: "Biology",
      code: "BIO",
      department: SCI,
      library: lib(NGSS, "Biology"),
      year: G9,
      lab: "Biology Lab",
    },
    { name: "Honors Biology", code: "HBIO" },
  ),
  ...coreCourse(
    {
      name: "Chemistry",
      code: "CHM",
      department: SCI,
      library: lib(NGSS, "Chemistry"),
      year: G10,
      lab: "Chemistry Lab",
      handwritten: true,
    },
    { name: "Honors Chemistry", code: "HCHM" },
  ),
  ...coreCourse(
    {
      name: "Physics",
      code: "PHY",
      department: SCI,
      library: lib(NGSS, "Physics"),
      year: G11,
      lab: "Physics Lab",
      handwritten: true,
    },
    { name: "Honors Physics", code: "HPHY" },
  ),
  ...coreCourse(
    {
      name: "Anatomy and Physiology",
      code: "ANP",
      department: SCI,
      library: lib(NGSS, "Anatomy and Physiology"),
      year: G12,
      lab: "Biology Lab 2",
    },
    { name: "Honors Anatomy and Physiology", code: "HANP" },
  ),

  // ── Social studies ──────────────────────────────────────────────────────
  ...coreCourse(
    {
      name: "World History",
      code: "WHI",
      department: ENG_SS,
      library: lib(C3, "World History"),
      year: G9,
    },
    { name: "Honors World History", code: "HWHI" },
  ),
  ...coreCourse(
    {
      name: "US History",
      code: "USH",
      department: ENG_SS,
      library: lib(C3, "US History"),
      year: G10,
    },
    { name: "Honors US History", code: "HUSH" },
  ),
  ...coreCourse(
    {
      name: "US Government",
      code: "GOV",
      department: ENG_SS,
      library: lib(C3, "US Government"),
      year: G11,
    },
    {
      name: "AP US Government",
      code: "APGO",
      level: "AP",
      library: lib(AP, "AP US Government"),
    },
  ),
  ...coreCourse(
    {
      name: "Economics",
      code: "ECO",
      department: ENG_SS,
      library: lib(C3, "Economics"),
      year: G12,
    },
    {
      name: "AP Macroeconomics",
      code: "APMA",
      level: "AP",
      library: lib(AP, "AP Macroeconomics"),
    },
  ),

  // ── World languages, PE: every homeroom of the grade ────────────────────
  shared({
    name: "Spanish I",
    code: "SP1",
    department: ELECT,
    library: lib(ACTFL, "Spanish I"),
    year: G9,
    periods: 4,
    credits: 1,
  }),
  shared({
    name: "Spanish II",
    code: "SP2",
    department: ELECT,
    library: lib(ACTFL, "Spanish II"),
    year: G10,
    periods: 4,
    credits: 1,
  }),
  shared({
    name: "Spanish III",
    code: "SP3",
    department: ELECT,
    library: lib(ACTFL, "Spanish III"),
    year: G11,
    periods: 4,
    credits: 1,
  }),
  shared({
    name: "Spanish IV",
    code: "SP4",
    department: ELECT,
    library: lib(ACTFL, "Spanish IV"),
    year: G12,
    periods: 4,
    credits: 1,
  }),
  shared({
    name: "Physical Education 9",
    code: "PE9",
    department: ELECT,
    library: lib(SHAPE, "Physical Education 9"),
    year: G9,
    periods: 3,
    credits: 0.5,
    room: "Gym",
  }),
  shared({
    name: "Physical Education 10",
    code: "PE10",
    department: ELECT,
    library: lib(SHAPE, "Physical Education 10"),
    year: G10,
    periods: 3,
    credits: 0.5,
    room: "Gym",
  }),
  shared({
    name: "Physical Education 11",
    code: "PE11",
    department: ELECT,
    library: lib(SHAPE, "Physical Education 11"),
    year: G11,
    periods: 3,
    credits: 0.5,
    room: "Fitness Room",
  }),
  shared({
    name: "Physical Education 12",
    code: "PE12",
    department: ELECT,
    library: lib(SHAPE, "Physical Education 12"),
    year: G12,
    periods: 3,
    credits: 0.5,
    room: "Fitness Room",
  }),

  // ── The elective block of each grade ────────────────────────────────────
  elective({
    name: "Art I",
    code: "ART1",
    department: ELECT,
    library: lib(ARTS, "Art I"),
    years: [G9],
    room: "Art Room",
  }),
  elective({
    name: "Art II",
    code: "ART2",
    department: ELECT,
    library: lib(ARTS, "Art II"),
    years: [G10],
    room: "Art Room",
  }),
  elective({
    name: "Digital Photography",
    code: "PHO",
    department: ELECT,
    library: lib(ARTS, "Digital Photography"),
    years: [G12],
    room: "Art Room",
  }),
  elective({
    name: "Band",
    code: "BND",
    department: ELECT,
    library: lib(ARTS, "Band"),
    years: YEARS,
    room: "Band Room",
  }),
  elective({
    name: "Choir",
    code: "CHR",
    department: ELECT,
    library: lib(ARTS, "Choir"),
    years: [G9, G10],
    room: "Choir Room",
  }),
  elective({
    name: "Theater",
    code: "THR",
    department: ELECT,
    library: lib(ARTS, "Theater"),
    years: [G10],
    room: "Auditorium",
  }),
  elective({
    name: "French I",
    code: "FR1",
    department: ELECT,
    library: lib(ACTFL, "French I"),
    years: [G9],
  }),
  elective({
    name: "French II",
    code: "FR2",
    department: ELECT,
    library: lib(ACTFL, "French II"),
    years: [G10],
  }),
  elective({
    name: "Computer Science Principles",
    code: "CSP",
    department: MATH_CS,
    library: lib(CSTA, "Computer Science Principles"),
    years: [G9],
    room: "Computer Lab",
  }),
  elective({
    name: "AP Computer Science A",
    code: "APCS",
    department: MATH_CS,
    library: lib(AP, "AP Computer Science A"),
    years: [G11],
    room: "Computer Lab",
    courseLevel: "AP",
  }),
  elective({
    name: "Introduction to Business",
    code: "BUS",
    department: MATH_CS,
    library: lib(NBEA, "Introduction to Business"),
    years: [G9],
  }),
  elective({
    name: "Personal Finance",
    code: "FIN",
    department: MATH_CS,
    library: lib(FIN, "Personal Finance"),
    years: [G10],
  }),
  elective({
    name: "Journalism",
    code: "JRN",
    department: ENG_SS,
    library: lib(CCSS, "Journalism"),
    years: [G11],
  }),
  elective({
    name: "AP Biology",
    code: "APBI",
    department: SCI,
    library: lib(AP, "AP Biology"),
    years: [G11, G12],
    lab: "Biology Lab 2",
    courseLevel: "AP",
  }),
  elective({
    name: "AP Environmental Science",
    code: "APES",
    department: SCI,
    library: lib(AP, "AP Environmental Science"),
    years: [G11],
    lab: "Chemistry Lab",
    room: "Chemistry Lab",
    courseLevel: "AP",
  }),
  elective({
    name: "AP Psychology",
    code: "APPS",
    department: ENG_SS,
    library: lib(AP, "AP Psychology"),
    years: [G11, G12],
    courseLevel: "AP",
  }),
  elective({
    name: "AP Calculus AB",
    code: "APCA",
    department: MATH_CS,
    library: lib(AP, "AP Calculus AB"),
    years: [G12],
    courseLevel: "AP",
    handwritten: true,
  }),
  elective({
    name: "AP Statistics",
    code: "APST",
    department: MATH_CS,
    library: lib(AP, "AP Statistics"),
    years: [G12],
    courseLevel: "AP",
    handwritten: true,
  }),
];

/**
 * The staff. Loads are what a high school gives: a course across the grade's
 * homerooms, 15 to 24 periods a week, department heads still teaching.
 */
export const STAFF: StaffPlan[] = [
  // English and Social Studies
  {
    key: "english-9",
    name: "Margaret Whitfield",
    role: "subject_coordinator",
    heads: ENG_SS,
    teaches: [
      { subject: "English 9", arms: std(G9.replace("Grade ", "")) },
      { subject: "Honors English 9", arms: hon(g(G9)) },
    ],
    formOf: "9A",
  },
  {
    key: "english-10",
    name: "Darnell Brooks",
    role: "teacher",
    teaches: [
      { subject: "English 10", arms: std(g(G10)) },
      { subject: "Honors English 10", arms: hon(g(G10)) },
      { subject: "Theater", arms: opt(G10) },
    ],
    formOf: "10A",
  },
  {
    key: "english-11",
    name: "Priya Raman",
    role: "teacher",
    teaches: [
      { subject: "English 11", arms: std(g(G11)) },
      { subject: "AP English Language", arms: hon(g(G11)) },
      { subject: "Journalism", arms: opt(G11) },
    ],
    formOf: "11A",
  },
  {
    key: "english-12",
    name: "Thomas Kowalski",
    role: "teacher",
    teaches: [
      { subject: "English 12", arms: std(g(G12)) },
      { subject: "AP English Literature", arms: hon(g(G12)) },
    ],
    formOf: "12A",
  },
  {
    key: "history-9",
    name: "Elena Vasquez",
    role: "teacher",
    teaches: [
      { subject: "World History", arms: std(g(G9)) },
      { subject: "Honors World History", arms: hon(g(G9)) },
    ],
    formOf: "9B",
  },
  {
    key: "history-10",
    name: "Jerome Washington",
    role: "teacher",
    teaches: [
      { subject: "US History", arms: std(g(G10)) },
      { subject: "Honors US History", arms: hon(g(G10)) },
    ],
    formOf: "10B",
  },
  {
    key: "government",
    name: "Katherine Doyle",
    role: "teacher",
    teaches: [
      { subject: "US Government", arms: std(g(G11)) },
      { subject: "AP US Government", arms: hon(g(G11)) },
      { subject: "AP Psychology", arms: opt(G11, G12) },
    ],
    formOf: "11B",
  },
  {
    key: "economics",
    name: "Omar Haddad",
    role: "teacher",
    teaches: [
      { subject: "Economics", arms: std(g(G12)) },
      { subject: "AP Macroeconomics", arms: hon(g(G12)) },
    ],
    formOf: "12B",
  },

  // Math and Computer Science
  {
    key: "algebra-1",
    name: "Raymond Choi",
    role: "subject_coordinator",
    heads: MATH_CS,
    teaches: [
      { subject: "Algebra I", arms: std(g(G9)) },
      { subject: "Honors Algebra I", arms: hon(g(G9)) },
    ],
    formOf: "9C",
  },
  {
    key: "geometry",
    name: "Linda Okafor",
    role: "teacher",
    teaches: [
      { subject: "Geometry", arms: std(g(G10)) },
      { subject: "Honors Geometry", arms: hon(g(G10)) },
    ],
    formOf: "10C",
  },
  {
    key: "algebra-2",
    name: "Samuel Peterson",
    role: "teacher",
    teaches: [
      { subject: "Algebra II", arms: std(g(G11)) },
      { subject: "Honors Algebra II", arms: hon(g(G11)) },
    ],
    formOf: "11C",
  },
  {
    key: "precalculus",
    name: "Anh Nguyen",
    role: "teacher",
    teaches: [
      { subject: "Precalculus", arms: std(g(G12)) },
      { subject: "Honors Precalculus", arms: hon(g(G12)) },
      { subject: "AP Statistics", arms: opt(G12) },
    ],
    formOf: "12C",
  },
  {
    key: "calculus",
    name: "Gregory Lindqvist",
    role: "teacher",
    teaches: [{ subject: "AP Calculus AB", arms: opt(G12) }],
  },
  {
    key: "computing",
    name: "Naomi Feldman",
    role: "teacher",
    teaches: [
      { subject: "Computer Science Principles", arms: opt(G9) },
      { subject: "AP Computer Science A", arms: opt(G11) },
    ],
  },
  {
    key: "business",
    name: "Carlos Mendoza",
    role: "teacher",
    teaches: [
      { subject: "Introduction to Business", arms: opt(G9) },
      { subject: "Personal Finance", arms: opt(G10) },
    ],
  },

  // Science
  {
    key: "biology",
    name: "Rebecca Tanaka",
    role: "subject_coordinator",
    heads: SCI,
    teaches: [
      { subject: "Biology", arms: std(g(G9)) },
      { subject: "Honors Biology", arms: hon(g(G9)) },
    ],
  },
  {
    key: "chemistry",
    name: "Michael Brennan",
    role: "teacher",
    teaches: [
      { subject: "Chemistry", arms: std(g(G10)) },
      { subject: "Honors Chemistry", arms: hon(g(G10)) },
    ],
  },
  {
    key: "physics",
    name: "Ayesha Rahman",
    role: "teacher",
    teaches: [
      { subject: "Physics", arms: std(g(G11)) },
      { subject: "Honors Physics", arms: hon(g(G11)) },
    ],
  },
  {
    key: "anatomy",
    name: "Daniel Okoye",
    role: "teacher",
    teaches: [
      { subject: "Anatomy and Physiology", arms: std(g(G12)) },
      { subject: "Honors Anatomy and Physiology", arms: hon(g(G12)) },
      { subject: "AP Environmental Science", arms: opt(G11) },
    ],
  },
  {
    key: "ap-biology",
    name: "Jennifer Alvarado",
    role: "teacher",
    teaches: [{ subject: "AP Biology", arms: opt(G11, G12) }],
  },
  {
    key: "lab-support",
    name: "Patrick Sullivan",
    role: "teacher",
    teaches: [],
    supports: [
      { subject: "Chemistry", arms: ["10A"] },
      { subject: "Physics", arms: ["11A"] },
    ],
  },

  // Electives and world languages
  {
    key: "spanish-1",
    name: "Isabel Moreno",
    role: "subject_coordinator",
    heads: ELECT,
    teaches: [
      { subject: "Spanish I", arms: every(g(G9)) },
      { subject: "Spanish II", arms: every(g(G10)) },
    ],
  },
  {
    key: "spanish-3",
    name: "Sofia Bianchi",
    role: "teacher",
    teaches: [
      { subject: "Spanish III", arms: every(g(G11)) },
      { subject: "Spanish IV", arms: every(g(G12)) },
    ],
  },
  {
    key: "french",
    name: "Claire Dubois",
    role: "teacher",
    teaches: [
      { subject: "French I", arms: opt(G9) },
      { subject: "French II", arms: opt(G10) },
    ],
  },
  {
    key: "pe-lower",
    name: "Tyrone Jackson",
    role: "teacher",
    teaches: [
      { subject: "Physical Education 9", arms: every(g(G9)) },
      { subject: "Physical Education 10", arms: every(g(G10)) },
    ],
  },
  {
    key: "pe-upper",
    name: "Hannah Lindgren",
    role: "teacher",
    teaches: [
      { subject: "Physical Education 11", arms: every(g(G11)) },
      { subject: "Physical Education 12", arms: every(g(G12)) },
    ],
  },
  {
    key: "art",
    name: "Fiona McAllister",
    role: "teacher",
    teaches: [
      { subject: "Art I", arms: opt(G9) },
      { subject: "Art II", arms: opt(G10) },
      { subject: "Digital Photography", arms: opt(G12) },
    ],
  },
  {
    key: "band",
    name: "Andrew Castellano",
    role: "teacher",
    teaches: [{ subject: "Band", arms: opt(...YEARS) }],
  },
  {
    key: "choir",
    name: "Rosalind Ebanks",
    role: "teacher",
    teaches: [{ subject: "Choir", arms: opt(G9, G10) }],
  },
];

const AP_SUBJECTS = (name: string) => name.startsWith("AP ");

/** A small deterministic shuffle, so the same command seats the same learners. */
const spin = (i: number, seed: number) =>
  Math.abs(Math.sin((i + 1) * 12.9898 + seed * 78.233) * 43758.5453) % 1;

export const showcase: Showcase = {
  key: "yellowview",
  port: 8133,
  devCommand: "pnpm dev:yellowview",
  resetCommand: "pnpm yellowview:reset",
  schoolName: "Yellow View High School",
  city: "Columbus, Ohio",
  schoolType: "high school",
  country: "United States",
  locale: "en-US",
  timezone: "America/New_York",
  utcOffset: "-04:00",
  paperSize: "letter",
  principal: "Dr. Eleanor Whitaker",
  emailDomain: "yellowview.test",
  names: { first: FIRST, last: LAST },
  seed: 20260817,

  yearGroups: YEARS,
  gradePrefix: "Grade",
  termStructure: "quarters",
  customLabels: {
    student: "student",
    teacher: "teacher",
    arm: "homeroom",
    formTeacher: "homeroom teacher",
    stream: "track",
    double: "double",
    term: "quarter",
  },
  assessmentTerminology: "assignment",
  assessmentTerminologyPlural: "assignments",

  passMark: 60,
  rankLearners: false,
  missedWorkPolicy: "zero",
  gradingScale: {
    type: "letter",
    levels: [
      { grade: "A", min: 93, max: 100, label: "Excellent", points: 4.0 },
      { grade: "A-", min: 90, max: 92, label: "Excellent", points: 3.7 },
      { grade: "B+", min: 87, max: 89, label: "Good", points: 3.3 },
      { grade: "B", min: 83, max: 86, label: "Good", points: 3.0 },
      { grade: "B-", min: 80, max: 82, label: "Good", points: 2.7 },
      { grade: "C+", min: 77, max: 79, label: "Satisfactory", points: 2.3 },
      { grade: "C", min: 73, max: 76, label: "Satisfactory", points: 2.0 },
      { grade: "C-", min: 70, max: 72, label: "Satisfactory", points: 1.7 },
      { grade: "D+", min: 67, max: 69, label: "Passing", points: 1.3 },
      { grade: "D", min: 63, max: 66, label: "Passing", points: 1.0 },
      { grade: "D-", min: 60, max: 62, label: "Passing", points: 0.7 },
      { grade: "F", min: 0, max: 59, label: "Failing", points: 0.0 },
    ],
  },
  courseLevels: [
    { name: "Honors", bonus: 0.5 },
    { name: "AP", bonus: 1 },
  ],

  academicYear: { name: "2026-2027", start: "2026-08-17", end: "2027-06-04" },
  terms: [
    { name: "Quarter 1", start: "2026-08-17", end: "2026-10-23" },
    { name: "Quarter 2", start: "2026-10-26", end: "2026-12-18" },
    { name: "Quarter 3", start: "2027-01-11", end: "2027-03-19" },
    { name: "Quarter 4", start: "2027-03-29", end: "2027-06-04" },
  ],
  /** Weeks 1 to 8 teach; week 9 is review; week 10 is the quarter exams. */
  reservedWeeks: [{ week: 9, label: "Review" }],
  examWeeksPerTerm: 1,
  teachingWeeks: [1, 2, 3, 4, 5, 6, 7, 8],
  revisionWeek: 9,
  examWeek: 10,
  sampleDate: "2026-10-14",

  /** Homeroom, seven 48-minute periods and a 30-minute lunch, the same every day. */
  bells: {
    full: [
      { start: "07:30", end: "07:48", kind: "break", label: "Homeroom" },
      { start: "07:50", end: "08:38", kind: "lesson" },
      { start: "08:42", end: "09:30", kind: "lesson" },
      { start: "09:34", end: "10:22", kind: "lesson" },
      { start: "10:26", end: "11:14", kind: "lesson" },
      { start: "11:14", end: "11:44", kind: "break", label: "Lunch" },
      { start: "11:48", end: "12:36", kind: "lesson" },
      { start: "12:40", end: "13:28", kind: "lesson" },
      { start: "13:32", end: "14:20", kind: "lesson" },
    ],
    friday: [
      { start: "07:30", end: "07:48", kind: "break", label: "Homeroom" },
      { start: "07:50", end: "08:38", kind: "lesson" },
      { start: "08:42", end: "09:30", kind: "lesson" },
      { start: "09:34", end: "10:22", kind: "lesson" },
      { start: "10:26", end: "11:14", kind: "lesson" },
      { start: "11:14", end: "11:44", kind: "break", label: "Lunch" },
      { start: "11:48", end: "12:36", kind: "lesson" },
      { start: "12:40", end: "13:28", kind: "lesson" },
      { start: "13:32", end: "14:20", kind: "lesson" },
    ],
  },
  specialRooms: [
    "Biology Lab",
    "Biology Lab 2",
    "Chemistry Lab",
    "Chemistry Lab 2",
    "Physics Lab",
    "Physics Lab 2",
    "Computer Lab",
    "Library",
    "Gym",
    "Fitness Room",
    "Art Room",
    "Band Room",
    "Choir Room",
    "Auditorium",
  ],

  arms: ARMS,
  studentsPerArm: 15,
  subjects: SUBJECTS,
  overrideFor: () => undefined,
  librarySplit: () => ({ index: 0, parts: 1 }),
  seniorLabel: "grades 11 and 12",
  isSenior: (yearGroup: string) => yearGroup === G11 || yearGroup === G12,
  staff: STAFF,
  // Every course in a grade's block sits at once, so each needs a room of its
  // own: its special room, or else one of the grade's three homeroom rooms.
  optionRoom: (subject: SubjectPlan, yearGroup: string) => {
    if (subject.room) return subject.room;
    const plain = SUBJECTS.filter(
      (s) => s.option && !s.room && s.yearGroups.includes(yearGroup),
    );
    return `${g(yearGroup)}${"ABC"[plain.indexOf(subject)]} classroom`;
  },
  // Strong students are drawn to the AP courses; everyone else is seated by a
  // fixed shuffle, so each course in the block has a class and none is empty.
  chooseOptions: (cohort, options, yearGroup) => {
    const aps = options.filter(AP_SUBJECTS);
    const others = options.filter((o) => !AP_SUBJECTS(o));
    const order = cohort
      .map((l, i) => ({ i, ability: l.ability }))
      .sort((a, b) => b.ability - a.ability);
    const apSeats = aps.length ? Math.round(cohort.length * 0.4) : 0;
    const chosen: string[] = new Array(cohort.length).fill("");
    order.slice(0, apSeats).forEach(({ i }, k) => {
      chosen[i] = aps[k % aps.length];
    });
    const rest = order
      .slice(apSeats)
      .map(({ i }) => i)
      .sort((a, b) => spin(a, yearGroup.length) - spin(b, yearGroup.length));
    const pool = others.length ? others : options;
    rest.forEach((i, k) => {
      chosen[i] = pool[k % pool.length];
    });
    return chosen;
  },
  optionDecision: (yearGroups: string[]) =>
    `One elective block in ${yearGroups.join(", ")}: each student picks one course. The strongest students (about two in five) fill the AP courses where the grade offers them, evenly; everyone else is seated across the other courses by a fixed shuffle. Every course in a grade's block draws on all three homerooms, so the block is timetabled together.`,

  activityRotation: [
    "worksheet",
    "quiz",
    "problem set",
    "worksheet",
    "practical",
  ],
  differentiationWeeks: [3, 5, 7, 8],
  differentiationClasses: [
    { arm: "9A", subject: "Algebra I" },
    { arm: "9B", subject: "Biology" },
    { arm: "10A", subject: "English 10" },
    { arm: "10B", subject: "Geometry" },
    { arm: "11A", subject: "US Government" },
    { arm: "12B", subject: "Precalculus" },
  ],
  strugglingWeeks: [2, 4, 6, 8],
  behindOnNotes: { arms: ["10B", "12A"], fromWeek: 6 },
  pdfHandoutWeeks: [2, 5],
  lessonNoteHistoryWeek: 6,
  reopenedNote: { arm: "9A", subject: "Biology", week: 3 },
  leftOpen: { arm: "10A", subject: "Geometry", week: 8 },
  /** Exam week 10: Monday 10/19 to Friday 10/23/2026. */
  examDays: [
    "2026-10-19",
    "2026-10-20",
    "2026-10-21",
    "2026-10-22",
    "2026-10-23",
  ],

  exams: {
    sessions: ["08:00", "10:30", "12:45"],
    minutes: () => 60,
    theoryQuestions: (yearGroup: string) =>
      yearGroup === G11 || yearGroup === G12 ? 3 : 2,
    sectionB: (yearGroup: string) =>
      yearGroup === G11 || yearGroup === G12
        ? "Answer all three questions in Section B."
        : "Answer both questions in Section B.",
    title: "Quarter 1 Exam",
    timetableTitle: "Quarter 1 exam schedule",
    timetableIntro:
      "Quarter 1 exams run from Monday 10/19 to Friday 10/23. Be in your seat five minutes before each exam, and bring a pencil and your school-issued device.",
  },
  termName: "Quarter 1",
  announcements: {
    1: [
      "Welcome to Quarter 1",
      "Welcome back, everyone. Classes begin on Monday 08/17 with homeroom at 7:30. Your homeroom teacher will hand out your schedule on the first day.",
    ],
    4: [
      "No school on Labor Day",
      "School is closed on Monday 09/07 for Labor Day. Classes resume on Tuesday 09/08.",
    ],
    8: [
      "Review week and Quarter 1 exams",
      "Week 9 is review week and Quarter 1 exams run from Monday 10/19 to Friday 10/23. The exam schedule will be posted next week. Quarter 1 report cards go out when grades close.",
    ],
  },
  where: {
    strongArm: "10A",
    strugglerArm: "11B",
    optionYear: "Grade 11",
    optionSubject: "AP Biology",
    lab: "Chemistry Lab",
    scienceDepartment: SCI,
  },
  outputDir: "showcase-yellowview",
  classAnnouncement: (topic: string) =>
    `This week we are working on ${topic}. Read the notes before Thursday's class and bring your device and a pencil.`,
  nextTermBegins: "Monday, 10/26/2026",
  guideNotes: [
    "- Yellow View High School is a public high school in Columbus, Ohio, serving grades 9 to 12.",
    "- Each grade has three homerooms: A and B are standard, C is the Honors homeroom (Honors/AP in grades 11 and 12). A homeroom shares its six core classes.",
    "- Each grade has one elective block in the seventh period: students pick one course. The AP courses that do not replace a core class are in that block.",
    "- Quarter 1 runs 08/17 to 10/23/2026. Weeks 1 to 8 are teaching, week 9 is review and week 10 is the Quarter 1 exam week. Grades close when the exams are marked.",
    "- Letter grades with plus and minus; 60 is passing. Honors courses add 0.5 and AP courses add 1.0 to the weighted GPA. Work not handed in counts as zero. Report cards do not show class rank.",
    "- Labs for Biology, Chemistry, Physics, Anatomy and Physiology, and the AP sciences are doubles in the labs.",
    "- Teachers mark open answers against the mark scheme and quote the student's words as evidence.",
  ],
  decisionText: {
    grading:
      "Letter grades A to F with plus and minus, with grade points for a GPA (4.0 for an A) and course levels that add to a weighted GPA",
    bellsLessonPeriods:
      "35 (seven 48-minute periods a day, Monday to Friday, after a homeroom in the morning and with a 30-minute lunch between periods 4 and 5)",
    classrooms: 'one per homeroom, named "<homeroom> classroom" (12)',
    termsNote: (index: number) =>
      index === 0
        ? " (10 weeks; the only quarter taught)"
        : " (dates only; nothing taught)",
    examWeeksNote:
      "the last week of each quarter: week 10 is the exam week, after week 9 of review",
    examsWhen:
      "week 10, Monday 10/19 to Friday 10/23/2026, three sessions a day (08:00, 10:30, 12:45)",
    examsOrder:
      "papers every homeroom of a grade sits first (Spanish, PE), then standard and Honors homeroom papers in shared sessions, then the elective block together",
    examsState:
      "sat, marked and published; the papers carry no opening time, because they are sat when the build runs",
    examStyles:
      "the app ships no US assessment styles, so every subject's questions are worded plainly",
    lessonCountTotals:
      "each homeroom has 32 of the 35 lesson periods a week: English 5, math 5, science 5 (one a lab double), social studies 5, world language 4, PE 3, and the 5-period elective block",
    libraries:
      "each course drawn from its own library: Common Core (English, math), NGSS (science), C3 (social studies), ACTFL, SHAPE, the National Core Arts Standards, CSTA, the financial-literacy and business standards, and the AP course frameworks; units follow the library's strands, with nothing new in weeks 9 and 10",
    gaps: [
      {
        gap: "Assessment styles",
        why: "the app ships no US assessment style, so questions are worded plainly, which check-school-setup reports",
      },
      {
        gap: "Block or A/B scheduling",
        why: "the timetable repeats every week, so a school on alternating days or a block schedule cannot be shown; Yellow View runs seven periods a day",
      },
      {
        gap: "A grading scale per grade",
        why: "the app holds one scale per school, which suits a US high school",
      },
      {
        gap: "Counselors",
        why: "the app has no counselor role, so counselors are not on the staff list",
      },
      {
        gap: "Quarters 2 to 4",
        why: "dates only; nothing is taught in them",
      },
    ],
  },
};

export default showcase;
