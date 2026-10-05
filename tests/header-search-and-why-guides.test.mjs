import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {articles} from '../src/data/articles.mjs';
import {guideTopics} from '../src/data/guide-topics.mjs';

const source = path => readFileSync(new URL(path, import.meta.url), 'utf8');

test('header search is compact, labeled and searches the article library by query', () => {
  const layout = source('../src/layouts/Layout.astro');
  const journal = source('../src/pages/guides/index.astro');
  assert.match(layout, /class="header-search"/);
  assert.match(layout, /aria-label="Search articles and guides"/);
  assert.match(layout, /<svg viewBox="0 0 24 24" aria-hidden="true">/);
  assert.match(layout, /action=\{url\('guides\/'\)\} method="get"/);
  assert.match(layout, /name="q" type="search"/);
  assert.match(journal, /new URLSearchParams\(location\.search\)\.get\('q'\)/);
});

test('environment and animal guides are nested under Why fragrance free with visual and source links', () => {
  const layout = source('../src/layouts/Layout.astro');
  const why = source('../src/pages/why-fragrance-free.astro');
  const articleLayout = source('../src/layouts/Article.astro');
  assert.match(layout, /How fragrances affect the environment/);
  assert.match(layout, /How fragrances can affect animals/);
  assert.ok(articles.some(article => article.slug === 'fragrance-and-environment'));
  assert.ok(articles.some(article => article.slug === 'fragrance-and-pets'));
  for (const term of ['How fragrances can affect the environment','How fragrances can affect animals','csl.noaa.gov','pubmed.ncbi.nlm.nih.gov/38199360','aspca.org/news/essentials-essential-oils-around-pets','petpoisonhelpline.com/uncategorized/updates-on-essential-oils']) assert.ok(why.includes(term), term);
  assert.match(articleLayout, /entry\?\.slug === 'fragrance-and-pets'.*PetSafetyVisual/s);
  assert.match(articleLayout, /entry\?\.slug === 'fragrance-and-environment'.*EnvironmentImpactVisual/s);
});

test('YouTube article thumbnails use a compact side layout and remain constrained on mobile', () => {
  const articleLayout = source('../src/layouts/Article.astro');
  const styles = source('../src/styles/redesign.css');
  const videoArticles = articles.filter(article => article.photo?.src.includes('i.ytimg.com'));
  assert.ok(videoArticles.length > 0);
  assert.match(articleLayout, /const isVideoThumbnail = entry\?\.photo\?\.src\.includes\('i\.ytimg\.com'\)/);
  assert.match(articleLayout, /story-header--video/);
  assert.match(articleLayout, /story-cover--video/);
  assert.match(articleLayout, /Open video source for/);
  assert.match(styles, /story-header--video\{display:grid;grid-template-columns:minmax\(0,1fr\) minmax\(240px,320px\)/);
  assert.match(styles, /@media\(max-width:760px\)\{\.story-header--video,\.story-header--vocs\{grid-template-columns:minmax\(0,1fr\)/);
  assert.match(styles, /story-cover--video\{grid-column:1;grid-row:auto;justify-self:end;width:min\(72%,320px\)/);
});

test('VOCs article lead photo is a capped desktop side image', () => {
  const articleLayout = source('../src/layouts/Article.astro');
  const styles = source('../src/styles/redesign.css');
  assert.match(articleLayout, /entry\?\.slug === 'identify-and-prevent-vocs'/);
  assert.match(articleLayout, /story-header--vocs/);
  assert.match(articleLayout, /story-cover--vocs/);
  assert.match(styles, /story-header--vocs\{display:grid;grid-template-columns:minmax\(0,1fr\) minmax\(280px,380px\)/);
  assert.match(styles, /story-cover--vocs\{[^}]*max-width:380px/s);
  assert.match(styles, /story-cover--vocs img\{[^}]*max-height:300px/s);
});

test('French source reading appears in a dedicated French articles topic', () => {
  const guide = source('../src/pages/guides/dermadia-ingredients-controverses.md');
  const topic = guideTopics.find(item => item.slug === 'articles-en-francais');
  const article = articles.find(item => item.slug === 'dermadia-ingredients-controverses');
  assert.ok(topic);
  assert.ok(article);
  assert.equal(article.topic, topic.title);
  assert.ok(topic.slugs.includes(article.slug));
  assert.match(guide, /dermadia\.fr\/blogs\/infos\/les-ingredients-controverses-a-eviter-dans-vos-soins/);
  assert.match(guide, /danger et risque réel/);
});
