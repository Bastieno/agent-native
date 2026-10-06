import { SUBJECT_BANK } from "./question-bank.js";
import type { Scenario } from "./nigeria-secondary.js";

/**
 * A whole school rather than one class: two year groups, five subjects
 * each, ten teachers, forty learners.
 *
 * The shape matters. Ten unrelated classes of twenty would be ten
 * simulations in a trench coat; a school is the same learners meeting
 * different teachers all week, which is what makes the interesting
 * questions askable — can a teacher see a class that is not theirs, does a
 * learner's progress add up across five subjects, does one teacher's
 * marking show up in another's gradebook.
 */

export type FullSchool = Omit<
  Scenario,
  "subject" | "teacher" | "className" | "weeks"
> & {
  /** One per year group: the learners who move through it together. */
  cohorts: { yearGroup: string; studentCount: number }[];
  /** Every subject each cohort takes, and who teaches it. */
  subjects: { name: string; code: string }[];
  weeksTaught: number;
};

export const fullSchool: FullSchool = {
  key: "nigeria-full-school",
  schoolName: "Simulation Secondary School",
  schoolType: "secondary",
  country: "Nigeria",
  locale: "en-NG",
  paperSize: "a4",
  timezone: "Africa/Lagos",
  gradePrefix: "Class",
  termStructure: "terms",
  passMark: 40,
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
  yearGroups: ["JSS1", "JSS2", "JSS3", "SS1", "SS2", "SS3"],
  academicYear: { name: "2026/2027", start: "2026-09-14", end: "2027-07-23" },
  termName: "First Term",
  termStart: "2026-09-14",
  termEnd: "2026-12-11",
  studentCount: 20,

  cohorts: [
    { yearGroup: "JSS1", studentCount: 20 },
    { yearGroup: "JSS2", studentCount: 20 },
  ],
  subjects: SUBJECT_BANK.map((s) => ({ name: s.subject, code: s.code })),
  weeksTaught: 6,
};

export default fullSchool;
