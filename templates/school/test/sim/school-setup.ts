import type { Client, Persona } from "./client.js";
import type { FullSchool } from "../scenarios/nigeria-full-school.js";
import { SUBJECT_BANK } from "../scenarios/question-bank.js";
import { makeStudents, type StudentProfile } from "./population.js";
import type { Findings } from "./findings.js";
import { asList, idOf } from "./shapes.js";
import { inPool } from "./pool.js";

/**
 * A whole school, stood up the way a real one starts: an admin registers,
 * everyone else is invited, and each person signs in for themselves.
 *
 * Ten teachers rather than one is not padding. A single-class simulation
 * cannot ask the question that matters most about a school system — whether
 * one teacher can reach another's class — because there is nothing to reach.
 */

export type SimClass = {
  id: string;
  name: string;
  subject: string;
  subjectId: string;
  yearGroup: string;
  gradeLevelId: string;
  teacher: Persona;
};

export type SimStudent = Persona & {
  profile: StudentProfile;
  yearGroup: string;
};

export type FullSchoolRun = {
  runId: string;
  admin: Persona;
  schoolId: string;
  academicYearId: string;
  termId: string;
  classes: SimClass[];
  students: SimStudent[];
  gradeLevelIds: Record<string, string>;
};

const TEACHER_NAMES = [
  "Bola Adeyinka",
  "Grace Nwachukwu",
  "Samuel Okoro",
  "Hadiza Yakubu",
  "Peter Adeniyi",
  "Rita Obi",
  "Daniel Musa",
  "Patience Ekanem",
  "Joseph Olatunji",
  "Mary Chukwueke",
  "Ahmed Suleiman",
  "Esther Udo",
];

export async function standUpFullSchool(
  client: Client,
  scenario: FullSchool,
  findings: Findings,
  runId: string,
): Promise<FullSchoolRun> {
  const phase = "setup";
  const domain = `${runId}.sim.test`;

  const admin = await client.signUp(`admin@${domain}`, "admin", "admin", true);
  const created = await client.as(admin, "setup-school", {
    name: `${scenario.schoolName} (${runId})`,
    type: scenario.schoolType,
    country: scenario.country,
  });

  await client.as(admin, "manage-grade-levels", {
    levels: scenario.yearGroups.map((name, i) => ({ name, sequence: i + 1 })),
  });
  await client.as(admin, "update-school-config", {
    gradePrefix: scenario.gradePrefix,
    termStructure: scenario.termStructure,
    passMark: scenario.passMark,
    gradingScale: scenario.gradingScale,
    locale: scenario.locale,
    schoolTimezone: scenario.timezone,
    paperSize: scenario.paperSize,
    // The simulated school ranks its learners and counts a missed piece as a
    // nought, so both settings are exercised rather than left on the
    // fallback that every school would otherwise be tested on.
    rankLearners: scenario.rankLearners ?? true,
    missedWorkPolicy: scenario.missedWorkPolicy ?? "zero",
  });

  const levels = asList(
    await client.as(admin, "manage-grade-levels", { action: "list" }),
    "levels",
    "gradeLevels",
  );
  const gradeLevelIds: Record<string, string> = {};
  for (const level of levels) gradeLevelIds[level.name] = level.id;

  const year = await client.as(admin, "create-academic-year", {
    name: scenario.academicYear.name,
    startDate: scenario.academicYear.start,
    endDate: scenario.academicYear.end,
    setActive: true,
  });
  const academicYearId = idOf(year, "academicYear")!;
  const term = await client.as(admin, "create-term", {
    academicYearId,
    name: scenario.termName,
    startDate: scenario.termStart,
    endDate: scenario.termEnd,
    sequence: 1,
  });
  const termId = idOf(term, "term")!;

  // ── Subjects ───────────────────────────────────────────────────────────
  const subjectIds: Record<string, string> = {};
  for (const subject of scenario.subjects) {
    const created = await client.as(admin, "create-subject", {
      name: subject.name,
      code: subject.code,
      yearGroups: scenario.cohorts.map((c) => c.yearGroup),
    });
    subjectIds[subject.name] = idOf(created, "subject")!;
  }

  // ── Teachers: one per class ────────────────────────────────────────────
  console.log(
    `· inviting ${scenario.subjects.length * scenario.cohorts.length} teachers`,
  );
  const classPlan = scenario.cohorts.flatMap((cohort) =>
    scenario.subjects.map((subject) => ({ cohort, subject })),
  );

  const teachers = await inPool(classPlan, 6, async (plan, index) => {
    const name = TEACHER_NAMES[index % TEACHER_NAMES.length];
    const email = `teacher${index + 1}@${domain}`;
    await client.as(admin, "invite-staff", {
      email,
      name: `${name}`,
      schoolRole: "teacher",
    });
    return client.signUp(email, name, "teacher");
  });

  const staff = asList(await client.as(admin, "list-staff", {}), "active");
  findings.expect(
    phase,
    staff.length === classPlan.length + 1,
    "every invited teacher is active after signing in",
    `${staff.length} active, expected ${classPlan.length + 1} including the admin`,
  );
  for (const teacher of teachers) {
    teacher.userId =
      staff.find((s: any) => s.email === teacher.email)?.userId ??
      teacher.userId;
  }

  // ── Classes ────────────────────────────────────────────────────────────
  const classes: SimClass[] = [];
  for (const [index, plan] of classPlan.entries()) {
    const name = `${plan.cohort.yearGroup} ${plan.subject.name}`;
    const created = await client.as(admin, "create-class", {
      subjectId: subjectIds[plan.subject.name],
      gradeLevelId: gradeLevelIds[plan.cohort.yearGroup],
      academicYearId,
      termId,
      name,
      primaryTeacherUserId: teachers[index].userId,
    });
    classes.push({
      id: idOf(created, "class")!,
      name,
      subject: plan.subject.name,
      subjectId: subjectIds[plan.subject.name],
      yearGroup: plan.cohort.yearGroup,
      gradeLevelId: gradeLevelIds[plan.cohort.yearGroup],
      teacher: teachers[index],
    });
  }

  // ── Learners, one cohort per year group ────────────────────────────────
  const students: SimStudent[] = [];
  for (const [cohortIndex, cohort] of scenario.cohorts.entries()) {
    console.log(
      `· inviting ${cohort.studentCount} learners into ${cohort.yearGroup}`,
    );
    const profiles = makeStudents(
      cohort.studentCount,
      20260914 + cohortIndex * 7919,
      domain,
    ).map((p) => ({
      ...p,
      // Two cohorts drawing from the same name list would collide on
      // addresses, and the second sign-up would land on the first account.
      // A year group's name is the school's own — "JSS1", "Grade 6",
      // "Première" — so it is slugged rather than dropped into an address
      // as typed.
      email: p.email.replace(
        "@",
        `.${cohort.yearGroup.toLowerCase().replace(/[^a-z0-9]+/gu, "")}@`,
      ),
    }));

    const joined = await inPool(profiles, 6, async (profile) => {
      await client.as(admin, "invite-student", {
        email: profile.email,
        name: profile.name,
        gradeLevel: cohort.yearGroup,
      });
      const persona = await client.signUp(
        profile.email,
        profile.name,
        "student",
      );
      return { ...persona, profile, yearGroup: cohort.yearGroup };
    });
    students.push(...joined);
  }

  const roll = asList(
    await client.as(admin, "list-students", { limit: 500 }),
    "students",
  );
  findings.expect(
    phase,
    roll.length === students.length,
    "every invited learner appears on the roll",
    `${roll.length} of ${students.length}`,
  );
  for (const student of students) {
    student.studentId = roll.find((r: any) => r.email === student.email)?.id;
  }

  // Each learner takes every subject their year group is taught.
  for (const cls of classes) {
    const cohort = students.filter((s) => s.yearGroup === cls.yearGroup);
    await client.as(admin, "bulk-enroll-students", {
      classId: cls.id,
      studentUserIds: cohort.map((s) => s.userId).filter(Boolean),
    });
  }

  // ── A timetable ────────────────────────────────────────────────────────
  //
  // Without one, "what do I have today?" has nothing to answer with, and the
  // whole path — the teacher's own schedule, whether each lesson has a note
  // prepared — went untested while looking fine.
  //
  // Each class gets one period a week, spread across Monday to Friday, which
  // is enough for the question to have a real answer on any given day.
  for (const [index, cls] of classes.entries()) {
    await client.as(admin, "create-class-schedule", {
      classId: cls.id,
      dayOfWeek: (index % 5) + 1,
      startTime: `0${8 + Math.floor(index / 5)}:00`,
      endTime: `0${8 + Math.floor(index / 5)}:45`,
      periodNumber: Math.floor(index / 5) + 1,
      room: `Room ${index + 1}`,
    });
  }

  console.log(
    `· ${classes.length} classes, ${students.length} learners, ${
      classes.length * (students.length / scenario.cohorts.length)
    } enrolments, one period a week each`,
  );

  return {
    runId,
    admin,
    schoolId: created.schoolId,
    academicYearId,
    termId,
    classes,
    students,
    gradeLevelIds,
  };
}

/** The curriculum for every class, from the subject bank. */
export async function buildAllCurricula(
  client: Client,
  run: FullSchoolRun,
  scenario: FullSchool,
  findings: Findings,
): Promise<void> {
  const byYearGroup = new Map<string, SimClass[]>();
  for (const cls of run.classes) {
    byYearGroup.set(cls.yearGroup, [
      ...(byYearGroup.get(cls.yearGroup) ?? []),
      cls,
    ]);
  }

  for (const [, classes] of byYearGroup) {
    for (const cls of classes) {
      const bank = SUBJECT_BANK.find((s) => s.subject === cls.subject)!;
      for (const [index, week] of bank.weeks
        .slice(0, scenario.weeksTaught)
        .entries()) {
        if (week.objectives.length === 0) continue;
        const unit = await client.as(run.admin, "create-unit", {
          subjectId: cls.subjectId,
          gradeLevelId: cls.gradeLevelId,
          termId: run.termId,
          title: week.topic,
          weekStart: index + 1,
          weekEnd: index + 1,
          sequence: index + 1,
        });
        const unitId = idOf(unit, "unit");
        for (const objective of week.objectives) {
          await client.as(run.admin, "create-learning-objective", {
            unitId,
            description: objective,
          });
        }
      }
    }
  }

  // One planning call per subject and year group writes every class's notes.
  const planned = new Set<string>();
  for (const cls of run.classes) {
    const key = `${cls.subjectId}:${cls.gradeLevelId}`;
    if (planned.has(key)) continue;
    planned.add(key);
    const result = await client.as(run.admin, "plan-lesson-notes", {
      subjectId: cls.subjectId,
      gradeLevelId: cls.gradeLevelId,
      termId: run.termId,
      studentNotes: true,
      confirm: true,
    });
    findings.expect(
      "curriculum",
      (result?.lessonNotesCreated ?? 0) > 0,
      `${cls.name} gets lesson notes from its units`,
      JSON.stringify(result).slice(0, 200),
    );
  }
}
