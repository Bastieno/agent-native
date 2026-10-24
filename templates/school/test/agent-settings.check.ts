/**
 * Checks for the assistant's settings. Run: npx tsx test/agent-settings.check.ts
 */
import assert from "node:assert/strict";
import {
  audienceForRole,
  learnerAgentOn,
  resolveAgentSettings,
  schoolDay,
  storedAgentSettings,
} from "../shared/agent-settings.js";

// A school that never set anything gets the defaults.
const none = resolveAgentSettings(undefined);
assert.equal(none.learnerAgentEnabled, true);
assert.equal(none.models.learner, "claude-haiku-4-5");
assert.deepEqual(none.dailyMessageLimits, {
  learner: 30,
  teacher: 200,
  admin: null,
});

// What is set wins; what is not stays default; junk is ignored.
const some = resolveAgentSettings({
  learnerAgentEnabled: false,
  learnerAgentByYearGroup: { jss1: true, ss3: "yes" },
  dailyMessageLimits: { learner: 5, teacher: -1, admin: 12.7 },
});
assert.equal(some.learnerAgentEnabled, false);
assert.deepEqual(some.learnerAgentByYearGroup, { jss1: true });
assert.deepEqual(some.dailyMessageLimits, {
  learner: 5,
  teacher: 200,
  admin: 12,
});

// A year group's own setting beats the switch; the rest follow it.
assert.equal(learnerAgentOn(some, "jss1"), true);
assert.equal(learnerAgentOn(some, "jss2"), false);
assert.equal(learnerAgentOn(some, null), false);

assert.equal(audienceForRole("student"), "learner");
assert.equal(audienceForRole("school_admin"), "admin");
assert.equal(audienceForRole("subject_coordinator"), "teacher");

// The school day turns over at Lagos midnight, not UTC midnight.
const lateUtc = new Date("2026-10-14T23:30:00Z"); // 00:30 in Lagos
assert.equal(schoolDay("Africa/Lagos", lateUtc), "2026-10-15");
assert.equal(schoolDay("UTC", lateUtc), "2026-10-14");
assert.equal(schoolDay("Not/AZone", lateUtc), "2026-10-15");

// Enforcement reads only what is stored: nothing, or half a setting, is not
// quietly filled from the defaults.
assert.equal(storedAgentSettings(undefined), null);
assert.equal(storedAgentSettings({ learnerAgentEnabled: true }), null);
const seeded = resolveAgentSettings(undefined);
assert.deepEqual(storedAgentSettings(seeded), seeded);
// A school's own values, including "unlimited" as a stored null, come back
// exactly as stored.
const own = storedAgentSettings({
  ...seeded,
  models: { learner: "m-l", teacher: "m-t", admin: "m-a" },
  dailyMessageLimits: { learner: null, teacher: 7, admin: 0 },
});
assert.deepEqual(own?.dailyMessageLimits, {
  learner: null,
  teacher: 7,
  admin: 0,
});
assert.equal(own?.models.learner, "m-l");

console.log("agent settings: ok");
