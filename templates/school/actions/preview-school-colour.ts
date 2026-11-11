import { defineAction } from "@agent-native/core";
import { currentAccess } from "@agent-native/core/sharing";
import { writeAppState } from "@agent-native/core/application-state";
import { getAppProductionUrl } from "@agent-native/core/server";
import { z } from "zod";
import { schoolAppUrl } from "../server/lib/school-host.js";
import { parsePrimary } from "../shared/theme-colour.js";

/**
 * Show a colour to one person before the school takes it.
 *
 * Nothing is saved: the app recolours itself for this person only, with a bar
 * to keep or drop it. Someone working from their own AI app has no screen to
 * recolour, so the result also carries a link that opens the school in that
 * colour. Only "Keep" saves it, and that goes through update-school-config's
 * checks.
 */
export default defineAction({
  description:
    "Show the person a colour in their own school before it is saved: the app recolours for them alone, with Keep and Undo. Always do this before changing the school's colour, then ask whether to keep it; save only when they say so. Give the link in the result to anyone not looking at the app. Accepts a hex code or three numbers.",
  schema: z.object({
    colour: z
      .string()
      .describe('A hex code such as "#1d6b3a", or "142 71% 35%".'),
  }),
  run: async ({ colour }) => {
    const { orgId } = currentAccess();
    if (!orgId) throw new Error("No school context.");
    const parsed = parsePrimary(colour);
    if (parsed.ok === false) throw new Error(parsed.message);
    await writeAppState("colour-preview", {
      primary: parsed.primary,
      primaryForeground: parsed.primaryForeground,
      note: parsed.note ?? null,
      at: Date.now(),
    });
    const appUrl = await schoolAppUrl(orgId, getAppProductionUrl());
    const link = `${appUrl.replace(/\/$/, "")}/admin?previewColour=${encodeURIComponent(parsed.primary)}`;
    return {
      previewing: true,
      colour: parsed.primary,
      textColour: parsed.primaryForeground === "0 0% 100%" ? "white" : "dark",
      ...(parsed.note ? { note: parsed.note } : {}),
      link,
      next: "The app is showing it to this person now. Ask whether to keep it; keep it by saving the school's colour, or drop it by doing nothing. Give the link to anyone who is not looking at the app.",
    };
  },
});
