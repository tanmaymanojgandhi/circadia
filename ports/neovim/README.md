# Circadia for Neovim

Perceptually uniform, low-strain colorscheme engineered for continuous focus in Neovim.

- **Circadia Dark** (`circadia-dark`): Warm Ember & Obsidian
- **Circadia Light** (`circadia-light`): Warm Parchment

---

## Installation

### LazyVim

Add the following plugin spec to your LazyVim configuration (e.g. `lua/plugins/colorscheme.lua` or `lua/plugins/circadia.lua`):

```lua
return {
  {
    "tanmaymanojgandhi/circadia",
    lazy = false,
    priority = 1000,
    init = function(plugin)
      local port_path = vim.fs.joinpath(plugin.dir, "ports", "neovim")
      local lua_path = vim.fs.joinpath(port_path, "lua", "?.lua")
      local lua_init = vim.fs.joinpath(port_path, "lua", "?", "init.lua")

      -- Register Lua paths
      package.path = package.path .. ";" .. lua_path .. ";" .. lua_init

      -- Directory to expose colorschemes to Neovim's picker
      local colors_dir = vim.fs.joinpath(vim.fn.stdpath("data"), "circadia_colors", "colors")
      vim.fn.mkdir(colors_dir, "p")

      local variants = {
        ["circadia-dark"] = [[
          vim.o.background = "dark"
          require("circadia").setup()
        ]],
        ["circadia-light"] = [[
          vim.o.background = "light"
          require("circadia").setup()
        ]],
      }

      for name, code in pairs(variants) do
        local file = vim.fs.joinpath(colors_dir, name .. ".lua")
        local f = io.open(file, "w")
        if f then
          f:write(code)
          f:close()
        end
      end

      -- Add directory to runtime path
      vim.opt.rtp:prepend(vim.fs.joinpath(vim.fn.stdpath("data"), "circadia_colors"))
    end,
  },

  {
    "LazyVim/LazyVim",
    opts = {
      -- Default to either variant ("circadia-dark" or "circadia-light")
      colorscheme = "circadia-dark",
    },
  },
}
```

---

### Standalone `lazy.nvim`

If you are using `lazy.nvim` without LazyVim:

```lua
{
  "tanmaymanojgandhi/circadia",
  lazy = false,
  priority = 1000,
  init = function(plugin)
    local port_path = vim.fs.joinpath(plugin.dir, "ports", "neovim")
    local lua_path = vim.fs.joinpath(port_path, "lua", "?.lua")
    local lua_init = vim.fs.joinpath(port_path, "lua", "?", "init.lua")

    package.path = package.path .. ";" .. lua_path .. ";" .. lua_init

    local colors_dir = vim.fs.joinpath(vim.fn.stdpath("data"), "circadia_colors", "colors")
    vim.fn.mkdir(colors_dir, "p")

    local variants = {
      ["circadia-dark"] = [[
        vim.o.background = "dark"
        require("circadia").setup()
      ]],
      ["circadia-light"] = [[
        vim.o.background = "light"
        require("circadia").setup()
      ]],
    }

    for name, code in pairs(variants) do
      local file = vim.fs.joinpath(colors_dir, name .. ".lua")
      local f = io.open(file, "w")
      if f then
        f:write(code)
        f:close()
      end
    end

    vim.opt.rtp:prepend(vim.fs.joinpath(vim.fn.stdpath("data"), "circadia_colors"))
  end,
  config = function()
    vim.cmd.colorscheme("circadia-dark") -- or "circadia-light"
  end,
}
```

---

## Usage & Switching Themes

Once installed, you can switch between themes using standard Neovim commands or through your picker (e.g. Telescope / Snacks):

```vim
:colorscheme circadia-dark
:colorscheme circadia-light
```

Or programmatically in Lua:

```lua
-- Apply dark mode
vim.o.background = "dark"
require("circadia").setup({ mode = "dark" })

-- Apply light mode
vim.o.background = "light"
require("circadia").setup({ mode = "light" })
```
