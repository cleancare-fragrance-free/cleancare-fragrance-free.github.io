import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = path => readFileSync(new URL('../' + path, import.meta.url), 'utf8');

test('editorial palette and font are defined centrally', () => {
  const css = read('src/styles/global.css');
  for (const color of ['#FBF9F6', '#FFFFFF', '#333333', '#6B7280', '#7A9A8B', '#E8F3F8', '#EFEBE4', '#F4A261']) {
    assert.ok(css.includes(color), color);
  }
  const layout = read('src/layouts/Layout.astro');
  assert.ok(layout.includes('family=Plus+Jakarta+Sans'));
  assert.ok(layout.includes('display=swap'));
});

test('article card keeps the requested structure and motion safeguards', () => {
  const card = read('src/components/ArticleCard.astro');
  assert.ok(card.includes('<a class="journal-card"'));
  assert.ok(card.includes('<h3 id={titleId}>'));
  assert.ok(card.includes('article-badge'));
  assert.ok(card.includes('By ${article.author'));
  assert.ok(card.includes('article.sourceName'));
  assert.ok(card.includes('height: 220px'));
  assert.ok(card.includes('padding: 24px'));
  assert.ok(card.includes('translateY(-6px)'));
  assert.ok(card.includes('scale(1.04)'));
  assert.ok(card.includes('prefers-reduced-motion: reduce'));
  assert.ok(card.includes('-webkit-line-clamp: 3'));
  assert.ok(read('src/styles/journal.css').includes('minmax(min(100%, 320px), 1fr)'));
});
