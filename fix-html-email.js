const fs = require('fs');

const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));

htmlFiles.forEach(f => {
    let html = fs.readFileSync(f, 'utf8');
    
    // Fix email
    html = html.replace(
        /href="mailto:admin@cubicenhance\.com" class="social-em\s+class="text-gray-400 hover:text-white transition-colors"/g,
        'href="mailto:admin@cubicenhance.com" class="social-em text-gray-400 hover:text-white transition-colors"'
    );
    
    // Just in case it has unclosed quote
    html = html.replace(
        /class="social-em\s+class="text-gray-400/g,
        'class="social-em text-gray-400'
    );

    fs.writeFileSync(f, html);
});
console.log('Fixed broken email HTML attributes in all files!');
