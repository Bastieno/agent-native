import { createError, defineEventHandler, getHeader, getQuery } from "h3";
import { baseDomain } from "../../../lib/operator/access.js";
import { hostTaken, normalizeHost } from "../../../lib/school-host.js";

/**
 * Caddy asks this before it gets a certificate for a name it has not seen
 * (`on_demand_tls { ask ... }`). With a wildcard DNS record, anyone can point a
 * made-up name at the server; this is what stops Caddy requesting certificates
 * for them. Answer 200 only for the shared address and for a school's address.
 *
 * Only Caddy on this machine may ask. Caddy's own request carries no
 * `X-Forwarded-For`, while anything that came in from outside through Caddy's
 * reverse proxy always does, so a forwarded request is refused. The answer
 * reveals only whether a name is a school's, which its certificate shows anyway.
 */
export default defineEventHandler(async (event) => {
  if (getHeader(event, "x-forwarded-for") || getHeader(event, "forwarded")) {
    throw createError({ statusCode: 404, statusMessage: "Not Found" });
  }
  const host = normalizeHost(String(getQuery(event).domain ?? ""));
  const base = baseDomain();
  if (host === base || host === `www.${base}`) return { ok: true };
  if (host.endsWith(`.${base}`) && (await hostTaken(host))) return { ok: true };
  throw createError({ statusCode: 404, statusMessage: "Not a school" });
});
