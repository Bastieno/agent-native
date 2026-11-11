import assert from "node:assert/strict";
import { platformRefusal as r } from "../server/lib/platform-limits";

// Shared files, environment, engine, loop settings and Builder: nothing writes them.
assert.equal(r("/_agent-native/resources", "POST"), true);
assert.equal(r("/_agent-native/resources/abc123", "PUT"), true);
assert.equal(r("/_agent-native/resources/abc123", "DELETE"), true);
assert.equal(r("/_agent-native/resources/upload", "POST"), true);
assert.equal(r("/_agent-native/env-vars", "POST"), true);
assert.equal(r("/_agent-native/agent-model-defaults", "PUT"), true);
assert.equal(r("/_agent-native/agent-loop-settings", "POST"), true);
assert.equal(r("/_agent-native/agent-engine/disconnect", "POST"), true);
assert.equal(r("/_agent-native/builder/connect", "GET"), true);
assert.equal(r("/_agent-native/builder/disconnect", "POST"), true);
assert.equal(r("/_agent-native/actions/manage-agent-engine", "GET"), true);
assert.equal(r("/_agent-native/actions/manage-agent-engine", "POST"), true);
assert.equal(
  r("/_agent-native/actions/manage-agent-loop-settings", "POST"),
  true,
);

// Reading is left alone, and the school's own screens read the engine status.
assert.equal(r("/_agent-native/resources", "GET"), false);
assert.equal(r("/_agent-native/resources/tree", "GET"), false);
assert.equal(r("/_agent-native/agent-engine/status", "GET"), false);
assert.equal(r("/_agent-native/env-status", "GET"), false);

// Everything the school runs on stays reachable.
assert.equal(r("/_agent-native/actions/get-school-config", "GET"), false);
assert.equal(r("/_agent-native/actions/update-school-config", "POST"), false);
assert.equal(r("/_agent-native/mcp", "POST"), false);
assert.equal(r("/_agent-native/poll", "GET"), false);
assert.equal(r("/api/school/session", "GET"), false);
assert.equal(r("/_agent-native/resourcesX", "POST"), false); // a prefix, not a lookalike
console.log("platform limits: ok");
