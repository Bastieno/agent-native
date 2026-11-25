---
"@agent-native/core": patch
---

WhatsApp replies convert the agent's Markdown to WhatsApp's own formatting (`**bold**` to `*bold*`, headings to bold lines, `- ` bullets to `•`, links to `label (url)`), so messages no longer show stray asterisks.
