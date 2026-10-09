# Color and contrast rules

These rules describe current validation coverage and targets for future changes.

## Color variants

| Variant | Canvas | Appearance |
| --- | --- | --- |
| Warm Parchment | `#f7f4ec` | Warm paper |
| Warm Ember & Espresso | `#17130f` | Brown-black with amber accents |
| Plum Noir | `#140e12` | Plum-black with rose accents |
| Obsidian Pine | `#131714` | Green-black with sage accents |

Variant names describe appearance. They do not imply measured effects on sleep, eye strain, or display hardware.

## Contrast validation

For all four palettes, every text token (`text_primary`, `text_muted`, `text_faint`, `accent`, all syntax including comments, and H1–H6) must meet **>= 7:1** against each of `bg_canvas`, `bg_surface`, and `bg_element`. Metadata is lighter than secondary text in light mode and darker in dark mode. Heading lightness increases from H1 to H6 in light mode and decreases in dark mode. Generated VS Code selection and search backgrounds have additional contrast checks.

All four modes enforce the same 7:1 text threshold on these three base backgrounds.

The project target is >= 7:1 for normal text. Required control boundaries and focus indicators should meet >= 3:1 against adjacent backgrounds. Decorative dividers and background layers are separate from text contrast.

Passing palette checks does not establish complete WCAG conformance or cover every foreground/background pairing an application or plugin can render.

## Color vision accessibility

Syntax roles use different hues. Some editor ports use bold keywords and italic comments to supplement color. These cues are not a guarantee of CVD accessibility.

There is no enforced minimum lightness difference between confusable syntax pairs. CVD simulations and rendered checks across supported applications remain pending.

## Heading hierarchy

The validator checks an ordered heading lightness progression in every mode. Its H1 and H6 contrast ratios on canvas are 13.30:1 and 8.55:1; all six levels also meet 7:1 on the other two base layers.

Dark headings use a shared neutral ladder. Obsidian uses blue links and sage controls in all dark variants. Size and weight supplement heading color.

## Color model

Use OKLCH to describe lightness, chroma, and hue. Compute contrast from the final sRGB colors. Matching OKLCH lightness alone does not establish sufficient contrast or equal readability across hues.

The current canvases avoid pure white and pure black as a design choice. Comfort depends on display brightness, ambient conditions, and individual preference; no physiological benefit is claimed.
