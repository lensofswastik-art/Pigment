# Pigment — Claude Code Context File

> Read this before touching anything. It covers what this plugin is, how it's built, every function, every screen, and the bugs that were already fixed. Don't re-introduce them.

---

## What is Pigment

A Figma plugin that reads a design token JSON file and creates Figma Color Variables in two collections — **Primitives** and **Semantics** — with optional alpha (opacity) variants.

Built by Swastik Bose. Single-file TypeScript plugin, no bundler, no framework.

---

## File Structure

```
Pigment/
├── code.ts              ← ONLY file to edit. Contains UI HTML + plugin thread.
├── code.js              ← Compiled output. Never edit directly.
├── manifest.json        ← Plugin config (name: Pigment, id: pigment-color-system)
├── tokens.sample.json   ← Sample token file for reference
├── pigment-ai-prompt.md ← AI prompt users copy to generate token JSON
├── pigment-ui-structure.md ← Screen-by-screen wireframe notes
├── node_modules/        ← @figma/plugin-typings + typescript
├── package.json
└── tsconfig.json
```

---

## Build Command

```bash
cd "/path/to/Pigment"
npx tsc --noEmit false --target ES6 --lib ES6 --strict false --typeRoots "./node_modules/@figma/plugin-typings" --outDir "." code.ts
```

No output = clean build. Any errors = fix before proceeding.

After building, reload the plugin in Figma: right-click plugin → **Reload plugin**.

---

## Architecture

`code.ts` has two parts separated by a comment block:

### 1. UI Thread (inside `UI_HTML` template literal)
- Plain HTML + CSS + vanilla JS wrapped in an IIFE
- Runs inside Figma's sandboxed iframe
- Communicates with the plugin thread via `parent.postMessage` / `window.addEventListener('message')`

### 2. Plugin Thread (after the template literal)
- TypeScript running in Figma's main sandbox
- Has access to `figma.*` APIs
- Receives messages from UI, creates variables, posts results back

---

## Critical Rules — Do Not Break These

### 1. No regex inside the UI_HTML template literal
`\.` inside a JS template literal loses the backslash. `/\./g` becomes `/./g` (matches any char).
**Always use:** `str.split('.').join('/')` — never regex for dot replacement.

### 2. No `alert()` in the UI
Figma's iframe sandbox doesn't include `allow-modals`. `alert()` is silently suppressed.
**Always use:** `showErr(msg)` — shows an inline red banner for 6 seconds.

### 3. No inline `onclick` attributes
Figma's Content Security Policy blocks them.
**Always use:** `addEventListener`.

### 4. No backticks inside `UI_HTML`
`UI_HTML` is a template literal. Any backtick inside it breaks the JS parse.
Use `&hellip;`, `&rarr;`, etc. for special chars. Use `'` for nested strings.

### 5. Upload zone must be a `<div>`, not `<label>`
A `<label for="fileInput">` in Figma's iframe can intercept button clicks and silently open the file picker instead. Upload zone is a `<div>` with a programmatic `fileInput.click()`.

---

## User Flow — 4 Screens

```
[s1: Upload] → [s2: Alpha Builder] → [s3: Loading] → [s4: Success]
                     ↑ Back ↓
```

### Screen 1 — Upload (`#s1`, active by default)
**Purpose:** Get the JSON into the plugin.

Three input methods:
1. **Drag and drop** onto the upload zone → `loadFile(file)`
2. **Browse file…** button → programmatically triggers `fileInput.click()`
3. **Paste JSON** directly into the textarea (`#jsonInput`)

Plus:
- **Load sample JSON** (`#btnSample`) → fills textarea with `SAMPLE` object
- **Green loaded bar** (`#fileLoaded`) → appears when a file is dropped/browsed, shows filename
- **Parse Tokens →** (`#btnParse`) → validates + normalizes → goes to Screen 2

Error states:
- Empty textarea → `showErr('Paste or upload a token JSON first.')`
- Invalid JSON → `showErr('Invalid JSON: ' + e.message)`
- Wrong structure → `showErr('No primitive key found...')` or semantic equivalent

### Screen 2 — Alpha Builder (`#s2`)
**Purpose:** Let user choose which primitive tokens get alpha (opacity) variants.

Components:
- **Stats card** — 3 columns: Primitives count / Semantics count / Alpha Stops total
  - Updates via `updateStats()` whenever alphaSelections changes
- **Tab switcher** — Primitives / Semantics (toggles `currentTab`, re-renders list)
- **Token list** (`#tokenList`) — rendered by `renderTokenList()`
  - Tokens grouped by prefix (e.g. all `gray/*` under GRAY group label)
  - Each row: custom checkbox (`.t-check`) + swatch + name + hex + `+ alpha` pill button
  - Clicking `+ alpha` OR the checkbox toggles alpha for that token
  - Default alpha stops when toggled on: `[10, 20, 50]`
  - Stop chips appear below the row when alpha is on (11 stops: 5,10,20,30,40,50,60,70,80,90,95)
  - Clicking a stop chip toggles it on/off
- **← Back** → returns to Screen 1
- **Generate Variables →** → goes to Screen 3, posts `generate` message to plugin thread

### Screen 3 — Loading (`#s3`)
**Purpose:** Visual feedback while Figma creates variables (can take a few seconds for large sets).

- CSS spinner animation
- Fake progress bar (random increments to 88%, jumps to 100% on `done` message)

### Screen 4 — Success (`#s4`)
**Purpose:** Confirm what was created.

- 3 count cards: Primitives / Alpha / Semantics (filled from `msg.counts`)
- Skipped tokens note (if any refs couldn't resolve)
- **Run again** → resets all state, clears textarea, goes back to Screen 1

---

## State Variables (UI Thread)

```js
var parsedData      = null;        // { primitives: {}, semantics: {} } after Parse
var alphaSelections = {};          // { "gray/50": [10, 20, 50], "purple/500": [10] }
var currentTab      = 'primitives'; // which tab is active in Screen 2
```

---

## All UI Functions

### Utility
| Function | What it does |
|---|---|
| `show(id)` | Switches active screen. Removes `.active` from all `.screen`, adds to `#id` |
| `postMsg(obj)` | Sends message to plugin thread via `parent.postMessage` |
| `showErr(msg)` | Displays red inline error banner (`#errorBox`) for 6 seconds |
| `loadFile(file)` | FileReader → puts text into `#jsonInput`, shows `#fileLoaded` bar |

### JSON Processing
| Function | What it does |
|---|---|
| `findKey(obj, candidates)` | Finds a key in obj whose lowercase name matches any candidate. Used to support `primitives`/`primitive`/`colors`/`palette` etc. |
| `flattenObj(obj, prefix)` | Recursively flattens nested object to `{ 'gray/10': '#F9F9FB' }` format |
| `resolveRef(ref)` | Converts `{primitive.purple.500}` → `purple/500`. Pure string ops — no regex |
| `normalizeTokens(parsed)` | Runs findKey → flattenObj → resolveRef. Returns `{ primitives, semantics }` or `{ error }` |

### Screen 2 Rendering
| Function | What it does |
|---|---|
| `countAlphaStops()` | Totals all selected stops across all tokens |
| `updateStats()` | Refreshes the 3 stat numbers in the stats card |
| `renderAlphaBuilder()` | Called after parse. Updates stats, resets tabs, calls renderTokenList |
| `renderTokenList()` | Full re-render of `#tokenList`. Groups tokens by prefix. Handles both primitive and semantic tab views |

---

## Message Protocol (UI ↔ Plugin Thread)

### UI → Plugin Thread
```js
// Trigger variable generation
postMsg({
  type: 'generate',
  data: {
    primitives: { 'gray/10': '#F9F9FB', ... },   // flat key → hex
    semantics:  { 'brand/primary': 'purple/500', ... } // flat key → primitive key
  },
  alphaSelections: {
    'gray/50': [10, 20, 50],   // token name → array of opacity %
    'purple/500': [10]
  }
})

// Close plugin (not currently wired but handled)
postMsg({ type: 'close' })
```

### Plugin Thread → UI
```js
// When generation completes
figma.ui.postMessage({
  type: 'done',
  counts: { primitives: 62, alpha: 18, semantics: 98 },
  skipped: 2
})
```

---

## Plugin Thread Logic (Variable Creation Order)

1. **Find or create collections** — `getLocalVariableCollectionsAsync()` → reuse existing "Primitives" and "Semantics" collections if they exist, create if not.

2. **Create primitive variables** — loop `data.primitives`, skip non-hex values, call `figma.variables.createVariable(name, primCol, 'COLOR')`, set hex value via `setValueForMode`.

3. **Create alpha variants** — for each token in `alphaSelections`, create `tokenName/alpha/10`, `/alpha/20` etc. in the Primitives collection with `a: stop/100`.

4. **Create semantic variables** — loop `data.semantics`, find the matching primitive variable in `primVars`, create a `createVariableAlias` pointing to it.

5. **Semantic alpha auto-propagation** — builds a reverse map `primKey → [semName, semName2]`. For every alpha stop on a primitive, auto-creates matching alias in Semantics (e.g. `brand/primary/alpha/10 → purple/500/alpha/10`). This is automatic — user doesn't have to do anything.

6. **Post `done` + `figma.notify()`** — sends counts back to UI, shows Figma toast.

---

## Design Tokens (Dark Theme)

```css
--bg:        #0B0B14   /* main background */
--surface:   #16161F   /* cards, textareas */
--surface2:  #1E1E2E   /* buttons, tab bg */
--surface3:  #252535   /* active tab, hover states */
--border:    rgba(255,255,255,0.09)
--border2:   rgba(255,255,255,0.14)
--purple:    #8B5CF6   /* primary action color */
--purple-d:  #7C3AED   /* hover state for purple */
--purple-bg: rgba(139,92,246,0.15)
--green:     #16A34A   /* file loaded bar, success icon */
--text:      #F0F0FA
--text-sec:  #888899
--text-muted:#4A4A62
--radius:    10px
--radius-sm: 6px
```

Plugin window: `width: 460, height: 580`

---

## JSON Format Pigment Accepts

Flexible — the plugin tries multiple key names at each level.

**Accepted top-level keys for primitives:** `primitives`, `primitive`, `prim`, `colors`, `color`, `palette`, `tokens`

**Accepted top-level keys for semantics:** `semantics`, `semantic`, `sem`, `aliases`, `alias`, `theme`

**Reference syntax in semantics:** `{primitive.purple.500}` or `{primitives.purple.500}` or any known namespace prefix — all resolve to `purple/500`.

**Minimal valid example:**
```json
{
  "primitives": {
    "purple": { "500": "#7C4EF0" },
    "gray":   { "10": "#F9F9FB", "100": "#0D0D0D" }
  },
  "semantics": {
    "brand": { "primary": "{primitive.purple.500}" },
    "neutral": { "bg": "{primitive.gray.10}" }
  }
}
```

**Nesting is supported** — `{ "gray": { "10": "#F9F9FB" } }` flattens to `gray/10` in Figma.

---

## Known Bugs — Already Fixed, Don't Revert

| Bug | Fix applied |
|---|---|
| `resolveRef` was using regex `/\./g` inside a template literal — backslash consumed, matched any char, turned `"white"` into `"/////"` | Replaced with `split('.').join('/')` |
| `alert()` calls were silently suppressed in Figma iframe | Replaced with `showErr()` inline banner |
| `<label for="fileInput">` was intercepting button clicks | Changed to `<div>` with programmatic `fileInput.click()` |
| Semantic alpha not propagating to Semantics collection | Added `prim2sem` reverse map + auto-creation loop |

---

## What Has NOT Been Built Yet

- Custom Figma design UI (user has a Figma file at `https://www.figma.com/design/0ArfYYLdVglL4SyFFJMEFE/Pigment` — not yet implemented)
- Authentication / user data collection
- Support for non-color token types (spacing, typography, etc.)
- Multi-mode variable support
- Export / reverse direction (Figma variables → JSON)
