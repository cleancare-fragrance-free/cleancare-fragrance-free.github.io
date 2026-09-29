import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { matchesProduct } from '../src/lib/filter.mjs';
const products = JSON.parse(readFileSync(new URL('./fixtures/sample-products.json', import.meta.url), 'utf8'));
test('sample IDs are unique and every country is supported', () => {
  assert.equal(new Set(products.map(p => p.id)).size, products.length);
  for (const p of products) { assert.ok(p.title && p.description && p.sample); assert.ok(Object.keys(p.countries).length); assert.ok(Object.keys(p.countries).every(r => ['US','GB','SG','AU'].includes(r))); }
});
test('search matches words across fields without case sensitivity', () => {
  assert.deepEqual(products.filter(p => matchesProduct(p, { query: '  LIQUID dye-free ' })).map(p => p.id), ['laundry-liquid']);
});
test('category and country intersect with search', () => {
  assert.deepEqual(products.filter(p => matchesProduct(p, { category: 'Skin & Body', country: 'US', query: 'cleanser' })).map(p => p.id), ['daily-cleanser']);
  assert.equal(products.filter(p => matchesProduct(p, { category: 'Skin & Body', country: 'US', query: 'lotion' })).length, 0);
});
test('empty filters restore all samples and unknown terms return none', () => {
  assert.equal(products.filter(p => matchesProduct(p)).length, 6);
  assert.equal(products.filter(p => matchesProduct(p, { query: '<script>' })).length, 0);
});
