import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

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

