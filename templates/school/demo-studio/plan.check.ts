import assert from "node:assert/strict";
import {
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

// Long action, not cut: at most 2x, and never truncated.
{
  const p = fitSteps(timeline([[0, 9000]]), voice([3000 - PAD_MS]), [false]);
  assert.equal(p.segments[0].playbackRate, 2);
  assert.equal(p.segments[0].frames, f(4500));
}

// Cut step: footage squeezed to the line.
{
  const p = fitSteps(timeline([[0, 30000]]), voice([3000 - PAD_MS]), [true]);
  assert.equal(p.segments[0].playbackRate, 10);
  assert.equal(p.segments[0].frames, f(3000));
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
console.log("plan: ok");
