import React from "react";
import {
  AbsoluteFill,
  interpolate,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import type { Mark } from "../plan";
import { BRAND } from "./theme";

const TITLE_FRAMES = 96;

/** A brand-coloured panel sweeping across the cut into a new scene. */
function Wipe() {
  const f = useCurrentFrame();
  const x = interpolate(f, [0, 18], [-105, 105], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill
      style={{
        background: BRAND.primary,
        transform: `translateX(${x}%) skewX(-12deg)`,
        opacity: 0.92,
      }}
    />
  );
}

/** "02  A school after a term": slides up, holds, slides away. */
function Title({ mark, tall }: { mark: Mark; tall: boolean }) {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const inn = spring({ frame: f - 6, fps, config: { damping: 200 } });
  const out = interpolate(f, [TITLE_FRAMES - 14, TITLE_FRAMES], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const rise = (1 - inn) * 40 + out * 24;
  const size = tall ? 54 : 44;
  return (
    <AbsoluteFill
      style={{
        justifyContent: "flex-end",
        alignItems: tall ? "center" : "flex-start",
        padding: tall ? "0 60px 260px" : "0 0 84px 84px",
        fontFamily: BRAND.font,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 22,
          padding: "20px 34px 20px 22px",
          background: "rgba(11,11,15,0.88)",
          borderRadius: 18,
          color: BRAND.paper,
          opacity: inn * (1 - out),
          transform: `translateY(${rise}px)`,
          boxShadow: "0 12px 40px rgba(0,0,0,0.28)",
        }}
      >
        <div
          style={{
            width: size * 1.35,
            height: size * 1.35,
            borderRadius: 14,
            background: BRAND.primary,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: size * 0.8,
            fontWeight: 700,
            letterSpacing: "-0.02em",
          }}
        >
          {String(mark.number).padStart(2, "0")}
        </div>
        <div
          style={{ fontSize: size, fontWeight: 600, letterSpacing: "-0.02em" }}
        >
          {mark.title}
        </div>
      </div>
    </AbsoluteFill>
  );
}

/** A thin line along the bottom that fills as the video plays. */
function Progress({ total }: { total: number }) {
  const f = useCurrentFrame();
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        bottom: 0,
        height: 8,
        width: `${Math.min(100, (f / total) * 100)}%`,
        background: BRAND.primary,
      }}
    />
  );
}

export function Marks({
  marks,
  total,
  tall,
}: {
  marks: Mark[];
  total: number;
  tall: boolean;
}) {
  return (
    <>
      <Progress total={total} />
      {marks.map((m) => (
        <React.Fragment key={m.number}>
          <Sequence from={Math.max(0, m.fromFrame - 8)} durationInFrames={20}>
            <Wipe />
          </Sequence>
          <Sequence from={m.fromFrame} durationInFrames={TITLE_FRAMES}>
            <Title mark={m} tall={tall} />
          </Sequence>
        </React.Fragment>
      ))}
    </>
  );
}
