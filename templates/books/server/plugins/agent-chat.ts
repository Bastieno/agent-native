import {
  createAgentChatPlugin,
  loadActionsFromStaticRegistry,
} from "@agent-native/core/server";
import { getOrgContext } from "@agent-native/core/org";
import actionsRegistry from "../../.generated/actions-registry.js";
import { guardActions, guardExtensionActions } from "../lib/action-policy.js";

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
});
