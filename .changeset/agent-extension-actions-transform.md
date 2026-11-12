---
"@agent-native/core": minor
---

Add `transformExtensionActions` to `createAgentChatPlugin`, so a template can wrap the framework's extension actions (`create-extension`, `update-extension`, …) with its own role check before the agent sees them.
