-- Circadia for Neovim
-- Perceptually uniform, low-strain colorscheme engineered for continuous focus

local palette = require("circadia.palette")
local M = {}

function M.setup(opts)
  opts = opts or {}
  local mode = opts.mode or (vim.o.background == "light" and "light" or "dark")
  local c = palette[mode] or palette.dark

  if vim.fn.exists("syntax_on") == 1 then
    vim.cmd("syntax reset")
  end

  vim.g.colors_name = "circadia-" .. mode
  vim.o.termguicolors = true
  vim.o.background = mode == "light" and "light" or "dark"

  local highlights = {
    Normal = { fg = c.text_primary, bg = c.bg_canvas },
    NormalFloat = { fg = c.text_primary, bg = c.bg_surface },
    FloatBorder = { fg = c.border, bg = c.bg_surface },
    Cursor = { fg = c.bg_canvas, bg = c.accent },
    CursorLine = { bg = c.bg_surface },
    CursorLineNr = { fg = c.accent, bold = true },
    LineNr = { fg = c.text_faint },
    MatchParen = { fg = c.accent, bg = "NONE", bold = true },
    Visual = { bg = c.bg_element },
    Search = { fg = c.bg_canvas, bg = c.accent },
    IncSearch = { fg = c.bg_canvas, bg = c.number },
    StatusLine = { fg = c.text_muted, bg = c.bg_surface },
    StatusLineNC = { fg = c.text_faint, bg = c.bg_surface },
    VertSplit = { fg = c.border },
    WinSeparator = { fg = c.border },
    Pmenu = { fg = c.text_primary, bg = c.bg_surface },
    PmenuSel = { fg = c.text_primary, bg = c.bg_element },
    PmenuThumb = { bg = c.accent },

    -- LSP & Diagnostics
    LspReferenceText = { bg = c.bg_element },
    LspReferenceRead = { bg = c.bg_element },
    LspReferenceWrite = { bg = c.bg_element },

    -- Telescope / Quick Open
    TelescopeSelection = { bg = c.bg_element },
    TelescopeMatching = { fg = c.accent, bold = true },

    -- Syntax
    Comment = { fg = c.comment, italic = true },
    Keyword = { fg = c.keyword, bold = true },
    Function = { fg = c["function"] },
    Type = { fg = c.type },
    String = { fg = c.string },
    Number = { fg = c.number },
    Boolean = { fg = c.number },
    Identifier = { fg = c.text_primary },
    Statement = { fg = c.keyword },
    PreProc = { fg = c.keyword },
    Constant = { fg = c.number },
    Tag = { fg = c.tag },
    Special = { fg = c.accent },
  }

  for group, hl in pairs(highlights) do
    vim.api.nvim_set_hl(0, group, hl)
  end
end

return M
