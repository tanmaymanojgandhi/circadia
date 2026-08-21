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
  const width = 1120;
  const height = 520;
  const cardW = 520;
  const cardH = 405;

  const rows = [
    {
      name: "UI Surfaces and Typography",
      tokensL: [
        { key: "Canvas", hex: light.ui.bg_canvas.hex },
        { key: "Surface", hex: light.ui.bg_surface.hex },
        { key: "Element", hex: light.ui.bg_element.hex },
        { key: "Border", hex: light.ui.border.hex },
        { key: "Text Pri", hex: light.ui.text_primary.hex },
        { key: "Text Mut", hex: light.ui.text_muted.hex },
        { key: "Text Fnt", hex: light.ui.text_faint.hex },
        { key: "Accent", hex: light.ui.accent.hex }
      ],
      tokensD: [
        { key: "Canvas", hex: dark.ui.bg_canvas.hex },
        { key: "Surface", hex: dark.ui.bg_surface.hex },
        { key: "Element", hex: dark.ui.bg_element.hex },
        { key: "Border", hex: dark.ui.border.hex },
        { key: "Text Pri", hex: dark.ui.text_primary.hex },
        { key: "Text Mut", hex: dark.ui.text_muted.hex },
        { key: "Text Fnt", hex: dark.ui.text_faint.hex },
        { key: "Accent", hex: dark.ui.accent.hex }
      ]
    },
    {
      name: "Syntax Highlighting (Jewel Tones)",
      tokensL: [
        { key: "Keyword", hex: light.syntax.keyword.hex },
        { key: "Type", hex: light.syntax.type.hex },
        { key: "Function", hex: light.syntax.function.hex },
        { key: "String", hex: light.syntax.string.hex },
        { key: "Number", hex: light.syntax.number.hex },
        { key: "Tag", hex: light.syntax.tag.hex },
        { key: "Comment", hex: light.syntax.comment.hex }
      ],
      tokensD: [
        { key: "Keyword", hex: dark.syntax.keyword.hex },
        { key: "Type", hex: dark.syntax.type.hex },
        { key: "Function", hex: dark.syntax.function.hex },
        { key: "String", hex: dark.syntax.string.hex },
        { key: "Number", hex: dark.syntax.number.hex },
        { key: "Tag", hex: dark.syntax.tag.hex },
        { key: "Comment", hex: dark.syntax.comment.hex }
      ]
    },
    {
      name: "Heading Scale (H1–H6)",
      tokensL: [
        { key: "H1", hex: light.headings.h1.hex },
        { key: "H2", hex: light.headings.h2.hex },
        { key: "H3", hex: light.headings.h3.hex },
        { key: "H4", hex: light.headings.h4.hex },
        { key: "H5", hex: light.headings.h5.hex },
        { key: "H6", hex: light.headings.h6.hex }
      ],
      tokensD: [
        { key: "H1", hex: dark.headings.h1.hex },
        { key: "H2", hex: dark.headings.h2.hex },
        { key: "H3", hex: dark.headings.h3.hex },
        { key: "H4", hex: dark.headings.h4.hex },
        { key: "H5", hex: dark.headings.h5.hex },
        { key: "H6", hex: dark.headings.h6.hex }
      ]
    }
  ];

  let svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
  <!-- Background Frame -->
  <rect width="${width}" height="${height}" fill="#0f0e13" rx="16"/>
  
  <!-- Header Title -->
  <text x="30" y="42" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="20" font-weight="700" fill="#eae3d8">Circadia OKLCH Color Palette Matrix</text>
  <text x="30" y="62" font-family="JetBrains Mono, ui-monospace, monospace" font-size="12" fill="#e89a49">42-Token Semantic Specification • Native Canvas Comparison • Strict WCAG 2.1 AAA</text>
`;

  function renderColumn(isDark: boolean, startX: number): string {
    const bg = isDark ? "#15141b" : "#f4eee1";
    const border = isDark ? "#343041" : "#d4c8b2";
    const titleCol = isDark ? "#eae3d8" : "#28323a";
    const subCol = isDark ? "#e89a49" : "#09489a";
    const headerTitle = isDark ? "🌙 Warm Ember &amp; Obsidian (Dark)" : "☀️ Warm Parchment (Light)";
    const luxText = isDark ? "0–50 lux • Halation-Free Night" : "300–800+ lux • Anti-Glare Day";
    const labelCol = isDark ? "#eae3d8" : "#28323a";
    const monoCol = isDark ? "#b7aca0" : "#5f6d7a";
    const chipBorder = isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)";
    const catCol = isDark ? "#b7aca0" : "#46535f";

    let s = `
  <!-- ${isDark ? "Dark Column" : "Light Column"} -->
  <g transform="translate(${startX}, 80)">
    <rect width="${cardW}" height="${cardH}" rx="12" fill="${bg}" stroke="${border}" stroke-width="1.5"/>
    
    <!-- Column Title -->
    <text x="22" y="30" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="15" font-weight="700" fill="${titleCol}">${headerTitle}</text>
    <text x="22" y="47" font-family="JetBrains Mono, ui-monospace, monospace" font-size="11" fill="${subCol}">${luxText}</text>
`;

    let rowY = 62;
    const totalW = cardW - 44; // 476px usable

    rows.forEach((r) => {
      const tokens = isDark ? r.tokensD : r.tokensL;
      const count = tokens.length;
      const gap = 8;
      const chipW = Math.floor((totalW - (count - 1) * gap) / count);
      const chipH = 42;

      s += `
    <!-- Row: ${r.name} -->
    <text x="22" y="${rowY + 12}" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="10.5" font-weight="600" fill="${catCol}" letter-spacing="0.5">${r.name.toUpperCase()}</text>
    <g transform="translate(22, ${rowY + 20})">
`;
      tokens.forEach((t, i) => {
        const cx = i * (chipW + gap);
        s += `      <g transform="translate(${cx}, 0)">
        <rect width="${chipW}" height="${chipH}" rx="6" fill="${t.hex}" stroke="${chipBorder}" stroke-width="1"/>
        <text x="${chipW/2}" y="${chipH + 15}" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="10" font-weight="600" fill="${labelCol}">${t.key}</text>
        <text x="${chipW/2}" y="${chipH + 27}" text-anchor="middle" font-family="JetBrains Mono, ui-monospace, monospace" font-size="9" fill="${monoCol}">${t.hex}</text>
      </g>\n`;
      });
      s += `    </g>\n`;
      rowY += 105;
    });

    s += `  </g>\n`;
    return s;
  }

  svg += renderColumn(false, 25);  // Light Column Left
  svg += renderColumn(true, 575);  // Dark Column Right
  svg += `</svg>\n`;

  const assetsDir = path.join(__dirname, "..", "assets");
  if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir, { recursive: true });
  }
  const svgOutPath = path.join(assetsDir, "swatch-matrix.svg");
  fs.writeFileSync(svgOutPath, svg, "utf-8");
  console.log(`Generated ${svgOutPath}`);
}

generateSvgMatrix();
