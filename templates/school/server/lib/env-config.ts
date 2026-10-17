import type { EnvKeyConfig } from "@agent-native/core/server";

export const envKeys: EnvKeyConfig[] = [
  { key: "DATABASE_URL", label: "Database URL", required: false },
  { key: "DATABASE_AUTH_TOKEN", label: "Database Auth Token", required: false },
  { key: "ANTHROPIC_API_KEY", label: "Anthropic API Key", required: false },
];
