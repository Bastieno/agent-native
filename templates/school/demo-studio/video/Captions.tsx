import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
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
