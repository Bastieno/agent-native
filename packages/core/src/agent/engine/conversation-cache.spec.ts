import { describe, expect, it } from "vitest";
import { withConversationCacheBreakpoints } from "./anthropic-engine.js";

const user = (content: any) => ({ role: "user", content });
const assistant = (content: any) => ({ role: "assistant", content });
const marked = (m: any) =>
  (Array.isArray(m.content) ? m.content : []).filter(
    (b: any) => b.cache_control,
  ).length;

describe("withConversationCacheBreakpoints", () => {
  it("marks the end of the last message", () => {
    const out = withConversationCacheBreakpoints([
      user([{ type: "text", text: "hello" }]),
    ]);
    expect(out[0].content[0].cache_control).toEqual({ type: "ephemeral" });
  });

  it("also marks the user message before it, for steps that add many results", () => {
    const out = withConversationCacheBreakpoints([
      user([{ type: "text", text: "first question" }]),
      assistant([{ type: "tool_use", id: "a", name: "t", input: {} }]),
      user([{ type: "tool_result", tool_use_id: "a", content: "x" }]),
      assistant([{ type: "tool_use", id: "b", name: "t", input: {} }]),
      user([
        { type: "tool_result", tool_use_id: "b", content: "y" },
        { type: "tool_result", tool_use_id: "c", content: "z" },
      ]),
    ]);
    expect(marked(out[4])).toBe(1);
    expect(out[4].content[1].cache_control).toBeTruthy(); // the last block only
    expect(out[4].content[0].cache_control).toBeUndefined();
    expect(marked(out[2])).toBe(1);
    expect(marked(out[0])).toBe(0);
    expect(marked(out[1])).toBe(0);
  });

  it("never uses more than two message breakpoints", () => {
    const msgs: any[] = [];
    for (let i = 0; i < 6; i++) {
      msgs.push(user([{ type: "text", text: `q${i}` }]));
      msgs.push(assistant([{ type: "text", text: `a${i}` }]));
    }
    msgs.push(user([{ type: "text", text: "last" }]));
    const out = withConversationCacheBreakpoints(msgs);
    expect(out.reduce((n, m) => n + marked(m), 0)).toBe(2);
  });

  it("turns a plain string message into a block it can mark", () => {
    const out = withConversationCacheBreakpoints([user("plain text")]);
    expect(out[0].content).toEqual([
      {
        type: "text",
        text: "plain text",
        cache_control: { type: "ephemeral" },
      },
    ]);
  });

  it("does not change the messages it was given", () => {
    const input = [user([{ type: "text", text: "hi" }])];
    withConversationCacheBreakpoints(input);
    expect((input[0].content as any[])[0].cache_control).toBeUndefined();
  });

  it("skips thinking blocks and empty text", () => {
    const out = withConversationCacheBreakpoints([
      user([
        { type: "text", text: "real" },
        { type: "text", text: "" },
      ]),
    ]);
    expect(out[0].content[0].cache_control).toBeTruthy();
    expect(out[0].content[1].cache_control).toBeUndefined();
  });
});
