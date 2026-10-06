import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const source = readFileSync(new URL('../src/pages/we-share-the-air.astro', import.meta.url), 'utf8');

test('We Share the Air has a ready-to-print resource gallery', () => {
  assert.ok(source.includes('Ready to print'));
  assert.ok(source.includes('Posters, decals &amp; letters.'));
  assert.ok(source.includes('not a reproduction of the original'));
  assert.ok(source.includes("type:'PDF poster'"));
  assert.ok(source.includes("type:'PDF decal'"));
  assert.ok(source.includes("type:'Word template'"));
  assert.equal((source.match(/previewLines:/g) || []).length, 4);
  assert.match(source, /class="print-preview" aria-hidden="true"/);
});

test('We Share the Air hero shows an accessible printer-and-poster image', () => {
  assert.ok(source.includes("url('images/we-share-the-air-printing-poster.png')"));
  assert.match(source, /alt="A white desktop printer printing a pale green shared-air poster"/);
  assert.match(source, /class="printer-poster" aria-hidden="true">We share/);
  assert.ok(source.includes('Print a practical request for cleaner shared air.'));
  assert.match(source, /\.share-illustration img\{display:block;width:100%;aspect-ratio:1\.38/);
});

test('printable-resource previews are styled as compact, responsive paper representations', () => {
  assert.match(source, /\.share-resource-grid \.print-resource\{display:flex;min-height:362px/);
  assert.match(source, /\.print-preview\{position:relative;display:flex;min-height:137px/);
  assert.match(source, /\.print-resource--decal \.print-preview::before\{inset:23px 12px/);
  assert.match(source, /\.print-resource--letter \.print-preview\{align-items:flex-start/);
  assert.ok(source.includes('@media(max-width:560px){.share-hero{padding:44px 0}.share-resource-grid{grid-template-columns:1fr}'));
});
