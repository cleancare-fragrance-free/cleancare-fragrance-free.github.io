import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { questions } from '../src/lib/self-check.mjs';

const read = path => readFileSync(new URL(path, import.meta.url), 'utf8');

test('symptoms are a dedicated Why fragrance free page with an accessible parent path', () => {
  const page = read('../src/pages/why-fragrance-free/symptoms.astro');
  const layout = read('../src/layouts/Layout.astro');
  const why = read('../src/pages/why-fragrance-free.astro');
  assert.match(page, /SymptomProductGuide/);
  assert.match(page, /why-fragrance-free\/symptoms/);
  assert.match(layout, /why-fragrance-free\/symptoms\/.*>Symptoms</);
  assert.match(why, /why-fragrance-free\/symptoms/);
});

test('symptom guide keeps ten question checkboxes and gives category-level, non-diagnostic next steps', () => {
  const guide = read('../src/components/SymptomProductGuide.astro');
  const options = questions.find(question => question.id === 'symptoms').options.filter(([id]) => !['none', 'unsure'].includes(id));
  assert.equal(options.length, 10);
  for (const text of ['headaches or migraine', 'itchy, irritated skin', 'runny or stuffy nose', 'Do you wheeze', 'difficulty concentrating']) assert.ok(options.some(([, label]) => label.includes(text)));
  assert.match(guide, /symptomOptions\.map/);
  for (const path of ['air', 'skin', 'fabrics', 'cleaning', 'hair']) assert.match(guide, new RegExp(`data-symptom-path="${path}"`));
  assert.match(guide, /not treatment advice/);
  assert.match(guide, /does not say a product caused your symptoms/);
  assert.match(guide, /Do not deliberately re-expose/);
});
