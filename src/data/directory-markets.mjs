import products from './product-catalog.mjs';
import { countries, regions } from './countries.mjs';
const slugs = {US:'usa', GB:'uk', SG:'singapore', AU:'australia', NZ:'new-zealand'};
export const availableCountries = countries.filter(country => products.some(product => Object.hasOwn(product.countries, country.code))).map(country => ({...country, slug:slugs[country.code] || country.code.toLowerCase()}));
export const availableRegions = regions.filter(region => availableCountries.some(country => country.region === region.code));
export const categoryLabels = {'Skin & Body':'Skincare & body', 'Home & Laundry':'Cleaning & laundry', Haircare:'Haircare', 'Oral Care':'Oral care', Devices:'Devices'};
export const productCategories = Object.entries(categoryLabels).filter(([category]) => products.filter(product => product.category === category && product.fragranceStatus === 'fragrance-free').length >= 3).map(([category,title])=>({category,title,slug:category.toLowerCase().replaceAll('&','and').replace(/\s+/g,'-')}));
