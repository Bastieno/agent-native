import { describe, expect, it } from "vitest";
import {
  anthropicToolsWithDeferral,
  withToolReferences,
} from "./anthropic-engine.js";
import {
  SYSTEM_PROMPT_VOLATILE_MARKER,
  splitSystemPrompt,
} from "../runtime-context.js";
import { toolReferencesFromSearchResult } from "../tool-search.js";
import type { EngineMessage, EngineTool } from "./types.js";

const tool = (name: string, deferLoading?: boolean): EngineTool => ({
  name,
  description: `${name} tool`,
  inputSchema: { type: "object", properties: {} },
  ...(deferLoading ? { deferLoading } : {}),
});

describe("splitSystemPrompt", () => {
  it("returns the prompt unchanged when there is no marker", () => {
    expect(splitSystemPrompt("rules")).toEqual({ systemPrompt: "rules" });
  });

  it("removes the marker and reports where the stable part ends", () => {
    const out = splitSystemPrompt(
      `rules${SYSTEM_PROMPT_VOLATILE_MARKER}\n<time>now</time>`,
    );
    expect(out.systemPrompt).toBe("rules\n<time>now</time>");
    expect(out.cacheBoundary).toBe("rules".length);
  });

  it("removes a second marker too", () => {
    const out = splitSystemPrompt(
      `a${SYSTEM_PROMPT_VOLATILE_MARKER}b${SYSTEM_PROMPT_VOLATILE_MARKER}c`,
    );
    expect(out.systemPrompt).toBe("abc");
    expect(out.cacheBoundary).toBe(1);
  });
});

describe("anthropicToolsWithDeferral", () => {
  it("sends loaded tools first, deferred after, with the breakpoint on the last loaded tool", () => {
    const { tools, deferred } = anthropicToolsWithDeferral(
      [tool("a", true), tool("tool-search"), tool("b", true), tool("c")],
      [],
      true,
    );
    expect(tools.map((t) => t.name)).toEqual(["tool-search", "c", "a", "b"]);
    expect(tools[1].cache_control).toEqual({ type: "ephemeral" });
    expect(tools[2].defer_loading).toBe(true);
    expect(tools[2].cache_control).toBeUndefined();
    expect(tools[0].defer_loading).toBeUndefined();
    expect([...deferred]).toEqual(["a", "b"]);
  });

  it("loads a deferred tool the conversation has already called", () => {
    const messages: EngineMessage[] = [
      {
        role: "assistant",
        content: [{ type: "tool-call", id: "1", name: "a", input: {} }],
      },
    ];
    const { tools, deferred } = anthropicToolsWithDeferral(
      [tool("tool-search"), tool("a", true), tool("b", true)],
      messages,
      true,
    );
    expect(deferred.has("a")).toBe(false);
    expect(tools.find((t) => t.name === "a").defer_loading).toBeUndefined();
    expect(tools.find((t) => t.name === "b").defer_loading).toBe(true);
  });

  it("keeps a tool deferred when the conversation found it by search", () => {
    // Loading it would change the tool list and cost the cache for the step;
    // the API keeps found tools loaded through the history anyway.
    const messages: EngineMessage[] = [
      {
        role: "user",
        content: [
          {
            type: "tool-result",
            toolCallId: "s",
            toolName: "tool-search",
            toolInput: "{}",
            content: "{}",
            toolReferences: ["a"],
          },
        ],
      },
      {
        role: "assistant",
        content: [{ type: "tool-call", id: "1", name: "a", input: {} }],
      },
    ];
    const { deferred } = anthropicToolsWithDeferral(
      [tool("tool-search"), tool("a", true)],
      messages,
      true,
    );
    expect(deferred.has("a")).toBe(true);
  });

  it("defers nothing when every tool would be deferred", () => {
    const { tools, deferred } = anthropicToolsWithDeferral(
      [tool("a", true), tool("b", true)],
      [],
      true,
    );
    expect(deferred.size).toBe(0);
    expect(tools.some((t) => t.defer_loading)).toBe(false);
  });

  it("marks no breakpoint when caching is off", () => {
    const { tools } = anthropicToolsWithDeferral(
      [tool("a"), tool("b", true)],
      [],
      false,
    );
    expect(tools.some((t) => t.cache_control)).toBe(false);
  });
});

describe("withToolReferences", () => {
  const engineMessages: EngineMessage[] = [
    {
      role: "user",
      content: [
        {
          type: "tool-result",
          toolCallId: "s1",
          toolName: "tool-search",
          toolInput: "{}",
          content: '{"results":[]}',
          toolReferences: ["a", "c", "missing"],
        },
      ],
    },
  ];
  const wire = [
    {
      role: "user",
      content: [
        { type: "tool_result", tool_use_id: "s1", content: '{"results":[]}' },
      ],
    },
  ];

  it("replaces the result with references to deferred tools only", () => {
    const out = withToolReferences(wire, engineMessages, new Set(["a", "b"]));
    // The API refuses references mixed with text in one result.
    expect(out[0].content[0].content).toEqual([
      { type: "tool_reference", tool_name: "a" },
    ]);
    expect(wire[0].content[0].content).toBe('{"results":[]}');
  });

  it("leaves results alone when nothing is deferred", () => {
    expect(withToolReferences(wire, engineMessages, new Set())).toBe(wire);
  });
});

describe("toolReferencesFromSearchResult", () => {
  it("reads the names a search found", () => {
    expect(
      toolReferencesFromSearchResult(
        JSON.stringify({ results: [{ name: "a" }, { name: "b" }] }),
      ),
    ).toEqual(["a", "b"]);
  });

  it("returns nothing for text that is not a search result", () => {
    expect(toolReferencesFromSearchResult("Error: no")).toBeUndefined();
    expect(toolReferencesFromSearchResult('{"results":[]}')).toBeUndefined();
  });
});
