/**
 * What a showcase school is, as data. Crestfield College (Nigeria) and Yellow
 * View High School (United States) are both one of these, and the harness in
 * test/sim/showcase/ only ever reads this shape, so a different school is a
 * different file and not different code. Pick one with `SHOWCASE=<key>`.
 */

/** What separates the homerooms of a year group (a stream, a track). */
export type Stream = string;

export type SubjectPlan = {
  /** The school's name for it, which is also the library's name. */
  name: string;
  code: string;
  department: string;
  /** Which library the scheme of work is drawn from, and under what name. */
  library: { framework: string; subject: string };
  /** Year groups that take it. */
  yearGroups: string[];
  /** Only these streams take it; absent means every stream. */
  streams?: Stream[];
  /** Part of the option block rather than a whole-arm class. */
  option?: boolean;
  periodsPerWeek: number;
  doublesPerWeek: number;
  /** A science with practicals: its double goes in this lab, named "Practical". */
  lab?: string;
  /** Working is written by hand on problem sets. */
  handwritten?: boolean;
  /** The app's exam style for the subject, where it ships one. */
  examStyle?: string;
  /** A named course level (Honors, AP) that weights the GPA. */
  courseLevel?: string;
  /** Credit the course earns; one when absent. */
  credits?: number;
  /** The room its classes sit in, when not the homeroom's. */
  room?: string;
};

export type StaffPlan = {
  key: string;
  name: string;
  /** "teacher", or a coordinator heading one department. */
  role: "teacher" | "subject_coordinator";
  heads?: string;
  /** Classes they lead: subject and the arms (or "option:<year group>") it covers. */
  teaches: { subject: string; arms: string[] }[];
  /** Classes they support rather than lead. */
  supports?: { subject: string; arms: string[] }[];
  /** The arm they are form teacher of. */
  formOf?: string;
};

export type ArmPlan = {
  yearGroup: string;
  name: string;
  stream?: Stream;
  /** Added to the hidden ability of every learner placed here (an Honors homeroom is selected). */
  abilityBias?: number;
};

export type Bell = {
  start: string;
  end: string;
  kind: "lesson" | "break";
  label?: string;
};

export type GradeLevelPlan = {
  grade: string;
  min: number;
  max: number;
  label?: string;
  points?: number;
};

export type NamePool = { first: string[]; last: string[] };

export type Showcase = {
  key: string;
  /** The local server's port, and the commands to start and empty its database. */
  port: number;
  devCommand: string;
  resetCommand: string;
  schoolName: string;
  city: string;
  schoolType: string;
  country: string;
  locale: string;
  timezone: string;
  /** UTC offset of the school's clock during the taught term, for opening times. */
  utcOffset: string;
  paperSize: "a4" | "letter";
  principal: string;
  /** Sign-in addresses are `first.last@<this>`; the same every run. */
  emailDomain: string;
  names: NamePool;
  /** Seed for the roll, so the same command builds the same school. */
  seed: number;

  yearGroups: string[];
  gradePrefix: string;
  termStructure: "terms" | "semesters" | "quarters";
  customLabels: Record<string, string>;
  assessmentTerminology: string;
  assessmentTerminologyPlural: string;

  passMark: number;
  rankLearners: boolean;
  missedWorkPolicy: "zero" | "excluded";
  gradingScale: { type: "letter"; levels: GradeLevelPlan[] };
  /** Honors/AP-style levels that add to the GPA of a subject set to them. */
  courseLevels?: { name: string; bonus: number }[];

  academicYear: { name: string; start: string; end: string };
  terms: { name: string; start: string; end: string }[];
  /** Weeks of the taught term kept for something other than new material. */
  reservedWeeks: { week: number; label: string }[];
  examWeeksPerTerm: number;
  teachingWeeks: number[];
  revisionWeek: number;
  examWeek: number;
  /** A date inside the taught term, for reading a week back. */
  sampleDate: string;

  bells: Record<"full" | "friday", Bell[]>;
  specialRooms: string[];

  arms: ArmPlan[];
  studentsPerArm: number;
  subjects: SubjectPlan[];
  /** How a year group takes a subject differently (a library, a count), if it does. */
  overrideFor: (
    subject: SubjectPlan,
    yearGroup: string,
  ) =>
    | Partial<
        Pick<SubjectPlan, "periodsPerWeek" | "doublesPerWeek" | "library">
      >
    | undefined;
  /**
   * Which part of its library a year group teaches: Crestfield's WAEC library
   * spans three years, so SS1 takes the first third; a US course library is
   * one course, taught whole.
   */
  librarySplit: (yearGroup: string) => { index: number; parts: number };
  /** What the school calls its senior years, for the decisions file ("SS"). */
  seniorLabel: string;
  /** Whether a year group sits the longer, senior papers. */
  isSenior: (yearGroup: string) => boolean;
  staff: StaffPlan[];
  /** The room an option class sits in. */
  optionRoom: (subject: SubjectPlan, yearGroup: string) => string;
  /**
   * Which option each learner of a year group takes, in the order given.
   * Learners carry their hidden ability; the stream is their arm's.
   */
  chooseOptions: (
    cohort: { ability: number; stream?: string }[],
    options: string[],
    yearGroup: string,
  ) => string[];
  optionDecision: (yearGroups: string[]) => string;

  activityRotation: readonly (
    | "worksheet"
    | "quiz"
    | "problem set"
    | "practical"
  )[];
  differentiationWeeks: number[];
  differentiationClasses: { arm: string; subject: string }[];
  strugglingWeeks: number[];
  behindOnNotes: { arms: string[]; fromWeek: number };
  /** Weeks in which each class also gets a PDF study guide as learning material. */
  pdfHandoutWeeks: number[];
  /** The week in which the admin edits one note and a teacher reopens another. */
  lessonNoteHistoryWeek: number;
  /** A lesson note a teacher reopens after it was marked ready. */
  reopenedNote: { arm: string; subject: string; week: number };
  leftOpen: { arm: string; subject: string; week: number };
  examDays: string[];

  /** Exam sittings: start times, length and shape of the papers. */
  exams: {
    sessions: string[];
    minutes: (yearGroup: string) => number;
    theoryQuestions: (yearGroup: string) => number;
    sectionB: (yearGroup: string) => string;
    /** The printed title of a paper, without the subject. */
    title: string;
    timetableTitle: string;
    timetableIntro: string;
  };
  /** The words the school uses for its taught term in announcements and titles. */
  termName: string;
  /** School-wide announcements by week. */
  announcements: Record<number, [string, string]>;
  /** Where the "where to look" guide points: example people and places. */
  where: {
    strongArm: string;
    strugglerArm: string;
    optionYear: string;
    optionSubject: string;
    lab: string;
    scienceDepartment: string;
  };
  /** Folder under docs/ the owner's copy of the outputs goes to. */
  outputDir: string;
  /** The sentence that begins a class announcement's body. */
  classAnnouncement: (topic: string) => string;
  /** The next term's start, printed on report cards. */
  nextTermBegins: string;
  /** What the principal wrote about the school for the school guide. */
  guideNotes: string[];
  /** Text the decisions file records, which only the school can word. */
  decisionText: {
    grading: string;
    bellsLessonPeriods: string;
    classrooms: string;
    termsNote: (index: number) => string;
    examWeeksNote: string;
    examsWhen: string;
    examsOrder: string;
    examsState: string;
    examStyles: string;
    lessonCountTotals: string;
    libraries: string;
    gaps: { gap: string; why: string }[];
  };
};
