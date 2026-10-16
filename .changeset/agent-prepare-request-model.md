---
"@agent-native/core": minor
---

`prepareRequest` on the agent chat plugin can now return `model` to force the turn's model (ignoring the client's model and engine picks) or `reply` to answer with a fixed message without calling a model. `BUILDER_DEFAULT_MODEL` and `BUILDER_SUPPORTED_MODELS` are exported from `@agent-native/core/server`.

Agent chat responses now carry an `X-Agent-Model` header naming the model the turn ran on.
