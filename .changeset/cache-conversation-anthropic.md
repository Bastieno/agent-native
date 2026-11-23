---
"@agent-native/core": minor
---

Cache the conversation, not only the instructions and tools, on Anthropic runs: the end of the last message and of the user message before it are marked, so each step of a multi-step run reads the earlier history from the cache instead of paying for it at full price again.
