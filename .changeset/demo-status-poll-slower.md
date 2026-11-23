---
"@agent-native/core": patch
---

Check the demo-mode status every 15 seconds (slower again when the page is idle) instead of every 4, both in the fetch interceptor that every page installs and in the settings section. It changes rarely, and on a serverless host a steady four-second check from every open tab was a large share of an idle page's requests.
