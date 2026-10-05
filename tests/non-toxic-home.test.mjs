import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { existsSync, statSync } from 'node:fs';

const source = readFileSync(new URL('../src/pages/non-toxic-home.astro', import.meta.url), 'utf8');

test('non-toxic home guide includes core methods and safety boundaries', () => {
  for (const phrase of ['White vinegar', 'Baking soda', 'Washing soda', 'Borax', 'Never mix cleaning products', 'not a reliable general-purpose disinfectant', 'Cleaning is not disinfecting']) {
    assert.ok(source.includes(phrase), phrase);
  }
  assert.ok(source.includes('epa.gov/saferchoice'));
  assert.ok(source.includes('epa.gov/indoor-air-quality'));
});

test('non-toxic home guide includes requested reading and practical pathways', () => {
  for (const phrase of ['Clean &amp; Green', 'The Borax Home &amp; Garden Handbook', 'homesandgardens.com/solved/cleaning-books', 'fragrance-free-starter-toolkit', 'directory/']) {
    assert.ok(source.includes(phrase), phrase);
  }
});

test('illustrated home reset has three real local assets and accessible summaries', () => {
  for (const name of ['home-fragrance-free-swaps', 'home-cleaner-air-habits', 'home-simple-cleaning-safety']) {
    const asset = new URL('../public/images/editorial/' + name + '.webp', import.meta.url);
    assert.ok(source.includes(name + '.webp'));
    assert.ok(existsSync(asset), name);
    assert.ok(statSync(asset).size > 1000 && statSync(asset).size < 500000, name);
  }
  for (const text of ['guide.alt', 'guide.text', 'Open the full', 'Original AI-generated illustrations', 'object-fit:contain', 'prefers-reduced-motion']) assert.ok(source.includes(text), text);
  assert.ok(source.includes('id="ingredient-guide"'));
  assert.ok(source.includes('when outdoor air is suitable'));
});
