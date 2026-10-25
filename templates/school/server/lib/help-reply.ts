import { actorForEmail } from "./class-access.js";
import { capabilitiesFor, helpRoleOf } from "../../shared/capabilities.js";
import { confidentAnswer } from "../../shared/help-search.js";

/**
 * A free answer to "how do I…?", or null to let the assistant take it.
 *
 * Only for staff, and only when one Help entry is a clear winner for a plain
 * how-to question. Anything about the school's own data, any request to do
 * something, and any doubtful match goes to the assistant as before. A learner
 * is never answered here: they keep their tutor, and the tutor's rules.
 */
export async function freeHelpReply(
  ownerEmail: string | null,
  message: string,
): Promise<string | null> {
  if (!ownerEmail) return null;
  const actor = await actorForEmail(ownerEmail);
  const role = helpRoleOf(actor?.schoolRole);
  if (!actor || !role || role === "student") return null;

  const caps = capabilitiesFor(role, {
    coordinator: actor.schoolRole === "subject_coordinator",
  });
  const hit = confidentAnswer(message, caps);
  if (!hit) return null;

  const page = hit.where?.[role];
  const lines = [
    `**${hit.title}**`,
    "",
    hit.summary,
    "",
    ...hit.steps.map((s, i) => `${i + 1}. ${s}`),
    "",
  ];
  if (hit.aiApp) {
    lines.push(
      "This is best done from your own AI app. Press **Your AI app** or open Help to connect it.",
      "",
    );
  }
  lines.push(
    `${page ? `You will find it at [${page}](${page}). ` : ""}The full entry is in [Help](/${role}/help#help-${hit.id}). If that is not what you meant, ask again with a bit more detail and I will look into it.`,
  );
  return lines.join("\n");
}
