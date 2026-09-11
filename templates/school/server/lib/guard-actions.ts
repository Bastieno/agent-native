import { currentAccess } from "@agent-native/core/sharing";
import { getSchoolRole } from "./student-access.js";
import {
  findUnclassifiedActions,
  rolesFor,
  type SchoolRole,
} from "./action-policy.js";

/**
 * Wrap every template action with a role check.
 *
 * The same action map backs both the agent's tools and the auto-mounted HTTP
 * endpoints at /_agent-native/actions/:name, so wrapping here closes both at
 * once: a student cannot grade work by asking the agent, nor by POSTing to the
 * endpoint from the browser console.
 *
 * This is authorisation only — it answers "may this role call this action at
 * all". Row-level ownership (may THIS teacher touch THAT class) is enforced
 * inside individual actions.
 */
export function guardActions<T extends Record<string, any>>(actions: T): T {
  const unclassified = findUnclassifiedActions(Object.keys(actions));
  if (unclassified.length > 0) {
    // Loud in dev, and these still deny at call time in production.
    console.error(
      `[school] actions with no policy entry (they will be denied): ${unclassified.join(", ")}. Add them to server/lib/action-policy.ts.`,
    );
  }

  const guarded: Record<string, any> = {};
  for (const [name, entry] of Object.entries(actions)) {
    if (!entry || typeof entry.run !== "function") {
      guarded[name] = entry;
      continue;
    }
    guarded[name] = {
      ...entry,
      run: async (args: any, ctx: any) => {
        await assertCallerMayRun(name);
        return entry.run(args, ctx);
      },
    };
  }
  return guarded as T;
}

async function assertCallerMayRun(actionName: string): Promise<void> {
  const allowed = rolesFor(actionName);

  if (allowed === null) {
    throw new Error(
      `Action "${actionName}" has no access policy and cannot be called.`,
    );
  }
  if (allowed.length === 0) {
    throw new Error(
      `Action "${actionName}" is operator-only and can only be run from the command line.`,
    );
  }

  const { userEmail } = currentAccess();

  // No signed-in user: CLI/operator context. The CLI is already a trusted
  // shell on the server, and HTTP requests always carry a session.
  if (!userEmail) return;

  const role = (await getSchoolRole(userEmail)) as SchoolRole | null;
  if (!role) {
    throw new Error(
      "You are not a member of this school yet, so this action is not available.",
    );
  }
  if (!allowed.includes(role)) {
    throw new Error(
      `Not permitted: "${actionName}" is not available to your role (${role}).`,
    );
  }
}
