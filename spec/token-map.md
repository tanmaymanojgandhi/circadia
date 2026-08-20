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
| `string`   | String literals, regex literals, characters                    | `string.quoted`, `string.regexp`                | `@string`, `@string.regex`               |
| `number`   | Integer, floating point, boolean constants                     | `constant.numeric`, `constant.language.boolean` | `@number`, `@boolean`                    |
| `tag`      | HTML/XML tags, JSX elements, YAML keys                         | `entity.name.tag`, `entity.name.tag.yaml`       | `@tag`, `@tag.delimiter`, `@field`       |
| `comment`  | Single-line and block comments, docstrings                     | `comment.line`, `comment.block`                 | `@comment`, `@comment.documentation`     |

---

## 3. Markdown & Prose Headings

Explicit mappings for document structures and markdown viewports (Obsidian, Typora, VS Code Markdown Preview).

| Element        | Day Mode Token    | Day Hex   | Night Mode Token | Night Hex | Stylistic Rule                  |
| -------------- | ----------------- | --------- | ---------------- | --------- | ------------------------------- |
| **H1**         | `headings.h1`     | `#1c4470` | `headings.h1`    | `#f8c88f` | **Bold**, largest visual weight |
| **H2**         | `headings.h2`     | `#20538a` | `headings.h2`    | `#f2b26c` | **Bold**                        |
| **H3**         | `headings.h3`     | `#1c60a2` | `headings.h3`    | `#ea9d49` | **Semi-bold**                   |
| **H4**         | `headings.h4`     | `#236bb5` | `headings.h4`    | `#db8935` | Regular/Medium                  |
| **H5**         | `headings.h5`     | `#2f75c2` | `headings.h5`    | `#c7792e` | Regular                         |
| **H6**         | `headings.h6`     | `#387ccb` | `headings.h6`    | `#b56f2b` | Regular / Small caps            |
| **Blockquote** | `text_muted`      | `#46535f` | `text_muted`     | `#b7aca0` | _Italic_, left border: `accent` |
| **Code Span**  | `syntax.function` | `#165084` | `syntax.type`    | `#f1be85` | Background: `bg_element`        |

---

## 4. 16-Color Terminal ANSI Matrix

Direct color slots for terminal emulators (Alacritty, Kitty, WezTerm, iTerm2, Windows Terminal).

| ANSI Slot | Color Name       | Day Mode Mapping  | Day Hex   | Night Mode Mapping | Night Hex |
| --------- | ---------------- | ----------------- | --------- | ------------------ | --------- |
| **0**     | Black (Normal)   | `ui.bg_element`   | `#ece5d7` | `ui.bg_canvas`     | `#15141b` |
| **1**     | Red (Normal)     | `syntax.number`   | `#8d4400` | `headings.h4`      | `#db8935` |
| **2**     | Green (Normal)   | `syntax.string`   | `#1e6822` | `syntax.string`    | `#a7db76` |
| **3**     | Yellow (Normal)  | `headings.h4`     | `#236bb5` | `syntax.number`    | `#f6a84d` |
| **4**     | Blue (Normal)    | `syntax.function` | `#165084` | `syntax.function`  | `#89c8e4` |
| **5**     | Magenta (Normal) | `syntax.keyword`  | `#6b1d8f` | `syntax.keyword`   | `#e59de8` |
| **6**     | Cyan (Normal)    | `syntax.type`     | `#00677f` | `syntax.type`      | `#f1be85` |
| **7**     | White (Normal)   | `ui.text_primary` | `#28323a` | `ui.text_primary`  | `#eae3d8` |
| **8**     | Bright Black     | `ui.text_faint`   | `#5f6d7a` | `ui.text_faint`    | `#92887d` |
| **9**     | Bright Red       | `syntax.number`   | `#8d4400` | `headings.h3`      | `#ea9d49` |
| **10**    | Bright Green     | `syntax.string`   | `#1e6822` | `syntax.string`    | `#a7db76` |
| **11**    | Bright Yellow    | `ui.accent`       | `#195697` | `headings.h1`      | `#f8c88f` |
| **12**    | Bright Blue      | `headings.h3`     | `#1c60a2` | `syntax.function`  | `#89c8e4` |
| **13**    | Bright Magenta   | `syntax.keyword`  | `#6b1d8f` | `syntax.keyword`   | `#e59de8` |
| **14**    | Bright Cyan      | `syntax.type`     | `#00677f` | `syntax.type`      | `#f1be85` |
| **15**    | Bright White     | `ui.text_primary` | `#28323a` | `ui.text_primary`  | `#eae3d8` |
