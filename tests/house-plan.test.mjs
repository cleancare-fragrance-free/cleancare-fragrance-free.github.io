import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const read = file => readFileSync(new URL('../' + file, import.meta.url), 'utf8');

test('overhead home plan offers six keyboard-accessible rooms and visible no-script checklists', () => {
  const plan = read('src/components/HomeSwapPlan.astro');
  for (const room of ['laundry','kitchen','bathroom','bedroom','living','entry']) assert.ok(plan.includes(`id:'${room}'`));
  for (const object of ['Washing machine','Dishwasher','Clothes & towels','Skin & body','Hair products','Cleaning cupboard']) assert.ok(plan.includes(object));
  assert.ok(plan.includes('<svg viewBox="0 0 600 510"'));
  assert.ok(plan.includes('<button type="button"'));
  assert.ok(plan.includes('aria-controls='));
  assert.ok(plan.includes('aria-pressed='));
  assert.ok(plan.includes('aria-live="polite"'));
  assert.ok(plan.includes("selectRoom('laundry')"));
  assert.ok(plan.includes('panel.hidden = panel.dataset.roomPanel !== id'));
  assert.ok(!plan.includes('role="tab"'));
  assert.ok(!plan.includes('hidden>'));
  assert.ok(plan.includes('Never mix cleaners'));
});

test('compact home introduction puts interactive floor plan before the remaining guide', () => {
  const home = read('src/pages/non-toxic-home.astro');
  assert.ok(home.indexOf('<HomeSwapPlan />') < home.indexOf('class="container definition-note"'));
  assert.ok(home.includes('href="#house-plan"'));
  assert.ok(home.includes('.home-hero{padding:24px 0}'));
});

test('why page opens with existing swaps illustration and distinguishes both exposure contexts', () => {
  const why = read('src/pages/why-fragrance-free.astro');
  assert.ok(why.indexOf('home-fragrance-free-swaps.webp') < why.indexOf('<FragranceBodyMap />'));
  assert.ok(why.includes('ON your body'));
  assert.ok(why.includes('IN your environment'));
  assert.ok(why.includes('Skin, hair and clothes'));
  assert.ok(why.includes('Cleaning products, dishwashing'));
  assert.ok(why.includes('AI-generated illustration'));
  assert.ok(why.includes('@media(max-width:760px)'));
});
