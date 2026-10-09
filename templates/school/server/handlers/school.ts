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
import { putUserSetting } from "@agent-native/core/settings";
import { realNameOrNull } from "../lib/user-names.js";
import { withOrgSettingLock } from "../lib/org-setting-lock.js";
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
    const existing = await db.get(
      sql`SELECT id FROM org_members WHERE org_id = ${orgId} AND LOWER(email) = ${email.toLowerCase()} LIMIT 1`,
    );
    if (!existing) {
      await db.run(
        sql`INSERT INTO org_members (id, org_id, email, role, joined_at) VALUES (${nanoid()}, ${orgId}, ${email.toLowerCase()}, 'member', ${Date.now()})`,
      );
    }
    // Point them at the school, not at whatever org signing up made for them.
    await putUserSetting(email.toLowerCase(), "active-org-id", { orgId });
  } catch {
    // Never block a sign-in over this; the profile is already created.
  }
}

/**
 * Give a newly activated person the name they were invited under.
 *
 * Signing up asks only for an email and password, so the framework fills the
 * name in from the address: `teacher.maths@pilot.test` becomes
 * "teacher.maths". The name the admin typed when inviting — "Ben Wood" —
 * lived only in the pending invite and was thrown away on activation, so the
 * staff list, the gradebook and a parent's report card all ended up reading
 * "teacher.maths" and "student1".
 *
 * Only a derived name is replaced: one that matches the front of the address.
 * A name someone chose themselves is never overwritten by an admin's typing.
 */
async function applyInvitedName(
  db: any,
  userId: string,
  email: string,
  invitedName: unknown,
): Promise<void> {
  const name = typeof invitedName === "string" ? invitedName.trim() : "";
  if (!name) return;
  try {
    const row = (await db.get(
      sql`SELECT name FROM "user" WHERE id = ${userId} LIMIT 1`,
    )) as { name: string | null } | undefined;
    if (realNameOrNull(row?.name, email)) return; // they named themselves
    await db.run(sql`UPDATE "user" SET name = ${name} WHERE id = ${userId}`);
  } catch {
    // A name is worth having, not worth failing a sign-in for.
  }
}

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
    await ensureSchoolMembership(db, orgId, email);
    await applyInvitedName(db, userId, email, match.name);
    // Remove from pending list so they no longer show under "Pending invitations"
    const remaining = invites.filter(
      (inv: any) => inv.email?.toLowerCase() !== email.toLowerCase(),
    );
    await withOrgSettingLock(`${orgId}:pending-staff-invites`, async () => {
      const current = ((await getOrgSetting(orgId, "pending-staff-invites")) ??
        []) as any[];
      await putOrgSetting(
        orgId,
        "pending-staff-invites",
        current.filter(
          (inv: any) => inv.email?.toLowerCase() !== email.toLowerCase(),
        ) as any,
      );
    });
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
    await ensureSchoolMembership(db, orgId, email);
    await applyInvitedName(db, userId, email, match.name);
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
    // Taking this invitation off the list is a read-modify-write like
    // adding one, so it takes the same lock: two learners signing in at the
    // same moment would otherwise each write back a list still containing
    // the other, and one of them would be activated twice on a later visit.
    await withOrgSettingLock(`${orgId}:pending-student-invites`, async () => {
      const current = ((await getOrgSetting(
        orgId,
        "pending-student-invites",
      )) ?? []) as any[];
      await putOrgSetting(
        orgId,
        "pending-student-invites",
        current.filter(
          (inv: any) => inv.email?.toLowerCase() !== email.toLowerCase(),
        ) as any,
      );
    });
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

  // The session carries no name, so the portals had none to greet anyone by.
  // It is read here rather than in each page: every portal wants it, and a
  // name set at activation should show up without another round trip.
  let name: string | null = (session as any).name ?? null;
  if (!name && session.userId) {
    try {
      const row = (await db.get(
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
