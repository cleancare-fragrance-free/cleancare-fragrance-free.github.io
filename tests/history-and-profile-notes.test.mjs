import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {articles} from '../src/data/articles.mjs';
import {celebrityStories} from '../src/data/celebrity-stories.mjs';
const source = path => readFileSync(new URL(path,import.meta.url),'utf8');

test('history is discoverable from Why Fragrance Free and the journal', () => {
  const entry = articles.find(article=>article.slug === 'history-of-fragrance');
  assert.equal(entry.title,'History of fragrance');
  assert.equal(entry.art,'history');
  assert.ok(source('../src/pages/why-fragrance-free.astro').includes("url('guides/history-of-fragrance/')"));
  const article = source('../src/pages/guides/history-of-fragrance.md');
  for (const term of ['Middle Ages','1500s–1700s','1868','1874','1900s','petrochemical','Manufacturing origin is not a toxicity test','DEP as currently used','essential oil is still fragrance']) assert.ok(article.includes(term),term);
  for (const host of ['museesdegrasse.com','pubs.rsc.org','acs.org','fda.gov']) assert.ok(article.includes(host),host);
  assert.ok(source('../src/components/ArticleVisual.astro').includes("kind === 'history'"));
});

test('all eight concern/opportunity points retain text and have decorative icons', () => {
  const page = source('../src/pages/why-fragrance-free.astro');
  assert.equal((page.match(/class="why-point"><span><EditorialIcon/g)||[]).length,8);
  assert.ok(source('../src/components/EditorialIcon.astro').includes('aria-hidden="true"'));
});

test('celebrity sources are checked interviews or quoted articles, not product links', () => {
  const expected = {
    'Miranda Kerr':'drhyman.com', 'Pharrell Williams':'www.harpersbazaar.com',
    'Jessica Alba':'www.glamourmagazine.co.uk', 'Rihanna':'www.vogue.com',
    'Selena Gomez':'time.com', 'Michelle Pfeiffer':'www.earwolf.com',
    'Kourtney Kardashian':'people.com',
  };
  for (const person of celebrityStories) {
    assert.equal(new URL(person.source).hostname, expected[person.name]);
    assert.ok(!/\/products?\/|\/collections\//.test(person.source));
    assert.ok(/interview|conversation|briefing|Show|Curious/.test(person.publisher),person.name);
  }
  assert.match(celebrityStories.find(p=>p.name === 'Selena Gomez').text,/not evidence/);
  assert.match(celebrityStories.find(p=>p.name === 'Rihanna').text,/not a fragrance-free endorsement/);
});

test('publisher and image notes move into accessible hover/focus and tap overlays', () => {
  const page = source('../src/pages/celebrity-stories.astro');
  const component = source('../src/components/ProfileSourceNotes.astro');
  assert.ok(!page.includes('<small>{person.publisher}</small>'));
  assert.ok(!page.includes('<small class="image-credit">'));
  assert.equal((page.match(/<ProfileSourceNotes/g)||[]).length,1);
  assert.equal((source('../src/pages/experts.astro').match(/<ProfileSourceNotes/g)||[]).length,1);
  for (const term of ['person.publisher','person.credit','person.licenseUrl','aria-controls','aria-expanded',':focus-within',':hover','data-notes-toggle','Escape','prefers-reduced-motion']) assert.ok(component.includes(term),term);
});
