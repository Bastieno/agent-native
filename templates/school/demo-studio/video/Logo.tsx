import React from "react";

/**
 * Ellai's logo, drawn from templates/school/brand/ellai-lockup(-dark).svg.
 * `onDark` uses the lighter colours and white lettering; `mark` is the three bars alone.
 */
export function Logo({
  height,
  onDark = true,
  mark = false,
}: {
  height: number;
  onDark?: boolean;
  mark?: boolean;
}) {
  const c = onDark
    ? { a: "#f06595", b: "#ffa94d", c: "#5c7cfa", text: "#ffffff" }
    : { a: "#e64980", b: "#f08c00", c: "#3b5bdb", text: "#14171f" };
  return (
    <svg
      height={height}
      viewBox={mark ? "0 0 64 64" : "0 0 220 64"}
      width={(height * (mark ? 64 : 220)) / 64}
      fill="none"
      style={{ display: "block" }}
    >
      <rect x="6" y="8" width="36" height="12" rx="3" fill={c.a} />
      <rect x="6" y="26" width="52" height="12" rx="3" fill={c.b} />
      <rect x="6" y="44" width="52" height="12" rx="3" fill={c.c} />
      {!mark && (
        <text
          x="76"
          y="45"
          fontFamily="Inter, -apple-system, 'Helvetica Neue', Arial, sans-serif"
          fontSize="36"
          fontWeight="700"
          letterSpacing="-1.1"
          fill={c.text}
        >
          Ellai
        </text>
      )}
    </svg>
  );
}
