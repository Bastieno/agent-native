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
 *   - for staff, the framework tools staff work uses: their own memory notes,
 *     sub-agents, automations and jobs, notifications, progress, web
 *     requests, the framework guide, and any MCP server they connected. Not
 *     the generic workspace-files tool: it reaches an area every school shares;
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

// `resources` (the generic workspace-files tool) is deliberately not here. It
// reads and writes the framework's shared area, which every school shares:
// one school's assistant could read another's files, or rewrite the shared
// AGENTS.md or LEARNINGS.md that every school's assistant follows. Nothing in
// the school needs it: guides and settings have their own actions, and a
// person's own notes go through `save-memory`.
const STAFF = new Set([
  "save-memory",
  "delete-memory",
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

/**
 * The tools a staff member's assistant has loaded on every step. The rest of
 * what their role may run (about 200 for an admin, 120 for a teacher, ~35k
 * and ~20k tokens of definitions) stays callable but is loaded only when
 * tool-search finds it, so a turn pays for the tools it uses. These are the
 * ones nearly every conversation reaches for: seeing the screen, moving
 * around, the school's rules and settings, and the day's lists.
 */
const LOADED_FOR_STAFF = new Set([
  ...EVERYONE,
  "view-screen",
  "navigate",
  "get-school-guidance",
  "get-help",
  "get-school-config",
  "check-school-setup",
  "get-school-attention",
  // The classes behind "lesson notes not ready": a short question reaches for
  // it, and a model that has to search for it answers from help text instead.
  "get-lesson-note-coverage",
  "get-my-schedule",
  "get-my-week",
  "list-classes",
]);

/**
 * Which tools are loaded on demand for this role. A learner has few enough
 * tools (about 30) that all stay loaded: a search step would cost more than
 * it saves, and the tutor should not be hunting for tools.
 */
export function deferToolForRole(role: SchoolRole): (name: string) => boolean {
  if (role === "student") return () => false;
  return (name) => !LOADED_FOR_STAFF.has(name);
}
