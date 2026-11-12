import { createError, type H3Event } from "h3";
import { getSession, runWithRequestContext } from "@agent-native/core/server";
import { getOrgContext } from "@agent-native/core/org";

/**
 * Hand-written /api routes don't get a request context automatically, so
 * read the session and org here and run the handler inside them.
 */
export async function withRequestAccess<T>(
  event: H3Event,
  fn: (orgId: string) => Promise<T>,
): Promise<T> {
  const session = await getSession(event);
  if (!session?.email)
    throw createError({ statusCode: 401, statusMessage: "Sign in" });
  const { orgId } = await getOrgContext(event);
  if (!orgId)
    throw createError({ statusCode: 403, statusMessage: "No organisation" });
  return runWithRequestContext({ userEmail: session.email, orgId }, () =>
    fn(orgId),
  ) as Promise<T>;
}
