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
import {
  assertClassAccess,
  assertAssessmentAccess,
} from "../lib/class-access.js";

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

/**
 * Build the actor used for row-level checks, or throw if the caller is not a
 * member of a school.
 */
async function requireActor(db: any, session: any) {
  const profile = await getSchoolProfile(db, session.userId);
  if (!profile) throw createError({ statusCode: 403, message: "Forbidden" });
  return {
    userId: session.userId as string,
    schoolId: profile.schoolId as string,
    schoolRole: profile.schoolRole as string,
  };
}

function isStaff(role: string): boolean {
  return (
    role === "school_admin" ||
    role === "subject_coordinator" ||
    role === "teacher"
  );
}

/** Turn an AccessDeniedError into a 403 rather than a 500. */
async function guard(fn: () => Promise<void>): Promise<void> {
  try {
    await fn();
  } catch (err: any) {
    if (err?.name === "AccessDeniedError") {
      throw createError({ statusCode: 403, message: err.message });
    }
    throw err;
  }
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

// ─── Custom fields schema ─────────────────────────────────────────────────────

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

// ─── Class detail (student view) ─────────────────────────────────────────────

// ─── Students ─────────────────────────────────────────────────────────────────

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

// ─── Lessons list (by classId) ────────────────────────────────────────────────

// ─── Assessments list (by classId) ───────────────────────────────────────────

// ─── Class students list ──────────────────────────────────────────────────────

// ─── Gradebook ────────────────────────────────────────────────────────────────

// ─── Analytics ────────────────────────────────────────────────────────────────

// ─── My assessments (student) ─────────────────────────────────────────────────

// ─── My grades (student) ──────────────────────────────────────────────────────

// ─── My progress (student) ───────────────────────────────────────────────────

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

// ─── Assessments ─────────────────────────────────────────────────────────────

// ─── Assessment Variants list ─────────────────────────────────────────────────

// ─── Submissions list (teacher view) ─────────────────────────────────────────
