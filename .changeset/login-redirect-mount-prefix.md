---
"@agent-native/core": patch
---

Login redirects keep an app's mount prefix: a signed-out visitor to a mounted app is sent to that app's own `/login`, and a signed-in visitor to `/login` without a `return` goes to the app's base path instead of `/`.
