# Circadia

> **Warm Parchment by day. Quiet Ember & Obsidian by night.**  
> A perceptually calibrated, circadian dual-mode theme engineered for long hours of writing, note-taking, and code reading.

![Circadia Preview](./screenshot.png)

---

## 🏛️ OKLCH 32-Bit Color Architecture

**Circadia** is architected using the **OKLCH** color model (*Oklab Lightness, Chroma, Hue*), standardizing all surfaces and syntax on a 32-bit perceptual color pipeline:

$$\text{Color} = \text{oklch}(L \quad C \quad H)$$

### Why OKLCH?
1. **Perceptual Uniformity ($L$):** Traditional RGB and HSL fail to account for human ocular sensitivity (yellow appears artificially brighter than blue at identical lightness values). OKLCH guarantees constant perceived luminance across different hues.
2. **Zero Chromatic Aberration ($C$):** Chromatic intensity is strictly clamped to avoid fluorescent glare, eye strain, and retina fatigue.
3. **Circadian Hue Mapping ($H$):** Night mode completely eliminates high-energy blue wavelengths (450–480nm), replacing them with warm ember, terracotta, and gold wavelengths to support melatonin preservation.
4. **Zero-Red Semantic Cleanliness:** Red (`#dc2626` / `#e06c75`) is strictly quarantined for syntax errors, merge conflicts, and critical alert badges. Keywords and classes use Royal Amethyst, Heather Orchid, and Sand Gold to eliminate cognitive alarm fatigue.

---

## 🎨 Complete Color Palette Matrix

### ☀️ 1. Day Mode: Warm Parchment (Editorial Daylight)
*Calibrated for ambient light and bright daylight environments (300–800+ lux).*

| Role / Token | Hex | RGB (32-bit) | OKLCH | Visual Swatch & Character |
| :--- | :--- | :--- | :--- | :--- |
| **Editor Canvas (`--k-bg`)** | `#f4eee1` | `244, 238, 225` | `oklch(95.2% 0.015 85)` | 📜 Warm Linen Paper (Anti-glare) |
| **Sidebar / Tabs (`--k-bg-2`)** | `#ece4d4` | `236, 228, 212` | `oklch(91.8% 0.018 85)` | 🌾 Soft Parchment |
| **Hover / Cards (`--k-bg-3`)** | `#e2d8c3` | `226, 216, 195` | `oklch(87.5% 0.022 85)` | 🌾 Muted Linen |
| **App Gutter (`--k-app-bg`)** | `#e2d8c3` | `226, 216, 195` | `oklch(87.5% 0.022 85)` | 🏜️ Warm Sand Frame |
| **Primary Text (`--k-text`)** | `#28323a` | `40, 50, 58` | `oklch(30.0% 0.020 250)` | ✒️ Deep Slate Ink (11.3:1 Contrast) |
| **Muted Text (`--k-text-muted`)** | `#46535f` | `70, 83, 95` | `oklch(43.0% 0.025 250)` | 🌫️ Warm Graphite (6.8:1 Contrast) |
| **Faint Text (`--k-text-faint`)** | `#5f6d7a` | `95, 109, 122` | `oklch(53.0% 0.020 250)` | 🌫️ Slate Mist (4.6:1 Contrast) |
| **Border / Divider (`--k-border`)** | `#d4c8b2` | `212, 200, 178` | `oklch(81.5% 0.024 85)` | 📏 Soft Parchment Border |
| **Accent / Links (`--k-accent`)** | `#195697` | `25, 86, 151` | `oklch(44.0% 0.120 250)` | 🔷 Deep Sapphire Indigo |
| **Keywords (`--k-keyword`)** | `#631c84` | `99, 28, 132` | `oklch(39.0% 0.165 312)` | 🔮 Royal Imperial Amethyst |
| **Classes / Types (`--k-var3`)** | `#7f3500` | `127, 53, 0` | `oklch(42.5% 0.140 65)` | 🏺 Warm Venetian Sienna |
| **Functions (`--k-var2`)** | `#09489a` | `9, 72, 154` | `oklch(41.0% 0.145 255)` | 🔷 Vivid Royal Cobalt |
| **Strings (`--k-string`)** | `#085802` | `8, 88, 2` | `oklch(40.5% 0.145 142)` | 🌿 Deep Imperial Emerald |
| **Numbers / Math (`--k-number`)** | `#8a2d00` | `138, 45, 0` | `oklch(43.0% 0.155 48)` | 🍯 Rich Terracotta Copper |
| **Tags / HTML (`--k-tag`)** | `#09489a` | `9, 72, 154` | `oklch(41.0% 0.145 255)` | 📐 Royal Cobalt Tag |
| **Comments (`--k-comment`)** | `#574f46` | `87, 79, 70` | `oklch(43.5% 0.025 60)` | 🪵 Driftwood Gray |

---

### 🌙 2. Night Mode: Warm Ember & Espresso (Circadian Night)
*Calibrated for dark rooms, night shifts, and low ambient light (0–50 lux).*

| Role / Token | Hex | RGB (32-bit) | OKLCH | Visual Swatch & Character |
| :--- | :--- | :--- | :--- | :--- |
| **Editor Canvas (`--k-bg`)** | `#15141b` | `21, 20, 27` | `oklch(19.0% 0.012 290)` | 🌑 Warm Obsidian Charcoal |
| **Sidebar / Tabs (`--k-bg-2`)** | `#1c1a24` | `28, 26, 36` | `oklch(22.0% 0.015 290)` | 🔮 Warm Plum Black |
| **Hover / Cards (`--k-bg-3`)** | `#252330` | `37, 35, 48` | `oklch(26.0% 0.018 290)` | 🌌 Dark Heather |
| **App Gutter (`--k-app-bg`)** | `#0f0e13` | `15, 14, 19` | `oklch(16.5% 0.010 295)` | 🕳️ Near-OLED Shadow |
| **Primary Text (`--k-text`)** | `#eae3d8` | `234, 227, 216` | `oklch(91.0% 0.015 85)` | 📜 Warm Parchment Bone (14.3:1 Contrast) |
| **Muted Text (`--k-text-muted`)** | `#b7aca0` | `183, 172, 160` | `oklch(76.0% 0.020 85)` | 🪵 Warm Taupe (8.2:1 Contrast) |
| **Faint Text (`--k-text-faint`)** | `#92887d` | `146, 136, 125` | `oklch(64.0% 0.018 85)` | 🪨 Cedar Shadow (5.2:1 Contrast) |
| **Border / Divider (`--k-border`)** | `#343041` | `52, 48, 65` | `oklch(33.0% 0.020 290)` | 📐 Heather Border |
| **Accent / Links (`--k-accent`)** | `#e89a49` | `232, 154, 73` | `oklch(75.0% 0.130 65)` | 🕯️ Warm Amber Gold |
| **Keywords (`--k-keyword`)** | `#e59de8` | `229, 157, 232` | `oklch(80.0% 0.130 320)` | 🌸 Muted Heather Orchid |
| **Classes / Types (`--k-var3`)** | `#f1be85` | `241, 190, 133` | `oklch(82.0% 0.090 75)` | 🏜️ Warm Sand / Clay |
| **Functions (`--k-var2`)** | `#89c8e4` | `137, 200, 228` | `oklch(79.0% 0.080 230)` | 🪨 Sky Ice Teal |
| **Strings (`--k-string`)** | `#a7db76` | `167, 219, 118` | `oklch(80.0% 0.130 135)` | 🍃 Warm Olive Sage |
| **Numbers / Math (`--k-number`)** | `#f6a84d` | `246, 168, 77` | `oklch(79.0% 0.140 60)` | 🍯 Honey Amber |
| **Tags / HTML (`--k-tag`)** | `#e89a49` | `232, 154, 73` | `oklch(75.0% 0.130 65)` | 🕯️ Warm Amber Gold |
| **Comments (`--k-comment`)** | `#b3aba0` | `179, 171, 160` | `oklch(75.5% 0.020 60)` | 🪵 Cedarwood Ash |

---

## 📐 Heading Elevation Scale

Both Day and Night themes employ a continuous, non-jarring stepped hierarchy:

* **H1**: Top-level section anchor ($1.6\times$ font-size) with distinct bottom accent underline
* **H2**: Major subsection divider ($1.4\times$)
* **H3**: Topic anchor ($1.25\times$)
* **H4–H6**: Micro-sections ($1.15\times \rightarrow 1.0\times$)

| Level | ☀️ Day Mode (Sapphire Gradient) | 🌙 Night Mode (Zero-Red Warm Scale) |
| :--- | :--- | :--- |
| **H1** | `#1c4470` *(Deep Sapphire Navy)* | `#f8c88f` *(Warm Butter Gold)* |
| **H2** | `#20538a` *(Royal Sapphire)* | `#f2b26c` *(Warm Amber)* |
| **H3** | `#1c60a2` *(Bright Sapphire)* | `#ea9d49` *(Amber Gold)* |
| **H4** | `#236bb5` *(Sky Sapphire)* | `#db8935` *(Ochre Amber)* |
| **H5** | `#286fc0` *(Soft Cornflower)* | `#c7792e` *(Tawny Amber)* |
| **H6** | `#2f75c6` *(Frost Ice)* | `#b56f2b` *(Deep Amber Cinnamon)* |

---

## ✨ Features

- **Dual-Mode Ergonomics:** Seamless transition between daylight reading and night circadian preservation.
- **Underlined Tab Navigation:** Clean, modern editor tab bar with active accent underline.
- **Direct SVG Checklist Flags:** 14 distinct task states (`[x]`, `[/]`, `[-]`, `[!]`, `[?]`, `[*]`, `[i]`, etc.).
- **Minimalist Clean Borders:** Zero heavy shadows; 1px precision dividers.
- **Accurate Zero-Drift Typography:** Powered by `Lexend` & `Inter` system stack.
- **Full Callout Engine:** Semantic color borders with zero contrast collisions.

---

## 🚀 Installation

### In Obsidian:
1. Open **Settings → Appearance → Themes**
2. Click **Manage**
3. Search for **Circadia** (or clone this repository into your `.obsidian/themes/` directory)
4. Enable the theme and switch between Light/Dark mode as desired.

---

## 📜 License

MIT © [Tanmay](https://github.com/tanmaymanojgandhi)
