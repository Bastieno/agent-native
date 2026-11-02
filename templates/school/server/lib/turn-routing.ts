/**
 * Which staff messages are quick enough for the school's cheap model.
 *
 * Most of what a head or teacher sends is a question: who has not prepared
 * this week, what is on Tuesday, take me to the gradebook. Those need the
 * school's tools, not judgement, and run well on the cheapest model at about a
 * twentieth of the price. Writing, marking, planning, setting up and anything
 * that changes the school's data stay on the role's own model.
 *
 * The rule is deliberately narrow, because a wrong guess costs quality where a
 * missed one only costs money: a message is quick only when it reads as a
 * question or a request to see something, is short, carries no attachment,
 * and asks for nothing to be made, changed, marked or judged. A bare "yes" or
 * "go ahead" is never quick: it usually carries out a plan the assistant just
 * proposed.
 */

/** Opens like a question or a request to look at something. */
const ASKS =
  /^(who|what|whats|what's|when|where|which|whose|how (many|much|is|are|do|does|did|far)|is|are|was|were|do|does|did|has|have|had|can i|could i|show|list|open|go to|take me|find|tell me|remind me)\b/i;

/**
 * Asks for something to be made, changed, marked or judged. Matched anywhere,
 * so "can I see why…" or "what should I write…" stay on the role's model.
 */
const WORK =
  /\b(write|rewrite|draft|generate|create|make|build|design|prepare|plan|set ?up|import|mark|grade|score|rubric|feedback|comment|publish|issue|invite|enrol|enroll|assign|schedule|move|change|update|add|remove|delete|cancel|fix|edit|rename|reset|accept|discard|approve|send|share|close|reopen|finali[sz]e|copy|suggest|recommend|should|why|explain|analy[sz]e|compare|evaluate|improve|summari[sz]e|worksheet|quiz|lesson note|scheme of work|curriculum|syllabus|report card|handout|pdf|timetable for)\b/i;

const MAX_QUICK_LENGTH = 240;

export function isQuickStaffMessage(
  message: string | undefined,
  hasAttachments = false,
): boolean {
  if (!message || hasAttachments) return false;
  const text = message.trim();
  if (!text || text.length > MAX_QUICK_LENGTH) return false;
  if (!ASKS.test(text)) return false;
  return !WORK.test(text);
}
