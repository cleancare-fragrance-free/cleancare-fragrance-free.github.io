// Read-only metadata inspection. Nothing is published or written by this script.
const urls = [
 'https://www.currentbody.us/products/currentbody-skin-led-light-therapy-mask-series-2',
 'https://www.k18hair.com/products/airwash-dry-shampoo-4oz',
 'https://theordinary.com/es-us/natural-moisturizing-factors-ha-moisturizer-100435.html',
 'https://www.laroche-posay.us/our-products/face/face-wash/toleriane-moisturizing-milky-facial-cleanser-3337872411830.html',
 'https://www.laroche-posay.us/our-products/body/body-lotion/cicaplast-balm-b5-for-dry-skin-irritations-cicaplastbalmb5.html',
 'https://www.vogue.co.uk/beauty/article/tina-turner-beauty-interview',
 'https://www.marieclaire.co.uk/news/celebrity-news/pixie-geldof-interview-642969',
 'https://intothegloss.com/2013/09/emily-ratajkowski-model',
 'https://www.vanicream.com/product/vanicream-moisturizing-cream',
 'https://www.vanicream.com/product/vanicream-facial-cleanser',
 'https://www.vanicream.com/product/vanicream-daily-facial-moisturizer',
 'https://www.vanicream.com/product/facial-moisturizer-with-spf',
 'https://www.vanicream.com/product/free-and-clear-shampoo',
 'https://www.vanicream.com/product/free-and-clear-conditioner',
 'https://prequelskin.com/products/barrier-therapy',
 'https://prequelskin.com/products/pre-gleanse-first-cleanse',
 'https://prequelskin.com/products/multi-quench-polyglutamic-acid-serum',
 'https://helloseen.com/products/seen-blow-out-creme-fragrance-free',
 'https://helloseen.com/products/seen-frizz-repair-treatment-mask-fragrance-free',
 'https://honest.com/products/conditioning-detangler-sensitive',
 'https://kristinesshair.com/products/dry-shampoo-powder',
 'https://www.fourreasons.us/products/no-nothing-very-sensitive-strong-hairspray',
 'https://eltamd.com/products/eltamd-uv-physical-broad-spectrum-spf-41',
 'https://eltamd.com/products/eltamd-uv-skin-recovery-broad-spectrum-spf-50',
 'https://www.aveeno.com/products/skin-relief-unscented-body-wash-for-sensitive-skin',
 'https://theordinary.com/en-us/natural-moisturizing-factors-ha-moisturizer-100435.html',
 'https://www.laroche-posay.us/our-products/dry-skin-eczema/body-lotion/cicaplast-baume-b5-for-dry-skin-irritations-3606000437449.html',
 'https://www.laroche-posay.us/our-products/body/body-lotion/cicaplast-balm-b5-uv-spf-50-3606000621992.html',
 'https://www.gillettevenus.com/en-us/products/shave-preps/satin-care-ultra-sensitive/',
];
const results = await Promise.all(urls.map(async url => {
 try {
  const response = await fetch(url, {signal:AbortSignal.timeout(20000)});
  const html = await response.text();
  const metas = [...html.matchAll(/<meta\b[^>]*>/gi)].map(match => match[0]);
  const readMeta = key => {
   const tag = metas.find(tag => new RegExp(`(?:property|name)=["']${key}["']`, 'i').test(tag));
   return tag?.match(/content=["']([^"']*)["']/i)?.[1]?.replaceAll('&amp;', '&') || '';
  };
  const gallery = html.match(/src=["']([^"']*dynamic-media\/product\/images[^"']*)["']/)?.[1];
  return {url, status:response.status, title:readMeta('og:title') || html.match(/<title>(.*?)<\/title>/s)?.[1], image:readMeta('og:image') || (gallery ? new URL(gallery.replaceAll('&amp;','&'), url).href : ''), fragrance:html.replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').match(/.{0,80}fragrance.{0,140}/gi)?.slice(0,2)};
 } catch(error) { return {url,error:error.message}; }
}));
console.log(JSON.stringify(results));
