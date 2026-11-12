import {
  createError,
  defineEventHandler,
  getRouterParam,
  setResponseHeader,
} from "h3";
import { withRequestAccess } from "../../../../lib/route-access.js";
import { rows } from "../../../../lib/sql.js";

/** A stored receipt image or PDF, for the signed-in member's own org only. */
export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id") ?? "";
  return withRequestAccess(event, async (orgId) => {
    const [file] = await rows(
      `SELECT mime_type, data_base64 FROM receipt_files WHERE org_id = ? AND id = ?`,
      [orgId, id],
    );
    if (!file)
      throw createError({ statusCode: 404, statusMessage: "Not found" });
    setResponseHeader(event, "Content-Type", file.mime_type);
    setResponseHeader(event, "Cache-Control", "private, max-age=3600");
    return Buffer.from(file.data_base64, "base64");
  });
});
