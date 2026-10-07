import { SUBJECT_BANK } from "./question-bank.js";
import type { FullSchool } from "./nigeria-full-school.js";

/**
 * The same six weeks, taught in an American middle school.
 *
 * This scenario exists to be compared against the Nigerian one. Every school
 * -specific thing is deliberately different — semesters instead of terms,
 * Grade 6 and 7 instead of JSS1 and JSS2, A to F instead of A1 to F9, Letter
 * paper, en-US dates, no ranking — so that anything which comes out the same
 * in both runs is something the app decided rather than the school.
 *
 * That is the whole test. A hardcoded Nigerian assumption is invisible when
 * you only ever run a Nigerian school: it looks like the right answer.
 */
export const usaK12: FullSchool = {
  key: "usa-k12",
  schoolName: "Lakeside Middle School",
  schoolType: "middle",
  country: "United States",
  locale: "en-US",
  paperSize: "letter",
  timezone: "America/Chicago",
  gradePrefix: "Grade",
  termStructure: "semesters",
  passMark: 60,
  gradingScale: {
    type: "letter",
    levels: [
      { grade: "A", min: 90, max: 100, label: "Excellent" },
      { grade: "B", min: 80, max: 89, label: "Above average" },
      { grade: "C", min: 70, max: 79, label: "Average" },
      { grade: "D", min: 60, max: 69, label: "Below average" },
      { grade: "F", min: 0, max: 59, label: "Failing" },
    ],
  },
  yearGroups: [
    "Kindergarten",
    "Grade 1",
    "Grade 2",
    "Grade 3",
    "Grade 4",
    "Grade 5",
    "Grade 6",
    "Grade 7",
    "Grade 8",
  ],
  academicYear: { name: "2026–2027", start: "2026-08-24", end: "2027-05-28" },
  termName: "Fall Semester",
  termStart: "2026-08-24",
  termEnd: "2026-12-18",
  studentCount: 20,

  cohorts: [
    { yearGroup: "Grade 6", studentCount: 20 },
    { yearGroup: "Grade 7", studentCount: 20 },
  ],
  // The same question bank: what is taught is not what this run is testing,
  // and keeping it identical means any difference in the output is the
  // school's shape rather than its content.
  subjects: SUBJECT_BANK.map((s) => ({ name: s.subject, code: s.code })),
  weeksTaught: 6,
  // Many American schools do not publish class rank, and count a missing
  // assignment as a zero. Both are the opposite of the Nigerian scenario on
  // purpose.
  rankLearners: false,
  missedWorkPolicy: "zero",
};

export default usaK12;
