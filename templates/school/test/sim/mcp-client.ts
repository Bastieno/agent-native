/**
 * Talking to the school over remote MCP, as an AI app does: OAuth client
 * registration, PKCE and consent for a signed-in person, then JSON-RPC tool
 * calls with the token. Shared by the MCP setup journey and the assistant
 * access scenario.
 */
import { createHash, randomBytes } from "node:crypto";

const BASE = process.env.SCHOOL_URL ?? "http://localhost:8132";
export const MCP_URL = `${BASE}/_agent-native/mcp`;
const REDIRECT_URI = "http://localhost:9/callback";

/** OAuth authorization code + PKCE, as an MCP client does it. */
export async function connect(
  cookie: string,
  clientName: string,
): Promise<string> {
  const reg = await fetch(`${BASE}/_agent-native/mcp/oauth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_name: clientName,
      redirect_uris: [REDIRECT_URI],
      token_endpoint_auth_method: "none",
    }),
  });
  if (!reg.ok) throw new Error(`client registration: ${reg.status}`);
  const { client_id } = (await reg.json()) as { client_id: string };

  const verifier = randomBytes(32).toString("base64url");
  const challenge = createHash("sha256").update(verifier).digest("base64url");
  const params = new URLSearchParams({
    response_type: "code",
    client_id,
    redirect_uri: REDIRECT_URI,
    resource: MCP_URL,
    scope: "mcp:read mcp:write",
    state: "journey",
    code_challenge: challenge,
    code_challenge_method: "S256",
  });
  const consent = await fetch(
    `${BASE}/_agent-native/mcp/oauth/authorize?${params}`,
    { headers: { cookie } },
  );
  const page = await consent.text();
  const fields: Record<string, string> = {};
  for (const m of page.matchAll(
    /<input[^>]*name="([^"]+)"[^>]*value="([^"]*)"/g,
  )) {
    fields[m[1]] = m[2].replace(/&amp;/g, "&").replace(/&quot;/g, '"');
  }
  if (!fields.consent_token) {
    throw new Error(
      `no consent page (${consent.status}): ${page.slice(0, 200)}`,
    );
  }

  const approve = await fetch(`${BASE}/_agent-native/mcp/oauth/authorize`, {
    method: "POST",
    redirect: "manual",
    headers: {
      cookie,
      origin: BASE,
      // What the browser sends when the head presses Approve on the page.
      "sec-fetch-site": "same-origin",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ ...fields, decision: "approve" }),
  });
  const location = approve.headers.get("location") ?? "";
  const code = new URL(location, BASE).searchParams.get("code");
  if (!code) {
    throw new Error(
      `no authorization code (${approve.status}): ${(await approve.text()).slice(0, 300)}`,
    );
  }

  const token = await fetch(`${BASE}/_agent-native/mcp/oauth/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: REDIRECT_URI,
      client_id,
      code_verifier: verifier,
      resource: MCP_URL,
    }),
  });
  if (!token.ok)
    throw new Error(`token: ${token.status} ${await token.text()}`);
  return ((await token.json()) as { access_token: string }).access_token;
}

let rpcId = 0;
export async function mcp(
  accessToken: string,
  method: string,
  params: unknown,
) {
  const res = await fetch(MCP_URL, {
    method: "POST",
    headers: {
      authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      accept: "application/json, text/event-stream",
    },
    body: JSON.stringify({ jsonrpc: "2.0", id: ++rpcId, method, params }),
  });
  const text = await res.text();
  const body = text.startsWith("{")
    ? text
    : (text
        .split("\n")
        .filter((l) => l.startsWith("data:"))
        .map((l) => l.slice(5).trim())
        .pop() ?? "");
  const parsed = JSON.parse(body);
  if (parsed.error) throw new Error(`${method}: ${parsed.error.message}`);
  return parsed.result;
}

export async function tool(accessToken: string, name: string, args: unknown) {
  const result = await mcp(accessToken, "tools/call", {
    name,
    arguments: args,
  });
  const text = (result?.content ?? [])
    .map((c: { text?: string }) => c.text ?? "")
    .join("\n");
  return { isError: !!result?.isError, text };
}
