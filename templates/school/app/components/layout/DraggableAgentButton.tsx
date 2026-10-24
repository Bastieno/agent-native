import { useEffect, useRef, useState } from "react";
import { AgentToggleButton } from "@agent-native/core/client";

const SIZE = 48;
const MARGIN = 12;
/** A press that moves less than this is a tap, not a drag. */
const DRAG_THRESHOLD = 6;
const STORAGE_KEY = "school.agent-button";

type Placement = { side: "left" | "right"; top: number };

function readPlacement(): Placement | null {
  try {
    const v = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null");
    if (
      v &&
      (v.side === "left" || v.side === "right") &&
      typeof v.top === "number"
    ) {
      return v;
    }
  } catch {
    // Storage can be unavailable (private window); the default is fine.
  }
  return null;
}

function writePlacement(p: Placement) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
  } catch {
    // Not remembered, still works.
  }
}

const clampTop = (top: number) =>
  Math.min(Math.max(top, MARGIN), window.innerHeight - SIZE - MARGIN);

/**
 * The floating assistant button, which the person can move.
 *
 * It sits at the bottom right by default, which is sometimes exactly where the
 * text they are reading is. Drag it anywhere; on release it settles against
 * the nearer side edge and is remembered on this device. A tap still opens the
 * assistant, and a drag never does.
 */
export function DraggableAgentButton({ className }: { className?: string }) {
  const [placement, setPlacement] = useState<Placement | null>(null);
  // While a finger or pointer is dragging, the live position in pixels.
  const [live, setLive] = useState<{ left: number; top: number } | null>(null);
  const drag = useRef<{
    startX: number;
    startY: number;
    originLeft: number;
    originTop: number;
    moved: boolean;
  } | null>(null);
  // A click that follows a drag, or one the wrapper already acted on as a tap,
  // is swallowed. `own` lets the wrapper's own click through.
  const swallowClick = useRef(false);
  const own = useRef(false);
  const ref = useRef<HTMLDivElement>(null);

  // Read where it was left, once the browser is there to ask.
  useEffect(() => {
    const saved = readPlacement();
    setPlacement({
      side: saved?.side ?? "right",
      top: clampTop(saved?.top ?? window.innerHeight - SIZE - 24),
    });
  }, []);

  // A rotated phone or a resized window must not strand it off screen.
  useEffect(() => {
    const onResize = () =>
      setPlacement((p) => (p ? { ...p, top: clampTop(p.top) } : p));
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  if (!placement) return null;

  const onPointerDown = (e: React.PointerEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    drag.current = {
      startX: e.clientX,
      startY: e.clientY,
      originLeft: rect.left,
      originTop: rect.top,
      moved: false,
    };
    // Captured from the start so a quick drag cannot slip off the button. A
    // captured press sends its click to this wrapper, so a tap is passed on
    // to the button by hand in onPointerUp.
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.startX;
    const dy = e.clientY - d.startY;
    if (!d.moved && Math.hypot(dx, dy) < DRAG_THRESHOLD) return;
    d.moved = true;
    setLive({
      left: Math.min(
        Math.max(d.originLeft + dx, MARGIN),
        window.innerWidth - SIZE - MARGIN,
      ),
      top: clampTop(d.originTop + dy),
    });
  };

  const onPointerUp = (e: React.PointerEvent) => {
    const d = drag.current;
    drag.current = null;
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // Already released.
    }
    // The browser may send a click right after the press ends; whichever way
    // it ends, that click must not act twice. The block lapses on its own so
    // the next real tap is never swallowed.
    swallowClick.current = true;
    setTimeout(() => {
      swallowClick.current = false;
    }, 150);
    if (!d) return;
    if (!d.moved || !live) {
      setLive(null);
      // A tap: open the assistant, as the button would have.
      own.current = true;
      ref.current?.querySelector("button")?.click();
      own.current = false;
      return;
    }
    const next: Placement = {
      side: live.left + SIZE / 2 < window.innerWidth / 2 ? "left" : "right",
      top: live.top,
    };
    setPlacement(next);
    setLive(null);
    writePlacement(next);
  };

  const style: React.CSSProperties = live
    ? { left: live.left, top: live.top }
    : {
        top: placement.top,
        ...(placement.side === "left" ? { left: MARGIN } : { right: MARGIN }),
      };

  return (
    <div
      ref={ref}
      className={`fixed z-30 touch-none select-none ${live ? "" : "transition-[left,right,top] duration-200"} ${className ?? ""}`}
      style={{ ...style, width: SIZE, height: SIZE }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={() => {
        // The browser took the press over: neither a tap nor a drag.
        drag.current = null;
        setLive(null);
      }}
      // A click the wrapper has already dealt with (a tap it passed on, or the
      // click that ends a drag) must not reach the button a second time.
      onClickCapture={(e) => {
        if (own.current) return;
        if (swallowClick.current) {
          e.preventDefault();
          e.stopPropagation();
        }
      }}
    >
      <AgentToggleButton className="h-12 w-12 rounded-full border bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 hover:text-primary-foreground" />
    </div>
  );
}
