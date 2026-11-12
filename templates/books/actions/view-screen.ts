/**
 * See what the user is currently looking at on screen.
 *
 * Reads and returns the current navigation state from application state.
 *
 * Usage:
 *   pnpm action view-screen
 */

import { defineAction } from "@agent-native/core";
import { readAppState } from "@agent-native/core/application-state";
import { z } from "zod";

export default defineAction({
  description:
    "See what the user is currently looking at on screen. Returns the current navigation state. Always call this first before taking any action.",
  schema: z.object({}),
  http: false,
  readOnly: true,
  run: async () => {
    const navigation = await readAppState("navigation");

    const screen: Record<string, unknown> = {};
    if (navigation) screen.navigation = navigation;
    const nav = (navigation ?? {}) as {
      view?: string;
      expenseCode?: string;
      digestId?: string;
    };
    if (nav.expenseCode)
      screen.selected = {
        expenseCode: nav.expenseCode,
        hint: "update-expense works on this code",
      };
    if (nav.digestId)
      screen.selected = {
        digestId: nav.digestId,
        hint: "get-digest returns its figures",
      };
    screen.views = "today, expenses, sales, reports, settings";

    if (Object.keys(screen).length === 0) {
      return "No application state found. Is the app running?";
    }
    return screen;
  },
});
