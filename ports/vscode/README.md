# Circadia for Visual Studio Code

> **Perceptually uniform, circadian-aligned design tokens engineered in OKLCH.**

Circadia is an open color specification and multi-platform theme system engineered in OKLCH for cross-platform editors, terminal emulators, and document renderers. Built around human ocular biophysics, circadian light cycles, and strict mathematical accessibility, Circadia delivers **100% Strict WCAG 2.1 AAA contrast (>= 7.0:1)** across all UI and syntax tokens with **multi-dimensional Color Vision Deficiency (CVD) support**.

<p align="center">
  <img src="https://raw.githubusercontent.com/tanmaymanojgandhi/circadia/main/assets/swatch-matrix.png" alt="Circadia 2.0 Color Palette Matrix" width="100%">
</p>

---

## 🌓 The 4 Circadian Modes

Circadia provides 4 distinct modes calibrated for different ambient environments, monitor hardware, and developer workflows:

| Theme Name | Mode | Canvas Background | Target Workflow / Lighting |
| :--- | :--- | :--- | :--- |
| **Circadia — Warm Parchment** | Light | `#f7f2e6` (Warm Cellulose Linen) | Daylight & bright ambient lighting (300–800+ lux). Glare-free editorial reading. |
| **Circadia — Warm Ember & Espresso** | Dark Classic | `#17130f` (Warm Espresso Charcoal) | Evening & night lighting (0–50 lux, 2700K ambient). Halation-free candlelight harmony. |
| **Circadia — Plum Noir** | Dark Modern | `#140e12` (Velvet Wine Noir) | Low ambient light. High spectral distinction for full-stack & frontend development. |
| **Circadia — Obsidian Pine** | Dark Focus | `#131714` (Obsidian Forest Moss) | Deep terminal sessions & night shifts. Ultra-low eye excitation for long marathons. |

---

## ✨ Features

- **100% Strict WCAG 2.1 AAA Contrast**: Minimum >= 7.0:1 contrast ratio across all syntax and UI tokens, preventing eye strain during marathon coding sessions.
- **Multi-Dimensional Token Separation**: Distinct luminance channels (ΔL >= 8%) and bold typographic emphasis ensure crystal-clear code comprehension under Color Vision Deficiency (Deuteranopia, Protanopia, Tritanopia).
- **Glare & Halation Prevention**: Engineered in OKLCH 32-bit perceptual color space—no blinding white (`#ffffff`) or pixel-bleeding pitch black (`#000000`).
- **Comprehensive Language Support**: Thoughtfully tuned scopes for TypeScript/JavaScript, Python, Rust, Go, HTML/CSS, JSON, Markdown, and more.

---

## 🚀 Installation

### Via VS Code Marketplace
1. Open Visual Studio Code.
2. Go to the Extensions view (`Ctrl+Shift+X` / `Cmd+Shift+X`).
3. Search for `Circadia Theme` or `circadia-vscode`.
4. Click **Install**.

### Via Quick Open
Press `Ctrl+P` / `Cmd+P` and paste:
```shell
ext install tanmay-gandhi.circadia-vscode
```

### Via VSIX File
```shell
code --install-extension circadia-vscode-2.0.0.vsix
```

---

## 🎨 Activating the Theme

1. Open the Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`).
2. Type **Preferences: Color Theme** and press Enter.
3. Select one of the Circadia themes:
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
- **License**: [MIT](https://github.com/tanmaymanojgandhi/circadia/blob/main/LICENSE) — Copyright (c) 2026 Circadia contributors.
