---
"@agent-native/core": minor
---

Cut the agent's prompt cost: `actionsInPrompt: false` stops listing every action as text when the actions already go to the model as tools; the time and current screen now follow the cached part of the system prompt, so it caches across turns; an app's request gate can return `deferTool` to keep tools out of the prompt until tool-search finds them (Anthropic deferred loading); and the Anthropic catalog and cost table know Claude Opus 5.5, Sonnet 5.5 and Haiku 5.5. Set `AGENT_USAGE_LOG=1` to log each model step's tokens.
