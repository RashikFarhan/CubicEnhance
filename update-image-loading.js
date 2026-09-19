const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');
const replacement = '<div class="absolute right-0 top-0 h-full w-1/2 opacity-30 pointer-events-none" data-alt="Trust Section Background" style="background-image: url(\'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=1000&q=80\'); background-size: cover; mix-blend-mode: multiply;">';
html = html.replace(/<div class="absolute right-0 top-0 h-full w-1\/2 opacity-30 pointer-events-none" style="background-image:\s*url\('https:\/\/images.unsplash.com[^>]*>/, replacement);
fs.writeFileSync('index.html', html);

let js = fs.readFileSync('js/firebase-hybrid.js', 'utf8');
const fetchImagesFunc = "async function fetchSiteImages() {\n" +
"    if (!db || !firestoreExports) return;\n" +
"    try {\n" +
"        const { doc, getDoc } = firestoreExports;\n" +
"        const imgDoc = await getDoc(doc(db, 'site_config', 'images'));\n" +
"        if (imgDoc.exists()) {\n" +
"            const mappings = imgDoc.data();\n" +
"            const allImages = document.querySelectorAll('img');\n" +
"            allImages.forEach(img => {\n" +
"                const alt = img.getAttribute('alt');\n" +
"                if (alt && mappings[alt]) {\n" +
"                    img.src = mappings[alt];\n" +
"                }\n" +
"            });\n" +
"            const allBgs = document.querySelectorAll('[data-alt]');\n" +
"            allBgs.forEach(el => {\n" +
"                const alt = el.getAttribute('data-alt');\n" +
"                if (alt && mappings[alt]) {\n" +
"                    el.style.backgroundImage = 'url(' + mappings[alt] + ')';\n" +
"                }\n" +
"            });\n" +
"        }\n" +
"    } catch(err) {\n" +
"        console.warn('Images fetch failed:', err);\n" +
"    }\n" +
"}\n";

if (!js.includes('fetchSiteImages')) {
    js = js.replace('async function initHybrid() {', fetchImagesFunc + '\nasync function initHybrid() {');
    js = js.replace('fetchCompaniesMetrics();', 'fetchCompaniesMetrics();\n    fetchSiteImages();');
    fs.writeFileSync('js/firebase-hybrid.js', js);
}
console.log('Successfully updated HTML and JS for dynamic image loading.');
