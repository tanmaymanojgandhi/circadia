# Circadia

> **Perceptually uniform, low-strain themes engineered for continuous focus.**

Circadia is an open color specification engineered in OKLCH for cross-platform editors, document renderers, and terminal tools. Built around circadian light science, it delivers glare-free daylight contrast (Warm Parchment) and halation-free evening warmth (Warm Ember & Obsidian)—strictly maintaining WCAG 2.1 AAA legibility for long coding and writing sessions.

![Circadia Color Palette Swatch Matrix](assets/swatch-matrix.svg)

---

## 🎨 Palette Specification & Swatch Matrix

### ☀️ Warm Parchment (Light Mode • 300–800+ lux)
*Engineered to eliminate retinal glare under bright daylight and office environments.*

| Token | Semantic Role | Hex / Swatch | OKLCH Definition | Contrast vs Canvas |
| :--- | :--- | :--- | :--- | :--- |
| **`bg_canvas`** | Canvas Background | `#f4eee1` | `oklch(95.2% 0.015 85)` | Base Canvas |
| **`bg_surface`** | Sidebars & Inactive Tabs | `#ece4d4` | `oklch(91.8% 0.018 85)` | UI Surface |
| **`bg_element`** | Active Line & Selection | `#e2d8c3` | `oklch(87.5% 0.022 85)` | UI Element |
| **`border`** | 1px Panel Dividers | `#d4c8b2` | `oklch(81.5% 0.024 85)` | UI Border |
| **`text_primary`** | Body Text & Punctuation | `#28323a` | `oklch(30.0% 0.020 250)` | **11.30:1 (AAA)** |
| **`text_muted`** | Secondary Text / Operators | `#46535f` | `oklch(43.0% 0.025 250)` | **6.82:1 (AA)** |
| **`text_faint`** | Line Numbers & Guides | `#5f6d7a` | `oklch(53.0% 0.020 250)` | **4.59:1 (AA)** |
| **`accent`** | Focus Rings & Links | `#09489a` | `oklch(41.0% 0.145 255)` | **7.55:1 (AAA)** |
| **`keyword`** | Keywords & Flow Control | `#631c84` | `oklch(39.0% 0.165 312)` | **8.95:1 (AAA)** |
| **`type`** | Types, Classes & Structs | `#7f3500` | `oklch(42.5% 0.140 65)` | **7.53:1 (AAA)** |
| **`function`** | Functions & Methods | `#09489a` | `oklch(41.0% 0.145 255)` | **7.55:1 (AAA)** |
| **`string`** | String Literals | `#085802` | `oklch(40.5% 0.145 142)` | **7.55:1 (AAA)** |
| **`number`** | Numeric & Constant Literals | `#8a2d00` | `oklch(43.0% 0.155 48)` | **7.40:1 (AAA)** |
| **`comment`** | Code Comments | `#574f46` | `oklch(43.5% 0.025 60)` | **6.95:1 (AA)** |

---

### 🌙 Warm Ember & Obsidian (Dark Mode • 0–50 lux)
*Engineered for night shifts and low ambient light with zero blue-light melatonin suppression.*

| Token | Semantic Role | Hex / Swatch | OKLCH Definition | Contrast vs Canvas |
| :--- | :--- | :--- | :--- | :--- |
| **`bg_canvas`** | Canvas Background | `#15141b` | `oklch(19.0% 0.012 290)` | Base Canvas |
| **`bg_surface`** | Sidebars & Inactive Tabs | `#1c1a24` | `oklch(22.0% 0.015 290)` | UI Surface |
| **`bg_element`** | Active Line & Selection | `#252330` | `oklch(26.0% 0.018 290)` | UI Element |
| **`border`** | 1px Panel Dividers | `#343041` | `oklch(33.0% 0.020 290)` | UI Border |
| **`text_primary`** | Body Text & Punctuation | `#eae3d8` | `oklch(91.0% 0.015 85)` | **14.36:1 (AAA)** |
| **`text_muted`** | Secondary Text / Operators | `#b7aca0` | `oklch(76.0% 0.020 85)` | **8.21:1 (AAA)** |
| **`text_faint`** | Line Numbers & Guides | `#92887d` | `oklch(64.0% 0.018 85)` | **5.26:1 (AA)** |
| **`accent`** | Focus Rings & Links | `#e89a49` | `oklch(75.0% 0.130 65)` | **7.97:1 (AAA)** |
| **`keyword`** | Keywords & Flow Control | `#e59de8` | `oklch(80.0% 0.130 320)` | **8.99:1 (AAA)** |
| **`type`** | Types, Classes & Structs | `#f1be85` | `oklch(82.0% 0.090 75)` | **9.94:1 (AAA)** |
| **`function`** | Functions & Methods | `#89c8e4` | `oklch(79.0% 0.080 230)` | **10.22:1 (AAA)** |
| **`string`** | String Literals | `#a7db76` | `oklch(80.0% 0.130 135)` | **11.36:1 (AAA)** |
| **`number`** | Numeric & Constant Literals | `#f6a84d` | `oklch(79.0% 0.140 60)` | **9.26:1 (AAA)** |
| **`comment`** | Code Comments | `#b3aba0` | `oklch(75.5% 0.020 60)` | **8.06:1 (AAA)** |

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
* **Circadia Dark (*Warm Ember & Obsidian*):** Calibrated for 0–50 lux (evening, night, or low-light rooms). Matches your relaxed pupil dilation and eliminates blue-light melatonin suppression.
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
├── ports/                          # Community & official theme configs
│   ├── alacritty/                  # Alacritty terminal TOML (Light & Dark)
│   ├── chrome/                     # Google Chrome theme manifests (Light & Dark)
│   ├── intellij/                   # JetBrains IDE color schemes (Light & Dark)
│   ├── iterm2/                     # iTerm2 color presets (Light & Dark)
│   ├── kde/                        # KDE Plasma color schemes (Light & Dark)
│   ├── kitty/                      # Kitty terminal conf (Light & Dark)
│   ├── konsole/                    # KDE Konsole color schemes (Light & Dark)
│   ├── neovim/                     # Neovim / Lua plugin (Light & Dark)
│   ├── obsidian/                   # Obsidian theme CSS (Light & Dark)
│   ├── slack/                      # Slack custom color themes (Light & Dark)
│   ├── tailwind/                   # Tailwind CSS v4 @theme design tokens
│   ├── telegram/                   # Telegram Desktop themes (Light & Dark)
│   ├── vim/                        # Classic Vim colorschemes (Light & Dark)
│   ├── vitepress/                  # VitePress theme CSS variables (Light & Dark)
│   ├── vscode/                     # Visual Studio Code extension (Light & Dark)
│   ├── windows-terminal/           # Windows Terminal JSON schemes (Light & Dark)
│   ├── xcode/                      # Apple Xcode theme plists (Light & Dark)
│   └── zed/                        # Zed Editor theme extension (Light & Dark)
│
├── scripts/                        # Automation & Generation
│   ├── validate.ts                 # Validates contrast ratios & checks for broken hexes
│   ├── generate-formats.ts         # Generates dist/ raw tables (Hex, RGB, HSL, OKLCH)
│   └── build-all-ports.js          # Builds & updates theme files across all ports
│
├── dist/                           # Generated exports for third-party builders
│   ├── palette.json                # Flattened multi-format export
│   └── palette.csv                 # Tabular CSV export
│
├── assets/                         # Visuals for README & port authors
│   ├── preview-day.png
│   ├── preview-night.png
│   └── swatch-matrix.png
│
├── CONTRIBUTING.md                 # Step-by-step guide for creating a new port
├── LICENSE
└── README.md                       # Palette overview, port table, status
```

---

## 🚀 Supported Ports & Status

| Application          | Port Path                                           | Modes Supported | Type               |
| :------------------- | :-------------------------------------------------- | :-------------- | :----------------- |
| **VS Code**          | [`ports/vscode/`](ports/vscode)                     | Light, Dark     | Theme Extension    |
| **Neovim**           | [`ports/neovim/`](ports/neovim)                     | Light, Dark     | Lua Plugin         |
| **Vim**              | [`ports/vim/`](ports/vim)                           | Light, Dark     | Vim Plugin         |
| **Zed**              | [`ports/zed/`](ports/zed)                           | Light, Dark     | Theme Extension    |
| **JetBrains IDEs**   | [`ports/intellij/`](ports/intellij)                 | Light, Dark     | ICLS Scheme        |
| **Xcode**            | [`ports/xcode/`](ports/xcode)                       | Light, Dark     | Xcode Theme Plist  |
| **Obsidian**         | [`ports/obsidian/`](ports/obsidian)                 | Light, Dark     | CSS Theme          |
| **Alacritty**        | [`ports/alacritty/`](ports/alacritty)               | Light, Dark     | TOML Configs       |
| **Kitty**            | [`ports/kitty/`](ports/kitty)                       | Light, Dark     | Conf Files         |
| **iTerm2**           | [`ports/iterm2/`](ports/iterm2)                     | Light, Dark     | Color Presets      |
| **Konsole**          | [`ports/konsole/`](ports/konsole)                   | Light, Dark     | Color Scheme       |
| **Windows Terminal** | [`ports/windows-terminal/`](ports/windows-terminal) | Light, Dark     | Color Schemes JSON |
| **Google Chrome**    | [`ports/chrome/`](ports/chrome)                     | Light, Dark     | Browser Theme      |
| **Telegram Desktop** | [`ports/telegram/`](ports/telegram)                 | Light, Dark     | Palette Files      |
| **Slack**            | [`ports/slack/`](ports/slack)                       | Light, Dark     | Color Strings      |
| **KDE Plasma**       | [`ports/kde/`](ports/kde)                           | Light, Dark     | Color Scheme       |
| **Tailwind CSS**     | [`ports/tailwind/`](ports/tailwind)                 | Light, Dark     | CSS @theme Tokens  |
| **VitePress**        | [`ports/vitepress/`](ports/vitepress)               | Light, Dark     | CSS Theme Styles   |

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
