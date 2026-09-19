const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Fix Marquee Animation Speed and Name
html = html.replace('animation: marquee-left 200s linear infinite;', 'animation: animate-scroll-left 80s linear infinite;');
html = html.replace('animation: marquee-right 200s linear infinite;', 'animation: animate-scroll-right 80s linear infinite;');

// Wait, the Tailwind CSS classes generated are actually `.animate-scroll-left`, which translates to `animation: scrollLeft 60s ...`.
// To use inline CSS, it should be `animation: scrollLeft 80s linear infinite;`. Let's use that.
html = html.replace('animation: animate-scroll-left 80s linear infinite;', 'animation: scrollLeft 80s linear infinite;');
html = html.replace('animation: animate-scroll-right 80s linear infinite;', 'animation: scrollRight 80s linear infinite;');
html = html.replace('animation: marquee-left 200s linear infinite;', 'animation: scrollLeft 80s linear infinite;');
html = html.replace('animation: marquee-right 200s linear infinite;', 'animation: scrollRight 80s linear infinite;');

// 2. Wrap the metric text "4" in a span
html = html.replace('at least 4+ years', 'at least <span id="metric-experience-text">4</span>+ years');

fs.writeFileSync('index.html', html);
console.log('Fixed index.html');
