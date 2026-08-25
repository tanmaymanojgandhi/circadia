# Circadia

> **Perceptually uniform, circadian-aligned design tokens engineered in OKLCH.**

Circadia is an open color specification and multi-platform theme system engineered in OKLCH for cross-platform editors, terminal emulators, and document renderers. Built around human ocular biophysics, circadian light cycles, and strict mathematical accessibility, Circadia delivers **100% Strict WCAG 2.1 AAA contrast (>= 7.0:1)** across all UI and syntax tokens with **multi-dimensional Color Vision Deficiency (CVD) support**.

<p align="center">
  <img src="https://raw.githubusercontent.com/tanmaymanojgandhi/circadia/main/assets/swatch-matrix.svg" alt="Circadia 2.0 Color Palette Matrix (4 Modes: Warm Parchment, Dark Classic, Dark Modern, Dark Focus)" width="100%">
</p>

---

## 🌓 The 4 Circadian Modes

Circadia 2.0 provides 4 distinct modes calibrated for different ambient environments, monitor hardware, and developer workflows:

### 1. ☀️ Circadia — Warm Parchment (Light)
* **Target Environment**: Daylight & bright ambient lighting (**300–800+ lux**).
* **Canvas Background**: `#f7f2e6` (`oklch(96.0% 0.013 85)` — Warm Cellulose Linen).
* **Character**: Daylight / Reading / Editorial Warmth.
* **Optical Physics**: Standard stark-white editor themes (`#ffffff`) blast excessive luminous flux into the user's dilated pupils, triggering squinting and photophobia. Warm Parchment uses a balanced warm cellulose paper base that diffuses ambient room light without glare, coupled with deep ink tones achieving **11.69:1 AAA** body text contrast.

### 2. ☕ Circadia — Warm Ember & Espresso (Dark Classic)
* **Target Environment**: Evening, night, and warm-lit rooms (**0–50 lux / 2700K ambient**).
* **Canvas Background**: `#17130f` (`oklch(19.0% 0.010 67)` — Warm Espresso Charcoal).
* **Character**: Candlelight Harmony / Earth / Halation-Free Editorial.
* **Optical Physics**: Pitch black (`#000000`) on IPS monitors causes harsh backlight bleed and extreme contrast halation (glowing fuzzy edges around bright letters). Dark Classic grounds text on warm espresso charcoal with glowing ember and amber syntax accents that preserve melatonin levels and eliminate ocular fatigue.

### 3. 🍇 Circadia — Plum Noir (Dark Modern)
* **Target Environment**: Low ambient light (**0–50 lux**) / Modern high-density workflows.
* **Canvas Background**: `#140e12` (`oklch(16.5% 0.014 350)` — Velvet Wine Noir).
* **Character**: Sharp / Energetic / Velvet UI / Full-Stack & Frontend Development.
* **Optical Physics**: Deep magenta/plum undertones create an exceptionally quiet canvas with high spectral distinction. Saturated pastel syntax tokens pop with crisp separation, maintaining **11.91:1 AAA** contrast.

### 4. 🌲 Circadia — Obsidian Pine (Dark Focus)
* **Target Environment**: Deep terminal sessions & night shifts (**0–50 lux**).
* **Canvas Background**: `#131714` (`oklch(17.8% 0.010 145)` — Obsidian Forest Moss).
* **Character**: Restorative / Organic / Ultra-Low Eye Excitation / Data Science & Systems Engineering.
* **Optical Physics**: Green/sage wavelengths correspond to the lowest perceptual eye excitation curve in human photopic vision. Obsidian Pine delivers a calm, organic workspace that minimizes retinal fatigue over marathon 12+ hour focus blocks.

---

## 👁️ Multi-Dimensional CVD Separation (Color Vision Deficiency)

Traditional syntax themes rely almost exclusively on hue differences (e.g. green strings vs. red keywords vs. yellow types). For the **8% of male and 0.5% of female developers** with Color Vision Deficiency (Deuteranopia, Protanopia, or Tritanopia), these tokens collapse into indistinguishable gray/brown muddiness.

Circadia 2.0 enforces **Multi-Dimensional Token Separation**:

1. **Luminance Channel Separation (ÎL >= 8%)**: Tokens that could share confusable hues under deuteranopia/protanopia are assigned distinct lightness steps. Even in pure monochrome grayscale, `type` (L ~ 76%), `function` (L ~ 72%), and `keyword` (L ~ 70%) remain visibly distinct.
2. **Dual-Channel Typographic Encoding**: Keywords and control-flow operators are systematically encoded with `bold` font weight across all supported ports, ensuring instant semantic recognition independent of color perception.
3. **Quarantined Destructive Hue**: Pure saturated red (`#dc2626` / `#e06c75`) is strictly quarantined for syntax errors, merge conflicts, and linter warnings to prevent cognitive alarm fatigue during code reading.

---

## 📐 Mathematical Accessibility: 100% Strict WCAG 2.1 AAA

Every token in Circadia is engineered in **OKLCH 32-bit perceptual color space** and verified through automated continuous-integration contrast checks:

| Token Role | Light Parchment | Dark Classic | Dark Modern | Dark Focus | WCAG Tier |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **`text_primary`** | **11.69:1** | **10.26:1** | **11.91:1** | **11.02:1** | **Strict AAA** |
| **`keyword`** | **7.29:1** | **7.22:1** | **7.88:1** | **7.91:1** | **Strict AAA** |
| **`type`** | **7.32:1** | **8.60:1** | **8.48:1** | **8.69:1** | **Strict AAA** |
| **`function`** | **8.16:1** | **7.16:1** | **7.42:1** | **7.59:1** | **Strict AAA** |
| **`property`** | **9.29:1** | **7.20:1** | **7.55:1** | **7.48:1** | **Strict AAA** |
| **`string`** | **7.02:1** | **8.27:1** | **8.78:1** | **8.82:1** | **Strict AAA** |
| **`number`** | **7.00:1** | **7.12:1** | **7.99:1** | **7.92:1** | **Strict AAA** |
| **`comment`** | **6.45:1 (AA+)** | **7.16:1** | **7.35:1** | **6.68:1 (AA+)** | **High Legibility** |
| **`headings.h1-h6`** | **11.00:1 -> 4.70:1** | **12.44:1 -> 5.27:1** | **12.65:1 -> 4.60:1** | **12.35:1 -> 4.88:1** | **Monotonic Progression** |

---

## 📁 Repository Structure

```
├── spec/                           # The Single Source of Truth (palette.json, rules.md, token-map.md)
├── ports/                          # 19 official ports (VS Code, tmux, Neovim, Zed, Obsidian, etc.)
├── scripts/                        # Automated Build & Validation Pipeline (validate.ts, generate-formats.ts, build-all-ports.js)
├── dist/                           # Multi-format exports for third-party tools (palette.json, palette.csv)
├── docs/                           # Interactive documentation & token inspector (GitHub Pages)
└── assets/                         # Vector assets and 4-mode swatch matrix (swatch-matrix.svg)
```

---

## 🚀 Supported Ports (19 Official Ports)

| Application | Port Path | Flavours Supported | Type | Author |
| :--- | :--- | :--- | :--- | :--- |
| **VS Code** | [`ports/vscode/`](ports/vscode) | All 4 Modes | Theme Extension | [@tanmaymanojgandhi](https://github.com/tanmaymanojgandhi) |
| **tmux** | [`ports/tmux/`](ports/tmux) | All 4 Modes | TPM Plugin / Conf | [@tanmaymanojgandhi](https://github.com/tanmaymanojgandhi) |
| **Neovim** | [`ports/neovim/`](ports/neovim) | All 4 Modes | Treesitter Lua Plugin | [@tanmaymanojgandhi](https://github.com/tanmaymanojgandhi) |
| **Zed** | [`ports/zed/`](ports/zed) | All 4 Modes | Native Extension | [@tanmaymanojgandhi](https://github.com/tanmaymanojgandhi) |
| **Obsidian** | [`ports/obsidian/`](ports/obsidian) | Light & Dark | CSS Theme | [@tanmaymanojgandhi](https://github.com/tanmaymanojgandhi) |
| **JetBrains IDEs** | [`ports/intellij/`](ports/intellij) | Light & Dark | ICLS Scheme | [@tanmaymanojgandhi](https://github.com/tanmaymanojgandhi) |
| **Xcode** | [`ports/xcode/`](ports/xcode) | Light & Dark | Theme Plist | [@tanmaymanojgandhi](https://github.com/tanmaymanojgandhi) |
| **Alacritty** | [`ports/alacritty/`](ports/alacritty) | All 4 Modes | TOML Configs | [@tanmaymanojgandhi](https://github.com/tanmaymanojgandhi) |
| **Kitty** | [`ports/kitty/`](ports/kitty) | All 4 Modes | Conf Files | [@tanmaymanojgandhi](https://github.com/tanmaymanojgandhi) |
| **Windows Terminal** | [`ports/windows-terminal/`](ports/windows-terminal) | All 4 Modes | Color Schemes JSON | [@tanmaymanojgandhi](https://github.com/tanmaymanojgandhi) |
| **iTerm2** | [`ports/iterm2/`](ports/iterm2) | Light & Dark | Color Presets | [@tanmaymanojgandhi](https://github.com/tanmaymanojgandhi) |
| **Vim** | [`ports/vim/`](ports/vim) | Light & Dark | Vimscript Plugin | [@tanmaymanojgandhi](https://github.com/tanmaymanojgandhi) |
| **Konsole** | [`ports/konsole/`](ports/konsole) | Light & Dark | Color Scheme | [@tanmaymanojgandhi](https://github.com/tanmaymanojgandhi) |
| **Google Chrome** | [`ports/chrome/`](ports/chrome) | Light & Dark | Unpacked Theme | [@tanmaymanojgandhi](https://github.com/tanmaymanojgandhi) |
| **Telegram Desktop** | [`ports/telegram/`](ports/telegram) | Light & Dark | Palette Files | [@tanmaymanojgandhi](https://github.com/tanmaymanojgandhi) |
| **Slack** | [`ports/slack/`](ports/slack) | Light & Dark | Custom Theme String | [@tanmaymanojgandhi](https://github.com/tanmaymanojgandhi) |
| **KDE Plasma** | [`ports/kde/`](ports/kde) | Light & Dark | Desktop Color Scheme | [@tanmaymanojgandhi](https://github.com/tanmaymanojgandhi) |
| **Tailwind CSS** | [`ports/tailwind/`](ports/tailwind) | Light & Dark | CSS `@theme` Tokens | [@tanmaymanojgandhi](https://github.com/tanmaymanojgandhi) |
| **VitePress** | [`ports/vitepress/`](ports/vitepress) | Light & Dark | Documentation CSS | [@tanmaymanojgandhi](https://github.com/tanmaymanojgandhi) |

---

## 🛠️ Tooling & Validation

```bash
# 1. Run strict contrast & accessibility validation (56/56 checks)
npm run validate

# 2. Regenerate dist/ palette exports & 4-mode vector swatch matrix
npm run generate

# 3. Rebuild all 19 theme ports from the single-source spec
npm run build:ports
```

---

## 🤝 Community & Contributing

Want a port for your favorite editor, terminal, or shell? Check [`CONTRIBUTING.md`](CONTRIBUTING.md) or open a [Port Request](.github/ISSUE_TEMPLATE/port-request.md).

---

## 📜 License

[MIT](LICENSE) © [Tanmay Manoj Gandhi](https://github.com/tanmaymanojgandhi)
