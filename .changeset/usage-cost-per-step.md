---
"@agent-native/core": patch
---

Token usage cost is added up per model step instead of priced from a run's summed tokens, so Haiku 5.5's long-prompt price (over 100k prompt tokens, $0.50 / $2.50 per million) applies to the requests it belongs to. `recordUsage` accepts `costCentsX100`, and `AgentLoopUsage` carries it.
