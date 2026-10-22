/**
 * Sign-up is by invitation, and the assistant is for people with a school.
 *
 *   pnpm journey:invite-only
 *
 * Against a journeys server started invite-only, with `AUTO_CREATE_DEFAULT_ORG`
 * blank (the `school-journeys-invite-only` launch config). It refuses to run
 * against an open-sign-up server, where everything it checks is meant to be
 * allowed.
 *
 * Schools are provisioned the way an operator does it, against the server's
 * own database (`JOURNEY_DATABASE_URL`, default data/journeys.db), with email
 * switched off. No model is called: every assistant run here is one the gate
 * refuses, and a refused run is answered without one.
 */
import { spawnSync } from "node:child_process";
import { Client, TEST_PASSWORD, type Persona } from "./client.js";
import { connect, mcp, tool } from "./mcp-client.js";

const DATABASE_URL =
  process.env.JOURNEY_DATABASE_URL ?? "file:./data/journeys.db";
const client = new Client();
const run = Date.now().toString(36);
let failures = 0;

function check(ok: unknown, what: string, detail?: string): void {
  if (ok) {
    console.log(`  ok  ${what}`);
  } else {
    failures++;
    console.log(`  FAILED  ${what}${detail ? `\n          ${detail}` : ""}`);
  }
}

function email(who: string): string {
  return `${who}.${run}@invite-sim.test`;
}

function tsx(script: string, args: string[]) {
  return spawnSync("npx", ["tsx", script, ...args], {
    encoding: "utf8",
    env: {
      ...process.env,
      DATABASE_URL,
      RESEND_API_KEY: "",
      SENDGRID_API_KEY: "",
    },
  });
}

function provision(label: string): {
  orgId: string;
  name: string;
  head: string;
} {
  const name = `Invite School ${label} ${run}`;
  const head = email(`head.${label.toLowerCase()}`);
  const result = tsx("ops/provision-school.ts", [
    "--name",
    name,
    "--headEmail",
    head,
  ]);
  const orgId = /\(([^)]+)\) with /.exec(result.stdout)?.[1];
  if (result.status !== 0 || !orgId) {
    throw new Error(`provisioning ${name} failed: ${result.stderr}`);
  }
  return { orgId, name, head };
}

/** A raw sign-up attempt: the status and the error the form would show. */
async function register(
  address: string,
): Promise<{ status: number; error: string }> {
  const res = await fetch(`${client.baseUrl}/_agent-native/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: address, password: TEST_PASSWORD }),
  });
  const body = (await res.json().catch(() => ({}))) as { error?: string };
  return { status: res.status, error: body.error ?? "" };
}

async function canSignIn(address: string): Promise<boolean> {
  const res = await fetch(`${client.baseUrl}/_agent-native/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: address, password: TEST_PASSWORD }),
  });
  return res.ok;
}

async function session(p: Persona): Promise<any> {
  const res = await fetch(`${client.baseUrl}/api/school/session`, {
    headers: { cookie: p.cookie },
  });
  return res.json();
}

const NOT_INVITED = /hasn't been invited to a school/;
const NO_SCHOOL = /not part of a school here yet/;

async function main() {
  if (!(await client.healthy())) {
    console.error("The dev server is not answering on", client.baseUrl);
    process.exit(1);
  }
  console.log(`\n=== Invitation-only sign-up — run ${run} ===`);

  console.log("\nSomeone no school has invited");
  const strangerEmail = email("stranger");
  const stranger = await register(strangerEmail);
  if (stranger.status !== 403 && stranger.status < 300) {
    console.error(
      "\nThis server lets anyone sign up. Start it invite-only (the school-journeys-invite-only launch config, AUTO_CREATE_DEFAULT_ORG blank) and run again.",
    );
    process.exit(1);
  }
  check(
    stranger.status === 403 && NOT_INVITED.test(stranger.error),
    "they are refused, and told to ask their school for an invitation",
    `status ${stranger.status}: ${stranger.error}`,
  );
  check(!(await canSignIn(strangerEmail)), "and no account was made for them");

  console.log("\nA provisioned head");
  const a = provision("A");
  const head = await client.signUp(a.head, "Head A", "admin");
  let s = await session(head);
  check(
    s.schoolRole === "school_admin" && s.schoolId === a.orgId,
    `they sign up and land as the school's admin (role ${s.schoolRole})`,
  );
  const headAccess = await client.as(head, "get-my-agent-access");
  check(
    headAccess?.available === true,
    "before the school is set up, they already have the assistant",
    JSON.stringify(headAccess),
  );
  await client.as(head, "setup-school", { name: a.name, type: "secondary" });

  console.log("\nAn invited teacher and an invited student");
  const teacherEmail = email("teacher");
  await client.as(head, "invite-staff", {
    email: teacherEmail,
    name: "Mrs Okafor",
    schoolRole: "teacher",
  });
  const teacher = await client.signUp(teacherEmail, "Teacher", "teacher");
  s = await session(teacher);
  check(
    s.schoolRole === "teacher" && s.schoolId === a.orgId,
    `the teacher signs up and lands in the school (role ${s.schoolRole})`,
  );
  const studentEmail = email("student");
  await client.as(head, "invite-student", {
    // Invited with capitals: an address is the same address whatever its case.
    email: studentEmail.replace(/^s/, "S"),
    name: "Tolu Ade",
  });
  const student = await client.signUp(studentEmail, "Student", "student");
  s = await session(student);
  check(
    s.schoolRole === "student" && s.schoolId === a.orgId,
    `the student signs up, at the address in any case, and lands in the school (role ${s.schoolRole})`,
  );

  console.log("\nAn invitation that was cancelled");
  const cancelledEmail = email("cancelled");
  await client.as(head, "invite-student", {
    email: cancelledEmail,
    name: "Chidi Cancelled",
  });
  await client.as(head, "cancel-student-invite", { email: cancelledEmail });
  const cancelled = await register(cancelledEmail);
  check(
    cancelled.status === 403 && NOT_INVITED.test(cancelled.error),
    "signing up with it is refused",
    `status ${cancelled.status}: ${cancelled.error}`,
  );

  console.log("\nSomeone invited at one address who signs up with another");
  const workEmail = email("work");
  await client.as(head, "invite-staff", {
    email: workEmail,
    name: "Mr Eze",
    schoolRole: "teacher",
  });
  const personal = await register(email("personal"));
  check(
    personal.status === 403 && /exact address/.test(personal.error),
    "the other address is refused, and the message says to use the invited one",
    `status ${personal.status}: ${personal.error}`,
  );

  console.log("\nAn account made before sign-up was invitation-only");
  const legacyEmail = email("legacy");
  const made = tsx("test/sim/legacy-account.ts", [legacyEmail]);
  if (made.status !== 0) {
    throw new Error(`making the old account failed: ${made.stderr}`);
  }
  const legacy = await client.signIn(legacyEmail, "Legacy", "student");
  s = await session(legacy);
  check(
    !s.schoolRole && s.access === "none",
    `it still signs in, and is told it is not part of a school (access ${s.access})`,
  );
  const chat = await client.chat(legacy, "Write me an essay on anything.");
  check(
    !chat.model && NO_SCHOOL.test(chat.reply),
    "its chat message is answered with a refusal, and no model runs",
    `status ${chat.status}, model ${chat.model}, reply "${chat.reply}"`,
  );
  const token = await connect(legacy.cookie, "Claude");
  await mcp(token, "initialize", {
    protocolVersion: "2025-06-18",
    capabilities: {},
    clientInfo: { name: "journey", version: "1" },
  });
  const viaMcp = await tool(token, "ask_app", { message: "Hello?" });
  check(
    NO_SCHOOL.test(viaMcp.text),
    "asking through its own AI app (MCP ask_app) gets the same refusal, and no model runs",
    viaMcp.text.slice(0, 200),
  );

  console.log(
    failures ? `\n${failures} check(s) failed.` : "\nAll checks passed.",
  );
  process.exit(failures ? 1 : 0);
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
