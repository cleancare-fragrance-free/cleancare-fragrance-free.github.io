import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { articles, matchesArticle } from '../src/data/articles.mjs';
import { countries } from '../src/data/countries.mjs';
import { matchesProduct } from '../src/lib/filter.mjs';
const products = JSON.parse(readFileSync(new URL('../src/data/products.json', import.meta.url), 'utf8'));
test('journal entries map to articles with matching titles', () => {
 assert.equal(new Set(articles.map(a => a.slug)).size, articles.length);
 for (const article of articles) {
  const source = readFileSync(new URL('../src/pages/guides/' + article.slug + '.md', import.meta.url), 'utf8');
  assert.ok(source.includes(article.title), article.slug);
 }
});
test('journal search intersects topic, handles case and no matches', () => {
 assert.equal(articles.filter(a => matchesArticle(a)).length, 6);
 assert.deepEqual(articles.filter(a => matchesArticle(a, ' LAUNDRY ', 'Everyday changes')).map(a => a.slug), ['fragrance-free-laundry']);
 assert.equal(articles.filter(a => matchesArticle(a, '<script>')).length, 0);
 assert.equal(articles.filter(a => matchesArticle(a, 'laundry', 'Shared spaces')).length, 0);
});
test('public product profiles have official sources and no affiliate links', () => {
 assert.equal(new Set(products.map(p => p.id)).size, products.length);
 for (const p of products) {
  assert.equal(p.sample, false);
  assert.equal(p.affiliateUrl, null);
  assert.ok(p.notes && p.claim && p.checked && p.imageAlt && p.countryNote);
  const official = new URL(p.officialUrl), image = new URL(p.image);
  assert.ok(['www.faithinnature.co.uk','surcare.co.uk','e45.com','www.aveeno.com','www.aveeno.com.sg','www.aveeno.com.au','www.armandhammer.com','www.seventhgeneration.com','tide.com','meliorameansbetter.com'].includes(official.hostname));
  assert.ok(image.hostname === official.hostname || image.hostname === 'images.ctfassets.net');
  assert.equal(p.imageSourceUrl, p.officialUrl);
  assert.equal(image.protocol, 'https:');
  assert.equal(official.search, '');
  assert.equal(official.protocol, 'https:');
  assert.ok(Object.values(p.countries).every(link => link === p.officialUrl));
  assert.ok(Object.keys(p.countries).every(code => countries.some(country => country.code === code)));
 }
});
test('country filters do not imply broader regional availability', () => {
 assert.equal(products.length, 14);
 for (const country of ['US','GB','SG','AU','NZ']) assert.ok(products.some(p => matchesProduct(p, { country })), country);
 for (const country of ['FR', 'DE', 'JP', 'EU', 'Asia', 'ANZ']) {
  assert.equal(products.filter(p => matchesProduct(p, { country })).length, 0);
 }
 assert.deepEqual(products.filter(p => matchesProduct(p, { country: 'GB', category: 'Haircare', query: 'shampoo' })).map(p => p.id), ['faith-in-nature-shampoo']);
});
test('regional versions stay distinct and country memberships are explicit', () => {
 assert.deepEqual(Object.keys(products.find(p => p.id === 'aveeno-daily-lotion-singapore').countries), ['SG']);
 assert.deepEqual(Object.keys(products.find(p => p.id === 'e45-cream-au-nz').countries), ['AU','NZ']);
 assert.ok(products.every(p => p.countries && Object.keys(p.countries).length));
});
