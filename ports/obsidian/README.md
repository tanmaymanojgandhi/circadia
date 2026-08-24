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
| **Editor Canvas (`--k-bg`)** | `#f7f2e6` | `247, 242, 230` | `oklch(96.0% 0.013 85)` | 📜 Warm Linen Paper (Anti-glare) |
| **Sidebar / Tabs (`--k-bg-2`)** | `#eee7d6` | `238, 231, 214` | `oklch(92.5% 0.016 85)` | 🌾 Soft Parchment |
| **Hover / Cards (`--k-bg-3`)** | `#e5dcc6` | `229, 220, 198` | `oklch(88.5% 0.020 85)` | 🌾 Muted Linen |
| **App Gutter (`--k-app-bg`)** | `#e5dcc6` | `229, 220, 198` | `oklch(88.5% 0.020 85)` | 🏜️ Warm Sand Frame |
| **Primary Text (`--k-text`)** | `#28323a` | `40, 50, 58` | `oklch(30.0% 0.020 250)` | ✒️ Deep Slate Ink (11.3:1 Contrast) |
| **Muted Text (`--k-text-muted`)** | `#46535f` | `70, 83, 95` | `oklch(43.0% 0.025 250)` | 🌫️ Warm Graphite (6.8:1 Contrast) |
| **Faint Text (`--k-text-faint`)** | `#5f6d7a` | `95, 109, 122` | `oklch(53.0% 0.020 250)` | 🌫️ Slate Mist (4.6:1 Contrast) |
| **Border / Divider (`--k-border`)** | `#d7cdb7` | `215, 205, 183` | `oklch(83.0% 0.022 85)` | 📏 Soft Parchment Border |
| **Accent / Links (`--k-accent`)** | `#0048b3` | `0, 72, 179` | `oklch(43.8% 0.181 260)` | 🔷 Deep Royal Blue |
| **Keywords (`--k-keyword`)** | `#0048b3` | `0, 72, 179` | `oklch(43.8% 0.181 260)` | 🔷 Deep Royal Blue |
| **Classes / Types (`--k-var3`)** | `#843900` | `132, 57, 0` | `oklch(44.2% 0.162 62)` | 🏺 Warm Venetian Sienna |
| **Functions (`--k-var2`)** | `#7a1f7a` | `122, 31, 122` | `oklch(42.4% 0.164 328)` | 🔮 Royal Imperial Amethyst |
| **Strings (`--k-string`)** | `#005f2f` | `0, 95, 47` | `oklch(42.5% 0.110 153)` | 🌿 Deep Imperial Emerald |
| **Numbers / Math (`--k-number`)** | `#095b62` | `9, 91, 98` | `oklch(42.5% 0.080 204)` | 🍯 Deep Teal Cyan |
| **Tags / HTML (`--k-tag`)** | `#0048b3` | `0, 72, 179` | `oklch(43.8% 0.181 260)` | 📐 Royal Blue Tag |
| **Comments (`--k-comment`)** | `#5e564d` | `94, 86, 77` | `oklch(45.8% 0.018 71)` | 🪵 Driftwood Gray |

---

### 🌙 2. Night Mode: Warm Ember & Espresso (Circadian Night)
*Calibrated for dark rooms, night shifts, and low ambient light (0–50 lux).*

| Role / Token | Hex | RGB (32-bit) | OKLCH | Visual Swatch & Character |
| :--- | :--- | :--- | :--- | :--- |
| **Editor Canvas (`--k-bg`)** | `#17130f` | `23, 19, 15` | `oklch(19.0% 0.010 67)` | ☕ Warm Ember & Espresso Canvas |
| **Sidebar / Tabs (`--k-bg-2`)** | `#1e1a15` | `30, 26, 21` | `oklch(22.0% 0.012 67)` | 🪵 Espresso Surface |
| **Hover / Cards (`--k-bg-3`)** | `#29241e` | `41, 36, 30` | `oklch(26.0% 0.015 67)` | 🌌 Espresso Element |
| **App Gutter (`--k-app-bg`)** | `#120e0b` | `18, 14, 11` | `oklch(15.0% 0.009 67)` | 🕳️ Deep Shadow Gutter |
| **Primary Text (`--k-text`)** | `#c9c0b1` | `201, 192, 177` | `oklch(81.1% 0.023 81)` | 📜 Warm Parchment Bone |
| **Muted Text (`--k-text-muted`)** | `#b5aba0` | `181, 171, 160` | `oklch(75.0% 0.020 81)` | 🪵 Warm Taupe |
| **Faint Text (`--k-text-faint`)** | `#91887d` | `145, 136, 125` | `oklch(63.0% 0.018 75)` | 🪨 Cedar Shadow |
| **Border / Divider (`--k-border`)** | `#3b342b` | `59, 52, 43` | `oklch(33.0% 0.018 67)` | 📐 Espresso Border |
| **Accent / Links (`--k-accent`)** | `#e89a49` | `232, 154, 73` | `oklch(75.0% 0.130 65)` | 🕯️ Warm Amber Gold |
| **Keywords (`--k-keyword`)** | `#66abc6` | `102, 171, 198` | `oklch(70.6% 0.080 225)` | 🔷 Soft Sky Blue |
| **Classes / Types (`--k-var3`)** | `#d9a86e` | `217, 168, 110` | `oklch(76.4% 0.095 70)` | 🏜️ Warm Sand / Clay |
| **Functions (`--k-var2`)** | `#b991db` | `185, 145, 219` | `oklch(72.0% 0.114 308.5)` | 🌸 Soft Violet Orchid |
| **Strings (`--k-string`)** | `#8cbb62` | `140, 187, 98` | `oklch(73.8% 0.129 132)` | 🍃 Warm Olive Sage |
| **Numbers / Math (`--k-number`)** | `#d99148` | `217, 145, 72` | `oklch(71.5% 0.124 64)` | 🍯 Honey Amber |
| **Tags / HTML (`--k-tag`)** | `#66abc6` | `102, 171, 198` | `oklch(70.6% 0.080 225)` | 📐 Soft Sky Tag |
| **Comments (`--k-comment`)** | `#a9a093` | `169, 160, 147` | `oklch(71.0% 0.021 75)` | 🪵 Cedarwood Ash |

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
