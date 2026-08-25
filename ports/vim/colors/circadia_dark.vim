" Circadia Dark
" Perceptually uniform, low-strain themes engineered for continuous focus.

set background=dark
hi clear

if exists("syntax_on")
  syntax reset
endif

if has("termguicolors")
  set termguicolors
endif

let g:color_name = "circadia_dark"

let s:bg        = "#17130f"
let s:bg_surf   = "#1e1a15"
let s:bg_elem   = "#29241e"
let s:border    = "#3b342b"
let s:fg        = "#c9c0b1"
let s:muted     = "#aba195"
let s:faint     = "#91887d"
let s:accent    = "#e89a49"

let s:keyword   = "#66abc6"
let s:type      = "#d9a86e"
let s:func      = "#b991db"
let s:string    = "#8cbb62"
let s:number    = "#d99148"
let s:tag       = "#66abc6"
let s:comment   = "#a69c91"

let s:h1        = "#f8c88f"
let s:h2        = "#f2b26c"
let s:h3        = "#ea9d49"
let s:h4        = "#db8935"

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
call s:hi("Error",         "#e06c75", s:bg, "bold")
call s:hi("Todo",          s:accent,   s:bg_elem, "bold")
