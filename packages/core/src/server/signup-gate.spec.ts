import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  SIGN_UP_REFUSED,
  isSignUpRefusal,
  setSignUpRule,
  signUpRefusal,
} from "./signup-gate.js";

describe("sign-up rule", () => {
  afterEach(() => setSignUpRule(null));

  it("lets everyone in when no rule is set", async () => {
    expect(await signUpRefusal("anyone@example.test")).toBeNull();
  });

  it("asks the rule with the address trimmed and lower-cased", async () => {
    const rule = vi.fn(() => true as const);
    setSignUpRule(rule);
    expect(await signUpRefusal("  Ada@School.TEST ")).toBeNull();
    expect(rule).toHaveBeenCalledWith({ email: "ada@school.test" });
  });

  it("refuses with the rule's own message", async () => {
    setSignUpRule(() => "Ask your school to invite you.");
    expect(await signUpRefusal("x@example.test")).toBe(
      "Ask your school to invite you.",
    );
  });

  it("refuses when the rule throws, rather than opening up", async () => {
    const err = vi.spyOn(console, "error").mockImplementation(() => {});
    setSignUpRule(() => {
      throw new Error("db down");
    });
    expect(await signUpRefusal("x@example.test")).toMatch(/try again/);
    err.mockRestore();
  });

  it("recognises a refusal by its code", () => {
    expect(isSignUpRefusal({ body: { code: SIGN_UP_REFUSED } })).toBe(true);
    expect(isSignUpRefusal({ code: SIGN_UP_REFUSED })).toBe(true);
    expect(isSignUpRefusal(new Error("Invalid password"))).toBe(false);
  });
});

describe("Better Auth sign-up with a rule", () => {
  let dir: string;
  let originalEnv: NodeJS.ProcessEnv;

  beforeEach(() => {
    originalEnv = { ...process.env };
    dir = fs.mkdtempSync(path.join(os.tmpdir(), "signup-gate-"));
    process.env.DATABASE_URL = `file:${path.join(dir, "auth.db")}`;
    process.env.BETTER_AUTH_SECRET = "signup-gate-spec-secret-0123456789abcd";
    process.env.NODE_ENV = "test";
    delete process.env.RESEND_API_KEY;
    delete process.env.SENDGRID_API_KEY;
    vi.resetModules();
  });

  afterEach(async () => {
    const { resetBetterAuth } = await import("./better-auth-instance.js");
    await resetBetterAuth();
    const gate = await import("./signup-gate.js");
    gate.setSignUpRule(null);
    process.env = originalEnv;
    fs.rmSync(dir, { recursive: true, force: true });
  });

  it("refuses an address the rule refuses, and creates no user", async () => {
    const gate = await import("./signup-gate.js");
    gate.setSignUpRule(({ email }) =>
      email.endsWith("@invited.test") ? true : "Not invited.",
    );
    const { getBetterAuth } = await import("./better-auth-instance.js");
    const auth = await getBetterAuth();

    let refused: any;
    try {
      await auth.api.signUpEmail({
        body: {
          email: "stranger@example.test",
          password: "password-123",
          name: "x",
        },
      });
    } catch (err) {
      refused = err;
    }
    expect(refused?.message).toBe("Not invited.");
    expect(gate.isSignUpRefusal(refused)).toBe(true);

    const { getDbExec } = await import("../db/client.js");
    const { rows } = await getDbExec().execute({
      sql: 'SELECT email FROM "user"',
      args: [],
    });
    expect(rows).toHaveLength(0);

    await auth.api.signUpEmail({
      body: { email: "ada@invited.test", password: "password-123", name: "x" },
    });
    const after = await getDbExec().execute({
      sql: 'SELECT email FROM "user"',
      args: [],
    });
    expect(after.rows.map((r: any) => r.email)).toEqual(["ada@invited.test"]);
  });
});

describe("generic Google sign-in with a rule", () => {
  let originalEnv: NodeJS.ProcessEnv;

  beforeEach(() => {
    originalEnv = { ...process.env };
  });

  afterEach(() => {
    process.env = originalEnv;
    vi.unstubAllGlobals();
    vi.doUnmock("./better-auth-instance.js");
    vi.doUnmock("../db/client.js");
    vi.resetModules();
  });

  async function googleCallback(opts: {
    email: string;
    hasAccount: boolean;
    rule: (d: { email: string }) => true | string;
  }) {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("GOOGLE_CLIENT_ID", "google-client");
    vi.stubEnv("GOOGLE_CLIENT_SECRET", "google-secret");
    vi.stubEnv("BETTER_AUTH_SECRET", "state-secret");
    vi.stubEnv("APP_URL", "https://school.example.test");
    delete process.env.ACCESS_TOKEN;
    delete process.env.ACCESS_TOKENS;

    const execute = vi.fn(async ({ sql }: { sql: string }) => ({
      rows: /FROM "user"/.test(sql) && opts.hasAccount ? [{ 1: 1 }] : [],
    }));
    vi.doMock("../db/client.js", () => ({
      getDbExec: () => ({ execute }),
      isPostgres: () => false,
      isLocalDatabase: () => false,
      intType: () => "INTEGER",
      retryOnDdlRace: (fn: () => Promise<unknown>) => fn(),
    }));
    vi.doMock("./better-auth-instance.js", () => ({
      getBetterAuth: vi.fn(async () => ({
        handler: vi.fn(async () => new Response("{}")),
        api: {
          getSession: vi.fn(async () => null),
          signInEmail: vi.fn(),
          signUpEmail: vi.fn(),
          signOut: vi.fn(),
        },
      })),
      getBetterAuthSync: vi.fn(() => undefined),
    }));
    vi.stubGlobal(
      "fetch",
      vi.fn(async (url: string) =>
        String(url).includes("oauth2.googleapis.com/token")
          ? Response.json({ access_token: "at" })
          : Response.json({ email: opts.email, verified_email: true }),
      ),
    );

    const { autoMountAuth } = await import("./auth.js");
    const { encodeOAuthState } = await import("./google-oauth.js");
    const app = { use: vi.fn() };
    await autoMountAuth(app as any, { allowSignUp: opts.rule });
    const handler = app.use.mock.calls.find(
      (call: any[]) => call[0] === "/_agent-native/google/callback",
    )?.[1];
    const state = encodeOAuthState({
      redirectUri: "https://school.example.test/_agent-native/google/callback",
    });
    const headers = new Headers({
      host: "school.example.test",
      "x-forwarded-proto": "https",
    });
    const pathWithQuery = `/_agent-native/google/callback?code=abc&state=${state}`;
    const event: any = {
      req: {
        method: "GET",
        url: `https://school.example.test${pathWithQuery}`,
        headers,
      },
      url: new URL(`https://school.example.test${pathWithQuery}`),
      res: { headers: new Headers(), status: 200 },
      node: {
        req: {
          headers: Object.fromEntries(headers),
          url: pathWithQuery,
          method: "GET",
        },
        res: {
          setHeader: vi.fn(),
          getHeader: vi.fn(),
          appendHeader: vi.fn(),
        },
      },
      headers,
      context: {},
      path: pathWithQuery,
      _cookies: {},
    };
    return { response: await handler(event), execute };
  }

  it("refuses a new address the rule refuses, naming the address tried", async () => {
    const { response, execute } = await googleCallback({
      email: "someone@gmail.test",
      hasAccount: false,
      rule: () => "Ask your school to invite you.",
    });
    expect(response).toBeInstanceOf(Response);
    const html = await (response as Response).text();
    expect(html).toContain("someone@gmail.test");
    expect(html).toContain("Ask your school to invite you.");
    // No session was written for them.
    expect(
      execute.mock.calls.some(([q]: any[]) =>
        /INSERT INTO sessions/i.test(q.sql),
      ),
    ).toBe(false);
  });

  it("does not ask the rule for an address that already has an account", async () => {
    const rule = vi.fn(() => "Ask your school to invite you.");
    const { response } = await googleCallback({
      email: "member@school.test",
      hasAccount: true,
      rule,
    });
    expect(rule).not.toHaveBeenCalled();
    const text =
      response instanceof Response ? await response.text() : String(response);
    expect(text).not.toContain("Ask your school to invite you.");
  });
});
