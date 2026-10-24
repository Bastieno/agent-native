/**
 * Checks for the tools each role's assistant is given. Run: npx tsx test/role-tools.check.ts
 */
import assert from "node:assert/strict";
import { roleMayUseTool } from "../server/lib/role-tools.js";
import type { SchoolRole } from "../server/lib/action-policy.js";

function expectTools(role: SchoolRole, allowed: string[], refused: string[]) {
  for (const name of allowed)
    assert.equal(
      roleMayUseTool(role, name),
      true,
      `${role}: ${name} should be allowed`,
    );
  for (const name of refused)
    assert.equal(
      roleMayUseTool(role, name),
      false,
      `${role}: ${name} should be refused`,
    );
}

// Everyone: their own role's school actions, their screen, finding a tool.
const screen = [
  "refresh-screen",
  "set-url-path",
  "set-search-params",
  "tool-search",
  "navigate",
  "view-screen",
];
// Nobody: things the school does not use, and anything not yet listed.
const nobody = [
  "set-computer-use",
  "set-browser-control",
  "connect-builder",
  "docs-search",
  "manage-agent-engine",
  "manage-agent-loop-settings",
  "call-agent",
  "chat-history",
  "db-schema",
  "db-query",
  "some-new-framework-tool",
];

// A learner: tutoring only. No rewriting their tutor, no model runs of their own.
expectTools(
  "student",
  [
    ...screen,
    "get-my-assessment",
    "save-submission-draft",
    "submit-work",
    "get-my-week",
  ],
  [
    ...nobody,
    "save-memory",
    "delete-memory",
    "resources",
    "agent-teams",
    "manage-automations",
    "manage-jobs",
    "web-request",
    "create-extension",
    "mcp__someone__tool",
    "grade-submission",
    "update-school-config",
  ],
);

// A teacher: their school work plus the framework tools staff use.
const staffExtras = [
  "save-memory",
  "delete-memory",
  "resources",
  "agent-teams",
  "manage-automations",
  "manage-jobs",
  "manage-notifications",
  "manage-progress",
  "web-request",
  "get-framework-context",
  "mcp__their-server__tool",
];
expectTools(
  "teacher",
  [...screen, ...staffExtras, "grade-submission", "create-activity"],
  [...nobody, "create-extension", "update-school-config", "invite-staff"],
);

// An admin: the school's settings, staff, and its extensions.
expectTools(
  "school_admin",
  [
    ...screen,
    ...staffExtras,
    "update-school-config",
    "invite-staff",
    "create-extension",
    "list-extensions",
  ],
  nobody,
);

console.log("role tools: ok");
