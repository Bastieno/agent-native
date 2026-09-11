import { currentAccess } from "@agent-native/core/sharing";
import { getUserIdByEmail, getSchoolRole } from "./student-access.js";
import { studentRecordIdForUser } from "./class-access.js";

/**
 * Resolve which student an action is about.
 *
 * The UI has no student id to pass — the signed-in user *is* the student — so
 * these default to the caller. Staff still pass an explicit id to look at a
 * particular learner; the action guard separately stops a student naming
 * anyone but themselves.
 */
export async function resolveStudentId(
  requested?: string,
): Promise<string | undefined> {
  if (requested) return requested;
  const { userEmail } = currentAccess();
  if (!userEmail) return undefined;
  const role = await getSchoolRole(userEmail);
  if (role !== "student") return undefined;
  const userId = await getUserIdByEmail(userEmail);
  if (!userId) return undefined;
  return (await studentRecordIdForUser(userId)) ?? undefined;
}

/** The same, for actions keyed by the auth user id rather than the record id. */
export async function resolveUserId(
  requested?: string,
): Promise<string | undefined> {
  if (requested) return requested;
  const { userEmail } = currentAccess();
  if (!userEmail) return undefined;
  const role = await getSchoolRole(userEmail);
  if (role !== "student") return undefined;
  return (await getUserIdByEmail(userEmail)) ?? undefined;
}
