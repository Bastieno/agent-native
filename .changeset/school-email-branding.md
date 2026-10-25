---
"@agent-native/core": patch
---

Apps serving several organisations on their own hosts can register an email branding resolver, so password-reset and verification emails link to the organisation's own address and are sent under its name, and auth requests from that address are no longer refused as an invalid origin.
