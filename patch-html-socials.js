const fs = require('fs');

const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));

htmlFiles.forEach(f => {
    let html = fs.readFileSync(f, 'utf8');
    
    // Add classes to footer social links
    html = html.replace('href="https://www.instagram.com/cubicenhance?stkn=MXQ4ZHV0aXNsenphYg=="', 'href="https://www.instagram.com/cubicenhance?stkn=MXQ4ZHV0aXNsenphYg==" class="social-ig ');
    html = html.replace('href="https://www.facebook.com/share/1JUVDfCqAi/"', 'href="https://www.facebook.com/share/1JUVDfCqAi/" class="social-fb ');
    html = html.replace('href="https://www.threads.com/@cubicenhance"', 'href="https://www.threads.com/@cubicenhance" class="social-th ');
    html = html.replace('href="https://wa.me/8801846408737"', 'href="https://wa.me/8801846408737" class="social-wa ');
    html = html.replace('href="mailto:admin@cubicenhance.com"', 'href="mailto:admin@cubicenhance.com" class="social-em ');
    
    // Clean up if it was applied twice
    html = html.replace(/class="social-ig class="social-ig /g, 'class="social-ig ');
    html = html.replace(/class="social-fb class="social-fb /g, 'class="social-fb ');
    html = html.replace(/class="social-th class="social-th /g, 'class="social-th ');
    html = html.replace(/class="social-wa class="social-wa /g, 'class="social-wa ');
    html = html.replace(/class="social-em class="social-em /g, 'class="social-em ');

    fs.writeFileSync(f, html);
});
console.log('Added social classes to HTML files');
