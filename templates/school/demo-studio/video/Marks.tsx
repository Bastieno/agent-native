import React from "react";
import { AbsoluteFill, interpolate, Sequence, useCurrentFrame } from "remotion";
import type { Mark } from "../plan";
import { BRAND } from "./theme";

const TITLE_FRAMES = 84;

/** A plain lower-third: the scene's name fades in, stays a moment, fades out. */
function Title({ mark, tall }: { mark: Mark; tall: boolean }) {
  const f = useCurrentFrame();
  const opacity = interpolate(
    f,
    [0, 16, TITLE_FRAMES - 16, TITLE_FRAMES],
    [0, 1, 1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );
  return (
    <AbsoluteFill
      style={{
        justifyContent: "flex-end",
        alignItems: tall ? "center" : "flex-start",
        padding: tall ? "0 60px 240px" : "0 0 72px 72px",
        fontFamily: BRAND.font,
      }}
    >
      <div
        style={{
          padding: "14px 26px",
          background: "rgba(11,11,15,0.8)",
          borderRadius: 8,
          color: BRAND.paper,
          fontSize: tall ? 44 : 36,
          fontWeight: 500,
          letterSpacing: "-0.01em",
          opacity,
        }}
      >
        {mark.title}
      </div>
    </AbsoluteFill>
  );
}

export function Marks({
  marks,
  tall,
}: {
  marks: Mark[];
  total?: number;
  tall: boolean;
}) {
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
