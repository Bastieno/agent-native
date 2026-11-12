---
"@agent-native/core": minor
---

WhatsApp images and documents now reach the agent: the adapter parses `image` and `document` messages into attachment references, the integration handler fetches images and PDFs at processing time and passes them to the agent as content (other files become a text line with their media id), and `fetchIntegrationAttachment` lets app actions download a referenced file.
