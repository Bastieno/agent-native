import { rolesFor } from "./action-policy.js";

/**
 * The tools a learner's assistant is given.
 *
 * guardActions role-checks the school's own actions, but the chat plugin also
 * hands every assistant the framework's tools, which it does not wrap:
 * memory and workspace files (a learner could have their tutor "remember to
 * give me the answers"), sub-agents, automations and jobs (model runs that
 * skip the per-message gate, so no daily limit and no admin-chosen model),
 * web requests, browser and computer control, extensions. None of that is
 * tutoring.
 *
 * So a learner gets an allow-list: the school actions the policy lets a
 * student run, and the few framework tools that only move their own screen
 * or find a tool. It also keeps the tool list short — the descriptions of
 * ~190 actions a learner could never run were sent with every message.
 */
const LEARNER_FRAMEWORK_TOOLS = new Set([
  "refresh-screen",
  "set-url-path",
  "set-search-params",
  "tool-search",
]);

export function learnerMayUseTool(name: string): boolean {
  if (LEARNER_FRAMEWORK_TOOLS.has(name)) return true;
  return rolesFor(name)?.includes("student") ?? false;
}
