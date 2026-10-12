/**
 * A head sets up a provisioned school from an MCP client.
 *
 *   SCHOOL_URL=http://localhost:8130 pnpm journey:mcp-setup
 *
 * Plays the parts a real head's AI app plays: provisions a school as an
 * operator would, signs the head up, connects over remote MCP with OAuth —
 * client registration, PKCE, consent — and calls `setup-school` as a tool.
 * Then signs in on the web and checks the head lands as the school's admin.
 *
 * The head signs up with a Gmail-style address on purpose: their school has
 * no allowed domain, which is the case that used to leave MCP calls with no
 * school at all. Email is switched off for the provisioning step, so nothing
 * is sent.
 */
import { spawnSync } from "node:child_process";
import { createHash, randomBytes } from "node:crypto";
import { TEST_PASSWORD } from "./client.js";

const BASE = process.env.SCHOOL_URL ?? "http://localhost:8130";
const MCP_URL = `${BASE}/_agent-native/mcp`;
const REDIRECT_URI = "http://localhost:9/callback";

function check(ok: unknown, what: string): void {
  if (!ok) throw new Error(`FAILED: ${what}`);
  console.log(`  ok  ${what}`);
}

function cookieFrom(res: Response): string {
  return res.headers
    .getSetCookie()
    .map((c) => c.split(";")[0])
    .filter((c) => !c.endsWith("="))
    .join("; ");
}

async function signUp(email: string): Promise<string> {
  const register = await fetch(`${BASE}/_agent-native/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password: TEST_PASSWORD }),
  });
  if (!register.ok && register.status !== 409) {
    throw new Error(`register: ${register.status} ${await register.text()}`);
  }
  const login = await fetch(`${BASE}/_agent-native/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password: TEST_PASSWORD }),
  });
  if (!login.ok) throw new Error(`login: ${login.status}`);
  return cookieFrom(login);
}

/** OAuth authorization code + PKCE, as an MCP client does it. */
async function connect(cookie: string, clientName: string): Promise<string> {
  const reg = await fetch(`${BASE}/_agent-native/mcp/oauth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_name: clientName,
      redirect_uris: [REDIRECT_URI],
      token_endpoint_auth_method: "none",
    }),
  });
  if (!reg.ok) throw new Error(`client registration: ${reg.status}`);
  const { client_id } = (await reg.json()) as { client_id: string };

  const verifier = randomBytes(32).toString("base64url");
  const challenge = createHash("sha256").update(verifier).digest("base64url");
  const params = new URLSearchParams({
    response_type: "code",
    client_id,
    redirect_uri: REDIRECT_URI,
    resource: MCP_URL,
    scope: "mcp:read mcp:write",
    state: "journey",
    code_challenge: challenge,
    code_challenge_method: "S256",
  });
  const consent = await fetch(
    `${BASE}/_agent-native/mcp/oauth/authorize?${params}`,
    { headers: { cookie } },
  );
  const page = await consent.text();
  const fields: Record<string, string> = {};
  for (const m of page.matchAll(
    /<input[^>]*name="([^"]+)"[^>]*value="([^"]*)"/g,
  )) {
    fields[m[1]] = m[2].replace(/&amp;/g, "&").replace(/&quot;/g, '"');
  }
  if (!fields.consent_token) {
    throw new Error(
      `no consent page (${consent.status}): ${page.slice(0, 200)}`,
    );
  }

  const approve = await fetch(`${BASE}/_agent-native/mcp/oauth/authorize`, {
    method: "POST",
    redirect: "manual",
    headers: {
      cookie,
      origin: BASE,
      // What the browser sends when the head presses Approve on the page.
      "sec-fetch-site": "same-origin",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ ...fields, decision: "approve" }),
  });
  const location = approve.headers.get("location") ?? "";
  const code = new URL(location, BASE).searchParams.get("code");
  if (!code) {
    throw new Error(
      `no authorization code (${approve.status}): ${(await approve.text()).slice(0, 300)}`,
    );
  }

  const token = await fetch(`${BASE}/_agent-native/mcp/oauth/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: REDIRECT_URI,
      client_id,
      code_verifier: verifier,
      resource: MCP_URL,
    }),
  });
  if (!token.ok)
    throw new Error(`token: ${token.status} ${await token.text()}`);
  return ((await token.json()) as { access_token: string }).access_token;
}

let rpcId = 0;
async function mcp(accessToken: string, method: string, params: unknown) {
  const res = await fetch(MCP_URL, {
    method: "POST",
    headers: {
      authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      accept: "application/json, text/event-stream",
    },
    body: JSON.stringify({ jsonrpc: "2.0", id: ++rpcId, method, params }),
  });
  const text = await res.text();
  const body = text.startsWith("{")
    ? text
    : (text
        .split("\n")
        .filter((l) => l.startsWith("data:"))
        .map((l) => l.slice(5).trim())
        .pop() ?? "");
  const parsed = JSON.parse(body);
  if (parsed.error) throw new Error(`${method}: ${parsed.error.message}`);
  return parsed.result;
}

async function tool(accessToken: string, name: string, args: unknown) {
  const result = await mcp(accessToken, "tools/call", {
    name,
    arguments: args,
  });
  const text = (result?.content ?? [])
    .map((c: { text?: string }) => c.text ?? "")
    .join("\n");
  return { isError: !!result?.isError, text };
}

type Head = {
  headEmail: string;
  schoolName: string;
  provisionedId: string | undefined;
  cookie: string;
};

/** What an operator and then the head do before any MCP client is involved. */
async function provisionedHead(tag: string): Promise<Head> {
  const run = `${Date.now().toString(36)}${tag}`;
  const headEmail = `head.${run}@gmail-sim.test`;
  const schoolName = `MCP Setup School ${run}`;
  console.log(`Head ${headEmail}, school "${schoolName}" on ${BASE}`);

  const provision = spawnSync(
    "npx",
    [
      "tsx",
      "ops/provision-school.ts",
      "--name",
      schoolName,
      "--headEmail",
      headEmail,
      "--headName",
      "Mrs Ada Okafor",
    ],
    {
      encoding: "utf8",
      env: { ...process.env, RESEND_API_KEY: "", SENDGRID_API_KEY: "" },
    },
  );
  process.stdout.write(
    provision.stdout.trimEnd().replace(/^/gm, "  | ") + "\n",
  );
  check(provision.status === 0, "an operator provisions the school");
  const provisionedId = /\(([^)]+)\) with /.exec(provision.stdout)?.[1];

  const cookie = await signUp(headEmail);
  check(cookie, "the head creates their account");
  return { headEmail, schoolName, provisionedId, cookie };
}

async function webSession(cookie: string) {
  return (
    await fetch(`${BASE}/api/school/session`, { headers: { cookie } })
  ).json();
}

async function initialize(accessToken: string) {
  await mcp(accessToken, "initialize", {
    protocolVersion: "2025-06-18",
    capabilities: {},
    clientInfo: { name: "journey", version: "1" },
  });
  const listed = await mcp(accessToken, "tools/list", {});
  return new Set<string>(listed.tools.map((t: { name: string }) => t.name));
}

/**
 * A coding client (Claude Code, Cursor) is offered every action, so the head
 * calls `setup-school` directly and every step can be checked.
 */
async function codingClient() {
  console.log("\nA coding client calls setup-school itself");
  const { headEmail, schoolName, provisionedId, cookie } =
    await provisionedHead("c");
  const accessToken = await connect(cookie, "School setup journey cli");
  check(accessToken, "the head's MCP client connects with OAuth");
  const tools = await initialize(accessToken);
  check(tools.has("setup-school"), "setup-school is offered as a tool");
  const setup = await tool(accessToken, "setup-school", {
    name: schoolName,
    type: "secondary",
    country: "Nigeria",
    timezone: "Africa/Lagos",
  });
  check(!setup.isError, "setup-school succeeds over MCP");
  check(
    JSON.parse(setup.text).schoolId === provisionedId,
    "it set up the school that was provisioned, not another",
  );

  const config = await tool(accessToken, "get-school-config", {});
  check(
    !config.isError && config.text.includes(schoolName),
    "the school's settings are saved in the head's own school",
  );

  const staff = JSON.parse((await tool(accessToken, "list-staff", {})).text);
  check(
    staff.active.some(
      (m: { email: string; schoolRole: string }) =>
        m.email === headEmail && m.schoolRole === "school_admin",
    ) && !staff.pending.some((p: { email: string }) => p.email === headEmail),
    "the head is on the staff list as admin, not as a pending invitation",
  );

  const session = await webSession(cookie);
  check(
    session.schoolRole === "school_admin" && !session.accessDenied,
    `on the web the head is the school's admin (role ${session.schoolRole})`,
  );
  check(
    session.user?.name === "Mrs Ada Okafor",
    `the head carries the name they were invited under (${session.user?.name})`,
  );
}

/**
 * A chat app (Claude Desktop, claude.ai, ChatGPT) is offered `ask_app` rather
 * than every action, and hands the request to the school's own agent. That
 * runs the model, so it costs a little and is opt-in: JOURNEY_CHAT=1.
 */
async function chatClient() {
  console.log("\nA chat app asks the school's agent to set the school up");
  const { schoolName, provisionedId, cookie } = await provisionedHead("a");
  const accessToken = await connect(cookie, "Claude");
  check(accessToken, "the head's chat app connects with OAuth");
  const tools = await initialize(accessToken);
  check(
    tools.has("ask_app") && !tools.has("setup-school"),
    "the chat app is offered ask_app, not every action",
  );

  const answer = await tool(accessToken, "ask_app", {
    message: `Please set up our school. It is called ${schoolName}, a secondary school in Nigeria (Africa/Lagos). Just record the school for now; we will do the rest of the setup later.`,
  });
  check(!answer.isError, "the school's agent answers");

  const session = await webSession(cookie);
  check(
    session.schoolRole === "school_admin" && session.schoolId === provisionedId,
    `the head is now admin of the provisioned school (role ${session.schoolRole})`,
  );
}

async function main() {
  await codingClient();
  if (process.env.JOURNEY_CHAT === "1") await chatClient();
  console.log("\nAll checks passed.");
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
