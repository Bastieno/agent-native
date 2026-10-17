import { useEffect, useRef, useState } from "react";
import { IconClock } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

/**
 * The time a learner has left, counting down locally from a deadline the
 * server set.
 *
 * Local ticking rather than polling: a clock that only moves every two seconds
 * looks broken, and the deadline itself never changes once `start-activity` has
 * fixed it. The server stays the authority on whether work is accepted — this
 * is only the display.
 */
export function ActivityCountdown({
  deadline,
  onExpiring,
  onWarning,
}: {
  deadline: string;
  /** Fired once, a few seconds before zero, so work can be handed in. */
  onExpiring?: () => void;
  /** Fired once at the one-minute mark. */
  onWarning?: () => void;
}) {
  const [secondsLeft, setSecondsLeft] = useState(() => remaining(deadline));

  useEffect(() => {
    setSecondsLeft(remaining(deadline));
    const id = setInterval(() => setSecondsLeft(remaining(deadline)), 1000);
    return () => clearInterval(id);
  }, [deadline]);

  // Both fire at most once per activity, which is why they are latched on the
  // deadline rather than on the ticking value.
  const [warned, setWarned] = useState(false);
  const [expired, setExpired] = useState(false);
  // Only count as "ran out" if we watched it run out. Opening a page whose
  // time went long ago must not fire the hand-in — the server would refuse a
  // submission into a closed window, and the learner would be shown an error
  // for simply looking at old work.
  const sawItRunningRef = useRef(false);

  useEffect(() => {
    setWarned(false);
    setExpired(false);
    sawItRunningRef.current = false;
  }, [deadline]);

  useEffect(() => {
    if (secondsLeft > 5) sawItRunningRef.current = true;
    if (!sawItRunningRef.current) return;
    if (!warned && secondsLeft <= 60 && secondsLeft > 5) {
      setWarned(true);
      onWarning?.();
    }
    if (!expired && secondsLeft <= 5) {
      setExpired(true);
      onExpiring?.();
    }
  }, [secondsLeft, warned, expired, onWarning, onExpiring]);

  const urgent = secondsLeft <= 60;
  const low = secondsLeft <= 300 && !urgent;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium tabular-nums",
        urgent
          ? "bg-destructive/10 text-destructive"
          : low
            ? "bg-amber-500/10 text-amber-700 dark:text-amber-500"
            : "bg-muted text-muted-foreground",
      )}
      // Tablets are shared and read over shoulders; the label says what the
      // number means without relying on the icon alone.
      aria-label={`Time remaining: ${describe(secondsLeft)}`}
      role="timer"
    >
      <IconClock size={13} />
      {format(secondsLeft)}
    </span>
  );
}

function remaining(deadline: string): number {
  return Math.max(
    0,
    Math.round((new Date(deadline).getTime() - Date.now()) / 1000),
  );
}

function format(total: number): string {
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  return h > 0
    ? `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
    : `${m}:${String(s).padStart(2, "0")}`;
}

function describe(total: number): string {
  if (total <= 0) return "none";
  const m = Math.floor(total / 60);
  const s = total % 60;
  if (m === 0) return `${s} second${s === 1 ? "" : "s"}`;
  return `${m} minute${m === 1 ? "" : "s"}${s ? ` ${s} seconds` : ""}`;
}
