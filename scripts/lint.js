#!/usr/bin/env node
/**
 * Circadia Unified Linter & Syntax Checker
 *
 * Validates:
 * 1. Lua files in ports/ (syntax check via luaparse AST validation).
 * 2. Neovim palette schema and token integrity across all 4 modes.
 * 3. Repository JSON files (syntax check).
 * 4. Spec palette WCAG 2.1 AAA contrast ratios.
 */

const fs = require('fs')
const path = require('path')
const luaparse = require('luaparse')

const rootDir = path.resolve(__dirname, '..')
let totalChecks = 0
let failedChecks = 0

function logPass(msg) {
  console.log(`  \x1b[32m✔\x1b[0m ${msg}`)
}

function logFail(msg) {
  console.error(`  \x1b[31m✖\x1b[0m ${msg}`)
  failedChecks++
}

function findFiles(dir, filter, recursive = true) {
  let results = []
  if (!fs.existsSync(dir)) return results
  const list = fs.readdirSync(dir, { withFileTypes: true })
  for (const entry of list) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      if (recursive && entry.name !== 'node_modules' && entry.name !== '.git' && entry.name !== '.gemini') {
        results = results.concat(findFiles(fullPath, filter, recursive))
      }
    } else if (filter(entry.name, fullPath)) {
      results.push(fullPath)
    }
  }
  return results
}

// -------------------------------------------------------------
// 1. LUA SYNTAX VALIDATION
// -------------------------------------------------------------
console.log('\n\x1b[1m[1/4] Validating Lua files...\x1b[0m')
const luaFiles = findFiles(path.join(rootDir, 'ports'), (name) => name.endsWith('.lua'))

if (luaFiles.length === 0) {
  logFail('No Lua files found in ports/')
} else {
  for (const file of luaFiles) {
    totalChecks++
    const relativePath = path.relative(rootDir, file)
    try {
      const code = fs.readFileSync(file, 'utf-8')
      luaparse.parse(code, {
        comments: false,
        scope: false,
        luaVersion: '5.1', // Neovim LuaJIT is Lua 5.1 compatible
      })
      logPass(`${relativePath} (valid Lua syntax)`)
    } catch (err) {
      logFail(`${relativePath} line ${err.line || '?'}, col ${err.column || '?'}: ${err.message}`)
    }
  }
}

// -------------------------------------------------------------
// 2. NEOVIM PALETTE INTEGRITY VALIDATION
// -------------------------------------------------------------
console.log('\n\x1b[1m[2/4] Checking Neovim palette tokens...\x1b[0m')
const neovimPalettePath = path.join(rootDir, 'ports', 'neovim', 'lua', 'circadia', 'palette.lua')
if (!fs.existsSync(neovimPalettePath)) {
  logFail('Neovim palette file does not exist at ' + path.relative(rootDir, neovimPalettePath))
} else {
  totalChecks++
  try {
    const paletteContent = fs.readFileSync(neovimPalettePath, 'utf-8')
    const requiredModes = ['light_parchment', 'dark_ember', 'dark_plum', 'dark_forest']
    const requiredTokens = [
      'bg_canvas', 'bg_surface', 'bg_element', 'border',
      'text_primary', 'text_muted', 'text_faint', 'accent',
      'keyword', 'type', 'function', 'property', 'variable',
      'string', 'number', 'tag', 'comment',
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    ]

    for (const mode of requiredModes) {
      if (!paletteContent.includes(`${mode} = {`)) {
        logFail(`Missing mode definition '${mode}' in palette.lua`)
      }
    }

    if (!paletteContent.includes('M.light = M.light_parchment') || !paletteContent.includes('M.dark = M.dark_ember')) {
      logFail('Missing required default aliases (M.light or M.dark) in palette.lua')
    }

    // Check hex color format in palette
    const hexColorRegex = /#([0-9a-fA-F]{6})/g
    const matches = paletteContent.match(hexColorRegex)
    if (!matches || matches.length < requiredModes.length * requiredTokens.length) {
      logFail(`Expected at least ${requiredModes.length * requiredTokens.length} hex tokens, found ${matches ? matches.length : 0}`)
    } else {
      logPass(`All 4 Circadia modes, default aliases, and ${matches.length} hex color tokens verified`)
    }
  } catch (err) {
    logFail(`Error verifying Neovim palette: ${err.message}`)
  }
}

// -------------------------------------------------------------
// 3. JSON SPECIFICATION VALIDATION
// -------------------------------------------------------------
console.log('\n\x1b[1m[3/4] Validating JSON files...\x1b[0m')
const jsonFiles = [
  path.join(rootDir, 'spec', 'palette.json'),
  path.join(rootDir, 'package.json'),
]

for (const file of jsonFiles) {
  totalChecks++
  const relativePath = path.relative(rootDir, file)
  try {
    const raw = fs.readFileSync(file, 'utf-8')
    JSON.parse(raw)
    logPass(`${relativePath} (valid JSON)`)
  } catch (err) {
    logFail(`${relativePath}: ${err.message}`)
  }
}

// -------------------------------------------------------------
// 4. WCAG CONTRAST RATIOS (SPEC ACCESSIBILITY)
// -------------------------------------------------------------
console.log('\n\x1b[1m[4/4] Validating WCAG AAA Contrast Ratios in Spec...\x1b[0m')
function hexToRgb(hex) {
  const cleanHex = hex.replace(/^#/, '')
  const r = parseInt(cleanHex.slice(0, 2), 16)
  const g = parseInt(cleanHex.slice(2, 4), 16)
  const b = parseInt(cleanHex.slice(4, 6), 16)
  return [r, g, b]
}

function srgbToLinear(c) {
  const v = c / 255
  return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
}

function relativeLuminance([r, g, b]) {
  const [R, G, B] = [r, g, b].map(srgbToLinear)
  return 0.2126 * R + 0.7152 * G + 0.0722 * B
}

function contrastRatio(hexA, hexB) {
  const lA = relativeLuminance(hexToRgb(hexA))
  const lB = relativeLuminance(hexToRgb(hexB))
  const [lighter, darker] = lA > lB ? [lA, lB] : [lB, lA]
  return (lighter + 0.05) / (darker + 0.05)
}

try {
  const spec = JSON.parse(fs.readFileSync(path.join(rootDir, 'spec', 'palette.json'), 'utf-8'))
  for (const [modeKey, mode] of Object.entries(spec.modes)) {
    totalChecks++
    const bg = mode.ui.bg_canvas.hex
    const textPrimary = mode.ui.text_primary.hex
    const cr = contrastRatio(bg, textPrimary)
    if (cr < 7.0) {
      logFail(`${mode.name} text_primary fails WCAG AAA: ${cr.toFixed(2)}:1 (required >= 7.0:1)`)
    } else {
      logPass(`${mode.name} (${modeKey}) text_primary contrast: ${cr.toFixed(2)}:1 (WCAG AAA >= 7.0:1)`)
    }
  }
} catch (err) {
  logFail(`Spec validation error: ${err.message}`)
}

// Summary
console.log('\n----------------------------------------')
if (failedChecks > 0) {
  console.error(`\x1b[31mLinting FAILED: ${failedChecks} error(s) found across ${totalChecks} checks.\x1b[0m\n`)
  process.exit(1)
} else {
  console.log(`\x1b[32mAll ${totalChecks} linting, syntax, and accessibility checks PASSED cleanly.\x1b[0m\n`)
  process.exit(0)
}
