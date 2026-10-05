import {readdirSync,readFileSync} from 'node:fs';
import {join,relative} from 'node:path';
import assert from 'node:assert/strict';
const root='dist';
const files=dir=>readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?files(join(dir,e.name)):[join(dir,e.name)]);
const pages=files(root).filter(f=>f.endsWith('.html') && !f.endsWith('404.html'));
const titles=new Set(),descriptions=new Set(),canonicals=new Set();
for(const file of pages) {
  const html=readFileSync(file,'utf8');
  const title=html.match(/<title>(.*?)<\/title>/s)?.[1];
  const description=html.match(/<meta name="description" content="([^"]+)"/)?.[1];
  const canonical=html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  assert.ok(title && description && canonical,file+': missing metadata');
  assert.ok(!titles.has(title),file+': duplicate title');
  assert.ok(!descriptions.has(description),file+': duplicate description');
  assert.ok(!canonicals.has(canonical),file+': duplicate canonical');
  titles.add(title);descriptions.add(description);canonicals.add(canonical);
  assert.equal([...html.matchAll(/<h1(?:\s|>)/g)].length,1,file+': one main heading required');
  const schema=JSON.parse(html.match(/<script type="application\/ld\+json">([^<]+)<\/script>/)?.[1] || 'null');
  assert.equal(schema?.['@context'],'https://schema.org',file+': valid JSON-LD required');
  assert.ok(html.includes('property="og:image"'),file+': social image required');
}
const sitemap=readFileSync(join(root,'sitemap.xml'),'utf8');
const urls=[...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1]);
assert.equal(new Set(urls).size,urls.length,'Duplicate sitemap URL');
assert.deepEqual(new Set(urls),canonicals,'Sitemap must cover every indexable page exactly once');
console.log('Verified unique metadata, JSON-LD, social images, headings and sitemap coverage for '+pages.length+' indexable pages.');
