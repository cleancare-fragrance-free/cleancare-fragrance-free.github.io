export function matchesProduct(product, { query = '', category = '', country = '' } = {}) {
  const haystack = [product.title, product.brand || '', product.category, product.description, ...product.tags].join(' ').toLowerCase();
  return query.trim().toLowerCase().split(/\s+/).every(term => haystack.includes(term))
    && (!category || product.category === category)
    && (!country || Object.hasOwn(product.countries || {}, country));
}
