import type { Note, Timeline, VoiceLine } from "./types.js";

/**
 * The edit, as numbers: where each step's footage sits in the finished video,
 * how fast it plays, where the camera zooms and when each caption shows.
 * Pure, so every rule here has a check (plan.check.ts).
 */
export const FPS = 30;
export const INTRO_FRAMES = 60;
export const OUTRO_FRAMES = 60;
/** Breathing room after each spoken line. */
export const PAD_MS = 300;
const MAX_RATE = 2;
const ZOOM_SCALE = 1.6;
const ZOOM_IN = 12;
const ZOOM_HOLD = 30;
const ZOOM_OUT = 15;
const MAX_CAPTION_WORDS = 6;
/** A wait shorter than this is not worth hiding; longer is fast-forwarded before the line is spoken. */
const FF_MIN_WAIT_MS = 1500;
const FF_MIN_MS = 1000;
const MAX_FF_RATE = 16;

/** A stretch of source footage inside a segment, played at one speed. */
export interface Piece {
  /** Frames from the start of the segment. */
  offset: number;
  frames: number;
  videoStartMs: number;
  rate: number;
}

export interface Segment {
  index: number;
  fromFrame: number;
  frames: number;
  /** First piece's start and speed, kept for simple readers. */
  videoStartMs: number;
  playbackRate: number;
  /** The footage, in order; after the last piece its final frame is held to the end. */
  pieces: Piece[];
  /** Frames the voice waits before it starts (a fast-forward plays first). */
  voiceDelayFrames: number;
  holdFrames: number;
  /** Frames after the line ends where footage plays with no voice (long, uncut steps). */
  silentFrames: number;
  voiceFile: string;
}
export interface Zoom {
  atFrame: number;
  x: number;
  y: number;
}
export interface Caption {
  fromFrame: number;
  toFrame: number;
  text: string;
}
/** A scene title shown when the scene begins. */
export interface Mark {
  fromFrame: number;
  title: string;
  number: number;
}

/** A mark on the picture, placed in the finished video. */
export interface PlanNote {
  fromFrame: number;
  toFrame: number;
  rect: { x: number; y: number; w: number; h: number };
  kind: NonNullable<Note["kind"]>;
  label?: string;
}

export interface EditPlan {
  totalFrames: number;
  width: number;
  height: number;
  segments: Segment[];
  zooms: Zoom[];
  captions: Caption[];
  /** Scene titles; left out, there are none. */
  marks?: Mark[];
  /** Marks drawn on the footage; left out, there are none. */
  notes?: PlanNote[];
}

const toFrames = (ms: number) => Math.round((ms / 1000) * FPS);
const clamp = (v: number, lo: number, hi: number) =>
  Math.min(hi, Math.max(lo, v));

export function fitSteps(
  timeline: Timeline,
  voice: VoiceLine[],
  cuts: boolean[],
  lines: string[] = [],
): EditPlan {
  const segments: Segment[] = [];
  const zooms: Zoom[] = [];
  const captions: Caption[] = [];
  let at = INTRO_FRAMES;
  timeline.steps.forEach((step, i) => {
    const line = voice[i];
    if (!line) throw new Error(`Step ${i} has no voice line.`);
    const A = Math.max(1, step.endMs - step.startMs);
    const tail = clamp(step.tailHoldMs ?? 0, 0, A - 1);
    const pre = A - tail; // the part where something happens
    const V = line.durationMs + PAD_MS;
    const Vf = toFrames(V);
    const pieces: Piece[] = [];
    let voiceDelay = 0;
    let frames: number;
    if (cuts[i] && pre > FF_MIN_WAIT_MS) {
      // Fast-forward the work first, then let the voice describe the result.
      const ff = Math.max(
        toFrames(FF_MIN_MS),
        Math.ceil(toFrames(pre) / MAX_FF_RATE),
      );
      pieces.push({
        offset: 0,
        frames: ff,
        videoStartMs: step.startMs,
        rate: pre / ((ff / FPS) * 1000),
      });
      if (tail > 0)
        pieces.push({
          offset: ff,
          frames: toFrames(Math.min(tail, V)),
          videoStartMs: step.startMs + pre,
          rate: 1,
        });
      voiceDelay = ff;
      frames = ff + Vf;
    } else if (!cuts[i] && tail > 0 && pre < V) {
      // The action fits inside the line: play it, then only as much of the
      // still screen after it as the line needs.
      pieces.push({
        offset: 0,
        frames: toFrames(pre),
        videoStartMs: step.startMs,
        rate: 1,
      });
      pieces.push({
        offset: toFrames(pre),
        frames: toFrames(Math.min(tail, V - pre)),
        videoStartMs: step.startMs + pre,
        rate: 1,
      });
      frames = Vf;
    } else {
      // Never slower than real time. A step with a still tail drops the tail
      // rather than speeding the action up to fit it.
      const span = !cuts[i] && tail > 0 ? pre : A;
      const rate = cuts[i] ? Math.max(1, A / V) : clamp(span / V, 1, MAX_RATE);
      const footage = toFrames(span / rate);
      pieces.push({
        offset: 0,
        frames: footage,
        videoStartMs: step.startMs,
        rate,
      });
      frames = Math.max(Vf, footage);
    }
    // Remotion refuses a zero-length sequence: drop empty pieces, keep at least one frame.
    const nonEmpty = pieces.filter((q) => q.frames >= 1);
    if (!nonEmpty.length) nonEmpty.push({ ...pieces[0], frames: 1 });
    pieces.splice(0, pieces.length, ...nonEmpty);
    const last = pieces.at(-1)!;
    segments.push({
      index: i,
      fromFrame: at,
      frames,
      videoStartMs: pieces[0].videoStartMs,
      playbackRate: pieces[0].rate,
      pieces,
      voiceDelayFrames: voiceDelay,
      holdFrames: frames - (last.offset + last.frames),
      silentFrames: Math.max(0, frames - voiceDelay - Vf),
      voiceFile: line.file,
    });
    for (const c of step.clicks) {
      // A click inside a piece of footage that was kept; one in trimmed time is dropped.
      const p = pieces.find(
        (q) =>
          c.atMs >= q.videoStartMs &&
          c.atMs <= q.videoStartMs + (q.frames / FPS) * 1000 * q.rate,
      );
      // No zoom on a click inside fast-forwarded footage: it would still be
      // zoomed in when the voice starts over the finished page.
      if (p && p.rate <= MAX_RATE)
        zooms.push({
          atFrame: at + p.offset + toFrames((c.atMs - p.videoStartMs) / p.rate),
          x: c.x,
          y: c.y,
        });
    }
    if (lines[i])
      captions.push(
        ...chunkCaption(lines[i], at + voiceDelay, at + voiceDelay + Vf),
      );
    at += frames;
  });
  return {
    totalFrames: at + OUTRO_FRAMES,
    width: timeline.width,
    height: timeline.height,
    segments,
    zooms,
    captions,
  };
}

/**
 * Put each step's notes in the finished video. Times count from when the voice
 * starts (after any fast-forward), so a mark lands with the words it goes with.
 */
export function planNotes(
  stepNotes: (Note[] | undefined)[],
  segments: Pick<Segment, "fromFrame" | "frames" | "voiceDelayFrames">[],
): PlanNote[] {
  const out: PlanNote[] = [];
  stepNotes.forEach((notes, i) => {
    const seg = segments[i];
    if (!notes || !seg) return;
    const voiceFrom = seg.fromFrame + seg.voiceDelayFrames;
    const end = seg.fromFrame + seg.frames;
    for (const n of notes) {
      const fromFrame = Math.min(end - 12, voiceFrom + toFrames(n.atMs ?? 400));
      const toFrame = clamp(
        n.forMs ? fromFrame + toFrames(n.forMs) : end - 10,
        fromFrame + 12,
        end,
      );
      out.push({
        fromFrame,
        toFrame,
        rect: n.rect,
        kind: n.kind ?? "highlight",
        label: n.label,
      });
    }
  });
  return out;
}

const ease = (t: number) => t * t * (3 - 2 * t);

/** How far one zoom is in at a frame, 0..1. */
function weight(z: Zoom, frame: number): number {
  const d = frame - z.atFrame;
  if (d < -ZOOM_IN || d > ZOOM_HOLD + ZOOM_OUT) return 0;
  if (d < 0) return ease(1 + d / ZOOM_IN);
  if (d <= ZOOM_HOLD) return 1;
  return ease(1 - (d - ZOOM_HOLD) / ZOOM_OUT);
}

/** Camera at a frame: scale and the source point at the centre of the view. */
export function zoomAt(
  plan: EditPlan,
  frame: number,
): { scale: number; x: number; y: number } {
  const W = plan.width ?? 1920;
  const H = plan.height ?? 1080;
  let best: { w: number; z: Zoom } | null = null;
  for (const z of plan.zooms) {
    const w = weight(z, frame);
    if (w > 0 && (!best || w > best.w)) best = { w, z };
  }
  if (!best) return { scale: 1, x: W / 2, y: H / 2 };
  const scale = 1 + (ZOOM_SCALE - 1) * best.w;
  const halfW = W / scale / 2;
  const halfH = H / scale / 2;
  // Slide from the frame's centre toward the click as the zoom comes in.
  const tx = W / 2 + (best.z.x - W / 2) * best.w;
  const ty = H / 2 + (best.z.y - H / 2) * best.w;
  return {
    scale,
    x: clamp(tx, halfW, W - halfW),
    y: clamp(ty, halfH, H - halfH),
  };
}

/** A vertical window of the source, centred on the focus, kept inside the frame. */
export function cropFor(
  focusX: number,
  sourceW: number,
  sourceH: number,
  aspect: number,
): { left: number; width: number } {
  const width = sourceH * aspect;
  return { left: clamp(focusX - width / 2, 0, sourceW - width), width };
}

/** Split a line into short captions, at punctuation first, timed by length. */
export function chunkCaption(
  line: string,
  fromFrame: number,
  toFrame: number,
): Caption[] {
  const words = line.trim().split(/\s+/);
  const chunks: string[][] = [];
  let cur: string[] = [];
  for (const w of words) {
    cur.push(w);
    const pause = /[,.;:!?]$/.test(w);
    if (cur.length >= MAX_CAPTION_WORDS || (pause && cur.length >= 2)) {
      chunks.push(cur);
      cur = [];
    }
  }
  if (cur.length) {
    if (
      chunks.length &&
      cur.length < 2 &&
      chunks.at(-1)!.length < MAX_CAPTION_WORDS
    ) {
      chunks.at(-1)!.push(...cur);
    } else chunks.push(cur);
  }
  const texts = chunks.map((c) => c.join(" "));
  const total = texts.reduce((n, t) => n + t.length, 0);
  const span = toFrame - fromFrame;
  let at = fromFrame;
  let chars = 0;
  return texts.map((text, i) => {
    chars += text.length;
    const end =
      i === texts.length - 1
        ? toFrame
        : fromFrame + Math.round((span * chars) / total);
    const c = { fromFrame: at, toFrame: end, text };
    at = end;
    return c;
  });
}
