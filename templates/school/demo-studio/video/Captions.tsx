import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import type { Caption } from "../plan";
import { BRAND } from "./theme";

export function Captions({
  captions,
  tall,
}: {
  captions: Caption[];
  tall: boolean;
}) {
  const f = useCurrentFrame();
  const c = captions.find((c) => f >= c.fromFrame && f < c.toFrame);
  if (!c) return null;
  return (
    <AbsoluteFill
      style={{
        justifyContent: "flex-end",
        alignItems: "center",
        paddingBottom: tall ? 420 : 90,
      }}
    >
      <div
        style={{
          maxWidth: tall ? 940 : 1500,
          padding: tall ? "18px 30px" : "14px 28px",
          borderRadius: 18,
          background: "rgba(11,11,15,.82)",
          color: BRAND.paper,
          fontFamily: BRAND.font,
          fontSize: tall ? 62 : 48,
          fontWeight: 600,
          lineHeight: 1.2,
          textAlign: "center",
        }}
      >
        {c.text}
      </div>
    </AbsoluteFill>
  );
}

/**
 * Captions for short videos: a few words at a time under the phone, the word
 * being said lit up. Reads along with the voice without covering the screen.
 */
export function WordCaptions({ captions }: { captions: Caption[] }) {
  const f = useCurrentFrame();
  const c = captions.find((c) => f >= c.fromFrame && f < c.toFrame);
  if (!c) return null;
  const pop = interpolate(f - c.fromFrame, [0, 5], [0.92, 1], {
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill
      style={{
        justifyContent: "flex-end",
        alignItems: "center",
        paddingBottom: 150,
      }}
    >
      <div
        style={{
          maxWidth: 980,
          textAlign: "center",
          fontFamily: BRAND.font,
          fontSize: 84,
          fontWeight: 800,
          lineHeight: 1.1,
          letterSpacing: "-0.02em",
          color: "#fff",
          transform: `scale(${pop})`,
          textShadow: "0 4px 18px rgba(0,0,0,0.55)",
        }}
      >
        {(c.words ?? [{ text: c.text, fromFrame: 0, toFrame: 0 }]).map(
          (w, i) => {
            const on = c.words ? f >= w.fromFrame && f < w.toFrame : true;
            return (
              <span
                key={i}
                style={{
                  color: on ? "#ffd60a" : "#fff",
                  marginRight: i === (c.words?.length ?? 1) - 1 ? 0 : 20,
                  display: "inline-block",
                }}
              >
                {w.text}
              </span>
            );
          },
        )}
      </div>
    </AbsoluteFill>
  );
}
