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

test('symptom guide uses the exact requested questions and gives category-level, non-diagnostic next steps', () => {
  const guide = read('../src/components/SymptomProductGuide.astro');
  const symptomQuestion = questions.find(question => question.id === 'symptoms');
  const options = symptomQuestion.options;
  assert.equal(options.length, 12);
  assert.match(guide, /When you are in contact with fragrances \(skin, air, clothes\)\.\.\.which of these have you noticed\?/);
  for (const text of ['headaches, lightheaded or migraine episodes', 'itchy, irritated skin or a rash', 'eyes feel itchy, red, watery, or irritated', 'runny or stuffy nose, or sneeze', 'irritated or sore throat', 'Do you cough?', 'Do you wheeze, feel chest tightness, or become short of breath?', 'Do you feel nauseated?', 'mentally foggy and irritable mood', 'None of these symptoms', 'All of them', 'I’m not sure']) assert.ok(options.some(([, label]) => label.includes(text)), text);
  assert.match(guide, /symptomOptions\.map/);
  assert.match(guide, /summaryOptions\.map/);
  assert.match(guide, /selected\.includes\('all'\)/);
  for (const path of ['air', 'skin', 'fabrics', 'cleaning', 'hair']) assert.match(guide, new RegExp(`data-symptom-path="${path}"`));
  assert.match(guide, /not treatment advice/);
  assert.match(guide, /does not say a product caused your symptoms/);
  assert.match(guide, /Do not deliberately re-expose/);
});
