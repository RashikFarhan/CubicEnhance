const fs = require('fs');
const path = require('path');

const filesToProcess = [
    'ai-automation.html',
    'data-accounting.html',
    'docs-backoffice.html',
    'graphics-design.html',
    'media-production.html',
    'social-marketing.html',
    'web-design.html'
];

for (const file of filesToProcess) {
    const filePath = path.join(__dirname, file);
    if (!fs.existsSync(filePath)) continue;
    
    let html = fs.readFileSync(filePath, 'utf8');
    
    console.log(`Processing ${file}...`);
    
    // Process modals 1 to 10
    for (let i = 1; i <= 10; i++) {
        const modalId = `modal-${i}`;
        const modalStartIndex = html.indexOf(`<div id="${modalId}"`);
        if (modalStartIndex === -1) continue;
        
        let modalEndIndex = html.indexOf(`<!-- Modal ${i+1} -->`, modalStartIndex);
        if (modalEndIndex === -1) {
            modalEndIndex = html.indexOf(`</script>`, modalStartIndex);
            const scriptTag = html.indexOf(`<script>`, modalStartIndex);
            if (scriptTag !== -1 && scriptTag < modalEndIndex) modalEndIndex = scriptTag;
        }
        
        if (modalEndIndex === -1) continue;
        
        const modalBlock = html.substring(modalStartIndex, modalEndIndex);
        
        // Extract text container
        const textColMatch = modalBlock.match(/<div class="[^"]*w-full md:w-7\/12[^"]*">([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>/);
        if (!textColMatch) continue;
        
        let content = textColMatch[1];
        content = content.replace(/<\/div>\s*<\/div>\s*$/, '');
        content = content.replace(/text-2xl/g, 'text-3xl');
        content = content.replace(/text-sm/g, 'text-base');
        
        const hiddenDetails = `\n                      <div class="hidden insight-details">\n                          ${content.trim()}\n                      </div>`;
        
        // Target specifically the button for THIS modal
        const targetBtnStr = `onclick="openModal('${modalId}')"`;
        const btnRegex = new RegExp(`<button\\s+onclick="openModal\\('${modalId}'\\)"[\\s\\S]*?>[\\s\\S]*?</button>`);
        const match = html.match(btnRegex);
        
        if (match) {
            const originalBtn = match[0];
            const newBtnHtml = `<button type="button" class="btn-expand inline-flex items-center px-5 py-2.5 bg-bcg-dark text-white text-sm font-bold rounded-full shadow-lg hover:bg-bcg-green transition-colors cursor-pointer">Read More</button>`;
            html = html.replace(originalBtn, newBtnHtml + hiddenDetails);
        }
    }
    
    // Remove ALL modals blocks
    const modalsBlockRegex = /<!-- Modals -->[\s\S]*?<!-- Modal \d+ -->[\s\S]*?(?=<script>|<\/main>)/;
    html = html.replace(modalsBlockRegex, '');
    
    // Also remove the openModal/closeModal script entirely to clean up
    html = html.replace(/<script>\s*function openModal[\s\S]*?<\/script>/, '');

    // Add the gallery expander JS just before </body>
    if (!html.includes('js/gallery-expand.js')) {
        html = html.replace('</body>', '    <script src="/js/gallery-expand.js" defer></script>\n</body>');
    }
    
    fs.writeFileSync(filePath, html);
    console.log(`Updated ${file}`);
}
