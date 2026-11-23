---
"@agent-native/core": patch
---

Add `setRequestSessionOrg(event, orgId)` so a host that knows which organization a request is for (an organization's own address) can pin it for that request, instead of every request in a multi-organization account being answered for whichever organization was written to the shared active-organization setting last.
