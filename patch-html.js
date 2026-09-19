const fs = require('fs');

const searchBarHtmlRegex = /<div class="ml-4 flex-1 max-w-sm flex items-center bg-white border border-gray-300 rounded-full px-4 py-2 shadow-sm">[\s\S]*?<input type="text" placeholder="Type to search"[\s\S]*?<\/div>/g;

const oldFooterHtml = `<span class="bg-white/20 backdrop-blur-md px-3 py-1 rounded text-xs font-bold uppercase tracking-wider mb-3 inline-block">DEPLOYMENT IN 14 DAYS</span>
                            <h3 class="font-serif text-xl md:text-2xl text-white">Seamless onboarding with zero workflow interruption.</h3>`;

const newFooterHtml = `<a href="/how-we-work" id="footer-discovery-link" class="block group cursor-pointer">
                            <span class="bg-white/20 backdrop-blur-md px-3 py-1 rounded text-xs font-bold uppercase tracking-wider mb-3 inline-block group-hover:bg-white/30 transition-colors">Before You Book</span>
                            <h3 class="font-serif text-xl md:text-2xl text-white group-hover:text-bcg-light-green transition-colors">See what to expect from a Workflow Discovery Call &rarr;</h3>
                        </a>`;

const oldButtonHtml = `<a href="#how-we-work" class="inline-block px-8 py-3 bg-bcg-light-green text-bcg-dark font-bold text-sm rounded-full hover:bg-[#5c829c] hover:text-white transition-colors shadow-sm">DISCOVER OUR MODEL &rarr;</a>`;

const newButtonHtml = `<div class="flex flex-col sm:flex-row sm:items-center gap-4">
                            <button type="button" onclick="this.nextElementSibling.classList.toggle('hidden'); this.nextElementSibling.classList.toggle('flex'); this.classList.toggle('rotate-45'); this.classList.toggle('bg-bcg-dark'); this.classList.toggle('text-white')" class="w-12 h-12 bg-bcg-light-green text-bcg-dark font-bold text-3xl leading-none rounded-full flex shrink-0 items-center justify-center hover:bg-bcg-green hover:text-white shadow-sm transition-all duration-300 pb-1 z-10 relative cursor-pointer" aria-label="Expand menu">+</button>
                            <div class="hidden flex-wrap gap-2 transition-all duration-500 animate-fade-in">
                                <a href="/partnerships/embedded" class="px-4 py-2 bg-white text-bcg-dark text-xs font-bold rounded-full shadow-sm hover:bg-bcg-light-green transition-colors border border-gray-100">Embed Operation</a>
                                <a href="/partnerships/project" class="px-4 py-2 bg-white text-bcg-dark text-xs font-bold rounded-full shadow-sm hover:bg-bcg-light-green transition-colors border border-gray-100">Project</a>
                                <a href="/partnerships/dedicated" class="px-4 py-2 bg-white text-bcg-dark text-xs font-bold rounded-full shadow-sm hover:bg-bcg-light-green transition-colors border border-gray-100">Dedicated</a>
                                <a href="/partnerships/agency" class="px-4 py-2 bg-white text-bcg-dark text-xs font-bold rounded-full shadow-sm hover:bg-bcg-light-green transition-colors border border-gray-100">Agency</a>
                            </div>
                        </div>`;

const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));

htmlFiles.forEach(f => {
    let html = fs.readFileSync(f, 'utf8');
    
    // 1. Remove search bar
    html = html.replace(searchBarHtmlRegex, '');

    // 2. Change "Book a Workflow Discovery Call" -> "Book Your Free Discovery Call"
    html = html.replace(/Book a Workflow Discovery Call/g, 'Book Your Free Discovery Call');

    // 3. Footer changes
    if (html.includes('DEPLOYMENT IN 14 DAYS')) {
        html = html.replace(oldFooterHtml, newFooterHtml);
    }
    
    if (f === 'index.html') {
        // 4. Hero section text
        html = html.replace('take ownership of your data', 'take responsibility of your data');
        
        // 5. DISCOVER OUR MODEL button -> '+' Button
        html = html.replace(oldButtonHtml, newButtonHtml);
    }

    fs.writeFileSync(f, html);
});

console.log('Processed HTML files!');
