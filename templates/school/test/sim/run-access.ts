/**
 * Who lands where on sign-in, with two schools in one deployment.
 *
 *   pnpm journey:access
 *
 * Against the journeys server (`pnpm dev:journeys`, port 8132). Each person's
 * sign-in is decided by their own school — the schools they belong to and the
 * ones that invited them — never by whether some other school exists.
 *
 * Runs either way sign-up is configured. With open sign-up
 * (`AUTO_CREATE_DEFAULT_ORG`, the local default) a newcomer owns a workspace
 * of their own and may set it up; invite-only (start the server with
 * `AUTO_CREATE_DEFAULT_ORG=` blank) they are not part of any school. The run
 * says which it found and checks that case.
 *
 * Schools are provisioned the way an operator does it, against the server's
 * own database (`JOURNEY_DATABASE_URL`, default data/journeys.db). Email is
 * switched off for that step, so nothing is sent. No model is called.
 */
import { spawnSync } from "node:child_process";
import { ActionError, Client, TEST_PASSWORD, type Persona } from "./client.js";

const DATABASE_URL =
  process.env.JOURNEY_DATABASE_URL ?? "file:./data/journeys.db";
const client = new Client();
const run = Date.now().toString(36);
let failures = 0;

function check(ok: unknown, what: string): void {
  if (ok) {
    console.log(`  ok  ${what}`);
  } else {
    failures++;
    console.log(`  FAILED  ${what}`);
  }
}

function provision(label: string): {
  orgId: string;
  name: string;
  head: string;
} {
  const name = `Access School ${label} ${run}`;
  const head = `head.${label.toLowerCase()}.${run}@access-sim.test`;
  const result = spawnSync(
    "npx",
    ["tsx", "ops/provision-school.ts", "--name", name, "--headEmail", head],
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
  const orgId = /\(([^)]+)\) with /.exec(result.stdout)?.[1];
  if (result.status !== 0 || !orgId) {
    throw new Error(`provisioning ${name} failed: ${result.stderr}`);
  }
  return { orgId, name, head };
}

/** Whether this server lets the address sign up (invite-only refuses with 403). */
async function signUpAllowed(address: string): Promise<boolean> {
  const res = await fetch(`${client.baseUrl}/_agent-native/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: address, password: TEST_PASSWORD }),
  });
  return res.status !== 403;
}

/**
 * An account that belongs to no school. Invite-only, the only such accounts
 * are ones made before the rule, so it is made the way they were.
 */
async function accountWithoutSchool(
  address: string,
  label: string,
  role: Persona["role"],
): Promise<Persona> {
  if (await signUpAllowed(address)) return client.signUp(address, label, role);
  const made = spawnSync(
    "npx",
    ["tsx", "test/sim/legacy-account.ts", address],
    {
      encoding: "utf8",
      env: { ...process.env, DATABASE_URL },
    },
  );
  if (made.status !== 0) throw new Error(`legacy account: ${made.stderr}`);
  return client.signIn(address, label, role);
}

async function session(p: Persona): Promise<any> {
  const res = await fetch(`${client.baseUrl}/api/school/session`, {
    headers: { cookie: p.cookie },
  });
  return res.json();
}

/** The person's error when an action refuses them, or null when it ran. */
async function refusal(
  p: Persona,
  action: string,
  args: Record<string, unknown>,
): Promise<string | null> {
  try {
    await client.as(p, action, args);
    return null;
  } catch (err) {
    if (err instanceof ActionError) return err.message;
    throw err;
  }
}

function email(who: string): string {
  return `${who}.${run}@access-sim.test`;
}

async function main() {
  if (!(await client.healthy())) {
    console.error("The dev server is not answering on", client.baseUrl);
    process.exit(1);
  }
  console.log(`\n=== Sign-in access, two schools — run ${run} ===`);

  console.log("\nTwo provisioned schools, set up one after the other");
  const a = provision("A");
  const headA = await client.signUp(a.head, "Head A", "admin");
  let s = await session(headA);
  check(
    s.schoolRole === "school_admin" && s.schoolId === a.orgId,
    `head A lands as admin of school A (role ${s.schoolRole})`,
  );
  await client.as(headA, "setup-school", { name: a.name, type: "secondary" });

  const b = provision("B");
  const headB = await client.signUp(b.head, "Head B", "admin");
  s = await session(headB);
  check(
    s.schoolRole === "school_admin" && s.schoolId === b.orgId,
    `head B lands as admin of school B, though A is already set up (role ${s.schoolRole})`,
  );
  await client.as(headB, "setup-school", { name: b.name, type: "secondary" });

  console.log("\nSomeone invited by no school");
  const openSignup = await signUpAllowed(email("stranger"));
  if (!openSignup) {
    check(true, "invite-only: they cannot even sign up");
  }
  const stranger = await accountWithoutSchool(
    email("stranger"),
    "Stranger",
    "admin",
  );
  s = await session(stranger);
  console.log(
    `  (sign-up here is ${openSignup ? "open: newcomers own a workspace" : "invite-only"})`,
  );
  check(
    !s.schoolRole && s.schoolId !== a.orgId && s.schoolId !== b.orgId,
    "a stranger is not placed in either school",
  );
  if (openSignup) {
    check(
      s.schoolName !== a.name && s.schoolName !== b.name,
      "what they may set up is their own workspace, not school A or B",
    );
    const own = await client.as(stranger, "setup-school", {
      name: `Own School ${run}`,
      type: "secondary",
    });
    check(
      own.schoolId !== a.orgId && own.schoolId !== b.orgId,
      "setting it up makes a school of their own",
    );
  } else {
    check(
      s.access === "none" && s.accessDenied === true,
      `they are told they are not part of a school (access ${s.access})`,
    );
    check(
      await refusal(stranger, "setup-school", {
        name: "Not Mine",
        type: "secondary",
      }),
      "and they cannot set a school up",
    );
  }

  console.log("\nA teacher invited by school B");
  const teacherEmail = email("teacher.b");
  await client.as(headB, "invite-staff", {
    email: teacherEmail,
    name: "Mr Bello",
    schoolRole: "teacher",
  });
  const teacher = await client.signUp(teacherEmail, "Teacher B", "teacher");
  s = await session(teacher);
  check(
    s.schoolRole === "teacher" && s.schoolId === b.orgId,
    `they land as a teacher of school B (role ${s.schoolRole})`,
  );

  console.log("\nAn account made before its invitation");
  const lateEmail = email("late.a");
  const late = await accountWithoutSchool(lateEmail, "Late", "student");
  s = await session(late);
  check(!s.schoolRole, "before the invitation they have no school role");
  await client.as(headA, "invite-student", {
    email: lateEmail,
    name: "Ada Late",
  });
  s = await session(late);
  check(
    s.schoolRole === "student" && s.schoolId === a.orgId,
    `school A's invitation activates them on their next visit (role ${s.schoolRole})`,
  );

  console.log("\nSomeone invited by both schools");
  const bothEmail = email("both");
  await client.as(headA, "invite-staff", {
    email: bothEmail,
    name: "Mrs Both",
    schoolRole: "teacher",
  });
  await client.as(headB, "invite-staff", {
    email: bothEmail,
    name: "Mrs Both",
    schoolRole: "teacher",
  });
  const both = await client.signUp(bothEmail, "Both", "teacher");
  s = await session(both);
  const joined = s.schoolId;
  const other = joined === a.orgId ? headB : headA;
  check(
    s.schoolRole === "teacher" && (joined === a.orgId || joined === b.orgId),
    `they join one of the two schools (${joined === a.orgId ? "A" : joined === b.orgId ? "B" : joined})`,
  );
  const otherStaff = await client.as(other, "list-staff", {});
  check(
    otherStaff.pending.some((p: { email: string }) => p.email === bothEmail),
    "the other school's invitation is still pending",
  );

  console.log("\nA student whose invitation school A cancelled");
  const cancelledEmail = email("cancelled.a");
  await client.as(headA, "invite-student", {
    email: cancelledEmail,
    name: "Chidi Cancelled",
  });
  await client.as(headA, "cancel-student-invite", { email: cancelledEmail });
  if (openSignup) {
    const cancelled = await client.signUp(
      cancelledEmail,
      "Cancelled",
      "student",
    );
    s = await session(cancelled);
    check(
      !s.schoolRole && s.schoolId !== a.orgId && s.schoolName !== a.name,
      `signing up does not put them in school A (access ${s.access})`,
    );
  } else {
    check(
      !(await signUpAllowed(cancelledEmail)),
      "invite-only: they cannot sign up with the cancelled invitation",
    );
  }

  console.log("\nA member of a set-up school who has no role in it");
  const removedEmail = email("removed.b");
  await client.as(headB, "invite-staff", {
    email: removedEmail,
    name: "Mr Removed",
    schoolRole: "teacher",
  });
  const removed = await client.signUp(removedEmail, "Removed", "teacher");
  await client.as(headB, "remove-staff", { userId: removed.userId });
  s = await session(removed);
  check(
    !s.schoolRole && s.access === "waiting" && s.schoolName === b.name,
    `they wait in school B, named (access ${s.access}, ${s.schoolName})`,
  );
  check(
    await refusal(removed, "setup-school", { name: b.name, type: "x" }),
    "and they cannot set school B up again",
  );

  console.log("\nA member of a school nobody has set up yet");
  const c = provision("C");
  const headC = await client.signUp(c.head, "Head C", "admin");
  const memberEmail = email("member.c");
  await client.as(headC, "invite-staff", {
    email: memberEmail,
    name: "Mrs Member",
    schoolRole: "teacher",
  });
  const member = await client.signUp(memberEmail, "Member C", "teacher");
  await client.as(headC, "remove-staff", { userId: member.userId });
  s = await session(member);
  check(
    !s.schoolRole && s.access === "waiting" && s.schoolName === c.name,
    `they wait, not set the school up (access ${s.access}, ${s.schoolName})`,
  );
  s = await session(headC);
  check(
    s.schoolRole === "school_admin" && s.schoolId === c.orgId,
    "the head is still the one who sets it up",
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
