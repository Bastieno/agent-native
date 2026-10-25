---
"@agent-native/core": patch
---

Background polling slows down when nobody is at the page: the change poll, the appearance and agent-command checks, and the demo-mode flag wait up to eight times longer after a minute without input, and the demo flag is not requested at all in a hidden tab. A page in use polls as before.
