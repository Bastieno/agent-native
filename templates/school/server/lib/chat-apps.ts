import { currentAccess } from "@agent-native/core/sharing";
import { actorForEmail } from "./class-access.js";
import { roleMayUseTool } from "./role-tools.js";
import { isOrgMember } from "./signup-access.js";
import type { SchoolRole } from "./action-policy.js";
import type { GuidanceTopic } from "./agents-guide.js";

/**
 * What a head or teacher sees when they connect their own Claude or ChatGPT.
 *
 * A chat app used to get four generic tools, so everything went through
 * `ask_app`, which runs this school's own assistant on the deployment's key:
 * about 92k tokens of prompt per model step, $0.38 for a one-line setup
 * request on the school's model (measured 2026-10-22). Calling the school's
 * actions directly lets the person's own model do the thinking; the server
 * only runs the action, and the role guard checks every call as before.
 *
 * Each role gets a short list rather than everything it may run. A model
 * chooses better among 30 tools than among 170 near-identical ones, and the
 * list stays within a size budget the journey test checks. The rules the
 * school's assistant follows come from `get-school-guidance`, read from the
 * app's own AGENTS.md, and every listed tool's description points to it.
 */

const SETUP = [
  "check-school-setup",
  "get-school-config",
  "update-school-config",
  "manage-grade-levels",
  "list-academic-years",
  "create-academic-year",
  "list-terms",
  "create-term",
  "list-subjects",
  "create-subject",
  "update-subject",
  "manage-activity-blueprints",
  "draft-school-guide",
  "update-school-resource",
];
const STAFF_ADMIN = [
  "list-staff",
  "invite-staff",
  "cancel-staff-invite",
  "update-staff-role",
];
const PEOPLE_AND_CLASSES = [
  "list-students",
  "create-student",
  "invite-student",
  "list-classes",
  "create-class",
  "add-teacher-to-class",
  "bulk-enroll-students",
  "list-arms",
  "create-arm",
  "set-learner-arm",
];
const CURRICULUM = [
  "list-curriculum-drafts",
  "start-curriculum-draft",
  "get-curriculum-draft",
  "update-curriculum-draft",
  "commit-curriculum-draft",
  "discard-curriculum-draft",
  "generate-scheme-of-work",
];
const TIMETABLE = [
  "get-timetable",
  "set-lesson-counts",
  "get-timetable-coverage",
  "generate-timetable",
  "get-timetable-proposal",
  "accept-timetable-proposal",
  "discard-timetable-proposal",
];
const TEACHING = [
  "get-my-week",
  "get-timetable",
  "list-classes",
  "get-class",
  "list-class-students",
  "get-subject-curriculum",
  "plan-lesson-notes",
  "list-lesson-notes",
  "get-lesson-note",
  "create-lesson-note",
  "update-lesson-note",
  "finalize-lesson-note",
  "reopen-lesson-note",
  "create-activity",
  "list-assessments",
  "get-assessment",
  "update-assessment",
  "publish-assessment",
  "close-assessment",
  "get-print-material",
  "get-marking-queue",
  "list-submissions",
  "get-submission",
  "grade-submission",
  "record-answer-mark",
  "compile-submission-grade",
  "request-resubmission",
  "get-gradebook",
  "publish-grades",
  "get-class-performance",
  "identify-struggling-students",
  "create-announcement",
];

/** Everyone who may connect also gets these. */
const ALWAYS = ["get-school-guidance", "ask_app"];

/** A head whose school is provisioned but not yet set up. */
const BEFORE_SETUP = new Set([
  "check-school-setup",
  "setup-school",
  "get-school-guidance",
  "ask_app",
]);

export const CHAT_APP_EXPOSURE: Record<
  Exclude<SchoolRole, "student">,
  Set<string>
> = {
  school_admin: new Set([
    ...SETUP,
    ...STAFF_ADMIN,
    ...PEOPLE_AND_CLASSES,
    ...CURRICULUM,
    ...TIMETABLE,
    "get-school-stats",
    "get-lesson-note-coverage",
    ...ALWAYS,
  ]),
  subject_coordinator: new Set([
    ...TEACHING,
    ...CURRICULUM,
    "get-curriculum-coverage",
    "get-lesson-note-coverage",
    ...ALWAYS,
  ]),
  teacher: new Set([...TEACHING, ...ALWAYS]),
};

/** Every action any role sees from a chat app: these are marked for it. */
const EXPOSED = new Set<string>(
  [...Object.values(CHAT_APP_EXPOSURE), BEFORE_SETUP].flatMap((s) => [...s]),
);

/** The guide topic each kind of action belongs to. */
const TOPIC_OF: Array<[string[], GuidanceTopic]> = [
  [["setup-school", ...SETUP], "setup"],
  [STAFF_ADMIN, "staff"],
  [PEOPLE_AND_CLASSES, "setup"],
  [CURRICULUM, "curriculum"],
  [TIMETABLE, "timetable"],
  [
    [
      "plan-lesson-notes",
      "list-lesson-notes",
      "get-lesson-note",
      "create-lesson-note",
      "update-lesson-note",
      "finalize-lesson-note",
      "reopen-lesson-note",
      "get-lesson-note-coverage",
      "get-subject-curriculum",
    ],
    "lesson-notes",
  ],
  [
    [
      "create-activity",
      "list-assessments",
      "get-assessment",
      "update-assessment",
      "publish-assessment",
      "close-assessment",
      "get-print-material",
    ],
    "activities",
  ],
  [
    [
      "get-marking-queue",
      "list-submissions",
      "get-submission",
      "grade-submission",
      "record-answer-mark",
      "compile-submission-grade",
      "request-resubmission",
      "get-gradebook",
      "publish-grades",
    ],
    "marking",
  ],
];

/** Steps a host should ask the person about before running. */
const CONSEQUENTIAL = new Set([
  "invite-staff",
  "invite-student",
  "update-staff-role",
  "discard-curriculum-draft",
  "commit-curriculum-draft",
  "accept-timetable-proposal",
  "discard-timetable-proposal",
  "publish-assessment",
  "close-assessment",
  "publish-grades",
  "finalize-lesson-note",
]);

function topicFor(name: string): GuidanceTopic | null {
  for (const [names, topic] of TOPIC_OF) if (names.includes(name)) return topic;
  return null;
}

/**
 * Mark the actions chat apps may see, and tell the host's model where the
 * school's rules for each are. Everything else about an action is unchanged:
 * the same entry backs the in-app assistant and the HTTP route.
 */
export function withChatAppSurface<T extends Record<string, any>>(
  actions: T,
): T {
  const out: Record<string, any> = {};
  for (const [name, entry] of Object.entries(actions)) {
    if (!EXPOSED.has(name) || !entry?.tool) {
      out[name] = entry;
      continue;
    }
    const topic = topicFor(name);
    const hint = [
      topic ? `First call get-school-guidance ("${topic}").` : null,
      "Use the school's words, not tool or field names.",
    ]
      .filter(Boolean)
      .join(" ");
    out[name] = {
      ...entry,
      tool: {
        ...entry.tool,
        description: `${entry.tool.description} ${hint}`,
      },
      mcpApp: { ...(entry.mcpApp ?? {}), compactCatalog: true },
      ...(CONSEQUENTIAL.has(name)
        ? {
            publicAgent: {
              ...(entry.publicAgent ?? {}),
              isConsequential: true,
            },
          }
        : {}),
    };
  }
  return out as T;
}

type Standing =
  | { kind: "role"; role: SchoolRole }
  | { kind: "before-setup" }
  | { kind: "no-school" };

// tools/list asks once per tool, so a caller is looked up once per listing.
// Kept to a second, so a head who has just set the school up is not shown
// the before-setup list on their next request.
const recent = new Map<string, { at: number; standing: Standing }>();

async function standingOf(email: string): Promise<Standing> {
  const hit = recent.get(email);
  if (hit && Date.now() - hit.at < 1_000) return hit.standing;
  const actor = await actorForEmail(email);
  const standing: Standing = actor?.schoolRole
    ? { kind: "role", role: actor.schoolRole as SchoolRole }
    : (await isOrgMember(email))
      ? { kind: "before-setup" }
      : { kind: "no-school" };
  recent.set(email, { at: Date.now(), standing });
  if (recent.size > 500) recent.clear();
  return standing;
}

/**
 * Turn away people who must not use the school from an outside AI app at all:
 * learners, and anyone who belongs to no school. Runs before anything is
 * listed, so they get a reason instead of an empty, broken-looking connector.
 */
export async function refuseChatAppCaller(): Promise<string | null> {
  const { userEmail } = currentAccess();
  if (!userEmail) return null;
  const standing = await standingOf(userEmail);
  if (standing.kind === "no-school") {
    return "This account is not part of a school here yet, so it cannot be used from an AI app. Ask your school to invite you, then sign in at the school's own address.";
  }
  if (standing.kind === "role" && standing.role === "student") {
    return "Learners use the school app itself, not an outside AI app. Sign in to the school app, where your work and your tutor are.";
  }
  return null;
}

/**
 * Which tools this caller's client lists. Actions marked for chat apps follow
 * the caller's role list above; anything else — listed only to coding clients
 * such as Claude Code — follows the same per-role rule as the in-app
 * assistant (role-tools.ts). A head before setup sees only setup. Listing is
 * not permission: the role guard checks every call regardless.
 */
export async function chatAppToolFilter(
  name: string,
  entry: { mcpApp?: { compactCatalog?: boolean } },
): Promise<boolean> {
  const { userEmail } = currentAccess();
  if (!userEmail) return false;
  const standing = await standingOf(userEmail);
  if (standing.kind === "no-school") return false;
  if (standing.kind === "before-setup") return BEFORE_SETUP.has(name);
  const role = standing.role;
  if (role === "student") return false;
  if (name === "ask_app" || name === "ask-agent") return true;
  if (entry?.mcpApp?.compactCatalog === true || EXPOSED.has(name)) {
    return CHAT_APP_EXPOSURE[role].has(name);
  }
  return roleMayUseTool(role, name);
}

/**
 * Sent to the client on connect. Claude reads it; ChatGPT may not, so every
 * listed tool's description carries the essentials too.
 */
export const CHAT_APP_INSTRUCTIONS = `You are helping someone who runs or teaches at a school, through the school's own tools.

How to work:
- Before a kind of task, call get-school-guidance with its topic (setup, staff, curriculum, lesson-notes, activities, marking, timetable) and follow it. Start with topic "talking-to-people".
- Speak in the school's own words. Never name tools, ids, role codes or field names: say "I'll invite Mrs Okoro as a teacher", not the tool you will call. Offer outcomes, not tools: "Shall I draft the lesson notes for JSS1 Basic Science?"
- Setting a school up: show one editable setup sheet drafted from what you can infer (name, year groups, terms, grading, curriculum), and let the head correct it. Do not ask twenty questions. Run check-school-setup to see what is still empty.
- Confirm before anything that cannot be undone, such as inviting someone, publishing marks or closing work, and say what will happen.
- Describe what the data says, not a screen you have not seen.
- For anything the tools here do not cover, use ask_app, which hands the request to the school's own assistant.`;
