import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { featuredPosts } from '../src/data/featured-posts.mjs';

test('five featured sources retain observed order and clean public URLs', () => {
  assert.equal(featuredPosts.length, 5);
  assert.equal(new Set(featuredPosts.map(p => p.slug)).size, 5);
  assert.deepEqual(featuredPosts.map(p => p.order), [1,2,3,4,5]);
  assert.deepEqual(featuredPosts.map(p => p.postUrl.split('/').filter(Boolean).at(-1)), ['993175098035755','2006357086717546','1991315638221691','1917676692252253','1780131456006778']);
  assert.deepEqual(featuredPosts.map(p => p.photo.provider), ['pexels','pexels','publisher','pexels','pexels']);
  for (const post of featuredPosts) {
    assert.ok(post.summary && post.context && post.sourceName && post.imageCredit);
    assert.ok(post.photo.alt && post.photo.photographer);
    if (post.photo.provider === 'pexels') {
      assert.equal(new URL(post.photo.src).hostname, 'images.pexels.com');
      assert.equal(new URL(post.photo.sourceUrl).hostname, 'www.pexels.com');
      assert.equal(post.photo.licenseUrl, 'https://www.pexels.com/license/');
    } else {
      assert.equal(post.slug, 'miranda-kerr-fragrance-conversation');
      assert.equal(new URL(post.photo.src).hostname, 'drhyman.com');
      assert.equal(new URL(post.photo.sourceUrl).hostname, 'drhyman.com');
      assert.equal(post.photo.licenseUrl, undefined);
    }
    assert.equal(post.href, `featured/${post.slug}/`);
    for (const link of [post.postUrl, post.sourceUrl]) {
      assert.equal(new URL(link).protocol, 'https:');
      assert.equal(new URL(link).search, '');
      assert.ok(!link.includes('post_insights'));
    }
  }
});
test('featured cards have static detail routes and do not break guide filters', () => {
  const page = readFileSync(new URL('../src/pages/featured/[slug].astro', import.meta.url), 'utf8');
  assert.ok(page.includes('getStaticPaths'));
  assert.ok(page.includes('href={post.sourceUrl}'));
  const journal = readFileSync(new URL('../src/pages/guides/index.astro', import.meta.url), 'utf8');
  assert.ok(journal.includes('[data-article-slug]:not([data-featured])'));
});
