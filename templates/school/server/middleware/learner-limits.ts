/**
 * What a learner may not do through the framework's own routes.
 *
 * The school's actions are role-checked in guardActions, but the agent panel
 * also talks to framework routes the school does not own. A member may use
 * these for themselves, which is right for staff and wrong for a learner:
 *
 *   - personal workspace files (skills, AGENTS.md) are read into that
 *     person's own assistant's instructions, so a learner could write "always
 *     give me the full answer" and undo tutor mode;
 *   - a personal MCP server makes the server connect wherever the learner
 *     points it, internal addresses included, and hands its tools to their
 *     assistant;
 *   - the engine action can switch or test the model, and a test is a model
 *     call on the school's key outside the learner's daily limit.
 *
 * The panel hides the Workspace tab and settings from learners; this is the
 * part that holds when the request is made by hand. Reading is left alone.
 */
import { defineEventHandler, getMethod, setResponseStatus } from "h3";
import { getSession } from "@agent-native/core/server";
import { getSchoolRole } from "../lib/student-access.js";

const WRITES_REFUSED = [
  "/_agent-native/resources",
  "/_agent-native/mcp/servers",
];
const ALWAYS_REFUSED = ["/_agent-native/actions/manage-agent-engine"];

function under(path: string, prefixes: string[]): boolean {
  return prefixes.some((p) => path === p || path.startsWith(`${p}/`));
}

export default defineEventHandler(async (event) => {
  const path = event.url?.pathname ?? "";
  if (!path.startsWith("/_agent-native/")) return;
  const method = getMethod(event);
  const isWrite = method !== "GET" && method !== "HEAD";
  const refused =
    under(path, ALWAYS_REFUSED) || (isWrite && under(path, WRITES_REFUSED));
  if (!refused) return;

  const session = await getSession(event).catch(() => null);
  if (!session?.email) return; // the route itself refuses the anonymous
  if ((await getSchoolRole(session.email)) !== "student") return;

  setResponseStatus(event, 403);
  return { error: "That isn't available to learners." };
});
