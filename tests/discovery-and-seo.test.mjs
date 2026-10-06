import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import products from '../src/data/product-catalog.mjs';
import {availableCountries,availableRegions,productCategories} from '../src/data/directory-markets.mjs';
import {guideTopics} from '../src/data/guide-topics.mjs';
import {articles} from '../src/data/articles.mjs';
import {makeBreadcrumbs,makeStructuredData} from '../src/lib/site-seo.mjs';
test('country and regional choices only include populated markets',()=>{
  assert.deepEqual(availableCountries.map(c=>c.code),['AU','FR','JP','NZ','SG','GB','US']);
  for(const country of availableCountries) assert.ok(products.some(p=>Object.hasOwn(p.countries,country.code)));
  for(const region of availableRegions) assert.ok(availableCountries.some(c=>c.region===region.code));
  for(const category of productCategories) assert.ok(products.filter(p=>p.category===category.category && p.fragranceStatus==='fragrance-free').length>=3);
});
test('topic hubs refer to existing articles and have meaningful collections',()=>{
  for(const topic of guideTopics) {
    assert.ok(topic.slugs.length>=(topic.language ? 1 : 3));
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
test('product directory opens from category icons to brand collections',()=>{
  const directory=readFileSync(new URL('../src/pages/directory.astro',import.meta.url),'utf8');
  const card=readFileSync(new URL('../src/components/ProductCard.astro',import.meta.url),'utf8');
  assert.match(directory,/<h1>Go Fragrance Free\.<\/h1>/);
  assert.ok(directory.includes('class="category-shortcuts"'));
  assert.ok(directory.includes('data-category-shortcut={group.category}'));
  assert.ok(directory.includes('data-brand-choice={brand}'));
  assert.ok(directory.includes('data-brand-category={group.category}'));
  assert.ok(directory.includes('data-brand-products') || directory.includes('selected-brand-title'));
  assert.ok(directory.includes("const matchingBrands = [...new Set(matchingProducts.map(product=>product.brand))]"));
  assert.ok(directory.includes("product.brand===activeBrand"));
  assert.ok(!card.includes('countryNote') && !card.includes('essentialOilSource') && !card.includes('checked'));
  assert.ok(!card.includes('source checked'));
});
test('country selection sits beside category in the main filter form',()=>{
  const directory=readFileSync(new URL('../src/pages/directory.astro',import.meta.url),'utf8');
  const form=directory.slice(directory.indexOf('<form id="filters"'),directory.indexOf('</form>'));
  assert.match(form,/<label>Country<select name="country" id="country">/);
  assert.ok(form.indexOf('id="country"')<form.indexOf('id="category"'));
  assert.ok(!directory.includes('country-buttons'));
  assert.ok(directory.includes("if (selectedCountry) selectedRegion = countries.find(country => country.code === selectedCountry)!.region"));
});
