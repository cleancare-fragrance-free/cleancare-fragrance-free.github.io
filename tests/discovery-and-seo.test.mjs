import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import products from '../src/data/product-catalog.mjs';
import {availableCountries,availableRegions,productCategories} from '../src/data/directory-markets.mjs';
import {guideTopics} from '../src/data/guide-topics.mjs';
import {articles} from '../src/data/articles.mjs';
import {makeBreadcrumbs,makeStructuredData} from '../src/lib/site-seo.mjs';
test('country and regional choices only include populated markets',()=>{
  assert.deepEqual(availableCountries.map(c=>c.code),['AU','NZ','SG','GB','US']);
  for(const country of availableCountries) assert.ok(products.some(p=>Object.hasOwn(p.countries,country.code)));
  for(const region of availableRegions) assert.ok(availableCountries.some(c=>c.region===region.code));
  for(const category of productCategories) assert.ok(products.filter(p=>p.category===category.category && p.fragranceStatus==='fragrance-free').length>=3);
});
test('topic hubs refer to existing articles and have meaningful collections',()=>{
  for(const topic of guideTopics) {
    assert.ok(topic.slugs.length>=3);
    assert.equal(new Set(topic.slugs).size,topic.slugs.length);
    for(const slug of topic.slugs) assert.ok(articles.some(a=>a.slug===slug),slug);
  }
});
test('breadcrumbs do not link to nonexistent intermediate collections',()=>{
  const crumbs=makeBreadcrumbs('/cleancare/directory/categories/haircare/','Haircare | CleanCare','/cleancare/');
  assert.deepEqual(crumbs.map(c=>c.path),['/cleancare/','/cleancare/directory/','/cleancare/directory/categories/haircare/']);
  assert.equal(makeBreadcrumbs('/','Home').length,0);
  assert.equal(makeBreadcrumbs('/404.html','Not found').length,0);
});
test('structured data uses an honest editorial author without invented dates or endorsements',()=>{
  const schema=makeStructuredData({site:'https://example.org/',canonical:'https://example.org/guides/test/',title:'Test | CleanCare',description:'Test description',image:'https://example.org/image.webp',article:{}});
  const article=schema['@graph'].find(item=>item['@type']==='BlogPosting');
  assert.equal(article.author['@type'],'Organization');
  assert.equal(article.author.name,'CleanCare editorial');
  assert.ok(!('datePublished' in article));assert.ok(!('dateModified' in article));
  assert.ok(!/reviewedBy|aggregateRating|MedicalOrganization/.test(JSON.stringify(schema)));
});
test('directory progressively reveals deduplicated profiles and experts have a separate page',()=>{
  const directory=readFileSync(new URL('../src/pages/directory.astro',import.meta.url),'utf8');
  assert.ok(directory.includes('visibleLimit = 12') || directory.includes('visibleLimit=12'));
  assert.ok(!directory.includes('country-group'));
  assert.ok(directory.includes('availableCountries'));
  const layout=readFileSync(new URL('../src/layouts/Layout.astro',import.meta.url),'utf8');
  assert.ok(layout.includes("url('experts/')"));
  assert.ok(layout.includes('aria-expanded'));assert.ok(layout.includes('application/ld+json'));
});
