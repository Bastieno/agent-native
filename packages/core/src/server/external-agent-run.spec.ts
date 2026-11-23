import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const mockReadAppSecret = vi.fn();
const mockGetSetting = vi.fn();
const mockResolveEngine = vi.fn();
const mockRecordUsage = vi.fn();
const mockFallbackAllowed = vi.fn<[], boolean>();

vi.mock("../secrets/storage.js", () => ({
  readAppSecret: (...args: any[]) => mockReadAppSecret(...args),
}));

vi.mock("../settings/store.js", () => ({
  getSetting: (...args: any[]) => mockGetSetting(...args),
}));

vi.mock("../agent/engine/index.js", async (importOriginal) => ({
  ...(await importOriginal<typeof import("../agent/engine/index.js")>()),
  resolveEngine: (...args: any[]) => mockResolveEngine(...args),
}));

vi.mock("../usage/store.js", () => ({
  recordUsage: (...args: any[]) => mockRecordUsage(...args),
}));

vi.mock("./credential-provider.js", async (importOriginal) => {
  const actual =
    await importOriginal<typeof import("./credential-provider.js")>();
  return {
    ...actual,
    isDeployCredentialFallbackAllowed: () => mockFallbackAllowed(),
  };
});

const { runWithRequestContext } = await import("./request-context.js");
const {
  MCP_ASK_APP_USAGE_LABEL,
  MissingLlmCredentialsError,
  recordExternalAgentUsage,
  resolveCallerAgentEngine,
} = await import("./external-agent-run.js");
const { runAgentLoopDirectWithSoftTimeout } =
  await import("../agent/run-loop-with-resume.js");

const anthropicEngine = { name: "anthropic", defaultModel: "claude-test" };

beforeEach(() => {
  vi.clearAllMocks();
  mockReadAppSecret.mockResolvedValue(null);
  mockGetSetting.mockResolvedValue(undefined);
  mockResolveEngine.mockResolvedValue(anthropicEngine);
  mockRecordUsage.mockResolvedValue(undefined);
  mockFallbackAllowed.mockReturnValue(false);
  process.env.ANTHROPIC_API_KEY = "deploy-key";
});

afterEach(() => {
  delete process.env.ANTHROPIC_API_KEY;
});

function asCaller<T>(fn: () => Promise<T>): Promise<T> {
  return runWithRequestContext(
    { userEmail: "head@school.test", orgId: "org-1" },
    fn,
  ) as Promise<T>;
}

describe("resolveCallerAgentEngine", () => {
  it("uses the caller's org-scope key, resolved in the caller's org", async () => {
    mockReadAppSecret.mockImplementation(async (ref: any) =>
      ref.scope === "org" && ref.scopeId === "org-1"
        ? { value: "org-key", last4: "-key", updatedAt: 1 }
        : null,
    );

    const engine = await asCaller(() =>
      resolveCallerAgentEngine({ pluginApiKey: "plugin-key", appId: "app" }),
    );

    expect(engine).toBe(anthropicEngine);
    expect(mockResolveEngine).toHaveBeenCalledWith(
      expect.objectContaining({ apiKey: "org-key", appId: "app" }),
    );
    expect(mockReadAppSecret).toHaveBeenCalledWith({
      key: "ANTHROPIC_API_KEY",
      scope: "org",
      scopeId: "org-1",
    });
  });

  it("fails cleanly with no key when the deploy-key fallback is blocked", async () => {
    await expect(
      asCaller(() =>
        resolveCallerAgentEngine({ pluginApiKey: "plugin-key", appId: "app" }),
      ),
    ).rejects.toBeInstanceOf(MissingLlmCredentialsError);

    // Neither the plugin's key nor the deploy env key reached the engine.
    expect(mockResolveEngine).toHaveBeenCalledWith(
      expect.objectContaining({ apiKey: undefined }),
    );
  });

  it("keeps the deploy fallback where the policy allows it, as web chat does", async () => {
    mockFallbackAllowed.mockReturnValue(true);

    await asCaller(() =>
      resolveCallerAgentEngine({ pluginApiKey: "plugin-key", appId: "app" }),
    );
    expect(mockResolveEngine).toHaveBeenLastCalledWith(
      expect.objectContaining({ apiKey: "deploy-key" }),
    );

    delete process.env.ANTHROPIC_API_KEY;
    await asCaller(() =>
      resolveCallerAgentEngine({ pluginApiKey: "plugin-key", appId: "app" }),
    );
    expect(mockResolveEngine).toHaveBeenLastCalledWith(
      expect.objectContaining({ apiKey: "plugin-key" }),
    );
  });

  it("lets a keyless non-Anthropic engine (e.g. a connected gateway) run", async () => {
    mockResolveEngine.mockResolvedValue({ name: "builder" });

    await expect(
      asCaller(() => resolveCallerAgentEngine({ appId: "app" })),
    ).resolves.toEqual({ name: "builder" });
  });
});

describe("recordExternalAgentUsage", () => {
  it("records a stubbed engine's usage against the caller with its own label", async () => {
    const stubEngine = {
      name: "stub",
      label: "Stub",
      defaultModel: "claude-test",
      supportedModels: ["claude-test"],
      capabilities: {},
      async *stream() {
        yield {
          type: "usage" as const,
          inputTokens: 120,
          outputTokens: 30,
          cacheReadTokens: 7,
          cacheWriteTokens: 3,
        };
        yield {
          type: "assistant-content" as const,
          parts: [{ type: "text" as const, text: "done" }],
        };
        yield { type: "text-delta" as const, text: "done" };
        yield { type: "stop" as const, reason: "end_turn" as const };
      },
    };

    const usage = await runAgentLoopDirectWithSoftTimeout({
      engine: stubEngine as any,
      model: "claude-test",
      systemPrompt: "system",
      tools: [],
      messages: [{ role: "user", content: [{ type: "text", text: "hi" }] }],
      actions: {},
      send: () => {},
      signal: new AbortController().signal,
    });

    await recordExternalAgentUsage(usage, {
      ownerEmail: "head@school.test",
      label: MCP_ASK_APP_USAGE_LABEL,
      app: "school",
    });

    expect(mockRecordUsage).toHaveBeenCalledWith({
      ownerEmail: "head@school.test",
      inputTokens: 120,
      outputTokens: 30,
      cacheReadTokens: 7,
      cacheWriteTokens: 3,
      model: "claude-test",
      label: "mcp-ask-app",
      app: "school",
    });
  });

  it("skips unauthenticated runs and never throws", async () => {
    const usage = {
      inputTokens: 1,
      outputTokens: 1,
      cacheReadTokens: 0,
      cacheWriteTokens: 0,
      model: "m",
    };
    await recordExternalAgentUsage(usage, { ownerEmail: null, label: "a2a" });
    expect(mockRecordUsage).not.toHaveBeenCalled();

    mockRecordUsage.mockRejectedValueOnce(new Error("db down"));
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    await expect(
      recordExternalAgentUsage(usage, { ownerEmail: "a@b.c", label: "a2a" }),
    ).resolves.toBeUndefined();
    errorSpy.mockRestore();
  });
});
