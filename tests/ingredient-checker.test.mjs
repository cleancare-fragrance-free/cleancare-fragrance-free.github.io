import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { analyzeIngredients, parseIngredientList, screeningRules } from '../src/lib/ingredient-checker.mjs';
import { makeBreadcrumbs } from '../src/lib/site-seo.mjs';

test('ingredient checker belongs to fragrance-free products in navigation and page hierarchy', () => {
  const read = file => readFileSync(new URL('../' + file, import.meta.url), 'utf8');
  const layout = read('src/layouts/Layout.astro');
  const started = layout.slice(layout.indexOf('<summary>Get started</summary>'), layout.indexOf('<summary>Read & watch</summary>'));
  const products = layout.slice(layout.indexOf('<summary>Fragrance Free Products</summary>'), layout.indexOf('<summary>About Us</summary>'));
  assert.ok(!started.includes("url('ingredient-checker/')"));
  assert.ok(products.includes("url('ingredient-checker/')"));
  const page = read('src/pages/ingredient-checker.astro');
  assert.ok(page.includes('Fragrance-free products · private, in-browser tool'));
  assert.ok(!page.includes('breadcrumbs={'));
  assert.ok(read('src/pages/directory.astro').includes("url('ingredient-checker/')"));
  const crumbs = makeBreadcrumbs('/ingredient-checker/', 'Ingredient Checker | CleanCare');
  assert.equal(crumbs[1].name, 'Fragrance-free products');
  assert.equal(crumbs[1].path, '/directory/');
});

test('ingredient checker recognizes exact fragrance and selected essential-oil labels', () => {
  const result = analyzeIngredients('Water, Glycerin, Parfum, Lavandula angustifolia oil, Sodium Hyaluronate');
  assert.equal(result.count, 5);
  assert.deepEqual(result.matches.map(item => item.id), ['fragrance', 'essential-oil']);
  assert.deepEqual(result.matches[0].matches, ['Parfum']);
  assert.deepEqual(result.matches[1].matches, ['Lavandula angustifolia oil']);
});

test('ingredient checker flags selected lipid terms as possible screening matches, not diagnoses', () => {
  const result = analyzeIngredients('Aqua; Oleic Acid\nDimethicone, Olive Oil');
  assert.equal(result.count, 4);
  assert.equal(result.matches.length, 1);
  assert.deepEqual(result.matches[0].matches, ['Oleic Acid', 'Olive Oil']);
  assert.ok(result.matches[0].label.includes('Potential'));
});

test('ingredient checker normalizes case and surrounding whitespace without claiming broad coverage', () => {
  assert.deepEqual(parseIngredientList(' Aqua,  Parfum ;\n Water '), ['Aqua', 'Parfum', 'Water']);
  assert.equal(analyzeIngredients('Aqua, parfum').matches[0].id, 'fragrance');
  assert.ok(screeningRules.length > 2);
});

test('checker page discloses limitations and offers a broader fungal-acne resource', () => {
  const page = readFileSync(new URL('../src/pages/ingredient-checker.astro', import.meta.url), 'utf8');
  assert.ok(page.includes('not diagnose'));
  assert.ok(page.includes('not saved or sent anywhere'));
  assert.ok(page.includes('https://skinsort.com/fungal-acne-checker'));
  assert.ok(page.includes('dermnetnz.org/topics/malassezia-folliculitis'));
  assert.ok(!page.includes('fetch('));
});

test('checker explains why Malassezia screening is separate from fragrance screening', () => {
  const page = readFileSync(new URL('../src/pages/ingredient-checker.astro', import.meta.url), 'utf8');
  const context = page.slice(page.indexOf('<section class="ingredient-context"'), page.indexOf('<form id="ingredient-form"'));
  assert.ok(context.includes('Why also check for Malassezia folliculitis?'));
  assert.ok(context.includes('not ordinary acne'));
  assert.ok(context.includes('separate concern from fragrance allergy'));
  assert.ok(context.includes('not to suggest that fragrance causes it'));
  assert.ok(context.includes('not proven triggers'));
  assert.ok(context.includes('a flag cannot predict a flare'));
  assert.ok(context.includes('dermnetnz.org/topics/malassezia-folliculitis'));
  assert.ok(context.includes('pubmed.ncbi.nlm.nih.gov/34304284/'));
  assert.ok(page.includes('Mayser &amp; Koch, 2021'));
});
