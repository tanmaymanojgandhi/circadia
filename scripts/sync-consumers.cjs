// Synchronize consumers not covered by the original port generator.
const fs = require('fs');
const path = require('path');
process.chdir(path.join(__dirname, '..'));
const spec = JSON.parse(fs.readFileSync('spec/palette.json', 'utf8'));
const rgb = hex => hex.match(/[a-f\d]{2}/gi).map(v => parseInt(v, 16));
const write = (file, text) => fs.writeFileSync(file, text);
const updateVar = (text, key, value) => text.replace(new RegExp('('+key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')+':\\s*)[^;]+;', 'g'), '$1'+value+';');
function cssTokens(text, mode, obsidian = false) {
  const ui = mode.ui, syn = mode.syntax;
  const entries = obsidian ? {
    '--k-bg':ui.bg_canvas.hex, '--k-bg-2':ui.bg_surface.hex, '--k-bg-3':ui.bg_element.hex,
    '--k-text':ui.text_primary.hex, '--k-text-muted':ui.text_muted.hex, '--k-text-faint':ui.text_faint.hex,
    '--k-accent':mode.type==='dark'?'#a5c3a4':ui.accent.hex,
    '--k-accent-hover':mode.type==='dark'?'#b9d3b7':mode.headings.h3.hex,
    '--k-accent-rgb':rgb(mode.type==='dark'?'#a5c3a4':ui.accent.hex).join(', '),
    '--k-code-text':ui.text_primary.hex, '--k-comment':syn.comment.hex,
    '--k-keyword':syn.keyword.hex, '--k-number':syn.number.hex, '--k-var2':syn.function.hex,
    '--k-var3':syn.property.hex, '--k-string':syn.string.hex, '--k-tag':syn.tag.hex,
    '--color-green':syn.string.hex, '--color-orange':mode.type==='dark'?syn.number.hex:syn.type.hex, '--color-yellow':mode.type==='dark'?syn.type.hex:'#ca8a04',
    '--color-cyan':syn.number.hex, '--color-blue':syn.keyword.hex,
    '--color-purple':syn.function.hex, '--color-pink':syn.property.hex,
  } : Object.fromEntries(Object.entries(ui).map(([key,v])=>['--'+key.replaceAll('_','-'),v.hex]));
  for(const [key,v] of Object.entries(mode.headings))entries[obsidian?'--'+key+'-color':'--'+key]=v.hex;
  if(!obsidian)for(const[key,v]of Object.entries(syn))entries['--syn-'+key]=v.hex;
  if(obsidian && mode.type==='dark')Object.assign(entries,{
    '--color-red':'#efabb2', '--k-mark-bg':ui.bg_element.hex,
    '--text-selection':ui.bg_element.hex, '--text-highlight-bg':ui.bg_element.hex,
    '--background-modifier-hover':ui.bg_surface.hex,
    '--background-modifier-active-hover':ui.bg_element.hex,
    '--link-color':'#9fc5d2', '--link-color-hover':'#b4d5df',
    '--text-accent':'#9fc5d2', '--text-accent-hover':'#b4d5df',
    '--link-unresolved-color':'#9fc5d2',
  });
  for(const[key,v]of Object.entries(entries))text=updateVar(text,key,v);
  if(obsidian && mode.type==='dark') {
    // Variant blocks need explicit link overrides; the base variables serve all flavours.
    for(const [name,value]of Object.entries({'--link-color':'#9fc5d2','--link-color-hover':'#b4d5df','--text-accent':'#9fc5d2','--text-accent-hover':'#b4d5df','--text-selection':ui.bg_element.hex})) {
      if(!text.includes(name+':'))text=text.replace(/\}\s*$/, '    '+name+': '+value+';\n}\n');
    }
    const lines=text.split('\n'),seen=new Set();
    text=lines.filter(line=>{if(!/^\s*--/.test(line))return true;const k=line.trim();if(seen.has(k))return false;seen.add(k);return true;}).join('\n');
  }
  return text;
}
let css=fs.readFileSync('docs/styles.css','utf8');
for(const[key,m]of Object.entries(spec.modes))css=css.replace(new RegExp('\\[data-theme="'+key+'"\\] \\{[^}]+\\}'),block=>cssTokens(block,m));
write('docs/styles.css',css);
let obs=fs.readFileSync('ports/obsidian/theme.css','utf8');
obs=obs.replace(/\.theme-light \{[^}]+\}/,b=>cssTokens(b,spec.modes.light_parchment,true));
obs=obs.replace(/\.theme-dark \{[^}]+\}/,b=>cssTokens(b,spec.modes.dark_ember,true));
for(const variant of ['plum','forest'])obs=obs.replace(new RegExp('\\.theme-dark\\.circadia-'+variant+',[\\s\\S]*?\\}'),b=>cssTokens(b,spec.modes['dark_'+variant],true));
write('ports/obsidian/theme.css',obs.trimEnd()+'\n');
let app=fs.readFileSync('docs/app.js','utf8');
app=app.replace(/version: "[^"]+"/, 'version: "'+spec.version+'"');
app=app.replace(/description: "[^\n]+/, 'description: '+JSON.stringify(spec.description)+',');
for(const[key,m]of Object.entries(spec.modes)) {
  const start=app.indexOf('    '+key+': {');
  let end=app.indexOf('\n    },',start); if(end<0)end=app.indexOf('\n    }\n',start);
  let block=app.slice(start,end);
  for(const group of ['ui','syntax','headings'])for(const[token,v]of Object.entries(m[group])) {
    block=block.replace(new RegExp('('+token+':\\s*\\{ hex: ")[^"]+(", oklch: ")[^"]+(",\\s*rgb: )\\[[^\\]]+\\]'),(_,a,b,c)=>a+v.hex+b+v.oklch+c+JSON.stringify(v.rgb));
  }
  app=app.slice(0,start)+block+app.slice(end);
}
write('docs/app.js',app);
function ansi(m) {
  const u=m.ui,s=m.syntax;
  return [m.type==='dark'?u.bg_canvas.hex:u.bg_element.hex,s.type.hex,s.string.hex,s.number.hex,s.keyword.hex,s.function.hex,s.number.hex,u.text_primary.hex,u.text_faint.hex,m.headings.h3.hex,s.string.hex,m.headings.h1.hex,s.keyword.hex,s.property.hex,s.keyword.hex,u.text_primary.hex];
}
const schemes=[];
for(const[key,m]of Object.entries(spec.modes)) {
  const u=m.ui,a=ansi(m),name='Circadia — '+m.name;
  const terminalNames=['black','red','green','yellow','blue','purple','cyan','white','brightBlack','brightRed','brightGreen','brightYellow','brightBlue','brightPurple','brightCyan','brightWhite'];
  schemes.push({name,background:u.bg_canvas.hex,foreground:u.text_primary.hex,cursorColor:u.accent.hex,selectionBackground:u.bg_element.hex,...Object.fromEntries(terminalNames.map((k,i)=>[k,a[i]]))});
  const flavour=key==='light_parchment'?'light-parchment':key.replace('_','-');
  const kitty=`# ${name}\nbackground ${u.bg_canvas.hex}\nforeground ${u.text_primary.hex}\nselection_background ${u.bg_element.hex}\nselection_foreground ${u.text_primary.hex}\ncursor ${u.accent.hex}\ncursor_text_color ${u.bg_canvas.hex}\n\n# ANSI colors\n`+a.map((v,i)=>`color${i} ${v}`).join('\n')+'\n';
  const names=['black','red','green','yellow','blue','magenta','cyan','white'];
  const section=(label,values)=>`[colors.${label}]\n`+values.map((v,i)=>`${names[i]} = "${v}"`).join('\n')+'\n';
  const alacritty=`# ${name}\n[colors.primary]\nbackground = "${u.bg_canvas.hex}"\nforeground = "${u.text_primary.hex}"\n\n[colors.cursor]\ntext = "${u.bg_canvas.hex}"\ncursor = "${u.accent.hex}"\n\n[colors.selection]\ntext = "${u.text_primary.hex}"\nbackground = "${u.bg_element.hex}"\n\n`+section('normal',a.slice(0,8))+'\n'+section('bright',a.slice(8));
  for(const f of [flavour,...(key==='light_parchment'?['light']:key==='dark_ember'?['dark']:[])]){
    write(`ports/kitty/circadia-${f}.conf`,kitty);write(`ports/alacritty/circadia-${f}.toml`,alacritty);
  }
}
write('ports/windows-terminal/circadia-schemes.json',JSON.stringify({schemes},null,2)+'\n');
console.log('Synchronized documentation, Obsidian, Alacritty, Kitty, and Windows Terminal.');
