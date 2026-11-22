import type { Edition } from "@shared/landing-content";
import { IconPlayerPlayFilled } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/** The logo: three bars, pink, amber and blue. */
export function EllaiMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={className}>
      <rect
        x="6"
        y="8"
        width="36"
        height="12"
        rx="3"
        className="fill-principal"
      />
      <rect
        x="6"
        y="26"
        width="52"
        height="12"
        rx="3"
        className="fill-teacher"
      />
      <rect
        x="6"
        y="44"
        width="52"
        height="12"
        rx="3"
        className="fill-learner"
      />
    </svg>
  );
}

/**
 * Plays while on screen and pauses when scrolled away. Nothing is fetched
 * until it first comes into view, and someone who asked for less motion gets
 * the poster, the clip's last frame, with controls to play it themselves.
 */
function LoopVideo({
  src,
  label,
  className,
}: {
  src: string;
  label: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [still, setStill] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStill(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => setStill(true));
        } else {
          video.pause();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(video);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      muted
      loop
      playsInline
      preload="none"
      poster={src.replace(/\.mp4$/, ".jpg")}
      controls={still}
      aria-label={label}
      className={cn("block w-full bg-muted object-cover", className)}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}

function clipSrc(edition: Edition, name: string, device: "desktop" | "phone") {
  return `/landing/${edition}/${name}-${device}.mp4`;
}

export function Screen({
  edition,
  name,
  label,
  phone = true,
}: {
  edition: Edition;
  name: string;
  label: string;
  /** Whether a phone recording exists to show on small screens. */
  phone?: boolean;
}) {
  return (
    <div className="min-w-0">
      <div
        className={cn(
          "overflow-hidden rounded-xl border border-border bg-card shadow-[0_1px_2px_rgba(0,0,0,0.04),0_24px_48px_-24px_rgba(0,0,0,0.25)]",
          phone && "hidden sm:block",
        )}
      >
        <LoopVideo
          src={clipSrc(edition, name, "desktop")}
          label={label}
          className="aspect-[16/10]"
        />
      </div>
      {phone ? (
        <Phone
          edition={edition}
          name={name}
          label={label}
          className="mx-auto sm:hidden"
        />
      ) : null}
    </div>
  );
}

export function Phone({
  edition,
  name,
  label,
  className,
}: {
  edition: Edition;
  name: string;
  label: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "w-[17rem] max-w-full overflow-hidden rounded-[2.25rem] border-[7px] border-foreground bg-card shadow-[0_24px_48px_-20px_rgba(0,0,0,0.35)]",
        className,
      )}
    >
      <LoopVideo
        src={clipSrc(edition, name, "phone")}
        label={label}
        className="aspect-[390/844]"
      />
    </div>
  );
}

/**
 * The YouTube demo, as a poster until someone presses play. YouTube's player,
 * and any cookie it sets, loads only then, from the no-cookie domain.
 */
export function DemoVideo({
  id,
  title,
  poster,
}: {
  id: string;
  title: string;
  poster: string;
}) {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="relative aspect-video overflow-hidden rounded-xl border border-border bg-foreground shadow-[0_24px_48px_-24px_rgba(0,0,0,0.35)]">
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          className="absolute inset-0 size-full"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="group absolute inset-0 size-full"
          aria-label={`Play: ${title}`}
        >
          <img
            src={poster}
            alt=""
            loading="lazy"
            className="size-full object-cover object-left-top"
          />
          <span className="absolute inset-0 bg-black/25 transition-colors group-hover:bg-black/15" />
          <span className="absolute left-1/2 top-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-background/95 text-foreground shadow-lg transition-transform group-hover:scale-105 sm:size-20">
            <IconPlayerPlayFilled size={28} className="translate-x-0.5" />
          </span>
        </button>
      )}
    </div>
  );
}
