import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const source = path => readFileSync(new URL(path, import.meta.url), 'utf8');
test('history guide adds an original accessible visual timeline and labels companion sources', () => {
  const layout = source('../src/layouts/Article.astro');
  const timeline = source('../src/components/HistoryTimeline.astro');
  const guide = source('../src/pages/guides/history-of-fragrance.md');
  assert.match(layout, /entry\?\.slug === 'history-of-fragrance'.*HistoryTimeline/s);
  for (const term of ['Middle Ages', '1500s–1700s', '1800s', '1900s', 'Today', 'original CleanCare interpretation']) assert.ok(timeline.includes(term), term);
  assert.match(timeline, /<ol>/);
  assert.match(guide, /KGbhGFLH8Kg/);
  assert.match(guide, /fychemgroup\.com/);
  assert.match(guide, /not as independent historical or health evidence/);
});
