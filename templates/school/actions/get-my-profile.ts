import { defineAction } from "@agent-native/core";
import { getOrgSetting } from "@agent-native/core/settings";
import { currentAccess } from "@agent-native/core/sharing";
import { z } from "zod";
import { actorForEmail } from "../server/lib/class-access.js";
import { roleWord } from "../server/lib/lesson-attribution.js";
import { getUserLabels } from "../server/lib/user-names.js";
import { realNameOrNull } from "../shared/person-name.js";

/**
 * Who the signed-in person is: their name, their place in the school, and the
 * school. An outside AI app is connected to a school account that may not be
 * the account the person uses for the app itself, so "what am I signed in as?"
 * has to be answerable from here.
 */
export default defineAction({
  description:
    "Who the signed-in person is in this school: their name, their role (admin, teacher, learner...) and the school's name. Use it to answer 'who am I signed in as?' or before saying what someone may do.",
  schema: z.object({}),
  http: { method: "GET" },
  readOnly: true,
  run: async () => {
    const { userEmail, orgId } = currentAccess();
    if (!userEmail) throw new Error("Not signed in.");
    const actor = await actorForEmail(userEmail);
    const schoolId = actor?.schoolId ?? orgId ?? null;
    const labels = actor ? await getUserLabels([actor.userId]) : {};
    const label = actor ? labels[actor.userId] : undefined;
    const name = realNameOrNull(label?.name, userEmail);
    const config = schoolId
      ? ((await getOrgSetting(schoolId, "school-config")) as any)
      : null;
    const school: string | null =
      config?.theme?.displayName ?? config?.name ?? null;
    const role = roleWord(actor?.schoolRole ?? null);
    return {
      name,
      email: userEmail,
      role,
      school,
      message: `Signed in as ${name ?? userEmail}${role ? `, ${role}` : ""}${school ? ` at ${school}` : ""}.`,
    };
  },
});
