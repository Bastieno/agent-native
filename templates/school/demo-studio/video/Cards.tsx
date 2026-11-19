import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { Logo } from "./Logo";
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

const Wordmark = ({ size }: { size: number }) => <Logo height={size * 0.9} />;

const TAGLINE = "Run a school by asking";

/** The opening card: the logo settles in, then the line rises beneath it. */
export const Intro = ({
  frames,
  tall,
}: {
  title?: string;
  frames: number;
  tall: boolean;
}) => {
  const f = useCurrentFrame();
  const ease = Easing.bezier(0.22, 1, 0.36, 1);
  const logo = interpolate(f, [4, 26], [0, 1], {
    easing: ease,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const line = interpolate(f, [24, 46], [0, 1], {
    easing: ease,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <Card frames={frames}>
      <div
        style={{
          opacity: logo,
          transform: `translateY(${(1 - logo) * 24}px) scale(${0.92 + 0.08 * logo})`,
        }}
      >
        <Logo height={tall ? 170 : 150} />
      </div>
      <div
        style={{
          marginTop: 34,
          maxWidth: tall ? 880 : 1300,
          fontSize: tall ? 78 : 66,
          fontWeight: 600,
          letterSpacing: "-0.03em",
          lineHeight: 1.05,
          opacity: line,
          transform: `translateY(${(1 - line) * 22}px)`,
        }}
      >
        {TAGLINE}
      </div>
    </Card>
  );
};

export const Outro = ({ frames, tall }: { frames: number; tall: boolean }) => (
  <Card frames={frames}>
    <Wordmark size={tall ? 150 : 140} />
    <div style={{ marginTop: 24, fontSize: tall ? 54 : 48, opacity: 0.75 }}>
      ellai.dev
    </div>
  </Card>
);
