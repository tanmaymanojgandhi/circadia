/**
 * Circadia Documentation & Palette Engine
 * Lightweight, zero-dependency token inspector & spec viewer.
 */

const PALETTE = {
  name: "Circadia",
  version: "1.0.0",
  modes: {
    dark: {
      name: "Warm Ember & Obsidian",
      tagline: "Evening • 0–50 lux",
      type: "dark",
      ui: {
        bg_canvas:     { hex: "#17130f", oklch: "oklch(19.0% 0.012 290)", rgb: [21, 20, 27], role: "Primary canvas" },
        bg_surface:    { hex: "#1e1a15", oklch: "oklch(22.0% 0.015 290)", rgb: [28, 26, 36], role: "Panels & sidebars" },
        bg_element:    { hex: "#29241e", oklch: "oklch(26.0% 0.018 290)", rgb: [37, 35, 48], role: "Inputs & active states" },
        border:        { hex: "#3b342b", oklch: "oklch(33.0% 0.020 290)", rgb: [52, 48, 65], role: "Dividers & borders" },
        text_primary:  { hex: "#c9c0b1", oklch: "oklch(91.0% 0.015 85)",  rgb: [234, 227, 216], role: "Body text" },
        text_muted:    { hex: "#b5aba0", oklch: "oklch(76.0% 0.020 85)",  rgb: [183, 172, 160], role: "Secondary labels" },
        text_faint:    { hex: "#91887d", oklch: "oklch(64.0% 0.018 85)",  rgb: [146, 136, 125], role: "Metadata & disabled" },
        accent:        { hex: "#e89a49", oklch: "oklch(75.0% 0.130 65)",  rgb: [232, 154, 73], role: "Interactive accent" }
      },
      headings: {
        h1: { hex: "#f8c88f", oklch: "oklch(86.0% 0.090 75)", rgb: [248, 200, 143], role: "Document Title (h1)" },
        h2: { hex: "#f2b26c", oklch: "oklch(81.0% 0.100 70)", rgb: [242, 178, 108], role: "Section Header (h2)" },
        h3: { hex: "#ea9d49", oklch: "oklch(76.0% 0.110 65)", rgb: [234, 157, 73],  role: "Subsection Header (h3)" },
        h4: { hex: "#db8935", oklch: "oklch(71.0% 0.110 60)", rgb: [219, 137, 53],  role: "Sub-subsection (h4)" },
        h5: { hex: "#c7792e", oklch: "oklch(66.0% 0.100 55)", rgb: [199, 121, 46],  role: "Minor Header (h5)" },
        h6: { hex: "#b56f2b", oklch: "oklch(62.0% 0.090 50)", rgb: [181, 111, 43],  role: "Caption / Detail (h6)" }
      },
      syntax: {
        keyword:  { hex: "#66abc6", oklch: "oklch(80.0% 0.130 320)", rgb: [229, 157, 232], role: "Keywords & control" },
        type:     { hex: "#d9a86e", oklch: "oklch(82.0% 0.090 75)",  rgb: [241, 190, 133], role: "Types & interfaces" },
        function: { hex: "#b991db", oklch: "oklch(79.0% 0.080 230)", rgb: [137, 200, 228], role: "Functions & methods" },
        string:   { hex: "#8cbb62", oklch: "oklch(80.0% 0.130 135)", rgb: [167, 219, 118], role: "String literals" },
        number:   { hex: "#d99148", oklch: "oklch(79.0% 0.140 60)",  rgb: [246, 168, 77],  role: "Numeric literals" },
        tag:      { hex: "#e89a49", oklch: "oklch(75.0% 0.130 65)",  rgb: [232, 154, 73],  role: "HTML/JSX tags" },
        comment:  { hex: "#a9a093", oklch: "oklch(75.5% 0.020 60)",  rgb: [179, 171, 160], role: "Comments" }
      }
    },
    light: {
      name: "Warm Parchment",
      tagline: "Daylight • 300–800+ lux",
      type: "light",
      ui: {
        bg_canvas:     { hex: "#f7f2e6", oklch: "oklch(95.2% 0.015 85)",  rgb: [244, 238, 225], role: "Primary canvas" },
        bg_surface:    { hex: "#eee7d6", oklch: "oklch(91.8% 0.018 85)",  rgb: [236, 228, 212], role: "Panels & sidebars" },
        bg_element:    { hex: "#e5dcc6", oklch: "oklch(87.5% 0.022 85)",  rgb: [226, 216, 195], role: "Inputs & active states" },
        border:        { hex: "#d7cdb7", oklch: "oklch(81.5% 0.024 85)",  rgb: [212, 200, 178], role: "Dividers & borders" },
        text_primary:  { hex: "#28323a", oklch: "oklch(30.0% 0.020 250)", rgb: [40, 50, 58],   role: "Body text" },
        text_muted:    { hex: "#46535f", oklch: "oklch(43.0% 0.025 250)", rgb: [70, 83, 95],   role: "Secondary labels" },
        text_faint:    { hex: "#5f6d7a", oklch: "oklch(53.0% 0.020 250)", rgb: [95, 109, 122], role: "Metadata & disabled" },
        accent:        { hex: "#195697", oklch: "oklch(44.0% 0.120 250)", rgb: [25, 86, 151],  role: "Interactive accent" }
      },
      headings: {
        h1: { hex: "#1c4470", oklch: "oklch(36.0% 0.090 250)", rgb: [28, 68, 91],   role: "Document Title (h1)" },
        h2: { hex: "#20538a", oklch: "oklch(42.0% 0.100 250)", rgb: [32, 83, 138],  role: "Section Header (h2)" },
        h3: { hex: "#1c60a2", oklch: "oklch(46.0% 0.110 250)", rgb: [28, 96, 162],  role: "Subsection Header (h3)" },
        h4: { hex: "#236bb5", oklch: "oklch(49.0% 0.115 250)", rgb: [35, 107, 181], role: "Sub-subsection (h4)" },
        h5: { hex: "#286fc0", oklch: "oklch(51.0% 0.115 250)", rgb: [40, 111, 192], role: "Minor Header (h5)" },
        h6: { hex: "#2f75c6", oklch: "oklch(52.5% 0.115 250)", rgb: [47, 117, 198], role: "Caption / Detail (h6)" }
      },
      syntax: {
        keyword:  { hex: "#0048b3", oklch: "oklch(39.0% 0.165 312)", rgb: [99, 28, 132], role: "Keywords & control" },
        type:     { hex: "#843900", oklch: "oklch(42.5% 0.140 65)",  rgb: [127, 53, 0],   role: "Types & interfaces" },
        function: { hex: "#6a1b9a", oklch: "oklch(41.0% 0.145 255)", rgb: [9, 72, 154],  role: "Functions & methods" },
        string:   { hex: "#005f2f", oklch: "oklch(40.5% 0.145 142)", rgb: [8, 88, 2],    role: "String literals" },
        number:   { hex: "#8e3600", oklch: "oklch(43.0% 0.155 48)",  rgb: [138, 45, 0],   role: "Numeric literals" },
        tag:      { hex: "#6a1b9a", oklch: "oklch(41.0% 0.145 255)", rgb: [9, 72, 154],  role: "HTML/JSX tags" },
        comment:  { hex: "#574f46", oklch: "oklch(43.5% 0.025 60)",  rgb: [87, 79, 70],   role: "Comments" }
      }
    }
  }
};

const PORTS = [
  { name: "VS Code", category: "editor", type: "Extension", desc: "Full syntax highlighting and UI theme.", path: "ports/vscode", snippet: "ext install circadia-theme" },
  { name: "Neovim", category: "editor", type: "Lua Plugin", desc: "Treesitter & LSP native colorscheme.", path: "ports/neovim", snippet: 'use { "tanmaymanojgandhi/circadia", rtp = "ports/neovim" }' },
  { name: "Zed", category: "editor", type: "Extension", desc: "Native theme for Zed editor.", path: "ports/zed", snippet: "Install via Zed Extensions" },
  { name: "Obsidian", category: "web", type: "CSS Theme", desc: "Refined note-taking typography & headings.", path: "ports/obsidian", snippet: "Copy theme.css to .obsidian/themes/Circadia/" },
  { name: "JetBrains", category: "editor", type: "ICLS Scheme", desc: "IntelliJ, PyCharm, WebStorm & GoLand.", path: "ports/intellij", snippet: "File -> Import Settings -> circadia.icls" },
  { name: "Xcode", category: "editor", type: "Plist Theme", desc: "Swift, C++, and Obj-C colorscheme.", path: "ports/xcode", snippet: "Copy to ~/Library/Developer/Xcode/UserData/FontAndColorThemes" },
  { name: "Alacritty", category: "terminal", type: "TOML", desc: "GPU-accelerated terminal palette.", path: "ports/alacritty", snippet: 'import = ["~/.config/alacritty/circadia-dark.toml"]' },
  { name: "Kitty", category: "terminal", type: "Conf", desc: "Truecolor configuration for Kitty.", path: "ports/kitty", snippet: "include circadia-dark.conf" },
  { name: "Windows Terminal", category: "terminal", type: "JSON", desc: "Schemes for Windows Terminal & PowerShell.", path: "ports/windows-terminal", snippet: "Add scheme to settings.json" },
  { name: "iTerm2", category: "terminal", type: "Preset", desc: "Color presets for macOS iTerm2.", path: "ports/iterm2", snippet: "Profiles -> Colors -> Import Presets" },
  { name: "Vim", category: "editor", type: "Plugin", desc: "Classic 256-color & GUI colorscheme.", path: "ports/vim", snippet: "colorscheme circadia-dark" },
  { name: "Konsole", category: "terminal", type: "Scheme", desc: "KDE Konsole profile scheme.", path: "ports/konsole", snippet: "Copy to ~/.local/share/konsole/" },
  { name: "Chrome", category: "desktop", type: "Theme", desc: "Unpacked browser skin for Chrome.", path: "ports/chrome", snippet: "chrome://extensions -> Load Unpacked" },
  { name: "Slack", category: "web", type: "Sidebar", desc: "Custom workspace palette string.", path: "ports/slack", snippet: "Preferences -> Themes -> Custom" },
  { name: "Telegram", category: "desktop", type: "Palette", desc: "Desktop chat & UI skin.", path: "ports/telegram", snippet: "Settings -> Chat Settings -> Apply Theme" },
  { name: "KDE Plasma", category: "desktop", type: "Color Scheme", desc: "System-wide KDE Linux palette.", path: "ports/kde", snippet: "Copy to ~/.local/share/color-schemes/" },
  { name: "Tailwind CSS", category: "web", type: "@theme", desc: "Tailwind v4 design token imports.", path: "ports/tailwind", snippet: '@import "ports/tailwind/circadia.css";' },
  { name: "VitePress", category: "web", type: "CSS", desc: "Documentation styling variables.", path: "ports/vitepress", snippet: 'import "./circadia.css"' }
];

const CODE_EXAMPLES = {
  markdown: {
    file: "spec.md",
    lang: "Markdown",
    tokens: [
      { text: '# Circadia Open Specification\n\n', tok: 'h1' },
      { text: '> Low-strain themes engineered in OKLCH for continuous focus.\n\n', tok: 'quote' },
      { text: '## Circadian Ambient Modes\n\n', tok: 'h2' },
      { text: '- ', tok: 'bullet' },
      { text: 'Warm Parchment: ', tok: 'bold' },
      { text: '300–800+ lux (Glare-free daylight)\n', tok: 'ident' },
      { text: '- ', tok: 'bullet' },
      { text: 'Warm Ember: ', tok: 'bold' },
      { text: '0–50 lux (Halation-free obsidian)\n\n', tok: 'ident' },
      { text: '### Specification Values\n\n', tok: 'h3' },
      { text: 'Primary accent: ', tok: 'ident' },
      { text: '`oklch(75.0% 0.130 65)`', tok: 'code' },
      { text: '\nWCAG 2.1 status: ', tok: 'ident' },
      { text: '`Strict AAA (>= 7.0:1)`', tok: 'code' },
      { text: '\n\n', tok: 'ident' },
      { text: '[Explore All 18 Ports](https://github.com/tanmaymanojgandhi/circadia)\n', tok: 'link' }
    ]
  },
  typescript: {
    file: "circadia.ts",
    lang: "TypeScript",
    tokens: [
      { text: 'import', tok: 'keyword' },
      { text: ' { Oklch, Contrast } ' },
      { text: 'from', tok: 'keyword' },
      { text: ' "@circadia/spec";\n\n' },
      { text: '// Strict WCAG 2.1 AAA Invariant\n', tok: 'comment' },
      { text: 'export interface', tok: 'keyword' },
      { text: ' PaletteConfig', tok: 'type' },
      { text: ' {\n' },
      { text: '  readonly', tok: 'keyword' },
      { text: ' mode: ' },
      { text: '"light"', tok: 'string' },
      { text: ' | ' },
      { text: '"dark"', tok: 'string' },
      { text: ';\n' },
      { text: '  readonly', tok: 'keyword' },
      { text: ' minRatio: ' },
      { text: 'number', tok: 'type' },
      { text: ';\n' },
      { text: '}\n\n' },
      { text: 'export function', tok: 'keyword' },
      { text: ' getThemeMetrics', tok: 'function' },
      { text: '(mode: ' },
      { text: 'string', tok: 'type' },
      { text: '): ' },
      { text: 'PaletteConfig', tok: 'type' },
      { text: ' {\n' },
      { text: '  return', tok: 'keyword' },
      { text: ' {\n' },
      { text: '    mode: mode === ' },
      { text: '"light"', tok: 'string' },
      { text: ' ? ' },
      { text: '"light"', tok: 'string' },
      { text: ' : ' },
      { text: '"dark"', tok: 'string' },
      { text: ',\n' },
      { text: '    minRatio: ' },
      { text: '7.0', tok: 'number' },
      { text: '\n  };\n}' }
    ]
  },
  rust: {
    file: "palette.rs",
    lang: "Rust",
    tokens: [
      { text: 'use', tok: 'keyword' },
      { text: ' circadia::color::Oklch;\n\n' },
      { text: '/// High-contrast circadian spec evaluator\n', tok: 'comment' },
      { text: '#[derive(Debug, Clone)]\n', tok: 'tag' },
      { text: 'pub struct', tok: 'keyword' },
      { text: ' ColorSpec', tok: 'type' },
      { text: ' {\n' },
      { text: '    pub lightness: ' },
      { text: 'f32', tok: 'type' },
      { text: ',\n' },
      { text: '    pub chroma: ' },
      { text: 'f32', tok: 'type' },
      { text: ',\n' },
      { text: '    pub hue: ' },
      { text: 'f32', tok: 'type' },
      { text: ',\n' },
      { text: '}\n\n' },
      { text: 'impl', tok: 'keyword' },
      { text: ' ColorSpec {\n' },
      { text: '    pub fn', tok: 'keyword' },
      { text: ' new', tok: 'function' },
      { text: '(l: ' },
      { text: 'f32', tok: 'type' },
      { text: ', c: ' },
      { text: 'f32', tok: 'type' },
      { text: ', h: ' },
      { text: 'f32', tok: 'type' },
      { text: ') -> ' },
      { text: 'Self', tok: 'type' },
      { text: ' {\n' },
      { text: '        Self { lightness: l, chroma: c, hue: h }\n' },
      { text: '    }\n' },
      { text: '}' }
    ]
  },
  python: {
    file: "contrast.py",
    lang: "Python",
    tokens: [
      { text: '# Circadia Contrast Model\n', tok: 'comment' },
      { text: 'from', tok: 'keyword' },
      { text: ' dataclasses ' },
      { text: 'import', tok: 'keyword' },
      { text: ' dataclass\n\n' },
      { text: '@dataclass\n', tok: 'tag' },
      { text: 'class', tok: 'keyword' },
      { text: ' TokenMetric', tok: 'type' },
      { text: ':\n' },
      { text: '    name: ' },
      { text: 'str', tok: 'type' },
      { text: '\n' },
      { text: '    contrast_ratio: ' },
      { text: 'float', tok: 'type' },
      { text: ' = ' },
      { text: '7.0', tok: 'number' },
      { text: '\n\n' },
      { text: '    def', tok: 'keyword' },
      { text: ' is_aaa_compliant', tok: 'function' },
      { text: '(self) -> ' },
      { text: 'bool', tok: 'type' },
      { text: ':\n' },
      { text: '        """Assert WCAG AAA 7:1 threshold."""\n', tok: 'comment' },
      { text: '        return', tok: 'keyword' },
      { text: ' self.contrast_ratio >= ' },
      { text: '7.0', tok: 'number' },
      { text: '\n' }
    ]
  },
  html: {
    file: "index.html",
    lang: "HTML",
    tokens: [
      { text: '<!DOCTYPE html>\n', tok: 'comment' },
      { text: '<', tok: 'tag' },
      { text: 'html', tok: 'tag' },
      { text: ' lang=', tok: 'ident' },
      { text: '"en"', tok: 'string' },
      { text: ' data-theme=', tok: 'ident' },
      { text: '"dark"', tok: 'string' },
      { text: '>\n' },
      { text: '  <', tok: 'tag' },
      { text: 'head', tok: 'tag' },
      { text: '>\n' },
      { text: '    <', tok: 'tag' },
      { text: 'title', tok: 'tag' },
      { text: '>Circadia Spec</' },
      { text: 'title', tok: 'tag' },
      { text: '>\n' },
      { text: '  </' },
      { text: 'head', tok: 'tag' },
      { text: '>\n' },
      { text: '  <', tok: 'tag' },
      { text: 'body', tok: 'tag' },
      { text: '>\n' },
      { text: '    <', tok: 'tag' },
      { text: 'h1', tok: 'tag' },
      { text: '>Circadia</' },
      { text: 'h1', tok: 'tag' },
      { text: '>\n' },
      { text: '  </' },
      { text: 'body', tok: 'tag' },
      { text: '>\n' },
      { text: '</' },
      { text: 'html', tok: 'tag' },
      { text: '>' }
    ]
  }
};

let currentTheme = localStorage.getItem("circadia_theme") || "dark";
let activeFilter = "all";
let activeCopyFormat = "hex";
let activeLanguage = "markdown";
let activePortCategory = "all";

// Luminance & Contrast
function srgbToLinear(c) {
  const v = c / 255;
  return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
}

function getRelativeLuminance(rgb) {
  const [r, g, b] = rgb.map(srgbToLinear);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function getContrast(rgb1, rgb2) {
  const L1 = getRelativeLuminance(rgb1);
  const L2 = getRelativeLuminance(rgb2);
  return (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
}

// Toast Notification
function notify(msg) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 1800);
}

// Clipboard
function copy(val, label) {
  navigator.clipboard.writeText(val).then(() => {
    notify(`Copied ${label || val}`);
  }).catch(() => {
    notify(`Copied ${label || val}`);
  });
}

function formatVal(tokenName, item, category, format) {
  if (format === "oklch") return item.oklch;
  if (format === "rgb") return `rgb(${item.rgb.join(", ")})`;
  if (format === "css") return `var(--${category === "syntax" ? "syn-" : ""}${tokenName.replace(/_/g, "-")})`;
  return item.hex;
}

// Render Swatches
function renderSwatches() {
  const container = document.getElementById("swatchContainer");
  if (!container) return;

  const mode = PALETTE.modes[currentTheme];
  const canvasRgb = mode.ui.bg_canvas.rgb;
  const q = (document.getElementById("searchInput")?.value || "").toLowerCase().trim();

  let tokens = [];
  ["ui", "syntax", "headings"].forEach(cat => {
    Object.entries(mode[cat]).forEach(([key, val]) => {
      tokens.push({ key, val, cat });
    });
  });

  const filtered = tokens.filter(item => {
    const catMatch = activeFilter === "all" || item.cat === activeFilter;
    const searchMatch = !q || item.key.toLowerCase().includes(q) || item.val.hex.toLowerCase().includes(q) || item.val.role.toLowerCase().includes(q);
    return catMatch && searchMatch;
  });

  container.innerHTML = "";

  if (filtered.length === 0) {
    container.innerHTML = `<div style="grid-column: 1/-1; padding: 24px; color: var(--text-faint); font-family: var(--font-mono); font-size: 0.8rem;">No matching tokens found.</div>`;
    return;
  }

  filtered.forEach(item => {
    const ratio = getContrast(item.val.rgb, canvasRgb);
    const value = formatVal(item.key, item.val, item.cat, activeCopyFormat);

    const cell = document.createElement("div");
    cell.className = "token-cell";
    cell.setAttribute("title", `Click to copy ${value}`);

    cell.innerHTML = `
      <span class="token-swatch" style="background-color: ${item.val.hex};"></span>
      <div class="token-details">
        <div class="token-key-row">
          <span class="token-name">${item.key}</span>
          <span class="token-ratio">${ratio.toFixed(1)}:1</span>
        </div>
        <span class="token-val">${value}</span>
      </div>
    `;

    cell.addEventListener("click", () => copy(value, item.key));
    container.appendChild(cell);
  });
}

// Render Editor Preview
function renderEditor() {
  const codeArea = document.getElementById("codeArea");
  const gutters = document.getElementById("editorGutters");
  const fileName = document.getElementById("editorFileName");
  const langBadge = document.getElementById("editorLangBadge");
  const inspector = document.getElementById("inspectorBar");
  if (!codeArea || !gutters) return;

  const data = CODE_EXAMPLES[activeLanguage] || CODE_EXAMPLES.markdown;
  if (fileName) fileName.textContent = data.file;
  if (langBadge) langBadge.textContent = data.lang;

  codeArea.innerHTML = "";
  let lines = 1;
  const mode = PALETTE.modes[currentTheme];

  data.tokens.forEach(chunk => {
    const span = document.createElement("span");
    span.textContent = chunk.text;

    if (chunk.tok) {
      span.className = `tok-${chunk.tok}`;
      span.addEventListener("mouseenter", () => {
        let meta = mode.syntax[chunk.tok];
        let label = `syntax.${chunk.tok}`;
        if (!meta && (chunk.tok === 'h1' || chunk.tok === 'h2' || chunk.tok === 'h3')) {
          meta = mode.headings[chunk.tok];
          label = `headings.${chunk.tok}`;
        } else if (!meta && chunk.tok === 'quote') {
          meta = mode.syntax.comment;
          label = `syntax.comment`;
        } else if (!meta && chunk.tok === 'code') {
          meta = mode.syntax.number;
          label = `syntax.number`;
        } else if (!meta && chunk.tok === 'link') {
          meta = mode.syntax.tag;
          label = `syntax.tag (link)`;
        } else if (!meta && chunk.tok === 'bullet') {
          meta = mode.ui.accent;
          label = `ui.accent`;
        } else if (!meta && chunk.tok === 'bold') {
          meta = mode.ui.text_primary;
          label = `ui.text_primary`;
        }
        if (inspector && meta) {
          inspector.innerHTML = `<span style="display:inline-block; width:8px; height:8px; background:${meta.hex}; border-radius:2px; margin-right:6px;"></span><strong>${label}</strong> &bull; <code>${meta.hex}</code> &bull; <code>${meta.oklch}</code> &bull; ${meta.role || ''}`;
        }
      });
    }

    codeArea.appendChild(span);
    lines += (chunk.text.match(/\n/g) || []).length;
  });

  gutters.innerHTML = Array.from({ length: lines }, (_, i) => i + 1).join("<br>");
}

// Render Contrast Table
function renderContrastTable() {
  const tbody = document.getElementById("contrastTbody");
  if (!tbody) return;

  const mode = PALETTE.modes[currentTheme];
  const canvasRgb = mode.ui.bg_canvas.rgb;

  const checks = [
    { cat: "UI", key: "text_primary", data: mode.ui.text_primary, target: ">= 7.0:1", type: "AAA" },
    { cat: "UI", key: "text_muted", data: mode.ui.text_muted, target: ">= 4.5:1", type: "AA" },
    { cat: "UI", key: "accent", data: mode.ui.accent, target: ">= 3.0:1", type: "UI" },
    { cat: "Headings", key: "h1", data: mode.headings.h1, target: ">= 4.5:1", type: "AA" },
    { cat: "Headings", key: "h2", data: mode.headings.h2, target: ">= 4.5:1", type: "AA" },
    { cat: "Syntax", key: "keyword", data: mode.syntax.keyword, target: ">= 4.5:1", type: "AA" },
    { cat: "Syntax", key: "string", data: mode.syntax.string, target: ">= 4.5:1", type: "AA" },
    { cat: "Syntax", key: "function", data: mode.syntax.function, target: ">= 4.5:1", type: "AA" },
    { cat: "Syntax", key: "type", data: mode.syntax.type, target: ">= 4.5:1", type: "AA" },
    { cat: "Syntax", key: "number", data: mode.syntax.number, target: ">= 4.5:1", type: "AA" },
    { cat: "Syntax", key: "comment", data: mode.syntax.comment, target: ">= 3.0:1", type: "UI" }
  ];

  tbody.innerHTML = "";

  checks.forEach(item => {
    const ratio = getContrast(item.data.rgb, canvasRgb);
    let badgeClass = ratio >= 7.0 ? "badge-aaa" : (ratio >= 4.5 ? "badge-aa" : "badge-ui");
    let badgeLabel = ratio >= 7.0 ? "WCAG AAA" : (ratio >= 4.5 ? "WCAG AA" : "UI / 3:1");

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><code>${item.key}</code></td>
      <td style="color:var(--text-faint); font-family:var(--font-mono); font-size:0.75rem;">${item.cat}</td>
      <td><span style="display:inline-block; width:12px; height:12px; border-radius:2px; background:${item.data.hex}; vertical-align:middle; margin-right:6px;"></span><span style="color:${item.data.hex}; font-weight:600; font-family:var(--font-mono)">Sample</span></td>
      <td><code>${item.data.hex}</code> <span style="color:var(--text-faint); font-size:0.72rem;">(${item.data.oklch})</span></td>
      <td><strong>${ratio.toFixed(2)}:1</strong></td>
      <td><span class="${badgeClass}">${badgeLabel}</span></td>
    `;
    tbody.appendChild(tr);
  });
}

// Render Ports
function renderPorts() {
  const container = document.getElementById("portsContainer");
  if (!container) return;

  const filtered = PORTS.filter(p => activePortCategory === "all" || p.category === activePortCategory);
  container.innerHTML = "";

  filtered.forEach(port => {
    const el = document.createElement("div");
    el.className = "port-entry";
    el.innerHTML = `
      <div>
        <div class="port-title-row">
          <span class="port-heading">${port.name}</span>
          <span class="port-badge">${port.type}</span>
        </div>
        <p class="port-summary">${port.desc}</p>
      </div>
      <div class="port-actions">
        <button class="btn-snippet">Copy Config</button>
        <a href="https://github.com/tanmaymanojgandhi/circadia/tree/main/${port.path}" target="_blank" rel="noopener noreferrer" class="btn-link">View Files &rarr;</a>
      </div>
    `;

    el.querySelector(".btn-snippet").addEventListener("click", () => copy(port.snippet, `${port.name} config`));
    container.appendChild(el);
  });
}

// Apply Theme
function applyTheme(theme) {
  currentTheme = theme;
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("circadia_theme", theme);

  const textNav = document.getElementById("themeToggleTextNav");
  const textHero = document.getElementById("themeToggleTextHero");

  const label = theme === "dark" ? "Warm Ember (Dark)" : "Warm Parchment (Light)";
  if (textNav) textNav.textContent = theme === "dark" ? "Warm Ember" : "Warm Parchment";
  if (textHero) textHero.textContent = label;

  renderSwatches();
  renderEditor();
  renderContrastTable();
}

// Init
document.addEventListener("DOMContentLoaded", () => {
  applyTheme(currentTheme);

  // Sticky Navbar Scroll Listener / IntersectionObserver
  const navbar = document.getElementById("stickyNavbar");
  const hero = document.getElementById("hero");

  if (navbar && hero) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          // Scrolled past hero -> show navbar
          navbar.classList.remove("navbar-hidden");
          navbar.classList.add("navbar-visible");
        } else {
          // In hero -> hide navbar
          navbar.classList.add("navbar-hidden");
          navbar.classList.remove("navbar-visible");
        }
      });
    }, { threshold: 0.1 });

    observer.observe(hero);
  }

  // Jump to Section Buttons (Explore Buttons & Nav Jumps)
  document.querySelectorAll(".btn-explore, .btn-nav-jump").forEach(btn => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-target");
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: "smooth" });
        if (navbar) {
          navbar.classList.remove("navbar-hidden");
          navbar.classList.add("navbar-visible");
        }
      }
    });
  });

  // Nav Theme Toggle
  const toggleBtnNav = document.getElementById("themeToggleNav");
  if (toggleBtnNav) {
    toggleBtnNav.addEventListener("click", () => {
      applyTheme(currentTheme === "dark" ? "light" : "dark");
    });
  }

  // Hero Theme Toggle
  const toggleBtnHero = document.getElementById("themeToggleHero");
  if (toggleBtnHero) {
    toggleBtnHero.addEventListener("click", () => {
      applyTheme(currentTheme === "dark" ? "light" : "dark");
    });
  }

  // Filter Tabs
  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeFilter = btn.getAttribute("data-filter") || "all";
      renderSwatches();
    });
  });

  // Search
  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("input", renderSwatches);
  }

  // Format Select
  const formatSelect = document.getElementById("formatSelect");
  if (formatSelect) {
    formatSelect.addEventListener("change", (e) => {
      activeCopyFormat = e.target.value;
      renderSwatches();
    });
  }

  // Language Tabs
  document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeLanguage = btn.getAttribute("data-lang") || "typescript";
      renderEditor();
    });
  });

  // Port Filters
  document.querySelectorAll(".port-filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".port-filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activePortCategory = btn.getAttribute("data-pcat") || "all";
      renderPorts();
    });
  });

  // Hero Quick Command Copy
  const heroCopy = document.getElementById("heroCopyCommand");
  if (heroCopy) {
    heroCopy.addEventListener("click", () => {
      copy("git clone https://github.com/tanmaymanojgandhi/circadia.git", "clone command");
    });
  }

  // Hero Mode Card Toggles
  const modeCardLight = document.getElementById("modeCardLight");
  if (modeCardLight) {
    modeCardLight.addEventListener("click", () => {
      applyTheme("light");
      notify("Activated Warm Parchment (Light Mode)");
    });
  }

  const modeCardDark = document.getElementById("modeCardDark");
  if (modeCardDark) {
    modeCardDark.addEventListener("click", () => {
      applyTheme("dark");
      notify("Activated Warm Ember (Dark Mode)");
    });
  }

  renderPorts();
});
