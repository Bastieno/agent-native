// guard:allow-unscoped — the operator's own tables (audit) and cross-school views; every caller passes requireOperator first.
import {
  createError,
  getMethod,
  getRequestHeader,
  getRequestHost,
  type H3Event,
} from "h3";
import { sql } from "drizzle-orm";
import { nanoid } from "nanoid";
import { operatorEmails } from "../credits.js";
import { normalizeHost, orgForHost } from "../school-host.js";
import { runSql } from "../raw-sql.js";
import { readSession } from "./session.js";

/**
 * The operator console is Ellai's own, not a school's. It lives on the shared
 * address (`ellai.dev`) and nowhere else: a school's address answers 404 for
 * every operator path, so a school's people cannot find it, and the allow-list
 * (`ELLAI_OPERATOR_EMAILS`) decides who may use it there.
 *
 * Its routes are hand-written Nitro routes and deliberately not actions, so
 * they are never a tool the assistant or a connected AI app can call.
 */

export function baseDomain(): string {
  return (process.env.SCHOOL_BASE_DOMAIN?.trim() || "ellai.dev").toLowerCase();
}

/** Why a request is not on the operator's address, or null when it is. */
export async function wrongHost(event: H3Event): Promise<boolean> {
  const host = normalizeHost(getRequestHost(event, { xForwardedHost: true }));
  if (!host) return true;
  // A host that belongs to a school never serves the console.
  if (await orgForHost(host)) return true;
  const base = baseDomain();
  if (host === base || host === `www.${base}`) return false;
  // Local development has no shared address; production does.
  return process.env.NODE_ENV === "production";
}

const notFound = () =>
  createError({ statusCode: 404, statusMessage: "Not Found" });

/** Off the shared address the console does not exist. */
export async function requireOperatorHost(event: H3Event): Promise<void> {
  if (await wrongHost(event)) throw notFound();
}

/**
 * The signed-in operator, or an error. Every operator route calls this first.
 * Off the shared address it is a 404, so a school's people never learn the
 * console exists; on it, no valid session is a 401, which is what sends the
 * page to its sign-in form.
 */
export async function requireOperator(
  event: H3Event,
): Promise<{ email: string }> {
  await requireOperatorHost(event);
  const email = readSession(event);
  if (!email) {
    throw createError({ statusCode: 401, statusMessage: "Sign in" });
  }
  // A cookie sent from another site's form cannot set this header.
  if (
    getMethod(event) !== "GET" &&
    !(getRequestHeader(event, "content-type") ?? "").includes(
      "application/json",
    )
  ) {
    throw createError({ statusCode: 415, statusMessage: "Send JSON" });
  }
  return { email };
}

export async function recordAudit(entry: {
  actor: string;
  action: string;
  schoolId?: string | null;
  detail?: Record<string, unknown> | null;
}): Promise<void> {
  try {
    await runSql(
      sql`INSERT INTO operator_audit (id, actor, action, school_id, detail, created_at)
          VALUES (${nanoid()}, ${entry.actor}, ${entry.action}, ${entry.schoolId ?? null},
                  ${entry.detail ? JSON.stringify(entry.detail) : null}, ${new Date().toISOString()})`,
    );
  } catch (err) {
    // The action already happened; a failed log must not undo or hide it.
    console.error(
      `[operator] audit write failed: ${err instanceof Error ? err.message : err}`,
    );
  }
}
