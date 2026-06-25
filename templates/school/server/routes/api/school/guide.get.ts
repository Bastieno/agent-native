import { defineEventHandler } from "h3";
import { resourceGetByPath, SHARED_OWNER } from "@agent-native/core/resources";

export default defineEventHandler(async () => {
  const resource = await resourceGetByPath(SHARED_OWNER, "SCHOOL_GUIDE.md");
  return {
    content: resource?.content ?? null,
    updatedAt: resource?.updatedAt ?? null,
  };
});
