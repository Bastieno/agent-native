/**
 * One gate for every agent run that is not a chat message.
 *
 * A chat message passes the app's `prepareRequest`, which can refuse it, pin
 * its model and narrow its tools. Other runs start elsewhere — sub-agents,
 * automations, scheduled jobs, messaging integrations, agent-to-agent and MCP
 * calls — and used to skip all of that, so an app that limits model choice or
 * cost per person had those limits quietly bypassed. An app registers a gate
 * (`createAgentChatPlugin({ runGate })`) and every such run asks it first.
 */

/** What started a run that is not a chat message. */
export type AgentRunSource =
  | "sub-agent"
  | "automation"
  | "job"
  | "integration"
  | "a2a"
  | "mcp"
  | "other";

export interface AgentRunGateDetails {
  ownerEmail: string | null;
  orgId: string | null;
  source: AgentRunSource;
}

export interface AgentRunGateDecision {
  /** Run on this model, whatever the caller chose. */
  model?: string;
  /** Do not run; answer with this text instead. */
  reply?: string;
  /** Only the tools this returns true for are offered or run. */
  toolFilter?: (name: string) => boolean;
}

export type AgentRunGate = (
  details: AgentRunGateDetails,
) => AgentRunGateDecision | void | Promise<AgentRunGateDecision | void>;

let gate: AgentRunGate | null = null;

export function setAgentRunGate(next: AgentRunGate | null): void {
  gate = next;
}

export function getAgentRunGate(): AgentRunGate | null {
  return gate;
}
