import { sql } from "drizzle-orm";
import { getDb } from "../db/index.js";

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
