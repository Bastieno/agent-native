/**
 * AnthropicEngine — wraps @anthropic-ai/sdk for use as an AgentEngine.
 *
 * This is the default, best-in-class engine. It supports all Anthropic-native
 * features: extended thinking, prompt caching, vision, computer use, and
 * parallel tool calls.
 *
 * All providerOptions.anthropic fields are forwarded directly to the SDK.
 */

import type {
  AgentEngine,
  EngineCapabilities,
  EngineStreamOptions,
  EngineEvent,
  EngineMessage,
  EngineTool,
} from "./types.js";
import {
  engineToolsToAnthropic,
  engineMessagesToAnthropic,
  anthropicContentToEngine,
  anthropicChunkToEngineEvents,
} from "./translate-anthropic.js";
import { readDeployCredentialEnv } from "../../server/credential-provider.js";
import { normalizeReasoningEffortForModel } from "../../shared/reasoning-effort.js";
import {
  LLM_MISSING_CREDENTIALS_ERROR_CODE,
  LLM_MISSING_CREDENTIALS_MESSAGE,
} from "./credential-errors.js";
import { ANTHROPIC_MODEL_CONFIG } from "../model-config.js";

/**
 * Mark where the conversation so far ends, so the next step reads it from the
 * cache instead of paying for it again.
 *
 * The instructions and tool list were already cached, but the conversation
 * (every earlier message and every tool result) was sent at full price on each
 * step. In a run that looks up a dozen learners' marks, that history is most of
 * what is paid for. Two breakpoints are placed: the end of the last message
 * (read next step) and the end of the user message before it, which is where
 * the previous step's breakpoint was, so a step that added many tool results at
 * once still finds the earlier entry. With the two on the instructions and the
 * tools that makes four, the most the API allows.
 */
export function withConversationCacheBreakpoints<
  M extends { role: string; content: unknown },
>(messages: M[]): M[] {
  const out = [...messages];
  const mark = (index: number) => {
    const msg = out[index];
    if (!msg || msg.role !== "user") return;
    const content: any[] = Array.isArray(msg.content)
      ? [...msg.content]
      : typeof msg.content === "string" && msg.content
        ? [{ type: "text", text: msg.content }]
        : [];
    for (let i = content.length - 1; i >= 0; i--) {
      const block = content[i];
      // Thinking blocks cannot carry a breakpoint; an empty text block either.
      if (
        block?.type === "thinking" ||
        block?.type === "redacted_thinking" ||
        (block?.type === "text" && !block.text)
      ) {
        continue;
      }
      content[i] = { ...block, cache_control: { type: "ephemeral" } };
      out[index] = { ...msg, content };
      return;
    }
  };
  const last = out.length - 1;
  mark(last);
  for (let i = last - 1; i >= 0; i--) {
    if (out[i].role === "user") {
      mark(i);
      break;
    }
  }
  return out;
}

/**
 * The tools for an Anthropic request, with deferred loading applied.
 *
 * A tool marked `deferLoading` is sent with `defer_loading: true`, so its
 * definition stays out of the prompt until a `tool-search` result references
 * it. Loaded tools come first and the last of them carries the cache
 * breakpoint (a deferred tool may not). A deferred tool the conversation
 * called without first finding it through a search is loaded, so the history
 * never names a tool the model cannot see. If nothing would be loaded,
 * nothing is deferred.
 */
export function anthropicToolsWithDeferral(
  tools: EngineTool[],
  messages: EngineMessage[],
  cacheEnabled: boolean,
): { tools: any[]; deferred: Set<string> } {
  // A tool found by an earlier search stays loaded for the rest of the
  // conversation (the API expands references throughout the history), so
  // only a tool called without having been found needs loading up front.
  // Loading one changes the tool list and costs the whole cache for that step.
  const found = new Set<string>();
  const called = new Set<string>();
  for (const m of messages) {
    for (const p of m.content) {
      if (p.type === "tool-call") called.add(p.name);
      if (p.type === "tool-result")
        p.toolReferences?.forEach((n) => found.add(n));
    }
  }
  let deferred = new Set(
    tools
      .filter(
        (t) => t.deferLoading && !(called.has(t.name) && !found.has(t.name)),
      )
      .map((t) => t.name),
  );
  if (deferred.size === tools.length) deferred = new Set();
  const loaded = tools.filter((t) => !deferred.has(t.name));
  const later = tools.filter((t) => deferred.has(t.name));
  const out: any[] = [
    ...engineToolsToAnthropic(loaded),
    ...engineToolsToAnthropic(later).map((t) => ({
      ...t,
      defer_loading: true,
    })),
  ];
  if (cacheEnabled && loaded.length > 0) {
    out[loaded.length - 1] = {
      ...out[loaded.length - 1],
      cache_control: { type: "ephemeral" },
    };
  }
  return { tools: out, deferred };
}

/**
 * Turns the tool results that found deferred tools (`toolReferences` on the
 * engine part) into `tool_reference` blocks, so the API loads those tools for
 * the model. Such a result holds only the references: the API refuses them
 * mixed with text. References to tools that are not deferred in this request
 * are left out, and a result with none keeps its text.
 */
export function withToolReferences(
  out: any[],
  messages: EngineMessage[],
  deferred: Set<string>,
): any[] {
  if (deferred.size === 0) return out;
  const refs = new Map<string, string[]>();
  for (const m of messages) {
    for (const p of m.content) {
      if (p.type !== "tool-result" || !p.toolReferences) continue;
      const names = p.toolReferences.filter((n) => deferred.has(n));
      if (names.length > 0) refs.set(p.toolCallId, names);
    }
  }
  if (refs.size === 0) return out;
  return out.map((msg) => {
    if (!Array.isArray(msg.content)) return msg;
    let changed = false;
    const content = msg.content.map((block: any) => {
      const names =
        block?.type === "tool_result" ? refs.get(block.tool_use_id) : undefined;
      if (!names) return block;
      changed = true;
      // The API refuses references mixed with text in one result; the
      // definitions it expands them into say everything the text did.
      return {
        ...block,
        content: names.map((tool_name) => ({
          type: "tool_reference",
          tool_name,
        })),
      };
    });
    return changed ? { ...msg, content } : msg;
  });
}

export const ANTHROPIC_CAPABILITIES: EngineCapabilities = {
  thinking: true,
  promptCaching: true,
  vision: true,
  computerUse: true,
  parallelToolCalls: true,
};

export const ANTHROPIC_SUPPORTED_MODELS =
  ANTHROPIC_MODEL_CONFIG.supportedModels;
export const ANTHROPIC_DEFAULT_MODEL = ANTHROPIC_MODEL_CONFIG.defaultModel;

class AnthropicEngine implements AgentEngine {
  readonly name = "anthropic";
  readonly label = "Claude (Anthropic SDK)";
  readonly defaultModel = ANTHROPIC_DEFAULT_MODEL;
  readonly supportedModels = ANTHROPIC_SUPPORTED_MODELS;
  readonly capabilities = ANTHROPIC_CAPABILITIES;

  private readonly apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async *stream(opts: EngineStreamOptions): AsyncIterable<EngineEvent> {
    const Anthropic = (await import("@anthropic-ai/sdk")).default;
    const client = new Anthropic({ apiKey: this.apiKey });

    const anthropicOpts = opts.providerOptions?.anthropic;

    // Build extra body params for Anthropic-native features
    const extra: Record<string, unknown> = {};
    if (anthropicOpts?.thinking) {
      extra.thinking = {
        type: anthropicOpts.thinking.type,
        budget_tokens: anthropicOpts.thinking.budgetTokens,
      };
    }
    if (anthropicOpts?.topK !== undefined) {
      extra.top_k = anthropicOpts.topK;
    }
    const reasoningEffort = normalizeReasoningEffortForModel(
      opts.model,
      opts.reasoningEffort,
    );
    if (reasoningEffort) {
      if (!extra.thinking) {
        extra.thinking = { type: "adaptive" };
      }
      extra.output_config = { effort: reasoningEffort };
    }

    // Apply prompt caching to the system prompt and tools by default.
    // Cache is pure upside: identical prefixes on subsequent turns get ~90%
    // off input cost and much faster time-to-first-token. If the prefix
    // changes turn-to-turn, it's a no-op. Templates can opt out by setting
    // providerOptions.anthropic.cacheControl = false.
    const cacheEnabled = anthropicOpts?.cacheControl !== false;
    // The stable leading part is cached; what changes per request (the time,
    // the current screen) follows in its own uncached block, so it does not
    // force the instructions to be written to the cache again every turn.
    const boundary = opts.systemPromptCacheBoundary;
    const systemBlocks: any[] =
      boundary !== undefined &&
      boundary > 0 &&
      boundary < opts.systemPrompt.length
        ? [
            { type: "text", text: opts.systemPrompt.slice(0, boundary) },
            { type: "text", text: opts.systemPrompt.slice(boundary) },
          ]
        : [{ type: "text", text: opts.systemPrompt }];
    if (cacheEnabled) {
      systemBlocks[0].cache_control = { type: "ephemeral" };
    }

    // Apply cache_control to the last loaded tool definition when caching is
    // enabled. Anthropic caches the prefix up to and including the last cached
    // block; deferred tools are not part of that prefix.
    const { tools: cachedTools, deferred } = anthropicToolsWithDeferral(
      opts.tools,
      opts.messages,
      cacheEnabled,
    );
    const messages = withToolReferences(
      engineMessagesToAnthropic(opts.messages),
      opts.messages,
      deferred,
    );

    const requestParams: any = {
      model: opts.model,
      max_tokens: opts.maxOutputTokens ?? 32768,
      system: systemBlocks,
      tools: cachedTools.length > 0 ? cachedTools : undefined,
      messages: cacheEnabled
        ? withConversationCacheBreakpoints(messages)
        : messages,
      ...(opts.temperature !== undefined
        ? { temperature: opts.temperature }
        : {}),
      ...extra,
    };

    // Remove undefined tools to avoid Anthropic API validation errors
    if (!requestParams.tools) delete requestParams.tools;

    const apiStream = client.messages.stream(requestParams, {
      signal: opts.abortSignal,
    });

    let thinkingText = "";
    let thinkingSignature = "";

    try {
      for await (const chunk of apiStream) {
        const events = anthropicChunkToEngineEvents(chunk);
        for (const event of events) {
          if (event.type === "thinking-delta") {
            thinkingText += event.text;
            if (event.signature) thinkingSignature = event.signature;
          }
          yield event;
        }
      }

      const finalMessage = await apiStream.finalMessage();
      // A stream cut off after some text but before Anthropic's closing
      // message_delta has no stop_reason. Reading that as a normal end of turn
      // saves the partial text as a finished reply, so fail it instead and let
      // the run loop retry the step.
      if (!finalMessage.stop_reason) {
        throw new Error(
          "Anthropic stream closed early: connection reset before the model finished",
        );
      }
      const assistantContent = anthropicContentToEngine(finalMessage.content);

      // Emit usage
      if (finalMessage.usage) {
        yield {
          type: "usage",
          inputTokens: finalMessage.usage.input_tokens ?? 0,
          outputTokens: finalMessage.usage.output_tokens ?? 0,
          cacheReadTokens:
            (finalMessage.usage as any).cache_read_input_tokens ?? 0,
          cacheWriteTokens:
            (finalMessage.usage as any).cache_creation_input_tokens ?? 0,
        };
      }

      yield { type: "assistant-content", parts: assistantContent };

      // Emit stop reason
      const stopReason = finalMessage.stop_reason;
      yield {
        type: "stop",
        reason:
          stopReason === "tool_use"
            ? "tool_use"
            : stopReason === "max_tokens"
              ? "max_tokens"
              : "end_turn",
      };
    } catch (err: any) {
      yield {
        type: "stop",
        reason: "error",
        error: err?.message ?? String(err),
      };
      throw err;
    }
  }
}

/**
 * Create an AnthropicEngine instance.
 * Falls back to the deployment Anthropic key if no key is provided.
 */
export function createAnthropicEngine(
  config: Record<string, unknown> = {},
): AgentEngine {
  const allowEnvFallback = config.allowEnvFallback !== false;
  const apiKey =
    (config.apiKey as string | undefined) ??
    (allowEnvFallback ? readDeployCredentialEnv("ANTHROPIC_API_KEY") : "") ??
    "";
  if (!apiKey) {
    // Return a "missing key" engine that immediately errors
    return {
      name: "anthropic",
      label: "Claude (Anthropic SDK)",
      defaultModel: ANTHROPIC_DEFAULT_MODEL,
      supportedModels: ANTHROPIC_SUPPORTED_MODELS,
      capabilities: ANTHROPIC_CAPABILITIES,
      async *stream() {
        yield {
          type: "stop" as const,
          reason: "error" as const,
          error: LLM_MISSING_CREDENTIALS_MESSAGE,
          errorCode: LLM_MISSING_CREDENTIALS_ERROR_CODE,
        };
      },
    };
  }
  return new AnthropicEngine(apiKey);
}
