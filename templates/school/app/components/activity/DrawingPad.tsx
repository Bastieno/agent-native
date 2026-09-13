import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  IconPencil,
  IconEraser,
  IconArrowBackUp,
  IconTrash,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import {
  DEFAULT_STROKE_WIDTH,
  ERASER_WIDTH,
  MAX_POINTS_PER_DRAWING,
  countPoints,
  strokeToPath,
  type Drawing,
  type Stroke,
} from "@shared/drawing";

/**
 * A page to write working on, with a stylus.
 *
 * Deliberately not a whiteboard. There are no shapes, no colours, no layers and
 * no text tool — a pen, a rubber, undo and clear, because that is what showing
 * your working needs and every extra control is one more thing between a
 * fourteen-year-old and the mathematics.
 *
 * Pointer events rather than touch events, so a stylus, a finger and a mouse
 * all arrive the same way. Stylus pressure varies the line, which makes
 * handwriting legible in a way a constant width does not — and matters here,
 * because a teacher has to read it.
 *
 * The strokes render as SVG while drawing, exactly as they will be stored and
 * exactly as they will be marked, so nothing is lost between writing and
 * reading.
 */
export function DrawingPad({
  value,
  onChange,
  disabled,
  height = 320,
}: {
  value?: Drawing | null;
  onChange: (drawing: Drawing) => void;
  disabled?: boolean;
  height?: number;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 800, height });
  const [strokes, setStrokes] = useState<Stroke[]>(value?.strokes ?? []);
  const [current, setCurrent] = useState<Stroke | null>(null);
  const [erasing, setErasing] = useState(false);

  // The canvas is as wide as the column it sits in; strokes are stored in that
  // coordinate space and the viewBox makes them redraw correctly anywhere.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const measure = () =>
      setSize({ width: Math.round(el.clientWidth) || 800, height });
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [height]);

  const commit = useCallback(
    (next: Stroke[]) => {
      setStrokes(next);
      onChange({ v: 1, width: size.width, height: size.height, strokes: next });
    },
    [onChange, size.width, size.height],
  );

  function pointFrom(e: React.PointerEvent<SVGSVGElement>): [number, number] {
    const rect = e.currentTarget.getBoundingClientRect();
    return [
      ((e.clientX - rect.left) / rect.width) * size.width,
      ((e.clientY - rect.top) / rect.height) * size.height,
    ];
  }

  function widthFor(e: React.PointerEvent<SVGSVGElement>): number {
    if (erasing) return ERASER_WIDTH;
    // A mouse and a finger report no useful pressure; a stylus does.
    const pressure =
      e.pointerType === "pen" && e.pressure > 0 ? e.pressure : 0.5;
    return DEFAULT_STROKE_WIDTH * (0.6 + pressure);
  }

  function onDown(e: React.PointerEvent<SVGSVGElement>) {
    if (disabled) return;
    // Claim the pointer so a stroke keeps drawing if the stylus leaves the box.
    e.currentTarget.setPointerCapture(e.pointerId);
    const [x, y] = pointFrom(e);
    setCurrent({ p: [x, y], w: widthFor(e), e: erasing || undefined });
  }

  function onMove(e: React.PointerEvent<SVGSVGElement>) {
    if (!current || disabled) return;
    const [x, y] = pointFrom(e);
    const p = current.p;
    // Skip points too close to matter: fewer points, same line, smaller JSON.
    const dx = x - p[p.length - 2];
    const dy = y - p[p.length - 1];
    if (dx * dx + dy * dy < 4) return;
    setCurrent({ ...current, p: [...p, x, y] });
  }

  function onUp() {
    if (!current) return;
    const next = [...strokes, current];
    setCurrent(null);
    // A learner can fill a page; they cannot fill the database.
    if (
      countPoints({ v: 1, ...size, strokes: next }) > MAX_POINTS_PER_DRAWING
    ) {
      setStrokes(strokes);
      return;
    }
    commit(next);
  }

  const shown = current ? [...strokes, current] : strokes;

  return (
    <div ref={wrapRef} className="space-y-2">
      <div className="flex items-center gap-1.5">
        <Button
          type="button"
          size="sm"
          variant={erasing ? "outline" : "default"}
          disabled={disabled}
          onClick={() => setErasing(false)}
        >
          <IconPencil size={14} className="mr-1.5" />
          Pen
        </Button>
        <Button
          type="button"
          size="sm"
          variant={erasing ? "default" : "outline"}
          disabled={disabled}
          onClick={() => setErasing(true)}
        >
          <IconEraser size={14} className="mr-1.5" />
          Rubber
        </Button>
        <Button
          type="button"
          size="sm"
          variant="ghost"
          disabled={disabled || strokes.length === 0}
          onClick={() => commit(strokes.slice(0, -1))}
        >
          <IconArrowBackUp size={14} className="mr-1.5" />
          Undo
        </Button>
        <Button
          type="button"
          size="sm"
          variant="ghost"
          className="ml-auto"
          disabled={disabled || strokes.length === 0}
          onClick={() => commit([])}
        >
          <IconTrash size={14} className="mr-1.5" />
          Clear
        </Button>
      </div>

      <svg
        viewBox={`0 0 ${size.width} ${size.height}`}
        style={{ height }}
        className={cn(
          "w-full touch-none rounded-md border bg-white",
          disabled ? "opacity-60" : "cursor-crosshair",
        )}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        onPointerLeave={onUp}
      >
        {/* Faint ruling, so working does not wander uphill. */}
        {Array.from({ length: Math.floor(size.height / 40) }, (_, i) => (
          <line
            key={i}
            x1={0}
            x2={size.width}
            y1={(i + 1) * 40}
            y2={(i + 1) * 40}
            stroke="#e8e8e8"
            strokeWidth={1}
          />
        ))}
        {shown.map((stroke, i) => (
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
    </div>
  );
}
