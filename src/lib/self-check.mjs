export const questions = [
  { id: 'products', title: 'Which scented products do you or your household use?', hint: 'Choose everything used in the past four weeks, even if you have no symptoms. Include products marketed as natural. This checklist does not verify whether an ingredient is synthetic.', multiple: true, options: [
    ['candles', 'Scented candles or wax melts'], ['incense', 'Incense'], ['perfume', 'Perfume, cologne, aftershave, or body spray'], ['softener', 'Scented fabric softener, dryer sheets, or scent beads'], ['detergent', 'Scented laundry detergent'], ['fresheners', 'Air fresheners, room sprays, plug-ins, or car scents'], ['cleaning', 'Scented cleaning or dishwashing products'], ['personal', 'Scented shampoo, soap, lotion, deodorant, or cosmetics'], ['oils', 'Essential oils or fragrance diffusers'], ['other', 'Other scented products'], ['none', 'None of these'], ['unsure', 'I’m not sure'],
  ] },
  { id: 'symptoms', title: 'When you are in contact with fragrances (skin, air, clothes)...which of these have you noticed?', hint: 'Select every question that is true for you. These symptoms can have many possible causes; this checklist cannot determine whether fragrance caused them.', multiple: true, options: [
    ['headache', 'Do you get headaches, lightheaded or migraine episodes?'],
    ['skin', 'Do you get itchy, irritated skin or a rash?'],
    ['eyes', 'Do your eyes feel itchy, red, watery, or irritated?'],
    ['nose', 'Do you have a runny or stuffy nose, or sneeze?'],
    ['throat', 'Do you have an irritated or sore throat?'],
    ['cough', 'Do you cough?'],
    ['breathing', 'Do you wheeze, feel chest tightness, or become short of breath?'],
    ['nausea', 'Do you feel nauseated?'],
    ['concentration', 'Do you have difficulty concentrating or feel mentally foggy and irritable mood?'],
    ['none', 'None of these symptoms'], ['all', 'All of them'], ['unsure', 'I’m not sure'],
  ] },
  { id: 'frequency', title: 'How often have you noticed symptoms around scented products?', hint: 'Think about the same four weeks. An association in time does not establish a cause.', options: [
    ['never', 'Never'], ['once', 'Once'], ['sometimes', 'On a few occasions'], ['often', 'Frequently'], ['unsure', 'I’m not sure / I had little or no exposure'],
  ] },
  { id: 'timing', title: 'When do symptoms tend to begin?', hint: 'Choose the closest description. You do not need to test this by exposing yourself.', options: [
    ['during', 'While near or using a scented product'], ['hours', 'Within a few hours'], ['later', 'Later that day or the next day'], ['unclear', 'There is no clear timing pattern'], ['na', 'Not applicable / I’m not sure'],
  ] },
  { id: 'contexts', title: 'Which situations have you noticed symptoms in?', hint: 'Choose all that apply. This records context, not a confirmed trigger or ingredient.', multiple: true, options: [
    ['personal', 'Perfume or scented personal-care products'], ['laundry', 'Scented laundry or fabrics'], ['cleaning', 'Cleaning products, sprays, or air fresheners'], ['oils', 'Essential oils, diffusers, incense, or scented candles'], ['shared', 'Other people’s products in shared spaces'], ['other', 'Another situation'], ['unsure', 'None / I’m not sure'],
  ] },
  { id: 'relief', title: 'What happens when you are away from the situation?', hint: 'Only reflect on what has already happened. Do not deliberately re-expose yourself.', options: [
    ['yes', 'Symptoms tend to ease'], ['mixed', 'It varies'], ['no', 'I have not noticed an improvement'], ['unsure', 'Not applicable / I’m not sure'],
  ] },
  { id: 'impact', title: 'How much have these symptoms affected your daily life?', hint: 'Think about your own experience, including work, sleep, social activities, or routines.', options: [
    ['none', 'No effect'], ['small', 'Some discomfort, without changing activities'], ['repeated', 'I sometimes change or miss activities'], ['significant', 'They substantially limit my usual activities'], ['unsure', 'Not applicable / I’m not sure'],
  ] },
];

const productAlternatives = {
  candles: 'Scented candles or wax melts: consider an unscented, flameless light for atmosphere.',
  incense: 'Incense: consider a smoke-free, scent-free alternative for your routine.',
  perfume: 'Perfume and body sprays: consider a fragrance-free routine without added perfume.',
  softener: 'Fabric softeners, dryer sheets, and scent beads: consider skipping optional scent additives, following fabric-care instructions.',
  detergent: 'Laundry detergent: compare fragrance-free formulas and check the current ingredient list.',
  fresheners: 'Air fresheners: address the source of an odour instead of adding scent; ventilate when outdoor conditions allow.',
  cleaning: 'Cleaning products: compare fragrance-free options suitable for the task and follow the label. Never mix cleaning chemicals.',
  personal: 'Personal care: review fragrance-free options and check ingredients rather than relying on “unscented” or “natural” claims.',
  oils: 'Oils and diffusers: consider leaving out added scent; essential oils are not a guaranteed safe substitute.',
  other: 'Other scented products: check the label and contact the manufacturer if the fragrance ingredients are unclear.',
};

export function validAnswer(question, values = []) {
  return values.length > 0 && (question.multiple || values.length === 1)
    && new Set(values).size === values.length
    && values.every(value => question.options.some(([id]) => id === value))
    && !(question.id === 'symptoms' && values.includes('all') && values.length > 1)
    && !(values.length > 1 && values.some(value => ['none', 'unsure'].includes(value)));
}

export function summarizeAnswers(answers) {
  if (!questions.every(question => validAnswer(question, answers[question.id]))) {
    throw new Error('Please answer every question with a valid selection.');
  }
  const symptoms = answers.symptoms;
  const hasSymptoms = symptoms.includes('all') || symptoms.some(value => !['none', 'unsure', 'all'].includes(value));
  const recurrent = ['sometimes', 'often'].includes(answers.frequency[0]);
  const conflicting = symptoms.includes('none') && (['once', 'sometimes', 'often'].includes(answers.frequency[0]) || ['small', 'repeated', 'significant'].includes(answers.impact[0]));
  let title = 'Your pattern is not clear yet';
  let description = 'Your answers leave some uncertainty about symptoms and exposure. That is okay: this self-check cannot determine whether you are sensitive to fragrance.';
  if (conflicting) {
    title = 'Some answers may need another look';
    description = 'Your symptom and frequency or impact answers do not fully align. You can review them, or keep this summary as a starting point for a conversation with a healthcare professional.';
  } else if (hasSymptoms && recurrent) {
    title = 'You report symptoms on repeated occasions';
    description = 'You have noticed symptoms around scented products more than once. This is a reported pattern—not proof that fragrance caused the symptoms, a diagnosis, or a measure of sensitivity.';
  } else if (hasSymptoms && answers.frequency.includes('never')) {
    title = 'You report symptoms without a noticed fragrance link';
    description = 'You selected symptoms, but have not noticed them around scented products. This quiz does not attribute those symptoms to fragrance. Seek medical advice if they persist, recur, or concern you.';
  } else if (hasSymptoms) {
    title = 'You have noticed symptoms worth recording';
    description = 'Your answers describe symptoms, but do not establish a recurring pattern. Symptoms may have other causes; a clinician can help assess them if they persist, recur, or concern you.';
  } else if (symptoms.includes('none') && answers.frequency.includes('never')) {
    title = 'You report no symptoms in this period';
    description = 'You have not noticed symptoms around scented products in the past four weeks. This does not prove that a product is safe for you or rule out an allergy or another condition.';
  }
  const products = answers.products.filter(value => !['none', 'unsure'].includes(value));
  const productSummary = products.length
    ? `You selected ${products.length} scented-product ${products.length === 1 ? 'category' : 'categories'} used by you or your household. This is an inventory, not a measure of dose, toxicity, or sensitivity. It does not confirm synthetic ingredients or connect a specific product to your symptoms.`
    : answers.products.includes('none')
      ? 'You reported no use of the listed scented products at home or personally. You may still encounter scents in shared spaces; this answer does not mean there is no exposure.'
      : 'You are unsure which scented products you use. Start by checking labels on everyday products. This quiz cannot verify a product’s ingredients.';
  return {
    title, description,
    productSummary,
    alternatives: products.map(id => productAlternatives[id]),
    breathing: symptoms.includes('all') || symptoms.some(value => ['cough', 'breathing'].includes(value)),
    impact: ['repeated', 'significant'].includes(answers.impact[0]),
    answers: questions.map(question => ({ title: question.title, response: question.options.filter(([id]) => answers[question.id].includes(id)).map(([, label]) => label).join('; ') })),
  };
}
