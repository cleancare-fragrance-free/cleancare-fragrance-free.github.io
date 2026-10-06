import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { articles } from '../src/data/articles.mjs';
const source = file => readFileSync(new URL('../'+file, import.meta.url), 'utf8');

test('editorial and medical disclosure remains visible at the bottom of guide and featured pages', () => {
  for (const file of ['src/layouts/Article.astro', 'src/pages/featured/[slug].astro']) {
    const page = source(file);
    const header = page.slice(page.indexOf('<header'), page.indexOf('</header>'));
    assert.ok(!header.includes('AI-assisted educational writing'));
    assert.ok(!header.includes('<ArticleDisclosure'));
    assert.ok(page.lastIndexOf('<ArticleDisclosure') > page.lastIndexOf('<ArticleCard'));
    assert.ok(page.includes('not a') || page.includes('not an individual diagnosis'));
  }
  const disclosure = source('src/components/ArticleDisclosure.astro');
  assert.ok(disclosure.includes('AI-assisted educational writing with linked sources; not medically reviewed.'));
  assert.ok(disclosure.includes("url('about/#editorial-method')"));
  assert.ok(disclosure.includes('data-article-disclosure'));
  assert.ok(!disclosure.includes('<details'));
});

test('environment article uses the supplied photograph for covers, cards and social previews', () => {
  const entry = articles.find(article=>article.slug==='fragrance-and-environment');
  assert.equal(entry.photo.provider, 'local');
  assert.equal(entry.photo.generated, false);
  assert.equal(entry.photo.imageTag, 'Photograph');
  assert.ok(entry.photo.alt.includes('seedling'));
  assert.equal(entry.photo.credit, 'Photo supplied for CleanCare');
  assert.equal(entry.photo.width, 270);
  assert.equal(entry.photo.height, 148);
  assert.equal(entry.photo.sourceUrl, undefined);
  assert.equal(entry.photo.licenseUrl, undefined);
  assert.ok(entry.photo.note.includes('not a measurement'));
  assert.ok(existsSync(new URL('../public/'+entry.photo.src, import.meta.url)));
  const layout = source('src/layouts/Article.astro');
  assert.ok(layout.includes('image={sharingImage}'));
  assert.ok(layout.includes('entry?.photo?.generated'));
  assert.ok(layout.includes('entry.photo.licenseUrl'));
  assert.ok(layout.includes('entry?.photo?.note'));
});

test('environment lead photo is compact and beside the text on desktop, stacked on mobile', () => {
  const layout = source('src/layouts/Article.astro');
  assert.ok(layout.includes("'story-header--environment': isEnvironmentLeadImage"));
  assert.match(layout, /grid-template-columns:\s*minmax\(0, 1fr\) 270px/);
  assert.match(layout, /max-width:\s*270px/);
  assert.match(layout, /@media\(max-width:760px\)[\s\S]*\.story-header--environment\s*\{\s*grid-template-columns:\s*minmax\(0, 1fr\)/);
  assert.ok(!layout.includes('max-width:720px'));
});
