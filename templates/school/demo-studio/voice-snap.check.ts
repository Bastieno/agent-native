import assert from "node:assert/strict";
import { cutWindow } from "./voice-file.js";

const segs = [
  { startS: 61.16, endS: 63.91 },
  { startS: 64.57, endS: 68.82 },
  { startS: 69.31, endS: 71.53 },
];
const span = { index: 10, startMs: 64934, endMs: 68674 };
const prev = { index: 9, startMs: 61300, endMs: 63761 };
const next = { index: 11, startMs: 69400, endMs: 71000 };

// The transcript missed the first word ("Ellai" heard as "L I"): the cut still starts where the speech does.
let w = cutWindow(span, prev, next, segs);
assert.ok(Math.abs(w.fromS - 64.52) < 0.01, `from ${w.fromS}`);
// ...and ends where it ends, not where the transcript's last word ended.
assert.ok(Math.abs(w.toS - 68.94) < 0.01, `to ${w.toS}`);

// A neighbouring line in the same stretch of speech is never cut into.
const tight = [{ startS: 61.16, endS: 71.53 }];
w = cutWindow(span, prev, next, tight);
assert.ok(w.fromS >= 63.761, `from ${w.fromS}`);
assert.ok(w.toS <= 69.4, `to ${w.toS}`);

// No speech data: a little room each side, as before.
w = cutWindow(span, undefined, undefined, []);
assert.ok(w.fromS < 64.934 && w.toS > 68.674);
console.log("voice-snap: ok");
