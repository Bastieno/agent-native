import {
  createIntegrationsPlugin,
  loadActionsFromStaticRegistry,
  whatsappAdapter,
} from "@agent-native/core/server";
import actionsRegistry from "../../.generated/actions-registry.js";
import { guardActions } from "../lib/action-policy.js";
import { beforeBooksMessage, ownerForMessage } from "../lib/whatsapp-books.js";

/**
 * The WhatsApp number receipts and Moniebook files are sent to. Only numbers
 * on Books' allow-list are heard; each acts as the person it belongs to, so
 * the partner's number can ask but not change anything.
 */
export default createIntegrationsPlugin({
  appId: "books",
  adapters: [whatsappAdapter()],
  actions: guardActions(loadActionsFromStaticRegistry(actionsRegistry)),
  beforeProcess: beforeBooksMessage,
  resolveOwner: ownerForMessage,
});
