import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { getDb, schema } from "../server/db/index.js";
import { eq } from "drizzle-orm";
import { z } from "zod";

/** Below this many learners, a card's numbers describe people, not a class. */
const MIN_LEARNERS = 3;

/**
 * Which cards a class finds hard — as a class, never as names.
 *
 * This is a teaching signal, not attainment: "eleven of fourteen missed
 * Brownian motion" says reteach it, not that eleven children have failed
 * something. The verdicts behind it are self-reports, so they are reported
 * as what they are and never leave this shape.
 *
 * Nothing is shown until a few learners have practised a card. Below that
 * the aggregate is just one child's practice with the arithmetic done, and a
 * teacher could read a name off it by knowing who had opened the deck.
 */
export default defineAction({
  description:
    "How a class is faring on each card of a deck — how often learners said they did not know it. A teaching signal drawn from learners' own verdicts, never a mark, and never per learner. Stays quiet until enough of the class has practised a card.",
  schema: z.object({
    assessmentId: z.string().describe("The card deck"),
  }),
  http: { method: "GET" },
  run: async (args) => {
    const { orgId } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const db = getDb();

    const rows = await db
      .select({
        cardKey: schema.cardReviews.cardKey,
        rating: schema.cardReviews.rating,
        studentId: schema.cardReviews.studentId,
      })
      .from(schema.cardReviews)
      .where(eq(schema.cardReviews.assessmentId, args.assessmentId));

    const byCard = new Map<
      string,
      { looks: number; missed: number; learners: Set<string> }
    >();
    for (const r of rows as any[]) {
      const entry = byCard.get(r.cardKey) ?? {
        looks: 0,
        missed: 0,
        learners: new Set<string>(),
      };
      entry.looks++;
      if (r.rating === "missed") entry.missed++;
      entry.learners.add(r.studentId);
      byCard.set(r.cardKey, entry);
    }

    const cards = [...byCard.entries()]
      .filter(([, e]) => e.learners.size >= MIN_LEARNERS)
      .map(([cardKey, e]) => ({
        cardKey,
        learners: e.learners.size,
        looks: e.looks,
        missed: e.missed,
        missedShare: Math.round((e.missed / e.looks) * 100),
      }))
      .sort((a, b) => b.missedShare - a.missedShare);

    const waiting = byCard.size - cards.length;
    return {
      cards,
      message: cards.length
        ? `${cards.length} card(s) have been practised by at least ${MIN_LEARNERS} learners. Hardest first, by how often they said they did not know it. These are the learners' own verdicts on themselves, not marks — useful for deciding what to go over again.`
        : `No card has been practised by ${MIN_LEARNERS} learners yet${
            waiting ? `; ${waiting} card(s) have been practised by fewer` : ""
          }, so there is nothing a class-wide number could honestly say.`,
    };
  },
});
