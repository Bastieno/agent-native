---
"@agent-native/core": minor
---

An app can register a managed-credential resolver (`setManagedCredentialResolver`) so an operator's own provider key serves organizations it has agreed to pay for. It is asked only after the user's and the org's own secrets, so a saved key always wins, and the engine status check sees it too.
