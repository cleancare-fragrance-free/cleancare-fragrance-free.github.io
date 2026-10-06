export const publisherName = 'CleanCare editorial';
export const primaryLabels = {
  'why-fragrance-free': 'Why fragrance free', 'non-toxic-home': 'House Detox',
  guides: 'Articles & guides', directory: 'Fragrance-free products', evidence: 'Evidence library',
  'self-check': 'Private health check', 'about-us': 'Our story', about: 'Editorial approach',
  experts: 'Expert explanations', 'celebrity-stories': 'Celebrity stories', privacy: 'Privacy',
  'starter-checklist': 'Printable starter checklist', glossary: 'Glossary', products: 'Product notes', featured: 'Community stories',
  topics: 'Topics', categories: 'Categories',
};
// Menu groups do not always match URL folders. Link to real section pages,
// rather than inventing intermediate routes or using browser history.
const sectionParents = {
  'guides/history-of-fragrance': ['Why fragrance free', 'why-fragrance-free/'],
  'guides/fragrance-and-environment': ['Why fragrance free', 'why-fragrance-free/'],
  'guides/fragrance-and-pets': ['Why fragrance free', 'why-fragrance-free/'],
  'celebrity-stories': ['Why fragrance free', 'why-fragrance-free/'],
  evidence: ['Articles & guides', 'guides/'],
  experts: ['Articles & guides', 'guides/'],
  glossary: ['Fragrance-free products', 'directory/'],
  'ingredient-checker': ['Starter toolkit', 'guides/fragrance-free-starter-toolkit/'],
  'guides/identify-and-prevent-vocs': ['Starter toolkit', 'guides/fragrance-free-starter-toolkit/'],
  'non-toxic-home': ['Starter toolkit', 'guides/fragrance-free-starter-toolkit/'],
  'self-check': ['Starter toolkit', 'guides/fragrance-free-starter-toolkit/'],
  'starter-checklist': ['Starter toolkit', 'guides/fragrance-free-starter-toolkit/'],
  'we-share-the-air': ['About us', 'about-us/'],
  'take-action': ['About us', 'about-us/'],
  about: ['About us', 'about-us/'],
  privacy: ['About us', 'about-us/'],
};
export function makeBreadcrumbs(pathname, title, base = '/') {
  const parts = pathname.slice(base.replace(/\/$/, '').length).split('/').filter(Boolean);
  if (!parts.length || parts.at(-1) === '404.html') return [];
  const crumbs = [{ name: 'Home', path: base }];
  const parent = sectionParents[parts.join('/')];
  if (parent) return [
    ...crumbs,
    {name:parent[0], path:base + parent[1]},
    {name:title.split(' | ')[0].replace(/ — CleanCare$/, ''), path:base + parts.join('/') + '/'},
  ];
  let current = base.replace(/\/$/, '');
  for (let index = 0; index < parts.length; index++) {
    const part = parts[index]; current += '/' + part;
    const isLast = index === parts.length - 1;
    if (!isLast && ['products', 'featured', 'topics', 'categories'].includes(part)) {
      if (part === 'products') crumbs.push({name:'Fragrance-free products', path:base + 'directory/'});
      if (part === 'featured') crumbs.push({name:'Articles & guides', path:base + 'guides/'});
      continue;
    }
    crumbs.push({ name: isLast ? title.split(' | ')[0].replace(/ — CleanCare$/, '') : primaryLabels[part] || part.replaceAll('-', ' '), path: current + '/' });
  }
  return crumbs;
}
export function makeStructuredData({ site, canonical, title, description, image, breadcrumbs = [], article }) {
  const organization = { '@type':'Organization', '@id':site + '#publisher', name:'CleanCare', url:site, description:'An independent fragrance-free education and advocacy project.', };
  const page = { '@type':article ? 'BlogPosting' : 'WebPage', '@id':canonical + '#page', url:canonical, ...(article ? {headline:title.split(' | ')[0]} : {name:title}), description, image, inLanguage:'en', publisher:{'@id':organization['@id']}, ...(article ? {author:{'@type':'Organization',name:publisherName,url:site + 'about/'}, ...(article.published ? {datePublished:article.published} : {}), ...(article.modified ? {dateModified:article.modified} : {})} : {}) };
  return { '@context':'https://schema.org', '@graph':[organization, {'@type':'WebSite','@id':site+'#website',name:'CleanCare',url:site,publisher:{'@id':organization['@id']}}, page, ...(breadcrumbs.length ? [{'@type':'BreadcrumbList',itemListElement:breadcrumbs.map((crumb,index)=>({'@type':'ListItem',position:index+1,name:crumb.name,item:new URL(crumb.path,site).href}))}] : [])] };
}
