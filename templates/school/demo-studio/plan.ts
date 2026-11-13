import type { Timeline, VoiceLine } from "./types.js";

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

export interface Segment {
  index: number;
  fromFrame: number;
  frames: number;
  videoStartMs: number;
  playbackRate: number;
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
export interface EditPlan {
  totalFrames: number;
  width: number;
  height: number;
  segments: Segment[];
  zooms: Zoom[];
  captions: Caption[];
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
    const V = line.durationMs + PAD_MS;
    // Never slower than real time; a cut step may go as fast as it needs.
    const rate = cuts[i] ? Math.max(1, A / V) : clamp(A / V, 1, MAX_RATE);
    const footage = toFrames(A / rate);
    const frames = Math.max(toFrames(V), footage);
    segments.push({
      index: i,
      fromFrame: at,
      frames,
      videoStartMs: step.startMs,
      playbackRate: rate,
      holdFrames: frames - footage,
      silentFrames: frames - toFrames(V),
      voiceFile: line.file,
    });
    for (const c of step.clicks) {
      zooms.push({
        atFrame: at + toFrames((c.atMs - step.startMs) / rate),
        x: c.x,
        y: c.y,
      });
    }
    if (lines[i])
      captions.push(...chunkCaption(lines[i], at, at + toFrames(V)));
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
