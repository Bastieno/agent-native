import type { CardBlock } from "./activity-content.js";
import { nanoid } from "nanoid";

/**
 * A card's identity.
 *
 * Everything else in an activity is addressed by position — fine for a
 * worksheet, answered once. A card is met again and again over weeks, so a
 * record of "I knew this one" has to survive the deck being reordered or
 * added to. By position it would not: every learner's history would shift
 * by one and point at a question they never saw.
 *
 * So a card carries an id from the moment it is written, stamped by
 * whichever action writes it. A card without one is not given a made-up
 * identity: nothing is recorded against it, which shows up as missing data
 * rather than as one card's history quietly attached to another.
 */
export function cardKey(block: CardBlock): string | null {
  return block.id ?? null;
}

/**
 * The same blocks, with an id on every card that lacks one.
 *
 * Called by every path that writes a card — created, rewritten, or patched
 * — so a deck cannot come into being without identities. Existing ids are
 * never replaced: that is the whole point of them.
 */
export function withCardIds<T>(
  shape: string | null | undefined,
  blocks: T[],
): T[] {
  if (shape !== "cards" || !Array.isArray(blocks)) return blocks;
  return blocks.map((b: any) =>
    b && typeof b === "object" && !b.id ? { ...b, id: nanoid(10) } : b,
  );
}
