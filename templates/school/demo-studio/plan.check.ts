import assert from "node:assert/strict";
import {
  planNotes,
  chunkCaption,
  cropFor,
  fitSteps,
  FPS,
  INTRO_FRAMES,
  OUTRO_FRAMES,
  PAD_MS,
  zoomAt,
} from "./plan.js";
import type { Timeline } from "./types.js";

const f = (ms: number) => Math.round((ms / 1000) * FPS);
const timeline = (
  steps: [number, number][],
  clicks: { step: number; atMs: number; x: number; y: number }[] = [],
): Timeline => ({
  width: 1920,
  height: 1080,
  videoOffsetMs: 0,
  flashAtMs: 0,
  steps: steps.map(([startMs, endMs], index) => ({
    index,
    startMs,
    endMs,
    clicks: clicks
      .filter((c) => c.step === index)
      .map(({ atMs, x, y }) => ({ atMs, x, y })),
  })),
});
const voice = (ms: number[]) =>
  ms.map((durationMs, index) => ({ index, file: `v${index}.wav`, durationMs }));
const V = (spoken: number) => spoken + PAD_MS;

// Short action, long line: real speed, then hold the last frame.
{
  const p = fitSteps(timeline([[0, 1000]]), voice([3000 - PAD_MS]), [false]);
  const s = p.segments[0];
  assert.equal(s.playbackRate, 1);
  assert.equal(s.frames, f(3000));
  assert.ok(s.holdFrames > 0);
  assert.equal(s.fromFrame, INTRO_FRAMES);
}

// Long action, not cut: at most 2x, never truncated, and the silence it leaves is reported.
{
  const p = fitSteps(timeline([[0, 9000]]), voice([3000 - PAD_MS]), [false]);
  assert.equal(p.segments[0].playbackRate, 2);
  assert.equal(p.segments[0].frames, f(4500));
  assert.equal(p.segments[0].silentFrames, f(1500));
}
// A step that fits its line is not silent.
{
  const p = fitSteps(timeline([[0, 1000]]), voice([3000 - PAD_MS]), [false]);
  assert.equal(p.segments[0].silentFrames, 0);
}

// Cut step with a long wait: fast-forwarded first (never past 16x), then the voice speaks over the result.
{
  const p = fitSteps(timeline([[0, 30000]]), voice([3000 - PAD_MS]), [true]);
  const s = p.segments[0];
  assert.ok(s.playbackRate > 10 && s.playbackRate <= 16, `${s.playbackRate}x`);
  assert.equal(s.voiceDelayFrames, s.pieces[0].frames);
  assert.equal(s.frames, s.voiceDelayFrames + f(3000));
  assert.equal(s.silentFrames, 0);
}

// Cut step that's already quicker than its line: never slow-motion, hold instead.
{
  const p = fitSteps(timeline([[0, 800]]), voice([3000 - PAD_MS]), [true]);
  assert.equal(p.segments[0].playbackRate, 1);
  assert.equal(p.segments[0].frames, f(3000));
  assert.ok(p.segments[0].holdFrames > 0);
}

// Segments back to back; total = intro + segments + outro.
{
  const p = fitSteps(
    timeline([
      [0, 1000],
      [1000, 2000],
    ]),
    voice([1000, 2000]),
    [false, false],
  );
  const [a, b] = p.segments;
  assert.equal(b.fromFrame, a.fromFrame + a.frames);
  assert.equal(b.videoStartMs, 1000);
  assert.equal(
    p.totalFrames,
    INTRO_FRAMES + a.frames + b.frames + OUTRO_FRAMES,
  );
  assert.equal(a.voiceFile, "v0.wav");
}

// Zooms: a click maps through its segment's rate into a composition frame.
{
  const p = fitSteps(
    timeline([[0, 4000]], [{ step: 0, atMs: 2000, x: 960, y: 540 }]),
    voice([1000 - PAD_MS]),
    [false],
  );
  // rate 2 (4000 / 1000 capped at 2): the click lands 1000 ms into the segment.
  assert.equal(p.zooms.length, 1);
  assert.equal(p.zooms[0].atFrame, INTRO_FRAMES + f(1000));
  assert.equal(zoomAt(p, p.zooms[0].atFrame).scale, 1.6);
  assert.equal(zoomAt(p, 0).scale, 1);
  assert.equal(zoomAt(p, p.totalFrames - 1).scale, 1);
}

// A click near the edge never zooms the frame past the source.
{
  const p = fitSteps(
    timeline([[0, 2000]], [{ step: 0, atMs: 1000, x: 1900, y: 1070 }]),
    voice([V(0)]),
    [false],
  );
  const z = zoomAt(p, p.zooms[0].atFrame);
  const halfW = 1920 / z.scale / 2,
    halfH = 1080 / z.scale / 2;
  assert.ok(z.x + halfW <= 1920 && z.x - halfW >= 0);
  assert.ok(z.y + halfH <= 1080 && z.y - halfH >= 0);
}

// Vertical crop stays inside the source.
{
  const r = cropFor(1900, 1920, 1080, 9 / 16);
  assert.equal(r.width, 1080 * (9 / 16));
  assert.ok(r.left + r.width <= 1920);
  assert.equal(cropFor(10, 1920, 1080, 9 / 16).left, 0);
  const mid = cropFor(960, 1920, 1080, 9 / 16);
  assert.equal(mid.left + mid.width / 2, 960);
}

// Captions: at most 6 words each, covering the span exactly.
{
  const line =
    "Every class gets its lessons, every teacher is in one room, and nothing clashes.";
  const cs = chunkCaption(line, 100, 400);
  assert.ok(cs.length <= 3 && cs.length >= 2);
  assert.ok(cs.every((c) => c.text.split(" ").length <= 6));
  assert.equal(cs[0].fromFrame, 100);
  assert.equal(cs.at(-1)!.toFrame, 400);
  for (let i = 1; i < cs.length; i++)
    assert.equal(cs[i].fromFrame, cs[i - 1].toFrame);
  assert.equal(cs.map((c) => c.text).join(" "), line);
}

// fitSteps attaches each line's captions.
{
  const p = fitSteps(
    timeline([[0, 1000]]),
    voice([1000]),
    [false],
    ["Hello there."],
  );
  assert.equal(p.captions[0].text, "Hello there.");
}

// A still tail is trimmed, not sped up: the action plays in real time, then only as much stillness as the line needs.
{
  const t = timeline([[0, 3000]]);
  t.steps[0].tailHoldMs = 2000;
  const p = fitSteps(t, voice([6000 - PAD_MS]), [false]);
  const s = p.segments[0];
  assert.equal(s.pieces.length, 2);
  assert.equal(s.pieces[0].rate, 1);
  assert.equal(s.pieces[1].videoStartMs, 1000);
  assert.equal(s.frames, f(6000));
  assert.ok(s.holdFrames > 0);
}
// A long action with a long still tail: the tail is dropped, the action runs at most 2x.
{
  const t = timeline([[0, 9500]]);
  t.steps[0].tailHoldMs = 3500;
  const s = fitSteps(t, voice([4000 - PAD_MS]), [false]).segments[0];
  assert.equal(s.pieces.length, 1);
  assert.ok(Math.abs(s.pieces[0].rate - 1.5) < 0.01);
  assert.equal(s.silentFrames, 0);
}
// A click in trimmed time gets no zoom; one in kept footage does.
{
  const t = timeline(
    [[0, 3000]],
    [
      { step: 0, atMs: 500, x: 100, y: 100 },
      { step: 0, atMs: 2900, x: 200, y: 200 },
    ],
  );
  t.steps[0].tailHoldMs = 2000;
  const p = fitSteps(t, voice([1000 - PAD_MS]), [false]);
  assert.equal(p.zooms.length, 1);
  const kept = fitSteps(t, voice([6000 - PAD_MS]), [false]);
  assert.equal(kept.zooms.length, 2);
}

// No piece of footage is ever empty (Remotion refuses a zero-length sequence), whatever the mix of times.
{
  for (const A of [400, 1200, 3000, 9000, 40000])
    for (const tail of [0, 10, 500, A - 1, A + 500])
      for (const v of [200, 1000, 6000])
        for (const cut of [false, true]) {
          const t = timeline([[0, A]]);
          t.steps[0].tailHoldMs = tail;
          const sg = fitSteps(t, voice([v]), [cut]).segments[0];
          assert.ok(
            sg.pieces.every((p) => p.frames >= 1),
            `A=${A} tail=${tail} v=${v} cut=${cut}`,
          );
          assert.ok(sg.holdFrames >= 0 && sg.frames - sg.voiceDelayFrames >= 1);
        }
}

// A click in fast-forwarded footage gets no zoom (it would linger over the page the voice then describes).
{
  const t = timeline([[0, 30000]], [{ step: 0, atMs: 20000, x: 500, y: 500 }]);
  t.steps[0].tailHoldMs = 3000;
  const p = fitSteps(t, voice([4000 - PAD_MS]), [true]);
  assert.ok(p.segments[0].pieces[0].rate > 2);
  assert.equal(p.zooms.length, 0);
}

// Notes land with the words: counted from when the voice starts, never before the step or past its end.
{
  const seg = { fromFrame: 100, frames: 200, voiceDelayFrames: 30 };
  const [a, b, c] = planNotes(
    [
      [
        { rect: { x: 1, y: 2, w: 3, h: 4 } },
        {
          rect: { x: 1, y: 2, w: 3, h: 4 },
          atMs: 1000,
          forMs: 2000,
          kind: "box",
          label: "x",
        },
        { rect: { x: 1, y: 2, w: 3, h: 4 }, atMs: 99999 },
      ],
    ],
    [seg],
  );
  assert.equal(a.fromFrame, 130 + f(400));
  assert.equal(a.toFrame, 300 - 10);
  assert.equal(a.kind, "highlight");
  assert.equal(b.fromFrame, 130 + f(1000));
  assert.equal(b.toFrame, b.fromFrame + f(2000));
  assert.equal(b.label, "x");
  assert.ok(c.fromFrame <= 300 - 12 && c.toFrame > c.fromFrame);
  assert.deepEqual(planNotes([undefined], [seg]), []);
}
console.log("plan: ok");
