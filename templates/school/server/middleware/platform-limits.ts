/**
 * Holds the line the agent panel's hidden tabs draw: no school session changes
 * the platform. See `server/lib/platform-limits.ts` for what is refused and why.
 */
import { defineEventHandler, getMethod, setResponseStatus } from "h3";
import { getSession } from "@agent-native/core/server";
import { platformRefusal } from "../lib/platform-limits.js";

export default defineEventHandler(async (event) => {
  const path = event.url?.pathname ?? "";
  if (!platformRefusal(path, getMethod(event))) return;
  const session = await getSession(event).catch(() => null);
  if (!session?.email) return; // the route itself refuses the anonymous
  setResponseStatus(event, 403);
  return {
    error: "That is managed by the people who run Ellai, not by a school.",
  };
});
