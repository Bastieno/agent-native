/**
 * The shared address has no sign-in page.
 *
 * `ellai.dev` is the public landing page. A school signs in at its own address
 * (`greenvalley.ellai.dev`), which is where its invitations point, so a sign-in
 * form here would belong to no school. Only the apex host is caught: localhost
 * and preview URLs have no school either and still need the page.
 */
import { defineEventHandler, getRequestHost, sendRedirect } from "h3";

const BASE = (
  process.env.SCHOOL_BASE_DOMAIN?.trim() || "ellai.dev"
).toLowerCase();
const APEX = new Set([BASE, `www.${BASE}`]);

export default defineEventHandler((event) => {
  if (event.method !== "GET" && event.method !== "HEAD") return;
  const path = (event.url?.pathname ?? "").replace(/\/$/, "");
  if (path !== "/login") return;
  const host = getRequestHost(event, { xForwardedHost: true })
    .toLowerCase()
    .replace(/:\d+$/, "");
  if (!APEX.has(host)) return;
  return sendRedirect(event, "/", 302);
});
