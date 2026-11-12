import { getDbExec } from "@agent-native/core/db";
import { currentAccess } from "@agent-native/core/sharing";
import { ensureBooksSetup } from "./setup.js";

export const OWNER_ONLY = "Only the owner can change Books.";

/** The org the current request acts in. */
export function requireOrg(): string {
  const { orgId } = currentAccess();
  if (!orgId) throw new Error("No organisation selected.");
  return orgId;
}

export function requireEmail(): string {
  const { userEmail } = currentAccess();
  if (!userEmail) throw new Error("Not signed in.");
  return userEmail;
}

/** The current user's role in the current org: owner, admin, member, or null. */
export async function currentRole(): Promise<string | null> {
  const { orgId, userEmail } = currentAccess();
  if (!orgId || !userEmail) return null;
  const res = await getDbExec().execute({
    sql: `SELECT role FROM org_members WHERE org_id = ? AND LOWER(email) = LOWER(?)`,
    args: [orgId, userEmail],
  });
  const row = res.rows[0] as { role?: string } | undefined;
  return row?.role ?? null;
}

/** Owners and admins change Books; members (the partner) only read. */
export async function assertOwner(): Promise<void> {
  const role = await currentRole();
  if (role !== "owner" && role !== "admin") throw new Error(OWNER_ONLY);
}

/** For write actions: the owner's org, set up and ready. */
export async function ownerOrg(): Promise<string> {
  await assertOwner();
  const orgId = requireOrg();
  await ensureBooksSetup(orgId);
  return orgId;
}

/** For read actions: any member's org, set up and ready. */
export async function memberOrg(): Promise<string> {
  const orgId = requireOrg();
  await ensureBooksSetup(orgId);
  return orgId;
}
