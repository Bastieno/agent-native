/**
 * The partner reads Books but changes nothing. Books' own actions check the
 * role themselves; this closes the framework's extension write routes (and
 * their org-scoped SQL endpoint), which would otherwise let any member write.
 */
import { createError, defineEventHandler, getRequestURL } from "h3";
import { getOrgContext } from "@agent-native/core/org";
import { memberMayCall } from "../lib/action-policy.js";

export default defineEventHandler(async (event) => {
  const path = getRequestURL(event).pathname;
  if (memberMayCall(event.method, path)) return;
  const { role } = await getOrgContext(event).catch(() => ({ role: null }));
  if (role !== "owner" && role !== "admin") {
    throw createError({
      statusCode: 403,
      statusMessage: "Only the owner can change Books.",
    });
  }
});
