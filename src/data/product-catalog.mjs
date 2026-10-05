import existingProducts from './products.json' with { type: 'json' };
import usAdditions from './us-strategist-products.json' with { type: 'json' };

const readingSource = 'https://nymag.com/strategist/article/fragrance-free-products-we-use.html';
// Missing reviews remain missing: a fragrance-free claim alone does not prove
// essential-oil absence, and no ingredient list proves a product is odorless.
const reviewedExisting = new Set(['faith-in-nature-shampoo', 'meliora-laundry-powder']);
const originals = existingProducts.map(product => reviewedExisting.has(product.id) ? {
  ...product,
  essentialOilStatus: 'none-listed',
  essentialOilSource: product.officialUrl,
  essentialOilEvidence: product.claim,
  essentialOilChecked: product.checked,
} : product);

const additions = usAdditions.map(product => ({
  fragranceStatus: 'fragrance-free',
  notes: 'Ingredient lists and regional formulas can change. Fragrance-free does not mean odorless or allergen-free. Check the current local label before buying.',
  ...product,
  imageAlt: `${product.title} — official brand product image`,
  imageSourceUrl: product.officialUrl,
  checked: '2026-10-05',
  affiliateUrl: null,
  sample: false,
  countries: { US: product.countryUrl || product.officialUrl },
  countryNote: 'US brand or local retailer source checked. Verify current stock, shipping and the exact formula with the seller; this listing does not guarantee availability.',
  ...(product.essentialOilStatus !== 'not-reviewed' ? {
    essentialOilSource: product.officialUrl,
    essentialOilChecked: '2026-10-05',
  } : {}),
  readingSource,
}));

export const products = [...originals, ...additions];
export default products;
