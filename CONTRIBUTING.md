# Contributing to Circadia

Thank you for your interest in contributing to Circadia!

> **Perceptually uniform, low-strain themes engineered for continuous focus.**

Circadia is an open color specification engineered in OKLCH for cross-platform editors, document renderers, and terminal tools. Built around circadian light science, it delivers glare-free daylight contrast (Warm Parchment) and halation-free evening warmth (Warm Ember & Espresso)—strictly maintaining WCAG 2.1 AAA legibility for long coding and writing sessions.

---

## Architecture Overview

All color values and semantic token mappings originate in the `spec/` directory:

- **`spec/palette.json`**: Single source of truth containing Hex and OKLCH definitions.
- **`spec/rules.md`**: Contrast ratios and accessibility invariants (WCAG AAA/AA).
- **`spec/token-map.md`**: Semantic mapping guide for editors, terminals, and UI components.

---

## Community Port Contribution Flow

We welcome ports for new editors, terminal emulators, desktop applications, and web tools!

### 1. Creating a New Port
1. Create a new directory inside `ports/<app-name>/`.
2. Reference the color values from `spec/palette.json` or `spec/token-map.md`.
3. If the tool supports build scripts, write a script to generate the config from `spec/palette.json` (see `ports/vscode/scripts/build-theme.js` as an example).
4. Include a `README.md` inside `ports/<app-name>/` with installation instructions and screenshots.

### 2. Testing & Invariants
- Verify that your port satisfies the accessibility and contrast rules in [`spec/rules.md`](spec/rules.md).
- Run the validator to ensure everything is in order:
  ```bash
  npm run validate
  ```

### 3. Submitting a Pull Request
- Open a PR with the title: `[Port]: Add <App Name> port`.
- Include screenshots of Day and Night modes.

### 4. Large Port Spin-Out Policy
If a port becomes large or requires its own dedicated release cycle (such as a marketplace-published VS Code extension, JetBrains plugin, or Raycast extension), it can be spun out into its own dedicated repository (e.g. `circadia/<app-name>`). In such cases, the subfolder in `ports/` will provide documentation and link to the standalone repo.

---

## Modifying the Core Palette

Any changes to `spec/palette.json` must preserve WCAG accessibility targets:
1. Edit `spec/palette.json`.
2. Run `npm run validate` to check contrast ratios and hex syntax.
3. Run `npm run generate` to regenerate `dist/palette.json` and `dist/palette.csv`.
4. Run `npm run build:vscode` or respective port builders.
