import { assertOwner } from "./access.js";

/**
 * Who may run each Books action.
 *
 * "owner"    — the owner (org owner or admin) only: anything that changes data.
 * "everyone" — any member of the org, including the partner: reads.
 *
 * Every file in actions/ must appear here (test/action-policy.check.ts). An
 * action missing from this list is refused at call time, so adding one forces
 * a decision about its audience.
 */
export type Audience = "owner" | "everyone";

export const ACTION_POLICY: Record<string, Audience> = {
  "import-sales-export": "owner",
  "import-payment-method-report": "owner",
  "import-item-report": "owner",
  "set-item-category": "owner",
  "set-category-business": "owner",
  "record-expense": "owner",
  "record-expense-from-receipt": "owner",
  "update-expense": "owner",
  "list-sales": "everyone",
  "list-expenses": "everyone",
  "list-expense-categories": "everyone",
  "list-items-needing-category": "everyone",
  "reconcile-day": "everyone",
  "view-screen": "everyone",
  navigate: "everyone",
};

/** Not actions: the CLI entry point. */
const NOT_ACTIONS = new Set(["run"]);

export function assertPolicyCoversAllActions(names: string[]): void {
  const missing = names.filter(
    (n) => !NOT_ACTIONS.has(n) && !(n in ACTION_POLICY),
  );
  if (missing.length) {
    throw new Error(
      `Books actions with no policy entry: ${missing.join(", ")}. Add them to server/lib/action-policy.ts.`,
    );
  }
}

/** Wrap Books' actions with the role check. Covers the agent's tools and the HTTP endpoints alike. */
export function guardActions<T extends Record<string, any>>(actions: T): T {
  const guarded: Record<string, any> = {};
  for (const [name, entry] of Object.entries(actions)) {
    if (!entry || typeof entry.run !== "function") {
      guarded[name] = entry;
      continue;
    }
    guarded[name] = {
      ...entry,
      run: async (...args: unknown[]) => {
        const audience = ACTION_POLICY[name];
        if (!audience) throw new Error(`${name} is not available in Books.`);
        if (audience === "owner") await assertOwner();
        return entry.run(...args);
      },
    };
  }
  return guarded as T;
}
