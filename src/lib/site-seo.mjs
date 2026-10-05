export const publisherName = 'CleanCare editorial';
export const primaryLabels = {
  'why-fragrance-free': 'Why fragrance free', 'non-toxic-home': 'Non-toxic home',
  guides: 'Articles & guides', directory: 'Fragrance-free products', evidence: 'Evidence library',
  'self-check': 'Private self-check', 'about-us': 'Our story', about: 'Editorial approach',
  experts: 'Expert explanations', 'celebrity-stories': 'Celebrity stories', privacy: 'Privacy',
  'starter-checklist': 'Printable starter checklist', glossary: 'Glossary', products: 'Product notes', featured: 'Community stories',
  topics: 'Topics', categories: 'Categories',
};
export function makeBreadcrumbs(pathname, title, base = '/') {
  const parts = pathname.slice(base.replace(/\/$/, '').length).split('/').filter(Boolean);
  if (!parts.length || parts.at(-1) === '404.html') return [];
  const crumbs = [{ name: 'Home', path: base }];
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
