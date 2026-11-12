import { defineAction } from "@agent-native/core";
import { z } from "zod";
import { ownerOrg } from "../server/lib/access.js";
import { daysWithItems, setItemCategory } from "../server/lib/catalog.js";
import { reconcileDays } from "../server/lib/reconcile-days.js";

export default defineAction({
  description:
    "Set an item's Moniebook category (e.g. Heineken Can → Drinks). When you are guessing from the name, pass confirmed: false so the owner sees it to confirm.",
  schema: z.object({
    itemName: z.string(),
    category: z.string(),
    confirmed: z.boolean().default(true),
  }),
  run: async ({ itemName, category, confirmed }) => {
    const orgId = await ownerOrg();
    await setItemCategory(
      orgId,
      itemName,
      category,
      confirmed ? "owner" : "agent",
      confirmed,
    );
    await reconcileDays(orgId, await daysWithItems(orgId, [itemName]));
    return { itemName, category, confirmed };
  },
});
