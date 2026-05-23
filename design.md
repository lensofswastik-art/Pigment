# Pigment — Screen 1 Design Specification

> Extracted from screenshot. Verify hex values against Figma Inspect panel for pixel-perfect accuracy.
> This is a light-theme design — completely different from the current dark theme in code.ts.

---

## Global

| Token | Value | Notes |
|---|---|---|
| Window width | 460px | unchanged |
| Window height | 580px | unchanged |
| Font family | `-apple-system, "Inter", sans-serif` | System font |
| Mono font | `"Menlo", "Monaco", monospace` | Textarea only |

---

## Color Palette

### Backgrounds

| Token | Hex | Used on |
|---|---|---|
| `--bg` | `#FEFEFF` | Page, header, upload zone, bottom bar |
| `--surface` | `#F5F6F8` | JSON textarea card |
| `--banner-bg` | `#E8EDF2` | AI prompt banner section |

### Borders

| Token | Hex / Value | Used on |
|---|---|---|
| `--border` | `#E5E7EB` | Header bottom, bottom bar top, textarea outline |
| `--border-dash` | `#CACDD2` | Upload zone dashed border |

### Text

| Token | Hex | Used on |
|---|---|---|
| `--text-primary` | `#111827` | Heading, logo name, button labels |
| `--text-secondary` | `#6B7280` | Banner subtext, upload zone label |
| `--text-muted` | `#9CA3AF` | Divider text, textarea placeholder |

### Interactive

| Token | Hex | Used on |
|---|---|---|
| `--btn-dark-bg` | `#1A1A1A` | Primary button bg, Copy Prompt bg |
| `--btn-dark-text` | `#FFFFFF` | Primary button text |
| `--btn-outline-bg` | `#FFFFFF` | Secondary button bg |
| `--btn-outline-border` | `#D1D5DB` | Secondary button border |

### Decorative (AI Avatar Bubbles)

| Token | Hex | Notes |
|---|---|---|
| `--bubble-black` | `#1A1A1A` | Largest/back circle |
| `--bubble-orange` | `#FF6B2B` | Overlapping left |
| `--bubble-green` | `#4CAF50` | Center |
| `--bubble-blue` | `#42A5F5` | Front right |
| `--bubble-purple` | `#9B59B6` | Rightmost |

### Icon

| Token | Hex | Used on |
|---|---|---|
| `--icon-muted` | `#C4C9D0` | Folder icon inside upload zone |

---

## Radius

| Token | Value | Used on |
|---|---|---|
| `--radius-lg` | `14px` | Upload zone, textarea card |
| `--radius-md` | `8px` | Copy Prompt button |
| `--radius-pill` | `999px` | Load Sample JSON + Parse Tokens buttons |

---

## Typography

### Heading (Banner)
- Text: "Don't have a token file? AI can build one"
- `font-size: 22px`
- `font-weight: 800`
- `line-height: 1.25`
- `color: var(--text-primary)` (#111827)

### Banner Subtext
- Text: "Copy our prompt → paste into Claude or ChatGPT → upload the output here"
- `font-size: 12px`
- `font-weight: 400`
- `line-height: 1.5`
- `color: var(--text-secondary)` (#6B7280)

### Upload Zone Label
- Text: "Drop or upload your tokens.json here"
- `font-size: 14px`
- `font-weight: 500`
- `color: var(--text-secondary)` (#6B7280)

### Divider Text
- Text: "or Paste JSON directly"
- `font-size: 12px`
- `font-weight: 400`
- `color: var(--text-muted)` (#9CA3AF)

### Textarea Placeholder
- `font-family: Menlo, Monaco, monospace`
- `font-size: 11px`
- `line-height: 1.65`
- `color: var(--text-muted)` (#9CA3AF)

### Button Labels
- `font-size: 13px`
- `font-weight: 500`
- Primary: color `#FFFFFF`
- Secondary: color `var(--text-primary)` (#111827)

### Logo Name
- Text: "pigment" (lowercase)
- `font-size: 16px`
- `font-weight: 600`
- `color: var(--text-primary)` (#111827)

---

## Component Specs

### Header
```
height: ~48px
padding: 12px 16px
background: #FEFEFF
border-bottom: 1px solid #E5E7EB
layout: flex, row, align-center, gap 10px
```
- Logo icon: ~28px × 28px colorful dot icon
- Logo name: "pigment" lowercase

---

### AI Prompt Banner
```
background: #E8EDF2
padding: 20px 16px
position: relative (for bubble decoration)
layout: flex, column, gap 8px
```
- Heading block (2 lines, bold)
- Subtext (1 line, small)
- Copy Prompt button: 14px below subtext
- Bubble cluster: absolutely positioned, bottom-right ~-10px offset, decorative only

#### Copy Prompt Button
```
background: #1A1A1A
color: #FFFFFF
border: none
border-radius: 8px
padding: 10px 18px
font-size: 13px
font-weight: 500
display: inline-flex, align-items: center, gap: 7px
```
- Has a clipboard/copy icon (14×14px) before the text

---

### Upload Zone
```
border: 1.5px dashed #CACDD2
border-radius: 14px
padding: 36px 24px
background: #FFFFFF
display: flex, flex-direction: column, align-items: center, gap: 14px
```
- Folder icon: ~80px wide, color `#C4C9D0`
- Label: centered, `font-size: 14px`, `color: #6B7280`

#### Drag-over state (inferred — confirm in Figma)
- `border-color: #1A1A1A` or accent color
- `background: rgba(0,0,0,0.03)`

---

### Or Divider
```
text-align: center
font-size: 12px
color: #9CA3AF
padding: 10px 0
```
No horizontal lines — just centered text.

---

### JSON Textarea Card
```
background: #F5F6F8
border: 1px solid #E5E7EB
border-radius: 14px
padding: 14px 16px
flex: 1
min-height: 0
font-family: Menlo, Monaco, monospace
font-size: 11px
line-height: 1.65
color: #9CA3AF
resize: none
outline: none
```
- Focus state (infer): `border-color: #1A1A1A`

---

### Bottom Bar
```
background: #FFFFFF
border-top: 1px solid #E5E7EB
padding: 12px 16px
display: flex, justify-content: space-between, align-items: center
flex-shrink: 0
```

#### Load Sample JSON (secondary)
```
background: #FEFEFF
border: 1px solid #D1D5DB
border-radius: 999px
padding: 10px 18px
font-size: 13px
font-weight: 500
color: #111827
display: inline-flex, align-items: center, gap: 7px
cursor: pointer
```
- Has a link/chain icon before text

#### Parse Tokens → (primary)
```
background: #1A1A1A
border: none
border-radius: 999px
padding: 10px 22px
font-size: 13px
font-weight: 500
color: #FFFFFF
cursor: pointer
```
- Arrow `→` at end of text label

---

## Layout Structure (Screen 1 top-to-bottom)

```
┌─────────────────────────────────┐  ← Header (48px, white)
├─────────────────────────────────┤
│  AI Prompt Banner               │  ← ~120px, bg #E8EDF2
│  [heading][subtext][button][bubbles]
├─────────────────────────────────┤
│  Upload Zone (dashed border)    │  ← ~180px, white
│  [folder icon][label]           │
├─────────────────────────────────┤
│  "or Paste JSON directly"       │  ← ~36px, centered text
├─────────────────────────────────┤
│  JSON Textarea card             │  ← flex: 1, fills remaining
│  (monospace placeholder)        │
├─────────────────────────────────┤
│  Bottom Bar                     │  ← ~56px, white
│  [Load Sample JSON] [Parse Tokens →]
└─────────────────────────────────┘
```

---

## Open Questions (confirm in Figma Inspect)

1. Exact hex for `--banner-bg` — appears to be a cool light gray-blue (~#E8EDF2)
2. Upload zone dashed border exact color and dash pattern (`border-style: dashed` or custom SVG?)
3. Exact border-radius on Upload Zone and Textarea — 12px vs 14px?
4. Copy Prompt and secondary button exact icon used (copy icon, link icon)
5. Hover states for buttons — lighten/darken bg? Border change?
6. Exact bubble sizes and positions in the banner
7. Shadow on any element — none visible in screenshot but confirm
8. Does the textarea have an inner shadow or just a flat border?
9. Logo icon — is it the Pigment asset file or an SF Symbol / Emoji?
10. Banner section — is it a full-bleed panel or has horizontal padding matching the rest?
