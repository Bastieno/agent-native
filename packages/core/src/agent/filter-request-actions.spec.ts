import { describe, expect, it } from "vitest";
import { filterRequestActions } from "./production-agent.js";
import { attachToolSearch, TOOL_SEARCH_ACTION_NAME } from "./tool-search.js";
import type { ActionEntry } from "./types.js";

const entry = (description: string): ActionEntry => ({
  tool: { description, parameters: { type: "object", properties: {} } },
  run: async () => description,
});

describe("filterRequestActions", () => {
  const registry = attachToolSearch({
    "get-my-grades": entry("Read your own grades"),
    "save-memory": entry("Save a memory about the user"),
  });

  it("keeps only allowed tools", () => {
    const filtered = filterRequestActions(registry, (n) => n !== "save-memory");
    expect(Object.keys(filtered).sort()).toEqual(
      ["get-my-grades", TOOL_SEARCH_ACTION_NAME].sort(),
    );
  });

  it("rebuilds tool-search so it cannot surface a filtered tool", async () => {
    const filtered = filterRequestActions(registry, (n) => n !== "save-memory");
    const out = await filtered[TOOL_SEARCH_ACTION_NAME].run({
      query: "memory",
    });
    expect(JSON.stringify(out)).not.toContain("save-memory");
    const all = await registry[TOOL_SEARCH_ACTION_NAME].run({
      query: "memory",
    });
    expect(JSON.stringify(all)).toContain("save-memory");
  });
});
