import test from 'node:test';
import assert from 'node:assert/strict';
import sukin from '../src/data/sukin-products.mjs';
import { assertProductCatalog, assertFragranceFreeCatalog } from '../src/lib/product-policy.mjs';
import { matchesScentProfile, getScentLabel, normalizeScentFilter } from '../src/lib/scent-profile.mjs';
import { matchesProduct } from '../src/lib/filter.mjs';

test('all ten Sukin best sellers are separate naturally scented US profiles', () => {
  assert.equal(sukin.length, 10);
  assert.equal(new Set(sukin.map(p => p.id)).size, 10);
  assert.doesNotThrow(() => assertProductCatalog(sukin));
  assert.throws(() => assertFragranceFreeCatalog(sukin));
  for (const product of sukin) {
    assert.equal(product.fragranceStatus, 'naturally-scented');
    assert.deepEqual(Object.keys(product.countries), ['US']);
    assert.equal(product.affiliateUrl, null);
    assert.ok(product.image.startsWith('https://cdn.shopify.com/'));
    assert.ok(product.officialUrl.startsWith('https://sukinnaturals.com/products/'));
    assert.match(getScentLabel(product), /brand claim/);
    assert.equal(matchesScentProfile(product, 'fragrance-free'), false);
    assert.equal(matchesScentProfile(product, 'no-essential-oils'), false);
    assert.equal(matchesScentProfile(product, 'not-reviewed'), false);
    assert.equal(matchesScentProfile(product, 'naturally-scented'), true);
    assert.equal(matchesScentProfile(product, 'all'), true);
    assert.equal(matchesProduct(product, {country:'GB', scent:'naturally-scented'}), false);
  }
  assert.equal(sukin.filter(p => matchesScentProfile(p, 'essential-oils')).length, 6);
  assert.equal(sukin.filter(p => matchesProduct(p, {country:'US',category:'Skin & Body',scent:'naturally-scented'})).length, 5);
  assert.equal(normalizeScentFilter('naturally-scented'), 'naturally-scented');
});

test('natural-scent claims require sources, review evidence and warnings', () => {
  for (const key of ['naturalFragranceSource', 'naturalFragranceChecked', 'scentEvidence', 'claim', 'checked', 'officialUrl', 'warning']) {
    const invalid = {...sukin[0]}; delete invalid[key];
    assert.throws(() => assertProductCatalog([invalid]), key);
  }
});
