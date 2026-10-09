-- Circadia Color Schemes for WezTerm
-- OKLCH color theme; see spec/rules.md for contrast validation coverage
-- https://github.com/tanmaymanojgandhi/circadia

local wezterm = require 'wezterm'

local M = {}

M.color_schemes = {
  ['Circadia Warm Parchment'] = {
    foreground = '#28323a',
    background = '#f7f4ec',
    cursor_bg = '#003fa0',
    cursor_fg = '#f7f4ec',
    cursor_border = '#003fa0',
    selection_bg = '#e5e0d5',
    selection_fg = '#28323a',
    scrollbar_thumb = '#d2cbbf',
    split = '#d2cbbf',
    ansi = {
      '#e5e0d5',
      '#763200',
      '#015228',
      '#014e55',
      '#003fa0',
      '#781c78',
      '#014e55',
      '#28323a',
    },
    brights = {
      '#3e4750',
      '#763200',
      '#015228',
      '#014e55',
      '#003fa0',
      '#4b1fa3',
      '#014e55',
      '#28323a',
    },
    tab_bar = {
      background = '#efebe2',
      inactive_tab_edge = '#d2cbbf',
      active_tab = {
        bg_color = '#f7f4ec',
        fg_color = '#003fa0',
        intensity = 'Bold',
        underline = 'None',
        italic = false,
        strikethrough = false,
      },
      inactive_tab = {
        bg_color = '#efebe2',
        fg_color = '#394652',
      },
      inactive_tab_hover = {
        bg_color = '#e5e0d5',
        fg_color = '#28323a',
        italic = true,
      },
      new_tab = {
        bg_color = '#efebe2',
        fg_color = '#394652',
      },
      new_tab_hover = {
        bg_color = '#e5e0d5',
        fg_color = '#28323a',
        italic = true,
      },
    },
  },
  ['Circadia Dark Ember'] = {
    foreground = '#cbc9c4',
    background = '#17130f',
    cursor_bg = '#d6b078',
    cursor_fg = '#17130f',
    cursor_border = '#d6b078',
    selection_bg = '#29241e',
    selection_fg = '#cbc9c4',
    scrollbar_thumb = '#3b342b',
    split = '#3b342b',
    ansi = {
      '#17130f',
      '#dfbb87',
      '#a9c98e',
      '#e0b27c',
      '#83bfd5',
      '#c3abe0',
      '#e0b27c',
      '#cbc9c4',
    },
    brights = {
      '#b8b4ac',
      '#dfbb87',
      '#a9c98e',
      '#e0b27c',
      '#83bfd5',
      '#ddabc2',
      '#e0b27c',
      '#cbc9c4',
    },
    tab_bar = {
      background = '#17130f',
      inactive_tab_edge = '#3b342b',
      active_tab = {
        bg_color = '#1e1a15',
        fg_color = '#d6b078',
        intensity = 'Bold',
        underline = 'None',
        italic = false,
        strikethrough = false,
      },
      inactive_tab = {
        bg_color = '#17130f',
        fg_color = '#bdbab3',
      },
      inactive_tab_hover = {
        bg_color = '#29241e',
        fg_color = '#cbc9c4',
        italic = true,
      },
      new_tab = {
        bg_color = '#17130f',
        fg_color = '#bdbab3',
      },
      new_tab_hover = {
        bg_color = '#29241e',
        fg_color = '#cbc9c4',
        italic = true,
      },
    },
  },
  ['Circadia Dark Plum'] = {
    foreground = '#cbc9c4',
    background = '#140e12',
    cursor_bg = '#b6a3d1',
    cursor_fg = '#140e12',
    cursor_border = '#b6a3d1',
    selection_bg = '#261e23',
    selection_fg = '#cbc9c4',
    scrollbar_thumb = '#3d3039',
    split = '#3d3039',
    ansi = {
      '#140e12',
      '#dfbb87',
      '#a9c98e',
      '#e0b27c',
      '#83bfd5',
      '#c3abe0',
      '#e0b27c',
      '#cbc9c4',
    },
    brights = {
      '#b8b4ac',
      '#dfbb87',
      '#a9c98e',
      '#e0b27c',
      '#83bfd5',
      '#ddabc2',
      '#e0b27c',
      '#cbc9c4',
    },
    tab_bar = {
      background = '#140e12',
      inactive_tab_edge = '#3d3039',
      active_tab = {
        bg_color = '#1b1419',
        fg_color = '#b6a3d1',
        intensity = 'Bold',
        underline = 'None',
        italic = false,
        strikethrough = false,
      },
      inactive_tab = {
        bg_color = '#140e12',
        fg_color = '#bdbab3',
      },
      inactive_tab_hover = {
        bg_color = '#261e23',
        fg_color = '#cbc9c4',
        italic = true,
      },
      new_tab = {
        bg_color = '#140e12',
        fg_color = '#bdbab3',
      },
      new_tab_hover = {
        bg_color = '#261e23',
        fg_color = '#cbc9c4',
        italic = true,
      },
    },
  },
  ['Circadia Dark Forest'] = {
    foreground = '#cbc9c4',
    background = '#131714',
    cursor_bg = '#a5c3a4',
    cursor_fg = '#131714',
    cursor_border = '#a5c3a4',
    selection_bg = '#242a25',
    selection_fg = '#cbc9c4',
    scrollbar_thumb = '#353c36',
    split = '#353c36',
    ansi = {
      '#131714',
      '#dfbb87',
      '#a9c98e',
      '#e0b27c',
      '#83bfd5',
      '#c3abe0',
      '#e0b27c',
      '#cbc9c4',
    },
    brights = {
      '#b8b4ac',
      '#dfbb87',
      '#a9c98e',
      '#e0b27c',
      '#83bfd5',
      '#ddabc2',
      '#e0b27c',
      '#cbc9c4',
    },
    tab_bar = {
      background = '#131714',
      inactive_tab_edge = '#353c36',
      active_tab = {
        bg_color = '#1a1e1b',
        fg_color = '#a5c3a4',
        intensity = 'Bold',
        underline = 'None',
        italic = false,
        strikethrough = false,
      },
      inactive_tab = {
        bg_color = '#131714',
        fg_color = '#bdbab3',
      },
      inactive_tab_hover = {
        bg_color = '#242a25',
        fg_color = '#cbc9c4',
        italic = true,
      },
      new_tab = {
        bg_color = '#131714',
        fg_color = '#bdbab3',
      },
      new_tab_hover = {
        bg_color = '#242a25',
        fg_color = '#cbc9c4',
        italic = true,
      },
    },
  },
}

-- Canonical Aliases
M.color_schemes['Circadia Light'] = M.color_schemes['Circadia Warm Parchment']
M.color_schemes['Circadia Dark'] = M.color_schemes['Circadia Dark Ember']
M.color_schemes['circadia-light'] = M.color_schemes['Circadia Warm Parchment']
M.color_schemes['circadia-dark'] = M.color_schemes['Circadia Dark Ember']
M.color_schemes['circadia-light-parchment'] = M.color_schemes['Circadia Warm Parchment']
M.color_schemes['circadia-dark-ember'] = M.color_schemes['Circadia Dark Ember']
M.color_schemes['circadia-dark-plum'] = M.color_schemes['Circadia Dark Plum']
M.color_schemes['circadia-dark-forest'] = M.color_schemes['Circadia Dark Forest']

-- Helper to apply Circadia to a WezTerm configuration object
function M.apply_to_config(config, opts)
  opts = opts or {}
  local flavour = opts.flavour or 'Circadia Dark Ember'

  if not config.color_schemes then
    config.color_schemes = {}
  end
  for k, v in pairs(M.color_schemes) do
    config.color_schemes[k] = v
  end

  if opts.sync_appearance then
    local appearance = 'Dark'
    if wezterm.gui and wezterm.gui.get_appearance then
      appearance = wezterm.gui.get_appearance()
    end
    if appearance:find('Dark') then
      config.color_scheme = opts.dark_flavour or 'Circadia Dark Ember'
    else
      config.color_scheme = opts.light_flavour or 'Circadia Warm Parchment'
    end
  else
    config.color_scheme = flavour
  end
end

return M
