import {
  defineEventHandler,
  getRouterParam,
  getQuery,
  createError,
} from "h3";
import { getSession, runWithRequestContext } from "@agent-native/core/server";
import { getDb, schema } from "../db/index.js";
import { eq, and, desc, asc, inArray, sql, count } from "drizzle-orm";
import { getOrgSetting } from "@agent-native/core/settings";

// ─── Helper ──────────────────────────────────────────────────────────────────

async function requireSession(event: any) {
  const session = await getSession(event);
  if (!session?.email) {
    throw createError({ statusCode: 401, message: "Unauthorized" });
  }
  return session;
}

async function getSchoolProfile(db: any, userId: string) {
  const profile = await db
    .select()
    .from(schema.schoolProfiles)
    .where(eq(schema.schoolProfiles.userId, userId))
    .limit(1);
  return profile[0] ?? null;
}

// ─── Session info (role detection) ───────────────────────────────────────────

export const getSessionInfo = defineEventHandler(async (event) => {
  const session = await requireSession(event);
  const db = getDb();
  const profile = await getSchoolProfile(db, session.userId);
  return {
    user: { id: session.userId, email: session.email, name: session.name },
    schoolRole: profile?.schoolRole ?? null,
    schoolId: profile?.schoolId ?? null,
  };
});

// ─── Stats (admin overview) ───────────────────────────────────────────────────

export const getStats = defineEventHandler(async (event) => {
  const session = await requireSession(event);
  const db = getDb();
  const profile = await getSchoolProfile(db, session.userId);
  if (!profile) return { staffCount: 0, studentCount: 0, classCount: 0, subjectCount: 0 };

  const schoolId = profile.schoolId;

  const [staffRows, studentRows, classRows, subjectRows] = await Promise.all([
    db
      .select({ c: count() })
      .from(schema.schoolProfiles)
      .where(
        and(
          eq(schema.schoolProfiles.schoolId, schoolId),
          inArray(schema.schoolProfiles.schoolRole, ["teacher", "subject_coordinator", "school_admin"]),
          eq(schema.schoolProfiles.status, "active"),
        ),
      ),
    db
      .select({ c: count() })
      .from(schema.schoolProfiles)
      .where(
        and(
          eq(schema.schoolProfiles.schoolId, schoolId),
          eq(schema.schoolProfiles.schoolRole, "student"),
          eq(schema.schoolProfiles.status, "active"),
        ),
      ),
    db
      .select({ c: count() })
      .from(schema.classes)
      .where(and(eq(schema.classes.orgId, schoolId), eq(schema.classes.status, "active"))),
    db
      .select({ c: count() })
      .from(schema.subjects)
      .where(and(eq(schema.subjects.orgId, schoolId), eq(schema.subjects.status, "active"))),
  ]);

  return {
    staffCount: staffRows[0]?.c ?? 0,
    studentCount: studentRows[0]?.c ?? 0,
    classCount: classRows[0]?.c ?? 0,
    subjectCount: subjectRows[0]?.c ?? 0,
  };
});

// ─── School config ────────────────────────────────────────────────────────────

export const getSchoolConfig = defineEventHandler(async (event) => {
  const session = await requireSession(event);
  const db = getDb();
  const profile = await getSchoolProfile(db, session.userId);
  if (!profile) return {};
  const cfg = await getOrgSetting(profile.schoolId, "school-config");
  return cfg ?? {};
});

// ─── Custom fields schema ─────────────────────────────────────────────────────

export const getCustomFieldsSchema = defineEventHandler(async (event) => {
  const session = await requireSession(event);
  const db = getDb();
  const profile = await getSchoolProfile(db, session.userId);
  if (!profile) return {};
  const schema2 = await getOrgSetting(profile.schoolId, "custom-fields-schema");
  return schema2 ?? {};
});

// ─── Subjects ─────────────────────────────────────────────────────────────────

export const listSubjects = defineEventHandler(async (event) => {
  const session = await requireSession(event);
  const db = getDb();
  const profile = await getSchoolProfile(db, session.userId);
  if (!profile) return [];

  return db
    .select()
    .from(schema.subjects)
    .where(eq(schema.subjects.orgId, profile.schoolId))
    .orderBy(asc(schema.subjects.position));
});

export const getSubject = defineEventHandler(async (event) => {
  const session = await requireSession(event);
  const subjectId = getRouterParam(event, "subjectId");
  if (!subjectId) throw createError({ statusCode: 400, message: "Missing subjectId" });

  const db = getDb();
  const profile = await getSchoolProfile(db, session.userId);
  if (!profile) throw createError({ statusCode: 403, message: "Forbidden" });

  const rows = await db
    .select()
    .from(schema.subjects)
    .where(and(eq(schema.subjects.id, subjectId), eq(schema.subjects.orgId, profile.schoolId)))
    .limit(1);
  if (!rows[0]) throw createError({ statusCode: 404, message: "Not found" });
  return rows[0];
});

// ─── Units ────────────────────────────────────────────────────────────────────

export const listUnits = defineEventHandler(async (event) => {
  const session = await requireSession(event);
  const db = getDb();
  const profile = await getSchoolProfile(db, session.userId);
  if (!profile) return [];

  const q = getQuery(event);
  const subjectId = q.subjectId as string | undefined;

  const conditions: any[] = [eq(schema.units.orgId, profile.schoolId)];
  if (subjectId) conditions.push(eq(schema.units.subjectId, subjectId));

  const units = await db
    .select()
    .from(schema.units)
    .where(and(...conditions))
    .orderBy(asc(schema.units.sequence));

  // Attach learning objectives
  const unitIds = units.map((u: any) => u.id);
  if (unitIds.length === 0) return [];

  const objectives = await db
    .select()
    .from(schema.learningObjectives)
    .where(inArray(schema.learningObjectives.unitId, unitIds))
    .orderBy(asc(schema.learningObjectives.sequence));

  const objsByUnit: Record<string, any[]> = {};
  for (const obj of objectives) {
    if (!objsByUnit[obj.unitId]) objsByUnit[obj.unitId] = [];
    objsByUnit[obj.unitId].push(obj);
  }

  return units.map((u: any) => ({ ...u, learningObjectives: objsByUnit[u.id] ?? [] }));
});

// ─── Classes ─────────────────────────────────────────────────────────────────

export const listClasses = defineEventHandler(async (event) => {
  const session = await requireSession(event);
  const db = getDb();
  const profile = await getSchoolProfile(db, session.userId);
  if (!profile) return [];

  const rows = await db
    .select({
      id: schema.classes.id,
      name: schema.classes.name,
      status: schema.classes.status,
      primaryTeacherUserId: schema.classes.primaryTeacherUserId,
      subjectId: schema.classes.subjectId,
      gradeLevelId: schema.classes.gradeLevelId,
      subjectName: schema.subjects.name,
      gradeLevelName: schema.gradeLevels.name,
    })
    .from(schema.classes)
    .leftJoin(schema.subjects, eq(schema.classes.subjectId, schema.subjects.id))
    .leftJoin(schema.gradeLevels, eq(schema.classes.gradeLevelId, schema.gradeLevels.id))
    .where(eq(schema.classes.orgId, profile.schoolId));

  // Enrollment counts
  const classIds = rows.map((r: any) => r.id);
  if (classIds.length === 0) return rows;

  const enrollments = await db
    .select({ classId: schema.classEnrollments.classId, c: count() })
    .from(schema.classEnrollments)
    .where(
      and(
        inArray(schema.classEnrollments.classId, classIds),
        eq(schema.classEnrollments.status, "active"),
      ),
    )
    .groupBy(schema.classEnrollments.classId);

  const countMap: Record<string, number> = {};
  for (const e of enrollments) countMap[e.classId] = Number(e.c);

  return rows.map((r: any) => ({ ...r, enrollmentCount: countMap[r.id] ?? 0 }));
});

// ─── Teacher's own classes ────────────────────────────────────────────────────

export const listMyClasses = defineEventHandler(async (event) => {
  const session = await requireSession(event);
  const db = getDb();
  const profile = await getSchoolProfile(db, session.userId);
  if (!profile) return [];

  const isStudent = profile.schoolRole === "student";

  if (isStudent) {
    // Get enrolled classes
    const enrollments = await db
      .select({ classId: schema.classEnrollments.classId })
      .from(schema.classEnrollments)
      .where(
        and(
          eq(schema.classEnrollments.studentUserId, session.userId),
          eq(schema.classEnrollments.status, "active"),
        ),
      );

    const classIds = enrollments.map((e: any) => e.classId);
    if (classIds.length === 0) return [];

    const rows = await db
      .select({
        id: schema.classes.id,
        name: schema.classes.name,
        status: schema.classes.status,
        primaryTeacherUserId: schema.classes.primaryTeacherUserId,
        subjectName: schema.subjects.name,
      })
      .from(schema.classes)
      .leftJoin(schema.subjects, eq(schema.classes.subjectId, schema.subjects.id))
      .where(inArray(schema.classes.id, classIds));

    // Pending assessments per class
    return rows.map((r: any) => ({ ...r, pendingAssessments: 0, teacherName: null }));
  } else {
    // Teacher's assigned classes
    const teacherClassRows = await db
      .select({ classId: schema.classTeachers.classId })
      .from(schema.classTeachers)
      .where(eq(schema.classTeachers.teacherUserId, session.userId));

    const primaryClassIds = (
      await db
        .select({ id: schema.classes.id })
        .from(schema.classes)
        .where(eq(schema.classes.primaryTeacherUserId, session.userId))
    ).map((r: any) => r.id);

    const allClassIds = [
      ...new Set([...teacherClassRows.map((r: any) => r.classId), ...primaryClassIds]),
    ];
    if (allClassIds.length === 0) return [];

    const rows = await db
      .select({
        id: schema.classes.id,
        name: schema.classes.name,
        status: schema.classes.status,
        subjectName: schema.subjects.name,
        gradeLevelName: schema.gradeLevels.name,
      })
      .from(schema.classes)
      .leftJoin(schema.subjects, eq(schema.classes.subjectId, schema.subjects.id))
      .leftJoin(schema.gradeLevels, eq(schema.classes.gradeLevelId, schema.gradeLevels.id))
      .where(inArray(schema.classes.id, allClassIds));

    const enrollments = await db
      .select({ classId: schema.classEnrollments.classId, c: count() })
      .from(schema.classEnrollments)
      .where(
        and(
          inArray(schema.classEnrollments.classId, allClassIds),
          eq(schema.classEnrollments.status, "active"),
        ),
      )
      .groupBy(schema.classEnrollments.classId);

    const countMap: Record<string, number> = {};
    for (const e of enrollments) countMap[e.classId] = Number(e.c);

    return rows.map((r: any) => ({ ...r, enrollmentCount: countMap[r.id] ?? 0 }));
  }
});

// ─── Class detail (student view) ─────────────────────────────────────────────

export const getMyClassDetail = defineEventHandler(async (event) => {
  const session = await requireSession(event);
  const classId = getRouterParam(event, "classId");
  if (!classId) throw createError({ statusCode: 400, message: "Missing classId" });

  const db = getDb();
  const profile = await getSchoolProfile(db, session.userId);
  if (!profile) throw createError({ statusCode: 403, message: "Forbidden" });

  const classRows = await db
    .select({
      id: schema.classes.id,
      name: schema.classes.name,
      subjectName: schema.subjects.name,
      primaryTeacherUserId: schema.classes.primaryTeacherUserId,
    })
    .from(schema.classes)
    .leftJoin(schema.subjects, eq(schema.classes.subjectId, schema.subjects.id))
    .where(eq(schema.classes.id, classId))
    .limit(1);

  if (!classRows[0]) throw createError({ statusCode: 404, message: "Not found" });
  const cls = classRows[0];

  const [lessons, assessments] = await Promise.all([
    db
      .select({ id: schema.lessonNotes.id, title: schema.lessonNotes.title, summary: schema.lessonNotes.summary })
      .from(schema.lessonNotes)
      .where(and(eq(schema.lessonNotes.classId, classId), eq(schema.lessonNotes.status, "finalized")))
      .orderBy(desc(schema.lessonNotes.createdAt))
      .limit(10),
    db
      .select({ id: schema.assessments.id, title: schema.assessments.title, assessmentType: schema.assessments.assessmentType, dueDate: schema.assessments.dueDate, status: schema.assessments.status })
      .from(schema.assessments)
      .where(and(eq(schema.assessments.classId, classId), eq(schema.assessments.status, "published")))
      .orderBy(asc(schema.assessments.dueDate)),
  ]);

  return { cls: { ...cls, teacherName: null }, lessons, assessments };
});

// ─── Students ─────────────────────────────────────────────────────────────────

export const listMyStudents = defineEventHandler(async (event) => {
  const session = await requireSession(event);
  const db = getDb();
  const profile = await getSchoolProfile(db, session.userId);
  if (!profile) return [];

  // Get classes this teacher is in
  const teacherClasses = await db
    .select({ classId: schema.classTeachers.classId })
    .from(schema.classTeachers)
    .where(eq(schema.classTeachers.teacherUserId, session.userId));

  const primaryClasses = await db
    .select({ id: schema.classes.id })
    .from(schema.classes)
    .where(
      and(
        eq(schema.classes.primaryTeacherUserId, session.userId),
        eq(schema.classes.orgId, profile.schoolId),
      ),
    );

  const classIds = [
    ...new Set([
      ...teacherClasses.map((r: any) => r.classId),
      ...primaryClasses.map((r: any) => r.id),
    ]),
  ];
  if (classIds.length === 0) return [];

  const enrollments = await db
    .select({ studentUserId: schema.classEnrollments.studentUserId, classId: schema.classEnrollments.classId })
    .from(schema.classEnrollments)
    .where(
      and(
        inArray(schema.classEnrollments.classId, classIds),
        eq(schema.classEnrollments.status, "active"),
      ),
    );

  const studentUserIds = [...new Set(enrollments.map((e: any) => e.studentUserId))];
  if (studentUserIds.length === 0) return [];

  const categories = await db
    .select()
    .from(schema.studentCategories)
    .where(inArray(schema.studentCategories.classId, classIds))
    .orderBy(desc(schema.studentCategories.assessedAt));

  const latestCategory: Record<string, string> = {};
  for (const cat of categories) {
    const key = `${cat.studentId}-${cat.classId}`;
    if (!latestCategory[key]) latestCategory[key] = cat.category;
  }

  return studentUserIds.map((userId: string) => ({
    id: userId,
    name: null,
    email: null,
    category: null,
    averageScore: null,
    completionRate: null,
    className: null,
  }));
});

// ─── Gradebook ────────────────────────────────────────────────────────────────

export const getGradebook = defineEventHandler(async (event) => {
  const session = await requireSession(event);
  const classId = getRouterParam(event, "classId");
  if (!classId) throw createError({ statusCode: 400, message: "Missing classId" });

  const db = getDb();
  const profile = await getSchoolProfile(db, session.userId);
  if (!profile) throw createError({ statusCode: 403, message: "Forbidden" });

  const classRows = await db
    .select({ id: schema.classes.id, name: schema.classes.name })
    .from(schema.classes)
    .where(eq(schema.classes.id, classId))
    .limit(1);
  if (!classRows[0]) throw createError({ statusCode: 404, message: "Not found" });

  const assessments = await db
    .select({ id: schema.assessments.id, title: schema.assessments.title, totalPoints: schema.assessments.totalPoints })
    .from(schema.assessments)
    .where(and(eq(schema.assessments.classId, classId), eq(schema.assessments.status, "published")));

  const enrollments = await db
    .select({ studentUserId: schema.classEnrollments.studentUserId })
    .from(schema.classEnrollments)
    .where(and(eq(schema.classEnrollments.classId, classId), eq(schema.classEnrollments.status, "active")));

  const studentIds = enrollments.map((e: any) => e.studentUserId);
  if (studentIds.length === 0) return { className: classRows[0].name, assessments, students: [] };

  const assessmentIds = assessments.map((a: any) => a.id);
  const grades =
    assessmentIds.length > 0
      ? await db
          .select()
          .from(schema.grades)
          .where(
            and(
              inArray(schema.grades.studentId, studentIds),
              inArray(schema.grades.assessmentId, assessmentIds),
            ),
          )
      : [];

  const gradeMap: Record<string, Record<string, any>> = {};
  for (const g of grades) {
    if (!gradeMap[g.studentId]) gradeMap[g.studentId] = {};
    gradeMap[g.studentId][g.assessmentId] = g;
  }

  const students = studentIds.map((sid: string) => ({
    id: sid,
    name: sid,
    grades: gradeMap[sid] ?? {},
  }));

  return { className: classRows[0].name, assessments, students };
});

// ─── Analytics ────────────────────────────────────────────────────────────────

export const getSchoolAnalytics = defineEventHandler(async (event) => {
  const session = await requireSession(event);
  const db = getDb();
  const profile = await getSchoolProfile(db, session.userId);
  if (!profile) return null;
  // Simple stub — the agent populates via get-school-analytics action
  return {
    schoolAverage: null,
    completionRate: null,
    activeStudents: null,
    gradedSubmissions: null,
    bySubject: [],
    byGradeLevel: [],
  };
});

export const getMyAnalytics = defineEventHandler(async (event) => {
  const session = await requireSession(event);
  const db = getDb();

  const primaryClasses = await db
    .select({ id: schema.classes.id, name: schema.classes.name })
    .from(schema.classes)
    .where(eq(schema.classes.primaryTeacherUserId, session.userId));

  if (primaryClasses.length === 0) return null;

  const classIds = primaryClasses.map((c: any) => c.id);

  const enrollmentCounts = await db
    .select({ classId: schema.classEnrollments.classId, c: count() })
    .from(schema.classEnrollments)
    .where(
      and(
        inArray(schema.classEnrollments.classId, classIds),
        eq(schema.classEnrollments.status, "active"),
      ),
    )
    .groupBy(schema.classEnrollments.classId);

  const countMap: Record<string, number> = {};
  for (const e of enrollmentCounts) countMap[e.classId] = Number(e.c);

  return {
    overallAverage: null,
    pendingGrading: 0,
    strugglingCount: 0,
    byClass: primaryClasses.map((c: any) => ({
      classId: c.id,
      className: c.name,
      averageScore: null,
      completionRate: null,
      studentCount: countMap[c.id] ?? 0,
      pendingGrading: 0,
      strugglingCount: 0,
    })),
  };
});

// ─── My assessments (student) ─────────────────────────────────────────────────

export const getMyAssessments = defineEventHandler(async (event) => {
  const session = await requireSession(event);
  const db = getDb();

  const assigned = await db
    .select()
    .from(schema.studentAssessments)
    .where(eq(schema.studentAssessments.studentId, session.userId));

  if (assigned.length === 0) return [];

  const assessmentIds = assigned.map((a: any) => a.assessmentId);
  const assessments = await db
    .select()
    .from(schema.assessments)
    .where(inArray(schema.assessments.id, assessmentIds));

  const submissions = await db
    .select()
    .from(schema.submissions)
    .where(
      and(
        eq(schema.submissions.studentId, session.userId),
        inArray(schema.submissions.assessmentId, assessmentIds),
      ),
    );

  const submissionMap: Record<string, any> = {};
  for (const s of submissions) submissionMap[s.assessmentId] = s;

  return assessments.map((a: any) => ({
    id: a.id,
    title: a.title,
    assessmentType: a.assessmentType,
    dueDate: a.dueDate,
    status: a.status,
    submissionStatus: submissionMap[a.id]?.status ?? "not_started",
  }));
});

// ─── My grades (student) ──────────────────────────────────────────────────────

export const getMyGrades = defineEventHandler(async (event) => {
  const session = await requireSession(event);
  const db = getDb();

  const grades = await db
    .select()
    .from(schema.grades)
    .where(
      and(eq(schema.grades.studentId, session.userId), eq(schema.grades.isPublished, 1 as any)),
    )
    .orderBy(desc(schema.grades.gradedAt));

  if (grades.length === 0) return [];

  const assessmentIds = [...new Set(grades.map((g: any) => g.assessmentId))];
  const assessments = await db
    .select({ id: schema.assessments.id, title: schema.assessments.title, assessmentType: schema.assessments.assessmentType, classId: schema.assessments.classId })
    .from(schema.assessments)
    .where(inArray(schema.assessments.id, assessmentIds));

  const classIds = [...new Set(assessments.map((a: any) => a.classId).filter(Boolean))];
  const classes =
    classIds.length > 0
      ? await db
          .select({ id: schema.classes.id, name: schema.classes.name })
          .from(schema.classes)
          .where(inArray(schema.classes.id, classIds))
      : [];

  const assessmentMap: Record<string, any> = {};
  for (const a of assessments) assessmentMap[a.id] = a;
  const classMap: Record<string, any> = {};
  for (const c of classes) classMap[c.id] = c;

  return grades.map((g: any) => {
    const assessment = assessmentMap[g.assessmentId];
    const cls = assessment ? classMap[assessment.classId] : null;
    return {
      id: g.id,
      score: g.score,
      maxScore: g.maxScore,
      percentage: g.percentage,
      letterGrade: g.letterGrade,
      feedback: g.feedback,
      gradedAt: g.gradedAt,
      assessmentTitle: assessment?.title ?? "—",
      assessmentType: assessment?.assessmentType ?? "—",
      className: cls?.name ?? "—",
    };
  });
});

// ─── My progress (student) ───────────────────────────────────────────────────

export const getMyProgress = defineEventHandler(async (event) => {
  const session = await requireSession(event);
  const db = getDb();

  const grades = await db
    .select()
    .from(schema.grades)
    .where(
      and(eq(schema.grades.studentId, session.userId), eq(schema.grades.isPublished, 1 as any)),
    );

  if (grades.length === 0) {
    return { overallAverage: null, assignmentsCompleted: 0, completionRate: null, classSummaries: [] };
  }

  const assessmentIds = [...new Set(grades.map((g: any) => g.assessmentId))];
  const assessments = await db
    .select({ id: schema.assessments.id, classId: schema.assessments.classId })
    .from(schema.assessments)
    .where(inArray(schema.assessments.id, assessmentIds));

  const classIds = [...new Set(assessments.map((a: any) => a.classId).filter(Boolean))];

  const classMap: Record<string, any> = {};
  if (classIds.length > 0) {
    const classes = await db
      .select({ id: schema.classes.id, name: schema.classes.name })
      .from(schema.classes)
      .where(inArray(schema.classes.id, classIds));
    for (const c of classes) classMap[c.id] = c;
  }

  const assessmentClassMap: Record<string, string> = {};
  for (const a of assessments) assessmentClassMap[a.id] = a.classId;

  const byClass: Record<string, number[]> = {};
  for (const g of grades) {
    const classId = assessmentClassMap[g.assessmentId];
    if (!classId) continue;
    if (!byClass[classId]) byClass[classId] = [];
    if (g.percentage != null) byClass[classId].push(parseFloat(g.percentage));
  }

  const classSummaries = Object.entries(byClass).map(([classId, scores]) => {
    const avg = scores.length > 0 ? (scores.reduce((s, n) => s + n, 0) / scores.length).toFixed(1) : null;
    const isStruggling = avg !== null && parseFloat(avg) < 50;
    return {
      classId: classMap[classId]?.name ?? classId,
      averageScore: avg,
      completionRate: 100,
      gradedCount: scores.length,
      totalAssessments: scores.length,
      isStruggling,
    };
  });

  const allScores = grades.map((g: any) => g.percentage ? parseFloat(g.percentage) : null).filter((n): n is number => n !== null);
  const overallAverage = allScores.length > 0 ? Math.round(allScores.reduce((s, n) => s + n, 0) / allScores.length) : null;

  return {
    overallAverage,
    assignmentsCompleted: grades.length,
    completionRate: 100,
    classSummaries,
  };
});

// ─── Curriculum drafts ────────────────────────────────────────────────────────

export const getCurriculumDraft = defineEventHandler(async (event) => {
  const session = await requireSession(event);
  const draftId = getRouterParam(event, "draftId");
  if (!draftId) throw createError({ statusCode: 400, message: "Missing draftId" });

  const db = getDb();
  const profile = await getSchoolProfile(db, session.userId);
  if (!profile) throw createError({ statusCode: 403, message: "Forbidden" });

  const rows = await db
    .select()
    .from(schema.curriculumDrafts)
    .where(and(eq(schema.curriculumDrafts.id, draftId), eq(schema.curriculumDrafts.orgId, profile.schoolId)))
    .limit(1);

  if (!rows[0]) throw createError({ statusCode: 404, message: "Not found" });

  const draft = rows[0];
  return {
    ...draft,
    stateJson: draft.stateJson ? JSON.parse(draft.stateJson) : null,
  };
});

// ─── Lessons ─────────────────────────────────────────────────────────────────

export const getLessonNote = defineEventHandler(async (event) => {
  const session = await requireSession(event);
  const lessonId = getRouterParam(event, "lessonId");
  if (!lessonId) throw createError({ statusCode: 400, message: "Missing lessonId" });

  const db = getDb();
  const rows = await db
    .select()
    .from(schema.lessonNotes)
    .where(eq(schema.lessonNotes.id, lessonId))
    .limit(1);

  if (!rows[0]) throw createError({ statusCode: 404, message: "Not found" });
  return rows[0];
});

export const finalizeLessonNote = defineEventHandler(async (event) => {
  const session = await requireSession(event);
  const lessonId = getRouterParam(event, "lessonId");
  if (!lessonId) throw createError({ statusCode: 400, message: "Missing lessonId" });

  const db = getDb();
  await db
    .update(schema.lessonNotes)
    .set({ status: "finalized", updatedAt: new Date().toISOString() })
    .where(eq(schema.lessonNotes.id, lessonId));

  return { success: true };
});

// ─── Assessments ─────────────────────────────────────────────────────────────

export const getAssessment = defineEventHandler(async (event) => {
  const session = await requireSession(event);
  const assessmentId = getRouterParam(event, "assessmentId");
  if (!assessmentId) throw createError({ statusCode: 400, message: "Missing assessmentId" });

  const db = getDb();
  const profile = await getSchoolProfile(db, session.userId);

  const rows = await db
    .select()
    .from(schema.assessments)
    .where(eq(schema.assessments.id, assessmentId))
    .limit(1);
  if (!rows[0]) throw createError({ statusCode: 404, message: "Not found" });
  const assessment = rows[0];

  const variants = await db
    .select()
    .from(schema.assessmentVariants)
    .where(eq(schema.assessmentVariants.assessmentId, assessmentId))
    .orderBy(asc(schema.assessmentVariants.position));

  // For students: find their assigned variant, strip difficulty
  const isStudent = profile?.schoolRole === "student";
  if (isStudent) {
    const assigned = await db
      .select()
      .from(schema.studentAssessments)
      .where(
        and(
          eq(schema.studentAssessments.studentId, session.userId),
          eq(schema.studentAssessments.assessmentId, assessmentId),
        ),
      )
      .limit(1);

    const myVariantId = assigned[0]?.variantId;
    const myVariant = variants.find((v: any) => v.id === myVariantId) ?? variants[0] ?? null;

    const submission = await db
      .select()
      .from(schema.submissions)
      .where(
        and(
          eq(schema.submissions.studentId, session.userId),
          eq(schema.submissions.assessmentId, assessmentId),
        ),
      )
      .limit(1);

    let myGrade = null;
    if (submission[0]) {
      const gradeRows = await db
        .select()
        .from(schema.grades)
        .where(
          and(
            eq(schema.grades.submissionId, submission[0].id),
            eq(schema.grades.isPublished, 1 as any),
          ),
        )
        .limit(1);
      myGrade = gradeRows[0] ?? null;
    }

    return {
      assessment: {
        id: assessment.id,
        title: assessment.title,
        assessmentType: assessment.assessmentType,
        dueDate: assessment.dueDate,
        totalPoints: assessment.totalPoints,
      },
      myVariant: myVariant
        ? {
            id: myVariant.id,
            instructions: myVariant.instructions,
            content: myVariant.content,
            totalPoints: myVariant.totalPoints,
            // NOTE: difficulty deliberately omitted for students
          }
        : null,
      mySubmission: submission[0] ?? null,
      myGrade,
    };
  }

  // Teacher view: all variants + submission summary
  const [submittedCount, gradedCount, totalCount] = await Promise.all([
    db.select({ c: count() }).from(schema.submissions).where(and(eq(schema.submissions.assessmentId, assessmentId), inArray(schema.submissions.status, ["submitted", "graded"]))),
    db.select({ c: count() }).from(schema.submissions).where(and(eq(schema.submissions.assessmentId, assessmentId), eq(schema.submissions.status, "graded"))),
    db.select({ c: count() }).from(schema.studentAssessments).where(eq(schema.studentAssessments.assessmentId, assessmentId)),
  ]);

  return {
    assessment,
    variants,
    submissionSummary: {
      total: Number(totalCount[0]?.c ?? 0),
      submitted: Number(submittedCount[0]?.c ?? 0),
      graded: Number(gradedCount[0]?.c ?? 0),
    },
  };
});
