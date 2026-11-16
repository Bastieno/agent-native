import React from "react";
import {
  AbsoluteFill,
  Freeze,
  OffthreadVideo,
  Sequence,
  staticFile,
} from "remotion";
import { FPS, type EditPlan } from "../plan";
import { BRAND } from "./theme";
import { Notes } from "./Notes";

/** The phone, in video pixels. The footage is 390x844 CSS pixels shown at 1.9x. */
const SCALE = 1.9;
const FOOT_W = Math.round(390 * SCALE); // 741
const FOOT_H = Math.round(844 * SCALE); // 1604
const STATUS = 76; // the status bar above the footage
const BEZEL = 18;
const SCREEN_W = FOOT_W;
const SCREEN_H = STATUS + FOOT_H;
const PHONE_W = SCREEN_W + BEZEL * 2;
const PHONE_H = SCREEN_H + BEZEL * 2;

function StatusBar() {
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: SCREEN_W,
        height: STATUS,
        background: "#fff",
        color: "#111",
        fontFamily: BRAND.font,
        fontWeight: 600,
        fontSize: 30,
      }}
    >
      <div style={{ position: "absolute", left: 56, top: 22 }}>9:41</div>
      {/* signal, wifi, battery */}
      <svg
        width="150"
        height="30"
        viewBox="0 0 150 30"
        style={{ position: "absolute", right: 44, top: 24 }}
        fill="#111"
      >
        <rect x="0" y="18" width="6" height="10" rx="2" />
        <rect x="10" y="13" width="6" height="15" rx="2" />
        <rect x="20" y="8" width="6" height="20" rx="2" />
        <rect x="30" y="2" width="6" height="26" rx="2" />
        <path d="M60 10c8-7 22-7 30 0l-4 4c-6-5-16-5-22 0z" />
        <path d="M66 17c5-4 13-4 18 0l-4 4c-3-2-7-2-10 0z" />
        <circle cx="75" cy="25" r="3" />
        <rect
          x="102"
          y="4"
          width="42"
          height="22"
          rx="7"
          fill="none"
          stroke="#111"
          strokeWidth="2"
          opacity=".5"
        />
        <rect x="106" y="8" width="32" height="14" rx="4" />
        <rect x="146" y="11" width="3" height="8" rx="1.5" opacity=".5" />
      </svg>
    </div>
  );
}

/** The footage, played in the phone's screen. */
function Screen({ plan }: { plan: EditPlan }) {
  const src = staticFile("screen.webm");
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        top: STATUS,
        width: FOOT_W,
        height: FOOT_H,
        overflow: "hidden",
        background: "#fff",
      }}
    >
      {plan.segments.map((s) => {
        const pieces = s.pieces ?? [
          {
            offset: 0,
            frames: s.frames - s.holdFrames,
            videoStartMs: s.videoStartMs,
            rate: s.playbackRate,
          },
        ];
        const video = (p: (typeof pieces)[number]) => (
          <OffthreadVideo
            src={src}
            trimBefore={Math.round((p.videoStartMs / 1000) * FPS)}
            playbackRate={p.rate}
            muted
            style={{ width: FOOT_W, height: FOOT_H, objectFit: "cover" }}
          />
        );
        const last = pieces[pieces.length - 1];
        return (
          <Sequence
            key={s.index}
            from={s.fromFrame}
            durationInFrames={s.frames}
            layout="none"
          >
            {pieces.map((p, k) => (
              <Sequence
                key={k}
                from={p.offset}
                durationInFrames={p.frames}
                layout="none"
              >
                {video(p)}
              </Sequence>
            ))}
            {s.holdFrames > 0 && (
              <Sequence
                from={last.offset + last.frames}
                durationInFrames={s.holdFrames}
                layout="none"
              >
                <Freeze frame={Math.max(0, last.frames - 1)}>
                  {video(last)}
                </Freeze>
              </Sequence>
            )}
          </Sequence>
        );
      })}
      {/* Marks are placed in the phone's own CSS pixels (390x844) and scaled up with it. */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 390,
          height: 844,
          transformOrigin: "0 0",
          transform: `scale(${SCALE})`,
        }}
      >
        <Notes notes={plan.notes ?? []} unit={SCALE} />
      </div>
    </div>
  );
}

/**
 * A phone on a soft background: bezel, rounded screen, Dynamic Island, side
 * buttons, a status bar. Drawn here rather than copied from a device template.
 */
/** What the phone sits on. */
export const PHONE_BACKGROUNDS = {
  /** Deep ink with a soft blue glow behind the phone: matches the intro and closing cards. */
  ink: "radial-gradient(60% 42% at 50% 46%, #1f3a8a 0%, #0f1a3d 45%, #0b0b0f 100%)",
  /** Ellai's blue, a little lighter at the top. */
  blue: "linear-gradient(180deg, #4a82ff 0%, #2459e6 100%)",
  /** Plain light grey. */
  light: "linear-gradient(180deg, #f7f8fa 0%, #e9ecf1 100%)",
} as const;
export type PhoneBackground = keyof typeof PHONE_BACKGROUNDS;

export function PhoneStage({
  plan,
  background = "ink",
}: {
  plan: EditPlan;
  background?: PhoneBackground;
}) {
  return (
    <AbsoluteFill
      style={{
        background: PHONE_BACKGROUNDS[background],
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          position: "relative",
          width: PHONE_W,
          height: PHONE_H,
          borderRadius: 118,
          background: "#0b0b0f",
          boxShadow:
            "0 60px 120px rgba(0,0,0,0.35), 0 12px 30px rgba(0,0,0,0.25), 0 0 0 2px rgba(255,255,255,0.18), inset 0 0 0 3px #3a3a44",
        }}
      >
        {/* side buttons */}
        <div
          style={{
            position: "absolute",
            left: -6,
            top: 330,
            width: 6,
            height: 90,
            borderRadius: 3,
            background: "#1b1b21",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: -6,
            top: 450,
            width: 6,
            height: 150,
            borderRadius: 3,
            background: "#1b1b21",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: -6,
            top: 630,
            width: 6,
            height: 150,
            borderRadius: 3,
            background: "#1b1b21",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: -6,
            top: 480,
            width: 6,
            height: 210,
            borderRadius: 3,
            background: "#1b1b21",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: BEZEL,
            top: BEZEL,
            width: SCREEN_W,
            height: SCREEN_H,
            borderRadius: 100,
            overflow: "hidden",
            background: "#fff",
          }}
        >
          <Screen plan={plan} />
          <StatusBar />
          {/* Dynamic Island */}
          <div
            style={{
              position: "absolute",
              left: SCREEN_W / 2 - 100,
              top: 18,
              width: 200,
              height: 56,
              borderRadius: 28,
              background: "#000",
            }}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
}
