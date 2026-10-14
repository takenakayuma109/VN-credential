#!/usr/bin/env node
// v2 page QA: renders each page in headless Chrome at 1280x720, saves a PNG,
// and reports (a) any visible text smaller than 15px, (b) elements that
// overflow the slide or clip their own text, (c) broken images.
// Usage: node scripts/v2/qa.js [--en] p02 p03 ...   (or no args = all pages)
// Output: scripts/v2/out/<page>.png + console report.
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = path.resolve(__dirname, '../..');
const EN = process.argv.includes('--en');
const PAGES = path.join(ROOT, EN ? 'src/v2/pages_en' : 'src/v2/pages');
const OUT = path.join(__dirname, EN ? 'out_en' : 'out');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
fs.mkdirSync(OUT, { recursive: true });

const head = fs.readFileSync(path.join(ROOT, 'src/v2/head.txt'), 'utf8');
const css = fs.readFileSync(path.join(ROOT, 'src/v2/v2css.txt'), 'utf8');
const base = `<base href="file://${path.join(ROOT, 'assets')}/">`;

const CHECK = `<script>
(async function(){
  try{ await document.fonts.ready; }catch(e){}
  await new Promise(r=>setTimeout(r,1500));
  const out=[]; const S=document.querySelector('.slide');
  const SR=S?S.getBoundingClientRect():{left:0,top:0,right:1280,bottom:720};
  const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
  const small=new Map();
  while(walker.nextNode()){
    const t=walker.currentNode; if(!t.textContent.trim())continue;
    const el=t.parentElement; if(!el||el.closest('script,style,#qa'))continue;
    const cs=getComputedStyle(el); if(cs.visibility==='hidden'||cs.display==='none'||+cs.opacity===0)continue;
    const fs=parseFloat(cs.fontSize);
    if(fs<15){const k=fs+'px: '+t.textContent.trim().slice(0,30); small.set(k,1);}
    const r=document.createRange(); r.selectNodeContents(t); const b=r.getBoundingClientRect();
    if(b.width&&(b.right>SR.right+1||b.bottom>SR.bottom+1||b.left<SR.left-1||b.top<SR.top-1))
      out.push('OFF-CANVAS text: '+t.textContent.trim().slice(0,30));
  }
  small.forEach((v,k)=>out.push('SMALL '+k));
  document.querySelectorAll('.slide *').forEach(el=>{
    const cs=getComputedStyle(el);
    if((cs.overflow==='hidden'||cs.overflowY==='hidden')&&el.scrollHeight>el.clientHeight+2&&el.textContent.trim()&&!el.classList.contains('ph')&&!el.querySelector('img'))
      out.push('CLIPPED text box <'+el.tagName.toLowerCase()+' class="'+el.className+'">: '+el.textContent.trim().slice(0,30));
  });
  document.querySelectorAll('img').forEach(im=>{ if(!im.complete||im.naturalWidth===0) out.push('BROKEN IMG '+im.getAttribute('src')); });
  if(location.hash==='#crop') document.querySelectorAll('img').forEach(im=>{
    if(!im.naturalWidth) return; const cs=getComputedStyle(im); if(cs.objectFit!=='cover') return;
    const b=im.getBoundingClientRect(); if(!b.width||!b.height) return;
    const ia=im.naturalWidth/im.naturalHeight, ba=b.width/b.height;
    const keep=Math.min(ia,ba)/Math.max(ia,ba); const loss=Math.round((1-keep)*100);
    if(loss>=20) out.push('CROP '+loss+'% '+(ia>ba?'(sides)':'(top/bottom)')+' '+im.getAttribute('src').split('/').pop());
  });
  const pre=document.createElement('pre'); pre.id='qa'; pre.style.display='none';
  pre.textContent='QA_BEGIN\\n'+(out.length?out.join('\\n'):'OK')+'\\nQA_END'; document.body.appendChild(pre);
})();
</script>`;

const CROP = process.argv.includes('--crop');
const args = process.argv.slice(2).filter((a) => a !== '--en' && a !== '--crop');
const files = (args.length ? args.map((a) => a.replace(/\.txt$/, '') + '.txt') : fs.readdirSync(PAGES).filter((f) => /^p\d+\.txt$/.test(f)).sort());
let bad = 0;
for (const f of files) {
  const src = fs.readFileSync(path.join(PAGES, f), 'utf8');
  let html = src.replace('<!--V2HEAD-->', `${base}${head}<style>${css}</style>`);
  html = html.replace(/\{\{ref:p\d+\}\}/g, 'P.00').replace('</body>', `${CHECK}</body>`);
  const name = f.replace('.txt', '');
  const tmp = path.join(OUT, `${name}.html`);
  fs.writeFileSync(tmp, html);
  const flags = ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--allow-file-access-from-files', '--window-size=1280,720', '--virtual-time-budget=9000'];
  try {
    execFileSync(CHROME, [...flags, `--screenshot=${path.join(OUT, name + '.png')}`, `file://${tmp}`], { stdio: 'ignore', timeout: 60000 });
    const dom = execFileSync(CHROME, [...flags, '--dump-dom', `file://${tmp}${CROP ? '#crop' : ''}`], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'], timeout: 60000, maxBuffer: 64 * 1024 * 1024 });
    const m = dom.match(/QA_BEGIN\n([\s\S]*?)\nQA_END/);
    const rep = m ? m[1] : 'QA script did not finish';
    if (rep !== 'OK') bad++;
    console.log(`== ${name}: ${rep === 'OK' ? 'OK' : '\n' + rep}`);
  } catch (e) {
    bad++;
    console.log(`== ${name}: RENDER FAILED ${e.message}`);
  }
}
console.log(`\n${files.length} page(s), ${bad} with issues. PNGs in ${OUT}`);
