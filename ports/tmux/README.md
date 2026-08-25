# Circadia for tmux

Circadian-aligned status bar and pane styling engineered in OKLCH for tmux.

## Available Flavours

* **`light-parchment`**: ☀️ Warm Parchment (Daylight Reading, `#f7f2e6`)
* **`dark-ember`**: ☕ Dark Classic — Warm Ember & Espresso (`#17130f`)
* **`dark-plum`**: 🍇 Dark Modern — Plum Noir (`#140e12`)
* **`dark-forest`**: 🌲 Dark Focus — Obsidian Pine (`#131714`)

---

## Installation via TPM (Tmux Plugin Manager)

1. Add the plugin to your `~/.tmux.conf`:
   ```tmux
   set -g @plugin 'tanmaymanojgandhi/circadia'
   set -g @circadia_flavour 'dark-ember' # Options: light-parchment, dark-ember, dark-plum, dark-forest
   ```
2. Press `prefix + I` to install the plugin and refresh your tmux session.

---

## Manual Installation

Source your chosen flavour directly in your `~/.tmux.conf`:

```tmux
# Example: Dark Classic (Warm Ember & Espresso)
source-file "/path/to/circadia/ports/tmux/circadia-dark-ember.tmux"

# Or Dark Modern (Plum Noir)
# source-file "/path/to/circadia/ports/tmux/circadia-dark-plum.tmux"

# Or Dark Focus (Obsidian Pine)
# source-file "/path/to/circadia/ports/tmux/circadia-dark-forest.tmux"

# Or Warm Parchment (Light)
# source-file "/path/to/circadia/ports/tmux/circadia-light-parchment.tmux"
```
