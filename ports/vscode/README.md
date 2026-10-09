<p align="center">
  <img src="https://raw.githubusercontent.com/tanmaymanojgandhi/circadia/main/assets/circadia-logo.png" alt="Circadia Color Theme Logo" width="140" height="140">
</p>

<h1 align="center">Circadia Color Theme</h1>

<p align="center">
  <em>OKLCH themes for Visual Studio Code.</em>
</p>

Circadia provides OKLCH color themes for editors, terminals, and documents. Automated checks validate text contrast on three base backgrounds in all four palettes. Rendered application states and color vision accessibility need separate validation.

<p align="center">
  <img src="https://raw.githubusercontent.com/tanmaymanojgandhi/circadia/main/assets/swatch-matrix.png" alt="Circadia 2.1 Color Palette Matrix (Warm Parchment, Ember, Plum, Forest)" width="100%">
</p>

---

## Color variants

| Variant | Canvas | Appearance |
| --- | --- | --- |
| Warm Parchment | `#f7f4ec` | Warm paper background with blue headings |
| Warm Ember & Espresso | `#17130f` | Brown-black background with brass accents |
| Plum Noir | `#140e12` | Plum-black background with lavender accents |
| Obsidian Pine | `#131714` | Green-black background with sage accents |

## Color vision accessibility

Syntax roles use different hues. Some editor ports also use bold keywords and italic comments. These cues are intended to supplement color; they do not establish universal CVD accessibility. A minimum lightness separation is not currently enforced. CVD simulations and rendered checks across ports remain pending.

## Contrast validation

All four palettes check every text, syntax, and heading token against canvas, surface, and element backgrounds at >= 7:1. Decorative borders are separate from text contrast. Palette checks do not certify complete WCAG conformance, CVD separation, or every rendered application state.

The following ratios are calculated against each mode’s canvas:

| Token | Light | Ember | Plum | Forest |
| --- | ---: | ---: | ---: | ---: |
| `text_primary` | 11.89:1 | 11.17:1 | 11.52:1 | 10.94:1 |
| `keyword` | 8.61:1 | 9.13:1 | 9.42:1 | 8.94:1 |
| `type` | 8.58:1 | 10.20:1 | 10.53:1 | 9.99:1 |
| `function` | 8.55:1 | 8.99:1 | 9.28:1 | 8.81:1 |
| `property` | 9.44:1 | 9.40:1 | 9.70:1 | 9.20:1 |
| `string` | 8.53:1 | 10.06:1 | 10.38:1 | 9.85:1 |
| `number` | 8.60:1 | 9.53:1 | 9.83:1 | 9.33:1 |
| `comment` | 8.59:1 | 9.14:1 | 9.43:1 | 8.95:1 |


## 💻 Workbench & UI Precision Architecture

Circadia is engineered specifically for modern Visual Studio Code:
* **Active Tab Accent Strip**: Clean top accent line (`tab.activeBorderTop`) with transparent bottom borders, matching VS Code Dark Modern layout.
* **Elevated File Selections**: High-contrast explorer selection pills (`list.activeSelectionBackground` and `list.inactiveSelectionBackground`) ensuring the active file is always immediately visible.
* **High-Contrast Input Selections**: Dedicated `input.selectionBackground` and `selection.background` accent highlights across Search, Find, Quick Open, and Settings text boxes.
* **Breadcrumbs & Navigation**: Full support for breadcrumb bars, modern activity bar indicators, and tree indent guides.

---

## 🚀 Installation

### Via VS Code Marketplace
1. Open Visual Studio Code.
2. Go to the Extensions view (`Ctrl+Shift+X` / `Cmd+Shift+X`).
3. Search for **`Circadia Color Theme`**.
4. Click **Install**.

### Via Quick Open
Press `Ctrl+P` / `Cmd+P` and paste:
```shell
ext install tanmay-gandhi.circadia-color-theme
```

### Via VSIX File
```shell
code --install-extension circadia-color-theme-2.1.0.vsix
```

---

## 🎨 Activating the Theme

1. Open the Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`).
2. Type **Preferences: Color Theme** and press Enter.
3. Select your preferred circadian mode:
   - `Circadia — Warm Parchment (Light)`
   - `Circadia — Warm Ember & Espresso (Dark Classic)`
   - `Circadia — Plum Noir (Dark Modern)`
   - `Circadia — Obsidian Pine (Dark Focus)`

---

## ⚙️ Recommended Settings

For the optimal typographical and circadian experience:

```json
{
  "editor.fontFamily": "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace",
  "editor.fontLigatures": true,
  "editor.fontSize": 14,
  "editor.lineHeight": 1.6,
  "editor.bracketPairColorization.enabled": true,
  "editor.guides.bracketPairs": true,
  "editor.renderWhitespace": "selection"
}
```

---

## 📄 License & Repository

- **Repository**: [github.com/tanmaymanojgandhi/circadia](https://github.com/tanmaymanojgandhi/circadia)
- **License**: [MIT](https://github.com/tanmaymanojgandhi/circadia/blob/main/LICENSE) — Copyright (c) 2026 Tanmay Manoj Gandhi

