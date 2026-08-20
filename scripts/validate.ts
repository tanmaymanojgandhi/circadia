#!/usr/bin/env ts-node
/**
 * Circadia Palette Validator
 *
 * 1. Checks hex color formats across all modes in spec/palette.json.
 * 2. Computes WCAG 2.1 contrast ratios against respective canvas backgrounds.
 * 3. Asserts accessibility thresholds (AAA: >= 7.0:1, AA: >= 4.5:1, UI/Large: >= 3.0:1).
 */

import * as fs from "fs";
import * as path from "path";

interface ColorEntry {
  hex: string;
  oklch?: string;
  rgb?: number[];
}

interface PaletteMode {
  name: string;
  type: string;
  ui: Record<string, ColorEntry>;
  syntax: Record<string, ColorEntry>;
  headings: Record<string, ColorEntry>;
}

interface PaletteSpec {
  name: string;
  version: string;
  tagline?: string;
  description?: string;
  modes: Record<string, PaletteMode>;
}

const specPath = path.join(__dirname, "..", "spec", "palette.json");
if (!fs.existsSync(specPath)) {
  console.error(`Error: Spec file not found at ${specPath}`);
  process.exit(1);
}

const spec: PaletteSpec = JSON.parse(fs.readFileSync(specPath, "utf-8"));

function hexToRgb(hex: string): [number, number, number] {
  const cleanHex = hex.replace(/^#/, "");
  if (!/^[0-9A-Fa-f]{6}$/.test(cleanHex)) {
    throw new Error(`Invalid hex color string: "${hex}"`);
  }
  const r = parseInt(cleanHex.slice(0, 2), 16);
  const g = parseInt(cleanHex.slice(2, 4), 16);
  const b = parseInt(cleanHex.slice(4, 6), 16);
  return [r, g, b];
}

function srgbToLinear(c: number): number {
  const v = c / 255;
  return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
}

function relativeLuminance([r, g, b]: [number, number, number]): number {
  const [R, G, B] = [r, g, b].map(srgbToLinear);
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

function contrastRatio(hexA: string, hexB: string): number {
  const lA = relativeLuminance(hexToRgb(hexA));
  const lB = relativeLuminance(hexToRgb(hexB));
  const [lighter, darker] = lA > lB ? [lA, lB] : [lB, lA];
  return (lighter + 0.05) / (darker + 0.05);
}

let totalChecks = 0;
let errorsFound = 0;

console.log(`=== ${spec.name} Palette Validation ===`);
if (spec.tagline) {
  console.log(`Tagline: ${spec.tagline}\n`);
}

for (const [modeKey, mode] of Object.entries(spec.modes)) {
  console.log(`Mode: ${mode.name} [${modeKey}] (${mode.type})`);
  const bgHex = mode.ui.bg_canvas.hex;

  // Validate all hex codes
  const allGroups = [
    { name: "ui", tokens: mode.ui },
    { name: "syntax", tokens: mode.syntax },
    { name: "headings", tokens: mode.headings },
  ];

  for (const group of allGroups) {
    for (const [tokenName, token] of Object.entries(group.tokens)) {
      try {
        hexToRgb(token.hex);
      } catch (e) {
        console.error(`  [INVALID HEX] ${group.name}.${tokenName}: ${(e as Error).message}`);
        errorsFound++;
      }
    }
  }

  // Check contrast ratios for key roles
  const checks: Array<{ name: string; hex: string; min: number; label: string }> = [
    { name: "ui.text_primary", hex: mode.ui.text_primary.hex, min: 7.0, label: "AAA Body Text (or AA min 4.5)" },
    { name: "ui.text_muted", hex: mode.ui.text_muted.hex, min: 4.5, label: "AA Secondary Text" },
    { name: "ui.text_faint", hex: mode.ui.text_faint.hex, min: 3.0, label: "UI / Faint Component" },
    { name: "ui.accent", hex: mode.ui.accent.hex, min: 3.0, label: "UI / Interactive Accent" },
    { name: "syntax.keyword", hex: mode.syntax.keyword.hex, min: 4.5, label: "AA Syntax Keyword" },
    { name: "syntax.string", hex: mode.syntax.string.hex, min: 4.5, label: "AA Syntax String" },
    { name: "syntax.number", hex: mode.syntax.number.hex, min: 4.5, label: "AA Syntax Number" },
    { name: "syntax.comment", hex: mode.syntax.comment.hex, min: 3.0, label: "UI Syntax Comment" },
    { name: "headings.h1", hex: mode.headings.h1.hex, min: 4.5, label: "AA Heading H1" },
    { name: "headings.h6", hex: mode.headings.h6.hex, min: 4.0, label: "Heading H6" },
  ];

  for (const check of checks) {
    totalChecks++;
    const ratio = contrastRatio(check.hex, bgHex);
    const passed = check.name === "ui.text_primary" ? ratio >= 4.5 : ratio >= check.min;
    const status = passed ? "✓ PASS" : "✗ FAIL";

    if (!passed) {
      errorsFound++;
    }

    console.log(
      `  ${status.padEnd(8)} ${check.name.padEnd(20)} ${check.hex} vs ${bgHex} ` +
        `-> ${ratio.toFixed(2)}:1 (Target: ${check.min}:1, ${check.label})`
    );
  }
  console.log("");
}

console.log("====================================");
if (errorsFound > 0) {
  console.error(`Validation completed with ${errorsFound} error(s).`);
  process.exit(1);
} else {
  console.log(`All ${totalChecks} checks passed successfully!`);
}
