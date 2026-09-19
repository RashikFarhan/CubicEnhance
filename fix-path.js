const fs = require('fs');
const files = ['ai-automation.html','data-accounting.html','docs-backoffice.html','graphics-design.html','media-production.html','social-marketing.html','web-design.html'];
files.forEach(f => {
    let html = fs.readFileSync(f, 'utf8');
    html = html.replace('<script src="/js/gallery-expand.js" defer></script>', '<script src="js/gallery-expand.js" defer></script>');
    fs.writeFileSync(f, html);
    console.log('Fixed', f);
});
