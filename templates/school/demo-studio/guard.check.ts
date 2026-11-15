import assert from "node:assert/strict";
import { assertDemoUrl, DEMO_PORT } from "./guard.js";

assert.equal(DEMO_PORT, 8134);
assertDemoUrl("http://localhost:8134");
assertDemoUrl("http://localhost:8135");
assertDemoUrl("http://localhost:8136");
assertDemoUrl("http://localhost:8137");
assert.throws(() => assertDemoUrl("http://localhost:8130"), /pilot/);
assert.throws(() => assertDemoUrl("http://localhost:8131"));
assert.throws(() => assertDemoUrl("http://localhost:8133"));
console.log("guard: ok");
