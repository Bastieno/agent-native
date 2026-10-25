---
"@agent-native/core": patch
---

The agent chat plugin returns its init promise so apps that wrap it can hold requests until the actions and MCP routes are mounted.
