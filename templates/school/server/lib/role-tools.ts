import { rolesFor, type SchoolRole } from "./action-policy.js";

/**
 * The tools each role's assistant is given.
 *
 * The chat plugin hands every assistant the framework's whole tool set plus
 * every school action — about 245 tools, ~43k tokens of descriptions sent
 * with every model call, most of which the role guard would refuse or the
 * school never uses. A model choosing among fewer, relevant tools also
 * chooses better. So each role gets:
 *
 *   - the school actions its policy lets it run (action-policy.ts);
 *   - the tools that move its own screen or find a tool;
 *   - for staff, the framework tools staff work uses: memory and workspace
 *     files, sub-agents, automations and jobs, notifications, progress, web
 *     requests, the framework guide, and any MCP server they connected;
 *   - for admins, also extensions — the school's own widgets.
 *
 * A learner gets none of the framework extras: memory and workspace files
 * would let them rewrite their tutor, and sub-agents, automations and jobs
 * are model runs a learner has no use for. Left out for everyone: browser
 * and computer control, Builder connect, docs search, the engine and loop
 * settings (an admin changes those in Settings), call-agent and chat search.
 * Any framework tool added later is out until it is listed here.
 */
const EVERYONE = new Set([
  "refresh-screen",
  "set-url-path",
  "set-search-params",
  "tool-search",
]);

const STAFF = new Set([
  "save-memory",
  "delete-memory",
  "resources",
  "agent-teams",
  "manage-automations",
  "manage-jobs",
  "manage-notifications",
  "manage-progress",
  "web-request",
  "get-framework-context",
]);

const ADMIN = new Set([
  "create-extension",
  "update-extension",
  "delete-extension",
  "get-extension",
  "list-extensions",
  "install-extension",
  "uninstall-extension",
  "hide-extension",
  "unhide-extension",
  "add-extension-slot-target",
  "list-extension-slots",
  "list-extensions-for-slot",
]);

export function roleMayUseTool(role: SchoolRole, name: string): boolean {
  if (EVERYONE.has(name)) return true;
  if (rolesFor(name)?.includes(role)) return true;
  if (role === "student") return false;
  // Staff connected these MCP servers themselves, on purpose.
  if (name.startsWith("mcp__")) return true;
  if (STAFF.has(name)) return true;
  return role === "school_admin" && ADMIN.has(name);
}

export function toolFilterForRole(role: SchoolRole): (name: string) => boolean {
  return (name) => roleMayUseTool(role, name);
}
