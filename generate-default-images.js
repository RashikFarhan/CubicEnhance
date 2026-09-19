const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
const uniqueAlts = {};

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  
  // Find standard img tags
  const regex = /<img[^>]+src="([^"]+)"[^>]*alt="([^"]+)"/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const url = match[1];
    const alt = match[2];
    if (url.includes('unsplash.com')) {
      if(!uniqueAlts[alt]) uniqueAlts[alt] = url;
    }
  }
  
  // Find img tags with alt first
  const regex2 = /<img[^>]+alt="([^"]+)"[^>]*src="([^"]+)"/g;
  let match2;
  while ((match2 = regex2.exec(content)) !== null) {
    const alt = match2[1];
    const url = match2[2];
    if (url.includes('unsplash.com')) {
      if(!uniqueAlts[alt]) uniqueAlts[alt] = url;
    }
  }
  
  // Also inline background images!
  const regex3 = /style="[^"]*background-image:\s*url\('([^']+)'\)[^"]*"[^>]*data-bg-name="([^"]+)"/g;
  let match3;
  while ((match3 = regex3.exec(content)) !== null) {
      // Need data-bg-name for divs
  }
});

// Since the Trust background doesn't have an alt, I should give it a data-alt="Trust Background" in index.html
const indexHTML = fs.readFileSync('index.html', 'utf8');
const bgMatch = indexHTML.match(/url\('(https:\/\/images\.unsplash\.com\/[^']+)'\)/);
if (bgMatch) {
    uniqueAlts['Trust Section Background'] = bgMatch[1];
}

console.log(Object.keys(uniqueAlts).length + " unique images found.");
fs.writeFileSync('admin-dashboard/app/(admin)/site/images/defaultImages.json', JSON.stringify(uniqueAlts, null, 2));
console.log("Written to admin-dashboard/app/(admin)/site/images/defaultImages.json");
