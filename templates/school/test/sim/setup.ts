import { Client, type Persona } from "./client.js";
import type { Scenario } from "../scenarios/nigeria-secondary.js";
import { makeStudents, type StudentProfile } from "./population.js";
import type { Findings } from "./findings.js";
import { asList, idOf } from "./shapes.js";

/**
 * Standing a school up from nothing, the way a real one starts.
 *
 * An admin registers, which creates their school; everyone else is invited
 * into it and activated by signing in. Nothing is written straight to the
 * database, so the invitation flow, the auto-activation and the role checks
 * are all exercised on the way past — and when one of them is broken, the
 * simulation finds out here rather than three phases later.
 */

export type School = {
  runId: string;
  admin: Persona;
  teacher: Persona;
  students: Array<Persona & { profile: StudentProfile }>;
  schoolId: string;
  gradeLevelId: string;
  academicYearId: string;
  termId: string;
  subjectId: string;
  classId: string;
};

export async function standUpSchool(
  client: Client,
  scenario: Scenario,
  findings: Findings,
  runId: string,
): Promise<School> {
  const phase = "setup";
  const domain = `${runId}.sim.test`;

  console.log("· registering the admin, which creates the school");
  const admin = await client.signUp(`admin@${domain}`, "admin", "admin");
  const created = await client.as(admin, "setup-school", {
    name: `${scenario.schoolName} (${runId})`,
    type: scenario.schoolType,
    country: scenario.country,
  });
  findings.expect(
    phase,
    !!created?.schoolId,
    "setup-school returns a school id",
  );

  // The school's own shape: its year groups, its term structure, its scale.
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
  });

  const levels = await client.as(admin, "manage-grade-levels", {
    action: "list",
  });
  const levelList: any[] = Array.isArray(levels)
    ? levels
    : (levels?.levels ?? []);
  const gradeLevel = levelList.find(
    (l: any) => l.name === scenario.subject.yearGroup,
  );
  if (!gradeLevel) {
    throw new Error(
      `year group ${scenario.subject.yearGroup} was not created; got ${levelList
        .map((l: any) => l.name)
        .join(", ")}`,
    );
  }

  const year = await client.as(admin, "create-academic-year", {
    name: scenario.academicYear.name,
    startDate: scenario.academicYear.start,
    endDate: scenario.academicYear.end,
    setActive: true,
  });
  const academicYearId = idOf(year, "academicYear", "yearId");
  const term = await client.as(admin, "create-term", {
    academicYearId,
    name: scenario.termName,
    startDate: scenario.termStart,
    endDate: scenario.termEnd,
    sequence: 1,
  });
  const termId = idOf(term, "term", "termId");

  const subject = await client.as(admin, "create-subject", {
    name: scenario.subject.name,
    code: scenario.subject.code,
    yearGroups: [scenario.subject.yearGroup],
  });
  const subjectId = idOf(subject, "subject", "subjectId");

  // ── The teacher ────────────────────────────────────────────────────────
  console.log("· inviting the teacher, who then signs in");
  await client.as(admin, "invite-staff", {
    email: scenario.teacher.email.replace("@sim.test", `@${domain}`),
    name: scenario.teacher.name,
    schoolRole: "teacher",
  });
  const teacherEmail = scenario.teacher.email.replace(
    "@sim.test",
    `@${domain}`,
  );
  const teacher = await client.signUp(teacherEmail, "teacher", "teacher");

  // Signing in is what activates an invited member; if it has not, every
  // later phase fails in a way that looks like something else.
  const staff = await client.as(admin, "list-staff", {});
  // list-staff answers with { active, pending }.
  const staffList = asList(staff, "active", "staff");
  const activated = staffList.find((s: any) => s.email === teacherEmail);
  findings.expect(
    phase,
    !!activated,
    "a teacher who signs in appears as active staff",
    `list-staff returned ${staffList.length} rows`,
  );
  teacher.userId = activated?.userId ?? teacher.userId;

  const cls = await client.as(admin, "create-class", {
    subjectId,
    gradeLevelId: gradeLevel.id,
    academicYearId,
    termId,
    name: scenario.className,
    primaryTeacherUserId: teacher.userId,
  });
  const classId = idOf(cls, "class", "classId");
  findings.expect(phase, !!classId, "the class is created with its teacher");

  // ── The learners ───────────────────────────────────────────────────────
  console.log(`· inviting ${scenario.studentCount} students`);
  const profiles = makeStudents(scenario.studentCount, 20260914, domain);
  const students: Array<Persona & { profile: StudentProfile }> = [];
  for (const profile of profiles) {
    await client.as(admin, "invite-student", {
      email: profile.email,
      name: profile.name,
      gradeLevel: scenario.subject.yearGroup,
    });
    const persona = await client.signUp(profile.email, profile.name, "student");
    students.push({ ...persona, profile });
  }

  const roll = await client.as(admin, "list-students", { limit: 200 });
  const rollList = asList(roll, "students");
  findings.expect(
    phase,
    rollList.length === scenario.studentCount,
    `all ${scenario.studentCount} invited students appear on the roll`,
    `found ${rollList.length}`,
  );
  // The year group given at invitation should be on the record, not lost.
  const placed = rollList.filter((s: any) => !!s.gradeLevelId).length;
  findings.expect(
    phase,
    placed === rollList.length,
    "every student's year group survived the invitation",
    `${placed} of ${rollList.length} have one`,
  );
  for (const student of students) {
    const row = rollList.find((s: any) => s.email === student.email);
    student.studentId = row?.id;
  }

  await client.as(admin, "bulk-enroll-students", {
    classId,
    studentUserIds: students.map((s) => s.userId).filter(Boolean),
  });
  const enrolled = await client.as(admin, "list-class-students", { classId });
  const enrolledList = asList(enrolled, "students", "enrolled");
  findings.expect(
    phase,
    enrolledList.length === scenario.studentCount,
    "every student is enrolled in the class",
    `${enrolledList.length} enrolled`,
  );

  return {
    runId,
    admin,
    teacher,
    students,
    schoolId: created.schoolId,
    gradeLevelId: gradeLevel.id,
    academicYearId,
    termId,
    subjectId,
    classId,
  };
}
