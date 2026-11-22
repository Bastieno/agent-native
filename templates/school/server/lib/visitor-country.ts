/**
 * Whether a visitor is in Nigeria, for choosing the landing page's edition.
 *
 * The server sits behind Caddy on its own box, so no host adds a country
 * header. Instead it reads Nigeria's IP ranges from a file kept on the box
 * (`NIGERIA_RANGES_FILE`, one `start,end` range per line, from DB-IP's free
 * country database, refreshed monthly by cron). Without the file every
 * visitor gets the US edition, which is also what crawlers see.
 */
import { BlockList, isIP } from "node:net";
import { readFile, stat } from "node:fs/promises";

/** How often to look for a refreshed file. */
const RECHECK_MS = 10 * 60 * 1000;

type Loaded = { list: BlockList; mtimeMs: number; checkedAt: number };
let loaded: Loaded | null = null;

async function load(path: string): Promise<BlockList> {
  const now = Date.now();
  if (loaded && now - loaded.checkedAt < RECHECK_MS) return loaded.list;
  const { mtimeMs } = await stat(path);
  if (loaded && loaded.mtimeMs === mtimeMs) {
    loaded.checkedAt = now;
    return loaded.list;
  }
  const list = new BlockList();
  let ranges = 0;
  for (const line of (await readFile(path, "utf8")).split("\n")) {
    const [start, end] = line.trim().split(",");
    if (!start || !end) continue;
    const kind = isIP(start);
    if (kind === 0 || isIP(end) !== kind) {
      throw new Error(`Not an IP range in ${path}: ${line}`);
    }
    list.addRange(start, end, kind === 4 ? "ipv4" : "ipv6");
    ranges++;
  }
  if (ranges === 0) throw new Error(`No IP ranges in ${path}`);
  loaded = { list, mtimeMs, checkedAt: now };
  return list;
}

/**
 * The client's address as Caddy reports it. Caddy trusts no proxy in front of
 * it, so it replaces any `X-Forwarded-For` a client sends with the address it
 * saw; the last entry is that address.
 */
function clientAddress(request: Request): string | null {
  const forwarded = request.headers.get("x-forwarded-for");
  const last = forwarded?.split(",").pop()?.trim();
  if (!last) return null;
  const ip = last.replace(/^::ffff:(?=\d+\.\d+\.\d+\.\d+$)/, "");
  return isIP(ip) ? ip : null;
}

/**
 * `true` or `false` when the visitor's address could be checked; `null` when
 * there is nothing to check against (no ranges file configured, or no client
 * address, as in local development). A configured file that cannot be read is
 * logged as an error, so a broken refresh shows up instead of quietly sending
 * every Nigerian visitor the US edition.
 */
export async function visitorInNigeria(
  request: Request,
): Promise<boolean | null> {
  const path = process.env.NIGERIA_RANGES_FILE?.trim();
  if (!path) return null;
  const ip = clientAddress(request);
  if (!ip) return null;
  try {
    const list = await load(path);
    return list.check(ip, isIP(ip) === 4 ? "ipv4" : "ipv6");
  } catch (err) {
    console.error(
      `[visitor-country] Cannot read Nigeria's IP ranges from ${path}:`,
      err,
    );
    return null;
  }
}
