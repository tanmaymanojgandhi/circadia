" Circadia Light
" Perceptually uniform, low-strain themes engineered for continuous focus.

set background=light
hi clear

if exists("syntax_on")
  syntax reset
endif

if has("termguicolors")
  set termguicolors
endif

let g:color_name = "circadia_light"

let s:bg        = "#fffdf8"
let s:bg_surf   = "#f6f1e6"
let s:bg_elem   = "#ece5d7"
let s:border    = "#d3c8b4"
let s:fg        = "#28323a"
let s:muted     = "#46535f"
let s:faint     = "#5f6d7a"
let s:accent    = "#195697"

let s:keyword   = "#6b1d8f"
let s:type      = "#00677f"
let s:func      = "#165084"
let s:string    = "#1e6822"
let s:number    = "#8d4400"
let s:tag       = "#195697"
let s:comment   = "#574f46"

let s:h1        = "#1c4470"
let s:h2        = "#20538a"
let s:h3        = "#1c60a2"
let s:h4        = "#236bb5"

function! s:hi(group, guifg, guibg, attr)
  let l:cmd = "hi " . a:group
  if a:guifg != ""
    let l:cmd .= " guifg=" . a:guifg
  endif
  if a:guibg != ""
    let l:cmd .= " guibg=" . a:guibg
  endif
  if a:attr != ""
    let l:cmd .= " gui=" . a:attr
  endif
  execute l:cmd
endfunction

call s:hi("Normal",        s:fg,       s:bg,      "")
call s:hi("CursorLine",    "",         s:bg_surf, "")
call s:hi("CursorColumn",  "",         s:bg_surf, "")
call s:hi("ColorColumn",   "",         s:bg_surf, "")
call s:hi("LineNr",        s:faint,    s:bg,      "")
call s:hi("CursorLineNr",  s:muted,    s:bg_surf, "bold")
call s:hi("VertSplit",     s:border,   s:bg,      "none")
call s:hi("StatusLine",    s:fg,       s:bg_surf, "none")
call s:hi("StatusLineNC",  s:faint,    s:bg_surf, "none")
call s:hi("Pmenu",         s:fg,       s:bg_surf, "")
call s:hi("PmenuSel",      s:bg,       s:accent,  "")
call s:hi("Visual",        "",         s:bg_elem, "")
call s:hi("Search",        s:bg,       s:accent,  "")
call s:hi("IncSearch",     s:bg,       s:accent,  "bold")

" Syntax Groups
call s:hi("Comment",       s:comment,  "",        "italic")
call s:hi("Constant",      s:number,   "",        "")
call s:hi("String",        s:string,   "",        "")
call s:hi("Character",     s:string,   "",        "")
call s:hi("Number",        s:number,   "",        "")
call s:hi("Boolean",       s:number,   "",        "")
call s:hi("Identifier",    s:fg,       "",        "")
call s:hi("Function",      s:func,     "",        "")
call s:hi("Statement",     s:keyword,  "",        "bold")
call s:hi("PreProc",       s:tag,      "",        "")
call s:hi("Type",          s:type,     "",        "")
call s:hi("Special",       s:tag,      "",        "")
call s:hi("Underlined",    s:accent,   "",        "underline")
call s:hi("Error",         "#dc2626", s:bg, "bold")
call s:hi("Todo",          s:accent,   s:bg_elem, "bold")
