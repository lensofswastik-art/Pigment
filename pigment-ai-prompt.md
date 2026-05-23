# Pigment — AI Prompt for Token Generation

> Copy the prompt below and paste it into Claude, ChatGPT, or any AI.
> Fill in your brand colors at the bottom before sending.

---

## Prompt (copy everything below this line)

---

Generate a design token JSON for a Figma plugin called Pigment.

Two top-level keys required: "primitives" and "semantics".

Primitives — raw hex values, nested by color name and scale:
- No references, only hex codes
- Example: "gray": { "10": "#F9F9FB", "50": "#9090A0", "100": "#0D0D0D" }

Semantics — usage-based aliases that reference primitives:
- Use this syntax: {primitive.colorName.scale}
- Example: "brand": { "primary": "{primitive.purple.500}" }
- Group by usage: brand, neutral (bg/border/text), status, surface

My colors:

[List your brand colors here — name and hex value]
Example format:
- Primary: #7C4EF0 (purple)
- Gray scale: #F9F9FB (lightest) → #0D0D0D (darkest)
- Success: #22C55E
- Error: #EF4444
- Warning: #F97316

Generate a complete token file covering brand, neutral, status, and text groups.
Output JSON only — no explanation.

---
