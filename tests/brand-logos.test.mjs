import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import products from '../src/data/product-catalog.mjs';
import { brandLogos, getBrandLogo, brandInitials } from '../src/data/brand-logos.mjs';

test('every catalogue brand has an explicitly reviewed logo or fallback', () => {
  assert.deepEqual(Object.keys(brandLogos).sort(), [...new Set(products.map(p=>p.brand))].sort());
  for (const logo of Object.values(brandLogos)) {
    if (!logo.file) { assert.equal(logo.image, null); continue; }
    assert.ok(logo.source.startsWith('https://'));
    assert.ok(existsSync(new URL('../public/'+logo.image, import.meta.url)), logo.file);
    assert.match(logo.file, /^[a-z0-9-]+\.(svg|png|gif|jpg|ico)$/);
    assert.ok(!/clearbit|google.com\/s2/i.test(logo.source));
  }
});

test('unknown or inaccessible brands have readable initials, never a fabricated logo', () => {
  assert.equal(getBrandLogo('Unknown brand'), null);
  assert.equal(getBrandLogo('SEEN').image, null);
  assert.equal(brandInitials('  Paula’s Choice  '), 'PC');
});

test('directory uses the shorter title and shared logos in both brand views', () => {
  const page=readFileSync(new URL('../src/pages/directory.astro', import.meta.url),'utf8');
  assert.ok(page.includes('<h1>Go Fragrance Free.</h1>'));
  assert.ok(!page.includes('Here are the options'));
  assert.ok(page.includes('<BrandLogo brand={brand}/>'));
  assert.ok(page.includes('mark.dataset.brandName!==activeBrand'));
  const component=readFileSync(new URL('../src/components/BrandLogo.astro', import.meta.url),'utf8');
  assert.ok(component.includes("image.addEventListener('error', showFallback"));
  assert.ok(component.includes('object-fit:contain'));
});
