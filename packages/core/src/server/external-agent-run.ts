/**
 * Engine + usage helpers for agent runs started by external callers (MCP
 * `ask_app` / `ask-agent`, A2A). They mirror what the web chat does per turn
 * (`production-agent.ts`): the caller's own provider key is resolved with
 * `getOwnerActiveApiKey`, the deploy key is only a fallback where the
 * deploy-credential policy allows it, and the run's token usage is recorded
 * against the caller under a label of its own.
 */

import type { AgentEngine } from "../agent/engine/types.js";
import {
  LLM_MISSING_CREDENTIALS_ERROR_CODE,
  LLM_MISSING_CREDENTIALS_MESSAGE,
} from "../agent/engine/credential-errors.js";
import {
  isDeployCredentialFallbackAllowed,
  readDeployCredentialEnv,
} from "./credential-provider.js";
import { getRequestUserEmail } from "./request-context.js";

/** Usage label for runs started over MCP (`ask_app` / `ask-agent`). */
export const MCP_ASK_APP_USAGE_LABEL = "mcp-ask-app";
/** Usage label for runs started over A2A. */
export const A2A_USAGE_LABEL = "a2a";

export interface AgentRunUsage {
  inputTokens: number;
  outputTokens: number;
  cacheReadTokens: number;
  cacheWriteTokens: number;
  model: string;
}

export class MissingLlmCredentialsError extends Error {
  readonly errorCode = LLM_MISSING_CREDENTIALS_ERROR_CODE;
  constructor() {
    super(LLM_MISSING_CREDENTIALS_MESSAGE);
    this.name = "MissingLlmCredentialsError";
  }
}

/**
 * Resolve the engine for an external caller's agent run. Must be called
 * inside the caller's request context so org-scope secrets resolve against
 * the caller's org. Throws `MissingLlmCredentialsError` when the Anthropic
 * engine would run without a key, rather than silently using the deploy key.
 */
export async function resolveCallerAgentEngine(opts: {
  engineOption?: unknown;
  /** The plugin's own `apiKey` option — a deploy-level key. */
  pluginApiKey?: string;
  appId?: string;
  /** Defaults to the request context's user. */
  callerEmail?: string | null;
}): Promise<AgentEngine> {
  const callerEmail =
    opts.callerEmail === undefined ? getRequestUserEmail() : opts.callerEmail;
  const { getOwnerActiveApiKey } = await import("../agent/production-agent.js");
  const callerApiKey = await getOwnerActiveApiKey(callerEmail);
  const apiKey = isDeployCredentialFallbackAllowed()
    ? (callerApiKey ??
      opts.pluginApiKey ??
      readDeployCredentialEnv("ANTHROPIC_API_KEY"))
    : callerApiKey;

  const { resolveEngine } = await import("../agent/engine/index.js");
  const engine = await resolveEngine({
    engineOption: opts.engineOption as any,
    apiKey,
    appId: opts.appId,
  });
  if (engine.name === "anthropic" && !apiKey) {
    throw new MissingLlmCredentialsError();
  }
  return engine;
}

/**
 * Record an external run's token usage against the caller. Best-effort:
 * failures are logged, never thrown, so a usage-table problem cannot fail
 * the caller's request. Unauthenticated runs are not recorded.
 */
export async function recordExternalAgentUsage(
  usage: AgentRunUsage | undefined,
  opts: { ownerEmail?: string | null; label: string; app?: string },
): Promise<void> {
  if (!usage || !opts.ownerEmail) return;
  try {
    const { recordUsage } = await import("../usage/store.js");
    await recordUsage({
      ownerEmail: opts.ownerEmail,
      inputTokens: usage.inputTokens,
      outputTokens: usage.outputTokens,
      cacheReadTokens: usage.cacheReadTokens,
      cacheWriteTokens: usage.cacheWriteTokens,
      model: usage.model,
      label: opts.label,
      ...(opts.app ? { app: opts.app } : {}),
    });
  } catch (err) {
    console.error(`[agent-usage] Failed to record ${opts.label} usage:`, err);
  }
}
