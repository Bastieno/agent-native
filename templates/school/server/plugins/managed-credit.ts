import { setManagedCredentialResolver } from "@agent-native/core/server";
import { usesManagedKey } from "../lib/credits.js";

/**
 * Lets a school on Ellai's credit use the operator's own Anthropic key.
 *
 * The framework refuses a deployment-level key for a signed-in person in a
 * shared database, so one tenant can never run on another's bill. This is the
 * one deliberate exception: a school whose billing is `managed` (see
 * server/lib/credits.ts). It is asked only when neither the person nor their
 * school has saved a key, so a school's own key always wins. Whether the
 * school still has credit is the gate's decision (server/lib/agent-gate.ts),
 * made before any run starts.
 */
export default function managedCreditPlugin() {
  setManagedCredentialResolver(async ({ key, orgId }) => {
    if (key !== "ANTHROPIC_API_KEY" || !orgId) return null;
    if (!(await usesManagedKey(orgId))) return null;
    return process.env.ELLAI_MANAGED_ANTHROPIC_KEY?.trim() || null;
  });
}
