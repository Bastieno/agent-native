---
"@agent-native/core": patch
---

WhatsApp webhook verification works: GET requests to `/_agent-native/integrations/:platform/webhook` now reach the adapter's challenge handshake instead of returning 404.
