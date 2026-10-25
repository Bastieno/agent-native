/**
 * A school's own address sends and links as that school.
 *
 * The framework's password-reset and verification emails ask this for the
 * name to send as and the address to link to, given the host the request came
 * to. A host that is not a school's gets the deployment's defaults.
 */
import { setEmailBrandingResolver } from "@agent-native/core/server";
import { getOrgSetting } from "@agent-native/core/settings";
import { getDbExec } from "@agent-native/core/db";
import { orgForHost } from "../lib/school-host.js";

export default function emailBrandingPlugin() {
  setEmailBrandingResolver(async (host) => {
    const orgId = await orgForHost(host);
    if (!orgId) return null;
    const bare = host.replace(/:\d+$/, "");
    const local = bare === "localhost" || bare.endsWith(".localhost");
    const origin = `${local ? "http" : "https"}://${host}`;

    const config = (await getOrgSetting(orgId, "school-config")) as {
      name?: string;
    } | null;
    let name = config?.name?.trim() || "";
    if (!name) {
      const { rows } = await getDbExec().execute({
        sql: "SELECT name FROM organizations WHERE id = ? LIMIT 1",
        args: [orgId],
      });
      name = rows[0] ? String((rows[0] as any).name) : "";
    }
    return { origin, ...(name ? { name } : {}) };
  });
}
