<p align="center">
  <img src="https://raw.githubusercontent.com/tanmaymanojgandhi/circadia/main/assets/circadia-logo.png" alt="Circadia Theme Logo" width="160" height="160">
</p>

<h1 align="center">Circadia</h1>

<p align="center">
  <em>OKLCH themes for code, terminals, and documents.</em>
</p>

Circadia is an open color specification and theme system for code editors, terminal emulators, and document renderers. It uses OKLCH to describe background, text, and syntax colors. Automated checks measure contrast for documented color pairs. The light palette meets a 7:1 text contrast target on its three base backgrounds; the dark palettes and other rendered states need further validation. Color vision accessibility is a design goal, not a verified guarantee.

<p align="center">
  <img src="https://raw.githubusercontent.com/tanmaymanojgandhi/circadia/main/assets/swatch-matrix.svg" alt="Circadia 2.0 Color Palette Matrix (4 Modes: Warm Parchment, Dark Classic, Dark Modern, Dark Focus)" width="100%">
</p>

---

## Color variants

| Variant | Canvas | Appearance |
| --- | --- | --- |
| Warm Parchment | `#f7f4ec` | Warm paper background with blue headings |
| Warm Ember & Espresso | `#17130f` | Brown-black background with amber accents |
| Plum Noir | `#140e12` | Plum-black background with rose accents |
| Obsidian Pine | `#131714` | Green-black background with sage accents |

## Color vision accessibility

Syntax roles use different hues. Some editor ports also use bold keywords and italic comments. These cues are intended to supplement color; they do not establish universal CVD accessibility. A minimum lightness separation is not currently enforced. CVD simulations and rendered checks across ports remain pending.

## Contrast validation

The light palette checks all text, syntax, and heading tokens against canvas, surface, and element backgrounds at >= 7:1. The dark modes retain legacy thresholds and have tokens below 7:1. Decorative borders are separate from text contrast. These checks do not certify complete WCAG conformance or every application state.

The following ratios are calculated against each mode’s canvas:

| Token | Light | Ember | Plum | Forest |
| --- | ---: | ---: | ---: | ---: |
| `text_primary` | 11.89:1 | 10.26:1 | 11.91:1 | 11.02:1 |
| `keyword` | 8.61:1 | 7.22:1 | 7.80:1 | 7.46:1 |
| `type` | 8.58:1 | 8.60:1 | 9.02:1 | 8.37:1 |
| `function` | 8.55:1 | 7.16:1 | 7.44:1 | 7.24:1 |
| `property` | 9.44:1 | 7.20:1 | 7.37:1 | 7.21:1 |
| `string` | 8.53:1 | 8.27:1 | 8.50:1 | 8.08:1 |
| `number` | 8.60:1 | 7.12:1 | 7.77:1 | 7.40:1 |
| `comment` | 8.59:1 | 6.85:1 | 6.95:1 | 6.10:1 |

## 📁 Repository Structure

```
├── spec/                           # The Single Source of Truth (palette.json, rules.md, token-map.md)
├── ports/                          # 20 official ports (VS Code, tmux, Neovim, Zed, WezTerm, etc.)
├── scripts/                        # Automated Build & Validation Pipeline (validate.ts, generate-formats.ts, build-all-ports.js)
├── dist/                           # Multi-format exports for third-party tools (palette.json, palette.csv)
├── docs/                           # Interactive documentation & token inspector (GitHub Pages)
└── assets/                         # Vector assets and 4-mode swatch matrix (swatch-matrix.svg)
```

---

## 🚀 Supported Ports (20 Official Ports)

| Application | Port Path | Flavours Supported | Type | Author |
| :--- | :--- | :--- | :--- | :--- |
| **VS Code** | [`ports/vscode/`](ports/vscode) | All 4 Modes | Theme Extension | [@tanmaymanojgandhi](https://github.com/tanmaymanojgandhi) |
| **tmux** | [`ports/tmux/`](ports/tmux) | All 4 Modes | TPM Plugin / Conf | [@tanmaymanojgandhi](https://github.com/tanmaymanojgandhi) |
| **Neovim** | [`ports/neovim/`](ports/neovim) | All 4 Modes | Treesitter Lua Plugin | [@tanmaymanojgandhi](https://github.com/tanmaymanojgandhi) |
| **Zed** | [`ports/zed/`](ports/zed) | All 4 Modes | Native Extension | [@tanmaymanojgandhi](https://github.com/tanmaymanojgandhi) |
| **WezTerm** | [`ports/wezterm/`](ports/wezterm) | All 4 Modes | TOML Schemes & Lua | [@tanmaymanojgandhi](https://github.com/tanmaymanojgandhi) |
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
# 1. Run strict contrast & accessibility validation (strict light-theme checks across canvas, surface, and element)
npm run validate

# 2. Regenerate dist/ palette exports & 4-mode vector swatch matrix
npm run generate

# 3. Rebuild all 20 theme ports from the single-source spec
npm run build:ports
```

---

## 🤝 Community & Contributing

Want a port for your favorite editor, terminal, or shell? Check [`CONTRIBUTING.md`](CONTRIBUTING.md) or open a [Port Request](.github/ISSUE_TEMPLATE/port-request.md).

---

## 📜 License

[MIT](LICENSE) © [Tanmay Manoj Gandhi](https://github.com/tanmaymanojgandhi)
