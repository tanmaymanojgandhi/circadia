# Accessibility, Contrast & Ergonomic Rules

All official ports and community contributions for **Circadia** must strictly satisfy these invariants.

---

### 1. Contrast Invariants (WCAG 2.1 AAA)

Every foreground token must be tested against its parent canvas background (`bg_canvas`):

- **Normal Text (`text_primary`, `text_muted`, Syntax)**: Must satisfy $\ge 7.0:1$.
- **Large Text / Headings (H1–H6, `text_faint`)**: Must satisfy $\ge 4.5:1$ (assuming $\ge 18\text{pt}$ normal or $\ge 14\text{pt}$ bold).
- **Interactive & Non-Text UI (`border`, focus indicators)**: Must satisfy $\ge 3.0:1$.

---

### 2. Heading Luminance Hierarchy

Headings must progress in visual weight from H1 down to H6 without contrast inversions:

- **Light Mode (Warm Parchment):**
  - H1 is the darkest blue (`L = 36%`, ~9.8:1 contrast).
  - H6 is the lightest blue (`L = 54%`, ~4.5:1 contrast).
  - _Hierarchy:_ Higher levels = Darker / Higher Contrast.

- **Dark Mode (Warm Ember & Espresso):**
  - H1 is the brightest amber (`L = 86%`, ~11.2:1 contrast).
  - H6 is the deepest amber (`L = 62%`, ~4.5:1 contrast).
  - _Hierarchy:_ Higher levels = Brighter / Higher Contrast.

---

### 3. Eye Strain & Circadian Guidelines

- **No Pure Whites / Pure OLED Blacks:** Light theme canvas must not use `#ffffff` (to prevent glare and pupil fatigue). Dark theme canvas must not use `#000000` (to avoid astigmatism halation).
- **OKLCH Uniformity:** When adding custom tokens for plugins or language grammar, match the existing role's OKLCH Lightness value to guarantee uniform readability regardless of hue.
