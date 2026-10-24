/**
 * Which school a signed-in person belongs to, and what they may do there
 * before they have a profile.
 *
 * One deployment serves many schools, so everything here starts from the
 * person: the schools they are a member of, and the ones that have invited
 * them. It never reads another school's settings to find out — the session
 * handler used to scan the whole settings table on every load, and decided
 * from any school's state what this person should see.
 */
import { getDbExec } from "@agent-native/core/db";
import { getOrgSetting } from "@agent-native/core/settings";

export type InviteKind = "staff" | "student";

export interface PendingInvite {
  orgId: string;
  kind: InviteKind;
  /** The entry as the school recorded it: name, schoolRole, year group… */
  invite: Record<string, any>;
}

/**
 * What a signed-in person without a school profile sees.
 *
 * - `none`: not part of any school.
 * - `setup`: owner or admin of a school that is not set up yet.
 * - `waiting`: a member of a school who has not been given a role in it.
 */
export type SchoolAccess = "none" | "setup" | "waiting";

const SETTING: Record<InviteKind, string> = {
  staff: "pending-staff-invites",
  student: "pending-student-invites",
};

function lower(email: string): string {
  return email.trim().toLowerCase();
}

/**
 * The schools that could hold an invitation for this address: the ones it is
 * already a member of, then any with a pending framework invitation.
 *
 * Signing up turns pending invitations into memberships, so for a new account
 * membership is enough. An account that existed before it was invited keeps
 * its invitation pending, which is why those are included too. `activeOrgId`,
 * when given, goes first.
 */
export async function candidateOrgsFor(
  email: string,
  activeOrgId?: string | null,
): Promise<string[]> {
  const exec = getDbExec();
  const address = lower(email);
  const orgs: string[] = [];
  const add = (id: unknown) => {
    const orgId = id == null ? "" : String(id);
    if (orgId && !orgs.includes(orgId)) orgs.push(orgId);
  };
  if (activeOrgId) add(activeOrgId);
  try {
    const { rows } = await exec.execute({
      sql: `SELECT org_id FROM org_members WHERE LOWER(email) = ?`,
      args: [address],
    });
    for (const r of rows as any[]) add(r.org_id);
  } catch {
    // No org tables yet: nobody belongs to anything.
  }
  try {
    const { rows } = await exec.execute({
      sql: `SELECT org_id FROM org_invitations WHERE LOWER(email) = ? AND status = 'pending' ORDER BY created_at DESC`,
      args: [address],
    });
    for (const r of rows as any[]) add(r.org_id);
  } catch {
    // As above.
  }
  return orgs;
}

/**
 * The first school, in the order given, holding an invitation for this
 * address. A staff invitation wins over a student one in the same school.
 * Only one is returned: someone invited by two schools joins the first, and
 * the other invitation stays pending.
 */
export async function findPendingInvite(
  email: string,
  orgs: string[],
): Promise<PendingInvite | null> {
  const address = lower(email);
  for (const orgId of orgs) {
    for (const kind of ["staff", "student"] as const) {
      const list = (await getOrgSetting(orgId, SETTING[kind])) as unknown;
      if (!Array.isArray(list)) continue;
      const invite = list.find(
        (inv: any) =>
          typeof inv?.email === "string" && lower(inv.email) === address,
      );
      if (invite) return { orgId, kind, invite };
    }
  }
  return null;
}

/** This address's framework role in an organisation, or null if not a member. */
export async function orgRoleFor(
  orgId: string,
  email: string,
): Promise<string | null> {
  try {
    const { rows } = await getDbExec().execute({
      sql: `SELECT role FROM org_members WHERE org_id = ? AND LOWER(email) = ? LIMIT 1`,
      args: [orgId, lower(email)],
    });
    const role = (rows[0] as any)?.role;
    return role == null ? null : String(role);
  } catch {
    return null;
  }
}

/** Whether an organisation role may set a school up: its owner or an admin. */
export function mayRunSetup(orgRole: string | null): boolean {
  return orgRole === "owner" || orgRole === "admin";
}

/**
 * Where a person with no school profile stands in their active school.
 *
 * Only the active school is looked at; activation, which searches every
 * candidate school, has already run by the time this matters.
 */
export async function accessWithoutProfile(
  email: string,
  activeOrgId: string | null | undefined,
): Promise<{ access: SchoolAccess; schoolName: string | null }> {
  if (!activeOrgId) return { access: "none", schoolName: null };
  const orgRole = await orgRoleFor(activeOrgId, email);
  if (!orgRole) return { access: "none", schoolName: null };

  const config = (await getOrgSetting(activeOrgId, "school-config")) as {
    name?: string;
  } | null;
  let schoolName = config?.name ?? null;
  if (!schoolName) {
    try {
      const { rows } = await getDbExec().execute({
        sql: `SELECT name FROM organizations WHERE id = ? LIMIT 1`,
        args: [activeOrgId],
      });
      schoolName = ((rows[0] as any)?.name as string | undefined) ?? null;
    } catch {
      // A name is a courtesy.
    }
  }

  if (!config && mayRunSetup(orgRole)) return { access: "setup", schoolName };
  return { access: "waiting", schoolName };
}
