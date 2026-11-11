import { createHmac, timingSafeEqual } from "node:crypto";
import { deleteCookie, getCookie, setCookie, type H3Event } from "h3";
import { operatorEmails } from "../credits.js";

/**
 * The operator console's own session: a signed cookie, separate from the
 * school sign-in. An operator needs no school account; they prove they hold an
 * address on `ELLAI_OPERATOR_EMAILS` by an emailed code (see login-code.ts).
 *
 * The cookie holds the address and an expiry, signed with a key derived from
 * `BETTER_AUTH_SECRET`. It is checked against the allow-list on every request,
 * so removing an address ends its session at once.
 */

const COOKIE = "operator_session";
const TTL_SECONDS = 12 * 60 * 60;

const PROD = () => process.env.NODE_ENV === "production";

/** The signing key, or null when none is configured and it must not be guessed. */
export function signingKey(): string | null {
  const secret = process.env.BETTER_AUTH_SECRET?.trim();
  if (secret) return `operator:${secret}`;
  // Local development without a secret: a fixed key is fine there only.
  return PROD() ? null : "operator:development-only";
}

function sign(payload: string, key: string): string {
  return createHmac("sha256", key).update(payload).digest("base64url");
}

export function issueSession(event: H3Event, email: string): boolean {
  const key = signingKey();
  if (!key) return false;
  const exp = Math.floor(Date.now() / 1000) + TTL_SECONDS;
  const payload = Buffer.from(JSON.stringify({ e: email, x: exp })).toString(
    "base64url",
  );
  setCookie(event, COOKIE, `${payload}.${sign(payload, key)}`, {
    httpOnly: true,
    secure: PROD(),
    sameSite: "lax",
    path: "/",
    maxAge: TTL_SECONDS,
  });
  return true;
}

export function clearSession(event: H3Event): void {
  deleteCookie(event, COOKIE, { path: "/" });
}

/** The signed-in operator's address, or null. */
export function readSession(event: H3Event): string | null {
  const key = signingKey();
  const raw = getCookie(event, COOKIE);
  if (!key || !raw) return null;
  const [payload, mac] = raw.split(".");
  if (!payload || !mac) return null;
  const want = Buffer.from(sign(payload, key));
  const got = Buffer.from(mac);
  if (want.length !== got.length || !timingSafeEqual(want, got)) return null;
  try {
    const { e, x } = JSON.parse(Buffer.from(payload, "base64url").toString());
    if (typeof e !== "string" || typeof x !== "number") return null;
    if (x < Math.floor(Date.now() / 1000)) return null;
    const email = e.toLowerCase();
    return operatorEmails().includes(email) ? email : null;
  } catch {
    return null;
  }
}
