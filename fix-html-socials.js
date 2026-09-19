const fs = require('fs');
const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));

htmlFiles.forEach(f => {
    let html = fs.readFileSync(f, 'utf8');
    
    // Fix the broken class attributes
    html = html.replace(/class="social-ig class="/g, 'class="social-ig ');
    html = html.replace(/class="social-fb class="/g, 'class="social-fb ');
    html = html.replace(/class="social-th class="/g, 'class="social-th ');
    html = html.replace(/class="social-wa class="/g, 'class="social-wa ');
    html = html.replace(/class="social-em class="/g, 'class="social-em ');

    fs.writeFileSync(f, html);
});
console.log('Fixed social classes syntax in HTML files');
