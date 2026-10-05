// Editorial review is required for each exact formula, not just a brand name.
// Fail the build rather than publishing fragranced or unreviewed additions.
export function assertFragranceFreeCatalog(products) {
  for (const product of products) {
    const eligible = product.fragranceStatus === 'fragrance-free'
      || (product.fragranceStatus === 'not-applicable' && product.category === 'Devices');
    if (!eligible || !product.claim || !product.officialUrl || !product.checked) {
      throw new Error(`Product ${product.id}: confirm a fragrance-free formula and record its official source and review date before publishing.`);
    }
  }
}

// The strict fragrance-free policy above remains available for FF-only lists.
// Essential-oil alternatives require an explicit review and warning, and must
// never be represented as fragrance-free or included in the default results.
export function assertProductCatalog(products) {
  assertFragranceFreeCatalog(products.filter(product => product.fragranceStatus !== 'essential-oils-only'));
  const ids = new Set();
  for (const product of products) {
    if (ids.has(product.id)) throw new Error(`Duplicate product id: ${product.id}`);
    ids.add(product.id);
    if (['none-listed', 'contains'].includes(product.essentialOilStatus)
      && (!product.essentialOilEvidence || !product.essentialOilSource || !product.essentialOilChecked)) {
      throw new Error(`Product ${product.id}: essential-oil classification requires a dated source and review evidence.`);
    }
    if (product.fragranceStatus === 'fragrance-free' && product.essentialOilStatus === 'contains') {
      throw new Error(`Product ${product.id}: essential oils must not be labelled fragrance-free.`);
    }
    if (product.essentialOilStatus && !['none-listed', 'contains', 'not-reviewed'].includes(product.essentialOilStatus)) {
      throw new Error(`Product ${product.id}: invalid essential-oil review status.`);
    }
    if (product.fragranceStatus === 'essential-oils-only'
      && (product.essentialOilStatus !== 'contains' || product.addedFragranceStatus !== 'none-listed'
        || !product.warning || !product.claim || !product.officialUrl || !product.checked)) {
      throw new Error(`Product ${product.id}: scented essential-oil alternatives require an explicit ingredient review and warning.`);
    }
  }
}
