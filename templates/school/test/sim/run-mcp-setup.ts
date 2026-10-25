/**
 * A head sets up a provisioned school from an MCP client, and staff use the
 * school's tools from their own AI apps.
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
// The provisioning script and the cap check write straight to the server's
// database; without this they wrote to data/app.db while the journeys server
// read data/journeys.db.
const DATABASE_URL =
  process.env.JOURNEY_DATABASE_URL ?? "file:./data/journeys.db";

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
      env: {
        ...process.env,
        DATABASE_URL,
        RESEND_API_KEY: "",
        SENDGRID_API_KEY: "",
      },
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
  return { schoolId: provisionedId ?? "", headEmail };
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
    tools.has("ask_app") && !tools.has("list-staff"),
    "the chat app is offered ask_app and setup, not every action",
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

/** The tools a client lists, with the listing's size in bytes. */
async function listed(accessToken: string) {
  await mcp(accessToken, "initialize", {
    protocolVersion: "2025-06-18",
    capabilities: {},
    clientInfo: { name: "journey", version: "1" },
  });
  const out = await mcp(accessToken, "tools/list", {});
  const tools = out.tools as Array<{
    name: string;
    annotations?: { destructiveHint?: boolean };
  }>;
  return {
    names: new Set(tools.map((t) => t.name)),
    byName: new Map(tools.map((t) => [t.name, t])),
    bytes: JSON.stringify(out.tools).length,
  };
}

/** The refusal message when connecting is refused, or null if it was not. */
async function refusedAtConnect(accessToken: string): Promise<string | null> {
  try {
    await mcp(accessToken, "tools/list", {});
    return null;
  } catch (err) {
    return err instanceof Error ? err.message : String(err);
  }
}

/** Signs in, and loads the session once so an invitation is taken up. */
async function joinAs(email: string): Promise<string> {
  const cookie = await signUp(email);
  await webSession(cookie);
  return cookie;
}

// A size guard of our own, not a limit any host publishes: a model chooses
// better from a short list, and a long one costs every chat app's context. It
// was 48 KB when the admin's list was 46 KB, which left room for one tool.
// 72 KB leaves room for a dozen more admin tools; it was raised from 56 KB
// when the analytics and "who am I" tools went in, rather than trimming
// tool descriptions. Raised to 80 KB on 2026-10-25, on purpose, when teachers'
// own AI apps were given the tools they need (PDF resources, paper and learner
// profiles, what needs attention, help); the teacher's list was then 72 KB.
const BUDGET_BYTES = 80 * 1024;

/**
 * A chat app (Claude Desktop, claude.ai, ChatGPT) calls the school's own
 * tools: each role lists its short set, the work goes through directly, and
 * no model runs on the school's key. Learners and people in no school are
 * turned away at connect.
 */
async function chatClientDirect() {
  console.log("\nA chat app calls the school's tools directly");
  const { headEmail, schoolName, provisionedId, cookie } =
    await provisionedHead("d");
  const headToken = await connect(cookie, "Claude");
  check(headToken, "the head's chat app connects with OAuth");

  let head = await listed(headToken);
  check(
    head.names.has("setup-school") &&
      head.names.has("check-school-setup") &&
      head.names.has("get-school-guidance") &&
      head.names.has("get-my-profile") &&
      head.names.has("ask_app") &&
      head.names.size === 5,
    `before setup the head sees setup only (${[...head.names].join(", ")})`,
  );

  const guide = await tool(headToken, "get-school-guidance", {
    topic: "setup",
  });
  check(
    !guide.isError && guide.text.includes("setup sheet"),
    "the head's app can read how setup is done",
  );
  const gaps = await tool(headToken, "check-school-setup", {});
  check(!gaps.isError, "the head's app can see what is still empty");

  const setup = await tool(headToken, "setup-school", {
    name: schoolName,
    type: "secondary",
    country: "Nigeria",
    timezone: "Africa/Lagos",
  });
  check(!setup.isError, "setup-school runs from the chat app");
  check(
    JSON.parse(setup.text).schoolId === provisionedId,
    "it set up the school that was provisioned",
  );
  const web = await webSession(cookie);
  check(
    web.schoolRole === "school_admin" && web.schoolId === provisionedId,
    `on the web the head is the school's admin (role ${web.schoolRole})`,
  );

  // A moment for the head's new role to take over from the setup list.
  await new Promise((r) => setTimeout(r, 1100));
  head = await listed(headToken);
  check(
    head.names.has("invite-staff") &&
      head.names.has("update-school-config") &&
      !head.names.has("suspend-staff") &&
      !head.names.has("open_app"),
    `after setup the head sees the admin's list (${head.names.size} tools)`,
  );
  check(
    head.bytes < BUDGET_BYTES,
    `the admin's list is within budget (${Math.round(head.bytes / 1024)} KB)`,
  );
  if (head.names.size > 50) {
    console.log(`  !!  the admin's list has ${head.names.size} tools`);
  }
  check(
    head.byName.get("invite-staff")?.annotations?.destructiveHint === true,
    "inviting staff is flagged for the host to confirm",
  );

  check(
    head.names.has("create-extension") &&
      head.names.has("update-extension") &&
      head.names.has("list-extensions") &&
      !head.names.has("delete-extension"),
    "the admin's app can create and change extensions itself, not delete them",
  );
  const madeExtension = await tool(headToken, "create-extension", {
    name: "House points",
    description: "A tally of house points",
    content:
      '<div x-data="{ n: 0 }"><button @click="n++">Add</button> <span x-text="n"></span></div>',
  });
  check(
    !madeExtension.isError,
    "the admin's app creates an extension directly",
  );

  check(
    head.names.has("get-my-profile") &&
      head.names.has("identify-struggling-students") &&
      head.names.has("get-student-profile") &&
      head.names.has("get-school-analytics") &&
      head.names.has("issue-report-card") &&
      head.names.has("get-report-card"),
    "the admin's app can ask who it is, who is struggling, and issue report cards",
  );
  const me = await tool(headToken, "get-my-profile", {});
  check(
    !me.isError && /admin/i.test(me.text),
    "the head's app is told it is signed in as the school's admin",
  );

  const run = provisionedId?.slice(0, 6) ?? Date.now().toString(36);
  const teacherEmail = `teacher.${run}@gmail-sim.test`;
  const learnerEmail = `learner.${run}@gmail-sim.test`;
  const invited = await tool(headToken, "invite-staff", {
    email: teacherEmail,
    name: "Mr Tunde Bello",
    schoolRole: "teacher",
  });
  check(!invited.isError, "the head invites a teacher from the chat app");
  const invitedLearner = await tool(headToken, "invite-student", {
    email: learnerEmail,
    name: "Amaka Obi",
  });
  check(
    !invitedLearner.isError,
    "the head invites a learner from the chat app",
  );

  const teacherCookie = await joinAs(teacherEmail);
  const teacherToken = await connect(teacherCookie, "Claude");
  const teacher = await listed(teacherToken);
  check(
    teacher.names.has("get-marking-queue") &&
      teacher.names.has("plan-lesson-notes") &&
      !teacher.names.has("invite-staff"),
    `a teacher sees teaching tools and not inviting staff (${teacher.names.size} tools)`,
  );
  check(
    teacher.bytes < BUDGET_BYTES,
    `the teacher's list is within budget (${Math.round(teacher.bytes / 1024)} KB)`,
  );
  let forced: string | null = null;
  try {
    const r = await tool(teacherToken, "invite-staff", {
      email: `someone.${run}@gmail-sim.test`,
      name: "Someone",
      schoolRole: "teacher",
    });
    forced = r.isError ? r.text : null;
  } catch (err) {
    forced = err instanceof Error ? err.message : String(err);
  }
  check(forced, "a teacher forcing invite-staff is refused");

  check(
    !teacher.names.has("create-extension"),
    "a teacher is not offered extensions",
  );
  let forcedExtension: string | null = null;
  try {
    const r = await tool(teacherToken, "create-extension", {
      name: "Sneaky",
      description: "x",
      content: "<div></div>",
    });
    forcedExtension = r.isError ? r.text : null;
  } catch (err) {
    forcedExtension = err instanceof Error ? err.message : String(err);
  }
  check(forcedExtension, "a teacher forcing create-extension is refused");

  const learnerCookie = await joinAs(learnerEmail);
  const learnerToken = await connect(learnerCookie, "Claude");
  const learnerRefusal = await refusedAtConnect(learnerToken);
  check(
    learnerRefusal?.includes("Learners use the school app"),
    "a learner's chat app is refused at connect, with a reason",
  );

  // Someone in no school: an account no school has taken in. Invite-only,
  // the only such accounts are old ones, so one is made the way they were.
  const strangerEmail = `stranger.${run}@gmail-sim.test`;
  const register = await fetch(`${BASE}/_agent-native/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: strangerEmail, password: TEST_PASSWORD }),
  });
  if (register.status === 403) {
    const made = spawnSync(
      "npx",
      ["tsx", "test/sim/legacy-account.ts", strangerEmail],
      { encoding: "utf8", env: { ...process.env, DATABASE_URL } },
    );
    if (made.status !== 0) throw new Error(`legacy account: ${made.stderr}`);
  }
  const strangerToken = await connect(await signUp(strangerEmail), "Claude");
  check(
    (await refusedAtConnect(strangerToken))?.includes("not part of a school"),
    "an account in no school is refused at connect, with a reason",
  );

  // The school's allowance for requests handed to its assistant from AI
  // apps. At 0, ask_app answers with the limit and runs no model.
  const capped = await tool(headToken, "update-school-config", {
    agent: { chatAppDailyLimit: 0 },
  });
  check(!capped.isError, "the head sets the school's AI-app allowance");
  const asked = await tool(headToken, "ask_app", { message: "Hello" });
  check(
    asked.text.includes("requests to its assistant from AI apps"),
    "past the allowance, ask_app says so instead of running the model",
  );
  await tool(headToken, "update-school-config", {
    agent: { chatAppDailyLimit: 20 },
  });
  const cap = spawnSync(
    "npx",
    [
      "tsx",
      "test/sim/chat-app-cap.ts",
      provisionedId ?? "",
      headEmail,
      "Africa/Lagos",
    ],
    { encoding: "utf8", env: { ...process.env, DATABASE_URL } },
  );
  if (cap.status !== 0) throw new Error(`cap check: ${cap.stderr}`);
  const decided = JSON.parse(cap.stdout.trim().split("\n").pop() ?? "{}");
  check(
    decided.twentieth === "ran" && decided.afterTwentieth === 20,
    "the 20th request of the day runs and is counted",
  );
  check(
    decided.twentyFirst?.reply?.includes("today's 20 requests"),
    "the 21st gets the calm limit reply",
  );
  check(decided.nextDay === "ran", "the next school day starts from nothing");
  return { schoolId: provisionedId ?? "", headEmail };
}

/**
 * The school's daily total for the assistant, every way in counted together,
 * asked of the real gate with no model run (test/sim/school-total.ts).
 */
function schoolTotal(
  a: { schoolId: string; headEmail: string },
  b: { schoolId: string; headEmail: string },
) {
  console.log("\nThe school's daily total for the assistant");
  const run = spawnSync(
    "npx",
    [
      "tsx",
      "test/sim/school-total.ts",
      a.schoolId,
      a.headEmail,
      b.schoolId,
      b.headEmail,
      "Africa/Lagos",
    ],
    { encoding: "utf8", env: { ...process.env, DATABASE_URL } },
  );
  if (run.status !== 0) throw new Error(`school total: ${run.stderr}`);
  const r = JSON.parse(run.stdout.trim().split("\n").pop() ?? "{}");
  check(
    r.last === "ran",
    `the message that brings the school to its ${r.limit} still runs`,
  );
  check(
    r.over?.reply?.includes(`today's ${r.limit} messages`),
    "the next is refused with the school's total, and no model runs",
  );
  check(r.otherSchool === "ran", "another school is not affected");
  check(r.nextDay === "ran", "a new school day starts from nothing");
}

async function main() {
  const first = await codingClient();
  const second = await chatClientDirect();
  schoolTotal(second, first);
  if (process.env.JOURNEY_CHAT === "1") await chatClient();
  console.log("\nAll checks passed.");
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
