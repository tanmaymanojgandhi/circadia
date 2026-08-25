#!/usr/bin/env node
/**
 * Generates VS Code theme JSON files from spec/palette.json
 * Configured with full Dark Modern workbench UI parity.
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
  const destructiveColor = isDark ? "#e06c75" : "#dc2626";
  const successColor = syntax.string.hex;
  const warningColor = syntax.number.hex;
  const badgeForeground = isDark ? ui.bg_canvas.hex : "#ffffff";
  const buttonForeground = isDark ? ui.bg_canvas.hex : "#ffffff";

  return {
    "$schema": "vscode://schemas/color-theme",
    name: `Circadia — ${mode.name}`,
    type: isDark ? "dark" : "light",
    colors: {
      // Base & Typography
      "focusBorder": ui.accent.hex,
      "foreground": ui.text_primary.hex,
      "descriptionForeground": ui.text_muted.hex,
      "errorForeground": destructiveColor,
      "icon.foreground": ui.text_muted.hex,
      "selection.background": isDark ? `${ui.accent.hex}48` : `${ui.accent.hex}38`,
      "widget.border": ui.border.hex,
      "progressBar.background": ui.accent.hex,
      "textLink.foreground": ui.accent.hex,
      "textLink.activeForeground": ui.accent.hex,
      "textBlockQuote.background": ui.bg_surface.hex,
      "textBlockQuote.border": ui.border.hex,
      "textCodeBlock.background": ui.bg_surface.hex,
      "textPreformat.foreground": ui.text_primary.hex,
      "textPreformat.background": ui.bg_element.hex,
      "textSeparator.foreground": ui.border.hex,

      // Activity Bar & Modern Activity Bar
      "activityBar.background": ui.bg_surface.hex,
      "activityBar.foreground": ui.text_primary.hex,
      "activityBar.inactiveForeground": ui.text_faint.hex,
      "activityBar.border": ui.border.hex,
      "activityBar.activeBorder": ui.accent.hex,
      "activityBar.activeFocusBorder": ui.accent.hex,
      "activityBarBadge.background": ui.accent.hex,
      "activityBarBadge.foreground": badgeForeground,
      "modernActivityBar.activeBackground": `${ui.bg_element.hex}99`,
      "modernActivityBar.hoverBackground": `${ui.bg_element.hex}44`,

      // Side Bar & Explorer
      "sideBar.background": ui.bg_surface.hex,
      "sideBar.foreground": ui.text_muted.hex,
      "sideBar.border": ui.border.hex,
      "sideBarTitle.foreground": ui.text_primary.hex,
      "sideBarSectionHeader.background": ui.bg_surface.hex,
      "sideBarSectionHeader.foreground": ui.text_primary.hex,
      "sideBarSectionHeader.border": ui.border.hex,
      "tree.indentGuidesStroke": ui.border.hex,
      "tree.tableColumnsBorder": ui.border.hex,

      // Lists & Trees (Active/Inactive selections, Hover, Focus)
      "list.activeSelectionBackground": isDark ? `${ui.accent.hex}38` : `${ui.accent.hex}22`,
      "list.activeSelectionForeground": isDark ? "#ffffff" : ui.text_primary.hex,
      "list.activeSelectionIconForeground": ui.accent.hex,
      "list.inactiveSelectionBackground": isDark ? ui.border.hex : ui.bg_element.hex,
      "list.inactiveSelectionForeground": isDark ? "#ffffff" : ui.text_primary.hex,
      "list.focusBackground": isDark ? `${ui.accent.hex}38` : `${ui.accent.hex}22`,
      "list.focusForeground": isDark ? "#ffffff" : ui.text_primary.hex,
      "list.inactiveFocusBackground": isDark ? ui.border.hex : ui.bg_element.hex,
      "list.hoverBackground": isDark ? `${ui.border.hex}aa` : `${ui.bg_element.hex}99`,
      "list.hoverForeground": isDark ? "#ffffff" : ui.text_primary.hex,
      "list.focusOutline": ui.accent.hex,
      "list.focusHighlightForeground": ui.accent.hex,
      "list.highlightForeground": ui.accent.hex,
      "list.deemphasizedForeground": ui.text_faint.hex,
      "list.dropBackground": `${ui.accent.hex}33`,

      // Tabs & Editor Groups (Dark Modern Top Accent Strip & Distinct Elevation)
      "editorGroup.border": ui.border.hex,
      "editorGroupHeader.tabsBackground": ui.bg_surface.hex,
      "editorGroupHeader.tabsBorder": ui.border.hex,
      "editorGroupHeader.noTabsBackground": ui.bg_canvas.hex,
      "tab.activeBackground": ui.bg_canvas.hex,
      "tab.activeForeground": isDark ? "#ffffff" : ui.text_primary.hex,
      "tab.activeBorder": "#00000000",
      "tab.activeBorderTop": ui.accent.hex,
      "tab.selectedBorderTop": ui.accent.hex,
      "tab.inactiveBackground": ui.bg_surface.hex,
      "tab.inactiveForeground": ui.text_faint.hex,
      "tab.border": ui.border.hex,
      "tab.hoverBackground": isDark ? `${ui.bg_canvas.hex}ee` : `${ui.bg_element.hex}80`,
      "tab.hoverForeground": isDark ? "#ffffff" : ui.text_primary.hex,
      "tab.unfocusedActiveBackground": ui.bg_canvas.hex,
      "tab.unfocusedActiveForeground": isDark ? "#ffffff" : ui.text_primary.hex,
      "tab.unfocusedActiveBorder": "#00000000",
      "tab.unfocusedActiveBorderTop": `${ui.accent.hex}b3`,
      "tab.unfocusedHoverBackground": `${ui.bg_canvas.hex}80`,
      "tab.unfocusedInactiveForeground": ui.text_faint.hex,

      // Breadcrumbs
      "breadcrumb.background": ui.bg_canvas.hex,
      "breadcrumb.foreground": ui.text_muted.hex,
      "breadcrumb.focusForeground": ui.text_primary.hex,
      "breadcrumb.activeSelectionForeground": ui.accent.hex,
      "breadcrumbPicker.background": ui.bg_surface.hex,

      // Editor Canvas
      "editor.background": ui.bg_canvas.hex,
      "editor.foreground": ui.text_primary.hex,
      "editorLineNumber.foreground": ui.text_faint.hex,
      "editorLineNumber.activeForeground": ui.accent.hex,
      "editorCursor.foreground": ui.accent.hex,
      "editor.selectionBackground": isDark ? `${ui.accent.hex}40` : `${ui.accent.hex}30`,
      "editor.selectionHighlightBackground": isDark ? `${ui.accent.hex}26` : `${ui.accent.hex}1e`,
      "editor.wordHighlightBackground": isDark ? `${ui.accent.hex}30` : `${ui.accent.hex}22`,
      "editor.wordHighlightStrongBackground": isDark ? `${ui.accent.hex}44` : `${ui.accent.hex}33`,
      "editor.findMatchBackground": `${ui.accent.hex}66`,
      "editor.findMatchHighlightBackground": `${ui.accent.hex}33`,
      "editor.lineHighlightBackground": `${ui.bg_element.hex}33`,
      "editor.lineHighlightBorder": "#00000000",
      "editorWidget.background": ui.bg_surface.hex,
      "editorWidget.border": ui.border.hex,
      "editorSuggestWidget.background": ui.bg_surface.hex,
      "editorSuggestWidget.border": ui.border.hex,
      "editorSuggestWidget.foreground": ui.text_primary.hex,
      "editorSuggestWidget.selectedBackground": isDark ? `${ui.accent.hex}38` : `${ui.accent.hex}22`,
      "editorSuggestWidget.highlightForeground": ui.accent.hex,
      "editorIndentGuide.background": ui.border.hex,
      "editorIndentGuide.activeBackground": ui.text_faint.hex,
      "editorBracketMatch.border": ui.accent.hex,
      "editorBracketMatch.background": "#00000000",
      "editorOverviewRuler.border": ui.border.hex,
      "editorGutter.addedBackground": successColor,
      "editorGutter.modifiedBackground": warningColor,
      "editorGutter.deletedBackground": destructiveColor,

      // Inputs, Dropdowns, Checkboxes
      "input.background": ui.bg_element.hex,
      "input.foreground": ui.text_primary.hex,
      "input.border": ui.border.hex,
      "input.placeholderForeground": ui.text_faint.hex,
      "input.selectionBackground": isDark ? `${ui.accent.hex}48` : `${ui.accent.hex}38`,
      "inputOption.activeBackground": `${ui.accent.hex}44`,
      "inputOption.activeBorder": ui.accent.hex,
      "inputOption.activeForeground": ui.text_primary.hex,
      "dropdown.background": ui.bg_element.hex,
      "dropdown.foreground": ui.text_primary.hex,
      "dropdown.border": ui.border.hex,
      "dropdown.listBackground": ui.bg_surface.hex,
      "checkbox.background": ui.bg_element.hex,
      "checkbox.border": ui.border.hex,
      "checkbox.foreground": ui.text_primary.hex,
      "keybindingLabel.foreground": ui.text_primary.hex,

      // Buttons
      "button.background": ui.accent.hex,
      "button.foreground": buttonForeground,
      "button.hoverBackground": `${ui.accent.hex}dd`,
      "button.secondaryBackground": ui.bg_element.hex,
      "button.secondaryForeground": ui.text_primary.hex,
      "button.secondaryHoverBackground": ui.bg_surface.hex,

      // Badges
      "badge.background": ui.bg_element.hex,
      "badge.foreground": ui.text_primary.hex,

      // Panels (Terminal, Output, Debug, Problems)
      "panel.background": ui.bg_surface.hex,
      "panel.border": ui.border.hex,
      "panelInput.border": ui.border.hex,
      "panelTitle.activeForeground": ui.text_primary.hex,
      "panelTitle.activeBorder": ui.accent.hex,
      "panelTitle.inactiveForeground": ui.text_muted.hex,
      "panelSectionHeader.background": ui.bg_surface.hex,
      "panelSectionHeader.border": ui.border.hex,
      "panelSectionHeader.foreground": ui.text_primary.hex,

      // Terminal
      "terminal.foreground": ui.text_primary.hex,
      "terminal.selectionBackground": isDark ? `${ui.accent.hex}48` : `${ui.accent.hex}38`,
      "terminal.tab.activeBorder": ui.accent.hex,

      // Status Bar
      "statusBar.background": ui.bg_surface.hex,
      "statusBar.foreground": ui.text_muted.hex,
      "statusBar.border": ui.border.hex,
      "statusBar.debuggingBackground": ui.accent.hex,
      "statusBar.debuggingForeground": badgeForeground,
      "statusBar.noFolderBackground": ui.bg_surface.hex,
      "statusBarItem.hoverBackground": `${ui.bg_element.hex}99`,
      "statusBarItem.hoverForeground": ui.text_primary.hex,
      "statusBarItem.focusBorder": ui.accent.hex,
      "statusBarItem.remoteBackground": ui.accent.hex,
      "statusBarItem.remoteForeground": badgeForeground,

      // Title Bar
      "titleBar.activeBackground": ui.bg_surface.hex,
      "titleBar.activeForeground": ui.text_primary.hex,
      "titleBar.border": ui.border.hex,
      "titleBar.inactiveBackground": ui.bg_canvas.hex,
      "titleBar.inactiveForeground": ui.text_muted.hex,

      // Menus & Quick Pick (Ctrl+P / Command Palette)
      "menu.background": ui.bg_surface.hex,
      "menu.foreground": ui.text_primary.hex,
      "menu.selectionBackground": isDark ? `${ui.accent.hex}38` : `${ui.accent.hex}22`,
      "menu.selectionForeground": isDark ? "#ffffff" : ui.text_primary.hex,
      "menu.separatorBackground": ui.border.hex,
      "quickInput.background": ui.bg_surface.hex,
      "quickInput.foreground": ui.text_primary.hex,
      "quickInputList.focusBackground": isDark ? `${ui.accent.hex}38` : `${ui.accent.hex}22`,
      "quickInputList.focusForeground": isDark ? "#ffffff" : ui.text_primary.hex,
      "pickerGroup.border": ui.border.hex,
      "pickerGroup.foreground": ui.accent.hex,

      // Notifications
      "notificationCenterHeader.background": ui.bg_surface.hex,
      "notificationCenterHeader.foreground": ui.text_primary.hex,
      "notifications.background": ui.bg_surface.hex,
      "notifications.border": ui.border.hex,
      "notifications.foreground": ui.text_primary.hex,

      // Peek View
      "peekViewEditor.background": ui.bg_canvas.hex,
      "peekViewEditor.matchHighlightBackground": `${ui.accent.hex}44`,
      "peekViewResult.background": ui.bg_surface.hex,
      "peekViewResult.selectionBackground": isDark ? `${ui.accent.hex}38` : `${ui.accent.hex}22`,
      "peekViewResult.matchHighlightBackground": `${ui.accent.hex}44`,
      "peekViewTitle.background": ui.bg_surface.hex,
      "peekView.border": ui.accent.hex,

      // Settings
      "settings.dropdownBackground": ui.bg_element.hex,
      "settings.dropdownBorder": ui.border.hex,
      "settings.headerForeground": ui.text_primary.hex,
      "settings.modifiedItemIndicator": ui.accent.hex,

      // Scrollbar
      "scrollbarSlider.background": isDark ? `${ui.text_faint.hex}33` : `${ui.text_faint.hex}22`,
      "scrollbarSlider.hoverBackground": isDark ? `${ui.text_faint.hex}55` : `${ui.text_faint.hex}44`,
      "scrollbarSlider.activeBackground": isDark ? `${ui.accent.hex}66` : `${ui.accent.hex}55`,

      // Git Decorations
      "gitDecoration.modifiedResourceForeground": warningColor,
      "gitDecoration.untrackedResourceForeground": successColor,
      "gitDecoration.ignoredResourceForeground": ui.text_faint.hex,
      "gitDecoration.deletedResourceForeground": destructiveColor,
      "gitDecoration.conflictingResourceForeground": destructiveColor,
      "gitDecoration.stageModifiedResourceForeground": warningColor,
      "gitDecoration.stageDeletedResourceForeground": destructiveColor,

      // Welcome Page & Chat
      "welcomePage.tileBackground": ui.bg_surface.hex,
      "welcomePage.progress.foreground": ui.accent.hex,
      "chat.slashCommandBackground": `${ui.accent.hex}33`,
      "chat.slashCommandForeground": ui.accent.hex,
      "chat.editedFileForeground": warningColor
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
}
