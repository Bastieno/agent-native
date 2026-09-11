import { and, eq, sql } from "drizzle-orm";
import { getDb, schema } from "../db/index.js";

/**
 * Row-level access for class-scoped data.
 *
 * The action policy answers "may a teacher grade at all". These helpers answer
 * "may THIS teacher grade THAT class's work" — the check that keeps two
 * schools, and two teachers in one school, out of each other's data.
 *
 * Rules:
 *   school_admin / subject_coordinator — any class in their own school
 *   teacher                           — classes they teach (primary or listed)
 *   student                           — classes they are actively enrolled in
 */

export interface ClassAccessActor {
  userId: string;
  schoolId: string;
  schoolRole: string;
}

/**
 * Build an actor from an email — actions carry the caller's email, not a
 * session. Returns null when the caller is not a member of any school.
 */
export async function actorForEmail(
  email: string,
): Promise<ClassAccessActor | null> {
  const db = getDb();
  const row = (await db.get(
    sql`SELECT id FROM "user" WHERE email = ${email} LIMIT 1`,
  )) as { id: string } | undefined;
  if (!row?.id) return null;
  const [profile] = await db
    .select({
      schoolId: schema.schoolProfiles.schoolId,
      schoolRole: schema.schoolProfiles.schoolRole,
    })
    .from(schema.schoolProfiles)
    .where(eq(schema.schoolProfiles.userId, row.id))
    .limit(1);
  if (!profile) return null;
  return {
    userId: row.id,
    schoolId: profile.schoolId,
    schoolRole: profile.schoolRole,
  };
}

/** The student record id for a user, or null when they have none. */
export async function studentRecordIdForUser(
  userId: string,
): Promise<string | null> {
  const db = getDb();
  const [row] = await db
    .select({ id: schema.students.id })
    .from(schema.students)
    .where(eq(schema.students.userId, userId))
    .limit(1);
  return row?.id ?? null;
}

/** The class a lesson note belongs to. */
export async function classIdForLesson(
  lessonId: string,
): Promise<string | null> {
  const db = getDb();
  const [row] = await db
    .select({ classId: schema.lessonNotes.classId })
    .from(schema.lessonNotes)
    .where(eq(schema.lessonNotes.id, lessonId))
    .limit(1);
  return row?.classId ?? null;
}

export class AccessDeniedError extends Error {
  statusCode = 403;
  constructor(message = "You do not have access to this class.") {
    super(message);
    this.name = "AccessDeniedError";
  }
}

export async function canAccessClass(
  actor: ClassAccessActor,
  classId: string,
): Promise<boolean> {
  if (!classId) return false;
  const db = getDb();

  const [cls] = await db
    .select({
      id: schema.classes.id,
      orgId: schema.classes.orgId,
      primaryTeacherUserId: schema.classes.primaryTeacherUserId,
    })
    .from(schema.classes)
    .where(eq(schema.classes.id, classId))
    .limit(1);
  if (!cls) return false;

  // Never cross school boundaries, whatever the role.
  if (cls.orgId && actor.schoolId && cls.orgId !== actor.schoolId) return false;

  if (
    actor.schoolRole === "school_admin" ||
    actor.schoolRole === "subject_coordinator"
  ) {
    return true;
  }

  if (actor.schoolRole === "teacher") {
    if (cls.primaryTeacherUserId === actor.userId) return true;
    const [assigned] = await db
      .select({ id: schema.classTeachers.id })
      .from(schema.classTeachers)
      .where(
        and(
          eq(schema.classTeachers.classId, classId),
          eq(schema.classTeachers.teacherUserId, actor.userId),
        ),
      )
      .limit(1);
    return !!assigned;
  }

  if (actor.schoolRole === "student") {
    const [enrolment] = await db
      .select({ id: schema.classEnrollments.id })
      .from(schema.classEnrollments)
      .where(
        and(
          eq(schema.classEnrollments.classId, classId),
          eq(schema.classEnrollments.studentUserId, actor.userId),
          eq(schema.classEnrollments.status, "active"),
        ),
      )
      .limit(1);
    return !!enrolment;
  }

  return false;
}

export async function assertClassAccess(
  actor: ClassAccessActor,
  classId: string,
): Promise<void> {
  if (!(await canAccessClass(actor, classId))) {
    throw new AccessDeniedError();
  }
}

/** The class an assessment belongs to, or null if it does not exist. */
export async function classIdForAssessment(
  assessmentId: string,
): Promise<string | null> {
  const db = getDb();
  const [row] = await db
    .select({ classId: schema.assessments.classId })
    .from(schema.assessments)
    .where(eq(schema.assessments.id, assessmentId))
    .limit(1);
  return row?.classId ?? null;
}

/** The class a submission belongs to, via its assessment. */
export async function classIdForSubmission(
  submissionId: string,
): Promise<string | null> {
  const db = getDb();
  const [row] = await db
    .select({ assessmentId: schema.submissions.assessmentId })
    .from(schema.submissions)
    .where(eq(schema.submissions.id, submissionId))
    .limit(1);
  if (!row?.assessmentId) return null;
  return classIdForAssessment(row.assessmentId);
}

/** The class a variant belongs to, via its assessment. */
export async function classIdForVariant(
  variantId: string,
): Promise<string | null> {
  const db = getDb();
  const [row] = await db
    .select({ assessmentId: schema.assessmentVariants.assessmentId })
    .from(schema.assessmentVariants)
    .where(eq(schema.assessmentVariants.id, variantId))
    .limit(1);
  if (!row?.assessmentId) return null;
  return classIdForAssessment(row.assessmentId);
}

export async function assertAssessmentAccess(
  actor: ClassAccessActor,
  assessmentId: string,
): Promise<void> {
  const classId = await classIdForAssessment(assessmentId);
  if (!classId) throw new AccessDeniedError("Assessment not found.");
  await assertClassAccess(actor, classId);
}

export async function assertSubmissionAccess(
  actor: ClassAccessActor,
  submissionId: string,
): Promise<void> {
  const classId = await classIdForSubmission(submissionId);
  if (!classId) throw new AccessDeniedError("Submission not found.");
  await assertClassAccess(actor, classId);
}

/** Every class id the actor may see — used to scope list queries. */
export async function accessibleClassIds(
  actor: ClassAccessActor,
): Promise<string[]> {
  const db = getDb();

  if (
    actor.schoolRole === "school_admin" ||
    actor.schoolRole === "subject_coordinator"
  ) {
    const rows = await db
      .select({ id: schema.classes.id })
      .from(schema.classes)
      .where(eq(schema.classes.orgId, actor.schoolId));
    return rows.map((r: any) => r.id);
  }

  if (actor.schoolRole === "teacher") {
    const primary = await db
      .select({ id: schema.classes.id })
      .from(schema.classes)
      .where(
        and(
          eq(schema.classes.primaryTeacherUserId, actor.userId),
          eq(schema.classes.orgId, actor.schoolId),
        ),
      );
    const assigned = await db
      .select({ id: schema.classTeachers.classId })
      .from(schema.classTeachers)
      .where(eq(schema.classTeachers.teacherUserId, actor.userId));
    return [
      ...new Set([
        ...primary.map((r: any) => r.id),
        ...assigned.map((r: any) => r.id),
      ]),
    ];
  }

  if (actor.schoolRole === "student") {
    const rows = await db
      .select({ id: schema.classEnrollments.classId })
      .from(schema.classEnrollments)
      .where(
        and(
          eq(schema.classEnrollments.studentUserId, actor.userId),
          eq(schema.classEnrollments.status, "active"),
        ),
      );
    return [...new Set(rows.map((r: any) => r.id))];
  }

  return [];
}
