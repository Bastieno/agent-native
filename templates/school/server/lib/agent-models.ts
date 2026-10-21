import {
  BUILDER_DEFAULT_MODEL,
  BUILDER_SUPPORTED_MODELS,
} from "@agent-native/core/server";

/**
 * The models an admin may choose from for the school's assistant: the Claude
 * models in the framework's own catalog, cheapest first. A short list on
 * purpose — the choice a school makes is cost against capability, and three
 * points on that line say it.
 */
export interface AgentModelChoice {
  id: string;
  label: string;
  note: string;
}

const DESCRIBE: Record<string, { label: string; note: string }> = {
  haiku: { label: "Haiku", note: "cheapest" },
  sonnet: { label: "Sonnet", note: "balanced" },
  opus: { label: "Opus", note: "most capable, dearest" },
};
const ORDER = ["haiku", "sonnet", "opus"];

function family(id: string): string | undefined {
  return ORDER.find((f) => id.includes(f));
}

export function agentModelChoices(): AgentModelChoice[] {
  const ids = (BUILDER_SUPPORTED_MODELS as readonly string[]).filter(
    (id) => id.startsWith("claude-") && family(id),
  );
  return ids
    .sort((a, b) => ORDER.indexOf(family(a)!) - ORDER.indexOf(family(b)!))
    .map((id) => {
      const d = DESCRIBE[family(id)!];
      return {
        id,
        label: id === BUILDER_DEFAULT_MODEL ? `${d.label} (default)` : d.label,
        note: d.note,
      };
    });
}

export function isAgentModelChoice(id: string): boolean {
  return agentModelChoices().some((c) => c.id === id);
}
