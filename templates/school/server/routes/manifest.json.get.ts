import { defineEventHandler, getRequestHost, setHeader } from "h3";
import { getOrgSetting } from "@agent-native/core/settings";
import { orgForHost } from "../lib/school-host.js";

/** A home-screen label: the name if it fits, else its first words that do. */
function shortName(name: string): string {
  if (name.length <= 12) return name;
  let out = "";
  for (const word of name.split(/\s+/)) {
    const next = out ? `${out} ${word}` : word;
    if (next.length > 12) break;
    out = next;
  }
  return out || name.slice(0, 12);
}

/**
 * What the phone calls the app when it is put on the home screen. A school at
 * its own address gets its own name; anywhere else it is just "School".
 */
export default defineEventHandler(async (event) => {
  const host = getRequestHost(event, { xForwardedHost: true });
  let name = "School";
  const orgId = await orgForHost(host);
  if (orgId) {
    const config = (await getOrgSetting(orgId, "school-config")) as {
      name?: string;
      theme?: { displayName?: string };
    } | null;
    name = config?.theme?.displayName?.trim() || config?.name?.trim() || name;
  }
  setHeader(event, "Content-Type", "application/manifest+json");
  setHeader(event, "Cache-Control", "public, max-age=300");
  return {
    name,
    short_name: shortName(name),
    description: "Classes, work and notices from your school",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#111111",
    theme_color: "#2563EB",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
});
