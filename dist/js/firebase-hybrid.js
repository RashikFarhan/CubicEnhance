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
        const totalCompanies = data.length;
        const contractual = data.filter(c => c.r_code > 0).length;
        document.getElementById('metric-clients')?.setAttribute('data-target', totalCompanies);
        document.getElementById('metric-retention')?.setAttribute('data-target', contractual);
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
async function fetchCompaniesMetrics() {
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

async function initHybrid() {
    await initFirebase(); // Safe now, won't crash if blocked
    fetchCompaniesMetrics();
    if(document.getElementById('reviews-track')) {
        fetchReviewsData();
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHybrid);
} else {
    initHybrid();
}
