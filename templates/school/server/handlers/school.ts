import { defineEventHandler, getRouterParam, getQuery, createError } from "h3";
import { getSession, runWithRequestContext } from "@agent-native/core/server";
import { getDb, schema } from "../db/index.js";
import { eq, and, desc, asc, inArray, sql, count } from "drizzle-orm";
import {
  getOrgSetting,
  getAllSettings,
  putOrgSetting,
} from "@agent-native/core/settings";
import { nanoid } from "nanoid";

// ─── Helper ──────────────────────────────────────────────────────────────────

async function requireSession(event: any) {
  const session = await getSession(event);
  if (!session?.email) {
    throw createError({ statusCode: 401, message: "Unauthorized" });
  }
  // Older session paths (legacy cookie, desktop SSO) may not include userId.
  // Fall back to a lookup by email so all handlers always have a userId.
  if (!session.userId) {
    const db = getDb();
    const row = (await db.get(
      sql`SELECT id FROM "user" WHERE email = ${session.email} LIMIT 1`,
    )) as { id: string } | undefined;
    if (row?.id) (session as any).userId = row.id;
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

/**
 * When an invited staff member signs in for the first time they have no
 * school_profiles row yet.  Scan pending-staff-invites across all orgs and
 * auto-create the profile so they land in the right portal immediately
 * without the admin having to manually run finalize-staff-invite.
 */
async function autoActivateInvitedStaff(
  db: any,
  userId: string,
  email: string,
): Promise<{ schoolRole: string; schoolId: string } | null> {
  const all = await getAllSettings();
  const INVITE_KEY_RE = /^o:([^:]+):pending-staff-invites$/;
  for (const [fullKey, value] of Object.entries(all)) {
    const m = INVITE_KEY_RE.exec(fullKey);
    if (!m) continue;
    const orgId = m[1];
    const invites = Array.isArray(value) ? value : [];
    const match = invites.find(
      (inv: any) => inv.email?.toLowerCase() === email.toLowerCase(),
    );
    if (!match) continue;
    const schoolRole = match.schoolRole as string;
    // Create the school profile
    await db.insert(schema.schoolProfiles).values({
      id: nanoid(),
      userId,
      schoolId: orgId,
      schoolRole,
      status: "active",
    });
    // Remove from pending list so they no longer show under "Pending invitations"
    const remaining = invites.filter(
      (inv: any) => inv.email?.toLowerCase() !== email.toLowerCase(),
    );
    await putOrgSetting(orgId, "pending-staff-invites", remaining as any);
    return { schoolRole, schoolId: orgId };
  }
  return null;
}

/**
 * When an invited student signs in for the first time, auto-create their
 * school_profiles row (role=student) and students academic record.
 */
async function autoActivateInvitedStudents(
  db: any,
  userId: string,
  email: string,
): Promise<{ schoolRole: string; schoolId: string } | null> {
  const all = await getAllSettings();
  const INVITE_KEY_RE = /^o:([^:]+):pending-student-invites$/;
  for (const [fullKey, value] of Object.entries(all)) {
    const m = INVITE_KEY_RE.exec(fullKey);
    if (!m) continue;
    const orgId = m[1];
    const invites = Array.isArray(value) ? value : [];
    const match = invites.find(
      (inv: any) => inv.email?.toLowerCase() === email.toLowerCase(),
    );
    if (!match) continue;
    // Create school profile
    await db.insert(schema.schoolProfiles).values({
      id: nanoid(),
      userId,
      schoolId: orgId,
      schoolRole: "student",
      status: "active",
    });
    // Create student academic record
    await db.insert(schema.students).values({
      id: nanoid(),
      userId,
      schoolId: orgId,
      customFieldsJson: "{}",
      status: "active",
      ownerEmail: email,
      orgId,
      visibility: "org",
    });
    // Remove from pending list
    const remaining = invites.filter(
      (inv: any) => inv.email?.toLowerCase() !== email.toLowerCase(),
    );
    await putOrgSetting(orgId, "pending-student-invites", remaining as any);
    return { schoolRole: "student", schoolId: orgId };
  }
  return null;
}

/**
 * Students have two identifiers: the auth user ID (used by class_enrollments)
 * and the student record ID (`students.id`, used by submissions, grades, and
 * student_categories). Joining across them without this mapping silently
 * matches nothing.
 */
async function getStudentRecordMaps(db: any, userIds: string[]) {
  const recordIdByUser: Record<string, string> = {};
  const userIdByRecord: Record<string, string> = {};
  if (userIds.length === 0) return { recordIdByUser, userIdByRecord };
  const rows = await db
    .select({ id: schema.students.id, userId: schema.students.userId })
    .from(schema.students)
    .where(inArray(schema.students.userId, userIds));
  for (const r of rows) {
    recordIdByUser[r.userId] = r.id;
    userIdByRecord[r.id] = r.userId;
  }
  return { recordIdByUser, userIdByRecord };
}

/** The signed-in student's record ID (`students.id`), or null if they have none. */
async function getMyStudentRecordId(
  db: any,
  userId: string,
): Promise<string | null> {
  const [row] = await db
    .select({ id: schema.students.id })
    .from(schema.students)
    .where(eq(schema.students.userId, userId))
    .limit(1);
  return row?.id ?? null;
}

export const getSessionInfo = defineEventHandler(async (event) => {
  const session = await requireSession(event);
  const db = getDb();
  let profile = session.userId
    ? await getSchoolProfile(db, session.userId)
    : null;

  // Auto-activate if the user is in a pending staff invite list
  if (!profile && session.userId && session.email) {
    const activated = await autoActivateInvitedStaff(
      db,
      session.userId,
      session.email,
    );
    if (activated) {
      profile = {
        schoolRole: activated.schoolRole,
        schoolId: activated.schoolId,
      };
    }
  }

  // Auto-activate if the user is in a pending student invite list
  if (!profile && session.userId && session.email) {
    const activated = await autoActivateInvitedStudents(
      db,
      session.userId,
      session.email,
    );
    if (activated) {
      profile = {
        schoolRole: activated.schoolRole,
        schoolId: activated.schoolId,
      };
    }
  }

  // If still no profile, check whether this school has already been initialized.
  // If it has, this user arrived without an invite — deny school access so they
  // land on the pending-activation page rather than the admin onboarding wizard.
  // (Before setup-school runs there is no school-config entry, so the first
  // legitimate admin always gets through to the wizard.)
  let accessDenied = false;
  if (!profile && session.email) {
    const all = await getAllSettings();
    const schoolIsInitialized = Object.keys(all).some((k) =>
      /^o:[^:]+:school-config$/.test(k),
    );
    if (schoolIsInitialized) {
      accessDenied = true;
    }
  }

  return {
    user: { id: session.userId, email: session.email, name: session.name },
    schoolRole: profile?.schoolRole ?? null,
    schoolId: profile?.schoolId ?? null,
    accessDenied,
  };
});

// ─── Stats (admin overview) ───────────────────────────────────────────────────

export const getStats = defineEventHandler(async (event) => {
  const session = await requireSession(event);
  const db = getDb();
  const profile = await getSchoolProfile(db, session.userId);
  if (!profile)
    return { staffCount: 0, studentCount: 0, classCount: 0, subjectCount: 0 };

  const schoolId = profile.schoolId;

  const [staffRows, studentRows, classRows, subjectRows] = await Promise.all([
    db
      .select({ c: count() })
      .from(schema.schoolProfiles)
      .where(
        and(
          eq(schema.schoolProfiles.schoolId, schoolId),
          inArray(schema.schoolProfiles.schoolRole, [
            "teacher",
            "subject_coordinator",
            "school_admin",
          ]),
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
      .where(
        and(
          eq(schema.classes.orgId, schoolId),
          eq(schema.classes.status, "active"),
        ),
      ),
    db
      .select({ c: count() })
      .from(schema.subjects)
      .where(
        and(
          eq(schema.subjects.orgId, schoolId),
          eq(schema.subjects.status, "active"),
        ),
      ),
  ]);

  return {
    staffCount: staffRows[0]?.c ?? 0,
    studentCount: studentRows[0]?.c ?? 0,
    classCount: classRows[0]?.c ?? 0,
    subjectCount: subjectRows[0]?.c ?? 0,
  };
});

// ─── Staff list (active + pending invites) ───────────────────────────────────

export const getStaff = defineEventHandler(async (event) => {
  const session = await requireSession(event);
  const db = getDb();
  const profile = await getSchoolProfile(db, session.userId!);
  if (!profile) return { active: [], pending: [] };
  const schoolId = profile.schoolId;

  const profiles = await db
    .select()
    .from(schema.schoolProfiles)
    .where(
      and(
        eq(schema.schoolProfiles.schoolId, schoolId),
        inArray(schema.schoolProfiles.schoolRole, [
          "school_admin",
          "teacher",
          "subject_coordinator",
        ]),
      ),
    );

  const active = await Promise.all(
    profiles.map(async (p) => {
      const userRow = (await db.get(
        sql`SELECT email, name FROM "user" WHERE id = ${p.userId} LIMIT 1`,
      )) as { email: string; name: string } | undefined;
      return {
        ...p,
        email: userRow?.email ?? null,
        name: userRow?.name ?? null,
      };
    }),
  );

  const activeEmails = new Set(
    active.map((a) => a.email?.toLowerCase()).filter(Boolean),
  );

  const allPending = ((await getOrgSetting(
    schoolId,
    "pending-staff-invites",
  )) ?? []) as Array<{
    id: string;
    email: string;
    name: string;
    schoolRole: string;
    invitedAt: number;
  }>;

  // Filter out anyone who has already been activated (has an active school profile)
  const pending = allPending.filter(
    (inv) => !activeEmails.has(inv.email?.toLowerCase()),
  );

  return { active, pending };
});

export const getPendingStaffInvites = defineEventHandler(async (event) => {
  const session = await requireSession(event);
  const db = getDb();
  const profile = await getSchoolProfile(db, session.userId!);
  if (!profile) return [];
  const list = ((await getOrgSetting(
    profile.schoolId,
    "pending-staff-invites",
  )) ?? []) as any[];
  return list;
});

export const getPendingStudentInvites = defineEventHandler(async (event) => {
  const session = await requireSession(event);
  const db = getDb();
  const profile = await getSchoolProfile(db, session.userId!);
  if (!profile) return [];
  const list = ((await getOrgSetting(
    profile.schoolId,
    "pending-student-invites",
  )) ?? []) as any[];
  return list;
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
  if (!subjectId)
    throw createError({ statusCode: 400, message: "Missing subjectId" });

  const db = getDb();
  const profile = await getSchoolProfile(db, session.userId);
  if (!profile) throw createError({ statusCode: 403, message: "Forbidden" });

  const rows = await db
    .select()
    .from(schema.subjects)
    .where(
      and(
        eq(schema.subjects.id, subjectId),
        eq(schema.subjects.orgId, profile.schoolId),
      ),
    )
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

  return units.map((u: any) => ({
    ...u,
    learningObjectives: objsByUnit[u.id] ?? [],
  }));
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
    .leftJoin(
      schema.gradeLevels,
      eq(schema.classes.gradeLevelId, schema.gradeLevels.id),
    )
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

  // Fetch teacher names
  const teacherIds = [
    ...new Set(rows.map((r: any) => r.primaryTeacherUserId).filter(Boolean)),
  ];
  const teacherMap: Record<string, string> = {};
  if (teacherIds.length > 0) {
    const teacherRows = (await db.all(
      sql`SELECT id, name, email FROM "user" WHERE id IN (${sql.join(
        teacherIds.map((id: string) => sql`${id}`),
        sql`, `,
      )})`,
    )) as Array<{ id: string; name: string; email: string }>;
    for (const t of teacherRows) teacherMap[t.id] = t.name ?? t.email ?? t.id;
  }

  return rows.map((r: any) => ({
    ...r,
    enrollmentCount: countMap[r.id] ?? 0,
    teacherName: r.primaryTeacherUserId
      ? (teacherMap[r.primaryTeacherUserId] ?? null)
      : null,
  }));
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
      .leftJoin(
        schema.subjects,
        eq(schema.classes.subjectId, schema.subjects.id),
      )
      .where(inArray(schema.classes.id, classIds));

    // Pending assessments per class
    return rows.map((r: any) => ({
      ...r,
      pendingAssessments: 0,
      teacherName: null,
    }));
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
      ...new Set([
        ...teacherClassRows.map((r: any) => r.classId),
        ...primaryClassIds,
      ]),
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
      .leftJoin(
        schema.subjects,
        eq(schema.classes.subjectId, schema.subjects.id),
      )
      .leftJoin(
        schema.gradeLevels,
        eq(schema.classes.gradeLevelId, schema.gradeLevels.id),
      )
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

    return rows.map((r: any) => ({
      ...r,
      enrollmentCount: countMap[r.id] ?? 0,
    }));
  }
});

// ─── Class detail (student view) ─────────────────────────────────────────────

export const getMyClassDetail = defineEventHandler(async (event) => {
  const session = await requireSession(event);
  const classId = getRouterParam(event, "classId");
  if (!classId)
    throw createError({ statusCode: 400, message: "Missing classId" });

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

  if (!classRows[0])
    throw createError({ statusCode: 404, message: "Not found" });
  const cls = classRows[0];

  const [lessons, assessments] = await Promise.all([
    db
      .select({
        id: schema.lessonNotes.id,
        title: schema.lessonNotes.title,
        summary: schema.lessonNotes.summary,
      })
      .from(schema.lessonNotes)
      .where(
        and(
          eq(schema.lessonNotes.classId, classId),
          eq(schema.lessonNotes.status, "finalized"),
        ),
      )
      .orderBy(desc(schema.lessonNotes.createdAt))
      .limit(10),
    db
      .select({
        id: schema.assessments.id,
        title: schema.assessments.title,
        assessmentType: schema.assessments.assessmentType,
        dueDate: schema.assessments.dueDate,
        status: schema.assessments.status,
      })
      .from(schema.assessments)
      .where(
        and(
          eq(schema.assessments.classId, classId),
          eq(schema.assessments.status, "published"),
        ),
      )
      .orderBy(asc(schema.assessments.dueDate)),
  ]);

  // Teacher name for the class header
  let teacherName: string | null = null;
  if (cls.primaryTeacherUserId) {
    const t = (await db.get(
      sql`SELECT name, email FROM "user" WHERE id = ${cls.primaryTeacherUserId} LIMIT 1`,
    )) as { name: string | null; email: string | null } | undefined;
    teacherName = t?.name ?? t?.email ?? null;
  }

  // The student's own submission status per assessment, so the class page
  // doesn't show graded work as "Not Started".
  const studentRecordId = await getMyStudentRecordId(db, session.userId);
  const assessmentIds = assessments.map((a: any) => a.id);
  const mySubs =
    studentRecordId && assessmentIds.length > 0
      ? await db
          .select({
            assessmentId: schema.submissions.assessmentId,
            status: schema.submissions.status,
          })
          .from(schema.submissions)
          .where(
            and(
              eq(schema.submissions.studentId, studentRecordId),
              inArray(schema.submissions.assessmentId, assessmentIds),
            ),
          )
      : [];
  const statusByAssessment: Record<string, string> = {};
  for (const s of mySubs) statusByAssessment[s.assessmentId] = s.status;

  return {
    cls: { ...cls, teacherName },
    lessons,
    assessments: assessments.map((a: any) => ({
      ...a,
      submissionStatus: statusByAssessment[a.id] ?? "not_started",
    })),
  };
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
    .select({
      studentUserId: schema.classEnrollments.studentUserId,
      classId: schema.classEnrollments.classId,
    })
    .from(schema.classEnrollments)
    .where(
      and(
        inArray(schema.classEnrollments.classId, classIds),
        eq(schema.classEnrollments.status, "active"),
      ),
    );

  const studentUserIds = [
    ...new Set(enrollments.map((e: any) => e.studentUserId)),
  ];
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

  // Fetch user names/emails in one query
  const userRows = (await db.all(
    sql`SELECT id, email, name FROM "user" WHERE id IN (${sql.join(
      studentUserIds.map((id: string) => sql`${id}`),
      sql`, `,
    )})`,
  )) as Array<{ id: string; email: string; name: string }>;
  const userMap: Record<string, { email: string; name: string }> = {};
  for (const u of userRows) userMap[u.id] = u;

  // Categories, submissions, and grades are keyed by student record ID.
  const { recordIdByUser } = await getStudentRecordMaps(db, studentUserIds);
  const recordIds = Object.values(recordIdByUser);

  const categoryByRecord: Record<string, string> = {};
  for (const cat of categories) {
    if (!categoryByRecord[cat.studentId])
      categoryByRecord[cat.studentId] = cat.category;
  }

  const classRows = await db
    .select({ id: schema.classes.id, name: schema.classes.name })
    .from(schema.classes)
    .where(inArray(schema.classes.id, classIds));
  const classNameById: Record<string, string> = {};
  for (const c of classRows) classNameById[c.id] = c.name;

  const publishedAssessments = await db
    .select({ id: schema.assessments.id, classId: schema.assessments.classId })
    .from(schema.assessments)
    .where(
      and(
        inArray(schema.assessments.classId, classIds),
        inArray(schema.assessments.status, ["published", "closed"]),
      ),
    );
  const assessmentIds = publishedAssessments.map((a: any) => a.id);

  const subs =
    assessmentIds.length > 0 && recordIds.length > 0
      ? await db
          .select({
            studentId: schema.submissions.studentId,
            assessmentId: schema.submissions.assessmentId,
          })
          .from(schema.submissions)
          .where(
            and(
              inArray(schema.submissions.assessmentId, assessmentIds),
              inArray(schema.submissions.studentId, recordIds),
              inArray(schema.submissions.status, ["submitted", "graded"]),
            ),
          )
      : [];
  const gradeRows =
    assessmentIds.length > 0 && recordIds.length > 0
      ? await db
          .select({
            studentId: schema.grades.studentId,
            percentage: schema.grades.percentage,
          })
          .from(schema.grades)
          .where(
            and(
              inArray(schema.grades.assessmentId, assessmentIds),
              inArray(schema.grades.studentId, recordIds),
            ),
          )
      : [];

  return studentUserIds.map((userId: string) => {
    const recordId = recordIdByUser[userId];
    const studentClassIds = enrollments
      .filter((e: any) => e.studentUserId === userId)
      .map((e: any) => e.classId);
    const expected = publishedAssessments.filter((a: any) =>
      studentClassIds.includes(a.classId),
    ).length;
    const done = new Set(
      subs
        .filter((s: any) => s.studentId === recordId)
        .map((s: any) => s.assessmentId),
    ).size;
    const pcts = gradeRows
      .filter((g: any) => g.studentId === recordId && g.percentage != null)
      .map((g: any) => parseFloat(g.percentage))
      .filter((p: number) => !isNaN(p));
    return {
      id: userId,
      studentId: recordId ?? null,
      name: userMap[userId]?.name ?? null,
      email: userMap[userId]?.email ?? null,
      category: recordId ? (categoryByRecord[recordId] ?? null) : null,
      averageScore:
        pcts.length > 0
          ? (
              pcts.reduce((a: number, b: number) => a + b, 0) / pcts.length
            ).toFixed(1)
          : null,
      completionRate: expected > 0 ? Math.round((done / expected) * 100) : null,
      className:
        studentClassIds
          .map((id: string) => classNameById[id])
          .filter(Boolean)
          .join(", ") || null,
    };
  });
});

// ─── All students (admin view) ────────────────────────────────────────────────

export const listStudents = defineEventHandler(async (event) => {
  const session = await requireSession(event);
  const db = getDb();
  const profile = await getSchoolProfile(db, session.userId);
  if (!profile) return [];

  const students = await db
    .select({
      id: schema.students.id,
      userId: schema.students.userId,
      admissionNumber: schema.students.admissionNumber,
      status: schema.students.status,
      gradeLevelId: schema.students.gradeLevelId,
      gradeLevelName: schema.gradeLevels.name,
    })
    .from(schema.students)
    .leftJoin(
      schema.gradeLevels,
      eq(schema.students.gradeLevelId, schema.gradeLevels.id),
    )
    .where(eq(schema.students.schoolId, profile.schoolId));

  if (students.length === 0) return [];

  const userIds = students.map((s: any) => s.userId).filter(Boolean);
  const userMap: Record<string, { name: string; email: string }> = {};
  if (userIds.length > 0) {
    const userRows = (await db.all(
      sql`SELECT id, name, email FROM "user" WHERE id IN (${sql.join(
        userIds.map((id: string) => sql`${id}`),
        sql`, `,
      )})`,
    )) as Array<{ id: string; name: string; email: string }>;
    for (const u of userRows) userMap[u.id] = { name: u.name, email: u.email };
  }

  return students.map((s: any) => ({
    ...s,
    name: userMap[s.userId]?.name ?? null,
    email: userMap[s.userId]?.email ?? null,
  }));
});

// ─── Class detail (teacher/admin view) ───────────────────────────────────────

export const getClassDetail = defineEventHandler(async (event) => {
  const session = await requireSession(event);
  const classId = getRouterParam(event, "classId");
  if (!classId)
    throw createError({ statusCode: 400, message: "Missing classId" });

  const db = getDb();
  const profile = await getSchoolProfile(db, session.userId);
  if (!profile) throw createError({ statusCode: 403, message: "Forbidden" });

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
    .leftJoin(
      schema.gradeLevels,
      eq(schema.classes.gradeLevelId, schema.gradeLevels.id),
    )
    .where(
      and(
        eq(schema.classes.id, classId),
        eq(schema.classes.orgId, profile.schoolId),
      ),
    )
    .limit(1);

  if (!rows[0]) throw createError({ statusCode: 404, message: "Not found" });
  const cls = rows[0] as any;

  let teacherName: string | null = null;
  if (cls.primaryTeacherUserId) {
    const t = (await db.get(
      sql`SELECT name, email FROM "user" WHERE id = ${cls.primaryTeacherUserId} LIMIT 1`,
    )) as { name: string; email: string } | undefined;
    teacherName = t?.name ?? t?.email ?? null;
  }

  return { ...cls, teacherName };
});

// ─── Lessons list (by classId) ────────────────────────────────────────────────

export const listLessons = defineEventHandler(async (event) => {
  const session = await requireSession(event);
  const db = getDb();
  const profile = await getSchoolProfile(db, session.userId);
  if (!profile) return [];

  const q = getQuery(event);
  const classId = q.classId as string | undefined;
  if (!classId) return [];

  return db
    .select({
      id: schema.lessonNotes.id,
      title: schema.lessonNotes.title,
      status: schema.lessonNotes.status,
      unitId: schema.lessonNotes.unitId,
      createdAt: schema.lessonNotes.createdAt,
    })
    .from(schema.lessonNotes)
    .where(eq(schema.lessonNotes.classId, classId))
    .orderBy(desc(schema.lessonNotes.createdAt));
});

// ─── Assessments list (by classId) ───────────────────────────────────────────

export const listAssessments = defineEventHandler(async (event) => {
  const session = await requireSession(event);
  const db = getDb();
  const profile = await getSchoolProfile(db, session.userId);
  if (!profile) return [];

  const q = getQuery(event);
  const classId = q.classId as string | undefined;
  if (!classId) return [];

  return db
    .select({
      id: schema.assessments.id,
      title: schema.assessments.title,
      assessmentType: schema.assessments.assessmentType,
      dueDate: schema.assessments.dueDate,
      totalPoints: schema.assessments.totalPoints,
      status: schema.assessments.status,
    })
    .from(schema.assessments)
    .where(eq(schema.assessments.classId, classId))
    .orderBy(asc(schema.assessments.dueDate));
});

// ─── Class students list ──────────────────────────────────────────────────────

export const listClassStudents = defineEventHandler(async (event) => {
  const session = await requireSession(event);
  const db = getDb();
  const profile = await getSchoolProfile(db, session.userId);
  if (!profile) return [];

  const q = getQuery(event);
  const classId = q.classId as string | undefined;
  if (!classId) return [];

  const enrollments = await db
    .select({
      enrollmentId: schema.classEnrollments.id,
      studentUserId: schema.classEnrollments.studentUserId,
      status: schema.classEnrollments.status,
    })
    .from(schema.classEnrollments)
    .where(
      and(
        eq(schema.classEnrollments.classId, classId),
        eq(schema.classEnrollments.status, "active"),
      ),
    );

  if (enrollments.length === 0) return [];

  const userIds = enrollments.map((e: any) => e.studentUserId);
  const userRows = (await db.all(
    sql`SELECT id, name, email FROM "user" WHERE id IN (${sql.join(
      userIds.map((id: string) => sql`${id}`),
      sql`, `,
    )})`,
  )) as Array<{ id: string; name: string; email: string }>;
  const userMap: Record<string, { name: string; email: string }> = {};
  for (const u of userRows) userMap[u.id] = { name: u.name, email: u.email };

  const categories = await db
    .select()
    .from(schema.studentCategories)
    .where(eq(schema.studentCategories.classId, classId))
    .orderBy(desc(schema.studentCategories.assessedAt));
  const categoryByUser: Record<string, string> = {};
  for (const cat of categories) {
    if (!categoryByUser[cat.studentId])
      categoryByUser[cat.studentId] = cat.category;
  }

  return enrollments.map((e: any) => ({
    enrollmentId: e.enrollmentId,
    studentUserId: e.studentUserId,
    name: userMap[e.studentUserId]?.name ?? null,
    email: userMap[e.studentUserId]?.email ?? null,
    category: categoryByUser[e.studentUserId] ?? null,
  }));
});

// ─── Gradebook ────────────────────────────────────────────────────────────────

export const getGradebook = defineEventHandler(async (event) => {
  const session = await requireSession(event);
  const classId = getRouterParam(event, "classId");
  if (!classId)
    throw createError({ statusCode: 400, message: "Missing classId" });

  const db = getDb();
  const profile = await getSchoolProfile(db, session.userId);
  if (!profile) throw createError({ statusCode: 403, message: "Forbidden" });

  const classRows = await db
    .select({ id: schema.classes.id, name: schema.classes.name })
    .from(schema.classes)
    .where(eq(schema.classes.id, classId))
    .limit(1);
  if (!classRows[0])
    throw createError({ statusCode: 404, message: "Not found" });

  const assessments = await db
    .select({
      id: schema.assessments.id,
      title: schema.assessments.title,
      totalPoints: schema.assessments.totalPoints,
    })
    .from(schema.assessments)
    .where(
      and(
        eq(schema.assessments.classId, classId),
        eq(schema.assessments.status, "published"),
      ),
    );

  const enrollments = await db
    .select({ studentUserId: schema.classEnrollments.studentUserId })
    .from(schema.classEnrollments)
    .where(
      and(
        eq(schema.classEnrollments.classId, classId),
        eq(schema.classEnrollments.status, "active"),
      ),
    );

  const studentIds = enrollments.map((e: any) => e.studentUserId);
  if (studentIds.length === 0)
    return { className: classRows[0].name, assessments, students: [] };

  // Enrollments hold user IDs; grades hold student record IDs.
  const { recordIdByUser } = await getStudentRecordMaps(db, studentIds);
  const recordIds = Object.values(recordIdByUser);

  const assessmentIds = assessments.map((a: any) => a.id);
  const grades =
    assessmentIds.length > 0 && recordIds.length > 0
      ? await db
          .select()
          .from(schema.grades)
          .where(
            and(
              inArray(schema.grades.studentId, recordIds),
              inArray(schema.grades.assessmentId, assessmentIds),
            ),
          )
      : [];

  const gradeMap: Record<string, Record<string, any>> = {};
  for (const g of grades) {
    if (!gradeMap[g.studentId]) gradeMap[g.studentId] = {};
    gradeMap[g.studentId][g.assessmentId] = g;
  }

  // Fetch actual names from user table
  const userRows = (await db.all(
    sql`SELECT id, name, email FROM "user" WHERE id IN (${sql.join(
      studentIds.map((id: string) => sql`${id}`),
      sql`, `,
    )})`,
  )) as Array<{ id: string; name: string; email: string }>;
  const userMap: Record<string, string> = {};
  for (const u of userRows) userMap[u.id] = u.name ?? u.email ?? u.id;

  const students = studentIds.map((sid: string) => ({
    id: sid,
    studentId: recordIdByUser[sid] ?? null,
    name: userMap[sid] ?? sid,
    grades: gradeMap[recordIdByUser[sid]] ?? {},
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
  const profile = await getSchoolProfile(db, session.userId);

  const primaryClasses = await db
    .select({ id: schema.classes.id, name: schema.classes.name })
    .from(schema.classes)
    .where(eq(schema.classes.primaryTeacherUserId, session.userId));

  if (primaryClasses.length === 0) return null;

  const classIds = primaryClasses.map((c: any) => c.id);
  const schoolConfig = profile
    ? ((await getOrgSetting(profile.schoolId, "school-config")) as any)
    : null;
  const passMark = schoolConfig?.passMark ?? 50;

  // Enrollment counts per class
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

  // All assessments in these classes
  const assessments = await db
    .select({ id: schema.assessments.id, classId: schema.assessments.classId })
    .from(schema.assessments)
    .where(inArray(schema.assessments.classId, classIds));

  const assessmentIds = assessments.map((a: any) => a.id);

  // Published grades for these assessments
  const grades =
    assessmentIds.length > 0
      ? await db
          .select()
          .from(schema.grades)
          .where(
            and(
              inArray(schema.grades.assessmentId, assessmentIds),
              eq(schema.grades.isPublished, true),
            ),
          )
      : [];

  // Pending (submitted but not graded) submissions
  const pendingSubmissions =
    assessmentIds.length > 0
      ? await db
          .select({
            id: schema.submissions.id,
            assessmentId: schema.submissions.assessmentId,
          })
          .from(schema.submissions)
          .where(
            and(
              inArray(schema.submissions.assessmentId, assessmentIds),
              eq(schema.submissions.status, "submitted"),
            ),
          )
      : [];

  // Turned-in work (submitted or graded), for completion rates
  const turnedIn =
    assessmentIds.length > 0
      ? await db
          .select({
            studentId: schema.submissions.studentId,
            assessmentId: schema.submissions.assessmentId,
          })
          .from(schema.submissions)
          .where(
            and(
              inArray(schema.submissions.assessmentId, assessmentIds),
              inArray(schema.submissions.status, ["submitted", "graded"]),
            ),
          )
      : [];

  // Check which submissions already have grades
  const gradedSubmissionIds = new Set(grades.map((g: any) => g.submissionId));
  const pendingGrading = pendingSubmissions.filter(
    (s: any) => !gradedSubmissionIds.has(s.id),
  ).length;

  // Overall average from all published grades
  const allPercentages = grades
    .map((g: any) => parseFloat(g.percentage ?? "0"))
    .filter((p: number) => !isNaN(p));
  const overallAverage =
    allPercentages.length > 0
      ? (
          allPercentages.reduce((a: number, b: number) => a + b, 0) /
          allPercentages.length
        ).toFixed(1)
      : null;

  // Struggling: enrolled students with average below passMark
  // Count unique students with avg < passMark across all classes
  const studentScores: Record<string, number[]> = {};
  for (const g of grades as any[]) {
    if (g.studentId && g.percentage != null) {
      const p = parseFloat(g.percentage);
      if (!isNaN(p)) {
        if (!studentScores[g.studentId]) studentScores[g.studentId] = [];
        studentScores[g.studentId].push(p);
      }
    }
  }
  const strugglingCount = Object.values(studentScores).filter((scores) => {
    const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
    return avg < passMark;
  }).length;

  // Per-class breakdown
  const byClass = primaryClasses.map((c: any) => {
    const classAssessmentIds = new Set(
      assessments.filter((a: any) => a.classId === c.id).map((a: any) => a.id),
    );
    const classGrades = (grades as any[]).filter((g: any) =>
      classAssessmentIds.has(g.assessmentId),
    );
    const classPercentages = classGrades
      .map((g: any) => parseFloat(g.percentage ?? "0"))
      .filter((p: number) => !isNaN(p));
    const classAvg =
      classPercentages.length > 0
        ? (
            classPercentages.reduce((a: number, b: number) => a + b, 0) /
            classPercentages.length
          ).toFixed(1)
        : null;

    const classPendingSubs = pendingSubmissions.filter(
      (s: any) =>
        classAssessmentIds.has(s.assessmentId) &&
        !gradedSubmissionIds.has(s.id),
    ).length;

    const classStudentScores: Record<string, number[]> = {};
    for (const g of classGrades) {
      if (g.studentId && g.percentage != null) {
        const p = parseFloat(g.percentage);
        if (!isNaN(p)) {
          if (!classStudentScores[g.studentId])
            classStudentScores[g.studentId] = [];
          classStudentScores[g.studentId].push(p);
        }
      }
    }
    const classStruggling = Object.values(classStudentScores).filter(
      (scores) => {
        const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
        return avg < passMark;
      },
    ).length;

    const expected = (countMap[c.id] ?? 0) * classAssessmentIds.size;
    const done = new Set(
      turnedIn
        .filter((s: any) => classAssessmentIds.has(s.assessmentId))
        .map((s: any) => `${s.studentId}:${s.assessmentId}`),
    ).size;

    return {
      classId: c.id,
      className: c.name,
      averageScore: classAvg,
      studentCount: countMap[c.id] ?? 0,
      pendingGrading: classPendingSubs,
      strugglingCount: classStruggling,
      completionRate:
        expected > 0
          ? Math.round((Math.min(done, expected) / expected) * 100)
          : null,
    };
  });

  return {
    overallAverage,
    pendingGrading,
    strugglingCount,
    byClass,
  };
});

// ─── My assessments (student) ─────────────────────────────────────────────────

export const getMyAssessments = defineEventHandler(async (event) => {
  const session = await requireSession(event);
  const db = getDb();

  // studentAssessments/submissions are keyed by student record ID, not user ID.
  const studentRecordId = await getMyStudentRecordId(db, session.userId);
  if (!studentRecordId) return [];

  const assigned = await db
    .select()
    .from(schema.studentAssessments)
    .where(eq(schema.studentAssessments.studentId, studentRecordId));

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
        eq(schema.submissions.studentId, studentRecordId),
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

  const studentRecordId = await getMyStudentRecordId(db, session.userId);
  if (!studentRecordId) return [];

  const grades = await db
    .select()
    .from(schema.grades)
    .where(
      and(
        eq(schema.grades.studentId, studentRecordId),
        eq(schema.grades.isPublished, 1 as any),
      ),
    )
    .orderBy(desc(schema.grades.gradedAt));

  if (grades.length === 0) return [];

  const assessmentIds = [...new Set(grades.map((g: any) => g.assessmentId))];
  const assessments = await db
    .select({
      id: schema.assessments.id,
      title: schema.assessments.title,
      assessmentType: schema.assessments.assessmentType,
      classId: schema.assessments.classId,
    })
    .from(schema.assessments)
    .where(inArray(schema.assessments.id, assessmentIds));

  const classIds = [
    ...new Set(assessments.map((a: any) => a.classId).filter(Boolean)),
  ];
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

  const studentRecordId = await getMyStudentRecordId(db, session.userId);
  const grades = studentRecordId
    ? await db
        .select()
        .from(schema.grades)
        .where(
          and(
            eq(schema.grades.studentId, studentRecordId),
            eq(schema.grades.isPublished, 1 as any),
          ),
        )
    : [];

  if (grades.length === 0) {
    return {
      overallAverage: null,
      assignmentsCompleted: 0,
      completionRate: null,
      classSummaries: [],
    };
  }

  const assessmentIds = [...new Set(grades.map((g: any) => g.assessmentId))];
  const assessments = await db
    .select({ id: schema.assessments.id, classId: schema.assessments.classId })
    .from(schema.assessments)
    .where(inArray(schema.assessments.id, assessmentIds));

  const classIds = [
    ...new Set(assessments.map((a: any) => a.classId).filter(Boolean)),
  ];

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
    const avg =
      scores.length > 0
        ? (scores.reduce((s, n) => s + n, 0) / scores.length).toFixed(1)
        : null;
    const isStruggling = avg !== null && parseFloat(avg) < 50;
    return {
      classId,
      className: classMap[classId]?.name ?? classId,
      averageScore: avg,
      completionRate: 100,
      gradedCount: scores.length,
      totalAssessments: scores.length,
      isStruggling,
    };
  });

  const allScores = grades
    .map((g: any) => (g.percentage ? parseFloat(g.percentage) : null))
    .filter((n): n is number => n !== null);
  const overallAverage =
    allScores.length > 0
      ? Math.round(allScores.reduce((s, n) => s + n, 0) / allScores.length)
      : null;

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
  if (!draftId)
    throw createError({ statusCode: 400, message: "Missing draftId" });

  const db = getDb();
  const profile = await getSchoolProfile(db, session.userId);
  if (!profile) throw createError({ statusCode: 403, message: "Forbidden" });

  const rows = await db
    .select()
    .from(schema.curriculumDrafts)
    .where(
      and(
        eq(schema.curriculumDrafts.id, draftId),
        eq(schema.curriculumDrafts.orgId, profile.schoolId),
      ),
    )
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
  if (!lessonId)
    throw createError({ statusCode: 400, message: "Missing lessonId" });

  const db = getDb();
  const rows = await db
    .select()
    .from(schema.lessonNotes)
    .where(eq(schema.lessonNotes.id, lessonId))
    .limit(1);

  if (!rows[0]) throw createError({ statusCode: 404, message: "Not found" });
  const lesson = rows[0];

  const profile = await getSchoolProfile(db, session.userId);
  if (!profile) throw createError({ statusCode: 403, message: "Forbidden" });

  // Keep lessons inside their own school.
  const [cls] = await db
    .select({ id: schema.classes.id, orgId: schema.classes.orgId })
    .from(schema.classes)
    .where(eq(schema.classes.id, lesson.classId))
    .limit(1);
  if (cls && cls.orgId && cls.orgId !== profile.schoolId) {
    throw createError({ statusCode: 404, message: "Not found" });
  }

  // Students may only read finalized lessons for classes they are enrolled in —
  // never another class's material, and never a teacher's unfinished draft.
  if (profile.schoolRole === "student") {
    if (lesson.status !== "finalized") {
      throw createError({ statusCode: 404, message: "Not found" });
    }
    const [enrolment] = await db
      .select({ id: schema.classEnrollments.id })
      .from(schema.classEnrollments)
      .where(
        and(
          eq(schema.classEnrollments.classId, lesson.classId),
          eq(schema.classEnrollments.studentUserId, session.userId),
          eq(schema.classEnrollments.status, "active"),
        ),
      )
      .limit(1);
    if (!enrolment) {
      throw createError({ statusCode: 403, message: "Forbidden" });
    }
  }

  return lesson;
});

export const finalizeLessonNote = defineEventHandler(async (event) => {
  const session = await requireSession(event);
  const lessonId = getRouterParam(event, "lessonId");
  if (!lessonId)
    throw createError({ statusCode: 400, message: "Missing lessonId" });

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
  if (!assessmentId)
    throw createError({ statusCode: 400, message: "Missing assessmentId" });

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
    const studentRecordId = await getMyStudentRecordId(db, session.userId);
    const assigned = await db
      .select()
      .from(schema.studentAssessments)
      .where(
        and(
          eq(
            schema.studentAssessments.studentId,
            studentRecordId ?? "__none__",
          ),
          eq(schema.studentAssessments.assessmentId, assessmentId),
        ),
      )
      .limit(1);

    const myVariantId = assigned[0]?.variantId;
    const myVariant =
      variants.find((v: any) => v.id === myVariantId) ?? variants[0] ?? null;

    const submission = await db
      .select()
      .from(schema.submissions)
      .where(
        and(
          eq(schema.submissions.studentId, studentRecordId ?? "__none__"),
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
    db
      .select({ c: count() })
      .from(schema.submissions)
      .where(
        and(
          eq(schema.submissions.assessmentId, assessmentId),
          inArray(schema.submissions.status, ["submitted", "graded"]),
        ),
      ),
    db
      .select({ c: count() })
      .from(schema.submissions)
      .where(
        and(
          eq(schema.submissions.assessmentId, assessmentId),
          eq(schema.submissions.status, "graded"),
        ),
      ),
    db
      .select({ c: count() })
      .from(schema.studentAssessments)
      .where(eq(schema.studentAssessments.assessmentId, assessmentId)),
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

// ─── Assessment Variants list ─────────────────────────────────────────────────

export const listVariants = defineEventHandler(async (event) => {
  const session = await requireSession(event);
  const db = getDb();
  const profile = await getSchoolProfile(db, session.userId);
  if (!profile) return [];

  const q = getQuery(event);
  const assessmentId = q.assessmentId as string | undefined;
  if (!assessmentId) return [];

  return db
    .select()
    .from(schema.assessmentVariants)
    .where(eq(schema.assessmentVariants.assessmentId, assessmentId))
    .orderBy(asc(schema.assessmentVariants.position));
});

// ─── Submissions list (teacher view) ─────────────────────────────────────────

export const listSubmissions = defineEventHandler(async (event) => {
  const session = await requireSession(event);
  const db = getDb();
  const profile = await getSchoolProfile(db, session.userId);
  if (!profile) return [];

  const q = getQuery(event);
  const assessmentId = q.assessmentId as string | undefined;
  const status = q.status as string | undefined;
  if (!assessmentId) return [];

  const conditions: any[] = [eq(schema.submissions.assessmentId, assessmentId)];
  if (status) conditions.push(eq(schema.submissions.status, status));

  const subs = await db
    .select()
    .from(schema.submissions)
    .where(and(...conditions))
    .orderBy(desc(schema.submissions.submittedAt));

  if (subs.length === 0) return [];

  const studentIds = [...new Set(subs.map((s: any) => s.studentId))];
  const userRows = (await db.all(
    sql`SELECT id, name, email FROM "user" WHERE id IN (${sql.join(
      studentIds.map((id: string) => sql`${id}`),
      sql`, `,
    )})`,
  )) as Array<{ id: string; name: string; email: string }>;
  const userMap: Record<string, { name: string; email: string }> = {};
  for (const u of userRows) userMap[u.id] = { name: u.name, email: u.email };

  const gradeRows = await db
    .select()
    .from(schema.grades)
    .where(
      inArray(
        schema.grades.submissionId,
        subs.map((s: any) => s.id),
      ),
    );
  const gradeMap: Record<string, any> = {};
  for (const g of gradeRows) gradeMap[g.submissionId] = g;

  return subs.map((s: any) => {
    const g = gradeMap[s.id];
    return {
      ...s,
      studentName: userMap[s.studentId]?.name ?? null,
      studentEmail: userMap[s.studentId]?.email ?? null,
      score: g?.score ?? null,
      maxScore: g?.maxScore ?? null,
      feedback: g?.feedback ?? null,
      gradePublished: g ? !!g.isPublished : false,
    };
  });
});
