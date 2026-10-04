import type { APIRoute } from 'astro';
import { articles } from '../data/articles.mjs';
const escape = (value: string) => value.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
export const GET: APIRoute = ({ site }) => {
  const base = import.meta.env.BASE_URL;
  const items = articles.map(a => { const link = new URL(base + 'guides/' + a.slug + '/', site!).href; return '<item><title>' + escape(a.title) + '</title><link>' + link + '</link><guid>' + link + '</guid><description>' + escape(a.description) + '</description></item>'; }).join('');
  return new Response('<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>CleanCare Journal</title><link>' + site!.href + '</link><description>Evidence-led fragrance-free living.</description>' + items + '</channel></rss>', {headers:{'Content-Type':'application/rss+xml; charset=utf-8'}});
};
