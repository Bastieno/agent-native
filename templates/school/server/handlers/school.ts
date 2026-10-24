import { defineEventHandler, getRouterParam, getQuery, createError } from "h3";
import { getSession, runWithRequestContext } from "@agent-native/core/server";
import { getDb, schema } from "../db/index.js";
import { eq, and, desc, asc, inArray, sql, count } from "drizzle-orm";
import { getOrgSetting, putOrgSetting } from "@agent-native/core/settings";
import { getOrgContext } from "@agent-native/core/org";
import { nanoid } from "nanoid";
import { putUserSetting } from "@agent-native/core/settings";
import { applyInvitedName } from "../lib/user-names.js";
import { withOrgSettingLock } from "../lib/org-setting-lock.js";
import {
  accessWithoutProfile,
  candidateOrgsFor,
  findPendingInvite,
  type PendingInvite,
  type SchoolAccess,
} from "../lib/school-access.js";
import {
  assertClassAccess,
  assertAssessmentAccess,
} from "../lib/class-access.js";
import { rowOf, runSql } from "../lib/raw-sql.js";

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
    const row = (await rowOf(
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
 * Put a newly activated person in the school's own org.
 *
 * The framework decides which org a request reads from by membership. Staff
 * invitations always recorded one; student invitations did not, so a student
 * who signed up was given a brand-new org of their own and every school read
 * came back empty — no school name, no grading scale, no classes. The same
 * happens to anyone who signed up before being invited, whatever their role.
 *
 * Making the membership at activation covers both, whether or not the
 * invitation was ever recorded.
 */
async function ensureSchoolMembership(
  db: any,
  orgId: string,
  email: string,
): Promise<void> {
  try {
    const existing = await rowOf(
      sql`SELECT id FROM org_members WHERE org_id = ${orgId} AND LOWER(email) = ${email.toLowerCase()} LIMIT 1`,
    );
    if (!existing) {
      await runSql(
        sql`INSERT INTO org_members (id, org_id, email, role, joined_at) VALUES (${nanoid()}, ${orgId}, ${email.toLowerCase()}, 'member', ${Date.now()})`,
      );
    }
    // An account made before it was invited still holds the framework
    // invitation as pending; it is used now.
    await runSql(
      sql`UPDATE org_invitations SET status = 'accepted' WHERE org_id = ${orgId} AND LOWER(email) = ${email.toLowerCase()} AND status = 'pending'`,
    );
    // Point them at the school, not at whatever org signing up made for them.
    await putUserSetting(email.toLowerCase(), "active-org-id", { orgId });
  } catch {
    // Never block a sign-in over this; the profile is already created.
  }
}

/**
 * Turn an invitation into a school profile, the first time the invited person
 * signs in, so they land in the right portal without the admin running
 * finalize-staff-invite. A student also gets their academic record.
 */
async function activateInvite(
  db: any,
  userId: string,
  email: string,
  found: PendingInvite,
): Promise<{ schoolRole: string; schoolId: string }> {
  const { orgId, kind, invite: match } = found;
  const schoolRole =
    kind === "student" ? "student" : (match.schoolRole as string);
  await db.insert(schema.schoolProfiles).values({
    id: nanoid(),
    userId,
    schoolId: orgId,
    schoolRole,
    status: "active",
  });
  await ensureSchoolMembership(db, orgId, email);
  await applyInvitedName(db, userId, email, match.name);
  if (kind === "student") {
    // Create student academic record, carrying whatever the invitation knew.
    //
    // The record cannot exist before this moment — there is no account to
    // attach it to — so an answer given at invitation had nowhere to live and
    // was simply lost. Keeping it on the invite and writing it here means the
    // admin answers once, when they know, rather than being asked to remember
    // weeks later that a student they invited has no year group.
    await db.insert(schema.students).values({
      id: nanoid(),
      userId,
      schoolId: orgId,
      gradeLevelId: match.gradeLevelId ?? null,
      customFieldsJson: JSON.stringify(match.fields ?? {}),
      status: "active",
      ownerEmail: email,
      orgId,
      visibility: "org",
    });
  }
  // Taking this invitation off the list is a read-modify-write like adding
  // one, so it takes the same lock: two people signing in at the same moment
  // would otherwise each write back a list still containing the other, and
  // one of them would be activated twice on a later visit.
  const key =
    kind === "student" ? "pending-student-invites" : "pending-staff-invites";
  await withOrgSettingLock(`${orgId}:${key}`, async () => {
    const current = ((await getOrgSetting(orgId, key)) ?? []) as any[];
    await putOrgSetting(
      orgId,
      key,
      current.filter(
        (inv: any) => inv.email?.toLowerCase() !== email.toLowerCase(),
      ) as any,
    );
  });
  return { schoolRole, schoolId: orgId };
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

  // The school this request acts in, as every action sees it.
  const activeOrgId = session.email ? (await getOrgContext(event)).orgId : null;

  // An invited person's first sign-in: activate them from their own schools'
  // invitations, the active one first. Never from anyone else's.
  if (!profile && session.userId && session.email) {
    const found = await findPendingInvite(
      session.email,
      await candidateOrgsFor(session.email, activeOrgId),
    );
    if (found) {
      profile = await activateInvite(db, session.userId, session.email, found);
    }
  }

  // Still no profile: where they stand in their own school decides whether
  // they set it up, wait to be given a role, or are not part of a school.
  let access: SchoolAccess | null = null;
  let schoolName: string | null = null;
  if (!profile && session.email) {
    ({ access, schoolName } = await accessWithoutProfile(
      session.email,
      activeOrgId,
    ));
  }

  // The session carries no name, so the portals had none to greet anyone by.
  // It is read here rather than in each page: every portal wants it, and a
  // name set at activation should show up without another round trip.
  let name: string | null = (session as any).name ?? null;
  if (!name && session.userId) {
    try {
      const row = (await rowOf(
        sql`SELECT name FROM "user" WHERE id = ${session.userId} LIMIT 1`,
      )) as { name: string | null } | undefined;
      name = row?.name ?? null;
    } catch {
      // A greeting is not worth failing the session over.
    }
  }

  return {
    user: { id: session.userId, email: session.email, name },
    schoolRole: profile?.schoolRole ?? null,
    schoolId: profile?.schoolId ?? null,
    access,
    schoolName,
    // Kept for older clients: anyone who may not set a school up.
    accessDenied: access === "none" || access === "waiting",
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
