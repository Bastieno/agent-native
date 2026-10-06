import { eq } from "drizzle-orm";
import { getDb, schema } from "../db/index.js";
import { getUserLabels, realNameOrNull } from "./user-names.js";

/**
 * Who wrote, edited or declared a lesson note ready.
 *
 * An admin has every class in the school, so they can plan, edit and finalize
 * any teacher's note — deliberately, because someone has to cover an absence
 * and someone has to set a subject up before its teacher exists.
 *
 * What would be wrong is doing it silently. A teacher opening their class to
 * find a note marked ready that they never wrote deserves to know who marked
 * it, and a parent asking what was taught deserves an answer better than "the
 * system says so". So the act is attributed wherever the note is read, by
 * both portals.
 *
 * Nothing here judges whether the act was appropriate. It records who did it.
 */

export type Actor = {
  userId: string;
  name: string | null;
  email: string | null;
  role: string | null;
};

const ROLE_WORD: Record<string, string> = {
  school_admin: "admin",
  subject_coordinator: "coordinator",
  teacher: "teacher",
  student: "student",
};

/** The word for a role as a person would say it, not as SQL stores it. */
export function roleWord(role: string | null | undefined): string | null {
  if (!role) return null;
  return ROLE_WORD[role] ?? role.replace(/_/g, " ");
}

/**
 * Names and roles for a set of user IDs, in one pass.
 *
 * Roles matter here in a way they usually do not: "finalised by Adaeze Okafor"
 * reads very differently from "finalised by Adaeze Okafor (admin)" when the
 * person reading is the teacher who did not write it.
 */
export async function describeActors(
  userIds: Array<string | null | undefined>,
): Promise<Record<string, Actor>> {
  const ids = [...new Set(userIds.filter((id): id is string => !!id))];
  const out: Record<string, Actor> = {};
  if (ids.length === 0) return out;

  const labels = await getUserLabels(ids);
  const db = getDb();
  const roles: Record<string, string> = {};
  for (const id of ids) {
    const [profile] = await db
      .select({ schoolRole: schema.schoolProfiles.schoolRole })
      .from(schema.schoolProfiles)
      .where(eq(schema.schoolProfiles.userId, id))
      .limit(1);
    if (profile?.schoolRole) roles[id] = profile.schoolRole;
  }

  for (const id of ids) {
    out[id] = {
      userId: id,
      name: labels[id]?.name ?? null,
      email: labels[id]?.email ?? null,
      role: roles[id] ?? null,
    };
  }
  return out;
}

/**
 * "Adaeze Okafor (admin)" — or "an admin" when the account has no real name.
 *
 * Signing up asks only for an email, so a name is often just the address's
 * local part. Printing that gives "admin (admin)", which reads like a bug and
 * tells the teacher nothing. The role alone is honest and still useful: what
 * matters to them is that an admin did it, not which string the account holds.
 */
export function actorLabel(actor: Actor | null | undefined): string | null {
  if (!actor) return null;
  const word = roleWord(actor.role);
  const real = realNameOrNull(actor.name, actor.email);
  if (real) return word ? `${real} (${word})` : real;
  if (!word) return null;
  return /^[aeiou]/i.test(word) ? `an ${word}` : `a ${word}`;
}
