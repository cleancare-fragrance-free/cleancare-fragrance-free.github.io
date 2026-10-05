import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { bodyEffects } from '../src/data/body-effects.mjs';

test('body map covers five symptom areas and a separate endocrine research marker', () => {
  assert.deepEqual(bodyEffects.map(effect => effect.id), ['head', 'eyes', 'nose', 'airways', 'skin', 'endocrine']);
  for (const effect of bodyEffects) {
    assert.equal(new URL(effect.source).hostname, effect.id === 'endocrine' ? 'www.niehs.nih.gov' : 'www.fda.gov');
    assert.ok(effect.text && effect.evidence && effect.title);
    assert.ok(effect.x > 0 && effect.x < 100 && effect.y > 0 && effect.y < 100);
  }
});

test('belly marker is not represented as a site of proven endocrine damage', () => {
  const effect = bodyEffects.find(effect => effect.id === 'endocrine');
  assert.equal(effect.x, 50);
  assert.ok(effect.y >= 50 && effect.y <= 58);
  assert.match(effect.text, /Hormones act throughout the body/);
  assert.match(effect.text, /not a site of proven damage/);
  assert.match(effect.evidence, /not a symptom or diagnosis/);
  const component = readFileSync(new URL('../src/components/FragranceBodyMap.astro', import.meta.url), 'utf8');
  assert.equal(component.split('Source: FDA · cosmetic allergens').length - 1,1);
  assert.ok(component.indexOf('Source: FDA · cosmetic allergens') > component.indexOf('<figcaption>'));
  assert.ok(!component.includes('body-research'));
});

test('body map provides accessible controls, static explanations and evidence limits', () => {
  const component = readFileSync(new URL('../src/components/FragranceBodyMap.astro', import.meta.url), 'utf8');
  for (const text of ['aria-controls=', 'aria-pressed=', '<details', '<summary', '<noscript>', 'summary?.focus', 'prefers-reduced-motion', 'NIEHS', 'FDA reports no safety concerns for DEP', 'does not establish that fragrance causes cancer, autism or ADHD', 'not a diagnostic tool']) {
    assert.ok(component.includes(text), text);
  }
  assert.ok(!bodyEffects.some(effect => /cancer|autism|ADHD|reproductive harm/.test(effect.title)));
  const page = readFileSync(new URL('../src/pages/why-fragrance-free.astro', import.meta.url), 'utf8');
  assert.ok(page.indexOf('<FragranceBodyMap />') < page.indexOf('class="container why-split"'));
});
