-- Circadia Color Schemes for WezTerm
-- Engineered in OKLCH • 100% Strict WCAG 2.1 AAA Legibility
-- https://github.com/tanmaymanojgandhi/circadia

local wezterm = require 'wezterm'

local M = {}

M.color_schemes = {
  ['Circadia Warm Parchment'] = {
    foreground = '#28323a',
    background = '#f7f2e6',
    cursor_bg = '#0048b3',
    cursor_fg = '#f7f2e6',
    cursor_border = '#0048b3',
    selection_bg = '#e5dcc6',
    selection_fg = '#28323a',
    scrollbar_thumb = '#d7cdb7',
    split = '#d7cdb7',
    ansi = {
      '#e5dcc6',
      '#843900',
      '#005f2f',
      '#095b62',
      '#0048b3',
      '#7a1f7a',
      '#095b62',
      '#28323a',
    },
    brights = {
      '#43505c',
      '#1c60a2',
      '#005f2f',
      '#1c4470',
      '#0048b3',
      '#4b1fa3',
      '#0048b3',
      '#28323a',
    },
    tab_bar = {
      background = '#eee7d6',
      inactive_tab_edge = '#d7cdb7',
      active_tab = {
        bg_color = '#f7f2e6',
        fg_color = '#0048b3',
        intensity = 'Bold',
        underline = 'None',
        italic = false,
        strikethrough = false,
      },
      inactive_tab = {
        bg_color = '#eee7d6',
        fg_color = '#46535f',
      },
      inactive_tab_hover = {
        bg_color = '#e5dcc6',
        fg_color = '#28323a',
        italic = true,
      },
      new_tab = {
        bg_color = '#eee7d6',
        fg_color = '#46535f',
      },
      new_tab_hover = {
        bg_color = '#e5dcc6',
        fg_color = '#28323a',
        italic = true,
      },
    },
  },
  ['Circadia Dark Ember'] = {
    foreground = '#c9c0b1',
    background = '#17130f',
    cursor_bg = '#e89a49',
    cursor_fg = '#17130f',
    cursor_border = '#e89a49',
    selection_bg = '#29241e',
    selection_fg = '#c9c0b1',
    scrollbar_thumb = '#3b342b',
    split = '#3b342b',
    ansi = {
      '#17130f',
      '#d9a86e',
      '#8cbb62',
      '#d99148',
      '#66abc6',
      '#b991db',
      '#d99148',
      '#c9c0b1',
    },
    brights = {
      '#91887d',
      '#ea9d49',
      '#8cbb62',
      '#f8c88f',
      '#66abc6',
      '#de88a6',
      '#66abc6',
      '#c9c0b1',
    },
    tab_bar = {
      background = '#17130f',
      inactive_tab_edge = '#3b342b',
      active_tab = {
        bg_color = '#1e1a15',
        fg_color = '#e89a49',
        intensity = 'Bold',
        underline = 'None',
        italic = false,
        strikethrough = false,
      },
      inactive_tab = {
        bg_color = '#17130f',
        fg_color = '#aba195',
      },
      inactive_tab_hover = {
        bg_color = '#29241e',
        fg_color = '#c9c0b1',
        italic = true,
      },
      new_tab = {
        bg_color = '#17130f',
        fg_color = '#aba195',
      },
      new_tab_hover = {
        bg_color = '#29241e',
        fg_color = '#c9c0b1',
        italic = true,
      },
    },
  },
  ['Circadia Dark Plum'] = {
    foreground = '#d8c8d2',
    background = '#140e12',
    cursor_bg = '#cf8aa4',
    cursor_fg = '#140e12',
    cursor_border = '#cf8aa4',
    selection_bg = '#261e23',
    selection_fg = '#d8c8d2',
    scrollbar_thumb = '#3d3039',
    split = '#3d3039',
    ansi = {
      '#140e12',
      '#daa97a',
      '#96b77b',
      '#d49969',
      '#75acd2',
      '#b695cf',
      '#d49969',
      '#d8c8d2',
    },
    brights = {
      '#9a8b96',
      '#da7ea0',
      '#96b77b',
      '#f5b8d0',
      '#75acd2',
      '#d38da4',
      '#75acd2',
      '#d8c8d2',
    },
    tab_bar = {
      background = '#140e12',
      inactive_tab_edge = '#3d3039',
      active_tab = {
        bg_color = '#1b1419',
        fg_color = '#cf8aa4',
        intensity = 'Bold',
        underline = 'None',
        italic = false,
        strikethrough = false,
      },
      inactive_tab = {
        bg_color = '#140e12',
        fg_color = '#b4a3af',
      },
      inactive_tab_hover = {
        bg_color = '#261e23',
        fg_color = '#d8c8d2',
        italic = true,
      },
      new_tab = {
        bg_color = '#140e12',
        fg_color = '#b4a3af',
      },
      new_tab_hover = {
        bg_color = '#261e23',
        fg_color = '#d8c8d2',
        italic = true,
      },
    },
  },
  ['Circadia Dark Forest'] = {
    foreground = '#c4ccc5',
    background = '#131714',
    cursor_bg = '#83b384',
    cursor_fg = '#131714',
    cursor_border = '#83b384',
    selection_bg = '#242a25',
    selection_fg = '#c4ccc5',
    scrollbar_thumb = '#353c36',
    split = '#353c36',
    ansi = {
      '#131714',
      '#d1aa73',
      '#92b87e',
      '#d19b66',
      '#6cb0c5',
      '#b29ace',
      '#d19b66',
      '#c4ccc5',
    },
    brights = {
      '#838d85',
      '#83bc97',
      '#92b87e',
      '#b8e2c4',
      '#6cb0c5',
      '#d092a9',
      '#6cb0c5',
      '#c4ccc5',
    },
    tab_bar = {
      background = '#131714',
      inactive_tab_edge = '#353c36',
      active_tab = {
        bg_color = '#1a1e1b',
        fg_color = '#83b384',
        intensity = 'Bold',
        underline = 'None',
        italic = false,
        strikethrough = false,
      },
      inactive_tab = {
        bg_color = '#131714',
        fg_color = '#9fa9a1',
      },
      inactive_tab_hover = {
        bg_color = '#242a25',
        fg_color = '#c4ccc5',
        italic = true,
      },
      new_tab = {
        bg_color = '#131714',
        fg_color = '#9fa9a1',
      },
      new_tab_hover = {
        bg_color = '#242a25',
        fg_color = '#c4ccc5',
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
