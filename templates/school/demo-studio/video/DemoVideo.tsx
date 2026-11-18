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
import { Captions, WordCaptions } from "./Captions";
import { Marks } from "./Marks";
import { Notes } from "./Notes";
import { PhoneStage, type PhoneBackground } from "./Phone";
import { Intro, Outro } from "./Cards";
import { BRAND } from "./theme";

export interface DemoVideoProps {
  plan: EditPlan;
  title: string;
  /** Background music file in the public dir; none when left out. */
  music?: string;
  /** The footage is a phone recording: show it inside a phone. */
  phone?: boolean;
  /** What the phone sits on: ink (default), blue or light. */
  phoneBg?: PhoneBackground;
  /** Burn the spoken words onto the picture. Off by default. */
  captions?: boolean;
  /** Sound effect files in the public dir; each is left out when missing. */
  sfx?: { whoosh?: string; click?: string };
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
        <Notes notes={plan.notes ?? []} />
      </div>
    </AbsoluteFill>
  );
}

export function DemoVideo({
  plan,
  title,
  music,
  captions,
  sfx,
  phone,
  phoneBg,
}: DemoVideoProps) {
  const { width, height } = useVideoConfig();
  const tall = height > width;
  return (
    <AbsoluteFill style={{ background: BRAND.ink }}>
      {phone ? (
        <PhoneStage plan={plan} background={phoneBg} />
      ) : (
        <Screen plan={plan} />
      )}
      {plan.segments.map((s) => (
        <Sequence
          key={s.index}
          from={s.fromFrame + (s.voiceDelayFrames ?? 0)}
          durationInFrames={s.frames - (s.voiceDelayFrames ?? 0)}
        >
          <Audio src={staticFile(basename(s.voiceFile))} />
        </Sequence>
      ))}
      {music && <Audio src={staticFile(music)} volume={0.11} loop />}
      {captions &&
        (phone ? (
          <WordCaptions captions={plan.captions} />
        ) : (
          <Captions captions={plan.captions} tall={tall} />
        ))}
      <Marks marks={plan.marks ?? []} tall={tall} />
      {sfx?.whoosh &&
        (plan.marks ?? []).map((m) => (
          <Sequence
            key={`w${m.number}`}
            from={m.fromFrame}
            durationInFrames={40}
          >
            <Audio src={staticFile(sfx.whoosh!)} volume={0.28} />
          </Sequence>
        ))}
      {sfx?.click &&
        plan.zooms.map((z, i) => (
          <Sequence key={`c${i}`} from={z.atFrame} durationInFrames={20}>
            <Audio src={staticFile(sfx.click!)} volume={0.2} />
          </Sequence>
        ))}
      {(plan.transitions ?? []).map((t) =>
        sfx?.whoosh ? (
          <Sequence key={`t${t}`} from={t - 9} durationInFrames={40}>
            <Audio src={staticFile(sfx.whoosh)} volume={0.3} />
          </Sequence>
        ) : null,
      )}
      {(plan.introFrames ?? INTRO_FRAMES) > 0 && (
        <Sequence durationInFrames={plan.introFrames ?? INTRO_FRAMES}>
          <Intro
            title={title}
            frames={plan.introFrames ?? INTRO_FRAMES}
            tall={tall}
          />
        </Sequence>
      )}
      <Sequence
        from={plan.totalFrames - OUTRO_FRAMES}
        durationInFrames={OUTRO_FRAMES}
      >
        <Outro frames={OUTRO_FRAMES} tall={tall} />
      </Sequence>
    </AbsoluteFill>
  );
}
