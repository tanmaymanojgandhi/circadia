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
  const width = 1200;
  const height = 820;

  const categories = [
    {
      name: "UI Surfaces & Typography",
      tokens: [
        { key: "Canvas", lHex: light.ui.bg_canvas.hex, dHex: dark.ui.bg_canvas.hex },
        { key: "Surface", lHex: light.ui.bg_surface.hex, dHex: dark.ui.bg_surface.hex },
        { key: "Element", lHex: light.ui.bg_element.hex, dHex: dark.ui.bg_element.hex },
        { key: "Border", lHex: light.ui.border.hex, dHex: dark.ui.border.hex },
        { key: "Text Pri", lHex: light.ui.text_primary.hex, dHex: dark.ui.text_primary.hex },
        { key: "Text Mut", lHex: light.ui.text_muted.hex, dHex: dark.ui.text_muted.hex },
        { key: "Text Fnt", lHex: light.ui.text_faint.hex, dHex: dark.ui.text_faint.hex },
        { key: "Accent", lHex: light.ui.accent.hex, dHex: dark.ui.accent.hex },
      ]
    },
    {
      name: "Syntax Highlighting (Jewel Tones)",
      tokens: [
        { key: "Keyword", lHex: light.syntax.keyword.hex, dHex: dark.syntax.keyword.hex },
        { key: "Type", lHex: light.syntax.type.hex, dHex: dark.syntax.type.hex },
        { key: "Function", lHex: light.syntax.function.hex, dHex: dark.syntax.function.hex },
        { key: "String", lHex: light.syntax.string.hex, dHex: dark.syntax.string.hex },
        { key: "Number", lHex: light.syntax.number.hex, dHex: dark.syntax.number.hex },
        { key: "Tag", lHex: light.syntax.tag.hex, dHex: dark.syntax.tag.hex },
        { key: "Comment", lHex: light.syntax.comment.hex, dHex: dark.syntax.comment.hex },
      ]
    },
    {
      name: "Heading Scale (H1–H6)",
      tokens: [
        { key: "H1", lHex: light.headings.h1.hex, dHex: dark.headings.h1.hex },
        { key: "H2", lHex: light.headings.h2.hex, dHex: dark.headings.h2.hex },
        { key: "H3", lHex: light.headings.h3.hex, dHex: dark.headings.h3.hex },
        { key: "H4", lHex: light.headings.h4.hex, dHex: dark.headings.h4.hex },
        { key: "H5", lHex: light.headings.h5.hex, dHex: dark.headings.h5.hex },
        { key: "H6", lHex: light.headings.h6.hex, dHex: dark.headings.h6.hex },
      ]
    }
  ];

  let svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
  <rect width="${width}" height="${height}" fill="#15141b" rx="16"/>
  <rect x="18" y="18" width="${width - 36}" height="${height - 36}" fill="#1c1a24" rx="12" stroke="#343041" stroke-width="1.5"/>
  
  <!-- Header -->
  <text x="40" y="55" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="20" font-weight="700" fill="#eae3d8">Circadia OKLCH Color Palette Matrix</text>
  <text x="40" y="76" font-family="JetBrains Mono, ui-monospace, monospace" font-size="12" fill="#e89a49">Complete 42-Token Semantic Specification with Strict WCAG 2.1 AAA Contrast</text>

  <!-- Light Mode Section -->
  <g transform="translate(40, 105)">
    <rect x="-10" y="-10" width="${width - 60}" height="320" rx="10" fill="#f4eee1" opacity="0.04" stroke="#343041" stroke-width="1"/>
    <text x="0" y="15" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="15" font-weight="700" fill="#f4eee1">☀️ Warm Parchment (Light Mode • 300–800+ lux)</text>
`;

  let xOffset = 0;
  const chipW = 46;
  const chipH = 50;
  const gap = 8;

  categories.forEach((cat) => {
    svg += `
    <text x="${xOffset}" y="45" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="12" font-weight="600" fill="#b7aca0" letter-spacing="0.5">${cat.name.toUpperCase()}</text>
    <g transform="translate(${xOffset}, 55)">
`;
    cat.tokens.forEach((t, i) => {
      const cx = i * (chipW + gap);
      svg += `
      <g transform="translate(${cx}, 0)">
        <rect width="${chipW}" height="${chipH}" rx="6" fill="${t.lHex}" stroke="rgba(0,0,0,0.10)" stroke-width="1"/>
        <text x="${chipW/2}" y="${chipH + 16}" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="11" font-weight="600" fill="#eae3d8">${t.key}</text>
        <text x="${chipW/2}" y="${chipH + 28}" text-anchor="middle" font-family="JetBrains Mono, ui-monospace, monospace" font-size="10" fill="#b7aca0">${t.lHex}</text>
      </g>`;
    });
    svg += `\n    </g>`;
    xOffset += cat.tokens.length * (chipW + gap) + 24;
  });

  svg += `\n  </g>`;

  // Dark Mode Section
  svg += `
  <!-- Dark Mode Section -->
  <g transform="translate(40, 445)">
    <rect x="-10" y="-10" width="${width - 60}" height="320" rx="10" fill="#15141b" opacity="0.4" stroke="#343041" stroke-width="1"/>
    <text x="0" y="15" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="15" font-weight="700" fill="#f8c88f">🌙 Warm Ember &amp; Obsidian (Dark Mode • 0–50 lux)</text>
`;

  xOffset = 0;
  categories.forEach((cat) => {
    svg += `
    <text x="${xOffset}" y="45" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="12" font-weight="600" fill="#b7aca0" letter-spacing="0.5">${cat.name.toUpperCase()}</text>
    <g transform="translate(${xOffset}, 55)">
`;
    cat.tokens.forEach((t, i) => {
      const cx = i * (chipW + gap);
      svg += `
      <g transform="translate(${cx}, 0)">
        <rect width="${chipW}" height="${chipH}" rx="6" fill="${t.dHex}" stroke="rgba(255,255,255,0.12)" stroke-width="1"/>
        <text x="${chipW/2}" y="${chipH + 16}" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="11" font-weight="600" fill="#eae3d8">${t.key}</text>
        <text x="${chipW/2}" y="${chipH + 28}" text-anchor="middle" font-family="JetBrains Mono, ui-monospace, monospace" font-size="10" fill="#b7aca0">${t.dHex}</text>
      </g>`;
    });
    svg += `\n    </g>`;
    xOffset += cat.tokens.length * (chipW + gap) + 24;
  });

  svg += `\n  </g>`;

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
