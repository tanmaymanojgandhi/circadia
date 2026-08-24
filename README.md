# Circadia

> **Perceptually uniform, low-strain themes engineered for continuous focus.**

Circadia is an open color specification engineered in OKLCH for cross-platform editors, document renderers, and terminal tools. Built around circadian light science, it delivers glare-free daylight contrast (Warm Parchment) and halation-free evening warmth (Warm Ember & Espresso)—strictly maintaining WCAG 2.1 AAA legibility for long coding and writing sessions.

<p align="center">
  <img src="https://raw.githubusercontent.com/tanmaymanojgandhi/circadia/main/assets/swatch-matrix.svg" alt="Circadia Color Palette Swatch Matrix" width="100%">
</p>

---

## 🎨 Palette Specification & Swatch Matrix

| Token | Semantic Role | ☀️ Light (`Warm Parchment`) | 🌙 Dark (`Warm Ember & Espresso`) |
| :--- | :--- | :--- | :--- |
| **`bg_canvas`** | Canvas Background | `#f7f2e6`<br>`oklch(96.0% 0.013 85)`<br>*(Base Canvas)* | `#17130f`<br>`oklch(19.0% 0.010 67)`<br>*(Base Canvas)* |
| **`bg_surface`** | Sidebars & Inactive Tabs | `#eee7d6`<br>`oklch(92.5% 0.016 85)`<br>*(UI Surface)* | `#1e1a15`<br>`oklch(22.0% 0.012 67)`<br>*(UI Surface)* |
| **`bg_element`** | Active Line & Selection | `#e5dcc6`<br>`oklch(88.5% 0.020 85)`<br>*(UI Element)* | `#29241e`<br>`oklch(26.0% 0.015 67)`<br>*(UI Element)* |
| **`border`** | 1px Panel Dividers | `#d7cdb7`<br>`oklch(83.0% 0.022 85)`<br>*(UI Border)* | `#3b342b`<br>`oklch(33.0% 0.018 67)`<br>*(UI Border)* |
| **`text_primary`** | Body Text & Punctuation | `#28323a`<br>`oklch(30.0% 0.020 250)`<br>**11.69:1 (AAA)** | `#c9c0b1`<br>`oklch(81.1% 0.023 81)`<br>**10.26:1 (AAA)** |
| **`text_muted`** | Secondary Text / Operators | `#46535f`<br>`oklch(43.0% 0.025 250)`<br>**7.06:1 (AAA)** | `#b5aba0`<br>`oklch(75.0% 0.020 81)`<br>**8.18:1 (AAA)** |
| **`text_faint`** | Line Numbers & Guides | `#5f6d7a`<br>`oklch(53.0% 0.020 250)`<br>**4.75:1 (AA)** | `#91887d`<br>`oklch(63.0% 0.018 75)`<br>**5.30:1 (AA)** |
| **`accent`** | Focus Rings & Links | `#0048b3`<br>`oklch(43.8% 0.181 260)`<br>**7.29:1 (AAA)** | `#e89a49`<br>`oklch(75.0% 0.130 65)`<br>**8.05:1 (AAA)** |
| **`keyword`** | Keywords & Flow Control | `#0048b3`<br>`oklch(43.8% 0.181 260)`<br>**7.29:1 (AAA)** | `#66abc6`<br>`oklch(70.6% 0.080 225)`<br>**7.22:1 (AAA)** |
| **`type`** | Types, Classes & Structs | `#843900`<br>`oklch(44.2% 0.162 62)`<br>**7.32:1 (AAA)** | `#d9a86e`<br>`oklch(76.4% 0.095 70)`<br>**8.60:1 (AAA)** |
| **`function`** | Functions & Methods | `#7a1f7a`<br>`oklch(42.4% 0.164 328)`<br>**8.16:1 (AAA)** | `#b991db`<br>`oklch(72.0% 0.114 308.5)`<br>**7.16:1 (AAA)** |
| **`property`** | Properties & Object Keys | `#4b1fa3`<br>`oklch(39.4% 0.192 290)`<br>**9.29:1 (AAA)** | `#de88a6`<br>`oklch(72.4% 0.111 358)`<br>**7.20:1 (AAA)** |
| **`variable`** | Variables & Parameters | `#364450`<br>`oklch(37.9% 0.027 245)`<br>**8.95:1 (AAA)** | `#c9c0b1`<br>`oklch(81.1% 0.023 81)`<br>**10.26:1 (AAA)** |
| **`string`** | String Literals | `#005f2f`<br>`oklch(42.5% 0.110 153)`<br>**7.02:1 (AAA)** | `#8cbb62`<br>`oklch(73.8% 0.129 132)`<br>**8.27:1 (AAA)** |
| **`number`** | Numeric & Constant Literals | `#095b62`<br>`oklch(42.5% 0.080 204)`<br>**7.00:1 (AAA)** | `#d99148`<br>`oklch(71.5% 0.124 64)`<br>**7.12:1 (AAA)** |
| **`comment`** | Code Comments | `#5e564d`<br>`oklch(45.8% 0.018 71)`<br>**6.45:1 (AA)** | `#a9a093`<br>`oklch(71.0% 0.021 75)`<br>**7.16:1 (AAA)** |

---

## 🔬 Optical Science & Ambient Ergonomics

Circadia's dual-mode specification is built around the fundamental physics of ocular perception, emissive display hardware, and circadian lighting:

### 1. The Helmholtz "Irradiation Illusion" (Perceived Stroke Weight)
A well-documented optical phenomenon discovered by physicist Hermann von Helmholtz:
* **Light on Dark (Dark Mode):** Bright letterforms subtly bleed light outward into the dark obsidian background on self-luminous displays. This makes thin character stems appear **~15% thicker and bolder** than their actual geometry.
* **Dark on Light (Light Mode):** The bright surrounding paper field encroaches slightly onto dark glyphs, making font strokes appear optically thinner and requiring sharper ocular focusing.

### 2. Emissive Displays vs. Physical Paper
* **Why Light themes feel natural on real paper / e-Ink:** Paper is *subtractive*—it does not emit photons; it reflects diffuse ambient room light. Dark ink on paper has zero glare.
* **Why Dark themes excel on computer monitors:** Computer screens are *active light emitters* (thousands of LEDs blasting lumens). In Light Mode, 90% of the screen acts as a backlight shining directly into your pupils, triggering pupil constriction. In Dark Mode, only the glyphs emit light.

### 3. Circadian Ambient Lux Targeting
* **Circadia Dark (*Warm Ember & Espresso*):** Calibrated for 0–50 lux (evening, night, or low-light rooms). Matches your relaxed pupil dilation and eliminates blue-light melatonin suppression.
* **Circadia Light (*Warm Parchment*):** Calibrated for 300–800+ lux (daylight near windows or bright offices), where strong ambient light balances out display luminance to eliminate retinal glare.

> [!TIP]
> **Pro Tip for Light Mode Users:**  
> If you code in Light Mode and want it to feel just as punchy as Dark Mode, increase your editor font weight by one step (e.g. in VS Code, set `"editor.fontWeight": "500"` or `"600"` and bump font size by `+1px`) to effortlessly counteract the Helmholtz irradiation thinning effect.

---

## 📁 Repository Structure

```
├── .github/
│   └── ISSUE_TEMPLATE/
│       ├── port-request.md         # Template for community port requests
│       └── bug-report.md           # Template for bug reports
│
├── spec/                           # The Single Source of Truth
│   ├── palette.json                # Raw OKLCH + Hex values for Light & Dark modes
│   ├── rules.md                    # Contrast & accessibility invariants (AAA rules)
│   └── token-map.md                # Mapping guide (e.g. Editor Cursor, Search Highlight)
│
├── ports/                          # 18 official theme ports (VS Code, Neovim, Zed, Obsidian, etc.)
│
├── scripts/                        # Automation & Generation
│   ├── validate.ts                 # Validates contrast ratios & checks for broken hexes
│   ├── generate-formats.ts         # Generates dist/ tables & assets/swatch-matrix.svg
│   └── build-all-ports.js          # Builds & updates theme files across all ports
│
├── dist/                           # Generated exports for third-party builders
│   ├── palette.json                # Flattened multi-format export
│   └── palette.csv                 # Tabular CSV export
│
├── assets/                         # Visuals for README & port authors
│   ├── preview-day.png
│   ├── preview-night.png
│   └── swatch-matrix.svg
│
├── CONTRIBUTING.md                 # Step-by-step guide for creating a new port
├── LICENSE
└── README.md                       # Palette overview, port table, status
```

---

## 🚀 Supported Ports & Status

| Application | Port Path | Modes Supported | Type | Author |
| :--- | :--- | :--- | :--- | :--- |
| **VS Code** | [`ports/vscode/`](ports/vscode) | Light, Dark | Theme Extension | [@tanmaymanojgandhi](https://github.com/tanmaymanojgandhi) |
| **Neovim** | [`ports/neovim/`](ports/neovim) | Light, Dark | Lua Plugin | [@tanmaymanojgandhi](https://github.com/tanmaymanojgandhi) |
| **Vim** | [`ports/vim/`](ports/vim) | Light, Dark | Vim Plugin | [@tanmaymanojgandhi](https://github.com/tanmaymanojgandhi) |
| **Zed** | [`ports/zed/`](ports/zed) | Light, Dark | Theme Extension | [@tanmaymanojgandhi](https://github.com/tanmaymanojgandhi) |
| **JetBrains IDEs** | [`ports/intellij/`](ports/intellij) | Light, Dark | ICLS Scheme | [@tanmaymanojgandhi](https://github.com/tanmaymanojgandhi) |
| **Xcode** | [`ports/xcode/`](ports/xcode) | Light, Dark | Xcode Theme Plist | [@tanmaymanojgandhi](https://github.com/tanmaymanojgandhi) |
| **Obsidian** | [`ports/obsidian/`](ports/obsidian) | Light, Dark | CSS Theme | [@tanmaymanojgandhi](https://github.com/tanmaymanojgandhi) |
| **Alacritty** | [`ports/alacritty/`](ports/alacritty) | Light, Dark | TOML Configs | [@tanmaymanojgandhi](https://github.com/tanmaymanojgandhi) |
| **Kitty** | [`ports/kitty/`](ports/kitty) | Light, Dark | Conf Files | [@tanmaymanojgandhi](https://github.com/tanmaymanojgandhi) |
| **iTerm2** | [`ports/iterm2/`](ports/iterm2) | Light, Dark | Color Presets | [@tanmaymanojgandhi](https://github.com/tanmaymanojgandhi) |
| **Konsole** | [`ports/konsole/`](ports/konsole) | Light, Dark | Color Scheme | [@tanmaymanojgandhi](https://github.com/tanmaymanojgandhi) |
| **Windows Terminal** | [`ports/windows-terminal/`](ports/windows-terminal) | Light, Dark | Color Schemes JSON | [@tanmaymanojgandhi](https://github.com/tanmaymanojgandhi) |
| **Google Chrome** | [`ports/chrome/`](ports/chrome) | Light, Dark | Browser Theme | [@tanmaymanojgandhi](https://github.com/tanmaymanojgandhi) |
| **Telegram Desktop** | [`ports/telegram/`](ports/telegram) | Light, Dark | Palette Files | [@tanmaymanojgandhi](https://github.com/tanmaymanojgandhi) |
| **Slack** | [`ports/slack/`](ports/slack) | Light, Dark | Color Strings | [@tanmaymanojgandhi](https://github.com/tanmaymanojgandhi) |
| **KDE Plasma** | [`ports/kde/`](ports/kde) | Light, Dark | Color Scheme | [@tanmaymanojgandhi](https://github.com/tanmaymanojgandhi) |
| **Tailwind CSS** | [`ports/tailwind/`](ports/tailwind) | Light, Dark | CSS @theme Tokens | [@tanmaymanojgandhi](https://github.com/tanmaymanojgandhi) |
| **VitePress** | [`ports/vitepress/`](ports/vitepress) | Light, Dark | CSS Theme Styles | [@tanmaymanojgandhi](https://github.com/tanmaymanojgandhi) |

---

## 🛠️ Tooling & Validation

```bash
# 1. Run contrast & format validation against spec/
npm run validate

# 2. Regenerate dist/palette.json and dist/palette.csv
npm run generate

# 3. Rebuild all theme ports from the single-source spec
npm run build:ports
```

---

## 🤝 Community Contribution Flow

- Want a port for your favorite editor, terminal, or shell? Check [`CONTRIBUTING.md`](CONTRIBUTING.md) or open a [Port Request](.github/ISSUE_TEMPLATE/port-request.md).
- Contributors submit PRs adding a new folder inside `ports/<app-name>/`.
- If a port grows significantly (e.g. standalone marketplace extension), it can be spun out into its own repository and linked from here.

---

## 📜 License

[MIT](LICENSE)
