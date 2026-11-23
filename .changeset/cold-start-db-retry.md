---
"@agent-native/core": patch
---

A function that wakes up before its database connection will hold now retries start-up (migrations and sign-in) instead of giving up for good, and no longer remembers a failed sign-in start.
