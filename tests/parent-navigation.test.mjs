import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {makeBreadcrumbs,makeStructuredData} from '../src/lib/site-seo.mjs';
const source = file => readFileSync(new URL('../'+file, import.meta.url),'utf8');

test('detail pages return to their real section parents, including deployment bases', () => {
  for (const base of ['/', '/cleancare/']) {
    for (const [page,parent] of [
      ['guides/fragrance-and-environment','why-fragrance-free/'],
      ['guides/fragrance-and-pets','why-fragrance-free/'],
      ['guides/history-of-fragrance','why-fragrance-free/'],
      ['celebrity-stories','why-fragrance-free/'],
      ['guides','read-watch/'], ['evidence','read-watch/'], ['experts','read-watch/'], ['glossary','directory/'],
      ['ingredient-checker','directory/'],
      ['non-toxic-home','guides/fragrance-free-starter-toolkit/'],
      ['take-action','about-us/'], ['we-share-the-air','about-us/'],
    ]) {
      const crumbs = makeBreadcrumbs(base+page+'/', 'Page | CleanCare', base);
      assert.equal(crumbs.length, 3);
      assert.equal(crumbs.at(-2).path, base+parent);
      assert.equal(crumbs.at(-1).path, base+page+'/');
      assert.equal(new Set(crumbs.map(crumb=>crumb.path)).size, 3);
    }
  }
});

test('ordinary article, product and country hierarchies remain valid', () => {
  for (const [page,parent] of [
    ['guides/fragrance-health-evidence/','/guides/'],
    ['products/test-product/','/directory/'],
    ['featured/test-story/','/guides/'],
    ['directory/categories/haircare/','/directory/'],
    ['directory/singapore/','/directory/'],
  ]) assert.equal(makeBreadcrumbs('/'+page,'Page | CleanCare').at(-2).path, parent);
  assert.deepEqual(makeBreadcrumbs('/','Home'),[]);
});

test('Read & watch is a real overview level, rather than an invented history link', () => {
  const layout = source('src/layouts/Layout.astro');
  const overview = source('src/pages/read-watch.astro');
  assert.match(layout, /url\('read-watch\/'\).*Read &amp; watch overview/);
  assert.ok(layout.includes("url('read-watch/')}>Read & Watch</a>"));
  assert.ok(overview.includes("href: 'guides/'"));
  assert.ok(overview.includes("href: 'evidence/'"));
  assert.ok(overview.includes("href: 'experts/'"));
  for (const base of ['/', '/cleancare/']) {
    const crumbs = makeBreadcrumbs(base + 'guides/', 'Articles & Guides | CleanCare', base);
    assert.equal(crumbs.at(-2).name, 'Read & watch');
    assert.equal(crumbs.at(-2).path, base + 'read-watch/');
  }
});

test('parent return links are accessible, server-rendered and share the SEO hierarchy', () => {
  const layout = source('src/layouts/Layout.astro');
  assert.ok(layout.includes('breadcrumbs.at(-2)'));
  assert.ok(layout.includes('href={parentPage.path}'));
  assert.ok(layout.includes('aria-label={`Back to ${parentPage.name}`}'));
  assert.ok(layout.includes('aria-label="Breadcrumb"'));
  assert.ok(!layout.includes('history.back('));
  const css = source('src/styles/ux-foundations.css');
  assert.match(css, /parent-page-link\{[^}]*min-height:44px/);
  const crumbs = makeBreadcrumbs('/guides/fragrance-and-environment/', 'Environment | CleanCare');
  const schema = makeStructuredData({site:'https://example.org/',canonical:'https://example.org/guides/fragrance-and-environment/',title:'Environment',description:'Guide',image:'https://example.org/image.webp',breadcrumbs:crumbs});
  const breadcrumbList = schema['@graph'].find(item=>item['@type']==='BreadcrumbList');
  assert.equal(breadcrumbList.itemListElement[1].item,'https://example.org/why-fragrance-free/');
});
