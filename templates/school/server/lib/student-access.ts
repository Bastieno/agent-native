import { sql, eq, and } from "drizzle-orm";
import { getDb, schema } from "../db/index.js";

/** The signed-in user's ID, looked up by email (actions only carry the email). */
export async function getUserIdByEmail(email: string): Promise<string | null> {
  const db = getDb();
  const row = (await db.get(
    sql`SELECT id FROM "user" WHERE email = ${email} LIMIT 1`,
  )) as { id: string } | undefined;
  return row?.id ?? null;
}

export async function getSchoolRole(email: string): Promise<string | null> {
  const db = getDb();
  const userId = await getUserIdByEmail(email);
  if (!userId) return null;
  const [profile] = await db
    .select({ schoolRole: schema.schoolProfiles.schoolRole })
    .from(schema.schoolProfiles)
    .where(eq(schema.schoolProfiles.userId, userId))
    .limit(1);
  return profile?.schoolRole ?? null;
}

/**
 * Resolve which student record an action should act on.
 *
 * Students may only ever act on their own record: passing someone else's ID is
 * rejected rather than silently honoured. Staff (teacher/admin/coordinator) and
 * the agent acting on their behalf must pass an explicit `requestedStudentId`.
 */
export async function resolveStudentId(
  email: string | null | undefined,
  requestedStudentId?: string,
  orgId?: string,
): Promise<string> {
  const db = getDb();
  const role = email ? await getSchoolRole(email) : null;

  if (role === "student") {
    const userId = await getUserIdByEmail(email!);
    const [own] = await db
      .select({ id: schema.students.id })
      .from(schema.students)
      .where(
        orgId
          ? and(
              eq(schema.students.userId, userId ?? "__none__"),
              eq(schema.students.orgId, orgId),
            )
          : eq(schema.students.userId, userId ?? "__none__"),
      )
      .limit(1);
    if (!own) throw new Error("No student record for the signed-in user.");
    if (requestedStudentId && requestedStudentId !== own.id) {
      throw new Error("Students can only act on their own work.");
    }
    return own.id;
  }

  if (!requestedStudentId) {
    throw new Error("studentId is required.");
  }
  return requestedStudentId;
}
