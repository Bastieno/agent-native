---
"@agent-native/core": minor
---

MCP chat-app groundwork: `mcpApp: { compactCatalog: true }` now works without a UI resource, `MCPConfig.instructions` / `mcpInstructions` send server instructions on initialize, `MCPConfig.isToolListedForCaller` / `mcpToolFilter` filter `tools/list` per caller, MCP `ask_app` resolves the caller's own provider key, and `ask_app` / A2A runs record token usage under the `mcp-ask-app` / `a2a` labels.
