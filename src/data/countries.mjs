// Country filters are distinct markets, not claims of product availability.
export const countries = [
 { code: 'AU', name: 'Australia', region: 'ANZ' },
 { code: 'FR', name: 'France', region: 'Europe' },
 { code: 'DE', name: 'Germany', region: 'Europe' },
 { code: 'JP', name: 'Japan', region: 'Asia' },
 { code: 'NZ', name: 'New Zealand', region: 'ANZ' },
 { code: 'SG', name: 'Singapore', region: 'Asia' },
 { code: 'GB', name: 'United Kingdom', region: 'Europe' },
 { code: 'US', name: 'United States', region: 'US' },
];
export const countryName = code => countries.find(country => country.code === code)?.name || code;
export const regions = [{code:'US', name:'US'}, {code:'Europe', name:'Europe'}, {code:'Asia', name:'Asia'}, {code:'ANZ', name:'Australia & NZ'}];
export const countryInRegion = (code, region) => !region || countries.some(country => country.code === code && country.region === region);
