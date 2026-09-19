const fs = require('fs');

let js = fs.readFileSync('js/firebase-hybrid.js', 'utf8');

// Replace fetchCompaniesMetrics
const oldFetchCompaniesMetrics = `async function fetchCompaniesMetrics() {
    if (!db || !firestoreExports) return fallbackCompaniesJSON();
    
    try {
        const { doc, getDoc, getDocs, collection } = firestoreExports;
        // Try getting site_config/metrics first
        const metricsDoc = await getDoc(doc(db, 'site_config', 'metrics'));
        if (metricsDoc.exists()) {
            const data = metricsDoc.data();
            if (data.total_clients !== undefined) document.getElementById('metric-clients')?.setAttribute('data-target', data.total_clients);
            if (data.contractual_accounts !== undefined) document.getElementById('metric-retention')?.setAttribute('data-target', data.contractual_accounts);
            if (data.years_operational !== undefined) document.getElementById('metric-years')?.setAttribute('data-target', data.years_operational);
            if(window.initCounters) window.initCounters();
            return;
        }
        
        // Fallback to manual counting if metrics doc doesn't exist
        const snapshot = await getDocs(collection(db, 'companies'));
        if(snapshot.empty) throw new Error('Firestore empty');
        const totalCompanies = snapshot.size;
        const contractual = snapshot.docs.filter(d => {
            const r = d.data().revenue_code;
            return typeof r === 'number' && r > 0;
        }).length;
        
        document.getElementById('metric-clients')?.setAttribute('data-target', totalCompanies);
        document.getElementById('metric-retention')?.setAttribute('data-target', contractual);
        if(window.initCounters) window.initCounters();
    } catch(err) {
        console.warn('Firebase companies fetch failed, falling back to JSON:', err);
        fallbackCompaniesJSON();
    }
}`;

const newFetchCompaniesMetrics = `
function renderTrustedBy(companies) {
    const topTrack = document.getElementById('trusted-by-track-top');
    const bottomTrack = document.getElementById('trusted-by-track-bottom');
    if (!topTrack || !bottomTrack) return;
    
    topTrack.innerHTML = '';
    bottomTrack.innerHTML = '';
    
    const half = Math.ceil(companies.length / 2);
    const topHalf = companies.slice(0, half);
    const bottomHalf = companies.slice(half);
    
    function buildCard(c) {
        return \`<div class="inline-flex items-center gap-3 bg-[#1a1a1a] text-white px-6 py-4 rounded-xl mx-5 shadow-md whitespace-nowrap border border-[#333333] relative group cursor-pointer hover:bg-[#252525] transition-colors">
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
    
    topHalf.forEach(c => topTrack.innerHTML += buildCard(c));
    bottomHalf.forEach(c => bottomTrack.innerHTML += buildCard(c));
}

async function fetchCompaniesMetrics() {
    if (!db || !firestoreExports) return fallbackCompaniesJSON();
    
    try {
        const { doc, getDoc, getDocs, collection } = firestoreExports;
        // 1. Fetch metrics config
        const metricsDoc = await getDoc(doc(db, 'site_config', 'metrics'));
        if (metricsDoc.exists()) {
            const data = metricsDoc.data();
            if (data.total_tasks !== undefined) document.getElementById('metric-tasks')?.setAttribute('data-target', data.total_tasks);
            if (data.contractual_accounts !== undefined) document.getElementById('metric-contractual')?.setAttribute('data-target', data.contractual_accounts);
            if (data.years_operational !== undefined) document.getElementById('metric-years')?.setAttribute('data-target', data.years_operational);
            if (data.employee_experience !== undefined) document.getElementById('metric-experience')?.setAttribute('data-target', data.employee_experience);
        }
        
        // 2. Fetch companies for the Trusted By section and to override contractual_accounts
        const snapshot = await getDocs(collection(db, 'companies'));
        if(snapshot.empty) throw new Error('Firestore empty');
        
        const companies = snapshot.docs.map(d => d.data());
        
        // The user specifically requested that Column 2 (Contractual Managed Accounts)
        // should be linked to the number of companies.
        const contractual = companies.length;
        document.getElementById('metric-contractual')?.setAttribute('data-target', contractual);
        
        renderTrustedBy(companies);
        
        if(window.initCounters) window.initCounters();
    } catch(err) {
        console.warn('Firebase companies fetch failed, falling back to JSON:', err);
        fallbackCompaniesJSON();
    }
}`;

const oldFallback = `// Fallback logic for companies
function fallbackCompaniesJSON() {
    fetch('/companies.json').then(res => res.json()).then(data => {
        const totalCompanies = data.length;
        const contractual = data.filter(c => c.r_code > 0).length;
        document.getElementById('metric-clients')?.setAttribute('data-target', totalCompanies);
        document.getElementById('metric-retention')?.setAttribute('data-target', contractual);
        if(window.initCounters) window.initCounters();
    }).catch(e => {
        if(window.initCounters) window.initCounters();
    });
}`;

const newFallback = `// Fallback logic for companies
function fallbackCompaniesJSON() {
    fetch('/companies.json').then(res => res.json()).then(data => {
        document.getElementById('metric-tasks')?.setAttribute('data-target', 12500);
        document.getElementById('metric-contractual')?.setAttribute('data-target', data.length);
        document.getElementById('metric-years')?.setAttribute('data-target', 1);
        document.getElementById('metric-experience')?.setAttribute('data-target', 4);
        renderTrustedBy(data);
        if(window.initCounters) window.initCounters();
    }).catch(e => {
        if(window.initCounters) window.initCounters();
    });
}`;

js = js.replace(oldFetchCompaniesMetrics, newFetchCompaniesMetrics);
js = js.replace(oldFallback, newFallback);

fs.writeFileSync('js/firebase-hybrid.js', js);
console.log('Updated firebase-hybrid.js');
