const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
const results = {};

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const regex = /<img[^>]+src="([^"]+)"[^>]*alt="([^"]+)"/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const url = match[1];
    const alt = match[2];
    if (url.includes('unsplash.com')) {
      if(!results[f]) results[f] = [];
      results[f].push({ url, alt });
    }
  }
  
  // Also try to match alt first, then src
  const regex2 = /<img[^>]+alt="([^"]+)"[^>]*src="([^"]+)"/g;
  let match2;
  while ((match2 = regex2.exec(content)) !== null) {
    const alt = match2[1];
    const url = match2[2];
    if (url.includes('unsplash.com')) {
      if(!results[f]) results[f] = [];
      // avoid duplicates
      if(!results[f].find(x => x.url === url && x.alt === alt)) {
        results[f].push({ url, alt });
      }
    }
  }
});
console.log(JSON.stringify(results, null, 2));
