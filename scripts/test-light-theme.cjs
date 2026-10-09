const fs=require('fs'),cp=require('child_process'),assert=require('assert');
process.chdir(require('path').join(__dirname, '..'));
function lum(h){const [r,g,b]=h.match(/[a-f\d]{2}/gi).slice(0,3).map(v=>parseInt(v,16)/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4);return .2126*r+.7152*g+.0722*b;}
function ratio(a,b){const x=lum(a),y=lum(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05);}
const spec=JSON.parse(fs.readFileSync('spec/palette.json','utf8'));
const theme=JSON.parse(fs.readFileSync('ports/vscode/themes/circadia-light_parchment.json','utf8'));
let checks=0;
for(const key of ['editor.background','editor.selectionBackground','editor.inactiveSelectionBackground','editor.findMatchBackground','editor.findMatchHighlightBackground','editor.wordHighlightBackground','editor.wordHighlightStrongBackground']){
 for(const [token,v]of Object.entries(spec.modes.light_parchment.syntax)){assert(ratio(v.hex,theme.colors[key])>=7,`${token} fails ${key}`);checks++;}
}
for(const [fg,bg]of [['foreground','editor.background'],['descriptionForeground','sideBar.background'],['input.placeholderForeground','input.background'],['button.foreground','button.background'],['errorForeground','input.background']]){assert(ratio(theme.colors[fg],theme.colors[bg])>=7,`${fg} fails ${bg}`);checks++;}
for(const [fg,bg]of [['input.border','input.background'],['dropdown.border','dropdown.background'],['checkbox.border','checkbox.background'],['focusBorder','editor.background']]){assert(ratio(theme.colors[fg],theme.colors[bg])>=3,fg+' insufficient control contrast');checks++;}
// Confirm that the stricter validator rejects a real contrast regression.
const original=fs.readFileSync('spec/palette.json');
try{
 const broken=JSON.parse(original);broken.modes.light_parchment.syntax.comment.hex='#888888';
 fs.writeFileSync('spec/palette.json',JSON.stringify(broken));
 const result=cp.spawnSync(process.execPath,[require.resolve('tsx/cli'),'scripts/validate.ts'],{encoding:'utf8'});
 assert.strictEqual(result.status,1,'Validator must reject low-contrast comments');
 assert(result.stdout.includes('FAIL syntax.comment'),'Failure must identify the affected token');checks++;
}finally{fs.writeFileSync('spec/palette.json',original);}
console.log(`${checks} generated VS Code text/state/control and validator regression checks passed.`);
