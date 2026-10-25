/**
 * A school's own address only serves that school's people.
 *
 * Cookies are per host, so signing in at one school's address does not sign
 * anyone in at another's. This is the other half: an account that belongs to
 * other schools but not this one is refused here, rather than shown a school
 * it was never part of. Someone with no school yet may pass, because an
 * invitation is matched by email at their first sign-in.
 *
 * A person in several schools acts in the one whose address they are using.
 */
import { defineEventHandler, getRequestHost, setResponseStatus } from "h3";
import { getSession } from "@agent-native/core/server";
import { putUserSetting } from "@agent-native/core/settings";
import { resolveOrgIdForEmail } from "@agent-native/core/org";
import { getDbExec } from "@agent-native/core/db";
import { orgForHost } from "../lib/school-host.js";

/** Reachable by anyone, so that a refused person can still sign out. */
const OPEN = [
  "/_agent-native/auth",
  "/_agent-native/poll",
  "/api/session",
  "/api/school/session",
];

function under(path: string, prefixes: string[]): boolean {
  return prefixes.some((p) => path === p || path.startsWith(`${p}/`));
}

export default defineEventHandler(async (event) => {
  const path = event.url?.pathname ?? "";
  if (!path.startsWith("/_agent-native/") && !path.startsWith("/api/")) return;

  const hostOrg = await orgForHost(
    getRequestHost(event, { xForwardedHost: true }),
  );
  if (!hostOrg) return;

  const session = await getSession(event).catch(() => null);
  if (!session?.email) return; // the route itself refuses the anonymous
  const email = session.email.toLowerCase();

  const { rows } = await getDbExec().execute({
    sql: `SELECT org_id FROM org_members WHERE LOWER(email) = ?`,
    args: [email],
  });
  const orgs = rows.map((r: any) => String(r.org_id ?? r.orgId));
  if (orgs.length === 0 || orgs.includes(hostOrg)) {
    if (orgs.length > 1 && (await resolveOrgIdForEmail(email)) !== hostOrg) {
      await putUserSetting(email, "active-org-id", { orgId: hostOrg });
    }
    // Their session may already carry another school; the setting above
    // covers the next request, and the session endpoint answers for this one.
    return;
  }

  if (under(path, OPEN)) return;
  setResponseStatus(event, 403);
  return {
    error: "This address belongs to another school.",
    code: "wrong-school",
  };
});
