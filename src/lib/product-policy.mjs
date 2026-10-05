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
