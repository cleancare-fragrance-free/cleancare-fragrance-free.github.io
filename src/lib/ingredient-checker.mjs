const normalize = value => value.toLowerCase().replace(/[’']/g, '').replace(/\s+/g, ' ').trim().replace(/\s*\([^)]*\)\s*/g, ' ').replace(/\s+/g, ' ');

export const screeningRules = [
  { id: 'fragrance', label: 'Fragrance or parfum label', type: 'fragrance', terms: ['fragrance', 'parfum', 'perfume', 'aroma', 'flavor'] },
  { id: 'fragrance-allergen', label: 'Commonly listed fragrance ingredient', type: 'fragrance', terms: ['linalool', 'limonene', 'citronellol', 'geraniol', 'eugenol', 'cinnamal', 'cinnamyl alcohol', 'coumarin', 'isoeugenol', 'benzyl salicylate', 'benzyl benzoate', 'benzyl alcohol', 'hexyl cinnamal', 'alpha-isomethyl ionone', 'hydroxycitronellal', 'farnesol', 'evernia prunastri extract', 'evernia furfuracea extract'] },
  { id: 'essential-oil', label: 'Named essential oil or aromatic plant oil', type: 'essential-oil', terms: ['lavandula angustifolia oil', 'lavender oil', 'citrus limon peel oil', 'lemon peel oil', 'citrus aurantium bergamia peel oil', 'bergamot oil', 'citrus aurantium dulcis peel oil', 'orange peel oil', 'citrus paradisi peel oil', 'grapefruit peel oil', 'melaleuca alternifolia leaf oil', 'tea tree oil', 'eucalyptus globulus leaf oil', 'eucalyptus oil', 'mentha piperita oil', 'peppermint oil', 'rosmarinus officinalis leaf oil', 'rosemary oil', 'eugenia caryophyllus bud oil', 'clove oil', 'cinnamomum zeylanicum bark oil', 'cinnamon bark oil', 'cananga odorata flower oil', 'ylang ylang oil', 'pogostemon cablin oil', 'patchouli oil', 'anthemis nobilis flower oil', 'roman chamomile oil', 'cymbopogon citratus leaf oil', 'lemongrass oil'] },
  { id: 'lipid-screen', label: 'Potential Malassezia lipid / fatty-acid screening match', type: 'fungal', terms: ['oleic acid', 'stearic acid', 'palmitic acid', 'lauric acid', 'myristic acid', 'olive oil', 'olea europaea fruit oil', 'avocado oil', 'persea gratissima oil', 'sunflower seed oil', 'helianthus annuus seed oil', 'coconut oil', 'cocos nucifera oil', 'shea butter', 'butyrospermum parkii butter', 'cocoa butter', 'theobroma cacao seed butter', 'sweet almond oil', 'prunus amygdalus dulcis oil', 'soybean oil', 'glycine soja oil', 'wheat germ oil', 'triticum vulgare germ oil', 'isopropyl myristate', 'isopropyl palmitate', 'glyceryl stearate', 'sorbitan stearate', 'polyglyceryl-3 diisostearate', 'ethylhexyl palmitate', 'myristyl myristate', 'glyceryl oleate'] },
];

const aliasMap = new Map();
for (const rule of screeningRules) for (const term of rule.terms) aliasMap.set(normalize(term), rule);

export function parseIngredientList(value = '') {
  return value.split(/[,;\n\r]+/).map(item => item.replace(/^\s*\d+\s*[.)-]\s*/, '').replace(/\s*\*+\s*$/, '').trim()).filter(Boolean);
}

export function analyzeIngredients(value = '') {
  const ingredients = parseIngredientList(value);
  const matches = new Map();
  for (const ingredient of ingredients) {
    const rule = aliasMap.get(normalize(ingredient));
    if (!rule) continue;
    const record = matches.get(rule.id) || { ...rule, matches: [] };
    if (!record.matches.some(item => normalize(item) === normalize(ingredient))) record.matches.push(ingredient);
    matches.set(rule.id, record);
  }
  return { count: ingredients.length, matches: [...matches.values()] };
}
