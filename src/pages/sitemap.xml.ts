import type { APIRoute } from 'astro';
import { articles } from '../data/articles.mjs';
import { featuredPosts } from '../data/featured-posts.mjs';
import products from '../data/product-catalog.mjs';
import { assertProductCatalog } from '../lib/product-policy.mjs';
import { availableCountries, productCategories } from '../data/directory-markets.mjs';
import { guideTopics } from '../data/guide-topics.mjs';
export const GET: APIRoute = ({ site }) => {
  assertProductCatalog(products);
  const base = import.meta.env.BASE_URL;
  const pages = ['', 'why-fragrance-free/', 'non-toxic-home/', 'guides/', 'evidence/', 'directory/', 'self-check/', 'about-us/', 'we-share-the-air/', 'take-action/', 'glossary/', 'ingredient-checker/', 'about/', 'celebrity-stories/', 'experts/', 'privacy/', ...availableCountries.map(c => 'directory/' + c.slug + '/'), ...productCategories.map(c => 'directory/categories/' + c.slug + '/'), ...guideTopics.map(t => 'guides/topics/' + t.slug + '/'), ...articles.map(a => 'guides/' + a.slug + '/'), ...featuredPosts.map(a => a.href), ...products.map(p => 'products/' + p.id + '/')];
  const locations = pages.map(path => new URL(base + path, site!).href);
  return new Response('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' + locations.map(loc => '<url><loc>' + loc + '</loc></url>').join('') + '</urlset>', {headers: {'Content-Type': 'application/xml; charset=utf-8'}});
};
