# Accessibility, Contrast & Ergonomic Rules

All official ports and community contributions for **Circadia 2.0** must strictly satisfy these invariants across all 4 circadian modes.

---

### 1. The 4 Circadian Modes

Circadia 2.0 engineers 4 dedicated environments tailored to ambient lighting and cognitive context:

1. **☀️ `light_parchment` — Warm Parchment (Daylight Reading):**
   * *Canvas:* `#f7f2e6` (`oklch(96.0% 0.013 85)`).
   * *Role:* Anti-glare daylight contrast for 300–800+ lux environments. Prevents pupil constriction fatigue.
2. **☕ `dark_ember` — Dark Classic (Warm Ember & Espresso):**
   * *Canvas:* `#17130f` (`oklch(19.0% 0.010 67)`).
   * *Role:* Warm incandescent/candlelight ambiance (0–50 lux) with zero LCD/IPS backlight bleed.
3. **🍇 `dark_plum` — Dark Modern (Plum Noir):**
   * *Canvas:* `#140e12` (`oklch(16.5% 0.014 350)`).
   * *Role:* Sharp, energetic velvet plum for modern web/UI development and high-focus coding.
4. **🌲 `dark_forest` — Dark Focus (Obsidian Pine):**
   * *Canvas:* `#131714` (`oklch(17.8% 0.010 145)`).
   * *Role:* Deep restorative evergreen moss for data science, kernel development, and long terminal sessions.

---

### 2. Contrast Invariants (WCAG 2.1 AAA)

Every foreground token must be tested against its parent canvas background (`bg_canvas`):

- **Normal Text (`text_primary`, `text_muted`, Syntax)**: Must strictly satisfy $\ge 7.0:1$ WCAG AAA.
- **Large Text / Headings (H1–H6, `text_faint`)**: Must satisfy $\ge 4.5:1$ AA.
- **Interactive UI (`border`, focus indicators)**: Must satisfy $\ge 3.0:1$.

---

### 3. Multi-Dimensional CVD Separation (Color Vision Deficiency)

To ensure full accessibility for developers with Deuteranopia (green-blind), Protanopia (red-blind), or Tritanopia (blue-blind):

- **Lightness Hierarchy ($\Delta L > 8\%$)**: Tokens are never differentiated by hue alone. Keywords, Types, Functions, and Properties reside on distinct lightness steps.
- **Weight & Font Encoding**: Keywords feature bold typographic weighting (`fontStyle: bold`), while comments feature italic styling (`fontStyle: italic`).
- **Short vs. Long Wavelength Quadrants**: Blue (`keyword`) and Amber/Gold (`type`) sit in complementary quadrants, guaranteeing clear separation even under total monochromatic vision.

---

### 4. Heading Luminance Hierarchy

Headings must progress monotonically in visual weight from H1 down to H6 without contrast inversions:

- **Light Mode (`light_parchment`):** H1 is deepest blue (`L = 36%`, ~8.9:1), H6 is lightest blue (`L = 52.5%`, ~4.2:1).
- **Dark Modes (`dark_ember`, `dark_plum`, `dark_forest`):** H1 is brightest (`L = 84%–86%`, ~11.5–12.5:1), H6 is deepest (`L = 49%–62%`, ~4.0–4.6:1).

---

### 5. Eye Strain & Circadian Guidelines

- **No Pure Whites / Pitch OLED Blacks:** Light theme canvas must not use `#ffffff` (to prevent glare and pupil fatigue). Dark theme canvases must not use `#000000` (to eliminate astigmatism halation).
- **OKLCH Uniformity:** When adding custom tokens for plugins or language grammar, match the existing role's OKLCH Lightness value to guarantee uniform readability regardless of hue.
