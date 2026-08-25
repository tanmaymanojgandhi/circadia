#!/usr/bin/env node
/**
 * Builds all ported themes from spec/palette.json into ports/
 */
const fs = require("fs");
const path = require("path");

const rootDir = path.join(__dirname, "..");
const specPath = path.join(rootDir, "spec", "palette.json");
const spec = JSON.parse(fs.readFileSync(specPath, "utf-8"));

const light = spec.modes.light_parchment || spec.modes.light;
const dark = spec.modes.dark_ember || spec.modes.dark;
const plum = spec.modes.dark_plum;
const forest = spec.modes.dark_forest;

function hexToRgb(hex) {
  const clean = hex.replace("#", "");
  return [
    parseInt(clean.slice(0, 2), 16),
    parseInt(clean.slice(2, 4), 16),
    parseInt(clean.slice(4, 6), 16)
  ];
}

function hexToRgbNormalized(hex) {
  const [r, g, b] = hexToRgb(hex);
  return [(r / 255).toFixed(3), (g / 255).toFixed(3), (b / 255).toFixed(3)];
}

function hexToRgbFloat(hex) {
  const [r, g, b] = hexToRgb(hex);
  return [r / 255, g / 255, b / 255];
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

// -------------------------------------------------------------
// 1. CHROME
// -------------------------------------------------------------
function buildChrome() {
  const outDir = path.join(rootDir, "ports", "chrome");
  ensureDir(path.join(outDir, "Circadia-Dark"));
  ensureDir(path.join(outDir, "Circadia-Light"));

  const darkManifest = {
    manifest_version: 3,
    version: "1.0.0",
    name: "Circadia Dark",
    description: "Circadia Dark theme (Warm Ember & Espresso) for Google Chrome",
    theme: {
      colors: {
        frame: hexToRgb(dark.ui.bg_surface.hex),
        frame_inactive: hexToRgb(dark.ui.bg_element.hex),
        ntp_background: hexToRgb(dark.ui.bg_canvas.hex),
        ntp_text: hexToRgb(dark.ui.text_primary.hex),
        tab_text: hexToRgb(dark.ui.text_primary.hex),
        tab_background_text: hexToRgb(dark.ui.text_muted.hex),
        bookmark_text: hexToRgb(dark.ui.text_primary.hex),
        ntp_link: hexToRgb(dark.ui.accent.hex),
        ntp_header: hexToRgb(dark.ui.text_muted.hex),
        toolbar: hexToRgb(dark.ui.bg_canvas.hex),
        toolbar_text: hexToRgb(dark.ui.text_primary.hex),
        toolbar_field_text: hexToRgb(dark.ui.text_muted.hex),
        button_background: [0, 0, 0, 0]
      },
      tints: {}
    }
  };

  const lightManifest = {
    manifest_version: 3,
    version: "1.0.0",
    name: "Circadia Light",
    description: "Circadia Light theme (Warm Parchment) for Google Chrome",
    theme: {
      colors: {
        frame: hexToRgb(light.ui.bg_surface.hex),
        frame_inactive: hexToRgb(light.ui.bg_element.hex),
        ntp_background: hexToRgb(light.ui.bg_canvas.hex),
        ntp_text: hexToRgb(light.ui.text_primary.hex),
        tab_text: hexToRgb(light.ui.text_primary.hex),
        tab_background_text: hexToRgb(light.ui.text_muted.hex),
        bookmark_text: hexToRgb(light.ui.text_primary.hex),
        ntp_link: hexToRgb(light.ui.accent.hex),
        ntp_header: hexToRgb(light.ui.text_muted.hex),
        toolbar: hexToRgb(light.ui.bg_canvas.hex),
        toolbar_text: hexToRgb(light.ui.text_primary.hex),
        toolbar_field_text: hexToRgb(light.ui.text_muted.hex),
        button_background: [0, 0, 0, 0]
      },
      tints: {}
    }
  };

  fs.writeFileSync(path.join(outDir, "Circadia-Dark", "manifest.json"), JSON.stringify(darkManifest, null, 2));
  fs.writeFileSync(path.join(outDir, "Circadia-Light", "manifest.json"), JSON.stringify(lightManifest, null, 2));

  const readme = `# Circadia for Google Chrome

Perceptually calibrated, low-strain browser themes for Google Chrome.

- **Circadia Light**: Warm Parchment (\`${light.ui.bg_canvas.hex}\`)
- **Circadia Dark**: Warm Ember & Espresso (\`${dark.ui.bg_canvas.hex}\`)

## Installation

1. Open Chrome and navigate to \`chrome://extensions\`.
2. Enable **Developer mode** in the top right corner.
3. Click **Load unpacked** and select either \`Circadia-Dark\` or \`Circadia-Light\` directory.
`;
  fs.writeFileSync(path.join(outDir, "README.md"), readme);
  console.log("Built chrome port");
}

// -------------------------------------------------------------
// 2. INTELLIJ
// -------------------------------------------------------------
function buildIntellij() {
  const outDir = path.join(rootDir, "ports", "intellij");
  ensureDir(outDir);

  function generateIcls(mode, isDark) {
    const ui = mode.ui;
    const syntax = mode.syntax;
    const headings = mode.headings;
    const name = `Circadia ${isDark ? "Dark" : "Light"}`;
    const parentScheme = isDark ? "Darcula" : "Default";

    return `<?xml version="1.0" encoding="UTF-8"?>
<scheme name="${name}" parent_scheme="${parentScheme}" version="142">
  <metaInfo>
    <property name="created">2026-08-19</property>
    <property name="description">${name} (${mode.name})</property>
    <property name="vendor">Circadia</property>
  </metaInfo>
  <colors>
    <option name="ADDED_LINES_COLOR" value="${syntax.string.hex.replace('#', '')}" />
    <option name="ANNOTATIONS_COLOR" value="${ui.text_muted.hex.replace('#', '')}" />
    <option name="CARET_COLOR" value="${ui.accent.hex.replace('#', '')}" />
    <option name="CARET_ROW_COLOR" value="${ui.bg_surface.hex.replace('#', '')}" />
    <option name="CONSOLE_BACKGROUND_KEY" value="${ui.bg_canvas.hex.replace('#', '')}" />
    <option name="DELETED_LINES_COLOR" value="${isDark ? "e06c75" : "dc2626"}" />
    <option name="DOCUMENTATION_COLOR" value="${ui.bg_surface.hex.replace('#', '')}" />
    <option name="ERROR_HINT" value="${isDark ? "e06c75" : "dc2626"}" />
    <option name="FILESTATUS_ADDED" value="${syntax.string.hex.replace('#', '')}" />
    <option name="FILESTATUS_MODIFIED" value="${syntax.number.hex.replace('#', '')}" />
    <option name="FILESTATUS_NOT_CHANGED_IMMEDIATE" value="${syntax.keyword.hex.replace('#', '')}" />
    <option name="FILESTATUS_UNKNOWN" value="${syntax.function.hex.replace('#', '')}" />
    <option name="FOLDED_TEXT_BORDER_COLOR" value="${ui.border.hex.replace('#', '')}" />
    <option name="GUTTER_BACKGROUND" value="${ui.bg_canvas.hex.replace('#', '')}" />
    <option name="INDENT_GUIDE" value="${ui.border.hex.replace('#', '')}" />
    <option name="INFORMATION_HINT" value="${ui.bg_surface.hex.replace('#', '')}" />
    <option name="LINE_NUMBERS_COLOR" value="${ui.text_faint.hex.replace('#', '')}" />
    <option name="LINE_NUMBER_ON_CARET_ROW_COLOR" value="${ui.accent.hex.replace('#', '')}" />
    <option name="METHOD_SEPARATORS_COLOR" value="${ui.border.hex.replace('#', '')}" />
    <option name="MODIFIED_LINES_COLOR" value="${syntax.number.hex.replace('#', '')}" />
    <option name="NOTIFICATION_BACKGROUND" value="${ui.bg_element.hex.replace('#', '')}" />
    <option name="QUESTION_HINT" value="${syntax.keyword.hex.replace('#', '')}" />
    <option name="RECURSIVE_CALL_ATTRIBUTES" value="${syntax.type.hex.replace('#', '')}" />
    <option name="RIGHT_MARGIN_COLOR" value="${ui.border.hex.replace('#', '')}" />
    <option name="SELECTED_INDENT_GUIDE" value="${ui.text_faint.hex.replace('#', '')}" />
    <option name="SELECTED_TEARLINE_COLOR" value="${ui.text_faint.hex.replace('#', '')}" />
    <option name="SELECTION_BACKGROUND" value="${ui.bg_element.hex.replace('#', '')}" />
    <option name="SELECTION_FOREGROUND" value="${ui.text_primary.hex.replace('#', '')}" />
    <option name="TEARLINE_COLOR" value="${ui.border.hex.replace('#', '')}" />
    <option name="VISUAL_INDENT_GUIDE" value="${ui.border.hex.replace('#', '')}" />
    <option name="WHITESPACES" value="${ui.border.hex.replace('#', '')}" />
  </colors>
  <attributes>
    <option name="MATCHED_BRACE_ATTRIBUTES">
      <value>
        <option name="EFFECT_COLOR" value="${ui.accent.hex.replace('#', '')}" />
        <option name="EFFECT_TYPE" value="1" />
      </value>
    </option>
    <option name="IDENTIFIER_UNDER_CARET_ATTRIBUTES">
      <value>
        <option name="BACKGROUND" value="${ui.bg_element.hex.replace('#', '')}" />
        <option name="ERROR_STRIPE_COLOR" value="${ui.border.hex.replace('#', '')}" />
      </value>
    </option>
    <option name="DEFAULT_BLOCK_COMMENT">
      <value>
        <option name="FOREGROUND" value="${syntax.comment.hex.replace('#', '')}" />
        <option name="FONT_TYPE" value="2" />
      </value>
    </option>
    <option name="DEFAULT_CLASS_NAME">
      <value>
        <option name="FOREGROUND" value="${syntax.type.hex.replace('#', '')}" />
      </value>
    </option>
    <option name="DEFAULT_CLASS_REFERENCE">
      <value>
        <option name="FOREGROUND" value="${syntax.type.hex.replace('#', '')}" />
      </value>
    </option>
    <option name="DEFAULT_CONSTANT">
      <value>
        <option name="FOREGROUND" value="${syntax.number.hex.replace('#', '')}" />
      </value>
    </option>
    <option name="DEFAULT_DOC_COMMENT">
      <value>
        <option name="FOREGROUND" value="${syntax.comment.hex.replace('#', '')}" />
        <option name="FONT_TYPE" value="2" />
      </value>
    </option>
    <option name="DEFAULT_DOC_COMMENT_TAG">
      <value>
        <option name="FOREGROUND" value="${ui.accent.hex.replace('#', '')}" />
        <option name="FONT_TYPE" value="1" />
      </value>
    </option>
    <option name="DEFAULT_DOT">
      <value>
        <option name="FOREGROUND" value="${ui.text_primary.hex.replace('#', '')}" />
      </value>
    </option>
    <option name="DEFAULT_FUNCTION_CALL">
      <value>
        <option name="FOREGROUND" value="${syntax.function.hex.replace('#', '')}" />
      </value>
    </option>
    <option name="DEFAULT_FUNCTION_DECLARATION">
      <value>
        <option name="FOREGROUND" value="${syntax.function.hex.replace('#', '')}" />
      </value>
    </option>
    <option name="DEFAULT_GLOBAL_VARIABLE">
      <value>
        <option name="FOREGROUND" value="${ui.text_primary.hex.replace('#', '')}" />
      </value>
    </option>
    <option name="DEFAULT_IDENTIFIER">
      <value>
        <option name="FOREGROUND" value="${ui.text_primary.hex.replace('#', '')}" />
      </value>
    </option>
    <option name="DEFAULT_INSTANCE_FIELD">
      <value>
        <option name="FOREGROUND" value="${ui.text_primary.hex.replace('#', '')}" />
      </value>
    </option>
    <option name="DEFAULT_INTERFACE_NAME">
      <value>
        <option name="FOREGROUND" value="${syntax.type.hex.replace('#', '')}" />
      </value>
    </option>
    <option name="DEFAULT_INVALID_STRING_ESCAPE">
      <value>
        <option name="FOREGROUND" value="${isDark ? "e06c75" : "dc2626"}" />
        <option name="EFFECT_COLOR" value="${isDark ? "e06c75" : "dc2626"}" />
        <option name="EFFECT_TYPE" value="2" />
      </value>
    </option>
    <option name="DEFAULT_KEYWORD">
      <value>
        <option name="FOREGROUND" value="${syntax.keyword.hex.replace('#', '')}" />
        <option name="FONT_TYPE" value="1" />
      </value>
    </option>
    <option name="DEFAULT_LINE_COMMENT">
      <value>
        <option name="FOREGROUND" value="${syntax.comment.hex.replace('#', '')}" />
        <option name="FONT_TYPE" value="2" />
      </value>
    </option>
    <option name="DEFAULT_LOCAL_VARIABLE">
      <value>
        <option name="FOREGROUND" value="${ui.text_primary.hex.replace('#', '')}" />
      </value>
    </option>
    <option name="DEFAULT_NUMBER">
      <value>
        <option name="FOREGROUND" value="${syntax.number.hex.replace('#', '')}" />
      </value>
    </option>
    <option name="DEFAULT_OPERATION_SIGN">
      <value>
        <option name="FOREGROUND" value="${ui.text_muted.hex.replace('#', '')}" />
      </value>
    </option>
    <option name="DEFAULT_PARAMETER">
      <value>
        <option name="FOREGROUND" value="${ui.text_primary.hex.replace('#', '')}" />
      </value>
    </option>
    <option name="DEFAULT_SEMICOLON">
      <value>
        <option name="FOREGROUND" value="${ui.text_muted.hex.replace('#', '')}" />
      </value>
    </option>
    <option name="DEFAULT_STRING">
      <value>
        <option name="FOREGROUND" value="${syntax.string.hex.replace('#', '')}" />
      </value>
    </option>
    <option name="DEFAULT_TAG">
      <value>
        <option name="FOREGROUND" value="${syntax.tag.hex.replace('#', '')}" />
      </value>
    </option>
    <option name="DEFAULT_TEMPLATE_LANGUAGE_COLOR">
      <value>
        <option name="BACKGROUND" value="${ui.bg_surface.hex.replace('#', '')}" />
      </value>
    </option>
    <option name="DEFAULT_VALID_STRING_ESCAPE">
      <value>
        <option name="FOREGROUND" value="${syntax.type.hex.replace('#', '')}" />
      </value>
    </option>
    <option name="TEXT">
      <value>
        <option name="FOREGROUND" value="${ui.text_primary.hex.replace('#', '')}" />
        <option name="BACKGROUND" value="${ui.bg_canvas.hex.replace('#', '')}" />
        <option name="EFFECT_TYPE" value="5" />
      </value>
    </option>
  </attributes>
</scheme>`;
  }

  fs.writeFileSync(path.join(outDir, "circadia-dark.icls"), generateIcls(dark, true));
  fs.writeFileSync(path.join(outDir, "circadia-light.icls"), generateIcls(light, false));

  const readme = `# Circadia for JetBrains IDEs

Perceptually calibrated color schemes for IntelliJ IDEA, PyCharm, WebStorm, CLion, Rider, GoLand, and Android Studio.

- **Circadia Dark** (\`circadia-dark.icls\`): Warm Ember & Espresso
- **Circadia Light** (\`circadia-light.icls\`): Warm Parchment

## Installation

1. Open **Settings / Preferences** (\`Ctrl+Alt+S\` / \`Cmd+,\`).
2. Navigate to **Editor → Color Scheme**.
3. Click the gear icon ⚙ next to the Scheme dropdown and select **Import Scheme...**.
4. Choose either \`circadia-dark.icls\` or \`circadia-light.icls\`.
5. Click **Apply** and **OK**.
`;
  fs.writeFileSync(path.join(outDir, "README.md"), readme);
  console.log("Built intellij port");
}

// -------------------------------------------------------------
// 3. ITERM2
// -------------------------------------------------------------
function buildIterm2() {
  const outDir = path.join(rootDir, "ports", "iterm2");
  ensureDir(outDir);

  function generatePlist(modeName, ui, syntax, headings, isDark) {
    const ansi = isDark
      ? [
          ui.bg_element.hex,     // 0: Black
          headings.h4.hex,        // 1: Red (#db8935)
          syntax.string.hex,      // 2: Green (#a7db76)
          syntax.number.hex,      // 3: Yellow (#f6a84d)
          syntax.function.hex,    // 4: Blue (#89c8e4)
          syntax.keyword.hex,     // 5: Magenta (#e59de8)
          syntax.type.hex,        // 6: Cyan (#f1be85)
          ui.text_primary.hex,    // 7: White (#eae3d8)
          ui.text_faint.hex,      // 8: Bright Black (#92887d)
          headings.h3.hex,        // 9: Bright Red (#ea9d49)
          syntax.string.hex,      // 10: Bright Green (#a7db76)
          headings.h1.hex,        // 11: Bright Yellow (#f8c88f)
          syntax.function.hex,    // 12: Bright Blue (#89c8e4)
          syntax.keyword.hex,     // 13: Bright Magenta (#e59de8)
          syntax.type.hex,        // 14: Bright Cyan (#f1be85)
          "#ffffff"               // 15: Bright White
        ]
      : [
          ui.bg_element.hex,     // 0: Black (#e2d8c3)
          syntax.number.hex,      // 1: Red (#8d4400)
          syntax.string.hex,      // 2: Green (#1e6822)
          headings.h4.hex,        // 3: Yellow (#236bb5)
          syntax.function.hex,    // 4: Blue (#165084)
          syntax.keyword.hex,     // 5: Magenta (#6b1d8f)
          syntax.type.hex,        // 6: Cyan (#00677f)
          ui.text_primary.hex,    // 7: White (#28323a)
          ui.text_faint.hex,      // 8: Bright Black (#5f6d7a)
          syntax.number.hex,      // 9: Bright Red (#8d4400)
          syntax.string.hex,      // 10: Bright Green (#1e6822)
          ui.accent.hex,          // 11: Bright Yellow (#195697)
          headings.h3.hex,        // 12: Bright Blue (#1c60a2)
          syntax.keyword.hex,     // 13: Bright Magenta (#6b1d8f)
          syntax.type.hex,        // 14: Bright Cyan (#00677f)
          ui.text_primary.hex     // 15: Bright White (#28323a)
        ];

    function colorDict(hex) {
      const [r, g, b] = hexToRgbFloat(hex);
      return `    <dict>
        <key>Color Space</key>
        <string>sRGB</string>
        <key>Red Component</key>
        <real>${r}</real>
        <key>Green Component</key>
        <real>${g}</real>
        <key>Blue Component</key>
        <real>${b}</real>
        <key>Alpha Component</key>
        <real>1</real>
    </dict>`;
    }

    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>\n`;

    for (let i = 0; i < 16; i++) {
      xml += `    <key>Ansi ${i} Color</key>\n${colorDict(ansi[i])}\n`;
    }

    xml += `    <key>Background Color</key>\n${colorDict(ui.bg_canvas.hex)}\n`;
    xml += `    <key>Foreground Color</key>\n${colorDict(ui.text_primary.hex)}\n`;
    xml += `    <key>Cursor Color</key>\n${colorDict(ui.accent.hex)}\n`;
    xml += `    <key>Cursor Text Color</key>\n${colorDict(ui.bg_canvas.hex)}\n`;
    xml += `    <key>Selection Color</key>\n${colorDict(ui.bg_element.hex)}\n`;
    xml += `    <key>Selected Text Color</key>\n${colorDict(ui.text_primary.hex)}\n`;
    xml += `    <key>Bold Color</key>\n${colorDict(ui.text_primary.hex)}\n`;
    xml += `    <key>Link Color</key>\n${colorDict(ui.accent.hex)}\n`;
    xml += `    <key>Badge Color</key>\n${colorDict(ui.accent.hex)}\n`;

    xml += `</dict>\n</plist>`;
    return xml;
  }

  fs.writeFileSync(path.join(outDir, "Circadia Dark.itermcolors"), generatePlist("dark", dark.ui, dark.syntax, dark.headings, true));
  fs.writeFileSync(path.join(outDir, "Circadia Light.itermcolors"), generatePlist("light", light.ui, light.syntax, light.headings, false));

  const readme = `# Circadia for iTerm2

Circadian terminal color schemes for iTerm2 on macOS.

- **Circadia Dark** (\`Circadia Dark.itermcolors\`): Warm Ember & Espresso
- **Circadia Light** (\`Circadia Light.itermcolors\`): Warm Parchment

## Installation

1. Open iTerm2.
2. Go to **Preferences → Profiles → Colors**.
3. In the bottom-right corner, click **Color Presets... → Import...**.
4. Select \`Circadia Dark.itermcolors\` or \`Circadia Light.itermcolors\`.
5. Select the imported preset from the **Color Presets...** list.
`;
  fs.writeFileSync(path.join(outDir, "README.md"), readme);
  console.log("Built iterm2 port");
}

// -------------------------------------------------------------
// 4. KDE
// -------------------------------------------------------------
function buildKde() {
  const outDir = path.join(rootDir, "ports", "kde");
  ensureDir(outDir);

  function generateKdeScheme(modeName, ui, syntax, isDark) {
    const bgNormal = hexToRgb(ui.bg_canvas.hex).join(",");
    const bgAlt = hexToRgb(ui.bg_surface.hex).join(",");
    const bgElv = hexToRgb(ui.bg_element.hex).join(",");
    const fgNormal = hexToRgb(ui.text_primary.hex).join(",");
    const fgInactive = hexToRgb(ui.text_faint.hex).join(",");
    const accent = hexToRgb(ui.accent.hex).join(",");
    const neg = isDark ? "224,108,117" : "220,38,38";
    const pos = hexToRgb(syntax.string.hex).join(",");
    const neutral = hexToRgb(syntax.number.hex).join(",");
    const visited = hexToRgb(syntax.keyword.hex).join(",");

    return `[ColorEffects:Disabled]
Color=${fgInactive}
ColorAmount=0
ColorEffect=0
ContrastAmount=0.65
ContrastEffect=1
IntensityAmount=0.1
IntensityEffect=2

[ColorEffects:Inactive]
ChangeSelectionColor=true
Color=${bgAlt}
ColorAmount=0.025
ColorEffect=2
ContrastAmount=0.1
ContrastEffect=2
Enable=false
IntensityAmount=0
IntensityEffect=0

[Colors:Button]
BackgroundAlternate=${bgElv}
BackgroundNormal=${bgAlt}
DecorationFocus=${accent}
DecorationHover=${accent}
ForegroundActive=${accent}
ForegroundInactive=${fgInactive}
ForegroundLink=${accent}
ForegroundNegative=${neg}
ForegroundNeutral=${neutral}
ForegroundNormal=${fgNormal}
ForegroundPositive=${pos}
ForegroundVisited=${visited}

[Colors:Complementary]
BackgroundAlternate=${bgElv}
BackgroundNormal=${bgNormal}
DecorationFocus=${accent}
DecorationHover=${accent}
ForegroundActive=${accent}
ForegroundInactive=${fgInactive}
ForegroundLink=${accent}
ForegroundNegative=${neg}
ForegroundNeutral=${neutral}
ForegroundNormal=${fgNormal}
ForegroundPositive=${pos}
ForegroundVisited=${visited}

[Colors:Header]
BackgroundAlternate=${bgElv}
BackgroundNormal=${bgAlt}
DecorationFocus=${accent}
DecorationHover=${accent}
ForegroundActive=${accent}
ForegroundInactive=${fgInactive}
ForegroundLink=${accent}
ForegroundNegative=${neg}
ForegroundNeutral=${neutral}
ForegroundNormal=${fgNormal}
ForegroundPositive=${pos}

[Colors:Selection]
BackgroundAlternate=${accent}
BackgroundNormal=${accent}
DecorationFocus=${accent}
DecorationHover=${accent}
ForegroundActive=${fgNormal}
ForegroundInactive=${fgInactive}
ForegroundLink=${accent}
ForegroundNegative=${neg}
ForegroundNeutral=${neutral}
ForegroundNormal=${isDark ? "21,20,27" : "255,253,248"}
ForegroundPositive=${pos}
ForegroundVisited=${visited}

[Colors:Tooltip]
BackgroundAlternate=${bgElv}
BackgroundNormal=${bgAlt}
DecorationFocus=${accent}
DecorationHover=${accent}
ForegroundActive=${accent}
ForegroundInactive=${fgInactive}
ForegroundLink=${accent}
ForegroundNegative=${neg}
ForegroundNeutral=${neutral}
ForegroundNormal=${fgNormal}
ForegroundPositive=${pos}
ForegroundVisited=${visited}

[Colors:View]
BackgroundAlternate=${bgAlt}
BackgroundNormal=${bgNormal}
DecorationFocus=${accent}
DecorationHover=${accent}
ForegroundActive=${accent}
ForegroundInactive=${fgInactive}
ForegroundLink=${accent}
ForegroundNegative=${neg}
ForegroundNeutral=${neutral}
ForegroundNormal=${fgNormal}
ForegroundPositive=${pos}
ForegroundVisited=${visited}

[Colors:Window]
BackgroundAlternate=${bgElv}
BackgroundNormal=${bgAlt}
DecorationFocus=${accent}
DecorationHover=${accent}
ForegroundActive=${accent}
ForegroundInactive=${fgInactive}
ForegroundLink=${accent}
ForegroundNegative=${neg}
ForegroundNeutral=${neutral}
ForegroundNormal=${fgNormal}
ForegroundPositive=${pos}
ForegroundVisited=${visited}

[General]
ColorScheme=Circadia${isDark ? "Dark" : "Light"}
Name=Circadia ${isDark ? "Dark" : "Light"}
shadeSortColumn=true
`;
  }

  fs.writeFileSync(path.join(outDir, "CircadiaDark.colors"), generateKdeScheme("dark", dark.ui, dark.syntax, true));
  fs.writeFileSync(path.join(outDir, "CircadiaLight.colors"), generateKdeScheme("light", light.ui, light.syntax, false));

  const readme = `# Circadia for KDE Plasma

Circadia color themes for KDE Plasma Desktop.

- **Circadia Dark** (\`CircadiaDark.colors\`): Warm Ember & Espresso
- **Circadia Light** (\`CircadiaLight.colors\`): Warm Parchment

## Installation

1. Open **System Settings → Colors & Themes → Colors**.
2. Click **Install from File...**.
3. Select \`CircadiaDark.colors\` or \`CircadiaLight.colors\`.
4. Click **Apply**.
`;
  fs.writeFileSync(path.join(outDir, "README.md"), readme);
  console.log("Built kde port");
}

// -------------------------------------------------------------
// 5. KONSOLE
// -------------------------------------------------------------
function buildKonsole() {
  const outDir = path.join(rootDir, "ports", "konsole");
  ensureDir(outDir);

  function generateKonsole(isDark) {
    const mode = isDark ? dark : light;
    const ui = mode.ui;
    const syntax = mode.syntax;
    const headings = mode.headings;

    const bg = hexToRgb(ui.bg_canvas.hex).join(",");
    const fg = hexToRgb(ui.text_primary.hex).join(",");

    const ansi = isDark
      ? [
          hexToRgb(ui.bg_element.hex).join(","),     // 0: Black
          hexToRgb(headings.h4.hex).join(","),        // 1: Red
          hexToRgb(syntax.string.hex).join(","),      // 2: Green
          hexToRgb(syntax.number.hex).join(","),      // 3: Yellow
          hexToRgb(syntax.function.hex).join(","),    // 4: Blue
          hexToRgb(syntax.keyword.hex).join(","),     // 5: Magenta
          hexToRgb(syntax.type.hex).join(","),        // 6: Cyan
          hexToRgb(ui.text_primary.hex).join(","),    // 7: White
          hexToRgb(ui.text_faint.hex).join(","),      // 8: Bright Black
          hexToRgb(headings.h3.hex).join(","),        // 9: Bright Red
          hexToRgb(syntax.string.hex).join(","),      // 10: Bright Green
          hexToRgb(headings.h1.hex).join(","),        // 11: Bright Yellow
          hexToRgb(syntax.function.hex).join(","),    // 12: Bright Blue
          hexToRgb(syntax.keyword.hex).join(","),     // 13: Bright Magenta
          hexToRgb(syntax.type.hex).join(","),        // 14: Bright Cyan
          "255,255,255"                               // 15: Bright White
        ]
      : [
          hexToRgb(ui.bg_element.hex).join(","),     // 0: Black
          hexToRgb(syntax.number.hex).join(","),      // 1: Red
          hexToRgb(syntax.string.hex).join(","),      // 2: Green
          hexToRgb(headings.h4.hex).join(","),        // 3: Yellow
          hexToRgb(syntax.function.hex).join(","),    // 4: Blue
          hexToRgb(syntax.keyword.hex).join(","),     // 5: Magenta
          hexToRgb(syntax.type.hex).join(","),        // 6: Cyan
          hexToRgb(ui.text_primary.hex).join(","),    // 7: White
          hexToRgb(ui.text_faint.hex).join(","),      // 8: Bright Black
          hexToRgb(syntax.number.hex).join(","),      // 9: Bright Red
          hexToRgb(syntax.string.hex).join(","),      // 10: Bright Green
          hexToRgb(ui.accent.hex).join(","),          // 11: Bright Yellow
          hexToRgb(headings.h3.hex).join(","),        // 12: Bright Blue
          hexToRgb(syntax.keyword.hex).join(","),     // 13: Bright Magenta
          hexToRgb(syntax.type.hex).join(","),        // 14: Bright Cyan
          hexToRgb(ui.text_primary.hex).join(",")     // 15: Bright White
        ];

    let conf = `[Background]
Color=${bg}

[BackgroundFaint]
Color=${bg}

[BackgroundIntense]
Color=${bg}

[Foreground]
Color=${fg}

[ForegroundFaint]
Color=${hexToRgb(ui.text_faint.hex).join(",")}

[ForegroundIntense]
Color=${fg}
`;

    for (let i = 0; i < 16; i++) {
      conf += `\n[Color${i}]
Color=${ansi[i]}

[Color${i}Faint]
Color=${ansi[i]}

[Color${i}Intense]
Color=${ansi[i]}
`;
    }

    conf += `\n[General]
Description=Circadia ${isDark ? "Dark" : "Light"}
Opacity=1
`;
    return conf;
  }

  fs.writeFileSync(path.join(outDir, "circadia-dark.colorscheme"), generateKonsole(true));
  fs.writeFileSync(path.join(outDir, "circadia-light.colorscheme"), generateKonsole(false));

  const readme = `# Circadia for KDE Konsole

Terminal color schemes for KDE Konsole.

- **Circadia Dark**: \`circadia-dark.colorscheme\`
- **Circadia Light**: \`circadia-light.colorscheme\`

## Installation

1. Copy the \`.colorscheme\` files to \`~/.local/share/konsole/\`.
2. Open Konsole → **Settings → Edit Current Profile → Appearance**.
3. Select **Circadia Dark** or **Circadia Light**.
`;
  fs.writeFileSync(path.join(outDir, "README.md"), readme);
  console.log("Built konsole port");
}

// -------------------------------------------------------------
// 6. SLACK
// -------------------------------------------------------------
function buildSlack() {
  const outDir = path.join(rootDir, "ports", "slack");
  ensureDir(outDir);

  const lightTheme = `${light.ui.bg_surface.hex},${light.ui.text_primary.hex},${light.ui.bg_canvas.hex},${light.ui.bg_element.hex},${light.ui.text_primary.hex},${light.syntax.string.hex},${light.ui.accent.hex},${light.ui.accent.hex},${light.ui.bg_element.hex},${light.ui.text_primary.hex}`;
  const darkTheme = `${dark.ui.bg_surface.hex},${dark.ui.text_primary.hex},${dark.ui.bg_canvas.hex},${dark.ui.bg_element.hex},${dark.ui.text_primary.hex},${dark.syntax.string.hex},${dark.ui.accent.hex},${dark.ui.accent.hex},${dark.ui.bg_element.hex},${dark.ui.text_primary.hex}`;

  const content = `# Circadia Slack Themes

Copy and paste the strings below into Slack's **Preferences → Themes → Custom Theme** input.

### ☀️ Light Mode (Warm Parchment)
\`\`\`text
${lightTheme}
\`\`\`

### 🌙 Dark Mode (Warm Ember & Espresso)
\`\`\`text
${darkTheme}
\`\`\`
`;
  fs.writeFileSync(path.join(outDir, "slack.md"), content);
  fs.writeFileSync(path.join(outDir, "README.md"), content);
  console.log("Built slack port");
}

// -------------------------------------------------------------
// 7. TAILWIND
// -------------------------------------------------------------
function buildTailwind() {
  const outDir = path.join(rootDir, "ports", "tailwind");
  ensureDir(outDir);

  const namespaced = `@import 'tailwindcss';

/* Circadia Design Tokens for Tailwind CSS v4 */
@theme {
  --color-circadia-canvas:         ${light.ui.bg_canvas.hex};
  --color-circadia-surface:        ${light.ui.bg_surface.hex};
  --color-circadia-element:        ${light.ui.bg_element.hex};
  --color-circadia-border:         ${light.ui.border.hex};
  --color-circadia-text:           ${light.ui.text_primary.hex};
  --color-circadia-muted:          ${light.ui.text_muted.hex};
  --color-circadia-faint:          ${light.ui.text_faint.hex};
  --color-circadia-accent:         ${light.ui.accent.hex};

  /* Dark mode variants */
  --color-circadia-dark-canvas:    ${dark.ui.bg_canvas.hex};
  --color-circadia-dark-surface:   ${dark.ui.bg_surface.hex};
  --color-circadia-dark-element:   ${dark.ui.bg_element.hex};
  --color-circadia-dark-border:    ${dark.ui.border.hex};
  --color-circadia-dark-text:      ${dark.ui.text_primary.hex};
  --color-circadia-dark-muted:     ${dark.ui.text_muted.hex};
  --color-circadia-dark-faint:     ${dark.ui.text_faint.hex};
  --color-circadia-dark-accent:    ${dark.ui.accent.hex};

  /* Syntax & Headings */
  --color-circadia-keyword:        ${light.syntax.keyword.hex};
  --color-circadia-type:           ${light.syntax.type.hex};
  --color-circadia-function:       ${light.syntax.function.hex};
  --color-circadia-string:         ${light.syntax.string.hex};
  --color-circadia-number:         ${light.syntax.number.hex};
  --color-circadia-comment:        ${light.syntax.comment.hex};

  --color-circadia-dark-keyword:   ${dark.syntax.keyword.hex};
  --color-circadia-dark-type:      ${dark.syntax.type.hex};
  --color-circadia-dark-function:  ${dark.syntax.function.hex};
  --color-circadia-dark-string:    ${dark.syntax.string.hex};
  --color-circadia-dark-number:    ${dark.syntax.number.hex};
  --color-circadia-dark-comment:   ${dark.syntax.comment.hex};
}
`;

  const replacement = `@import 'tailwindcss';

/* Replaces default Tailwind neutral & theme palettes with Circadia */
@theme {
  --color-background:              ${light.ui.bg_canvas.hex};
  --color-foreground:              ${light.ui.text_primary.hex};
  --color-surface:                 ${light.ui.bg_surface.hex};
  --color-element:                 ${light.ui.bg_element.hex};
  --color-border:                  ${light.ui.border.hex};
  --color-primary:                 ${light.ui.accent.hex};
}

@layer base {
  .dark {
    --color-background:            ${dark.ui.bg_canvas.hex};
    --color-foreground:            ${dark.ui.text_primary.hex};
    --color-surface:               ${dark.ui.bg_surface.hex};
    --color-element:               ${dark.ui.bg_element.hex};
    --color-border:                ${dark.ui.border.hex};
    --color-primary:               ${dark.ui.accent.hex};
  }
}
`;

  fs.writeFileSync(path.join(outDir, "namespaced.css"), namespaced);
  fs.writeFileSync(path.join(outDir, "replacement.css"), replacement);

  const readme = `# Circadia for Tailwind CSS v4

- **namespaced.css**: Use Circadia alongside default Tailwind utilities (\`bg-circadia-canvas\`, \`text-circadia-accent\`).
- **replacement.css**: Map your base app colors directly to Circadia tokens.
`;
  fs.writeFileSync(path.join(outDir, "README.md"), readme);
  console.log("Built tailwind port");
}

// -------------------------------------------------------------
// 8. TELEGRAM
// -------------------------------------------------------------
function buildTelegram() {
  const outDir = path.join(rootDir, "ports", "telegram");
  ensureDir(path.join(outDir, "circadia-dark"));
  ensureDir(path.join(outDir, "circadia-light"));

  function generateTDesktop(isDark) {
    const mode = isDark ? dark : light;
    const ui = mode.ui;
    const syntax = mode.syntax;

    return `// Circadia ${isDark ? "Dark (Warm Ember & Espresso)" : "Light (Warm Parchment)"} Telegram Theme
circadiaBg: ${ui.bg_canvas.hex};
circadiaBg2: ${ui.bg_surface.hex};
circadiaUi: ${ui.bg_element.hex};
circadiaUi2: ${ui.border.hex};
circadiaTx: ${ui.text_primary.hex};
circadiaTx2: ${ui.text_muted.hex};
circadiaTx3: ${ui.text_faint.hex};
circadiaAccent: ${ui.accent.hex};

circadiaRe: ${isDark ? "#e06c75" : "#dc2626"};
circadiaOr: ${syntax.number.hex};
circadiaYe: ${isDark ? "#f1be85" : "#ca8a04"};
circadiaGr: ${syntax.string.hex};
circadiaCy: ${syntax.type.hex};
circadiaBl: ${syntax.function.hex};
circadiaPu: ${syntax.keyword.hex};

windowBg: circadiaBg;
windowFg: circadiaTx;
windowBgOver: circadiaBg2;
windowBgRipple: circadiaUi;
windowFgOver: windowFg;
windowSubTextFg: circadiaTx2;
windowSubTextFgOver: circadiaTx;
windowBoldFg: circadiaTx;
windowBoldFgOver: circadiaTx;
windowBgActive: circadiaAccent;
windowFgActive: ${isDark ? dark.ui.bg_canvas.hex : light.ui.bg_canvas.hex};
windowActiveTextFg: circadiaAccent;
activeButtonBg: circadiaAccent;
activeButtonBgOver: circadiaAccent;
activeButtonFg: ${isDark ? dark.ui.bg_canvas.hex : light.ui.bg_canvas.hex};
activeButtonSecondaryFg: circadiaTx2;
`;
  }

  fs.writeFileSync(path.join(outDir, "circadia-dark", "colors.tdesktop-palette"), generateTDesktop(true));
  fs.writeFileSync(path.join(outDir, "circadia-light", "colors.tdesktop-palette"), generateTDesktop(false));

  const readme = `# Circadia for Telegram Desktop

- **Circadia Dark** (\`circadia-dark/colors.tdesktop-palette\`)
- **Circadia Light** (\`circadia-light/colors.tdesktop-palette\`)

## Installation

1. Open Telegram Desktop.
2. Go to **Settings → Chat Settings → Theme settings**.
3. Choose **Create new theme** or import the palette file.
`;
  fs.writeFileSync(path.join(outDir, "README.md"), readme);
  console.log("Built telegram port");
}

// -------------------------------------------------------------
// 9. VIM
// -------------------------------------------------------------
function buildVim() {
  const outDir = path.join(rootDir, "ports", "vim", "colors");
  ensureDir(outDir);

  function generateVim(isDark) {
    const mode = isDark ? dark : light;
    const ui = mode.ui;
    const syntax = mode.syntax;
    const headings = mode.headings;

    return `" Circadia ${isDark ? "Dark" : "Light"}
" Perceptually uniform, low-strain themes engineered for continuous focus.

set background=${isDark ? "dark" : "light"}
hi clear

if exists("syntax_on")
  syntax reset
endif

if has("termguicolors")
  set termguicolors
endif

let g:color_name = "circadia_${isDark ? "dark" : "light"}"

let s:bg        = "${ui.bg_canvas.hex}"
let s:bg_surf   = "${ui.bg_surface.hex}"
let s:bg_elem   = "${ui.bg_element.hex}"
let s:border    = "${ui.border.hex}"
let s:fg        = "${ui.text_primary.hex}"
let s:muted     = "${ui.text_muted.hex}"
let s:faint     = "${ui.text_faint.hex}"
let s:accent    = "${ui.accent.hex}"

let s:keyword   = "${syntax.keyword.hex}"
let s:type      = "${syntax.type.hex}"
let s:func      = "${syntax.function.hex}"
let s:string    = "${syntax.string.hex}"
let s:number    = "${syntax.number.hex}"
let s:tag       = "${syntax.tag.hex}"
let s:comment   = "${syntax.comment.hex}"

let s:h1        = "${headings.h1.hex}"
let s:h2        = "${headings.h2.hex}"
let s:h3        = "${headings.h3.hex}"
let s:h4        = "${headings.h4.hex}"

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
call s:hi("Error",         "${isDark ? "#e06c75" : "#dc2626"}", s:bg, "bold")
call s:hi("Todo",          s:accent,   s:bg_elem, "bold")
`;
  }

  fs.writeFileSync(path.join(outDir, "circadia_dark.vim"), generateVim(true));
  fs.writeFileSync(path.join(outDir, "circadia_light.vim"), generateVim(false));

  const readme = `# Circadia for Vim

Classic Vim port for Circadia.

- **Circadia Dark**: \`colors/circadia_dark.vim\`
- **Circadia Light**: \`colors/circadia_light.vim\`

## Installation

Using vim-plug:
\`\`\`vim
Plug 'tanmaymanojgandhi/circadia', { 'rtp': 'ports/vim' }
\`\`\`

Enable in \`.vimrc\`:
\`\`\`vim
set termguicolors
set background=dark  " or light
colorscheme circadia_dark
\`\`\`
`;
  fs.writeFileSync(path.join(rootDir, "ports", "vim", "README.md"), readme);
  console.log("Built vim port");
}

// -------------------------------------------------------------
// 10. VITEPRESS
// -------------------------------------------------------------
function buildVitepress() {
  const outDir = path.join(rootDir, "ports", "vitepress");
  ensureDir(outDir);

  const css = `/**
 * Circadia theme for VitePress
 */
:root {
  --vp-c-bg: ${light.ui.bg_canvas.hex};
  --vp-c-bg-alt: ${light.ui.bg_surface.hex};
  --vp-c-bg-elv: ${light.ui.bg_element.hex};
  --vp-c-bg-soft: ${light.ui.bg_element.hex};

  --vp-c-text-1: ${light.ui.text_primary.hex};
  --vp-c-text-2: ${light.ui.text_muted.hex};
  --vp-c-text-3: ${light.ui.text_faint.hex};

  --vp-c-border: ${light.ui.border.hex};
  --vp-c-divider: ${light.ui.border.hex};
  --vp-c-gutter: ${light.ui.border.hex};

  --vp-c-brand-1: ${light.ui.accent.hex};
  --vp-c-brand-2: ${light.syntax.function.hex};
  --vp-c-brand-3: ${light.headings.h1.hex};
  --vp-c-brand-soft: ${light.ui.bg_element.hex};

  --vp-code-block-bg: ${light.ui.bg_surface.hex};
  --vp-code-line-highlight-color: ${light.ui.bg_element.hex};
}

.dark {
  --vp-c-bg: ${dark.ui.bg_canvas.hex};
  --vp-c-bg-alt: ${dark.ui.bg_surface.hex};
  --vp-c-bg-elv: ${dark.ui.bg_element.hex};
  --vp-c-bg-soft: ${dark.ui.bg_element.hex};

  --vp-c-text-1: ${dark.ui.text_primary.hex};
  --vp-c-text-2: ${dark.ui.text_muted.hex};
  --vp-c-text-3: ${dark.ui.text_faint.hex};

  --vp-c-border: ${dark.ui.border.hex};
  --vp-c-divider: ${dark.ui.border.hex};
  --vp-c-gutter: ${dark.ui.border.hex};

  --vp-c-brand-1: ${dark.ui.accent.hex};
  --vp-c-brand-2: ${dark.headings.h2.hex};
  --vp-c-brand-3: ${dark.headings.h1.hex};
  --vp-c-brand-soft: ${dark.ui.bg_element.hex};

  --vp-code-block-bg: ${dark.ui.bg_surface.hex};
  --vp-code-line-highlight-color: ${dark.ui.bg_element.hex};
}
`;

  fs.writeFileSync(path.join(outDir, "index.css"), css);

  const readme = `# Circadia for VitePress

CSS Theme variables for VitePress documentation sites.

## Installation

Import in \`.vitepress/theme/index.ts\`:

\`\`\`ts
import DefaultTheme from 'vitepress/theme';
import 'circadia/ports/vitepress/index.css';

export default {
  extends: DefaultTheme
};
\`\`\`
`;
  fs.writeFileSync(path.join(outDir, "README.md"), readme);
  console.log("Built vitepress port");
}

// -------------------------------------------------------------
// 11. XCODE
// -------------------------------------------------------------
function buildXcode() {
  const outDir = path.join(rootDir, "ports", "xcode");
  ensureDir(outDir);

  function generateXcode(isDark) {
    const mode = isDark ? dark : light;
    const ui = mode.ui;
    const syntax = mode.syntax;
    const headings = mode.headings;

    function norm(hex, alpha = 1) {
      const [r, g, b] = hexToRgbNormalized(hex);
      return `${r} ${g} ${b} ${alpha}`;
    }

    return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>DVTConsoleTextBackgroundColor</key>
	<string>${norm(ui.bg_canvas.hex)}</string>
	<key>DVTConsoleTextInsertionPointColor</key>
	<string>${norm(ui.accent.hex)}</string>
	<key>DVTConsoleTextSelectionColor</key>
	<string>${norm(ui.bg_element.hex)}</string>
	<key>DVTMarkupTextLinkColor</key>
	<string>${norm(ui.accent.hex)}</string>
	<key>DVTMarkupTextNormalColor</key>
	<string>${norm(ui.text_primary.hex)}</string>
	<key>DVTMarkupTextPrimaryHeadingColor</key>
	<string>${norm(headings.h1.hex)}</string>
	<key>DVTMarkupTextSecondaryHeadingColor</key>
	<string>${norm(headings.h2.hex)}</string>
	<key>DVTSourceTextBackground</key>
	<string>${norm(ui.bg_canvas.hex)}</string>
	<key>DVTSourceTextBlockDimColor</key>
	<string>${norm(ui.text_faint.hex)}</string>
	<key>DVTSourceTextInsertionPointColor</key>
	<string>${norm(ui.accent.hex)}</string>
	<key>DVTSourceTextInvisiblesColor</key>
	<string>${norm(ui.border.hex)}</string>
	<key>DVTSourceTextSelectionColor</key>
	<string>${norm(ui.bg_element.hex)}</string>
	<key>DVTSourceTextSyntaxColors</key>
	<dict>
		<key>xcode.syntax.attribute</key>
		<string>${norm(syntax.tag.hex)}</string>
		<key>xcode.syntax.character</key>
		<string>${norm(syntax.string.hex)}</string>
		<key>xcode.syntax.comment</key>
		<string>${norm(syntax.comment.hex)}</string>
		<key>xcode.syntax.comment.doc</key>
		<string>${norm(syntax.comment.hex)}</string>
		<key>xcode.syntax.identifier.class</key>
		<string>${norm(syntax.type.hex)}</string>
		<key>xcode.syntax.identifier.class.system</key>
		<string>${norm(syntax.type.hex)}</string>
		<key>xcode.syntax.identifier.function</key>
		<string>${norm(syntax.function.hex)}</string>
		<key>xcode.syntax.identifier.function.system</key>
		<string>${norm(syntax.function.hex)}</string>
		<key>xcode.syntax.identifier.type</key>
		<string>${norm(syntax.type.hex)}</string>
		<key>xcode.syntax.identifier.type.system</key>
		<string>${norm(syntax.type.hex)}</string>
		<key>xcode.syntax.identifier.variable</key>
		<string>${norm(ui.text_primary.hex)}</string>
		<key>xcode.syntax.identifier.variable.system</key>
		<string>${norm(ui.text_primary.hex)}</string>
		<key>xcode.syntax.keyword</key>
		<string>${norm(syntax.keyword.hex)}</string>
		<key>xcode.syntax.number</key>
		<string>${norm(syntax.number.hex)}</string>
		<key>xcode.syntax.plain</key>
		<string>${norm(ui.text_primary.hex)}</string>
		<key>xcode.syntax.string</key>
		<string>${norm(syntax.string.hex)}</string>
		<key>xcode.syntax.url</key>
		<string>${norm(ui.accent.hex)}</string>
	</dict>
</dict>
</plist>`;
  }

  fs.writeFileSync(path.join(outDir, "Circadia Dark.xccolortheme"), generateXcode(true));
  fs.writeFileSync(path.join(outDir, "Circadia Light.xccolortheme"), generateXcode(false));

  const readme = `# Circadia for Xcode

Circadia themes for Apple Xcode IDE.

- **Circadia Dark**: \`Circadia Dark.xccolortheme\`
- **Circadia Light**: \`Circadia Light.xccolortheme\`

## Installation

1. Copy both \`.xccolortheme\` files to:
   \`~/Library/Developer/Xcode/UserData/FontAndColorThemes/\`
2. Restart Xcode.
3. Go to **Settings → Themes** and choose **Circadia Dark** or **Circadia Light**.
`;
  fs.writeFileSync(path.join(outDir, "README.md"), readme);
  console.log("Built xcode port");
}

// -------------------------------------------------------------
// 12. ZED
// -------------------------------------------------------------
function buildZed() {
  const outDir = path.join(rootDir, "ports", "zed");
  ensureDir(path.join(outDir, "themes"));

  const extToml = `id = "circadia"
name = "Circadia"
version = "1.0.0"
schema_version = 1
authors = ["Tanmay <https://github.com/tanmaymanojgandhi>"]
description = "Perceptually uniform, low-strain themes engineered for continuous focus."
repository = "https://github.com/tanmaymanojgandhi/circadia"
`;

  function zedTheme(modeName, ui, syntax, headings, isDark) {
    return {
      name: `Circadia ${isDark ? "Dark" : "Light"}`,
      appearance: isDark ? "dark" : "light",
      style: {
        border: ui.border.hex,
        "border.variant": ui.border.hex,
        "border.focused": ui.accent.hex,
        "border.selected": ui.accent.hex,
        "border.transparent": "#00000000",
        "border.disabled": ui.border.hex,
        "elevated_surface.background": ui.bg_surface.hex,
        "surface.background": ui.bg_surface.hex,
        background: ui.bg_canvas.hex,
        "element.background": ui.bg_surface.hex,
        "element.hover": ui.bg_element.hex,
        "element.active": ui.bg_element.hex,
        "element.selected": ui.bg_element.hex,
        "element.disabled": ui.bg_surface.hex,
        "drop_target.background": ui.bg_element.hex,
        "ghost_element.background": "#00000000",
        "ghost_element.hover": ui.bg_element.hex,
        "ghost_element.active": ui.bg_element.hex,
        "ghost_element.selected": ui.bg_element.hex,
        "ghost_element.disabled": ui.bg_surface.hex,
        text: ui.text_primary.hex,
        "text.muted": ui.text_muted.hex,
        "text.placeholder": ui.text_faint.hex,
        "text.disabled": ui.text_faint.hex,
        "text.accent": ui.accent.hex,
        icon: ui.text_primary.hex,
        "icon.muted": ui.text_muted.hex,
        "icon.disabled": ui.text_faint.hex,
        "icon.placeholder": ui.text_muted.hex,
        "icon.accent": ui.accent.hex,
        "status_bar.background": ui.bg_surface.hex,
        "title_bar.background": ui.bg_surface.hex,
        "toolbar.background": ui.bg_canvas.hex,
        "tab_bar.background": ui.bg_surface.hex,
        "tab.inactive_background": ui.bg_surface.hex,
        "tab.active_background": ui.bg_canvas.hex,
        "search.match_background": ui.bg_element.hex,
        "panel.background": ui.bg_surface.hex,
        "panel.focused_border": ui.accent.hex,
        "pane.focused_border": ui.accent.hex,
        "scrollbar.thumb.background": isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(40, 50, 58, 0.15)",
        "scrollbar.thumb.hover_background": isDark ? "rgba(255, 255, 255, 0.22)" : "rgba(40, 50, 58, 0.28)",
        "scrollbar.thumb.border": ui.border.hex,
        "scrollbar.track.background": "#00000000",
        "scrollbar.track.border": ui.border.hex,
        "editor.foreground": ui.text_primary.hex,
        "editor.background": ui.bg_canvas.hex,
        "editor.gutter.background": ui.bg_canvas.hex,
        "editor.subheader.background": ui.bg_surface.hex,
        "editor.active_line.background": ui.bg_surface.hex,
        "editor.highlighted_line.background": ui.bg_surface.hex,
        "editor.line_number": ui.text_faint.hex,
        "editor.active_line_number": ui.accent.hex,
        "editor.invisible": ui.border.hex,
        "editor.wrap_guide": ui.border.hex,
        "editor.active_wrap_guide": ui.text_faint.hex,
        "editor.document_highlight.read_background": ui.bg_element.hex,
        "editor.document_highlight.write_background": ui.bg_element.hex,
        "terminal.background": ui.bg_canvas.hex,
        "terminal.foreground": ui.text_primary.hex,
        "terminal.ansi.black": ui.bg_element.hex,
        "terminal.ansi.red": isDark ? headings.h4.hex : syntax.number.hex,
        "terminal.ansi.green": syntax.string.hex,
        "terminal.ansi.yellow": isDark ? syntax.number.hex : headings.h4.hex,
        "terminal.ansi.blue": syntax.function.hex,
        "terminal.ansi.magenta": syntax.keyword.hex,
        "terminal.ansi.cyan": syntax.type.hex,
        "terminal.ansi.white": ui.text_primary.hex,
        "terminal.ansi.bright_black": ui.text_faint.hex,
        "terminal.ansi.bright_red": isDark ? headings.h3.hex : syntax.number.hex,
        "terminal.ansi.bright_green": syntax.string.hex,
        "terminal.ansi.bright_yellow": isDark ? headings.h1.hex : ui.accent.hex,
        "terminal.ansi.bright_blue": isDark ? syntax.function.hex : headings.h3.hex,
        "terminal.ansi.bright_magenta": syntax.keyword.hex,
        "terminal.ansi.bright_cyan": syntax.type.hex,
        "terminal.ansi.bright_white": isDark ? "#ffffff" : ui.text_primary.hex,
        syntax: {
          comment: { color: syntax.comment.hex, font_style: "italic" },
          keyword: { color: syntax.keyword.hex, font_weight: 700 },
          "type.builtin": { color: syntax.type.hex },
          type: { color: syntax.type.hex },
          function: { color: syntax.function.hex },
          "function.method": { color: syntax.function.hex },
          string: { color: syntax.string.hex },
          "string.regex": { color: syntax.string.hex },
          "string.escape": { color: syntax.type.hex },
          number: { color: syntax.number.hex },
          boolean: { color: syntax.number.hex },
          tag: { color: syntax.tag.hex },
          operator: { color: ui.text_muted.hex },
          property: { color: syntax.type.hex },
          variable: { color: ui.text_primary.hex },
          "variable.special": { color: syntax.type.hex },
          title: { color: headings.h1.hex, font_weight: 700 },
          emphasis: { color: ui.text_primary.hex, font_style: "italic" },
          "emphasis.strong": { color: ui.text_primary.hex, font_weight: 700 },
          link_uri: { color: ui.accent.hex, underline: true },
          link_text: { color: ui.accent.hex }
        }
      }
    };
  }

  const zedJson = {
    $schema: "https://zed.dev/schema/themes/v0.2.0.json",
    name: "Circadia",
    author: "Tanmay",
    themes: [
      zedTheme("Circadia — Warm Ember & Espresso (Dark Classic)", dark.ui, dark.syntax, dark.headings, true),
      zedTheme("Circadia — Warm Parchment (Light)", light.ui, light.syntax, light.headings, false),
      zedTheme("Circadia — Plum Noir (Dark Modern)", plum.ui, plum.syntax, plum.headings, true),
      zedTheme("Circadia — Obsidian Pine (Dark Focus)", forest.ui, forest.syntax, forest.headings, true)
    ]
  };

  fs.writeFileSync(path.join(outDir, "extension.toml"), extToml);
  fs.writeFileSync(path.join(outDir, "themes", "circadia.json"), JSON.stringify(zedJson, null, 2));

  const readme = `# Circadia for Zed Editor

Official Circadia theme extension for Zed Editor.

- **Circadia — Warm Parchment (Light)**
- **Circadia — Warm Ember & Espresso (Dark Classic)**
- **Circadia — Plum Noir (Dark Modern)**
- **Circadia — Obsidian Pine (Dark Focus)**

## Installation

1. Open Zed.
2. Open the command palette (\`Cmd+Shift+P\` / \`Ctrl+Shift+P\`) and run **zed: extensions**.
3. Search for **Circadia** and click **Install**.
4. Open the theme switcher (\`Cmd+K Cmd+T\` / \`Ctrl+K Ctrl+T\`) and select your desired Circadia flavour.
`;
  fs.writeFileSync(path.join(outDir, "README.md"), readme);
  console.log("Built zed port");
}

// -------------------------------------------------------------
// 13. TMUX
// -------------------------------------------------------------
function buildTmux() {
  const outDir = path.join(rootDir, "ports", "tmux");
  ensureDir(outDir);

  function generateTmuxConfig(modeKey, mode) {
    const ui = mode.ui;
    return [
      `# Circadia — ${mode.name}`,
      `# Theme configuration for tmux (100% Strict WCAG AAA)`,
      ``,
      `# Status bar`,
      `set -g status-style "bg=${ui.bg_surface.hex},fg=${ui.text_primary.hex}"`,
      `set -g status-left-length 40`,
      `set -g status-right-length 80`,
      `set -g status-left "#[bg=${ui.accent.hex},fg=${ui.bg_canvas.hex},bold] #S #[bg=${ui.bg_surface.hex},fg=${ui.accent.hex}] "`,
      `set -g status-right "#[bg=${ui.bg_element.hex},fg=${ui.text_muted.hex}] %Y-%m-%d #[fg=${ui.text_faint.hex}]|#[fg=${ui.text_primary.hex},bold] %H:%M #[bg=${ui.accent.hex},fg=${ui.bg_canvas.hex},bold] #h "`,
      ``,
      `# Window status`,
      `set -g window-status-format "#[bg=${ui.bg_surface.hex},fg=${ui.text_muted.hex}]  #I:#W  "`,
      `set -g window-status-current-format "#[bg=${ui.bg_element.hex},fg=${ui.accent.hex},bold]  #I:#W  "`,
      `set -g window-status-separator ""`,
      ``,
      `# Panes`,
      `set -g pane-border-style "fg=${ui.border.hex}"`,
      `set -g pane-active-border-style "fg=${ui.accent.hex}"`,
      ``,
      `# Messages / Command prompt`,
      `set -g message-style "bg=${ui.bg_element.hex},fg=${ui.text_primary.hex},bold"`,
      `set -g message-command-style "bg=${ui.bg_element.hex},fg=${ui.text_primary.hex}"`,
      ``,
      `# Mode / Copy mode selection`,
      `set -g mode-style "bg=${ui.bg_element.hex},fg=${ui.accent.hex},bold"`,
      ``,
      `# Clock mode`,
      `set -g clock-mode-colour "${ui.accent.hex}"`,
      ``
    ].join("\n");
  }

  for (const [modeKey, mode] of Object.entries(spec.modes)) {
    const filename = `circadia-${modeKey.replace(/_/g, "-")}.tmux`;
    fs.writeFileSync(path.join(outDir, filename), generateTmuxConfig(modeKey, mode));
  }

  fs.copyFileSync(path.join(outDir, "circadia-light-parchment.tmux"), path.join(outDir, "circadia-light.tmux"));
  fs.copyFileSync(path.join(outDir, "circadia-dark-ember.tmux"), path.join(outDir, "circadia-dark.tmux"));

  const tpmEntry = `#!/usr/bin/env bash
# Circadia tmux TPM plugin entrypoint
CURRENT_DIR="$( cd "$( dirname "\${BASH_SOURCE[0]}" )" && pwd )"

FLAVOUR=$(tmux show-option -gqv "@circadia_flavour")
if [ -z "$FLAVOUR" ]; then
  FLAVOUR=$(tmux show-option -gqv "@circadia_mode")
fi
if [ -z "$FLAVOUR" ]; then
  FLAVOUR="dark-ember"
fi

FLAVOUR_CLEAN=$(echo "$FLAVOUR" | tr "_" "-")

if [ -f "$CURRENT_DIR/circadia-$FLAVOUR_CLEAN.tmux" ]; then
  tmux source-file "$CURRENT_DIR/circadia-$FLAVOUR_CLEAN.tmux"
else
  tmux source-file "$CURRENT_DIR/circadia-dark-ember.tmux"
fi
`;
  fs.writeFileSync(path.join(outDir, "circadia.tmux"), tpmEntry);

  const tmuxReadme = `# Circadia for tmux

Circadian-aligned status bar and pane styling engineered in OKLCH for tmux.

## Available Flavours

* **\`light-parchment\`**: ☀️ Warm Parchment (Daylight Reading, \`#f7f2e6\`)
* **\`dark-ember\`**: ☕ Dark Classic — Warm Ember & Espresso (\`#17130f\`)
* **\`dark-plum\`**: 🍇 Dark Modern — Plum Noir (\`#140e12\`)
* **\`dark-forest\`**: 🌲 Dark Focus — Obsidian Pine (\`#131714\`)

---

## Installation via TPM (Tmux Plugin Manager)

1. Add the plugin to your \`~/.tmux.conf\`:
   \`\`\`tmux
   set -g @plugin 'tanmaymanojgandhi/circadia'
   set -g @circadia_flavour 'dark-ember' # Options: light-parchment, dark-ember, dark-plum, dark-forest
   \`\`\`
2. Press \`prefix + I\` to install the plugin and refresh your tmux session.

---

## Manual Installation

Source your chosen flavour directly in your \`~/.tmux.conf\`:

\`\`\`tmux
# Example: Dark Classic (Warm Ember & Espresso)
source-file "/path/to/circadia/ports/tmux/circadia-dark-ember.tmux"

# Or Dark Modern (Plum Noir)
# source-file "/path/to/circadia/ports/tmux/circadia-dark-plum.tmux"

# Or Dark Focus (Obsidian Pine)
# source-file "/path/to/circadia/ports/tmux/circadia-dark-forest.tmux"

# Or Warm Parchment (Light)
# source-file "/path/to/circadia/ports/tmux/circadia-light-parchment.tmux"
\`\`\`
`;
  fs.writeFileSync(path.join(outDir, "README.md"), tmuxReadme);
  console.log("Built tmux port");
}

// -------------------------------------------------------------
// EXECUTE ALL
// -------------------------------------------------------------
console.log("=== Building All Circadia Ports ===");
buildChrome();
buildIntellij();
buildIterm2();
buildKde();
buildKonsole();
buildSlack();
buildTailwind();
buildTelegram();
buildVim();
buildVitepress();
buildXcode();
buildZed();
buildTmux();
console.log("All 13 ports built successfully!");
