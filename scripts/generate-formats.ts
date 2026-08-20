#!/usr/bin/env ts-node
/**
 * Circadia Format Generator
 *
 * Reads spec/palette.json and exports:
 * 1. dist/palette.json - Full flattened multi-format definitions (Hex, RGB, HSL, OKLCH)
 * 2. dist/palette.csv  - Tabular representation for downstream tools and docs
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

function hexToRgb(hex: string): [number, number, number] {
  const cleanHex = hex.replace(/^#/, "");
  const r = parseInt(cleanHex.slice(0, 2), 16);
  const g = parseInt(cleanHex.slice(2, 4), 16);
  const b = parseInt(cleanHex.slice(4, 6), 16);
  return [r, g, b];
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

function srgbToLinear(c: number): number {
  const v = c / 255;
  return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
}

function rgbToOklab(r: number, g: number, b: number): [number, number, number] {
  const lr = srgbToLinear(r);
  const lg = srgbToLinear(g);
  const lb = srgbToLinear(b);

  const l = Math.cbrt(0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb);
  const m = Math.cbrt(0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb);
  const s = Math.cbrt(0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb);

  const L = 0.2104542553 * l + 0.7936177850 * m - 0.0040720468 * s;
  const a = 1.9779984951 * l - 2.4285922050 * m + 0.4505937099 * s;
  const B = 0.0259040371 * l + 0.7827717662 * m - 0.8086757660 * s;

  return [L, a, B];
}

function rgbToOklch(r: number, g: number, b: number): string {
  const [L, a, B] = rgbToOklab(r, g, b);
  const C = Math.sqrt(a * a + B * B);
  let h = (Math.atan2(B, a) * 180) / Math.PI;
  if (h < 0) h += 360;
  return `oklch(${(L * 100).toFixed(1)}% ${C.toFixed(3)} ${Math.round(h)})`;
}

const specPath = path.join(__dirname, "..", "spec", "palette.json");
const distDir = path.join(__dirname, "..", "dist");

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

const rawSpec: PaletteSpec = JSON.parse(fs.readFileSync(specPath, "utf-8"));

const fullExport: Record<string, any> = {
  name: rawSpec.name,
  version: rawSpec.version,
  tagline: rawSpec.tagline,
  description: rawSpec.description,
  generatedAt: new Date().toISOString(),
  modes: {},
};

const csvRows: string[] = [
  "mode,group,token,hex,rgb,hsl,oklch",
];

for (const [modeId, mode] of Object.entries(rawSpec.modes)) {
  const modeData: Record<string, any> = {
    name: mode.name,
    type: mode.type,
    ui: {},
    syntax: {},
    headings: {},
  };

  const groups: Array<["ui" | "syntax" | "headings", Record<string, ColorEntry>]> = [
    ["ui", mode.ui],
    ["syntax", mode.syntax],
    ["headings", mode.headings],
  ];

  for (const [groupName, groupTokens] of groups) {
    for (const [tokenName, token] of Object.entries(groupTokens)) {
      const [r, g, b] = token.rgb && token.rgb.length === 3 ? [token.rgb[0], token.rgb[1], token.rgb[2]] : hexToRgb(token.hex);
      const [h, s, l] = rgbToHsl(r, g, b);
      const computedOklch = token.oklch || rgbToOklch(r, g, b);

      const colorData = {
        hex: token.hex,
        rgb: `rgb(${r}, ${g}, ${b})`,
        rgbRaw: [r, g, b],
        hsl: `hsl(${h}, ${s}%, ${l}%)`,
        oklch: computedOklch,
      };

      modeData[groupName][tokenName] = colorData;

      csvRows.push(
        `"${modeId}","${groupName}","${tokenName}","${token.hex}","rgb(${r}, ${g}, ${b})","hsl(${h}, ${s}%, ${l}%)","${computedOklch}"`
      );
    }
  }

  fullExport.modes[modeId] = modeData;
}

const jsonOutPath = path.join(distDir, "palette.json");
fs.writeFileSync(jsonOutPath, JSON.stringify(fullExport, null, 2), "utf-8");
console.log(`Generated ${jsonOutPath}`);

const csvOutPath = path.join(distDir, "palette.csv");
fs.writeFileSync(csvOutPath, csvRows.join("\n"), "utf-8");
console.log(`Generated ${csvOutPath}`);
