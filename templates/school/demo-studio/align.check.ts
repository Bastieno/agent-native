import assert from "node:assert/strict";
import { alignLines, type Word } from "./align.js";

/** Words spoken from `from` ms, 300 ms each. */
const say = (text: string, from: number): Word[] =>
  text.split(" ").map((w, i) => ({
    text: w,
    startMs: from + i * 300,
    endMs: from + i * 300 + 280,
  }));
const join = (...parts: Word[][]) => parts.flat();
const A = "Every class gets its lessons";
const B = "In Ellai you press one button";
const C = "Happy with it Accept and the week is yours";

// In order.
{
  const w = join(say(A, 0), say(B, 5000), say(C, 10000));
  const s = alignLines([A + ".", B + ".", C + "."], w);
  assert.equal(s.length, 3);
  assert.equal(s[0].startMs, 0);
  assert.equal(s[1].startMs, 5000);
  assert.equal(s[2].startMs, 10000);
  assert.equal(s[0].endMs, 4 * 300 + 280);
}

// Retake: the last full take wins.
{
  const w = join(say(A, 0), say(A, 3000), say(B, 8000));
  const s = alignLines([A, B], w);
  assert.equal(s[0].startMs, 3000);
  assert.equal(s[1].startMs, 8000);
}

// A false start before the full take, and filler between lines, are left out.
{
  const w = join(
    say("Every class", 0),
    say(A, 2000),
    say("um so", 5000),
    say(B, 6000),
  );
  const s = alignLines([A, B], w);
  assert.equal(s[0].startMs, 2000);
  assert.equal(s[1].startMs, 6000);
  assert.ok(s[0].endMs <= 2000 + 5 * 300);
}

// Digits against words.
{
  const w = say("Then she marks 45 books", 0);
  const s = alignLines(["Then she marks forty-five books."], w);
  assert.equal(s[0].startMs, 0);
  assert.equal(s[0].endMs, 4 * 300 + 280);
}

// A dropped word still matches.
{
  const w = say("Every class gets lessons", 1000);
  assert.equal(alignLines([A], w)[0].startMs, 1000);
}

// A line never spoken stops the run and names the line.
{
  const w = join(say(A, 0), say(C, 5000));
  assert.throws(
    () => alignLines([A, B, C], w),
    (e: Error) => /line 2/i.test(e.message) && e.message.includes(B),
  );
}

// A short line sitting inside the next, longer line stays on its own occurrence.
{
  const long = "In Ellai you press one button and the week is built";
  const w = join(say(B, 0), say(long, 4000));
  const s = alignLines([B, long], w);
  assert.equal(s[0].startMs, 0);
  assert.equal(s[1].startMs, 4000);
}
console.log("align: ok");

// The real grant script, spoken straight through, aligns to every line.
import { readScript } from "./script.js";
{
  const lines = readScript(
    new URL("./scripts/grant.md", import.meta.url).pathname,
  );
  let t = 0;
  const w: Word[] = [];
  const starts: number[] = [];
  for (const l of lines) {
    starts.push(t);
    for (const x of l.split(" ")) {
      w.push({ text: x, startMs: t, endMs: t + 250 });
      t += 300;
    }
    t += 700;
  }
  const s = alignLines(lines, w);
  assert.deepEqual(
    s.map((x) => x.startMs),
    starts,
  );
}
console.log("align (grant script): ok");
