/**
 * A head sets up a provisioned school from an MCP client.
 *
 *   SCHOOL_URL=http://localhost:8132 pnpm journey:mcp-setup
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
import { TEST_PASSWORD } from "./client.js";
import { connect, mcp, tool } from "./mcp-client.js";

const BASE = process.env.SCHOOL_URL ?? "http://localhost:8132";

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
