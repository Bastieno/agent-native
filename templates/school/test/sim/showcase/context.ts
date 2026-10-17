import type { Client, Persona } from "../client.js";
import type { Findings } from "../findings.js";
import type {
  Showcase,
  SubjectPlan,
} from "../../scenarios/showcase-crestfield.js";
import type { ShowcaseLearner } from "./people.js";
import type { LibraryObjective } from "./curriculum.js";

/**
 * What a showcase run knows about the school it has built, passed from one
 * phase to the next.
 */

export type StaffMember = Persona & {
  key: string;
  name: string;
  schoolRole: "teacher" | "subject_coordinator";
  heads?: string;
};

export type ShowcaseArm = {
  id: string;
  name: string;
  yearGroup: string;
  stream?: string;
  homeRoom: string;
  formTeacher?: StaffMember;
};

export type ShowcaseClass = {
  id: string;
  name: string;
  subject: SubjectPlan;
  subjectId: string;
  yearGroup: string;
  gradeLevelId: string;
  /** The arm for a whole-arm class; null for an option class. */
  arm: ShowcaseArm | null;
  optionArmIds: string[];
  teacher: StaffMember;
  support: StaffMember[];
  room: string;
  /** The library this year group's scheme is drawn from. */
  library: SubjectPlan["library"];
  periodsPerWeek: number;
  doublesPerWeek: number;
};

export type Learner = Persona & {
  profile: ShowcaseLearner;
  yearGroup: string;
  arm: string;
  option?: string;
};

export type ShowcaseRun = {
  runId: string;
  domain: string;
  scenario: Showcase;
  client: Client;
  findings: Findings;
  decisions: Decisions;
  admin: Persona;
  schoolId: string;
  academicYearId: string;
  termIds: Record<string, string>;
  firstTermId: string;
  gradeLevelIds: Record<string, string>;
  departmentIds: Record<string, string>;
  subjectIds: Record<string, string>;
  staff: StaffMember[];
  arms: ShowcaseArm[];
  classes: ShowcaseClass[];
  learners: Learner[];
  /** Lesson notes by class and week, once the curriculum is built. */
  notes: Map<string, Map<number, string>>;
  /** Each subject and year group's objectives by teaching week, and its whole library. */
  weekPlan: Map<
    string,
    { byWeek: Map<number, LibraryObjective[]>; all: LibraryObjective[] }
  >;
  /** Filled as the run goes, for the outputs and the checklist. */
  record: Record<string, unknown>;
};

/** Every setting and choice the run makes, grouped the way the owner reads it. */
export const DECISION_AREAS = [
  "Identity",
  "Terms and weeks",
  "The week's bells",
  "Rooms",
  "Grading",
  "Terminology",
  "Subjects by year group and stream",
  "Option blocks",
  "Staffing and loads",
  "Lesson counts per subject",
  "Timetable generation",
  "Activity mix per subject",
  "Differentiation classes",
  "Exams",
  "Report cards",
  "Left unset, and why",
] as const;
export type DecisionArea = (typeof DECISION_AREAS)[number];

export class Decisions {
  readonly entries: { area: DecisionArea; what: string; value: string }[] = [];

  add(area: DecisionArea, what: string, value: unknown) {
    this.entries.push({
      area,
      what,
      value: typeof value === "string" ? value : JSON.stringify(value),
    });
  }
}

/** Which classes a year group's learners in one arm sit in. */
export function classesOfLearner(run: ShowcaseRun, learner: Learner) {
  return run.classes.filter(
    (c) =>
      (c.arm && c.arm.name === learner.arm) ||
      (!c.arm &&
        learner.option === c.subject.name &&
        c.yearGroup === learner.yearGroup),
  );
}

/** The learners who sit a class. */
export function learnersOf(run: ShowcaseRun, cls: ShowcaseClass): Learner[] {
  return run.learners.filter((l) =>
    cls.arm
      ? l.arm === cls.arm.name
      : l.yearGroup === cls.yearGroup && l.option === cls.subject.name,
  );
}
