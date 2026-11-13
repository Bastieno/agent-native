import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { BRAND } from "./theme";

function Card({
  children,
  frames,
}: {
  children: React.ReactNode;
  frames: number;
}) {
  const f = useCurrentFrame();
  const opacity = interpolate(f, [0, 8, frames - 8, frames], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill
      style={{
        background: BRAND.ink,
        color: BRAND.paper,
        fontFamily: BRAND.font,
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        opacity,
      }}
    >
      {children}
    </AbsoluteFill>
  );
}

const Wordmark = ({ size }: { size: number }) => (
  <div style={{ fontSize: size, fontWeight: 600, letterSpacing: "-0.03em" }}>
    Ellai<span style={{ color: BRAND.primary }}>.</span>
  </div>
);

export const Intro = ({
  title,
  frames,
  tall,
}: {
  title: string;
  frames: number;
  tall: boolean;
}) => (
  <Card frames={frames}>
    <Wordmark size={tall ? 120 : 110} />
    <div
      style={{
        marginTop: 28,
        maxWidth: tall ? 860 : 1300,
        fontSize: tall ? 72 : 64,
        fontWeight: 600,
        letterSpacing: "-0.03em",
        lineHeight: 1.05,
      }}
    >
      {title}
    </div>
  </Card>
);

export const Outro = ({ frames, tall }: { frames: number; tall: boolean }) => (
  <Card frames={frames}>
    <Wordmark size={tall ? 150 : 140} />
    <div style={{ marginTop: 24, fontSize: tall ? 54 : 48, opacity: 0.75 }}>
      ellai.dev
    </div>
  </Card>
);
