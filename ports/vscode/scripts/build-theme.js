#!/usr/bin/env node
/**
 * Generates VS Code theme JSON files from spec/palette.json
 */
const fs = require("fs");
const path = require("path");

const specPath = path.join(__dirname, "..", "..", "..", "spec", "palette.json");
const spec = JSON.parse(fs.readFileSync(specPath, "utf-8"));

function buildTheme(modeKey, mode) {
  const ui = mode.ui;
  const syntax = mode.syntax;
  const headings = mode.headings;
  const isDark = mode.type === "dark" || modeKey === "dark";

  return {
    name: `Circadia — ${mode.name}`,
    type: isDark ? "dark" : "light",
    colors: {
      "editor.background": ui.bg_canvas.hex,
      "editor.foreground": ui.text_primary.hex,
      "editorLineNumber.foreground": ui.text_faint.hex,
      "editorLineNumber.activeForeground": ui.accent.hex,
      "editorCursor.foreground": ui.accent.hex,
      "editor.selectionBackground": ui.bg_element.hex,
      "editor.selectionHighlightBackground": isDark ? `${ui.bg_element.hex}99` : `${ui.bg_element.hex}aa`,
      "editor.wordHighlightBackground": isDark ? `${ui.bg_element.hex}66` : `${ui.bg_element.hex}77`,
      "editor.wordHighlightStrongBackground": isDark ? `${ui.bg_element.hex}88` : `${ui.bg_element.hex}99`,
      "sideBar.background": ui.bg_surface.hex,
      "sideBar.foreground": ui.text_muted.hex,
      "sideBar.border": ui.border.hex,
      "activityBar.background": ui.bg_surface.hex,
      "activityBar.foreground": ui.text_primary.hex,
      "activityBarBadge.background": ui.accent.hex,
      "activityBarBadge.foreground": ui.bg_canvas.hex,
      "tab.activeBackground": ui.bg_canvas.hex,
      "tab.inactiveBackground": ui.bg_surface.hex,
      "tab.activeBorder": ui.accent.hex,
      "tab.unfocusedActiveBorder": isDark ? `${ui.accent.hex}80` : `${ui.accent.hex}80`,
      "editorGroupHeader.tabsBackground": ui.bg_surface.hex,
      "panel.background": ui.bg_surface.hex,
      "panel.border": ui.border.hex,
      "editorWidget.background": ui.bg_surface.hex,
      "input.background": ui.bg_element.hex,
      "input.foreground": ui.text_primary.hex,
      "input.border": ui.border.hex,
      "focusBorder": ui.accent.hex,
      "textLink.foreground": ui.accent.hex,
      "progressBar.background": ui.accent.hex,
      "scrollbarSlider.activeBackground": isDark ? `${ui.accent.hex}66` : `${ui.accent.hex}55`,
      "editorIndentGuide.background": ui.border.hex,
      "editorIndentGuide.activeBackground": ui.text_faint.hex,
      "editorBracketMatch.border": ui.accent.hex,
      "editorBracketMatch.background": "#00000000",
      "statusBar.background": ui.bg_surface.hex,
      "statusBar.foreground": ui.text_muted.hex,
      "statusBarItem.remoteBackground": ui.accent.hex,
      "statusBarItem.remoteForeground": ui.bg_canvas.hex,
      "list.highlightForeground": ui.accent.hex,
      "list.activeSelectionBackground": ui.bg_element.hex,
      "list.inactiveSelectionBackground": ui.bg_surface.hex,
      "editorSuggestWidget.selectedBackground": ui.bg_element.hex,
      "editorSuggestWidget.highlightForeground": ui.accent.hex,
      "quickInputList.focusBackground": ui.bg_element.hex,
      "peekViewResult.selectionBackground": ui.bg_element.hex,
      "titleBar.activeBackground": ui.bg_surface.hex,
      "titleBar.activeForeground": ui.text_primary.hex
    },
    tokenColors: [
      {
        scope: ["comment", "punctuation.definition.comment"],
        settings: { foreground: syntax.comment.hex, fontStyle: "italic" }
      },
      {
        scope: [
          "keyword",
          "keyword.control",
          "storage.type",
          "storage.modifier",
          "keyword.operator.new",
          "keyword.operator.expression",
          "keyword.declaration"
        ],
        settings: { foreground: syntax.keyword.hex, fontStyle: "bold" }
      },
      {
        scope: [
          "entity.name.type",
          "entity.name.class",
          "entity.other.inherited-class",
          "support.class",
          "support.type"
        ],
        settings: { foreground: syntax.type.hex }
      },
      {
        scope: [
          "entity.name.function",
          "support.function"
        ],
        settings: { foreground: syntax.function.hex }
      },
      {
        scope: [
          "variable.other.property",
          "entity.name.variable.property",
          "variable.other.object.property",
          "meta.object-literal.key",
          "support.type.property-name",
          "entity.name.tag.yaml"
        ],
        settings: { foreground: (syntax.property && syntax.property.hex) || syntax.function.hex }
      },
      {
        scope: [
          "variable",
          "variable.other",
          "variable.parameter"
        ],
        settings: { foreground: (syntax.variable && syntax.variable.hex) || ui.text_primary.hex }
      },
      {
        scope: ["string", "string.quoted"],
        settings: { foreground: syntax.string.hex }
      },
      {
        scope: ["constant.numeric", "constant.language"],
        settings: { foreground: syntax.number.hex }
      },
      {
        scope: ["entity.name.tag"],
        settings: { foreground: syntax.tag.hex }
      },
      {
        scope: ["markup.heading.1"],
        settings: { foreground: headings.h1.hex, fontStyle: "bold" }
      },
      {
        scope: ["markup.heading.2"],
        settings: { foreground: headings.h2.hex, fontStyle: "bold" }
      },
      {
        scope: ["markup.heading.3"],
        settings: { foreground: headings.h3.hex, fontStyle: "bold" }
      },
      {
        scope: ["markup.heading.4"],
        settings: { foreground: headings.h4.hex }
      },
      {
        scope: ["markup.heading.5"],
        settings: { foreground: headings.h5.hex }
      },
      {
        scope: ["markup.heading.6"],
        settings: { foreground: headings.h6.hex }
      }
    ]
  };
}

const outDir = path.join(__dirname, "..", "themes");
fs.mkdirSync(outDir, { recursive: true });

for (const [modeKey, mode] of Object.entries(spec.modes)) {
  const themeJson = buildTheme(modeKey, mode);
  const outPath = path.join(outDir, `circadia-${modeKey}.json`);
  fs.writeFileSync(outPath, JSON.stringify(themeJson, null, 2), "utf-8");
  console.log(`Generated ${outPath}`);

  if (modeKey === "light_parchment") {
    fs.writeFileSync(path.join(outDir, "circadia-light.json"), JSON.stringify(themeJson, null, 2), "utf-8");
  }
  if (modeKey === "dark_ember") {
    fs.writeFileSync(path.join(outDir, "circadia-dark.json"), JSON.stringify(themeJson, null, 2), "utf-8");
  }
}
