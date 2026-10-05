const allergySource = 'https://www.fda.gov/cosmetics/cosmetic-ingredients/allergens-cosmetics';

// Locations illustrate possible symptoms, not diagnosed damage or a universal response.
export const bodyEffects = [
  { id: 'head', label: 'Head', title: 'Headaches & scent-triggered symptoms', evidence: 'Possible symptom in sensitive people', x: 40, y: 13,
    text: 'Some fragrance-sensitive people experience headaches after inhaling scented products. A headache does not establish brain injury or identify its cause.', source: allergySource },
  { id: 'eyes', label: 'Eyes', title: 'Eye irritation', evidence: 'Possible irritation or allergic reaction', x: 60, y: 21,
    text: 'Cosmetics can cause eye irritation in some people. Symptoms may have other causes; the exact ingredient matters.', source: allergySource },
  { id: 'nose', label: 'Nose', title: 'Runny or stuffy nose', evidence: 'Possible symptom in sensitive people', x: 43, y: 29,
    text: 'Inhaling some fragrances may cause a runny or blocked nose in sensitive people. This does not mean fragrance causes a sinus infection.', source: allergySource },
  { id: 'airways', label: 'Airways', title: 'Cough, wheeze & breathing symptoms', evidence: 'A concern for susceptible people', x: 60, y: 43,
    text: 'Inhaled fragrance may trigger coughing, wheezing or chest tightness in susceptible people, including people with asthma.', source: allergySource },
  { id: 'skin', label: 'Skin', title: 'Rashes & contact dermatitis', evidence: 'Established fragrance-allergy concern', x: 26, y: 58,
    text: 'Some fragrance ingredients can cause itchy rashes or allergic contact dermatitis. A clinician can help identify the trigger.', source: allergySource },
  { id: 'endocrine', label: 'Hormone system', title: 'Endocrine disruptors: an ingredient-specific concern', evidence: 'Research topic—not a symptom or diagnosis', x: 50, y: 54,
    text: 'Some chemicals, including certain phthalates, can interfere with hormone signaling. Hormones act throughout the body; the belly marker is a navigation symbol, not a site of proven damage. It does not mean every fragrance contains an endocrine disruptor or causes hormonal or reproductive harm. The exact ingredient, exposure and evidence matter.', source: 'https://www.niehs.nih.gov/health/topics/agents/endocrine' },
];
