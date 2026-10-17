---
"@agent-native/core": patch
---

Honour `submit: false` in `sendToAgentChat`: the message is now placed in the composer for the user to review instead of being sent. Previously the chat panel ignored the flag and started a run, so every caller asking for a draft paid for a model call it never intended.
