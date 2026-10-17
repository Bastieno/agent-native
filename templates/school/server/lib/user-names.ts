import { sql } from "drizzle-orm";
import { getDb } from "../db/index.js";
import { realNameOrNull } from "../../shared/person-name.js";

export interface UserLabel {
  name: string | null;
  email: string | null;
}

/**
 * Look up display names for user IDs in one query.
 *
 * Actions return IDs because that is what the tables hold, but an ID is
 * useless to whoever reads the answer — a teacher, or an agent explaining it.
 * Actions pair each ID with a name so a question like "who teaches JSS1A?"
 * costs one call instead of three.
 */
export async function getUserLabels(
  userIds: Array<string | null | undefined>,
): Promise<Record<string, UserLabel>> {
  const ids = [...new Set(userIds.filter((id): id is string => !!id))];
  const out: Record<string, UserLabel> = {};
  if (ids.length === 0) return out;

  const db = getDb();
  const rows = (await db.all(
    sql`SELECT id, name, email FROM "user" WHERE id IN (${sql.join(
      ids.map((id) => sql`${id}`),
      sql`, `,
    )})`,
  )) as Array<{ id: string; name: string | null; email: string | null }>;

  for (const r of rows) out[r.id] = { name: r.name, email: r.email };
  return out;
}

/** A human label for a user ID: their name, else their email, else null. */
export function labelFor(
  map: Record<string, UserLabel>,
  userId: string | null | undefined,
): string | null {
  if (!userId) return null;
  const entry = map[userId];
  return entry?.name ?? entry?.email ?? null;
}

// The rule itself is shared with the UI, which greets people by name and must
// not greet anyone as "student1".
export { realNameOrNull };

/** The name and email of one user, by email address. */
export async function userByEmail(
  email: string,
): Promise<{ name: string | null; email: string } | null> {
  const row = (await getDb().get(
    sql`SELECT name, email FROM "user" WHERE LOWER(email) = ${email.toLowerCase()} LIMIT 1`,
  )) as { name: string | null; email: string } | undefined;
  return row ?? null;
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
export async function applyInvitedName(
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
