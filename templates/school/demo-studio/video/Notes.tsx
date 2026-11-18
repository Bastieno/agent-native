import React from "react";
import { Easing, interpolate, Sequence, useCurrentFrame } from "remotion";
import { Box, Circle, Highlight, Underline } from "@remotion/rough-notation";
import type { PlanNote } from "../plan";
import { BRAND } from "./theme";

const MARK = "#e8590c"; // an orange that shows on white and on the app's blue
const MARKER = "rgba(255, 214, 10, 0.55)";

/** The rest of the screen dims while the area stays bright: a spotlight. */
function Spot({ n, frames }: { n: PlanNote; frames: number }) {
  const f = useCurrentFrame();
  const inn = interpolate(f, [0, 14], [0, 1], {
    easing: Easing.bezier(0.22, 1, 0.36, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const out = interpolate(f, [frames - 12, frames], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const p = inn * out;
  const { x, y, w, h } = n.rect;
  // The opening eases in from a little larger, so the light seems to close on the area.
  const grow = (1 - inn) * 18;
  return (
    <div
      style={{
        position: "absolute",
        left: x - 8 - grow,
        top: y - 6 - grow,
        width: w + 16 + grow * 2,
        height: h + 12 + grow * 2,
        borderRadius: 12,
        boxShadow: `0 0 0 4000px rgba(7, 10, 24, ${0.62 * p}), 0 0 0 2px rgba(255,255,255,${0.85 * p}), 0 0 28px 6px rgba(255,255,255,${0.18 * p})`,
        pointerEvents: "none",
      }}
    />
  );
}

function Mark({
  n,
  frames,
  unit,
}: {
  n: PlanNote;
  frames: number;
  /** How many video pixels one drawing pixel is; strokes and labels are drawn thinner by this much. */
  unit: number;
}) {
  const f = useCurrentFrame();
  const progress = interpolate(f, [0, 22], [0, 1], {
    easing: Easing.bezier(0.22, 1, 0.36, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const opacity = interpolate(f, [frames - 10, frames], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  if (n.kind === "spot" || n.kind === "highlight")
    return <Spot n={n} frames={frames} />;
  const { x, y, w, h } = n.rect;
  // The annotation is drawn around an empty block the size of the area.
  const area = <div style={{ width: w, height: h }} />;
  const common = { progress, seed: 7, disabled: false } as const;
  let drawn: React.ReactNode;
  if (n.kind === "box")
    drawn = (
      <Box
        {...common}
        color={MARK}
        strokeWidth={5 / unit}
        iterations={1}
        roughness={0.9}
        padding={{ left: 6, right: 6, top: 4, bottom: 4 }}
      >
        {area}
      </Box>
    );
  else if (n.kind === "circle")
    drawn = (
      <Circle
        {...common}
        color={MARK}
        strokeWidth={6 / unit}
        roughness={1.4}
        padding={{ left: 14, right: 14, top: 10, bottom: 10 }}
      >
        {area}
      </Circle>
    );
  else if (n.kind === "underline")
    drawn = (
      <Underline {...common} color={MARK} strokeWidth={6 / unit} iterations={2}>
        {area}
      </Underline>
    );
  else
    drawn = (
      <Highlight
        {...common}
        color={MARKER}
        maxRandomnessOffset={6}
        roughness={1.6}
        bowing={0}
        padding={{ left: 8, right: 8 }}
      >
        {area}
      </Highlight>
    );
  const tag = interpolate(f, [12, 26], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <div style={{ position: "absolute", left: x, top: y, opacity }}>
      <div
        style={{
          mixBlendMode:
            n.kind === "highlight" || !n.kind ? "multiply" : "normal",
        }}
      >
        {drawn}
      </div>
      {n.label && (
        <div
          style={{
            position: "absolute",
            left: 0,
            top: h + 14 / unit,
            padding: `${8 / unit}px ${16 / unit}px`,
            borderRadius: 6,
            background: BRAND.ink,
            color: BRAND.paper,
            fontFamily: BRAND.font,
            fontSize: 26 / unit,
            fontWeight: 500,
            whiteSpace: "nowrap",
            opacity: tag,
            transform: `translateY(${(1 - tag) * 8}px)`,
          }}
        >
          {n.label}
        </div>
      )}
    </div>
  );
}

/** Hand-drawn marks on the screen footage. Drawn in screen pixels, inside the camera, so they follow any zoom. */
export function Notes({
  notes,
  unit = 1,
}: {
  notes: PlanNote[];
  unit?: number;
}) {
  return (
    <>
      {notes.map((n, i) => (
        <Sequence
          key={i}
          from={n.fromFrame}
          durationInFrames={n.toFrame - n.fromFrame}
          layout="none"
        >
          <Mark n={n} frames={n.toFrame - n.fromFrame} unit={unit} />
        </Sequence>
      ))}
    </>
  );
}
