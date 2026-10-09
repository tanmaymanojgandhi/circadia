# Circadia — Token Mapping Specification

This document defines how abstract tokens from `palette.json` map to UI environments, syntax highlighters, prose renderers, and terminal emulators across official and community ports.

---

## 1. UI & Surface Mappings

Controls workbench surfaces, window frames, active states, and non-code chrome.

| Spec Role      | Target Usage                                      | VS Code Scope / Key                                           | Neovim Highlight Group               |
| -------------- | ------------------------------------------------- | ------------------------------------------------------------- | ------------------------------------ |
| `bg_canvas`    | Main editor/document background                   | `editor.background`                                           | `Normal` (bg)                        |
| `bg_surface`   | Sidebars, file trees, inactive tabs               | `sideBar.background`, `tab.inactiveBackground`                | `NormalNC`, `NvimTreeNormal`         |
| `bg_element`   | Active line, hovered items, popups, cards         | `list.hoverBackground`, `editorWidget.background`             | `CursorLine`, `Pmenu`                |
| `border`       | Split borders, panel dividers                     | `sideBar.border`, `editorGroup.border`, `panel.border`        | `VertSplit`, `WinSeparator`          |
| `text_primary` | Standard document and UI body text                | `editor.foreground`, `foreground`                             | `Normal` (fg)                        |
| `text_muted`   | Line numbers, status bar items, breadcrumbs       | `editorLineNumber.foreground`, `statusBar.foreground`         | `LineNr`, `StatusLine`               |
| `text_faint`   | Whitespace characters, fold guides, disabled text | `editorWhitespace.foreground`, `editorIndentGuide.background` | `NonText`, `SpecialKey`, `IblIndent` |
| `accent`       | Focus rings, text links, active tab indicator     | `focusBorder`, `textLink.foreground`, `tab.activeBorder`      | `Visual`, `Search`, `CurSearch`      |

---

## 2. Syntax & Grammar Mappings

Maps code syntax, AST nodes, TextMate scopes, and Treesitter highlight queries.

| Spec Role  | Semantic Code Construct                                        | TextMate Scope                                  | Treesitter Query                         |
| ---------- | -------------------------------------------------------------- | ----------------------------------------------- | ---------------------------------------- |
| `keyword`  | Control flow, declarations (`if`, `return`, `class`, `import`) | `keyword.control`, `storage.type`               | `@keyword`, `@conditional`, `@repeat`    |
| `type`     | Types, structs, classes, interfaces, built-ins                 | `entity.name.type`, `support.type`              | `@type`, `@type.builtin`                 |
| `function` | Function definitions, method calls, routines                   | `entity.name.function`, `support.function`      | `@function`, `@function.call`, `@method` |
| `property` | Object keys, DTO fields, struct fields, named arguments        | `variable.other.property`, `meta.object-literal.key` | `@property`, `@field`, `@variable.member` |
| `variable` | Parameters, local variables, instance references               | `variable`, `variable.other`, `variable.parameter` | `@variable`, `@variable.parameter`      |
| `string`   | String literals, regex literals, characters                    | `string.quoted`, `string.regexp`                | `@string`, `@string.regex`               |
| `number`   | Integer, floating point, boolean constants                     | `constant.numeric`, `constant.language.boolean` | `@number`, `@boolean`                    |
| `tag`      | HTML/XML tags, JSX elements, YAML keys                         | `entity.name.tag`, `entity.name.tag.yaml`       | `@tag`, `@tag.delimiter`                 |
| `comment`  | Single-line and block comments, docstrings                     | `comment.line`, `comment.block`                 | `@comment`, `@comment.documentation`     |

---

## 3. Markdown & Prose Headings

Explicit mappings for document structures and markdown viewports (Obsidian, Typora, VS Code Markdown Preview).

| Element        | Day Mode Token    | Day Hex   | Night Mode Token | Night Hex | Stylistic Rule                  |
| -------------- | ----------------- | --------- | ---------------- | --------- | ------------------------------- |
| **H1**         | `headings.h1`     | `#0d2a46` | `headings.h1`    | `#d4d3cf` | **Bold**, largest visual weight |
| **H2**         | `headings.h2`     | `#0d2f50` | `headings.h2`    | `#cecdc9` | **Bold**                        |
| **H3**         | `headings.h3`     | `#0e355b` | `headings.h3`    | `#c8c7c3` | **Semi-bold**                   |
| **H4**         | `headings.h4`     | `#0f3a66` | `headings.h4`    | `#c2c1bd` | Regular/Medium                  |
| **H5**         | `headings.h5`     | `#134073` | `headings.h5`    | `#bcbbb7` | Regular                         |
| **H6**         | `headings.h6`     | `#15477e` | `headings.h6`    | `#b6b5b1` | Regular / Small caps            |
| **Blockquote** | `text_muted`      | `#394652` | `text_muted`     | `#b5aba0` | _Italic_, left border: `accent` |
| **Code Span**  | `syntax.function` | `#781c78` | `syntax.function`| `#c3abe0` | Background: `bg_element`        |

---

## 4. 16-Color Terminal ANSI Matrix

Direct color slots for terminal emulators (Alacritty, Kitty, WezTerm, iTerm2, Windows Terminal).

| ANSI Slot | Color Name       | Day Mode Mapping  | Day Hex   | Night Mode Mapping | Night Hex |
| --------- | ---------------- | ----------------- | --------- | ------------------ | --------- |
| **0**     | Black (Normal)   | `ui.bg_element`   | `#e5e0d5` | `ui.bg_canvas`     | `#17130f` |
| **1**     | Red (Normal)     | `syntax.type`     | `#763200` | `headings.h4`      | `#c2c1bd` |
| **2**     | Green (Normal)   | `syntax.string`   | `#015228` | `syntax.string`    | `#a9c98e` |
| **3**     | Yellow (Normal)  | `syntax.type`     | `#763200` | `syntax.number`    | `#e0b27c` |
| **4**     | Blue (Normal)    | `syntax.keyword`  | `#003fa0` | `syntax.keyword`   | `#83bfd5` |
| **5**     | Magenta (Normal) | `syntax.function` | `#781c78` | `syntax.function`  | `#c3abe0` |
| **6**     | Cyan (Normal)    | `syntax.number`   | `#014e55` | `syntax.keyword`   | `#83bfd5` |
| **7**     | White (Normal)   | `ui.text_primary` | `#28323a` | `ui.text_primary`  | `#cbc9c4` |
| **8**     | Bright Black     | `ui.text_faint`   | `#3e4750` | `ui.text_faint`    | `#b8b4ac` |
| **9**     | Bright Red       | `syntax.type`     | `#763200` | `headings.h3`      | `#c8c7c3` |
| **10**    | Bright Green     | `syntax.string`   | `#015228` | `syntax.string`    | `#a9c98e` |
| **11**    | Bright Yellow    | `syntax.type`     | `#763200` | `headings.h1`      | `#d4d3cf` |
| **12**    | Bright Blue      | `syntax.keyword`  | `#003fa0` | `syntax.keyword`   | `#83bfd5` |
| **13**    | Bright Magenta   | `syntax.property` | `#4b1fa3` | `syntax.property`  | `#ddabc2` |
| **14**    | Bright Cyan      | `syntax.number`   | `#014e55` | `syntax.keyword`   | `#83bfd5` |
| **15**    | Bright White     | `ui.text_primary` | `#28323a` | `ui.text_primary`  | `#eae3d8` |
