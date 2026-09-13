import {
  parseDrawing,
  strokeToPath,
  DEFAULT_STROKE_WIDTH,
  type Drawing,
} from "@shared/drawing";
import { cn } from "@/lib/utils";

/**
 * Someone's handwritten working, read-only.
 *
 * One renderer for every surface: the learner reviewing what they handed in,
 * the teacher marking it, and the printed page. Rendering to SVG rather than
 * replaying onto a canvas is what makes that possible — it redraws at any size
 * and prints as vectors rather than a blurred bitmap.
 *
 * Erase strokes are drawn in the page's own background colour rather than
 * removed from the data. The learner's rubbing-out is part of their working,
 * and keeping it means a teacher can see a change of mind.
 */
export function StrokesView({
  drawing,
  className,
}: {
  drawing: unknown;
  className?: string;
}) {
  const parsed: Drawing | null = parseDrawing(drawing);
  if (!parsed || parsed.strokes.length === 0) return null;

  return (
    <svg
      viewBox={`0 0 ${parsed.width} ${parsed.height}`}
      className={cn("w-full rounded border bg-white", className)}
      // Ink is black on white whatever the app's theme, because that is what
      // it was drawn as and what it will be printed as.
      role="img"
      aria-label="Handwritten working"
    >
      {parsed.strokes.map((stroke, i) => (
        <path
          key={i}
          d={strokeToPath(stroke)}
          fill="none"
          stroke={stroke.e ? "#ffffff" : "#111111"}
          strokeWidth={stroke.w ?? DEFAULT_STROKE_WIDTH}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
    </svg>
  );
}
