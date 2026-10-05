import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';
const root = 'dist';
function files(dir) { return readdirSync(dir,{withFileTypes:true}).flatMap(entry => entry.isDirectory() ? files(join(dir,entry.name)) : [join(dir,entry.name)]); }
const errors = [];
const htmlFiles = files(root).filter(file => file.endsWith('.html'));
for (const file of htmlFiles) {
 const pagePath = relative(root,file).replaceAll('\\','/').replace(/index\.html$/,'');
 const html = readFileSync(file,'utf8');
 for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
  const link = match[1].replaceAll('&amp;','&');
  if (/^(https?:|data:|mailto:|tel:)/.test(link)) continue;
  const target = new URL(link,'https://local.invalid/' + pagePath);
  const path = join(root,decodeURIComponent(target.pathname));
  if (!existsSync(path) && !existsSync(join(path,'index.html'))) errors.push({file,link});
  else if (target.hash) {
    const destination = path.endsWith('.html') ? path : join(path,'index.html');
    if (existsSync(destination)) {
      const id = decodeURIComponent(target.hash.slice(1));
      const targetHtml = readFileSync(destination,'utf8');
      if (![...targetHtml.matchAll(/id="([^"]+)"/g)].some(match => match[1] === id)) errors.push({file,link,reason:'Missing fragment'});
    }
  }
 }
}
if (errors.length) { console.error(errors); process.exitCode=1; }
else console.log('Checked local links, fragments and assets across ' + htmlFiles.length + ' HTML pages: no missing targets.');
