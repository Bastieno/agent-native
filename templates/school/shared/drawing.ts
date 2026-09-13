/**
 * Handwritten working, stored as strokes rather than as a picture.
 *
 * A page of algebra saved as a PNG is a couple of hundred kilobytes; the same
 * page as the pen movements that made it is a few. Two hundred and forty
 * learners writing working on several questions a week is the difference
 * between needing object storage and not needing it at all — strokes are JSON,
 * so they sit in the database beside every other answer, with the same access
 * rules and the same backup.
 *
 * Strokes also keep their meaning. They redraw crisply at any size, they print
 * as vectors rather than as a blurry bitmap, and the order and speed of writing
 * survive — which is the difference between seeing an answer and seeing how a
 * learner got there.
 */

export type Stroke = {
  /** Flat [x, y, x, y, …] in canvas pixels. Flat because it halves the JSON. */
  p: number[];
  /** Stroke width. Absent means the default. */
  w?: number;
  /** True when this stroke is an erase rather than ink. */
  e?: boolean;
};

export type Drawing = {
  v: 1;
  /** The canvas the strokes were made on, so any size can redraw them exactly. */
  width: number;
  height: number;
  strokes: Stroke[];
};

export const DEFAULT_STROKE_WIDTH = 2.5;
export const ERASER_WIDTH = 18;

/**
 * A learner can fill a page; they should not be able to fill the database.
 * At roughly 8 bytes a point this is a few hundred kilobytes of very dense
 * working — far beyond anything a real answer needs.
 */
export const MAX_POINTS_PER_DRAWING = 40_000;

export function isDrawing(value: unknown): value is Drawing {
  if (!value || typeof value !== "object") return false;
  const d = value as Drawing;
  return (
    d.v === 1 &&
    typeof d.width === "number" &&
    typeof d.height === "number" &&
    Array.isArray(d.strokes)
  );
}

export function parseDrawing(raw: unknown): Drawing | null {
  let value = raw;
  if (typeof value === "string") {
    const text = value.trim();
    if (!text) return null;
    try {
      value = JSON.parse(text);
    } catch {
      return null;
    }
  }
  if (!isDrawing(value)) return null;
  // Drop anything malformed rather than failing to render the whole answer:
  // a learner's working must not vanish because one stroke was odd.
  const strokes = value.strokes.filter(
    (s) => s && Array.isArray(s.p) && s.p.length >= 2 && s.p.length % 2 === 0,
  );
  return { ...value, strokes };
}

export function countPoints(drawing: Drawing): number {
  return drawing.strokes.reduce((sum, s) => sum + s.p.length / 2, 0);
}

/** Nothing was drawn — an empty canvas should count as no answer, not as an answer. */
export function isBlank(drawing: Drawing | null): boolean {
  if (!drawing) return true;
  return drawing.strokes.filter((s) => !s.e).length === 0;
}

/**
 * One stroke as an SVG path.
 *
 * Rendering to SVG rather than replaying onto a canvas means the same working
 * shows on the learner's tablet, in the teacher's marking panel and on printed
 * paper, from one code path and at whatever size each needs.
 */
export function strokeToPath(stroke: Stroke): string {
  const p = stroke.p;
  if (p.length < 4) {
    // A dot: a tap with a stylus is a legitimate mark, often a decimal point.
    return `M ${p[0]} ${p[1]} l 0.01 0`;
  }
  let d = `M ${p[0]} ${p[1]}`;
  // Smooth through the midpoints so handwriting does not look like a polygon.
  for (let i = 2; i < p.length - 2; i += 2) {
    const mx = (p[i] + p[i + 2]) / 2;
    const my = (p[i + 1] + p[i + 3]) / 2;
    d += ` Q ${p[i]} ${p[i + 1]} ${mx} ${my}`;
  }
  d += ` L ${p[p.length - 2]} ${p[p.length - 1]}`;
  return d;
}
