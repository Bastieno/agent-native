/**
 * Talking to a running dev server as a particular person.
 *
 * Everything the simulation does goes through the same HTTP endpoints the
 * browser uses, signed in as the person who would really be doing it — so the
 * role guard, the class scoping and every refusal are exercised for real. A
 * simulation that wrote straight to SQL would prove only that SQL works.
 *
 * Real sessions rather than the dev owner-email header, because a session is
 * what a teacher actually has, and because signing up is itself part of what
 * is being tested: a school is created by registering an admin, which is how
 * a real school starts.
 */

const BASE = process.env.SCHOOL_URL ?? "http://localhost:8130";

/** Local test accounts for a local dev server; never a real credential. */
export const TEST_PASSWORD = "SimTest!2026pass";

type Verb = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type Persona = {
  email: string;
  label: string;
  role: "admin" | "teacher" | "student";
  cookie: string;
  /** The student's own record id, once they have one. */
  studentId?: string;
  userId?: string;
};

export class ActionError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly action: string,
    readonly persona: string,
  ) {
    super(message);
    this.name = "ActionError";
  }
}

export type Call = {
  at: string;
  persona: string;
  action: string;
  ok: boolean;
  ms: number;
  error?: string;
};

export class Client {
  readonly calls: Call[] = [];
  /** Which verb each action answered to, so it is worked out once. */
  private readonly verbs = new Map<string, Verb>();

  constructor(readonly baseUrl: string = BASE) {}

  async healthy(): Promise<boolean> {
    try {
      const res = await fetch(this.baseUrl, {
        signal: AbortSignal.timeout(15_000),
      });
      return res.ok;
    } catch {
      return false;
    }
  }

  /**
   * A new account, signed in and ready to act.
   *
   * Registering is idempotent on purpose: a re-run with the same seed finds
   * the accounts already there and carries on rather than failing on the
   * first step.
   */
  async signUp(
    email: string,
    label: string,
    role: Persona["role"],
  ): Promise<Persona> {
    const register = await fetch(
      `${this.baseUrl}/_agent-native/auth/register`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: TEST_PASSWORD }),
      },
    );
    if (!register.ok && register.status !== 409) {
      throw new Error(
        `register ${email}: ${register.status} ${await register.text()}`,
      );
    }
    return this.signIn(email, label, role);
  }

  async signIn(
    email: string,
    label: string,
    role: Persona["role"],
  ): Promise<Persona> {
    const res = await fetch(`${this.baseUrl}/_agent-native/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password: TEST_PASSWORD }),
    });
    if (!res.ok) {
      throw new Error(`sign in ${email}: ${res.status} ${await res.text()}`);
    }
    const cookie = res.headers
      .getSetCookie()
      .map((c) => c.split(";")[0])
      .filter((c) => !c.endsWith("="))
      .join("; ");
    if (!cookie) throw new Error(`sign in ${email}: no session cookie`);

    const persona: Persona = { email, label, role, cookie };
    // Signing in is also what creates a student's profile, so the record id
    // is worth collecting while we are here.
    try {
      const session = await (
        await fetch(`${this.baseUrl}/api/school/session`, {
          headers: { cookie },
        })
      ).json();
      persona.userId = session?.user?.id ?? undefined;
    } catch {
      // Not fatal: the actions below will say so more clearly.
    }
    return persona;
  }

  /**
   * Run an action as someone.
   *
   * Actions declare their own verb — GET, POST, PUT — and the mount refuses
   * the others, naming the right one. The first call learns it from that
   * refusal and the rest of the run reuses it, so the simulation does not
   * have to carry a table of verbs that would go stale the day an action
   * changed its mind.
   */
  async as<T = any>(
    persona: Persona,
    action: string,
    args: Record<string, unknown> = {},
  ): Promise<T> {
    const started = Date.now();
    const record = (ok: boolean, error?: string) =>
      this.calls.push({
        at: new Date().toISOString(),
        persona: persona.label,
        action,
        ok,
        ms: Date.now() - started,
        error,
      });

    const attempt = async (verb: Verb) => {
      if (verb === "GET") {
        const query = new URLSearchParams();
        for (const [k, v] of Object.entries(args)) {
          if (v === undefined || v === null) continue;
          query.set(k, typeof v === "object" ? JSON.stringify(v) : String(v));
        }
        const suffix = query.toString() ? `?${query}` : "";
        return fetch(
          `${this.baseUrl}/_agent-native/actions/${action}${suffix}`,
          { headers: { cookie: persona.cookie } },
        );
      }
      return fetch(`${this.baseUrl}/_agent-native/actions/${action}`, {
        method: verb,
        headers: { "Content-Type": "application/json", cookie: persona.cookie },
        body: JSON.stringify(args),
        signal: AbortSignal.timeout(120_000),
      });
    };

    const known = this.verbs.get(action);
    let res = await attempt(known ?? "POST");
    if (!known && res.status === 405) {
      // "Method not allowed. Use PUT." — the mount says which, so ask it
      // rather than guessing twice.
      const told = /use\s+(GET|POST|PUT|PATCH|DELETE)/i.exec(
        await res.clone().text(),
      )?.[1] as Verb | undefined;
      const next: Verb = told ?? "GET";
      res = await attempt(next);
      this.verbs.set(action, next);
    } else if (!known) {
      this.verbs.set(action, "POST");
    }

    // Some actions are agent-only (`http: false`) — categorising a class is
    // one — so there is no endpoint to call. They are still ordinary actions
    // with no model behind them, and MCP runs them directly, which is how a
    // simulation exercises them without a single token being spent.
    if (res.status === 404) {
      this.verbs.delete(action);
      return this.viaMcp<T>(persona, action, args, record);
    }

    const text = await res.text();
    let body: any = null;
    try {
      body = text ? JSON.parse(text) : null;
    } catch {
      body = text;
    }

    if (!res.ok || body?.error) {
      const message = String(
        body?.error ?? body?.message ?? text ?? res.status,
      );
      record(false, message);
      throw new ActionError(message, res.status, action, persona.label);
    }
    record(true);
    return body as T;
  }

  /**
   * An action with no HTTP endpoint, run over MCP as the same person.
   *
   * The dev owner-email header is what carries identity here. It is a
   * development path and stays one: nothing in the simulation uses it where
   * a real session would do.
   */
  private async viaMcp<T>(
    persona: Persona,
    action: string,
    args: Record<string, unknown>,
    record: (ok: boolean, error?: string) => void,
  ): Promise<T> {
    const res = await fetch(`${this.baseUrl}/_agent-native/mcp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json, text/event-stream",
        "X-Agent-Native-Owner-Email": persona.email,
        "x-agent-native-mcp-client": "claude-code",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "tools/call",
        params: { name: action, arguments: args },
      }),
      signal: AbortSignal.timeout(120_000),
    });
    const text = await res.text();
    const line = text
      .split("\n")
      .find((l) => l.startsWith("data:"))
      ?.slice(5);
    if (!line) {
      record(false, `no MCP response (${res.status})`);
      throw new ActionError(
        `${action}: no response over MCP (${res.status})`,
        res.status,
        action,
        persona.label,
      );
    }
    const payload = JSON.parse(line);
    const content = payload?.result?.content?.[0]?.text;
    if (payload?.result?.isError || payload?.error) {
      const message = String(content ?? payload?.error?.message ?? "failed");
      record(false, message);
      throw new ActionError(message, 200, action, persona.label);
    }
    record(true);
    try {
      return JSON.parse(content) as T;
    } catch {
      return content as T;
    }
  }

  /** The same, where a refusal is the expected answer. */
  async refused(
    persona: Persona,
    action: string,
    args: Record<string, unknown> = {},
  ): Promise<string | null> {
    try {
      await this.as(persona, action, args);
      return null;
    } catch (error) {
      return error instanceof Error ? error.message : String(error);
    }
  }
}
