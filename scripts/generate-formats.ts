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
  const width = 1160;
  const height = 980;
  const cardW = 540;
  const cardH = 415;

  const modeKeys = [
    { id: "light_parchment", icon: "☀️", x: 25, y: 85, lux: "300–800+ lux • Daylight Reading" },
    { id: "dark_ember", icon: "☕", x: 595, y: 85, lux: "0–50 lux • Candlelight & Warm Lighting" },
    { id: "dark_plum", icon: "🍇", x: 25, y: 530, lux: "0–50 lux • Velvet Plum & Modern UI" },
    { id: "dark_forest", icon: "🌲", x: 595, y: 530, lux: "0–50 lux • Obsidian Pine & Deep Focus" }
  ];

  let svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
  <!-- Background Frame -->
  <rect width="${width}" height="${height}" fill="#0d0c10" rx="16"/>
  
  <!-- Header Title -->
  <text x="30" y="42" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="22" font-weight="700" fill="#f0ece4">Circadia 2.0 Color Specification Matrix</text>
  <text x="30" y="65" font-family="JetBrains Mono, ui-monospace, monospace" font-size="12" fill="#e89a49">4 Circadian Modes • 100% Strict WCAG AAA • Multi-Dimensional CVD Separation</text>
`;

  modeKeys.forEach(cfg => {
    const mode = rawSpec.modes[cfg.id];
    if (!mode) return;
    const isDark = mode.type === "dark";
    const bg = mode.ui.bg_canvas.hex;
    const border = mode.ui.border.hex;
    const titleCol = mode.ui.text_primary.hex;
    const subCol = mode.ui.accent.hex;
    const labelCol = mode.ui.text_primary.hex;
    const monoCol = mode.ui.text_muted.hex;
    const catCol = mode.ui.text_muted.hex;
    const chipBorder = isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)";

    const rows = [
      {
        name: "UI Surfaces & Typography",
        tokens: [
          { key: "Canvas", hex: mode.ui.bg_canvas.hex },
          { key: "Surface", hex: mode.ui.bg_surface.hex },
          { key: "Element", hex: mode.ui.bg_element.hex },
          { key: "Border", hex: mode.ui.border.hex },
          { key: "Text Pri", hex: mode.ui.text_primary.hex },
          { key: "Text Mut", hex: mode.ui.text_muted.hex },
          { key: "Text Fnt", hex: mode.ui.text_faint.hex },
          { key: "Accent", hex: mode.ui.accent.hex }
        ]
      },
      {
        name: "Syntax Highlighting (Strict AAA)",
        tokens: [
          { key: "Keyword", hex: mode.syntax.keyword.hex },
          { key: "Type", hex: mode.syntax.type.hex },
          { key: "Function", hex: mode.syntax.function.hex },
          { key: "Property", hex: mode.syntax.property.hex },
          { key: "Variable", hex: mode.syntax.variable.hex },
          { key: "String", hex: mode.syntax.string.hex },
          { key: "Number", hex: mode.syntax.number.hex },
          { key: "Comment", hex: mode.syntax.comment.hex }
        ]
      },
      {
        name: "Headings Scale (H1–H6)",
        tokens: [
          { key: "H1", hex: mode.headings.h1.hex },
          { key: "H2", hex: mode.headings.h2.hex },
          { key: "H3", hex: mode.headings.h3.hex },
          { key: "H4", hex: mode.headings.h4.hex },
          { key: "H5", hex: mode.headings.h5.hex },
          { key: "H6", hex: mode.headings.h6.hex }
        ]
      }
    ];

    svg += `
  <!-- Card: ${mode.name} -->
  <g transform="translate(${cfg.x}, ${cfg.y})">
    <rect width="${cardW}" height="${cardH}" rx="12" fill="${bg}" stroke="${border}" stroke-width="1.5"/>
    <text x="20" y="30" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="15" font-weight="700" fill="${titleCol}">${cfg.icon} ${mode.name}</text>
    <text x="20" y="47" font-family="JetBrains Mono, ui-monospace, monospace" font-size="11" fill="${subCol}">${cfg.lux}</text>
`;

    let rowY = 62;
    const totalW = cardW - 40; // 500px usable

    rows.forEach(r => {
      const count = r.tokens.length;
      const gap = 6;
      const chipW = Math.floor((totalW - (count - 1) * gap) / count);
      const chipH = 38;

      svg += `
    <!-- Row: ${r.name} -->
    <text x="20" y="${rowY + 12}" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="10" font-weight="600" fill="${catCol}" letter-spacing="0.5">${r.name.toUpperCase()}</text>
    <g transform="translate(20, ${rowY + 20})">
`;
      r.tokens.forEach((t, i) => {
        const cx = i * (chipW + gap);
        svg += `      <g transform="translate(${cx}, 0)">
        <rect width="${chipW}" height="${chipH}" rx="5" fill="${t.hex}" stroke="${chipBorder}" stroke-width="1"/>
        <text x="${chipW/2}" y="${chipH + 14}" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="9.5" font-weight="600" fill="${labelCol}">${t.key}</text>
        <text x="${chipW/2}" y="${chipH + 25}" text-anchor="middle" font-family="JetBrains Mono, ui-monospace, monospace" font-size="8.5" fill="${monoCol}">${t.hex}</text>
      </g>\n`;
      });
      svg += `    </g>\n`;
      rowY += 105;
    });

    svg += `  </g>\n`;
  });

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
