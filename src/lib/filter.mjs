import { matchesScentProfile } from './scent-profile.mjs';

export function matchesProduct(product, { query = '', category = '', country = '', scent = '' } = {}) {
  const haystack = [product.title, product.brand || '', product.category, product.description, ...product.tags].join(' ').toLowerCase();
  return query.trim().toLowerCase().split(/\s+/).every(term => haystack.includes(term))
    && (!category || product.category === category)
    && (!country || Object.hasOwn(product.countries || {}, country))
    && matchesScentProfile(product, scent);
}
