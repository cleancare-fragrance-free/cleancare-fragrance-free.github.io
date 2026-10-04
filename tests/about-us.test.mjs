import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const source = readFileSync(new URL('../src/pages/about-us.astro', import.meta.url), 'utf8');

test('about page presents lived experience without turning it into universal proof', () => {
  for (const phrase of ['became sensitive to synthetic fragrances', 'similar sensitivity within my family', 'noticed a clear improvement', 'does not prove that fragrance caused every symptom', 'not a universal diagnosis']) {
    assert.ok(source.includes(phrase), phrase);
  }
});

test('about page connects the story to evidence, solutions and advocacy', () => {
  for (const phrase of ['Follow the documentation', 'Make change practical', 'Advocate for shared air', 'fragrance-free-starter-toolkit', 'Follow the sources']) {
    assert.ok(source.includes(phrase), phrase);
  }
});
