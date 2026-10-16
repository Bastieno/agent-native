---
"@agent-native/core": minor
---

`prepareRequest` on the agent chat plugin can now return `model` to force the turn's model (ignoring the client's model and engine picks) or `reply` to answer with a fixed message without calling a model. `BUILDER_DEFAULT_MODEL` and `BUILDER_SUPPORTED_MODELS` are exported from `@agent-native/core/server`.

Agent chat responses now carry an `X-Agent-Model` header naming the model the turn ran on.

`AgentSidebar` and `AgentPanel` take `showModelSelector` (default true). When false, the composer shows no model picker, the model list is not fetched, and no model is sent with a message — for apps that choose the model on the server.

`AgentSidebar` and `AgentPanel` also take `showWorkspace` and `showSettings` (default true) to hide the Workspace tab and the settings gear; a saved or requested mode for a hidden area falls back to the chat. Setting the global agent engine (`manage-agent-engine` action "set") and `POST /_agent-native/agent-engine/disconnect` now require an org owner or admin when called by a signed-in user; previously any member could change or remove the engine for the whole deployment.

`prepareRequest` can also return `toolFilter(name)` to narrow a request's tools (e.g. by role): a filtered-out tool is neither offered to the model nor run if named, and `tool-search` is rebuilt over the remaining tools so it cannot surface it.

New `runGate` option on `createAgentChatPlugin`: every agent run that is not a chat message (sub-agents, automations, scheduled jobs, integrations, A2A and MCP calls) asks it first and it may refuse with a reply, force the model or narrow the tools. Continuations of a run are gated once. An app-forced model now also holds for `@`-mentioned custom agents and over experiment model variants.
