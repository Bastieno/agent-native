---
"@agent-native/core": patch
---

Skip re-running migrations on a dev reload when this process has already applied them, so an edit to a server file no longer stalls the dev server behind a locked SQLite database.
