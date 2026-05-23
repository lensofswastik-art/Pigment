# Pigment — UI Structure & Flow

## User Flow

```
Open Plugin
    ↓
[Screen 1 — Import]
Paste JSON  OR  Upload .json file
    ↓
[Hint — Accepted Format Guide]  (below input, always visible)
[Copy AI Prompt button]         (inline CTA to generate JSON via AI)
    ↓
Parse Tokens →
    ↓
[Screen 2 — Alpha Builder]
Select opacity stops per token
    ↓
Generate Variables →
    ↓
[Screen 3 — Loading]
    ↓
[Screen 4 — Success]
Counts: primitives / alpha variants / semantics created
```

---

## Screen 1 — Import

### Layout (top → bottom)

```
┌─────────────────────────────────────────┐
│  ● Pigment                              │  ← header
├─────────────────────────────────────────┤
│                                         │
│  [ Upload .json ]  or paste below       │  ← file upload CTA
│                                         │
│  ┌───────────────────────────────────┐  │
│  │                                   │  │
│  │  { placeholder JSON here }        │  │  ← textarea
│  │                                   │  │
│  └───────────────────────────────────┘  │
│                                         │
│  ┌─ Accepted Format ───────────────┐    │  ← collapsible hint panel
│  │  Keys: primitives / semantics   │    │
│  │  Nested or flat structure ✓     │    │
│  │  Ref syntax: {primitive.x.y} ✓  │    │
│  └─────────────────────────────────┘    │
│                                         │
│  ┌─ Generate JSON with AI ─────────┐    │  ← AI prompt section
│  │  Use this prompt in Claude,     │    │
│  │  ChatGPT, or any AI →           │    │
│  │  [ Copy Prompt ]                │    │
│  └─────────────────────────────────┘    │
│                                         │
│  [ Load sample JSON ]  [ Parse → ]      │  ← actions
└─────────────────────────────────────────┘
```

### Component Notes

**Textarea placeholder**
Show a minimal valid JSON example (nested format, ~8 lines). Clears on focus.

**Accepted Format hint panel**
- Default: collapsed with a "▸ What formats are accepted?" toggle
- Expands to show: key name variants, flat vs nested, reference syntax
- Stays below fold so it doesn't compete with the textarea

**AI Prompt section**
- Small card with a brief line of context + "Copy Prompt" button
- On click: copies the full AI prompt to clipboard, button label changes to "Copied ✓" for 2s
- No modal, no new screen — inline, minimal

**Actions row**
- "Load sample JSON" — ghost/text button, left-aligned
- "Parse →" — primary CTA, right-aligned, disabled until textarea has content

---

## Screen 2 — Alpha Builder

```
┌─────────────────────────────────────────┐
│  ● Pigment            [Primitives][Sem] │  ← tabs
├─────────────────────────────────────────┤
│  82 primitives · 59 semantics           │  ← stats bar
│                                         │
│  ┌─ gray/10 ──────────────── [+ Alpha]┐ │
│  │  #F9F9FB                           │ │
│  │  Stops: [10] [20] [30] [50] [70]   │ │  ← shown when alpha toggled on
│  └────────────────────────────────────┘ │
│  ┌─ purple/500 ──────────── [+ Alpha]─┐ │
│  │  #7C4EF0                           │ │
│  └────────────────────────────────────┘ │
│  ...                                    │
│                                         │
│                  [ Generate Variables →]│
└─────────────────────────────────────────┘
```

---

## Screen 3 — Loading

```
┌─────────────────────────────────────────┐
│  ● Pigment                              │
├─────────────────────────────────────────┤
│                                         │
│          Creating variables...          │
│  ████████████████░░░░░░░░░░  68%        │
│                                         │
└─────────────────────────────────────────┘
```

---

## Screen 4 — Success

```
┌─────────────────────────────────────────┐
│  ● Pigment                              │
├─────────────────────────────────────────┤
│                                         │
│   ✅  Variables created                 │
│                                         │
│   ┌──────┐  ┌──────┐  ┌──────┐         │
│   │  82  │  │ 160  │  │  59  │         │
│   │Prim. │  │Alpha │  │ Sem. │         │
│   └──────┘  └──────┘  └──────┘         │
│                                         │
│            [ Run again ]                │
└─────────────────────────────────────────┘
```

---

## AI Prompt (Copy to clipboard)

See `pigment-ai-prompt.md`
