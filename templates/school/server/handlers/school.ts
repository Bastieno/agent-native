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

// ─── Staff list (active + pending invites) ───────────────────────────────────

// ─── School config ────────────────────────────────────────────────────────────

// ─── Custom fields schema ─────────────────────────────────────────────────────

// ─── Subjects ─────────────────────────────────────────────────────────────────

// ─── Units ────────────────────────────────────────────────────────────────────

// ─── Classes ─────────────────────────────────────────────────────────────────

// ─── Teacher's own classes ────────────────────────────────────────────────────

// ─── Class detail (student view) ─────────────────────────────────────────────

// ─── Students ─────────────────────────────────────────────────────────────────

// ─── All students (admin view) ────────────────────────────────────────────────

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

// ─── Lessons ─────────────────────────────────────────────────────────────────

// ─── Assessments ─────────────────────────────────────────────────────────────

// ─── Assessment Variants list ─────────────────────────────────────────────────

// ─── Submissions list (teacher view) ─────────────────────────────────────────
