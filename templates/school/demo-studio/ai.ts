import type { Action } from "./types.js";

/**
 * Ask the school's real assistant something and wait for its whole answer.
 *
 * Pass `nth` as the number of questions asked so far in this chat (1 for the
 * first): the 👍 button under each finished answer is how the end is seen, so
 * the Nth one means the Nth answer is complete. Mark the step `cut: true` to
 * keep the answer and drop the waiting. A run that never finishes fails the
 * take (default 3 minutes); nothing is made up.
 */
export function askAssistant(
  text: string,
  nth = 1,
  replyTimeoutMs = 180_000,
): Action[] {
  return [
    { do: "type", selector: ".tiptap >> nth=-1", text },
    { do: "press", key: "Enter" },
    {
      do: "waitFor",
      selector: 'role=button[name="Thumbs up"]',
      nth,
      timeoutMs: replyTimeoutMs,
    },
  ];
}
