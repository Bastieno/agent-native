import { eq } from "drizzle-orm";
import { currentAccess } from "@agent-native/core/sharing";
import { getDb, schema } from "../db/index.js";

export interface SchoolProfileRow {
  id: string;
  userId: string;
  schoolId: string;
  schoolRole: string;
  status: string;
}

/**
 * A person's profile in the school they are acting in.
 *
 * Someone can belong to two schools (a teacher who works at both, or a head
 * who is also on a demo school), so a profile looked up by user alone is
 * whichever row the database returns first: the session then showed one
 * school's role at the other's address, and permission checks ran against
 * the wrong school. The school comes from `orgId`, or from the request when
 * none is given. With no match there, the first profile is returned, as
 * before, so a single-school account is unaffected.
 */
export async function schoolProfileFor(
  userId: string,
  orgId?: string | null,
): Promise<SchoolProfileRow | null> {
  const rows = (await getDb()
    .select()
    .from(schema.schoolProfiles)
    .where(eq(schema.schoolProfiles.userId, userId))) as SchoolProfileRow[];
  if (!rows.length) return null;
  const school = orgId === undefined ? requestOrgId() : orgId;
  return (school && rows.find((r) => r.schoolId === school)) || rows[0];
}

function requestOrgId(): string | null {
  try {
    return currentAccess().orgId ?? null;
  } catch {
    // Outside a request (scripts, jobs): no school to prefer.
    return null;
  }
}
