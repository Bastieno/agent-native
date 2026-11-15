/** One transcribed word, in audio time. */
export interface Word {
  text: string;
  startMs: number;
  endMs: number;
}
/** Where a script line sits in the audio. */
export interface LineSpan {
  index: number;
  startMs: number;
  endMs: number;
}

const ONES =
  "zero one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen".split(
    " ",
  );
const TENS = "_ _ twenty thirty forty fifty sixty seventy eighty ninety".split(
  " ",
);
function numberWords(n: number): string[] {
  if (n < 20) return [ONES[n]];
  return [TENS[Math.floor(n / 10)], ...(n % 10 ? [ONES[n % 10]] : [])];
}

/** Lowercase tokens with punctuation gone and small numbers spelled out. */
export function tokens(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .split(" ")
    .filter(Boolean)
    .flatMap((t) => (/^\d{1,2}$/.test(t) ? numberWords(Number(t)) : [t]));
}

const MIN_SCORE = 0.75;

interface Cand {
  start: number; // token index
  end: number; // token index of last matched token
  score: number;
}

/** Candidate places a line is spoken: windows that match at least 75% of its words in order. */
function candidates(line: string[], heard: string[]): Cand[] {
  const n = line.length;
  const out: Cand[] = [];
  const span = Math.ceil(n * 1.4) + 2;
  for (let s = 0; s < heard.length; s++) {
    // A take starts on one of the line's first two words, and that word is part of the match.
    const k0 = heard[s] === line[0] ? 1 : heard[s] === line[1] ? 2 : 0;
    if (!k0) continue;
    const rest = line.slice(k0);
    const win = heard.slice(s + 1, s + span);
    const r = rest.length,
      m = win.length;
    const dp = Array.from({ length: r + 1 }, () =>
      new Array<number>(m + 1).fill(0),
    );
    for (let i = 1; i <= r; i++)
      for (let j = 1; j <= m; j++)
        dp[i][j] =
          rest[i - 1] === win[j - 1]
            ? dp[i - 1][j - 1] + 1
            : Math.max(dp[i - 1][j], dp[i][j - 1]);
    const score = (1 + dp[r][m]) / n;
    if (score < MIN_SCORE) continue;
    // The earliest place the best match is complete, so one take never reaches into the next.
    let jEnd = 0;
    while (dp[r][jEnd] < dp[r][m]) jEnd++;
    // A take is said in one go: matches strung across a pause and a restart are not one take.
    if (jEnd + 1 > Math.ceil(n * 1.3)) continue;
    out.push({ start: s, end: s + jEnd, score });
  }
  return out;
}

/** Group overlapping candidates into takes; each take is its best-scoring candidate. */
function takes(cands: Cand[]): Cand[] {
  const out: Cand[] = [];
  let group: Cand[] = [];
  let reach = -1;
  const flush = () => {
    if (group.length)
      out.push(
        group.reduce((a, b) =>
          b.score > a.score ||
          (b.score === a.score && b.end - b.start < a.end - a.start)
            ? b
            : a,
        ),
      );
    group = [];
  };
  for (const c of cands) {
    if (group.length && c.start > reach) flush();
    group.push(c);
    reach = Math.max(reach, c.end);
  }
  flush();
  return out;
}

/**
 * Find each script line in the transcript. A line said twice keeps its last
 * take; words between lines (filler, false starts) are left out. A line that
 * cannot be found stops the run, naming it, rather than guessing.
 */
export function alignLines(lines: string[], words: Word[]): LineSpan[] {
  const heard: string[] = [];
  const wordOf: number[] = [];
  words.forEach((w, wi) =>
    tokens(w.text).forEach((t) => {
      heard.push(t);
      wordOf.push(wi);
    }),
  );
  const perLine = lines.map((l) => takes(candidates(tokens(l), heard)));
  const spans: LineSpan[] = [];
  let after = -1;
  for (let i = 0; i < lines.length; i++) {
    const ours = perLine[i].filter((c) => c.start > after);
    if (!ours.length) {
      throw new Error(
        `Line ${i + 1} was not found in the audio: "${lines[i]}". Say it again (or check the audio and script match) and re-run.`,
      );
    }
    // The next line's earliest take after our first take marks where we must stop.
    const first = ours[0];
    const next = perLine[i + 1]?.find((c) => c.start > first.end);
    const limit = next ? next.start : Infinity;
    const usable = ours.filter((c) => c.end < limit);
    const pick = usable.at(-1) ?? first;
    spans.push({
      index: i,
      startMs: words[wordOf[pick.start]].startMs,
      endMs: words[wordOf[pick.end]].endMs,
    });
    after = pick.end;
  }
  return spans;
}
