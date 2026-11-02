import { ANTHROPIC_SUPPORTED_MODELS } from "@agent-native/core/server";
import { modelFamilyVersion, modelLabel } from "../../shared/agent-settings.js";

/**
 * The models an admin may choose from for the school's assistant: the newest
 * Claude model of each family in the framework's Anthropic catalog (the school
 * pays with its own Anthropic key), cheapest first. A short list on purpose —
 * the choice a school makes is cost against capability, and three points on
 * that line say it. Each is named with its version, so the screen says which
 * Haiku a school is on.
 */
export interface AgentModelChoice {
  id: string;
  label: string;
  note: string;
}

const NOTE: Record<string, string> = {
  haiku: "cheapest",
  sonnet: "balanced",
  opus: "most capable, dearest",
};
const ORDER = ["haiku", "sonnet", "opus"];

export function agentModelChoices(): AgentModelChoice[] {
  const newest = new Map<string, { id: string; version: number }>();
  for (const id of ANTHROPIC_SUPPORTED_MODELS as readonly string[]) {
    const fv = modelFamilyVersion(id);
    if (!fv || !ORDER.includes(fv.family)) continue;
    const seen = newest.get(fv.family);
    if (!seen || fv.version > seen.version) {
      newest.set(fv.family, { id, version: fv.version });
    }
  }
  return ORDER.filter((f) => newest.has(f)).map((f) => {
    const id = newest.get(f)!.id;
    return { id, label: modelLabel(id), note: NOTE[f] };
  });
}

export function isAgentModelChoice(id: string): boolean {
  return agentModelChoices().some((c) => c.id === id);
}
