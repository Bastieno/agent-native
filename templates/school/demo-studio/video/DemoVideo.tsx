import React from "react";
import {
  AbsoluteFill,
  Audio,
  Freeze,
  OffthreadVideo,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  cropFor,
  FPS,
  INTRO_FRAMES,
  OUTRO_FRAMES,
  zoomAt,
  type EditPlan,
} from "../plan";
import { Captions } from "./Captions";
import { Marks } from "./Marks";
import { Intro, Outro } from "./Cards";
import { BRAND } from "./theme";

export interface DemoVideoProps {
  plan: EditPlan;
  title: string;
  /** Background music file in the public dir; none when left out. */
  music?: string;
  /** Burn the spoken words onto the picture. Off by default. */
  captions?: boolean;
  [key: string]: unknown;
}

const basename = (p: string) => p.split("/").pop()!;

/** The screen footage, moved by the camera: zoomed in on clicks, cropped for vertical. */
function Screen({ plan }: { plan: EditPlan }) {
  const frame = useCurrentFrame();
  const { width: VW, height: VH } = useVideoConfig();
  const W = plan.width;
  const H = plan.height;
  const z = zoomAt(plan, frame);
  const base = Math.max(VW / W, VH / H);
  const S = base * z.scale;
  // The visible window of the source at this zoom, kept inside the frame.
  const visibleH = VH / S;
  const crop = cropFor(z.x, W, visibleH, VW / VH);
  const cx = crop.left + crop.width / 2;
  const cy = Math.min(H - visibleH / 2, Math.max(visibleH / 2, z.y));
  const src = staticFile("screen.webm");
  return (
    <AbsoluteFill style={{ background: BRAND.ink, overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          width: W,
          height: H,
          transformOrigin: "0 0",
          transform: `translate(${VW / 2 - cx * S}px, ${VH / 2 - cy * S}px) scale(${S})`,
        }}
      >
        {plan.segments.map((s) => {
          const footage = s.frames - s.holdFrames;
          const trimBefore = Math.round((s.videoStartMs / 1000) * FPS);
          const video = (
            <OffthreadVideo
              src={src}
              trimBefore={trimBefore}
              playbackRate={s.playbackRate}
              muted
            />
          );
          return (
            <Sequence
              key={s.index}
              from={s.fromFrame}
              durationInFrames={s.frames}
              layout="none"
            >
              <Sequence durationInFrames={footage} layout="none">
                {video}
              </Sequence>
              {s.holdFrames > 0 && (
                <Sequence
                  from={footage}
                  durationInFrames={s.holdFrames}
                  layout="none"
                >
                  <Freeze frame={Math.max(0, footage - 1)}>{video}</Freeze>
                </Sequence>
              )}
            </Sequence>
          );
        })}
      </div>
    </AbsoluteFill>
  );
}

export function DemoVideo({ plan, title, music, captions }: DemoVideoProps) {
  const { width, height } = useVideoConfig();
  const tall = height > width;
  return (
    <AbsoluteFill style={{ background: BRAND.ink }}>
      <Screen plan={plan} />
      {plan.segments.map((s) => (
        <Sequence key={s.index} from={s.fromFrame} durationInFrames={s.frames}>
          <Audio src={staticFile(basename(s.voiceFile))} />
        </Sequence>
      ))}
      {music && <Audio src={staticFile(music)} volume={0.11} loop />}
      {captions && <Captions captions={plan.captions} tall={tall} />}
      <Marks marks={plan.marks ?? []} total={plan.totalFrames} tall={tall} />
      <Sequence durationInFrames={INTRO_FRAMES}>
        <Intro title={title} frames={INTRO_FRAMES} tall={tall} />
      </Sequence>
      <Sequence
        from={plan.totalFrames - OUTRO_FRAMES}
        durationInFrames={OUTRO_FRAMES}
      >
        <Outro frames={OUTRO_FRAMES} tall={tall} />
      </Sequence>
    </AbsoluteFill>
  );
}
