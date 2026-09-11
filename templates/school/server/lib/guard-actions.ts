import { currentAccess } from "@agent-native/core/sharing";
import { getSchoolRole } from "./student-access.js";
import {
  actorForEmail,
  canAccessClass,
  classIdForAssessment,
  classIdForLesson,
  classIdForSubmission,
  classIdForVariant,
} from "./class-access.js";
import {
  findUnclassifiedActions,
  rolesFor,
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
        return entry.run(args, ctx);
      },
    };
  }
  return guarded as T;
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
  "close-assessment": "assessment",
  "update-lesson-note": "lesson",
  "finalize-lesson-note": "lesson",
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
      throw new Error(
        `Not permitted: you do not have access to that class (action "${actionName}").`,
      );
    }
  }
}

async function assertCallerMayRun(actionName: string): Promise<void> {
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
    throw new Error(
      "You are not a member of this school yet, so this action is not available.",
    );
  }
  if (!allowed.includes(role)) {
    throw new Error(
      `Not permitted: "${actionName}" is not available to your role (${role}).`,
    );
  }
}
