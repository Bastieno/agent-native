import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  Sequence,
  useCurrentFrame,
} from "remotion";
import type { Mark } from "../plan";
import { BRAND } from "./theme";

const TITLE_FRAMES = 96;
const IN = 24;
const OUT = 20;
const settle = Easing.bezier(0.16, 1, 0.3, 1); // quick start, long soft landing
const leave = Easing.bezier(0.7, 0, 0.84, 0);

/**
 * The scene's name slides in from the left edge, settles, and slides back out.
 * A thin accent line grows beside it first; the words follow a beat later.
 */
function Title({ mark, tall }: { mark: Mark; tall: boolean }) {
  const f = useCurrentFrame();
  const slideIn = interpolate(f, [0, IN], [0, 1], {
    easing: settle,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const slideOut = interpolate(f, [TITLE_FRAMES - OUT, TITLE_FRAMES], [0, 1], {
    easing: leave,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const x = (1 - slideIn) * -110 - slideOut * 110; // % of the panel's own width
  const line = interpolate(f, [4, 20], [0, 1], {
    easing: settle,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const text = interpolate(f, [10, 26], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const size = tall ? 46 : 38;
  return (
    <AbsoluteFill
      style={{
        justifyContent: "flex-end",
        alignItems: "flex-start",
        padding: tall ? "0 0 250px 0" : "0 0 76px 0",
        fontFamily: BRAND.font,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "stretch",
          transform: `translateX(${x}%)`,
          background: "rgba(11,11,15,0.86)",
          color: BRAND.paper,
          borderRadius: "0 12px 12px 0",
          boxShadow: "0 8px 30px rgba(0,0,0,0.22)",
        }}
      >
        <div
          style={{
            width: 8,
            background: BRAND.primary,
            transformOrigin: "bottom",
            transform: `scaleY(${line})`,
          }}
        />
        <div
          style={{
            padding: tall ? "20px 40px 20px 32px" : "16px 36px 16px 28px",
            fontSize: size,
            fontWeight: 500,
            letterSpacing: "-0.015em",
            opacity: text,
          }}
        >
          {mark.title}
        </div>
      </div>
    </AbsoluteFill>
  );
}

export function Marks({ marks, tall }: { marks: Mark[]; tall: boolean }) {
  return (
    <>
      {marks.map((m) => (
        <Sequence
          key={m.number}
          from={m.fromFrame}
          durationInFrames={TITLE_FRAMES}
        >
          <Title mark={m} tall={tall} />
        </Sequence>
      ))}
    </>
  );
}
