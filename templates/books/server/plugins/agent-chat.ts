import {
  createAgentChatPlugin,
  loadActionsFromStaticRegistry,
} from "@agent-native/core/server";
import { getOrgContext } from "@agent-native/core/org";
import actionsRegistry from "../../.generated/actions-registry.js";
import { guardActions, guardExtensionActions } from "../lib/action-policy.js";
import { deferTool, modelFor } from "../lib/assistant.js";
import { rows } from "../lib/sql.js";

/** The person's role in the org: "owner" and "admin" change Books; others read. */
async function roleOf(orgId: string | null, email: string | null) {
  if (!orgId || !email) return null;
  const [m] = await rows<{ role: string }>(
    `SELECT role FROM org_members WHERE org_id = ? AND LOWER(email) = LOWER(?)`,
    [orgId, email],
  );
  return m?.role ?? null;
}

export default createAgentChatPlugin({
  appId: "books",
  // Every action is role-checked; the same map backs the agent's tools and the
  // HTTP endpoints, so the partner can read but not change anything either way.
  actions: guardActions(loadActionsFromStaticRegistry(actionsRegistry)),
  // Org-scoped raw SQL would let the partner's assistant write around the role
  // check. Books' data is reached only through its actions.
  disableDbDataTools: true,
  // The framework's extension tools aren't Books actions, so guard them here too.
  transformExtensionActions: guardExtensionActions,
  resolveOrgId: async (event) => (await getOrgContext(event)).orgId,
  // Every action already reaches the model as a tool with its own
  // description; listing them all again as text costs thousands of tokens a step.
  actionsInPrompt: false,
  model: modelFor("owner"),
  // The owner's turns run on Sonnet, the partner's (reading only) on Haiku,
  // whatever the client asked for. Only the tools nearly every conversation
  // uses are loaded; the rest are found with tool-search when needed.
  prepareRequest: async ({ event, ownerEmail }) => {
    let orgId: string | null = null;
    try {
      orgId = (await getOrgContext(event)).orgId ?? null;
    } catch {
      // No org yet: the app's own model and every tool.
    }
    const role = await roleOf(orgId, ownerEmail);
    // `deferTool` is read by the engine but not yet in this hook's type.
    return { model: modelFor(role), deferTool } as { model: string };
  },
});
