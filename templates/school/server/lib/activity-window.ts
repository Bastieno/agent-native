/**
 * When a piece of work is open to a learner, and until when.
 *
 * Three clocks can each close an activity, and they are not interchangeable:
 *
 *   opensAt / closesAt   the same for everyone — a window the teacher set
 *   durationMinutes      per learner, counted from the moment they started
 *   status "closed"      the teacher ending it by hand
 *
 * The timer a learner sees and the rule `submit-work` enforces are computed
 * here, from the same inputs, so a countdown reaching zero and a refused
 * submission always mean the same thing. Anything that decides whether work is
 * still accepted must come through `activityWindow`.
 */

export type ActivityTiming = {
  status?: string | null;
  opensAt?: string | null;
  closesAt?: string | null;
  durationMinutes?: number | null;
};

export type ActivityWindow = {
  /** The learner may work on it right now. */
  isOpen: boolean;
  /** Published, but its opening time has not arrived. */
  notYetOpen: boolean;
  /** Was open, is not any more. */
  hasClosed: boolean;
  /** Which clock closed it — for a message the learner can understand. */
  closedBy: "teacher" | "closing-time" | "time-allowed" | null;
  /** When this learner's time runs out, whichever clock comes first. */
  deadline: string | null;
  /** Seconds left, once they have started. Null when nothing limits them. */
  secondsRemaining: number | null;
  /** True once the clock is running for this learner. */
  started: boolean;
  /** Human explanation, or null while it is simply open. */
  reason: string | null;
};

/**
 * @param timing   the activity's own window
 * @param startedAt when this learner started, if they have
 * @param now      injectable for testing
 */
export function activityWindow(
  timing: ActivityTiming,
  startedAt?: string | null,
  now: Date = new Date(),
  /**
   * How this school writes a date. The reason a learner reads — "this
   * closed on …" — was formatted with no locale and no timezone, so it came
   * out in whatever the server happened to be set to: a Lagos learner could
   * be told their paper closed at an hour that was not the hour, written in
   * an order they do not use. The school's own locale and timezone are
   * passed in, and the month is spelled out so it cannot be misread.
   */
  school?: { locale?: string; timeZone?: string },
): ActivityWindow {
  const ms = now.getTime();

  const closedByTeacher = timing.status === "closed";

  const opensAt = timing.opensAt ? new Date(timing.opensAt) : null;
  const notYetOpen = !!opensAt && opensAt.getTime() > ms;

  const closesAt = timing.closesAt ? new Date(timing.closesAt) : null;
  const pastClosingTime = !!closesAt && closesAt.getTime() <= ms;

  // The per-learner clock only runs once they have started.
  const started = !!startedAt;
  const personalDeadline =
    started && timing.durationMinutes
      ? new Date(
          new Date(startedAt as string).getTime() +
            timing.durationMinutes * 60_000,
        )
      : null;
  const outOfTime = !!personalDeadline && personalDeadline.getTime() <= ms;

  // Whichever bites first is the one the learner should see counting down.
  const candidates = [closesAt, personalDeadline].filter(
    (d): d is Date => d !== null,
  );
  const deadline = candidates.length
    ? new Date(Math.min(...candidates.map((d) => d.getTime())))
    : null;

  const closedBy: ActivityWindow["closedBy"] = closedByTeacher
    ? "teacher"
    : pastClosingTime
      ? "closing-time"
      : outOfTime
        ? "time-allowed"
        : null;

  const reason = closedByTeacher
    ? "Your teacher has closed this."
    : pastClosingTime
      ? `This closed on ${sayWhen(closesAt!, school)}.`
      : outOfTime
        ? "Your time for this has run out."
        : notYetOpen
          ? `This opens on ${sayWhen(opensAt!, school)}.`
          : null;

  return {
    isOpen: !closedBy && !notYetOpen,
    notYetOpen,
    hasClosed: !!closedBy,
    closedBy,
    deadline: deadline ? deadline.toISOString() : null,
    secondsRemaining: deadline
      ? Math.max(0, Math.round((deadline.getTime() - ms) / 1000))
      : null,
    started,
    reason,
  };
}

/**
 * The message shown when a submission is refused. Kept beside the rule so the
 * learner is told which clock stopped them, not just that they are too late.
 */
export function closedMessage(title: string, w: ActivityWindow): string {
  switch (w.closedBy) {
    case "teacher":
      return `"${title}" has been closed by your teacher and is no longer accepting work.`;
    case "closing-time":
      return `"${title}" ${w.reason?.replace(/^This /, "").replace(/\.$/, "")} and is no longer accepting work.`;
    case "time-allowed":
      return `Your time for "${title}" has run out, so it can no longer be handed in.`;
    default:
      return `"${title}" is not accepting work at the moment.`;
  }
}

/** A moment, written the way this school writes one. */
function sayWhen(
  at: Date,
  school?: { locale?: string; timeZone?: string },
): string {
  try {
    return new Intl.DateTimeFormat(school?.locale || undefined, {
      dateStyle: "long",
      timeStyle: "short",
      timeZone: school?.timeZone || undefined,
    }).format(at);
  } catch {
    // An unusable locale or timezone must not stop a learner being told
    // their paper has closed.
    return at.toISOString();
  }
}
