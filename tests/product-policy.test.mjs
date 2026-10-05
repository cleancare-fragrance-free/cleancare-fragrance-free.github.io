import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { assertFragranceFreeCatalog } from '../src/lib/product-policy.mjs';

const products = JSON.parse(readFileSync(new URL('../src/data/products.json', import.meta.url), 'utf8'));

test('published catalogue excludes fragranced and unconfirmed products', () => {
  assert.doesNotThrow(() => assertFragranceFreeCatalog(products));
  for (const id of [
    'green-kulture-laundry-liquid-bundle', 'sukin-botanical-body-wash-sg',
    'sukin-natural-balance-shampoo-sg', 'k18-airwash-dry-shampoo-4oz-us',
    'gillette-venus-cleanser-shave-gel-us',
  ]) assert.ok(!products.some(product => product.id === id), id);
  assert.ok(products.every(product => !product.warning));
});

test('missing, unknown and fragranced statuses block publication', () => {
  for (const fragranceStatus of [undefined, 'unknown', 'fragranced', 'essential-oils-only']) {
    assert.throws(() => assertFragranceFreeCatalog([{ ...products[0], fragranceStatus }]), /confirm a fragrance-free formula/);
  }
});

test('reviewed formulas require source evidence; only devices may be not applicable', () => {
  for (const key of ['claim', 'officialUrl', 'checked']) {
    assert.throws(() => assertFragranceFreeCatalog([{ ...products[0], [key]: '' }]));
  }
  assert.throws(() => assertFragranceFreeCatalog([{ ...products[0], fragranceStatus: 'not-applicable' }]));
  const device = products.find(product => product.category === 'Devices');
  assert.equal(device.fragranceStatus, 'not-applicable');
  assert.doesNotThrow(() => assertFragranceFreeCatalog([device]));
});
