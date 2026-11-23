---
"@agent-native/core": minor
---

Add `overlayBreakpointPx` to `AgentSidebar`: the width at or below which the agent panel becomes an overlay with a backdrop instead of taking space in the layout (default 767). Apps whose own chrome is wide — a nav sidebar plus a dense main column — are squeezed long before a phone width and can now overlay earlier, pairing it with `AgentToggleButton`.
