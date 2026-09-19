const firebaseConfig = {
    apiKey: "AIzaSyD-3kMD8Cc6mqBGm3xWKhuisO2Wa5VimeI",
    authDomain: "cubicenhance-5fbf8.firebaseapp.com",
    projectId: "cubicenhance-5fbf8"
};

let db = null;
let firestoreExports = null;

async function initFirebase() {
    try {
        const { initializeApp } = await import("https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js");
        firestoreExports = await import("https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js");
        const app = initializeApp(firebaseConfig);
        db = firestoreExports.getFirestore(app);
        return true;
    } catch(err) {
        console.warn('Firebase blocked or failed to load. Falling back to JSON.', err);
        return false;
    }
}

// Fallback logic for companies
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
}

// Fallback logic for reviews
function fallbackReviewsJSON() {
    fetch('/reviews.json').then(res => res.json()).then(data => renderReviews(data)).catch(e => console.error("Reviews JSON failed", e));
}

// Hybrid Fetch for Metrics

function renderTrustedBy(companies) {
    const topTrack = document.getElementById('trusted-by-track-top');
    const bottomTrack = document.getElementById('trusted-by-track-bottom');
    if (!topTrack || !bottomTrack) return;
    
    topTrack.innerHTML = '';
    bottomTrack.innerHTML = '';
    
    const half = Math.ceil(companies.length / 2);
    const topHalf = companies.slice(0, half);
    const bottomHalf = companies.slice(half);
    
    function buildCardTop(c) {
        return `<div class="inline-flex items-center gap-3 bg-[#1a1a1a] text-white px-6 py-4 rounded-xl mx-5 shadow-md whitespace-nowrap border border-[#333333] relative group cursor-pointer hover:bg-[#252525] transition-colors z-10 hover:z-50">
          <div class="flex-shrink-0"><svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"></path></svg></div>
          <span class="font-bold text-[15px]">${c.name || 'Company'}</span>
          <span class="ml-1 px-2 py-0.5 bg-white/10 rounded text-[10px] font-bold tracking-wider text-gray-300">${c.country_code || 'USA'}</span>
          <div class="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-80 bg-white text-bcg-dark p-5 rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 pointer-events-none whitespace-normal border border-gray-100 transform group-hover:translate-y-0 translate-y-2">
              <div class="flex justify-between items-center border-b border-gray-100 pb-3 mb-3">
                  <span class="text-[10px] font-bold text-bcg-green uppercase tracking-wider leading-tight">${c.industry || 'BUSINESS'}</span>
                  <span class="text-[10px] font-bold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-md ml-2">${c.country || 'United States'}</span>
              </div>
              <p class="text-sm text-gray-700 leading-relaxed font-sans font-medium">${c.description || 'A valued client of CubicEnhance.'}</p>
              <div class="absolute bottom-full left-1/2 -translate-x-1/2 border-b-white mb-[-1px] border-[6px] border-transparent"></div>
          </div>
      </div>`;
    }
    
    function buildCardBottom(c) {
        return `<div class="inline-flex items-center gap-3 bg-[#1a1a1a] text-white px-6 py-4 rounded-xl mx-5 shadow-md whitespace-nowrap border border-[#333333] relative group cursor-pointer hover:bg-[#252525] transition-colors z-10 hover:z-50">
          <div class="flex-shrink-0"><svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"></path></svg></div>
          <span class="font-bold text-[15px]">${c.name || 'Company'}</span>
          <span class="ml-1 px-2 py-0.5 bg-white/10 rounded text-[10px] font-bold tracking-wider text-gray-300">${c.country_code || 'USA'}</span>
          <!-- For bottom row, the tooltip opens UPWARDS (bottom-full mb-4) to avoid getting cut off by the container's overflow-hidden -->
          <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-80 bg-white text-bcg-dark p-5 rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 pointer-events-none whitespace-normal border border-gray-100 transform group-hover:translate-y-0 -translate-y-2">
              <div class="flex justify-between items-center border-b border-gray-100 pb-3 mb-3">
                  <span class="text-[10px] font-bold text-bcg-green uppercase tracking-wider leading-tight">${c.industry || 'BUSINESS'}</span>
                  <span class="text-[10px] font-bold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-md ml-2">${c.country || 'United States'}</span>
              </div>
              <p class="text-sm text-gray-700 leading-relaxed font-sans font-medium">${c.description || 'A valued client of CubicEnhance.'}</p>
              <div class="absolute top-full left-1/2 -translate-x-1/2 border-t-white mt-[-1px] border-[6px] border-transparent"></div>
          </div>
      </div>`;
    }
    
    // Duplicate cards to ensure smooth infinite marquee scroll
    for (let i = 0; i < 4; i++) {
        topHalf.forEach(c => topTrack.innerHTML += buildCardTop(c));
        bottomHalf.forEach(c => bottomTrack.innerHTML += buildCardBottom(c));
    }
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
            if (data.employee_experience !== undefined) {
                document.getElementById('metric-experience')?.setAttribute('data-target', data.employee_experience);
                const expText = document.getElementById('metric-experience-text');
                if (expText) expText.innerText = data.employee_experience;
            }
        }
        
        // 2. Fetch companies for the Trusted By section and to override contractual_accounts
        
        // Fetch custom links
        try {
            const linksDoc = await getDoc(doc(db, 'site_config', 'links'));
            if (linksDoc.exists()) {
                const linksData = linksDoc.data();
                if (linksData.footer_discovery) {
                    const el = document.getElementById('footer-discovery-link');
                    if (el) el.setAttribute('href', linksData.footer_discovery);
                }
            }
        } catch (e) {
            console.error("Could not fetch footer link:", e);
        }

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
}

// Hybrid Fetch for Reviews
async function fetchReviewsData() {
    if (!db || !firestoreExports) return fallbackReviewsJSON();

    try {
        const { query, collection, where, getDocs } = firestoreExports;
        // Must use 'where' because Firestore rules block fetching all reviews
        const reviewsQuery = query(collection(db, 'reviews'), where('is_published', '==', true));
        const snapshot = await getDocs(reviewsQuery);
        if(snapshot.empty) throw new Error('Firestore empty');
        const data = snapshot.docs.map(d => d.data());
        renderReviews(data);
    } catch(err) {
        console.warn('Firebase reviews fetch failed, falling back to JSON:', err);
        fallbackReviewsJSON();
    }
}

function renderReviews(data) {
    const totalReviews = data.length;
    const avgScore = totalReviews > 0 ? (data.reduce((sum, rev) => sum + (Number(rev.rating) || 5), 0) / totalReviews).toFixed(2) : "0.00";
    
    if(document.getElementById('agg-score')) {
        document.getElementById('agg-score').innerText = avgScore;
        document.getElementById('agg-count-text').innerText = `Based on ${totalReviews} Verified International Reviews`;
        
        let starsHTML = '';
        const fullStars = Math.floor(Number(avgScore));
        const hasHalfStar = (Number(avgScore) % 1) >= 0.5;
        for(let i=0; i<5; i++) {
            if(i < fullStars) {
                starsHTML += `<svg class="w-7 h-7 text-bcg-light-green fill-current drop-shadow-sm" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>`;
            } else if(i === fullStars && hasHalfStar) {
                starsHTML += `<svg class="w-7 h-7 text-bcg-light-green fill-current drop-shadow-sm" viewBox="0 0 24 24"><path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4V6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"/></svg>`;
            } else {
                starsHTML += `<svg class="w-7 h-7 text-gray-600 fill-current" viewBox="0 0 24 24"><path d="M22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.64-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1v9.3z"/></svg>`;
            }
        }
        document.getElementById('agg-stars').innerHTML = starsHTML;
    }
    
    const reviewsTrack = document.getElementById('reviews-track');
    if(!reviewsTrack) return;
    reviewsTrack.innerHTML = ''; // clear existing
    data.forEach((rev, index) => {
        const card = document.createElement('div');
        card.className = "flex-none w-full md:w-1/2 lg:w-1/3 px-3";
        let rstars = '';
        for(let i=0; i<5; i++) {
            rstars += i < (Number(rev.rating) || 5) 
                ? `<svg class="w-5 h-5 text-bcg-light-green fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>` 
                : `<svg class="w-5 h-5 text-gray-600 fill-current" viewBox="0 0 24 24"><path d="M22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.64-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1v9.3z"/></svg>`;
        }
        
        const safeText = (rev.text || '').replace(/"/g, '&quot;');
        
        card.innerHTML = `
            <div class="bg-white/10 backdrop-blur-md rounded-2xl p-8 h-full flex flex-col border border-white/20 hover:border-white/40 hover:bg-white/15 transition-colors shadow-lg group">
                <div class="flex gap-1 mb-4">${rstars}</div>
                <p class="text-gray-300 text-[1.05rem] leading-[1.7] italic mb-3 font-serif line-clamp-4 relative transition-colors group-hover:text-white">"${safeText}"</p>
                <button class="read-more-btn text-bcg-light-green text-sm font-bold uppercase tracking-wider text-left hover:text-white transition-colors mb-8 focus:outline-none" data-index="${index}">Read More &rarr;</button>
                <div class="flex flex-wrap items-center gap-2 mt-auto pt-6 border-t border-white/20">
                    <span class="text-[0.7rem] font-bold text-gray-400 uppercase tracking-widest">${rev.id || '#00'}</span>
                    <span class="w-1 h-1 bg-gray-500 rounded-full mx-1"></span>
                    <span class="px-2.5 py-1 bg-white/5 text-gray-300 text-[0.75rem] rounded-md font-medium border border-white/10">${rev.country || 'Unknown'} (${rev.country_code || 'N/A'})</span>
                    <span class="px-2.5 py-1 bg-bcg-green text-white text-[0.75rem] rounded-md font-bold ml-auto whitespace-nowrap">${rev.service || ''}</span>
                </div>
            </div>
        `;
        reviewsTrack.appendChild(card);
    });
    
    // Resume carousel logic here
    if(window.setupCarousel) window.setupCarousel();
}

async function fetchSiteImages() {
    if (!db || !firestoreExports) return;
    try {
        const { doc, getDoc } = firestoreExports;
        const imgDoc = await getDoc(doc(db, 'site_config', 'images'));
        if (imgDoc.exists()) {
            const mappings = imgDoc.data();
            const allImages = document.querySelectorAll('img');
            allImages.forEach(img => {
                const alt = img.getAttribute('alt');
                if (alt && mappings[alt]) {
                    img.src = mappings[alt];
                }
            });
            const allBgs = document.querySelectorAll('[data-alt]');
            allBgs.forEach(el => {
                const alt = el.getAttribute('data-alt');
                if (alt && mappings[alt]) {
                    el.style.backgroundImage = 'url(' + mappings[alt] + ')';
                }
            });
        }
    } catch(err) {
        console.warn('Images fetch failed:', err);
    }
}

async function initHybrid() {
    await initFirebase(); // Safe now, won't crash if blocked
    fetchCompaniesMetrics();
    fetchSiteImages();
    if(document.getElementById('reviews-track')) {
        fetchReviewsData();
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHybrid);
} else {
    initHybrid();
}
