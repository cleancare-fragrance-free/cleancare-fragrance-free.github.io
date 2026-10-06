// Exact best-seller versions observed on Sukin's US store, 7 October 2026.
// Scent origin is a manufacturer claim, not established by INCI or lab testing.
const policySource = 'https://sukinnaturals.com/pages/the-sukin-no-list';
const collectionSource = 'https://sukinnaturals.com/collections/best-sellers';
const cdn = 'https://cdn.shopify.com/s/files/1/0081/7374/8305/';
const entries = [
  ['hydrating-shampoo-500ml-hair-care', 'Hydrating Shampoo · 500 ml', 'Haircare', 'Shampoo for dry hair.', 'products/Masterbrand_Hydrating_Shampoo_500ml_01_Product.jpg?v=1599504647', 'Fragrance (Parfum), described on the product page as natural fragrance.', false],
  ['hydrating-conditioner-500ml-hair-care', 'Hydrating Conditioner · 500 ml', 'Haircare', 'Rinse-out conditioner for dry hair.', 'products/Masterbrand_Hydrating_Conditioner_500ml_01_Product.jpg?v=1599504648', 'Fragrance (Parfum), described on the product page as natural fragrance.', false],
  ['cleansing-oil-signature-125ml', 'Signature Cleansing Oil · 125 ml', 'Skin & Body', 'Facial cleansing oil for removing makeup.', 'files/Signature_Cleansing_Oil_Cap_125mL_01.webp?v=1729792842', 'Parfum (Fragrance), described on the product page as naturally derived fragrance.', false],
  ['mattifying-moisturiser-signature-125ml', 'Signature Mattifying Moisturiser · 125 ml', 'Skin & Body', 'Facial moisturiser with rice powder for a matte finish.', 'files/Signature_Mattifying_Moisturiser_125ml_01_27f01c19-bc02-4ee0-806d-60baedd4d598.webp?v=1729796406', 'Lime, lavender, bitter orange leaf/twig, lemon myrtle and mandarin peel oils are listed.', true],
  ['signature-foaming-facial-cleanser', 'Signature Foaming Facial Cleanser · 125 ml', 'Skin & Body', 'Foaming facial cleanser for normal to oily skin.', 'products/Signature_Foaming_Facial_Cleanser_125ml_01_Product.jpg?v=1599504600', 'Tangerine, mandarin and lavender oils, vanillin and vanilla fruit extract are listed.', true],
  ['signature-facial-moisturiser', 'Signature Facial Moisturiser · 125 ml', 'Skin & Body', 'Daily facial moisturiser from the Signature range.', 'products/Signature_Facial_Moisturiser_125ml_01_Product.jpg?v=1599504612', 'Tangerine, mandarin and lavender oils, vanillin and vanilla fruit extract are listed.', true],
  ['hydrating-body-lotion-signature-500ml', 'Signature Hydrating Body Lotion · 500 ml', 'Skin & Body', 'Scented body lotion from the Signature range.', 'products/Signature_Hydrating_Body_Lotion_500ml_02.jpg?v=1599504645', 'Tangerine, mandarin, lime and lavender oils, vanillin and vanilla fruit extract are listed.', true],
  ['natural-balance-conditioner-500ml-hair-care', 'Natural Balance Conditioner · 500 ml', 'Haircare', 'Rinse-out conditioner from the Natural Balance range.', 'products/Signature_Natural_Balance_Conditioner_500ml_01_Product.jpg?v=1599504623', 'Tangerine, mandarin and lavender oils and vanillin are listed.', true],
  ['natural-balance-shampoo-500ml-hair-care', 'Natural Balance Shampoo · 500 ml', 'Haircare', 'Daily shampoo from the Natural Balance range.', 'products/Signature_Natural_Balance_Shampoo_500ml_01_Product.jpg?v=1599504626', 'Tangerine, mandarin and lavender oils and vanillin are listed.', true],
  ['volumising-shampoo-500ml-hair-care', 'Volumising Shampoo · 500 ml', 'Haircare', 'Shampoo designed for fine hair.', 'products/Masterbrand_Volumising_Shampoo_500ml_01_Product.jpg?v=1599504630', 'Fragrance (Parfum), described on the product page as natural fragrance.', false],
];

export default entries.map(([handle, title, category, description, image, evidence, containsOils]) => {
  const officialUrl = `https://sukinnaturals.com/products/${handle}`;
  return {
    id: `sukin-${handle}-us`, title, brand: 'Sukin', category,
    tags: ['Naturally scented', 'No synthetic fragrance — brand claim'],
    fragranceStatus: 'naturally-scented',
    description, officialUrl, image: cdn + image,
    imageAlt: `${title} — official Sukin product image`, imageSourceUrl: officialUrl,
    claim: 'Sukin states that it uses no synthetic fragrances, instead using natural essential oils and natural fragrances. This is a manufacturer statement; this product is scented, not fragrance-free.',
    naturalFragranceSource: policySource, naturalFragranceChecked: '2026-10-07',
    scentEvidence: evidence,
    essentialOilStatus: containsOils ? 'contains' : 'not-reviewed',
    ...(containsOils ? {essentialOilEvidence: evidence, essentialOilSource: officialUrl, essentialOilChecked: '2026-10-07'} : {}),
    warning: 'Naturally scented, not fragrance-free. “No synthetic fragrance” is Sukin’s claim, not independent certification or a guarantee of suitability. Avoid this option if you need to avoid all scent.',
    notes: `${evidence} An ingredient list alone does not establish how a scent ingredient was manufactured. Where a fragrance mixture is listed, its full composition and essential-oil content are not separately confirmed. Check current local packaging.`,
    use: description,
    checked: '2026-10-07', affiliateUrl: null, sample: false,
    countries: {US: officialUrl},
    countryNote: 'US store version only. Listings were marked sold out when reviewed; verify current stock, shipping and local formula with the brand.',
    collectionSource,
  };
});
