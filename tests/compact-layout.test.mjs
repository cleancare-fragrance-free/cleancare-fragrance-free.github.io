import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = path => readFileSync(new URL('../' + path, import.meta.url), 'utf8');

test('guides opt into compact cards without changing shared card defaults', () => {
  const guides = read('src/pages/guides/index.astro');
  assert.equal((guides.match(/compact\s*\/>/g) || []).length, 3);
  assert.ok(guides.includes('repeat(4,minmax(0,1fr))'));
  for (const component of ['ArticleCard', 'VideoCard']) {
    const card = read(`src/components/${component}.astro`);
    assert.ok(card.includes('compact = false'));
    assert.ok(card.includes('height:128px'));
    assert.ok(card.includes('compact={compact}'));
  }
  assert.ok(read('src/components/ArticleCard.astro').includes('.journal-card[hidden]'));
  assert.ok(guides.includes("addEventListener('change'"));
});

test('compact toolkit includes six category icons and retains accessible private progress', () => {
  const toolkit = read('src/pages/guides/fragrance-free-starter-toolkit.astro');
  assert.ok(toolkit.includes("['air', 'laundry', 'cleaning', 'skin', 'haircare', 'bag']"));
  assert.ok(toolkit.includes('grid-template-columns:repeat(2,minmax(0,1fr))'));
  assert.ok(toolkit.includes('@media(max-width:850px)'));
  assert.ok(toolkit.includes('Mark {step.title} complete'));
  assert.ok(toolkit.includes('aria-live="polite"'));
  assert.ok(toolkit.includes("'cleancare-toolkit-v1'"));
  assert.ok(toolkit.includes("'cleancare-toolkit-country'"));
  assert.ok(toolkit.includes('width:44px; height:44px'));
  assert.ok(!toolkit.includes('line-clamp'));
});
