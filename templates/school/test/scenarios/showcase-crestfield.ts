/**
 * The showcase school: a whole Nigerian secondary school, set up the way the
 * owner confirmed in docs/showcase-school-spec.md.
 *
 * Everything the run chooses lives here, as data, so the decisions file can be
 * written straight from it and a different school is a different file. The
 * run itself (test/sim/showcase/) only drives the app's actions with it.
 */

export type Stream = "Science" | "Commercial" | "Art";

export type SubjectPlan = {
  /** The school's name for it, which is also the library's name. */
  name: string;
  code: string;
  department: string;
  /** Which library the scheme of work is drawn from, and under what name. */
  library: { framework: "NERDC" | "WAEC"; subject: string };
  /** Year groups that take it. */
  yearGroups: string[];
  /** Only these streams take it in SS; absent means every stream. */
  streams?: Stream[];
  /** Part of the SS option block rather than a whole-arm class. */
  option?: boolean;
  periodsPerWeek: number;
  doublesPerWeek: number;
  /** A science with practicals: its double goes in this lab, named "Practical". */
  lab?: string;
  /** Working is written by hand on problem sets. */
  handwritten?: boolean;
  /** The app's exam style for the subject, where it ships one. */
  examStyle?: string;
};

export type StaffPlan = {
  key: string;
  name: string;
  /** "teacher", or a coordinator heading one department. */
  role: "teacher" | "subject_coordinator";
  heads?: string;
  /** Classes they lead: subject and the arms (or "option:SS1") it covers. */
  teaches: { subject: string; arms: string[] }[];
  /** Classes they support rather than lead. */
  supports?: { subject: string; arms: string[] }[];
  /** The arm they are form teacher of. */
  formOf?: string;
};

const JSS = ["JSS1", "JSS2", "JSS3"];
const SS = ["SS1", "SS2", "SS3"];
const ALL = [...JSS, ...SS];

/** Every arm, by year group: one in JSS, three streamed arms in SS. */
export const ARMS: { yearGroup: string; name: string; stream?: Stream }[] = [
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

export const showcase = {
  key: "showcase",
  schoolName: "Crestfield College",
  city: "Ibadan",
  schoolType: "secondary" as const,
  country: "Nigeria",
  locale: "en-NG",
  timezone: "Africa/Lagos",
  paperSize: "a4" as const,
  principal: "Olusegun Adekunle",

  yearGroups: ALL,
  gradePrefix: "Class",
  termStructure: "terms" as const,
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
  missedWorkPolicy: "zero" as const,
  gradingScale: {
    type: "letter" as const,
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
  } as Record<
    "full" | "friday",
    { start: string; end: string; kind: "lesson" | "break"; label?: string }[]
  >,

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
  /** Share of Science and Commercial learners who take Further Mathematics. */
  furtherMathsShare: 0.4,
  subjects: SUBJECTS,
  ssOverrides: SS_OVERRIDES,
  staff: STAFF,

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
  /** Exam days of week 12: Monday 30 November to Friday 4 December 2026. */
  examDays: [
    "2026-11-30",
    "2026-12-01",
    "2026-12-02",
    "2026-12-03",
    "2026-12-04",
  ],
};

export type Showcase = typeof showcase;
export default showcase;
