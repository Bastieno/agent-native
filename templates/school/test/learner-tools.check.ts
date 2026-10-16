/**
 * Checks for what a learner's assistant may use. Run: npx tsx test/learner-tools.check.ts
 */
import assert from "node:assert/strict";
import { learnerMayUseTool } from "../server/lib/learner-tools.js";

// Tutoring: their own work, their own week, finding their way around.
for (const name of [
  "get-my-assessment",
  "save-submission-draft",
  "submit-work",
  "get-my-week",
  "view-screen",
  "navigate",
  "tool-search",
  "refresh-screen",
]) {
  assert.equal(learnerMayUseTool(name), true, `${name} should be allowed`);
}

// Not tutoring: rewriting their own tutor, model runs outside the
// per-message gate, reaching outside the school, staff work.
for (const name of [
  "save-memory",
  "delete-memory",
  "resources",
  "agent-teams",
  "call-agent",
  "manage-automations",
  "manage-jobs",
  "manage-agent-engine",
  "web-request",
  "set-computer-use",
  "create-extension",
  "chat-history",
  "grade-submission",
  "update-school-config",
  "db-query",
  "some-new-framework-tool",
]) {
  assert.equal(learnerMayUseTool(name), false, `${name} should be refused`);
}

console.log("learner tools: ok");
