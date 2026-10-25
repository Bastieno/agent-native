import { createError, defineEventHandler } from "h3";
import { getSession } from "@agent-native/core/server";
import { pushPublicKey } from "../../../lib/push.js";

/** The public key a browser needs to subscribe. Null when push is not set up. */
export default defineEventHandler(async (event) => {
  const session = await getSession(event);
  if (!session?.email) {
    throw createError({ statusCode: 401, statusMessage: "Sign in" });
  }
  return { key: pushPublicKey() };
});
