import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { featuredPosts } from '../src/data/featured-posts.mjs';

test('five featured sources retain observed order and clean public URLs', () => {
  assert.equal(featuredPosts.length, 5);
  assert.equal(new Set(featuredPosts.map(p => p.slug)).size, 5);
  assert.deepEqual(featuredPosts.map(p => p.order), [1,2,3,4,5]);
  assert.deepEqual(featuredPosts.map(p => p.postUrl.split('/').filter(Boolean).at(-1)), ['993175098035755','2006357086717546','1991315638221691','1917676692252253','1780131456006778']);
  assert.deepEqual(featuredPosts.map(p => p.photo.provider), ['local','local','local','local','local']);
  assert.deepEqual(featuredPosts.map(p => new URL(p.photo.sourceUrl).hostname), ['www.nippon.com','youtu.be','drhyman.com','www.fragrancefreenation.com','www.instagram.com']);
  for (const post of featuredPosts) {
    assert.ok(post.summary && post.context && post.sourceName && post.imageCredit);
    assert.ok(post.photo.alt && post.photo.photographer);
    assert.match(post.photo.src, /^images\/featured\/[a-z0-9-]+\.(jpg|png|webp)$/);
    assert.equal(existsSync(new URL(`../public/${post.photo.src}`, import.meta.url)), true);
    assert.equal(new URL(post.photo.sourceUrl).protocol, 'https:');
    assert.equal(post.photo.licenseUrl, undefined);
    assert.equal(post.href, `featured/${post.slug}/`);
    for (const link of [post.postUrl, post.sourceUrl]) {
      assert.equal(new URL(link).protocol, 'https:');
      assert.equal(new URL(link).search, '');
      assert.ok(!link.includes('post_insights'));
    }
  }
  assert.equal(featuredPosts.at(-1).photo.imageTag, 'The Washington Post');
});
test('featured cards have static detail routes and do not break guide filters', () => {
  const page = readFileSync(new URL('../src/pages/featured/[slug].astro', import.meta.url), 'utf8');
  assert.ok(page.includes('getStaticPaths'));
  assert.ok(page.includes('href={post.sourceUrl}'));
  const journal = readFileSync(new URL('../src/pages/guides/index.astro', import.meta.url), 'utf8');
  assert.ok(journal.includes('[data-article-slug]:not([data-featured])'));
});

test('featured posts are the first journal section and default view without hiding search results', () => {
  const journal = readFileSync(new URL('../src/pages/guides/index.astro', import.meta.url), 'utf8');
  assert.ok(journal.indexOf('<section id="featured"') < journal.indexOf('<section id="all-guides"'));
  assert.ok(journal.indexOf('data-journal-view="featured"') < journal.indexOf('data-journal-view="all-guides"'));
  assert.ok(journal.includes("const defaultView = initialQuery ? 'all-guides' : 'featured'"));
  assert.ok(journal.includes('panel.id===id)?id:defaultView'));
  assert.ok(journal.includes('showView(location.hash.slice(1))'));
  assert.ok(journal.includes('Five featured posts. Follow the source.'));
});
