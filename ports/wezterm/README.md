# Circadia for WezTerm

Perceptually calibrated, low-strain themes engineered in OKLCH for [WezTerm](https://wezfurlong.org/wezterm/).
Features 100% strict WCAG 2.1 AAA contrast, halation-free dark modes, glare-free light mode, and styled tab bars.

---

## 🎨 Available Flavours

| Flavour | Name in WezTerm | Description | Background |
| :--- | :--- | :--- | :--- |
| ☀️ **Warm Parchment** | `Circadia Warm Parchment` (or `Circadia Light`) | Daylight Reading | `#f7f2e6` |
| ☕ **Dark Classic** | `Circadia Dark Ember` (or `Circadia Dark`) | Warm Ember & Espresso | `#17130f` |
| 🍇 **Dark Modern** | `Circadia Dark Plum` | Plum Noir & Velvet | `#140e12` |
| 🌲 **Dark Focus** | `Circadia Dark Forest` | Obsidian Pine | `#131714` |

---

## 🚀 Installation

### Option 1: Standalone TOML Schemes (Recommended)

1. Copy the files in `ports/wezterm/colors/` to your WezTerm colors directory:
   - **Linux / macOS**: `~/.config/wezterm/colors/`
   - **Windows**: `%USERPROFILE%\.config\wezterm\colors\` or the `colors` directory alongside `wezterm.exe`

2. Alternatively, specify the directory in your `~/.wezterm.lua`:
   ```lua
   local wezterm = require 'wezterm'
   local config = wezterm.config_builder()

   -- Tell WezTerm where to find the Circadia schemes
   config.color_scheme_dirs = { '/path/to/circadia/ports/wezterm/colors' }

   -- Select your preferred flavour
   config.color_scheme = 'Circadia Dark Ember'

   return config
   ```

---

### Option 2: Automatic OS Dark / Light Mode Switching

Automatically synchronize your terminal with your operating system's light or dark mode:

```lua
local wezterm = require 'wezterm'
local config = wezterm.config_builder()

config.color_scheme_dirs = { '/path/to/circadia/ports/wezterm/colors' }

local function scheme_for_appearance(appearance)
  if appearance:find 'Dark' then
    return 'Circadia Dark Ember'
  else
    return 'Circadia Warm Parchment'
  end
end

config.color_scheme = scheme_for_appearance(wezterm.gui.get_appearance())

return config
```

---

### Option 3: Using the `circadia.lua` Module

You can also drop `circadia.lua` into your WezTerm config folder and load it directly:

```lua
local wezterm = require 'wezterm'
local circadia = require 'circadia'
local config = wezterm.config_builder()

circadia.apply_to_config(config, {
  sync_appearance = true, -- Automatically switches between Light Parchment and Dark Ember
  -- Or specify a static flavour:
  -- flavour = 'Circadia Dark Forest',
})

return config
```

---

## 🪟 Tab Bar Styling

Each Circadia scheme automatically styles WezTerm's tab bar. To use the retro tab bar with custom Circadia tab styling:

```lua
config.use_fancy_tab_bar = false
config.tab_bar_at_bottom = false
```
