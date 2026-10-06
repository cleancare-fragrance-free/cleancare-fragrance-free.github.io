import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync, readdirSync} from 'node:fs';
import products from '../src/data/product-catalog.mjs';

test('product profiles omit country and check-date badges without losing records', () => {
  const page = readFileSync(new URL('../src/pages/products/[slug].astro', import.meta.url), 'utf8');
  assert.ok(!page.includes('checkedCountries'));
  assert.ok(!page.includes('product.checked'));
  assert.ok(!page.includes('product.essentialOilChecked'));
  assert.ok(!page.includes('product.countryNote'));
  assert.ok(page.includes('Object.entries(product.countries)'));
  assert.ok(page.includes('getScentLabel(product)'));
  assert.ok(products.every(product => product.checked && Object.keys(product.countries).length));
});

test('site-wide source check-date notes are removed, but country filters remain', () => {
  for (const folder of ['src/pages/', 'src/components/']) {
    const base = new URL('../'+folder, import.meta.url);
    for (const file of readdirSync(base, {recursive:true}).filter(file=>/\.(astro|md)$/.test(file))) {
      const page = readFileSync(new URL(file.replaceAll('\\','/'), base), 'utf8');
      assert.doesNotMatch(page, /(?:sources? (?:checked|reviewed)|featured order checked) (?:\d{1,2} |January|February|March|April|May|June|July|August|September|October|November|December)/i, file);
    }
  }
  const directory = readFileSync(new URL('../src/pages/directory.astro', import.meta.url), 'utf8');
  assert.ok(directory.includes('id="country"'));
  assert.ok(directory.includes('id="category"'));
});
