---
"@agent-native/core": minor
---

`createAuthPlugin({ allowSignUp })`: one rule for who may create an account, asked on every path that creates one (the email form, Better Auth social sign-in, identity SSO, and the generic Google route for addresses with no account). A refusal shows the rule's message and returns 403 from `/_agent-native/auth/register`.
