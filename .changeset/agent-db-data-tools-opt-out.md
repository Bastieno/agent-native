---
"@agent-native/core": minor
---

Add `disableDbDataTools` to `createAgentChatPlugin`: drops the generic `db-query`, `db-exec` and `db-patch` agent tools (keeping `db-schema`) for apps where org-scoped SQL is too coarse — e.g. a school, where any signed-in student would otherwise be able to read every other student's rows.
