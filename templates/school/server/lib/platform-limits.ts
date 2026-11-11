/**
 * The framework's own platform routes, which no school role may use.
 *
 * One deployment holds every school. The agent panel's Workspace and Settings
 * tabs talk to framework routes that act on the whole deployment: the shared
 * files area every school's assistant reads (including the app's AGENTS.md),
 * the server's environment variables, the AI engine and its keys, and Builder.io.
 * A school's head is an organisation admin, which those routes treat as enough,
 * so a head could rewrite the instructions of every school. The panel hides
 * both tabs; this is the part that holds when the request is made by hand.
 *
 * Reading is left alone (the school's own screens read the engine status), and
 * so are personal MCP servers (`learner-limits.ts` covers learners). Running
 * the platform is the operator's job, through the operator console and the
 * server's own settings, not through a school's session.
 */

/** Refused for every method. */
const ALWAYS = [
  "/_agent-native/builder",
  "/_agent-native/actions/manage-agent-engine",
  "/_agent-native/actions/manage-agent-loop-settings",
];

/** Refused for anything that changes data; reading is left alone. */
const WRITES = [
  "/_agent-native/resources",
  "/_agent-native/env-vars",
  "/_agent-native/agent-model-defaults",
  "/_agent-native/agent-loop-settings",
  "/_agent-native/agent-engine",
];

function under(path: string, prefixes: string[]): boolean {
  return prefixes.some((p) => path === p || path.startsWith(`${p}/`));
}

/** Whether a request to a framework route is one no school session may make. */
export function platformRefusal(path: string, method: string): boolean {
  if (!path.startsWith("/_agent-native/")) return false;
  const write = method !== "GET" && method !== "HEAD";
  return under(path, ALWAYS) || (write && under(path, WRITES));
}
