import type { Capability } from "./capabilities.js";

/**
 * Keyword search over the capability list. No model, no embeddings, no
 * network: it runs the same in the browser and on the server, which is what
 * lets the Help page and the assistant answer "how do I…?" for free.
 */

const STOP = new Set([
  "a",
  "an",
  "the",
  "i",
  "me",
  "my",
  "we",
  "our",
  "you",
  "your",
  "to",
  "of",
  "in",
  "on",
  "for",
  "and",
  "or",
  "is",
  "are",
  "be",
  "do",
  "does",
  "did",
  "can",
  "could",
  "would",
  "should",
  "how",
  "what",
  "where",
  "when",
  "why",
  "which",
  "who",
  "it",
  "this",
  "that",
  "with",
  "from",
  "about",
  "there",
  "any",
  "some",
  "please",
  "has",
  "have",
  "had",
  "was",
  "were",
  "been",
  "not",
  "than",
  "then",
  "just",
  "want",
  "need",
  "get",
  "make",
  "use",
  "way",
  "able",
  "app",
  "school",
]);

/** Words people use for the same thing. */
const SYNONYMS: Record<string, string> = {
  student: "learner",
  pupil: "learner",
  kid: "learner",
  child: "learner",
  homework: "work",
  assignment: "work",
  test: "quiz",
  exam: "quiz",
  teachers: "teacher",
  mark: "marking",
  grade: "marking",
  grading: "marking",
  timetable: "timetable",
  schedule: "timetable",
  handout: "pdf",
  doc: "pdf",
  document: "pdf",
  flashcard: "card",
  flashcards: "card",
  claude: "ai",
  chatgpt: "ai",
  gpt: "ai",
  mcp: "ai",
  connector: "ai",
};

function stem(word: string): string {
  let w = word;
  if (w.length > 5 && w.endsWith("ing")) w = w.slice(0, -3);
  else if (w.length > 4 && w.endsWith("es")) w = w.slice(0, -2);
  else if (w.length > 3 && w.endsWith("s") && !w.endsWith("ss"))
    w = w.slice(0, -1);
  else if (w.length > 4 && w.endsWith("ed")) w = w.slice(0, -2);
  return SYNONYMS[w] ?? SYNONYMS[word] ?? w;
}

export function tokens(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w && !STOP.has(w))
    .map(stem);
}

export interface Scored {
  capability: Capability;
  score: number;
}

/** Capabilities ranked for a query, best first. Empty when nothing matches. */
export function searchCapabilities(
  query: string,
  caps: Capability[],
): Scored[] {
  const q = tokens(query);
  if (q.length === 0) return [];
  const lowered = query.toLowerCase();
  const out: Scored[] = [];
  for (const capability of caps) {
    const title = new Set(tokens(capability.title));
    const keywords = new Set(capability.keywords.flatMap((k) => tokens(k)));
    const summary = new Set(tokens(capability.summary));
    const group = new Set(tokens(capability.group));
    const steps = new Set(capability.steps.flatMap((s) => tokens(s)));
    let score = 0;
    for (const t of q) {
      if (title.has(t)) score += 3;
      if (keywords.has(t)) score += 3;
      if (summary.has(t)) score += 1;
      if (group.has(t)) score += 1;
      if (steps.has(t)) score += 0.5;
    }
    // A whole keyword phrase said in the question is a strong signal.
    for (const k of capability.keywords) {
      if (k.includes(" ") && lowered.includes(k)) score += 4;
    }
    if (score > 0) out.push({ capability, score: score / Math.sqrt(q.length) });
  }
  return out.sort((a, b) => b.score - a.score);
}

/** Whether a message is asking how the app works rather than about the school's data. */
export function isHowToQuestion(message: string): boolean {
  const text = message.trim().toLowerCase();
  if (text.length === 0 || text.length > 220) return false;
  if (text.split(/\s+/).length > 28) return false;
  return /^(how (do|can|to|would|should)|how does|where (do|can|is|are)|what can|what is the (way|best way)|can (i|we|the app|it) |is there a way|does (the|this) (app|school)|do (i|we) (have to|need to)|what does)/.test(
    text,
  );
}

/**
 * The one capability that answers this question, or null when unsure. Unsure
 * is the common, safe case: the question then goes to the assistant as usual.
 */
export function confidentAnswer(
  message: string,
  caps: Capability[],
): Capability | null {
  if (!isHowToQuestion(message)) return null;
  const ranked = searchCapabilities(message, caps);
  const [best, next] = ranked;
  if (!best || best.score < 3.2) return null;
  if (next && best.score < next.score * 1.35) return null;
  return best.capability;
}
