/**
 * What the assistant runs on, and which tools it has loaded on every step.
 * Kept small on purpose: each loaded tool's definition is sent with every
 * model step, so the rarely used ones are found with tool-search instead.
 */

export const OWNER_MODEL = "claude-sonnet-5-5";
export const PARTNER_MODEL = "claude-haiku-5-5";

/** The owner (and an admin) works on Sonnet; the partner only reads, on Haiku. */
export function modelFor(role: string | null): string {
  return role === "owner" || role === "admin" || role === null
    ? OWNER_MODEL
    : PARTNER_MODEL;
}

/** Loaded on every step: seeing the screen, moving around, and the day's money. */
export const LOADED_TOOLS = new Set([
  "tool-search",
  "refresh-screen",
  "set-url-path",
  "set-search-params",
  "view-screen",
  "navigate",
  "get-overview",
  "list-review",
  "list-expenses",
  "list-sales",
  "update-expense",
  "confirm-expenses",
  "record-expense",
  "record-expense-from-receipt",
  "list-expense-categories",
  "get-digest",
]);

export const deferTool = (name: string) => !LOADED_TOOLS.has(name);
