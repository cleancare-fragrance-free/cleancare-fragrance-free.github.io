export const articles = [
  { slug: 'fragrance-health-evidence', topic: 'Health & evidence', title: 'What do we know about fragrance exposure and health?', description: 'Contact allergy, reported symptoms, and the difference between a concern and a proven cause.', art: 'research', minutes: 5 },
  { slug: 'fragrance-and-indoor-air-chemistry', topic: 'Health & evidence', title: 'What happens when fragrance ingredients meet indoor air?', description: 'Scent ingredients, ozone, and secondary pollutants—with the study limits in view.', art: 'air', minutes: 5 },
  { slug: 'reduce-fragrance-exposure', topic: 'Everyday changes', title: 'How to reduce fragrance exposure at home and in daily life', description: 'A room-by-room starting point for fewer added scents and more informed choices.', art: 'home', minutes: 4 },
  { slug: 'unscented-vs-fragrance-free', topic: 'Labels & products', title: 'Unscented vs. fragrance-free: a clearer starting point', description: 'Look beyond the front of the bottle. Similar words do not always mean the same thing.', art: 'labels', minutes: 3 },
  { slug: 'fragrance-free-laundry', topic: 'Everyday changes', title: 'A fragrance-free laundry routine: start with the extras', description: 'Detergent, softener, scent beads, and dryer sheets: a practical checklist for your next wash.', art: 'laundry', minutes: 3 },
  { slug: 'shared-spaces', topic: 'Shared spaces', title: 'How to ask for a lower-fragrance shared space', description: 'Start with one specific request, at home, at work, or before a visit.', art: 'shared', minutes: 3 },
];
export function matchesArticle(article, query = '', topic = '') {
  const text = [article.title, article.description, article.topic].join(' ').toLowerCase();
  return (!topic || article.topic === topic) && query.toLowerCase().trim().split(/\s+/).every(word => text.includes(word));
}
