const fs = require('fs');

const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));

htmlFiles.forEach(f => {
    let html = fs.readFileSync(f, 'utf8');
    
    // Fix instagram
    html = html.replace(
        /href="https:\/\/www\.instagram\.com\/cubicenhance\?stkn=MXQ4ZHV0aXNsenphYg==" class="social-ig\s+target="_blank" rel="noopener" class="text-gray-400 hover:text-white transition-colors"/g,
        'href="https://www.instagram.com/cubicenhance?stkn=MXQ4ZHV0aXNsenphYg==" target="_blank" rel="noopener" class="social-ig text-gray-400 hover:text-white transition-colors"'
    );
    
    // Fix facebook
    html = html.replace(
        /href="https:\/\/www\.facebook\.com\/share\/1JUVDfCqAi\/" class="social-fb\s+target="_blank" rel="noopener" class="text-gray-400 hover:text-white transition-colors"/g,
        'href="https://www.facebook.com/share/1JUVDfCqAi/" target="_blank" rel="noopener" class="social-fb text-gray-400 hover:text-white transition-colors"'
    );

    // Fix threads
    html = html.replace(
        /href="https:\/\/www\.threads\.com\/@cubicenhance" class="social-th\s+target="_blank" rel="noopener" class="text-gray-400 hover:text-white transition-colors"/g,
        'href="https://www.threads.com/@cubicenhance" target="_blank" rel="noopener" class="social-th text-gray-400 hover:text-white transition-colors"'
    );

    // Fix whatsapp
    html = html.replace(
        /href="https:\/\/wa\.me\/8801846408737" class="social-wa\s+target="_blank" rel="noopener" class="text-gray-400 hover:text-white transition-colors"/g,
        'href="https://wa.me/8801846408737" target="_blank" rel="noopener" class="social-wa text-gray-400 hover:text-white transition-colors"'
    );

    // Fix gmail
    html = html.replace(
        /href="mailto:admin@cubicenhance\.com" class="social-em\s+target="_blank" rel="noopener" class="text-gray-400 hover:text-white transition-colors"/g,
        'href="mailto:admin@cubicenhance.com" target="_blank" rel="noopener" class="social-em text-gray-400 hover:text-white transition-colors"'
    );

    fs.writeFileSync(f, html);
});
console.log('Fixed broken HTML attributes in all files!');
