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

function generateSvgMatrix() {
  const light = rawSpec.modes.light;
  const dark = rawSpec.modes.dark;
  const width = 1140;
  const height = 540;

  const tokens = [
    { key: "Canvas", light: light.ui.bg_canvas.hex, dark: dark.ui.bg_canvas.hex },
    { key: "Surface", light: light.ui.bg_surface.hex, dark: dark.ui.bg_surface.hex },
    { key: "Element", light: light.ui.bg_element.hex, dark: dark.ui.bg_element.hex },
    { key: "Text", light: light.ui.text_primary.hex, dark: dark.ui.text_primary.hex },
    { key: "Muted", light: light.ui.text_muted.hex, dark: dark.ui.text_muted.hex },
    { key: "Accent", light: light.ui.accent.hex, dark: dark.ui.accent.hex },
    { key: "Keyword", light: light.syntax.keyword.hex, dark: dark.syntax.keyword.hex },
    { key: "Type", light: light.syntax.type.hex, dark: dark.syntax.type.hex },
    { key: "Function", light: light.syntax.function.hex, dark: dark.syntax.function.hex },
    { key: "String", light: light.syntax.string.hex, dark: dark.syntax.string.hex },
    { key: "Number", light: light.syntax.number.hex, dark: dark.syntax.number.hex },
    { key: "Comment", light: light.syntax.comment.hex, dark: dark.syntax.comment.hex },
  ];

  let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
  <style>
    .label { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif; font-size: 12px; font-weight: 600; fill: #eae3d8; }
    .mono { font-family: "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 11px; fill: #b7aca0; }
    .title { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; font-size: 18px; font-weight: 700; }
    .subtitle { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; font-size: 12px; }
    .chip-border { stroke: rgba(255,255,255,0.12); stroke-width: 1; }
    .chip-border-light { stroke: rgba(0,0,0,0.10); stroke-width: 1; }
  </style>
  <rect width="${width}" height="${height}" fill="#15141b" rx="16"/>
  <rect x="20" y="20" width="${width - 40}" height="${height - 40}" fill="#1c1a24" rx="12" stroke="#343041" stroke-width="1.5"/>
  
  <text x="45" y="60" class="title" fill="#eae3d8">Circadia OKLCH Color Palette Matrix</text>
  <text x="45" y="82" class="mono subtitle" fill="#e89a49">Single-source specification with strict WCAG 2.1 AAA contrast</text>
  
  <!-- Headers -->
  <text x="45" y="125" class="title" fill="#f4eee1" font-size="14">☀️ Warm Parchment (Light Mode • 300–800+ lux)</text>
  <text x="45" y="325" class="title" fill="#f8c88f" font-size="14">🌙 Warm Ember &amp; Obsidian (Dark Mode • 0–50 lux)</text>
`;

  const startX = 45;
  const chipW = 78;
  const chipH = 65;
  const gap = 10;

  tokens.forEach((t, i) => {
    const x = startX + i * (chipW + gap);
    
    // Light Row
    svg += `
    <g transform="translate(${x}, 140)">
      <rect width="${chipW}" height="${chipH}" rx="8" fill="${t.light}" class="chip-border-light"/>
      <text x="${chipW/2}" y="${chipH + 18}" text-anchor="middle" class="label" fill="#eae3d8">${t.key}</text>
      <text x="${chipW/2}" y="${chipH + 34}" text-anchor="middle" class="mono">${t.light}</text>
    </g>`;

    // Dark Row
    svg += `
    <g transform="translate(${x}, 340)">
      <rect width="${chipW}" height="${chipH}" rx="8" fill="${t.dark}" class="chip-border"/>
      <text x="${chipW/2}" y="${chipH + 18}" text-anchor="middle" class="label" fill="#eae3d8">${t.key}</text>
      <text x="${chipW/2}" y="${chipH + 34}" text-anchor="middle" class="mono">${t.dark}</text>
    </g>`;
  });

  svg += `\n</svg>\n`;

  const assetsDir = path.join(__dirname, "..", "assets");
  if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir, { recursive: true });
  }
  const svgOutPath = path.join(assetsDir, "swatch-matrix.svg");
  fs.writeFileSync(svgOutPath, svg, "utf-8");
  console.log(`Generated ${svgOutPath}`);
}

generateSvgMatrix();
