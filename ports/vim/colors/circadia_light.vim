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

let s:bg        = "#f7f2e6"
let s:bg_surf   = "#eee7d6"
let s:bg_elem   = "#e5dcc6"
let s:border    = "#d7cdb7"
let s:fg        = "#28323a"
let s:muted     = "#46535f"
let s:faint     = "#43505c"
let s:accent    = "#0048b3"

let s:keyword   = "#0048b3"
let s:type      = "#843900"
let s:func      = "#7a1f7a"
let s:string    = "#005f2f"
let s:number    = "#095b62"
let s:tag       = "#0048b3"
let s:comment   = "#524b42"

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
call s:hi("Cursor",        s:bg,       s:accent,  "")
call s:hi("CursorLine",    "",         s:bg_surf, "")
call s:hi("CursorColumn",  "",         s:bg_surf, "")
call s:hi("ColorColumn",   "",         s:bg_surf, "")
call s:hi("LineNr",        s:faint,    s:bg,      "")
call s:hi("CursorLineNr",  s:accent,   s:bg_surf, "bold")
call s:hi("MatchParen",    s:accent,   "none",    "bold")
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
