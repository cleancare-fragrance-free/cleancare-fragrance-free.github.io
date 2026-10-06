export const defaultScentFilter = 'fragrance-free';
export const scentOptions = [
  { value: 'fragrance-free', label: 'Fragrance-free options (default)' },
  { value: 'no-essential-oils', label: 'No added fragrance or essential oils' },
  { value: 'essential-oils', label: 'Contains essential oils · scented' },
  { value: 'naturally-scented', label: 'Naturally scented · no synthetic fragrance (brand claim)' },
  { value: 'not-reviewed', label: 'Essential-oil status not yet checked' },
  { value: 'all', label: 'All options · includes scented products' },
];

export function getEssentialOilStatus(product) {
  if (product.fragranceStatus === 'not-applicable' && product.category === 'Devices') return 'not-applicable';
  return product.essentialOilStatus || 'not-reviewed';
}

export function getScentLabel(product) {
  if (product.fragranceStatus === 'naturally-scented') return 'Naturally scented · no synthetic fragrance (brand claim)';
  const status = getEssentialOilStatus(product);
  if (status === 'contains') return 'Essential oils · not fragrance-free';
  if (status === 'none-listed') return 'No added fragrance or essential oils listed';
  if (status === 'not-applicable') return 'Device · no product formula';
  return 'Fragrance-free claim · essential oils not checked';
}

export function matchesScentProfile(product, scent) {
  if (!scent || scent === 'all') return true;
  const status = getEssentialOilStatus(product);
  if (scent === 'fragrance-free') return product.fragranceStatus === 'fragrance-free' || status === 'not-applicable';
  if (scent === 'no-essential-oils') return product.fragranceStatus === 'fragrance-free' && status === 'none-listed';
  if (scent === 'essential-oils') return ['essential-oils-only', 'naturally-scented'].includes(product.fragranceStatus) && status === 'contains';
  if (scent === 'naturally-scented') return product.fragranceStatus === 'naturally-scented';
  if (scent === 'not-reviewed') return product.fragranceStatus === 'fragrance-free' && status === 'not-reviewed';
  return false;
}

export function normalizeScentFilter(value) {
  return scentOptions.some(option => option.value === value) ? value : defaultScentFilter;
}
