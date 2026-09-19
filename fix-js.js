const fs = require('fs');

let js = fs.readFileSync('js/firebase-hybrid.js', 'utf8');

// 1. Update metric text logic
const metricTextUpdate = `
            if (data.employee_experience !== undefined) {
                document.getElementById('metric-experience')?.setAttribute('data-target', data.employee_experience);
                const expText = document.getElementById('metric-experience-text');
                if (expText) expText.innerText = data.employee_experience;
            }
`;
js = js.replace(/if \(data\.employee_experience !== undefined\)[\s\S]*?setAttribute\('data-target', data\.employee_experience\);/, metricTextUpdate.trim());

// 2. Fix renderTrustedBy buildCard logic to handle bottom row properly
const buildCardTop = `
    function buildCardTop(c) {
        return \`<div class="inline-flex items-center gap-3 bg-[#1a1a1a] text-white px-6 py-4 rounded-xl mx-5 shadow-md whitespace-nowrap border border-[#333333] relative group cursor-pointer hover:bg-[#252525] transition-colors z-10 hover:z-50">
          <div class="flex-shrink-0"><svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"></path></svg></div>
          <span class="font-bold text-[15px]">\${c.name || 'Company'}</span>
          <span class="ml-1 px-2 py-0.5 bg-white/10 rounded text-[10px] font-bold tracking-wider text-gray-300">\${c.country_code || 'USA'}</span>
          <div class="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-80 bg-white text-bcg-dark p-5 rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 pointer-events-none whitespace-normal border border-gray-100 transform group-hover:translate-y-0 translate-y-2">
              <div class="flex justify-between items-center border-b border-gray-100 pb-3 mb-3">
                  <span class="text-[10px] font-bold text-bcg-green uppercase tracking-wider leading-tight">\${c.industry || 'BUSINESS'}</span>
                  <span class="text-[10px] font-bold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-md ml-2">\${c.country || 'United States'}</span>
              </div>
              <p class="text-sm text-gray-700 leading-relaxed font-sans font-medium">\${c.description || 'A valued client of CubicEnhance.'}</p>
              <div class="absolute bottom-full left-1/2 -translate-x-1/2 border-b-white mb-[-1px] border-[6px] border-transparent"></div>
          </div>
      </div>\`;
    }
    
    function buildCardBottom(c) {
        return \`<div class="inline-flex items-center gap-3 bg-[#1a1a1a] text-white px-6 py-4 rounded-xl mx-5 shadow-md whitespace-nowrap border border-[#333333] relative group cursor-pointer hover:bg-[#252525] transition-colors z-10 hover:z-50">
          <div class="flex-shrink-0"><svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"></path></svg></div>
          <span class="font-bold text-[15px]">\${c.name || 'Company'}</span>
          <span class="ml-1 px-2 py-0.5 bg-white/10 rounded text-[10px] font-bold tracking-wider text-gray-300">\${c.country_code || 'USA'}</span>
          <!-- For bottom row, the tooltip opens UPWARDS (bottom-full mb-4) to avoid getting cut off by the container's overflow-hidden -->
          <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-80 bg-white text-bcg-dark p-5 rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 pointer-events-none whitespace-normal border border-gray-100 transform group-hover:translate-y-0 -translate-y-2">
              <div class="flex justify-between items-center border-b border-gray-100 pb-3 mb-3">
                  <span class="text-[10px] font-bold text-bcg-green uppercase tracking-wider leading-tight">\${c.industry || 'BUSINESS'}</span>
                  <span class="text-[10px] font-bold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-md ml-2">\${c.country || 'United States'}</span>
              </div>
              <p class="text-sm text-gray-700 leading-relaxed font-sans font-medium">\${c.description || 'A valued client of CubicEnhance.'}</p>
              <div class="absolute top-full left-1/2 -translate-x-1/2 border-t-white mt-[-1px] border-[6px] border-transparent"></div>
          </div>
      </div>\`;
    }
`;

const oldBuildCardRegex = /function buildCard\(c\) \{[\s\S]*?return `<div[\s\S]*?<\/div>`;\s*\}/;
js = js.replace(oldBuildCardRegex, buildCardTop.trim());

// Update the loop to use buildCardTop and buildCardBottom
js = js.replace(/topHalf\.forEach\(c => topTrack\.innerHTML \+= buildCard\(c\)\);/, 'topHalf.forEach(c => topTrack.innerHTML += buildCardTop(c));');
js = js.replace(/bottomHalf\.forEach\(c => bottomTrack\.innerHTML \+= buildCard\(c\)\);/, 'bottomHalf.forEach(c => bottomTrack.innerHTML += buildCardBottom(c));');

fs.writeFileSync('js/firebase-hybrid.js', js);
console.log('Fixed js/firebase-hybrid.js');
