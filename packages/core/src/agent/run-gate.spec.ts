import { afterEach, describe, expect, it, vi } from "vitest";
import { applyAgentRunGate, runAgentLoop } from "./production-agent.js";
import { setAgentRunGate } from "./run-gate.js";
import type { ActionEntry } from "./types.js";

const entry = (name: string): ActionEntry => ({
  tool: { description: name, parameters: { type: "object", properties: {} } },
  run: async () => name,
});

function baseOpts(overrides: Record<string, unknown> = {}) {
  return {
    engine: { stream: vi.fn() } as any,
    model: "caller-model",
    systemPrompt: "",
    tools: [
      { name: "keep", description: "", inputSchema: { type: "object" } },
      { name: "drop", description: "", inputSchema: { type: "object" } },
    ] as any,
    messages: [],
    actions: { keep: entry("keep"), drop: entry("drop") },
    send: vi.fn(),
    signal: new AbortController().signal,
    ownerEmail: "teacher@school.test",
    orgId: "org-1",
    runSource: "automation" as const,
    ...overrides,
  };
}

afterEach(() => setAgentRunGate(null));

describe("agent run gate", () => {
  it("passes the person and what started the run, and applies model and tools", async () => {
    const gate = vi.fn(() => ({
      model: "role-model",
      toolFilter: (n: string) => n === "keep",
    }));
    setAgentRunGate(gate);
    const { opts, reply } = await applyAgentRunGate(baseOpts());
    expect(gate).toHaveBeenCalledWith({
      ownerEmail: "teacher@school.test",
      orgId: "org-1",
      source: "automation",
    });
    expect(reply).toBeUndefined();
    expect(opts.model).toBe("role-model");
    expect(Object.keys(opts.actions)).toEqual(["keep"]);
    expect(opts.tools.map((t) => t.name)).toEqual(["keep"]);
    expect(opts.skipRunGate).toBe(true);
  });

  it("refuses with a reply and calls no model", async () => {
    setAgentRunGate(() => ({ reply: "Not today." }));
    const opts = baseOpts();
    await runAgentLoop(opts);
    expect(opts.engine.stream).not.toHaveBeenCalled();
    expect(opts.send).toHaveBeenCalledWith({
      type: "text",
      text: "Not today.",
    });
    expect(opts.send).toHaveBeenCalledWith({ type: "done" });
  });

  it("does not ask again for a run already gated", async () => {
    const gate = vi.fn(() => ({ reply: "no" }));
    setAgentRunGate(gate);
    const { reply } = await applyAgentRunGate(baseOpts({ skipRunGate: true }));
    expect(gate).not.toHaveBeenCalled();
    expect(reply).toBeUndefined();
  });
});
