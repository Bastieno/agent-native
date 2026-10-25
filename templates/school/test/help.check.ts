/**
 * The Help content: every action a role is offered is claimed by a capability,
 * every action a capability names exists, and the free answer to "how do I…?"
 * finds the right capability without answering questions about the school's
 * own data.
 *
 *   pnpm exec tsx test/help.check.ts
 */
import { CAPABILITIES, capabilitiesFor } from "../shared/capabilities.ts";
import {
  confidentAnswer,
  isHowToQuestion,
  searchCapabilities,
} from "../shared/help-search.ts";
import { CHAT_APP_EXPOSURE } from "../server/lib/chat-apps.ts";
import { rolesFor } from "../server/lib/action-policy.ts";

let failures = 0;
const ok = (cond: unknown, msg: string) => {
  if (cond) console.log(`  ok    ${msg}`);
  else {
    failures++;
    console.log(`  FAIL  ${msg}`);
  }
};

// Ids are unique and every capability has the basics.
const ids = CAPABILITIES.map((c) => c.id);
ok(new Set(ids).size === ids.length, "capability ids are unique");
ok(
  CAPABILITIES.every(
    (c) => c.title && c.summary && c.steps.length > 0 && c.keywords.length > 0,
  ),
  "every capability has a title, summary, steps and keywords",
);

// Drift: an action offered to a role must be claimed by one of its capabilities.
const claimed = (role: "admin" | "teacher" | "student", coordinator = false) =>
  new Set(
    capabilitiesFor(role, { coordinator }).flatMap((c) => c.actions ?? []),
  );
const checks: Array<[string, "admin" | "teacher", boolean, Set<string>]> = [
  ["school_admin", "admin", false, CHAT_APP_EXPOSURE.school_admin],
  [
    "subject_coordinator",
    "teacher",
    true,
    CHAT_APP_EXPOSURE.subject_coordinator,
  ],
  ["teacher", "teacher", false, CHAT_APP_EXPOSURE.teacher],
];
// Plumbing a person never meets by name: reading the school's own settings
// or finding ids. They are covered by the capability they support.
const PLUMBING = new Set(["get-school", "refresh-list"]);
for (const [label, helpRole, coord, offered] of checks) {
  const have = claimed(helpRole, coord);
  const missing = [...offered].filter((a) => !have.has(a) && !PLUMBING.has(a));
  ok(
    missing.length === 0,
    `${label}: every offered action is in a capability${missing.length ? ` (missing: ${missing.join(", ")})` : ""}`,
  );
}
// Every named action exists in the policy.
const named = new Set(CAPABILITIES.flatMap((c) => c.actions ?? []));
const unknown = [...named].filter(
  (a) => a !== "ask_app" && a !== "get-help" && rolesFor(a) === null,
);
ok(
  unknown.length === 0,
  `every action a capability names exists${unknown.length ? ` (unknown: ${unknown.join(", ")})` : ""}`,
);

// Learner pages must not mention what a learner is never told.
const banned = /foundational|developing|advanced|category|variant|difficulty/i;
const leaks = capabilitiesFor("student").filter((c) =>
  banned.test([c.title, c.summary, ...c.steps].join(" ")),
);
ok(
  leaks.length === 0,
  `learner entries mention no groups or versions${leaks.length ? ` (${leaks.map((l) => l.id).join(", ")})` : ""}`,
);

// Free answers: should find the right capability.
const teacherCaps = capabilitiesFor("teacher", { coordinator: true });
const adminCaps = capabilitiesFor("admin");
const studentCaps = capabilitiesFor("student");
const cases: Array<[string, typeof teacherCaps, string | null]> = [
  [
    "How do I make a PDF from a reference document?",
    teacherCaps,
    "teacher-pdf-resource",
  ],
  ["How can I connect my Claude to the school?", teacherCaps, "teacher-ai-app"],
  [
    "How do I make a resource for one learner?",
    teacherCaps,
    "teacher-one-learner",
  ],
  [
    "Where do I see who hasn't handed in a paper?",
    teacherCaps,
    "teacher-analytics",
  ],
  ["How do I invite a teacher?", adminCaps, "admin-staff"],
  ["How do I build the timetable?", adminCaps, "admin-timetable"],
  ["How do I issue a report card?", adminCaps, "admin-report-cards"],
  ["How do I download a handout?", studentCaps, "student-handouts"],
  ["Where can I see my timetable?", studentCaps, "student-week"],
  ["How do I ask my tutor for help?", studentCaps, "student-tutor"],
  // Questions about the school's own data, or requests to do something, must not be answered from Help.
  ["How is Eniola doing in Mathematics?", teacherCaps, null],
  ["How many learners are below the pass mark in JSS1A?", teacherCaps, null],
  ["Make a quiz for JSS1A on indices", teacherCaps, null],
  ["Why did the Week 5 paper score so low?", adminCaps, null],
  ["Can you draft the lesson notes for this week?", teacherCaps, null],
  ["What is 3x + 5 = 20?", studentCaps, null],
  ["hello", teacherCaps, null],
];
for (const [q, caps, expected] of cases) {
  const got = confidentAnswer(q, caps)?.id ?? null;
  ok(
    got === expected,
    `"${q}" -> ${got ?? "model"}${got === expected ? "" : ` (wanted ${expected ?? "model"})`}`,
  );
}
ok(
  isHowToQuestion("how do I print a worksheet?") &&
    !isHowToQuestion("print the worksheet"),
  "how-to detection",
);
ok(
  searchCapabilities("pdf", teacherCaps)[0]?.capability.id ===
    "teacher-pdf-resource",
  "search for 'pdf' ranks the PDF capability first",
);

console.log(failures ? `\n${failures} failed` : "\nall passed");
process.exit(failures ? 1 : 0);
