import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import products from '../src/data/product-catalog.mjs';
import additions from '../src/data/us-strategist-products.json' with {type:'json'};
import { matchesProduct } from '../src/lib/filter.mjs';
import { assertFragranceFreeCatalog, assertProductCatalog } from '../src/lib/product-policy.mjs';
import { defaultScentFilter, matchesScentProfile, normalizeScentFilter } from '../src/lib/scent-profile.mjs';
const alternative = products.find(p => p.id === 'real-purity-roll-on-essential-oils-us');
test('US roundup adds 15 fragrance-free formulas and one separated essential-oil alternative', () => {
  assert.equal(additions.length,16);
  assert.equal(products.filter(p => additions.some(a => a.id === p.id) && p.fragranceStatus === 'fragrance-free').length,15);
  assert.equal(new Set(products.map(p => p.id)).size, products.length);
  for (const item of products.filter(p => additions.some(a => a.id === p.id))) {
    assert.deepEqual(Object.keys(item.countries), ['US']);
    assert.equal(item.affiliateUrl,null);
    assert.equal(item.checked,'2026-10-05');
    assert.equal(new URL(item.officialUrl).search,'');
  }
  assert.doesNotThrow(() => assertProductCatalog(products));
  assert.throws(() => assertFragranceFreeCatalog([alternative]));
});
test('essential-oil alternatives require warnings and dated ingredient evidence', () => {
  for (const key of ['warning','claim','officialUrl','checked','essentialOilEvidence','essentialOilSource','essentialOilChecked','addedFragranceStatus']) {
    const invalid = {...alternative}; delete invalid[key];
    assert.throws(() => assertProductCatalog([invalid]), key);
  }
  assert.throws(() => assertProductCatalog([{...alternative,fragranceStatus:'fragranced'}]));
  assert.throws(() => assertProductCatalog([{...alternative,fragranceStatus:'fragrance-free'}]));
  assert.throws(() => assertProductCatalog([{...alternative,essentialOilStatus:'unknown'}]));
  assert.throws(() => assertProductCatalog([alternative,alternative]));
});
test('default results omit essential oils, including before JavaScript filtering', () => {
  assert.equal(defaultScentFilter,'fragrance-free');
  assert.equal(matchesScentProfile(alternative,defaultScentFilter),false);
  assert.equal(products.filter(p => matchesScentProfile(p,defaultScentFilter)).length,93);
  const directory = readFileSync(new URL('../src/pages/directory.astro',import.meta.url),'utf8');
  assert.ok(directory.includes('hidden={!matchesScentProfile(product, defaultScentFilter)}'));
  assert.ok(directory.includes('normalizeScentFilter(params.get(\'scent\'))'));
  assert.ok(directory.includes('scent.value = defaultScentFilter'));
  assert.ok(directory.includes('aria-describedby="scent-help"'));
  assert.ok(directory.includes('<option>Oral Care</option>'));
});
test('strict filter never treats unreviewed oils or devices as scent-free formulas', () => {
  const strict = products.filter(p => matchesScentProfile(p,'no-essential-oils'));
  assert.ok(strict.length > 10);
  assert.ok(strict.every(p => p.fragranceStatus === 'fragrance-free' && p.essentialOilStatus === 'none-listed'));
  const unknown = products.find(p => p.fragranceStatus === 'fragrance-free' && !p.essentialOilStatus);
  const device = products.find(p => p.category === 'Devices');
  assert.equal(matchesScentProfile(unknown,'no-essential-oils'),false);
  assert.equal(matchesScentProfile(unknown,'not-reviewed'),true);
  assert.equal(matchesScentProfile(device,'no-essential-oils'),false);
  assert.equal(matchesScentProfile(device,defaultScentFilter),true);
  assert.equal(matchesScentProfile(products.find(p => p.id === 'sofie-pavitt-omega-rich-moisturizer-us'),'no-essential-oils'),true);
});
test('scent combines with country, category and search rather than replacing them', () => {
  assert.deepEqual(products.filter(p => matchesProduct(p,{country:'US',scent:'essential-oils'})).map(p=>p.id),[alternative.id]);
  assert.equal(matchesProduct(alternative,{country:'US',scent:'essential-oils',category:'Skin & Body',query:'deodorant'}),true);
  for (const state of [{country:'SG',scent:'essential-oils'},{category:'Haircare',scent:'essential-oils'},{query:'toothpaste',scent:'essential-oils'}]) assert.equal(matchesProduct(alternative,state),false);
  assert.equal(matchesScentProfile(alternative,'all'),true);
  assert.equal(matchesScentProfile(alternative,'invalid'),false);
  for (const value of [null,'','invalid']) assert.equal(normalizeScentFilter(value),defaultScentFilter);
});
test('related product profiles keep scented alternatives separate', () => {
  const source = readFileSync(new URL('../src/pages/products/[slug].astro',import.meta.url),'utf8');
  assert.ok(source.includes("(p.fragranceStatus === 'essential-oils-only') === isEssentialOilAlternative"));
  assert.ok(source.includes('getScentLabel(product)'));
  assert.ok(source.includes('American Dental Association'));
});
