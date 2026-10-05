import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { articles, matchesArticle } from '../src/data/articles.mjs';
import { countries } from '../src/data/countries.mjs';
import { matchesProduct } from '../src/lib/filter.mjs';
import products from '../src/data/product-catalog.mjs';
test('journal entries map to articles with matching titles', () => {
 assert.equal(new Set(articles.map(a => a.slug)).size, articles.length);
 for (const article of articles) {
  const markdown = new URL('../src/pages/guides/' + article.slug + '.md', import.meta.url);
  const astro = new URL('../src/pages/guides/' + article.slug + '.astro', import.meta.url);
  const source = readFileSync(existsSync(markdown) ? markdown : astro, 'utf8');
  assert.ok(source.includes(article.title), article.slug);
 }
});
test('journal search intersects topic, handles case and no matches', () => {
 assert.equal(articles.filter(a => matchesArticle(a)).length, articles.length);
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
  const official = new URL(p.officialUrl), image = p.image ? new URL(p.image) : null;
  const officialHosts = ['www.faithinnature.co.uk','surcare.co.uk','e45.com','www.aveeno.com','www.aveeno.com.sg','www.aveeno.com.au','www.armandhammer.com','www.seventhgeneration.com','tide.com','meliorameansbetter.com','ecostore.com','www.cerave.com.au','paulaschoice.sg','www.paulaschoice.com.au','www.clinique.com.au','www.ecostore.sg','uk.ecover.com','greenkulture.sg','www.eau-thermale-avene.sg','www.qvskincare.com.au','www.cetaphil.com.sg','sukinnaturals.com','www.vanicream.com','prequelskin.com','helloseen.com','honest.com','kristinesshair.com','www.fourreasons.us','eltamd.com','www.k18hair.com','theordinary.com','www.laroche-posay.us','www.currentbody.us','www.gillettevenus.com'];
  officialHosts.push('www.cerave.com', 'int.aestura.com', 'www.cosrx.com', 'www.sofiepavittface.com', 'www.farmacybeauty.com', 'www.vaseline.com', 'www.aquaphorus.com', 'kissmyface.com', 'tubbytodd.com', 'necessaire.com', 'www.cleure.com', 'www.realpurity.com');
  officialHosts.push('www.cerave.fr','dermina.fr','www.aderma.fr','www.bioderma.fr','www.weleda.fr');
  officialHosts.push('www.naturie-net.jp','jp.rohto.com','origprod.sk-ii.jp','www.canmake.com','www.shiseido.co.jp','www.muji.com','www.omibh.co.jp');
  const countrySourceHosts = [...officialHosts, 'www.lazada.sg', 'www.watsons.com.sg', 'www.sephora.com'];
  const imageHosts = [...officialHosts, 'images.ctfassets.net', 'media-pierre-fabre.wedia-group.com', 'cdn.productimages.coles.com.au', 'cdn.shopify.com', 'images-1.eucerin.com'];
  const imageSourceHosts = [...officialHosts, 'www.coles.com.au'];
  assert.ok(officialHosts.includes(official.hostname));
  if (image) assert.ok(imageHosts.includes(image.hostname), p.id + ': ' + image.hostname);
  assert.ok(imageSourceHosts.includes(new URL(p.imageSourceUrl).hostname));
  if (image) assert.equal(image.protocol, 'https:');
  assert.equal(official.search, '');
  assert.equal(official.protocol, 'https:');
  assert.ok(Object.values(p.countries).every(link => { const source = new URL(link); return source.protocol === 'https:' && countrySourceHosts.includes(source.hostname); }));
  assert.ok(Object.keys(p.countries).every(code => countries.some(country => country.code === code)));
 }
});
test('country filters do not imply broader regional availability', () => {
 assert.ok(products.length >= 36);
 for (const country of ['US','GB','SG','AU','NZ']) assert.ok(products.some(p => matchesProduct(p, { country })), country);
 assert.equal(products.filter(p => matchesProduct(p, { country: 'FR' })).length, 5);
 assert.equal(products.filter(p => matchesProduct(p, { country: 'JP' })).length, 14);
 for (const country of ['DE', 'EU', 'Asia', 'ANZ']) {
  assert.equal(products.filter(p => matchesProduct(p, { country })).length, 0);
 }
 assert.deepEqual(products.filter(p => matchesProduct(p, { country: 'GB', category: 'Haircare', query: 'shampoo' })).map(p => p.id), ['faith-in-nature-shampoo']);
});
test('regional versions stay distinct and country memberships are explicit', () => {
 assert.deepEqual(Object.keys(products.find(p => p.id === 'aveeno-daily-lotion-singapore').countries), ['SG']);
 assert.deepEqual(Object.keys(products.find(p => p.id === 'e45-cream-au-nz').countries), ['AU','NZ']);
 assert.deepEqual(Object.keys(products.find(p => p.id === 'ecostore-ultra-sensitive-dish-liquid').countries), ['SG','AU']);
 assert.deepEqual(Object.keys(products.find(p => p.id === 'paulas-choice-2-bha-liquid').countries), ['SG','AU']);
 assert.deepEqual(Object.keys(products.find(p => p.id === 'cerave-hydrating-cleanser-au').countries), ['AU','SG']);
 assert.deepEqual(Object.keys(products.find(p => p.id === 'clinique-dramatically-different-lotion-au').countries), ['AU']);
  assert.deepEqual(Object.keys(products.find(p => p.id === 'ecover-zero-laundry-liquid-sg').countries), ['SG']);
  assert.deepEqual(products.filter(p => p.countries.FR).map(p => p.id), ['cerave-skin-renewing-vitamin-c-serum-fr','dermina-serum-lissant-hydratant-48h-fr','aderma-exomega-control-emollient-balm-fr','bioderma-crealine-ar-cc-cream-spf50-fr','weleda-calendula-face-moisturiser-unscented-fr']);
 assert.equal(products.filter(p => p.countries.SG).length, 23);
 assert.equal(products.filter(p => p.countries.JP).length, 14);
 assert.ok(products.every(p => p.countries && Object.keys(p.countries).length));
});
