import { currentAccess } from "@agent-native/core/sharing";
import { sql } from "drizzle-orm";
import { getDb } from "../db/index.js";
import { runWithRequestContext } from "@agent-native/core/server";
import { getSchoolRole } from "./student-access.js";
import {
  actorForEmail,
  canAccessClass,
  classIdForAssessment,
  classIdForLesson,
  classIdForSubmission,
  classIdForVariant,
  studentRecordIdForUser,
} from "./class-access.js";
import { roleWord } from "./lesson-attribution.js";
import {
  findUnclassifiedActions,
  rolesFor,
  denialReasonFor,
  BOOTSTRAP,
  type SchoolRole,
} from "./action-policy.js";

/**
 * Wrap every template action with a role check.
 *
 * The same action map backs both the agent's tools and the auto-mounted HTTP
 * endpoints at /_agent-native/actions/:name, so wrapping here closes both at
 * once: a student cannot grade work by asking the agent, nor by POSTing to the
 * endpoint from the browser console.
 *
 * This is authorisation only — it answers "may this role call this action at
 * all". Row-level ownership (may THIS teacher touch THAT class) is enforced
 * inside individual actions.
 */
export function guardActions<T extends Record<string, any>>(actions: T): T {
  const unclassified = findUnclassifiedActions(Object.keys(actions));
  if (unclassified.length > 0) {
    // Loud in dev, and these still deny at call time in production.
    console.error(
      `[school] actions with no policy entry (they will be denied): ${unclassified.join(", ")}. Add them to server/lib/action-policy.ts.`,
    );
  }

  const guarded: Record<string, any> = {};
  for (const [name, entry] of Object.entries(actions)) {
    if (!entry || typeof entry.run !== "function") {
      guarded[name] = entry;
      continue;
    }
    guarded[name] = {
      ...entry,
      run: async (args: any, ctx: any) => {
        await assertCallerMayRun(name);
        await assertCallerMayTouch(name, args);

        // External MCP clients arrive with an identity but no org: the
        // framework derives the org from a token's domain claim, and a school
        // org has no email domain. A user belongs to exactly one school, so
        // resolve it from their profile and run the action in that context —
        // otherwise every action fails with "No school context".
        const { userEmail, orgId } = currentAccess();
        if (!orgId && userEmail) {
          const actor = await actorForEmail(userEmail);
          // Someone setting a school up for the first time has no profile to
          // resolve, so fall back to the organisation they already belong to.
          const resolved =
            actor?.schoolId ?? (await frameworkOrgForEmail(userEmail));
          if (resolved) {
            return runWithRequestContext({ userEmail, orgId: resolved }, () =>
              entry.run(args, ctx),
            );
          }
        }
        return entry.run(args, ctx);
      },
    };
  }
  return guarded as T;
}

/**
 * The organisation a person belongs to according to the framework, used only
 * when they have no school profile to resolve one from. Their active choice
 * wins where they have made one; otherwise the single org they are a member
 * of. Ambiguity is left unresolved rather than guessed at.
 */
async function frameworkOrgForEmail(email: string): Promise<string | null> {
  const db = getDb();
  try {
    const active = await db.get<{ value: string }>(
      sql`SELECT value FROM settings WHERE key = ${`u:${email}:active-org-id`} LIMIT 1`,
    );
    if (active?.value) {
      const parsed = JSON.parse(active.value);
      if (parsed?.orgId) return parsed.orgId as string;
    }
  } catch {
    // Fall through to membership.
  }
  try {
    const rows = await db.all<{ org_id: string }>(
      sql`SELECT org_id FROM org_members WHERE email = ${email}`,
    );
    if (rows?.length === 1) return rows[0].org_id;
  } catch {
    // The framework tables are not always present in every deployment.
  }
  return null;
}

/**
 * What an action's bare `id` argument refers to. Actions that take `--id` are
 * ambiguous on their own, so the kind is declared here; anything not listed is
 * checked only through its explicit classId/assessmentId/etc. arguments.
 */
const ID_KIND: Record<string, "class" | "assessment" | "lesson" | "variant"> = {
  "update-class": "class",
  "update-assessment": "assessment",
  "publish-assessment": "assessment",
  "unshare-assessment": "assessment",
  "delete-activity": "assessment",
  "close-assessment": "assessment",
  "update-lesson-note": "lesson",
  "finalize-lesson-note": "lesson",
  "reopen-lesson-note": "lesson",
  "get-lesson-note": "lesson",
  "update-variant": "variant",
  "delete-variant": "variant",
};

/**
 * Row-level scope check driven by the arguments themselves: whatever the
 * action is, if it names a class, assessment, submission, variant or lesson,
 * the caller must have access to it. Applying this centrally means a new
 * action is covered the day it is written.
 */
async function assertCallerMayTouch(
  actionName: string,
  args: any,
): Promise<void> {
  if (!args || typeof args !== "object") return;

  const { userEmail } = currentAccess();
  if (!userEmail) return; // already rejected by assertCallerMayRun

  const actor = await actorForEmail(userEmail);
  if (!actor) return; // role check already threw for non-members

  const classIds: Array<string | null> = [];

  if (typeof args.classId === "string") classIds.push(args.classId);
  if (typeof args.assessmentId === "string") {
    classIds.push(await classIdForAssessment(args.assessmentId));
  }
  if (typeof args.submissionId === "string") {
    classIds.push(await classIdForSubmission(args.submissionId));
  }
  if (typeof args.variantId === "string") {
    classIds.push(await classIdForVariant(args.variantId));
  }
  if (typeof args.lessonId === "string") {
    classIds.push(await classIdForLesson(args.lessonId));
  }

  // A student may only ever name themselves. Without this, "my" actions that
  // take a studentId (get-my-grades, get-my-progress, get-my-assessments) hand
  // one student another student's results.
  if (actor.schoolRole === "student") {
    const ownRecordId = await studentRecordIdForUser(actor.userId);
    if (typeof args.studentId === "string" && args.studentId !== ownRecordId) {
      throw new Error("Not permitted: you can only access your own record.");
    }
    if (
      typeof args.studentUserId === "string" &&
      args.studentUserId !== actor.userId
    ) {
      throw new Error("Not permitted: you can only access your own record.");
    }
  }

  const idKind = ID_KIND[actionName];
  if (idKind && typeof args.id === "string") {
    if (idKind === "class") classIds.push(args.id);
    if (idKind === "assessment")
      classIds.push(await classIdForAssessment(args.id));
    if (idKind === "lesson") classIds.push(await classIdForLesson(args.id));
    if (idKind === "variant") classIds.push(await classIdForVariant(args.id));
  }

  for (const classId of classIds) {
    // A null means the referenced row does not exist; let the action itself
    // produce its own "not found" error rather than masking it here.
    if (!classId) continue;
    if (!(await canAccessClass(actor, classId))) {
      console.warn(
        `[guard] ${actor.schoolRole} attempted "${actionName}" on a class they do not have`,
      );
      throw new Error(
        // The action's name is ours, not the reader's. A teacher told
        // 'you do not have access to that class (action "get-gradebook")'
        // is being handed the plumbing; the guide asks every refusal to
        // name what was refused instead. The name stays in the log line
        // below, where it is useful.
        "Not permitted: that class is not one of yours.",
      );
    }
  }
}

async function assertCallerMayRun(actionName: string): Promise<void> {
  // A framework action this school app deliberately does not use: say so,
  // rather than reporting it as an oversight.
  const denial = denialReasonFor(actionName);
  if (denial) {
    throw new Error(`Action "${actionName}" is not available. ${denial}`);
  }

  const allowed = rolesFor(actionName);

  if (allowed === null) {
    throw new Error(
      `Action "${actionName}" has no access policy and cannot be called.`,
    );
  }
  if (allowed.length === 0) {
    throw new Error(
      `Action "${actionName}" is operator-only and can only be run from the command line.`,
    );
  }

  const { userEmail } = currentAccess();

  // Every caller of this map is a request: the agent chat, the auto-mounted
  // HTTP routes, or an MCP client (which runs actions under the token
  // holder's identity). The CLI loads action files directly and never reaches
  // this guard, so "no identity" here means an unauthenticated caller.
  if (!userEmail) {
    throw new Error(
      `Not permitted: "${actionName}" requires a signed-in school member.`,
    );
  }

  const role = (await getSchoolRole(userEmail)) as SchoolRole | null;
  if (!role) {
    // Someone has to be able to create the first school. The action itself
    // refuses if the organisation already has an admin, so this opens the
    // door for a new school without opening one into an existing school.
    if (BOOTSTRAP.has(actionName)) return;
    throw new Error(
      "You are not a member of this school yet, so this action is not available.",
    );
  }
  if (!allowed.includes(role)) {
    // Same again: what was refused, not which function refused it.
    console.warn(
      `[guard] ${role} attempted "${actionName}", which is not available to that role`,
    );
    throw new Error(
      `Not permitted: that is not something a ${roleWord(role)} can do.`,
    );
  }
}
