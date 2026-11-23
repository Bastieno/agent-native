---
"@agent-native/core": minor
---

`createAgentChatPlugin({ mcpRefuseCaller })` / `MCPConfig.refuseCaller` turns a verified MCP caller away before anything is listed or run, with the app's own message (HTTP 403, JSON-RPC error).
