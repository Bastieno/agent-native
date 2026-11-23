---
"@agent-native/core": patch
---

The agent panel asks the server for a screen refresh every 5 seconds (was 2) and for URL commands from the agent every 4 seconds (was 2), still slowing down for an idle page. Each ask is a function run on a serverless host, and the panel is on every page, so two-second polling from several open tabs used up a free hosting plan's CPU allowance.
