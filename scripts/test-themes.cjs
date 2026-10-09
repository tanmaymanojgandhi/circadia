const fs = require('fs');
const assert = require('assert');
process.chdir(require('path').join(__dirname, '..'));
const spec = JSON.parse(fs.readFileSync('spec/palette.json', 'utf8'));
function lum(hex) {
  const [r,g,b] = hex.match(/[a-f\d]{2}/gi).map(v=>parseInt(v,16)/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4);
  return .2126*r+.7152*g+.0722*b;
}
function contrast(a,b) {const x=lum(a),y=lum(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05);}
let checks = 0;
for(const [key,mode] of Object.entries(spec.modes)) {
  const theme = JSON.parse(fs.readFileSync(`ports/vscode/themes/circadia-${key}.json`, 'utf8'));
  assert.strictEqual(theme.colors['editor.background'],mode.ui.bg_canvas.hex);
  for(const state of ['editor.background','editor.selectionBackground','editor.inactiveSelectionBackground','editor.findMatchBackground','editor.findMatchHighlightBackground','editor.wordHighlightBackground','editor.wordHighlightStrongBackground']) {
    for(const [token,value] of Object.entries(mode.syntax)) {
      assert(contrast(value.hex,theme.colors[state])>=7,`${key} ${token} on ${state}`);checks++;
    }
  }
  for(const [fg,bg] of [['foreground','editor.background'],['descriptionForeground','sideBar.background'],['input.placeholderForeground','input.background'],['button.foreground','button.background'],['errorForeground','input.background']]) {
    assert(contrast(theme.colors[fg],theme.colors[bg])>=7,`${key} ${fg} on ${bg}`);checks++;
  }
  for(const [fg,bg] of [['input.border','input.background'],['dropdown.border','dropdown.background'],['checkbox.border','checkbox.background'],['focusBorder','editor.background']]) {
    assert(contrast(theme.colors[fg],theme.colors[bg])>=3,`${key} ${fg} boundary`);checks++;
  }
  for(const [token,value]of Object.entries(mode.syntax)) {
    assert(theme.tokenColors.some(t=>t.settings.foreground===value.hex),`${key} missing generated syntax ${token}`);checks++;
  }
}
const obs = fs.readFileSync('ports/obsidian/theme.css','utf8');
for(const [key,selector]of [['dark_ember','\\.theme-dark \\{'],['dark_plum','\\.theme-dark\\.circadia-plum,'],['dark_forest','\\.theme-dark\\.circadia-forest,']]) {
  const block=obs.match(new RegExp(selector+'[^}]+\\}'))[0];
  for(const [name,hex]of [['link-color','#9fc5d2'],['k-accent','#a5c3a4'],...Object.entries(spec.modes[key].headings).map(([h,v])=>[h+'-color',v.hex])]) {
    assert(block.includes(`--${name}: ${hex};`),`${key} Obsidian ${name}`);checks++;
  }
}
console.log(`${checks} generated theme checks passed across four VS Code modes and three Obsidian dark variants.`);
